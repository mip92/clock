create TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    clockSize INTEGER,
    city VARCHAR(255),
    time DATE,
)

create TABLE master(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE
);

create TABLE city(
    id SERIAL PRIMARY KEY,
    city_name VARCHAR(255) UNIQUE,
    master_id INTEGER,
    FOREIGN key (master_id) REFERENCES master(id)
);