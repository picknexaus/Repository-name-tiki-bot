const axios = require("axios");

// ====== LẤY TỪ GITHUB SECRETS ======
const WP_URL = process.env.WP_URL;
const USER = process.env.USER;
const APP_PASS = process.env.APP_PASS;

// ====== LINK SHOPEE ======
const products = [
  {
    title: "🔥 Deal Shopee hot hôm nay",
    link: "https://s.shopee.vn/6VKLAmA3sn"
  },
  {
    title: "⚡ Flash Sale Shopee",
    link: "https://s.shopee.vn/6VKLAmA3sn"
  }
];

// ====== TẠO BÀI ======
function createPost(p) {
  return `
    <h1>${p.title}</h1>
    <p>Sản phẩm đang giảm giá trên Shopee</p>
    <a href="${p.link}" target="_blank">👉 MUA NGAY</a>
  `;
}

// ====== ĐĂNG WP ======
async function post(title, content) {
  try {
    const auth = Buffer.from(`${USER}:${APP_PASS}`).toString("base64");

    await axios.post(
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

    console.log("✅ Đăng bài OK:", title);
  } catch (err) {
    console.log("❌ Lỗi:", err.response?.data || err.message);
    process.exit(1);
  }
}

// ====== RUN ======
async function run() {
  const p = products[Math.floor(Math.random() * products.length)];
  await post(p.title, createPost(p));
}

run();
