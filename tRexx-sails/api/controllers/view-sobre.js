module.exports = async function (req, res) {
    var released = 2014;
    res.view('pages/sobre', { released: released });
};