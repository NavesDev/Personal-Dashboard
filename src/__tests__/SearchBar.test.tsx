import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '@/components/SearchBar'

const PLACEHOLDER = 'Pesquisar...'

describe('SearchBar', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '' },
    })
  })

  it('renders the search input', () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText(PLACEHOLDER)
    expect(input).toBeInTheDocument()
  })

  it('has autoFocus on the input', () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText(PLACEHOLDER)
    expect(input.tagName).toBe('INPUT')
  })

  it('updates input value on typing', async () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'react hooks' } })
    expect(input.value).toBe('react hooks')
  })

  it('redirects to Google on form submit', () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText(PLACEHOLDER)
    fireEvent.change(input, { target: { value: 'vitest tutorial' } })
    fireEvent.submit(input.closest('form')!)
    expect(window.location.href).toBe(
      'https://www.google.com/search?q=vitest%20tutorial',
    )
  })

  it('does not redirect on empty query', () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText(PLACEHOLDER)
    fireEvent.submit(input.closest('form')!)
    expect(window.location.href).toBe('')
  })

  it('does not redirect on whitespace-only query', () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText(PLACEHOLDER)
    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.submit(input.closest('form')!)
    expect(window.location.href).toBe('')
  })

  it('clears input on Escape key', () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'something' } })
    fireEvent.keyDown(input, { key: 'Escape' })
    expect(input.value).toBe('')
  })
})
