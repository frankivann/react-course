// @ts-check
import { test, expect } from '@playwright/test'
import { PREFIX_CAT_ENDPOINT_IMAGE } from '../src/utils/constants.js'
const LOCALHOST_URL = 'http://localhost:5173/'

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  // Expect a title "to contain" a substring.
  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')

  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith(PREFIX_CAT_ENDPOINT_IMAGE)).toBeTruthy()
})
