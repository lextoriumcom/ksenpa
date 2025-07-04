function t_sldsInit(t, e) {
    var s = t_slds__getRec(t);
    if (s) {
        var i = s.querySelector('.t-slds__items-wrapper'),
            r;
        if (i)
            if (!i.getAttribute('data-slider-initialized')) {
                var a = i.classList.contains('js-feed-container'),
                    l = s.querySelectorAll('.t-slds__item:not(.t-slds__item_dummy)');
                if (l) {
                    e && e.randomSort && (l = t_slds_randomSortElements(l));
                    var d = l.length,
                        o = l[0],
                        n = l[l.length - 1],
                        c = window.innerWidth,
                        u = parseInt(i.getAttribute('data-slider-items-in-row'), 10) || 0,
                        _ = i.getAttribute('data-slider-with-cycle'),
                        p = parseFloat(i.getAttribute('data-slider-transition')),
                        f;
                    if (
                        (Array.prototype.forEach.call(l, function (t, e) {
                            t.setAttribute('data-slide-index', e + 1),
                                window.t_slds__isiOS && (t.style.transform = 'translateZ(0)');
                        }),
                        'true' !== i.getAttribute('data-slider-stop'))
                    ) {
                        p || 0 === p || (p = 300),
                            isNaN(p) && i.setAttribute('data-slider-transition', '300'),
                            i.classList.contains('t-slds_animated-fast') ||
                                i.classList.contains('t-slds_animated-slow') ||
                                i.classList.contains('t-slds_animated-none') ||
                                i.classList.add('t-slds_animated-fast');
                        var m = u;
                        t_slds_setItemsInRow(t), t_slds_changeImageUrl(t);
                        var y = 8 === document.documentMode || 9 === document.documentMode;
                        y &&
                            (i.classList.remove('t-slds_animated-fast'),
                            i.classList.remove('t-slds_animated-slow'),
                            i.classList.add('t-slds_animated-none'),
                            i.classList.add('t-slds_ie'),
                            i.setAttribute('data-slider-correct-height', 'true'),
                            i.setAttribute('data-slider-items-in-row', 1)),
                            i.setAttribute('data-slider-initialized', 'true'),
                            i.getAttribute('data-slider-totalslides') || i.setAttribute('data-slider-totalslides', d);
                        var v = 1,
                            g = i.getAttribute('data-slider-pos');
                        g ? (v = parseInt(g, 10)) : i.setAttribute('data-slider-pos', 1),
                            i.setAttribute('data-slider-cycle', ''),
                            i.setAttribute('data-slider-animated', ''),
                            a || t_slds__createDummies(o, n, i),
                            (u = parseInt(i.getAttribute('data-slider-items-in-row'), 10) || 0);
                        var A = s.querySelectorAll('.t-slds__arrow_wrapper-right');
                        A.length &&
                            Array.prototype.forEach.call(A, function (t) {
                                t.style.display = 'false' === _ && d - u <= 0 ? 'none' : '';
                            }),
                            a || t_slds_SliderWidth(t),
                            'true' == i.getAttribute('data-slider-correct-height') && t_slds_SliderHeight(t),
                            t_slds_SliderArrowsHeight(t),
                            t_slds_ActiveSlide(t, v, d),
                            t_slds_ActiveCaption(t, v, d),
                            a
                                ? c > 960 &&
                                  ('true' === i.getAttribute('data-feeds-posts-loaded')
                                      ? (t_slds__initFeedsSlider(t, s, e), t_slds_initSliderControls(t, e))
                                      : document.addEventListener('feedsLoadPosts', function () {
                                            t_slds__initFeedsSlider(t, s, e), t_slds_initSliderControls(t, e);
                                        }))
                                : (y ||
                                      t_slds_onHammerLoad('Hammer', function () {
                                          t_slds_initSliderSwipe(t, d, c);
                                      }),
                                  t_slds_initSliderControls(t, e),
                                  t_slds_updateSlider(t)),
                            i.getAttribute('data-slider-timeout') > 0
                                ? t_slds_initAutoPlay(t, v, d, e)
                                : i.addEventListener('slideAutoplayTimerReady', function () {
                                      i.getAttribute('data-slider-timeout') > 0 && t_slds_initAutoPlay(t, v, d, e);
                                  }),
                            s.querySelectorAll('.t-slds__item-loaded').length < d + 2 && t_slds_UpdateImages(t, v),
                            'yes' == i.getAttribute('data-slider-arrows-nearpic') && t_slds_positionArrows(t);
                        var b = s.querySelectorAll('.t-slds');
                        b.length &&
                            Array.prototype.forEach.call(b, function (t) {
                                t.style.visibility = '';
                            }),
                            t_slds__setTabindexForFocusableElements(t),
                            s.removeEventListener('displayChanged', t_slds_updateOnDisplayChange),
                            s.addEventListener('displayChanged', t_slds_updateOnDisplayChange(t, m)),
                            a &&
                                (s.removeEventListener('displayChanged', t_slds_updateFeedsSliderOnResize),
                                s.addEventListener('displayChanged', function () {
                                    t_slds_updateFeedsSliderOnResize(t, s, e);
                                })),
                            window.addEventListener(
                                'resize',
                                t_throttle(function () {
                                    setTimeout(function () {
                                        t_slds_setItemsInRow(t, m),
                                            t_slds_updateSlider(t),
                                            t_slds_positionArrows(t),
                                            a && t_slds_updateFeedsSliderOnResize(t, s, e);
                                    }, 100);
                                }),
                            ),
                            window.t_slds__isiOS &&
                                ('complete' === document.readyState
                                    ? t_slds__hideMobileSlides(s.querySelector('.t-slds__item_active'))
                                    : window.addEventListener('load', function () {
                                          t_slds__hideMobileSlides(s.querySelector('.t-slds__item_active'));
                                      })),
                            window.addEventListener('load', function () {
                                'true' == i.getAttribute('data-slider-correct-height') && t_slds_UpdateSliderHeight(t),
                                    t_slds_UpdateSliderArrowsHeight(t);
                            }),
                            setTimeout(function () {
                                t_slds_UpdateSliderArrowsHeight(t);
                            }, 500);
                        var h = document.querySelector('#allrecords');
                        h &&
                            h.addEventListener('allRecPaddingInit', function () {
                                t_slds_updateSlider(t);
                            }),
                            document.removeEventListener('click', t_slds__removeAutoplayByVideo),
                            document.addEventListener('click', t_slds__removeAutoplayByVideo);
                    }
                }
            }
    }
}
function t_slds__removeAutoplayByVideo(t) {
    var e = t.target.closest('[data-slider-video-type], [data-videolazy-type]');
    if (e) {
        var s = e.closest('.t-slds__items-wrapper'),
            i;
        if (s)
            s.getAttribute('data-slider-interval-id') &&
                (s.setAttribute('data-slider-stopped', 'yes'), s.setAttribute('data-slider-stopped-by-video', 'y'));
    }
}
function t_slds__initFeedsSlider(t, e) {
    var s = e.querySelector('.t-slds__items-wrapper');
    if (s) {
        var i = e.querySelectorAll('.t-slds__item:not(.t-slds__item_dummy)'),
            r = parseInt(s.getAttribute('data-slider-totalslides'), 10) || 0,
            a = i[0],
            l = i[i.length - 1],
            d = s.getAttribute('data-slider-with-cycle');
        t_slds__createDummies(a, l, s), t_slds_updateSlider(t);
        var o = parseInt(s.getAttribute('data-slider-items-in-row'), 10) || 0,
            n = e.querySelectorAll('.t-slds__arrow_wrapper-right');
        n.length &&
            Array.prototype.forEach.call(n, function (t) {
                t.style.display = 'false' === d && r - o <= 0 ? 'none' : '';
            }),
            'true' == s.getAttribute('data-slider-correct-height') && t_slds_SliderHeight(t);
    }
}
function t_slds__createDummies(t, e, s) {
    var i,
        r = s.querySelectorAll('.t-slds__item:not(.t-slds__item_dummy)').length,
        a = parseInt(s.getAttribute('data-slider-items-in-row'), 10) || 0,
        l = s.getAttribute('data-slider-with-cycle'),
        d = s.classList.contains('js-feed-container'),
        o = !1,
        n = !1,
        c,
        u;
    if (
        (t &&
            (c = t.querySelector('[data-zoomable="yes"]')) &&
            ((o = !0),
            c.classList.contains('t-zoomable') && c.classList.remove('t-zoomable'),
            c.removeAttribute('data-zoomable')),
        e &&
            (u = e.querySelector('[data-zoomable="yes"]')) &&
            ((n = !0),
            u.classList.contains('t-zoomable') && u.classList.remove('t-zoomable'),
            u.removeAttribute('data-zoomable')),
        e && 0 == s.querySelectorAll('.t-slds__item[data-slide-index="0"]').length)
    ) {
        var _ = e.cloneNode(!0);
        _.setAttribute('data-slide-index', '0'), _.setAttribute('aria-hidden', 'true');
        var p = t.parentNode;
        p.insertBefore(_, t);
        var f = p.querySelectorAll('[data-slide-index="0"] [field]');
        f.length &&
            Array.prototype.forEach.call(f, function (t) {
                t.removeAttribute('field');
            });
    }
    if (!d && t && !s.querySelector('.t-slds__item[data-slide-index="' + (r + 1) + '"]')) {
        var m = t.cloneNode(!0);
        if (
            (m.setAttribute('data-slide-index', r + 1),
            m.classList.remove('t-slds__item_active'),
            m.setAttribute('aria-hidden', 'true'),
            e.insertAdjacentElement('afterend', m),
            e.classList.add('t-slds__item-loaded'),
            a > 0 && 'true' === l)
        )
            for (var y = t, v = e, g = 0; g < a - 1; g++) {
                var A = y.nextElementSibling.cloneNode(!0);
                A.setAttribute('data-slide-index', r + g + 1),
                    v.nextElementSibling.insertAdjacentElement('afterend', A),
                    (v = v.nextElementSibling),
                    (y = y.nextElementSibling);
            }
    }
    o && c && (c.classList.add('t-zoomable'), c.setAttribute('data-zoomable', 'yes')),
        n && u && (u.classList.add('t-zoomable'), u.setAttribute('data-zoomable', 'yes'));
}
function t_slds__hideMobileSlides(t) {
    if (t) {
        var e = t.closest('.t-slds__items-wrapper'),
            s = e && getComputedStyle(e);
        if (!s || 'scroll' !== s.overflowX || 'flex' !== s.display) {
            var i = Array.prototype.slice.call(e.querySelectorAll('.t-slds__item:not(.t-slds__item_dummy)')),
                r = document.documentElement.clientWidth > 960 ? 5 : 3;
            if (!(i.length <= 2 * r)) {
                for (var a = t.getAttribute('data-slide-index'), l = [(a = parseInt(a, 10))], d = 1; d < r; d++)
                    a + d <= i.length ? l.push(a + d) : l.push(d), a - d > 0 ? l.push(a - d) : l.push(i.length + 1 - d);
                var o = 't-slds__item-innactive';
                i.forEach(function (t) {
                    var e;
                    l.some(function (e) {
                        return parseInt(t.getAttribute('data-slide-index'), 10) === e;
                    })
                        ? t.classList.remove(o)
                        : t.classList.add(o);
                });
            }
        }
    }
}
function t_slds_updateOnDisplayChange(t, e) {
    t_throttle(function () {
        t_slds_setItemsInRow(t, e), t_slds_updateSlider(t), t_slds_positionArrows(t);
    });
}
function t_slds_updateFeedsSliderOnResize(t, e, s) {
    var i = e.querySelector('.t-slds__items-wrapper'),
        r;
    i &&
        i.classList.contains('js-feed-container') &&
        (window.innerWidth > 960
            ? 'true' === i.getAttribute('data-feeds-posts-loaded')
                ? (t_slds__initFeedsSlider(t, e, s), t_slds_initSliderControls(t, s))
                : document.addEventListener('feedsLoadPosts', function () {
                      t_slds__initFeedsSlider(t, e, s), t_slds_initSliderControls(t, s);
                  })
            : (i.style.transform = 'translateX(0)'));
}
function t_slds_setItemsInRow(t, e) {
    var s = t_slds__getRec(t);
    if (s) {
        var i = s.querySelector('.t-slds__items-wrapper'),
            r,
            a;
        if (i)
            (i.getAttribute('data-slider-items-in-row') || 0) &&
                (window.innerWidth <= 960 && (a = 2),
                window.innerWidth <= 640 && (a = 1),
                window.innerWidth > 960 && (a = e)),
                a && i.setAttribute('data-slider-items-in-row', a);
    }
}
function t_slds_initSliderControls(t, e) {
    var s = t_slds__getRec(t);
    if (s) {
        var i = s.querySelector('.t-slds__items-wrapper');
        if (i) {
            var r = i.getAttribute('data-slider-items-in-row') || 0,
                a = s.querySelector('.t-slds__container .t-slds__item'),
                l = s.querySelector('.t-slds__container'),
                d = r > 0 && a && l ? a.offsetWidth : l.offsetWidth,
                o;
            if ('true' !== i.getAttribute('data-slider-stop')) {
                i.style.transform = 'translateX(-' + d + 'px)';
                var n = s.querySelectorAll('.t-slds__arrow_wrapper');
                n.length &&
                    Array.prototype.forEach.call(n, function (r) {
                        r.addEventListener('click', function () {
                            var r = t_slds_getCurrentTranslate(s),
                                a = i.getAttribute('data-slider-animated'),
                                l = parseFloat(i.getAttribute('data-slider-pos')),
                                d = parseFloat(i.getAttribute('data-slider-totalslides')),
                                o = i.getAttribute('data-slider-with-cycle'),
                                n = '',
                                c;
                            '' == a &&
                                (i.setAttribute('data-slider-animated', 'yes'),
                                'left' === this.getAttribute('data-slide-direction')
                                    ? 'false' == o && 1 == l
                                        ? (l = 1)
                                        : l--
                                    : 'false' == o && l == d
                                    ? (l = d)
                                    : l++,
                                i.setAttribute('data-slider-pos', l),
                                (l != d + 1 && 0 != l) || (n = 'yes'),
                                i.setAttribute('data-slider-cycle', n),
                                t_slideMoveWithoutAnimation(t, !1, e, r));
                            t_slds_updateSlider(t);
                        });
                    });
                var c = s.querySelectorAll('.t-slds__bullet');
                c.length &&
                    Array.prototype.forEach.call(c, function (r) {
                        r.addEventListener('click', function () {
                            var a = parseInt(r.getAttribute('data-slide-bullet-for'), 10),
                                l;
                            if (parseInt(i.getAttribute('data-slider-pos'), 10) !== a) {
                                var d = t_slds_getCurrentTranslate(s);
                                i.setAttribute('data-slider-pos', a),
                                    t_slideMoveWithoutAnimation(t, !1, e, d),
                                    t_slds_updateSlider(t);
                            }
                        });
                    });
            }
        }
    }
}
function t_slds_animate(t, e, s) {
    var i = performance.now();
    requestAnimationFrame(function r(a) {
        var l = (a - i) / s;
        l > 1 && (l = 1);
        var d = t(l);
        e(d),
            l < 1
                ? requestAnimationFrame(r)
                : ('y' !== window.lazy &&
                      'yes' !== document.querySelector('#allrecords').getAttribute('data-tilda-lazy')) ||
                  t_slds_onHammerLoad('t_lazyload_update', function () {
                      t_lazyload_update();
                  });
    });
}
function t_slide_MoveAnimation(t, e, s, i) {
    if (t) {
        t.style.transition = 'height ease-in-out .5s, transform ease-in-out 0s';
        var r = -Math.abs(e * s),
            a = -parseInt(getComputedStyle(t).transform.match(/\d+/)[0]),
            l = a - r;
        0 !== l &&
            t_slds_animate(
                function (t) {
                    return t;
                },
                function (e) {
                    t.style.transform = 'translateX(' + (a - l * e) + 'px)';
                },
                i,
            );
    }
}
function t_slideMoveWithoutAnimation(t, e, s) {
    var i = t_slds__getRec(t);
    if (i) {
        var r = i.querySelector('.t-slds__items-wrapper');
        if (r) {
            var a = parseFloat(r.getAttribute('data-slider-pos')),
                l,
                d =
                    (r.getAttribute('data-slider-items-in-row') || 0) > 0
                        ? i.querySelector('.t-slds__container .t-slds__item').offsetWidth
                        : i.querySelector('.t-slds__container').offsetWidth,
                o = parseFloat(r.getAttribute('data-slider-totalslides')),
                n = r.classList.contains('t-slds_animated-none'),
                c,
                u;
            a > o + 1 && (a = 1);
            var _ = i.classList.contains('t396__elem');
            if (
                (_ &&
                    ('function' == typeof window.CustomEvent
                        ? ((c = new CustomEvent('tildaSldsMoveSlideStart')),
                          (u = new CustomEvent('tildaSldsMoveSlideEnd')))
                        : ((c = document.createEvent('CustomEvent')).initCustomEvent('tildaSldsMoveSlideStart', !0, !0),
                          (u = document.createEvent('CustomEvent')).initCustomEvent('tildaSldsMoveSlideEnd', !0, !0)),
                    i.dispatchEvent(c)),
                n)
            ) {
                var p = i.querySelector('.t-slds__item_active'),
                    f = i.querySelectorAll('.t-slds__item');
                if (p && 0 === i.querySelectorAll('.t-slds__item_dummy').length) {
                    var m = p.cloneNode(!0),
                        y;
                    m.classList.add('t-slds__item_dummy'),
                        (m.style.position = 'absolute'),
                        (m.style.left = d * a + 'px'),
                        r.appendChild(m),
                        (y = i.classList.contains('js-product')
                            ? i
                            : i.querySelector('.t-store') || i.querySelector('.js-product'))
                            ? (t_slds_fadeOut(m, 150, function () {
                                  null !== m.parentNode && m.parentNode.removeChild(m);
                              }),
                              Array.prototype.forEach.call(f, function (t) {
                                  t_slds_fadeIn(t, 150);
                              }))
                            : (Array.prototype.forEach.call(f, function (t) {
                                  t.style.opacity = 0;
                              }),
                              t_slds_fadeOut(m, 400, function () {
                                  null !== m.parentNode && m.parentNode.removeChild(m);
                              }),
                              setTimeout(function () {
                                  Array.prototype.forEach.call(f, function (t) {
                                      t_slds_fadeIn(t);
                                  }),
                                      _ && i.dispatchEvent(u);
                              }, 50));
                }
                r.classList.add('t-slds_animated-cancel');
            }
            t_slideMove(t, e, s), n && r.classList.remove('t-slds_animated-cancel'), _ && i.dispatchEvent(u);
        }
    }
}
function t_slideMoveInstantly(t, e, s) {
    var i = t_slds__getRec(t);
    if (i) {
        var r = i.querySelector('.t-slds__items-wrapper');
        if (r) {
            var a = parseFloat(r.getAttribute('data-slider-pos')),
                l,
                d =
                    (r.getAttribute('data-slider-items-in-row') || 0) > 0
                        ? i.querySelector('.t-slds__container .t-slds__item').offsetWidth
                        : i.querySelector('.t-slds__container').offsetWidth,
                o = parseFloat(r.getAttribute('data-slider-totalslides')),
                n = r.classList.contains('t-slds_animated-none');
            if ((a > o + 1 && (a = 1), n)) {
                var c = i.querySelector('.t-slds__item_active');
                if (c && 0 === i.querySelectorAll('.t-slds__item_dummy').length) {
                    var u = c.cloneNode(!0);
                    u.classList.add('t-slds__item_dummy'),
                        (u.style.position = 'absolute'),
                        (u.style.left = d * a + 'px'),
                        r.appendChild(u),
                        t_slds_fadeOut(u, 400, function () {
                            null !== u.parentNode && u.parentNode.removeChild(u);
                        });
                }
                r.classList.add('t-slds_animated'), r.classList.add('t-slds_animated-cancel');
            } else r.classList.add('t-slds_animated'), r.classList.add('t-slds_animated-cancel');
            t_slideMove(t, e, s), r.classList.remove('t-slds_animated'), r.classList.remove('t-slds_animated-cancel');
        }
    }
}
function t_slideMove(t, e, s) {
    var i = t_slds__getRec(t);
    if (i) {
        var r = i.querySelector('.t-slds__items-wrapper');
        if (r) {
            var a = i.querySelectorAll('.t-slds__item:not(.t-slds__item_dummy)'),
                l = r.classList.contains('js-feed-container'),
                d = parseInt(r.getAttribute('data-slider-items-in-row') || 0),
                o = parseInt(r.getAttribute('data-feed-show-count') || 0),
                n =
                    d > 0
                        ? i.querySelector('.t-slds__container .t-slds__item').offsetWidth
                        : i.querySelector('.t-slds__container').offsetWidth,
                c = parseFloat(r.getAttribute('data-slider-transition')),
                u = parseFloat(r.getAttribute('data-slider-pos')),
                _ = parseFloat(r.getAttribute('data-slider-totalslides')),
                p = r.getAttribute('data-slider-cycle'),
                f = r.classList.contains('t-slds_animated-none'),
                m = r.getAttribute('data-slider-timeout') > 0,
                y = i.querySelector('.t-slds__arrow_wrapper-right'),
                v = i.querySelector('.t-slds__arrow_wrapper-left'),
                g;
            'off' === r.getAttribute('aria-live') && r.setAttribute('aria-live', 'polite');
            var A = 0;
            if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
                var b = navigator.appVersion.match(/Version\/(\d+)\.(\d+)\.?(\d+)? Safari/);
                null !== b && (A = parseInt(b[1], 10));
            }
            var h = !!navigator.userAgent.match('CriOS'),
                S;
            if (
                (c || 0 === c || (c = 300),
                u > _ + 1 && ((u = 1), r.setAttribute('data-slider-pos', 1)),
                'true' !== r.getAttribute('data-slider-stop'))
            ) {
                if (y)
                    if (l) {
                        var w = a[a.length - 1],
                            q = parseInt(w.getAttribute('data-slide-index'), 10);
                        if ((d < _ && t_slds_fadeIn(y, 300), q < _ && d > 0 && (u == q - o + 1 || q === o))) {
                            var E = document.createEvent('Event');
                            E.initEvent('feedsLastSlide', !0, !0),
                                r.dispatchEvent(E),
                                document.addEventListener('feedsLoadSlide', function () {
                                    t_slds_updateSlider(t),
                                        'function' == typeof t_animate__startAnimation && t_animate__startAnimation();
                                }),
                                t_slds_fadeIn(y, 300);
                        } else q === _ && u === _ - d + 1 && t_slds_fadeOut(y, 300);
                    } else
                        'false' == r.getAttribute('data-slider-with-cycle') && (u == _ || (d > 1 && u == _ - d + 1))
                            ? t_slds_fadeOut(y, 300)
                            : t_slds_fadeIn(y, 300);
                v &&
                    ('false' == r.getAttribute('data-slider-with-cycle') && 1 == u
                        ? t_slds_fadeOut(v, 300)
                        : t_slds_fadeIn(v, 300)),
                    r.classList.add('t-slds_animated'),
                    A >= 13 && h && !f
                        ? t_slide_MoveAnimation(r, u, n, c)
                        : (r.style.transform = 'translateX(-' + n * u + 'px)'),
                    t_triggerEvent(r, 'slideChangeStart'),
                    setTimeout(function () {
                        r.classList.remove('t-slds_animated'),
                            r.setAttribute('data-slider-animated', ''),
                            'yes' == (p = r.getAttribute('data-slider-cycle')) &&
                                (u == _ + 1 && (u = 1),
                                0 == u && (u = _),
                                A >= 13 && h && !f
                                    ? t_slide_MoveAnimation(r, u, n, 0)
                                    : (r.style.transform = 'translateX(-' + n * u + 'px)'),
                                !0 !== f && t_slds_ActiveSlide(t, u, _, s),
                                r.setAttribute('data-slider-pos', u)),
                            ('y' === window.lazy ||
                                (document.querySelector('#allrecords') &&
                                    'yes' === document.querySelector('#allrecords').getAttribute('data-tilda-lazy'))) &&
                                t_slds_onHammerLoad('t_lazyload_update', function () {
                                    t_lazyload_update();
                                }),
                            !e && m && t_slds_initAutoPlay(t, u, _, s);
                    }, c),
                    t_slds_ActiveBullet(t, u, _, s),
                    t_slds_ActiveSlide(t, u, _),
                    'true' == r.getAttribute('data-slider-correct-height') && t_slds_SliderHeight(t),
                    t_slds_SliderArrowsHeight(t),
                    t_slds_ActiveCaption(t, u, _),
                    i.querySelectorAll('.t-slds__item-loaded').length < _ + 2 && t_slds_UpdateImages(t, u);
            }
        }
    }
}
function t_slds_updateSlider(t) {
    var e = t_slds__getRec(t);
    if (e) {
        t_slds_SliderWidth(t);
        var s = e.querySelector('.t-slds__items-wrapper');
        if (s) {
            var i = s.getAttribute('data-slider-items-in-row') || 0,
                r = e.querySelector('.t-slds__container .t-slds__item'),
                a = e.querySelector('.t-slds__container'),
                l = i > 0 && a && r ? r.offsetWidth : a.offsetWidth,
                d = parseInt(s.getAttribute('data-slider-pos'), 10),
                o = parseInt(s.getAttribute('data-slider-totalslides'), 10),
                n = s.getAttribute('data-slider-with-cycle'),
                c = e.querySelector('.t-slds__arrow_wrapper-right');
            d > o + 1 && ((d = 1), s.setAttribute('data-slider-pos', 1)),
                c && (c.style.display = 'false' === n && (o - i <= 0 || d === o) ? 'none' : ''),
                (s.style.transform = 'translateX(-' + l * d + 'px)'),
                'true' == s.getAttribute('data-slider-correct-height') && t_slds_UpdateSliderHeight(t),
                t_slds_UpdateSliderArrowsHeight(t);
        }
    }
}
function t_slds_UpdateImages(t, e) {
    var s = t_slds__getRec(t);
    if (s) {
        var i = s.querySelector('.t-slds__item[data-slide-index="' + e + '"]');
        i &&
            (i.classList.add('t-slds__item-loaded'),
            i.nextElementSibling && i.nextElementSibling.classList.add('t-slds__item-loaded'),
            i.previousElementSibling && i.previousElementSibling.classList.add('t-slds__item-loaded'));
    }
}
function t_slds_ActiveCaption(t, e, s) {
    var i = t_slds__getRec(t);
    if (i) {
        var r = i.querySelectorAll('.t-slds__caption'),
            a = i.querySelector('.t-slds__caption[data-slide-caption="' + e + '"]');
        Array.prototype.forEach.call(r, function (t) {
            t.classList.remove('t-slds__caption-active');
        }),
            0 == e
                ? (a = i.querySelector('.t-slds__caption[data-slide-caption="' + s + '"]'))
                : e == s + 1 && (a = i.querySelector('.t-slds__caption[data-slide-caption="1"]')),
            a && a.classList.add('t-slds__caption-active');
    }
}
function t_slds_scrollImages(t, e) {
    var s = t_slds__getRec(t);
    if (s) {
        var i = (e < 0 ? '' : '-') + Math.abs(e).toString();
        s.querySelector('.t-slds__items-wrapper').style.transform = 'translateX(' + i + 'px)';
    }
}
function t_slds_ActiveBullet(t, e, s, i) {
    var r;
    if (i && i.thumbsbulletGallery) {
        var a = parseInt(i.storeOptions.popup_opts.columns),
            l = +i.storeOptions.slider_slidesOpts.ratio;
        r = t_store_prodPopup_gallery_calcMaxThumbsCount(a, l, 60, 10);
    }
    var d = t_slds__getRec(t);
    if (d) {
        var o = d.querySelectorAll('.t-slds__bullet'),
            n = d.querySelector('.t-slds__bullet[data-slide-bullet-for="' + e + '"]');
        if (
            (Array.prototype.forEach.call(o, function (t) {
                t.classList.remove('t-slds__bullet_active');
                var e = t.querySelector('.t-slds__bullet_body');
                e && e.removeAttribute('aria-current');
            }),
            (i && i.thumbsbulletGallery && e >= r && e != s + 1) || (s >= r && 0 == e)
                ? (n = d.querySelector('.t-slds__bullet[data-slide-bullet-for="' + r + '"]'))
                : 0 == e
                ? (n = d.querySelector('.t-slds__bullet[data-slide-bullet-for="' + s + '"]'))
                : e == s + 1 && (n = d.querySelector('.t-slds__bullet[data-slide-bullet-for="1"]')),
            n)
        ) {
            n.classList.add('t-slds__bullet_active');
            var c = n.querySelector('.t-slds__bullet_body');
            c && c.setAttribute('aria-current', !0);
        }
    }
}
function t_slds_ActiveSlide(t, e, s) {
    var i = t_slds__getRec(t);
    if (i) {
        var r = i.querySelector('.t-slds__items-wrapper'),
            a = i.querySelectorAll('.t-slds__item'),
            l = i.querySelector('.t-slds__item[data-slide-index="' + e + '"]'),
            d = !!r && r.classList.contains('t-slds_animated-none'),
            o = i.querySelectorAll('.t-video-lazyload');
        if (o.length)
            t_onFuncLoad('t_video__getPlayer', function () {
                o.forEach(function (t) {
                    var e;
                    if ('false' !== t.getAttribute('data-videolazy-load')) {
                        var s = t.closest('.t-slds__item:not(.t-slds__item_dummy)');
                        if (s) {
                            var i = t_video__getPlayer(s);
                            i
                                ? i.pause()
                                : t_slds__proccessVideo(s)
                                      .then(function (t) {
                                          return t.pause();
                                      })
                                      .catch(function (t) {
                                          return t;
                                      });
                        }
                    }
                });
            });
        else {
            var n = i.querySelectorAll('iframe'),
                c = i.querySelectorAll('video');
            Array.prototype.forEach.call(n, function (t) {
                t.src &&
                    (-1 !== t.src.indexOf('&enablejsapi=1') &&
                        t.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*'),
                    -1 === t.src.indexOf('vimeo') ||
                        (-1 === t.src.indexOf('&amp;api=1') && -1 === t.src.indexOf('&api=1')) ||
                        t.contentWindow.postMessage('{"method":"pause","value":"true"}', '*'));
            }),
                Array.prototype.forEach.call(c, function (t) {
                    t.pause();
                });
        }
        if (
            (Array.prototype.forEach.call(a, function (t) {
                t.classList.remove('t-slds__item_active'), t.setAttribute('aria-hidden', 'true');
            }),
            0 == e && !1 === d)
        )
            i.querySelector('.t-slds__item[data-slide-index="' + s + '"]').classList.add('t-slds__item_active'),
                i.setAttribute('aria-hidden', 'false');
        else if (0 == e && !0 === d) l = i.querySelector('.t-slds__item[data-slide-index="' + s + '"]');
        else if (e == s + 1 && !1 === d) {
            var u = i.querySelector('.t-slds__item[data-slide-index="1"]');
            u && (u.classList.add('t-slds__item_active'), u.setAttribute('aria-hidden', 'false'));
        } else e == s + 1 && !0 === d && (l = i.querySelector('.t-slds__item[data-slide-index="1"]'));
        l && (l.classList.add('t-slds__item_active'), l.setAttribute('aria-hidden', 'false')),
            window.t_slds__isiOS && t_slds__hideMobileSlides(l),
            t_slds__setTabindexForFocusableElements(t);
    }
}
function t_slds__setTabindexForFocusableElements(t) {
    var e = t_slds__getRec(t);
    if (e) {
        var s = e.querySelector('.t-slds__items-wrapper'),
            i = e.querySelector('.t-slds__item_active');
        if (i) {
            var r = 'a, button, input:not([type="hidden"]), select, textarea, video, iframe',
                a = s.querySelectorAll(r);
            Array.prototype.forEach.call(a, function (t) {
                t.setAttribute('tabindex', '-1');
            });
            var l = i.querySelectorAll(r);
            Array.prototype.forEach.call(l, function (t) {
                t.setAttribute('tabindex', '0');
            });
        }
    }
}
function t_slds_SliderWidth(t) {
    var e = t_slds__getRec(t);
    if (e) {
        var s = e.querySelector('.t-slds__container');
        if (s) {
            var i = getComputedStyle(s),
                r = parseInt(i.paddingLeft) || 0,
                a = parseInt(i.paddingRight) || 0,
                l = s.clientWidth - (r + a),
                d = e.querySelectorAll('.t-slds__item:not(.t-slds__item_dummy)').length,
                o = e.querySelector('.t-slds__items-wrapper'),
                n;
            if ('true' != o.getAttribute('data-slider-stop')) {
                var c = 0;
                o && ((c = o.getAttribute('data-slider-items-in-row')), (o.style.width = l * d + 'px')),
                    window.innerWidth <= 640 ? (c = 1) : window.innerWidth <= 960 && c > 1 && (c = 2);
                var u = c > 1 ? l / c : l;
                if (u > 0) {
                    var _ = e.querySelectorAll('.t-slds__item');
                    o && (_ = o.querySelectorAll('.t-slds__item')),
                        Array.prototype.forEach.call(_, function (t) {
                            t.style.width = u + 'px';
                        });
                }
            }
        }
    }
}
function t_slds_SliderHeight(t) {
    var e = t_slds__getRec(t);
    if (e) {
        var s = e.querySelector('.t-slds__items-wrapper:not([data-slider-correct-height="false"])');
        if (s) {
            var i = s.classList.contains('js-feed-container'),
                r = e.querySelector('.t-slds__item_active'),
                a;
            if (r) {
                var l = parseInt(getComputedStyle(r).paddingTop) || 0,
                    d = parseInt(getComputedStyle(r).paddingBottom) || 0;
                a = r.clientHeight - (l + d);
            }
            a && s && (s.style.height = i ? '' : a + 'px');
        }
    }
}
function t_slds_UpdateSliderHeight(t) {
    var e = t_slds__getRec(t);
    if (e) {
        var s = e.querySelector('.t-slds__items-wrapper:not([data-slider-correct-height="false"])');
        if (s) {
            var i = s.classList.contains('js-feed-container'),
                r = e.querySelector('.t-slds__item_active'),
                a;
            if (r) {
                var l = parseInt(getComputedStyle(r).paddingTop) || 0,
                    d = parseInt(getComputedStyle(r).paddingBottom) || 0;
                a = r.clientHeight - (l + d);
            }
            0 !== a && s && (s.style.height = i ? '' : a + 'px');
        }
    }
}
function t_slds_SliderArrowsHeight(t) {
    var e = t_slds__getRec(t);
    if (e) {
        var s = e.querySelector('.t-slds__item_active'),
            i = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            r,
            a = 0;
        if (s) {
            var l;
            s.querySelector('[data-slider-video-type]') && i && (a = 40);
            var d = parseInt(getComputedStyle(s).paddingTop) || 0,
                o = parseInt(getComputedStyle(s).paddingBottom) || 0;
            r = s.clientHeight - (d + o) - a;
        }
        var n = e.querySelectorAll('.t-slds__arrow_wrapper');
        r &&
            n.length &&
            Array.prototype.forEach.call(n, function (t) {
                t.style.height = r + 'px';
                var e = t.querySelector('.t-slds__arrow');
                e && (e.style.marginTop = a / 2 + 'px');
            }),
            t_slds_fixArrowsInCatalog(e, s, n, i);
    }
}
function t_slds_UpdateSliderArrowsHeight(t) {
    var e = t_slds__getRec(t);
    if (e) {
        var s = e.querySelector('.t-slds__item_active'),
            i = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            r,
            a = 0;
        if (s) {
            var l;
            s.querySelector('[data-slider-video-type]') && i && (a = 40);
            var d = parseInt(getComputedStyle(s).paddingTop) || 0,
                o = parseInt(getComputedStyle(s).paddingBottom) || 0;
            r = s.clientHeight - (d + o) - a;
        }
        var n = e.querySelectorAll('.t-slds__arrow_wrapper');
        r &&
            n.length &&
            Array.prototype.forEach.call(n, function (t) {
                t.style.height = r + 'px';
                var e = t.querySelector('.t-slds__arrow');
                e && (e.style.marginTop = a / 2 + 'px');
            }),
            t_slds_fixArrowsInCatalog(e, s, n, i);
    }
}
function t_slds_fixArrowsInCatalog(t, e, s, i) {
    if (e && i && t.classList.contains('t-store__relevants-grid-cont')) {
        var r = e.querySelector('.js-product-img');
        if (r) {
            var a = r.offsetHeight;
            Array.prototype.forEach.call(s, function (t) {
                var e = t.offsetHeight,
                    s = (a - e) / 2;
                (t.style.top = s + 'px'), (t.style.transform = 'translateY(0)');
            });
        }
    }
}
function t_slds_initAutoPlay(t, e, s, i) {
    var r = 'object' == typeof t,
        a = r ? t[0] : document.querySelector('#rec' + t);
    if (a) {
        var l = a.querySelector('.t-slds'),
            d = a.querySelector('.t-slds__items-wrapper');
        if (d) {
            var o = parseFloat(d.getAttribute('data-slider-timeout')),
                n = '',
                c = d.getAttribute('data-slider-interval-id'),
                u = e,
                _;
            if ((c && clearInterval(c), 'true' !== d.getAttribute('data-slider-stop'))) {
                var p;
                !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&
                    l &&
                    (l.addEventListener('mouseover', function () {
                        d.setAttribute('data-slider-stopped', 'yes');
                    }),
                    l.addEventListener('mouseout', function () {
                        'y' !== d.getAttribute('data-slider-stopped-by-video') &&
                            d.setAttribute('data-slider-stopped', '');
                    }));
                var f = a.getBoundingClientRect().top + window.pageYOffset,
                    m = f + a.offsetHeight,
                    y,
                    v;
                window.addEventListener(
                    'resize',
                    t_throttle(function () {
                        (f = a.getBoundingClientRect().top + window.pageYOffset), (m = f + a.offsetHeight);
                    }),
                ),
                    void 0 !== document.hidden
                        ? ((y = 'hidden'), (v = 'visibilitychange'))
                        : void 0 !== document.msHidden
                        ? ((y = 'msHidden'), (v = 'msvisibilitychange'))
                        : void 0 !== document.webkitHidden && ((y = 'webkitHidden'), (v = 'webkitvisibilitychange')),
                    document.addEventListener(
                        v,
                        function () {
                            if (document[y]) d.setAttribute('data-slider-stopped', 'yes');
                            else {
                                var t = getComputedStyle(a).display,
                                    e = window.pageYOffset,
                                    s = e + window.innerHeight;
                                (f = a.getBoundingClientRect().top + window.pageYOffset),
                                    (m = f + a.offsetHeight) > e &&
                                        f < s &&
                                        'none' !== t &&
                                        'y' !== d.getAttribute('data-slider-stopped-by-video') &&
                                        d.setAttribute('data-slider-stopped', '');
                            }
                        },
                        !1,
                    ),
                    1 === a.length &&
                        window.bind(
                            'scroll',
                            t_throttle(function () {
                                var t = getComputedStyle(a).display,
                                    e = window.pageYOffset,
                                    s = e + window.innerHeight;
                                'none' !== t
                                    ? ((f = a.getBoundingClientRect().top + window.pageYOffset),
                                      (m = f + a.offsetHeight) > e &&
                                      f < s &&
                                      'y' !== d.getAttribute('data-slider-stopped-by-video')
                                          ? d.setAttribute('data-slider-stopped', '')
                                          : '' === d.getAttribute('data-slider-stopped') &&
                                            d.setAttribute('data-slider-stopped', 'yes'))
                                    : r || d.setAttribute('data-slider-stopped', 'yes');
                            }),
                        );
                var g = setInterval(function () {
                    var e = d.getAttribute('data-slider-stopped'),
                        r = d.getAttribute('data-slider-autoplay-ignore-hover'),
                        l = d.getAttribute('data-slider-touch'),
                        o = t_slds_getCurrentTranslate(a);
                    'yes' != e &&
                        'yes' != r &&
                        'yes' != l &&
                        ('false' == d.getAttribute('data-slider-with-cycle') && u == s ? (u = s) : u++,
                        d.setAttribute('data-slider-pos', u),
                        (u != s + 1 && 0 != u) || (n = 'yes'),
                        t_slideMoveWithoutAnimation(t, !0, i, o),
                        t_slds_updateSlider(t),
                        'yes' == n && (u == s + 1 && (u = 1), 0 == u && (u = s), d.setAttribute('data-slider-pos', u)),
                        d.setAttribute('data-slider-cycle', n));
                }, o);
                d.setAttribute('data-slider-interval-id', g);
            }
        }
    }
}
function t_slds_positionArrows(t) {
    var e = t_slds__getRec(t);
    if (e) {
        var s = e.querySelector('.t-slds__arrow_container-outside'),
            i = e.querySelector('.t-slds__item');
        if (i) {
            var r = i.offsetWidth,
                a = e.querySelector('.t-slds__arrow-left') ? e.querySelector('.t-slds__arrow-left').offsetWidth : 0,
                l = e.querySelector('.t-slds__arrow-right') ? e.querySelector('.t-slds__arrow-right').offsetWidth : 0;
            s && (s.style.maxWidth = a + l + r + 120 + 'px');
        }
    }
}
function t_slds_initSliderSwipe(t, e, s, i) {
    var r = t_slds__getRec(t);
    if (r) {
        var a = r.querySelector('.t-slds__main');
        if (a) {
            var l = r.querySelector('.t-slds__items-wrapper');
            if (l) {
                var d,
                    o = !1,
                    n = !1,
                    c,
                    u;
                if ('true' !== l.getAttribute('data-slider-stop'))
                    if ('true' !== l.getAttribute('data-swiper-initialized')) {
                        delete Hammer.defaults.cssProps.userSelect,
                            (window.hammer = new Hammer(a, {
                                domEvents: !0,
                                inputClass: Hammer.TouchInput,
                                recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }]],
                            })),
                            l.setAttribute('data-swiper-initialized', 'true');
                        var _ = function t(e) {
                                window.pageYOffset > r.getBoundingClientRect().bottom + window.pageYOffset ||
                                window.pageYOffset + document.documentElement.clientHeight <
                                    r.getBoundingClientRect().top + window.pageYOffset
                                    ? l.setAttribute(e, 'yes')
                                    : 'y' !== l.getAttribute('data-slider-stopped-by-video') && l.setAttribute(e, '');
                            },
                            p = 'ontouchend' in document ? 'data-slider-touch' : 'data-slider-stopped',
                            f;
                        if ('IntersectionObserver' in window)
                            new IntersectionObserver(function (t) {
                                var e = t[0];
                                l.setAttribute(p, e.isIntersecting ? '' : 'yes');
                            }).observe(r);
                        else
                            _(p),
                                window.addEventListener('scroll', function () {
                                    (o = !0),
                                        clearTimeout(d),
                                        (d = setTimeout(function () {
                                            _(p), (o = !1);
                                        }, 250));
                                });
                        if (1 != e) {
                            var m = function t(e) {
                                return !n || (e.preventDefault(), !1);
                            };
                            window.removeEventListener('touchmove', m, { passive: !1 }),
                                window.addEventListener('touchmove', m, { passive: !1 }),
                                window.hammer.on('pan', function (e) {
                                    if (o) return !1;
                                    n = !0;
                                    var s = r.querySelector('.t-slds__items-wrapper'),
                                        a = s.getAttribute('data-slider-items-in-row') || 0,
                                        l = a > 1,
                                        d = l
                                            ? r.querySelector('.t-slds__container .t-slds__item').offsetWidth
                                            : r.querySelector('.t-slds__container').offsetWidth,
                                        c = parseFloat(s.getAttribute('data-slider-pos')),
                                        u = parseFloat(s.getAttribute('data-slider-totalslides')),
                                        _ = '',
                                        p = e.deltaX,
                                        f = ((100 / u) * e.deltaX) / window.innerWidth,
                                        m = 30,
                                        y;
                                    if ('true' === s.getAttribute('data-slider-stop')) return !1;
                                    if (
                                        (s.setAttribute('data-slider-touch', 'yes'),
                                        t_slds_scrollImages(t, d * c - p),
                                        e.isFinal)
                                    ) {
                                        if (e.velocityX > 0.4)
                                            'false' == s.getAttribute('data-slider-with-cycle') && 1 == c
                                                ? (c = 1)
                                                : c--,
                                                s.setAttribute('data-slider-pos', c),
                                                0 == c && (_ = 'yes'),
                                                s.setAttribute('data-slider-cycle', _),
                                                t_slideMove(t, !1, i);
                                        else if (e.velocityX < -0.4) {
                                            if (
                                                'false' == s.getAttribute('data-slider-with-cycle') &&
                                                (c == u || (l && c == u - a + 1))
                                            )
                                                c = l ? u - a : u;
                                            else {
                                                var v = r.querySelectorAll('.t-slds__item:not(.t-slds__item_dummy)'),
                                                    g = v[v.length - 1],
                                                    A = parseFloat(g.getAttribute('data-slide-index'), 10);
                                                if (A < u && c == A) {
                                                    var b = document.createEvent('Event');
                                                    b.initEvent('feedsLastSlide', !0, !0),
                                                        s.dispatchEvent(b),
                                                        document.addEventListener('feedsLoadSlide', function () {
                                                            t_slds_updateSlider(t);
                                                        });
                                                }
                                                c++;
                                            }
                                            s.setAttribute('data-slider-pos', c),
                                                c == u + 1 && (_ = 'yes'),
                                                s.setAttribute('data-slider-cycle', _),
                                                t_slideMove(t, !1, i);
                                        } else
                                            f <= -30 / u
                                                ? ('false' == s.getAttribute('data-slider-with-cycle') &&
                                                  (c == u || (l && c == u - a + 1))
                                                      ? (c = l ? u - a : u)
                                                      : c++,
                                                  s.setAttribute('data-slider-pos', c),
                                                  c == u + 1 && (_ = 'yes'),
                                                  s.setAttribute('data-slider-cycle', _),
                                                  t_slideMove(t, !1, i))
                                                : f >= m / u
                                                ? ('false' == s.getAttribute('data-slider-with-cycle') && 1 == c
                                                      ? (c = 1)
                                                      : c--,
                                                  s.setAttribute('data-slider-pos', c),
                                                  0 == c && (_ = 'yes'),
                                                  s.setAttribute('data-slider-cycle', _),
                                                  t_slideMove(t, !1, i))
                                                : t_slideMove(t, !1, i);
                                        s.setAttribute('data-slider-touch', ''), (n = !1);
                                    }
                                    return !0;
                                }),
                                window.hammer.on('panend', function () {
                                    t_slideMove(t, !1, i), (n = !1);
                                });
                        }
                    }
            }
        }
    }
}
function t_slds_getCurrentTranslate(t) {
    var e = t.querySelector('.t-slds__items-wrapper');
    if (e) {
        var s = getComputedStyle(e).transform;
        if (void 0 !== s && '' !== s) {
            var i = s.match(/\d+/g);
            if (null !== i) return parseInt(i[0], 10);
        }
    }
}
function t_slds_changeImageUrl(t) {
    var e = document.getElementById('allrecords'),
        s = e && 'yes' === e.getAttribute('data-tilda-lazy'),
        i = t_slds__getRec(t),
        r;
    i &&
        ((r = s ? i.querySelectorAll('.t-slds__img:not([data-original])') : i.querySelectorAll('.t-slds__img')),
        Array.prototype.forEach.call(r, function (t) {
            var e = t.getAttribute('data-src');
            e && (t.setAttribute('src', e), t.removeAttribute('data-src'));
        }));
}
function t_slds_onHammerLoad(t, e, s) {
    if ('function' == typeof window[t]) e();
    else
        var i = Date.now(),
            r = setTimeout(function a() {
                var l = Date.now();
                if ('function' != typeof window[t]) {
                    if (l - i > 7e3) throw new Error(t + ' is undefined');
                    r = setTimeout(a, s || 100);
                } else e();
            });
}
function t_slds_fadeOut(t, e, s) {
    if ('none' !== t.style.display && !t.getAttribute('data-fadeout-timeout')) {
        var i = 1,
            r = parseInt(e),
            a,
            l = setInterval(
                function () {
                    (t.style.opacity = i),
                        (i -= 0.1) <= 0.1 &&
                            (clearInterval(l),
                            t.removeAttribute('data-fadeout-timeout'),
                            (t.style.display = 'none'),
                            'function' == typeof s && s());
                },
                r > 0 ? r / 10 : 40,
            );
        t.setAttribute('data-fadeout-timeout', l);
    }
}
function t_slds_fadeIn(t, e, s) {
    if (
        (('1' !== getComputedStyle(t).opacity && '' !== getComputedStyle(t).opacity) ||
            'none' === getComputedStyle(t).display) &&
        !t.getAttribute('data-fadein-timeout')
    ) {
        var i = 0,
            r = parseInt(e),
            a = r > 0 ? r / 10 : 40;
        (t.style.opacity = i), (t.style.display = 'block');
        var l = setInterval(function () {
            (t.style.opacity = i),
                (i += 0.1) >= 1 &&
                    (clearInterval(l), t.removeAttribute('data-fadein-timeout'), 'function' == typeof s && s());
        }, a);
        t.setAttribute('data-fadein-timeout', l);
    }
}
function t_slds_randomSortElements(t) {
    var e = Array.prototype.slice.call(t);
    if (!e.length) return [];
    e.sort(function () {
        return 0.5 - Math.random();
    });
    var s = t[0].parentNode;
    return (
        e.forEach(function (t) {
            s.appendChild(t);
        }),
        e
    );
}
function t_slds__proccessVideo(t) {
    return new Promise(function (e, s) {
        t_onFuncLoad('t_video__createPlayer', function () {
            t_video__createPlayer(t)
                .then(function (t) {
                    return e(t);
                })
                .catch(function (t) {
                    return s(t);
                });
        });
    });
}
function t_slds__getRec(t) {
    return 'string' == typeof t ? document.querySelector('#rec' + t) : t instanceof Element ? t : t[0];
}
function t_triggerEvent(t, e) {
    var s;
    document.createEvent
        ? (s = document.createEvent('HTMLEvents')).initEvent(e, !0, !1)
        : document.createEventObject && ((s = document.createEventObject()).eventType = e),
        (s.eventName = e),
        t.dispatchEvent
            ? t.dispatchEvent(s)
            : t.fireEvent
            ? t.fireEvent('on' + s.eventType, s)
            : t[e]
            ? t[e]()
            : t['on' + e] && t['on' + e]();
}
window.t_slds__isiOS =
    /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.userAgent.indexOf('Macintosh') && 'ontouchend' in document);
