export interface ApiKeys {
  gmail: string
  news: string
  finance: string
  calendar: string
  gemini: string
  geminiModel: string
}

export const defaultApiKeys: ApiKeys = {
  gmail: '',
  news: '',
  finance: '',
  calendar: '',
  gemini: '',
  geminiModel: 'gemini-1.5-flash',
}
