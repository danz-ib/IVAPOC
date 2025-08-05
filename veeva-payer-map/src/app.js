// Veeva CLM Payer Coverage Map Application
// This application displays an interactive US map showing payer coverage for Zenpep drug
// Optimized for iPad Pro in landscape mode

// Mock payer data for each state
const payerData = {
  AL: { name: 'Alabama', coverage: 85, payers: ['Blue Cross Blue Shield AL', 'UnitedHealthcare', 'Cigna', 'Medicaid'] },
  AK: { name: 'Alaska', coverage: 72, payers: ['Premera Blue Cross', 'Aetna', 'Medicaid'] },
  AZ: { name: 'Arizona', coverage: 78, payers: ['Blue Cross Blue Shield AZ', 'UnitedHealthcare', 'Humana', 'Medicaid'] },
  AR: { name: 'Arkansas', coverage: 81, payers: ['Arkansas Blue Cross', 'QualChoice', 'UnitedHealthcare', 'Medicaid'] },
  CA: { name: 'California', coverage: 92, payers: ['Kaiser Permanente', 'Blue Shield CA', 'Health Net', 'Medicaid'] },
  CO: { name: 'Colorado', coverage: 88, payers: ['Kaiser Permanente', 'Anthem', 'Rocky Mountain Health Plans', 'Medicaid'] },
  CT: { name: 'Connecticut', coverage: 94, payers: ['Anthem', 'ConnectiCare', 'Aetna', 'Medicaid'] },
  DE: { name: 'Delaware', coverage: 89, payers: ['Highmark Blue Cross Blue Shield', 'Aetna', 'Medicaid'] },
  FL: { name: 'Florida', coverage: 86, payers: ['Florida Blue', 'UnitedHealthcare', 'Humana', 'Medicaid'] },
  GA: { name: 'Georgia', coverage: 83, payers: ['Anthem', 'Kaiser Permanente', 'UnitedHealthcare', 'Medicaid'] },
  HI: { name: 'Hawaii', coverage: 91, payers: ['Hawaii Medical Service Association', 'Kaiser Permanente', 'Medicaid'] },
  ID: { name: 'Idaho', coverage: 76, payers: ['Blue Cross of Idaho', 'SelectHealth', 'Medicaid'] },
  IL: { name: 'Illinois', coverage: 87, payers: ['Blue Cross Blue Shield IL', 'Aetna', 'UnitedHealthcare', 'Medicaid'] },
  IN: { name: 'Indiana', coverage: 84, payers: ['Anthem', 'UnitedHealthcare', 'Humana', 'Medicaid'] },
  IA: { name: 'Iowa', coverage: 82, payers: ['Wellmark Blue Cross', 'UnitedHealthcare', 'Medicaid'] },
  KS: { name: 'Kansas', coverage: 79, payers: ['Blue Cross Blue Shield KS', 'UnitedHealthcare', 'Medicaid'] },
  KY: { name: 'Kentucky', coverage: 80, payers: ['Anthem', 'Humana', 'UnitedHealthcare', 'Medicaid'] },
  LA: { name: 'Louisiana', coverage: 77, payers: ['Blue Cross Blue Shield LA', 'UnitedHealthcare', 'Medicaid'] },
  ME: { name: 'Maine', coverage: 85, payers: ['Anthem', 'Harvard Pilgrim', 'Medicaid'] },
  MD: { name: 'Maryland', coverage: 90, payers: ['CareFirst', 'Kaiser Permanente', 'UnitedHealthcare', 'Medicaid'] },
  MA: { name: 'Massachusetts', coverage: 95, payers: ['Blue Cross Blue Shield MA', 'Harvard Pilgrim', 'Tufts Health Plan', 'Medicaid'] },
  MI: { name: 'Michigan', coverage: 86, payers: ['Blue Cross Blue Shield MI', 'Priority Health', 'UnitedHealthcare', 'Medicaid'] },
  MN: { name: 'Minnesota', coverage: 89, payers: ['Blue Cross Blue Shield MN', 'HealthPartners', 'UCare', 'Medicaid'] },
  MS: { name: 'Mississippi', coverage: 74, payers: ['Blue Cross Blue Shield MS', 'UnitedHealthcare', 'Medicaid'] },
  MO: { name: 'Missouri', coverage: 81, payers: ['Blue Cross Blue Shield MO', 'Anthem', 'UnitedHealthcare', 'Medicaid'] },
  MT: { name: 'Montana', coverage: 73, payers: ['Blue Cross Blue Shield MT', 'PacificSource', 'Medicaid'] },
  NE: { name: 'Nebraska', coverage: 80, payers: ['Blue Cross Blue Shield NE', 'UnitedHealthcare', 'Medicaid'] },
  NV: { name: 'Nevada', coverage: 78, payers: ['Anthem', 'UnitedHealthcare', 'Humana', 'Medicaid'] },
  NH: { name: 'New Hampshire', coverage: 87, payers: ['Anthem', 'Harvard Pilgrim', 'Medicaid'] },
  NJ: { name: 'New Jersey', coverage: 91, payers: ['Horizon Blue Cross Blue Shield', 'Aetna', 'AmeriHealth', 'Medicaid'] },
  NM: { name: 'New Mexico', coverage: 75, payers: ['Blue Cross Blue Shield NM', 'Presbyterian', 'Medicaid'] },
  NY: { name: 'New York', coverage: 93, payers: ['Empire Blue Cross', 'Excellus', 'Aetna', 'Medicaid'] },
  NC: { name: 'North Carolina', coverage: 84, payers: ['Blue Cross Blue Shield NC', 'UnitedHealthcare', 'Medicaid'] },
  ND: { name: 'North Dakota', coverage: 76, payers: ['Blue Cross Blue Shield ND', 'Sanford Health Plan', 'Medicaid'] },
  OH: { name: 'Ohio', coverage: 85, payers: ['Anthem', 'Medical Mutual', 'UnitedHealthcare', 'Medicaid'] },
  OK: { name: 'Oklahoma', coverage: 78, payers: ['Blue Cross Blue Shield OK', 'UnitedHealthcare', 'Medicaid'] },
  OR: { name: 'Oregon', coverage: 88, payers: ['Kaiser Permanente', 'PacificSource', 'Providence Health Plan', 'Medicaid'] },
  PA: { name: 'Pennsylvania', coverage: 88, payers: ['Independence Blue Cross', 'Highmark', 'Aetna', 'Medicaid'] },
  RI: { name: 'Rhode Island', coverage: 92, payers: ['Blue Cross Blue Shield RI', 'UnitedHealthcare', 'Medicaid'] },
  SC: { name: 'South Carolina', coverage: 82, payers: ['Blue Cross Blue Shield SC', 'UnitedHealthcare', 'Medicaid'] },
  SD: { name: 'South Dakota', coverage: 77, payers: ['Wellmark Blue Cross', 'Sanford Health Plan', 'Medicaid'] },
  TN: { name: 'Tennessee', coverage: 83, payers: ['BlueCross BlueShield TN', 'UnitedHealthcare', 'Cigna', 'Medicaid'] },
  TX: { name: 'Texas', coverage: 81, payers: ['Blue Cross Blue Shield TX', 'UnitedHealthcare', 'Humana', 'Medicaid'] },
  UT: { name: 'Utah', coverage: 86, payers: ['SelectHealth', 'University of Utah Health Plans', 'Medicaid'] },
  VT: { name: 'Vermont', coverage: 90, payers: ['Blue Cross Blue Shield VT', 'MVP Health Care', 'Medicaid'] },
  VA: { name: 'Virginia', coverage: 87, payers: ['Anthem', 'Kaiser Permanente', 'Optima Health', 'Medicaid'] },
  WA: { name: 'Washington', coverage: 90, payers: ['Kaiser Permanente', 'Premera Blue Cross', 'Molina Healthcare', 'Medicaid'] },
  WV: { name: 'West Virginia', coverage: 79, payers: ['Highmark Blue Cross Blue Shield', 'UnitedHealthcare', 'Medicaid'] },
  WI: { name: 'Wisconsin', coverage: 85, payers: ['Anthem', 'WEA Trust', 'UnitedHealthcare', 'Medicaid'] },
  WY: { name: 'Wyoming', coverage: 72, payers: ['Blue Cross Blue Shield WY', 'UnitedHealthcare', 'Medicaid'] }
};

