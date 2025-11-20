const db = require("../config/db");

module.exports = {
  findByEmail: async (email) => {
    const [rows] = await db.query("SELECT * FROM admin WHERE email = ?", [
      email,
    ]);
    return rows[0];
  },

  create: async (email, password) => {
    const [result] = await db.query(
      "INSERT INTO admin (email, password) VALUES (?,?)",
      [email, password]
    );
    return result.insertId;
  },
};
