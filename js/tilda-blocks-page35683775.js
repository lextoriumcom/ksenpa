window.isMobile = !1;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.isMobile = !0;
}
function t_throttle(fn, threshhold, scope) {
    var last;
    var deferTimer;
    threshhold || (threshhold = 250);
    return function () {
        var context = scope || this;
        var now = +new Date();
        var args = arguments;
        if (last && now < last + threshhold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}
function t422_init(recId) {
    t_onFuncLoad('t_card__addFocusOnTab', function () {
        t_card__addFocusOnTab(recId);
    });
}
function t422_setHeight(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec) return;
    var container = rec.querySelector('.t422');
    if (!container) return;
    if (window.innerWidth > 960) {
        t422_checkEqualHeight(recId);
    } else {
        var mobileImages = rec.querySelectorAll('.t422__img-mobile');
        var texts = rec.querySelectorAll('.t422__text');
        var imageWidth = mobileImages.length ? getComputedStyle(mobileImages[0]).width : '0';
        imageWidth = parseInt(imageWidth, 10);
        for (var i = 0; i < mobileImages.length; i++) {
            var bgImage = mobileImages[i].style.backgroundImage;
            bgImage = bgImage.replace('url("', '').replace('")', '');
            var img = document.createElement('img');
            img.src = bgImage;
            var ratio = img.naturalWidth && img.naturalHeight ? img.naturalHeight / img.naturalWidth : 0;
            var imageHeight = imageWidth * ratio ? imageWidth * ratio + 'px' : '200px';
            mobileImages[i].style.height = imageHeight;
        }
        for (var i = 0; i < texts.length; i++) {
            texts[i].style.height = 'auto';
        }
    }
}
function t422_checkEqualHeight(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec) return;
    var container = rec.querySelector('.t422');
    if (!container) return;
    var image = rec.querySelector('.t422__img');
    var imageStyle = getComputedStyle(image, null);
    var imagePaddingTop = parseInt(imageStyle.paddingTop) || 0;
    var imagePaddingBottom = parseInt(imageStyle.paddingBottom) || 0;
    var imageHeight = imageStyle.height
        ? parseInt(imageStyle.height, 10) - (imagePaddingTop + imagePaddingBottom)
        : image.clientHeight - (imagePaddingTop + imagePaddingBottom);
    var text = rec.querySelector('.t422__text');
    var textStyle = getComputedStyle(text, null);
    var textBorderTopWidth = parseInt(textStyle.borderTopWidth) || 0;
    var textBorderBottomWidth = parseInt(textStyle.borderBottomWidth) || 0;
    var borderWidth = 0;
    var textWrap = rec.querySelector('.t422__textwrapper');
    var textWrapHeight = textWrap.offsetHeight;
    borderWidth = textBorderTopWidth + textBorderBottomWidth;
    if (imageHeight < textWrapHeight + borderWidth) {
        image.style.height = textWrapHeight + borderWidth + 'px';
    } else if (imageHeight - borderWidth > textWrapHeight) {
        textWrap.style.height = imageHeight - borderWidth + 'px';
    }
}
function t490_init(recId) {
    t_onFuncLoad('t_card__moveClickOnCard', function () {
        t_card__moveClickOnCard(recId);
    });
    t_onFuncLoad('t_card__addFocusOnTab', function () {
        t_card__addFocusOnTab(recId);
    });
}
function t823_onSuccess(form) {
    t_onFuncLoad('t_forms__onSuccess', function () {
        t_forms__onSuccess(form);
    });
}
function t604_init(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec) return;
    t604_imageHeight(rec);
    t604_arrowWidth(rec);
    t604_show(rec);
    t604_hide(rec);
    window.addEventListener(
        'resize',
        t_throttle(function () {
            t_onFuncLoad('t_slds_updateSlider', function () {
                t_slds_updateSlider(recid);
            });
            t604_arrowWidth(rec);
        }),
    );
    var currentBlock = rec.querySelector('.t604');
    if (currentBlock) {
        currentBlock.addEventListener('displayChanged', function () {
            t_onFuncLoad('t_slds_updateSlider', function () {
                t_slds_updateSlider(recid);
            });
            t604_arrowWidth(rec);
        });
    }
}
function t604_show(rec) {
    var playBtns = rec.querySelectorAll('.t604__play');
    Array.prototype.forEach.call(playBtns, function (play) {
        var itemWrap = play.closest('.t604__imgwrapper');
        var image = itemWrap.querySelector('.t-slds__bgimg');
        var videoWrap = itemWrap.querySelector('.t604__wrap-video');
        var videoLazy = videoWrap.querySelector('.t-video-lazyload');
        play.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            t_onFuncLoad('t_video_lazyload__addVideo', function () {
                videoWrap.style.display = 'block';
                image.style.opacity = 0;
                t_video_lazyload__addVideo(videoLazy);
            });
        });
    });
}
function t604_hide(rec) {
    var videoWraps = rec.querySelectorAll('.t604__wrap-video');
    var videos = rec.querySelectorAll('.t604__wrap-video .t-video-lazyload');
    rec.addEventListener('updateSlider', function () {
        Array.prototype.forEach.call(videoWraps, function (videoWrap) {
            videoWrap.display.style = 'none';
        });
        Array.prototype.forEach.call(videos, function (video) {
            video.innerHTML = '';
        });
    });
}
function t604_imageHeight(rec) {
    var images = rec.querySelectorAll('.t604__separator');
    Array.prototype.forEach.call(images, function (image) {
        var imgHeight = parseInt(image.getAttribute('data-slider-image-height'));
        var imgWidth = parseInt(image.getAttribute('data-slider-image-width'));
        var imgRatio = imgHeight / imgWidth;
        var imgPadding = imgRatio * 100;
        image.style.paddingBottom = imgPadding + '%';
    });
}
function t604_arrowWidth(rec) {
    var arrows = rec.querySelectorAll('.t-slds__arrow_wrapper');
    var slide = rec.querySelector('.t-slds__item_active .t-slds__wrapper');
    var slideWidth = slide ? slide.offsetWidth : 0;
    if (slide && slideWidth === 0) {
        t_onFuncLoad('t_slds_SliderWidth', function () {
            setTimeout(function () {
                slideWidth = slide.offsetWidth;
                t604__updateArrowWidth(slideWidth, arrows);
            }, 300);
        });
    } else {
        t604__updateArrowWidth(slideWidth, arrows);
    }
}
function t604__updateArrowWidth(slideWidth, arrows) {
    var calcArrowWidth = window.innerWidth - slideWidth;
    var arrowWidth = window.innerWidth > 960 ? calcArrowWidth / 2 + 'px' : '';
    if (arrowWidth !== '0px' && arrowWidth !== '') {
        Array.prototype.forEach.call(arrows, function (arrow) {
            arrow.style.width = arrowWidth;
        });
    }
}
function t604__UpdateSliderArrowsHeight(recid) {
    var sliderRec = document.getElementById('rec' + recid);
    if (!sliderRec) return;
    var activeItem = sliderRec.querySelector('.t-slds__item_active');
    if (activeItem) {
        var separator = activeItem.querySelector('.t604__separator');
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        var offsetForVideoBtns = 0;
        var isVideo = activeItem.querySelector('[data-slider-video-type]');
        if (isVideo && isMobile) offsetForVideoBtns = 40;
        var itemPaddingTop = parseInt(getComputedStyle(activeItem).paddingTop) || 0;
        var itemPaddingBottom = parseInt(getComputedStyle(activeItem).paddingBottom) || 0;
        var height = itemPaddingTop + itemPaddingBottom - offsetForVideoBtns;
        if (separator && separator.hasAttribute('data-slider-image-height') && activeItem.clientHeight === 0) {
            height = parseInt(separator.getAttribute('data-slider-image-height')) - height;
        } else {
            height = activeItem.clientHeight - height;
        }
    }
    var arrowWrappers = sliderRec.querySelectorAll('.t-slds__arrow_wrapper');
    if (height && arrowWrappers.length > 0) {
        Array.prototype.forEach.call(arrowWrappers, function (arrowWrapper) {
            arrowWrapper.style.height = height + 'px';
            var arrow = arrowWrapper.querySelector('.t-slds__arrow');
            if (arrow) arrow.style.marginTop = offsetForVideoBtns / 2 + 'px';
        });
    }
}
