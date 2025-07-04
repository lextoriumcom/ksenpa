function t_videoPlayer__init(e, t) {
    return 'mp4' === t || 'webm' === t
        ? t_video__initPlayer__htmlVideo(e, t)
        : 'rutube' === t
        ? t_video__initPlayer__rutube(e)
        : 'vkvideo' === t
        ? t_video__initPlayer__vkvideo(e)
        : 'youtube' === t
        ? t_video__initPlayer__youtube(e)
        : 'vimeo' === t
        ? t_video__initPlayer__vimeo(e)
        : 'kinescope' === t
        ? t_video__initPlayer__kinescope(e)
        : 'boomstream' === t
        ? t_video__initPlayer__boomstream(e)
        : (console.warn('unsupported video type:', t), Promise.reject(null));
}
function t_video__doRutubeCommand(e, t) {
    e.contentWindow.postMessage(JSON.stringify({ type: 'player:' + t, data: {} }), '*');
}
function t_video__doVimeoCommand(e, t) {
    e.contentWindow.postMessage(JSON.stringify({ method: t, value: 'true' }), '*');
}
function t_video__doBoomstreamCommand(e, t, o) {
    e.contentWindow.postMessage({ code: o, method: 'action', action: t, data: '' }, '*');
}
function t_video__getPlayer(e) {
    var t;
    return e.TildaVideoPlayer || null;
}
function t_video__initPlayer__youtube(e) {
    var t = 'youtube';
    return new Promise(function (o, i) {
        var a = e.querySelector('iframe');
        if (!a) return i(new Error(t + ': IFrame Element not Found'));
        t_onFuncLoad('t_loadJsFile', function () {
            t_loadJsFile('https://www.youtube.com/iframe_api');
        }),
            t_onFuncLoad('YT', function () {
                var i = a.id;
                if (!YT.Player)
                    return setTimeout(function () {
                        t_video__initPlayer__youtube(e).then(o);
                    }, 300);
                var r = new YT.Player(i, {
                    events: {
                        onReady: function i(r) {
                            var n = r.target,
                                d = {
                                    videoType: t,
                                    pause: function e() {
                                        return n.pauseVideo();
                                    },
                                    play: function e() {
                                        return n.playVideo();
                                    },
                                    videoEl: a,
                                    player: n,
                                };
                            return (e.TildaVideoPlayer = d), o(d);
                        },
                    },
                });
            });
    });
}
function t_video__initPlayer__vimeo(e) {
    var t = 'vimeo';
    return new Promise(function (o, i) {
        var a = e.querySelector('iframe');
        if (!a) return i(new Error(t + ': IFrame Element not Found'));
        var r = {
            pause: function e() {
                return t_video__doVimeoCommand(a, 'pause');
            },
            play: function e() {
                return t_video__doVimeoCommand(a, 'play');
            },
            videoEl: a,
            videoType: t,
        };
        (e.TildaVideoPlayer = r), o(r);
    });
}
function t_video__initPlayer__kinescope(e) {
    var t = 'kinescope';
    return new Promise(function (o, i) {
        var a = e.querySelector('iframe');
        if (!a) return i(new Error(t + ': IFrame Element not Found'));
        t_onFuncLoad('t_loadJsFile', function () {
            t_loadJsFile('https://player.kinescope.io/latest/iframe.player.js');
        }),
            t_onFuncLoad('Kinescope', function () {
                var i = a.id,
                    r = a.src;
                Kinescope.IframePlayer.create(i, { url: r }).then(function (i) {
                    var r = {
                        pause: function e() {
                            return i.pause();
                        },
                        play: function e() {
                            return i.play();
                        },
                        player: i,
                        videoEl: a,
                        videoType: t,
                    };
                    (e.TildaVideoPlayer = r), o(r);
                });
            });
    });
}
function t_video__initPlayer__vkvideo(e) {
    var t = 'vkvideo';
    return new Promise(function (o, i) {
        var a = e.querySelector('iframe');
        if (!a) return i(new Error(t + ': IFrame Element not Found'));
        t_onFuncLoad('t_loadJsFile', function () {
            t_loadJsFile('https://vk.com/js/api/videoplayer.js');
        }),
            t_onFuncLoad('VK', function () {
                var i = VK.VideoPlayer(a),
                    r = {
                        videoType: t,
                        pause: function e() {
                            return i.pause();
                        },
                        play: function e() {
                            return i.play();
                        },
                        videoEl: a,
                        player: i,
                    };
                return (e.TildaVideoPlayer = r), o(r);
            });
    });
}
function t_video__initPlayer__rutube(e) {
    var t = 'rutube';
    return new Promise(function (o, i) {
        var a = e.querySelector('iframe');
        if (!a) return i(new Error(t + ': IFrame Element not Found'));
        var r = {
            videoType: t,
            pause: function e() {
                return t_video__doRutubeCommand(a, 'pause');
            },
            play: function e() {
                return t_video__doRutubeCommand(a, 'play');
            },
            videoEl: a,
        };
        return (e.TildaVideoPlayer = r), o(r);
    });
}
function t_video__initPlayer__htmlVideo(e, t) {
    return new Promise(function (o, i) {
        var a = e.querySelector('video');
        if (!a) return i(new Error(t + ': Video Element not Found'));
        var r = {
            videoType: t,
            pause: function e() {
                return a.pause();
            },
            play: function e() {
                return a.play();
            },
            videoEl: a,
        };
        return (e.TildaVideoPlayer = r), o(r);
    });
}
function t_video__initPlayer__boomstream(e) {
    var t = 'boomstream';
    return new Promise(function (o, i) {
        var a = e.querySelector('iframe');
        if (!a) return i(new Error(t + ': IFrame Element not Found'));
        var r,
            n = /boomstream.com\/(?:balancer\/)?([A-Za-z0-9-]+)/,
            d = a.src.match(n);
        if (!d) return i(new Error(t + ': VideoID not Found'));
        var l = {
            pause: function e() {
                return t_video__doBoomstreamCommand(a, 'pause', d[1]);
            },
            play: function e() {
                return t_video__doBoomstreamCommand(a, 'play', d[1]);
            },
            videoEl: a,
            videoType: t,
        };
        return (e.TildaVideoPlayer = l), o(l);
    });
}
function t_video_lazyload_init() {
    if ('IntersectionObserver' in window) {
        var e,
            t = 300;
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (t = 150);
        var o = document.querySelectorAll('.t-video-lazyload:not(.t-video-no-lazyload)'),
            i = new IntersectionObserver(
                function (e, t) {
                    e.forEach(function (e) {
                        if (e.isIntersecting) {
                            var o = e.target;
                            t.unobserve(o), t_video_lazyload__addVideo(o);
                        }
                    });
                },
                { rootMargin: t + 'px 0px' },
            );
        Array.prototype.forEach.call(o, function (e) {
            i.observe(e);
        });
    } else
        t_video_lazyload__addVideoWithCheckViewport(),
            window.addEventListener(
                'scroll',
                t_throttle(function () {
                    t_video_lazyload__addVideoWithCheckViewport();
                }, 300),
            );
}
function t_video_lazyload__addVideoWithCheckViewport() {
    var e = document.documentElement.clientHeight,
        t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        o = 700,
        i;
    t && (o = 350),
        (i =
            document.documentMode < 9
                ? Array.prototype.slice
                      .call(document.querySelectorAll('.t-video-lazyload:not(.t-video-no-lazyload)'))
                      .filter(function (e) {
                          var t = e.closest('.r');
                          return (
                              !t.classList.contains('t395__off') &&
                              !t.classList.contains('t397__off') &&
                              !t.classList.contains('t400__off')
                          );
                      })
                : document.querySelectorAll(
                      '.r:not(.t395__off):not(.t397__off):not(.t400__off) .t-video-lazyload:not(.t-video-no-lazyload)',
                  )),
        Array.prototype.forEach.call(i, function (t) {
            var i = t.getBoundingClientRect(),
                a = i.top,
                r = i.bottom;
            ((a > 0 && a < e + o) || (r > 0 && r < e + o)) && t_video_lazyload__addVideo(t);
        });
}
function t_video_lazyload__addVideo(e) {
    var t = window.matchMedia('(max-width: 640px)').matches,
        o = e.getAttribute('data-videolazy-load'),
        i = e.getAttribute('data-videolazy-type'),
        a = e.getAttribute('data-videolazy-id'),
        r = a ? a.trim() : '',
        n = e.getAttribute('data-videolazy-hash'),
        d = n ? n.trim() : '',
        l,
        u = e.getAttribute('data-blocklazy-id') || '',
        _ = 'youtubeiframe',
        c = 'kinescopeiframe',
        s = e.getAttribute('data-videolazy-two-id');
    s && (_ += '_' + s + '_');
    var v = e.getAttribute('data-videolazy-nocontrols'),
        y = e.getAttribute('data-videolazy-play'),
        m = e.getAttribute('data-videolazy-mute'),
        f = e.getAttribute('data-videolazy-api'),
        p = e.getAttribute('data-videolazy-image'),
        b = e.getAttribute('data-videolazy-inline'),
        h = '',
        w = '100%',
        g = e.getAttribute('data-videolazy-height'),
        z = e.getAttribute('data-videolazy-mob-height');
    if (
        (!t && g && -1 === g.indexOf('vh') && (w = g),
        t && z && -1 === z.indexOf('vh') && (w = z),
        'false' === o && !e.classList.contains('t-video__isload'))
    )
        if ((e.setAttribute('data-videolazy-load', 'true'), 'youtube' === i)) {
            var A = '';
            -1 !== r.indexOf('vd.tilda.cc')
                ? (A = r)
                : ((h += 'rel=0&fmt=18&html5=1&showinfo=0'),
                  (h += y ? '&autoplay=1' : ''),
                  (h += m ? '&mute=1' : ''),
                  (h += 'yes' === v ? '&controls=0' : ''),
                  (A =
                      'https://www.youtube.com/embed/' +
                      (r = (r += -1 !== r.indexOf('?') ? '&' : '?').replace('https://www.youtube.com/shorts/', '')) +
                      (h += f ? '&enablejsapi=1' : '')));
            var P = _ + u;
            e.insertAdjacentHTML(
                'afterbegin',
                '<iframe id="' +
                    P +
                    '" width="100%" height="' +
                    w +
                    '" src="' +
                    A +
                    '" frameborder="0"' +
                    (y ? ' allow="autoplay"' : '') +
                    ' allowfullscreen></iframe>',
            );
        } else if ('vimeo' === i) {
            var E =
                    /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/|player\.vimeo\.com\/video\/|api\.vimeo\.com\/videos\/)?(\d+)/,
                V = r.match(E);
            (r = V && V[1] ? V[1] : r),
                (h = d ? '&h=' + d : ''),
                (h += y ? '&autoplay=1' : ''),
                (h += m ? '&muted=1' : ''),
                (h += f ? '&api=1' : ''),
                e.insertAdjacentHTML(
                    'afterbegin',
                    '<iframe src="//player.vimeo.com/video/' +
                        r +
                        '?title=0&byline=0&portrait=0&badge=0&color=ffffff' +
                        h +
                        '" width="100%" height="' +
                        w +
                        '" frameborder="0"' +
                        (y ? ' allow="autoplay"' : '') +
                        'webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
                );
        } else if ('kinescope' === i) {
            (h += y ? '&autoplay=1' : ''),
                (h += m ? '&muted=1' : ''),
                -1 === r.indexOf('?') && (h = h.replace('&', '?'));
            var P = c + u;
            e.insertAdjacentHTML(
                'afterbegin',
                '<iframe id="' +
                    P +
                    '" src="https://kinescope.io/embed/' +
                    r +
                    h +
                    '" width="100%" height="' +
                    w +
                    '" frameborder="0" scrolling="no" allow="fullscreen; picture-in-picture; encrypted-media;"></iframe>',
            );
        } else if ('rutube' === i)
            (h += d ? '&p=' + d : ''),
                (h += y ? '&autoplay=1' : ''),
                (h = (h += m ? '&muted=1' : '').replace('&', '?')),
                e.insertAdjacentHTML(
                    'afterbegin',
                    '<iframe src="https://rutube.ru/embed/' +
                        r +
                        h +
                        '" width="100%" height="' +
                        w +
                        '" frameborder="0" scrolling="no" allow="clipboard-write; autoplay; fullscreen; picture-in-picture; encrypted-media;" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>',
                );
        else if ('vkvideo' === i) {
            var T = /(?:video|video_ext\.php\?oid=|clip=?|)(-?\d+)_(\d+)|oid=(-?\d+)&id=(\d+)(?:.*?hash=([a-f0-9]+))?/,
                F = r.match(T),
                L = '',
                k = '';
            F && ((L = F[1] || F[3]), (k = F[2] || F[4]), !d && F[5] && (d = F[5])),
                (h += y ? '&autoplay=1' : ''),
                (h += m ? '&muted=1' : ''),
                (h += d ? '&hash=' + d : ''),
                (h += f ? '&js_api=1' : ''),
                e.insertAdjacentHTML(
                    'afterbegin',
                    '<iframe src="https://vk.com/video_ext.php?oid=' +
                        L +
                        '&id=' +
                        k +
                        '&hd=2' +
                        h +
                        '" width="100%" height="' +
                        w +
                        '" frameborder="0" scrolling="no" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;"></iframe>',
                );
        } else if ('boomstream' === i)
            (h += y ? '&autostart=1' : ''),
                (h = (h += m ? '&volume=0' : '').replace('&', '?')),
                e.insertAdjacentHTML(
                    'afterbegin',
                    '<iframe src="' +
                        r +
                        h +
                        '" width="100%" height="' +
                        w +
                        '" frameborder="0" scrolling="no" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" allowfullscreen></iframe>',
                );
        else if ('mp4' === i) {
            var S =
                '\n\t\t\t\t<video\n\t\t\t\t\twidth="100%"\n\t\t\t\t\theight="' +
                w +
                '"\n\t\t\t\t\tcontrols\n\t\t\t\t\t' +
                (y ? 'autoplay' : '') +
                '\n\t\t\t\t\t' +
                (m ? 'muted' : '') +
                '\n\t\t\t\t\t' +
                (b ? 'playsinline' : '') +
                '\n\t\t\t\t\t' +
                (p ? 'poster="' + p + '"' : '') +
                '\n\t\t\t\t>\n\t\t\t\t\t<source src="' +
                r +
                '" type="video/mp4">\n\t\t\t\t\tYour browser does not support the video tag.\n\t\t\t\t</video>\n\t\t\t';
            e.insertAdjacentHTML('afterbegin', S);
        } else if ('webm' === i) {
            var M =
                '\n\t\t\t\t<video\n\t\t\t\t\twidth="100%"\n\t\t\t\t\theight="' +
                w +
                '"\n\t\t\t\t\tcontrols\n\t\t\t\t\t' +
                (y ? 'autoplay' : '') +
                '\n\t\t\t\t\t' +
                (m ? 'muted' : '') +
                '\n\t\t\t\t\t' +
                (b ? 'playsinline' : '') +
                '\n\t\t\t\t\t' +
                (p ? 'poster="' + p + '"' : '') +
                '\n\t\t\t\t>\n\t\t\t\t\t<source src="' +
                r +
                '" type="video/webm">\n\t\t\t\t\tYour browser does not support the video tag.\n\t\t\t\t</video>\n\t\t\t';
            e.insertAdjacentHTML('afterbegin', M);
        } else
            'iframe' === i &&
                e.insertAdjacentHTML(
                    'afterbegin',
                    '<iframe src="' +
                        r +
                        '" width="100%" height="' +
                        w +
                        '" frameborder="0" scrolling="no" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;"></iframe>',
                );
    if (
        (e.closest('.t116') || '540px' !== g || t_video_lazyload__setHeight(e),
        g &&
            z &&
            (window.addEventListener('resize', function () {
                t_video_lazyload__setMobileHeight(e);
            }),
            window.addEventListener('orientationchange', function () {
                t_video_lazyload__setMobileHeight(e);
            })),
        y && 'rutube' === i)
    ) {
        var q = e.querySelector('iframe');
        if (!q) return;
        function H(e) {
            if (e && e.data && 'string' == typeof e.data) {
                var t = JSON.parse(e.data);
                'player:ready' === t.type &&
                    t.data &&
                    t.data.videoId === r &&
                    (window.removeEventListener('message', H), t_video__doRutubeCommand(q, 'play'));
            }
        }
        t_video__doRutubeCommand(q, 'changeState'), window.addEventListener('message', H);
    }
}
function t_video_lazyload__removeVideo(e) {
    (e.innerHTML = ''), e.setAttribute('data-videolazy-load', 'false');
}
function t_video_lazyload__setHeight(e) {
    if (e) {
        var t = e.getAttribute('data-videolazy-type'),
            o = e.querySelector('iframe');
        ('mp4' !== t && 'webm' !== t) || (o = e.querySelector('video'));
        var i = 0.5625 * e.offsetWidth;
        (e.style.height = i + 'px'), o && (o.style.height = i + 'px');
    }
}
function t_video_lazyload__setMobileHeight(e) {
    var t = window.matchMedia('(max-width: 640px)').matches,
        o = e.getAttribute('data-videolazy-height'),
        i = e.getAttribute('data-videolazy-mob-height');
    if (e) {
        var a = e.querySelector('iframe') || a.querySelector('video');
        if (a) {
            var r = t ? i : o;
            a.setAttribute('height', r);
        }
    }
}
function t_video__createPlayer(e, t) {
    var o = t_video__getPlayer(e);
    if (o) return Promise.resolve(o);
    var i = e.querySelector('.t-video-lazyload');
    t_video_lazyload__overwriteParams(i, t);
    var a = i.getAttribute('data-videolazy-type');
    return t_video_lazyload__addVideo(i), t_videoPlayer__init(e, a);
}
function t_video_lazyload__overwriteParams(e, t) {
    var o = t || {},
        i = o.videoId,
        a = o.videoHash,
        r = o.videoType,
        n = o.videoBlockId,
        d = o.controls,
        l = o.playsinline,
        u = o.autoplay,
        _ = void 0 !== u && u,
        c = o.mute,
        s = void 0 !== c && c,
        v = o.jsApi,
        y = void 0 === v || v;
    return (
        r && e.setAttribute('data-videolazy-type', r),
        i && e.setAttribute('data-videolazy-id', i),
        a && e.setAttribute('data-videolazy-hash', a),
        n && e.setAttribute('data-blocklazy-id', n),
        _ && e.setAttribute('data-videolazy-play', 'true'),
        s && e.setAttribute('data-videolazy-mute', 'true'),
        !0 === d && e.setAttribute('data-videolazy-nocontrols', 'false'),
        !1 === d && e.setAttribute('data-videolazy-nocontrols', 'yes'),
        y && e.setAttribute('data-videolazy-api', 'true'),
        l && e.setAttribute('data-videolazy-inline', 'true'),
        e
    );
}
(window.t_video__createPlayer = t_video__createPlayer),
    (window.t_video_lazyload__removeVideo = t_video_lazyload__removeVideo),
    t_onReady(function () {
        t_onFuncLoad('t_video_lazyload_init', function () {
            var e;
            document.querySelectorAll('.t-video-lazyload:not(.t-video-no-lazyload)').length && t_video_lazyload_init();
        });
    });
