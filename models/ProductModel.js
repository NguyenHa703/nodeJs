const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 600 },
    content: { type: String},
    image: { type: String, maxLe0ngth: 255 },
    price: { type: Number}, 
    slug: {type: String, slug: 'name', unique: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', Product);