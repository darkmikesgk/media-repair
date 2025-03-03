import './common.js';
import { loadDataFromJson, updateTable } from './table.js';

const reviewsLink = document.getElementById('reviews-link');

if (reviewsLink) {
  reviewsLink.addEventListener('click', (evt) => {
    evt.preventDefault();
    window.location.href = '/?section=reviews';
  });
}

async function loadPricingData(jsonPath) {
  return loadDataFromJson(jsonPath);
}

function handleButtonClicks(pricingData, buttonsContainerId) {
  const buttonsContainer = document.getElementById(buttonsContainerId);

  buttonsContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const device = event.target.dataset.device;
      const tableBody = document.querySelector('#service-table-body');
      updateTable(tableBody, device, pricingData);

      document.querySelectorAll(`#${buttonsContainerId} button`).forEach((button) => {
        button.classList.remove('active');
      });

      event.target.classList.add('active');
    }
  });
}

export async function initPage(jsonPath, defaultDevice, buttonsContainerId) {
  const pricingData = await loadPricingData(jsonPath);
  const tableBody = document.querySelector('#service-table-body');
  updateTable(tableBody, defaultDevice, pricingData);

  handleButtonClicks(pricingData, buttonsContainerId);

  const defaultButton = document.querySelector(
    `#${buttonsContainerId} button[data-device='${defaultDevice}']`
  );
  if (defaultButton) {
    defaultButton.classList.add('active');
  }
}

// Инициализация для страницы iPhone
if (document.body.dataset.page === 'iphones') {
  initPage('../data/pricingDataIphones.json', 'iPhone SE', 'iphone-buttons');
}

// Инициализация для страницы других телефонов
if (document.body.dataset.page === 'phones') {
  initPage('../data/pricingDataPhones.json', 'Meizu', 'phone-buttons');
}
