const router = require('express').Router();
const { Owner } = require('../models');

router.get('/', async (req, res) => {
    try {
        const ownerData = await Owner.findAll({
            include: [
                {
                    model: Owner,
                    attributes: [  
                        'id',
                        'first_name',
                        'last_name',
                        'dob',
                        'dog_id',
                    ],
                },
            ],
        });
  
        const owners = ownerData.map((owner) => 
            owner.get({ plain: true })
        );
        res.render('homepage', { owners });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const ownerData = await Owner.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            dob: req.body.dob,
            dog_id: req.body.dog_id
        });
      
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(ownerData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;