export function initSliderPopularService() {
	const slider = document.querySelector(
		'.popular-services-section__slider-container-slider'
	);
	const slides = document.querySelectorAll(
		'.popular-services-section__slider-container-slider-slide'
	);
	const prevButton = document.querySelector(
		'.popular-services-section__slider-container-prev'
	);
	const nextButton = document.querySelector(
		'.popular-services-section__slider-container-next'
	);
	const container = document.querySelector(
		'.popular-services-section__slider-container'
	);

	// 🔒 Проверка: все необходимые элементы должны быть найдены
	if (!slider || !slides.length || !prevButton || !nextButton || !container) {
		console.warn(
			'initSliderPopularService: один или несколько элементов не найдены.'
		);
		return;
	}

	let index = 0;
	let touchStartX = 0;
	let touchEndX = 0;

	slider.addEventListener(
		'touchstart',
		(e) => {
			touchStartX = e.touches[0].clientX;
		},
		{ passive: true }
	);

	slider.addEventListener(
		'touchmove',
		(e) => {
			touchEndX = e.touches[0].clientX;
		},
		{ passive: true }
	);

	slider.addEventListener('touchend', () => {
		handleSwipe();
	});

	function updateButtons() {
		const maxIndex = getMaxIndex();

		if (index <= 0) {
			prevButton.classList.add('disabled');
		} else {
			prevButton.classList.remove('disabled');
		}

		if (index >= maxIndex) {
			nextButton.classList.add('disabled');
		} else {
			nextButton.classList.remove('disabled');
		}
	}

	function handleSwipe() {
		const swipeDistance = touchEndX - touchStartX;
		const threshold = 50;

		if (Math.abs(swipeDistance) > threshold) {
			if (swipeDistance < 0) {
				nextButton.click();
			} else {
				prevButton.click();
			}
		}
	}

	function getSlideWidthWithGap() {
		const slide = slides[0];
		const slideWidth = slide.offsetWidth;
		const gap = parseFloat(getComputedStyle(slider).gap) || 0;
		return slideWidth + gap;
	}

	function getMaxIndex() {
		const containerWidth = container.offsetWidth;
		const totalSlidesWidth = slider.scrollWidth;
		const slideWidthWithGap = getSlideWidthWithGap();
		return Math.max(
			0,
			Math.ceil((totalSlidesWidth - containerWidth) / slideWidthWithGap)
		);
	}

	function updateSlider() {
		const slideWidthWithGap = getSlideWidthWithGap();
		const maxIndex = getMaxIndex();
		const offset = Math.min(index, maxIndex) * slideWidthWithGap;
		slider.style.transform = `translateX(-${offset}px)`;
		updateButtons();
	}

	nextButton.addEventListener('click', () => {
		const maxIndex = getMaxIndex();
		if (index < maxIndex) {
			index++;
			updateSlider();
		}
	});

	prevButton.addEventListener('click', () => {
		if (index > 0) {
			index--;
			updateSlider();
		}
	});

	window.addEventListener('resize', () => {
		const maxIndex = getMaxIndex();
		if (index > maxIndex) {
			index = maxIndex;
		}
		updateSlider();
	});

	// Заменим на явный вызов — DOM уже загружен к этому моменту
	updateSlider();
	updateButtons();
}
