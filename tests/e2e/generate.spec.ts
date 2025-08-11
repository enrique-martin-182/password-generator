import { test, expect } from '@playwright/test';

test('generate and copy password', async ({ page }) => {
  await page.goto('/');
  // ensure default controls are present
  await expect(page.getByRole('heading', { name: /Generador de contraseñas/i })).toBeVisible();

  // generate password
  await page.getByRole('button', { name: /Generar contraseña/i }).click();
  const input = page.getByLabel('Contraseña generada');
  await expect(input).toBeVisible();
  const password = await input.inputValue();
  expect(password.length).toBeGreaterThan(0);

  // click copiar (copy) and assert toast appears
  await page.getByRole('button', { name: /Copiar contraseña/i }).click();
  await expect(page.locator('text=Copiado al portapapeles')).toBeVisible();
});
