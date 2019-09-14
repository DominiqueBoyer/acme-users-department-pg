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
    bio TEXT,
    department_id UUID REFERENCES department(id)
  );

  INSERT INTO department(id, name) VALUES('${it_uuid}','IT');
  INSERT INTO department(id, name) VALUES('${sales_uuid}','SALES');
  INSERT INTO department(id, name) VALUES('${hr_uuid}','HR');
  INSERT INTO department(id, name) VALUES('${marketing_uuid}','MARKETING');

  INSERT INTO users(id, name, bio, department_id) VALUES('${moe_uuid}','moe','Moe As a venture capitalist and an executive at several start-ups, Mark Gallion has different versions of his bio all over the internet. You can imagine some are more formal than others. But when it comes to his Twitter bio, he carefully phrased his information in a way that helps him connect with his audience -- specifically, through the use of humor' , '${it_uuid}');
  INSERT INTO users(id, name, bio, department_id) VALUES('${larry_uuid}','larry', 'Larry brand name is Miss604, and cleverly uses emojis in her Instagram bio to tell visitors exactly what makes her a valuable content creator. Take a look in the screenshot below.', '${sales_uuid}');
  INSERT INTO users(id, name, bio, department_id) VALUES('${curly_uuid}','curly', 'If you are a marketer, you hve likely heard of Curly. Her list of credentials is lengthy, and if she really wanted to, she could go on and on and on about her accomplishments.', '${hr_uuid}');
  INSERT INTO users(id, name, bio) VALUES('${shep_uuid}','shep', 'If you are a marketer, you have likely heard of Shep. Her list of credentials is lengthy, and if she really wanted to, she could go on and on and on about her accomplishments.');

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
