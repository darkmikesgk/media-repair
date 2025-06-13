export async function createCards() {
	const container = document.getElementById('cards-container');
	const templateElement = document.getElementById('card-template');

	if (!container) {
		console.warn('createCards: элемент с id "cards-container" не найден.');
		return;
	}

	if (!templateElement) {
		console.warn('createCards: элемент с id "card-template" не найден.');
		return;
	}

	const template = templateElement.content;

	try {
		const response = await fetch('../data/cards.json');
		if (!response.ok) {
			console.error(
				'createCards: ошибка загрузки cards.json:',
				response.statusText
			);
			return;
		}
		const cardsData = await response.json();

		cardsData.forEach((card) => {
			const cardElement = template.cloneNode(true);
			const link = cardElement.querySelector('.card-link');
			const img = cardElement.querySelector('.card-image');
			const title = cardElement.querySelector('.card-title');

			if (link) link.href = card.url;
			if (img) {
				img.src = card.imageUrl;
				img.alt = `Карточка`;
			}
			if (title) title.textContent = card.title;

			container.appendChild(cardElement);
		});
	} catch (error) {
		console.error(
			'createCards: ошибка при загрузке или парсинге данных:',
			error
		);
	}
}
