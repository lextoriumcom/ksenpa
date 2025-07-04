function t_skiplink__addButton() {
    var e,
        t = document.getElementById('allrecords');
    t &&
        t.querySelector('#t-header') &&
        ((e =
            '<noindex><a href="#t-main-content" class="t-skiplink" rel="nofollow" aria-label="' +
            t_skiplink__dict('skiplinkAriaLabel') +
            '" style="opacity:0;">' +
            t_skiplink__dict('skiplink') +
            '</a></noindex>'),
        document.head.insertAdjacentHTML(
            'beforeend',
            '<style>.t-skiplink{position:absolute;top:0;left:20px;z-index:99999;padding:8px 10px;font-family:"Arial",sans-serif;font-size:18px;text-align:center;text-decoration:none;background-color:#c7d2e9;border:1px solid #c7d2e9;border-radius:8px;transform:translateY(-200px);transition:transform .3s ease;}.t-skiplink:focus{transform:translateY(20px);opacity:1 !important;}#allrecords a.t-skiplink{color:#000000;}</style>',
        ),
        t.insertAdjacentHTML('afterbegin', e),
        t_skiplink__addAnchor());
}
function t_skiplink__addAnchor() {
    var e = document.querySelectorAll('[data-menu="yes"]'),
        t = document.getElementById('t-header'),
        n = '<div id="t-main-content"></div>';
    if ((t && t.insertAdjacentHTML('afterend', n), e && 0 < e.length && !t)) {
        t = e[0].parentNode;
        if (1 === e.length) t.insertAdjacentHTML('afterend', n);
        else
            for (var i = 0; i < e.length; i++) {
                var r = e[i].closest('.t-rec');
                if (r.nextSibling && null === r.nextSibling.querySelector('[data-menu="yes"]'))
                    return void r.insertAdjacentHTML('afterend', n);
            }
    }
}
function t_skiplink__dict(e) {
    var t = [];
    (t.skiplink = { EN: 'To main content', RU: 'К основному контенту' }),
        (t.skiplinkAriaLabel = { EN: 'Skip to main content', RU: 'К основному контенту' });
    var n = document.querySelector('html').getAttribute('lang'),
        n = n ? n.toUpperCase() : window.browserLang;
    return t[e] ? t[e][n] || t[e].EN : 'Text not found #' + e;
}
t_skiplink__addButton(),
    Element.prototype.closest ||
        (Element.prototype.closest = function (e) {
            for (var t = this; t && 1 === t.nodeType; ) {
                if (Element.prototype.matches.call(t, e)) return t;
                t = t.parentElement || t.parentNode;
            }
            return null;
        });
