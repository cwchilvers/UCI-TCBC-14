// Render home page
module.exports = async (req, res) => {
    console.log('load home page')

    res.render('layouts/main');
};