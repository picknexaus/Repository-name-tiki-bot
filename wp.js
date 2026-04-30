const axios = require("axios");

// ⚠️ SỬA 2 CHỖ NÀY
const WP_URL = "https://YOUR-DOMAIN.com/wp-json/wp/v2/posts";
const USER = "admin";

// 👉 DÁN APP PASSWORD VÀO ĐÂY
const APP_PASS = "PASTE_APP_PASSWORD_HERE";

async function postToWP(title, content) {
  const auth = Buffer.from(`${USER}:${APP_PASS}`).toString("base64");

  try {
    await axios.post(
      WP_URL,
      {
        title,
        content,
        status: "publish"
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Đăng bài thành công:", title);
  } catch (err) {
    console.log("❌ Lỗi:", err.response?.data || err.message);
  }
}

module.exports = postToWP;
