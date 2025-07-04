function _await$1(t, e, r) {
    return r ? (e ? e(t) : t) : ((t && t.then) || (t = Promise.resolve(t)), e ? t.then(e) : t);
}
var FORMS_API_FIELD = {
    EMAIL: 'em',
    PHONE: 'ph',
    NAME: 'nm',
    CONTACT_METHOD: 'contact_method',
    INPUT: 'in',
    TEXTAREA: 'ta',
    DATE: 'da',
    TEXT: 'tx',
    URL: 'ur',
    HIDDEN: 'hd',
    SELECT: 'sb',
    TIME: 'tm',
    VARIANTS: 'rd',
    IMAGE_VARIANTS: 'ri',
    RATING: 'rs',
    CHECKBOX: 'cb',
    FILE: 'uw',
    UPLOADCARE_FILE: 'uc',
    DELIVERY: 'dl',
    SAVE_CONTACT: 'sf',
    PROMOCODE: 'pc',
    QUANTITY: 'qn',
    RANGE: 'rg',
    CALC: 'fr',
    WHITESPACE: 'ws',
};
function _catch$1(t, e) {
    try {
        var r = t();
    } catch (o) {
        return e(o);
    }
    return r && r.then ? r.then(void 0, e) : r;
}
var t_formsApi__safeValue = function t(e) {
    return e ? e.value : '';
};
function _async$1(t) {
    return function () {
        for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
        try {
            return Promise.resolve(t.apply(this, e));
        } catch (o) {
            return Promise.reject(o);
        }
    };
}
var t_formsApi__safeFocus = function t(e) {
        return e && e.focus();
    },
    t_formsApi__sendChange = function t(e) {
        return e && e.dispatchEvent(new Event('change'));
    },
    t_formsApi__sendReset = function t(e) {
        return e && e.dispatchEvent(new CustomEvent('reset'));
    },
    t_formsApi__safeSetValue = function t(e, r, o) {
        var n,
            a = (o || {}).silent,
            i = void 0 !== a && a;
        return e && e.value !== r && ((e.value = r), i || t_formsApi__sendChange(e)), r;
    },
    t_formsApi__guessFieldName = function t(e) {
        var r = e.querySelector('.js-tilda-rule[name]');
        return r ? r.name : '';
    },
    t_formsApi__getFieldData = function t(e) {
        var r = e.dataset,
            o = r.inputLid,
            n = r.fieldType,
            a = r.fieldName,
            i = r.fieldAsync,
            s = r.defaultValue,
            l;
        return {
            lid: o,
            fieldType: n,
            fieldName: a || t_formsApi__guessFieldName(e),
            isAsync: 'true' === i,
            defaultValue: s,
        };
    },
    t_formsApi__waitForFieldReadyState = function t(e) {
        return new Promise(function (t) {
            var r = function r() {
                    e.element.setAttribute('data-input-ready', 'true'), t(e);
                },
                o = 'true' === e.element.getAttribute('data-input-ready');
            e.data.isAsync && !o ? e.element.addEventListener('inputReady', r, { once: !0 }) : r();
        });
    },
    t_formsApi__sortFieldsBeforeClear = function t(e) {
        return e.data.fieldType === FORMS_API_FIELD.CALC ? 1 : -1;
    },
    t_formsApi__isConditionalForm = function t(e) {
        return e.classList.contains('t-conditional-form') || e.querySelector('.t-conditional');
    },
    t_formsApi__getTildaField = function t(e) {
        if (!e) throw new Error('inputGroup element is missing');
        var r = t_formsApi__getFieldData(e),
            o = r.lid,
            n = r.fieldType,
            a = r.fieldName;
        if (!o || !n || !a) throw new Error('Please, set all the required data-attrs to initialize FormInput.');
        var i = function t() {
                return e.querySelector('[name="' + a + '"]');
            },
            s = function t() {
                var e = i();
                return { value: t_formsApi__safeValue(e) };
            },
            l = [],
            c = new Map(),
            u,
            d,
            m,
            _ = {
                element: e,
                data: r,
                getValue: s,
                onChange: function t(e, r) {
                    var o,
                        n = (r || {}).uniqueKey;
                    if (n) {
                        var a;
                        if (c.has(n)) return;
                        c.set(n, e);
                    } else l.push(e);
                },
                focus: function t() {
                    var e = i();
                    t_formsApi__safeFocus(e);
                },
                reset: function t() {
                    var e = i(),
                        o = r.defaultValue || '';
                    t_formsApi__safeSetValue(e, o, { silent: !0 });
                },
                onFieldReady: function t() {
                    return t_formsApi__waitForFieldReadyState(_);
                },
                _onChangeCallbacks: l,
                _uniqueOnChangeCallbacks: c,
            },
            f = function t(e) {
                l.forEach(function (t) {
                    return t({ event: e, field: _ });
                }),
                    c.forEach(function (t) {
                        return t({ event: e, field: _ });
                    });
            };
        return e.addEventListener('change', f), (e.t_field = _), _;
    },
    t_formsApi__radioFieldMixin = function t(e) {
        return (
            (e.data.inputs = Array.from(e.element.querySelectorAll('[type="radio"]'))),
            (e.getValue = function () {
                var t = e.data.inputs.find(function (t) {
                    return t.checked;
                });
                return { value: t_formsApi__safeValue(t) };
            }),
            (e.reset = function () {
                var t = Number(e.data.defaultValue),
                    r = null != t && t > 0;
                e.data.inputs.forEach(function (e, o) {
                    e.checked = !(!r || t !== o + 1);
                }),
                    e.data.ownVariantInput && t_formsApi__sendReset(e.data.ownVariantInput);
            }),
            e
        );
    },
    t_formsApi__ownVariantMixin = function t(e) {
        return (
            (e.onFieldReady = function () {
                return t_formsApi__waitForFieldReadyState(e).then(function () {
                    var t = e.element.querySelector('.t-radio-ownanswer, .t-checkbox-ownanswer'),
                        r = t ? t.getAttribute('data-own-variant-title') : '';
                    return (e.data.ownVariantInput = t), (e.data.ownVariantTitle = r), e;
                });
            }),
            e
        );
    },
    t_formsApi__checkboxesMixin = function t(e) {
        return (
            (e.data.inputs = Array.from(e.element.querySelectorAll('[type="checkbox"]'))),
            (e.focus = function () {
                var t = e.element.querySelector('[type="checkbox"]');
                t_formsApi__safeFocus(t);
            }),
            (e.reset = function () {
                var t = e.element.querySelector('[name="' + e.data.fieldName + '"]'),
                    r = Number(e.data.defaultValue),
                    o = null != r && r > 0;
                t_formsApi__safeSetValue(t, '', { silent: !0 }),
                    e.data.ownVariantInput && t_formsApi__sendReset(e.data.ownVariantInput),
                    e.data.inputs.forEach(function (t) {
                        return (t.checked = !1);
                    }),
                    e.data.inputs.forEach(function (t, e) {
                        var n;
                        o && r === e + 1 && t.click();
                    });
            }),
            e
        );
    },
    t_formsApi__getUploadWidgetField = function t(e) {
        var r = t_formsApi__getTildaField(e);
        return (
            (r.onFieldReady = function () {
                return t_formsApi__waitForFieldReadyState(r).then(function () {
                    return (
                        r.element.addEventListener('uwFileUploaded', function () {
                            return t_formsApi__sendChange(r.element);
                        }),
                        r.element.addEventListener('uwFileRemoved', function () {
                            return t_formsApi__sendChange(r.element);
                        }),
                        r
                    );
                });
            }),
            (r.getValue = function () {
                var t, o;
                return {
                    value: Array.from(e.querySelectorAll('[name^="' + r.data.fieldName + '"]'))
                        .map(function (t) {
                            return t_formsApi__safeValue(t);
                        })
                        .filter(Boolean)
                        .join('; '),
                };
            }),
            (r.focus = function () {
                r.element.scrollIntoView({ block: 'center' });
            }),
            (r.reset = function () {
                t_formsApi__sendReset(r.element);
            }),
            r
        );
    },
    t_formsApi__getUploadCareField = function t(e) {
        try {
            var r = t_formsApi__getTildaField(e);
            return (
                (r.onFieldReady = function () {
                    return new Promise(function (t) {
                        t_onFuncLoad('uploadcare', function () {
                            (r.data.widget = window.uploadcare.Widget(
                                '[data-input-lid="' + r.data.lid + '"] [role="uploadcare-uploader"]',
                            )),
                                r.data.widget.onUploadComplete.add(function () {
                                    return t_formsApi__sendChange(r.element);
                                }),
                                t(r);
                        });
                    });
                }),
                (r.focus = function () {
                    r.element.scrollIntoView({ block: 'center' });
                }),
                (r.reset = function () {
                    var t = r.data.widget;
                    t_formsApi__safeSetValue(t.inputElement, '', { silent: !0 }), t.reloadInfo();
                }),
                r
            );
        } catch (o) {
            return console.error(o), null;
        }
    },
    t_formsApi__getContactMethodField = function t(e) {
        var r = t_formsApi__getTildaField(e),
            o = (r.data.fieldName || '').split(';'),
            n = o[0],
            a = o[1];
        (r.data.isContactMethod = !0), (r.data.typeInputName = n), (r.data.idInputName = a);
        var i,
            s = Array.from(e.querySelectorAll('.t-contact-method__type')).map(function (t) {
                var e = t.querySelector('[name=' + r.data.typeInputName + ']');
                return { wrapper: t, input: e, displayText: t.textContent.trim() };
            });
        return (
            (r.getValue = function () {
                var t,
                    o = t_formsApi__safeValue(e.querySelector('[name="' + r.data.idInputName + '"]:not([disabled])')),
                    n = s.find(function (t) {
                        return t.input.checked;
                    }),
                    a = t_formsApi__safeValue(n.input),
                    i = n ? n.displayText : '';
                return {
                    value:
                        ((t = {}),
                        (t[r.data.idInputName] = { value: o }),
                        (t[r.data.typeInputName] = { value: a, typeInputDisplayText: i }),
                        t),
                };
            }),
            (r.focus = function () {
                var t,
                    e = r.element
                        .querySelector('.t-contact-method__value-container > :not(.t-contact-method__hidden)')
                        .querySelector('.t-input-block:not(.t-contact-method__hidden)'),
                    o = e.querySelector('.js-username-input');
                if (o) t_formsApi__safeFocus(o);
                else {
                    var n = e.querySelector('.t-input[type="tel"]');
                    t_formsApi__safeFocus(n);
                }
            }),
            (r.reset = function () {
                t_formsApi__sendReset(r.element);
            }),
            r
        );
    },
    t_formsApi__getCheckboxField = function t(e) {
        var r = t_formsApi__getTildaField(e);
        return (
            (r.getValue = function () {
                var t = e.querySelector('[name="' + r.data.fieldName + '"]');
                return { value: t && t.checked ? 'yes' : 'no' };
            }),
            (r.reset = function () {
                var t = e.querySelector('[name="' + r.data.fieldName + '"]'),
                    o = r.data.defaultValue;
                t.checked = 'y' === o;
            }),
            r
        );
    },
    t_formsApi__getRadioButtonsField = function t(e) {
        return t_formsApi__ownVariantMixin(t_formsApi__radioFieldMixin(t_formsApi__getTildaField(e)));
    },
    t_formsApi__getCheckboxesField = function t(e) {
        return t_formsApi__ownVariantMixin(t_formsApi__checkboxesMixin(t_formsApi__getTildaField(e)));
    },
    t_formsApi__getRadioImagesField = function t(e) {
        return t_formsApi__radioFieldMixin(t_formsApi__getTildaField(e));
    },
    t_formsApi__getCheckboxImagesField = function t(e) {
        return t_formsApi__checkboxesMixin(t_formsApi__getTildaField(e));
    },
    t_formsApi__getRatingField = function t(e) {
        var r = t_formsApi__radioFieldMixin(t_formsApi__getTildaField(e)),
            o = r.reset;
        return (
            (r.reset = function () {
                for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                o.call.apply(o, [this].concat(e)), t_formsApi__sendReset(r.element);
            }),
            r
        );
    },
    t_formsApi__getBasicDeliveryField = function t(e) {
        var r = t_formsApi__radioFieldMixin(t_formsApi__getTildaField(e));
        return (
            (r.getValue = function () {
                var t = r.data.inputs.find(function (t) {
                        return t.checked;
                    }),
                    e = t ? t.getAttribute('data-delivery-price') : null,
                    o = t_formsApi__safeValue(t);
                return e && (o = o.split('=')[0]), { value: o, deliveryPrice: e };
            }),
            r
        );
    },
    t_formsApi__getPhoneField = function t(e) {
        var r = t_formsApi__getTildaField(e);
        return (
            (r.focus = function () {
                var t = r.element.querySelector('.t-input[type="tel"]');
                t_formsApi__safeFocus(t);
            }),
            (r.reset = function () {
                t_formsApi__sendReset(r.element);
                var t = r.element.querySelector('.t-input[type="tel"]');
                t_formsApi__safeSetValue(t, '', { silent: !0 });
            }),
            r
        );
    },
    t_formsApi__getSelectboxField = function t(e) {
        try {
            var r = t_formsApi__getTildaField(e),
                o = r.element.querySelector('[name="' + r.data.fieldName + '"]');
            return (
                (r.reset = function () {
                    if (o) {
                        var t = o.options[0],
                            e = t && '' === t.value,
                            n = Number(r.data.defaultValue) || 0,
                            a = Math.max(0, e ? n : n - 1),
                            i;
                        o.options[a].selected = !0;
                    }
                }),
                r
            );
        } catch (n) {
            return console.error(n), null;
        }
    },
    t_formsApi__getCalculatorField = function t(e) {
        try {
            var r = t_formsApi__getTildaField(e);
            return (
                (r.reset = function () {
                    r.element.dispatchEvent(new CustomEvent('recalculate'));
                }),
                r
            );
        } catch (o) {
            return console.error(o), null;
        }
    },
    t_formsApi__getFieldConstructor = function t(e) {
        var r = e.getAttribute('data-field-type'),
            o = 'cb' === e.getAttribute('data-field-radcb');
        switch (r) {
            case FORMS_API_FIELD.VARIANTS:
                return o ? t_formsApi__getCheckboxesField(e) : t_formsApi__getRadioButtonsField(e);
            case FORMS_API_FIELD.IMAGE_VARIANTS:
                return o ? t_formsApi__getCheckboxImagesField(e) : t_formsApi__getRadioImagesField(e);
            case FORMS_API_FIELD.FILE:
                return t_formsApi__getUploadWidgetField(e);
            case FORMS_API_FIELD.CONTACT_METHOD:
                return t_formsApi__getContactMethodField(e);
            case FORMS_API_FIELD.CHECKBOX:
                return t_formsApi__getCheckboxField(e);
            case FORMS_API_FIELD.UPLOADCARE_FILE:
                return t_formsApi__getUploadCareField(e);
            case FORMS_API_FIELD.RATING:
                return t_formsApi__getRatingField(e);
            case FORMS_API_FIELD.DELIVERY:
                return t_formsApi__getBasicDeliveryField(e);
            case FORMS_API_FIELD.PHONE:
                return t_formsApi__getPhoneField(e);
            case FORMS_API_FIELD.SELECT:
                return t_formsApi__getSelectboxField(e);
            case FORMS_API_FIELD.CALC:
                return t_formsApi__getCalculatorField(e);
            default:
                return t_formsApi__getTildaField(e);
        }
    },
    t_formsApi__initTildaField = function t(e) {
        return new Promise(function (t, r) {
            var o = e.t_field;
            if (o) return t(o);
            var n = t_formsApi__getFieldConstructor(e);
            return n || r(new Error('Error while trying to initialize TildaField Api.')), n.onFieldReady().then(t);
        });
    },
    t_formsApi__clearForm = _async$1(function (t) {
        return _catch$1(
            function () {
                if (!(t instanceof HTMLFormElement)) throw new Error('Must be called on a form element');
                var e = t.closest('.t-rec'),
                    r,
                    o = Array.from(t.querySelectorAll('.t-input-group')).map(t_formsApi__initTildaField);
                return _await$1(Promise.allSettled(o), function (r) {
                    var o, n;
                    r
                        .filter(function (t) {
                            return 'fulfilled' === t.status;
                        })
                        .map(function (t) {
                            return t.value;
                        })
                        .sort(t_formsApi__sortFieldsBeforeClear)
                        .forEach(function (t) {
                            return t.reset && t.reset();
                        }),
                        t_formsApi__isConditionalForm(t) &&
                            e.dispatchEvent(
                                new CustomEvent('sync-conditionals', { detail: { shouldPreventSubmit: !1 } }),
                            );
                });
            },
            function (t) {
                console.error('Error trying to clear form:', t);
            },
        );
    });
