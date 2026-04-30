const cron = require("node-cron");
const products = require("./products");
const postToWP = require("./wp");

// random sản phẩm
function randomProduct() {
  return products[Math.floor(Math.random() * products.length)];
}

// tạo bài viết
function buildPost(p) {
  return `
    <h2>🔥 ${p.title}</h2>
    <p>Sản phẩm hot hôm nay trên Tiki</p>
    <a href="${p.link}" target="_blank">
      👉 MUA NGAY
    </a>
  `;
}

// chạy bot
async function runBot() {
  const p = randomProduct();
  await postToWP(p.title, buildPost(p));
}

// chạy test ngay
runBot();

// chạy mỗi ngày 9h sáng
cron.schedule("0 9 * * *", () => {
  runBot();
});
