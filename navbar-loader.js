// navbar-loader.js
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("navbar-container");

  try {
    const res = await fetch("navbar.html");
    const html = await res.text();
    container.innerHTML = html;

    // ✅ Now dynamically import the JS that controls navbar
    import("script.js")
      .then(() => console.log("✅ Navbar logic loaded successfully"))
      .catch(err => console.error("❌ Failed to load navbar logic", err));

  } catch (err) {
    console.error("❌ Failed to load navbar:", err);
  }
});
