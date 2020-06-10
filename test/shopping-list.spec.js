const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping List Service object`, () => {
  let db
  
  let testItems = [
    {
      id: 1,
      name: 'Bolphony sandwiches',
      price: "2.10",
      category: 'Lunch',
      checked: false,
      date_added: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: 2,
      name: 'Chili non-carne',
      price: "5.88",
      category: 'Main',
      checked: true,
      date_added: new Date('2029-11-22T16:28:32.615Z')
    },
    {
      id: 3,
      name: 'Dont go bacon my heart',
      price: "4.20", 
      category: 'Main',
      checked: false,
      date_added: new Date('2029-12-22T16:28:32.615Z')
    }
  ]

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.DB_URL,
    })
  })

  before(() => db('shopping_list').truncate())

  afterEach(() => db('shopping_list').truncate())

  after(() => db.destroy())



  context(`Given 'shopping_list' has items`, () => {
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testItems)
    })

    it(`.getAllItems() resolves all items from 'shopping_list'`, () => {
      //test that ShoppingListService.getAllItems gets data from table
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(testItems)
        })
    })

    it(`getById() resolves an item by id from 'shopping_list'`, () => {
      const thirdId = 3
      const thridTestItem = testItems[thirdId - 1]
      return ShoppingListService.getById(db, thirdId)
        .then(actual => {
          expect(actual).to.eql({
            id: thirdId,
            name: thridTestItem.name,
            price: thridTestItem.price,
            date_added: thridTestItem.date_added,
            category: thridTestItem.category,
            checked: thridTestItem.checked
          })
        })
    })

    it(`deleteItem() removes item from 'shopping_list'`, () => {
      const itemId = 3
      return ShoppingListService.deleteItem(db, itemId)
        .then(() => ShoppingListService.getAllItems(db))
        .then(allItems => {
          //copy the test items array w/o 'deleted' item
          const expected = testItems.filter(item => item.id !== itemId)
          expect(allItems).to.eql(expected)
        })
    })

    it(`updateItem() updates an item from 'shopping_list`, () => {
      const idOfItemToUpdate = 3
      const newItemData = {
        name: 'new name',
        price: '300.99',
        date_added: new Date(),
        checked: true,
      }
      const originalItem = testItems[idOfItemToUpdate - 1];
      return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
        .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
        .then(item => {
          expect(item).to.eql({
            id: idOfItemToUpdate,
            ...originalItem,
            ...newItemData,
          })
        })
    })
  })

  context(`Given 'shopping_list' has no data`, () => {
    it(`getAllItems() should return an empty array`, () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql([])
        })
    })

    it(`insertItem() adds new item to list and resolves new item with an 'id'`, () => {
      const newItem = {
        name: 'sammich',
        price: '4.55',
        date_added: new Date('2020-01-01T00:00:00.000Z'),
        category: 'Lunch',
        checked: false
      }
      return ShoppingListService.insertItem(db, newItem)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            name: newItem.name,
            price: newItem.price,
            date_added: newItem.date_added,
            category: newItem.category,
            checked: newItem.checked
          })
        })
    })
  })
})