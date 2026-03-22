const MOBILE_MAX_WIDTH = 768;

export function initHeaderMobileMenu() {
	const openBtn = document.getElementById('header-menu-open');
	const panel = document.getElementById('header-mobile-panel');
	const closeBtn = document.getElementById('header-menu-close');
	const page = document.querySelector('.page');

	if (!openBtn || !panel || !page) {
		return;
	}

	function openMenu() {
		panel.classList.add('header__overlay_is-opened');
		panel.setAttribute('aria-hidden', 'false');
		openBtn.setAttribute('aria-expanded', 'true');
		page.classList.add('page--menu-open');
		document.addEventListener('keydown', onEscape);
	}

	function closeMenu() {
		panel.classList.remove('header__overlay_is-opened');
		panel.setAttribute('aria-hidden', 'true');
		openBtn.setAttribute('aria-expanded', 'false');
		page.classList.remove('page--menu-open');
		document.removeEventListener('keydown', onEscape);
	}

	function onEscape(evt) {
		if (evt.key === 'Escape') {
			closeMenu();
		}
	}

	openBtn.addEventListener('click', openMenu);
	closeBtn?.addEventListener('click', closeMenu);

	const reviewsMobile = document.getElementById('reviews-link-mobile');
	if (reviewsMobile) {
		reviewsMobile.addEventListener('click', (evt) => {
			const href = reviewsMobile.getAttribute('href') || '';
			if (href === '#reviews-section') {
				const reviewsSection = document.getElementById('reviews-section');
				if (reviewsSection) {
					evt.preventDefault();
					closeMenu();
					reviewsSection.scrollIntoView({ behavior: 'smooth' });
				}
				return;
			}
			evt.preventDefault();
			closeMenu();
			window.location.assign(href || '/?section=reviews');
		});
	}

	const findUsRow = document.getElementById('header-find-us-row');
	const findUsSection = document.getElementById('find-us-section');
	if (findUsRow && findUsSection) {
		findUsRow.addEventListener('click', (evt) => {
			evt.preventDefault();
			closeMenu();
			findUsSection.scrollIntoView({ behavior: 'smooth' });
		});
	}

	panel.querySelectorAll('.header__overlay-nav-link').forEach((link) => {
		const href = link.getAttribute('href') || '';
		if (href.startsWith('#')) {
			return;
		}
		link.addEventListener('click', closeMenu);
	});

	panel
		.querySelector('.header__overlay-social')
		?.querySelectorAll('a')
		.forEach((a) => {
			a.addEventListener('click', closeMenu);
		});

	window.addEventListener('resize', () => {
		if (window.innerWidth > MOBILE_MAX_WIDTH) {
			closeMenu();
		}
	});
}
