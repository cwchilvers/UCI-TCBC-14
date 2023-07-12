module.exports = (req, res) => {
    // Render page and pass data to view
    res.render('notFound', { title: 'BTB: Page Not Found' });
}