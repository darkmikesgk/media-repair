import '../styles/style.scss';
import { createCards } from './card.js';
import { initSlider } from './slider.js';
import { initDropdown } from './dropdown.js';

const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownIcon = document.querySelector('.dropdown-icon');
const phoneImg = document.getElementById('phoneImg');

initDropdown(dropdownToggle, dropdownMenu, dropdownIcon);
initSlider(phoneImg);
createCards();