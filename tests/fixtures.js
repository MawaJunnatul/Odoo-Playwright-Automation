// tests/fixtures.js
const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { CrmPipelinePage } = require('../pages/CrmPipelinePage');
const { OpportunityFormPage } = require('../pages/OpportunityFormPage');

exports.test = base.test.extend({
  loginPage:   async ({ page }, use) => { await use(new LoginPage(page)); },
  crmPage:     async ({ page }, use) => { await use(new CrmPipelinePage(page)); },
  formPage:    async ({ page }, use) => { await use(new OpportunityFormPage(page)); },
});
exports.expect = base.expect;