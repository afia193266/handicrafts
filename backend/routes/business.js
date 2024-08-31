const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const Favorite = require('../models/Favorite'); // Assuming you have a Favorite model

// Get all businesses
router.get('/', async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one business by ID
router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: 'Business not found' });
    res.json(business);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new business
router.post('/', async (req, res) => {
  const business = new Business({
    name: req.body.name,
    logo: req.body.logo,
    yearsOfOperation: req.body.yearsOfOperation,
    numberOfProducts: req.body.numberOfProducts,
    products: req.body.products
  });

  try {
    const newBusiness = await business.save();
    res.status(201).json(newBusiness);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Get all favorite businesses for a specific user
// router.get('/:userId', async (req, res) => {
//   try {
//     const favorites = await Favorite.find({ userId: req.params.userId }).populate('businessId');
//     res.json(favorites.map(fav => fav.businessId));
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Add a business to favorites
// router.post('/', async (req, res) => {
//   const favorite = new Favorite({
//     userId: req.body.userId,
//     businessId: req.body.businessId
//   });

//   try {
//     const newFavorite = await favorite.save();
//     res.status(201).json(newFavorite);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

module.exports = router;
