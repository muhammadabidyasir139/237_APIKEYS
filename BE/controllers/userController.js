const User = require("../models/User");

module.exports = {
  createUser: async (req, res) => {
    try {
      const { firstname, lastname, email } = req.body;

      if (!firstname || !lastname || !email) {
        return res.status(400).json({ message: "Semua field wajib diisi" });
      }

      const id = await User.create(firstname, lastname, email);

      res.json({
        message: "User berhasil dibuat",
        user_id: id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Gagal membuat user" });
    }
  },
};
