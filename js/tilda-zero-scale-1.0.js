function t396_scaleBlock(e) {
    var t = t396_detectResolution(e),
        a = document.getElementById('rec' + e);
    if (a) {
        var l;
        'function' == typeof window.t396__getCurrentScaleFactor
            ? (l = t396__getCurrentScaleFactor(e))
            : (l = window.tn && window.tn['ab' + e] && window.tn['ab' + e].scaleFactor) || (l = window.tn_scale_factor);
        var n = a.querySelector('.t396__artboard'),
            o = t396_scale__collectScaleData(n, l);
        if (n && 0 !== o.length) {
            var r = t396_ab__getFieldValue(n, 'height'),
                c = Math.floor(r * l),
                i,
                _;
            if (t396_ab__getFieldValue(n, 'height_vh')) {
                var s = t396_ab__getFieldValue(n, 'height'),
                    d = t396_ab__getHeight(n),
                    u = s * l;
                c = u >= d ? u : d;
            }
            if ((t396_scale__updateArtboardState(n, c), t396_isOnlyScalableBrowser()))
                t396_scale__scaleIsOnlyScalableBlock(o);
            else {
                var m = o.filter(function (e) {
                        var t = e.elemType;
                        return 'text' === t || 'button' === t;
                    }),
                    h = o.filter(function (e) {
                        var t;
                        return 'shape' === e.elemType;
                    }),
                    p = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                p && t396_scale__schedule__scaleTextElements(m),
                    t396_scale__schedule__scaleShapeElements(h),
                    o.forEach(function (e) {
                        var a = e.element,
                            n = e.elementCore,
                            o = e.elemType,
                            r = 'gallery' === o;
                        'yes' === a.getAttribute('data-scale-off') || r || (a.style.zoom = l),
                            r && (a.style.zoom = null),
                            'text' === o && t < 1200 && n && !p && (n.style.webkitTextSizeAdjust = 'auto'),
                            n && (n.style.transformOrigin = 'center');
                    });
            }
        }
    }
}
function t396_scale__schedule__scaleTextElements(e) {
    window.tn || (window.tn = {}),
        window.tn.scheduledTextElementsForScale || (window.tn.scheduledTextElementsForScale = []),
        (window.tn.scheduledTextElementsForScale = window.tn.scheduledTextElementsForScale.concat(e)),
        clearTimeout(window.tn.textElementsScaleTimer),
        (window.tn.textElementsScaleTimer = setTimeout(function () {
            t396_scale__scaleTextElements(window.tn.scheduledTextElementsForScale),
                (window.tn.scheduledTextElementsForScale = []);
        }, 1));
}
function t396_scale__scaleTextElements(e) {
    var t = t396__initFastDOM();
    t.write(function () {
        e.forEach(function (e) {
            e.element.style.zoom = '';
        });
    }),
        t.read(function () {
            e.forEach(function (e) {
                (e.cachedFontSize = parseFloat(getComputedStyle(e.elementCore).fontSize)),
                    (e.cachedTextSizeAdjust = e.elementCore.style.webkitTextSizeAdjust);
            });
        }),
        t.write(function () {
            e.forEach(function (e) {
                (e.elementCore.style.webkitTextSizeAdjust = 'none'), (e.element.style.zoom = e.scaleFactor);
            });
        }),
        t.read(function () {
            e.forEach(function (e) {
                e.currentFontSize = parseFloat(getComputedStyle(e.elementCore).fontSize);
            });
        }),
        t.write(function () {
            e.forEach(function (e) {
                var t = Math.abs(e.cachedFontSize - e.currentFontSize);
                (e.elementCore.style.webkitTextSizeAdjust = t >= 1 ? 'none' : e.cachedTextSizeAdjust),
                    t >= 1 && (e.elementCore.style.fontSize = Math.round(e.cachedFontSize * e.scaleFactor) + 'px');
            });
        });
}
function t396_scale__schedule__scaleShapeElements(e) {
    window.tn || (window.tn = {}),
        window.tn.scheduledShapeElementsForScale || (window.tn.scheduledShapeElementsForScale = []),
        (window.tn.scheduledShapeElementsForScale = window.tn.scheduledShapeElementsForScale.concat(e)),
        clearTimeout(window.tn.shapeElementsScaleTimer),
        (window.tn.shapeElementsScaleTimer = setTimeout(function () {
            t396_scale__scaleShapeElements(window.tn.scheduledShapeElementsForScale),
                (window.tn.scheduledShapeElementsForScale = []);
        }, 1));
}
function t396_scale__scaleShapeElements(e) {
    var t = t396__initFastDOM();
    t.read(function () {
        e.forEach(function (e) {
            var t = t396_elem__getFieldValue(e.element, 'height');
            (t = t396_elem__getHeight(e.element, t)),
                (t = t396_elem__convertPosition__Local__toAbsolute(e.element, 'height', t));
            var a = t396_elem__getFieldValue(e.element, 'width');
            (a = t396_elem__getWidth(e.element, a)),
                (a = t396_elem__convertPosition__Local__toAbsolute(e.element, 'width', a));
            var l = parseFloat(t396_elem__getFieldValue(e.element, 'top'));
            l = t396_elem__convertPosition__Local__toAbsolute(e.element, 'top', l);
            var n = parseFloat(t396_elem__getFieldValue(e.element, 'left'));
            (n = t396_elem__convertPosition__Local__toAbsolute(e.element, 'left', n)),
                (e.shapeSize = { top: l, left: n, width: a, height: t });
        });
    });
    var a = e.filter(function (e) {
        return e.shapeSize.width <= 2 || e.shapeSize.height <= 2;
    });
    t.read(function () {
        a.forEach(function (e) {
            var t = window.getComputedStyle(e.elementCore);
            (e.borderWidth = t.borderWidth),
                (e.isImage = 'none' !== t.backgroundImage),
                (e.isAnimated = e.element.getAttribute('data-animate-sbs-event'));
        });
    }),
        t.write(function () {
            a.forEach(function (e) {
                if ('0px' === e.borderWidth && !e.isImage && !e.isAnimated) {
                    e.element.style.removeProperty('zoom');
                    var t = e.shapeSize.width * e.scaleFactor,
                        a = e.shapeSize.height * e.scaleFactor,
                        l = e.shapeSize.top * e.scaleFactor,
                        n = e.shapeSize.left * e.scaleFactor;
                    (e.element.style.width = parseFloat(t) + 'px'),
                        (e.element.style.height = parseFloat(a) + 'px'),
                        (e.element.style.top = Math.round(l) + 'px'),
                        (e.element.style.left = Math.round(n) + 'px'),
                        e.element.setAttribute('data-scale-off', 'yes');
                }
            });
        });
}
function t396_scale__collectScaleData(e, t) {
    var a;
    return t396_scale__getElementsToScale(e)
        .map(function (e) {
            var a = e.querySelector('.tn-molecule, .tn-atom'),
                l = t396_scale__getElementType(e),
                n = t396_elem__getFieldValue(e, 'container');
            if ((n || 'group' !== l || (n = 'grid'), a && 'grid' === n))
                return { element: e, elementCore: a, elemType: l, scaleFactor: t };
        })
        .filter(Boolean);
}
function t396_scale__scaleIsOnlyScalableBlock(e) {
    e.forEach(function (e) {
        var t = e.element,
            a = e.elementCore,
            l = e.elemType,
            n = a.closest('.tn-atom__scale-wrapper');
        n ||
            (t396_scale__wrapElement(a, currentScaleFactor, 'tn-atom__scale-wrapper'),
            (n = a.closest('.tn-atom__scale-wrapper'))),
            (t.style.zoom = ''),
            t396_scale__processBackdropFilter(t, a, n),
            t396_scale__processBackgroundForShape(t, a, l, currentScaleFactor);
    });
}
function t396_scale__getElementsToScale(e) {
    return e
        ? Array.prototype.slice.call(e.children).filter(function (e) {
              return e && (e.classList.contains('t396__elem') || e.classList.contains('t396__group'));
          })
        : [];
}
function t396_scale__updateArtboardState(e, t) {
    e.classList.add('t396__artboard_scale');
    var a = e.getAttribute('data-artboard-recid'),
        l;
    if (!('hug' === e.getAttribute('data-artboard-heightmode'))) {
        var n =
            '<style class="t396__scale-style">.t-rec#rec' +
            a +
            ' { overflow: visible; }#rec' +
            a +
            ' .t396__artboard:not(.t396__artboard-flex),#rec' +
            a +
            ' .t396__artboard:not(.t396__artboard-flex) .t396__carrier,#rec' +
            a +
            ' .t396__artboard:not(.t396__artboard-flex) .t396__filter { width: 100vw !important; max-width: 100%;}#rec' +
            a +
            ' .t396__carrier,#rec' +
            a +
            ' .t396__filter,#rec' +
            a +
            ' .t396__artboard {height: ' +
            t +
            'px !important;}</style>';
        e.insertAdjacentHTML('beforeend', n);
    }
}
function t396_scale__wrapElement(e, t, a) {
    if (e) {
        var l = e.parentNode;
        if (l) {
            var n = document.createElement('div');
            n.classList.add(a), (n.style.transform = 'scale(' + t + ')'), n.appendChild(e), l.appendChild(n);
        }
    }
}
function t396_scale__processBackdropFilter(e, t, a) {
    'none' === e.style.backdropFilter && (e.style.backdropFilter = '');
    var l = getComputedStyle(e).backdropFilter;
    if (l) {
        (e.style.backdropFilter = 'none'), (a.style.backdropFilter = l);
        var n = getComputedStyle(t).borderRadius;
        '0px' !== n && (a.style.borderRadius = n);
    }
}
function t396_scale__processBackgroundForShape(e, t, a, l) {
    if ('shape' === a) {
        var n = t && getComputedStyle(t),
            o;
        if (n)
            if (((n && n.backgroundImage) || t.getAttribute('data-original')) && 'fixed' === n.backgroundAttachment) {
                e.removeChild(t.parentNode), e.appendChild(t);
                var r = t396_elem__getFieldValue(e, 'height');
                (r = t396_elem__getHeight(e, r)), (r = t396_elem__convertPosition__Local__toAbsolute(e, 'height', r));
                var c = t396_elem__getFieldValue(e, 'width');
                (c = t396_elem__getWidth(e, c)), (c = t396_elem__convertPosition__Local__toAbsolute(e, 'width', c));
                var i = parseFloat(t396_elem__getFieldValue(e, 'top')),
                    _ = parseFloat(t396_elem__getFieldValue(e, 'left'));
                (e.style.top = i * l + 'px'),
                    (e.style.left = _ * l + 'px'),
                    (e.style.height = r * l + 'px'),
                    (e.style.width = c * l + 'px'),
                    e.setAttribute('data-scale-off', 'yes');
            }
    }
}
function t396_scale__getElementType(e) {
    var t = e.getAttribute('data-elem-type');
    return !t && e.classList.contains('tn-group') && (t = 'group'), t;
}
window.t396_initialScale || (window.t396_initialScale = function () {});
