// pages/LoginPage.js
const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);                                    // runs BasePage's constructor
    this.emailInput    = page.locator('#login');    // Odoo's login form IDs
    this.passwordInput = page.locator('#password');
    this.loginButton   = page.getByRole('button', { name: 'Log in' });
    this.errorBox      = page.locator('.alert-danger');
  }

  async open() {
    await this.goto('/web/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectError() {
    await expect(this.errorBox).toBeVisible();
  }
}

module.exports = { LoginPage };