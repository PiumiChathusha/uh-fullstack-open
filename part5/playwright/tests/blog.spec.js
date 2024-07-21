const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('When logged in', () => {

    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/testing/data')


        await page.goto('http://localhost:5173')

        await page.getByTestId('username').fill('testuser')
        await page.getByTestId('password').fill('testuserpassword')
        await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()

        await page.getByTestId('title').fill('test_title')
        await page.getByTestId('author').fill('test_author')
        await page.getByTestId('url').fill('test_url')

        await page.getByRole('button', { name: 'create' }).click()

        await expect(page.getByText('a new blog test_title by test_author added')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'View' }).nth(0).click()

        const likeCount = Number((await page.getByTestId('likecount').allInnerTexts())[0])

        await page.getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(500)

        await expect(page.getByText(`likes : ${likeCount + 1}`)).toBeVisible()

    })

    test('a blog can be deleted', async ({ page }) => {
        await page.getByRole('button', { name: 'View' }).nth(0).click()

        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText('Removed blog Canonical string reduction by Edsger W. Dijkstra')).toBeVisible()
    })

    describe('a blog can be deleted by the owner', () => {

        test('can delete by owner', async ({ page }) => {
            await page.getByRole('button', { name: 'View' }).nth(0).click()

            await expect(page.getByText('remove')).toBeVisible()
        })

        test('cannot delete by other', async ({ page, request }) => {
            await page.getByRole('button', { name: 'logout' }).click()

            await request.post('http://localhost:3003/api/users', {
                data: {
                    username: 'testuser2',
                    name: 'Test User 2',
                    password: 'testuserpassword2'
                }
            })

            await page.getByTestId('username').fill('testuser2')
            await page.getByTestId('password').fill('testuserpassword2')
            await page.getByRole('button', { name: 'login' }).click()

            await page.getByRole('button', { name: 'View' }).nth(0).click()

            await expect(page.getByText('remove')).toBeHidden()
        })

    })

    test('blogs sorted according to likes', async ({ page, request }) => {
        await page.waitForTimeout(500)

        const renderedBlogs = await page.getByTestId('blog-title').allInnerTexts()

        // get blogs from server and sort
        const blogResponse = await request.get('http://localhost:3003/api/blogs')
        let blogs = await blogResponse.json()
        blogs = blogs.sort((a, b) => b.likes - a.likes).map((b)=> `${b.title} ${b.author}`)

        expect(renderedBlogs).toEqual(blogs)
    })
})