const router = require('express').Router();
const { Dog } = require('../../models');

// create new dog profile
router.post('/', async (req, res) => {
    try {
        const dogData = await Dog.create({
            name: req.body.name,
            age: req.body.age,
            fixed: req.body.fixed,
            shared: req.body.shared,
            medication: req.body.medication,
            diet: req.body.diet,
            notes: req.body.notes,
        });
      
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(dogData);
        });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// generate existing dog data
router.get('/', async (req, res) => {
    try {
        const dogData = await Dog.findAll({
            include: [
                {
                    model: Dog,
                    attributes: [  
                        'id',
                        'name',
                        'age',
                        'fixed',
                        'shared',
                        'medication',
                        'notes',
                    ],
                },
            ],
        });
  
        const dogs = dogData.map((dog) => 
            dog.get({ plain: true })
        );
        res.render('dogs', { dogs });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;