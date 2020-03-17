
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('vehicles').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('vehicles').insert([
        { id: 1, vin: 'CAR012345678VIN12', make: 'Acura', model: 'TL', mileage: 35000, transmission: 'V6', title: 'Clean' },
        { id: 2, vin: 'CAR123456789VIN23', make: 'BMW', model: 'M3', mileage: 74500, transmission: 'V6', title: 'Salvage' },
        { id: 3, vin: 'CAR234567891VIN34', make: 'Chrysler', model: 'Pacifica', mileage: 21750, transmission: 'V8', title: 'Clean' }
      ]);
    });
};
