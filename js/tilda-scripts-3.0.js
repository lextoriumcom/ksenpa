function t_onReady(t) {
    'loading' != document.readyState ? t() : document.addEventListener('DOMContentLoaded', t);
}
function t_addClass(t, e) {
    document.body.classList ? t.classList.add(e) : (t.className += (t.className ? ' ' : '') + e);
}
function t_removeClass(t, e) {
    document.body.classList
        ? t.classList.remove(e)
        : (t.className = t.className
              .replace(new RegExp('(^|\\s+)' + e + '(\\s+|$)'), ' ')
              .replace(/^\s+/, '')
              .replace(/\s+$/, ''));
}
function t_removeEl(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
}
function t_outerWidth(t) {
    var e = getComputedStyle(t),
        n = e.width,
        o = e.marginLeft,
        i = e.marginRight;
    return (
        'auto' === n && (n = 0),
        'auto' === o && (o = 0),
        'auto' === i && (i = 0),
        (n = parseInt(n) + parseInt(o) + parseInt(i))
    );
}
var version, version;
((window.isSearchBot = !1),
/Bot/i.test(navigator.userAgent) && (window.isSearchBot = !0),
(window.isMobile = !1),
(window.$isMobile = !1),
/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&
    ((window.isMobile = !0), (window.$isMobile = !0)),
(window.isTablet =
    /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(
        navigator.userAgent,
    )),
(window.isiOS = !1),
/iPhone|iPad|iPod/i.test(navigator.userAgent) && (window.isiOS = !0),
(window.isiOSChrome = !!navigator.userAgent.match('CriOS')),
(window.isFirefox = /firefox/i.test(navigator.userAgent)),
(window.isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0),
(window.isiOSVersion = ''),
window.isiOS) &&
    null !== (version = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)) &&
    (window.isiOSVersion = [parseInt(version[1], 10), parseInt(version[2], 10), parseInt(version[3] || 0, 10)]);
((window.isSafari = !1),
/^((?!chrome|android).)*safari/i.test(navigator.userAgent) && (window.isSafari = !0),
(window.isIE = !!document.documentMode),
(window.isSafariVersion = ''),
window.isSafari) &&
    null !== (version = navigator.appVersion.match(/Version\/(\d+)\.(\d+)\.?(\d+)? Safari/)) &&
    (window.isSafariVersion = [parseInt(version[1], 10), parseInt(version[2], 10), parseInt(version[3] || 0, 10)]);
