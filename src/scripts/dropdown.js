export function initDropdown(dropdownToggle, dropdownMenu, dropdownIcon) {
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

	document.addEventListener('click', (evt) => {
		if (evt.target.matches('.dropdown-toggle')) {
			evt.stopPropagation();
			toggleDropdown();
		} else if (!evt.target.closest('.dropdown-menu')) {
			closeDropdown();
		}
	});
}
