const Product = require("../models/ProductModel");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");

class ProductsController {
  //[GET]/products
  async getAllProducts(req, res) {
    try{

      const product = await Product.find()
      // res.json(product)
      res.render("products/list", {
        product: mutipleMongooseToObject(product),
      });
    }catch(error){
      res.status(400).json({error:'ERROR!!'})
    }
  }
  // [GET] /products/:id
  async getProductDetail(req, res) {
    try {
      const product = await Product.findById(req.params.slug);
      res.json(product);
      // res.render("products/detail", {
      //   product: mongooseToObject(product),
      // });
    } catch (error) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }

  // [GET] /product/create
  createProduct(req, res) {
    res.render('products/create')
  }

  //[POST] /products/store
  async storeProduct(req, res) {
    try {
      const product = new Product(req.body);
      await product.save()
      res.status(200).json({ message: 'create ok' });
      // res.redirect('/products')
    } catch (error) {
      res.status(400).json({ error: 'ERROR!!!' })
    }
  }

  //[GET] /products/update

  async updateProduct(req, res) {
    // res.send('s')
    try {
      const products = await Product.find();
      console.log(products);
      res.render("products/update", {
        products: mutipleMongooseToObject(products),
      });
    } catch (error) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }

  // editProduct(req,res){
  //   res.render('products/edit')

  // }
  async editProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id) //product.findById() => products (id == idT) ==> GET detail sản phẩm
      // res.json(product);
      res.render("products/edit", {
        product: mongooseToObject(product),
      });
    } catch (error) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }


  async update(req, res) {
    // res.json(req.body)
    try {
      const product = await Product.updateOne({ _id: req.params.id }, req.body)
      // console.log(({_id:req.params.id},req.body));
      res.status(200).json({ message: 'update ok' });
    } catch (error) {
      res.status(400).json({ error: "ERROR" })
    }

  }


  //[DELETE] products/:id
  // destroy(req,res){
  //     Product.deleteOne({_id:req.params.id})
  //     .then(()=>res.redirect('back'))
  //     .catch(error)
  // }
  // async deleteProduct(req, res) {
  //   try {
  //     const product = await Product.deleteOne({ _id: req.params.id });
  //     res.status(200).json({ message: 'ok' })
  //   }
  //   catch (error) {
  //     res.status(400).json({ error: 'ERROR!!!' });
  //   }
  // }


}

module.exports = new ProductsController();
