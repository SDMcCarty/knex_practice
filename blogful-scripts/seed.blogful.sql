BEGIN;

INSERT INTO blogful_articles 
  (title, date_published, content)
VALUES
  ('First Blog!', '2019-01-01 21:00:00', 'Firsts'),
  ('The Second Time Around', '2019-02-03 21:00:00', 'Second is the best'),
  ('Thrice Mine', '2019-03-03 21:00:00', 'The way to my heart'),
  ('Yon you say', '2019-04-04 21:00:00', 'Yon is yooooooooon'),
  ('Fivers', '2019-05-05 21:00:00', 'high fives all around'),
  ('Six-topia', '2019-06-06 21:00:00', 'Like five, but better'),
  ('Tetris Effect', '2019-07-07 21:00:00', 'Been listening to the soundtrack so much'),
  ('For real', '2019-08-08 21:00:00', 'I have the music stuck in my head'),
  ('But in my heart?', '2019-09-09 21:00:00', 'Yes. There too'),
  ('Gnat killer', '2019-10-10 21:00:00', 'That is my new profession'),
  ('We look up to the sky', '2019-11-11 21:00:00', 'to find out who we are'),
  ('To find out', '2019-12-12 21:00:00', 'who we are'),
  ('We look up', '2020-01-01 21:00:00', null),
  ('To find out who we are', '2020-02-02 21:00:00', null),
  ('Dolphin sound', now(), null),
  ('There is a level', now(), 'with weird balls'),
  ('They are fire', now(), 'and Ice'),
  ('I kid you now', now(), null),
  ('It is a real thing', now(), null),
  ('Thank gods', now(), 'I am done with this data');

COMMIT;