const axios = require("axios");
const cron = require("node-cron");

// ================= CONFIG =================
const WP_URL = "https://picknexa.net/wp-json/wp/v2/posts";
const USER = "admin";
const APP_PASS = "YOUR_APP_PASSWORD";

// ================= AI CONTENT =================
function generateContent(product) {
  return `
    <h1>🔥 ${product.title}</h1>

    <p>
      Sản phẩm hot đang được nhiều người săn đón hôm nay.
      Giá ưu đãi giới hạn – click ngay để xem chi tiết.
    </p>

    <a href="${product.link}" target="_blank">
      👉 XEM NGAY DEAL
    </a>

    <p>
      💡 Gợi ý: Đây là sản phẩm đang trending trên Tiki.
    </p>
  `;
}

// ================= FAKE PRODUCT (LEVEL 2 sau sẽ nâng cấp API thật) =================
function getProduct() {
  const list = [
    {
      title: "🔥 Tai nghe Bluetooth giảm giá sốc",
      link: "https://ti.ki/qpJevlMg/2LWIV8Q1"
    },
    {
      title: "⚡ Nồi chiên không dầu hot deal",
      link: "https://ti.ki/6lqKKEKZ/LL6C6C4U"
    },
    {
      title: "🎯 Laptop sale mạnh hôm nay",
      link: "https://ti.ki/qpJevlMg/2LWIV8Q1"
    }
  ];

  return list[Math.floor(Math.random() * list.length)];
}

// ================= POST WORDPRESS =================
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

    console.log("✅ POST OK:", title);
  } catch (err) {
    console.log("❌ ERROR:", err.message);
  }
}

// ================= RUN BOT =================
async function run() {
  const product = getProduct();
  const content = generateContent(product);

  await postToWP(product.title, content);
}

// chạy test ngay
run();

// chạy auto mỗi 2 giờ (LEVEL PRO)
cron.schedule("0 */2 * * *", () => {
  run();
});
