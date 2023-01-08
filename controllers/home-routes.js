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

module.exports = router;