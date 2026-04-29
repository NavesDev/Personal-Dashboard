/**
 * useGmailSummary hook
 *
 * Orchestrates:
 *   1. Cache check — if a summary was generated in the last hour, return it
 *   2. Gmail fetch — fetches the last 10 emails via Gmail API
 *   3. Gemini summarize — sends emails to Gemini for an executive summary
 *   4. Cache write — stores result with a timestamp for the 1-hour TTL
 */

import { useState, useEffect, useCallback } from 'react'
import { fetchRecentEmails, type GmailMessage } from '@/services/gmailService'
import { summarizeEmails } from '@/services/geminiService'
import { useStorage } from './useStorage'
import { defaultApiKeys, type ApiKeys } from '@/types/settings'

const CACHE_KEY = 'gmail_summary_cache'
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

interface GmailCache {
  summary: string
  emails: GmailMessage[]
  fetchedAt: number // Date.now()
}

export interface UseGmailSummaryResult {
  summary: string | null
  emails: GmailMessage[]
  loading: boolean
  error: string | null
  lastFetched: Date | null
  /** Force a refresh, bypassing the cache */
  refresh: () => void
}

function readCache(): GmailCache | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed: GmailCache = JSON.parse(raw)
    if (Date.now() - parsed.fetchedAt < CACHE_TTL_MS) return parsed
    return null // expired
  } catch {
    return null
  }
}

function writeCache(data: GmailCache) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch {
    // storage quota exceeded — silently ignore
  }
}

export function useGmailSummary(): UseGmailSummaryResult {
  const [apiKeys] = useStorage<ApiKeys>('dashboard_api_keys', defaultApiKeys)
  const [summary, setSummary] = useState<string | null>(null)
  const [emails, setEmails] = useState<GmailMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastFetched, setLastFetched] = useState<Date | null>(null)
  const [forceRefresh, setForceRefresh] = useState(0)

  const refresh = useCallback(() => {
    // Clear cache and trigger re-fetch
    localStorage.removeItem(CACHE_KEY)
    setForceRefresh((n) => n + 1)
  }, [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      // 1. Check cache first
      const cached = readCache()
      if (cached) {
        setSummary(cached.summary)
        setEmails(cached.emails)
        setLastFetched(new Date(cached.fetchedAt))
        return
      }

      // 2. Cache miss — fetch from APIs
      if (!apiKeys.gemini) {
        setError('Configure sua Gemini API Key nas configurações para ver o resumo.')
        return
      }

      setLoading(true)
      setError(null)

      try {
        const fetchedEmails = await fetchRecentEmails(10)
        if (cancelled) return

        const generatedSummary = await summarizeEmails(fetchedEmails, apiKeys.gemini, apiKeys.geminiModel)
        if (cancelled) return

        const now = Date.now()
        const cacheData: GmailCache = {
          summary: generatedSummary,
          emails: fetchedEmails,
          fetchedAt: now,
        }
        writeCache(cacheData)

        setSummary(generatedSummary)
        setEmails(fetchedEmails)
        setLastFetched(new Date(now))
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erro desconhecido')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [forceRefresh, apiKeys.gemini])

  return { summary, emails, loading, error, lastFetched, refresh }
}
