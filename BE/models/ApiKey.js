const db = require("../config/db");

module.exports = {
  createKey: async (key, user_id, out_of_date) => {
    await db.query(
      "INSERT INTO api_keys (`key`, user_id, out_of_date, status) VALUES (?,?,?,?)",
      [key, user_id, out_of_date, "active"]
    );
  },

  findAll: async () => {
    const [rows] = await db.query(`
      SELECT 
        api_keys.id,
        api_keys.key,
        api_keys.out_of_date,
        api_keys.status,
        api_keys.user_id,
        user.email AS user_email
      FROM api_keys
      LEFT JOIN user ON api_keys.user_id = user.id
      ORDER BY api_keys.id DESC
    `);

    return rows;
  },

  autoUpdateStatus: async () => {
    await db.query(`
      UPDATE api_keys
      SET status = 'inactive'
      WHERE out_of_date < NOW()
    `);
  },
};
