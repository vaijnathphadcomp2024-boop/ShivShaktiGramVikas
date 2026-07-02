const getHello = (req, res) => {
  res.json({
    success: true,
    message: 'Hello from Shivshakti GramVikas Pratishtan API 🙏',
  });
};

module.exports = { getHello };
