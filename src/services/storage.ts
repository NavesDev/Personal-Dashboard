/**
 * Storage service that wraps chrome.storage.local with a localStorage fallback
 * for development mode (when running outside of a Chrome Extension context).
 */

const isChromeExtension =
  typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local

export const storage = {
  async get<T>(key: string, fallback: T): Promise<T> {
    if (isChromeExtension) {
      return new Promise((resolve) => {
        chrome.storage.local.get(key, (result) => {
          resolve((result[key] !== undefined ? result[key] : fallback) as T)
        })
      })
    }
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  },

  async set<T>(key: string, value: T): Promise<void> {
    if (isChromeExtension) {
      return new Promise((resolve) => {
        chrome.storage.local.set({ [key]: value }, resolve)
      })
    }
    localStorage.setItem(key, JSON.stringify(value))
  },

  async remove(key: string): Promise<void> {
    if (isChromeExtension) {
      return new Promise((resolve) => {
        chrome.storage.local.remove(key, resolve)
      })
    }
    localStorage.removeItem(key)
  },
}