var DEBUG = !1;
function setImportantStyle(t, e, s) {
    t.style.setProperty(e, s, 'important');
}
function getGalleryContainer() {
    var t = document.querySelector('.t-popup');
    if (t) {
        var e = t.querySelector('.t-store__relevants__container');
        if (e) return e;
    }
    return document.querySelector('.t-store__relevants__container');
}
function applyBaseStyles(t) {
    for (var e = t.querySelectorAll('.js-product'), s = 0; s < e.length; s++)
        for (var i, r = e[s].querySelectorAll('.t-store__card__textwrapper'), a = 0; a < r.length; a++) {
            var l = r[a];
            setImportantStyle(l, 'margin-bottom', '0px'),
                setImportantStyle(l, 'margin-top', 'auto'),
                setImportantStyle(l, 'justify-content', 'flex-start');
            var d = l.querySelector('.js-store-prod-name');
            d &&
                (setImportantStyle(d, 'display', '-webkit-box'),
                setImportantStyle(d, '-webkit-box-orient', 'vertical'),
                setImportantStyle(d, '-webkit-line-clamp', '1'),
                setImportantStyle(d, 'overflow', 'hidden'),
                setImportantStyle(d, 'text-overflow', 'ellipsis'));
            var o = l.querySelector('.js-store-prod-descr');
            o &&
                (setImportantStyle(o, 'display', '-webkit-box'),
                setImportantStyle(o, '-webkit-box-orient', 'vertical'),
                setImportantStyle(o, '-webkit-line-clamp', '1'),
                setImportantStyle(o, 'overflow', 'hidden'),
                setImportantStyle(o, 'text-overflow', 'ellipsis'));
        }
    DEBUG && console.info('Базовые стили применены.');
}
function getReferenceHeight() {
    var t = getGalleryContainer();
    if (!t) return 0;
    t.offsetHeight;
    for (var e = t.querySelectorAll('.js-product'), s = 0; s < e.length; s++) {
        var i = e[s];
        if (
            'none' !== window.getComputedStyle(i).display &&
            0 !== i.offsetHeight &&
            i.querySelector('.js-product-img')
        ) {
            var r = i.getBoundingClientRect().height;
            return DEBUG && console.info('Опорная карточка найдена. Высота:', r), r;
        }
    }
    return DEBUG && console.info('Не найдена видимая карточка с изображением.'), 0;
}
function updateNoImageCardHeights() {
    requestAnimationFrame(function () {
        var t = getReferenceHeight();
        if (!(t <= 0)) {
            var e = getGalleryContainer();
            if (e)
                for (var s = e.querySelectorAll('.js-product'), i = 0; i < s.length; i++) {
                    var r = s[i];
                    r.querySelector('.js-product-img')
                        ? (r.style.height = '')
                        : ((r.style.cssText += '; height: ' + t + 'px !important;'),
                          DEBUG && console.info('Установлена высота для карточки без изображения:', t));
                }
        }
    });
}
function attachImageLoadListeners() {
    var t = getGalleryContainer();
    if (t)
        for (var e = t.querySelectorAll('.js-product-img'), s = 0; s < e.length; s++) {
            var i = e[s];
            i.complete ||
                i.addEventListener('load', function () {
                    DEBUG && console.info('Изображение загрузилось, обновляем высоту'), updateNoImageCardHeights();
                });
        }
}
function addEmptyDescrPlaceholder(t) {
    var e = t.querySelector('.js-store-prod-descr.t-store__card__descr');
    if (e) {
        var s = getComputedStyle(e),
            i = e.getBoundingClientRect().height,
            r = s.paddingTop;
        t.querySelectorAll('.js-product').forEach(function (t) {
            if (!t.querySelector('.js-store-prod-descr.t-store__card__descr')) {
                var s = t.querySelector('.t-store__card__textwrapper'),
                    a = s && s.querySelector('.js-store-price-wrapper');
                if (s && a) {
                    var l = document.createElement('div');
                    (l.className = e.className),
                        l.style.setProperty('height', i + 'px', 'important'),
                        l.style.setProperty('padding-top', r, 'important'),
                        l.style.setProperty('margin-bottom', '0px', 'important'),
                        l.style.setProperty('display', '-webkit-box', 'important'),
                        l.style.setProperty('-webkit-box-orient', 'vertical', 'important'),
                        l.style.setProperty('-webkit-line-clamp', '1', 'important'),
                        l.style.setProperty('overflow', 'hidden', 'important'),
                        l.style.setProperty('text-overflow', 'ellipsis', 'important'),
                        s.insertBefore(l, a);
                }
            }
        });
    }
}
function initGallery() {
    var t = getGalleryContainer();
    if (t) {
        t.removeAttribute('data-styles-applied'),
            applyBaseStyles(t),
            (t.dataset.stylesApplied = 'true'),
            addEmptyDescrPlaceholder(t),
            DEBUG && console.info('Инициализация галереи завершена.');
        for (var e = [500, 1e3, 1500], s = 0; s < e.length; s++) {
            var i;
            setTimeout(function () {
                attachImageLoadListeners(), updateNoImageCardHeights();
            }, e[s]);
        }
    } else DEBUG && console.info('Контейнер галереи не найден.');
}
function observePopup() {
    var t = document.querySelector('.t-popup'),
        e;
    t &&
        ('IntersectionObserver' in window
            ? new IntersectionObserver(function (t, e) {
                  for (var s = 0; s < t.length; s++) {
                      var i;
                      if (t[s].isIntersecting) {
                          DEBUG && console.info('Попап видим. Инициализация галереи через 1500 мс'),
                              e.disconnect(),
                              setTimeout(initGallery, 1500);
                          break;
                      }
                  }
              }).observe(t)
            : setTimeout(initGallery, 1500));
}
function onResize() {
    DEBUG && console.info('Resize – обновление высоты карточек'), updateNoImageCardHeights();
}
function onPopstate() {
    DEBUG && console.info('Popstate – инициализация галереи'), setTimeout(initGallery, 500);
}
function onPageshow(t) {
    t.persisted && (DEBUG && console.info('Pageshow (из кэша) – инициализация галереи'), initGallery());
}
function onWindowLoad() {
    initGallery(), observePopup();
}
if (
    (window.addEventListener('resize', onResize),
    window.addEventListener('popstate', onPopstate),
    window.addEventListener('pageshow', onPageshow),
    window.addEventListener('load', onWindowLoad),
    document.body && 'MutationObserver' in window)
) {
    var domObserver = new MutationObserver(function () {
        initGallery();
    });
    domObserver.observe(document.body, { childList: !0, subtree: !0 });
}
var pollCount = 0,
    pollInterval = setInterval(function () {
        initGallery(), ++pollCount >= 20 && clearInterval(pollInterval);
    }, 500);
