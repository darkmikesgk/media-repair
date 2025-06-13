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
	state,
	buttonsContainerId,
	serviceTypeButtonsContainerId
) {
	const buttonsContainer = document.getElementById(buttonsContainerId);

	buttonsContainer.addEventListener('click', (event) => {
		if (event.target.tagName === 'BUTTON') {
			const device = event.target.dataset.device;
			state.currentDevice = device;

			const tableBody = document.querySelector('#service-table-body');

			const deviceData = pricingData[device];

			if (Array.isArray(deviceData)) {
				// Структура без типов услуг (телефоны, айфоны)
				updateTable(tableBody, device, null, pricingData);
			} else {
				// Структура с типами услуг (ноутбуки)
				if (!state.currentServiceType) {
					const serviceTypes = Object.keys(deviceData || {});
					state.currentServiceType =
						serviceTypes.length > 0 ? serviceTypes[0] : null;
				}
				updateTable(tableBody, device, state.currentServiceType, pricingData);
			}

			document
				.querySelectorAll(`#${buttonsContainerId} button`)
				.forEach((button) => {
					button.classList.remove('active-model');
				});
			event.target.classList.add('active-model');
		}
	});
}

function handleServiceTypeButtonClicks(
	pricingData,
	state,
	serviceTypeButtonsContainerId
) {
	const buttonsContainer = document.getElementById(
		serviceTypeButtonsContainerId
	);

	buttonsContainer.addEventListener('click', (event) => {
		if (event.target.tagName === 'BUTTON') {
			const serviceType = event.target.dataset.serviceType;
			state.currentServiceType = serviceType; // обновляем текущую услугу
			const tableBody = document.querySelector('#service-table-body');

			updateTable(tableBody, state.currentDevice, serviceType, pricingData);

			// сбрасываем активные кнопки услуг
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

	const state = {
		currentDevice: defaultDevice,
		currentServiceType: null,
	};

	updateTable(tableBody, defaultDevice, null, pricingData);

	handleModelButtonClicks(pricingData, state, buttonsContainerId);

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

	const state = {
		currentDevice: defaultDevice,
		currentServiceType: defaultServiceType,
	};

	updateTable(
		tableBody,
		state.currentDevice,
		state.currentServiceType,
		pricingData
	);

	handleModelButtonClicks(
		pricingData,
		state,
		modelButtonsContainerId,
		serviceTypeButtonsContainerId
	);
	handleServiceTypeButtonClicks(
		pricingData,
		state,
		serviceTypeButtonsContainerId
	);

	const defaultModelButton = document.querySelector(
		`#${modelButtonsContainerId} button[data-device='${defaultDevice}']`
	);
	if (defaultModelButton) {
		defaultModelButton.classList.add('active-model');
	}

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

// Инициализация для страницы телевизоров
if (document.body.dataset.page === 'tv') {
	initPage('../data/pricingDataTv.json', 'Philips', 'tv-buttons');
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
