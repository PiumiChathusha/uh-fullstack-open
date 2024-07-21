const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http:localhost:3003/api/testing/reset')
        await request.post('http:localhost:3003/api/testing/data')

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('blogs')
        await expect(locator).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByTestId('username').fill('testuser')
            await page.getByTestId('password').fill('testuserpassword')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('Test User logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByTestId('username').fill('testuser')
            await page.getByTestId('password').fill('wrong')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('Wrong credentials')).toBeVisible()
        })
    })
})