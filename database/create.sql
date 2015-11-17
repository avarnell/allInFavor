CREATE TABLE polls (
  id serial primary key,
  topic text,
  creator varchar(140),
  access_code varchar(15),
  anonymous boolean
);

CREATE TABLE votes (
  id serial primary key,
  poll_id int references polls(id) on delete cascade,
  name varchar(80),
  vote varchar(140)
);

CREATE TABLE options (
  id serial primary key,
  poll_id int references polls(id) on delete cascade,
  option_1 varchar(140),
  option_2 varchar(140),
  option_3 varchar(140),
  option_4 varchar(140),
  option_5 varchar(140)
);