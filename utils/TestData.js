class TestData {
  static uniqueName(prefix = 'Opp') {
    return `${prefix}_${Date.now()}`;
  }

  static get admin() {
    return {
      email: process.env.ODOO_USER,
      password: process.env.ODOO_PASS,
    };
  }
}

module.exports = { TestData };