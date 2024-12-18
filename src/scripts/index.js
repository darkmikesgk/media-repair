import '../styles/style.scss'
import { createCards } from "./card.js";

document.addEventListener('DOMContentLoaded', function() {
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const dropdownIcon = document.querySelector('.dropdown-icon');

  function toggleDropdown() {
    dropdownMenu.classList.toggle('show');
    dropdownIcon.classList.toggle('rotate');
    dropdownToggle.classList.toggle('active');
  }

  function closeDropdown() {
    dropdownMenu.classList.remove('show');
    dropdownIcon.classList.remove('rotate');
    dropdownToggle.classList.remove('active');
  }

  document.addEventListener('click', function(event) {
    if (event.target.matches('.dropdown-toggle')) {
      event.stopPropagation();
      toggleDropdown();
    } else if (!event.target.closest('.dropdown-menu')) {
      closeDropdown();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  createCards();
});
