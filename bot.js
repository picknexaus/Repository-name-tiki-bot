async function post(title, content) {
  try {
    console.log("WP_URL:", WP_URL);
    console.log("USER:", USER);
    console.log("APP_PASS exists:", !!APP_PASS);

    const auth = Buffer.from(`${USER}:${APP_PASS}`).toString("base64");

    const res = await axios.post(
      WP_URL,
      { title, content, status: "publish" },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ SUCCESS:", res.data);
  } catch (err) {
    console.log("🔥 FULL ERROR:");
    console.log(err.response?.status);
    console.log(err.response?.data || err.message);

    process.exit(1);
  }
}
