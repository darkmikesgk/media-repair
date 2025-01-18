async function loadPricingData() {
  try {
		const response = await fetch('../data/pricingData.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to load pricing data:', error);
    return {};
  }
}

function updateTable(device, pricingData) {
	const tableBody = document.querySelector('#service-table-body');
	tableBody.innerHTML = '';

	const services = pricingData[device];
	if (services) {
	services.forEach(({ service, price }, index) => {
		const row = document.createElement('tr');
		row.classList.add('service-table-body__row');

		const serviceCell = document.createElement('td');
		serviceCell.classList.add('service-table-body__row-cell-service');
		serviceCell.textContent = service;

		const priceCell = document.createElement('td');
		priceCell.classList.add('service-table-body__row-cell');
		priceCell.textContent = price;

		if (index === 0) {
			priceCell.classList.add('first-price');
		} else if (index === services.length - 1) {
			serviceCell.classList.add('last-price');
			priceCell.classList.add('last-price');
		}

		row.appendChild(serviceCell);
		row.appendChild(priceCell);
		tableBody.appendChild(row);
	});
  } else {
    console.error(`No data found for device: ${device}`);
  }
}

function handleButtonClicks(pricingData) {
	const buttonsContainer = document.getElementById('iphone-buttons');

	buttonsContainer.addEventListener('click', (event) => {
		if (event.target.tagName === 'BUTTON') {
			const device = event.target.dataset.device;
      updateTable(device, pricingData); // Обновить таблицу

			document.querySelectorAll('#iphone-buttons button').forEach((button) => {
				button.classList.remove('active');
			});

			event.target.classList.add('active');
		}
	});
}

// Инициализация таблицы по умолчанию
export async function initPage() {
	const pricingData = await loadPricingData();
	updateTable('iPhone SE', pricingData); // Показываем цены для первого устройства
	handleButtonClicks(pricingData); // Навешиваем обработчики событий

	// Установить активную кнопку по умолчанию
	const defaultButton = document.querySelector(
		"#iphone-buttons button[data-device='iPhone SE']"
	);
	if (defaultButton) {
		defaultButton.classList.add('active');
	}
}