// US States SVG path coordinates for accurate map representation
const statePaths = {
  AL: "M647.3 450.8l2.5 1.6 1.4 2.7 2.5 0.8 1.6 2.7 0 1.9-1.6 2.7-1.9 1.9-0.5 1.9 0.8 1.9 1.6 0.8 0.3 2.2-1.1 1.9-1.6 1.1-1.4 2.2-1.6 0.5-1.9 1.9-2.2 0.8-1.1 1.6-2.7 0.3-1.9-0.3-1.6-1.6-1.9-0.8-1.6-1.6-1.1-1.9-1.6-1.1-1.1-1.9-1.6-1.1-1.1-1.9-0.8-1.9-1.1-1.6-1.4-1.6 0.3-1.9 1.1-1.6 1.6-1.1 1.9-1.6 1.6-1.1 1.9-1.6 1.1-1.9 1.6-1.1 1.9-1.6 1.1-1.9z",
  // Adding simplified paths for demo - in production, you'd use complete SVG paths
  CA: "M158.3 326.5l0.8-1.1 1.4-0.8 1.4-2.7 1.9-1.1 2.2-2.7 1.9-1.9 2.7-1.6 1.9-2.7 2.7-1.6 1.9-2.7 2.7-1.6z",
  TX: "M395.8 393.8l1.4 1.9 2.7 1.6 1.9 2.7 2.7 1.6 1.9 2.7 2.7 1.6 1.9 2.7 2.7 1.6z",
  NY: "M732.3 246.5l2.2 1.1 1.9 1.6 2.7 0.8 1.9 1.6 1.1 1.9 1.6 1.1 1.9 1.6z",
  FL: "M641.8 553.3l1.9 1.6 2.7 0.8 1.9 1.6 2.7 0.8 1.9 1.6 2.7 0.8z"
};

