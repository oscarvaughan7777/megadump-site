const siteConfig = {
  contractAddress: "0x37d8f7b966F2a869455A90c9401ac65Aef44Db59",
  uniswapUrl: "https://app.uniswap.org/",
  email: "contact.megadump@gmail.com",
  socialLinks: {
    dexscreener: "#",
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
const toast = document.getElementById("copyToast");
const joinDumpButton = document.getElementById("joinDumpButton");
const uniswapLink = document.getElementById("uniswapLink");
const dexscreenerLink = document.getElementById("dexscreenerLink");
const dextoolsLink = document.getElementById("dextoolsLink");
const statTargets = document.querySelectorAll("[data-stat]");
const revealTargets = document.querySelectorAll(".reveal");

let toastTimer;

contractTargets.forEach((node) => {
  node.textContent = siteConfig.contractAddress;
});

if (joinDumpButton) {
  joinDumpButton.href = siteConfig.uniswapUrl;
  joinDumpButton.target = "_blank";
  joinDumpButton.rel = "noreferrer";
}

if (uniswapLink) {
  uniswapLink.href = siteConfig.uniswapUrl;
}

if (dexscreenerLink) {
  dexscreenerLink.href = siteConfig.socialLinks.dexscreener;
  if (siteConfig.socialLinks.dexscreener === "#") {
    dexscreenerLink.setAttribute("aria-disabled", "true");
  }
}

if (dextoolsLink) {
  dextoolsLink.href = siteConfig.socialLinks.dextools;
  if (siteConfig.socialLinks.dextools === "#") {
    dextoolsLink.setAttribute("aria-disabled", "true");
  }
}

statTargets.forEach((node) => {
  const key = node.dataset.stat;
  if (key && siteConfig.stats[key]) {
    node.textContent = siteConfig.stats[key];
  }
});

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
    showToast("Copy failed. Contract is highlighted on screen.");
    console.error(error);
  }
}

copyButtons.forEach((button) => {
  button.addEventListener("click", copyContract);
});

revealTargets.forEach((target) => {
  target.classList.add("translate-y-6", "opacity-0", "transition", "duration-700");
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove("translate-y-6", "opacity-0");
      entry.target.classList.add("translate-y-0", "opacity-100");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16
  }
);

revealTargets.forEach((target) => {
  revealObserver.observe(target);
});
