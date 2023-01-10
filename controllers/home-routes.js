const router = require('express').Router();
const { User } = require('../models');

router.get('/', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    // Otherwise, render the 'login' template
    res.render('logins');
  });

router.get('/schedule', (req, res) => {
    res.render('schedule');
});

router.get('/dogs', (req, res) => {
    res.render('dogs');
});

// login post route
router.post('/', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
  
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password.' });
            return;
        }
  
        const validPassword = await userData.checkPassword(req.body.password);
  
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password.' });
            return;
        }
  
        req.session.save(() => {
            req.session.loggedIn = true;
            res
                .status(200)
                .json({ user: userData, message: 'Logged in!' });
        });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// logout post route
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
  
module.exports = router;