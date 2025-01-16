// function renderLoading(isLoading, buttonElement) {
// 	if (isLoading) {
// 		buttonElement.textContent = 'Отправка...';
// 		buttonElement.disabled = true;
// 	} else {
// 		buttonElement.textContent = 'Отправить';
// 		buttonElement.disabled = false;
// 	}
// }

// export function handleSubmitForm(evt) {
// 	evt.preventDefault();

// 	const form = evt.target;
// 	const name = form.querySelector('#name').value;
// 	const phone = form.querySelector('#phone').value;
// 	const submitButton = form.querySelector('button[type="submit"]');
// 	const modalMessage = document.getElementById('modal-message');

// 	if (!name || !phone) {
// 		alert('Пожалуйста, заполните все поля.');
// 		return;
// 	}

// 	renderLoading(true, submitButton);

// 	fetch('http://localhost:3000/send-email', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/x-www-form-urlencoded',
// 		},
// 		body: new URLSearchParams({
// 			name: name,
// 			phone: phone,
// 		}),
// 	})
// 		.then((response) => {
// 			if (!response.ok) {
// 				throw new Error('Network response was not ok');
// 			}
// 			return response.json();
// 		})
// 		.then((data) => {
// 			if (data.success) {
// 				form.style.display = 'none';
// 				modalMessage.style.display = 'block';
// 				modalMessage.classList.add('modal-message');
// 			} else {
// 				alert('Ошибка при отправке заявки: ' + data.message);
// 			}
// 		})
// 		.catch((error) => {
// 			console.error('Error:', error);
// 			alert('Ошибка при отправке заявки.');
// 		})
// 		.finally(() => {
// 			renderLoading(false, submitButton);
// 		});
// }