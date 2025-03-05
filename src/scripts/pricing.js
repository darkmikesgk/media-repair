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

function handleModelButtonClicks(
	pricingData,
	currentServiceType,
	buttonsContainerId,
	serviceTypeButtonsContainerId
) {
	const buttonsContainer = document.getElementById(buttonsContainerId);

	buttonsContainer.addEventListener('click', (event) => {
		if (event.target.tagName === 'BUTTON') {
			const device = event.target.dataset.device;
			const tableBody = document.querySelector('#service-table-body');
			updateTable(tableBody, device, currentServiceType, pricingData);

			document
				.querySelectorAll(`#${buttonsContainerId} button`)
				.forEach((button) => {
					button.classList.remove('active-model');
				});

			event.target.classList.add('active-model');

			// Убедиться, что активная кнопка услуги остается актуальной
			const activeServiceButton = document.querySelector(
				`#${serviceTypeButtonsContainerId} button.active-service`
			);
			if (activeServiceButton) {
				const activeServiceType = activeServiceButton.dataset.serviceType;
				updateTable(tableBody, device, activeServiceType, pricingData);
			}
		}
	});
}

function handleServiceTypeButtonClicks(
	pricingData,
	currentDevice,
	serviceTypeButtonsContainerId
) {
	const buttonsContainer = document.getElementById(
		serviceTypeButtonsContainerId
	);

	buttonsContainer.addEventListener('click', (event) => {
		if (event.target.tagName === 'BUTTON') {
			const serviceType = event.target.dataset.serviceType;
			const tableBody = document.querySelector('#service-table-body');
			updateTable(tableBody, currentDevice, serviceType, pricingData);

			document
				.querySelectorAll(`#${serviceTypeButtonsContainerId} button`)
				.forEach((button) => {
					button.classList.remove('active-service');
				});

			event.target.classList.add('active-service');
		}
	});
}

async function initPage(jsonPath, defaultDevice, buttonsContainerId) {
	const pricingData = await loadPricingData(jsonPath);
	const tableBody = document.querySelector('#service-table-body');
	updateTable(tableBody, defaultDevice, null, pricingData);

	handleModelButtonClicks(pricingData, null, buttonsContainerId);

	// Установить активную кнопку модели по умолчанию
	const defaultModelButton = document.querySelector(
		`#${buttonsContainerId} button[data-device='${defaultDevice}']`
	);
	if (defaultModelButton) {
		defaultModelButton.classList.add('active-model');
	}
}

async function initPageWithServiceTypes(
	jsonPath,
	defaultDevice,
	defaultServiceType,
	modelButtonsContainerId,
	serviceTypeButtonsContainerId
) {
	const pricingData = await loadPricingData(jsonPath);
	const tableBody = document.querySelector('#service-table-body');
	updateTable(tableBody, defaultDevice, defaultServiceType, pricingData);

	handleModelButtonClicks(
		pricingData,
		defaultServiceType,
		modelButtonsContainerId,
		serviceTypeButtonsContainerId
	);
	handleServiceTypeButtonClicks(
		pricingData,
		defaultDevice,
		serviceTypeButtonsContainerId
	);

	// Установить активную кнопку модели по умолчанию
	const defaultModelButton = document.querySelector(
		`#${modelButtonsContainerId} button[data-device='${defaultDevice}']`
	);
	if (defaultModelButton) {
		defaultModelButton.classList.add('active-model');
	}

	// Установить активную кнопку услуги "Ремонт" по умолчанию
	const defaultServiceTypeButton = document.querySelector(
		`#${serviceTypeButtonsContainerId} button[data-service-type='${defaultServiceType}']`
	);
	if (defaultServiceTypeButton) {
		defaultServiceTypeButton.classList.add('active-service');
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

// Инициализация для страницы планшетов
if (document.body.dataset.page === 'tablets') {
	initPage('../data/pricingDataTablets.json', 'Irbis', 'tablet-buttons');
}

// Инициализация для страницы ноутбуков
if (document.body.dataset.page === 'laptops') {
	initPageWithServiceTypes(
		'../data/pricingDataLaptops.json',
		'Hp',
		'repair',
		'laptop-buttons',
		'service-type-buttons'
	);
}
