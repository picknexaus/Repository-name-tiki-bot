async function post() {
  const p = products[Math.floor(Math.random() * products.length)];
  const auth = Buffer.from(`${USER}:${APP_PASS}`).toString("base64");

  try {
    console.log("🔍 DEBUG:");
    console.log("WP_URL =", WP_URL);
    console.log("USER =", USER);
    console.log("APP_PASS length =", APP_PASS?.length);

    const res = await axios.post(
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

    console.log("✅ POST OK:", res.data);
  } catch (err) {
    console.log("🔥 FULL ERROR DETAILS:");
    console.log("STATUS:", err.response?.status);
    console.log("DATA:", err.response?.data);
    console.log("MESSAGE:", err.message);

    process.exit(1);
  }
}
