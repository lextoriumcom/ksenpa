function t_lazyload__init() {
    t_lazyload__detectwebp();
    var e = document.querySelector('#allrecords');
    e && 'yes' === e.getAttribute('data-tilda-imgoptimoff')
        ? (window.lazy_imgoptimoff = 'yes')
        : (window.lazy_imgoptimoff = '');
    for (var t = document.querySelectorAll('.t156 .t-img'), i = 0; i < t.length; i++)
        t[i].setAttribute('data-lazy-rule', 'skip');
    var n = document.querySelectorAll(
        '.t492,.t552,.t251,.t603,.t660,.t661,.t662,.t680,.t827,.t909,.t218,.t740,.t132,.t694,.t762,.t786,.t546',
    );
    Array.prototype.forEach.call(n, function (e) {
        var t = e.querySelectorAll('.t-bgimg');
        Array.prototype.forEach.call(t, function (e) {
            e.setAttribute('data-lazy-rule', 'comm:resize,round:100');
        });
    }),
        setTimeout(function () {
            window.lazyload_cover = new window.LazyLoad({
                elements_selector: '.t-cover__carrier',
                show_while_loading: !1,
                data_src: 'content-cover-bg',
                placeholder: '',
                threshold: 700,
            });
        }, 100);
    var o = t_lazyload__detectZeroBlockInViewport(),
        a;
    setTimeout(
        function () {
            var e;
            if (
                ((window.lazyload_img = new window.LazyLoad({ elements_selector: '.t-img', threshold: 800 })),
                (window.lazyload_bgimg = new window.LazyLoad({
                    elements_selector: '.t-bgimg',
                    show_while_loading: !1,
                    placeholder: '',
                    threshold: 800,
                })),
                (window.lazyload_iframe = new window.LazyLoad({ elements_selector: '.t-iframe' })),
                window.jQuery &&
                    (e = jQuery)(document).bind('slide.bs.carousel', function () {
                        setTimeout(t_lazyload_update, 500);
                    }),
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&
                    document.body &&
                    'object' == typeof document.body &&
                    document.body.classList)
            ) {
                if (document.querySelector('.t-mbfix')) return;
                var t = document.createElement('div');
                t.classList.add('t-mbfix'),
                    document.body.appendChild(t),
                    setTimeout(function () {
                        t.classList.add('t-mbfix_hide');
                    }, 50),
                    setTimeout(function () {
                        t && t.parentNode && t.parentNode.removeChild(t);
                    }, 1e3);
            }
        },
        o ? 200 : 500,
    ),
        window.addEventListener('resize', function () {
            clearTimeout(window.t_lazyload_resize_timerid),
                (window.t_lazyload_resize_timerid = setTimeout(t_lazyload__onWindowResize, 1e3));
        }),
        setTimeout(function () {
            'object' == typeof performance &&
                'object' == typeof performance.timing &&
                (window.t_lazyload_domloaded =
                    1 * window.performance.timing.domContentLoadedEventEnd -
                    1 * window.performance.timing.navigationStart);
        }, 0);
}
function t_lazyload_update() {
    'undefined' != typeof lazyload_cover && window.lazyload_cover.update(),
        'undefined' != typeof lazyload_img && window.lazyload_img.update(),
        'undefined' != typeof lazyload_bgimg && window.lazyload_bgimg.update(),
        'undefined' != typeof lazyload_iframe && window.lazyload_iframe.update();
}
function t_lazyload__onWindowResize() {
    if ((t_lazyload_update(), 'yes' !== window.lazy_imgoptimoff)) {
        var e = document.querySelectorAll('.t-cover__carrier, .t-bgimg, .t-img, .tn-atom__img');
        Array.prototype.forEach.call(e, function (e) {
            window.t_lazyload_updateResize_elem(e);
        });
    }
}
function t_lazyload__detectwebp() {
    var e = new Image(),
        t = function t() {
            2 != e.height || (window.lazy_webp = 'y');
        };
    (e.onload = t),
        (e.onerror = t),
        (e.src =
            'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA');
}
function t_lazyLoad__appendImgStatToArr(e, t) {
    if (void 0 !== navigator.sendBeacon) {
        var i = new Date().getTime(),
            n = e.getAttribute('src');
        if (n) {
            var o = { time: i - t };
            0 === n.indexOf('https://' + t_lazyload__getThumbDomainName()) && (o.th = 'y'),
                0 === n.indexOf('https://static.tildacdn') && (o.st = 'y'),
                (o.th || o.st) && window.t_loadImgStats.push(o);
        }
    }
}
function t_lazyload__ping(e) {
    var t = 'https://' + e + '.tildacdn.com';
    if ('static' == e) {
        var i = document.currentScript;
        if ('object' == typeof i && 'string' == typeof i.src && 0 === i.src.indexOf(t)) return;
        if (null === document.head.querySelector('script[src^="' + t + '"]')) return;
    }
    var n = new Image();
    (n.src = t + '/pixel.png'),
        (n.onload = function () {
            window['lazy_ok_' + e] = 'y';
        }),
        setTimeout(function () {
            if ('y' !== window['lazy_ok_' + e]) {
                (window['lazy_err_' + e] = 'y'), console.error(e + ' ping error');
                var i = document.querySelectorAll('.loading');
                Array.prototype.forEach.call(i, function (e) {
                    var i;
                    (i = e.lazy_loading_src),
                        'string' == typeof str &&
                            0 === i.indexOf(t) &&
                            (e.classList.remove('loading'), (e.wasProcessed = !1));
                }),
                    t_lazyload_update();
            }
        }, 1e4);
}
function t_lazyload__getThumbDomainName() {
    return 'optim.tildacdn';
}
function t_lazyload__getRootZone() {
    var e = document.getElementById('allrecords'),
        t;
    return (e && e.getAttribute('data-tilda-root-zone')) || 'com';
}
function t_lazyload__getBackgroundStyles(e) {
    var t = getComputedStyle(e),
        i = 'IMG' === e.tagName,
        n = i ? t.objectPosition : t.backgroundPosition,
        o = i ? t.objectFit : t.backgroundSize,
        a = t.backgroundAttachment;
    if (n) {
        var r = n.split(' '),
            l = r[0],
            d = r[1],
            s = { '0%': 'left', '50%': 'center', '100%': 'right' },
            c = { '0%': 'top', '50%': 'center', '100%': 'bottom' };
        return s[l] && (l = s[l]), c[d] && (d = c[d]), { positionX: l, positionY: d, size: o, attachment: a };
    }
    return { positionX: '', positionY: '', size: o, attachment: a };
}
function t_lazyload__detectZeroBlockInViewport() {
    var e = document.querySelectorAll('.t396'),
        t;
    return Array.from(e).some(function (e) {
        var t = e.getBoundingClientRect();
        return (
            t.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            t.bottom >= 0 &&
            t.left <= (window.innerWidth || document.documentElement.clientWidth) &&
            t.right >= 0
        );
    });
}
function t_lazyload__getResizeCommand(e, t) {
    return e
        ? 'contain' === t
            ? 'contain'
            : 'cover' === t
            ? 'cover'
            : 'resize'
        : 'contain' === t
        ? 'contain'
        : 'cover';
}
(window.lazy = 'y'),
    (window.t_loadImgStats = []),
    (function (e, t) {
        'function' == typeof define && define.amd
            ? define([], t)
            : 'object' == typeof exports
            ? (module.exports = t())
            : (e.LazyLoad = t());
    })(window, function () {
        var e,
            t,
            i = !1,
            n,
            o,
            a = !1,
            r = /\/static\.tildacdn\.(info|.{1,3})\//,
            l = {},
            d = 'undefined' != typeof getComputedStyle;
        function s() {
            i ||
                ((e = {
                    elements_selector: 'img',
                    container: window,
                    threshold: 300,
                    throttle: 50,
                    data_src: 'original',
                    data_srcset: 'original-set',
                    class_loading: 'loading',
                    class_loaded: 'loaded',
                    skip_invisible: !0,
                    show_while_loading: !0,
                    callback_load: null,
                    callback_error: null,
                    callback_set: null,
                    callback_processed: null,
                    placeholder: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
                }),
                document.body && 'object' == typeof document.body && (t = !!document.body.classList),
                (a = 'IntersectionObserver' in window),
                (i = !0),
                (n = [
                    '200x151',
                    '640x712',
                    '320x356',
                    '670x744',
                    '335x372',
                    '300x225',
                    '500x375',
                    '400x301',
                    '748x832',
                    '374x416',
                    '670x502',
                    '335x251',
                    '360x234',
                    '560x622',
                    '280x311',
                    '640x416',
                ]),
                (o = [
                    '353x245',
                    '155x151',
                    '158x164',
                    '372x495',
                    '280x272',
                    '117x117',
                    '291x280',
                    '280x269',
                    '335x241',
                    '283x283',
                    '150x156',
                    '353x233',
                    '414x730',
                    '372x362',
                    '275x206',
                    '290x322',
                    '248x207',
                    '177x136',
                    '173x173',
                    '280x308',
                    '195x214',
                    '248x191',
                    '155x196',
                    '163x203',
                    '320x444',
                    '158x162',
                    '176x203',
                    '412x700',
                    '360x88',
                    '360x616',
                    '167x167',
                    '130x144',
                    '280x233',
                    '560x314',
                    '320x299',
                    '372x275',
                    '320x178',
                    '372x242',
                    '360x352',
                    '353x294',
                    '260x182',
                    '372x310',
                    '335x344',
                    '374x432',
                    '414x500',
                    '374x360',
                    '220x338',
                    '150x146',
                    '335x239',
                    '176x176',
                    '320x302',
                    '374x260',
                    '360x568',
                    '191x221',
                    '192x192',
                    '372x558',
                    '335x188',
                    '320x358',
                    '335x258',
                    '374x575',
                    '26x26',
                    '353x360',
                    '360x206',
                    '335x248',
                    '335x322',
                    '167x256',
                    '560x364',
                    '155x172',
                    '163x216',
                    '163x181',
                    '360x257',
                    '374x561',
                    '374x243',
                    '220x212',
                    '177x148',
                    '291x324',
                    '167x160',
                    '375x749',
                    '335x387',
                    '172x172',
                    '260x302',
                    '414x700',
                    '220x254',
                    '177x172',
                    '374x519',
                    '176x169',
                    '320x352',
                    '335x233',
                    '150x203',
                    '360x207',
                    '158x121',
                    '360x396',
                    '158x131',
                    '150x98',
                    '220x169',
                    '182x202',
                    '320x179',
                    '372x413',
                    '181x226',
                    '353x200',
                    '158x153',
                    '375x628',
                    '176x271',
                    '374x364',
                    '320x492',
                    '374x247',
                    '414x833',
                    '353x393',
                    '335x218',
                    '560x399',
                    '412x264',
                    '293x164',
                    '56x56',
                    '177x204',
                    '248x382',
                    '181x181',
                    '118x118',
                    '260x346',
                    '374x497',
                    '260x202',
                    '393x251',
                    '158x158',
                    '372x200',
                    '373x414',
                    '320x229',
                    '177x177',
                    '312x175',
                    '374x312',
                    '84x84',
                    '320x329',
                    '177x194',
                    '353x350',
                    '335x503',
                    '335x446',
                    '335x326',
                    '374x200',
                    '158x182',
                    '320x237',
                    '335x221',
                    '176x196',
                    '150x229',
                    '320x224',
                    '248x276',
                    '360x299',
                    '260x289',
                    '196x216',
                    '335x279',
                    '177x272',
                    '320x426',
                    '260x172',
                    '155x194',
                    '320x369',
                    '372x350',
                    '360x302',
                    '360x402',
                    '169x186',
                    '158x242',
                    '173x199',
                    '167x185',
                    '360x238',
                    '220x123',
                    '320x308',
                    '414x265',
                    '374x350',
                    '300x333',
                    '177x170',
                    '320x222',
                    '320x311',
                    '260x169',
                    '150x173',
                    '320x246',
                    '353x265',
                    '192x222',
                    '158x151',
                    '372x414',
                    '150x144',
                    '760x502',
                    '314x176',
                    '320x208',
                    '182x182',
                    '320x211',
                    '163x163',
                    '372x279',
                    '360x202',
                    '360x252',
                    '260x252',
                    '260x286',
                    '353x392',
                    '160x104',
                    '374x281',
                    '353x353',
                    '150x231',
                    '320x267',
                    '372x372',
                    '177x197',
                    '275x154',
                    '158x175',
                    '374x374',
                    '150x167',
                    '260x146',
                ]),
                (l = {
                    com: 'com',
                    info: 'pub',
                    pub: 'pub',
                    ink: 'ink',
                    pro: 'pro',
                    biz: 'biz',
                    net: 'net',
                    one: 'one',
                }));
        }
        function c() {
            var e;
            return new Date().getTime();
        }
        function u(e, t) {
            var i = {},
                n;
            for (n in e) Object.prototype.hasOwnProperty.call(e, n) && (i[n] = e[n]);
            for (n in t) Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
            return i;
        }
        function _(e) {
            var t;
            try {
                t = Array.prototype.slice.call(e);
            } catch (a) {
                var i = [],
                    n,
                    o = e.length;
                for (n = 0; n < o; n++) i.push(e[n]);
                t = i;
            }
            return (
                t.forEach(function (e) {
                    e.isSkipByPosition =
                        null === e.offsetParent &&
                        !1 === p(g(e, 't396__carrier-wrapper')) &&
                        'fixed' !== e.getAttribute('data-content-cover-parallax');
                    var t = g(e, 't-rec');
                    p(t) &&
                        (e.isNotUnderScreenRange =
                            !1 === t.hasAttribute('data-screen-max') && !1 === t.hasAttribute('data-screen-min'));
                }),
                t
            );
        }
        function x(e, i) {
            t ? e.classList.add(i) : (e.className += (e.className ? ' ' : '') + i);
        }
        function f(e, i) {
            t
                ? e.classList.remove(i)
                : (e.className = e.className
                      .replace(new RegExp('(^|\\s+)' + i + '(\\s+|$)'), ' ')
                      .replace(/^\s+/, '')
                      .replace(/\s+$/, ''));
        }
        function m(e, i) {
            return t ? e.classList.contains(i) : new RegExp(' ' + i + ' ').test(' ' + e.className + ' ');
        }
        function g(e, t) {
            for (var i = e.parentNode; i && i !== document; ) {
                if (!0 === m(i, t)) return i;
                i = i.parentNode;
            }
            return null;
        }
        function p(e) {
            return null != e;
        }
        function y(e) {
            var t = e.getBoundingClientRect();
            return { top: t.top + document.body.scrollTop, left: t.left + document.body.scrollLeft };
        }
        function w(e) {
            return r.test(e);
        }
        function h(e) {
            return e.replace(r, function (e, t) {
                return '/' + t_lazyload__getThumbDomainName() + '.' + (l[t] || 'com') + '/';
            });
        }
        function b(e, t, i, a) {
            var l = t.getAttribute('data-' + a);
            if (l) {
                var s = t.clientWidth,
                    c = t.clientHeight,
                    u;
                if ((m(t, 't-slds__bgimg') || m(t, 't-slds__img')) && !m(t, 't827__image')) {
                    var _ = g(t, 't-slds__wrapper');
                    _ || (_ = g(t, 't-slds__container')),
                        !1 === p(_) && (_ = g(t, 't-slds__thumbsbullet')),
                        p(_) && ((s = _.clientWidth), (c = _.clientHeight));
                }
                if ((m(t, 'tn-atom') && m(t, 't-bgimg')) || m(t, 'tn-atom__img')) {
                    var x = g(t, 'tn-atom__scale-wrapper');
                    if (p(x)) {
                        var y = x.getBoundingClientRect(),
                            h = z('round', y.width, y.height, 10);
                        (s = h[0]), (c = h[1]);
                    }
                }
                var b = '',
                    k = '',
                    I = '',
                    L,
                    S = 1,
                    E = !0,
                    N = !1;
                if (
                    ('yes' == window.lazy_imgoptimoff && (E = !1),
                    ('y' !== window.lazy_err_thumb && 'y' !== window.lazy_err_static) || (E = !1),
                    'IMG' !== t.tagName || d)
                )
                    if (d) {
                        var M = t_lazyload__getBackgroundStyles(t),
                            R = M.positionX,
                            C = M.positionY,
                            T = M.size,
                            B = M.attachment,
                            j = 'IMG' === t.tagName;
                        (I = t_lazyload__getResizeCommand(j, T)), (b = R), (k = C), 'fixed' === B && j && (N = !0);
                    } else N = !0;
                else I = 'resize';
                if ((L = t.getAttribute('data-lazy-rule'))) {
                    var P = L.split(','),
                        q;
                    for (q = 0; q < P.length; q++)
                        P[q].indexOf('round:') > -1 && (S = 1 * P[q].split(':')[1]),
                            P[q].indexOf('comm:') > -1 &&
                                'resize' != (I = P[q].split(':')[1]) &&
                                'cover' != I &&
                                'contain' != I &&
                                (E = !1),
                            P[q].indexOf('skip') > -1 && (N = !0),
                            P[q].indexOf('optimoff') > -1 && (E = !1);
                }
                if (S > 1) {
                    var D = z(I, s, c, S);
                    (s = D[0]), (c = D[1]);
                }
                if ('cover' == I && s > 0 && c > 0 && s <= 1e3)
                    if (s === 5 * Math.ceil(s / 5) && c === 5 * Math.ceil(c / 5));
                    else if (n.indexOf(s + 'x' + c) > -1);
                    else if (o.indexOf(s + 'x' + c) > -1);
                    else if (m(t, 'tn-atom') || m(t, 'tn-atom__img'));
                    else {
                        m(t, 't-cover__carrier') || (I = 'resize');
                        var G = z(I, s, c, 100);
                        (s = G[0]), (c = G[1]);
                    }
                if (
                    ('resize' == I && s < 30 && (N = !0),
                    !0 === E &&
                        (l =
                            !0 === N || s > 1e3 || c > 1e3 || 0 == s || ('IMG' != t.tagName && 0 == c)
                                ? O(l)
                                : A(t.tagName, I, l, s, c, b, k)),
                    'y' === window.lazy_err_static && w(l) && (l = l.replace(r, '/static3.tildacdn.com/')),
                    l)
                ) {
                    if ('IMG' === e.tagName) e.setAttribute('src', l);
                    else if ('IFRAME' === e.tagName) e.setAttribute('src', l);
                    else if ('OBJECT' === e.tagName) e.setAttribute('data', l);
                    else {
                        var W, H;
                        if (-1 !== e.style.backgroundImage.indexOf('-gradient('))
                            W = e.style.backgroundImage.split('), ')[1];
                        W
                            ? (e.style.backgroundImage = 'url(' + l + '), ' + W)
                            : ((e.style.backgroundImage = 'url(' + l + ')'), v(e, l));
                    }
                    t.lazy_loading_src = l;
                }
            } else f(t, 'loading');
        }
        function v(e, t) {
            var i = e.getAttribute('data-content-cover-id');
            if (i) {
                var n = t.split('.');
                n = n[n.length - 1];
                var o = document.getElementById('recorddiv' + i);
                'svg' === n && (o.style.backgroundImage = '');
            }
        }
        function z(e, t, i, n) {
            var o = t,
                a = i;
            if ('cover' == e && o > 0 && a > 0) {
                var r = o / a,
                    l = 1;
                r <= 1
                    ? (r <= 0.8 && (l = 0.8),
                      r <= 0.751 && (l = 0.75),
                      r <= 0.667 && (l = 0.667),
                      r <= 0.563 && (l = 0.562),
                      r <= 0.501 && (l = 0.5),
                      (a = Math.ceil(a / n) * n),
                      (o = Math.ceil(a * l)),
                      (o = 10 * Math.ceil(o / 10)))
                    : (r >= 1.25 && (l = 1.25),
                      r >= 1.332 && (l = 1.333),
                      r >= 1.5 && (l = 1.5),
                      r >= 1.777 && (l = 1.777),
                      r >= 2 && (l = 2),
                      (o = Math.ceil(o / n) * n),
                      (a = Math.ceil(o / l)),
                      (a = 10 * Math.ceil(a / 10)));
            } else o > 0 && (o = Math.ceil(o / n) * n), a > 0 && (a = Math.ceil(a / n) * n);
            return [o, a];
        }
        function A(e, t, i, n, o, a, r) {
            if ('undefined' == i || null == i) return i;
            var l = null == i ? void 0 : i.toLowerCase();
            if (
                l.indexOf('.svg') > 0 ||
                l.indexOf('.gif') > 0 ||
                l.indexOf('.ico') > 0 ||
                -1 === i.indexOf('static.tildacdn.') ||
                i.indexOf('-/empty/') > 0 ||
                i.indexOf('-/resizeb/') > 0
            )
                return i;
            if (i.indexOf('/-/') > -1) return i;
            if (0 == n && 0 == o) return i;
            if ('y' == window.lazy_err_thumb) return i;
            if (i.indexOf('lib') > -1) return i;
            if ('IMG' !== e && 'DIV' !== e && 'TD' !== e && 'A' !== e) return i;
            var d = 1;
            1 === window.devicePixelRatio && Math.max(n, o) <= 400 && (d = 1.2), window.devicePixelRatio > 1 && (d = 2);
            var s = n,
                c = o,
                u,
                _;
            if ((s > 0 && (s = parseInt(d * s)), c > 0 && (c = parseInt(d * c)), s > 1e3 || c > 1800)) return O(i);
            if ('resize' == t)
                (_ = i.split('/')).splice(
                    i.split('/').length - 1,
                    0,
                    '-/resize/' +
                        s +
                        'x' +
                        ('DIV' == e && c > 0 ? c : '') +
                        '/' +
                        ('y' == window.lazy_webp ? '-/format/webp' : ''),
                ),
                    (u = h(_.join('/')));
            else {
                if (s <= 0 && c <= 0) return i;
                var x = a,
                    f = r;
                'left' !== a && 'right' !== a && (x = 'center'),
                    'top' !== r && 'bottom' !== r && (f = 'center'),
                    (_ = i.split('/')).splice(
                        i.split('/').length - 1,
                        0,
                        '-/' +
                            t +
                            '/' +
                            s +
                            'x' +
                            c +
                            '/' +
                            x +
                            '/' +
                            f +
                            '/' +
                            ('y' == window.lazy_webp ? '-/format/webp' : ''),
                    ),
                    (u = h(_.join('/')));
            }
            var m = '.webp',
                g = -1 !== u.indexOf(m, u.length - 5);
            return 'y' != window.lazy_webp || g || (u += '.webp'), u;
        }
        function O(e) {
            if ('undefined' == e || null == e) return e;
            var t = null == e ? void 0 : e.toLowerCase();
            if (
                t.indexOf('.svg') > 0 ||
                t.indexOf('.gif') > 0 ||
                t.indexOf('.ico') > 0 ||
                -1 === e.indexOf('static.tildacdn.') ||
                e.indexOf('-/empty/') > 0 ||
                e.indexOf('-/resizeb/') > 0
            )
                return e;
            if (e.indexOf('/-/') > -1) return e;
            if (e.indexOf('lib') > -1) return e;
            if ('y' !== window.lazy_webp) return e;
            if ('y' === window.lazy_err_thumb) return e;
            var i = e.split('/');
            i.splice(e.split('/').length - 1, 0, '-/format/webp');
            var n = h(i.join('/')),
                o = '.webp',
                a;
            return -1 !== n.indexOf(o, n.length - 5) || (n += '.webp'), n;
        }
        function k(e, t, i) {
            if ('string' == typeof t && null != t && '' != t) {
                var n;
                if ((console.error('lazy loading err'), w(t)))
                    return (window.lazy_err_static = 'y'), void I(e, t.replace(r, '/static3.tildacdn.com/'));
                if (-1 !== t.indexOf(t_lazyload__getThumbDomainName()) && -1 !== t.indexOf('/-/')) {
                    window.lazy_err_thumb = 'y';
                    var o = t.split('/'),
                        a = '',
                        l = '',
                        d;
                    if (o.length > 3)
                        for (var s = 0; s < o.length; s++)
                            '' !== o[s] &&
                                ('til' == o[s].substring(0, 3) &&
                                    36 == o[s].length &&
                                    4 == (o[s].match(/-/g) || []).length &&
                                    (a = o[s]),
                                s == o.length - 1 && (l = o[s]));
                    if ('' !== a && '' !== l) I(e, 'https://static3.tildacdn.com/' + a + '/' + l);
                    if ('function' != typeof t_errors__sendCDNErrors) {
                        var u = document.createElement('script');
                        (u.src =
                            'https://static.tildacdn.' + t_lazyload__getRootZone() + '/js/tilda-errors-1.0.min.js'),
                            (u.type = 'text/javascript'),
                            (u.async = !0),
                            document.body.appendChild(u);
                    }
                    var _ = i > 1 ? c() - i : '';
                    'object' != typeof window.t_cdnerrors && (window.t_cdnerrors = []),
                        window.t_cdnerrors.push({ url: t, time: _, debug: { domloaded: window.t_lazyload_domloaded } });
                }
            }
        }
        function I(e, t) {
            console.info('try reload: ' + t),
                'IMG' === e.tagName ? t && e.setAttribute('src', t) : t && (e.style.backgroundImage = 'url(' + t + ')');
        }
        function L(t) {
            s(),
                (this._settings = u(e, t)),
                (this._queryOriginNode = this._settings.container === window ? document : this._settings.container),
                (this._previousLoopTime = 0),
                (this._loopTimeout = null),
                a && this._initializeObserver(),
                this.update(),
                this.loadAnimatedImages();
        }
        return (
            (window.t_lazyload_setSources = b),
            (L.prototype._showOnLoad = function (e) {
                var t,
                    i = this._settings,
                    n;
                function o() {
                    null !== i &&
                        (t_lazyLoad__appendImgStatToArr(t, n),
                        i.callback_load && i.callback_load(e),
                        b(e, e, i.data_srcset, i.data_src),
                        i.callback_set && i.callback_set(e),
                        f(e, i.class_loading),
                        x(e, i.class_loaded),
                        t.removeEventListener('load', o));
                }
                !e.getAttribute('src') && i.placeholder && e.setAttribute('src', i.placeholder),
                    (t = document.createElement('img')).addEventListener('load', o),
                    t.addEventListener('error', function (t) {
                        f(e, i.class_loading),
                            i.callback_error && i.callback_error(e),
                            void 0 !== t.path
                                ? k(e, t.path[0].currentSrc, n)
                                : void 0 !== t.target && k(e, t.target.currentSrc, n);
                    }),
                    x(e, i.class_loading),
                    (n = c()),
                    b(t, e, i.data_srcset, i.data_src);
            }),
            (L.prototype._showOnAppear = function (e) {
                var t = this._settings,
                    i;
                function n() {
                    null !== t &&
                        (t_lazyLoad__appendImgStatToArr(e, i),
                        t.callback_load && t.callback_load(e),
                        f(e, t.class_loading),
                        x(e, t.class_loaded),
                        e.removeEventListener('load', n));
                }
                ('IMG' !== e.tagName && 'IFRAME' !== e.tagName) ||
                    (e.addEventListener('load', n),
                    e.addEventListener('error', function (o) {
                        e.removeEventListener('load', n),
                            f(e, t.class_loading),
                            t.callback_error && t.callback_error(e),
                            void 0 !== o.path
                                ? k(e, o.path[0].currentSrc, i)
                                : void 0 !== o.target && k(e, o.target.currentSrc, i);
                    }),
                    x(e, t.class_loading)),
                    (i = c()),
                    b(e, e, t.data_srcset, t.data_src),
                    t.callback_set && t.callback_set(e);
            }),
            (L.prototype._show = function (e) {
                this._settings.show_while_loading ? this._showOnAppear(e) : this._showOnLoad(e);
            }),
            (L.prototype._initializeObserver = function () {
                var e = this;
                this._intersectionObserver = new IntersectionObserver(
                    function (t) {
                        var i = window.scrollY;
                        t.forEach(function (t) {
                            var n = t.target;
                            if (!(e._settings.skip_invisible && n.isSkipByPosition && n.isNotUnderScreenRange)) {
                                var o = t.boundingClientRect.top + i < 0,
                                    a = n.closest('.t396__elem'),
                                    r = a && 0 === a.style.top.indexOf('-'),
                                    l = n.closest('.tn-group'),
                                    d = l && 0 === l.style.top.indexOf('-');
                                if (n.wasProcessed)
                                    return (
                                        e._intersectionObserver.unobserve(n),
                                        void (
                                            e._settings.callback_processed &&
                                            e._settings.callback_processed(e._elements.length)
                                        )
                                    );
                                (t.isIntersecting || o || r || d) && (e._show(n), (n.wasProcessed = !0));
                            }
                        });
                    },
                    { rootMargin: this._settings.threshold + 'px', threshold: [0] },
                );
            }),
            (L.prototype.loadAnimatedImages = function () {
                var e,
                    t,
                    i = this._settings,
                    n = this._elements,
                    o = n ? n.length : 0;
                function a(e, t) {
                    var i;
                    if ('trigger' === t) {
                        var n = e.getAttribute('data-animate-sbs-trgels');
                        n && (i = document.querySelector('[data-elem-id="' + n + '"]'));
                    } else 'viewport' === t && (i = g(e, 't396'));
                    return p(i) ? y(i) : null;
                }
                function r(e, t) {
                    var n = a(e, t);
                    if (!n) return !1;
                    var o = y(e),
                        r = Math.abs(n.top - o.top),
                        l = Math.abs(n.left - o.left);
                    return r > i.threshold || l > i.threshold;
                }
                for (e = 0; e < o; e++)
                    if (m((t = n[e]), 'tn-atom__img') || m(t, 'tn-atom')) {
                        var l = g(t, 'tn-elem'),
                            d = l.getAttribute('data-animate-sbs-opts'),
                            s = l.getAttribute('data-animate-sbs-event'),
                            c,
                            u;
                        ('intoview' !== s && 'blockintoview' !== s) || (u = 'viewport'),
                            l.getAttribute('data-animate-sbs-trgels') || (u = 'trigger'),
                            (i.skip_invisible && null === t.offsetParent) ||
                                !d ||
                                (r(l, u) &&
                                    (i.show_while_loading ? this._showOnAppear(t) : this._showOnLoad(t),
                                    (t.wasProcessed = !0),
                                    i.callback_processed && i.callback_processed(n.length)));
                    }
            }),
            (L.prototype.update = function () {
                var e = this;
                if (
                    ((this._elements = _(this._queryOriginNode.querySelectorAll(this._settings.elements_selector))),
                    a && this._intersectionObserver)
                )
                    return (
                        this._intersectionObserver.disconnect(),
                        void this._elements.forEach(function (t) {
                            e._intersectionObserver.observe(t);
                        })
                    );
                this._elements.forEach(function (t) {
                    e._show(t),
                        e._settings.callback_processed && e._settings.callback_processed(e._elements.length),
                        (t.wasProcessed = !0);
                });
            }),
            (L.prototype.destroy = function () {
                this._intersectionObserver.disconnect(),
                    (this._elements = null),
                    (this._queryOriginNode = null),
                    (this._settings = null);
            }),
            L
        );
    }),
    'loading' != document.readyState
        ? t_lazyload__init()
        : document.addEventListener('DOMContentLoaded', t_lazyload__init),
    (window.t_lazyload_updateResize_elem = function (e) {
        var t,
            i = e;
        if (window.jQuery && i instanceof jQuery) {
            if (0 == i.length) return;
            i = i.get(0);
        }
        if (null != i) {
            var n = i.tagName,
                o,
                a,
                r = '';
            if ('undefined' != typeof getComputedStyle) {
                var l = 'IMG' === n,
                    d,
                    s = t_lazyload__getBackgroundStyles(i).size;
                (r = l
                    ? i.getAttribute('src')
                    : i.style.backgroundImage.replace('url(', '').replace(')', '').replace(/"/gi, '')),
                    (a = '-/' + t_lazyload__getResizeCommand(l, s) + '/');
            } else a = '-/cover/';
            var c = null == (t = r) ? void 0 : t.toLowerCase();
            if (
                !(
                    null == r ||
                    -1 === r.indexOf(a) ||
                    c.indexOf('.svg') > 0 ||
                    c.indexOf('.gif') > 0 ||
                    c.indexOf('.ico') > 0 ||
                    -1 === r.indexOf(t_lazyload__getThumbDomainName()) ||
                    (r.indexOf('-/empty/') > 0 && r.indexOf('-/resizeb/') > 0)
                )
            ) {
                var u = r.indexOf(a) + a.length,
                    _ = r.indexOf('/', u);
                if (u > 0 && _ > 0) {
                    var x = r.slice(u, _).split('x'),
                        f = i.clientWidth,
                        m = i.clientHeight;
                    if (
                        f > 0 &&
                        m > 0 &&
                        (x[0] > 0 || x[1] > 0) &&
                        ((x[0] > 0 && f > x[0]) || (x[1] > 0 && m > x[1])) &&
                        ((x[0] > 0 && f - x[0] > 100) || (x[1] > 0 && m - x[1] > 100))
                    ) {
                        var g = r.slice(0, u) + (x[0] > 0 ? f : '') + 'x' + (x[1] > 0 ? m : '') + r.substring(_);
                        'IMG' == n ? i.setAttribute('src', g) : (i.style.backgroundImage = "url('" + g + "')");
                    }
                }
            }
        }
    });
