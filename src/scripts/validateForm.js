export function validateForm(phoneInput, nameInput, submitButton) {
	function isPhoneValid(phone) {
		const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
		return phoneRegex.test(phone);
	}

	// Функция для проверки корректности имени
	function isNameValid(name) {
		if (!name) {
			return false;
		}
		if (name.length < 2) {
			return false;
		}
		if (/\d/.test(name)) {
			return false;
		}
		return true;
	}

	// Функция для отображения ошибки
	function showError(input, message) {
		const errorElement = input.nextElementSibling;
		if (errorElement && errorElement.classList.contains('modal__error')) {
			errorElement.textContent = message;
			errorElement.classList.add('modal__error_visible');
			input.classList.add('modal__input_type_error');
		}
	}

	// Функция для скрытия ошибки
	function hideError(input) {
		const errorElement = input.nextElementSibling;
		if (errorElement && errorElement.classList.contains('modal__error')) {
			errorElement.textContent = '';
			errorElement.classList.remove('modal__error_visible');
			input.classList.remove('modal__input_type_error');
		}
	}

	// Функция для переключения состояния кнопки сабмита
	function toggleSubmitButton() {
		const isFormValid =
			isNameValid(nameInput.value) && isPhoneValid(phoneInput.value);
		if (isFormValid) {
			submitButton.classList.remove('modal__button_disabled');
			submitButton.disabled = false;
		} else {
			submitButton.classList.add('modal__button_disabled');
			submitButton.disabled = true;
		}
	}

	// Обработчик события ввода для номера телефона
	phoneInput.addEventListener('input', (event) => {
		const input = event.target;
		const value = input.value.replace(/\D/g, ''); // Удаляем все нечисловые символы
		const formattedValue = formatPhoneNumber(value);

		// Сохраняем текущую позицию курсора
		const selectionStart = input.selectionStart;
		const selectionEnd = input.selectionEnd;

		input.value = formattedValue;

		// Устанавливаем курсор в правильную позицию
		const newSelectionStart = getNewSelectionStart(value, selectionStart);
		input.setSelectionRange(newSelectionStart, newSelectionStart);

		if (isPhoneValid(formattedValue)) {
			hideError(phoneInput);
		} else {
			showError(phoneInput, 'Поле должно содержать корректный номер телефона.');
		}
		console.log('Текущее значение: ' + input.value);
		toggleSubmitButton();
	});

	// Обработчик события ввода для имени
	nameInput.addEventListener('input', (event) => {
		const value = event.target.value;
		if (!value) {
			showError(nameInput, 'Поле не должно быть пустым.');
		} else if (value.length < 2) {
			showError(nameInput, 'Поле должно содержать минимум 2 буквы.');
		} else if (/\d/.test(value)) {
			showError(nameInput, 'Допустим ввод только букв');
		} else {
			hideError(nameInput);
		}

		toggleSubmitButton();
	});

	// Обработчик события фокуса для номера телефона
	phoneInput.addEventListener('focus', (event) => {
		const input = event.target;
		if (input.value === '') {
			input.value = '+7 ';
			input.setSelectionRange(3, 3); // Устанавливаем курсор после "+7 "
		}
	});

	phoneInput.addEventListener('keydown', (event) => {
		const input = event.target;
		const cursorPosition = input.selectionStart;

		if (event.key === 'Backspace') {
			event.preventDefault();

			if (cursorPosition > 4) {
				// Предотвращаем удаление +7 и скобок
				let value = input.value;
				let newValue = '';

				// Проверяем ситуацию, когда курсор находится между "(" и первой цифрой
				if (value[cursorPosition - 1] === '(' && cursorPosition === 5) {
					return; // Ничего не делаем
				}

				if (
					value[cursorPosition - 1] === '-' &&
					value[cursorPosition - 2] !== ' '
				) {
					newValue =
						value.slice(0, cursorPosition - 2) + value.slice(cursorPosition);
					input.value = newValue;
					input.setSelectionRange(cursorPosition - 2, cursorPosition - 2);
				} else if (
					value[cursorPosition - 1] === ' ' &&
					value[cursorPosition - 2] === ')'
				) {
					newValue =
						value.slice(0, cursorPosition - 3) + value.slice(cursorPosition);
					input.value = newValue;
					input.setSelectionRange(cursorPosition - 3, cursorPosition - 3);
				} else if (
					value[cursorPosition - 1] === '(' &&
					value[cursorPosition - 2] === ' '
				) {
					return; // Ничего не делаем, если курсор после " ("
				} else if (
					value[cursorPosition - 1] === ')' &&
					value[cursorPosition - 2] === '('
				) {
					newValue =
						value.slice(0, cursorPosition - 2) + value.slice(cursorPosition);
					input.value = newValue;
					input.setSelectionRange(cursorPosition - 2, cursorPosition - 2);
				} else if (value[cursorPosition - 1] === ')') {
					newValue =
						value.slice(0, cursorPosition - 2) + value.slice(cursorPosition);
					input.value = newValue;
					input.setSelectionRange(cursorPosition - 2, cursorPosition - 2);
				} else {
					newValue =
						value.slice(0, cursorPosition - 1) + value.slice(cursorPosition);
					input.value = newValue;
					input.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
				}
			}

			console.log('После Backspace: ' + input.value);
		} else if (event.key === 'Delete') {
			event.preventDefault();

			if (cursorPosition < input.value.length) {
				// Предотвращаем удаление за пределами строки
				let value = input.value;
				let newValue = '';

				if (
					cursorPosition === 0 ||
					cursorPosition === 1 ||
					cursorPosition === 2
				) {
					return; // Предотвращаем удаление "+" или "7 "
				}

				if (
					value[cursorPosition] === '-' &&
					value[cursorPosition + 1] !== ' '
				) {
					newValue =
						value.slice(0, cursorPosition) + value.slice(cursorPosition + 2);
					input.value = newValue;
					input.setSelectionRange(cursorPosition, cursorPosition);
				} else if (value[cursorPosition] === '(') {
					newValue =
						value.slice(0, cursorPosition) + value.slice(cursorPosition + 2);
					input.value = newValue;
					input.setSelectionRange(cursorPosition, cursorPosition);
				} else if (value[cursorPosition] === ')') {
					newValue =
						value.slice(0, cursorPosition) + value.slice(cursorPosition + 3);
					input.value = newValue;
					input.setSelectionRange(cursorPosition, cursorPosition);
				} else {
					newValue =
						value.slice(0, cursorPosition) + value.slice(cursorPosition + 1);
					input.value = newValue;
					input.setSelectionRange(cursorPosition, cursorPosition);
				}
			}

			console.log('После Delete: ' + input.value);
		}

		if (input.value === '+7 ') {
			input.setSelectionRange(3, 3);
		}

		toggleSubmitButton();
	});

	// Функция для форматирования номера телефона
	function formatPhoneNumber(value) {
		let result = '+7 ';
		if (value.length > 1) {
			result += '(' + value.substring(1, 4);
		}
		if (value.length >= 5) {
			result += ') ' + value.substring(4, 7);
		}
		if (value.length >= 8) {
			result += '-' + value.substring(7, 9);
		}
		if (value.length >= 10) {
			result += '-' + value.substring(9, 11);
		}
		return result;
	}

	// Функция для вычисления новой позиции курсора
	function getNewSelectionStart(value, selectionStart) {
		let newSelectionStart = selectionStart;
		if (value.length >= 1) newSelectionStart += 3; // +7 (
		if (value.length >= 4) newSelectionStart += 1; // )
		if (value.length >= 7) newSelectionStart += 1; // -
		if (value.length >= 9) newSelectionStart += 1; // -
		return newSelectionStart;
	}

	// Функция для сброса состояния кнопки сабмита
	function resetSubmitButton() {
		submitButton.classList.add('modal__button_disabled');
		submitButton.disabled = true;
	}

	// Сбрасываем состояние кнопки сабмита при открытии модального окна
	resetSubmitButton();
}
