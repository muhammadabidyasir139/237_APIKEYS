const ApiKey = require("../models/ApiKey");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  generateKey: async (req, res) => {
    const { user_id, expired_at } = req.body;

    if (!user_id || !expired_at) {
      return res
        .status(400)
        .json({ message: "user_id dan expired_at wajib diisi" });
    }

    const key = uuidv4().replace(/-/g, "");

    await ApiKey.createKey(key, user_id, expired_at);

    res.json({ message: "API Key berhasil dibuat", key });
  },
};
