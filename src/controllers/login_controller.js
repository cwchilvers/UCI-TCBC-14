module.exports = async (req, res) => {
    const title = 'BTB | Login';    // Set the page title
    res.render('login', { title }); // Render login page with title
};