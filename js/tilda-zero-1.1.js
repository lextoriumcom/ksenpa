function t396__isElementUsingCalcZoom(t) {
    var e = ['gallery'],
        i = t.getAttribute('data-elem-type');
    return e.includes(i);
}
function t396_init(t) {
    var e = document.getElementById('rec' + t),
        i = e ? e.querySelector('.t396') : null,
        r = e ? e.querySelector('.t396__artboard') : null;
    if (r) {
        t396_initTNobj(t, r), t396__initOnlyScalable();
        var o = '',
            n = t396_detectResolution(t),
            a = document.getElementById('allrecords'),
            l = a && 'edit' === a.getAttribute('data-tilda-mode');
        void 0 === window.tn.isEditMode && (window.tn.isEditMode = l), t396_switchResolution(t, n);
        var d = 'window' === t396_ab__getFieldValue(r, 'upscale');
        if (
            (t396__setGlobalScaleVariables(t, n, d),
            t396_updateTNobj(t),
            t396_artboard_build(o, t),
            window.addEventListener('load', function () {
                t396_allelems__renderView(r), t396_allgroups__renderView(r);
                var t = r ? window.getComputedStyle(r).getPropertyValue('overflow') : '';
                'function' == typeof t_lazyload_update &&
                    'auto' === t &&
                    r &&
                    r.addEventListener(
                        'scroll',
                        t_throttle(function () {
                            var t = a ? a.getAttribute('data-tilda-lazy') : null;
                            ('y' !== window.lazy && 'yes' !== t) ||
                                t_onFuncLoad('t_lazyload_update', function () {
                                    t_lazyload_update();
                                });
                        }, 500),
                    ),
                    '' !== window.location.hash &&
                        'visible' === t &&
                        (r && (r.style.overflow = 'hidden'),
                        setTimeout(function () {
                            r && (r.style.overflow = 'visible');
                        }, 1));
            }),
            window.tildaMembers && 'MutationObserver' in window)
        ) {
            var _ = new MutationObserver(function (e) {
                e.forEach(function (e) {
                    'attributes' === e.type &&
                        'class' === e.attributeName &&
                        e.target.classList.contains('tlk-courses_page') &&
                        (t396_doResize(t, !0), _.disconnect());
                });
            });
            _.observe(document.body, { attributes: !0 });
        }
        document.querySelector('.t830') &&
            t_onReady(function () {
                var e, i;
                ['t830__allrecords_padd', 't830__allrecords_padd-small'].some(function (t) {
                    return a.classList.contains(t);
                })
                    ? t396_doResize(t, !0)
                    : a.addEventListener('allRecPaddingInit', function () {
                          t396_doResize(t, !0);
                      });
            }),
            e &&
                i &&
                r &&
                'yes' === e.getAttribute('data-connect-with-tab') &&
                i.addEventListener('displayChanged', function () {
                    t396_allelems__renderView(r), t396_allgroups__renderView(r), t396_doResize(t, !0);
                });
        var s = 'hug' === r.getAttribute('data-artboard-heightmode');
        if (s) {
            t396__updateAutoHeight(r),
                setInterval(function () {
                    t396__updateAutoHeight(r);
                }, 3e3);
            var u = r.getElementsByTagName('img');
            Array.from(u).forEach(function (t) {
                t.onload = function () {
                    t396__updateAutoHeight(r);
                };
            });
            var c = { subtree: !0, characterData: !0, characterDataOldValue: !0 },
                g,
                f;
            new MutationObserver(function t() {
                t396__updateAutoHeight(r);
            }).observe(r, c);
        }
        setTimeout(function () {
            e &&
                e.closest('#allrecordstable') &&
                i &&
                r &&
                i.addEventListener('displayChanged', function () {
                    t396_allelems__renderView(r), t396_allgroups__renderView(r), t396_doResize(t, !0);
                });
        }, 1e3);
        var w = !!document.querySelector('.t635__textholder');
        e &&
            w &&
            i &&
            r &&
            i.addEventListener('animationInited', function () {
                t396_allelems__renderView(r), t396_allgroups__renderView(r), t396_doResize(t, !0);
            }),
            e &&
                document.querySelector('.t431') &&
                i &&
                r &&
                t_onReady(function () {
                    setTimeout(function () {
                        t396_doResize(t, !0);
                    });
                }),
            /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && i && i.classList.add('t396_safari'),
            d &&
                !l &&
                t_onFuncLoad('t396_scaleBlock', function () {
                    t396_scaleBlock(t);
                }),
            l ||
                'y' !== t396_ab__getFieldValue(r, 'fixed-need-js') ||
                t_onFuncLoad('t396__processFixedArtBoard', function () {
                    t396__processFixedArtBoard(r);
                }),
            t396__processAbsoluteArtBoard(r),
            t396__processTopShift(r, t, !1),
            window.t396__isMobile ||
                s ||
                t396__removeInlineHeight([r, r.querySelector('.t396__carrier'), r.querySelector('.t396__filter')]);
    }
}
(window.t396__isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    navigator.userAgent.indexOf('Instagram') > -1),
    (window.t396__isIPad = 'ontouchend' in document && -1 !== navigator.userAgent.indexOf('AppleWebKit')),
    (window.t396__isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)),
    (window.t396__isTouchDevice = 'ontouchend' in document),
    (window.t396__isInAppBrowser = /WebView|(iPhone|iPod|iPad)(?!.*Safari)/gi.test(navigator.userAgent)),
    (window.t396__isFacebookMessengerInApp = /FBAN|FBAV/gi.test(navigator.userAgent) && window.t396__isInAppBrowser),
    (window.t396__isInstagramInApp = /\bInstagram/gi.test(navigator.userAgent) && window.t396__isInAppBrowser),
    t_onReady(t396__globalInit);
