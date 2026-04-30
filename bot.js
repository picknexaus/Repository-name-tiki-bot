const axios = require("axios");

// ===== WORDPRESS ENV (KHÔNG NHẬP PASSWORD TRỰC TIẾP) =====
const WP_URL = process.env.WP_URL;
const USER = process.env.USER;
const APP_PASS = process.env.APP_PASS;

// ===== PRODUCT DATA =====
const products = [
  {
    title: "🔥 Tai nghe Bluetooth giảm giá sốc",
    link: "https://s.shopee.vn/6VKLAmA3sn",
    keyword: "tai nghe bluetooth"
  },
  {
    title: "⚡ Nồi chiên không dầu hot trend",
    link: "https://s.shopee.vn/6VKLAmA3sn",
    keyword: "nồi chiên không dầu"
  }
];

// ===== CONTENT SEO =====
function buildContent(p) {
  return `
    <h1>${p.title}</h1>

    <p><b>Từ khóa:</b> ${p.keyword}</p>

    <p>
      🔥 Sản phẩm đang giảm giá mạnh hôm nay.
    </p>

    <h2>Ưu đãi</h2>
    <ul>
      <li>Giảm giá</li>
      <li>Freeship</li>
      <li>Deal hot</li>
    </ul>

    <a href="${p.link}" target="_blank">
      👉 MUA NGAY
    </a>
  `;
}

// ===== POST WP =====
async function post(p) {
  const auth = Buffer.from(`${USER}:${APP_PASS}`).toString("base64");

  try {
    const res = await axios.post(
      WP_URL,
      {
        title: p.title,
        content: buildContent(p),
        status: "publish"
      },
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );

    console.log("✅ POST OK:", p.title);
  } catch (err) {
    console.log("❌ ERROR:");
    console.log(err.response?.status);
    console.log(err.response?.data || err.message);

    process.exit(1);
  }
}

// ===== RUN =====
async function run() {
  console.log("🚀 BOT START");

  for (const p of products) {
    await post(p);
  }

  console.log("🎯 DONE");
}

run();
