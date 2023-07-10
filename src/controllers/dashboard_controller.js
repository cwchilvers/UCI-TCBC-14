module.exports = async (req, res) => {
    const title = 'BTB | Dashboard';    // Set the page title
    res.render('dashboard', { title }); // Render dashboard page with title
};