require('dotenv').config();
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function searchShoppingList(searchTerm) {
  /**
   * SELECT *
   *  FROM shopping_list
   * WHERE name ILIKE `%${searchTerm}%`
   */
  db
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result)
    })
};

searchShoppingList('wings')