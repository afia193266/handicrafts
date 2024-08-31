const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite'); // Correct path to the Favorite model

// Get all favorite businesses for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.params.userId }).populate('businessId');
    res.json(favorites.map(fav => fav.businessId));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a business to favorites
router.post('/', async (req, res) => {
  const favorite = new Favorite({
    userId: req.body.userId,
    businessId: req.body.businessId
  });

  try {
    const newFavorite = await favorite.save();
    res.status(201).json(newFavorite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
