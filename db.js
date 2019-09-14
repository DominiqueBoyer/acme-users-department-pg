const pg = require('pg');
const uuid = require('uuid');
const { Client } = pg;
const client = new Client('postgress://localhost/acme_department');
client.connect();

const it_uuid = uuid.v4();
const sales_uuid = uuid.v4();
const hr_uuid = uuid.v4();
const marketing_uuid = uuid.v4();

const moe_uuid = uuid.v4();
const larry_uuid = uuid.v4();
const curly_uuid = uuid.v4();
const shep_uuid = uuid.v4();


const SQL = `
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS department;

CREATE TABLE department(
    id UUID PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
  );

  CREATE TABLE users(
    id UUID PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    department_id UUID REFERENCES department(id)
  );

  INSERT INTO department(id, name) VALUES('${it_uuid}','IT');
  INSERT INTO department(id, name) VALUES('${sales_uuid}','SALES');
  INSERT INTO department(id, name) VALUES('${hr_uuid}','HR');
  INSERT INTO department(id, name) VALUES('${marketing_uuid}','MARKETING');

  INSERT INTO users(id, name, department_id) VALUES('${moe_uuid}','moe', '${it_uuid}');
  INSERT INTO users(id, name, department_id) VALUES('${larry_uuid}','larry', '${sales_uuid}');
  INSERT INTO users(id, name, department_id) VALUES('${curly_uuid}','curly', '${hr_uuid}');
  INSERT INTO users(id, name) VALUES('${shep_uuid}','shep');

`;

const sync =  async () => {
  await client.query(SQL);
  console.log('sucess');
};

const getAllUsers = async ()=>{
  const response = await client.query('SELECT * FROM users');
  return response.rows
};

const getAllDepartments = async ()=> {
  const response = await client.query('SELECT * FROM department');
  return response.rows
};

module.exports = {
  sync,
  getAllUsers,
  getAllDepartments

}

sync();
