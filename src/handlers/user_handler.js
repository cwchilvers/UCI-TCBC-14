const { User } = require('../models/models');

module.exports = {
    // Create new user
    newUser: async (req, res) => {
        try {
            const dbUserData = await User.create({
                username: req.body.username,
                password: req.body.password,
            });
        
            req.session.save(() => {
                req.session.loggedIn = true;
                res.status(200).json(dbUserData);
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Login
    login: async (req, res) => {
        try {
            const dbUserData = await User.findOne({
                where: {
                    username: req.body.username,
                },
            });
        
            if (!dbUserData) {
                res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
                return;
            }
            
            const validPassword = await dbUserData.checkPassword(req.body.password);
        
            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
                return;
            }
        
            // Set the userId in the session
            req.session.userId = dbUserData.id; 
        
            req.session.save(() => {
                req.session.loggedIn = true;
                res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }    
    },

    // Logout
    logout: (req, res) => {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            console.log('No session found');
            res.status(404).end();
        }
    }
};