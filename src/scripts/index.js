import '../styles/style.scss';
import { createCards } from './card.js';
import { initSlider } from './slider.js';
import { initDropdown } from './dropdown.js';
import { openModal, closeModal } from './modal.js';
import { handleSubmitForm } from './submit.js';

const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownIcon = document.querySelector('.dropdown-icon');
const phoneImg = document.getElementById('phoneImg');
const modal = document.getElementById('modal'); // Получаем модальное окно
const openButtons = document.querySelectorAll('.callButton'); // Кнопка для открытия модального окна
const form = document.getElementById('modal__form');

initDropdown(dropdownToggle, dropdownMenu, dropdownIcon);
initSlider(phoneImg);
createCards();
openButtons.forEach((button) => {
  button.addEventListener('click', () => openModal(modal));
});
form.addEventListener('submit', handleSubmitForm);