import { describe, it, expect, beforeEach } from 'vitest'
import { storage } from '@/services/storage'

describe('storage service', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('get', () => {
    it('returns fallback when key does not exist', async () => {
      const result = await storage.get('nonexistent', 'default')
      expect(result).toBe('default')
    })

    it('returns stored value when key exists', async () => {
      localStorage.setItem('mykey', JSON.stringify('stored-value'))
      const result = await storage.get('mykey', 'default')
      expect(result).toBe('stored-value')
    })

    it('returns complex objects', async () => {
      const obj = { name: 'test', items: [1, 2, 3] }
      localStorage.setItem('obj', JSON.stringify(obj))
      const result = await storage.get('obj', {})
      expect(result).toEqual(obj)
    })
  })

  describe('set', () => {
    it('stores a string value', async () => {
      await storage.set('key1', 'value1')
      expect(localStorage.getItem('key1')).toBe(JSON.stringify('value1'))
    })

    it('stores an object value', async () => {
      const obj = { a: 1, b: 'two' }
      await storage.set('key2', obj)
      expect(JSON.parse(localStorage.getItem('key2')!)).toEqual(obj)
    })

    it('stores an array value', async () => {
      const arr = [1, 2, 3]
      await storage.set('key3', arr)
      expect(JSON.parse(localStorage.getItem('key3')!)).toEqual(arr)
    })
  })

  describe('remove', () => {
    it('removes an existing key', async () => {
      localStorage.setItem('toRemove', '"value"')
      await storage.remove('toRemove')
      expect(localStorage.getItem('toRemove')).toBeNull()
    })

    it('does not throw when removing nonexistent key', async () => {
      await expect(storage.remove('nope')).resolves.toBeUndefined()
    })
  })
})
