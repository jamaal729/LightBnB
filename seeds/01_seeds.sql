\! clear
\c lightbnb;

DELETE FROM users;
DELETE FROM properties;
DELETE FROM reservations;
DELETE FROM property_reviews;

-- INSERT INTO users
--   (id, name, email, password)
-- VALUES
--   (1, 'jamaal1 ahmed', 'jja@jja.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
--   (2, 'jamaal2 ahmed', 'jja@jja.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
--   (3, 'jamaal3 ahmed', 'jja@jja.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- INSERT INTO properties
--   (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active )
-- VALUES
--   (1, 1, 'title', 'description', 'thumbnail_photo_url', 'cover_photo_url', 100, 100, 100, 100, 'Canada', 'Downtown', 'Calgary', 'AB', 'A01 A01', true),
--   (2, 1, 'title', 'description', 'thumbnail_photo_url', 'cover_photo_url', 100, 100, 100, 100, 'Canada', 'Downtown', 'Calgary', 'AB', 'A01 A01', true),
--   (3, 1, 'title', 'description', 'thumbnail_photo_url', 'cover_photo_url', 100, 100, 100, 100, 'Canada', 'Downtown', 'Calgary', 'AB', 'A01 A01', true);

-- INSERT INTO reservations
--   (id, start_date, end_date, property_id, guest_id)
-- VALUES
--   (1, '2019-01-01', '2019-01-01', 1, 1),
--   (2, '2019-01-01', '2019-01-01', 1, 1),
--   (3, '2019-01-01', '2019-01-01', 1, 1);

-- INSERT INTO property_reviews
--   (id, guest_id, property_id, reservation_id, rating, message)
-- VALUES
--   (1, 1, 1, 1, 0, 'message'),
--   (2, 1, 1, 1, 0, 'message'),
--   (3, 1, 1, 1, 0, 'message');

SELECT *
FROM users;
SELECT id, title, description
FROM properties;
SELECT *
FROM reservations;
SELECT *
FROM property_reviews;