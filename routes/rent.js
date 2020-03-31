const router = require('express').Router();
const rentServices = require('./../services/rent');

router.post('/', async (req, res) => {
  const rent = rentServices.rentObject(req.body);
  try {
    const saveRent = await rentServices.saveRent(rent);
    res.status(201).json({ message: saveRent });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const rent = await rentServices.getAllRents();
    if (!rent) {
      return res.status(400).json({ message: 'rent not found..' });
    }
    res.status(200).json({ message: rent });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
