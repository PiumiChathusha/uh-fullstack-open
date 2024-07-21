import { render, screen } from '@testing-library/react'
import NewBlog from './NewBlog'
import { describe } from 'vitest'
import userEvent from '@testing-library/user-event'
import React from 'react'

describe('Blog List', () => {
  test('new blog cretae', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<NewBlog onBlogAdd={createBlog} />)

    const newBlogButton = screen.getByText('new blog')
    await user.click(newBlogButton)

    const inputs = screen.getAllByRole('textbox')
    const saveButton = screen.getByText('create')

    await user.type(inputs[0], 'test_title')
    await user.type(inputs[1], 'test_author')
    await user.type(inputs[2], 'test_url')
    await user.click(saveButton)

    console.log(createBlog.mock.calls)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('test_title')
    expect(createBlog.mock.calls[0][0].author).toBe('test_author')
    expect(createBlog.mock.calls[0][0].url).toBe('test_url')
  })
})

