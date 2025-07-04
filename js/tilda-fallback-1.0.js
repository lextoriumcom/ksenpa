function t_fallback__init() {
    t_fallback__initTags('LINK'),
        t_fallback__initTags('SCRIPT'),
        'loading' != document.readyState
            ? t_fallback__initTags('IMG')
            : document.addEventListener('DOMContentLoaded', function () {
                  t_fallback__initTags('IMG');
              });
}
function t_fallback__initTags(t) {
    var a = document.querySelectorAll(t);
    Array.prototype.forEach.call(a, function (a) {
        'set' !== a.isReloadFuncSet &&
            (a.onerror = function () {
                t_fallback__reloadSRC(this), (this.isReloadFuncSet = 'set');
            }),
            'y' === a.loaderr && ((a.loaderr = ''), t_fallback__reloadSRC(a)),
            'IMG' == t && a.complete && 0 === a.naturalWidth && '' !== a.src && t_fallback__reloadSRC(a);
    });
}
function t_fallback__reloadSRC(t) {
    'function' == typeof t_falladv__reloadSRC
        ? t_falladv__reloadSRC(t)
        : (t_fallback__loadAdvancedJS(),
          setTimeout(function () {
              t_fallback__reloadSRC(t);
          }, 500));
}
function t_fallback__handleTimeout() {
    'loading' == document.readyState &&
        'object' == typeof window.performance &&
        null !== document.head.querySelector('script[src^="https://static.tildacdn."]') &&
        (t_fallback__loadAdvancedJS(),
        setTimeout(function () {
            'function' == typeof t_falladv__handleDomTimeOut
                ? t_falladv__handleDomTimeOut()
                : t_fallback__handleTimeout();
        }, 500));
}
function t_fallback__loadAdvancedJS() {
    if (!0 !== window.t_isfalladvstartload) {
        window.t_isfalladvstartload = !0;
        var t = new XMLHttpRequest();
        t.open('GET', 'https://neo.tildacdn.com/js/tilda-fallback-advanced-1.0.min.js', !0),
            (t.onreadystatechange = function () {
                if (4 == t.readyState && 200 == t.status) {
                    var a = document.createElement('script');
                    (a.innerHTML = t.responseText), document.head.appendChild(a);
                }
            }),
            t.send();
    }
}
t_fallback__init(),
    document.addEventListener('DOMContentLoaded', t_fallback__init),
    setTimeout(t_fallback__handleTimeout, 3e4),
    setTimeout(function () {
        var t = document.getElementById('allrecords');
        if (t && !t.classList.contains('t-records_animated')) {
            var a = document.createElement('style');
            (a.type = 'text/css'),
                (a.innerHTML = 'div.t-records {opacity: 1;}'),
                document.getElementsByTagName('head')[0].appendChild(a);
        }
    }, 5e3);
