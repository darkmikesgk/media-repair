export async function loadDataFromJson(jsonPath) {
	try {
		const response = await fetch(jsonPath);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Failed to load data:', error);
		return {};
	}
}

export function updateTable(tableBody, device, serviceType, data) {
	tableBody.innerHTML = '';

	const services = serviceType ? data[device]?.[serviceType] : data[device];
	if (services && Array.isArray(services)) {
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
		console.error(
			`No data found for device: ${device}` +
				(serviceType ? ` and service type: ${serviceType}` : '')
		);
	}
}
