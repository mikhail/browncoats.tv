/* ── browncoats.tv — prototype interactions ── */
/* No data is collected, submitted, or stored remotely. */
/* All interactions are client-side only. */

const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

/* ── Sensitivity model calculator ── */

const BASE_PRICE = 5.99;
const PREMIUM_PRICE = 9.99;

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function updateSensitivityModel() {
  var baseInput = document.getElementById("browncoatCount");
  var premiumInput = document.getElementById("firstMateCount");
  var monthlyEl = document.getElementById("grossMonthly");
  var annualEl = document.getElementById("grossAnnual");

  if (!baseInput || !premiumInput || !monthlyEl || !annualEl) return;

  var base = Number(baseInput.value) || 0;
  var premium = Number(premiumInput.value) || 0;
  var monthly = base * BASE_PRICE + premium * PREMIUM_PRICE;

  monthlyEl.textContent = formatCurrency(monthly);
  annualEl.textContent = formatCurrency(monthly * 12);
}

document.querySelectorAll("#browncoatCount, #firstMateCount").forEach(function (input) {
  input.addEventListener("input", updateSensitivityModel);
});

/* ── Interest selection demo ── */
/* Client-side only — nothing is sent, saved, or collected. */

function updateInterestSummary() {
  var container = document.getElementById("interestOptions");
  var summary = document.getElementById("interestSummary");
  var countEl = document.getElementById("interestCount");
  var listEl = document.getElementById("interestList");

  if (!container || !summary || !countEl || !listEl) return;

  var checked = container.querySelectorAll('input[type="checkbox"]:checked');
  var labels = [];
  checked.forEach(function (cb) {
    labels.push(cb.getAttribute("data-label") || cb.value);
  });

  if (labels.length > 0) {
    summary.hidden = false;
    countEl.textContent = labels.length + " categor" + (labels.length === 1 ? "y" : "ies") + " selected";
    listEl.textContent = labels.join(" · ");
  } else {
    summary.hidden = true;
    countEl.textContent = "0 categories selected";
    listEl.textContent = "";
  }
}

var interestOptions = document.getElementById("interestOptions");
if (interestOptions) {
  interestOptions.addEventListener("change", updateInterestSummary);
}

/* ── Initialize on load ── */
updateSensitivityModel();

