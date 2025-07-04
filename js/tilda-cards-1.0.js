function t_cards__moveClickOnCard(t) {
    t_card__moveClickOnCard(t);
}
function t_cards__addFocusOnTab(t) {
    t_card__addFocusOnTab(t);
}
function t_card__moveClickOnCard(t) {
    var e = document.getElementById('rec' + t);
    if (e) {
        var c = e.querySelectorAll('.t-card__col');
        c &&
            Array.prototype.forEach.call(c, function (t) {
                var e,
                    c,
                    a = t.querySelector('.t-card__link');
                a &&
                    ((t.style.cursor = 'pointer'),
                    t.addEventListener('mousedown', function () {
                        e = Date.now();
                    }),
                    t.addEventListener('mouseup', function (t) {
                        var r = 0 === t.button,
                            s = 1 === t.button;
                        if (
                            ((c = Date.now()),
                            !(
                                t.target.closest('.t-card__link_second') ||
                                t.target.closest('.t-card__link') ||
                                t.target.closest('.ql-undercut') ||
                                c - e >= 300
                            ))
                        )
                            if (r) a.click();
                            else if (s) {
                                var n = a.getAttribute('target');
                                a.setAttribute('target', '_blank'),
                                    a.click(),
                                    n ? a.setAttribute('target', n) : a.removeAttribute('target');
                            }
                    }));
            });
    }
}
function t_card__addFocusOnTab(t) {
    if (!window.isMobile) {
        var e = document.getElementById('rec' + t),
            c;
        if (e)
            if (e.querySelector('.t-card__container')) {
                var a = document.querySelectorAll('.t-card__link, .t-card__link_second');
                if (a) {
                    var r = null;
                    document.addEventListener('keydown', function () {
                        r = 'keyboard';
                    }),
                        document.addEventListener('mousedown', function () {
                            r = 'mouse';
                        }),
                        Array.prototype.forEach.call(a, function (t) {
                            var e = t.closest('.t-card__col_withoutbtn'),
                                c = t.closest('.t-card__col');
                            t.addEventListener('focus', function () {
                                if ('keyboard' === r) {
                                    if (e && !t.classList.contains('t-card__link_second'))
                                        e.classList.add('t-focusable');
                                    else if (c && !t.classList.contains('t-card__link_second')) {
                                        var a = c.querySelector('.t-card__btn') || c.querySelector('.t-card__btn-text');
                                        c.classList.add('t-card__col_btnfocusable'),
                                            a && a.classList.add('t-focusable');
                                    } else
                                        t.classList.add('t-focusable'),
                                            c && c.classList.add('t-card__col_btnfocusable');
                                    r = null;
                                }
                            }),
                                t.addEventListener('blur', function () {
                                    if (e && !t.classList.contains('t-card__link_second'))
                                        e.classList.remove('t-focusable');
                                    else if (c && !t.classList.contains('t-card__link_second')) {
                                        var a = c.querySelector('.t-card__btn') || c.querySelector('.t-card__btn-text');
                                        c.classList.remove('t-card__col_btnfocusable'),
                                            a && a.classList.remove('t-focusable');
                                    } else
                                        t.classList.remove('t-focusable'),
                                            c && c.classList.remove('t-card__col_btnfocusable');
                                });
                        });
                }
            }
    }
}
