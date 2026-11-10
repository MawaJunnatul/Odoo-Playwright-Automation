const { test: setup } = require('./fixtures');
const { expect } = require('@playwright/test');
const { TestData } = require('../utils/TestData');

setup('login and save session', async ({ page, loginPage }) => {
  await loginPage.open();
  await loginPage.login(TestData.admin.email, TestData.admin.password);
  await expect(page).toHaveURL(/odoo|web/);
  await page.context().storageState({ path: '.auth/user.json' });
});