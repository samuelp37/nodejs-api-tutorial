const Customer = require("../models/customer.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Body cannot be empty for creating a customer."
    });
  }

  // Create a Customer
  const customer = new Customer({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Save Customer in the database
  Customer.create(customer, (err, resp) => {
    if (err){
      res.status(err.statusCode).send(
        {"message": err.message}
      );
    }
    else{
      res.send(
        {"data": resp.data}
      );
    }
  });

};