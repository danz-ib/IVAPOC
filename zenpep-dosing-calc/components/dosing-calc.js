document.addEventListener("DOMContentLoaded", () => {


// 🔀 Z-Index manipulation to ensure:
// - Tool covers site <header> (nav) when open
// - Footer and ISI (.pre-footer) appear above the tool when needed
// 
// Structure:
// - Tool itself: z-index 1000 (already defined in CSS)
// - Header nav: lowered to 999 when tool is open
// - Footer & pre-footer: raised to 1002 when tool is open
// - All reverted when tool is closed

  const header = document.querySelector('.site-header');
const footer = document.querySelector('footer.site-footer');
const preFooter = document.querySelector('.pre-footer');

const zenpepTool = document.querySelector('.zenpep-tool');
const launchBtn = document.getElementById('launchCalculatorBtn');
const launchWrapper = document.getElementById('launch-wrapper');
const exitButtons = document.querySelectorAll('.zenpep-exit-button');

function setZIndexes(toolVisible) {
  if (toolVisible) {
    header && (header.style.zIndex = '999');
    footer && (footer.style.zIndex = '1002');
    preFooter && (preFooter.style.zIndex = '1002');
  } else {
    header && (header.style.zIndex = '1000');
    footer && (footer.style.zIndex = '500');
    preFooter && (preFooter.style.zIndex = '500');
  }
}

launchBtn.addEventListener('click', () => {
  zenpepTool.classList.remove('hidden');
  launchWrapper.classList.add('hidden');
  screenInput.classList.remove('d-none');
  screenResults.classList.add('d-none');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setZIndexes(true); // 🟣 activate
});

exitButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    window.location.href = "../zenpep-opening/index.html";
  });
});




// 🎬 Trigger slide-in animation for scale on first load
const scaleWrapper = document.querySelector(".zenpep-calc__scale-wrapper");
if (scaleWrapper) {
  scaleWrapper.classList.remove("slide-in-up"); // reset if re-entered
  void scaleWrapper.offsetWidth; // force reflow
  scaleWrapper.classList.add("slide-in-up");
  // 🎬 Animate weights tilting in sync
const weightLight = document.querySelector(".zenpep-calc__weight-wrapper--light");
const weightHeavy = document.querySelector(".zenpep-calc__weight-wrapper--heavy");

[weightLight, weightHeavy].forEach((el) => {
  if (el) {
    el.classList.remove("animate-tilt"); // reset
    void el.offsetWidth; // reflow
    el.classList.add("animate-tilt");
  }
});

// 🧼 Remove tilt class after animation ends so JS moveWeights() can control transform
[weightLight, weightHeavy].forEach((el) => {
  if (el) {
    el.addEventListener("animationend", () => {
      el.classList.remove("animate-tilt");
    }, { once: true });
  }
});


}


// 🎬 Animate bar tilt with bounce
const bar = document.querySelector(".zenpep-calc__bar");
if (bar) {
  bar.classList.remove("animate-tilt"); // reset
  void bar.offsetWidth; // force reflow
  bar.classList.add("animate-tilt");
}


