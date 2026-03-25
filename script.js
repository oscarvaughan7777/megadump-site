const siteConfig = {
  contractAddress: "0x37d8f7b966F2a869455A90c9401ac65Aef44Db59",
  email: "contact.megadump@gmail.com",
  // Paste your live Uniswap buy link below.
  uniswapUrl: "https://app.uniswap.org/",
  socialLinks: {
    // Paste your X profile link below.
    x: "#",
    // Paste your Telegram link below.
    telegram: "#",
    // Paste your Dexscreener link below.
    dexscreener: "#",
    // Paste your Dextools link below.
    dextools: "#"
  },
  stats: {
    price: "$0.000042",
    liquidity: "$187K",
    holders: "1,248",
    marketCap: "$4.2M"
  }
};

const contractTargets = document.querySelectorAll("[data-contract-text]");
const copyButtons = document.querySelectorAll("[data-copy-contract]");
const buyHeroLink = document.getElementById("buyHeroLink");
const buySectionLink = document.getElementById("buySectionLink");
const xLink = document.getElementById("xLink");
const telegramLink = document.getElementById("telegramLink");
const dexscreenerLink = document.getElementById("dexscreenerLink");
const dextoolsLink = document.getElementById("dextoolsLink");
const statTargets = document.querySelectorAll("[data-stat]");
const revealTargets = document.querySelectorAll(".reveal");
const toast = document.getElementById("copyToast");

let toastTimer;

contractTargets.forEach((node) => {
  node.textContent = siteConfig.contractAddress;
});

statTargets.forEach((node) => {
  const key = node.dataset.stat;
  if (key && siteConfig.stats[key]) {
    node.textContent = siteConfig.stats[key];
  }
});

function setExternalLink(element, href) {
  if (!element) return;
  element.href = href;
  if (href && href !== "#") {
    element.target = "_blank";
    element.rel = "noreferrer";
  } else {
    element.setAttribute("aria-disabled", "true");
  }
}

setExternalLink(buyHeroLink, siteConfig.uniswapUrl);
setExternalLink(buySectionLink, siteConfig.uniswapUrl);
setExternalLink(xLink, siteConfig.socialLinks.x);
setExternalLink(telegramLink, siteConfig.socialLinks.telegram);
setExternalLink(dexscreenerLink, siteConfig.socialLinks.dexscreener);
setExternalLink(dextoolsLink, siteConfig.socialLinks.dextools);

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove("translate-y-6", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.add("translate-y-6", "opacity-0");
    toast.classList.remove("translate-y-0", "opacity-100");
  }, 2200);
}

async function copyContract() {
  try {
    await navigator.clipboard.writeText(siteConfig.contractAddress);
    showToast("Contract copied to clipboard.");
  } catch (error) {
    showToast("Copy failed. Please copy the address manually.");
    console.error(error);
  }
}

copyButtons.forEach((button) => {
  button.addEventListener("click", copyContract);
});

revealTargets.forEach((target) => {
  target.classList.add("translate-y-4", "opacity-0", "transition", "duration-700");
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove("translate-y-4", "opacity-0");
      entry.target.classList.add("translate-y-0", "opacity-100");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);

revealTargets.forEach((target) => {
  revealObserver.observe(target);
});
