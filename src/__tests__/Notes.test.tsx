import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Notes from '@/components/Notes'

// Mock useStorage
let mockNotes = ''
const mockSetNotes = vi.fn((val) => {
  mockNotes = typeof val === 'function' ? val(mockNotes) : val
})

vi.mock('@/hooks/useStorage', () => ({
  useStorage: () => [mockNotes, mockSetNotes, true],
}))

describe('Notes', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    mockNotes = ''
    mockSetNotes.mockClear()
  })

  it('renders the Notas heading', () => {
    render(<Notes />)
    expect(screen.getByText('Notas')).toBeInTheDocument()
  })

  it('renders a textarea', () => {
    render(<Notes />)
    const textarea = screen.getByPlaceholderText('Escreva suas notas aqui...')
    expect(textarea).toBeInTheDocument()
  })

  it('updates textarea on typing', () => {
    render(<Notes />)
    const textarea = screen.getByPlaceholderText('Escreva suas notas aqui...') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Hello world' } })
    expect(textarea.value).toBe('Hello world')
  })

  it('debounces save - does not save immediately', () => {
    render(<Notes />)
    const textarea = screen.getByPlaceholderText('Escreva suas notas aqui...')
    fireEvent.change(textarea, { target: { value: 'typing...' } })
    expect(mockSetNotes).not.toHaveBeenCalled()
  })

  it('saves after debounce timeout', () => {
    render(<Notes />)
    const textarea = screen.getByPlaceholderText('Escreva suas notas aqui...')
    fireEvent.change(textarea, { target: { value: 'saved text' } })

    act(() => {
      vi.advanceTimersByTime(400)
    })

    expect(mockSetNotes).toHaveBeenCalledWith('saved text')
  })

  it('resets debounce timer on rapid typing', () => {
    render(<Notes />)
    const textarea = screen.getByPlaceholderText('Escreva suas notas aqui...')

    fireEvent.change(textarea, { target: { value: 'a' } })
    act(() => { vi.advanceTimersByTime(200) })

    fireEvent.change(textarea, { target: { value: 'ab' } })
    act(() => { vi.advanceTimersByTime(200) })

    // Should not have saved yet (timer was reset)
    expect(mockSetNotes).not.toHaveBeenCalled()

    act(() => { vi.advanceTimersByTime(200) })

    // Now it should save the latest value
    expect(mockSetNotes).toHaveBeenCalledWith('ab')
  })
})
