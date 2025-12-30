
document.getElementById('openBtn').addEventListener('click', () => {
  const text = document.getElementById('urls').value;
  const urls = text.split(/\n+/).map(u => u.trim()).filter(u => u);

  urls.forEach(url => {
    if (!url.startsWith('http')) {
      url = 'https://' + url;
    }
    chrome.tabs.create({ url });
  });
});
