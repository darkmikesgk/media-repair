import './common.js';
import { createCards } from './card.js';
import { initSlider } from './slider.js';
import { initSliderPopularService } from './slider-popular-service.js';

const phoneImg = document.getElementById('phoneImg');
const reviewsAnchor = document.getElementById('reviews-link');
const reviewsSection = document.getElementById('reviews-section');
const urlParams = new URLSearchParams(window.location.search);
const section = urlParams.get('section');

initSlider(phoneImg);
createCards();
initSliderPopularService();

reviewsAnchor.addEventListener('click', function (evt) {
	evt.preventDefault();
	reviewsSection.scrollIntoView({
		behavior: 'smooth',
	});
});

if (section) {
	const targetSection = document.getElementById(`${section}-section`);
	if (targetSection) {
		setTimeout(() => {
			targetSection.scrollIntoView({
				behavior: 'smooth',
			});
		}, 100);
	} else {
		console.error(`Section with ID "${section}-section" not found.`);
	}
}
