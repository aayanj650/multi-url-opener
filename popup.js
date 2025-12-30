
let count = 0;
const counter = document.getElementById('count');

chrome.storage.local.get(['savedUrls'], res => {
  if (res.savedUrls) {
    document.getElementById('urls').value = res.savedUrls;
  }
});

document.getElementById('saveBtn').onclick = () => {
  const text = document.getElementById('urls').value;
  chrome.storage.local.set({ savedUrls: text });
};

document.getElementById('openBtn').onclick = async () => {
  let urls = document.getElementById('urls').value
    .split(/\n+/).map(u => u.trim()).filter(Boolean);

  if (document.getElementById('dedupe').checked) {
    urls = [...new Set(urls)];
  }

  const delay = parseInt(document.getElementById('delay').value) || 0;

  for (let url of urls) {
    if (!url.startsWith('http')) url = 'https://' + url;
    chrome.tabs.create({ url });
    count++;
    counter.textContent = count;
    if (delay) await new Promise(r => setTimeout(r, delay));
  }
};
