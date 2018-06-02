const routes = require('next-routes')();

routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:address', '/campaigns/show')
    .add('/campaigns/:address/expenses', '/campaigns/expenses/expense-index')
    .add('/campaigns/:address/expenses/new', '/campaigns/expenses/expense-new');

module.exports = routes;