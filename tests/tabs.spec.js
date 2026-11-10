// tests/tabs.spec.js
const { test, expect } = require('./fixtures');

test('documentation link opens in a new tab', async ({ page, context, crmPage }) => {
  await crmPage.open();
  await page.locator('.o_user_menu').click();

  const [docTab] = await Promise.all([
    context.waitForEvent('page'),                                    // listen first...
    page.getByRole('menuitem', { name: 'Documentation' }).click(),   // ...then trigger
  ]);

  await docTab.waitForLoadState();
  await expect(docTab).toHaveURL(/odoo\.com/);
  await docTab.close();
  await page.bringToFront();                                         // back to the original tab
  await expect(page.locator('.o_user_menu')).toBeVisible();
});