// pages/BasePage.js
const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
    this.notification = page.locator('.o_notification');   // Odoo's toast messages
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  // Odoo-specific: find a form field by its technical name
  field(name) {
    return this.page.locator(`.o_field_widget[name="${name}"]`);
  }

  async fillField(name, value) {
    await this.field(name).locator('input, textarea').first().fill(String(value));
  }

  async expectNotification(text) {
    await expect(this.notification.filter({ hasText: text })).toBeVisible();
  }

  async dismissPopupIfPresent() {
    // Optional popups may or may not appear. This avoids failing when they don't.
    const close = this.page.getByRole('button', { name: /close|got it|no thanks/i });
    if (await close.first().isVisible().catch(() => false)) {
      await close.first().click();
    }
  }
}

module.exports = { BasePage };