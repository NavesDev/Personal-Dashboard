/**
 * Gemini Service
 * Calls the Gemini API to summarize a list of email snippets.
 */

import type { GmailMessage } from './gmailService'

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models'

export async function summarizeEmails(
  emails: GmailMessage[],
  apiKey: string,
  model = 'gemini-1.5-flash',
): Promise<string> {
  if (emails.length === 0) return 'Nenhum email encontrado.'

  const emailList = emails
    .map((e, i) => `${i + 1}. De: ${e.from}\n   Assunto: ${e.subject}\n   Trecho: ${e.snippet}`)
    .join('\n\n')

  const prompt = `Você é um assistente pessoal altamente eficiente. Analise os ${emails.length} emails mais recentes abaixo.
  
Sua tarefa:
1. Ignore notificações inúteis (ex: TikTok, redes sociais, spam, promoções irrelevantes).
2. Se TODOS os emails forem inúteis, responda exatamente: "Nenhum email importante no momento. Só notificações de rotina e promoções."
3. Caso contrário, filtre e agrupe apenas o que é importante (trabalho, reuniões, cobranças, mensagens reais).
4. Escreva um resumo estruturado e direto ao ponto. Use Markdown.
5. Destaque o que exija ação imediata.

Emails:
${emailList}`

  const res = await fetch(`${GEMINI_API_BASE}/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 800,
      },
    }),
  })

  if (!res.ok) {
    if (res.status === 429) {
      throw new Error(`A cota do modelo ${model} excedeu. Tente alterar o modelo nas configurações.`)
    }
    const err = await res.json().catch(() => ({}))
    throw new Error(`Gemini API error ${res.status}: ${err?.error?.message ?? res.statusText}`)
  }

  const data = await res.json()
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ??
    'Não foi possível gerar um resumo.'
  )
}