function _await(t, e, r) {
    return r ? (e ? e(t) : t) : ((t && t.then) || (t = Promise.resolve(t)), e ? t.then(e) : t);
}
var t_forms__updateAllVariables = _async(function (t) {
    return _continueIgnored(
        _catch(
            function () {
                var e = t.closest('.t-rec'),
                    r = t_forms__getUsedVariables([e], { unique: !0 }),
                    o;
                r.filter(t_forms__isSystemVariable).forEach(function (t) {
                    return t_forms__updateSystemVariable(e, e, t);
                });
                var n,
                    a = r
                        .filter(function (t) {
                            return !t_forms__isSystemVariable(t);
                        })
                        .map(
                            _async(function (t) {
                                var r = t_forms__findFormField(e, t.name);
                                return r
                                    ? _await(t_formsApi__initTildaField(r), function (r) {
                                          return r
                                              ? (t_forms__updateInputVariable(e, t, r), Promise.resolve())
                                              : Promise.resolve();
                                      })
                                    : Promise.resolve();
                            }),
                        );
                return _awaitIgnored(Promise.all(a));
            },
            function (t) {
                console.error('Failed to update variabls in rec:', t);
            },
        ),
    );
});
function _catch(t, e) {
    try {
        var r = t();
    } catch (o) {
        return e(o);
    }
    return r && r.then ? r.then(void 0, e) : r;
}
var t_forms__focusInput = _async(function (t) {
    if (t) {
        var e = t.closest('.t-input-group');
        if (e)
            return _continueIgnored(
                _catch(
                    function () {
                        return _await(t_formsApi__initTildaField(e), function (t) {
                            t.focus();
                        });
                    },
                    function () {
                        t.focus();
                    },
                ),
            );
    }
});
function _empty() {}
function _continueIgnored(t) {
    if (t && t.then) return t.then(_empty);
}
function _async(t) {
    return function () {
        for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
        try {
            return Promise.resolve(t.apply(this, e));
        } catch (o) {
            return Promise.reject(o);
        }
    };
}
function _awaitIgnored(t, e) {
    if (!e) return t && t.then ? t.then(_empty) : Promise.resolve();
}
function t_forms__setupCloseHandlers(t, e) {
    var r = document.body,
        o = t.querySelector('.t-form-success-popup__close-icon'),
        n = document.getElementById('tildaformsuccesspopupbtn-new');
    function a() {
        o && o.removeEventListener('click', window.tildaForm.handleClosePopup),
            n && n.removeEventListener('click', window.tildaForm.handleClosePopup),
            r.removeEventListener('keydown', i),
            t.removeEventListener('click', s);
    }
    function i(t) {
        ('Escape' !== t.key && 27 != t.keyCode) || window.tildaForm.handleClosePopup();
    }
    function s(e) {
        e.target === t && window.tildaForm.handleClosePopup();
    }
    (window.tildaForm.currentRemoveCloseHandlers = a),
        o && o.addEventListener('click', window.tildaForm.handleClosePopup),
        n && n.addEventListener('click', window.tildaForm.handleClosePopup),
        e || (r.addEventListener('keydown', i), t.addEventListener('click', s));
}
function t_forms__initForms() {
    var t = document.querySelectorAll('.r:not([data-record-type="1093"])');
    (window.t_forms__inputData = {}), t_forms__addRecaptcha();
    var e = t_forms__getCanonicalUrl(),
        r = t_forms__isCachedPage();
    Array.prototype.forEach.call(t, function (t) {
        var o = t.id;
        if (!window.initForms[o]) {
            var n = t_forms__getRecForm(t);
            if (r && n) return t_forms__onCachedPageAction(n, e), void t_forms__offInputsAutocomplete(n);
            if (
                (t_forms__initFormFields(t),
                t_forms__initEventPlaceholder(t),
                t_forms__addInputItsGood(t),
                t_forms__addAttrAction(t),
                t_forms__onSubmit(t),
                t_forms__onClick(t),
                t_forms__onRender(t),
                t_forms__addFocusOnTab(t),
                t_onFuncLoad('t_throttle', function () {
                    window.addEventListener(
                        'resize',
                        t_throttle(function () {
                            t_forms__calculateInputsWidth(o);
                        }),
                    );
                }),
                (window.initForms[o] = !0),
                n && t_forms__isNewSuccessBox(n))
            ) {
                n.setAttribute('data-success-popup', 'y');
                var a = n.querySelector('.t-form__successbox');
                a && a.classList.add('t-form-success-popup');
            }
        }
    });
}
function t_forms__validateOwnVariant(t) {
    var e;
    t &&
        (t.value && (t.value = ''),
        t.closest('.tn-atom__form') ||
            (t.timerID && clearTimeout(t.timerID),
            (t.timerID = setTimeout(function () {
                t.classList.add('t-input-ownanswer_active'), (t.style.display = 'flex'), clearTimeout(t.timerID);
            }, 500))));
}
function t_forms__addFocusOnTab(t) {
    if (!window.isMobile) {
        var e = t.querySelectorAll('.t-input, .t-select');
        if (e) {
            var r = null;
            document.addEventListener('keydown', function () {
                r = 'keyboard';
            }),
                document.addEventListener('mousedown', function () {
                    r = 'mouse';
                }),
                document.addEventListener('visibilitychange', function () {
                    r = 'mouse';
                }),
                Array.prototype.forEach.call(e, function (t) {
                    t.addEventListener('focus', function () {
                        if ('keyboard' === r) {
                            var e = t;
                            (e.classList.contains('t-input_pvis') || e.classList.contains('t-input-phonemask')) &&
                                (e = e.parentElement),
                                e.classList.add('t-focusable'),
                                (r = null);
                        }
                    }),
                        t.addEventListener('blur', function () {
                            t.classList.remove('t-focusable');
                        });
                });
        }
    }
}
function t_forms__initEventPlaceholder(t) {
    var e = 'focus',
        r = 'blur';
    document.addEventListener || ((e = 'focusin'), (r = 'focusout')),
        t_removeEventListener(t, e, t_forms__removePlaceholder),
        t_addEventListener(t, e, t_forms__removePlaceholder, !0),
        t_removeEventListener(t, r, t_forms__addPlaceholder),
        t_addEventListener(t, r, t_forms__addPlaceholder, !0);
}
function t_forms__removePlaceholder(t) {
    var e = t || window.event,
        r = e.target || e.srcElement;
    if ('INPUT' === r.tagName) {
        var o = r.closest('[data-input-lid]'),
            n = r.getAttribute('placeholder'),
            a = '';
        if (o) a = o.getAttribute('data-input-lid');
        else {
            var i = r.closest('form');
            i && (a = i.getAttribute('data-input-lid'));
        }
        n && a && ((window.t_forms__inputData[a] = n), r.setAttribute('placeholder', ''));
    }
}
function t_forms__addMoveToInputWithErrorClickHandler(t, e) {
    e &&
        t &&
        ((e.TElementToFocus = t),
        e.removeEventListener('click', t_forms__handleClickOnError),
        e.addEventListener('click', t_forms__handleClickOnError));
}
function t_forms__handleClickOnError(t) {
    t.preventDefault();
    var e = t.target.closest('.t-form__errorbox-item');
    if (e) {
        var r = e.TElementToFocus;
        t_forms__focusInput(r);
    }
}
function t_forms__addPlaceholder(t) {
    var e = t || window.event,
        r = e.target || e.srcElement,
        o = r.closest('[data-input-lid]'),
        n = '';
    if (o) n = o.getAttribute('data-input-lid');
    else {
        var a = r.closest('form');
        a && (n = a.getAttribute('data-input-lid'));
    }
    var i = window.t_forms__inputData[n] || '';
    i && n && (r.setAttribute('placeholder', i), (window.t_forms__inputData[n] = ''));
}
function t_forms__addInputItsGood(t) {
    var e = t.querySelectorAll('.js-form-proccess[data-formactiontype]');
    Array.prototype.forEach.call(e, function (t) {
        var e = t.getAttribute('data-formactiontype'),
            r = t.querySelector('input[name="form-spec-comments"]');
        '1' === e ||
            r ||
            t.insertAdjacentHTML(
                'beforeend',
                '<div style="position: absolute; left: -5000px; bottom: 0; display: none;"><input type="text" name="form-spec-comments" value="Its good" class="js-form-spec-comments" tabindex="-1" /></div>',
            );
    });
}
function t_forms__addAttrAction(t) {
    var e = t.querySelectorAll('.js-form-proccess');
    Array.prototype.forEach.call(e, function (t) {
        var e;
        '2' === t.getAttribute('data-formactiontype') && t.setAttribute('action', '#');
    });
}
function t_forms__calculateInputsWidth(t) {
    var e = t;
    e && (e = e.replace('rec', ''));
    var r = document.querySelector('#rec' + e);
    if (
        (e ||
            (!document.body.classList.contains('t706__body_cartwinshowed') &&
                !document.body.classList.contains('t706__body_cartpageshowed')) ||
            (r = document.querySelector('.t706')),
        r)
    ) {
        var o = r.querySelector('.t-form__inputsbox');
        if (o) {
            o.closest('.t706') && o.classList.add('t-form__inputsbox_inrow');
            var n = r.querySelectorAll('.t-input-group_widthdef, .t-input-group_inrow');
            if (
                (o.classList.contains('t-form__inputsbox_inrow') || (n = r.querySelectorAll('.t-input-block_width')),
                0 !== n.length)
            ) {
                (o.classList.contains('t-form__inputsbox_vertical-form') || o.closest('.t706')) &&
                    o.classList.add('t-form__inputsbox_flex');
                var a = o.offsetWidth,
                    i = ['rd', 'ri', 'uc', 'ws', 'hd', 'fr', 'st'];
                Array.prototype.forEach.call(n, function (t) {
                    var e = t,
                        r;
                    if (
                        (o.classList.contains('t-form__inputsbox_inrow') || (e = e.closest('.t-input-group')),
                        e && e.classList.contains('t-input-group_inrow-withsibling'))
                    ) {
                        r = e.nextElementSibling;
                        var n = i.filter(function (t) {
                            return r.classList.contains('t-input-group_' + t);
                        });
                        if (
                            !r ||
                            0 !== n.length ||
                            !(
                                (r.classList.contains('t-input-group_inrow') &&
                                    !e.classList.contains('t-input-group_widthdef')) ||
                                (e.classList.contains('t-input-group_widthdef') &&
                                    r.classList.contains('t-input-group') &&
                                    !r.classList.contains('t-input-group_inrow'))
                            )
                        )
                            return (
                                e.classList.remove('t-input-group_inrow-withsibling'),
                                void e.classList.add('t-input-group_inrow-last')
                            );
                        r.classList.add('t-input-group_inonerow');
                    } else e.classList.add('t-input-group_inrow-last');
                    r &&
                        e.classList.contains('t-input-group_widthdef') &&
                        e.classList.contains('t-input-group_inrow-withsibling') &&
                        r.classList.contains('t-input-group_inonerow') &&
                        !r.classList.contains('t-input-group_inrow') &&
                        (r.classList.add('t-input-group_widthdef'),
                        r.classList.contains('t-input-group_inrow-withsibling') ||
                            r.classList.add('t-input-group_inrow-last'),
                        r.classList.contains('t-input-group_inrow') && e.classList.add('t-input-group_inrow-last')),
                        o.classList.contains('t-form__inputsbox_inrow') || t_forms__calculateFieldsWidthInJS(e, a);
                });
                var s = r.querySelectorAll('.t-input-group_inrow.t-input-group_inonerow.t-input-group_inrow-last');
                s.length > 0 && t_forms__moveFieldToNextRow(s);
                var l = r.querySelectorAll('.t-input-group_widthdef.t-input-group_inrow-last');
                o.classList.contains('t-form__inputsbox_inrow') &&
                    l.length > 0 &&
                    t_forms__combineFieldsWithDefWidth(l, e);
            }
        }
    }
}
function t_forms__moveFieldToNextRow(t) {
    var e;
    t_forms__createArrWithAllRows(t, 't-input-group_inrow').forEach(function (t) {
        var e = !1;
        if (
            (t.forEach(function (t) {
                t.classList.contains('t-input-group_inrow-last') &&
                    t.nextElementSibling &&
                    !t.nextElementSibling.classList.contains('t-input-group_inonerow') &&
                    (e = !0);
            }),
            !e)
        ) {
            var r = t.reduce(function (t, e) {
                var r,
                    o = e.classList.value.split(' ').filter(function (t) {
                        return -1 !== t.indexOf('t-input-group_width');
                    }),
                    n = 2,
                    a;
                return -1 !== (o = o[0]).indexOf('100') && (n = 3), t + Number(o.substr(o.length - 2, n));
            }, 0);
            r <= 100 ||
                t.forEach(function (t) {
                    t.classList.contains('t-input-group_inrow-last') &&
                        ((t.style.marginRight = 'calc(100% - (' + (r - 100) + '%)'), (t.style.flex = '0 0 auto'));
                });
        }
    });
}
function t_forms__combineFieldsWithDefWidth(t, e) {
    var r = [],
        o;
    t_forms__createArrWithAllRows(t, 't-input-group_widthdef').forEach(function (t) {
        var e = 4;
        if (t.length > 4)
            for (var o = 0; o < t.length; o += 4) {
                var n = t.slice(o, o + 4);
                r.push(n);
            }
        else r.push(t);
    }),
        r.forEach(function (t) {
            var r,
                o = 't-input-group_width' + ({ 4: '25', 3: '33', 2: '50' }[t.length] || '100');
            t.forEach(function (t) {
                if ((t.classList.add(o), t.classList.contains('t-input-group_rg'))) {
                    var r = t.getAttribute('data-input-lid');
                    window.t_input_range_init(e, r);
                }
            });
        });
}
function t_forms__createArrWithAllRows(t, e) {
    var r = [],
        o = [];
    return (
        Array.prototype.forEach.call(t, function (t) {
            var n = t;
            for (
                o.push(n);
                n.previousElementSibling &&
                n.previousElementSibling.classList.contains(e) &&
                !n.previousElementSibling.classList.contains('t-input-group_inrow-last');

            )
                (n = n.previousElementSibling), o.push(n);
            r.push(o.reverse()), (o = []);
        }),
        r
    );
}
function t_forms__calculateFieldsWidthInJS(t, e) {
    var r = 15,
        o = {
            1: 't-input-block_width100',
            2: 't-input-block_width50',
            3: 't-input-block_width33',
            4: 't-input-block_width25',
        };
    for (var n in o)
        if (t.classList.contains(o[n])) {
            t.style.width = (e - r * (n - 1)) / n + 'px';
            var a = t.previousElementSibling;
            a && a.classList.contains('t-input-title') && (a.style.width = (e - r * (n - 1)) / n + 'px'),
                window.innerWidth < 480 && (t && (t.style.width = '100%'), a && (a.style.width = '100%'));
        }
}
function t_forms__onSubmit(t) {
    var e = t.querySelectorAll('.js-form-proccess');
    Array.prototype.forEach.call(e, function (t) {
        t_removeEventListener(t, 'submit', t_forms__submitEvent), t_addEventListener(t, 'submit', t_forms__submitEvent);
    });
}
function t_forms__onClick(t) {
    t_addEventListener(t, 'dblclick', t_forms__initBtnDblClick),
        t_removeEventListener(t, 'click', t_forms__initBtnClick),
        t_addEventListener(t, 'click', t_forms__initBtnClick);
}
function t_forms__onCachedPageAction(t, e) {
    t_addEventListener(t, 'click', function () {
        t_forms__showWrongPageUrlMessage(e);
    }),
        t_addEventListener(t, 'submit', function (t) {
            t.preventDefault(), t.stopPropagation(), t_forms__showWrongPageUrlMessage(e);
        });
}
function t_forms__offInputsAutocomplete(t) {
    var e = t.querySelectorAll('.t-input');
    Array.prototype.forEach.call(e, function (t) {
        t.setAttribute('autocomplete', 'off');
    });
}
function t_forms__initBtnDblClick(t) {
    var e = t || window.event,
        r;
    (e.target || e.srcElement).closest('[type="submit"]') &&
        (e.preventDefault ? e.preventDefault() : (e.returnValue = !1));
}
function t_forms__initBtnClick(t) {
    var e = t || window.event,
        r = e.target || e.srcElement,
        o = !!r.closest('[type="submit"]') && r;
    if (o) {
        var n = o.closest('.js-form-proccess');
        if (n) {
            e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
            var a = n.getAttribute('id'),
                i,
                s = '';
            if (
                (o.tildaSendingStatus && (s = o.tildaSendingStatus),
                !((s && s >= 1) || t_hasClass(o, 't706__submit_disable')))
            )
                if (
                    (t_addClass(o, 't-btn_sending'),
                    (o.tildaSendingStatus = '1'),
                    window.tildaForm.hideErrors(n),
                    (i = window.tildaForm.validate(n)),
                    window.tildaForm.showErrors(n, i))
                )
                    t_removeClass(o, 't-btn_sending'), (o.tildaSendingStatus = '0');
                else {
                    var l,
                        c = document.getElementById('allrecords').getAttribute('data-tilda-formskey'),
                        u = parseInt(n.getAttribute('data-formactiontype')),
                        d;
                    if (!n.querySelectorAll('.js-formaction-services').length && 1 !== u && !c) {
                        var m = t_forms__getErrorContainers(n, ''),
                            _ = m.errorBoxes,
                            f = m.allError;
                        return (
                            Array.prototype.forEach.call(f, function (t) {
                                (t.innerHTML = 'Please set receiver in block with forms'), (t.style.display = 'block');
                            }),
                            Array.prototype.forEach.call(_, function (t) {
                                t.style.display = 'block';
                            }),
                            t_addClass(n, 'js-send-form-error'),
                            t_removeClass(o, 't-btn_sending'),
                            (o.tildaSendingStatus = '0'),
                            void t_triggerEvent(n, 'tildaform:aftererror')
                        );
                    }
                    if (n.querySelector('.g-recaptcha') && window.grecaptcha) {
                        window.tildaForm.currentFormProccessing = { form: n, btn: o, formtype: u, formskey: c };
                        var p = n.tildaCaptchaClientId;
                        if (p) window.grecaptcha.reset(p);
                        else {
                            var w = {
                                size: 'invisible',
                                sitekey: n.getAttribute('data-tilda-captchakey'),
                                callback: window.tildaForm.captchaCallback,
                            };
                            (p = window.grecaptcha.render(a + 'recaptcha', w)), (n.tildaCaptchaClientId = p);
                        }
                        return void window.grecaptcha.execute(p);
                    }
                    window.tildaForm.send(n, o, u, c);
                }
        }
    }
}
function t_forms__onRender(t) {
    var e;
    !!t.querySelector('.t396') &&
        (t_removeEventListener(t, 'render', t_forms__renderEvent),
        t_addEventListener(t, 'render', t_forms__renderEvent));
}
function t_forms__renderEvent() {
    t_forms__onSubmit(this);
}
function t_forms__submitEvent(t) {
    var e = t;
    if ((t.target && (e = t.target), e)) {
        var r = e.querySelector('[type="submit"]'),
            o = '';
        r && r.tildaSendingStatus && (o = r.tildaSendingStatus),
            o && '3' === o
                ? (r.tildaSendingStatus = '')
                : (r && !t_hasClass(r, 't706__submit_disable') && r.click(),
                  t.preventDefault ? t.preventDefault() : (t.returnValue = !1));
    }
}
function t_asyncLoad(t) {
    var e = t.getAttribute('data-tilda-mask'),
        r = t.getAttribute('data-tilda-mask-holder'),
        o = t.getAttribute('data-tilda-mask-init');
    e &&
        !o &&
        (r
            ? t_onFuncLoad('t_customMask__mask', function () {
                  t_customMask__mask(t, e, { placeholder: r });
              })
            : t_onFuncLoad('t_customMask__mask', function () {
                  t_customMask__mask(t, e);
              }),
        t.setAttribute('data-tilda-mask-init', '1'));
}
function t_forms__getErrorContainers(t, e) {
    var r = t.querySelectorAll('.js-errorbox-all'),
        o = t.querySelectorAll('.js-errorbox-all .js-rule-error-all');
    return (
        r.length ||
            (t.insertAdjacentHTML('afterbegin', '<div class="js-errorbox-all"></div>'),
            (r = t.querySelectorAll('.js-errorbox-all'))),
        o.length ||
            (Array.prototype.forEach.call(r, function (t) {
                t.insertAdjacentHTML('beforeend', '<p class="js-rule-error-all">' + e + '</p>');
            }),
            (o = t.querySelectorAll('.js-errorbox-all .js-rule-error-all'))),
        { errorBoxes: r, allError: o }
    );
}
function t_forms__addRecaptcha() {
    var t = document.querySelectorAll('.js-tilda-captcha');
    Array.prototype.forEach.call(t, function (t) {
        var e = t.getAttribute('data-tilda-captchakey');
        if (e) {
            var r = t.getAttribute('id');
            if (!window.tildaForm.isRecaptchaScriptInit) {
                var o = document.head,
                    n = document.createElement('script');
                (window.tildaForm.isRecaptchaScriptInit = !0),
                    (n.type = 'text/javascript'),
                    (n.src = 'https://www.google.com/recaptcha/api.js?render=explicit'),
                    (n.async = !0),
                    o.appendChild(n),
                    o.insertAdjacentHTML(
                        'beforeend',
                        '<style type="text/css">.js-send-form-success .grecaptcha-badge {display: none;}</style>',
                    );
            }
            document.getElementById(r + 'recaptcha') ||
                t.insertAdjacentHTML(
                    'beforeend',
                    '<div id="' +
                        r +
                        'recaptcha" class="g-recaptcha" data-sitekey="' +
                        e +
                        '" data-callback="window.tildaForm.captchaCallback" data-size="invisible"></div>',
                );
        } else t_removeClass(t, 'js-tilda-captcha');
    });
}
(window.t_forms__lang = (window.navigator.userLanguage || window.navigator.language).toUpperCase().slice(0, 2)),
    (window.scriptSysPayment = {}),
    (window.handlerSysPayment = {}),
    (window.isInitEventsZB = {}),
    (window.isInitEventsCustomMask = {}),
    (window.initForms = {}),
    (window.tildaForm = {
        versionLib: '02.001',
        endpoint: 'forms.tildacdn.com',
        isRecaptchaScriptInit: !1,
        currentFormProccessing: !1,
    }),
    (window.t_forms__clearForm = t_formsApi__clearForm),
    (window.t_forms__updateAllVariables = t_forms__updateAllVariables),
    t_onReady(function () {
        var t = document.getElementById('allrecords');
        if (t) {
            var e = t.getAttribute('data-tilda-project-lang');
            e && (window.t_forms__lang = e);
            var r = t.getAttribute('data-tilda-root-zone');
            r && (window.tildaForm.endpoint = 'forms.tildaapi.' + r);
        }
        t_forms__initForms();
        var o = !!document.querySelector('.t706'),
            n = !!document.querySelector('.js-payment-systembox'),
            a = !!document.querySelector('input[name=tld_product]');
        if (o || n || a) {
            var i = 'tilda-forms-payments-1.0';
            if (!document.head.querySelector('script[src*="' + i + '"]')) {
                var s = document.createElement('script');
                (s.type = 'text/javascript'),
                    (s.src = 'https://static.tildacdn.' + t_forms__getRootZone() + '/js/' + i + '.min.js'),
                    (s.onerror = function () {
                        console.error('Failed to load tilda-forms-payments: ', this.src);
                    }),
                    document.head.appendChild(s);
            }
        }
        var l = window.t_forms__lang;
        if ('RU' !== l && 'EN' !== l) {
            var c = 'tilda-forms-dict-1.0';
            if (!document.head.querySelector('script[src*="' + c + '"]')) {
                var u = document.createElement('script');
                (u.type = 'text/javascript'),
                    (u.src = 'https://static.tildacdn.' + t_forms__getRootZone() + '/js/' + c + '.min.js'),
                    (u.onerror = function () {
                        console.error('Failed to load tilda-forms-dictionary: ', this.src);
                    }),
                    document.head.appendChild(u);
            }
        }
    }),
    (window.tildaForm.captchaCallback = function () {
        window.tildaForm.currentFormProccessing &&
            window.tildaForm.currentFormProccessing.form &&
            (window.tildaForm.send(
                window.tildaForm.currentFormProccessing.form,
                window.tildaForm.currentFormProccessing.btn,
                window.tildaForm.currentFormProccessing.formtype,
                window.tildaForm.currentFormProccessing.formskey,
            ),
            (window.tildaForm.currentFormProccessing = !1));
    }),
    (window.tildaForm_customMasksLoad = function () {
        if (!0 !== window.isInitEventsCustomMask) {
            var t = document.createElement('script');
            (t.type = 'text/javascript'),
                (t.src = 'https://static.tildacdn.' + t_forms__getRootZone() + '/js/tilda-forms-custommask-1.0.min.js'),
                document.head.appendChild(t),
                (t.onload = function () {
                    window.isInitEventsCustomMask = !0;
                });
        }
    }),
    (window.tildaForm_initMasks = function () {
        var t = document.querySelectorAll('.js-tilda-mask');
        if (t.length && !0 !== window.isInitEventsCustomMask)
            return (
                window.tildaForm_customMasksLoad(),
                void window.setTimeout(function () {
                    window.tildaForm_initMasks();
                }, 100)
            );
        !0 === window.isInitEventsCustomMask &&
            Array.prototype.forEach.call(t, function (t) {
                t_asyncLoad(t);
            });
    }),
    t_onReady(function () {
        window.tildaForm_initMasks();
    }),
    (window.tildaForm.validate = function (t) {
        for (
            var e = t_forms__getElement(t),
                r = e.querySelectorAll('.js-tilda-rule'),
                o = [],
                n = !0,
                a = e.getAttribute('data-formcart'),
                i,
                s = t_forms__getConditionCheckHandler(e).isHiddenByCondition,
                l = 0;
            l < r.length;
            l++
        ) {
            var c = r[l];
            if (!s(c)) {
                var u = !!parseInt(c.getAttribute('data-tilda-req') || 0, 10),
                    d = c.getAttribute('data-tilda-rule') || 'none',
                    m,
                    _,
                    f = c.getAttribute('data-tilda-rule-minlength') || 0,
                    p = c.getAttribute('data-tilda-rule-maxlength') || 0,
                    w = {},
                    v = c.value,
                    g = '',
                    h = c.getAttribute('type'),
                    y = c.getAttribute('name');
                (w.obj = c),
                    (w.type = []),
                    v &&
                        v.length &&
                        ((g = v.replace(/[\s\u0000—\u001F\u2000-\u200F\uFEFF\u2028-\u202F\u205F-\u206F]/gi, '')),
                        (v = v.trim())),
                    f && (f = parseInt(f, 10)),
                    p && (p = parseInt(p, 10));
                var b = !v.length && !g.length,
                    E = 'checkbox' === h || 'radio' === h,
                    F = e.querySelectorAll('[name="' + y + '"]:checked').length,
                    A = c.classList.contains('t-checkboxes__hiddeninput');
                if (A || 'radio' === h) {
                    var x = A ? 'checkbox' : 'radio',
                        S = c.closest('.t-input-block'),
                        C = S && S.querySelector('.t-input__own-answer-input, .t-' + x + '-ownanswer');
                    if (C && C.checked) {
                        var T = S.querySelector('.t-input__own-answer, .t-input-ownanswer'),
                            k;
                        T && !T.value.trim() && (t_forms__validateOwnVariant(T), (b = !0));
                    }
                }
                if ((((v.length && !E) || (E && F)) && (n = !1), u && (b || (E && !F)))) w.type.push('req');
                else {
                    switch (d) {
                        case 'email':
                            (m =
                                /^(?!\.)(?!.*\.\.)[a-zA-Zёа-яЁА-Я0-9\u2E80-\u2FD5\u3190-\u319f\u3400-\u4DBF\u4E00-\u9FCC\uF900-\uFAAD_\.\-\+]{0,63}[a-zA-Zёа-яЁА-Я0-9\u2E80-\u2FD5\u3190-\u319f\u3400-\u4DBF\u4E00-\u9FCC\uF900-\uFAAD_\-\+]@[a-zA-Zёа-яЁА-ЯЁёäöüÄÖÜßèéû0-9][a-zA-Zёа-яЁА-ЯЁёäöüÄÖÜßèéû0-9\.\-]{0,253}\.[a-zA-Zёа-яЁА-Я]{2,11}$/gi),
                                v.length && !v.match(m) && w.type.push('email');
                            break;
                        case 'url':
                            (m =
                                /^((https?|ftp):\/\/)?[a-zA-Zёа-яЁА-ЯЁёäöüÄÖÜßèéûşç0-9][a-zA-Zёа-яЁА-ЯЁёäöüÄÖÜßèéûşç0-9_\.\-]{0,253}\.[a-zA-Zёа-яЁА-Я]{2,10}\/?$/gi),
                                v.length &&
                                    ((_ = (_ = (_ = v.split('//')) && _.length > 1 ? _[1] : _[0]).split('/')) &&
                                    _.length &&
                                    _[0]
                                        ? (_ = _[0]).match(m) || w.type.push('url')
                                        : (_ && !_[0]) || w.type.push('url'));
                            break;
                        case 'phone':
                            var I = c.getAttribute('data-tilda-mask'),
                                L = '^[0-9()+-';
                            I &&
                                (-1 !== I.indexOf('*')
                                    ? (L += 'a-zёа-я')
                                    : (-1 !== I.indexOf('a') && (L += 'a-z'), -1 !== I.indexOf('а') && (L += 'а-яё'))),
                                (L += ']+$'),
                                (m = new RegExp(L, 'gi')),
                                ((g.length && !g.match(m)) ||
                                    1 == (_ = g.replace(/[^0-9]+/g, '')).indexOf('000') ||
                                    (1 == _.indexOf('111') && '9' != _.substring(0, 1)) ||
                                    (1 == _.indexOf('222') && '5' != _.substring(0, 1)) ||
                                    1 == _.indexOf('333') ||
                                    1 == _.indexOf('444') ||
                                    (1 == _.indexOf('5555') && '0' != _.substring(0, 1)) ||
                                    (1 == _.indexOf('666') && '0' != _.substring(0, 1)) ||
                                    (1 == _.indexOf('8888') && '4' != _.substring(0, 1))) &&
                                    w.type.push('phone');
                            break;
                        case 'number':
                            (m = /^[0-9]+$/gi), g.length > 0 && !g.match(m) && w.type.push('number');
                            break;
                        case 'date':
                            t_onFuncLoad('t_datepicker__readDateFromInput', function () {
                                var t = t_datepicker__readDateFromInput(c);
                                g.length > 0 && !window.t_datepicker__isDateValid(t) && w.type.push('date');
                            });
                            break;
                        case 'time':
                            (m = /^[0-9]{2}[:\.][0-9]{2}$/gi), //! TODO: 00:00 - 23:59. Заменить на /^([0-1][0-9]|2[0-3])[:\.][0-5][0-9]$/gi
                                g.length > 0 && !g.match(m) && w.type.push('time');
                            break;
                        case 'name':
                            (m =
                                /^([ЁёäöüÄÖÜßèéûҐґЄєІіЇїӐӑЙйК̆к̆Ӄ̆ӄ̆Ԛ̆ԛ̆Г̆г̆Ҕ̆ҕ̆ӖӗѢ̆ѣ̆ӁӂꚄ̆ꚅ̆ҊҋО̆о̆Ө̆ө̆Ꚍ̆ꚍ̆ЎўХ̆х̆Џ̆џ̆Ꚏ̆ꚏ̆Ꚇ̆ꚇ̆Ҽ̆ҽ̆Ш̆ш̆Ꚗ̆ꚗ̆Щ̆щ̆Ы̆ы̆Э̆э̆Ю̆ю̆Я̆я̆А́а́ЃѓД́д́Е́е́Ё́ёӘ́ә́З́з́И́и́І́і́Ї́ї́ЌќЛ́л́Н́н́О́о́Р́р́С́с́Т́т́У́у́Ӱ́ӱ́Ү́ү́Х́х́Ц́ц́Ы́ы́Э́э́Ӭ́ӭ́Ю́ю́Ю̈́ю̈́Я́я́Ѣ́ѣ́ҒғӺӻҒ̌ғ̌Ј̵ј̵ҞҟҜҝԞԟӨөҎҏҰұӾӿҸҹҌҍҢңҚқҒғӘәҺһІіҰұҮүӨөȺⱥꜺꜻƂƃɃƀȻȼꞒꞓƋƌĐđɆɇǤǥꞠꞡĦħƗɨƗ́ɨ́Ɨ̀ɨ̀Ɨ̂ɨ̂Ɨ̌ɨ̌Ɨ̃ɨ̃Ɨ̄ɨ̄Ɨ̈ɨ̈Ɨ̋ɨ̋Ɨ̏ɨ̏Ɨ̧ɨ̧Ɨ̧̀ɨ̧̀Ɨ̧̂ɨ̧̂Ɨ̧̌ɨ̧̌ᵼɈɉɟɟ̟ʄʄ̊ʄ̥K̵k̵ꝀꝁꝂꝃꝄꝅꞢꞣŁłł̓Ł̣ł̣ᴌȽƚⱠⱡꝈꝉƛƛ̓ꞤꞥꝊꝋØøǾǿØ̀ø̀Ø̂øØ̌ø̌Ø̄ø̄Ø̃ø̃Ø̨ø̨Ø᷎ø᷎ᴓⱣᵽꝐꝑꝖꝗꝘꝙɌɍꞦꞧꞨꞩẜẝŦŧȾⱦᵺꝤꝥꝦꝧɄʉɄ́ʉ́Ʉ̀ʉ̀Ʉ̂ʉ̂Ʉ̌ʉ̌Ʉ̄ʉ̄Ʉ̃ʉ̃Ʉ̃́ʉ̃́Ʉ̈ʉ̈ʉ̞ᵾU̸u̸ᵿꝞꝟw̸ɎɏƵƶA-Za-z\u00C0\u00C0-\u00C3\u00C8-\u00CA\u00CC\u00CD\u00D2-\u00D9\u00DA\u00DD\u00E0-\u00E3\u00E8\u00E9\u00EA\u00EC\u00ED\u00F2-\u00F5\u00F9\u00FA\u00FD\u0102\u0103\u0110\u0111\u0128\u0129\u0168\u0169\u01A0\u01A1\u01AF\u01B0\u1EA0\u1EA1-\u1EF9\u0027\u2019\u0300-\u03FF\u0400-\u04FF\u0500-\u05FF\u0600-\u06FF\u3040-\u30FF\u0041-\u007A\u00C0-\u02B8\uFB1D-\uFB1F\uFB2A-\uFB4E\u0E00-\u0E7F\u10A0-\u10FF\u3040-\u309F\u30A0-\u30FF\u2E80-\u2FD5\u3190-\u319f\u3400-\u4DBF\u4E00-\u9FCC\uF900-\uFAAD]{1,})([ЁёäöüÄÖÜßèéûҐґЄєІіЇїӐӑЙйК̆к̆Ӄ̆ӄ̆Ԛ̆ԛ̆Г̆г̆Ҕ̆ҕ̆ӖӗѢ̆ѣ̆ӁӂꚄ̆ꚅ̆ҊҋО̆о̆Ө̆ө̆Ꚍ̆ꚍ̆ЎўХ̆х̆Џ̆џ̆Ꚏ̆ꚏ̆Ꚇ̆ꚇ̆Ҽ̆ҽ̆Ш̆ш̆Ꚗ̆ꚗ̆Щ̆щ̆Ы̆ы̆Э̆э̆Ю̆ю̆Я̆я̆А́а́ЃѓД́д́Е́е́Ё́ёӘ́ә́З́з́И́и́І́і́Ї́ї́ЌќЛ́л́Н́н́О́о́Р́р́С́с́Т́т́У́у́Ӱ́ӱ́Ү́ү́Х́х́Ц́ц́Ы́ы́Э́э́Ӭ́ӭ́Ю́ю́Ю̈́ю̈́Я́я́Ѣ́ѣ́ҒғӺӻҒ̌ғ̌Ј̵ј̵ҞҟҜҝԞԟӨөҎҏҰұӾӿҸҹҌҍҢңҚқҒғӘәҺһІіҰұҮүӨөȺⱥꜺꜻƂƃɃƀȻȼꞒꞓƋƌĐđɆɇǤǥꞠꞡĦħƗɨƗ́ɨ́Ɨ̀ɨ̀Ɨ̂ɨ̂Ɨ̌ɨ̌Ɨ̃ɨ̃Ɨ̄ɨ̄Ɨ̈ɨ̈Ɨ̋ɨ̋Ɨ̏ɨ̏Ɨ̧ɨ̧Ɨ̧̀ɨ̧̀Ɨ̧̂ɨ̧̂Ɨ̧̌ɨ̧̌ᵼɈɉɟɟ̟ʄʄ̊ʄ̥K̵k̵ꝀꝁꝂꝃꝄꝅꞢꞣŁłł̓Ł̣ł̣ᴌȽƚⱠⱡꝈꝉƛƛ̓ꞤꞥꝊꝋØøǾǿØ̀ø̀Ø̂øØ̌ø̌Ø̄ø̄Ø̃ø̃Ø̨ø̨Ø᷎ø᷎ᴓⱣᵽꝐꝑꝖꝗꝘꝙɌɍꞦꞧꞨꞩẜẝŦŧȾⱦᵺꝤꝥꝦꝧɄʉɄ́ʉ́Ʉ̀ʉ̀Ʉ̂ʉ̂Ʉ̌ʉ̌Ʉ̄ʉ̄Ʉ̃ʉ̃Ʉ̃́ʉ̃́Ʉ̈ʉ̈ʉ̞ᵾU̸u̸ᵿꝞꝟw̸ɎɏƵƶA-Za-z\u00C0\u00C0-\u00C3\u00C8-\u00CA\u00CC\u00CD\u00D2-\u00D9\u00DA\u00DD\u00E0-\u00E3\u00E8\u00E9\u00EA\u00EC\u00ED\u00F2-\u00F5\u00F9\u00FA\u00FD\u0102\u0103\u0110\u0111\u0128\u0129\u0168\u0169\u01A0\u01A1\u01AF\u01B0\u1EA0\u1EA1-\u1EF9\u0041-\u007A\u00C0-\u02B8\u0300-\u03FF\u0400-\u04FF\u0500-\u05FF\u0600-\u06FF\u3040-\u30FF\uFB1D-\uFB1F\uFB2A-\uFB4E\u0E00-\u0E7F\u10A0-\u10FF\u3040-\u309F\u30A0-\u30FF\u2E80-\u2FD5\u3190-\u319f\u3400-\u4DBF\u4E00-\u9FCC\uF900-\uFAAD\-\'‘ʼ\s\.]{0,})$/gi),
                                v.length && !v.match(m) && w.type.push('name');
                            break;
                        case 'nameeng':
                            (m = /^([A-Za-z\s]{1,}((\-)?[A-Za-z\.\s](\')?){0,})*$/i),
                                v.length && !v.match(m) && w.type.push('nameeng');
                            break;
                        case 'namerus':
                            (m = /^([А-Яа-яЁё\s]{1,}((\-)?[А-Яа-яЁё\.\s](\')?){0,})*$/i),
                                v.length && !v.match(m) && w.type.push('namerus');
                            break;
                        case 'string':
                            (m =
                                /^[A-Za-zА-Яа-я0-9ЁёЁёäöüÄÖÜßèéûӐӑЙйК̆к̆Ӄ̆ӄ̆Ԛ̆ԛ̆Г̆г̆Ҕ̆ҕ̆ӖӗѢ̆ѣ̆ӁӂꚄ̆ꚅ̆ҊҋО̆о̆Ө̆ө̆Ꚍ̆ꚍ̆ЎўХ̆х̆Џ̆џ̆Ꚏ̆ꚏ̆Ꚇ̆ꚇ̆Ҽ̆ҽ̆Ш̆ш̆Ꚗ̆ꚗ̆Щ̆щ̆Ы̆ы̆Э̆э̆Ю̆ю̆Я̆я̆А́а́ЃѓД́д́Е́е́Ё́ёӘ́ә́З́з́И́и́І́і́Ї́ї́ЌќЛ́л́Н́н́О́о́Р́р́С́с́Т́т́У́у́Ӱ́ӱ́Ү́ү́Х́х́Ц́ц́Ы́ы́Э́э́Ӭ́ӭ́Ю́ю́Ю̈́ю̈́Я́я́Ѣ́ѣ́ҒғӺӻҒ̌ғ̌Ј̵ј̵ҞҟҜҝԞԟӨөҎҏҰұӾӿҸҹҌҍҢңҚқҒғӘәҺһІіҰұҮүӨөȺⱥꜺꜻƂƃɃƀȻȼꞒꞓƋƌĐđɆɇǤǥꞠꞡĦħƗɨƗ́ɨ́Ɨ̀ɨ̀Ɨ̂ɨ̂Ɨ̌ɨ̌Ɨ̃ɨ̃Ɨ̄ɨ̄Ɨ̈ɨ̈Ɨ̋ɨ̋Ɨ̏ɨ̏Ɨ̧ɨ̧Ɨ̧̀ɨ̧̀Ɨ̧̂ɨ̧̂Ɨ̧̌ɨ̧̌ᵼɈɉɟɟ̟ʄʄ̊ʄ̥K̵k̵ꝀꝁꝂꝃꝄꝅꞢꞣŁłł̓Ł̣ł̣ᴌȽƚⱠⱡꝈꝉƛƛ̓ꞤꞥꝊꝋØøǾǿØ̀ø̀Ø̂øØ̌ø̌Ø̄ø̄Ø̃ø̃Ø̨ø̨Ø᷎ø᷎ᴓⱣᵽꝐꝑꝖꝗꝘꝙɌɍꞦꞧꞨꞩẜẝŦŧȾⱦᵺꝤꝥꝦꝧɄʉɄ́ʉ́Ʉ̀ʉ̀Ʉ̂ʉ̂Ʉ̌ʉ̌Ʉ̄ʉ̄Ʉ̃ʉ̃Ʉ̃́ʉ̃́Ʉ̈ʉ̈ʉ̞ᵾU̸u̸ᵿꝞꝟw̸ɎɏƵƶ\u0041-\u007A\u00C0-\u02B8\u0300-\u03FF\u0400-\u04FF\u0500-\u05FF\u0600-\u06FF\u3040-\u30FF\uFB1D-\uFB1F\uFB2A-\uFB4E\u0E00-\u0E7F\u10A0-\u10FF\u3040-\u309F\u30A0-\u30FF\u2E80-\u2FD5\u3190-\u319f\u3400-\u4DBF\u4E00-\u9FCC\uF900-\uFAAD,\.:;\"\'\`\-\_\+\?\!\%\$\@\*\&\^\s]$/i),
                                v.length && !v.match(m) && w.type.push('string');
                            break;
                        case 'chosevalue':
                            var j;
                            'true' === c.getAttribute('data-option-selected') || w.type.push('chosevalue');
                            break;
                        case 'promocode':
                            'y' !== a ||
                                !g.length ||
                                !window.tcart ||
                                (window.tcart.promocode && window.tcart.prodamount_discountsum) ||
                                w.type.push('promocode');
                            break;
                        case 'deliveryreq':
                            w.type.push('deliveryreq');
                            break;
                        case 'unauthorized_order':
                            w.type.push('unauthorized_order');
                    }
                    f > 0 && v.length && v.length < f && w.type.push('minlength'),
                        p > 0 && v.length && v.length > p && w.type.push('maxlength');
                }
                w.type && w.type.length && (o[o.length] = w);
            }
        }
        if ('y' === a) {
            var D = window.tcart_minorder > 0,
                M = window.tcart_mincntorder > 0,
                q;
            if (D)
                if (
                    (q =
                        window.tcart.prodamount_withdiscount > 0
                            ? window.tcart.prodamount_withdiscount
                            : void 0 !== window.tcart.prodamount_withdyndiscount &&
                              window.t_cart__discounts &&
                              window.t_cart__discounts.length > 0
                            ? window.tcart.prodamount_withdyndiscount
                            : window.tcart.prodamount) < window.tcart_minorder
                ) {
                    var P = { obj: {}, type: [] };
                    P.type.push('minorder'), o.push(P);
                }
            if (M && window.tcart.total < window.tcart_mincntorder) {
                var R = { obj: {}, type: [] };
                R.type.push('minquantity'), o.push(R);
            }
        }
        return n && !o.length && r.length && (o = [{ obj: 'none', type: ['emptyfill'] }]), o;
    }),
    (window.tildaForm.hideErrors = function (t) {
        if ('object' != typeof t || t.length) {
            var e = t_forms__getElement(t),
                r = e.querySelectorAll('.js-errorbox-all'),
                o = e.querySelectorAll('.js-rule-error'),
                n = e.querySelectorAll('.js-error-rule-all'),
                a = e.querySelectorAll('.js-successbox'),
                i = e.querySelectorAll('.js-error-control-box'),
                s = e.querySelectorAll('.js-error-control-box .t-input-error'),
                l = document.getElementById('tilda-popup-for-error');
            Array.prototype.forEach.call(r, function (t) {
                t.style.display = 'none';
            }),
                Array.prototype.forEach.call(o, function (t) {
                    t.style.display = 'none';
                }),
                Array.prototype.forEach.call(n, function (t) {
                    t.innerHTML = '';
                }),
                Array.prototype.forEach.call(a, function (t) {
                    t.style.display = 'none';
                }),
                Array.prototype.forEach.call(s, function (t) {
                    t.innerHTML = '';
                }),
                Array.prototype.forEach.call(i, function (t) {
                    t_removeClass(t, 'js-error-control-box');
                }),
                t_removeClass(e, 'js-send-form-error'),
                t_removeClass(e, 'js-send-form-success'),
                l && t_fadeOut(l);
        }
    }),
    (window.tildaForm.showErrorInPopup = function (t, e) {
        var r = t_forms__getElement(t);
        if (!e || !e.length) return !1;
        var o = r.getAttribute('id'),
            n = r.getAttribute('data-inputbox');
        n || (n = '.blockinput');
        var a = '',
            i = !1,
            s = !0,
            l,
            c = '',
            u = '',
            d = '',
            m = document.getElementById('tilda-popup-for-error'),
            _;
        m ||
            (document.body.insertAdjacentHTML(
                'beforeend',
                '<div id="tilda-popup-for-error" class="js-form-popup-errorbox tn-form__errorbox-popup" style="display: none;"> <div class="t-form__errorbox-text t-text t-text_xs"> error </div> <div class="tn-form__errorbox-close js-errorbox-close"> <div class="tn-form__errorbox-close-line tn-form__errorbox-close-line-left"></div> <div class="tn-form__errorbox-close-line tn-form__errorbox-close-line-right"></div> </div> </div>',
            ),
            t_addEventListener((m = document.getElementById('tilda-popup-for-error')), 'click', function (t) {
                var e = t || window.event,
                    r,
                    o;
                (e.target || e.srcElement).closest('.js-errorbox-close') &&
                    (e.preventDefault ? e.preventDefault() : (e.returnValue = !1), t_fadeOut(m));
            }));
        for (var f = 0; f < e.length; f++)
            if (e[f] && e[f].obj) {
                if (0 === f && 'none' === e[f].obj) {
                    d = '<p class="t-form__errorbox-item">' + t_forms__getMsg('emptyfill') + '</p>';
                    break;
                }
                var p = t_forms__getElement(e[f].obj);
                p && (a = p.closest(n)),
                    a &&
                        ((c = a.querySelectorAll('.t-input-error')),
                        t_addClass(a, 'js-error-control-box'),
                        c.length && (i = !0));
                for (var w = 0; w < e[f].type.length; w++) {
                    var v = e[f].type[w],
                        g = t_forms__getMsg(v);
                    (u = ''),
                        (l = r.querySelector('.js-rule-error-' + v))
                            ? (l.textContent && l.innerText) || !g || -1 !== d.indexOf(g)
                                ? ((u = l.textContent || l.innerText),
                                  -1 === d.indexOf(u) && (d = d + '<p class="t-form__errorbox-item">' + u + '</p>'))
                                : (d = d + '<p class="t-form__errorbox-item">' + g + '</p>')
                            : g && -1 === d.indexOf(g) && (d = d + '<p class="t-form__errorbox-item">' + g + '</p>'),
                        i &&
                            (!u && t_forms__getMsg(v + 'field') && (u = t_forms__getMsg(v + 'field')),
                            !u && g && (u = g),
                            u &&
                                a &&
                                ((c = a.querySelectorAll('.t-input-error')),
                                Array.prototype.forEach.call(c, function (t) {
                                    (t.innerHTML = u), t_fadeIn(t);
                                })));
                }
            }
        if (d) {
            m.querySelector('.t-form__errorbox-text').innerHTML = d;
            var h = m.querySelectorAll('.t-form__errorbox-item');
            if (
                (Array.prototype.forEach.call(h, function (t) {
                    t.style.display = 'block';
                }),
                document.querySelector('.t1093 [data-elem-type="form"]'))
            ) {
                var y = window.tPopupObj && window.tPopupObj.openPopUpList;
                if (y && y.length) {
                    var b,
                        E = '.t1093 .t-popup[data-tooltip-hook="' + y[y.length - 1] + '"]',
                        F = document.querySelector(E),
                        A = F ? getComputedStyle(F).zIndex : 0,
                        x;
                    A > 1e4 && (m.style.zIndex = A + 1);
                } else m.style.zIndex = '';
            }
            t_fadeIn(m);
        }
        function S(t) {
            var e = t || window.event,
                r;
            if ('INPUT' === (e.target || e.srcElement).tagName && _) {
                var n = _.querySelectorAll('form .t-input-error');
                t_fadeOut(m),
                    Array.prototype.forEach.call(n, function (t) {
                        (t.innerHTML = ''), t_fadeOut(t);
                    }),
                    window.t_forms__errorTimerID &&
                        (window.clearTimeout(window.t_forms__errorTimerID), (window.t_forms__errorTimerID = 0)),
                    (window.isInitEventsZB[o] = !0);
            }
        }
        if (
            (window.t_forms__errorTimerID && window.clearTimeout(window.t_forms__errorTimerID),
            (window.t_forms__errorTimerID = window.setTimeout(function () {
                t_fadeOut(m),
                    (c = r.querySelectorAll('.t-input-error')),
                    Array.prototype.forEach.call(c, function (t) {
                        (t.innerHTML = ''), t_fadeOut(t);
                    }),
                    (window.t_forms__errorTimerID = 0);
            }, 1e4)),
            !window.isInitEventsZB[o])
        ) {
            _ = r.closest('.r');
            var C = 'focus';
            document.addEventListener || (C = 'focusin'),
                t_removeEventListener(_, C, S),
                t_addEventListener(_, C, S, !0),
                t_removeEventListener(_, 'change', S),
                t_addEventListener(_, 'change', S, !0);
        }
        return t_triggerEvent(r, 'tildaform:aftererror'), !0;
    }),
    (window.tildaForm.showErrors = function (t, e, r) {
        var o = t_forms__getElement(t);
        if (!e || !e.length) return !1;
        if ('y' === o.getAttribute('data-error-popup')) return window.tildaForm.showErrorInPopup(o, e);
        for (
            var n,
                a = (r || {}).inputBoxSelector,
                i,
                s = void 0 === a ? o.getAttribute('data-inputbox') || '.blockinput' : a,
                l = t_forms__createErrorFocusHash(),
                c = 0;
            c < e.length;
            c++
        ) {
            var u = 0 === c,
                d = e[c];
            if (d && d.obj) {
                var m = d.obj;
                if ('none' === m && u) {
                    t_forms__showEmptyFormError(o);
                    break;
                }
                var _ = t_forms__getElement(m),
                    f;
                if (_ && _ instanceof Element) t_forms__showInputErrors(o, _.closest(s), d);
                t_forms__showFormErrors(o, d, l);
            }
        }
        return (
            t_forms__scrollToInputWithError(e[0]),
            t_forms__showFormErrorsContainers(o),
            t_triggerEvent(o, 'tildaform:aftererror'),
            !0
        );
    }),
    (window.tildaForm.addTildaCaptcha = function (t, e) {
        var r = t_forms__getElement(t),
            o = document.getElementById('tildaformcaptchabox'),
            n = document.getElementById('js-tildaspec-captcha'),
            a;
        o && t_removeEl(o),
            n && t_removeEl(n),
            r.insertAdjacentHTML(
                'beforeend',
                '<input type="hidden" name="tildaspec-tildacaptcha" id="js-tildaspec-captcha">',
            );
        try {
            a = new Date().getTime() + '=' + parseInt(8 * Math.random(), 10);
        } catch (s) {
            a = 'rnd=' + parseInt(8 * Math.random(), 10);
        }
        var i =
            '<div id="tildaformcaptchabox" tabindex="-1" style="z-index: 99999999999; position:fixed; text-align: center; vertical-align: middle; top: 0px; left:0px; bottom: 0px; right: 0px; background: rgba(255,255,255,0.97);"><iframe id="captchaIframeBox" src="//' +
            window.tildaForm.endpoint +
            '/procces/captcha/?tildaspec-formid=' +
            r.getAttribute('id') +
            '&tildaspec-formskey=' +
            e +
            '&' +
            a +
            '" frameborder="0" width="100%" height="100%"></iframe></div>';
        document.body.insertAdjacentHTML('beforeend', i),
            window.removeEventListener('message', checkVerifyTildaCaptcha),
            window.addEventListener('message', checkVerifyTildaCaptcha),
            document.getElementById('tildaformcaptchabox').focus();
    }),
    (window.tildaForm.addMembersInfoToForm = function (t) {
        var e = t_forms__getElement(t);
        if (e)
            try {
                var r = e.querySelector('.js-tilda-mauserinfo');
                if ((r && t_removeEl(r), !window.mauser)) return;
                (window.tildaForm.tildamember = {}),
                    window.mauser.name && (window.tildaForm.tildamember.name = window.mauser.name),
                    window.mauser.code &&
                        window.mauser.email &&
                        ((window.tildaForm.tildamember.email = window.mauser.email),
                        (window.tildaForm.tildamember.code = window.mauser.code)),
                    window.mauser.token && (window.tildaForm.tildamember.token = window.mauser.token);
            } catch (o) {
                console.error('addMembersInfoToForm exception: ', o);
            }
    }),
    (window.tildaForm.closeSuccessPopup = function () {
        var t = document.getElementById('tildaformsuccesspopup-new'),
            e = document.getElementById('tildaformsuccesspopup'),
            r,
            o = e && 'block' === getComputedStyle(e).display ? e : t;
        if (o) {
            t_removeClass(document.body, 't-body_success-popup-showed'),
                t_forms__isIOS() && window.tildaForm.unlockBodyScroll(),
                t_fadeOut(o),
                o.classList.contains('t-form-success-popup_new') && o.classList.remove('t-popup_show');
            var n = document.querySelector('style.t-success-popup');
            n && n.remove();
        }
    }),
    (window.tildaForm.lockBodyScroll = function () {
        var t = document.body;
        if (!t_hasClass(t, 't-body_scroll-locked')) {
            var e =
                void 0 !== window.pageYOffset
                    ? window.pageYOffset
                    : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            t_addClass(t, 't-body_scroll-locked'),
                (t.style.top = '-' + e + 'px'),
                t.setAttribute('data-popup-scrolltop', e);
        }
    }),
    (window.tildaForm.unlockBodyScroll = function () {
        var t = document.body;
        if (t_hasClass(t, 't-body_scroll-locked')) {
            var e = t.getAttribute('data-popup-scrolltop');
            t_removeClass(t, 't-body_scroll-locked'),
                (t.style.top = null),
                t.removeAttribute('data-popup-scrolltop'),
                (document.documentElement.scrollTop = parseInt(e));
        }
    }),
    (window.tildaForm.showSuccessPopup = function (t) {
        var e = '',
            r = document.getElementById('tildaformsuccesspopup'),
            o = document.getElementById('tildaformsuccesspopuptext'),
            n = document.body;
        if (!r) {
            (e +=
                '<style media="screen"> .t-form-success-popup { display: none; position: fixed; background-color: rgba(0,0,0,.8); top: 0px; left: 0px; width: 100%; height: 100%; z-index: 10000; overflow-y: auto; cursor: pointer; } .t-body_success-popup-showed { height: 100vh; min-height: 100vh; overflow: hidden; } .t-form-success-popup__window { width: 100%; max-width: 400px; position: absolute; top: 50%; -webkit-transform: translateY(-50%); transform: translateY(-50%); left: 0px; right: 0px; margin: 0 auto; padding: 20px; box-sizing: border-box; } .t-form-success-popup__wrapper { background-color: #fff; padding: 40px 40px 50px; box-sizing: border-box; border-radius: 5px; text-align: center; position: relative; cursor: default; } .t-form-success-popup__text { padding-top: 20px; } .t-form-success-popup__close-icon { position: absolute; top: 14px; right: 14px; cursor: pointer; } @media screen and (max-width: 480px) { .t-form-success-popup__text { padding-top: 10px; } .t-form-success-popup__wrapper { padding-left: 20px; padding-right: 20px; } } </style>'),
                (e +=
                    '<div class="t-form-success-popup" style="display:none;" id="tildaformsuccesspopup"> <div class="t-form-success-popup__window"> <div class="t-form-success-popup__wrapper"> <svg class="t-form-success-popup__close-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" class="t657__icon-close" viewBox="0 0 23 23"> <g fill-rule="evenodd"> <path d="M0 1.41L1.4 0l21.22 21.21-1.41 1.42z"/> <path d="M21.21 0l1.42 1.4L1.4 22.63 0 21.21z"/> </g> </svg> <svg width="50" height="50" fill="#62C584"> <path d="M25.1 49.28A24.64 24.64 0 0 1 .5 24.68 24.64 24.64 0 0 1 25.1.07a24.64 24.64 0 0 1 24.6 24.6 24.64 24.64 0 0 1-24.6 24.61zm0-47.45A22.87 22.87 0 0 0 2.26 24.68 22.87 22.87 0 0 0 25.1 47.52a22.87 22.87 0 0 0 22.84-22.84A22.87 22.87 0 0 0 25.1 1.83z"/> <path d="M22.84 30.53l-4.44-4.45a.88.88 0 1 1 1.24-1.24l3.2 3.2 8.89-8.9a.88.88 0 1 1 1.25 1.26L22.84 30.53z"/> </svg> <div class="t-form-success-popup__text t-descr t-descr_sm" id="tildaformsuccesspopuptext"> Thank You! </div> </div> </div> </div>'),
                n.insertAdjacentHTML('beforeend', e),
                (r = document.getElementById('tildaformsuccesspopup')),
                (o = document.getElementById('tildaformsuccesspopuptext'));
            var a = r.querySelector('.t-form-success-popup__close-icon');
            t_addEventListener(r, 'click', function (t) {
                var e = t || window.event,
                    r;
                (e.target || e.srcElement) === this && window.tildaForm.closeSuccessPopup();
            }),
                t_addEventListener(a, 'click', function () {
                    window.tildaForm.closeSuccessPopup();
                }),
                t_addEventListener(n, 'keydown', function (t) {
                    var e = t || window.event,
                        r;
                    27 == (e.keyCode || e.which) && window.tildaForm.closeSuccessPopup();
                });
        }
        (o.innerHTML = t),
            t_fadeIn(r),
            t_addClass(n, 't-body_success-popup-showed'),
            t_forms__isIOS() &&
                setTimeout(function () {
                    window.tildaForm.lockBodyScroll();
                }, 500);
    }),
    (window.tildaForm.showSuccessPopupNew = function (t, e, r, o) {
        var n = 'tildaformsuccesspopup-new',
            a = document.body,
            i = t.getAttribute('data-success-url'),
            s = !!i;
        if (window.isRedirectError || !s || e || r) {
            var l = window.isRedirectError && s && !e && !r,
                c = !r && !e,
                u = d();
            p(),
                w(),
                t_forms__setupCloseHandlers(u, s),
                m(),
                setTimeout(function () {
                    u.focus(), t_forms__trapFocus(u);
                }, 50);
        }
        function d() {
            var t = document.getElementById(n);
            return (
                t ||
                    (a.insertAdjacentHTML('beforeend', t_forms__drawNewSuccessPopup()),
                    (t = document.getElementById(n))),
                t
            );
        }
        function m() {
            t_fadeIn(u),
                t_addClass(a, 't-body_success-popup-showed'),
                u.classList.add('t-popup_show'),
                _(u),
                t_forms__isIOS() &&
                    setTimeout(function () {
                        window.tildaForm.lockBodyScroll();
                    }, 500);
        }
        function _() {
            var t = 120,
                e = window.innerHeight - t,
                r = u.querySelector('.t-form-success-popup__wrapper'),
                o = getComputedStyle(r, null),
                n = parseInt(o.paddingTop) || 0,
                a = parseInt(o.paddingBottom) || 0,
                i,
                s,
                l;
            r.clientHeight - (n + a) <= e
                ? r.classList.remove('t-popup__container-static')
                : r.classList.add('t-popup__container-static');
        }
        function f() {
            return {
                title: {
                    element: document.getElementById('tildaformsuccesspopuptitle-new'),
                    content: c ? t_forms__getMsg('success_title') : r,
                    show: !!c || !!r,
                },
                text: {
                    element: document.getElementById('tildaformsuccesspopuptext-new'),
                    content: c ? t_forms__getMsg('success_text') : e,
                    show: !!c || !!e,
                },
                linkButton: {
                    element: document.getElementById('tildaformsuccesspopuplink-new'),
                    content: o || t_forms__getMsg(s ? 'success_btn_redirect' : 'success_btn'),
                    show: s,
                },
                closeButton: {
                    element: document.getElementById('tildaformsuccesspopupbtn-new'),
                    content: o || t_forms__getMsg(s ? 'success_btn_redirect' : 'success_btn'),
                    show: !s,
                },
                info: { element: document.getElementById('tildaformsuccesspopupinfo-new'), content: null, show: s },
                infoText: {
                    element: document.getElementById('tildaformsuccesspopupinfotext-new'),
                    content: t_forms__getMsg(l ? 'success_info_redirect_error' : 'success_info'),
                    show: s,
                },
                infoDigit: {
                    element: document.getElementById('tildaformsuccesspopupinfodigit-new'),
                    content: l ? '' : '3',
                    show: s,
                },
                closeIcon: {
                    element: document.getElementById('tildaformsuccesspopupclose-new'),
                    content: null,
                    show: !s,
                },
            };
        }
        function p() {
            var t = f();
            Object.keys(t).forEach(function (e) {
                var r = t[e],
                    o = r.element,
                    n = r.content,
                    a = r.show;
                o &&
                    (o.classList.toggle('t-form-success-popup_hidden', !a),
                    a && n && (o.innerHTML = n),
                    'linkButton' === e && s && o.setAttribute('href', i));
            });
        }
        function w() {
            var t = document.querySelector('.t-form-success-popup__content-icon');
            if (t) {
                var e = t.cloneNode(!0);
                t.parentNode.replaceChild(e, t);
            }
        }
    }),
    (window.tildaForm.handleClosePopup = function () {
        window.tildaForm.closeSuccessPopup(),
            window.tildaForm.currentRemoveCloseHandlers &&
                'function' == typeof window.tildaForm.currentRemoveCloseHandlers &&
                window.tildaForm.currentRemoveCloseHandlers();
    }),
    (window.tildaForm.successEnd = function (t, e, r) {
        var o = t_forms__getElement(t);
        t_addClass(o, 'js-send-form-success'), t_forms__updateAllSystemVariables(o);
        var n = o.closest('.t-popup'),
            a = o.closest('.t1093'),
            i;
        function s() {
            t_forms__handleSuccess(o, { successCallback: r, successUrl: e }),
                window.tildaForm.clearTCart(o),
                t_forms__clearFormInputs(o),
                t_forms__clearFormData(o),
                t_forms__isNewSuccessBox(o) && !a && window.t_forms__clearForm(o);
        }
        function l() {
            t_forms__showSuccessbox(o).finally(function () {
                s();
            });
        }
        if (t_forms__isNewSuccessBox(o) && n && !a) {
            var c = 320;
            return t_forms__processFormsInPopup(n, o), void setTimeout(l, c);
        }
        l();
    }),
    (window.tildaForm.clearTCart = function (t) {
        var e;
        if ('y' === t_forms__getElement(t).getAttribute('data-formcart')) {
            if (
                ((window.clearTCart = !0),
                (window.tcart = { amount: 0, currency: '', system: '', products: [] }),
                (window.tcart.system = 'none'),
                'object' == typeof localStorage)
            )
                try {
                    localStorage.removeItem('tcart');
                } catch (r) {
                    console.error('Your web browser does not support localStorage. Code status: ', r);
                }
            try {
                delete window.tcart, window.tcart__loadLocalObj();
            } catch (r) {}
            window.tcart_success = 'yes';
        }
    }),
    (window.tildaForm.send = function (formNode, btnSubmitNode, formType, formKey) {
        var form = t_forms__getElement(formNode),
            btnSubmit = t_forms__getElement(btnSubmitNode),
            allRecords = document.getElementById('allrecords'),
            pageId = allRecords.getAttribute('data-tilda-page-id'),
            projectId = allRecords.getAttribute('data-tilda-project-id'),
            formId = form.getAttribute('id'),
            dataFormCart = form.getAttribute('data-formcart'),
            msgContainers,
            errorBoxes,
            allError;
        (window.tildaForm.tildapayment = !1),
            ('y' === dataFormCart || form.closest('.t706__orderform')) && window.tildaForm.addPaymentInfoToForm(form);
        try {
            window.mauser && window.tildaForm.addMembersInfoToForm(form);
        } catch (error) {}
        var inputItsGood = form.querySelector('input[name="form-spec-comments"]');
        if (
            (inputItsGood ||
                form.insertAdjacentHTML(
                    'beforeend',
                    '<div style="position: absolute; left: -5000px; bottom: 0; display: none;"><input type="text" name="form-spec-comments" value="Its good" class="js-form-spec-comments" tabindex="-1" /></div>',
                ),
            2 === formType || (!formType && formKey))
        ) {
            var tildaSpecs = {
                    'tildaspec-cookie': document.cookie,
                    'tildaspec-referer': window.location.href,
                    'tildaspec-formid': formId,
                    'tildaspec-formskey': formKey,
                    'tildaspec-version-lib': window.tildaForm.versionLib,
                    'tildaspec-pageid': pageId,
                    'tildaspec-projectid': projectId,
                    'tildaspec-lang': window.t_forms__lang,
                },
                hiddenInput;
            for (var spec in tildaSpecs)
                (hiddenInput = form.querySelector('input[name="' + spec + '"]')),
                    hiddenInput ||
                        (form.insertAdjacentHTML('beforeend', '<input type="hidden" name="' + spec + '" value="">'),
                        (hiddenInput = form.querySelector('input[name="' + spec + '"]')),
                        (hiddenInput.value = tildaSpecs[spec]));
            try {
                (hiddenInput = form.querySelector('input[name=tildaspec-fp]')),
                    hiddenInput ||
                        (form.insertAdjacentHTML('beforeend', '<input type="hidden" name="tildaspec-fp" value="">'),
                        (hiddenInput = form.querySelector('input[name=tildaspec-fp]'))),
                    window.tildastat
                        ? (hiddenInput.value = window.tildastat('fingerprint'))
                        : (hiddenInput.value =
                              'st' +
                              window.pageYOffset +
                              'w' +
                              window.innerWidth +
                              'h' +
                              window.innerHeight +
                              'ft' +
                              form.getBoundingClientRect().top +
                              window.pageYOffset);
            } catch (error) {}
            (inputItsGood = form.querySelector('.js-form-spec-comments')), inputItsGood && (inputItsGood.value = '');
            var _t_forms__getFormData = t_forms__getFormData(form),
                status = _t_forms__getFormData.status,
                formData = _t_forms__getFormData.data,
                contentType = _t_forms__getFormData.contentType;
            if ('invalid' === status) return !1;
            var startRequest = Date.now();
            t_triggerEvent(form, 'tildaform:beforesend');
            var formUrl = 'https://' + window.tildaForm.endpoint + '/procces/',
                secondFormTypeXhr = new XMLHttpRequest();
            return (
                secondFormTypeXhr.open('POST', formUrl, !0),
                secondFormTypeXhr.setRequestHeader('Content-Type', contentType),
                secondFormTypeXhr.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01'),
                (secondFormTypeXhr.onreadystatechange = function () {
                    if (4 === secondFormTypeXhr.readyState)
                        if (secondFormTypeXhr.status >= 200 && secondFormTypeXhr.status < 400) {
                            var data = secondFormTypeXhr.responseText;
                            if (data) {
                                var objData = JSON.parse(data);
                                if ('object' == typeof objData) {
                                    var dataSuccessUrl = form.getAttribute('data-success-url'),
                                        dataSuccessCallback = form.getAttribute('data-success-callback'),
                                        dataFormSendedCallback = form.getAttribute('data-formsended-callback');
                                    t_removeClass(btnSubmit, 't-btn_sending'), (btnSubmit.tildaSendingStatus = '0');
                                    try {
                                        if (
                                            objData &&
                                            objData.redirectto &&
                                            3 == objData.redirectto.length &&
                                            window.tildaForm.endpoint.substring(window.tildaForm.endpoint.length - 3) !=
                                                objData.redirectto
                                        )
                                            return (
                                                (window.tildaForm.endpoint = 'forms.tildaapi.' + objData.redirectto),
                                                window.tildaForm.send(form, btnSubmit, formType, formKey),
                                                !1
                                            );
                                    } catch (e) {
                                        console.error('error in dc action.');
                                    }
                                    if (objData && objData.error)
                                        (msgContainers = t_forms__getErrorContainers(form, '')),
                                            (errorBoxes = msgContainers.errorBoxes),
                                            (allError = msgContainers.allError),
                                            Array.prototype.forEach.call(allError, function (t) {
                                                t.style.display = 'block';
                                            }),
                                            Array.prototype.forEach.call(errorBoxes, function (t) {
                                                var e = t.querySelector('.t-form__errorbox-text');
                                                e ? (e.innerHTML = objData.error) : (t.innerHTML = objData.error),
                                                    (t.style.display = 'block');
                                            }),
                                            t_addClass(form, 'js-send-form-error'),
                                            t_triggerEvent(form, 'tildaform:aftererror'),
                                            window.t_cart__discounts &&
                                                window.localStorage.removeItem('tcart_discounts');
                                    else {
                                        var _objData$member;
                                        if (objData && objData.needcaptcha)
                                            return formKey
                                                ? (window.tildaForm.addTildaCaptcha(form, formKey), !1)
                                                : (alert('Server busy. Please try again later.'), !1);
                                        var formResult = {};
                                        if (objData && objData.results && objData.results[0]) {
                                            var strValue = objData.results[0];
                                            (strValue = strValue.split(':')),
                                                (formResult.tranId = strValue[0] + ':' + strValue[1]),
                                                (formResult.orderId = strValue[2] ? strValue[2] : '0'),
                                                formResult.orderId &&
                                                    '0' !== formResult.orderId &&
                                                    (window.tildaForm.orderIdForStat = formResult.orderId);
                                        } else (formResult.tranId = '0'), (formResult.orderId = '0');
                                        'undefined' != typeof jQuery &&
                                            jQuery(form).data('tildaformresult', formResult),
                                            (form.tildaTranId = formResult.tranId),
                                            (form.tildaOrderId = formResult.orderId);
                                        var dataEventName = form.getAttribute('data-tilda-event-name') || '';
                                        dataEventName ||
                                            (dataEventName =
                                                'y' === dataFormCart &&
                                                objData &&
                                                ((objData.next &&
                                                    objData.next.type &&
                                                    ('function' !== objData.next.type ||
                                                        (objData.next.value &&
                                                            ('stripev3' === objData.next.value.sysname ||
                                                                'outersite' === objData.next.value.installation)))) ||
                                                    !objData.next)
                                                    ? '/tilda/' + formId + '/payment/'
                                                    : '/tilda/' + formId + '/submitted/');
                                        var title = 'Send data from form ' + formId,
                                            price = 0,
                                            product = '',
                                            priceEl = form.querySelector('.js-tilda-price');
                                        if (window.Tilda && 'function' == typeof window.Tilda.sendEventToStatistics) {
                                            window.tildaForm.tildapayment && window.tildaForm.tildapayment.amount
                                                ? ((price = window.tildaForm.tildapayment.amount),
                                                  parseFloat(price) > 0 && (title = 'Order ' + formResult.orderId))
                                                : priceEl &&
                                                  ((price = priceEl.value),
                                                  parseFloat(price) > 0 && (title = 'Order ' + formResult.orderId));
                                            try {
                                                window.Tilda.sendEventToStatistics(
                                                    dataEventName,
                                                    title,
                                                    product,
                                                    price,
                                                );
                                            } catch (error) {
                                                console.error('Error while sending statistics. Code status: ', error);
                                            }
                                            window.dataLayer && window.dataLayer.push({ event: 'submit_' + formId });
                                        } else {
                                            try {
                                                'undefined' != typeof ga &&
                                                    'tilda' !== window.mainTracker &&
                                                    ga('send', {
                                                        hitType: 'pageview',
                                                        page: dataEventName,
                                                        title: title,
                                                    }),
                                                    window.mainMetrika &&
                                                        window[window.mainMetrika] &&
                                                        window[window.mainMetrika].hit(dataEventName, {
                                                            title: title,
                                                            referer: window.location.href,
                                                        });
                                            } catch (error) {
                                                console.error('Error while sending main metrica. Code status: ', error);
                                            }
                                            window.dataLayer && window.dataLayer.push({ event: 'submit_' + formId });
                                        }
                                        if (
                                            'y' === dataFormCart &&
                                            null != (_objData$member = objData.member) &&
                                            _objData$member.token
                                        ) {
                                            var _objData$member2,
                                                profileName = 'tilda_members_profile' + projectId,
                                                memberInfo = {
                                                    token:
                                                        null == (_objData$member2 = objData.member)
                                                            ? void 0
                                                            : _objData$member2.token,
                                                    projectid: projectId,
                                                };
                                            localStorage.setItem(profileName, JSON.stringify(memberInfo)),
                                                localStorage.setItem(
                                                    profileName + '_timestamp',
                                                    Math.floor(Date.now() / 1e3).toString(),
                                                ),
                                                t_onFuncLoad('t_bd__init', function () {
                                                    t_bd__init(), window.tcart__initAuthAndDelivery(!0);
                                                });
                                        }
                                        try {
                                            t_triggerEvent(form, 'tildaform:aftersuccess'),
                                                dataFormSendedCallback && 'function' == typeof jQuery
                                                    ? eval(dataFormSendedCallback + '(jQuery(form));')
                                                    : dataFormSendedCallback &&
                                                      eval(dataFormSendedCallback + '(form);');
                                        } catch (error) {
                                            console.error('Error while call success callback. Code status: ', error);
                                        }
                                        if (objData && objData.next && objData.next.type)
                                            return window.tildaForm.payment(form, objData.next), !1;
                                        window.tildaForm.successEnd(form, dataSuccessUrl, dataSuccessCallback);
                                    }
                                }
                            }
                        } else {
                            var tsDelta = Date.now() - startRequest;
                            if (
                                (t_removeClass(btnSubmit, 't-btn_sending'),
                                (btnSubmit.tildaSendingStatus = '0'),
                                (msgContainers = t_forms__getErrorContainers(form, '')),
                                (errorBoxes = msgContainers.errorBoxes),
                                (allError = msgContainers.allError),
                                !secondFormTypeXhr || (0 == secondFormTypeXhr.status && tsDelta < 100))
                            )
                                Array.prototype.forEach.call(allError, function (t) {
                                    t.innerHTML =
                                        'Request error (sending form data). Please check internet connection...';
                                });
                            else {
                                if (
                                    secondFormTypeXhr &&
                                    (secondFormTypeXhr.status >= 500 ||
                                        408 == secondFormTypeXhr.status ||
                                        410 == secondFormTypeXhr.status ||
                                        429 == secondFormTypeXhr.status ||
                                        'timeout' == secondFormTypeXhr.statusText) &&
                                    -1 !== window.tildaForm.endpoint.indexOf('forms.tilda')
                                )
                                    return (
                                        (window.tildaForm.endpoint = 'forms2.tildacdn.com'),
                                        window.tildaForm.send(form, btnSubmit, formType, formKey),
                                        !1
                                    );
                                secondFormTypeXhr && secondFormTypeXhr.responseText
                                    ? Array.prototype.forEach.call(allError, function (t) {
                                          t.innerHTML =
                                              '[' +
                                              secondFormTypeXhr.status +
                                              '] ' +
                                              secondFormTypeXhr.responseText +
                                              '. Please, try again later.';
                                      })
                                    : secondFormTypeXhr && secondFormTypeXhr.statusText
                                    ? Array.prototype.forEach.call(allError, function (t) {
                                          t.innerHTML =
                                              'Error [' +
                                              secondFormTypeXhr.status +
                                              ', ' +
                                              secondFormTypeXhr.statusText +
                                              ']. Please, try again later.';
                                      })
                                    : Array.prototype.forEach.call(allError, function (t) {
                                          t.innerHTML =
                                              '[' +
                                              secondFormTypeXhr.status +
                                              '] Unknown error. Please, try again later.';
                                      });
                            }
                            Array.prototype.forEach.call(allError, function (t) {
                                t.style.display = 'block';
                            }),
                                Array.prototype.forEach.call(errorBoxes, function (t) {
                                    t.style.display = 'block';
                                }),
                                t_addClass(form, 'js-send-form-error'),
                                t_triggerEvent(form, 'tildaform:aftererror');
                        }
                    return !0;
                }),
                secondFormTypeXhr.send(formData),
                !1
            );
        }
        if ('y' === form.getAttribute('data-is-formajax')) {
            var _t_forms__getFormData2 = t_forms__getFormData(form),
                _status = _t_forms__getFormData2.status,
                _contentType = _t_forms__getFormData2.contentType,
                dataForm = _t_forms__getFormData2.data;
            if ('invalid' === _status) return !1;
            var formAjaxXhr = new XMLHttpRequest();
            return (
                formAjaxXhr.open('POST', form.getAttribute('action'), !0),
                formAjaxXhr.setRequestHeader('Content-Type', _contentType),
                formAjaxXhr.setRequestHeader('Accept', 'text/plain, */*; q=0.01'),
                (formAjaxXhr.onreadystatechange = function () {
                    if (4 === formAjaxXhr.readyState)
                        if (formAjaxXhr.status >= 200 && formAjaxXhr.status < 400) {
                            var t = form.querySelector('.js-successbox'),
                                e = form.getAttribute('data-success-url'),
                                r = form.getAttribute('data-success-callback');
                            t_removeClass(btnSubmit, 't-btn_sending'), (btnSubmit.tildaSendingStatus = '0');
                            var o = formAjaxXhr.responseText;
                            if (o)
                                if ('{' == o.substring(0, 1)) {
                                    var n = JSON.parse(o);
                                    if ('object' == typeof n)
                                        if (n && n.message && 'OK' !== n.message) t.innerHTML = n.message;
                                        else if (n && n.error)
                                            return (
                                                (msgContainers = t_forms__getErrorContainers(
                                                    form,
                                                    'Unknown error. Please, try again later.',
                                                )),
                                                (errorBoxes = msgContainers.errorBoxes),
                                                (allError = msgContainers.allError),
                                                Array.prototype.forEach.call(allError, function (t) {
                                                    (t.style.display = 'block'), (t.innerHTML = n.error);
                                                }),
                                                Array.prototype.forEach.call(errorBoxes, function (t) {
                                                    t.style.display = 'block';
                                                }),
                                                t_addClass(form, 'js-send-form-error'),
                                                t_triggerEvent(form, 'tildaform:aftererror'),
                                                !1
                                            );
                                } else (t.innerHTML = o), t_parseScripts(t, '');
                            var a = '/tilda/' + formId + '/submitted/',
                                i = 'Send data from form ' + formId;
                            window.Tilda && 'function' == typeof window.Tilda.sendEventToStatistics
                                ? window.Tilda.sendEventToStatistics(a, i, '', 0)
                                : 'undefined' != typeof ga && 'tilda' !== window.mainTracker
                                ? ga('send', { hitType: 'pageview', page: a, title: i })
                                : window.mainMetrika > '' &&
                                  window[window.mainMetrika] &&
                                  window[window.mainMetrika].hit(a, { title: i, referer: window.location.href }),
                                t_triggerEvent(form, 'tildaform:aftersuccess'),
                                window.tildaForm.successEnd(form, e, r);
                        } else {
                            t_removeClass(btnSubmit, 't-btn_sending'),
                                (btnSubmit.tildaSendingStatus = '0'),
                                (msgContainers = t_forms__getErrorContainers(form, '')),
                                (errorBoxes = msgContainers.errorBoxes),
                                (allError = msgContainers.allError);
                            var s = formAjaxXhr.responseText;
                            Array.prototype.forEach.call(allError, function (t) {
                                s
                                    ? (t.innerHTML = s + '. Please, try again later. [' + formAjaxXhr.status + ']')
                                    : formAjaxXhr.statusText
                                    ? (t.innerHTML =
                                          'Error [' +
                                          formAjaxXhr.statusText +
                                          ']. Please, try again later. [' +
                                          formAjaxXhr.status +
                                          ']')
                                    : (t.innerHTML =
                                          'Unknown error. Please, try again later. [' + formAjaxXhr.status + ']'),
                                    (t.style.display = 'block');
                            }),
                                Array.prototype.forEach.call(errorBoxes, function (t) {
                                    t.style.display = 'block';
                                }),
                                t_addClass(form, 'js-send-form-error'),
                                t_triggerEvent(form, 'tildaform:aftererror');
                        }
                    return !0;
                }),
                formAjaxXhr.send(dataForm),
                !1
            );
        }
        return (
            -1 == form.getAttribute('action').indexOf(window.tildaForm.endpoint) &&
            (t_removeClass(btnSubmit, 't-btn_sending'), (btnSubmit.tildaSendingStatus = '3'), form.submit(), !0)
        );
    }),
    (window.validateForm = function (t) {
        return window.tildaForm.validate(t);
    }),
    (function () {
        try {
            var t = window.location.href,
                e,
                r = '';
            if (
                -1 !== t.toLowerCase().indexOf('utm_') &&
                'string' == typeof (e = (e = (t = t.toLowerCase()).split('?'))[1])
            ) {
                var o,
                    n,
                    a = e.split('&');
                for (n in a)
                    'function' != typeof a[n] &&
                        'utm_' == (o = a[n].split('='))[0].substring(0, 4) &&
                        (r = r + a[n] + '|||');
                if (r.length > 0 && (!window.tildastatcookie || 'no' != window.tildastatcookie)) {
                    var i = new Date();
                    i.setDate(i.getDate() + 30),
                        (document.cookie =
                            'TILDAUTM=' + encodeURIComponent(r) + '; path=/; expires=' + i.toUTCString());
                }
            }
        } catch (s) {}
    })();
var t_forms__setFormErrorMsg = function t(e, r) {
    e.getAttribute('data-rule-filled')
        ? (e.style.display = 'block')
        : r && ((e.innerHTML = '<a href="#" class="t-form__errorbox-link">' + r + '</a>'), (e.style.display = 'block'));
};
function t_forms__showEmptyFormError(t) {
    var e = t.querySelectorAll('.js-rule-error-all'),
        r = t_forms__getMsg('emptyfill'),
        o;
    e.forEach(function (t) {
        t_forms__setFormErrorMsg(t, r);
    }),
        t_forms__addMoveToInputWithErrorClickHandler(t.querySelector('.t-input-group'), e[0]);
}
function t_forms__showInputErrors(t, e, r) {
    if (e && 'none' !== r.obj) {
        e.classList.add('js-error-control-box');
        var o = e.querySelectorAll('.t-input-error');
        r.type.forEach(function (e) {
            var r,
                n = t_forms__getCustomMessage(t, e) || t_forms__getFieldErrorText(e);
            n &&
                o.forEach(function (t) {
                    t.innerHTML = n;
                });
        });
    }
}
function t_forms__showFormErrors(t, e, r) {
    e.type.forEach(function (o) {
        var n = t.querySelectorAll('.js-rule-error-' + o),
            a,
            i = t_forms__getCustomMessage(t, o) || t_forms__getMsg(o),
            s;
        (n.length ? n : t.querySelectorAll('.js-rule-error-all')).forEach(function (t) {
            t_forms__setFormErrorMsg(t, i, o), r.add(o, e.obj, t);
        });
    });
}
function t_forms__getFieldErrorText(t) {
    var e = t_forms__getMsg(t + 'field'),
        r;
    return e || t_forms__getMsg(t);
}
function t_forms__getCustomMessage(t, e) {
    var r = t.querySelector('.js-rule-error-' + e);
    if (!r) return '';
    var o = r.getAttribute('data-original-msg');
    if (null != o) return o;
    var n = r ? r.textContent : '';
    return r.setAttribute('data-original-msg', n), n;
}
function t_forms__createErrorFocusHash() {
    var t = {};
    return {
        add: function e(r, o, n) {
            var a = o instanceof Element;
            !t[r] && o && a && (t_forms__addMoveToInputWithErrorClickHandler(o, n), (t[r] = o));
        },
    };
}
function t_forms__scrollToInputWithError(t) {
    if (t) {
        var e = t.obj,
            r = e instanceof Element;
        'none' !== e && r && t_forms__focusInput(e);
    }
}
function t_forms__showFormErrorsContainers(t) {
    var e;
    t.querySelectorAll('.js-errorbox-all').forEach(function (t) {
        t.style.display = 'block';
    });
}
function t_forms__getElement(t) {
    return t instanceof Element ? t : t[0];
}
function t_forms__getMsg(t) {
    var e = [],
        r = window.t_forms__lang;
    return (
        (e.EN = {
            success_title: 'Thank you!',
            success_text: 'Data submitted successfully',
            success_btn: 'Done',
            success_btn_redirect: 'Continue',
            success_info: "You'll be automatically redirected in:",
            success_info_redirect_error: 'Redirecting...',
            success: 'Thank you! Your data has been submitted.',
            successorder: 'Thank you! Order created. Please wait while you are redirected to the payment page...',
            email: 'Please enter a valid email address',
            url: 'Please put a correct URL',
            phone: 'Please put a correct phone number',
            number: 'Please put a correct number',
            date: 'Please put a correct date',
            time: 'Please put a correct time (HH:mm)',
            name: 'Please put a name',
            namerus: 'Please put a correct name (only cyrillic letters)',
            nameeng: 'Please put a correct name (only latin letters)',
            string: 'You put incorrect symbols. Only letters, numbers and punctuation symbols are allowed',
            req: 'Please fill out all required fields',
            reqfield: 'Required field',
            minlength: 'Value is too short',
            maxlength: 'Value too big',
            emptyfill: 'None of the fields are filled in',
            chosevalue: 'Please select an address from the options',
            deliveryreq: 'It is not possible to place an order without delivery. Please refresh the page and try again',
            unauthorized_order: 'Please log in to proceed with your order',
            promocode: 'Please activate promo code or clear input field',
            cached_page_popup_title: 'Form submission available on original page',
            cached_page_popup_text: 'To fill out and submit the form, go to the original page',
            cached_page_popup_btn: 'Proceed',
        }),
        (e.RU = {
            success_title: 'Спасибо!',
            success_text: 'Данные успешно отправлены.',
            success_btn: 'Хорошо',
            success_btn_redirect: 'Продолжить',
            success_info: 'Автоматический переход через:',
            success_info_redirect_error: 'Перенаправление...',
            success: 'Спасибо! Данные успешно отправлены.',
            successorder: 'Спасибо! Заказ оформлен. Пожалуйста, подождите. Идет переход к оплате...',
            email: 'Укажите, пожалуйста, корректный email',
            url: 'Укажите, пожалуйста, корректный URL',
            phone: 'Укажите, пожалуйста, корректный номер телефона',
            number: 'Укажите, пожалуйста, корректный номер',
            date: 'Укажите, пожалуйста, корректную дату',
            time: 'Укажите, пожалуйста, корректное время (ЧЧ:ММ)',
            name: 'Укажите, пожалуйста, имя',
            namerus: 'Укажите, пожалуйста, имя (только кириллица)',
            nameeng: 'Укажите, пожалуйста, имя (только латиница)',
            string: 'Вы написали некорректные символы. Разрешены только буквы, числа и знаки пунктуации',
            req: 'Пожалуйста, заполните все обязательные поля',
            reqfield: 'Обязательное поле',
            minlength: 'Слишком короткое значение',
            maxlength: 'Слишком длинное',
            emptyfill: 'Ни одно поле не заполнено',
            chosevalue: 'Пожалуйста, выберите адрес из предложенных вариантов',
            deliveryreq:
                'Невозможно оформить заказ без доставки. Пожалуйста, перезагрузите страницу и попробуйте еще раз.',
            unauthorized_order: 'Пожалуйста, авторизуйтесь для оформления заказа',
            promocode: 'Активируйте, пожалуйста, промокод или очистите поле',
            cached_page_popup_title: 'Отправка формы доступна на оригинальной странице',
            cached_page_popup_text: 'Чтобы заполнить и отправить форму перейдите на оригинальную страницу',
            cached_page_popup_btn: 'Перейти',
        }),
        'function' == typeof t_forms__getDict && 'RU' !== r && 'EN' !== r && (e = window.t_forms__getDict()),
        e[r] ? e[r][t] : e.EN[t]
    );
}
function checkVerifyTildaCaptcha(t) {
    var e = t || window.event;
    if (-1 !== e.origin.indexOf(window.tildaForm.endpoint)) {
        var r = document.getElementById('js-tildaspec-captcha'),
            o = document.getElementById('tildaformcaptchabox');
        if ('closeiframe' == e.data) return o && t_removeEl(o), void (r && t_removeEl(r));
        var n = e.data;
        if (
            ('object' == typeof n &&
                ((n = JSON.stringify(n)),
                Array.isArray(window.t_jserrors) || (window.t_jserrors = []),
                window.t_jserrors.push({
                    message: 'Recaptcha returned object, instead of string: ' + n,
                    filename: 'tilda-form-1.0',
                    lineno: 0,
                    colno: 0,
                })),
            r)
        ) {
            (r.value = n), o && t_removeEl(o);
            var a = r.closest('form');
            a && t_forms__submitEvent(a);
        }
    }
}
function t_parseScripts(t, e) {
    var r = t.querySelectorAll(e + 'script');
    Array.prototype.forEach.call(r, function (e) {
        for (var r = document.createElement('script'), o = 0; o < e.attributes.length; o++) {
            var n = e.attributes[o];
            r.setAttribute(n.name, n.value);
        }
        if (e.innerHTML.length) r.appendChild(document.createTextNode(e.innerHTML)), e.parentNode.replaceChild(r, e);
        else {
            var a = document.createElement('script');
            (a.src = e.attributes.src.value), t.appendChild(a), t_removeEl(e);
        }
    });
}
function t_forms__onSuccess(t) {
    window.isRedirectError = !1;
    var e = t_forms__getElement(t),
        r = e.closest('.r'),
        o = r.getAttribute('data-record-type'),
        n = e.querySelector('.t-form__inputsbox'),
        a = getComputedStyle(n, null),
        i = parseInt(a.paddingTop) || 0,
        s = parseInt(a.paddingBottom) || 0,
        l,
        c,
        u = n.clientHeight - (i + s) + (n.getBoundingClientRect().top + window.pageYOffset),
        d = e.querySelector('.t-form__successbox'),
        m = d ? d.getBoundingClientRect().top + window.pageYOffset : 0,
        _,
        f = window.innerHeight,
        p = document.body,
        w = document.documentElement,
        v = Math.max(p.scrollHeight, p.offsetHeight, w.clientHeight, w.scrollHeight, w.offsetHeight);
    if (121 == o) {
        var g = e.getAttribute('data-success-callback');
        g && (o = g.split('_onSuccess')[0].replace('t', ''));
    }
    var h = 't' + o + '__inputsbox_hidden',
        y = [702, 708, 862, 945, 1014, 1114],
        b = !0;
    _ = window.innerWidth > 960 ? m - 200 : m - 100;
    var E = document.querySelector('.t-tildalabel'),
        F = t_forms__isNewSuccessBox(e);
    if (m > window.scrollY || v - u < f - 100)
        F || n.classList.add(h),
            f > v &&
                E &&
                setTimeout(function () {
                    t_fadeOut(E);
                }, 300);
    else {
        for (var A = 0; A < y.length; A++)
            if (y[A] == o) {
                b = !1;
                break;
            }
        b && t_forms__scrollBeginForm(_),
            setTimeout(function () {
                F || n.classList.add(h);
            }, 400);
    }
    var x = e.getAttribute('data-success-url');
    if ((x && t_forms__handleRedirect(e, x, d), 835 == o || 862 == o)) {
        var S = r.querySelector('.t' + o + '__btn_prev'),
            C = r.querySelector('.t' + o + '__wrapper'),
            T = r.querySelector('.t' + o + '__quiz-form-wrapper');
        S && (S.style.display = 'none'), C && (C.style.minHeight = ''), T && (T.style.minHeight = '');
    }
}
function t_forms__handleRedirect(t, e, r) {
    var o = 500;
    if (t_forms__isNewSuccessBox(t)) {
        var n = (null == r ? void 0 : r.getAttribute('data-success-title')) || '',
            a = (null == r ? void 0 : r.getAttribute('data-success-message')) || '',
            i = Boolean(n || a),
            s = document.getElementById('tildaformsuccesspopupinfodigit-new');
        i && f((o = 5e3));
        var l = document.getElementById('tildaformsuccesspopuplink-new');
        l && (l.removeEventListener('click', d), l.addEventListener('click', d));
        var c = null,
            u = null;
        function d(t) {
            var e;
            t.preventDefault(), clearTimeout(c), m(t.currentTarget.getAttribute('href'));
        }
        function m(t) {
            window.tildaForm.handleClosePopup(), (window.location.href = t);
        }
        function _() {
            (window.isRedirectError = !0),
                (s.textContent = ''),
                t_forms__showSuccessbox(t),
                new MutationObserver(function (t, e) {
                    (l = document.getElementById('tildaformsuccesspopuplink-new')) &&
                        (e.disconnect(), l.removeEventListener('click', d), l.addEventListener('click', d));
                }).observe(document.body, { childList: !0 });
        }
        function f(t) {
            var e = t / 1e3;
            s.textContent = e;
            var r = setInterval(function () {
                e--, (s.textContent = e), e <= 0 && clearInterval(r);
            }, 1e3);
        }
        (c = setTimeout(function () {
            try {
                var t = window.location.href;
                m(e),
                    i ||
                        (window.tildaForm.handleClosePopup(),
                        (u = setTimeout(function () {
                            try {
                                window.location.href === t && _();
                            } catch (e) {
                                console.error(e);
                            }
                        }, 2e3)));
            } catch (r) {
                console.error(r);
            }
        }, o)),
            window.addEventListener('pageshow', function () {
                clearTimeout(c), clearTimeout(u);
            });
    } else
        setTimeout(function () {
            window.location.href = e;
        }, o);
}
function t_forms__scrollBeginForm(t) {
    var e = 400,
        r = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0),
        o = t - r,
        n = 0,
        a = 16;
    function i(t) {
        var e = t;
        return (e /= 200) < 1 ? (o / 2) * e * e * e + r : (o / 2) * ((e -= 2) * e * e + 2) + r;
    }
    function s() {
        (n += a), window.scrollTo(0, i(n)), n < e ? setTimeout(s, a) : document.body.removeAttribute('data-scrollable');
    }
    document.body.setAttribute('data-scrollable', 'true'), s();
}
function t_forms__getConditionCheckHandler(t) {
    var e = Array.from(t.querySelectorAll('[data-hidden-by-condition="true"]')),
        r;
    return {
        isHiddenByCondition: function t(r) {
            return e.some(function (t) {
                return t === r || t.contains(r);
            });
        },
    };
}
function t_forms__getRecForm(t) {
    return t.querySelector('.t-form');
}
function t_forms__hasFormInRec(t) {
    return !!t_forms__getRecForm(t);
}
function t_forms__initFormFields(t) {
    var e;
    t_forms__getRecForm(t) && t_forms__parseVariables(t);
}
function t_forms__getVariableRegexp() {
    return /{{(form|tilda).([A-zА-я0-9_-]+)(?:=([^{}]+))?}}/g;
}
function t_forms__elementHasVariables(t) {
    var e;
    return t_forms__getVariableRegexp().test(t.textContent);
}
function t_forms__replaceVariablesWithPlaceholders(t) {
    var e = t_forms__findMatchingTextNodes(t, t_forms__elementHasVariables);
    return (
        e.forEach(function (t) {
            t.innerHTML = t.innerHTML.replace(t_forms__getVariableRegexp(), function (t, e, r, o) {
                return t_forms__buildVariablePlaceholderHTML(t, e, r, o);
            });
        }),
        e
    );
}
function t_forms__buildVariablePlaceholderHTML(t, e, r, o) {
    var n = document.createElement('span');
    return (
        n.classList.add('t-variable-placeholder'),
        n.setAttribute('data-variable', r),
        n.setAttribute('data-variable-domain', e),
        n.setAttribute('data-original', t),
        o && n.setAttribute('data-default-value', o),
        (n.textContent = o || r),
        n.outerHTML
    );
}
function t_forms__findMatchingTextNodes(t, e) {
    for (
        var r = [],
            o = document.createTreeWalker(t, NodeFilter.SHOW_TEXT, {
                acceptNode: function t(r) {
                    return e(r) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                },
            });
        o.nextNode();

    ) {
        var n = o.currentNode;
        ['SCRIPT', 'STYLE'].includes(n.parentElement.tagName) || r.push(n.parentElement);
    }
    return t_forms__removeDuplicateElements(r);
}
function t_forms__bindFormVariablesToPlaceholders(t, e) {
    return new Promise(function (r) {
        var o,
            n = t_forms__getUsedVariables(e, { unique: !0 }).map(function (r) {
                if (t_forms__isSystemVariable(r))
                    return (
                        e.forEach(function (e) {
                            return t_forms__updateSystemVariable(t, e, r);
                        }),
                        Promise.resolve()
                    );
                var o = t_forms__findFormField(t, r.name);
                return o
                    ? t_formsApi__initTildaField(o).then(function (o) {
                          var n = function t(e) {
                              return t_forms__updateInputVariable(e, r, o);
                          };
                          o.onChange(
                              function () {
                                  return n(t);
                              },
                              { uniqueKey: r.name },
                          ),
                              e.forEach(n);
                      })
                    : Promise.resolve();
            });
        Promise.all(n).then(r);
    });
}
function t_forms__getSystemVariables() {
    return { LEAD_ID: 'lead_id' };
}
function t_forms__isSystemVariable(t) {
    return 'tilda' === t.domain && Object.values(t_forms__getSystemVariables()).includes(t.name);
}
function t_forms__updateVariables(t, e, r) {
    var o = t.querySelectorAll(
        '.t-variable-placeholder[data-variable="' + e.name + '"][data-variable-domain="' + e.domain + '"]',
    );
    o.length &&
        o.forEach(function (t) {
            var e = t.dataset,
                o = e.variable,
                n = e.defaultValue;
            t.textContent = r || n || o;
        });
}
function t_forms__updateInputVariable(t, e, r) {
    var o = r.getValue,
        n = r.data,
        a,
        i = o().value;
    if ((n.ownVariantTitle && i && (i = i.replace(n.ownVariantTitle + ': ', '')), n.isContactMethod)) {
        var s = i[e.name];
        i = s.typeInputDisplayText ? s.typeInputDisplayText : i[e.name].value;
    }
    t_forms__updateVariables(t, e, i);
}
function t_forms__updateSystemVariable(t, e, r) {
    var o = t_forms__getSystemVariables(),
        n = t.querySelector('.t-form');
    if (n) {
        var a = r.name,
            i,
            s,
            l;
        if (r.name === o.LEAD_ID) a = (n.tildaTranId || '').split(':')[1] || '0';
        t_forms__updateVariables(e, r, a);
    }
}
function t_forms__updateAllSystemVariables(t) {
    var e = t.closest('.t-rec'),
        r,
        o;
    t_forms__getUsedVariables([e], { unique: !0 })
        .filter(t_forms__isSystemVariable)
        .forEach(function (t) {
            t_forms__updateSystemVariable(e, e, t);
        });
}
function t_forms__getUsedVariables(t, e) {
    void 0 === e && (e = {});
    var r,
        o = e.unique,
        n = Array.from(t).flatMap(function (t) {
            return Array.from(t.querySelectorAll('.t-variable-placeholder'))
                .map(function (t) {
                    return { name: t.getAttribute('data-variable'), domain: t.getAttribute('data-variable-domain') };
                })
                .filter(function (t) {
                    return t.name && t.domain;
                });
        });
    if (o) {
        var a = {};
        return n.filter(function (t) {
            var e = t.name + '|' + t.domain;
            return !a[e] && ((a[e] = !0), !0);
        });
    }
    return n;
}
function t_forms__parseVariables(t) {
    var e = t_forms__replaceVariablesWithPlaceholders(t),
        r;
    return e.length ? t_forms__bindFormVariablesToPlaceholders(t.closest('.t-rec'), e) : Promise.resolve();
}
function t_forms__findFormField(t, e) {
    var r = t.querySelector('.t-input-group[data-field-name="' + e + '"]'),
        o;
    return (
        r ||
        Array.from(t.querySelectorAll('.t-input-group[data-field-name*="' + e + '"]')).find(function (t) {
            return t.getAttribute('data-field-name').split(';').includes(e);
        })
    );
}
function t_forms__clearFormInputs(t) {
    var e = t.querySelectorAll('.t-upwidget-container__data_table_actions_remove svg'),
        r = t.querySelectorAll('input[type="text"]'),
        o = t.querySelectorAll('input[type="number"]'),
        n = t.querySelectorAll('input[type="email"]'),
        a = t.querySelectorAll('input[type="tel"], input[type="hidden"][data-tilda-rule="phone"]'),
        i = t.querySelectorAll('textarea');
    e.forEach(function (t) {
        t_triggerEvent(t, 'click');
    }),
        r.forEach(function (t) {
            t.value = '';
        }),
        o.forEach(function (t) {
            t.value = '';
        }),
        n.forEach(function (t) {
            t.value = '';
        }),
        a.forEach(function (t) {
            t.value = '';
        }),
        i.forEach(function (t) {
            (t.innerHTML = ''), (t.value = '');
        });
}
function t_forms__clearFormData(t) {
    'undefined' != typeof jQuery && jQuery(t).data('tildaformresult', { tranId: '0', orderId: '0' }),
        (t.tildaTranId = '0'),
        (t.tildaOrderId = '0');
}
function t_forms__showSuccessbox(t) {
    var e = t.querySelector('.js-successbox');
    if (!e) return Promise.resolve();
    var r = t_forms__isNewSuccessBox(t),
        o = t_forms__getSuccessBoxContent(e, r);
    return (
        (e.innerHTML = r
            ? '\n\t\t\t<div class="t-form__successbox-title">' +
              o.title +
              '</div>\n\t\t\t<div class="t-form__successbox-text">' +
              o.text +
              '</div>\n\t\t\t<div class="t-form__successbox-btn">' +
              o.button +
              '</div>\n\t\t'
            : o.text),
        t_forms__parseVariables(e).finally(function () {
            'y' !== t.getAttribute('data-success-popup')
                ? (e.style.display = 'block')
                : t_forms__showSuccessPopup(t, e);
        })
    );
}
function t_forms__getSuccessBoxContent(t, e) {
    var r = t_forms__getMsg('success'),
        o = t.getAttribute('data-success-message'),
        n = { text: '', title: '', button: '' };
    return (
        o ? (n.text = o) : (t.textContent && t.innerText) || o || !r ? (n.text = t.innerHTML) : (n.text = r),
        e &&
            (o || (n.text = ''),
            (n.title = t.getAttribute('data-success-title') || ''),
            (n.button = t.getAttribute('data-success-btn') || '')),
        n
    );
}
function t_forms__showSuccessPopup(t, e) {
    var r, o, n, a;
    if (!!t.closest('.t396')) window.tildaForm.showSuccessPopup(e.innerHTML);
    else {
        var i = {
            title: e.querySelector('.t-form__successbox-title'),
            text: e.querySelector('.t-form__successbox-text'),
            btn: e.querySelector('.t-form__successbox-btn'),
        };
        window.tildaForm.showSuccessPopupNew(
            t,
            (null == (r = i.text) ? void 0 : r.innerHTML) || '',
            (null == (o = i.title) ? void 0 : o.innerHTML) || '',
            (null == (n = i.btn) ? void 0 : n.innerHTML) || '',
        );
    }
}
function t_forms__handleSuccess(form, options) {
    var _ref2 = options || {},
        successUrl = _ref2.successUrl,
        _ref2$successCallback = _ref2.successCallback,
        successCallback = void 0 === _ref2$successCallback ? '' : _ref2$successCallback,
        callback = (successCallback || '').replace('window.', '');
    if (callback && 'function' == typeof window[callback])
        'undefined' != typeof jQuery ? eval(callback + '(jQuery(form))') : eval(callback + '(form)');
    else if (successUrl) {
        var successBox = form.querySelector('.t-form__successbox');
        t_forms__handleRedirect(form, successUrl, successBox);
    }
}
function t_forms__getRootZone() {
    var t = document.getElementById('allrecords'),
        e;
    return (t && t.getAttribute('data-tilda-root-zone')) || 'com';
}
function t_forms__isTesterPage() {
    var t = document.getElementById('allrecords'),
        e;
    return t && 'y' === t.getAttribute('data-tilda-ts');
}
function t_forms__isTeam() {
    var t = document.getElementById('allrecords');
    return t && 'y' === t.getAttribute('data-tilda-te');
}
function t_forms__isQuiz(t) {
    return t && t.closest('.t-quiz');
}
function t_forms__isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream;
}
function t_forms__isNewSuccessBox(t) {
    return (
        !!t &&
        !(!t_forms__isTeam() && !t_forms__isTesterPage()) &&
        !t_forms__isQuiz(t) &&
        !['t396', 't447', 't651', 't653', 't706', 't708', 't945', 't1122'].some(function (e) {
            return t.closest('.' + e);
        })
    );
    var e, r;
}
function t_forms__removeDuplicateElements(t) {
    var e = new Map();
    return (
        t.forEach(function (t) {
            return e.set(t, !0);
        }),
        Array.from(e.keys())
    );
}
function t_forms__getFormData(t) {
    var e = 'text/plain',
        r = 'application/x-www-form-urlencoded; charset=UTF-8';
    try {
        var o;
        if (t_forms__shouldEnableFormAsJSON()) {
            var n = t_forms__getFormDataJSON(t),
                a = window.tildaForm.tildapayment && window.tildaForm.tildapayment.products,
                i = window.tildaForm.tildamember && Object.keys(window.tildaForm.tildamember).length > 0;
            return !a && t.closest('.t706__orderform')
                ? { status: 'invalid', data: '', contentType: '' }
                : (Object.keys(n).forEach(function (t) {
                      t.includes('tildadelivery-') && delete n[t];
                  }),
                  a && (n.tildapayment = window.tildaForm.tildapayment),
                  i && (n.tildamember = window.tildaForm.tildamember),
                  { status: 'valid', data: JSON.stringify(n), contentType: e });
        }
        var s,
            l = t_serializeArray(t).filter(function (t) {
                return -1 === t.name.indexOf('tildadelivery-');
            });
        if (window.tildaForm.tildapayment && window.tildaForm.tildapayment.products)
            l.push({ name: 'tildapayment', value: JSON.stringify(window.tildaForm.tildapayment) });
        else if (t.closest('.t706__orderform')) return { status: 'invalid', data: '', contentType: '' };
        return (
            window.tildaForm.tildamember &&
                Object.keys(window.tildaForm.tildamember).length > 0 &&
                l.push({ name: 'tildamember', value: JSON.stringify(window.tildaForm.tildamember) }),
            { status: 'valid', data: t_forms__formData(l), contentType: r }
        );
    } catch (c) {
        return (
            console.error('Failed to prepare form data for process. Error:', c),
            { status: 'invalid', data: '', contentType: '' }
        );
    }
}
function t_forms__shouldEnableFormAsJSON() {
    try {
        var t;
        return 'true' === new URLSearchParams(window.location.search).get('sendjson');
    } catch (e) {
        return !1;
    }
}
function t_removeEl(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
}
var t_forms__htmlEvents = {
    onblur: 1,
    onchange: 1,
    onfocus: 1,
    onsubmit: 1,
    onclick: 1,
    ondblclick: 1,
    onkeydown: 1,
    onkeypress: 1,
    onpaste: 1,
    oninput: 1,
};
function t_removeEventListener(t, e, r) {
    t.removeEventListener
        ? t.removeEventListener(e, r, !1)
        : t.detachEvent && t_forms__htmlEvents['on' + e]
        ? t.detachEvent('on' + e, r)
        : (t['on' + e] = null);
}
function t_addEventListener(t, e, r, o) {
    t.addEventListener
        ? t.addEventListener(e, r, o)
        : t.attachEvent && t_forms__htmlEvents['on' + e]
        ? t.attachEvent('on' + e, r)
        : (t['on' + e] = r);
}
function t_serializeArray(t) {
    for (
        var e = [],
            r = t.querySelectorAll('input, textarea, button, select'),
            o,
            n = t_forms__getConditionCheckHandler(t).isHiddenByCondition,
            a = 0;
        a < r.length;
        a++
    )
        if (!(!r[a].name || r[a].disabled || ['file', 'reset', 'submit', 'button'].indexOf(r[a].type) > -1 || n(r[a])))
            if ('select-multiple' !== r[a].type) {
                if (!(['checkbox', 'radio'].indexOf(r[a].type) > -1) || r[a].checked) {
                    var i = r[a].name,
                        s = r[a].value;
                    e.push({ name: i, value: s });
                }
            } else
                for (var l = r[a].options, c = 0; c < l.length; c++)
                    l[c].selected && e.push({ name: l[c].name, value: l[c].value });
    return e;
}
function t_forms__getFormDataJSON(t) {
    var e = {},
        r = t.querySelectorAll('input, textarea, button, select'),
        o,
        n = t_forms__getConditionCheckHandler(t).isHiddenByCondition,
        a = function t(r, o) {
            Array.isArray(e[r]) || (e[r] = []), e[r].push(o);
        };
    return (
        r.forEach(function (t) {
            var r = t.name,
                o = t.type,
                i = t.disabled,
                s = t.value,
                l = t.checked,
                c = t.options;
            if (
                r &&
                !i &&
                !n(t) &&
                !['file', 'reset', 'submit', 'button'].includes(o) &&
                (!['checkbox', 'radio'].includes(o) || l)
            )
                if ('select-multiple' !== o)
                    if (r.includes('[]')) {
                        var u = r.replace('[]', '');
                        a(u, s);
                    } else e[r] = s;
                else
                    Array.from(c || [])
                        .filter(function (t) {
                            return t.selected;
                        })
                        .forEach(function (t) {
                            return a(r, t.value);
                        });
        }),
        e
    );
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
function t_hasClass(t, e) {
    return document.body.classList ? t.classList.contains(e) : new RegExp('(\\s|^)' + e + '(\\s|$)').test(t.className);
}
function t_forms__formData(t) {
    for (var e = '', r = 0; r < t.length; r++)
        '' !== e && (e += '&'), (e += encodeURIComponent(t[r].name) + '=' + encodeURIComponent(t[r].value));
    return e.replace(/%20/g, '+');
}
function t_fadeOut(t) {
    if ('none' !== t.style.display)
        var e = 1,
            r = setInterval(function () {
                (t.style.opacity = e),
                    (e -= 0.1) <= 0.1 && (clearInterval(r), (t.style.display = 'none'), (t.style.opacity = null));
            }, 30);
}
function t_fadeIn(t) {
    if ('block' !== t.style.display) {
        var e = 0;
        (t.style.opacity = e), (t.style.display = 'block');
        var r = setInterval(function () {
            (t.style.opacity = e), (e += 0.1) >= 1 && clearInterval(r);
        }, 30);
    }
}
function t_triggerEvent(t, e) {
    var r;
    document.createEvent
        ? (r = document.createEvent('HTMLEvents')).initEvent(e, !0, !1)
        : document.createEventObject && ((r = document.createEventObject()).eventType = e),
        (r.eventName = e),
        t.dispatchEvent
            ? t.dispatchEvent(r)
            : t.fireEvent
            ? t.fireEvent('on' + r.eventType, r)
            : t[e]
            ? t[e]()
            : t['on' + e] && t['on' + e]();
}
function t_forms__processFormsInPopup(t, e) {
    if (t.style.backgroundColor) {
        var r = document.createElement('style');
        r.className = 't-success-popup';
        var o =
            '\n\t\t\t#tildaformsuccesspopup-new {\n\t\t\t\tbackground-color: ' + t.style.backgroundColor + ';\n\t\t\t}';
        (r.textContent = o), document.head.appendChild(r);
    }
    var n,
        a = 't' + e.closest('.t-rec').getAttribute('data-record-type') + '_closePopup',
        i = e.closest('.t-rec').id.replace('rec', '');
    'function' == typeof window[a] && window[a](i);
}
function t_forms__drawNewSuccessPopup() {
    return '\n\t\t<div class="t-form-success-popup t-form-success-popup_new" style="display:none;" id="tildaformsuccesspopup-new"\n\t\t\trole="dialog"\n\t\t\taria-modal="true"\n\t\t\ttabindex="-1"\n\t\t\taria-label="Success"\n\t\t>\n\t\t\t<div class="t-form-success-popup__wrapper">\n\n\t\t\t\t<button type="button" class="t-form-success-popup__close-icon" id="tildaformsuccesspopupclose-new" aria-label="Закрыть диалоговое окно">\n\t\t\t\t\t<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">\n\t\t\t\t\t\t<path fill="#000" fill-rule="evenodd" d="M7 5.863 1.138 0 0 1.138 5.862 7 0 12.862 1.137 14 7 8.137 12.863 14 14 12.862 8.138 7 14 1.138 12.863 0 7.001 5.863Z" clip-rule="evenodd" opacity=".4"/>\n\t\t\t\t\t</svg>\n\t\t\t\t</button>\n\n\t\t\t\t<svg class="t-form-success-popup__content-icon" xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none" viewBox="0 0 210 210">\n\t\t\t\t\t<path class="t-form-success-popup__content-icon-background" \n\t\t\t\t\t\td="M 86.0696 10.2777 C 97.7443 -0.973851 116.104 -0.973851 127.779 10.2777 L 127.779 10.2777 C 133.881 16.1585 142.136 19.1954 150.551 18.6547 L 150.551 18.6547 C 166.65 17.6203 180.714 29.5482 182.502 45.7521 L 182.502 45.7521 C 183.436 54.2214 187.829 61.9111 194.619 66.9636 L 194.619 66.9636 C 207.609 76.6302 210.798 94.9049 201.862 108.479 L 201.862 108.479 C 197.191 115.574 195.665 124.318 197.653 132.6 L 197.653 132.6 C 201.457 148.445 192.277 164.515 176.799 169.108 L 176.799 169.108 C 168.709 171.509 161.979 177.216 158.235 184.852 L 158.235 184.852 C 151.072 199.461 133.819 205.807 119.041 199.27 L 119.041 199.27 C 111.317 195.853 102.532 195.853 94.8075 199.27 L 94.8075 199.27 C 80.0294 205.807 62.7766 199.461 55.6135 184.852 L 55.6135 184.852 C 51.8695 177.216 45.1396 171.509 37.0495 169.108 L 37.0495 169.108 C 21.5714 164.515 12.3913 148.445 16.1948 132.6 L 16.1948 132.6 C 18.1828 124.318 16.6573 115.574 11.9867 108.479 L 11.9867 108.479 C 3.05084 94.9049 6.23902 76.6302 19.2295 66.9636 L 19.2295 66.9636 C 26.0194 61.9111 30.4119 54.2214 31.3462 45.7521 L 31.3462 45.7521 C 33.1339 29.5482 47.1984 17.6203 63.2976 18.6547 L 63.2976 18.6547 C 71.7122 19.1954 79.9676 16.1585 86.0696 10.2777 L 86.0696 10.2777 Z" \n\t\t\t\t\t\tfill="#30C546">\n\t\t\t\t\t</path>\n\t\t\t\t\t<path class="t-form-success-popup__content-icon-check" \n\t\t\t\t\t\td="M 66.7645 107.258 L 90.6617 129.843 L 143.235 80.157" \n\t\t\t\t\t\tstroke="white" \n\t\t\t\t\t\tstroke-width="14.7059" \n\t\t\t\t\t\tstroke-linecap="round" \n\t\t\t\t\t\tstroke-linejoin="round" \n\t\t\t\t\t\tfill="none"\n\t\t\t\t\t\tpathLength="1">\n\t\t\t\t\t</path>\n\t\t\t\t</svg>\n\t\t\t\n\t\t\t\t<div class="t-form-success-popup__title t-title" id="tildaformsuccesspopuptitle-new"></div>\n\n\t\t\t\t<div class="t-form-success-popup__text t-text" id="tildaformsuccesspopuptext-new"></div>\n\n\t\t\t\t<a href="" class="t-form-success-popup__button t-btn t-form-success-popup_hidden" id="tildaformsuccesspopuplink-new"></a>\n\n\t\t\t\t<button type="button" class="t-form-success-popup__button t-btn t-form-success-popup_hidden" id="tildaformsuccesspopupbtn-new"></button>\n\n\t\t\t\t<div class="t-form-success-popup__info t-form-success-popup_hidden" id="tildaformsuccesspopupinfo-new">\n\t\t\t\t\t<span class="t-form-success-popup__info-text t-text" id="tildaformsuccesspopupinfotext-new"></span>\n\t\t\t\t\t<span class="t-form-success-popup__info-timer t-text">\n\t\t\t\t\t\t<span class="t-form-success-popup__info-digit" id="tildaformsuccesspopupinfodigit-new"></span>\n\n\t\t\t\t\t\t<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t\t<path d="M9 0.6C7.33864 0.6 5.71458 1.09265 4.33321 2.01566C2.95184 2.93866 1.87519 4.25056 1.23941 5.78546C0.603636 7.32036 0.437288 9.00932 0.761404 10.6388C1.08552 12.2682 1.88554 13.7649 3.0603 14.9397C4.23506 16.1145 5.7318 16.9145 7.36124 17.2386C8.99068 17.5627 10.6796 17.3964 12.2145 16.7606C13.7494 16.1248 15.0613 15.0482 15.9843 13.6668C16.9073 12.2854 17.4 10.6614 17.4 9" stroke="black" stroke-width="1.2"/>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>';
}
function t_forms__trapFocus(t) {
    var e = t.querySelectorAll(
            'a, button, input:not([type="hidden"]):not(.js-form-spec-comments), select, textarea, embed, video, iframe, [tabindex="0"]',
        ),
        r = e[0],
        o = e[e.length - 1];
    document.addEventListener('keydown', function (t) {
        if (document.body.classList.contains('t-body_popupshowed')) {
            var e = 'Tab' === t.key || 9 === t.keyCode,
                n;
            (e || (e && t.shiftKey)) &&
                (t.shiftKey && document.activeElement.classList.contains('t-popup_show') && o.focus(),
                'Tab' !== t.key || t.shiftKey || document.activeElement !== o || (t.preventDefault(), r.focus()),
                'Tab' === t.key && t.shiftKey && document.activeElement === r && (t.preventDefault(), o.focus()));
        }
    });
}
function t_forms__isCachedPage() {
    try {
        for (
            var t = new URL(window.location.href),
                e = t.hostname,
                r = t.href,
                o,
                n = 0,
                a = [
                    { domains: ['webcache.googleusercontent.com'], urlPattern: /(^|&)q=cache:/ },
                    { domains: ['www.google.com'], urlPattern: /\/amp\/s\// },
                    { domains: ['yandex.ru'], urlPattern: /\/turbo\?/ },
                    { domains: ['t.me'], urlPattern: /\/web\// },
                    { domains: ['dzen.ru'], urlPattern: /\/away\?/ },
                    {
                        domains: [
                            'yandexwebcache.net',
                            'archive.today',
                            'archive.ph',
                            'archive.is',
                            'web.archive.org',
                            'ghostarchive.org',
                            'cachedview.com',
                        ],
                    },
                ];
            n < a.length;
            n++
        ) {
            var i = a[n],
                s = i.domains.some(function (t) {
                    return e === t;
                }),
                l = !!i.urlPattern && i.urlPattern.test(r);
            if (s || l) return !0;
        }
        return !1;
    } catch (c) {
        return !1;
    }
}
function t_forms__getCanonicalUrl() {
    var t = document.querySelector('link[rel="canonical"]');
    return t ? t.getAttribute('href') : '';
}
function t_forms__showWrongPageUrlMessage(t) {
    if (t) {
        var e = 'tildaforms-origin-url-popup-notification',
            r = document.getElementById(e);
        if (r) i(r);
        else {
            var o =
                '\n\t\t<div id="' +
                e +
                '" class="t-form-success-popup t-form-success-popup_new" role="dialog" aria-modal="true" tabindex="-1" aria-label="Wrong Page URL">\n\t\t\t<div class="t-form-success-popup__wrapper">\n\n\t\t\t\t<button type="button" class="t-form-success-popup__close-icon" aria-label="Закрыть диалоговое окно">\n\t\t\t\t\t<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">\n\t\t\t\t\t\t<path fill="#000" fill-rule="evenodd" d="M7 5.863 1.138 0 0 1.138 5.862 7 0 12.862 1.137 14 7 8.137 12.863 14 14 12.862 8.138 7 14 1.138 12.863 0 7.001 5.863Z" clip-rule="evenodd" opacity=".4"></path>\n\t\t\t\t\t</svg>\n\t\t\t\t</button>\n\n\t\t\t\t<svg class="t-form-success-popup__content-icon" xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 21 21" fill="none" data-app="Xyris">\n\t\t\t\t\t<circle cx="10.5" cy="10.5" r="10.5" fill="#F87A61"/>\n\t\t\t\t\t<path d="M10.0781 13.1562L9.64844 7.08594V4.54688H11.3906V7.08594L10.9844 13.1562H10.0781ZM9.71094 16V14.3984H11.3281V16H9.71094Z" fill="white"/>\n\t\t\t\t</svg>\n\n\t\t\t\t<div class="t-form-success-popup__title t-title">' +
                t_forms__getMsg('cached_page_popup_title') +
                '</div>\n\n\t\t\t\t<div class="t-form-success-popup__text t-text">' +
                t_forms__getMsg('cached_page_popup_text') +
                '</div>\n\n\t\t\t\t<a href="' +
                t +
                '" class="t-form-success-popup__button t-btn">' +
                t_forms__getMsg('cached_page_popup_btn') +
                '</a>\n\t\t\t</div>\n\t\t</div>\n\t';
            document.body.insertAdjacentHTML('beforeend', o);
            var n = document.getElementById(e),
                a = n.querySelector('.t-form-success-popup__close-icon');
            t_addEventListener(n, 'click', function (t) {
                var e = t || window.event,
                    r;
                (e.target || e.srcElement) === this && s(n);
            }),
                t_addEventListener(a, 'click', function () {
                    s(n);
                }),
                i(n);
        }
    }
    function i(t) {
        t_fadeIn(t),
            t_addClass(document.body, 't-body_success-popup-showed'),
            t_forms__isIOS() &&
                setTimeout(function () {
                    window.tildaForm.lockBodyScroll();
                }, 500),
            t_forms__trapFocus(t);
    }
    function s(t) {
        t_removeClass(document.body, 't-body_success-popup-showed'),
            t_forms__isIOS() && window.tildaForm.unlockBodyScroll(),
            t_fadeOut(t);
    }
}
