document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("trending-container");

  try {
    // Use your chosen RSS feed URL:
    const rssUrl = "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms";  // example TOI feed
    const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`);
    const text  = await response.text();
    const parser = new DOMParser();
    const xml   = parser.parseFromString(text, "application/xml");
    const items = xml.querySelectorAll("item");

    if (items.length) {
      const headlines = Array.from(items).slice(0, 5).map(item => {
        return item.querySelector("title").textContent.trim();
      });
      container.innerHTML = `<p>${headlines.join(" • ")}</p>`;
    } else {
      container.innerHTML = "<p>No trending headlines right now.</p>";
    }
  } catch (err) {
    console.error("Error loading RSS feed:", err);
    container.innerHTML = "<p>Unable to load trending news.</p>";
  }
});
