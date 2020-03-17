const express = require('express');
const knex = require('knex');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/car-dealer.db3'
  },
  useNullAsDefault: true
});

const router = express.Router();

router.post('/', validateCar, uniqueVIN, (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', validateId, (req, res) => {

});

router.delete('/:id', validateId, (req, res) => {

});

router.put('/:id', validateId, validateCar, uniqueVIN, (req, res) => {

});

function validateId(req, res, next) {
  db('cars').where({ id: req.params.id }).first()
    .then(car => {
      if (!car) {
        res.status(404).json({ message: "Invalid car id" });
      } else {
        next();
      };
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The car information could not be retrieved" });
    });
};

function validateCar(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing car data" });
  } else if (!req.body.vin || !req.body.make || !req.body.model || !req.body.mileage) {
    res.status(400).json({ message: "Each car must have a VIN, Make, Model, and Mileage listed" });
  } else {
    next();
  };
};

function uniqueVIN(req, res, next) {
  db('cars')
    .then(cars => {
      const taken = cars.filter((car) => {
        return car.vin === req.body.vin
      });
      if (taken.length > 0) {
        res.status(400).json({ message: "That VIN is already taken, please choose a unique value" });
      } else {
        next();
      };
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The car information could not be retrieved" });
    });
};

module.exports = router;