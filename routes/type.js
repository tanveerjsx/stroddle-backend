const router = require('express').Router();
const typeServices = require('./../services/type');

router.post('/', async (req, res) => {
  if (!req.body.name) res.status(400).json({message: "type is required"});
  const type = typeServices.typeObject(req.body);
  try {
    const saveType = await typeServices.saveType(type);
    res.status(201).json({ message: saveType });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const type = await typeServices.getAllTypes();
    if (!type) {
      return res.status(400).json({ message: 'type not found..' });
    }
    res.status(200).json({ message: type });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
