const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class OpportunityFormPage extends BasePage {
  constructor(page) {
    super(page);
    this.wonButton  = page.getByRole('button', { name: 'Won', exact: true });
    this.statusBar  = page.locator('.o_statusbar_status');
    this.saveButton = page.locator('.o_form_button_save');
    this.rainbowMan = page.locator('.o_reward');          // Odoo's celebration popup
  }

  async setExpectedRevenue(amount) {
    await this.fillField('expected_revenue', amount);
  }

  async moveToStage(stageName) {
    await this.statusBar.locator('button').filter({ hasText: stageName }).click();
  }

  async markWon() {
    await this.wonButton.click();
    await expect(this.rainbowMan).toBeHidden({ timeout: 10000 });   // wait for the popup to fade
  }

  async save() {
    if (await this.saveButton.isVisible().catch(() => false)) {
      await this.saveButton.click();
    }
  }

  async expectStage(stageName) {
    await expect(this.statusBar.locator('button.o_arrow_button_current'))
      .toContainText(stageName);
  }
}

module.exports = { OpportunityFormPage };