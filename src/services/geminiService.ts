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

  const prompt = `Você é um assistente pessoal encarregado de ler a caixa de entrada do usuário. Analise os ${emails.length} emails mais recentes abaixo.
  
Sua tarefa:
1. Faça um resumo abrangente e detalhado cobrindo o máximo de informações úteis de TODOS os emails.
2. Agrupe o resumo por categorias claras (ex: 🔴 Urgente/Ação Necessária, 💼 Trabalho/Projetos, 🔔 Atualizações/Notificações, etc.).
3. Não ignore emails a menos que sejam puramente lixo eletrônico. Redes sociais, YouTube e outras atualizações podem ser incluídos de forma mais breve na categoria "Outros".
4. Seja rico em detalhes: inclua nomes de remetentes, assuntos principais e contexto, para que o usuário saiba exatamente do que se trata sem abrir o email.
5. Formate usando Markdown, com títulos (H3), negritos e listas para facilitar a leitura.

Emails:
${emailList}`

  const res = await fetch(`${GEMINI_API_BASE}/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1200,
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
