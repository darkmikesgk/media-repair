export function openModal(elem) {
	const form = elem.querySelector('#modal__form');
	const messageDiv = elem.querySelector('#modal-message');

	resetModal(form, messageDiv);

	elem.classList.add('modal-is-opened');
	document.addEventListener('keydown', escCloseModal);
	elem.addEventListener('click', clickCloseModal);
}

export function closeModal(elem) {
	const form = elem.querySelector('#modal__form');
	form.reset();
	elem.classList.remove('modal-is-opened');
	document.removeEventListener('keydown', escCloseModal);
	elem.removeEventListener('click', clickCloseModal);
}

function escCloseModal(evt) {
	if (evt.key === 'Escape') {
		const openedModal = document.querySelector('.modal-is-opened');
		if (openedModal) {
			closeModal(openedModal);
		}
	}
}

function clickCloseModal(evt) {
	const isCloseButton =
		evt.target.classList.contains('modal__close') ||
		evt.target.classList.contains('modal__close-button');
	if (isCloseButton || evt.target === evt.currentTarget) {
		closeModal(evt.currentTarget);
	}
}

function resetModal(form, messageDiv) {
	form.style.display = 'flex';
	messageDiv.style.display = 'none';
	messageDiv.classList.remove('modal-message');
}
