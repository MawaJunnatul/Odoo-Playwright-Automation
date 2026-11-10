// tests/login.spec.js
const { test, expect } = require('./fixtures');
const { TestData } = require('../utils/TestData');

// These tests need to start logged OUT, so override the saved session
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('valid user can log in', { tag: '@smoke' }, async ({ page, loginPage }) => {
    await loginPage.login(TestData.admin.email, TestData.admin.password);
    await expect(page).not.toHaveURL(/login/);
  });

  test('wrong password shows an error', async ({ loginPage }) => {
    await loginPage.login(TestData.admin.email, 'wrong-pass-123');
    await loginPage.expectError();
  });

  test('empty credentials are rejected', async ({ page, loginPage }) => {
    await loginPage.login('', '');
    await expect(page).toHaveURL(/login/);
  });
});