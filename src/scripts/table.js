import { pricingData } from './prices.js';

// Функция для обновления таблицы
function updateTable(device) {
  const tableBody = document.querySelector("#service-table tbody");
  tableBody.innerHTML = ""; // Очистить таблицу

  const services = pricingData[device];
  services.forEach(({ service, price }) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${service}</td>
      <td>${price} ₽</td>
    `;
    tableBody.appendChild(row);
  });
}

// Обработчик кликов по кнопкам
function handleButtonClicks() {
  const buttonsContainer = document.getElementById("device-buttons");

  buttonsContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const device = event.target.dataset.device;
      updateTable(device); // Обновить таблицу
    }
  });
}

// Инициализация таблицы по умолчанию
export function initPage() {
  updateTable("iPhone 5"); // Показываем цены для первого устройства
  handleButtonClicks(); // Навешиваем обработчики событий
}
