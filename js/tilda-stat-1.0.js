!(function () {
    var e = document.getElementById('allrecords');
    function t() {
        var e = Math.floor(899999 * Math.random()) + 1e5;
        return new Date().getTime() + '.' + e;
    }
    function n(e) {
        var t = e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1'),
            n = new RegExp('(?:^|; )' + t + '=([^;]*)'),
            o = document.cookie.match(n);
        if (o) return decodeURIComponent(o[1]);
    }
    function o(e, t, n) {
        var o = n.expires;
        if (!o) return !1;
        if ('number' == typeof o) {
            var i = new Date().getTime() + 1e3 * o;
            (o = new Date(i)).toUTCString && (n.expires = o.toUTCString());
        }
        var a = e + '=' + (t = encodeURIComponent(t));
        for (var r in n) (a += '; ' + r), !0 !== n[r] && (a += '=' + n[r]);
        document.cookie = a;
    }
    function i(e, t) {
        for (var n in t) e[n] = t[n];
        return e;
    }
    function a(e) {
        var t = !0;
        if (!e) throw new Error('no callback given');
        function n() {
            t || e((t = !0));
        }
        function o() {
            t && e((t = !1));
        }
        'hidden' in document &&
            document.addEventListener('visibilitychange', function () {
                (document.hidden ? o : n)();
            }),
            'mozHidden' in document &&
                document.addEventListener('mozvisibilitychange', function () {
                    (document.mozHidden ? o : n)();
                }),
            'webkitHidden' in document &&
                document.addEventListener('webkitvisibilitychange', function () {
                    (document.webkitHidden ? o : n)();
                }),
            'msHidden' in document &&
                document.addEventListener('msvisibilitychange', function () {
                    (document.msHidden ? o : n)();
                }),
            'onfocusin' in document && ((document.onfocusin = n), (document.onfocusout = o)),
            (window.onpageshow = window.onfocus = n),
            (window.onpagehide = window.onblur = o);
    }
    function r() {
        var e = window.pageYOffset,
            t = window.innerHeight,
            n = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight,
                document.body.clientHeight,
                document.documentElement.clientHeight,
            ),
            o = 0,
            i = 0;
        v = !0;
        var a = document.getElementById('t-header'),
            r = document.getElementById('t-footer'),
            d = document.getElementById('tildacopy');
        a && (o = a.offsetHeight), r && (i = r.offsetHeight), d && (i += d.offsetHeight);
        var c = Math.floor((100 * (e - o + t)) / (n - o - i));
        if (!(c < 10))
            for (var s = [10, 25, 50, 75, 90], l = 0; l < s.length; l++) {
                var u = s[l],
                    g = s.length - 1;
                if (0 === l && c >= u && !w['p' + u])
                    (m.page = '/tilda/scroll/' + u + '/'), window.tildastat('pageview'), (w['p' + u] = !0);
                else if (c >= u - 1) {
                    if (0 === w['p' + u]) {
                        (m.page = '/tilda/scroll/' + u + '/'),
                            window.tildastat('pageview'),
                            (w['p' + u] = setTimeout(function () {
                                clearTimeout(w['p' + u]), (w['p' + u] = -1);
                            }, 5e3));
                        break;
                    }
                    if (((l !== g && c < s[l + 1]) || l === g) && -1 === w['p' + u]) {
                        w['p' + u] = 0;
                        break;
                    }
                }
            }
    }
    function d() {
        var e =
            0 === window.location.hostname.indexOf('www.')
                ? window.location.hostname.slice(4)
                : window.location.hostname;
        return e.lastIndexOf('.') === e.length - 1 && (e = e.slice(0, -1)), e + window.location.pathname;
    }
    function c(e) {
        for (var t = Array(e.length), n = 0; n < e.length; n++) t[n] = n;
        return Array.prototype.map
            .call(t, function (t) {
                return e.charCodeAt(t).toString(16);
            })
            .join('');
    }
    function s() {
        var e =
            (navigator.cookieEnabled ? 'cT' : 'cF') +
            '|' +
            (navigator.deviceMemory ? 'dm' + navigator.deviceMemory : 'dm') +
            '|' +
            (navigator.hardwareConcurrency ? 'hc' + navigator.hardwareConcurrency : 'hc') +
            '|' +
            (navigator.languages ? 'l' + navigator.languages.join(',') : 'l') +
            '|';
        if (
            (navigator.platform || navigator.appName
                ? (e +=
                      (navigator.platform ? 'p' + navigator.platform : 'p') +
                      '|' +
                      (navigator.vendor ? 'v' + navigator.vendor : 'v') +
                      '|' +
                      (navigator.appCodeName ? 'a' + navigator.appCodeName : 'a') +
                      '|' +
                      (navigator.appName ? 'n' + navigator.appName : 'n') +
                      '|')
                : (e += (navigator.userAgent ? 'ua' + navigator.userAgent : 'ua') + '|'),
            navigator.plugins)
        ) {
            var t,
                n,
                o = '';
            for (n = navigator.plugins.length > 20 ? 20 : navigator.plugins.length, t = 0; t < n; t++)
                navigator.plugins[t] && navigator.plugins[t].filename
                    ? (o += navigator.plugins[t].filename)
                    : navigator.plugins[t] && navigator.plugins[t].name && (o += navigator.plugins[t].name);
            e += 'pl' + o + '|';
        }
        return (
            (e += 'pr' + window.devicePixelRatio + '|'),
            (e +=
                'w' +
                (screen && screen.width ? screen.width : window.innerWidth) +
                'h' +
                (screen && screen.height ? screen.height : window.innerHeight) +
                '|'),
            (e += 'cD' + (screen.colorDepth ? screen.colorDepth : '') + '|'),
            (e += 'tO' + new Date().getTimezoneOffset() + '|'),
            (e = c(
                (e +=
                    'mT' +
                    (void 0 !== navigator.maxTouchPoints
                        ? navigator.maxTouchPoints
                        : void 0 !== navigator.msMaxTouchPoints
                        ? navigator.msMaxTouchPoints
                        : '') +
                    '|'),
            ))
        );
    }
    function l() {
        (x = n('tildauid')),
            (E = n('tildasid')),
            h ? (x || (x = 'simple'), E || (E = 'simple')) : (x || (x = t()), E || (E = t()));
    }
    function u() {
        var e;
        h || (o('tildauid', x, { expires: 7776e3, path: '/' }), o('tildasid', E, { expires: 1800, path: '/' }));
    }
    function g(t) {
        if (m.user_agent > '' && -1 != m.user_agent.indexOf('bot')) return !1;
        if ('http:' != window.location.protocol && 'https:' != window.location.protocol)
            return console.log('TildaStat: cannot work on local page'), !1;
        var n;
        l(),
            u(),
            (m.page = d()),
            (m.referrer = document.referrer || ''),
            (m.userid = x),
            (m.sessionid = E),
            (m.user_agent = window.navigator.userAgent),
            (m.user_language = window.navigator.userLanguage || window.navigator.language),
            e &&
                ((m.projectid = e.getAttribute('data-tilda-project-id') || '0'),
                (m.pageid = e.getAttribute('data-tilda-page-id') || '0'),
                (m.pagealias = e.getAttribute('data-tilda-page-alias') || ''),
                (m.formskey = e.getAttribute('data-tilda-formskey') || '')),
            (m.params = {});
        try {
            n = decodeURIComponent(window.location.search);
        } catch (c) {
            n = window.location.search;
        }
        if (n > '?' && ((m.pagequery = n.substring(1).toLowerCase()), ~m.pagequery.indexOf('utm_'))) {
            var o,
                i = m.pagequery.split('&');
            Array.prototype.forEach.call(i, function (e) {
                (o = e.split('=')).length > 1
                    ? 'utm_referrer' !== o[0] || (m.referrer && !~m.referrer.indexOf('ohio8.v'))
                        ? (m.params[o[0]] = o[1])
                        : (m.referrer = o[1])
                    : (m.params[o[0]] = '');
            });
        }
        var r = !1;
        if (
            (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (r = !0),
            (m.ismobile = r),
            document.getElementById('tildastatscript') &&
                (m.tildastatcode = document.getElementById('tildastatscript').key),
            k)
        )
            try {
                a(function (e) {
                    v = !!e;
                }),
                    document.body.addEventListener(
                        'mousewheel',
                        t_throttle(function () {
                            v = !0;
                        }, 1e3),
                    ),
                    document.body.addEventListener(
                        'mousemove',
                        t_throttle(function () {
                            v = !0;
                        }, 1e3),
                    ),
                    document.body.addEventListener(
                        'keypress',
                        t_throttle(function () {
                            v = !0;
                        }, 1e3),
                    ),
                    document.body.addEventListener(
                        'click',
                        t_throttle(function () {
                            v = !0;
                        }, 1e3),
                    );
            } catch (c) {}
        (m.fingerprint = s()), (T = !0);
    }
    function p(e) {
        var t = 'https://stat.tildaapi.' + L() + '/event/',
            i;
        h || ((n('tildasid') || '') != m.sessionid && o('tildasid', m.sessionid, { expires: 1800, path: '/' }));
        '' === m.referrer && (m.referrer = n('previousUrl') || ''),
            (m.tildautm = n('TILDAUTM') || ''),
            m.page ||
                (console.log('TildaStat: page empty'),
                (m.page = d()),
                window.location.hash && 0 === window.location.hash.indexOf('#!') && (m.page += window.location.hash)),
            '/' === m.page.substring(0, 1) && (m.page = window.location.hostname + m.page);
        var a = f(m),
            r = new XMLHttpRequest();
        r.open('POST', t, !0),
            (r.withCredentials = !1),
            r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'),
            (r.onerror = function (e) {
                console.error('TildaStat: fail pageview '), console.error(e);
            }),
            (r.timeout = 3e3),
            r.send(a),
            m.page &&
                -1 === m.page.indexOf('tilda/scroll') &&
                -1 === m.page.indexOf('tilda/readtime') &&
                -1 === m.page.indexOf('tilda/click') &&
                -1 === m.page.indexOf('tilda/cookieenabled') &&
                ((m.referrer = m.page), h || o('previousUrl', m.page, { path: '/', expires: 1800 })),
            (m.page = ''),
            (window.tildastatload = !0);
    }
    function f(e) {
        var t = '';
        for (var n in e)
            if (('' != t && 'object' != typeof e[n] && (t += '&'), 'object' == typeof e[n])) {
                if (Object.keys(e[n]).length)
                    for (var o in e[n]) t += '&' + n + '[' + o + ']=' + encodeURIComponent(e[n][o]);
            } else t += n + '=' + encodeURIComponent(e[n]);
        return t;
    }
    window.tildastat = function (e, t) {
        if (!e) return !1;
        if ('create' !== e && !T)
            return (
                setTimeout(function () {
                    window.tildastat(e, t);
                }, 1e3),
                !1
            );
        switch ((t && i(m, t), e)) {
            case 'create':
                g(t);
                break;
            case 'pageview':
                p(t);
                break;
            case 'readtime':
                k &&
                    (v && ((m.page = '/tilda/readtime/'), (v = !1), p(t)),
                    setTimeout(function () {
                        window.tildastat('readtime');
                    }, 15e3));
                break;
            case 'scroll':
                k &&
                    'function' == typeof t_throttle &&
                    window.addEventListener(
                        'scroll',
                        t_throttle(function () {
                            r();
                        }, 1e3),
                    );
                break;
            case 'cookieenabled':
                (h = !1), l(), u(), (m.userid = x), (m.sessionid = E), (m.page = '/tilda/cookieenabled/'), p(t);
                break;
            case 'fingerprint':
                return s();
        }
    };
    var m = {},
        w = { p10: 0, p25: 0, p50: 0, p75: 0, p90: 0 },
        v = !0,
        h = 'no' === window.tildastatcookie,
        y;
    if (
        (window.tildastatcookie || (e && (h = 'no' === e.getAttribute('data-tilda-cookie'))),
        'yes' === window.tildastatcookiegdpr && !1 === h) &&
        ((h = !0), !0 === n('t_cookiesConsentGiven'))
    ) {
        var b = n('t_cookiesCategories');
        'string' == typeof b && b.indexOf('analytics') > -1 && (h = !1);
    }
    var k = 'yes' === window.tildastatscroll;
    void 0 === window.tildastatscroll && e && (k = 'yes' === e.getAttribute('data-tilda-stat-scroll'));
    var x = '',
        E = '',
        T = !1;
    window.tildastat('create'),
        setTimeout(function () {
            window.tildastat('pageview'), window.tildastat('readtime'), window.tildastat('scroll');
        }, 500);
    var j = setInterval(function () {
            if (
                (('object' == typeof window.t_jserrors && window.t_jserrors.length > 0) ||
                    ('object' == typeof window.t_cdnerrors && window.t_cdnerrors.length > 0) ||
                    ('object' == typeof window.t_ajaxerrors && window.t_ajaxerrors.length > 0)) &&
                'function' != typeof t_errors__sendJSErrors
            ) {
                var e = document.createElement('script');
                (e.src = 'https://static.tildacdn.' + L() + '/js/tilda-errors-1.0.min.js'),
                    (e.async = !0),
                    document.body.appendChild(e),
                    clearInterval(j);
            }
        }, 2e3),
        O = document.querySelector("link[rel*='shortcut icon']"),
        _ = document.querySelectorAll("link[href*='tilda.ws/project']").length;
    _ || (_ = document.querySelectorAll("link[href*='ws.tildacdn.com/project']").length);
    var A = O ? O.getAttribute('href') : '',
        H = document.querySelector("script[src*='js/tilda-scripts']"),
        C = !!H && -1 === H.src.indexOf('tildacdn'),
        I;
    (C ||
        (C =
            O &&
            -1 !== A.indexOf('static.tildacdn.' + L()) &&
            -1 !== A.indexOf('tilda.') &&
            -1 !== A.indexOf('/tildafavicon.ico') &&
            !document.querySelector('table#allrecords') &&
            !(-1 !== window.location.hostname.indexOf('.tilda.ws')) &&
            !_),
    void 0 === navigator.sendBeacon || /Bot/i.test(navigator.userAgent) || C) ||
        (1 === Math.floor(5 * Math.random()) &&
            S(function () {
                var e = document.createElement('script');
                (e.async = !0),
                    (e.type = 'text/javascript'),
                    (e.src = 'https://static.tildacdn.' + L() + '/js/tilda-performance-1.0.min.js'),
                    document.body.insertAdjacentElement('beforeend', e);
            }));
    function S(e) {
        'complete' === document.readyState ? e() : window.addEventListener('load', e);
    }
    function L() {
        var e = document.getElementById('allrecords'),
            t;
        return (e && e.getAttribute('data-tilda-root-zone')) || 'com';
    }
})();
