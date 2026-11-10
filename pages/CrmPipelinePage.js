const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class CrmPipelinePage extends BasePage {
  constructor(page) {
    super(page);
    this.newButton   = page.locator('.o_kanban_button_new');
    this.quickCreate = page.locator('.o_kanban_quick_create');
    this.cards       = page.locator('.o_kanban_record:not(.o_kanban_ghost)');
    this.searchInput = page.locator('.o_searchview_input');
  }

  async open() {
    await this.goto('/odoo/crm');                        // go straight to the CRM app
    await expect(this.newButton).toBeVisible({ timeout: 20000 });
  }

  async createOpportunity(title) {
    await this.newButton.click();
    await expect(this.quickCreate).toBeVisible();
    await this.quickCreate.getByPlaceholder('e.g. Product Pricing').fill(title);
    await this.quickCreate.getByRole('button', { name: 'Add' }).click();
    await expect(this.cardByTitle(title)).toBeVisible();
  }

  async search(text) {
    await this.searchInput.fill(text);
    await this.searchInput.press('Enter');
  }

  cardByTitle(title) {
    return this.cards.filter({ hasText: title });
  }

  async expectOpportunityVisible(title) {
    await expect(this.cardByTitle(title)).toHaveCount(1);
  }

  async openOpportunity(title) {
    await this.cardByTitle(title).click();
  }
}

module.exports = { CrmPipelinePage };