// Current selected state
let selectedState = null;

// Initialize the application
function initApp() {
  loadSVGMap();
  // Set default state to Nebraska
  selectState('NE');
}

// Load the US SVG map and apply heatmap coloring
async function loadSVGMap() {
  try {
    const response = await fetch('assets/us.svg');
    const svgText = await response.text();
    
    // Create a container div and insert the SVG
    const mapContainer = document.querySelector('.map-wrapper');
    mapContainer.innerHTML = svgText;
    
    // Get the SVG element and make it responsive
    const svgElement = mapContainer.querySelector('svg');
    if (svgElement) {
      svgElement.setAttribute('width', '100%');
      svgElement.setAttribute('height', 'auto');
      svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      svgElement.style.maxHeight = '600px';
      
      // Add custom styles for interactivity
      const style = document.createElement('style');
      style.textContent = `
        .map-wrapper path {
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .map-wrapper path:hover {
          opacity: 0.8;
          stroke-width: 2;
        }
        .map-wrapper path.selected {
          stroke: var(--color-purple-100);
          stroke-width: 3;
          filter: drop-shadow(0 0 8px rgba(159, 36, 139, 0.6));
        }
      `;
      document.head.appendChild(style);
      
      // Apply heatmap coloring and add event listeners
      applyHeatmapColoring();
      addStateEventListeners();
      
    } else {
      console.error('SVG element not found');
      renderFallbackMap();
    }
  } catch (error) {
    console.error('Error loading SVG map:', error);
    renderFallbackMap();
  }
}

