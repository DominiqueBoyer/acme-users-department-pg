const pg = require('pg');
const { Client } = pg;
const client = new Client('postgress://localhost/acme_department');
client.connect();

const it_uuid = uuid.v4();
const sales_uuid = uuid.v4();
const hr_uuid = uuid.v4();
const marketing_uuid = uuid.v4();

const moe_uuid = uuid.v4();

const SQL = `
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS department;

CREATE TABLE department(
    id UUID PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
  );

  CREATE TABLE user(
    id UUID PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    department_id UUID REFERENCES department(id)
  );

  INSERT INTO department(id, name) VALUES('${it_uuid}','IT');
  INSERT INTO department(id, name) VALUES('${sales_uuid}','IT');
  INSERT INTO department(id, name) VALUES('${hr_uuid}','IT');
  INSERT INTO department(id, name) VALUES('${marketing_uuid}','IT');

  INSERT INTO users(id, name, department_id) VALUES('${it_uuid}','moe', '${it_uuid}');
`;


module.exports = {

}
