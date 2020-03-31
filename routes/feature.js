const router = require('express').Router();
const featureServices = require('./../services/feature');

router.post('/', async (req, res) => {
  if (!req.body.name) res.status(400).json({message: "feature is required"});
  const feature = featureServices.featureObject(req.body);
  try {
    const saveFeature = await featureServices.saveFeature(feature);
    res.status(201).json({ message: saveFeature });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const feature = await featureServices.getAllFeatures();
    if (!feature) {
      return res.status(400).json({ message: 'feature not found..' });
    }
    res.status(200).json({ message: feature });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
