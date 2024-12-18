export function initDropdown(dropdownToggle, dropdownMenu, dropdownIcon) {
	function toggleDropdown() {
		dropdownMenu.classList.toggle('show');
		dropdownMenu.classList.toggle('rotate');
		dropdownMenu.classList.toggle('active');
	}

	function closeDropdown() {
		dropdownMenu.classList.remove('show');
		dropdownMenu.classList.remove('rotate');
		dropdownMenu.classList.remove('active');
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