// Apply heatmap coloring based on coverage data
function applyHeatmapColoring() {
  const paths = document.querySelectorAll('.map-wrapper path');
  
  paths.forEach(path => {
    const stateId = path.id;
    if (stateId && payerData[stateId]) {
      const coverage = payerData[stateId].coverage;
      
      // Determine coverage class based on percentage
      let coverageClass;
      if (coverage >= 85) {
        coverageClass = 'coverage-high';
      } else if (coverage >= 75) {
        coverageClass = 'coverage-medium';
      } else {
        coverageClass = 'coverage-low';
      }
      
      // Apply CSS class for coloring
      path.classList.add(coverageClass);
      path.setAttribute('stroke', '#fff');
      path.setAttribute('stroke-width', '1');
      path.classList.add('state-path');
    } else if (stateId && stateId.length === 2) {
      // States without data get default styling
      path.classList.add('coverage-default');
      path.setAttribute('stroke', '#fff');
      path.setAttribute('stroke-width', '1');
      path.classList.add('state-path');
    }
  });
}

// Add event listeners to state paths
function addStateEventListeners() {
  const paths = document.querySelectorAll('.map-wrapper path');
  
  paths.forEach(path => {
    const stateId = path.id;
    if (stateId && payerData[stateId]) {
      
      // Click event
      path.addEventListener('click', () => {
        selectState(stateId);
        updateDropdownSelection(stateId);
      });
      
      // Hover events for tooltip
      path.addEventListener('mouseenter', (event) => {
        showStateTooltip(event, stateId);
      });
      
      path.addEventListener('mouseleave', () => {
        hideStateTooltip();
      });
      
      // Touch events for mobile
      path.addEventListener('touchstart', (event) => {
        event.preventDefault();
        showStateTooltip(event, stateId);
      });
      
      path.addEventListener('touchend', () => {
        setTimeout(() => {
          hideStateTooltip();
        }, 2000);
      });
    }
  });
}

// Show tooltip with state information
function showStateTooltip(event, stateCode) {
  const stateData = payerData[stateCode];
  if (!stateData) return;
  
  // Remove existing tooltip
  hideStateTooltip();
  
  const tooltip = document.createElement('div');
  tooltip.id = 'state-tooltip';
  tooltip.className = 'tooltip-content';
  tooltip.innerHTML = `
    <strong>${stateData.name}</strong><br>
    ${stateData.coverage}% Coverage<br>
    ${stateData.payers.length} Major Payers
  `;
  
  document.body.appendChild(tooltip);
  
  // Position tooltip
  const rect = tooltip.getBoundingClientRect();
  const x = event.clientX + 10;
  const y = event.clientY - rect.height - 10;
  
  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
  
  // Update position on mouse move
  const updateTooltipPosition = (e) => {
    tooltip.style.left = (e.clientX + 10) + 'px';
    tooltip.style.top = (e.clientY - rect.height - 10) + 'px';
  };
  
  document.addEventListener('mousemove', updateTooltipPosition);
  
  // Clean up on mouse leave
  setTimeout(() => {
    document.removeEventListener('mousemove', updateTooltipPosition);
  }, 1000);
}

function hideStateTooltip() {
  const tooltip = document.getElementById('state-tooltip');
  if (tooltip) {
    tooltip.remove();
  }
}

