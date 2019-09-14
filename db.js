const pg = require('pg');
const { Client } = pg;
const client = new Client('postgress://localhost/acme_department');
client.connect();


module.exports = {

}
