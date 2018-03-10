const ProductPerOrder = require('./productPerOrder')
const Category = require('./category')
const Order = require('./order')
const Product = require('./product')
const Admin = require('./admin')
/**
 * Associations
 */

ProductPerOrder.belongsTo(Product, {foreignKey: 'productPerOrder_id'});
Product.hasMany(ProductPerOrder, {foreignKey: 'product_id'});

ProductPerOrder.belongsTo(Order, {foreignKey: 'productPerOrder_id'});
Order.hasMany(ProductPerOrder, {foreignKey: 'order_id'});


Category.hasMany(Product, {foreignKey: 'category_id'});
Product.belongsTo(Category, {foreignKey: 'product_id'});


module.exports = {
  Admin, Product, Order, Category, ProductPerOrder
}
