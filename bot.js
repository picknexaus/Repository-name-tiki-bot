const axios = require("axios");

// ====== ENV (GitHub Secrets) ======
const WP_URL = process.env.WP_URL;
const USER = process.env.USER;
const APP_PASS = process.env.APP_PASS;

// ====== SHOPEE LINK ======
const products = [
  {
    title: "🔥 Shopee Deal Hot Hôm Nay",
    link: "https://s.shopee.vn/6VKLAmA3sn"
  },
  {
    title: "⚡ Flash Sale Shopee Giá Sốc",
    link: "https://s.shopee.vn/6VKLAmA3sn"
  }
];

// ====== TẠO BÀI VIẾT ======
function createPost(p) {
  return `
    <h2>${p.title}</h2>
    <p>🔥 Sản phẩm đang giảm giá mạnh trên Shopee</p>
    <a href="${p.link}" target="_blank">👉 MUA NGAY</a>
  `;
}

// ====== POST WORDPRESS ======
async function postToWP() {
  try {
    if (!WP_URL || !USER || !APP_PASS) {
      throw new Error("Missing ENV (Secrets chưa set)");
    }

    const p = products[Math.floor(Math.random() * products.length)];

    const auth = Buffer.from(`${USER}:${APP_PASS}`).toString("base64");

    await axios.post(
      WP_URL,
      {
        title: p.title,
        content: createPost(p),
        status: "publish"
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ POST OK:", p.title);
  } catch (err) {
    console.log("❌ ERROR:");
    console.log(err.response?.data || err.message);
    process.exit(1);
  }
}

postToWP();
