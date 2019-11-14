SELECT reservations.*, properties.*, AVG(property_reviews.rating)
FROM reservations
  JOIN property_reviews ON property_reviews.id = reservations.property_id
  JOIN properties ON properties.id = reservations.property_id
WHERE reservations.guest_id = 1 AND reservations.end_date < now()::date
GROUP BY reservations.id, properties.id
ORDER BY reservations.start_date DESC
LIMIT 10;