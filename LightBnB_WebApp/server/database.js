const properties = require("./json/properties.json");
const users = require("./json/users.json");

const db = require('../db/index');
// const { Pool } = require("pg");

// const pool = new Pool({
//  user: "vagrant", 
//  password: "123", 
//  host: "localhost", 
//  database: "lightbnb"
// });

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
// const getUserWithEmail = function(email) {
//  let user;
//  for (const userId in users) {
//   user = users[userId];
//   if (user.email.toLowerCase() === email.toLowerCase()) {
//    break;
//   } else {
//    user = null;
//   }
//  }
//  return Promise.resolve(user);
// }
const getUserWithEmail = function(email) {
 return db
  .query(
   `
 SELECT *
 FROM users
 WHERE email = $1;`, 
   [`${email}`]
  )
  .then(res => res.rows[0])
  .catch(err => null);
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
// const getUserWithId = function(id) {
//  return Promise.resolve(users[id]);
// }
const getUserWithId = function(id) {
 return db
  .query(
   `
  SELECT *
  FROM users
  WHERE id = $1;`, 
   [`${id}`]
  )
  .then(res => res.rows[0])
  .catch(err => null);
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
// const addUser = function(user) {
//  const userId = Object.keys(users).length + 1;
//  user.id = userId;
//  users[userId] = user;
//  return Promise.resolve(user);
// }
const addUser = function(user) {
 return db
  .query(
   `
 INSERT INTO users (name, email, password)
 VALUES
 ($1, $2, $3)
 RETURNING *;`, 
   [`${user.name}`, `${user.email}`, `${user.password}`]
  )
  .then(res => res.rows[0])
  .catch(err => null);
};

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
 // return getAllProperties(null, 2);
 return db
  .query(
   ` SELECT reservations.*, properties.*, AVG(property_reviews.rating) as average_rating
    FROM reservations
    JOIN property_reviews ON property_reviews.id = reservations.property_id
    JOIN properties ON properties.id = reservations.property_id
    WHERE reservations.guest_id = $1 AND reservations.end_date < now()::date
    GROUP BY reservations.id, properties.id
    ORDER BY reservations.start_date DESC
    LIMIT $2;`, 
   [guest_id, limit]
  )
  .then(res => res.rows)
  .catch(err => null);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>} A promise to the properties.
 */
// const getAllProperties = function(options, limit = 10) {
//  const limitedProperties = {};
//  for (let i = 1; i <= limit; i++) {
//   limitedProperties[i] = properties[i];
//  }
//  return Promise.resolve(limitedProperties);
// }
// const getAllProperties = function(options, limit = 10) {
//  return db
//   .query(
//    `
//  SELECT * FROM properties
//  LIMIT $1
//  `, 
//    [limit]
//   )
//   .then(res => res.rows)
//   .catch(err => null);
// };

const getAllProperties = function(options, limit = 10) {

 // 1
 const queryParams = [];

 // 2
 let queryString =
 ` SELECT properties.*, AVG(property_reviews.rating) AS average_rating
  FROM properties
  FULL JOIN property_reviews ON properties.id = property_reviews.property_id `;

 // 3
 if (options.city) {
  queryParams.push(`%${options.city}%`);
  queryString += ` WHERE city LIKE $${queryParams.length} `;
 }

 if (options.owner_id) {
  queryParams.push(options.owner_id);
  queryString += ` AND owner_id = $${queryParams.length} `;
 }

 if (options.minimum_price_per_night && options.maximum_price_per_night) {
  queryParams.push(parseInt(options.minimum_price_per_night));
  queryString += ` AND cost_per_night >= $${queryParams.length} `;
  queryParams.push(parseInt(options.maximum_price_per_night));
  queryString += ` AND cost_per_night <= $${queryParams.length} `;
 }

 // 4
 queryString += ` GROUP BY properties.id `;
 if (options.minimum_rating) {
  queryParams.push(parseInt(options.minimum_rating));
  queryString += ` HAVING AVG(rating) >= $${queryParams.length} `;
 }
 queryParams.push(limit);
 queryString += ` ORDER BY cost_per_night
 LIMIT $${queryParams.length}; `;

 // 6
 console.log(queryString);

 return db
  .query(queryString, queryParams)
  .then(res => res.rows)
  .catch(err => null);
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
// const addProperty = function(property) {
//  const propertyId = Object.keys(properties).length + 1;
//  property.id = propertyId;
//  properties[propertyId] = property;
//  return Promise.resolve(property);
// };

const addProperty = function (property) {
 let queryParams = [property.owner_id, 
  property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street, property.city, property.province, property.post_code
 ];

 let queryString = `INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
 RETURNING *;`

return db.query(queryString, queryParams)
  .then(res => console.log(res.rows));
}
exports.addProperty = addProperty;
