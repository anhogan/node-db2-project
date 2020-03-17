
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { id: 1, vin: 012345678, make: 'Acura', model: 'TL', mileage: 35000, transmission: 'V6', title: 'Clean' },
        { id: 2, vin: 123456789, make: 'BMW', model: 'M3', mileage: 74500, transmission: 'V6', title: 'Salvage' },
        { id: 3, vin: 234567891, make: 'Chrysler', model: 'Pacifica', mileage: 21750, transmission: 'V8', title: 'Clean' }
      ]);
    });
};
