import './common.js';
import { createCards } from './card.js';
import { initSlider } from './slider.js';
import { initSliderPopularService } from './slider-popular-service.js';
import { initQA } from './qa.js';

document.addEventListener('DOMContentLoaded', () => {
	// Проверяем элементы перед вызовом
	if (document.getElementById('phoneImg')) {
		initSlider();
	}

	if (document.querySelector('.popular-services-section__slider-container')) {
		initSliderPopularService();
	}

	if (
		document.getElementById('cards-container') &&
		document.getElementById('card-template')
	) {
		createCards();
	}

	// Инициализация блока вопросов-ответов (предполагается, что в HTML есть <div id="qa-container"></div>)
	if (document.getElementById('qa-container')) {
		initQA('qa-container', 'data/qa.json');
	}

	const reviewsAnchor = document.getElementById('reviews-link');
	const reviewsSection = document.getElementById('reviews-section');
	const urlParams = new URLSearchParams(window.location.search);
	const section = urlParams.get('section');

	if (reviewsAnchor && reviewsSection) {
		reviewsAnchor.addEventListener('click', function (evt) {
			evt.preventDefault();
			reviewsSection.scrollIntoView({ behavior: 'smooth' });
		});
	}

	if (section) {
		const targetSection = document.getElementById(`${section}-section`);
		if (targetSection) {
			setTimeout(() => {
				targetSection.scrollIntoView({ behavior: 'smooth' });
			}, 100);
		} else {
			console.error(`Section with ID "${section}-section" not found.`);
		}
	}
});
