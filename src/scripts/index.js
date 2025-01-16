import '../styles/style.scss';
import { createCards } from './card.js';
import { initSlider } from './slider.js';
import { initDropdown } from './dropdown.js';
import { openModal, toggleFormListener } from './modal.js';
import { validateForm } from './validateForm.js';

const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownIcon = document.querySelector('.dropdown-icon');
const phoneImg = document.getElementById('phoneImg');
const modal = document.getElementById('modal');
const openButtons = document.querySelectorAll('.callButton');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const submitButton = document.getElementById('submit__button');
const form = document.getElementById('modal__form');

validateForm(phoneInput, nameInput, submitButton);

function renderLoading(isLoading, buttonElement) {
	if (isLoading) {
		// buttonElement.textContent = 'Отправка...';
		buttonElement.disabled = true;
	} else {
		// buttonElement.textContent = 'Заказать звонок';
		buttonElement.disabled = false;
	}
}

// Функция для обработки отправки формы
function handleSubmitForm(evt) {
	evt.preventDefault();

	const form = evt.target;
	const name = form.querySelector('#name').value;
	const phone = form.querySelector('#phone').value;
	const submitButton = form.querySelector('button[type="submit"]');
	const modalMessage = document.getElementById('modal-message');

	renderLoading(true, submitButton);

	fetch('http://localhost:3000/send-email', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			name: name,
			phone: phone,
		}),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => {
			if (data.success) {
				form.style.display = 'none';
				modalMessage.style.display = 'block';
				modalMessage.classList.add('modal-message');
				modalMessage.textContent = 'Спасибо за заявку!';
			} else {
				form.style.display = 'none';
				modalMessage.style.display = 'block';
				modalMessage.classList.add('modal-message');
				modalMessage.textContent =
					'Ошибка отправки формы. Перезагрузите страницу и попробуйте снова.'; // Ошибка отправки
			}
		})
		.catch((error) => {
			console.error('Error:', error);
			form.style.display = 'none';
			modalMessage.style.display = 'block';
			modalMessage.classList.add('modal-message');
			modalMessage.textContent =
				'Ошибка отправки формы. Перезагрузите страницу и попробуйте снова.'; // Ошибка в процессе отправки
		})
		.finally(() => {
			renderLoading(false, submitButton);
		});
}

initDropdown(dropdownToggle, dropdownMenu, dropdownIcon);
initSlider(phoneImg);
createCards();
openButtons.forEach((button) => {
	button.addEventListener('click', () => {
		modal.onCloseCallback = () =>
			toggleFormListener(modal, form, handleSubmitForm);
		openModal(modal);
		toggleFormListener(modal, form, handleSubmitForm);
	});
});
