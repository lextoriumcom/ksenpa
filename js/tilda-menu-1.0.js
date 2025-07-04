function t_menu__highlightActiveLinks(e) {
    var t = window.location.href,
        n,
        r = window.location.pathname;
    '/' === t[t.length - 1] && (n = t.slice(0, -1)),
        '/' === r[r.length - 1] && (r = r.slice(0, -1)),
        '/' === r[0] && (r = r.slice(1)),
        '' === r && (r = '/');
    var i = document.querySelectorAll(e);
    Array.prototype.forEach.call(i, function (e) {
        var i = e.getAttribute('href');
        if (i) {
            var o = e.href,
                a = '/' === i[0] ? i.slice(1) : i,
                l;
            -1 !== r.indexOf('tpost') && (l = '/' + r.slice(0, r.indexOf('tpost'))),
                (o !== t && o !== r && i !== t && i !== r && a !== r && n !== t && n !== r && i !== l) ||
                    e.classList.add('t-active');
        }
    });
}
function t_menu__findAnchorLinks(e, t) {
    var n = document.getElementById('rec' + e);
    if (n && t_menu__isBlockVisible(n)) {
        var r = t + '[href*="#"]:not(.tooltipstered)',
            i = n ? n.querySelectorAll(r) : [];
        i.length && t_menu__updateActiveLinks(i, t);
    }
}
function t_menu__updateActiveLinks(e, t) {
    var n = t.slice(2);
    (n = '.t' + (n = parseInt(n, 10))), (e = Array.prototype.slice.call(e));
    var r = null,
        i = [],
        o = {};
    (e = e.reverse()).forEach(function (e) {
        var t = t_menu__getSectionByHref(e);
        t && t.id && (i.push(t), (o[t.id] = e));
    }),
        t_menu__updateSectionsOffsets(i),
        i.sort(function (e, t) {
            var n = parseInt(e.getAttribute('data-offset-top'), 10) || 0,
                r;
            return (parseInt(t.getAttribute('data-offset-top'), 10) || 0) - n;
        }),
        window.addEventListener(
            'resize',
            t_throttle(function () {
                t_menu__updateSectionsOffsets(i);
            }, 200),
        );
    var a = document.querySelectorAll(n);
    Array.prototype.forEach.call(a, function (e) {
        e.addEventListener('displayChanged', function () {
            t_menu__updateSectionsOffsets(i);
        });
    }),
        t_menu__highlightNavLinks(e, i, o, r),
        e.forEach(function (t, n) {
            t.addEventListener('click', function () {
                var i = t_menu__getSectionByHref(t);
                !t.classList.contains('tooltipstered') &&
                    i &&
                    i.id &&
                    (e.forEach(function (e, t) {
                        t === n ? e.classList.add('t-active') : e.classList.remove('t-active');
                    }),
                    (r = i.id));
            });
        }),
        window.addEventListener(
            'scroll',
            t_throttle(function () {
                r = t_menu__highlightNavLinks(e, i, o, r);
            }, 100),
        ),
        'ResizeObserver' in window &&
            setTimeout(function () {
                var e;
                new ResizeObserver(function () {
                    t_menu__updateSectionsOffsets(i);
                }).observe(document.body);
            }, 500);
}
function t_menu__updateSectionsOffsets(e) {
    e.forEach(function (e) {
        var t = e.getBoundingClientRect().top + window.pageYOffset;
        e.getAttribute('data-offset-top') !== t.toString() && e.setAttribute('data-offset-top', t);
    });
}
function t_menu__getSectionByHref(e) {
    if (e) {
        var t = e.getAttribute('href'),
            n = t ? t.replace(/\s+/g, '') : '';
        if ((0 === n.indexOf('/') && (n = n.slice(1)), t && e.matches('[href*="#rec"]')))
            return (n = n.replace(/.*#/, '')), document.getElementById(n);
        var r = t ? t.trim() : '',
            i = -1 !== r.indexOf('#') && r.indexOf('#');
        ('number' == typeof i || 'number' == typeof (i = -1 !== r.indexOf('/') && r.indexOf('/'))) &&
            (r = r.slice(i + 1));
        var o = 'a[name="' + r + '"]',
            a = document.querySelector(o);
        if (!a) return null;
        var l = a.closest('.r[data-record-type="215"]');
        if (l) return l;
        var s = document.querySelector(o + '+ .r');
        return s ? ((a.id = s ? s.id + '_' + r : ''), a) : null;
    }
}
function t_menu__highlightNavLinks(e, t, n, r) {
    if (document.documentElement.classList.contains('t-body_scroll-locked')) return null;
    var i = window.pageYOffset,
        o = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight,
        ),
        a = r,
        l = t.length ? t[t.length - 1] : null,
        s = (l && parseInt(l.getAttribute('data-offset-top'), 10)) || 0;
    if (t.length && null === r && s > i + 300)
        return (
            e.forEach(function (e) {
                e.classList.remove('t-active');
            }),
            null
        );
    for (var u = 0; u < t.length; u++) {
        var c = parseInt(t[u].getAttribute('data-offset-top'), 10),
            d = t[u].id ? n[t[u].id] : null;
        if (i + 300 >= c || (0 === u && i >= o - window.innerHeight)) {
            null === r && d && !d.classList.contains('t-active')
                ? (e.forEach(function (e) {
                      e.classList.remove('t-active');
                  }),
                  d && d.classList.add('t-active'),
                  (a = null))
                : null !== r && t[u].id && r === t[u].id && (a = null);
            break;
        }
    }
    return a;
}
function t_menu__setBGcolor(e, t) {
    var n = document.querySelectorAll(t);
    Array.prototype.forEach.call(n, function (e) {
        window.innerWidth > 980
            ? 'yes' === e.getAttribute('data-bgcolor-setbyscript') &&
              (e.style.backgroundColor = e.getAttribute('data-bgcolor-rgba'))
            : ((e.style.backgroundColor = e.getAttribute('data-bgcolor-hex')),
              e.setAttribute('data-bgcolor-setbyscript', 'yes'),
              e.style.transform && (e.style.transform = ''),
              e.style.opacity && (e.style.opacity = ''));
    });
}
function t_menu__showFixedMenu(e, t) {
    var n,
        r = ['.t280', '.t282', '.t450', '.t451', '.t466', '.t453'].some(function (e) {
            return e === t;
        });
    if (!(window.innerWidth <= 980) || r) {
        var i = document.getElementById('rec' + e);
        if (!i) return !1;
        var o = i.querySelectorAll(t);
        Array.prototype.forEach.call(o, function (e) {
            var t = e.getAttribute('data-appearoffset');
            if (t) {
                -1 !== t.indexOf('vh') && (t = Math.floor(window.innerHeight * (parseInt(t) / 100))),
                    (t = parseInt(t, 10));
                var n = e.clientHeight;
                'number' == typeof t && window.pageYOffset >= t
                    ? e.style.transform === 'translateY(-' + n + 'px)' && t_menu__slideElement(e, n, 'toBottom')
                    : 'translateY(0px)' === e.style.transform
                    ? t_menu__slideElement(e, n, 'toTop')
                    : ((e.style.transform = 'translateY(-' + n + 'px)'), (e.style.opacity = '0'));
            }
        });
    }
}
function t_menu__changeBgOpacity(e, t) {
    var n,
        r = ['t280', 't282', 't451', 't466'].some(function (e) {
            return -1 !== t.indexOf(e);
        });
    if (!(window.innerWidth <= 980) || r) {
        var i = document.getElementById('rec' + e);
        if (!i) return !1;
        var o = i.querySelectorAll(t);
        Array.prototype.forEach.call(o, function (e) {
            var t = e.getAttribute('data-bgcolor-rgba'),
                n = e.getAttribute('data-bgcolor-rgba-afterscroll'),
                r = e.getAttribute('data-bgopacity'),
                i = e.getAttribute('data-bgopacity-two'),
                o = parseInt(e.getAttribute('data-menushadow'), 10) || 0;
            o /= 100;
            var a = e.getAttribute('data-menushadow-css');
            (e.style.backgroundColor = window.pageYOffset > 20 ? n : t),
                (window.pageYOffset > 20 && '0' === i) ||
                (window.pageYOffset <= 20 && ('0.0' === r || '0' === r)) ||
                (!o && !a)
                    ? (e.style.boxShadow = 'none')
                    : a
                    ? (e.style.boxShadow = a)
                    : o && (e.style.boxShadow = '0px 1px 3px rgba(0,0,0,' + o + ')');
        });
    }
}
function t_menu__createMobileMenu(e, t) {
    var n = document.getElementById('rec' + e);
    if (n) {
        var r = n.querySelector(t),
            i = r ? r.getAttribute('data-mobile-burgerhook') : '',
            o = n.querySelector(t + '__mobile'),
            a = o || n.querySelector('.tmenu-mobile'),
            l = o ? t.slice(1) + '_opened' : 'tmenu-mobile_opened',
            s = 't-menuburger-opened';
        if (a)
            if (r && r.classList.contains(t.slice(1) + '__mobile_burgerhook') && i) {
                if (a.querySelector('.tmenu-mobile__burger')) var u = a.querySelector('.tmenu-mobile__burger');
                else if (a.querySelector('.t-menuburger')) var u = a.querySelector('.t-menuburger');
                if (u) {
                    var c = u.parentElement,
                        d = document.createElement('a');
                    (d.href = i), c && (d.appendChild(u), c.appendChild(d));
                }
            } else {
                var u = a.querySelector('.t-menuburger');
                a.addEventListener('click', function (n) {
                    if (!n.target.closest('a')) {
                        if (a.classList.contains(l))
                            t_menu__FadeOut(r, 300),
                                a.classList.remove(l),
                                u.classList.remove(s),
                                u.setAttribute('aria-expanded', 'false');
                        else if (
                            (t_menu__fadeIn(r, 300, function () {
                                r.style.transform && (r.style.transform = ''),
                                    r.style.opacity && (r.style.opacity = '');
                            }),
                            a.classList.add(l),
                            u.classList.add(s),
                            u.setAttribute('aria-expanded', 'true'),
                            r.classList.contains('tmenu-mobile__menucontent_fixed'))
                        ) {
                            var i = getComputedStyle(a).height;
                            r.style.top = i;
                        }
                        t_menu_checkOverflow(e, t);
                    }
                });
            }
        screen.width < 980 &&
            n.addEventListener('click', function (n) {
                if (r && r.classList.contains('tmenu-mobile__menucontent_fixed')) {
                    var i = n.target.closest(
                            '.t-menu__link-item, .t978__submenu-link, .t978__innermenu-link, .t966__menu-link, .t-menusub__link-item, .t-btn, .t794__link',
                        ),
                        o,
                        c;
                    if (i)
                        [
                            't978__menu-link_hook',
                            't978__tm-link',
                            't966__tm-link',
                            't794__tm-link',
                            't-menusub__target-link',
                        ].some(function (e) {
                            return i.classList.contains(e);
                        })
                            ? r.addEventListener('menuOverflow', function () {
                                  t_menu_checkOverflow(e, t);
                              })
                            : (t_menu__FadeOut(r, 300), a && a.classList.remove(l), a && u.classList.remove(s));
                }
            }),
            window.addEventListener(
                'resize',
                t_throttle(function () {
                    window.innerWidth > 980 &&
                        (r && (r.style.opacity = ''),
                        r && (r.style.display = ''),
                        r && (r.style.top = ''),
                        a && a.classList.remove(l)),
                        t_menu_checkOverflow(e, t);
                }, 200),
            );
    }
}
function t_menu_checkOverflow(e, t) {
    var n = document.getElementById('rec' + e),
        r = n ? n.querySelector(t) : null;
    if (r) {
        var i = n.querySelector(t + '__mobile'),
            o = i || n.querySelector('.tmenu-mobile');
        if (o) {
            var a = o.offsetHeight,
                l = document.documentElement.clientHeight,
                s = r.style.position || window.getComputedStyle(r).position,
                u = r.offsetHeight;
            'fixed' === s &&
                u > l - a &&
                ((r.style.overflow = 'auto'), (r.style.maxHeight = 'calc(100% - ' + a + 'px)'));
        }
    }
}
function t_menu__FadeOut(e, t, n) {
    if (!e) return !1;
    var r = 1;
    t = parseInt(t, 10);
    var i,
        o = setInterval(
            function () {
                (e.style.opacity = r),
                    (r -= 0.1) <= 0.1 &&
                        ((e.style.opacity = '0'),
                        (e.style.display = 'none'),
                        'function' == typeof n && n(),
                        clearInterval(o));
            },
            t > 0 ? t / 10 : 40,
        );
}
function t_menu__fadeIn(e, t, n) {
    if (!e) return !1;
    if (
        ('1' === getComputedStyle(e).opacity || '' === getComputedStyle(e).opacity) &&
        'none' !== getComputedStyle(e).display
    )
        return !1;
    var r = 0,
        i = (t = parseInt(t, 10)) > 0 ? t / 10 : 40;
    (e.style.opacity = r), (e.style.display = 'block');
    var o = setInterval(function () {
        (e.style.opacity = r),
            (r += 0.1) >= 1 && ((e.style.opacity = '1'), 'function' == typeof n && n(), clearInterval(o));
    }, i);
}
function t_menu__slideElement(e, t, n) {
    var r = 'toTop' === n ? 0 : t,
        i = 'toTop' === n ? 1 : 0,
        o = setInterval(function () {
            (e.style.transform = 'translateY(-' + r + 'px)'),
                (e.style.opacity = i.toString()),
                (i = 'toTop' === n ? i - 0.1 : i + 0.1),
                (r = 'toTop' === n ? r + t / 20 : r - t / 20),
                'toTop' === n &&
                    r >= t &&
                    ((e.style.transform = 'translateY(-' + t + 'px)'), (e.style.opacity = '0'), clearInterval(o)),
                'toBottom' === n &&
                    r <= 0 &&
                    ((e.style.transform = 'translateY(0px)'), (e.style.opacity = '1'), clearInterval(o));
        }, 10);
}
function t_menu__interactFromKeyboard(e) {
    var t = document.getElementById('rec' + e);
    if (t) {
        var n = t.querySelectorAll('.t-menu__list > li > a'),
            r = t.querySelectorAll('.t-menu__list > li li'),
            i = 9,
            o = 13,
            a = 27,
            l = 32,
            s = 0,
            u,
            c = function e(t) {
                t === n.length ? (t = 0) : t < 0 && (t = n.length - 1), n[t].focus(), (s = t);
            },
            d = function e(t, n) {
                var r = t.querySelectorAll('a');
                n == r.length ? (n = 0) : n < 0 && (n = r.length - 1), r[n].focus(), (u = n);
            },
            f = function e(t) {
                t.addEventListener('keydown', function (e) {
                    var t = this.parentNode.querySelector('.t-menusub__list');
                    switch (e.keyCode) {
                        case i:
                            if (!e.shiftKey && s <= n.length - 2) c(s + 1);
                            else {
                                if (!(e.shiftKey && s > 0)) return;
                                c(s - 1);
                            }
                            break;
                        case o:
                        case l:
                            if (!t) return;
                            this.click(), (u = 0), d(t, 0);
                    }
                    e.preventDefault();
                });
            },
            m = function e(t) {
                t.addEventListener('focus', function () {
                    u = 0;
                });
            },
            _ = function e(t) {
                var n = t.parentNode.querySelector('.t-menusub__menu');
                t.addEventListener('click', function (e) {
                    if ('false' == this.getAttribute('aria-expanded') || null == this.getAttribute('aria-expanded')) {
                        this.setAttribute('aria-expanded', 'true');
                        var r = t.nextElementSibling,
                            i = r ? r.getAttribute('data-submenu-margin') : 0;
                        t_menusub__showSubmenu(t, n, i);
                    } else this.setAttribute('aria-expanded', 'false');
                    return e.preventDefault(), !1;
                });
            },
            y = function e(t) {
                var r = t.closest('.t-menusub__menu'),
                    f = !1;
                t.addEventListener('keydown', function (e) {
                    var t = this.parentNode;
                    switch (e.keyCode) {
                        case i:
                            f = !0;
                            var m = t.querySelectorAll('.t-menusub__link-item').length;
                            if (e.shiftKey) 0 === u ? (c(s), t_menusub__hideSubmenu(r)) : d(t, u - 1);
                            else if (u === m - 1) {
                                if ((t_menusub__hideSubmenu(r), s === n.length - 1)) return;
                                c(s + 1);
                            } else d(t, u + 1);
                            break;
                        case o:
                        case l:
                            (f = !1), t_menusub__hideSubmenu(r);
                            break;
                        case a:
                            (f = !0), c(s), t_menusub__hideSubmenu(r);
                    }
                    f && (e.preventDefault(), e.stopPropagation());
                });
            };
        Array.prototype.forEach.call(n, function (e) {
            var t;
            m(e),
                f(e),
                !e.parentNode.querySelector('.t-menusub__menu') || window.isMobile || 'ontouchend' in document || _(e);
        }),
            Array.prototype.forEach.call(r, function (e) {
                y(e);
            });
    }
}
function t_menu__isBlockVisible(e) {
    var t = window.innerWidth,
        n = e.getAttribute('data-screen-min'),
        r = e.getAttribute('data-screen-max');
    return !(n && t < parseInt(n, 10)) && !(r && t > parseInt(r, 10));
}
