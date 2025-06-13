export function initQA(
	containerId = 'qa-container',
	jsonPath = 'data/qa.json'
) {
	const container = document.getElementById(containerId);
	if (!container) {
		console.error(`Контейнер с id="${containerId}" не найден`);
		return;
	}
	container.textContent = 'Загрузка вопросов...';

	const svgNS = 'http://www.w3.org/2000/svg';
	let openedItem = null;

	function createQAItem(id, question, answer) {
		const item = document.createElement('div');
		item.className = 'qa-item';
		item.id = `qa${id}`;

		const questionDiv = document.createElement('div');
		questionDiv.className = 'question';

		const questionText = document.createElement('span');
		questionText.textContent = question;

		const btn = document.createElement('button');
		btn.className = 'toggle-btn closed';
		btn.type = 'button';
		btn.setAttribute('aria-expanded', 'false');

		// Создаем SVG с defs для градиента
		const svg = document.createElementNS(svgNS, 'svg');
		svg.setAttribute('width', '32');
		svg.setAttribute('height', '32');
		svg.setAttribute('viewBox', '0 0 32 32');
		svg.setAttribute('fill', 'none');
		svg.setAttribute('xmlns', svgNS);
		svg.classList.add('arrow-icon');

		const defs = document.createElementNS(svgNS, 'defs');
		const linearGradient = document.createElementNS(svgNS, 'linearGradient');
		linearGradient.setAttribute('id', 'gradient-arrow');
		linearGradient.setAttribute('x1', '0%');
		linearGradient.setAttribute('y1', '0%');
		linearGradient.setAttribute('x2', '100%');
		linearGradient.setAttribute('y2', '100%');

		const stop1 = document.createElementNS(svgNS, 'stop');
		stop1.setAttribute('offset', '0%');
		stop1.setAttribute('stop-color', '#06FFD2');
		stop1.setAttribute('stop-opacity', '1');

		const stop2 = document.createElementNS(svgNS, 'stop');
		stop2.setAttribute('offset', '100%');
		stop2.setAttribute('stop-color', '#06BDFF');
		stop2.setAttribute('stop-opacity', '1');

		linearGradient.appendChild(stop1);
		linearGradient.appendChild(stop2);
		defs.appendChild(linearGradient);
		svg.appendChild(defs);

		const rect = document.createElementNS(svgNS, 'rect');
		rect.setAttribute('width', '32');
		rect.setAttribute('height', '32');
		rect.setAttribute('rx', '16');
		rect.classList.add('arrow-bg');
		svg.appendChild(rect);

		const path = document.createElementNS(svgNS, 'path');
		path.setAttribute(
			'd',
			'M21.658 10.3425H10.3638V12.2249H18.4445L10.3443 20.3252L11.6752 21.6562L19.7756 13.5558V21.6368H21.658V10.3425Z'
		);
		path.classList.add('arrow-path');
		svg.appendChild(path);

		btn.appendChild(svg);

		questionDiv.appendChild(questionText);
		questionDiv.appendChild(btn);

		const answerDiv = document.createElement('div');
		answerDiv.className = 'answer';
		answerDiv.style.display = 'none';
		answerDiv.innerHTML = answer;

		function openItem() {
			answerDiv.style.display = 'block';
			btn.classList.remove('closed');
			btn.classList.add('open');
			btn.setAttribute('aria-expanded', 'true');
			openedItem = item;
		}

		function closeItem() {
			answerDiv.style.display = 'none';
			btn.classList.remove('open');
			btn.classList.add('closed');
			btn.setAttribute('aria-expanded', 'false');
		}

		function toggleAnswer() {
			const isOpen = answerDiv.style.display === 'block';
			if (isOpen) {
				closeItem();
				openedItem = null;
			} else {
				if (openedItem && openedItem !== item) {
					const prevAnswer = openedItem.querySelector('.answer');
					const prevBtn = openedItem.querySelector('.toggle-btn');
					prevAnswer.style.display = 'none';
					prevBtn.classList.remove('open');
					prevBtn.classList.add('closed');
					prevBtn.setAttribute('aria-expanded', 'false');
				}
				openItem();
			}
		}

		questionDiv.addEventListener('click', () => {
			toggleAnswer();
		});

		btn.addEventListener('click', (event) => {
			event.stopPropagation();
			toggleAnswer();

			// Прокрутка при открытии
			// const rect = item.getBoundingClientRect();
			// window.scrollTo({
			//   top: rect.bottom + window.pageYOffset,
			//   behavior: 'smooth'
			// });
		});

		item.appendChild(questionDiv);
		item.appendChild(answerDiv);

		return item;
	}

	fetch(jsonPath)
		.then((response) => {
			if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);
			return response.json();
		})
		.then((data) => {
			container.innerHTML = '';
			if (!Array.isArray(data) || data.length === 0) {
				container.textContent = 'Вопросов пока нет.';
				return;
			}
			data.forEach((qa, index) => {
				container.appendChild(createQAItem(index + 1, qa.question, qa.answer));
			});

			// Открываем первый вопрос сразу
			const firstItem = container.querySelector('.qa-item');
			if (firstItem) {
				const questionDiv = firstItem.querySelector('.question');
				questionDiv.click(); // имитируем клик, чтобы открыть ответ и обновить стрелку
			}
		})
		.catch((err) => {
			container.textContent = `Ошибка: ${err.message}`;
			console.error(err);
		});
}
