/**
 * Gmail Service
 * Uses chrome.identity to get an OAuth2 token and fetches emails via Gmail REST API.
 */

export interface GmailMessage {
  id: string
  from: string
  subject: string
  snippet: string
  date: string
  isUnread: boolean
}

/** Gets an OAuth2 access token via chrome.identity */
async function getAuthToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, (token: any) => {
      if (chrome.runtime.lastError || !token) {
        reject(new Error(chrome.runtime.lastError?.message ?? 'Failed to get auth token'))
      } else {
        const tokenString = typeof token === 'string' ? token : token.token
        resolve(tokenString)
      }
    })
  })
}

/** Extracts a header value from a Gmail message part */
function getHeader(headers: { name: string; value: string }[], name: string): string {
  return headers.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value ?? ''
}

/** Fetches the last N emails from Gmail */
export async function fetchRecentEmails(maxResults = 10): Promise<GmailMessage[]> {
  const token = await getAuthToken()

  // 1. List message IDs (most recent first)
  const listRes = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}&labelIds=INBOX`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
  if (!listRes.ok) throw new Error(`Gmail list failed: ${listRes.status}`)
  const listData = await listRes.json()

  const messageIds: string[] = (listData.messages ?? []).map((m: { id: string }) => m.id)
  if (messageIds.length === 0) return []

  // 2. Fetch each message in parallel (metadata only, much faster)
  const messages = await Promise.all(
    messageIds.map(async (id) => {
      const res = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      if (!res.ok) return null
      return res.json()
    }),
  )

  return messages
    .filter(Boolean)
    .map((msg) => ({
      id: msg.id,
      from: getHeader(msg.payload?.headers ?? [], 'From'),
      subject: getHeader(msg.payload?.headers ?? [], 'Subject'),
      snippet: msg.snippet ?? '',
      date: getHeader(msg.payload?.headers ?? [], 'Date'),
      isUnread: (msg.labelIds ?? []).includes('UNREAD'),
    }))
}
