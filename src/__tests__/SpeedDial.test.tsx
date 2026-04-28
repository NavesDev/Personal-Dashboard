import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SpeedDial from '@/components/SpeedDial'

// Mock useStorage
const mockLinks: { id: string; title: string; url: string }[] = []
const mockSetLinks = vi.fn((updater) => {
  if (typeof updater === 'function') {
    const result = updater(mockLinks)
    mockLinks.length = 0
    mockLinks.push(...result)
  }
})

vi.mock('@/hooks/useStorage', () => ({
  useStorage: () => [mockLinks, mockSetLinks, true],
}))

describe('SpeedDial', () => {
  beforeEach(() => {
    mockLinks.length = 0
    mockSetLinks.mockClear()
  })

  it('renders the Favoritos heading', () => {
    render(<SpeedDial />)
    expect(screen.getByText('Favoritos')).toBeInTheDocument()
  })

  it('shows empty state when no links', () => {
    render(<SpeedDial />)
    expect(screen.getByText('Sem favoritos')).toBeInTheDocument()
  })

  it('shows the add form when clicking Novo', () => {
    render(<SpeedDial />)
    fireEvent.click(screen.getByText('Novo'))
    expect(screen.getByTestId('speed-dial-form')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Título')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('URL')).toBeInTheDocument()
  })

  it('hides the form when clicking Cancelar', () => {
    render(<SpeedDial />)
    fireEvent.click(screen.getByText('Novo'))
    fireEvent.click(screen.getByText('Cancelar'))
    expect(screen.queryByTestId('speed-dial-form')).not.toBeInTheDocument()
  })

  it('adds a link with title and URL', () => {
    render(<SpeedDial />)
    fireEvent.click(screen.getByText('Novo'))

    fireEvent.change(screen.getByPlaceholderText('Título'), {
      target: { value: 'GitHub' },
    })
    fireEvent.change(screen.getByPlaceholderText('URL'), {
      target: { value: 'github.com' },
    })
    fireEvent.submit(screen.getByTestId('speed-dial-form'))

    expect(mockSetLinks).toHaveBeenCalled()
    // Verify the updater function was called
    const updater = mockSetLinks.mock.calls[0][0]
    const result = updater([])
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('GitHub')
    expect(result[0].url).toBe('https://github.com')
  })

  it('auto-prepends https:// to URLs without protocol', () => {
    render(<SpeedDial />)
    fireEvent.click(screen.getByText('Novo'))

    fireEvent.change(screen.getByPlaceholderText('Título'), {
      target: { value: 'Test' },
    })
    fireEvent.change(screen.getByPlaceholderText('URL'), {
      target: { value: 'example.com' },
    })
    fireEvent.submit(screen.getByTestId('speed-dial-form'))

    const updater = mockSetLinks.mock.calls[0][0]
    const result = updater([])
    expect(result[0].url).toBe('https://example.com')
  })

  it('does not add link with empty title', () => {
    render(<SpeedDial />)
    fireEvent.click(screen.getByText('Novo'))

    fireEvent.change(screen.getByPlaceholderText('URL'), {
      target: { value: 'github.com' },
    })
    fireEvent.submit(screen.getByTestId('speed-dial-form'))

    expect(mockSetLinks).not.toHaveBeenCalled()
  })

  it('does not add link with empty URL', () => {
    render(<SpeedDial />)
    fireEvent.click(screen.getByText('Novo'))

    fireEvent.change(screen.getByPlaceholderText('Título'), {
      target: { value: 'Test' },
    })
    fireEvent.submit(screen.getByTestId('speed-dial-form'))

    expect(mockSetLinks).not.toHaveBeenCalled()
  })

  it('removes a link when clicking the remove button', () => {
    mockLinks.push({ id: 'abc', title: 'GitHub', url: 'https://github.com' })
    render(<SpeedDial />)

    const removeBtn = screen.getByLabelText('Remover GitHub')
    fireEvent.click(removeBtn)

    expect(mockSetLinks).toHaveBeenCalled()
    const updater = mockSetLinks.mock.calls[0][0]
    const result = updater([{ id: 'abc', title: 'GitHub', url: 'https://github.com' }])
    expect(result).toHaveLength(0)
  })
})
