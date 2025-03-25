/*TEST denna kod ska ändras till djali*/

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        text: true,
        required: true,
        trim: true,
        unique: true
    }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;