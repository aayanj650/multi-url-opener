document.getElementById("open").addEventListener("click", () => {
  const text = document.getElementById("urls").value;

  const urls = text
    .split("\n")
    .map(url => url.trim())
    .filter(url => url.length > 0);

  urls.forEach((url, index) => {
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }
    setTimeout(() => {
      chrome.tabs.create({ url });
    }, index * 500);
  });
});
