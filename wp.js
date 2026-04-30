const axios = require("axios");

const WP_URL = "https://yourdomain.com/wp-json/wp/v2/posts"; 
const USER = "admin";
const APP_PASS = "xxxx xxxx xxxx xxxx";

async function postToWP(title, content) {
  const auth = Buffer.from(`${USER}:${APP_PASS}`).toString("base64");

  try {
    const res = await axios.post(
      WP_URL,
      {
        title,
        content,
        status: "publish"
      },
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );

    console.log("✅ Posted:", title);
  } catch (err) {
    console.log("❌ Error post:", err.message);
  }
}

module.exports = postToWP;