// Render fallback map if SVG fails to load
function renderFallbackMap() {
  const mapContainer = document.getElementById('map-container');
  mapContainer.innerHTML = `
    <div class="fallback-map">
      <h3>Interactive State Coverage</h3>
      <p>Click on any state to view coverage information:</p>
      <div class="state-grid">
        ${Object.keys(payerData).map(stateCode => {
          const state = payerData[stateCode];
          const coverageClass = state.coverage >= 85 ? 'coverage-high' : 
                              state.coverage >= 75 ? 'coverage-medium' : 'coverage-low';
          return `
            <button class="state-button ${coverageClass}" onclick="selectState('${stateCode}')">
              ${stateCode}<br><small>${state.coverage}%</small>
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// Show welcome message when no state is selected
function showWelcomeMessage() {
  const stateData = document.getElementById('state-data');
  stateData.innerHTML = `
    <div class="welcome-message">
      <h2>ZENPEP Payer Coverage</h2>
      <p>Click on any state in the map to view detailed coverage information, including major payers and coverage percentages.</p>
      <div class="legend">
        <h3>Coverage Legend</h3>
        <div class="legend-item">
          <div class="legend-color coverage-high"></div>
          <span>High Coverage (85%+)</span>
        </div>
        <div class="legend-item">
          <div class="legend-color coverage-medium"></div>
          <span>Medium Coverage (75-84%)</span>
        </div>
        <div class="legend-item">
          <div class="legend-color coverage-low"></div>
          <span>Low Coverage (<75%)</span>
        </div>
      </div>
    </div>
  `;
}

// Select state from dropdown
function selectStateFromDropdown(stateCode) {
  if (stateCode) {
    selectState(stateCode);
  }
}

// Update dropdown selection when state is selected via map
function updateDropdownSelection(stateCode) {
  const dropdown = document.getElementById('state-dropdown');
  if (dropdown) {
    dropdown.value = stateCode;
  }
}

// Select a state and update the display
function selectState(stateCode) {
  if (!payerData[stateCode]) return;
  
  selectedState = stateCode;
  
  // Update map selection
  document.querySelectorAll('.map-wrapper path').forEach(path => {
    path.classList.remove('selected');
  });
  
  const selectedPath = document.querySelector(`.map-wrapper path#${stateCode}`);
  if (selectedPath) {
    selectedPath.classList.add('selected');
  }
  
  // Update state panel
  showStateData(stateCode);
  
  // Update dropdown
  updateDropdownSelection(stateCode);
}

// Show state data in the left panel
function showStateData(stateCode) {
  const stateData = payerData[stateCode];
  if (!stateData) return;
  
  // Update state name
  document.getElementById('state-name').textContent = stateData.name;
  
  // Update coverage percentage
  document.getElementById('coverage-percentage').textContent = stateData.coverage + '%';
  
  // Update coverage description
  document.getElementById('coverage-description').textContent = 
    `ZENPEP has ${stateData.coverage}% payer coverage in ${stateData.name}.`;
  
  // Update payers list
  const payersList = document.getElementById('payers-list');
  payersList.innerHTML = stateData.payers.map(payer => 
    `<div class="payer-item">${payer}</div>`
  ).join('');
  
  // Add coverage class for styling
  const coverageElement = document.getElementById('coverage-percentage');
  coverageElement.className = 'coverage-percentage';
  if (stateData.coverage >= 85) {
    coverageElement.classList.add('coverage-high');
  } else if (stateData.coverage >= 75) {
    coverageElement.classList.add('coverage-medium');
  } else {
    coverageElement.classList.add('coverage-low');
  }
}

// Show patient assistance information
function showPatientAssistance() {
  if (!selectedState) return;
  
  const stateData = payerData[selectedState];
  alert(`Patient Assistance Programs for ${stateData.name}:\n\n` +
        `• ZENPEP Patient Assistance Program\n` +
        `• Co-pay assistance available\n` +
        `• Income-based eligibility\n` +
        `• Contact: 1-800-ZENPEP-1\n\n` +
        `For more information, visit: zenpep.com/assistance`);
}

// Show prior authorization information
function showPriorAuth() {
  if (!selectedState) return;
  
  const stateData = payerData[selectedState];
  alert(`Prior Authorization Information for ${stateData.name}:\n\n` +
        `• Prior authorization required for most payers\n` +
        `• Documentation requirements vary by payer\n` +
        `• Average approval time: 5-7 business days\n` +
        `• Contact your local representative for assistance\n\n` +
        `For detailed requirements, visit: zenpep.com/pa`);
}

// Navigation functions for new layout
function navigateToSection(section) {
  // Remove active class from all nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Add active class to clicked item
  const clickedItem = event.target.closest('.nav-item');
  if (clickedItem) {
    clickedItem.classList.add('active');
  }
  
  // Handle navigation (demo mode)
  const messages = {
    'about-epi': 'About EPI section would be displayed here',
    'dosing': 'Dosing information would be displayed here',
    'coverage-savings': 'Coverage & savings information is currently displayed',
    'patient-profiles': 'Patient profiles would be displayed here',
    'clinical-data': 'Clinical data would be displayed here',
    'zenpep-simple-starts': 'ZENPEP for Simple Starts would be displayed here'
  };
  
  if (section !== 'coverage-savings') {
    alert(`Navigation Demo: ${messages[section]}`);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Veeva CLM specific functions
if (typeof com !== 'undefined' && com.veeva) {
  // Veeva CLM environment detected
  console.log('Running in Veeva CLM environment');
  
  // Add Veeva-specific tracking
  function trackStateSelection(stateCode) {
    com.veeva.clm.createRecord('Interaction__c', {
      'State_Selected__c': stateCode,
      'Presentation_Name__c': 'Zenpep Payer Map',
      'Interaction_Type__c': 'State Selection'
    }, function(result) {
      console.log('Veeva interaction tracked:', result);
    });
  }
  
  // Override selectState to include tracking
  const originalSelectState = selectState;
  selectState = function(stateCode) {
    originalSelectState(stateCode);
    trackStateSelection(stateCode);
  };
}

// Legacy navigation functions (kept for compatibility)
function navigateToSlide(slideType) {
  // Add visual feedback
  highlightNavItem(slideType);
  
  // Track the navigation attempt
  if (typeof com !== 'undefined' && com.veeva && com.veeva.clm) {
    // Veeva CLM navigation
    switch(slideType) {
      case 'home':
        com.veeva.clm.gotoSlide('01-home.zip', 'Home_Slide');
        break;
      case 'back':
        com.veeva.clm.prevSlide();
        break;
      case 'forward':
        com.veeva.clm.nextSlide();
        break;
      case 'resources':
        com.veeva.clm.gotoSlide('05-resources.zip', 'Resources_Slide');
        break;
      case 'contact':
        com.veeva.clm.gotoSlide('06-contact.zip', 'Contact_Slide');
        break;
    }
  } else {
    // Demo mode - show alert
    showNavigationDemo(slideType);
  }
}

function openEmailModal() {
  highlightNavItem('email');
  
  if (typeof com !== 'undefined' && com.veeva && com.veeva.clm) {
    // Veeva CLM email functionality
    com.veeva.clm.launchEmailComposer('sales@zenpep.com', 'Payer Coverage Inquiry', 
      'Hello,\n\nI would like more information about payer coverage for our territory.\n\nThank you!');
  } else {
    // Demo mode
    alert('📧 Email Demo\n\nIn Veeva CLM, this would open the email composer with:\n\nTo: sales@zenpep.com\nSubject: Payer Coverage Inquiry\nBody: Coverage information request');
  }
}

function highlightNavItem(itemType) {
  // Remove active class from all nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Add active class to clicked item
  const activeItem = document.querySelector(`.nav-${itemType}`);
  if (activeItem) {
    activeItem.classList.add('active');
    
    // Remove active class after animation
    setTimeout(() => {
      activeItem.classList.remove('active');
    }, 300);
  }
}

function showNavigationDemo(slideType) {
  const messages = {
    home: '🏠 Navigation Demo\n\nWould navigate to: Home Slide\n(01-home.zip)',
    back: '⬅️ Navigation Demo\n\nWould navigate to: Previous Slide',
    forward: '➡️ Navigation Demo\n\nWould navigate to: Next Slide',
    resources: '📚 Navigation Demo\n\nWould navigate to: Resources Slide\n(05-resources.zip)',
    contact: '📞 Navigation Demo\n\nWould navigate to: Contact Slide\n(06-contact.zip)'
  };
  
  alert(messages[slideType] || 'Navigation demo');
}