export function initSlider(phoneImg) {
  const tabletImgSrc = './images/TableImg.png';
  const laptopImgSrc = './images/LaptopImg.png';
  const originalImgSrc = './images/PhoneImg.png';

  function handleClickOrSwipe(direction) {
    if (window.innerWidth >= 360 && window.innerWidth < 1276) {
      const currentState = phoneImg.getAttribute('data-state');
      if (direction === 'next') {
        if (currentState === 'phone') {
          phoneImg.src = tabletImgSrc;
          phoneImg.setAttribute('data-state', 'tablet');
        } else if (currentState === 'tablet') {
          phoneImg.src = laptopImgSrc;
          phoneImg.setAttribute('data-state', 'laptop');
        } else {
          phoneImg.src = originalImgSrc;
          phoneImg.setAttribute('data-state', 'phone');
        }
      } else if (direction === 'prev') {
        if (currentState === 'phone') {
          phoneImg.src = laptopImgSrc;
          phoneImg.setAttribute('data-state', 'laptop');
        } else if (currentState === 'tablet') {
          phoneImg.src = originalImgSrc;
          phoneImg.setAttribute('data-state', 'phone');
        } else {
          phoneImg.src = tabletImgSrc;
          phoneImg.setAttribute('data-state', 'tablet');
        }
      }
    }
  }

  // Обработчик клика
  phoneImg.addEventListener('click', function () {
    handleClickOrSwipe('next');
  });

  // Обработчик свайпа
  let startX, startY;

  phoneImg.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  phoneImg.addEventListener('touchmove', function (e) {
    if (!startX || !startY) return;

    const endX = e.touches[0].clientX;
    const endY = e.touches[0].clientY;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        handleClickOrSwipe('prev');
      } else {
        handleClickOrSwipe('next');
      }
    }
  });

  phoneImg.addEventListener('touchend', function () {
    startX = null;
    startY = null;
  });

  // Сброс состояния изображений при изменении разрешения экрана
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1276) {
      phoneImg.src = originalImgSrc;
      phoneImg.setAttribute('data-state', 'phone');
    }
  });
}
