export function initSlider() {
	const phoneImg = document.getElementById('phoneImg');
	if (!phoneImg) {
		console.warn('initSlider: элемент с id "phoneImg" не найден.');
		return;
	}

	const sliderData = [
		{
			id: 'phoneImg',
			src: '../images/PhoneImg.webp',
			state: 'phone',
			alt: 'Изображение телефона',
		},
		{
			id: 'tabletImg',
			src: '../images/TableImg.webp',
			state: 'tablet',
			alt: 'Изображение ноутбука и телефона на столе',
		},
		{
			id: 'laptopImg',
			src: '../images/LaptopImg.webp',
			state: 'laptop',
			alt: 'Изображение ноутбука',
		},
	];

	let currentIndex = 0;

	function updateImage(index) {
		const { src, state, alt } = sliderData[index];
		phoneImg.src = src;
		phoneImg.setAttribute('data-state', state);
		phoneImg.setAttribute('alt', alt);
	}

	function handleClick(direction) {
		if (window.innerWidth >= 360 && window.innerWidth < 1276) {
			if (direction === 'next') {
				currentIndex = (currentIndex + 1) % sliderData.length;
			} else if (direction === 'prev') {
				currentIndex =
					(currentIndex - 1 + sliderData.length) % sliderData.length;
			}
			updateImage(currentIndex);
		}
	}

	let startX = 0;
	let startY = 0;
	let isSwiping = false;

	phoneImg.addEventListener('touchstart', (event) => {
		const touch = event.touches[0];
		startX = touch.clientX;
		startY = touch.clientY;
		isSwiping = false;
	});

	phoneImg.addEventListener('touchmove', (event) => {
		const touch = event.touches[0];
		const diffX = touch.clientX - startX;
		const diffY = touch.clientY - startY;

		if (Math.abs(diffX) > Math.abs(diffY)) {
			event.preventDefault();
			isSwiping = true;
		}
	});

	phoneImg.addEventListener('touchend', (event) => {
		const touch = event.changedTouches[0];
		const diffX = touch.clientX - startX;
		const diffY = touch.clientY - startY;

		if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
			if (diffX > 0) {
				handleClick('prev');
			} else {
				handleClick('next');
			}
		}
	});

	phoneImg.addEventListener('click', () => {
		if (!isSwiping) {
			handleClick('next');
		}
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth >= 1276) {
			currentIndex = 0;
			updateImage(currentIndex);
		}
	});
}
