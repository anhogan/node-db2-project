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

router.post('/', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', validateId, (req, res) => {

});

router.delete('/:id', validateId, (req, res) => {

});

router.put('/:id', validateId, (req, res) => {

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

module.exports = router;