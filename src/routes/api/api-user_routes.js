const router = require('express').Router();
const { newUser, login, logout } = require('../../handlers/user_handler');

router
  .post('/', async (req, res) => {newUser(req, res);})    // Create new user
  .post('/login', async (req, res) => {login(req, res);}) // Login
  .post('/logout', (req, res) => {logout(req, res);});    // Logout

module.exports = router;
