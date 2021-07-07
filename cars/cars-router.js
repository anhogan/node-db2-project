const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.post('/', validateCar, uniqueVIN, (req, res) => {
  db('vehicles').insert(req.body)
    .then(id => {
      db('vehicles').where({ id: id[0] })
        .then(newCar => {
          res.status(201).json({ data: newCar });
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ message: "The car information could not be retrieved" });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The car could not be created" });
    });
});

router.get('/', (req, res) => {
  db('vehicles')
    .then(cars => {
      res.status(200).json({ data: cars });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The car information could not be retrieved" });
    });
});

router.get('/:id', validateId, (req, res) => {
  db('vehicles').where({ id: req.params.id }).first()
    .then(car => {
      res.status(200).json({ data: car });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The car information could not be retrieved" });
    });
});

router.delete('/:id', validateId, (req, res) => {
  db('vehicles').where({ id: req.params.id }).first().del()
    .then(count => {
      if (count > 0) {
        db('vehicles')
          .then(cars => {
            res.status(200).json({ data: cars });
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The car information could not be retrieved" });
          });
      };
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The car could not be deleted" });
    });
});

router.put('/:id', validateId, uniqueVIN, (req, res) => {
  db('vehicles').where({ id: req.params.id }).update(req.body)
    .then(count => {
      if (count > 0) {
        db('vehicles').where({ id: req.params.id }).first()
          .then(car => {
            res.status(200).json({ data: car });
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The car information could not be retrieved" });
          });
      };
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The car could not be updated" });
    })
});

function validateId(req, res, next) {
  db('vehicles').where({ id: req.params.id }).first()
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
  db('vehicles')
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