function t_throttle(t, e, n) {
    var o, i;
    return (
        e || (e = 250),
        function () {
            var r = n || this,
                a = +new Date(),
                l = arguments;
            o && a < o + e
                ? (clearTimeout(i),
                  (i = setTimeout(function () {
                      (o = a), t.apply(r, l);
                  }, e)))
                : ((o = a), t.apply(r, l));
        }
    );
}
function t_onFuncLoad(t, e, n) {
    var o = 15e3,
        i = t_checkIsEditMode(),
        r = function t() {
            return !i || (i && t_checkEditorIsReady());
        },
        a = function t(e) {
            return 'function' == typeof window[e] || 'object' == typeof window[e];
        };
    if (a(t) && r()) e();
    else {
        var l = Date.now(),
            d = new Error(t + ' is undefined'),
            s = function t() {
                throw d;
            };
        setTimeout(function i() {
            var d = Date.now();
            a(t) && r()
                ? e()
                : ('complete' === document.readyState && d - l > o && !a(t) && s(), setTimeout(i, n || 100));
        });
    }
}
function t_checkIsEditMode() {
    var t = !1,
        e = document.getElementById('allrecords');
    if (!e) return !1;
    var n = e.getAttribute('data-tilda-mode');
    return !!(t = n && 'edit' === n);
}
function t_checkEditorIsReady() {
    var t = !1;
    if (!t_checkIsEditMode()) return !1;
    var e = document.body.getAttribute('data-ready-status');
    return !!(t = e && 'ready' === e);
}
function t_scrollBarWidthCompensator__setObject() {
    window.scrollBarWidthCompensator = {};
    var t = window.scrollBarWidthCompensator;
    (t.isInited = !1),
        (t.scrollBarWidth = Math.abs(window.innerWidth - document.documentElement.clientWidth)),
        (t.delay = 0),
        (t.cancelTimeout = null);
    var e = [
            't450',
            't282__container',
            't282__container__bg_opened',
            't282__menu__container',
            't830m',
            't830__panel',
            't451m',
            't204__menu',
            'tn-atom__sbs-anim-wrapper',
        ],
        n = document.querySelectorAll('*');
    (n = Array.prototype.filter.call(n, function (t) {
        return (
            !t.closest('.t1093') &&
            !e.some(function (e) {
                return t.classList.contains(e);
            })
        );
    })),
        (t.fixedElements = []),
        Array.prototype.forEach.call(n, function (e) {
            if (!e.classList.contains('t975')) {
                var n = window.getComputedStyle(e),
                    o = n.getPropertyValue('position'),
                    i = n.getPropertyValue('width'),
                    r = n.getPropertyValue('height'),
                    a =
                        '100%' === i ||
                        i === window.innerWidth + 'px' ||
                        i === window.innerWidth - t.scrollBarWidth + 'px' ||
                        '100vw' === i,
                    l =
                        '100%' === r ||
                        r === window.innerHeight + 'px' ||
                        r === window.innerHeight - t.scrollBarWidth + 'px' ||
                        'auto' === r ||
                        '100vh' === r;
                ('fixed' === o || ('absolute' === o && a && !l)) && t.fixedElements.push({ el: e, computedStyle: n });
            }
        });
}
function t_scrollBarWidthCompensator__init() {
    if (!window.isMobile) {
        window.scrollBarWidthCompensator || t_scrollBarWidthCompensator__setObject();
        var t = window.scrollBarWidthCompensator;
        if (
            ((t.scrollBarWidth = Math.abs(window.innerWidth - document.documentElement.clientWidth)),
            t.cancelTimeout && (window.clearTimeout(t.cancelTimeout), (t.cancelTimeout = null)),
            !t.isInited && t.scrollBarWidth)
        ) {
            t.isInited = !0;
            var e = window.getComputedStyle(document.body).getPropertyValue('padding-right');
            e = parseInt(e.replace('px', ''), 10);
            var n = document.body.style.paddingRight;
            n && document.body.setAttribute('data-tilda-initial-padding-right', n),
                (document.body.style.paddingRight = t.scrollBarWidth + e + 'px'),
                (document.body.style.height = '100vh'),
                (document.body.style.minHeight = '100vh'),
                (document.body.style.overflow = 'hidden');
            var o = [];
            Array.prototype.forEach.call(t.fixedElements, function (e) {
                var n = e.el;
                if (document.body.contains(n) && !n.classList.contains('t975') && !n.classList.contains('t975')) {
                    var i = e.computedStyle,
                        r = i.getPropertyValue('position');
                    if ('fixed' === r || 'absolute' === r) {
                        var a = i.getPropertyValue('transition-duration');
                        a.indexOf('ms') + 1
                            ? ((a = parseInt(a.replace('ms', ''), 10)), o.push(a))
                            : a.indexOf('s') + 1 && ((a = 1e3 * parseFloat(a.replace('s', ''))), o.push(a));
                        var l = i.getPropertyValue('right');
                        l = parseInt(l.replace('px', ''), 10);
                        var d = i.getPropertyValue('width'),
                            s = i.getPropertyValue('height'),
                            c = n.style.right;
                        c && n.setAttribute('data-tilda-initial-right', c);
                        var u = n.style.width;
                        u && n.setAttribute('data-tilda-initial-width', u);
                        var m =
                                '100%' === d ||
                                d === window.innerWidth + 'px' ||
                                d === window.innerWidth - t.scrollBarWidth + 'px' ||
                                '100vw' === d,
                            h =
                                '100%' === s ||
                                s === window.innerHeight + 'px' ||
                                s === window.innerHeight - t.scrollBarWidth + 'px' ||
                                'auto' === s ||
                                '100vh' === s;
                        (!l && 0 !== l) || 'auto' === n.style.right || 'absolute' === r || m
                            ? m && !h && (n.style.width = 'calc(100vw - ' + t.scrollBarWidth + 'px)')
                            : (n.style.right = t.scrollBarWidth + l + 'px');
                    }
                }
            }),
                o.length && (t.delay = Math.max.apply(null, o));
        }
    }
}
function t_scrollBarWidthCompensator__cancel() {
    var t = window.scrollBarWidthCompensator;
    t &&
        t.isInited &&
        ((t.isInited = !1),
        (t.delay = 0),
        document.body.hasAttribute('data-tilda-initial-padding-right')
            ? ((document.body.style.paddingRight = document.body.getAttribute('data-tilda-initial-padding-right')),
              document.body.removeAttribute('data-tilda-initial-padding-right'))
            : document.body.style.removeProperty('padding-right'),
        document.body.style.removeProperty('height'),
        document.body.style.removeProperty('min-height'),
        document.body.style.removeProperty('overflow'),
        Array.prototype.forEach.call(t.fixedElements, function (t) {
            var e = t.el,
                n =
                    e.classList.contains('tn-atom__sticky-wrapper') ||
                    e.classList.contains('tn-atom__sbs-anim-wrapper');
            e.hasAttribute('data-tilda-initial-right')
                ? ((e.style.right = e.getAttribute('data-tilda-initial-right')),
                  e.removeAttribute('data-tilda-initial-right'))
                : e.style.removeProperty('right'),
                e.hasAttribute('data-tilda-initial-width')
                    ? ((e.style.width = e.getAttribute('data-tilda-initial-width')),
                      e.removeAttribute('data-tilda-initial-width'))
                    : (e.style.removeProperty('width'), n && (e.style.width = 'inherit'));
        }));
}
function t_triggerEvent(t, e) {
    var n;
    document.createEvent
        ? (n = document.createEvent('HTMLEvents')).initEvent(e, !0, !1)
        : document.createEventObject && ((n = document.createEventObject()).eventType = e),
        (n.eventName = e),
        t.dispatchEvent
            ? t.dispatchEvent(n)
            : t.fireEvent
            ? t.fireEvent('on' + n.eventType, n)
            : t[e]
            ? t[e]()
            : t['on' + e] && t['on' + e]();
}
function t_loadJsFile(t, e, n) {
    void 0 === n && (n = 0);
    var o = 3,
        i = 1e3;
    if (document.querySelector('script[src^="' + t + '"]')) e && e();
    else {
        var r = document.createElement('script');
        (r.type = 'text/javascript'),
            (r.src = t),
            e &&
                r.addEventListener('load', function () {
                    e();
                }),
            r.addEventListener('error', function (o) {
                if (!(n <= 3)) {
                    var a = o.message || '<no error message>';
                    throw new Error('Failed to load ' + t + ' script: ' + a, { cause: o });
                }
                setTimeout(function () {
                    r.remove(),
                        t_loadJsFile(t, e, n + 1),
                        console.warn('Retrying to load ' + t + '. Retry: ' + (n + 1));
                }, n * i);
            }),
            document.head.appendChild(r);
    }
}
function t_loadCSSFile(t, e, n) {
    void 0 === n && (n = 0);
    var o = 3,
        i = 1e3;
    if (document.querySelector('link[href^="' + t + '"]')) e && e();
    else {
        var r = document.createElement('link');
        (r.rel = 'stylesheet'),
            (r.type = 'text/css'),
            (r.media = 'all'),
            (r.href = t),
            (r.crossOrigin = 'anonymous'),
            e && r.addEventListener('load', e),
            r.addEventListener('error', function (o) {
                if (!(n <= 3)) {
                    var a = o.message || '<no error message>';
                    throw new Error('Failed to load ' + t + ' style: ' + a, { cause: o });
                }
                setTimeout(function () {
                    r.remove(),
                        t_loadCSSFile(t, e, n + 1),
                        console.warn('Retrying to load ' + t + '. Retry: ' + (n + 1));
                }, n * i);
            }),
            document.head.appendChild(r);
    }
}
function t_scrollTo(t, e) {
    if (t) {
        var n = e || {},
            o = n.useNativeScrollTo,
            i = n.duration,
            r = n.behavior,
            a = void 0 === r ? 'instant' : r,
            l = n.offset,
            d = void 0 === l ? 0 : l,
            s = Math.max(parseInt(t.getBoundingClientRect().top + window.scrollY - d, 10), 0);
        o || 'instant' === a ? window.scrollTo({ left: 0, top: s, behavior: a }) : t_smoothScrollTo(s, i);
    }
}
function t_smoothScrollTo(t, e) {
    void 0 === e && (e = 500);
    var n = document.body,
        o = window.scrollY || window.pageYOffset,
        i = t - o,
        r = performance.now();
    function a(t) {
        return Math.pow(t, 2);
    }
    function l() {
        var d = performance.now(),
            s = Math.min((d - r) / e, 1),
            c = a(s);
        window.scrollTo(0, o + i * c),
            s < 1
                ? requestAnimationFrame(l)
                : (n.removeAttribute('data-scroll'), n.removeAttribute('data-scrollable'), window.scrollTo(0, t));
    }
    n.setAttribute('data-scroll', 'true'), n.setAttribute('data-scrollable', 'true'), requestAnimationFrame(l);
}
(window.browserLang = (window.navigator.userLanguage || window.navigator.language).toUpperCase().slice(0, 2)),
    (window.tildaBrowserLang = window.browserLang),
    t_onReady(function () {
        var t = document.getElementById('allrecords');
        if (t) var e = t.getAttribute('data-tilda-project-lang');
        e && (window.browserLang = e);
    }),
    t_onReady(function () {
        var t = window.navigator.userAgent,
            e = -1 !== t.indexOf('Instagram'),
            n = -1 !== t.indexOf('FBAV'),
            o = -1 !== t.indexOf('YaSearchBrowser'),
            i = -1 !== t.indexOf('SamsungBrowser'),
            r = -1 !== t.indexOf('DuckDuckGo'),
            a;
        if (-1 !== t.indexOf('Android') && (n || e || o || i || r)) {
            var l = document.createElement('p');
            (l.style.lineHeight = '100px'),
                (l.style.padding = '0'),
                (l.style.margin = '0'),
                (l.style.height = 'auto'),
                (l.style.position = 'absolute'),
                (l.style.opacity = '0.001'),
                (l.innerText = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                document.body.appendChild(l);
            var d = 100 / l.getBoundingClientRect().height;
            l.parentNode.removeChild(l),
                d < 0.98 &&
                    document.body.insertAdjacentHTML(
                        'beforeend',
                        '<style>.t396 [data-elem-type="text"] .tn-atom {zoom: ' + 100 * d + '%;}</style>',
                    );
        }
        window.isiOS &&
            !window.MSStream &&
            (document.body.style.setProperty('-webkit-text-size-adjust', '100%'),
            document.body.style.setProperty('text-size-adjust', '100%'));
    }),
    t_onReady(function () {
        function t() {
            var t = document.getElementById('allrecords'),
                e;
            return (t && t.getAttribute('data-tilda-root-zone')) || 'com';
        }
        setTimeout(function () {
            var e = document.querySelector('html'),
                n = document.querySelector('.t-tildalabel'),
                o = e.offsetHeight;
            if (
                (document.body &&
                    (o = Math.max(
                        document.body.scrollHeight,
                        document.body.offsetHeight,
                        document.body.clientHeight,
                        e.offsetHeight,
                    )),
                (document.getElementById('tildacopy') || n) && n.querySelectorAll('div'))
            )
                o + 70 > window.innerHeight &&
                    n &&
                    n.setAttribute(
                        'style',
                        'display: block !important; visibility: visible !important; position: relative !important; width: 100% !important; pointer-events: all !important; opacity: 1 !important; margin: 0 !important; z-index: 1 !important',
                    );
            else {
                for (var i = document.body.childNodes, r = [], a = 0; a < i.length; a++) {
                    var l = i[a];
                    8 === l.nodeType && r.push(l);
                }
                for (var a = 0; a < r.length; a++)
                    -1 !== r[a].nodeValue.indexOf("'t remove this l") &&
                        document
                            .getElementById('allrecords')
                            .insertAdjacentHTML(
                                'afterend',
                                '<div class="t-tildalabel t-tildalabel-free" style="display: block !important; visibility: visible !important; position: relative !important; width: 100% !important; pointer-events: all !important; opacity: 1 !important; margin: 0 !important; z-index: 99900 !important"><div class="t-tildalabel-free__main"><a href="https://tilda.cc" target="_blank" style="padding-bottom:12px; display: block;"><img style="width:40px;" src="https://static.tildacdn.' +
                                    t() +
                                    '/img/tildacopy.png"></a><div style="padding-bottom: 15px;">This site was made on <a href="https://tilda.cc" target="_blank" style="text-decoration: none; color:inherit;">Tilda — a website builder</a> that helps to&nbsp;create a&nbsp;website without any code</div><a href="https://tilda.cc/registration/" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 13px; border-radius: 50px; background-color: #fa8669; color: #fff; text-decoration: none;">Create a website</a></div><div class="t-tildalabel-free__links-wr"><a class="t-tildalabel-free__txt-link" href="https://help' +
                                    ('RU' === window.browserLang ? '-ru' : '') +
                                    '.tilda.cc/white-label" target="_blank">' +
                                    ('RU' === window.browserLang
                                        ? 'Как удалить этот лейбл'
                                        : 'How to remove this block') +
                                    '?</a></div></div>',
                            );
            }
        }, 500);
    }),
    t_onReady(function () {
        var t = document.getElementById('allrecords');
        if (
            !window.isMobile &&
            t &&
            'yes' !== t.getAttribute('data-blocks-animationoff') &&
            !1 === window.isSearchBot
        ) {
            for (var e = document.querySelectorAll('.r'), n = 0; n < e.length; n++) {
                var o,
                    i = (o = e[n]).getAttribute('style');
                i && -1 !== i.indexOf('background-color') && o.setAttribute('data-animationappear', 'off');
            }
            for (
                var r = Array.prototype.slice.call(e).filter(function (t) {
                        return (
                            !t.getAttribute('data-animationappear') &&
                            !t.getAttribute('data-screen-min') &&
                            !t.getAttribute('data-screen-max')
                        );
                    }),
                    n = 0;
                n < r.length;
                n++
            ) {
                var o,
                    a = (o = r[n]).getBoundingClientRect().top + window.pageYOffset,
                    l = window.pageYOffset + window.innerHeight + 300;
                t_addClass(o, a > 1e3 && a > l ? 'r_hidden' : 'r_showed'), t_addClass(o, 'r_anim');
            }
            if (r.length) {
                function d() {
                    for (var t = r.length - 1; t >= 0; t--) {
                        var e = r[t],
                            n,
                            o = 0;
                        e.getBoundingClientRect().top + window.pageYOffset <
                            (o =
                                e.offsetHeight <= 100
                                    ? window.pageYOffset + window.innerHeight
                                    : window.pageYOffset + window.innerHeight - 100) &&
                            (t_removeClass(e, 'r_hidden'),
                            t_addClass(e, 'r_showed'),
                            (r = Array.prototype.slice.call(r)).splice(t, 1));
                    }
                }
                var s = document.querySelectorAll('[data-record-type="400"]');
                if (s.length > 0)
                    var c = 0,
                        u = 0,
                        m = setInterval(function () {
                            300 === (u += 1) && clearInterval(m);
                            for (var t = 0; t < s.length; t++) {
                                var e;
                                'yes' === s[t].getAttribute('data-hiding-completed') && (c += 1);
                            }
                            c === s.length && (d(), clearInterval(m));
                        }, 100);
                window.addEventListener(
                    'scroll',
                    t_throttle(function () {
                        d();
                    }, 200),
                ),
                    setTimeout(function () {
                        d();
                    });
            }
        }
        var h = document.querySelector('html'),
            p = document.body;
        'none' === h.style.display && (h.style.display = 'block');
        var w = document.querySelector('.t-tildalabel'),
            f;
        (f = p ? Math.max(p.scrollHeight, p.offsetHeight, p.clientHeight, h.offsetHeight) : h.offsetHeight) + 70 <
        window.innerHeight
            ? w && (w.style.display = 'none')
            : w && w.setAttribute('style', 'display: block !important');
    }),
    (function () {
        function t() {
            (window.winWidth = window.innerWidth), (window.winHeight = window.innerHeight);
        }
        function e() {
            var t = window.isMobile ? document.documentElement.clientWidth : window.innerWidth,
                e = document.querySelectorAll('.r[data-screen-max], .r[data-screen-min]'),
                n,
                o,
                i;
            -1 !== navigator.userAgent.indexOf('Instagram') && (t = screen.width);
            for (var r = 0; r < e.length; r++) {
                var a = e[r],
                    l = a.id.replace('rec', '');
                if (
                    'yes' === a.getAttribute('data-connect-with-tab') ||
                    document.querySelector('[data-popup-rec-ids="' + l + '"]')
                )
                    return;
                (i = getComputedStyle(a).display),
                    (n = a.getAttribute('data-screen-max')) || (n = 1e4),
                    (o = a.getAttribute('data-screen-min')) || (o = 0),
                    (n = parseInt(n)),
                    (o = parseInt(o)) <= n &&
                        (t <= n && t > o
                            ? 'block' !== i && (a.style.display = 'block')
                            : 'none' !== i && (a.style.display = 'none'));
            }
        }
        t_onReady(function () {
            t(),
                e(),
                window.addEventListener(
                    'resize',
                    t_throttle(function () {
                        t();
                    }, 200),
                ),
                window.addEventListener(
                    'resize',
                    t_throttle(function () {
                        e();
                    }, 200),
                );
        });
    })(),
    (function () {
        var t = -1 !== navigator.userAgent.indexOf('Instagram');
        function e() {
            for (var t = document.querySelectorAll('.t-cover__carrier'), e = 0, n = 0; n < t.length; n++) {
                var o, i;
                if ((i = (o = t[n]).style).height.indexOf('vh') > -1) {
                    e = parseInt(i.height, 10) / 100;
                    var r = document.createElement('div');
                    (r.id = 'tempDiv'),
                        (r.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100vh;visibility:hidden;'),
                        document.body.appendChild(r);
                    var a = document.getElementById('tempDiv'),
                        l = parseInt(getComputedStyle(a).height.replace('px', ''));
                    t_removeEl(a);
                    var d = Math.round(l * e) + 'px',
                        s = o.closest('.t-cover');
                    if (s) {
                        var c = s.querySelector('.t-cover__filter'),
                            u = s.querySelector('.t-cover__wrapper');
                        (s.style.height = d), c && (c.style.height = d), u && (u.style.height = d);
                    }
                    i.height = d;
                }
            }
            var m = document.querySelectorAll('[data-height-correct-vh]'),
                h = window.innerHeight;
            e = 0;
            for (var n = 0; n < m.length; n++) {
                var o, i;
                (i = (o = m[n]).style).height.indexOf('vh') > -1 &&
                    ((e = parseInt(i.height) / 100), (d = h + 'px'), (i.height = d));
            }
        }
        function n() {
            var e = t ? screen.width : window.innerWidth;
            window.isMobile && !t && (e = document.documentElement.clientWidth);
            for (
                var n = document.querySelectorAll('.r:not([data-record-type="396"]):not([data-record-type="1003"])'),
                    o = [],
                    i = 0;
                i < n.length;
                i++
            ) {
                var r = n[i],
                    a = getComputedStyle(r);
                'none' !== a.display && 'hidden' !== a.visibility && '0' !== a.opacity && o.push(r);
            }
            for (var l = 0; l < o.length; l++)
                for (
                    var d = o[l],
                        s = d.querySelectorAll(
                            'div:not([data-auto-correct-mobile-width="false"]):not(.tn-elem):not(.tn-atom):not(.tn-atom__sbs-anim-wrapper):not(.tn-atom__prx-wrapper):not(.tn-atom__videoiframe):not(.tn-atom__sticky-wrapper):not(.t-store__relevants__container):not(.t-slds__items-wrapper):not(.js-product-controls-wrapper):not(.js-product-edition-option):not(.t-product__option-variants)',
                        ),
                        c = 0;
                    c < s.length;
                    c++
                ) {
                    var u = s[c];
                    d.style.wordBreak = '';
                    var m = t_outerWidth(u);
                    if (m > e) {
                        if (
                            'yes' === u.getAttribute('[data-customstyle]') &&
                            'false' === u.parentNode.getAttribute('[data-auto-correct-mobile-width]')
                        )
                            return;
                        console.log(
                            'Block not optimized for mobile width. Block width:' +
                                m +
                                ' Block id:' +
                                d.getAttribute('id'),
                        ),
                            console.log(u),
                            (d.style.overflow = 'auto'),
                            (d.style.wordBreak = m - 3 > e ? 'break-word' : '');
                    }
                }
        }
        function o(t) {
            for (
                var e = document.querySelectorAll(
                        '.t-text:not(.tn-elem):not(.tn-atom):not([data-auto-correct-line-height="false"]), .t-name:not(.tn-elem):not(.tn-atom):not([data-auto-correct-line-height="false"]), .t-title:not(.tn-elem):not(.tn-atom):not([data-auto-correct-line-height="false"]), .t-descr:not(.tn-elem):not(.tn-atom):not([data-auto-correct-line-height="false"]), .t-heading:not(.tn-elem):not(.tn-atom):not([data-auto-correct-line-height="false"]), .t-text-impact:not(.tn-elem):not(.tn-atom):not([data-auto-correct-line-height="false"]), .t-subtitle:not(.tn-elem):not(.tn-atom):not([data-auto-correct-line-height="false"]), .t-uptitle:not(.tn-elem):not(.tn-atom):not([data-auto-correct-line-height="false"])',
                    ),
                    n = 0;
                n < e.length;
                n++
            ) {
                var o = e[n],
                    i = o.getAttribute('style');
                if (i) {
                    var r = 'rem' === o.getAttribute('data-auto-correct-font-size'),
                        a;
                    if (document.documentElement.clientWidth > t)
                        (a = (a = i.replace('lineheight', 'line-height')).replace('fontsize', 'font-size')),
                            o.setAttribute('style', a);
                    else {
                        if (-1 === i.indexOf('font-size')) continue;
                        if (parseInt(getComputedStyle(o).fontSize.replace('px', '')) < 26) continue;
                        (a = i.replace('line-height', 'lineheight')),
                            (a = r
                                ? a.replace(/font-size.*px;/gi, 'font-size: 1.6rem;')
                                : a.replace('font-size', 'fontsize')),
                            o.setAttribute('style', a);
                    }
                }
            }
        }
        (window.isMobile || window.parent.isPagePreview) &&
            (t_onReady(function () {
                setTimeout(e, 400);
            }),
            window.addEventListener('load', function () {
                setTimeout(e, 400);
            }),
            window.innerWidth < 480 ||
            (window.isMobile && document.documentElement.clientWidth < 480) ||
            (t && screen.width < 480)
                ? (t_onReady(function () {
                      for (
                          var t = document.querySelectorAll('[data-customstyle="yes"]'),
                              e = document.querySelectorAll('[field] span, [field] strong, [field] em, [field] a'),
                              n = 0;
                          n < t.length;
                          n++
                      ) {
                          var i = t[n];
                          parseInt(getComputedStyle(i).fontSize.replace('px', '')) > 26 &&
                              ((i.style.fontSize = null), (i.style.lineHeight = null));
                      }
                      for (var n = 0; n < e.length; n++) {
                          var i = e[n];
                          parseInt(getComputedStyle(i).fontSize.replace('px', '')) > 26 && (i.style.fontSize = null);
                      }
                      o(480),
                          window.addEventListener('orientationchange', function () {
                              setTimeout(function () {
                                  o(480);
                              }, 500);
                          });
                  }),
                  window.addEventListener('load', n),
                  window.addEventListener('orientationchange', function () {
                      setTimeout(function () {
                          n();
                      }, 500);
                  }))
                : (window.innerWidth < 900 ||
                      (window.isMobile && document.documentElement.clientWidth < 900) ||
                      (t && screen.width < 900)) &&
                  t_onReady(function () {
                      for (
                          var t = document.querySelectorAll('[data-customstyle="yes"]'),
                              e = document.querySelectorAll('[field] span, [field] strong, [field] em, [field] a'),
                              n = 0;
                          n < t.length;
                          n++
                      ) {
                          var o = t[n];
                          parseInt(getComputedStyle(o).fontSize.replace('px', '')) > 30 &&
                              ((o.style.fontSize = null), (o.style.lineHeight = null));
                      }
                      for (var n = 0; n < e.length; n++) {
                          var o = e[n];
                          parseInt(getComputedStyle(o).fontSize.replace('px', '')) > 30 && (o.style.fontSize = null);
                      }
                      for (
                          var i = document.querySelectorAll(
                                  '.t-text:not(.tn-elem):not(.tn-atom):not([data-auto-correct-line-height="false"]), .t-name:not(.tn-elem):not(.tn-atom):not([data-auto-correct-line-height="false"]), .t-title:not(.tn-elem):not(.tn-atom):not([data-auto-correct-line-height="false"]), .t-descr:not(.tn-elem):not(.tn-atom):not([data-auto-correct-line-height="false"]), .t-heading:not(.tn-elem):not(.tn-atom):not([data-auto-correct-line-height="false"]), .t-text-impact:not(.tn-elem):not(.tn-atom):not([data-auto-correct-line-height="false"]), .t-subtitle:not(.tn-elem):not(.tn-atom):not([data-auto-correct-line-height="false"]), .t-uptitle:not(.tn-elem):not(.tn-atom):not([data-auto-correct-line-height="false"])',
                              ),
                              n = 0;
                          n < i.length;
                          n++
                      ) {
                          var o,
                              r = (o = i[n]).getAttribute('style');
                          if (
                              r &&
                              r.indexOf('font-size') > -1 &&
                              parseInt(getComputedStyle(o).fontSize.replace('px', '')) > 30
                          )
                              if ('rem' === o.getAttribute('data-auto-correct-font-size')) {
                                  var a = r
                                      .replace(/font-size.*px;/gi, 'font-size: 1.6rem;')
                                      .replace('line-height', 'lineheight');
                                  o.setAttribute('style', a);
                              } else {
                                  var a = r.replace('font-size', 'fontsize').replace('line-height', 'lineheight');
                                  o.setAttribute('style', a);
                              }
                      }
                  }));
    })(),
    t_onReady(function () {
        setTimeout(function () {
            for (var t = document.querySelectorAll('a[href^="http"][target="_blank"]'), e = 0; e < t.length; e++) {
                var n = t[e],
                    o = n.getAttribute('rel') || '';
                '' === o
                    ? n.setAttribute('rel', 'noopener')
                    : -1 === o.indexOf('noopener') && n.setAttribute('rel', o + ' noopener');
            }
        }, 2500);
    }),
    (function (t, e) {
        t.onerror = function (e, n, o, i, r) {
            'object' != typeof t.t_jserrors && (t.t_jserrors = []),
                t.t_jserrors.push({ message: e, filename: n, lineno: o, colno: i, error: r });
        };
    })(window, Math),
    t_onReady(function () {
        document.body.addEventListener('popupShowed', t_scrollBarWidthCompensator__init),
            document.body.addEventListener('popupHidden', function () {
                var t = window.scrollBarWidthCompensator;
                t &&
                    (t.cancelTimeout && (window.clearTimeout(t.cancelTimeout), (t.cancelTimeout = null)),
                    (t.cancelTimeout = window.setTimeout(function () {
                        (t.cancelTimeout = null), t_scrollBarWidthCompensator__cancel();
                    }, Math.min(300, t.delay))));
            });
    }),
    window.scrollBarWidthCompensator;
