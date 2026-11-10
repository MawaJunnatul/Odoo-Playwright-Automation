// tests/opportunity.spec.js
const { test, expect } = require('./fixtures');
const { TestData } = require('../utils/TestData');

test.describe('CRM opportunities', () => {

  test.beforeEach(async ({ crmPage }) => {
    await crmPage.open();                       // runs before every test in this block
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      // Attach a screenshot to the HTML report when the test fails
      await testInfo.attach('failure-screenshot', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    }
  });

  test('create an opportunity and find it', { tag: '@smoke' }, async ({ crmPage }) => {
    const title = TestData.uniqueName();

    await test.step('Create the opportunity', async () => {
      await crmPage.createOpportunity(title);
    });

    await test.step('Search and verify it exists', async () => {
      await crmPage.search(title);
      await crmPage.expectOpportunityVisible(title);
    });
  });

    test('edit revenue and mark as won', async ({ crmPage, formPage }) => {
    const title = TestData.uniqueName('Deal');
    await crmPage.createOpportunity(title);
    await crmPage.openOpportunity(title);

    await formPage.setExpectedRevenue(5000);
    await formPage.save();
    await formPage.moveToStage('Qualified');
    await formPage.expectStage('Qualified');

    await formPage.markWon();
    await formPage.expectStage('Won');
  });

  test('search for a non-existent opportunity returns nothing', async ({ crmPage }) => {
    await crmPage.search('zzz_does_not_exist_999');
    await expect(crmPage.cards).toHaveCount(0);
  });
});