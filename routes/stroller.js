const router = require('express').Router();
const Stroller = require('./../models/stroller');
const strollerServices = require('./../services/stroller');
const { strollerSchema } = require('../schemas/stroller');
 

router.post('/', async (req, res) => {
  //const validation = strollerSchema.validate(req.body);
    // if (validation.error) {
    //     return res.status(400).json({
    //         message: validation.error.details[0].message,
    //     });
    // }
  const stroller = strollerServices.strollerObject(req.body);
  try {
    const saveStroller = await strollerServices.saveStroller(stroller);
    res.status(201).json({ message: saveStroller });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const stroller = await strollerServices.getAllStrollers();
    if (!stroller) {
      return res.status(400).json({ message: 'stroller not found..' });
    }
    res.status(200).json({ message: stroller });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const stroller = await strollerServices.getAllStrollers();
    if (!stroller) {
      return res.status(400).json({ message: 'stroller not found..' });
    }
    res.status(200).json({ message: stroller });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/properties', async (req, res) => {
  try {
    const strollerProperties = await strollerServices.getStrollersProperties();
    if (!strollerProperties) {
      return res.status(400).json({ message: 'stroller not found..' });
    }
    res.status(200).json({ message: strollerProperties });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/filter',async(req,res)=>{

  try{
    const filter={
    priceFrom:10,
    priceTo:25,
    // types:["5e5cf5d7eff85406c91028b4","5e5cf5eeeff85406c91028b5"],
    // features:["5e5ce7549cfbfd0024e06f5e","5e5ce74d9cfbfd0024e06f5d"],
    types:[],
    features:[],
   //  brand:["5e5ce6bb9cfbfd0024e06f56","5e5ce6d19cfbfd0024e06f57"],
    color:["5e5cf4c5eff85406c91028b2","5e5cf4a7eff85406c91028b0","5e5cf4c5eff85406c91028b2"]
  }
  const filterData=await strollerServices.filterStroller(filter)
  res.status(200).json({message:filterData})}
  catch(error){
    res.status(500).json({message:error.message})
  }
  })



module.exports = router;
