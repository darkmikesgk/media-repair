import './common.js';
import { initPage } from './table.js';

const reviewsLink = document.getElementById('reviews-link');

if (reviewsLink) {
	reviewsLink.addEventListener('click', (evt) => {
		evt.preventDefault();
		window.location.href = '/?section=reviews';
	});
}

document.addEventListener('DOMContentLoaded', async () => {
  await initPage();
});

