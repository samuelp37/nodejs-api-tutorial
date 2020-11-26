const customers = require("../controllers/customer.controller.ts");

module.exports = app => {
  
    // Create a new Customer
    app.post("/customers", customers.create);

    // Retrieve a single Customer with customerId
    app.get("/customers/:customerId", customers.findById);
};