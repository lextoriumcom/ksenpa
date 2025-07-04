if (
    ((window.t_zoom__isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
    )),
    window.t_zoom__isMobile ||
        (window.t_zoom__isMobile = navigator.userAgent.indexOf('Macintosh') && 'ontouchend' in document),
    (window.t_zoom__isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)),
    (window.t_zoom__iOSMajorVersion = 0),
    window.t_zoom__isiOS)
) {
    var version = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    null !== version && (window.t_zoom__iOSMajorVersion = parseInt(version[1], 10));
}
function t_initZoom() {
    var t;
    if (!document.querySelector('.t-zoomer__wrapper')) {
        (window.tzoominited = !0), (window.tzoomopenonce = !1), (window.isDoubletapScaleAdded = !1);
        var e = document.querySelectorAll('[data-zoomable]'),
            o = Array.prototype.slice.call(e).filter(function (t) {
                return (
                    'yes' === t.getAttribute('data-zoomable') &&
                    !t.classList.contains('t-slds__thumbs_gallery') &&
                    '' !== t.getAttribute('data-img-zoom-url')
                );
            });
        Array.prototype.forEach.call(o, function (t) {
            t.classList.add('t-zoomable');
        });
        var r = document.createElement('div');
        r.classList.add('t-zoomer__wrapper');
        var n = document.createElement('div');
        n.classList.add('t-zoomer__container');
        var a = document.createElement('div');
        a.classList.add('t-zoomer__bg');
        var i = t_zoom__createCloseBtn(),
            l = t_zoom__createScaleBtn();
        r.appendChild(n),
            r.appendChild(a),
            r.appendChild(i),
            r.appendChild(l),
            document.body && document.body.insertAdjacentElement('beforeend', r),
            t_zoom__initFullScreenImgOnClick(),
            t_zoom__closeAndSlideCarousel();
    }
}
function t_zoom__appendPreloaderToElement(t) {
    if (t && 'y' === window.lazy) {
        var e =
                '\n\t\t<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="40" height="40">\n\t\t\t<g fill="#c5c5c5">\n\t\t\t\t<rect class="t-icon-loader-rect" x="14" width="4" height="11" rx="2" />\n\t\t\t\t<rect class="t-icon-loader-rect" x="14" width="4" height="11" rx="2" transform="rotate(45 16 16)" />\n\t\t\t\t<rect class="t-icon-loader-rect" x="14" width="4" height="11" rx="2" transform="rotate(90 16 16)" />\n\t\t\t\t<rect class="t-icon-loader-rect" x="14" width="4" height="11" rx="2" transform="rotate(135 16 16)" />\n\t\t\t\t<rect class="t-icon-loader-rect" x="14" width="4" height="11" rx="2" transform="rotate(180 16 16)" />\n\t\t\t\t<rect class="t-icon-loader-rect" x="14" width="4" height="11" rx="2" transform="rotate(225 16 16)" />\n\t\t\t\t<rect class="t-icon-loader-rect" x="14" width="4" height="11" rx="2" transform="rotate(270 16 16)" />\n\t\t\t\t<rect class="t-icon-loader-rect" x="14" width="4" height="11" rx="2" transform="rotate(315 16 16)" />\n\t\t\t</g>\n\t\t</svg>\n\t',
            o = document.createElement('div');
        o.classList.add('t-zoomer-loader'), (o.innerHTML = e), t.append(o);
    }
}
function t_zoom__createCloseBtn() {
    var t = document.createElement('div');
    t.classList.add('t-zoomer__close'), (t.style.display = 'none');
    var e = '';
    return (
        (e += '<svg width="20" height="20" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">'),
        (e +=
            '<path d="M1.41421 -0.000151038L0 1.41406L21.2132 22.6273L22.6274 21.2131L1.41421 -0.000151038Z" fill="black"/>'),
        (e +=
            '<path d="M22.6291 1.41421L21.2148 0L0.00164068 21.2132L1.41585 22.6274L22.6291 1.41421Z" fill="black"/>'),
        (e += '</svg>'),
        t.insertAdjacentHTML('beforeend', e),
        t
    );
}
function t_zoom__createScaleBtn() {
    var t = document.createElement('div');
    t.classList.add('t-zoomer__scale'), t.classList.add('showed');
    var e = '';
    return (
        (e +=
            '<svg class="icon-increase" width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">'),
        (e += '<path d="M22.832 22L17.8592 17.0273" stroke="black" stroke-width="2" stroke-linecap="square"/>'),
        (e +=
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M4.58591 3.7511C0.917768 7.41924 0.917768 13.367 4.58591 17.0352C8.25405 20.7033 14.2019 20.7033 17.87 17.0352C21.5381 13.367 21.5381 7.41924 17.87 3.7511C14.2019 0.0829653 8.25405 0.0829653 4.58591 3.7511Z" stroke="black" stroke-width="2"/>'),
        (e += '<path d="M6.25781 10.3931H16.2035" stroke="black" stroke-width="2"/>'),
        (e += '<path d="M11.2305 15.3662V5.42053" stroke="black" stroke-width="2"/>'),
        (e += '</svg>'),
        (e +=
            '<svg class="icon-decrease" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">'),
        (e += '<path d="M21.9961 22L17.0233 17.0273" stroke="black" stroke-width="2" stroke-linecap="square"/>'),
        (e +=
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M3.74997 3.7511C0.0818308 7.41924 0.0818308 13.367 3.74997 17.0352C7.41811 20.7033 13.3659 20.7033 17.0341 17.0352C20.7022 13.367 20.7022 7.41924 17.0341 3.7511C13.3659 0.0829653 7.41811 0.0829653 3.74997 3.7511Z" stroke="black" stroke-width="2"/>'),
        (e += '<path d="M5.41797 10.3931H15.3637" stroke="black" stroke-width="2"/>'),
        (e += '</svg>'),
        t.insertAdjacentHTML('beforeend', e),
        t
    );
}
function t_zoom__initFullScreenImgOnClick() {
    document.addEventListener('click', function (t) {
        var e = t.target.closest('.t-zoomable:not([data-img-zoom-url=""]), .t-slds__thumbs_gallery-zoomable');
        e && t_zoomHandler(e);
    });
    var t = window.t_zoom__isMobile ? 'orientationchange' : 'resize';
    window.addEventListener(t, function () {
        document.body.classList.contains('t-zoomer__show') && t_zoom_checkForScale();
    });
}
function t_zoom__closeAndSlideCarousel() {
    var t = document.querySelector('.t-zoomer__close');
    t &&
        (t.addEventListener('click', function () {
            t_zoom_close();
        }),
        document.addEventListener('keydown', function (t) {
            if (document.body.classList.contains('t-zoomer__show'))
                switch (t.keyCode) {
                    case 27:
                        t.preventDefault(), t_zoom_close();
                        break;
                    case 37:
                        t_zoom__setEventOnBtn('prev');
                        break;
                    case 39:
                        t_zoom__setEventOnBtn('next');
                }
        }));
}
function t_zoomHandler(t) {
    var e;
    document.body.classList.add('t-zoomer__show'),
        document.querySelector('.t-popup_show') && document.body.classList.add('t-zoomer__active');
    var o = document.querySelector('.t-zoomer__container'),
        r = document.createElement('div');
    r.classList.add('t-carousel__zoomed');
    var n = document.createElement('div');
    n.classList.add('t-carousel__zoomer__slides');
    var a = document.createElement('div');
    a.classList.add('t-carousel__zoomer__inner');
    var i = document.createElement('div');
    i.classList.add('t-carousel__zoomer__track'), a.appendChild(i), t_zoom__appendPreloaderToElement(a);
    var l = t_zoom_createSliderArrow('left'),
        c = t_zoom_createSliderArrow('right');
    n.appendChild(l),
        n.appendChild(c),
        n.appendChild(a),
        r.appendChild(n),
        o && (o.innerHTML = ''),
        o && o.appendChild(r);
    var s = t.closest('.r'),
        _;
    if (!document.querySelector('.t-carousel__zoomer__track') || !s) return !1;
    t_zoom__addingImgsIntoCarousel(t);
    var d = document.querySelector('.t-zoomer__close');
    return (
        d && (d.style.display = 'flex'),
        t_zoom_setModalColor(s),
        t_zoom__createAndLoopSlider(t),
        t_zoom__getEventOnBtn(),
        document.body.classList.add('t-zoomer__show_fixed'),
        t_zoom__initSingleZoom(),
        t_zoom_checkForScale(),
        t_zoom_lockScroll(),
        window.t_zoom__isMobile
            ? (t_zoom_initSwipe(),
              t_zoom_initCloseSwipe(),
              window.addEventListener('orientationchange', t_zoom__updateActiveSlidePos))
            : window.addEventListener('resize', t_zoom__updateActiveSlidePos),
        (window.tzoomopenonce = !0),
        t_zoom__initEventsonMobile(),
        !0
    );
}
function t_zoom__updateActiveSlidePos() {
    setTimeout(function () {
        var t = document.querySelector('.t-carousel__zoomer__track');
        if (t) {
            var e = t.querySelector('.t-carousel__zoomer__item.active').offsetLeft;
            t.style.transform = 'translateX(' + -e + 'px)';
        }
    }, 300);
}
function t_zoom_createSliderArrow(t) {
    var e = document.createElement('div');
    e.classList.add('t-carousel__zoomer__control'),
        e.classList.add('t-carousel__zoomer__control_' + t),
        e.setAttribute('data-zoomer-slide', 'left' === t ? 'prev' : 'next');
    var o = document.createElement('div');
    o.classList.add('t-carousel__zoomer__arrow__wrapper'), o.classList.add('t-carousel__zoomer__arrow__wrapper_' + t);
    var r = document.createElement('div');
    return (
        r.classList.add('t-carousel__zoomer__arrow'),
        r.classList.add('t-carousel__zoomer__arrow_' + t),
        r.classList.add('t-carousel__zoomer__arrow_small'),
        o.appendChild(r),
        e.appendChild(o),
        e
    );
}
function t_zoom_initSwipe() {
    var t = document.querySelectorAll('.t-carousel__zoomer__item'),
        e = document.querySelector('.t-zoomer__wrapper');
    if (t.length > 1) {
        var o = new Hammer(e, {
                domEvents: !0,
                inputClass: Hammer.TouchInput,
                cssProps: { touchCollout: 'default' },
                recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }]],
            }),
            r = null,
            n = !1;
        window.tzoomopenonce ||
            (o.on('panstart', function () {
                var t = document.querySelector('.t-carousel__zoomer__track'),
                    o;
                'y' !== t.getAttribute('data-on-transition')
                    ? t && ((r = t.getBoundingClientRect().left), (t.style.transition = 'none'))
                    : (r = null),
                    (n = t_zoom__isScaled(e));
            }),
            o.on('panmove', function (t) {
                var o = document.querySelector('.t-carousel__zoomer__track'),
                    a = o.getAttribute('data-on-transition'),
                    i = e.getAttribute('data-on-drag'),
                    l;
                if (
                    'y' !== a &&
                    'y' !== i &&
                    1 === t.maxPointers &&
                    !n &&
                    (Math.abs(t.deltaX) > 40 && o.setAttribute('data-on-drag', 'y'), r)
                ) {
                    var c = r + t.deltaX;
                    o.style.transform = 'translateX(' + c + 'px)';
                }
            }),
            o.on('panend', function (o) {
                var r = document.querySelector('.t-carousel__zoomer__track');
                r.setAttribute('data-on-drag', '');
                var a = r.getAttribute('data-on-transition'),
                    i = e.getAttribute('data-on-drag');
                if ('y' !== a && 'y' !== i && 1 === o.maxPointers && !n) {
                    r.style.transition = '';
                    var l = Math.abs(o.velocityX),
                        c = r.offsetLeft,
                        s = t[0].offsetWidth,
                        _ = r.querySelector('.t-carousel__zoomer__item.active').offsetLeft,
                        d,
                        m = (s - Math.abs(c + _)) / l / 1e3;
                    m > 0.6 ? (m = 0.6) : m < 0.2 && (m = 0.2),
                        (r.style.transitionDuration = m + 's'),
                        o.velocityX < -0.5 || o.deltaX < -80
                            ? (t_zoom_unscale(), t_zoom_showSlide('next'), t_zoom_checkForScale())
                            : o.velocityX > 0.5 || o.deltaX > 80
                            ? (t_zoom_unscale(), t_zoom_showSlide('prev'), t_zoom_checkForScale())
                            : t_zoom_showSlide();
                }
            }));
    }
}
function t_zoom__initEventsonMobile() {
    if (window.t_zoom__isMobile) {
        t_zoom_setHideControlsTimer();
        var t = document.querySelector('.t-zoomer__wrapper'),
            e;
        ['touchstart', 'touchmove', 'touchend', 'mousemove'].forEach(function (e) {
            t.addEventListener(e, t_zoom_setHideControlsTimer);
        }),
            window.addEventListener('orientationchange', t_zoom__updateSlidesHeight);
    }
}
function t_zoom__updateSlidesHeight() {
    var t = document.querySelectorAll('.t-carousel__zoomer__item .t-carousel__zoomer__img'),
        e = document.querySelector('.t-zoomer__wrapper');
    if (e && t.length) {
        var o = e.getAttribute('data-max-comment-height');
        (o = parseInt(o, 10)),
            isNaN(o) ||
                setTimeout(function () {
                    var r = document.querySelector('.t-carousel__zoomer__item.active');
                    if (r) {
                        var n,
                            a = e.offsetHeight - r.offsetHeight + o,
                            i = document.documentElement.clientHeight - a;
                        Array.prototype.forEach.call(t, function (t) {
                            t.style.maxHeight = i + 'px';
                        });
                    }
                }, 300);
    }
}
function t_zoom__initSingleZoom() {
    var t;
    if (1 === document.querySelectorAll('.t-carousel__zoomer__item').length) {
        var e = document.querySelectorAll('.t-carousel__zoomer__control');
        Array.prototype.forEach.call(e, function (t) {
            t.style.display = 'none';
        });
    }
}
function t_zoom__getEventOnBtn() {
    var t;
    [
        { name: 'right', direction: 'next' },
        { name: 'left', direction: 'prev' },
    ].forEach(function (t) {
        var e;
        document.querySelector('.t-carousel__zoomer__control_' + t.name).addEventListener('click', function () {
            t_zoom__setEventOnBtn(t.direction);
        });
    });
}
function t_zoom__setEventOnBtn(t) {
    var e = document.querySelector('.t-carousel__zoomer__track'),
        o = document.querySelector('.t-zoomer__wrapper'),
        r = e.getAttribute('data-on-transition'),
        n = o.getAttribute('data-on-drag');
    'y' !== r &&
        'y' !== n &&
        (t_zoom_unscale(),
        setTimeout(function () {
            t_zoom_showSlide(t), t_zoom_checkForScale();
        }));
}
function t_zoom__addingImgsIntoCarousel(t) {
    var e = t.closest('.r'),
        o = e ? e.querySelectorAll('.t-zoomable:not(.t-slds__thumbs_gallery):not(.tn-atom__slds-img)') : [],
        r;
    if (e ? e.querySelector('.t-slds') : null) {
        var n = t.closest('.t-slds');
        n && (o = n.querySelectorAll('.t-zoomable:not(.t-slds__thumbs_gallery)')),
            n &&
                n.querySelector('.tn-elem__gallery__video-wrapper') &&
                (o = Array.prototype.slice.call(o)).splice(-1, 1);
    }
    var a = t_zoom__getZoomDescriptionFontFamily(e),
        i = document.querySelector('.t-carousel__zoomer__track'),
        l = 'y' === window.lazy;
    Array.prototype.forEach.call(o, function (t, e) {
        var r = t.getAttribute('data-img-zoom-url'),
            n = '',
            c = '',
            s = r ? r.split(',') : '',
            _,
            d;
        ('IMG' !== t.nodeName && 'DIV' !== t.nodeName) ||
            ((n = t.getAttribute('title') || ''), (c = t.getAttribute('data-img-zoom-descr') || '')),
            n &&
                ((_ = document.createElement('div')).classList.add('t-zoomer__title'),
                _.classList.add('t-descr'),
                _.classList.add('t-descr_xxs'),
                (_.textContent = n),
                a && a.titleFontFamily && (_.style.fontFamily = a.titleFontFamily)),
            c &&
                ((d = document.createElement('div')).classList.add('t-zoomer__descr'),
                d.classList.add('t-descr'),
                d.classList.add('t-descr_xxs'),
                (d.textContent = c),
                a && a.descrFontFamily && (d.style.fontFamily = a.descrFontFamily));
        var m = document.createElement('div');
        m.classList.add('t-carousel__zoomer__item');
        var u = document.createElement('div');
        u.classList.add('t-carousel__zoomer__wrapper');
        var f = document.createElement('img');
        if (
            (f.classList.add('t-carousel__zoomer__img'),
            l
                ? (f.classList.add('t-img'),
                  f.setAttribute('data-original', s),
                  (0 !== e && e !== o.length - 1) || f.setAttribute('data-lazy-rule', 'skip'))
                : (f.src = s),
            m.appendChild(u),
            u.appendChild(f),
            n || c || window.t_zoom__isMobile)
        ) {
            var y = document.createElement('div');
            y.classList.add('t-zoomer__comments'), n && y.appendChild(_), c && y.appendChild(d), m.appendChild(y);
        }
        i.appendChild(m);
    });
}
function t_zoom__getZoomDescriptionFontFamily(t) {
    var e = t.querySelector(
            '.t827__overlay-title, .t979__overlay-title, .t-slds__title, .t603__title, [itemprop="name"]',
        ),
        o = t.querySelector(
            '.t827__overlay-descr, .t979__overlay-descr, .t-slds__descr, .t603__descr, [itemprop="description"]',
        ),
        r,
        n;
    return {
        titleFontFamily: (e && getComputedStyle(e).fontFamily) || '',
        descrFontFamily: (o && getComputedStyle(o).fontFamily) || '',
    };
}
function t_zoom__createAndLoopSlider(t) {
    var e = document.querySelector('.t-carousel__zoomer__track'),
        o = document.querySelector('.t-zoomer__wrapper'),
        r = document.querySelectorAll('.t-carousel__zoomer__item');
    if (o && r.length) {
        var n = o.offsetHeight - r[0].offsetHeight,
            a = 0;
        window.t_zoom__isMobile &&
            ((a = Array.prototype.reduce.call(
                r,
                function (t, e) {
                    var o = e.querySelector('.t-zoomer__comments'),
                        r = o ? o.offsetHeight : 0;
                    return r > t ? r : t;
                },
                0,
            )),
            o.setAttribute('data-max-comment-height', a));
        var i = 'y' === window.lazy;
        Array.prototype.forEach.call(r, function (t) {
            var e = t.querySelector('.t-carousel__zoomer__img'),
                o = i ? 'data-original' : 'src',
                r = e.getAttribute(o),
                l = t.querySelector('.t-zoomer__comments'),
                c = l ? l.offsetHeight : 0;
            window.t_zoom__isMobile && (c = a);
            var s = n + c;
            l && (l.style.height = c + 'px'), (e.style.maxHeight = document.documentElement.clientHeight - s + 'px');
            var _ = document.querySelectorAll('.t-carousel__zoomer__arrow__wrapper');
            Array.prototype.forEach.call(_, function (t) {
                t.style.top = c ? 'calc(50% - ' + c / 2 + 'px)' : '50%';
            });
        }),
            Array.prototype.forEach.call(r, function (t, e) {
                t.setAttribute('data-zoomer-slide-number', e);
            }),
            r.length > 1 && t_zoom_loopSlider();
        var l = t.getAttribute('data-img-zoom-url'),
            c,
            s = '.t-carousel__zoomer__img[' + (i ? 'data-original' : 'src') + '="' + l + '"]',
            _ = l ? document.querySelector(s) : null,
            d = _ ? _.closest('.t-carousel__zoomer__item') : null;
        if (d) {
            var m = !!d && d.offsetLeft;
            d.classList.add('active'),
                t_zoom__hideInnactiveSlides(d, e),
                (e.style.transition = 'none'),
                (e.style.transform = 'translateX(' + -m + 'px)'),
                setTimeout(function () {
                    e.style.transition = '';
                }, 200);
        }
        i && (t_onFuncLoad('t_lazyload_update', t_lazyload_update), d && t_zoom__preloadNextSlide(d, e));
    }
}
function t_zoom__hideInnactiveSlides(t, e) {
    if (t) {
        var o = t_zoom__getSlideList(e);
        if (!(o.length <= 6)) {
            var r = t_zoom__getCurrentSlideIndex(t),
                n = [r];
            n.push(0 === r ? o.length : r - 1), n.push(r === o.length ? 0 : r + 1);
            var a = 't-carousel__zoomer__item-innactive';
            o.forEach(function (t) {
                var e = t_zoom__getCurrentSlideIndex(t),
                    o = -1 !== n.indexOf(e) ? 'remove' : 'add';
                t.classList[o](a);
            });
        }
    }
}
function t_zoom__getSlideList(t) {
    return Array.from(t.querySelectorAll('.t-carousel__zoomer__item:not(:first-child):not(:last-child)'));
}
function t_zoom__preloadNextSlide(t, e) {
    var o = t_zoom__getCurrentSlideIndex(t),
        r = t_zoom__getSlideList(e),
        n = r[o + 1] || r[0];
    if (n) {
        var a = n.querySelector('.t-carousel__zoomer__img'),
            i = 'loaded';
        a &&
            !a.classList.contains(i) &&
            t_onFuncLoad('t_lazyload_setSources', function () {
                t_lazyload_setSources(a, a, 'original-set', 'original'),
                    a.addEventListener('load', function () {
                        a.classList.add(i);
                    });
            });
    }
}
function t_zoom__getCurrentSlideIndex(t) {
    return (t && parseInt(t.getAttribute('data-zoomer-slide-number'), 10)) || 0;
}
function t_zoom_showSlide(t) {
    var e = document.querySelector('.t-carousel__zoomer__track'),
        o = e.querySelectorAll('.t-carousel__zoomer__item'),
        r = e.querySelector('.t-carousel__zoomer__item.active'),
        n = 0,
        a = 'y' === e.getAttribute('data-cached-zoom');
    if (
        (Array.prototype.forEach.call(o, function (t, e) {
            t === r && (n = e);
        }),
        'next' === t || 'prev' === t)
    ) {
        var i = 'next' === t ? n + 1 : o.length + (n - 1);
        (n = i % o.length),
            e.setAttribute('data-on-transition', 'y'),
            window.t_zoom__isMobile &&
                '0s' === getComputedStyle(e).transitionDuration &&
                !a &&
                (e.style.transition = '');
    }
    var l = o[n],
        c = l.offsetLeft;
    if (
        (r.classList.remove('active'),
        l.classList.add('active'),
        (e.style.transform = 'translateX(' + -c + 'px)'),
        t_zoom__hideInnactiveSlides(l, e),
        a)
    ) {
        e.removeAttribute('data-cached-zoom');
        var s = new Event('transitionend');
        e.dispatchEvent(s);
    }
    if ('y' === window.lazy) {
        t_zoom__preloadNextSlide(l, e), t_onFuncLoad('t_lazyload_update', t_lazyload_update);
        var _ = l.querySelector('img');
        _ &&
            !_.src &&
            setTimeout(function () {
                t_onFuncLoad('t_lazyload_update', t_lazyload_update);
            }, 200);
    }
}
function t_zoom_transitForLoop(t) {
    var e = document.querySelector('.t-carousel__zoomer__track'),
        o = document.querySelectorAll('.t-carousel__zoomer__item'),
        r,
        n;
    t &&
        ('start' === t && (r = o.length - 2),
        'end' === t && (r = 1),
        (n = o[r].offsetLeft),
        Array.prototype.forEach.call(o, function (t, e) {
            e === r ? t.classList.add('active') : t.classList.remove('active');
        }),
        (e.style.transition = 'none'),
        (e.style.transform = 'translateX(' + -n + 'px)'),
        setTimeout(function () {
            (e.style.transition = ''), 'y' === window.lazy && t_onFuncLoad('t_lazyload_update', t_lazyload_update);
        }));
}
function t_zoom_loopSlider() {
    var t = document.querySelector('.t-carousel__zoomer__track'),
        e = t.querySelectorAll('.t-carousel__zoomer__item'),
        o = e[0].cloneNode(!0),
        r = e[e.length - 1].cloneNode(!0);
    o.classList.remove('active'),
        r.classList.remove('active'),
        t_zoom__updateClonedImgSrc(e[0], e[e.length - 1], o, r),
        t.insertBefore(r, t.firstChild),
        t.appendChild(o);
    var n = (e = t.querySelectorAll('.t-carousel__zoomer__item')).length,
        a;
    ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd'].forEach(function (o) {
        t.addEventListener(o, function () {
            var o = 0;
            Array.prototype.forEach.call(e, function (t, e) {
                t.classList.contains('active') && (o = e);
            }),
                0 === o && t_zoom_transitForLoop('start'),
                o === n - 1 && t_zoom_transitForLoop('end'),
                t.setAttribute('data-on-transition', '');
        });
    });
}
function t_zoom__updateClonedImgSrc(t, e, o, r) {
    if ('y' === window.lazy) {
        var n = t.querySelector('img'),
            a = e.querySelector('img'),
            i = o.querySelector('img'),
            l = r.querySelector('img'),
            c = [n, a, i, l];
        if (
            !c.some(function (t) {
                return !t;
            }) &&
            'MutationObserver' in window
        ) {
            var s = new MutationObserver(function (t) {
                t.forEach(function (t) {
                    var e;
                    'attributes' === t.type &&
                        'src' === t.attributeName &&
                        (t.target === n && (e = i),
                        t.target === a && (e = l),
                        t.target === i && (e = n),
                        t.target === l && (e = a),
                        t.target.src && !e.src && (e.src = t.target.src));
                });
            });
            c.forEach(function (t) {
                s.observe(t, { attributes: !0 });
            });
        }
    }
}
function t_zoom_initCloseSwipe() {
    var t = document.querySelector('.t-zoomer__wrapper'),
        e = document.querySelector('.t-carousel__zoomer__track'),
        o = !1,
        r,
        n = new Hammer(t, {
            domEvents: !0,
            inputClass: Hammer.TouchInput,
            cssProps: { touchCollout: 'default' },
            recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }]],
        });
    n.on('panstart', function () {
        (r = t.offsetTop), (t.style.position = 'none'), (o = t_zoom__isScaled(t));
    }),
        n.on('panmove', function (n) {
            var a = Math.abs(n.deltaY);
            if (
                ('y' !== e.getAttribute('data-on-drag') || 'y' === t.getAttribute('data-on-drag')) &&
                ((n.angle > -120 && n.angle < -60) || (n.angle < 120 && n.angle > 60)) &&
                1 === n.maxPointers &&
                !o
            ) {
                a > 40 && t.setAttribute('data-on-drag', 'y');
                var i = r + n.deltaY;
                t.style.transform = 'translateY(' + i + 'px)';
            }
        }),
        n.on('panend', t_zoom_closeSwipeHandler);
}
function t_zoom_closeSwipeHandler(t) {
    var e = document.querySelector('.t-zoomer__wrapper'),
        o = 300,
        r = t_zoom__isScaled(e);
    (e.style.transition = 'transform 300ms ease-out'),
        Math.abs(t.deltaY) < 40 && (e.style.transform = ''),
        'y' !== e.getAttribute('data-on-drag') ||
            1 !== t.maxPointers ||
            r ||
            (t.deltaY < -200 || t.velocityY < -0.3
                ? ((e.style.transform = 'translateY(-100vh)'),
                  setTimeout(function () {
                      t_zoom_close(), (e.style.transform = '');
                  }, o))
                : t.deltaY > 200 || t.velocityY > 0.3
                ? ((e.style.transform = 'translateY(100vh)'),
                  setTimeout(function () {
                      t_zoom_close(), (e.style.transform = '');
                  }, o))
                : (e.style.transform = '')),
        e.setAttribute('data-on-drag', '');
}
function t_zoom_checkForScale() {
    var t = document.querySelector('.t-carousel__zoomer__item.active .t-carousel__zoomer__img:not(.loaded)');
    if (t) {
        var e = document.getElementById('allrecords'),
            o = !!e && 'yes' === e.getAttribute('data-tilda-lazy');
        if ('y' === window.lazy || o) {
            var r = Date.now();
            t_zoom__waitImgForScale(t, r, function () {
                t_zoom_checkToScaleInit(t);
            });
        } else
            t.complete
                ? t_zoom_checkToScaleInit(t)
                : (t.onload = function () {
                      t_zoom_checkToScaleInit(t);
                  });
    }
}
function t_zoom__waitImgForScale(t, e, o) {
    if (t.src && t.naturalWidth && t.naturalHeight) o();
    else if (Date.now() - e < 3e3)
        setTimeout(function () {
            t_zoom__waitImgForScale(t, e, o);
        }, 500);
    else {
        var r = t.naturalWidth,
            n = t.naturalHeight;
        console.warn("zoomed image isn't complete, natural width: " + r + ', natural height: ' + n), o();
    }
}
function t_zoom_checkToScaleInit(t) {
    var e = window.innerWidth,
        o = window.innerHeight,
        r = document.querySelector('.t-zoomer__wrapper');
    r.classList.remove('zoomer-no-scale');
    var n = t.hasAttribute('data-original-svg-height') || t.hasAttribute('data-original-svg-width'),
        a = parseInt(t.getAttribute('data-original-svg-height'), 10) || t.naturalHeight,
        i = parseInt(t.getAttribute('data-original-svg-width'), 10) || t.naturalWidth;
    -1 === t.src.indexOf('.svg') || window.isIE || n
        ? o < a || e < i
            ? (!window.isDoubletapScaleAdded && window.t_zoom__isMobile && t_zoom_doubletapScaleInit(),
              t_zoom_scale_init())
            : ((document.querySelector('.t-zoomer__scale').style.display = ''), r.classList.add('zoomer-no-scale'))
        : t_zoom_fetchSVG(t, o, e);
}
function t_zoom_fetchSVG(t, e, o) {
    var r = t.src;
    fetch(r)
        .then(function (t) {
            return t.text();
        })
        .then(function (r) {
            var n = document.createElement('div');
            document.body.insertAdjacentElement('beforeend', n), (n.innerHTML = r);
            var a = n.querySelector('svg'),
                i = Math.round(a.getBBox().width),
                l = Math.round(a.getBBox().height),
                c = i / l,
                s = 5e3;
            i > s && ((i = s), (l = Math.round(i / c))),
                t.setAttribute('data-original-svg-width', i),
                t.setAttribute('data-original-svg-height', l),
                e < l || o < i
                    ? ((t.style.width = i + 'px'),
                      (t.style.height = l + 'px'),
                      !window.isDoubletapScaleAdded && window.t_zoom__isMobile && t_zoom_doubletapScaleInit(),
                      t_zoom_scale_init())
                    : (document.querySelector('.t-zoomer__scale').style.display = ''),
                document.body.removeChild(n);
        });
}
function t_zoom_scale_init() {
    var t = document.querySelector('.t-zoomer__wrapper'),
        e = document.querySelector('.t-zoomer__scale');
    (e.style.display = 'block'),
        'y' !== e.getAttribute('data-zoom-scale-init') &&
            (e.setAttribute('data-zoom-scale-init', 'y'),
            t.addEventListener(
                'click',
                function (e) {
                    var o = document.querySelector('.t-carousel__zoomer__item.active .t-carousel__zoomer__img'),
                        r = document.querySelector('.t-carousel__zoomer__track'),
                        n = document.querySelector('.t-carousel__zoomer__inner'),
                        a = !t.classList.contains('zoomer-no-scale');
                    ((window.t_zoom__isMobile && e.target.closest('.t-zoomer__scale') && a) ||
                        (!window.t_zoom__isMobile &&
                            a &&
                            !e.target.closest('.t-zoomer__close, .t-carousel__zoomer__control'))) &&
                        (r.setAttribute('data-on-transition', ''),
                        (r.style.transition = 'none'),
                        (r.style.transform = 'none'),
                        (o.style.maxHeight = ''),
                        t.classList.contains('scale-active')
                            ? t_zoom_unscale()
                            : (t.classList.add('scale-active'),
                              n.classList.add('scale-active'),
                              window.t_zoom__isMobile
                                  ? t_zoom_mobileZoomPositioningInit(o)
                                  : t_zoom_desktopZoomPositioningInit(o, e)));
                },
                !1,
            ));
}
function t_zoom_doubletapScaleInit() {
    window.isDoubletapScaleAdded = !0;
    var t = document.querySelector('.t-zoomer__wrapper'),
        e;
    new Hammer(t, {
        domEvents: !0,
        inputClass: Hammer.TouchInput,
        cssProps: { touchCollout: 'default' },
        recognizers: [[Hammer.Tap]],
    }).on('tap', function (e) {
        if (
            2 === e.tapCount &&
            document.body.classList.contains('t-zoomer__show') &&
            !e.target.closest('.t-carousel__zoomer__control')
        ) {
            var o = document.querySelector('.t-carousel__zoomer__item.active .t-carousel__zoomer__img'),
                r = document.querySelector('.t-carousel__zoomer__inner'),
                n = document.querySelector('.t-carousel__zoomer__track');
            (o.style.maxHeight = ''),
                (n.style.transition = 'none'),
                (n.style.transform = 'none'),
                t.classList.contains('scale-active')
                    ? t_zoom_unscale()
                    : (t.classList.add('scale-active'),
                      r.classList.add('scale-active'),
                      t_zoom_mobileZoomPositioningInit(o));
        }
    });
}
function t_zoom_desktopZoomPositioningInit(t, e) {
    var o = (window.innerWidth - t.offsetWidth) / 2,
        r = (window.innerHeight - t.offsetHeight) / 2,
        n,
        a,
        i,
        l,
        c = t.getAttribute('data-original-svg-width') || t.naturalWidth,
        s = t.getAttribute('data-original-svg-height') || t.naturalHeight;
    function _(t, e) {
        (i = (100 * (void 0 !== t.touches ? t.touches[0].clientX : t.clientX)) / window.innerWidth),
            (l = (-i * (e.offsetWidth - window.innerWidth)) / 100),
            (e.style.left = l + 'px');
    }
    function d(t, e) {
        (n = (100 * (void 0 !== t.touches ? t.touches[0].clientY : t.clientY)) / window.innerHeight),
            (a = (-n * (e.offsetHeight - window.innerHeight)) / 100),
            (e.style.top = a + 'px');
    }
    (t.style.left = o + 'px'),
        (t.style.top = r + 'px'),
        window.innerWidth < c && window.innerHeight < s
            ? ((i = (100 * e.clientX) / window.innerWidth),
              (l = (-i * (c - window.innerWidth)) / 100),
              (n = (100 * e.clientY) / window.innerHeight),
              (a = (-n * (s - window.innerHeight)) / 100),
              (t.style.left = l + 'px'),
              (t.style.top = a + 'px'),
              window.t_zoom__isMobile
                  ? (t.ontouchmove = function (e) {
                        _(e, t), d(e, t);
                    })
                  : (t.onmousemove = function (e) {
                        _(e, t), d(e, t);
                    }))
            : window.innerWidth < c
            ? ((i = (100 * e.clientX) / window.innerWidth),
              (l = (-i * (c - window.innerWidth)) / 100),
              (t.style.left = l + 'px'),
              window.t_zoom__isMobile
                  ? (t.ontouchmove = function (e) {
                        _(e, t);
                    })
                  : (t.onmousemove = function (e) {
                        _(e, t);
                    }))
            : window.innerHeight < s &&
              ((n = (100 * e.clientY) / window.innerHeight),
              (a = (-n * (s - window.innerHeight)) / 100),
              (t.style.top = a + 'px'),
              window.t_zoom__isMobile
                  ? (t.ontouchmove = function (e) {
                        d(e, t);
                    })
                  : (t.onmousemove = function (e) {
                        d(e, t);
                    }));
}
function t_zoom_mobileZoomPositioningInit(t) {
    var e = (window.innerWidth - t.offsetWidth) / 2,
        o = (window.innerHeight - t.offsetHeight) / 2;
    (t.style.left = e + 'px'), (t.style.top = o + 'px');
    var r = { x: 0, y: 0 },
        n = {},
        a = {};
    (t.ontouchstart = function (t) {
        n = t_zoom_getTouchEventXY(t);
    }),
        (t.ontouchmove = function (i) {
            var l = t_zoom_getTouchEventXY(i),
                c = 1.5,
                s = (l.x - n.x) * c,
                _ = (l.y - n.y) * c;
            (a.x = r.x + s),
                (a.y = r.y + _),
                a.x > -e && (a.x = -e),
                a.x < e && (a.x = e),
                a.y > -o && (a.y = -o),
                a.y < o && (a.y = o),
                t.offsetHeight < window.innerHeight && (a.y = 0),
                (t.style.transform = 'translate(' + a.x + 'px, ' + a.y + 'px)');
        }),
        (t.ontouchend = function () {
            (r.x = a.x), (r.y = a.y);
        }),
        (t.ontouchcancel = function () {
            (r.x = a.x), (r.y = a.y);
        });
}
function t_zoom_getTouchEventXY(t) {
    var e = { x: 0, y: 0 };
    if (['touchstart', 'touchmove', 'touchend', 'touchcancel'].includes(t.type)) {
        var o = t.touches[0] || t.changedTouches[0];
        (e.x = o.pageX), (e.y = o.pageY);
    }
    return e;
}
function t_zoom_close() {
    t_zoom_unscale(),
        document.body.classList.remove('t-zoomer__show'),
        document.body.classList.remove('t-zoomer__show_fixed');
    var t = document.querySelector('.t-zoomer__container');
    t && (t.innerHTML = ''),
        setTimeout(function () {
            document.body.classList.remove('t-zoomer__active');
        }, 200),
        t_zoom_unlockScroll(),
        window.t_zoom__isMobile
            ? (window.removeEventListener('orientationchange', t_zoom__updateSlidesHeight),
              window.removeEventListener('orientationchange', t_zoom__updateActiveSlidePos))
            : window.removeEventListener('resize', t_zoom__updateActiveSlidePos);
}
function t_zoom_unscale() {
    var t = document.querySelectorAll('.t-zoomer__wrapper.scale-active, .t-carousel__zoomer__inner.scale-active');
    Array.prototype.forEach.call(t, function (t) {
        t.classList.remove('scale-active');
    });
    var e = document.querySelector('.t-carousel__zoomer__item.active'),
        o = document.querySelector('.t-carousel__zoomer__track'),
        r = document.querySelector('.t-zoomer__wrapper');
    if (e) {
        var n = e.querySelector('.t-carousel__zoomer__img'),
            a = e.querySelector('.t-zoomer__comments');
        if (r) {
            var i = r.offsetHeight - e.offsetHeight,
                l = a ? a.offsetHeight : 0;
            window.t_zoom__isMobile && (l = r.getAttribute('data-max-comment-height') || l);
            var c = i + l;
            (n.onmousemove = null),
                (n.ontouchmove = null),
                (n.style.transform = ''),
                (n.style.left = ''),
                (n.style.top = ''),
                (n.style.maxHeight = document.documentElement.clientHeight - c + 'px');
        }
    }
    if (void 0 !== e.offsetLeft && void 0 !== e.offsetTop) {
        var s = e.offsetLeft;
        o.style.transform = 'translateX(' + -s + 'px)';
    }
    t.length && o.setAttribute('data-cached-zoom', 'y'),
        setTimeout(function () {
            o.style.transition = '';
        }, 100);
}
function t_zoom_lockScroll() {
    var t = /(android)/i.test(navigator.userAgent),
        e;
    if (
        ((window.t_zoom__isiOS && 11 === window.t_zoom__iOSMajorVersion && !window.MSStream) || t) &&
        !document.body.classList.contains('t-body_scroll-locked')
    ) {
        var o = window.pageYOffset;
        document.body.classList.add('t-body_scroll-locked'),
            (document.body.style.top = '-' + o + 'px'),
            document.body.setAttribute('data-popup-scrolltop', o.toString());
    }
}
function t_zoom_unlockScroll() {
    var t = /(android)/i.test(navigator.userAgent),
        e;
    if (
        ((window.t_zoom__isiOS && 11 === window.t_zoom__iOSMajorVersion && !window.MSStream) || t) &&
        document.body.classList.contains('t-body_scroll-locked')
    ) {
        var o = document.body.getAttribute('data-popup-scrolltop');
        document.body.classList.remove('t-body_scroll-locked'),
            (document.body.style.top = ''),
            document.body.removeAttribute('data-popup-scrolltop'),
            window.scrollTo(0, Number(o));
    }
}
function t_zoom_setModalColor(t) {
    var e = '#ffffff',
        o = '#000000',
        r = t.getAttribute('data-bg-color'),
        n = r || e,
        a;
    (n = -1 !== n.indexOf('-gradient(') ? t_zoom_getFirstColorFromGradient(n) : t_zoom_hexToRgb(n)),
        document.getElementById('allrecords') !== document.querySelector('.t-store__product-snippet') &&
            document.getElementById('allrecords').contains(document.querySelector('.t-store__product-snippet')) &&
            t &&
            (n = t.style.backgroundColor);
    var i = document.querySelector('.t-zoomer__container'),
        l = document.querySelectorAll('.t-zoomer__wrapper svg'),
        c = document.querySelectorAll('.t-zoomer__close, .t-zoomer__scale'),
        s = i.querySelectorAll('.t-carousel__zoomer__arrow__wrapper'),
        _,
        d,
        m = document.querySelectorAll('.t-zoomer__title, .t-zoomer__descr'),
        u = 'black' === t_zoom_luma_rgb(n) ? o : e;
    u === o
        ? ((_ = e),
          (d = 'rgba(1, 1, 1, 0.3)'),
          Array.prototype.forEach.call(s, function (t) {
              t.classList.add('t-carousel__zoomer__arrow__wrapper_dark');
          }))
        : ((_ = o),
          (d = 'rgba(255, 255, 255, 0.3)'),
          Array.prototype.forEach.call(s, function (t) {
              t.classList.remove('t-carousel__zoomer__arrow__wrapper_dark');
          })),
        Array.prototype.forEach.call(c, function (t) {
            t.style.background = d;
        }),
        (i.style.backgroundColor = u),
        (i.style.color = _),
        Array.prototype.forEach.call(l, function (t) {
            'none' === t.getAttribute('fill') ? t.setAttribute('fill', 'none') : t.setAttribute('fill', _);
            var e = t.querySelectorAll('path');
            e.length > 0 &&
                Array.prototype.forEach.call(e, function (t) {
                    t.getAttribute('stroke') && t.setAttribute('stroke', _),
                        t.getAttribute('fill') && t.setAttribute('fill', _);
                });
        }),
        Array.prototype.forEach.call(m, function (t) {
            t.style.color = _;
        });
}
function t_zoom_luma_rgb(t) {
    if (!t) return '';
    var e = Array.isArray(t);
    if (void 0 === t) return 'black';
    if (0 !== t.indexOf('rgb') && !e) return 'black';
    var o = e ? t : t.split('(')[1].split(')')[0].split(',');
    return o.length < 3 || 0.2126 * o[0] + 0.7152 * o[1] + 0.0722 * o[2] < 128 ? 'black' : 'white';
}
function t_zoom_hexToRgb(t) {
    var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        o = t.replace(e, function (t, e, o, r) {
            return e + e + o + o + r + r;
        }),
        r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(o),
        n = r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : null;
    return r ? [n.r, n.g, n.b] : null;
}
function t_zoom_getFirstColorFromGradient(t) {
    var e = /rgba\(\d+,\d+,\d+,\d+\)/gi,
        o = /(\d+),(\d+),(\d+)/i,
        r = t.match(e),
        n = r ? r[0] : null,
        a = o.exec(n),
        i = a ? { r: a[1], g: a[2], b: a[3] } : null;
    return a ? [i.r, i.g, i.b] : null;
}
function t_zoom_setHideControlsTimer() {
    var t = document.querySelectorAll('.t-carousel__zoomer__arrow__wrapper, .t-zoomer__scale');
    Array.prototype.forEach.call(t, function (t) {
        t.classList.remove('t-zoomer__hide-animation');
    }),
        setTimeout(function () {
            Array.prototype.forEach.call(t, function (t) {
                t.classList.add('t-zoomer__hide-animation');
            });
        });
}
function t_zoom__isScaled(t) {
    return (window.visualViewport && 1 !== window.visualViewport.scale) || t.classList.contains('scale-active');
}
t_onReady(function () {
    window.tzoominited || t_initZoom();
});
