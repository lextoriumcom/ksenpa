class Slider {
    constructor(sliderWrapper) {
        this.sliderWrapper = document.querySelector(sliderWrapper);
        this.slider = this.sliderWrapper.querySelector('.slider');
        this.slides = this.slider.querySelectorAll('.slider__item');
        this.prevButton = this.sliderWrapper.querySelector('.slider__prev');
        this.nextButton = this.sliderWrapper.querySelector('.slider__next');
        this.currentIndex = 0;
        this.slideWidth = this.slider.offsetWidth;
        
        this.init();
    }

    init() {
        this.prevButton.addEventListener('click', () => this.goToSlide(-1));
        this.nextButton.addEventListener('click', () => this.goToSlide(1));
    }

    goToSlide(step) {
        this.currentIndex += step;
        
        if (this.currentIndex >= this.slides.length) {
            this.currentIndex = 0;
        } else if (this.currentIndex < 0) {
            this.currentIndex = this.slides.length - 1;
        }
        
        this.slider.style.transform = `translateX(-${this.currentIndex * this.slideWidth}px)`;
    }
}

// Инициализация слайдера
document.addEventListener('DOMContentLoaded', () => {
    new Slider('.slider-wrapper');
});