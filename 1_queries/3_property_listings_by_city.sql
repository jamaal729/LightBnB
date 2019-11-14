SELECT properties.id, properties.title, properties.cost_per_night, AVG(property_reviews.rating) AS average_rating
FROM properties
  JOIN property_reviews on property_id = properties.id
WHERE city LIKE '%ancouver'
GROUP BY properties.id
HAVING AVG( property_reviews.rating) >= 4
ORDER BY cost_per_night ASC
LIMIT 10;