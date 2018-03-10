const db = require('./server/db');
require('./server/db/models');
const Category = require('./server/db/models/category');
const Product = require('./server/db/models/product');
const User = require('./server/db/models/user');
const Order = require('./server/db/models/order');
const Review = require('./server/db/models/review');

const categories = [
  {
    name: 'Shirts'
  },
  {
    name: 'Mugs'
  },
  {
    name: 'Furniture'
  }
]


const admins = [
  {username: 'sjhelba', password: 'testing123' },
  {username: 'smhelba', password: 'testing123' },
  {username: 'danWoodyR', password: 'testing123' },
]


const productDescription = 'This is a great product with dimensions and what not. Definitely buy this one.'



const products = [
  {name: 'Woody\'s Coffee Mug', price: 15, description: productDescription, img: '/img/box/1.jpg', inventoryQuantity: 5},
  {name: 'Steve\'s Coffee Mug', price: 12, description: productDescription, img: '/img/box/2.jpg', inventoryQuantity: 3},
  {name: 'Woody\'s T-Shirt', price: 17, description: productDescription, img: '/img/box/3.jpg', inventoryQuantity: 4},
  {name: 'Steve\'s T-Shirt', price: 13, description: productDescription, img: '/img/box/4.jpg', inventoryQuantity: 22},
  {name: 'Bean Bag Chair', price: 10, description: productDescription, img: '/img/box/5.jpg', inventoryQuantity: 3},
  {name: 'Inflatable Chair', price: 10, description: productDescription, img: '/img/box/6.jpg', inventoryQuantity: 2},
]



const orders = [{
  status: ['created', 'processing', 'cancelled', 'completed'][Math.floor(Math.random() * 4)],
  address: '234 Hey St',
  city: 'Los Angeles',
  state: 'CA',
  email: 'ttt@gmail.com'
},{
  status: ['created', 'processing', 'cancelled', 'completed'][Math.floor(Math.random() * 4)],
  address: '3445 Hope St',
  city: 'San Francisco',
  state: 'CA',
  email: 'tartr@gmail.com'
},{
  status: ['created', 'processing', 'cancelled', 'completed'][Math.floor(Math.random() * 4)],
  address: '1133 Lafayette St',
  city: 'San Diego',
  state: 'CA',
  email: 'aerhg@gmail.com'
},{
  status: ['created', 'processing', 'cancelled', 'completed'][Math.floor(Math.random() * 4)],
  address: '89754 Wilshire St',
  city: 'Los Angeles',
  state: 'CA',
  email: 'wtrbh@gmail.com'
},{
  status: ['created', 'processing', 'cancelled', 'completed'][Math.floor(Math.random() * 4)],
  address: '234 Hey St',
  city: 'Seattle',
  state: 'WA',
  email: 'yuts@gmail.com'
}]
// for (var i = 0; i < 5; i++) {
//   orders.push({status: ['created', 'processing', 'cancelled', 'completed'][Math.floor(Math.random() * 4)]})
// }


let seededBoxProducts, seededSightProducts, seededSmellProducts, seededTouchProducts, seededTasteProducts, seededSoundProducts, seededCategories


// The seeding promise chain that just won't quit.

const seed = () =>

//Products

  Promise.all(boxProducts.map(boxProduct =>
    Product.create(boxProduct)
  ))
  .then((createdBoxProducts) =>
    seededBoxProducts = createdBoxProducts
  )
  .then(() =>
    Promise.all(sightProducts.map(sightProduct =>
    Product.create(sightProduct)
    ))
  )
  .then((createdSightProducts) =>
    seededSightProducts = createdSightProducts
  )
  .then(() =>
    Promise.all(smellProducts.map(smellProduct =>
    Product.create(smellProduct)
    ))
  )
  .then((createdSmellProducts) =>
    seededSmellProducts = createdSmellProducts
  )
  .then(() =>
    Promise.all(tasteProducts.map(tasteProduct =>
    Product.create(tasteProduct)
    ))
  )
  .then((createdTasteProducts) =>
    seededTasteProducts = createdTasteProducts
  )
  .then(() =>
    Promise.all(touchProducts.map(touchProduct =>
    Product.create(touchProduct)
    ))
  )
  .then((createdTouchProducts) =>
    seededTouchProducts = createdTouchProducts
  )
  .then(() =>
    Promise.all(soundProducts.map(soundProduct =>
    Product.create(soundProduct)
    ))
  )
  .then((createdSoundProducts) =>
    seededSoundProducts = createdSoundProducts
  )

  // Users

  .then(() =>
    Promise.all(users.map(user =>
      User.create(user)
    ))
  )

  // Orders

  .then((createdUsers) =>
    Promise.all(orders.map(order =>
      createdUsers[Math.floor(Math.random() * createdUsers.length)].createOrder(order)
    ))
  )

  //Reviews is missing user and product detail, need to update for this.

  .then(() =>
    Promise.all(reviews.map(review =>
      Review.create(review)
    ))
  )

  .then(() =>
    Promise.all(categories.map(category =>
      Category.create(category)
    ))
  )
  .then((createdCategories) =>
    seededCategories = createdCategories
  )

// No error messages on product_category seeding, however it's swapping the id's when putting in the table. Need to troubleshoot this further

  .then(() =>
  Promise.all(seededBoxProducts.map(boxProduct =>
      boxProduct.addCategory(seededCategories[0], { through: 'product_category' })
    ))
  )
  .then(() =>
  Promise.all(seededSightProducts.map(sightProduct =>
      sightProduct.addCategory(seededCategories[1], { through: 'product_category' })
    ))
  )
  .then(() =>
  Promise.all(seededTasteProducts.map(tasteProduct =>
      tasteProduct.addCategory(seededCategories[2], { through: 'product_category' })
    ))
  )
  .then(() =>
  Promise.all(seededTouchProducts.map(touchProduct =>
      touchProduct.addCategory(seededCategories[3], { through: 'product_category' })
    ))
  )
  .then(() =>
  Promise.all(seededSoundProducts.map(soundProduct =>
      soundProduct.addCategory(seededCategories[4], { through: 'product_category' })
    ))
  )
  .then(() =>
  Promise.all(seededSmellProducts.map(smellProduct =>
      smellProduct.addCategory(seededCategories[5], { through: 'product_category' })
    ))
  )


const main = () => {
  console.log('Syncing db...');
  db.sync({force: true})
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
