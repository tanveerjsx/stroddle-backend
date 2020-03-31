const router = require('express').Router();
const modelServices = require('./../services/model');

router.post('/', async (req, res) => {
  if (!req.body.name) res.status(400).json({message: "model is required"});
  const model = modelServices.modelObject(req.body);
  try {
    const saveModel = await modelServices.saveModel(model);
    res.status(201).json({ message: saveModel });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const model = await modelServices.getAllModels();
    if (!model) {
      return res.status(400).json({ message: 'model not found..' });
    }
    res.status(200).json({ message: model });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
