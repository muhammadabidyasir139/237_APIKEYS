const Admin = require("../models/Admin");
const User = require("../models/User");
const ApiKey = require("../models/ApiKey");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // REGISTER ADMIN
  register: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email dan password wajib diisi" });
      }

      const exists = await Admin.findByEmail(email);
      if (exists) {
        return res.status(400).json({ message: "Admin sudah terdaftar" });
      }

      const hash = await bcrypt.hash(password, 10);
      const id = await Admin.create(email, hash);

      res.json({ message: "Admin berhasil diregister", admin_id: id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Gagal register admin" });
    }
  },

  // LOGIN ADMIN
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const admin = await Admin.findByEmail(email);
      if (!admin)
        return res.status(400).json({ message: "Admin tidak ditemukan" });

      const valid = await bcrypt.compare(password, admin.password);
      if (!valid) return res.status(400).json({ message: "Password salah" });

      const token = jwt.sign(
        { id: admin.id, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Gagal login admin" });
    }
  },

  // LIST USER + API KEYS
  listUsersAndKeys: async (req, res) => {
    try {
      await ApiKey.autoUpdateStatus();

      const users = await User.findAll();
      const apiKeys = await ApiKey.findAll();

      res.json({ users, apiKeys });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Gagal mengambil list" });
    }
  },

  // DELETE USER
  deleteUser: async (req, res) => {
    try {
      const user_id = req.params.id;

      if (!user_id) {
        return res.status(400).json({ message: "User ID tidak ditemukan" });
      }

      await User.deleteUser(user_id);

      res.json({ message: "User dan API Key terkait berhasil dihapus" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Gagal menghapus user" });
    }
  },
};
