import './common.js';
import { loadDataFromJson, updateTable } from './table.js';

const reviewsLink = document.getElementById('reviews-link');

if (reviewsLink) {
	reviewsLink.addEventListener('click', (evt) => {
		evt.preventDefault();
		window.location.href = '/?section=reviews';
	});
}

async function loadPricingData() {
	return loadDataFromJson('../data/pricingData.json');
}

function handleButtonClicks(pricingData) {
	const buttonsContainer = document.getElementById('iphone-buttons');

	buttonsContainer.addEventListener('click', (event) => {
		if (event.target.tagName === 'BUTTON') {
			const device = event.target.dataset.device;
			const tableBody = document.querySelector('#service-table-body');
			updateTable(tableBody, device, pricingData);

			document.querySelectorAll('#iphone-buttons button').forEach((button) => {
				button.classList.remove('active');
			});

			event.target.classList.add('active');
		}
	});
}

export async function initPage() {
	const pricingData = await loadPricingData();
	const tableBody = document.querySelector('#service-table-body');
	updateTable(tableBody, 'iPhone SE', pricingData);

	handleButtonClicks(pricingData);

	const defaultButton = document.querySelector(
		"#iphone-buttons button[data-device='iPhone SE']"
	);
	if (defaultButton) {
		defaultButton.classList.add('active');
	}
}

initPage();