document.querySelector('.zenpep-tool__eyebrow')?.classList.add('zenpep-fade-slide-up');
document.querySelector('.zenpep-tool__headline')?.classList.add('zenpep-fade-slide-up');
document.querySelector('.zenpep-tool__input-wrapper')?.classList.add('zenpep-fade-slide-up');






    // 🔢 Animated counter helper
    function countUp(el, targetValue, duration = 800) {
      const start = 0;
      const end = parseInt(targetValue.toString().replace(/,/g, ""), 10);
      const startTime = performance.now();
  
      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        el.textContent = current.toLocaleString("en-US");
        if (progress < 1) requestAnimationFrame(update);
      }
  
      requestAnimationFrame(update);
    }
  
    const weightInput = document.getElementById("zenpep-weight");
    const warningBox = document.getElementById("zenpep-weight-warning");
    const calculateBtn = document.getElementById("zenpep-calc-btn");
    const screenInput = document.getElementById("zenpep-screen-input");
    const screenResults = document.getElementById("zenpep-screen-results");
    const resultWeightInput = document.getElementById("result-weight-input");
    const resultWeightInputMobile = document.getElementById("result-weight-input-mobile");
    const recalcBtnMobile = document.getElementById("recalculate-btn-mobile");
    const resultRecalcBtn = document.getElementById("recalculate-btn");
  
    let inputTimer;
    let hasUserTyped = false;
  
    weightInput.addEventListener("keydown", restrictToNumbers);
    resultWeightInput.addEventListener("keydown", restrictToNumbers);
    if (resultWeightInputMobile) resultWeightInputMobile.addEventListener("keydown", restrictToNumbers);
  
    weightInput.addEventListener("input", () => {
      weightInput.value = weightInput.value.replace(/\D/g, "").slice(0, 3);
      hasUserTyped = true;
      clearTimeout(inputTimer);
      inputTimer = setTimeout(() => {
        if (hasUserTyped) validateWeight();
      }, 500);
    });
  
    resultWeightInput.addEventListener("input", () => {
      resultWeightInput.value = resultWeightInput.value.replace(/\D/g, "").slice(0, 3);
    });
    if (resultWeightInputMobile) {
      resultWeightInputMobile.addEventListener("input", () => {
        resultWeightInputMobile.value = resultWeightInputMobile.value.replace(/\D/g, "").slice(0, 3);
      });
    }
  
    function restrictToNumbers(e) {
      const allowedKeys = [46, 8, 9, 27, 13, 37, 38, 39, 40];
      const allowedCtrlKeys = ["A", "C", "V", "X"];
      if (
        allowedKeys.includes(e.keyCode) ||
        (e.ctrlKey && allowedCtrlKeys.includes(e.key.toUpperCase()))
      ) {
        return;
      }
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    }
  
    function formatNumber(value) {
      return parseInt(value, 10).toLocaleString("en-US");
    }
  
    function validateWeight() {
      const value = parseInt(weightInput.value, 10);
      const isValid = !isNaN(value) && value >= 115 && value <= 265;
      if (isValid) {
        warningBox.classList.add("d-none");
        calculateBtn.disabled = false;
        moveWeights(value);
      } else {
        warningBox.classList.remove("d-none");
        calculateBtn.disabled = true;
      }
    }
  
    function moveWeights(weight) {
      const MIN = 115;
      const MAX = 265;
      const heavyEl = document.querySelector(".zenpep-calc__weight-wrapper--heavy");
      const lightEl = document.querySelector(".zenpep-calc__weight-wrapper--light");
      if (!heavyEl || !lightEl) return;
      const isMobile = window.innerWidth <= 768;
      const scaleFactor = isMobile ? 0.7 : 1;
      const heavyStepSize = 50;
      const heavyStepPx = 50 * scaleFactor;
      const lightStepPx = 6.5 * scaleFactor;
      const clampedWeight = Math.max(MIN, Math.min(MAX, weight));
      const weightOffset = clampedWeight - MIN;
      const heavyPosition = Math.floor(weightOffset / heavyStepSize) * heavyStepPx;
      const lightPosition = (weightOffset % heavyStepSize) * lightStepPx;
      heavyEl.style.transform = `translateX(${heavyPosition}px)`;
      lightEl.style.transform = `translateX(${lightPosition}px)`;
    }
  
    function calculateDosage(weightLbs) {
      const weightKg = weightLbs * 0.453592;
      const maxPerMeal = weightKg * 2500;
      const maxPerDay = maxPerMeal * 4;
      const recPerMeal = maxPerMeal * 0.2;
      const recPerDay = recPerMeal * 5;
      return {
        weightKg: weightKg.toFixed(2),
        maxPerMeal: maxPerMeal.toFixed(0),
        maxPerDay: maxPerDay.toFixed(0),
        recPerMeal: recPerMeal.toFixed(0),
        recPerDay: recPerDay.toFixed(0),
        pills40kRec: (recPerDay / 40000).toFixed(1),
        pills60kRec: (recPerDay / 60000).toFixed(1),
        pills40kMax: (maxPerDay / 40000).toFixed(1),
        pills60kMax: (maxPerDay / 60000).toFixed(1),
      };
    }
  
    calculateBtn.addEventListener("click", () => {
      const weight = parseInt(weightInput.value, 10);
      if (!isNaN(weight) && weight >= 115 && weight <= 265) {
        sessionStorage.setItem("zenpepWeight", weight);
        if (resultWeightInputMobile) resultWeightInputMobile.value = weight;
        resultWeightInput.value = weight;
    
      // ==========================
// ✅ UPDATED: Default to 60K if weight ≥ 180
// ==========================
if (weight >= 180) {
  const track = document.getElementById("pillToggleTrack");
  if (track.dataset.state !== "60K") {
    track.dataset.state = "60K";
    document.getElementById("pill60k").classList.add("active");
    document.getElementById("pill40k").classList.remove("active");

    // 🎨 Update visual styles to match 60K state
    const toggleBox = document.querySelector(".zenpep-pill-toggle-box");
    const outerBox = document.querySelector(".zenpep-dose-box");
    const middleBox = document.querySelector(".zenpep-dose-box--nested");
    const innerBox = document.querySelector(".zenpep-dose-box--inner");
    const pillLabelSecond = document.querySelector(".zenpep-pill-label-second");
    const pillLabelThird = document.querySelector(".zenpep-pill-label-third");
    const lipaseTitle = document.querySelector(".lipase-title");

    toggleBox.style.backgroundColor = "#C7C4E2";
    toggleBox.style.borderColor = "#252E64";
    track.style.borderColor = "#252E64";
    outerBox.style.backgroundColor = "#C7C4E2";
    middleBox.style.backgroundColor = "#8781BD";
    innerBox.style.backgroundColor = "#5D5380";

    if (pillLabelSecond) pillLabelSecond.style.color = "#252E64";
    if (pillLabelThird) pillLabelThird.style.color = "#252E64";
    if (lipaseTitle) lipaseTitle.style.color = "#252E64";
  }
}
    
        const results = calculateDosage(weight);
    
        setTimeout(() => {
          countUp(document.getElementById("dose-max-day"), results.maxPerDay);
        }, 400); // starts with outer box
    
        setTimeout(() => {
          countUp(document.getElementById("dose-max-meal"), results.maxPerMeal);
        }, 900); // nested box appears ~0.6s in, slight buffer
    
        setTimeout(() => {
          countUp(document.getElementById("dose-starting-meal"), results.recPerMeal);
        }, 1300); // inner box finishes its scale and is fully visible
    
        updatePillLabels(results);
        screenInput.classList.add("d-none");
        screenResults.classList.remove("d-none");
        screenResults.scrollIntoView({ behavior: "smooth" });
      }
    });
    



  
    resultRecalcBtn.addEventListener("click", handleRecalc);
    if (recalcBtnMobile && resultWeightInputMobile) {
      recalcBtnMobile.addEventListener("click", () => {
        resultWeightInput.value = resultWeightInputMobile.value;
        resultRecalcBtn.click();
      });
    }
  
    function handleRecalc() {
      const weight = parseInt(resultWeightInput.value, 10);
      const invalidModal = document.getElementById("invalidWeightModal");
      const lightModal = document.getElementById("zenpep-too-light-modal");
      const closeHeavyBtn = document.getElementById("closeInvalidWeightModal");
      const closeLightBtn = document.getElementById("closeTooLightModal");
      const lightLink = document.getElementById("tooLightCalculatorLink");
  
      if (!isNaN(weight) && weight >= 115 && weight <= 265) {
        sessionStorage.setItem("zenpepWeight", weight);
        const results = calculateDosage(weight);

        if (weight >= 180) {
          const track = document.getElementById("pillToggleTrack");
          if (track.dataset.state !== "60K") {
            track.dataset.state = "60K";
            document.getElementById("pill60k").classList.add("active");
            document.getElementById("pill40k").classList.remove("active");
        
            // 🎨 Update visual styles to match 60K state
            const toggleBox = document.querySelector(".zenpep-pill-toggle-box");
            const outerBox = document.querySelector(".zenpep-dose-box");
            const middleBox = document.querySelector(".zenpep-dose-box--nested");
            const innerBox = document.querySelector(".zenpep-dose-box--inner");
            const pillLabelSecond = document.querySelector(".zenpep-pill-label-second");
            const pillLabelThird = document.querySelector(".zenpep-pill-label-third");
            const lipaseTitle = document.querySelector(".lipase-title");
        
            toggleBox.style.backgroundColor = "#C7C4E2";
            toggleBox.style.borderColor = "#252E64";
            track.style.borderColor = "#252E64";
            outerBox.style.backgroundColor = "#C7C4E2";
            middleBox.style.backgroundColor = "#8781BD";
            innerBox.style.backgroundColor = "#5D5380";
        
            if (pillLabelSecond) pillLabelSecond.style.color = "#252E64";
            if (pillLabelThird) pillLabelThird.style.color = "#252E64";
            if (lipaseTitle) lipaseTitle.style.color = "#252E64";
          }
        }
        
        countUp(document.getElementById("dose-max-day"), results.maxPerDay);
        countUp(document.getElementById("dose-max-meal"), results.maxPerMeal);
        countUp(document.getElementById("dose-starting-meal"), results.recPerMeal);
        updatePillLabels(results);
      } else if (weight > 265) {
        invalidModal.classList.remove("hidden");
        closeHeavyBtn.onclick = () => invalidModal.classList.add("hidden");
      } else {
        lightModal.classList.remove("hidden");
        closeLightBtn.onclick = () => lightModal.classList.add("hidden");
        lightLink.onclick = (e) => {
          e.preventDefault();
          lightModal.classList.add("hidden");
        };
      }
    }
  
    function updatePillLabels(results) {
        const pillLabelSecond = document.querySelector(".zenpep-pill-label-second");
        const pillLabelThird = document.querySelector(".zenpep-pill-label-third");
        const pillIconsMax = document.getElementById("pill-icons-max");
        const pillIconsRec = document.getElementById("pill-icons-rec");
      
        const is60k = document.getElementById("pillToggleTrack").dataset.state === "60K";
        const pillStrength = is60k ? "60K" : "40K";
        const pillImage = is60k ? "assets/60k_pill.png" : "assets/40k_pill.png";
      
        // 👇 YOUR original logic preserved
        const recPills = is60k
          ? Math.floor(results.pills60kRec)
          : Math.floor(results.pills40kRec);
      
        if (pillLabelSecond) pillLabelSecond.innerHTML = `${recPills}x - ${pillStrength}<sup>*</sup>`;
        if (pillLabelThird) pillLabelThird.textContent = `1x - ${pillStrength}`;
      
        // 💊 Inject pill icons
        function renderPills(container, count) {
          container.innerHTML = "";
          for (let i = 0; i < count; i++) {
            const img = document.createElement("img");
            img.src = pillImage;
            img.alt = `${pillStrength} pill`;
            img.style.height = "20px";
            img.style.marginRight = "2px";
            container.appendChild(img);
          }
        }
      
        if (pillIconsMax) renderPills(pillIconsMax, recPills); // follows your text label
        if (pillIconsRec) renderPills(pillIconsRec, 1);
      }
      
  
    // 💊 Pill strength toggle logic
    const track = document.getElementById("pillToggleTrack");
    const pill40k = document.getElementById("pill40k");
    const pill60k = document.getElementById("pill60k");
    const toggleBox = document.querySelector(".zenpep-pill-toggle-box");
    const outerBox = document.querySelector(".zenpep-dose-box");
    const middleBox = document.querySelector(".zenpep-dose-box--nested");
    const innerBox = document.querySelector(".zenpep-dose-box--inner");
    const pillLabelSecond = document.querySelector(".zenpep-pill-label-second");
    const pillLabelThird = document.querySelector(".zenpep-pill-label-third");
    const lipaseTitle = document.querySelector(".lipase-title");
  
    track.addEventListener("click", () => {
      const isNow60k = track.dataset.state === "40K";
      track.dataset.state = isNow60k ? "60K" : "40K";
      pill40k.classList.toggle("active", !isNow60k);
      pill60k.classList.toggle("active", isNow60k);
  
      toggleBox.style.backgroundColor = isNow60k ? "#C7C4E2" : "#f8eefa";
      toggleBox.style.borderColor = isNow60k ? "#252E64" : "#66004b";
      track.style.borderColor = isNow60k ? "#252E64" : "#66004b";
      outerBox.style.backgroundColor = isNow60k ? "#C7C4E2" : "";
      middleBox.style.backgroundColor = isNow60k ? "#8781BD" : "";
      innerBox.style.backgroundColor = isNow60k ? "#5D5380" : "";
  
      if (pillLabelSecond) pillLabelSecond.style.color = isNow60k ? "#252E64" : "";
      if (pillLabelThird) pillLabelThird.style.color = isNow60k ? "#252E64" : "";
      if (lipaseTitle) lipaseTitle.style.color = isNow60k ? "#252E64" : "#A91C8B";
  
      const storedWeight = parseInt(sessionStorage.getItem("zenpepWeight"), 10);
      if (!isNaN(storedWeight)) {
        const results = calculateDosage(storedWeight);
        updatePillLabels(results);
      }
    });
  
    // 🔘 Modal triggers
    const sampleRxTrigger = document.querySelector(".zenpep-pill-toggle-rx");
    const sampleRxModal = document.getElementById("zenpep-sample-rx-modal");
    const closeSampleRxModalBtn = document.getElementById("closeSampleRxModal");
  
    sampleRxTrigger.addEventListener("click", () => {
      const weight = parseInt(sessionStorage.getItem("zenpepWeight"), 10);
      const is60k = track.dataset.state === "60K";
      const results = calculateDosage(weight);
      const pillsPerMeal = is60k
        ? Math.floor(results.pills60kRec)
        : Math.floor(results.pills40kRec);
      const pillsPerDay = pillsPerMeal * 4;
      const pillsPerMonth = pillsPerDay * 30;
  
      document.getElementById("rx-dosage-pill").textContent = is60k ? "60K" : "40K";
      document.getElementById("rx-info-per-meal").textContent = pillsPerMeal;
      document.getElementById("rx-info-per-day").textContent = pillsPerDay;
      document.getElementById("rx-info-per-month").textContent = `${pillsPerMonth} pills`;
  
      sampleRxModal.classList.remove("hidden");
    });
  
    closeSampleRxModalBtn.addEventListener("click", () => {
      sampleRxModal.classList.add("hidden");
    });
  
    const strengthModalTrigger = document.getElementById("triggerStrengthModal");
    const strengthModal = document.getElementById("zenpep-strength-modal");
    const strengthModalClose = strengthModal.querySelector(".zenpep-modal-close");
    const strengthOverlay = strengthModal.querySelector(".zenpep-modal-overlay");
  
    strengthModalTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      strengthModal.classList.remove("hidden");
    });
  
    strengthModalClose.onclick = () => strengthModal.classList.add("hidden");
    strengthOverlay.onclick = () => strengthModal.classList.add("hidden");
  });
  