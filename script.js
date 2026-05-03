const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

/* ── Subscriber state (localStorage-backed) ── */

const STORAGE_KEY = "browncoats_subscriber";

function isSubscriber() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function setSubscriber(val) {
  try {
    if (val) {
      localStorage.setItem(STORAGE_KEY, "true");
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // localStorage unavailable; degrade gracefully
  }
  applySubscriberState();
}

function applySubscriberState() {
  const subscribed = isSubscriber();

  // Toggle locked cards
  document.querySelectorAll(".program-card[data-locked]").forEach(function (card) {
    card.setAttribute("data-locked", subscribed ? "false" : "true");
  });

  // Toggle banner
  const banner = document.getElementById("subscriberBanner");
  if (banner) {
    banner.hidden = !subscribed;
  }

  // Toggle nav button text
  const navBtn = document.getElementById("navSubscribeBtn");
  if (navBtn) {
    if (subscribed) {
      navBtn.textContent = "Subscribed ✓";
      navBtn.classList.add("subscribed");
    } else {
      navBtn.textContent = "Subscribe";
      navBtn.classList.remove("subscribed");
    }
  }
}

/* ── Checkout modal ── */

const modal = document.getElementById("checkoutModal");
const step1 = document.getElementById("checkoutStep1");
const step2 = document.getElementById("checkoutStep2");
const step3 = document.getElementById("checkoutStep3");

function openCheckout() {
  if (isSubscriber()) return;
  showStep(1);
  modal.showModal();
}

function closeCheckout() {
  modal.close();
}

function showStep(n) {
  [step1, step2, step3].forEach(function (s, i) {
    s.hidden = i !== n - 1;
  });
}

// Subscribe CTA buttons
document.querySelectorAll("#heroSubscribeBtn, #navSubscribeBtn").forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    openCheckout();
  });
});

// Lock badges also open checkout
document.querySelectorAll(".card-lock").forEach(function (lock) {
  lock.addEventListener("click", function () {
    openCheckout();
  });
});

// Plan selection → step 2
document.querySelectorAll(".plan-card").forEach(function (card) {
  card.addEventListener("click", function () {
    showStep(2);
  });
});

// Back to plans
var backBtn = document.getElementById("backToPlanBtn");
if (backBtn) {
  backBtn.addEventListener("click", function () {
    showStep(1);
  });
}

// Close buttons
document.querySelectorAll("#modalCloseBtn, #modalCloseBtn2").forEach(function (btn) {
  btn.addEventListener("click", closeCheckout);
});

// Backdrop click closes modal
if (modal) {
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeCheckout();
    }
  });
}

// Demo payment form submit
var payForm = document.getElementById("demoPayForm");
if (payForm) {
  payForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Simulate a brief processing delay
    var submitBtn = payForm.querySelector('button[type="submit"]');
    submitBtn.textContent = "Processing…";
    submitBtn.disabled = true;
    setTimeout(function () {
      setSubscriber(true);
      showStep(3);
      submitBtn.textContent = "Complete demo checkout";
      submitBtn.disabled = false;
      payForm.reset();
    }, 800);
  });
}

// Success close
var successBtn = document.getElementById("successCloseBtn");
if (successBtn) {
  successBtn.addEventListener("click", function () {
    closeCheckout();
  });
}

// Reset subscription
var resetBtn = document.getElementById("resetSubBtn");
if (resetBtn) {
  resetBtn.addEventListener("click", function () {
    setSubscriber(false);
  });
}

// Apply state on load
applySubscriberState();

