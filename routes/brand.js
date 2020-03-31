const router = require('express').Router();
const brandServices = require('./../services/brand');

router.post('/', async (req, res) => {
  if (!req.body.name) res.status(400).json({message: "brand is required"});
  const brand = brandServices.brandObject(req.body);
  try {
    const saveBrand = await brandServices.saveBrand(brand);
    res.status(201).json({ message: saveBrand });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const brand = await brandServices.getAllBrands();
    if (!brand) {
      return res.status(400).json({ message: 'brand not found..' });
    }
    res.status(200).json({ message: brand });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
