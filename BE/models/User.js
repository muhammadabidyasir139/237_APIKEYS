const db = require("../config/db");

module.exports = {
  findAll: async () => {
    const [rows] = await db.query("SELECT * FROM user");
    return rows;
  },

  create: async (firstname, lastname, email) => {
    const [result] = await db.query(
      "INSERT INTO user (firstname, lastname, email) VALUES (?,?,?)",
      [firstname, lastname, email]
    );
    return result.insertId;
  },

  deleteUser: async (id) => {
    // Hapus API keys milik user dulu (agar foreign key tidak error)
    await db.query("DELETE FROM api_keys WHERE user_id = ?", [id]);

    // Hapus user
    await db.query("DELETE FROM user WHERE id = ?", [id]);
  },
};
