import '../styles/style.scss';
import { openModal, toggleFormListener } from './modal.js';
import { validateForm } from './validateForm.js';
import { initDropdown } from './dropdown.js';
import cookieHTML from '../components/cookieNotice.html';

const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownIcon = document.querySelector('.dropdown-icon');
const modal = document.getElementById('modal');
const openButtons = document.querySelectorAll('.callButton');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const submitButton = document.getElementById('submit__button');
const form = document.getElementById('modal__form');
const scrollToTopButton = document.getElementById('scrollToTopButton');
const findUsAnchor = document.getElementById('find-us-link');
const findUsSection = document.getElementById('find-us-section');

validateForm(phoneInput, nameInput, submitButton);

function renderLoading(isLoading, buttonElement) {
	if (isLoading) {
		buttonElement.disabled = true;
	} else {
		buttonElement.disabled = false;
	}
}

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

findUsAnchor.addEventListener('click', function (evt) {
	evt.preventDefault();
	findUsSection.scrollIntoView({
		behavior: 'smooth',
	});
});

openButtons.forEach((button) => {
	button.addEventListener('click', () => {
		modal.onCloseCallback = () =>
			toggleFormListener(modal, form, handleSubmitForm);
		openModal(modal);
		toggleFormListener(modal, form, handleSubmitForm);
	});
});

document.addEventListener('scroll', function () {
	if (
		document.body.scrollTop > 200 ||
		document.documentElement.scrollTop > 200
	) {
		scrollToTopButton.style.display = 'block';
		// Добавляем обработчик события click, если его еще нет
		if (!scrollToTopButton.hasClickHandler) {
			const scrollToTopHandler = function () {
				document.body.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Для Safari
				document.documentElement.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				}); // Для Chrome, Firefox, IE и Opera
			};
			scrollToTopButton.addEventListener('click', scrollToTopHandler);
			scrollToTopButton.hasClickHandler = true; // Устанавливаем флаг, что обработчик добавлен
			scrollToTopButton.scrollToTopHandler = scrollToTopHandler; // Сохраняем ссылку на обработчик
		}
	} else {
		scrollToTopButton.style.display = 'none';
		// Удаляем обработчик события click, если он был добавлен
		if (scrollToTopButton.hasClickHandler) {
			scrollToTopButton.removeEventListener(
				'click',
				scrollToTopButton.scrollToTopHandler
			);
			scrollToTopButton.hasClickHandler = false; // Сбрасываем флаг
			scrollToTopButton.scrollToTopHandler = null; // Удаляем ссылку на обработчик
		}
	}
});

function initImageZoom() {
	const images = document.querySelectorAll(
		'.where-is-we_image-container-item img'
	);
	let currentModal = null; // Храним ссылку на текущее модальное окно

	function closeModal() {
		if (currentModal) {
			document.body.removeChild(currentModal);
			document.body.classList.remove('no-scroll');
			currentModal = null;
		}
	}

	images.forEach((img) => {
		img.addEventListener('click', function () {
			// Закрываем предыдущее модальное окно, если оно есть
			closeModal();

			// Блокируем прокрутку
			document.body.classList.add('no-scroll');

			// Создаем модальное окно
			currentModal = document.createElement('div');
			currentModal.className = 'enlarged-img';

			const enlargedImg = document.createElement('img');
			enlargedImg.src = this.src;
			enlargedImg.alt = this.alt;

			currentModal.appendChild(enlargedImg);
			document.body.appendChild(currentModal);

			// Закрытие по клику
			currentModal.addEventListener('click', closeModal);
		});
	});

	// Закрытие по ESC
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') {
			closeModal();
		}
	});
}
initImageZoom();

export function initCookieNotice() {
	if (!localStorage.getItem('cookiesAccepted')) {
		document.body.insertAdjacentHTML('beforeend', cookieHTML);
		const notice = document.getElementById('cookieNotice');
		const acceptBtn = document.getElementById('cookieAccept');

		notice.style.display = 'block';
		setTimeout(() => notice.classList.add('show'), 50);

		acceptBtn.addEventListener('click', () => {
			localStorage.setItem('cookiesAccepted', 'true');
			notice.classList.remove('show');
			setTimeout(() => (notice.style.display = 'none'), 500);
		});
	}
}
