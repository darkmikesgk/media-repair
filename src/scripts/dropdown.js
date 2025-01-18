export function initDropdown(dropdownToggle, dropdownMenu, dropdownIcon) {
  let isDropdownOpen = false; // Флаг для отслеживания состояния дропдауна

  function toggleDropdown() {
    dropdownMenu.classList.toggle('show');
    dropdownIcon.classList.toggle('rotate');
    dropdownToggle.classList.toggle('active');
    isDropdownOpen = !isDropdownOpen; // Меняем состояние флага

    if (isDropdownOpen) {
      // Если дропдаун открылся, добавляем обработчик для кликов вне дропдауна
      document.addEventListener('click', closeDropdownOnClickOutside);
    } else {
      // Если дропдаун закрылся, удаляем обработчик
      document.removeEventListener('click', closeDropdownOnClickOutside);
    }
  }

  function closeDropdown() {
    dropdownMenu.classList.remove('show');
    dropdownIcon.classList.remove('rotate');
    dropdownToggle.classList.remove('active');
    isDropdownOpen = false; // Сбрасываем флаг
    document.removeEventListener('click', closeDropdownOnClickOutside);
  }

  function closeDropdownOnClickOutside(evt) {
    if (!evt.target.closest('.dropdown')) {
      closeDropdown();
    }
  }

  dropdownToggle.addEventListener('click', (evt) => {
    evt.stopPropagation();
    toggleDropdown();
  });
}