var t396_waitForFinalEvent = (function () {
    var t = {};
    return function (e, i, r) {
        var o = r || "Don't call this twice without a uniqueId";
        t[o] && clearTimeout(t[o]), (t[o] = setTimeout(e, i));
    };
})();
function t396__initSafariPopupTracking() {
    t396__shouldUseVisualViewportHeight() &&
        document.body.addEventListener('popupShowed', function () {
            t396__waitForPopup().then(function (t) {
                if (t) {
                    var e = t.querySelector('.t396__artboard');
                    e && t396_doResize(e.getAttribute('data-artboard-recid'));
                }
            });
        });
}
function t396_ab__getWindowHeight(t) {
    return t396__shouldUseVisualViewportHeight() && t396__isInPopup(t)
        ? window.visualViewport.height
        : t396__getWindowDimensions().height;
    var e, i;
}
function t396_ab__getWindowWidth(t) {
    return t396__isInPopup(t) ? document.documentElement.clientWidth : t396__getWindowDimensions().width;
    var e, i;
}
function t396__getTNWindowHeight() {
    return window.t396__isMobile ? document.documentElement.clientHeight : window.innerHeight;
}
function t396__getTNWindowWidth() {
    var t = t396__getBlockEditorWidth();
    if (t) return t;
    var e,
        i =
            window.t396__isMobile || window.t396__isIPad || window.t396__isSafari
                ? document.documentElement.clientWidth
                : window.innerWidth,
        r = t396__getAxisXPadding();
    return r && (i -= r), i;
}
function t396__getWindowDimensions(t) {
    var e,
        i = (t || {}).forceUpdate,
        r = void 0 !== i && i,
        o = !window.tn.window_width || !window.tn.window_height,
        n;
    return (
        (r || o) && t396__updateWindowDimensions(), { width: window.tn.window_width, height: window.tn.window_height }
    );
}
function t396__updateWindowDimensions() {
    (window.tn.window_width = t396__getTNWindowWidth()), (window.tn.window_height = t396__getTNWindowHeight());
}
function t396__removeInlineHeight(t) {
    window.t396_isStyleTagInitialScale ||
        t.filter(Boolean).forEach(function (t) {
            t && (t.style.height = '');
        });
}
function t396__clearInitialScaleStyles() {
    var t;
    document.head.querySelectorAll('.t396-initial-scale-style').forEach(function (t) {
        return t.remove();
    });
}
function t396__globalInit() {
    t396__isAllZeroBlocksRendered(function () {
        t396__applyFixesForAllElements(),
            t396__initSafariPopupTracking(),
            t396__clearInitialScaleStyles(),
            window.addEventListener('resize', t396__onResize),
            window.addEventListener('orientationchange', t396__onOrientationChange);
    });
}
function t396__onResize() {
    t396_waitForFinalEvent(
        function () {
            var t,
                e = t396__getWindowDimensions().width;
            t396__updateWindowDimensions();
            var i,
                r,
                o = e !== t396__getWindowDimensions().width;
            t396__getZeroBlocks().forEach(function (t) {
                var e = t.artboard,
                    i = t.record;
                if ((e.classList.add('t396_resizechange'), window.t396__isMobile || window.t396__isTouchDevice)) {
                    if (o) {
                        if (!i) return;
                        if (!t396_isBlockVisible(i)) return;
                        t396_doResize(i.id.replace('rec', '')), e.classList.remove('t396_resizechange');
                    }
                } else {
                    if (!i) return;
                    if (!t396_isBlockVisible(i)) return;
                    t396_doResize(i.id.replace('rec', '')), e.classList.remove('t396_resizechange');
                }
            });
        },
        500,
        'global_resize_zero_unique_id',
    );
}
function t396__onOrientationChange() {
    t396_waitForFinalEvent(
        function () {
            t396__updateWindowDimensions(),
                t396__getZeroBlocks().forEach(function (t) {
                    var e = t.record;
                    e && t396_isBlockVisible(e) && t396_doResize(e.id.replace('rec', ''));
                });
        },
        600,
        'global_orientationchange_zero_unique_id',
    );
}
function t396_isOnlyScalableBrowser() {
    return window.isOnlyScalable;
}
function t396__initOnlyScalable() {
    if (void 0 === window.isOnlyScalable) {
        var t = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./),
            e = t ? parseInt(t[1], 10) : 126,
            i = window.navigator.userAgent.match(/Chrome\/([0-9]+)\./),
            r = (i && parseInt(i[1], 10)) || 0;
        (window.isOnlyScalable = e < 126), (window.shouldUseScaleFactor = !window.isOnlyScalable && !t && r <= 127);
    }
}
function t396__setGlobalScaleVariables(t, e, i) {
    var r = document.getElementById('rec' + t),
        o = r ? r.querySelector('.t396__artboard') : null;
    if (o) {
        var n = t396_ab__getWindowWidth(o),
            a = i ? parseFloat((n / e).toFixed(3)) : 1,
            l = 'ab' + t;
        (window.tn[l].scaleFactor = a), (window.tn_scale_factor = a);
        var d = document.getElementById('rec' + t);
        d && !window.tn.isEditMode && d.style.setProperty('--zoom', a.toString());
    }
}
function t396__processTopShift(t, e, i) {
    'function' != typeof window.t396__updateTopShift ||
        ('y' !== t396_ab__getFieldValue(t, 'shift-processed') && 'y' !== t396_ab__getFieldValue(t, 'fixed-shift')) ||
        window.t396__updateTopShift(e, i);
}
function t396_doResize(t, e) {
    e && t396__updateWindowDimensions();
    var i = t396_isOnlyScalableBrowser(),
        r = document.getElementById('rec' + t),
        o = document.getElementById('allrecords'),
        n = t396_detectResolution(t),
        a = r ? r.querySelector('.t396__scale-style') : null;
    if ((t396__setScaleFactorForElements(t), t396_removeElementFromDOM(a), i)) {
        var l = r ? r.querySelectorAll('.tn-molecule, .tn-atom') : [];
        Array.prototype.forEach.call(l, function (t) {
            if (!t.classList.contains('tn-atom') || !t.closest('.tn-molecule')) {
                var e = t.closest('.tn-atom__scale-wrapper'),
                    i = e ? e.parentNode : null;
                i && i.removeChild(e), i && i.appendChild(t);
            }
        });
    } else {
        var d = r ? r.querySelectorAll('.t396__elem, .t396__group') : [];
        Array.prototype.forEach.call(d, function (t) {
            t.style.zoom = '';
            var e = t.querySelector('.tn-atom');
            e && ((e.style.transformOrigin = ''), (e.style.fontSize = ''), (e.style.webkitTextSizeAdjust = ''));
        });
    }
    t396_switchResolution(t, n);
    var _ = r ? r.querySelector('.t396__artboard') : null,
        s = 'window' === t396_ab__getFieldValue(_, 'upscale');
    t396__setGlobalScaleVariables(t, n, s), t396_updateTNobj(t), t396_ab__renderView(_);
    var u = o ? o.getAttribute('data-tilda-mode') : '';
    s &&
        'edit' !== u &&
        t_onFuncLoad('t396_scaleBlock', function () {
            t396_scaleBlock(t);
        }),
        'edit' !== u &&
            'y' === t396_ab__getFieldValue(_, 'fixed-need-js') &&
            t_onFuncLoad('t396__processFixedArtBoard', function () {
                t396__processFixedArtBoard(_);
            }),
        t396__processAbsoluteArtBoard(_),
        t396__processTopShift(_, t, !0),
        t396_allelems__renderView(_),
        t396_allgroups__renderView(_),
        t396__applyFixesForAllElements(),
        t396__updateAutoHeight(_),
        _ && _.dispatchEvent(new CustomEvent('artBoardResized'));
    var c = 'hug' === _.getAttribute('data-artboard-heightmode');
    _ &&
        !c &&
        (window.t396__isMobile ||
            t396__removeInlineHeight([_, _.querySelector('.t396__carrier'), _.querySelector('.t396__filter')]));
}
function t396__updateAutoHeight(t) {
    var e;
    if ('hug' === t.getAttribute('data-artboard-heightmode')) {
        var i = t396__getAutoHeight(t),
            r;
        if (i !== t.offsetHeight) {
            var o,
                n = 'ab' + t.getAttribute('data-artboard-recid'),
                a = window.tn[n].curResolution,
                l;
            a === window.tn[n].curResolution_max
                ? t.setAttribute('data-artboard-height', i)
                : t.setAttribute('data-artboard-height-res-' + a, i),
                t396_ab__renderView(t);
        }
    }
}
function t396__getAutoHeight(t) {
    var e, i;
    if (t.classList.contains('t396__artboard-flex')) {
        var r = t.style.height;
        (t.style.height = 'auto'), (e = t.offsetHeight), (t.style.height = r);
    } else {
        var o = t.querySelectorAll(':scope > .tn-group, :scope > .tn-elem');
        e = Array.from(o).reduce(function (e, i) {
            var r = t396_core__getFieldValue(i, 'axisy'),
                o = t396_core__getFieldValue(i, 'topunits'),
                n = t396_core__getFieldValue(i, 'heightunits');
            if ('%' === o || '%' === n || 'bottom' === r || 'center' === r) return e;
            var a = i.offsetTop + i.offsetHeight,
                l,
                d,
                _;
            'window' === t396_ab__getFieldValue(t, 'upscale') &&
                (a *= t396__getCurrentScaleFactor(t.getAttribute('data-artboard-recid')));
            return a > e ? a : e;
        }, -1 / 0);
    }
    return e === -1 / 0 ? 0 : e;
}
function t396__processAbsoluteArtBoard(t) {
    if (t) {
        var e = t396_ab__getFieldValue(t, 'pos');
        if ('fixed' !== e) {
            var i = 't396__artboard-fixed-no-bg';
            if ('absolute' === e) {
                var r = getComputedStyle(t),
                    o = t.querySelector('.t396__filter'),
                    n = !o || 'none' === getComputedStyle(o).backgroundImage,
                    a,
                    l =
                        'rgba(0, 0, 0, 0)' === r.backgroundColor && 'none' === r.backgroundImage && n
                            ? 'add'
                            : 'remove';
                t.classList[l](i);
            } else t.classList.remove(i);
        }
    }
}
function t396_detectResolution(t) {
    if (!t) return null;
    var e = 'ab' + t,
        i,
        r = t396__getWindowDimensions().width,
        o;
    return (
        window.tn[e].screens.forEach(function (t) {
            r >= t && (o = t);
        }),
        void 0 === o && (o = window.tn[e].screens[0]),
        o
    );
}
function t396_initTNobj(t, e) {
    e &&
        (void 0 === window.tn
            ? ((window.tn = {}),
              (window.tn.ab_fields = [
                  'height',
                  'width',
                  'bgcolor',
                  'bgimg',
                  'bgattachment',
                  'bgposition',
                  'filteropacity',
                  'filtercolor',
                  'filteropacity2',
                  'filtercolor2',
                  'height_vh',
                  'valign',
              ]),
              t396_setScreensTNobj(t, e))
            : t396_setScreensTNobj(t, e));
}
function t396_setScreensTNobj(t, e) {
    var i = 'ab' + t;
    (window.tn[i] = {}), (window.tn[i].screens = []);
    var r = e.getAttribute('data-artboard-screens');
    r
        ? (r = r.split(',')).forEach(function (t) {
              window.tn[i].screens.push(parseInt(t, 10));
          })
        : (window.tn[i].screens = [320, 480, 640, 960, 1200]);
}
function t396__getAxisXPadding() {
    var t = document.getElementById('allrecords'),
        e = Boolean(window.tildaMembers) || 'allrecords' === window.zero_window_width_hook,
        i,
        r;
    return (
        (t &&
            e &&
            [document.body, t].reduce(function (t, e) {
                var i = window.getComputedStyle(e).paddingLeft,
                    r = window.getComputedStyle(e).paddingRight;
                return t + parseInt(i, 10) + parseInt(r, 10);
            }, 0)) ||
        0
    );
}
function t396_updateTNobj(t) {
    for (
        var e, i = t396__getWindowDimensions().width, r = 'ab' + t, o = window.tn[r].screens.slice().reverse(), n = 0;
        n < o.length;
        n++
    )
        window.tn[r].curResolution === o[n] &&
            ((window.tn[r].canvas_min_width = o[n]), (window.tn[r].canvas_max_width = 0 === n ? i : o[n - 1]));
    (window.tn[r].grid_width = window.tn[r].canvas_min_width),
        (window.tn[r].grid_offset_left = (i - window.tn[r].grid_width) / 2);
}
function t396_switchResolution(t, e) {
    var i = 'ab' + t,
        r = window.tn[i].screens[window.tn[i].screens.length - 1];
    (window.tn[i].curResolution = e),
        (window.tn[i].curResolution_max = r),
        (window.tn.curResolution = e),
        (window.tn.curResolution_max = r);
}
function t396_artboard_build(t, e) {
    var i = document.getElementById('rec' + e),
        r = document.getElementById('allrecords'),
        o = i ? i.querySelector('.t396__artboard') : null;
    if (o) {
        t396_ab__renderView(o), t396_allgroups__renderView(o), t396__setScaleFactorForElements(e);
        var n = o.querySelectorAll('.tn-elem');
        Array.prototype.forEach.call(n, function (t) {
            var i;
            switch (t.getAttribute('data-elem-type')) {
                case 'text':
                    t396_addText(o, t);
                    break;
                case 'image':
                    t396_addImage(o, t);
                    break;
                case 'shape':
                    t396_addShape(o, t);
                    break;
                case 'button':
                    t396_addButton(o, t);
                    break;
                case 'video':
                    t396_addVideo(o, t);
                    break;
                case 'html':
                    t396_addHtml(o, t);
                    break;
                case 'tooltip':
                    t396_addTooltip(o, t);
                    break;
                case 'form':
                    t396_addForm(o, t, e);
                    break;
                case 'gallery':
                    t396_addGallery(o, t, e);
                    break;
                case 'vector':
                    t396_addVector(o, t);
            }
        }),
            o.classList.remove('rendering'),
            o.classList.add('rendered'),
            o.dispatchEvent(new Event('artBoardRendered', { bubbles: !0, cancelable: !0 }));
        var a = o.getAttribute('data-artboard-ovrflw'),
            l;
        if (('visible' === a || 'visibleX' === a) && r)
            (r.style.overflow = 'hidden'),
                document.querySelector('.t951__sidebar_sticky,.t-store__prod-popup__col_fixed') &&
                    (r.style.cssText += 'overflow:clip;');
        if ('auto' === a) {
            var d = Math.abs(o.offsetHeight - o.clientHeight);
            0 !== d && (o.style.paddingBottom = d + 'px');
        }
        if (window.t396__isMobile || window.t396__isIPad) {
            var _ = document.createElement('style');
            (_.textContent =
                '@media only screen and (min-width:1366px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio:2) {.t396__carrier {background-attachment:scroll!important;}}'),
                i.insertAdjacentElement('beforeend', _);
        }
    }
}
function t396_ab__renderView(t) {
    if (t) {
        for (var e = window.tn.ab_fields, i = document.getElementById('allrecords'), r, o = 0; o < e.length; o++)
            t396_ab__renderViewOneField(t, e[o]);
        var n = t396_ab__getFieldValue(t, 'height'),
            a = t396_ab__getHeight(t),
            l,
            d = t396__getCurrentScaleFactor(t.getAttribute('data-artboard-recid')),
            _ = !!i && 'edit' === i.getAttribute('data-tilda-mode'),
            s = 'window' === t396_ab__getFieldValue(t, 'upscale'),
            u,
            c,
            g;
        if (
            ((r = t396_ab__getFieldValue(t, 'height_vh')),
            s && !_ && r && (u = parseInt(n, 10) * d),
            n === a || (u && u >= a))
        )
            c = 0;
        else
            switch (t396_ab__getFieldValue(t, 'valign')) {
                case 'top':
                default:
                    c = 0;
                    break;
                case 'center':
                    c = u ? parseFloat(((a - u) / 2).toFixed(1)) : parseFloat(((a - n) / 2).toFixed(1));
                    break;
                case 'bottom':
                    c = u ? parseFloat((a - u).toFixed(1)) : parseFloat((a - n).toFixed(1));
                    break;
                case 'stretch':
                    (c = 0), (n = a);
            }
        t.setAttribute('data-artboard-proxy-min-offset-top', c),
            t.setAttribute('data-artboard-proxy-min-height', n),
            t.setAttribute('data-artboard-proxy-max-height', a);
        var f = t.querySelector('.t396__filter'),
            w = t.querySelector('.t396__carrier'),
            p;
        if (
            ((r = t396_ab__getFieldValue(t, 'height_vh')),
            (r = parseFloat(r)),
            (window.t396__isMobile || window.t396__isIPad) && r)
        ) {
            var h = (t396_ab__getWindowHeight(t) * r) / 100;
            (t.style.height = h + 'px'), f && (f.style.height = h + 'px'), w && (w.style.height = h + 'px');
        }
        'hug' === t.getAttribute('data-artboard-heightmode') &&
            !r &&
            ((t.style.height = n + 'px'), f && (f.style.height = n + 'px'), w && (w.style.height = n + 'px'));
    }
}
function t396__getCurrentScaleFactor(t) {
    var e = 'ab' + t,
        i;
    return (window.tn && window.tn[e] && window.tn[e].scaleFactor) || window.tn_scale_factor;
}
function t396__setScaleFactorForElements(t) {
    var e = document.getElementById('rec' + t),
        i = e ? e.querySelector('.t396__artboard') : null;
    if (i) {
        var r = t396__getCurrentScaleFactor(t),
            o = i.querySelectorAll('.t396__elem, .tn-group');
        Array.prototype.forEach.call(o, function (t) {
            t.scaleFactor = r;
        });
    }
}
function t396_addText(t, e) {
    var i = t396_getEl(e);
    if (i) {
        var r = 'top,left,width,height,container,axisx,axisy,widthunits,leftunits,topunits';
        i.setAttribute('data-fields', r), t396_elem__renderView(i);
    }
}
function t396_addImage(t, e) {
    var i = t396_getEl(e);
    if (i) {
        var r = 'img,width,filewidth,fileheight,top,left,container,axisx,axisy,widthunits,leftunits,topunits';
        i.setAttribute('data-fields', r), t396_elem__renderView(i);
        var o = i.querySelector('img');
        o &&
            (o.addEventListener('load', function () {
                t396_elem__renderViewOneField(i, 'top'),
                    o.src &&
                        setTimeout(function () {
                            t396_elem__renderViewOneField(i, 'top'), t396__updateAutoHeight(t);
                        }, 2e3);
            }),
            o.complete &&
                (t396_elem__renderViewOneField(i, 'top'),
                o.src &&
                    setTimeout(function () {
                        t396_elem__renderViewOneField(i, 'top'), t396__updateAutoHeight(t);
                    }, 2e3)),
            o.addEventListener('tuwidget_done', function () {
                t396_elem__renderViewOneField(i, 'top');
            }),
            setTimeout(function () {
                t396_changeFilterOnSafari(i);
            }));
    }
}
function t396_addShape(t, e) {
    var i = t396_getEl(e);
    if (i) {
        var r = 'width,height,top,left,';
        (r += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits'),
            i.setAttribute('data-fields', r),
            t396_elem__renderView(i);
    }
}
function t396_changeFilterOnSafari(t) {
    var e;
    if (
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
        t396__checkContainBackdropFilter(t) &&
        'IntersectionObserver' in window
    ) {
        var i = t.querySelector('.tn-atom'),
            r;
        new IntersectionObserver(function (e, i) {
            e.forEach(function (e) {
                if (e.isIntersecting) {
                    var r = e.target;
                    i.unobserve(r), t396__processBackdropFilterOnImage(t);
                }
            });
        }).observe(i);
    }
}
function t396__checkContainBackdropFilter(t) {
    if (!t) return !1;
    var e = window.getComputedStyle(t).webkitBackdropFilter;
    if (e && 'none' !== e) return !0;
    var i = t.querySelector('.tn-atom__sbs-anim-wrapper, .tn-atom__prx-wrapper, .tn-atom__sticky-wrapper');
    if (!i) return !1;
    var r = window.getComputedStyle(i).webkitBackdropFilter;
    return r && 'none' !== r;
}
function t396__processBackdropFilterOnImage(t) {
    if (t) {
        var e = t.getAttribute('data-animate-sbs-opts'),
            i = t.getAttribute('data-animate-prx') || t.getAttribute('data-animate-fix'),
            r = e || i,
            o = t.classList.contains('t396__elem--backdrop-filter-img-wrappered');
        (r && o) || !r
            ? t396__updateBackdropFilterOnImage(t)
            : t.addEventListener('backdropFilterImgWrappered', function () {
                  t396__updateBackdropFilterOnImage(t);
              });
    }
}
function t396__updateBackdropFilterOnImage(t) {
    if (t) {
        var e = t,
            i = e.querySelector('img'),
            r = e.querySelector('.tn-atom__sbs-anim-wrapper, .tn-atom__prx-wrapper, .tn-atom__sticky-wrapper'),
            o = '';
        r && ((e = r), (o = window.getComputedStyle(e).webkitBackdropFilter || '')),
            (e.style.webkitBackdropFilter = 'none'),
            t396_waitForUploadImg(i, function () {
                e.style.webkitBackdropFilter = o;
            });
    }
}
function t396_waitForUploadImg(t, e) {
    if ('y' === window.lazy)
        var i = setTimeout(function () {
            t.classList.contains('loaded') && t.clientWidth && t.src
                ? (e(), clearTimeout(i))
                : t396_waitForUploadImg(t, e);
        }, 300);
    else e();
}
function t396_addButton(t, e) {
    var i = t396_getEl(e);
    if (!i) return null;
    var r = 'top,left,width,height,container,axisx,axisy,caption,leftunits,topunits';
    return i.setAttribute('data-fields', r), t396_elem__renderView(i), i;
}
function t396_addVideo(t, e) {
    var i = t396_getEl(e);
    if (i) {
        var r = 'width,height,top,left,';
        (r += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits'),
            i.setAttribute('data-fields', r),
            t396_elem__renderView(i),
            t_onFuncLoad('t396_initVideo', function () {
                t396_initVideo(i);
            });
    }
}
function t396_addHtml(t, e) {
    var i = t396_getEl(e);
    if (i) {
        var r = 'width,height,top,left,';
        (r += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits'),
            i.setAttribute('data-fields', r),
            t396_elem__renderView(i);
    }
}
function t396_addTooltip(t, e) {
    var i = t396_getEl(e);
    if (i) {
        var r = 'width,height,top,left,';
        (r += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits,tipposition'),
            i.setAttribute('data-fields', r),
            t396_elem__renderView(i),
            t_onFuncLoad('t396_initTooltip', function () {
                t396_initTooltip(i);
            });
    }
}
function t396_addForm(t, e, i) {
    var r = t396_getEl(e);
    if (r) {
        var o = 'width,top,left,',
            n;
        (o += 'inputs,container,axisx,axisy,widthunits,leftunits,topunits'), r.setAttribute('data-fields', o);
        var a = r.getAttribute('data-elem-id'),
            l = r.querySelector('.tn-atom__inputs-textarea');
        l && (n = l.value),
            t_onFuncLoad('t_zeroForms__init', function () {
                t396_elem__renderView(r), t_zeroForms__init(i, a, n), t396_elem__renderView(r);
            });
    }
}
function t396_addGallery(t, e, i) {
    var r = t396_getEl(e);
    if (r) {
        var o = 'width,height,top,left,';
        (o += 'imgs,container,axisx,axisy,widthunits,heightunits,leftunits,topunits'),
            r.setAttribute('data-fields', o),
            t396_elem__renderView(r);
        var n = r.getAttribute('data-elem-id');
        t_onFuncLoad('t_zeroGallery__init', function () {
            t_zeroGallery__init(i, n);
        });
    }
}
function t396_addVector(t, e) {
    var i = t396_getEl(e);
    if (i) {
        var r = 'width,filewidth,fileheight,top,left,container,axisx,axisy,widthunits,leftunits,topunits';
        i.setAttribute('data-fields', r), t396_elem__renderView(i);
    }
}
function t396_elem__getFieldValue(t, e) {
    var i = t396_getEl(t);
    if (!i) return null;
    if (i.classList.contains('tn-group')) return t396_group__getFieldValue(i, e);
    var r = i.closest('.t396__artboard'),
        o = r.getAttribute('data-artboard-recid'),
        n = 'ab' + o,
        a;
    void 0 === window.tn[n] && (t396_initTNobj(o, r), t396_switchResolution(o, t396_detectResolution(o)));
    var l = window.tn[n].curResolution,
        d = window.tn[n].curResolution_max,
        _ = window.tn[n].screens,
        s;
    if (
        !(s =
            l === d
                ? i.getAttribute('data-field-' + e + '-value')
                : i.getAttribute('data-field-' + e + '-res-' + l + '-value')) &&
        '' !== s
    )
        for (var u = 0; u < _.length; u++) {
            var c = _[u];
            if (
                !(c <= l) &&
                (s =
                    c === d
                        ? i.getAttribute('data-field-' + e + '-value')
                        : i.getAttribute('data-field-' + e + '-res-' + c + '-value'))
            )
                break;
        }
    return s;
}
function t396_elem__renderView(t) {
    var e = t396_getEl(t),
        i = e ? e.getAttribute('data-fields') : '';
    i &&
        (i = i.split(',')).forEach(function (t) {
            t396_elem__renderViewOneField(e, t);
        });
}
function t396_group__renderView(t) {
    var e = t ? t.getAttribute('data-fields') : '';
    e &&
        (e = e.split(',')).forEach(function (e) {
            var i = t396_group__getFieldValue(t, e);
            switch (e) {
                case 'left':
                    (i = t396_elem__convertPosition__Local__toAbsolute(t, e, i)),
                        (t.style.left = parseFloat(i).toFixed(1) + 'px');
                    break;
                case 'top':
                    (i = t396_elem__convertPosition__Local__toAbsolute(t, e, i)),
                        (t.style.top = parseFloat(i).toFixed(1) + 'px');
                    break;
                case 'container':
                    t396_elem__renderViewOneField(t, 'left'), t396_elem__renderViewOneField(t, 'top');
            }
        });
}
function t396_elem__renderViewOneField(t, e) {
    var i = t396_getEl(t);
    if (i) {
        var r = document.getElementById('allrecords'),
            o = r ? r.getAttribute('data-tilda-mode') : '',
            n,
            a = 'window' === t396_ab__getFieldValue(i.closest('.t396__artboard'), 'upscale');
        if ('yes' !== i.getAttribute('data-scale-off') || !a || 'edit' === o) {
            var l = t396_elem__getFieldValue(i, e),
                d,
                _ = ['fill', 'hug'],
                s = t396__isElementUsingCalcZoom(i);
            switch (e) {
                case 'left':
                    (l = t396_elem__convertPosition__Local__toAbsolute(i, e, l)),
                        (l = s ? t396__zoomifyValue(i, l) : parseFloat(l).toFixed(1) + 'px'),
                        (i.style.left = l);
                    break;
                case 'top':
                    (l = t396_elem__convertPosition__Local__toAbsolute(i, e, l)),
                        (l = s ? t396__zoomifyValue(i, l) : parseFloat(l).toFixed(1) + 'px'),
                        (i.style.top = l);
                    break;
                case 'width':
                    d = i.getAttribute('data-elem-type');
                    var u = t396_elem__getFieldValue(i, 'widthmode');
                    if ('text' === d && 'autowidth' === t396_elem__getFieldValue(i, 'textfit'))
                        return void (i.style.width = 'auto');
                    if (_.includes(u)) return void (i.style.width = '');
                    switch (((l = t396_elem__getWidth(i, l)), (i.style.width = parseFloat(l).toFixed(1) + 'px'), d)) {
                        case 'tooltip':
                            var c = i.querySelectorAll('.tn-atom__pin-icon');
                            Array.prototype.forEach.call(c, function (t) {
                                var e = parseFloat(l).toFixed(1) + 'px';
                                (t.style.width = e), (t.style.height = e);
                            }),
                                (i.style.height = parseInt(l).toFixed(1) + 'px');
                            break;
                        case 'gallery':
                            t396_elem__setGallerySize(i, 'width', l, s);
                    }
                    break;
                case 'height':
                    d = i.getAttribute('data-elem-type');
                    var g = t396_elem__getFieldValue(i, 'heightmode'),
                        f = t396_elem__getFieldValue(i, 'textfit');
                    if ('text' === d && (['autowidth', 'autoheight'].includes(f) || !f))
                        return void (i.style.height = 'auto');
                    if (_.includes(g) && 'tooltip' !== d) return void (i.style.height = '');
                    if ('tooltip' === d) return;
                    (l = t396_elem__getHeight(i, l)),
                        (i.style.height = parseFloat(l).toFixed(1) + 'px'),
                        'gallery' === d && t396_elem__setGallerySize(i, 'height', l);
                    break;
                case 'container':
                    t396_elem__renderViewOneField(i, 'left'), t396_elem__renderViewOneField(i, 'top');
                    break;
                case 'inputs':
                    var w = i.querySelector('.tn-atom__inputs-textarea');
                    l = w ? w.value : '';
                    try {
                        window.t_zeroForms__renderForm(i, l);
                    } catch (p) {}
            }
            ('width' !== e &&
                'height' !== e &&
                'fontsize' !== e &&
                'fontfamily' !== e &&
                'letterspacing' !== e &&
                'fontweight' !== e &&
                'img' !== e) ||
                (t396_elem__renderViewOneField(i, 'left'), t396_elem__renderViewOneField(i, 'top'));
        }
    }
}
function t396_elem__setGallerySize(t, e, i) {
    var r = i,
        o = t396_elem__getFieldValue(t, 'borderwidth'),
        n = t396_elem__getFieldValue(t, 'borderstyle');
    (n && o && 'none' !== n) || (o = 0), (r -= 2 * o);
    var a = Math.round(parseFloat(r)) + 'px';
    a = t396__zoomifyValue(t, a);
    var l = t.querySelector('.t-slds__main'),
        d = t.querySelectorAll('.tn-atom__slds-img');
    (t.style[e] = a),
        l && (l.style[e] = a),
        Array.prototype.forEach.call(d, function (t) {
            t.style[e] = a;
        });
}
function t396_elem__convertPosition__Local__toAbsolute(t, e, i) {
    var r = t396_getEl(t);
    if (!r) return null;
    var o = r.closest('.t396__artboard'),
        n = o.getAttribute('data-artboard-recid'),
        a = 'ab' + n,
        l = t396_ab__getFieldValue(o, 'valign'),
        d = 'window' === t396_ab__getFieldValue(o, 'upscale'),
        _ = document.getElementById('allrecords'),
        s,
        u = 'edit' === (_ ? _.getAttribute('data-tilda-mode') : ''),
        c = t396_isOnlyScalableBrowser(),
        g = !u && d && c,
        f = !u && d && !c,
        w = t396_elem__getFieldValue(r, 'axisy'),
        p = t396_elem__getFieldValue(r, 'axisx'),
        h = t396_elem__getFieldValue(r, 'container'),
        m = r.classList.contains('tn-group') && 'physical' === t396_group__getFieldValue(r, 'type'),
        b = r.parentNode.closest('.tn-group'),
        v = 'physical' === t396_group__getFieldValue(b, 'type');
    m && (h = h || 'grid');
    var y = parseInt(i),
        F,
        A,
        x,
        V,
        S,
        E,
        k,
        I = t396__getCurrentScaleFactor(n);
    switch (e) {
        case 'left':
            var z,
                B = t396__getWindowDimensions().width,
                L;
            if (
                ((F = 'grid' === h ? 'grid' : 'window'),
                (A = 'grid' === h ? window.tn[a].grid_offset_left : 0),
                (S = 'grid' === h ? window.tn[a].grid_width : B),
                '%' === t396_elem__getFieldValue(r, 'leftunits') && (y = t396_roundFloat((S * y) / 100)),
                v)
            ) {
                var T = parseInt(t396_group__getFieldValue(b, 'left'), 10),
                    O;
                '%' === t396_group__getFieldValue(b, 'leftunits') && (T = t396_roundFloat((S * T) / 100)), (y -= T);
                break;
            }
            !u && d ? 'grid' === h && c && (y *= I) : (y = A + y),
                'center' === p &&
                    ((V = t396_elem__getWidth(r)),
                    g && 'window' !== F && ((S *= I), (V *= I)),
                    (y = S / 2 - V / 2 + y)),
                'right' === p &&
                    ((V = t396_elem__getWidth(r)), g && 'window' !== F && ((S *= I), (V *= I)), (y = S - V + y)),
                g && 'window' !== F && (y += ((V = t396_elem__getWidth(r)) * I - V) / 2);
            break;
        case 'top':
            var H = r.closest('.t396__artboard'),
                R = H ? H.getAttribute('data-artboard-proxy-min-offset-top') : '0',
                q = H ? H.getAttribute('data-artboard-proxy-min-height') : '0',
                W = H ? H.getAttribute('data-artboard-proxy-max-height') : '0',
                M = function t(e) {
                    var i = t396_elem__getHeight(e);
                    if (e && 'image' === e.getAttribute('data-elem-type')) {
                        var r = t396_elem__getWidth(e),
                            o = t396_elem__getFieldValue(e, 'filewidth'),
                            n = t396_elem__getFieldValue(e, 'fileheight'),
                            a;
                        if (o && n) i = r / (parseInt(o) / parseInt(n));
                    }
                    return i;
                },
                C;
            if (
                ((F = 'grid' === h ? 'grid' : 'window'),
                (x = 'grid' === h ? parseFloat(R) : 0),
                (k = 'grid' === h ? parseFloat(q) : parseFloat(W)),
                '%' === t396_elem__getFieldValue(r, 'topunits') && (y = k * (y / 100)),
                v)
            ) {
                var P = parseInt(t396_group__getFieldValue(b, 'top'), 10),
                    N;
                '%' === t396_group__getFieldValue(b, 'topunits') && (P = t396_roundFloat((k * P) / 100)), (y -= P);
                break;
            }
            g && 'window' !== F && (y *= I), f && 'window' !== F && (x = 'stretch' === l ? 0 : x / I), (y = x + y);
            var D = t396_ab__getFieldValue(H, 'height_vh'),
                j = t396_ab__getFieldValue(H, 'height'),
                G = t396_ab__getHeight(H),
                Z;
            if (
                (d && !u && D && (Z = parseInt(j, 10) * I),
                'center' === w &&
                    ((E = M(r)),
                    g &&
                        'window' !== F &&
                        ('stretch' !== l ? (k *= I) : (k = Z ? (Z > G ? Z : G) : H.clientHeight), (E *= I)),
                    u ||
                        !d ||
                        c ||
                        'window' === F ||
                        'stretch' !== l ||
                        ((k = Z ? (Z > G ? Z : G) : H.clientHeight), (k /= I)),
                    (y = k / 2 - E / 2 + y)),
                'bottom' === w &&
                    ((E = M(r)),
                    g &&
                        'window' !== F &&
                        ('stretch' !== l ? (k *= I) : (k = Z ? (Z > G ? Z : G) : H.clientHeight), (E *= I)),
                    u ||
                        !d ||
                        c ||
                        'window' === F ||
                        'stretch' !== l ||
                        ((k = Z ? (Z > G ? Z : G) : H.clientHeight), (k /= I)),
                    (y = k - E + y)),
                g && 'window' !== F)
            ) {
                var U = ((E = M(r)) * I - E) / 2;
                y += U = Math.round(U);
            }
    }
    return y;
}
function t396_elem_findFirstLevelParentGroup(t) {
    for (var e = t.closest('.t396__group'); e; ) {
        var i = e.parentElement.closest('.t396__group');
        if (!i) break;
        e = i;
    }
    return e;
}
function t396_ab__getFieldValue(t, e) {
    if (!t) return null;
    var i,
        r = t.getAttribute('data-artboard-recid'),
        o = 'ab' + r,
        n;
    void 0 === window.tn[o] && (t396_initTNobj(r, t), t396_switchResolution(r, t396_detectResolution(r)));
    var a = window.tn[o].curResolution,
        l = window.tn[o].curResolution_max,
        d = window.tn[o].screens;
    if (
        null ===
        (i = a === l ? t.getAttribute('data-artboard-' + e) : t.getAttribute('data-artboard-' + e + '-res-' + a))
    )
        for (var _ = 0; _ < d.length; _++) {
            var s = d[_];
            if (
                !(s <= a) &&
                null !==
                    (i =
                        s === l
                            ? t.getAttribute('data-artboard-' + e)
                            : t.getAttribute('data-artboard-' + e + '-res-' + s))
            )
                break;
        }
    return i;
}
function t396_ab__renderViewOneField(t, e) {
    t396_ab__getFieldValue(t, e);
}
function t396_core__getFieldValue(t, e) {
    return t.classList.contains('t396__elem') ? t396_elem__getFieldValue(t, e) : t396_group__getFieldValue(t, e);
}
function t396_group__getFieldValue(t, e) {
    if (!t) return null;
    var i,
        r,
        o = 'ab' + t.closest('.t396__artboard').getAttribute('data-artboard-recid'),
        n = window.tn[o].curResolution,
        a = window.tn[o].curResolution_max,
        l = window.tn[o].screens,
        d = ['widthmode', 'heightmode', 'flex'].includes(e) ? '' : '-value';
    if (
        null ===
        (i = n === a ? t.getAttribute('data-group-' + e + d) : t.getAttribute('data-group-' + e + '-res-' + n + d))
    )
        for (var _ = 0; _ < l.length; _++) {
            var s = l[_];
            if (
                !(s <= n) &&
                null !==
                    (i =
                        s === a
                            ? t.getAttribute('data-group-' + e + d)
                            : t.getAttribute('data-group-' + e + '-res-' + s + d))
            )
                break;
        }
    return i;
}
function t396_allgroups__renderView(t) {
    if (t) {
        var e = t.querySelectorAll('.tn-group'),
            i = Array.prototype.filter.call(e, function (t) {
                return 'physical' === t396_group__getFieldValue(t, 'type');
            });
        Array.prototype.forEach.call(i, function (t) {
            t396_group__renderView(t), t396_allgroups__renderViewAutolayout(t);
        });
    }
}
function t396_allgroups__renderViewAutolayout(t) {
    if (t && t.classList.contains('t396__group-flex')) {
        var e = t396_group__getFieldValue(t, 'widthmode'),
            i = t396_group__getFieldValue(t, 'heightmode');
        'fill' === e
            ? ((t.style.width = '100%'), (t.style.flexShrink = '1'))
            : ((t.style.width = 'hug' === e ? 'min-content' : ''),
              (t.style.height = 'hug' === i ? 'initial' : ''),
              (t.style.flexShrink = ''));
    }
}
function t396_allelems__renderView(t) {
    if (t) {
        var e = t.querySelectorAll('.tn-elem');
        Array.prototype.forEach.call(e, function (t) {
            t396_elem__renderView(t);
        });
    }
}
function t396_ab__getHeight(t, e) {
    var i = e;
    i || (i = t396_ab__getFieldValue(t, 'height')), (i = parseFloat(i));
    var r = t396_ab__getFieldValue(t, 'height_vh');
    if (r && ((r = parseFloat(r)), !isNaN(r))) {
        var o = (t396_ab__getWindowHeight(t) * r) / 100;
        i < o && (i = o);
    }
    return i;
}
function t396_elem__getWidth(t, e) {
    var i = t396_getEl(t),
        r,
        o,
        n = 'ab' + i.closest('.t396__artboard').getAttribute('data-artboard-recid'),
        a = e,
        l,
        d,
        _,
        s;
    (a || (a = t396_elem__getFieldValue(i, 'width')),
    (a = parseFloat(a)),
    '%' === t396_elem__getFieldValue(i, 'widthunits')) &&
        (a =
            'window' === t396_elem__getFieldValue(i, 'container')
                ? (t396__getWindowDimensions().width * a) / 100
                : (window.tn[n].grid_width * a) / 100);
    return a;
}
function t396_elem__getHeight(t, e) {
    var i = t396_getEl(t),
        r = e;
    r || (r = t396_elem__getFieldValue(i, 'height')), (r = parseFloat(r));
    var o = i.getAttribute('data-elem-type'),
        n = t396_elem__getFieldValue(i, 'textfit'),
        a;
    if (
        'shape' === o ||
        'video' === o ||
        'html' === o ||
        'gallery' === o ||
        'button' === o ||
        ('text' === o && 'fixedsize' === n)
    ) {
        var l;
        if ('%' === t396_elem__getFieldValue(i, 'heightunits')) {
            var d = i.closest('.t396__artboard'),
                _ = d ? d.getAttribute('data-artboard-proxy-min-height') : '0',
                s = d ? d.getAttribute('data-artboard-proxy-max-height') : '0',
                u = parseFloat(_),
                c = parseFloat(s),
                g;
            r = 'window' === t396_elem__getFieldValue(i, 'container') ? c * (r / 100) : u * (r / 100);
        }
    } else {
        if ('text' === o) {
            var f = i.querySelector('.tn-atom');
            f && (f.style.lineHeight = '');
        }
        (r = i.clientHeight ? i.clientHeight : t396_elem__getFieldValue(i, 'height')), (r = parseFloat(r));
    }
    return r;
}
function t396_roundFloat(t) {
    return Math.round(100 * t) / 100;
}
function t396_removeElementFromDOM(t) {
    var e = t396_getEl(t);
    e && e.parentNode && e.parentNode.removeChild(e);
}
function t396_getEl(t) {
    return window.jQuery && t instanceof jQuery ? (t.length ? t.get(0) : null) : t;
}
function t396_isBlockVisible(t) {
    var e = window.innerWidth,
        i = t.getAttribute('data-screen-min'),
        r = t.getAttribute('data-screen-max');
    return !(i && e < parseInt(i, 10)) && !(r && e > parseInt(r, 10));
}
function t396__getArtboards(t) {
    var e = document.getElementById('allrecords'),
        i,
        r =
            e && 'edit' === e.getAttribute('data-tilda-mode')
                ? '.record[data-record-type="' +
                  t +
                  '"] .r:not(.t397__off):not(.t395__off):not(.t400__off) .t396__artboard'
                : '.r[data-record-type="' + t + '"]:not(.t397__off):not(.t395__off):not(.t400__off) .t396__artboard';
    return Array.prototype.slice.call(document.querySelectorAll(r));
}
function t396__getZeroBlocks() {
    var t = [].concat(t396__getArtboards('396'), t396__getArtboards('121')),
        e;
    return t.length
        ? t
              .map(function (t) {
                  return { record: t.closest('.r:not(.t397__off):not(.t395__off):not(.t400__off)'), artboard: t };
              })
              .filter(function (t) {
                  return t.record;
              })
        : [];
}
function t396__getBlockEditorWidth() {
    if (!window.tn.isEditMode) return 0;
    var t,
        e = window.getComputedStyle(document.body).getPropertyValue('--page-view-width');
    return e && '100%' !== e ? parseInt(e, 10) : 0;
}
function t396__isAllZeroBlocksRendered(t, e) {
    void 0 === e && (e = 0);
    var i = t396__getZeroBlocks(),
        r = document.getElementById('allrecords'),
        o = r && 'edit' === r.getAttribute('data-tilda-mode'),
        n = 'ready' === document.body.getAttribute('data-ready-status'),
        a = !1;
    if (i.length || !o || n) {
        if (!i.length && o && n)
            return e > 30
                ? void t()
                : void setTimeout(function () {
                      t396__isAllZeroBlocksRendered(t, e + 1);
                  }, 100);
        var l = i.map(function (t) {
                return t.artboard;
            }),
            d;
        if (
            l.every(function (t) {
                return t.classList.contains('rendered');
            })
        )
            t();
        else {
            var _ = l.filter(function (t) {
                return t.classList.contains('rendered');
            });
            l.forEach(function (e) {
                e.classList.contains('rendered') ||
                    e.addEventListener('artBoardRendered', function () {
                        _.push(e), _.length !== l.length || a || t();
                    });
            }),
                setTimeout(function () {
                    (a = !0), _.length !== l.length && t();
                }, 3e3);
        }
    } else {
        var s = new MutationObserver(function (e) {
            e.forEach(function (e) {
                'ready' === e.target.getAttribute('data-ready-status') &&
                    (s.disconnect(), t396__isAllZeroBlocksRendered(t));
            });
        });
        s.observe(document.body, { attributes: !0, attributeFilter: ['data-ready-status'] });
    }
}
function t396__processElementsTransform(t) {
    var e = t396__initFastDOM(),
        i = [];
    e.read(function () {
        Array.prototype.forEach.call(t, function (t) {
            var e = t.getAttribute('data-elem-type');
            if ('text' === e || 'image' === e || 'shape' === e || 'button' === e || 'vector' === e) {
                var r = getComputedStyle(t),
                    o;
                if (
                    (r.backdropFilter && 'none' !== r.backdropFilter) ||
                    (r.webkitBackdropFilter && 'none' !== r.webkitBackdropFilter)
                ) {
                    var n = t.querySelector('.tn-atom'),
                        a = n ? window.getComputedStyle(n).transform : 'none';
                    'matrix(1, 0, 0, 1, 0, 0)' === a && (a = 'none'),
                        'none' !== a && i.push({ element: t, atom: n, atomTransform: a });
                }
            }
        });
    }),
        e.write(function () {
            i.forEach(function (t) {
                (t.atom.style.transform = 'none'), (t.element.style.transform = t.atomTransform);
            });
        });
}
function t396__fixElementsLineHeights(t) {
    var e = t396__initFastDOM(),
        i = [];
    e.read(function () {
        Array.prototype.forEach.call(t, function (t) {
            var e;
            if ('text' === t.getAttribute('data-elem-type')) {
                var r = t.querySelector('.tn-atom');
                if (r) {
                    var o = t.closest('.t396__group');
                    if (!o || !o.style.zoom) {
                        var n = t.style.zoom,
                            a = r.style.webkitTextSizeAdjust,
                            l = r.style.fontSize;
                        i.push({ element: t, atom: r, zoom: n, textSizeAdjust: a, fontSize: l });
                    }
                }
            }
        });
    }),
        e.write(function () {
            i.forEach(function (t) {
                t.atom.style.removeProperty('line-height'),
                    window.t396__isSafari &&
                        t.zoom &&
                        ((t.atom.style.webkitTextSizeAdjust = 'none'),
                        (t.atom.style.fontSize = ''),
                        (t.element.style.zoom = ''));
            });
        }),
        e.read(function () {
            i.forEach(function (t) {
                t.computedLineHeight = parseFloat(window.getComputedStyle(t.atom).lineHeight);
            });
        }),
        e.write(function () {
            i.forEach(function (t) {
                var e = t.computedLineHeight;
                window.t396__isSafari &&
                    t.zoom &&
                    ((t.atom.style.webkitTextSizeAdjust = t.textSizeAdjust),
                    (t.atom.style.fontSize = t.fontSize),
                    t.zoom && (t.element.style.zoom = t.zoom)),
                    e && !isNaN(e) && (t.atom.style.lineHeight = Math.round(e) + 'px');
            });
        });
}
function t396__fixElementsFontSizes(t) {
    var e;
    if (
        (!window.t396__isMobile && window.t396__isIPad) ||
        window.t396__isFacebookMessengerInApp ||
        window.t396__isInstagramInApp
    ) {
        var i = t396__initFastDOM(),
            r = [];
        i.read(function () {
            Array.prototype.forEach.call(t, function (t) {
                var e = t.getAttribute('data-elem-type');
                if ('text' === e || 'button' === e) {
                    var i = t.querySelector('.tn-atom');
                    if (i) {
                        var o = t396_elem_findFirstLevelParentGroup(t),
                            n = { element: t, atom: i, zoom: 1 };
                        o && o.style.zoom && (n.zoom = parseFloat(o.style.zoom)), 1 !== n.zoom && r.push(n);
                    }
                }
            });
        }),
            i.write(function () {
                r.forEach(function (t) {
                    t.atom.style.fontSize = '';
                });
            }),
            i.read(function () {
                r.forEach(function (t) {
                    var e = parseFloat(window.getComputedStyle(t.atom).fontSize);
                    t.correctFontSize = e * Math.pow(t.zoom, 2);
                });
            }),
            i.write(function () {
                r.forEach(function (t) {
                    t.atom.style.fontSize = Math.floor(t.correctFontSize) + 'px';
                });
            });
    }
}
function t396__initFastDOM() {
    return {
        read: function t(e) {
            e();
        },
        write: function t(e) {
            e();
        },
    };
}
function t396__applyFixesForAllElements() {
    var t = document.querySelectorAll('.t396__elem'),
        e = window.t396__isSafari || window.t396__isFacebookMessengerInApp || window.t396__isInstagramInApp;
    document.fonts && e
        ? document.fonts.ready.then(function () {
              t396__fixElementsFontSizes(t), t396__fixElementsLineHeights(t);
          })
        : t396__fixElementsLineHeights(t),
        t396__processElementsTransform(t);
}
function t396__zoomifyValue(t, e) {
    var i,
        r = e + (String(e).endsWith('px') ? '' : 'px'),
        o;
    return t396__isInsideGroupWithZoom(t) ? r : 'calc(' + r + ' * var(--zoom, 1))';
}
function t396__isInsideGroupWithZoom(t) {
    for (var e = t.closest('.t396__group'); e; ) {
        var i;
        if (e.style.zoom) return !0;
        e = null == (i = e.parentElement) ? void 0 : i.closest('.t396__group');
    }
    return !1;
}
function t396__isInPopup(t) {
    if (!t) return !1;
    var e = t.getAttribute('data-artboard-recid'),
        i,
        r;
    return document.getElementById('rec' + e).parentNode.classList.contains('t-popup__container');
}
function t396__waitForPopup() {
    return new Promise(function (t) {
        var e = 0,
            i = 5;
        function r() {
            var i = document.querySelector('.t-popup_show');
            i ? t(i) : e >= 5 ? t(null) : (e++, setTimeout(r, 100 * e));
        }
        r();
    });
}
function t396__shouldUseVisualViewportHeight() {
    return 'visualViewport' in window && window.t396__isMobile && window.t396__isSafari;
}
