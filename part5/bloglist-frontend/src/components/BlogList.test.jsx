import { render, screen } from '@testing-library/react'
import BlogList from './BlogList'
import { describe } from 'vitest'
import userEvent from '@testing-library/user-event'
import React from 'react'

describe('Blog List', () => {
    test('renders title and author', () => {
        const blog = {
            'title': 'Go To Statement Considered Harmful',
            'author': 'Edsger W. Dijkstra',
            'url': 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            'likes': 12,
            'user': {
                'username': 'piumi',
                'name': 'piumi',
                'id': '669bb34014a246851fef2a07'
            },
            'id': '669bbe1a6f337a16b15070df'
        }

        render(<BlogList blogs={[blog]} />)

        const element = screen.getByText(`${blog.title} ${blog.author}`)
        expect(element).toBeDefined()
    })

    test('renders url and likes on view click', async () => {
        const blog = {
            'title': 'Go To Statement Considered Harmful',
            'author': 'Edsger W. Dijkstra',
            'url': 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            'likes': 12,
            'user': {
                'username': 'piumi',
                'name': 'piumi',
                'id': '669bb34014a246851fef2a07'
            },
            'id': '669bbe1a6f337a16b15070df'
        }

        render(<BlogList blogs={[blog]} />)

        const user = userEvent.setup()
        const viewButton = screen.getByText('View')
        await user.click(viewButton)

        const urlElement = screen.getByText(`${blog.url}`)
        expect(urlElement).toBeDefined()

        const likesElement = screen.getByText(`likes : ${blog.likes}`)
        expect(likesElement).toBeDefined()
    })


    test('test 5.15', async () => {
        const blog = {
            'title': 'Go To Statement Considered Harmful',
            'author': 'Edsger W. Dijkstra',
            'url': 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            'likes': 12,
            'user': {
                'username': 'piumi',
                'name': 'piumi',
                'id': '669bb34014a246851fef2a07'
            },
            'id': '669bbe1a6f337a16b15070df'
        }

        const mockHandler = vi.fn()

        render(<BlogList blogs={[blog]} onBlogLike={mockHandler}/>)

        const user = userEvent.setup()

        const viewButton = screen.getByText('View')
        await user.click(viewButton)

        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})

