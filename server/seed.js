require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// Sample Data for Akruti
const sampleProducts = [
  {
    name: "Articulated Dragon",
    description: "A fully flexible 3D printed dragon toy.",
    price: 499,
    category: "Toys",
    material: "PLA Silk",
    imageUrl: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=500"
  },
  {
    name: "Geometric Planter",
    description: "Modern minimalist planter for succulents.",
    price: 299,
    category: "Home Decor",
    material: "Matte PLA",
    imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500"
  },
  {
    name: "Headphone Stand",
    description: "Sturdy desk mount for gaming headphones.",
    price: 349,
    category: "Accessories",
    material: "PETG",
    imageUrl: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500"
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to DB');
    // Clear old data to avoid duplicates
    await Product.deleteMany({});
    // Insert new data
    await Product.insertMany(sampleProducts);
    console.log('✅ Products Added Successfully!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });