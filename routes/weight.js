const router = require('express').Router();
const weightServices = require('./../services/weight');

router.post('/', async (req, res) => {
  if (!req.body.name) res.status(400).json({message: "weight is required"});
  const weight = weightServices.weightObject(req.body);
  try {
    const saveWeight = await weightServices.saveWeight(weight);
    res.status(201).json({ message: saveWeight });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const weight = await weightServices.getAllWeights();
    if (!weight) {
      return res.status(400).json({ message: 'weight not found..' });
    }
    res.status(200).json({ message: weight });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
