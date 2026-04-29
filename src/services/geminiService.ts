/**
 * Gemini Service
 * Calls the Gemini API to summarize a list of email snippets.
 */

import type { GmailMessage } from './gmailService'

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

export async function summarizeEmails(
  emails: GmailMessage[],
  apiKey: string,
): Promise<string> {
  if (emails.length === 0) return 'Nenhum email encontrado.'

  const emailList = emails
    .map((e, i) => `${i + 1}. De: ${e.from}\n   Assunto: ${e.subject}\n   Trecho: ${e.snippet}`)
    .join('\n\n')

  const prompt = `Você é um assistente pessoal. Analise os ${emails.length} emails mais recentes abaixo e gere um resumo executivo conciso em português brasileiro.

Destaque:
- O que precisa de atenção ou resposta urgente
- Reuniões ou compromissos mencionados
- Tópicos principais

Seja direto e objetivo. Máximo 4-5 linhas.

Emails:
${emailList}`

  const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 300,
      },
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`Gemini API error ${res.status}: ${err?.error?.message ?? res.statusText}`)
  }

  const data = await res.json()
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ??
    'Não foi possível gerar um resumo.'
  )
}
