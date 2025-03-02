import './common.js';
import { loadDataFromJson, updateTable } from './table.js';

const reviewsLink = document.getElementById('reviews-link');

if (reviewsLink) {
  reviewsLink.addEventListener('click', (evt) => {
    evt.preventDefault();
    window.location.href = '/?section=reviews';
  });
}

async function loadPricingDataPhones() {
  return loadDataFromJson('../data/pricingDataPhones.json');
}

function handleButtonClicks(pricingData) {
  const buttonsContainer = document.getElementById('phone-buttons');

  buttonsContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const device = event.target.dataset.device;
      const tableBody = document.querySelector('#service-table-body');
      updateTable(tableBody, device, pricingData);

      document.querySelectorAll('#phone-buttons button').forEach((button) => {
        button.classList.remove('active');
      });

      event.target.classList.add('active');
    }
  });
}

export async function initPage() {
  const pricingData = await loadPricingDataPhones();
  const tableBody = document.querySelector('#service-table-body');
  updateTable(tableBody, 'Meizu', pricingData);

  handleButtonClicks(pricingData);

  const defaultButton = document.querySelector(
    "#phone-buttons button[data-device='Meizu']"
  );
  if (defaultButton) {
    defaultButton.classList.add('active');
  }
}

initPage();
