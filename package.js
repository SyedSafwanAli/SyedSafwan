    let wdsSlideIndex = 0;
    const wdsSlides = document.querySelectorAll('.wds-pricing-card');
    const wdsDots = document.querySelectorAll('.wds-dot');
    const wdsTotalSlides = wdsSlides.length;
    const wdsSliderWrapper = document.getElementById('wds-slider-wrapper');

    let wdsIsDragging = false;
    let wdsStartPos = 0;
    let wdsCurrentTranslate = 0;
    let wdsPrevTranslate = 0;
    let wdsAnimationId = 0;

    function wdsGetSlidesPerView() {
      const width = window.innerWidth;
      if (width >= 1024) return 3;
      if (width >= 768) return 2;
      return 1;
    }

    function wdsGetMaxSlideIndex() {
      return Math.max(0, wdsTotalSlides - wdsGetSlidesPerView());
    }

    function wdsGetSlideWidth() {
      const width = window.innerWidth;
      if (width >= 1024) return 360;
      if (width >= 768) return 360;
      return 340;
    }

    function wdsShowSlide(n) {
      const maxIndex = wdsGetMaxSlideIndex();
      if (n > maxIndex) wdsSlideIndex = 0;
      else if (n < 0) wdsSlideIndex = maxIndex;
      else wdsSlideIndex = n;

      const slideWidth = wdsGetSlideWidth();
      const translateX = -wdsSlideIndex * slideWidth;
      wdsSliderWrapper.style.transform = `translateX(${translateX}px)`;
      wdsCurrentTranslate = translateX;
      wdsPrevTranslate = translateX;

      wdsDots.forEach(dot => dot.classList.remove('wds-active'));
      if (wdsDots[wdsSlideIndex]) wdsDots[wdsSlideIndex].classList.add('wds-active');
    }

    function wdsNextSlide() {
      wdsSlideIndex = (wdsSlideIndex >= wdsGetMaxSlideIndex()) ? 0 : wdsSlideIndex + 1;
      wdsShowSlide(wdsSlideIndex);
    }

    function wdsPrevSlide() {
      wdsSlideIndex = (wdsSlideIndex <= 0) ? wdsGetMaxSlideIndex() : wdsSlideIndex - 1;
      wdsShowSlide(wdsSlideIndex);
    }

    function wdsCurrentSlide(n) {
      wdsSlideIndex = n - 1;
      wdsShowSlide(wdsSlideIndex);
    }

    // Drag support
    wdsSliderWrapper.addEventListener('mousedown', wdsDragStart);
    wdsSliderWrapper.addEventListener('mouseup', wdsDragEnd);
    wdsSliderWrapper.addEventListener('mousemove', wdsDragMove);
    wdsSliderWrapper.addEventListener('mouseleave', wdsDragEnd);

    wdsSliderWrapper.addEventListener('touchstart', wdsDragStart);
    wdsSliderWrapper.addEventListener('touchend', wdsDragEnd);
    wdsSliderWrapper.addEventListener('touchmove', wdsDragMove);

    function wdsDragStart(e) {
      wdsIsDragging = true;
      wdsSliderWrapper.classList.add('wds-dragging');
      const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      wdsStartPos = clientX;
      wdsAnimationId = requestAnimationFrame(wdsAnimation);
    }

    function wdsDragMove(e) {
      if (!wdsIsDragging) return;
      const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      wdsCurrentTranslate = wdsPrevTranslate + (clientX - wdsStartPos);
    }

    function wdsDragEnd() {
      wdsIsDragging = false;
      wdsSliderWrapper.classList.remove('wds-dragging');
      cancelAnimationFrame(wdsAnimationId);

      const movedBy = wdsCurrentTranslate - wdsPrevTranslate;
      const slideWidth = wdsGetSlideWidth();
      if (Math.abs(movedBy) > slideWidth / 4) {
        if (movedBy > 0) wdsPrevSlide();
        else wdsNextSlide();
      } else {
        wdsShowSlide(wdsSlideIndex);
      }
    }

    function wdsAnimation() {
      if (wdsIsDragging) {
        wdsSliderWrapper.style.transform = `translateX(${wdsCurrentTranslate}px)`;
        requestAnimationFrame(wdsAnimation);
      }
    }

    window.addEventListener('resize', () => wdsShowSlide(wdsSlideIndex));

    let wdsAutoPlay = setInterval(() => wdsNextSlide(), 5000);
    wdsSliderWrapper.addEventListener('mouseenter', () => clearInterval(wdsAutoPlay));
    wdsSliderWrapper.addEventListener('mouseleave', () => {
      wdsAutoPlay = setInterval(() => wdsNextSlide(), 5000);
    });

    wdsShowSlide(0);