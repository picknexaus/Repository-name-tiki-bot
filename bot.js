const axios = require("axios");

// ===== ENV =====
const WP_URL = process.env.WP_URL;
const USER = process.env.USER;
const APP_PASS = process.env.APP_PASS;

// ===== CHECK LOGIN TRƯỚC =====
function checkEnv() {
  if (!WP_URL || !USER || !APP_PASS) {
    throw new Error("❌ Thiếu Secrets (WP_URL / USER / APP_PASS)");
  }
}

// ===== DATA =====
const products = [
  {
    title: "🔥 Shopee Deal Hot Hôm Nay",
    link: "https://s.shopee.vn/6VKLAmA3sn"
  },
  {
    title: "⚡ Flash Sale Giảm Sốc Shopee",
    link: "https://s.shopee.vn/6VKLAmA3sn"
  }
];

// ===== BUILD POST =====
function buildPost(p) {
  return `
    <h2>${p.title}</h2>
    <p>🔥 Sản phẩm hot hôm nay</p>
    <a href="${p.link}" target="_blank">👉 MUA NGAY</a>
  `;
}

// ===== LOGIN TEST =====
async function testLogin() {
  const auth = Buffer.from(`${USER}:${APP_PASS}`).toString("base64");

  try {
    await axios.get(WP_URL, {
      headers: {
        Authorization: `Basic ${auth}`
      }
    });

    console.log("✅ LOGIN OK");
  } catch (err) {
    console.log("❌ LOGIN FAIL:");
    console.log(err.response?.status);
    console.log(err.response?.data || err.message);
    process.exit(1);
  }
}

// ===== POST =====
async function post() {
  const p = products[Math.floor(Math.random() * products.length)];
  const auth = Buffer.from(`${USER}:${APP_PASS}`).toString("base64");

  try {
    await axios.post(
      WP_URL,
      {
        title: p.title,
        content: buildPost(p),
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
    console.log("❌ POST FAIL:");
    console.log(err.response?.status);
    console.log(err.response?.data || err.message);
    process.exit(1);
  }
}

// ===== RUN SAFE FLOW =====
async function run() {
  try {
    checkEnv();

    console.log("🚀 START BOT");

    await testLogin();   // test login trước
    await post();        // rồi mới đăng bài

  } catch (err) {
    console.log("❌ SYSTEM ERROR:", err.message);
    process.exit(1);
  }
}

run();
