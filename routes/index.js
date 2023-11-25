const products = require('./products')
const users = require('./users')



function routes(app) {
    app.use('/users', users)
    app.use('/products', products)
  
}

module.exports = routes

