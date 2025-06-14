/*! For license information please see atlasmap.js.LICENSE.txt */
(() => {
    var t = {
        630: () => {
            L.Curve = L.Path.extend({
                options: {},
                initialize: function (t, e) {
                    L.setOptions(this, e),
                    this._setPath(t)
                },
                getPath: function () {
                    return this._coords
                },
                setPath: function (t) {
                    return this._setPath(t),
                    this.redraw()
                },
                getBounds: function () {
                    return this._bounds
                },
                _setPath: function (t) {
                    this._coords = t,
                    this._bounds = this._computeBounds()
                },
                _computeBounds: function () {
                    for (var t, e, i = new L.LatLngBounds, n = 0; n < this._coords.length; n++)
                        if (coord = this._coords[n], "string" == typeof coord || coord instanceof String)
                            e = coord;
                        else if ("H" == e)
                            i.extend([t.lat, coord[0]]), t = new L.latLng(t.lat, coord[0]);
                        else if ("V" == e)
                            i.extend([coord[0], t.lng]), t = new L.latLng(coord[0], t.lng);
                        else if ("C" == e) {
                            var o = new L.latLng(coord[0], coord[1]);
                            coord = this._coords[++n];
                            var r = new L.latLng(coord[0], coord[1]);
                            coord = this._coords[++n];
                            var s = new L.latLng(coord[0], coord[1]);
                            i.extend(o),
                            i.extend(r),
                            i.extend(s),
                            s.controlPoint1 = o,
                            s.controlPoint2 = r,
                            t = s
                        } else if ("S" == e) {
                            if (r = new L.latLng(coord[0], coord[1]), coord = this._coords[++n], s = new L.latLng(coord[0], coord[1]), o = t, t.controlPoint2) {
                                var a = t.lat - t.controlPoint2.lat,
                                h = t.lng - t.controlPoint2.lng;
                                o = new L.latLng(t.lat + a, t.lng + h)
                            }
                            i.extend(o),
                            i.extend(r),
                            i.extend(s),
                            s.controlPoint1 = o,
                            s.controlPoint2 = r,
                            t = s
                        } else if ("Q" == e) {
                            var l = new L.latLng(coord[0], coord[1]);
                            coord = this._coords[++n],
                            s = new L.latLng(coord[0], coord[1]),
                            i.extend(l),
                            i.extend(s),
                            s.controlPoint = l,
                            t = s
                        } else
                            "T" == e ? (s = new L.latLng(coord[0], coord[1]), l = t, t.controlPoint && (a = t.lat - t.controlPoint.lat, h = t.lng - t.controlPoint.lng, l = new L.latLng(t.lat + a, t.lng + h)), i.extend(l), i.extend(s), s.controlPoint = l, t = s) : (i.extend(coord), t = new L.latLng(coord[0], coord[1]));
                    return i
                },
                getCenter: function () {
                    return this._bounds.getCenter()
                },
                _update: function () {
                    this._map && this._updatePath()
                },
                _updatePath: function () {
                    this._renderer._updatecurve(this)
                },
                _project: function () {
                    var t,
                    e,
                    i,
                    n;
                    this._points = [];
                    for (var o = 0; o < this._coords.length; o++)
                        if ("string" == typeof(t = this._coords[o]) || t instanceof String)
                            this._points.push(t), i = t;
                        else {
                            switch (t.length) {
                            case 2:
                                n = this._map.latLngToLayerPoint(t),
                                e = t;
                                break;
                            case 1:
                                "H" == i ? (n = this._map.latLngToLayerPoint([e[0], t[0]]), e = [e[0], t[0]]) : (n = this._map.latLngToLayerPoint([t[0], e[1]]), e = [t[0], e[1]])
                            }
                            this._points.push(n)
                        }
                }
            }),
            L.curve = function (t, e) {
                return new L.Curve(t, e)
            },
            L.SVG.include({
                _updatecurve: function (t) {
                    this._setPath(t, this._curvePointsToPath(t._points))
                },
                _curvePointsToPath: function (t) {
                    for (var e, i, n = "", o = 0; o < t.length; o++)
                        if ("string" == typeof(e = t[o]) || e instanceof String)
                            n += i = e;
                        else
                            switch (i) {
                            case "H":
                                n += e.x + " ";
                                break;
                            case "V":
                                n += e.y + " ";
                                break;
                            default:
                                n += e.x + "," + e.y + " "
                            }
                    return n || "M0 0"
                }
            })
        },
        784: () => {
            !function () {
                function t(t, e) {
                    var i,
                    n;
                    this.title = t.title,
                    this.stateName = t.stateName ? t.stateName : "unnamed-state",
                    this.icon = L.DomUtil.create("span", ""),
                    L.DomUtil.addClass(this.icon, "button-state state-" + this.stateName.replace(/(^\s*|\s*$)/g, "")),
                    this.icon.innerHTML = ((i = t.icon).match(/[&;=<>"']/) ? n = i : (i = i.replace(/(^\s*|\s*$)/g, ""), n = L.DomUtil.create("span", ""), 0 === i.indexOf("fa-") ? L.DomUtil.addClass(n, "fa " + i) : 0 === i.indexOf("glyphicon-") ? L.DomUtil.addClass(n, "glyphicon " + i) : L.DomUtil.addClass(n, i), n = n.outerHTML), n),
                    this.onClick = L.Util.bind(t.onClick ? t.onClick : function () {}, e)
                }
                L.Control.EasyBar = L.Control.extend({
                    options: {
                        position: "topleft",
                        id: null,
                        leafletClasses: !0
                    },
                    initialize: function (t, e) {
                        e && L.Util.setOptions(this, e),
                        this._buildContainer(),
                        this._buttons = [];
                        for (var i = 0; i < t.length; i++)
                            t[i]._bar = this, t[i]._container = t[i].button, this._buttons.push(t[i]), this.container.appendChild(t[i].button)
                    },
                    _buildContainer: function () {
                        this._container = this.container = L.DomUtil.create("div", ""),
                        this.options.leafletClasses && L.DomUtil.addClass(this.container, "leaflet-bar easy-button-container leaflet-control"),
                        this.options.id && (this.container.id = this.options.id)
                    },
                    enable: function () {
                        return L.DomUtil.addClass(this.container, "enabled"),
                        L.DomUtil.removeClass(this.container, "disabled"),
                        this.container.setAttribute("aria-hidden", "false"),
                        this
                    },
                    disable: function () {
                        return L.DomUtil.addClass(this.container, "disabled"),
                        L.DomUtil.removeClass(this.container, "enabled"),
                        this.container.setAttribute("aria-hidden", "true"),
                        this
                    },
                    onAdd: function () {
                        return this.container
                    },
                    addTo: function (t) {
                        this._map = t;
                        for (var e = 0; e < this._buttons.length; e++)
                            this._buttons[e]._map = t;
                        var i = this._container = this.onAdd(t),
                        n = this.getPosition(),
                        o = t._controlCorners[n];
                        return L.DomUtil.addClass(i, "leaflet-control"),
                        -1 !== n.indexOf("bottom") ? o.insertBefore(i, o.firstChild) : o.appendChild(i),
                        this
                    }
                }),
                L.easyBar = function () {
                    for (var t = [L.Control.EasyBar], e = 0; e < arguments.length; e++)
                        t.push(arguments[e]);
                    return new(Function.prototype.bind.apply(L.Control.EasyBar, t))
                },
                L.Control.EasyButton = L.Control.extend({
                    options: {
                        position: "topleft",
                        id: null,
                        type: "replace",
                        states: [],
                        leafletClasses: !0,
                        tagName: "button"
                    },
                    initialize: function (e, i, n, o) {
                        this.options.states = [],
                        null != o && (this.options.id = o),
                        this.storage = {},
                        "object" == typeof arguments[arguments.length - 1] && L.Util.setOptions(this, arguments[arguments.length - 1]),
                        0 === this.options.states.length && "string" == typeof e && "function" == typeof i && this.options.states.push({
                            icon: e,
                            onClick: i,
                            title: "string" == typeof n ? n : ""
                        }),
                        this._states = [];
                        for (var r = 0; r < this.options.states.length; r++)
                            this._states.push(new t(this.options.states[r], this));
                        this._buildButton(),
                        this._activateState(this._states[0])
                    },
                    _buildButton: function () {
                        if (this.button = L.DomUtil.create(this.options.tagName, ""), "button" === this.options.tagName && this.button.setAttribute("type", "button"), this.options.id && (this.button.id = this.options.id), this.options.leafletClasses && L.DomUtil.addClass(this.button, "easy-button-button leaflet-bar-part leaflet-interactive"), L.DomEvent.addListener(this.button, "dblclick", L.DomEvent.stop), L.DomEvent.addListener(this.button, "mousedown", L.DomEvent.stop), L.DomEvent.addListener(this.button, "mouseup", L.DomEvent.stop), L.DomEvent.addListener(this.button, "click", (function (t) {
                                    L.DomEvent.stop(t),
                                    this._currentState.onClick(this, this._map ? this._map : null),
                                    this._map && this._map.getContainer().focus()
                                }), this), "replace" == this.options.type)
                            this.button.appendChild(this._currentState.icon);
                        else
                            for (var t = 0; t < this._states.length; t++)
                                this.button.appendChild(this._states[t].icon)
                    },
                    _currentState: {
                        stateName: "unnamed",
                        icon: document.createElement("span")
                    },
                    _states: null,
                    state: function (t) {
                        return 0 === arguments.length ? this._currentState.stateName : ("string" == typeof t ? this._activateStateNamed(t) : "number" == typeof t && this._activateState(this._states[t]), this)
                    },
                    _activateStateNamed: function (t) {
                        for (var e = 0; e < this._states.length; e++)
                            this._states[e].stateName == t && this._activateState(this._states[e])
                    },
                    _activateState: function (t) {
                        if (t !== this._currentState) {
                            "replace" == this.options.type && (this.button.appendChild(t.icon), this.button.removeChild(this._currentState.icon)),
                            t.title ? this.button.title = t.title : this.button.removeAttribute("title");
                            for (var e = 0; e < this._states.length; e++)
                                L.DomUtil.removeClass(this._states[e].icon, this._currentState.stateName + "-active"), L.DomUtil.addClass(this._states[e].icon, t.stateName + "-active");
                            L.DomUtil.removeClass(this.button, this._currentState.stateName + "-active"),
                            L.DomUtil.addClass(this.button, t.stateName + "-active"),
                            this._currentState = t
                        }
                    },
                    enable: function () {
                        return L.DomUtil.addClass(this.button, "enabled"),
                        L.DomUtil.removeClass(this.button, "disabled"),
                        this.button.setAttribute("aria-hidden", "false"),
                        this
                    },
                    disable: function () {
                        return L.DomUtil.addClass(this.button, "disabled"),
                        L.DomUtil.removeClass(this.button, "enabled"),
                        this.button.setAttribute("aria-hidden", "true"),
                        this
                    },
                    onAdd: function (t) {
                        var e = L.easyBar([this], {
                            position: this.options.position,
                            leafletClasses: this.options.leafletClasses
                        });
                        return this._anonymousBar = e,
                        this._container = e.container,
                        this._anonymousBar.container
                    },
                    removeFrom: function (t) {
                        return this._map === t && this.remove(),
                        this
                    }
                }),
                L.easyButton = function () {
                    var t = Array.prototype.concat.apply([L.Control.EasyButton], arguments);
                    return new(Function.prototype.bind.apply(L.Control.EasyButton, t))
                }
            }
            ()
        },
        157: () => {
            L.ImageOverlay.Rotated = L.ImageOverlay.extend({
                initialize: function (t, e, i, n, o) {
                    "string" == typeof t ? this._url = t : this._rawImage = t,
                    this._topLeft = L.latLng(e),
                    this._topRight = L.latLng(i),
                    this._bottomLeft = L.latLng(n),
                    L.setOptions(this, o)
                },
                onAdd: function (t) {
                    this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()),
                    this.options.interactive && (L.DomUtil.addClass(this._rawImage, "leaflet-interactive"), this.addInteractiveTarget(this._rawImage)),
                    t.on("zoomend resetview", this._reset, this),
                    this.getPane().appendChild(this._image),
                    this._reset()
                },
                onRemove: function (t) {
                    t.off("zoomend resetview", this._reset, this),
                    L.ImageOverlay.prototype.onRemove.call(this, t)
                },
                _initImage: function () {
                    var t = this._rawImage;
                    this._url && ((t = L.DomUtil.create("img")).style.display = "none", this.options.crossOrigin && (t.crossOrigin = ""), t.src = this._url, this._rawImage = t),
                    L.DomUtil.addClass(t, "leaflet-image-layer");
                    var e = this._image = L.DomUtil.create("div", "leaflet-image-layer " + (this._zoomAnimated ? "leaflet-zoom-animated" : ""));
                    this._updateZIndex(),
                    e.appendChild(t),
                    e.onselectstart = L.Util.falseFn,
                    e.onmousemove = L.Util.falseFn,
                    t.onload = function () {
                        this._reset(),
                        t.style.display = "block",
                        this.fire("load")
                    }
                    .bind(this),
                    t.alt = this.options.alt
                },
                _reset: function () {
                    var t = this._image;
                    if (this._map) {
                        var e = this._map.latLngToLayerPoint(this._topLeft),
                        i = this._map.latLngToLayerPoint(this._topRight),
                        n = this._map.latLngToLayerPoint(this._bottomLeft),
                        o = i.subtract(e).add(n),
                        r = L.bounds([e, i, n, o]),
                        s = r.getSize(),
                        a = e.subtract(r.min);
                        this._bounds = L.latLngBounds(this._map.layerPointToLatLng(r.min), this._map.layerPointToLatLng(r.max)),
                        L.DomUtil.setPosition(t, r.min),
                        t.style.width = s.x + "px",
                        t.style.height = s.y + "px";
                        var h = this._rawImage.width,
                        l = this._rawImage.height;
                        if (h && l) {
                            var c = i.subtract(e),
                            u = n.subtract(e);
                            this._rawImage.style.transformOrigin = "0 0",
                            this._rawImage.style.transform = "matrix(" + c.x / h + ", " + c.y / h + ", " + u.x / l + ", " + u.y / l + ", " + a.x + ", " + a.y + ")"
                        }
                    }
                },
                reposition: function (t, e, i) {
                    this._topLeft = L.latLng(t),
                    this._topRight = L.latLng(e),
                    this._bottomLeft = L.latLng(i),
                    this._reset()
                },
                setUrl: function (t) {
                    return this._url = t,
                    this._rawImage && (this._rawImage.src = t),
                    this
                }
            }),
            L.imageOverlay.rotated = function (t, e, i, n, o) {
                return new L.ImageOverlay.Rotated(t, e, i, n, o)
            }
        },
        58: function (t, e) {
            !function (t) {
                "use strict";
                function e(t) {
                    var e,
                    i,
                    n,
                    o;
                    for (i = 1, n = arguments.length; i < n; i++)
                        for (e in o = arguments[i])
                            t[e] = o[e];
                    return t
                }
                var i = Object.create || function () {
                    function t() {}
                    return function (e) {
                        return t.prototype = e,
                        new t
                    }
                }
                ();
                function n(t, e) {
                    var i = Array.prototype.slice;
                    if (t.bind)
                        return t.bind.apply(t, i.call(arguments, 1));
                    var n = i.call(arguments, 2);
                    return function () {
                        return t.apply(e, n.length ? n.concat(i.call(arguments)) : arguments)
                    }
                }
                var o = 0;
                function r(t) {
                    return "_leaflet_id" in t || (t._leaflet_id = ++o),
                    t._leaflet_id
                }
                function s(t, e, i) {
                    var n,
                    o,
                    r,
                    s;
                    return s = function () {
                        n = !1,
                        o && (r.apply(i, o), o = !1)
                    },
                    r = function () {
                        n ? o = arguments : (t.apply(i, arguments), setTimeout(s, e), n = !0)
                    },
                    r
                }
                function a(t, e, i) {
                    var n = e[1],
                    o = e[0],
                    r = n - o;
                    return t === n && i ? t : ((t - o) % r + r) % r + o
                }
                function h() {
                    return !1
                }
                function l(t, e) {
                    if (!1 === e)
                        return t;
                    var i = Math.pow(10, void 0 === e ? 6 : e);
                    return Math.round(t * i) / i
                }
                function c(t) {
                    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                }
                function u(t) {
                    return c(t).split(/\s+/)
                }
                function d(t, e) {
                    for (var n in Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? i(t.options) : {}), e)
                        t.options[n] = e[n];
                    return t.options
                }
                function p(t, e, i) {
                    var n = [];
                    for (var o in t)
                        n.push(encodeURIComponent(i ? o.toUpperCase() : o) + "=" + encodeURIComponent(t[o]));
                    return (e && -1 !== e.indexOf("?") ? "&" : "?") + n.join("&")
                }
                var f = /\{ *([\w_ -]+) *\}/g;
                function _(t, e) {
                    return t.replace(f, (function (t, i) {
                            var n = e[i];
                            if (void 0 === n)
                                throw new Error("No value provided for variable " + t);
                            return "function" == typeof n && (n = n(e)),
                            n
                        }))
                }
                var m = Array.isArray || function (t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                };
                function g(t, e) {
                    for (var i = 0; i < t.length; i++)
                        if (t[i] === e)
                            return i;
                    return -1
                }
                var v = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
                function y(t) {
                    return window["webkit" + t] || window["moz" + t] || window["ms" + t]
                }
                var w = 0;
                function b(t) {
                    var e = +new Date,
                    i = Math.max(0, 16 - (e - w));
                    return w = e + i,
                    window.setTimeout(t, i)
                }
                var x = window.requestAnimationFrame || y("RequestAnimationFrame") || b,
                P = window.cancelAnimationFrame || y("CancelAnimationFrame") || y("CancelRequestAnimationFrame") || function (t) {
                    window.clearTimeout(t)
                };
                function T(t, e, i) {
                    if (!i || x !== b)
                        return x.call(window, n(t, e));
                    t.call(e)
                }
                function S(t) {
                    t && P.call(window, t)
                }
                var k = {
                    __proto__: null,
                    extend: e,
                    create: i,
                    bind: n,
                    get lastId() {
                        return o
                    },
                    stamp: r,
                    throttle: s,
                    wrapNum: a,
                    falseFn: h,
                    formatNum: l,
                    trim: c,
                    splitWords: u,
                    setOptions: d,
                    getParamString: p,
                    template: _,
                    isArray: m,
                    indexOf: g,
                    emptyImageUrl: v,
                    requestFn: x,
                    cancelFn: P,
                    requestAnimFrame: T,
                    cancelAnimFrame: S
                };
                function M() {}
                M.extend = function (t) {
                    var n = function () {
                        d(this),
                        this.initialize && this.initialize.apply(this, arguments),
                        this.callInitHooks()
                    },
                    o = n.__super__ = this.prototype,
                    r = i(o);
                    for (var s in r.constructor = n, n.prototype = r, this)
                        Object.prototype.hasOwnProperty.call(this, s) && "prototype" !== s && "__super__" !== s && (n[s] = this[s]);
                    return t.statics && e(n, t.statics),
                    t.includes && (function (t) {
                        if ("undefined" != typeof L && L && L.Mixin) {
                            t = m(t) ? t : [t];
                            for (var e = 0; e < t.length; e++)
                                t[e] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", (new Error).stack)
                        }
                    }
                        (t.includes), e.apply(null, [r].concat(t.includes))),
                    e(r, t),
                    delete r.statics,
                    delete r.includes,
                    r.options && (r.options = o.options ? i(o.options) : {}, e(r.options, t.options)),
                    r._initHooks = [],
                    r.callInitHooks = function () {
                        if (!this._initHooksCalled) {
                            o.callInitHooks && o.callInitHooks.call(this),
                            this._initHooksCalled = !0;
                            for (var t = 0, e = r._initHooks.length; t < e; t++)
                                r._initHooks[t].call(this)
                        }
                    },
                    n
                },
                M.include = function (t) {
                    var i = this.prototype.options;
                    return e(this.prototype, t),
                    t.options && (this.prototype.options = i, this.mergeOptions(t.options)),
                    this
                },
                M.mergeOptions = function (t) {
                    return e(this.prototype.options, t),
                    this
                },
                M.addInitHook = function (t) {
                    var e = Array.prototype.slice.call(arguments, 1),
                    i = "function" == typeof t ? t : function () {
                        this[t].apply(this, e)
                    };
                    return this.prototype._initHooks = this.prototype._initHooks || [],
                    this.prototype._initHooks.push(i),
                    this
                };
                var C = {
                    on: function (t, e, i) {
                        if ("object" == typeof t)
                            for (var n in t)
                                this._on(n, t[n], e);
                        else
                            for (var o = 0, r = (t = u(t)).length; o < r; o++)
                                this._on(t[o], e, i);
                        return this
                    },
                    off: function (t, e, i) {
                        if (arguments.length)
                            if ("object" == typeof t)
                                for (var n in t)
                                    this._off(n, t[n], e);
                            else {
                                t = u(t);
                                for (var o = 1 === arguments.length, r = 0, s = t.length; r < s; r++)
                                    o ? this._off(t[r]) : this._off(t[r], e, i)
                            }
                        else
                            delete this._events;
                        return this
                    },
                    _on: function (t, e, i, n) {
                        if ("function" == typeof e) {
                            if (!1 === this._listens(t, e, i)) {
                                i === this && (i = void 0);
                                var o = {
                                    fn: e,
                                    ctx: i
                                };
                                n && (o.once = !0),
                                this._events = this._events || {},
                                this._events[t] = this._events[t] || [],
                                this._events[t].push(o)
                            }
                        } else
                            console.warn("wrong listener type: " + typeof e)
                    },
                    _off: function (t, e, i) {
                        var n,
                        o,
                        r;
                        if (this._events && (n = this._events[t]))
                            if (1 !== arguments.length)
                                if ("function" == typeof e) {
                                    var s = this._listens(t, e, i);
                                    if (!1 !== s) {
                                        var a = n[s];
                                        this._firingCount && (a.fn = h, this._events[t] = n = n.slice()),
                                        n.splice(s, 1)
                                    }
                                } else
                                    console.warn("wrong listener type: " + typeof e);
                            else {
                                if (this._firingCount)
                                    for (o = 0, r = n.length; o < r; o++)
                                        n[o].fn = h;
                                delete this._events[t]
                            }
                    },
                    fire: function (t, i, n) {
                        if (!this.listens(t, n))
                            return this;
                        var o = e({}, i, {
                            type: t,
                            target: this,
                            sourceTarget: i && i.sourceTarget || this
                        });
                        if (this._events) {
                            var r = this._events[t];
                            if (r) {
                                this._firingCount = this._firingCount + 1 || 1;
                                for (var s = 0, a = r.length; s < a; s++) {
                                    var h = r[s],
                                    l = h.fn;
                                    h.once && this.off(t, l, h.ctx),
                                    l.call(h.ctx || this, o)
                                }
                                this._firingCount--
                            }
                        }
                        return n && this._propagateEvent(o),
                        this
                    },
                    listens: function (t, e, i, n) {
                        "string" != typeof t && console.warn('"string" type argument expected');
                        var o = e;
                        "function" != typeof e && (n = !!e, o = void 0, i = void 0);
                        var r = this._events && this._events[t];
                        if (r && r.length && !1 !== this._listens(t, o, i))
                            return !0;
                        if (n)
                            for (var s in this._eventParents)
                                if (this._eventParents[s].listens(t, e, i, n))
                                    return !0;
                        return !1
                    },
                    _listens: function (t, e, i) {
                        if (!this._events)
                            return !1;
                        var n = this._events[t] || [];
                        if (!e)
                            return !!n.length;
                        i === this && (i = void 0);
                        for (var o = 0, r = n.length; o < r; o++)
                            if (n[o].fn === e && n[o].ctx === i)
                                return o;
                        return !1
                    },
                    once: function (t, e, i) {
                        if ("object" == typeof t)
                            for (var n in t)
                                this._on(n, t[n], e, !0);
                        else
                            for (var o = 0, r = (t = u(t)).length; o < r; o++)
                                this._on(t[o], e, i, !0);
                        return this
                    },
                    addEventParent: function (t) {
                        return this._eventParents = this._eventParents || {},
                        this._eventParents[r(t)] = t,
                        this
                    },
                    removeEventParent: function (t) {
                        return this._eventParents && delete this._eventParents[r(t)],
                        this
                    },
                    _propagateEvent: function (t) {
                        for (var i in this._eventParents)
                            this._eventParents[i].fire(t.type, e({
                                    layer: t.target,
                                    propagatedFrom: t.target
                                }, t), !0)
                    }
                };
                C.addEventListener = C.on,
                C.removeEventListener = C.clearAllEventListeners = C.off,
                C.addOneTimeEventListener = C.once,
                C.fireEvent = C.fire,
                C.hasEventListeners = C.listens;
                var I = M.extend(C);
                function E(t, e, i) {
                    this.x = i ? Math.round(t) : t,
                    this.y = i ? Math.round(e) : e
                }
                var z = Math.trunc || function (t) {
                    return t > 0 ? Math.floor(t) : Math.ceil(t)
                };
                function O(t, e, i) {
                    return t instanceof E ? t : m(t) ? new E(t[0], t[1]) : null == t ? t : "object" == typeof t && "x" in t && "y" in t ? new E(t.x, t.y) : new E(t, e, i)
                }
                function A(t, e) {
                    if (t)
                        for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++)
                            this.extend(i[n])
                }
                function B(t, e) {
                    return !t || t instanceof A ? t : new A(t, e)
                }
                function N(t, e) {
                    if (t)
                        for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++)
                            this.extend(i[n])
                }
                function Z(t, e) {
                    return t instanceof N ? t : new N(t, e)
                }
                function D(t, e, i) {
                    if (isNaN(t) || isNaN(e))
                        throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
                    this.lat = +t,
                    this.lng = +e,
                    void 0 !== i && (this.alt = +i)
                }
                function j(t, e, i) {
                    return t instanceof D ? t : m(t) && "object" != typeof t[0] ? 3 === t.length ? new D(t[0], t[1], t[2]) : 2 === t.length ? new D(t[0], t[1]) : null : null == t ? t : "object" == typeof t && "lat" in t ? new D(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : void 0 === e ? null : new D(t, e, i)
                }
                E.prototype = {
                    clone: function () {
                        return new E(this.x, this.y)
                    },
                    add: function (t) {
                        return this.clone()._add(O(t))
                    },
                    _add: function (t) {
                        return this.x += t.x,
                        this.y += t.y,
                        this
                    },
                    subtract: function (t) {
                        return this.clone()._subtract(O(t))
                    },
                    _subtract: function (t) {
                        return this.x -= t.x,
                        this.y -= t.y,
                        this
                    },
                    divideBy: function (t) {
                        return this.clone()._divideBy(t)
                    },
                    _divideBy: function (t) {
                        return this.x /= t,
                        this.y /= t,
                        this
                    },
                    multiplyBy: function (t) {
                        return this.clone()._multiplyBy(t)
                    },
                    _multiplyBy: function (t) {
                        return this.x *= t,
                        this.y *= t,
                        this
                    },
                    scaleBy: function (t) {
                        return new E(this.x * t.x, this.y * t.y)
                    },
                    unscaleBy: function (t) {
                        return new E(this.x / t.x, this.y / t.y)
                    },
                    round: function () {
                        return this.clone()._round()
                    },
                    _round: function () {
                        return this.x = Math.round(this.x),
                        this.y = Math.round(this.y),
                        this
                    },
                    floor: function () {
                        return this.clone()._floor()
                    },
                    _floor: function () {
                        return this.x = Math.floor(this.x),
                        this.y = Math.floor(this.y),
                        this
                    },
                    ceil: function () {
                        return this.clone()._ceil()
                    },
                    _ceil: function () {
                        return this.x = Math.ceil(this.x),
                        this.y = Math.ceil(this.y),
                        this
                    },
                    trunc: function () {
                        return this.clone()._trunc()
                    },
                    _trunc: function () {
                        return this.x = z(this.x),
                        this.y = z(this.y),
                        this
                    },
                    distanceTo: function (t) {
                        var e = (t = O(t)).x - this.x,
                        i = t.y - this.y;
                        return Math.sqrt(e * e + i * i)
                    },
                    equals: function (t) {
                        return (t = O(t)).x === this.x && t.y === this.y
                    },
                    contains: function (t) {
                        return t = O(t),
                        Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
                    },
                    toString: function () {
                        return "Point(" + l(this.x) + ", " + l(this.y) + ")"
                    }
                },
                A.prototype = {
                    extend: function (t) {
                        var e,
                        i;
                        if (!t)
                            return this;
                        if (t instanceof E || "number" == typeof t[0] || "x" in t)
                            e = i = O(t);
                        else if (e = (t = B(t)).min, i = t.max, !e || !i)
                            return this;
                        return this.min || this.max ? (this.min.x = Math.min(e.x, this.min.x), this.max.x = Math.max(i.x, this.max.x), this.min.y = Math.min(e.y, this.min.y), this.max.y = Math.max(i.y, this.max.y)) : (this.min = e.clone(), this.max = i.clone()),
                        this
                    },
                    getCenter: function (t) {
                        return O((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, t)
                    },
                    getBottomLeft: function () {
                        return O(this.min.x, this.max.y)
                    },
                    getTopRight: function () {
                        return O(this.max.x, this.min.y)
                    },
                    getTopLeft: function () {
                        return this.min
                    },
                    getBottomRight: function () {
                        return this.max
                    },
                    getSize: function () {
                        return this.max.subtract(this.min)
                    },
                    contains: function (t) {
                        var e,
                        i;
                        return (t = "number" == typeof t[0] || t instanceof E ? O(t) : B(t))instanceof A ? (e = t.min, i = t.max) : e = i = t,
                        e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y && i.y <= this.max.y
                    },
                    intersects: function (t) {
                        t = B(t);
                        var e = this.min,
                        i = this.max,
                        n = t.min,
                        o = t.max,
                        r = o.x >= e.x && n.x <= i.x,
                        s = o.y >= e.y && n.y <= i.y;
                        return r && s
                    },
                    overlaps: function (t) {
                        t = B(t);
                        var e = this.min,
                        i = this.max,
                        n = t.min,
                        o = t.max,
                        r = o.x > e.x && n.x < i.x,
                        s = o.y > e.y && n.y < i.y;
                        return r && s
                    },
                    isValid: function () {
                        return !(!this.min || !this.max)
                    },
                    pad: function (t) {
                        var e = this.min,
                        i = this.max,
                        n = Math.abs(e.x - i.x) * t,
                        o = Math.abs(e.y - i.y) * t;
                        return B(O(e.x - n, e.y - o), O(i.x + n, i.y + o))
                    },
                    equals: function (t) {
                        return !!t && (t = B(t), this.min.equals(t.getTopLeft()) && this.max.equals(t.getBottomRight()))
                    }
                },
                N.prototype = {
                    extend: function (t) {
                        var e,
                        i,
                        n = this._southWest,
                        o = this._northEast;
                        if (t instanceof D)
                            e = t, i = t;
                        else {
                            if (!(t instanceof N))
                                return t ? this.extend(j(t) || Z(t)) : this;
                            if (e = t._southWest, i = t._northEast, !e || !i)
                                return this
                        }
                        return n || o ? (n.lat = Math.min(e.lat, n.lat), n.lng = Math.min(e.lng, n.lng), o.lat = Math.max(i.lat, o.lat), o.lng = Math.max(i.lng, o.lng)) : (this._southWest = new D(e.lat, e.lng), this._northEast = new D(i.lat, i.lng)),
                        this
                    },
                    pad: function (t) {
                        var e = this._southWest,
                        i = this._northEast,
                        n = Math.abs(e.lat - i.lat) * t,
                        o = Math.abs(e.lng - i.lng) * t;
                        return new N(new D(e.lat - n, e.lng - o), new D(i.lat + n, i.lng + o))
                    },
                    getCenter: function () {
                        return new D((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
                    },
                    getSouthWest: function () {
                        return this._southWest
                    },
                    getNorthEast: function () {
                        return this._northEast
                    },
                    getNorthWest: function () {
                        return new D(this.getNorth(), this.getWest())
                    },
                    getSouthEast: function () {
                        return new D(this.getSouth(), this.getEast())
                    },
                    getWest: function () {
                        return this._southWest.lng
                    },
                    getSouth: function () {
                        return this._southWest.lat
                    },
                    getEast: function () {
                        return this._northEast.lng
                    },
                    getNorth: function () {
                        return this._northEast.lat
                    },
                    contains: function (t) {
                        t = "number" == typeof t[0] || t instanceof D || "lat" in t ? j(t) : Z(t);
                        var e,
                        i,
                        n = this._southWest,
                        o = this._northEast;
                        return t instanceof N ? (e = t.getSouthWest(), i = t.getNorthEast()) : e = i = t,
                        e.lat >= n.lat && i.lat <= o.lat && e.lng >= n.lng && i.lng <= o.lng
                    },
                    intersects: function (t) {
                        t = Z(t);
                        var e = this._southWest,
                        i = this._northEast,
                        n = t.getSouthWest(),
                        o = t.getNorthEast(),
                        r = o.lat >= e.lat && n.lat <= i.lat,
                        s = o.lng >= e.lng && n.lng <= i.lng;
                        return r && s
                    },
                    overlaps: function (t) {
                        t = Z(t);
                        var e = this._southWest,
                        i = this._northEast,
                        n = t.getSouthWest(),
                        o = t.getNorthEast(),
                        r = o.lat > e.lat && n.lat < i.lat,
                        s = o.lng > e.lng && n.lng < i.lng;
                        return r && s
                    },
                    toBBoxString: function () {
                        return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
                    },
                    equals: function (t, e) {
                        return !!t && (t = Z(t), this._southWest.equals(t.getSouthWest(), e) && this._northEast.equals(t.getNorthEast(), e))
                    },
                    isValid: function () {
                        return !(!this._southWest || !this._northEast)
                    }
                },
                D.prototype = {
                    equals: function (t, e) {
                        return !!t && (t = j(t), Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng)) <= (void 0 === e ? 1e-9 : e))
                    },
                    toString: function (t) {
                        return "LatLng(" + l(this.lat, t) + ", " + l(this.lng, t) + ")"
                    },
                    distanceTo: function (t) {
                        return U.distance(this, j(t))
                    },
                    wrap: function () {
                        return U.wrapLatLng(this)
                    },
                    toBounds: function (t) {
                        var e = 180 * t / 40075017,
                        i = e / Math.cos(Math.PI / 180 * this.lat);
                        return Z([this.lat - e, this.lng - i], [this.lat + e, this.lng + i])
                    },
                    clone: function () {
                        return new D(this.lat, this.lng, this.alt)
                    }
                };
                var R,
                F = {
                    latLngToPoint: function (t, e) {
                        var i = this.projection.project(t),
                        n = this.scale(e);
                        return this.transformation._transform(i, n)
                    },
                    pointToLatLng: function (t, e) {
                        var i = this.scale(e),
                        n = this.transformation.untransform(t, i);
                        return this.projection.unproject(n)
                    },
                    project: function (t) {
                        return this.projection.project(t)
                    },
                    unproject: function (t) {
                        return this.projection.unproject(t)
                    },
                    scale: function (t) {
                        return 256 * Math.pow(2, t)
                    },
                    zoom: function (t) {
                        return Math.log(t / 256) / Math.LN2
                    },
                    getProjectedBounds: function (t) {
                        if (this.infinite)
                            return null;
                        var e = this.projection.bounds,
                        i = this.scale(t);
                        return new A(this.transformation.transform(e.min, i), this.transformation.transform(e.max, i))
                    },
                    infinite: !1,
                    wrapLatLng: function (t) {
                        var e = this.wrapLng ? a(t.lng, this.wrapLng, !0) : t.lng;
                        return new D(this.wrapLat ? a(t.lat, this.wrapLat, !0) : t.lat, e, t.alt)
                    },
                    wrapLatLngBounds: function (t) {
                        var e = t.getCenter(),
                        i = this.wrapLatLng(e),
                        n = e.lat - i.lat,
                        o = e.lng - i.lng;
                        if (0 === n && 0 === o)
                            return t;
                        var r = t.getSouthWest(),
                        s = t.getNorthEast();
                        return new N(new D(r.lat - n, r.lng - o), new D(s.lat - n, s.lng - o))
                    }
                },
                U = e({}, F, {
                    wrapLng: [-180, 180],
                    R: 6371e3,
                    distance: function (t, e) {
                        var i = Math.PI / 180,
                        n = t.lat * i,
                        o = e.lat * i,
                        r = Math.sin((e.lat - t.lat) * i / 2),
                        s = Math.sin((e.lng - t.lng) * i / 2),
                        a = r * r + Math.cos(n) * Math.cos(o) * s * s,
                        h = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        return this.R * h
                    }
                }),
                G = 6378137,
                H = {
                    R: G,
                    MAX_LATITUDE: 85.0511287798,
                    project: function (t) {
                        var e = Math.PI / 180,
                        i = this.MAX_LATITUDE,
                        n = Math.max(Math.min(i, t.lat), -i),
                        o = Math.sin(n * e);
                        return new E(this.R * t.lng * e, this.R * Math.log((1 + o) / (1 - o)) / 2)
                    },
                    unproject: function (t) {
                        var e = 180 / Math.PI;
                        return new D((2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * e, t.x * e / this.R)
                    },
                    bounds: (R = G * Math.PI, new A([-R, -R], [R, R]))
                };
                function W(t, e, i, n) {
                    if (m(t))
                        return this._a = t[0], this._b = t[1], this._c = t[2], void(this._d = t[3]);
                    this._a = t,
                    this._b = e,
                    this._c = i,
                    this._d = n
                }
                function V(t, e, i, n) {
                    return new W(t, e, i, n)
                }
                W.prototype = {
                    transform: function (t, e) {
                        return this._transform(t.clone(), e)
                    },
                    _transform: function (t, e) {
                        return e = e || 1,
                        t.x = e * (this._a * t.x + this._b),
                        t.y = e * (this._c * t.y + this._d),
                        t
                    },
                    untransform: function (t, e) {
                        return e = e || 1,
                        new E((t.x / e - this._b) / this._a, (t.y / e - this._d) / this._c)
                    }
                };
                var Y = e({}, U, {
                    code: "EPSG:3857",
                    projection: H,
                    transformation: function () {
                        var t = .5 / (Math.PI * H.R);
                        return V(t, .5, -t, .5)
                    }
                    ()
                }),
                q = e({}, Y, {
                    code: "EPSG:900913"
                });
                function X(t) {
                    return document.createElementNS("http://www.w3.org/2000/svg", t)
                }
                function K(t, e) {
                    var i,
                    n,
                    o,
                    r,
                    s,
                    a,
                    h = "";
                    for (i = 0, o = t.length; i < o; i++) {
                        for (n = 0, r = (s = t[i]).length; n < r; n++)
                            h += (n ? "L" : "M") + (a = s[n]).x + " " + a.y;
                        h += e ? At.svg ? "z" : "x" : ""
                    }
                    return h || "M0 0"
                }
                var J,
                $ = document.documentElement.style,
                Q = "ActiveXObject" in window,
                tt = Q && !document.addEventListener,
                et = "msLaunchUri" in navigator && !("documentMode" in document),
                it = Ot("webkit"),
                nt = Ot("android"),
                ot = Ot("android 2") || Ot("android 3"),
                rt = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10),
                st = nt && Ot("Google") && rt < 537 && !("AudioNode" in window),
                at = !!window.opera,
                ht = !et && Ot("chrome"),
                lt = Ot("gecko") && !it && !at && !Q,
                ct = !ht && Ot("safari"),
                ut = Ot("phantom"),
                dt = "OTransition" in $,
                pt = 0 === navigator.platform.indexOf("Win"),
                ft = Q && "transition" in $,
                _t = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix && !ot,
                mt = "MozPerspective" in $,
                gt = !window.L_DISABLE_3D && (ft || _t || mt) && !dt && !ut,
                vt = "undefined" != typeof orientation || Ot("mobile"),
                yt = vt && it,
                Lt = vt && _t,
                wt = !window.PointerEvent && window.MSPointerEvent,
                bt = !(!window.PointerEvent && !wt),
                xt = "ontouchstart" in window || !!window.TouchEvent,
                Pt = !window.L_NO_TOUCH && (xt || bt),
                Tt = vt && at,
                St = vt && lt,
                kt = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1,
                Mt = function () {
                    var t = !1;
                    try {
                        var e = Object.defineProperty({}, "passive", {
                            get: function () {
                                t = !0
                            }
                        });
                        window.addEventListener("testPassiveEventSupport", h, e),
                        window.removeEventListener("testPassiveEventSupport", h, e)
                    } catch (t) {}
                    return t
                }
                (),
                Ct = !!document.createElement("canvas").getContext,
                It = !(!document.createElementNS || !X("svg").createSVGRect),
                Et = !!It && ((J = document.createElement("div")).innerHTML = "<svg/>", "http://www.w3.org/2000/svg" === (J.firstChild && J.firstChild.namespaceURI)),
                zt = !It && function () {
                    try {
                        var t = document.createElement("div");
                        t.innerHTML = '<v:shape adj="1"/>';
                        var e = t.firstChild;
                        return e.style.behavior = "url(#default#VML)",
                        e && "object" == typeof e.adj
                    } catch (t) {
                        return !1
                    }
                }
                ();
                function Ot(t) {
                    return navigator.userAgent.toLowerCase().indexOf(t) >= 0
                }
                var At = {
                    ie: Q,
                    ielt9: tt,
                    edge: et,
                    webkit: it,
                    android: nt,
                    android23: ot,
                    androidStock: st,
                    opera: at,
                    chrome: ht,
                    gecko: lt,
                    safari: ct,
                    phantom: ut,
                    opera12: dt,
                    win: pt,
                    ie3d: ft,
                    webkit3d: _t,
                    gecko3d: mt,
                    any3d: gt,
                    mobile: vt,
                    mobileWebkit: yt,
                    mobileWebkit3d: Lt,
                    msPointer: wt,
                    pointer: bt,
                    touch: Pt,
                    touchNative: xt,
                    mobileOpera: Tt,
                    mobileGecko: St,
                    retina: kt,
                    passiveEvents: Mt,
                    canvas: Ct,
                    svg: It,
                    vml: zt,
                    inlineSvg: Et,
                    mac: 0 === navigator.platform.indexOf("Mac"),
                    linux: 0 === navigator.platform.indexOf("Linux")
                },
                Bt = At.msPointer ? "MSPointerDown" : "pointerdown",
                Nt = At.msPointer ? "MSPointerMove" : "pointermove",
                Zt = At.msPointer ? "MSPointerUp" : "pointerup",
                Dt = At.msPointer ? "MSPointerCancel" : "pointercancel",
                jt = {
                    touchstart: Bt,
                    touchmove: Nt,
                    touchend: Zt,
                    touchcancel: Dt
                },
                Rt = {
                    touchstart: function (t, e) {
                        e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH && Ze(e),
                        Yt(t, e)
                    },
                    touchmove: Yt,
                    touchend: Yt,
                    touchcancel: Yt
                },
                Ft = {},
                Ut = !1;
                function Gt(t, e, i) {
                    return "touchstart" === e && (Ut || (document.addEventListener(Bt, Ht, !0), document.addEventListener(Nt, Wt, !0), document.addEventListener(Zt, Vt, !0), document.addEventListener(Dt, Vt, !0), Ut = !0)),
                    Rt[e] ? (i = Rt[e].bind(this, i), t.addEventListener(jt[e], i, !1), i) : (console.warn("wrong event specified:", e), h)
                }
                function Ht(t) {
                    Ft[t.pointerId] = t
                }
                function Wt(t) {
                    Ft[t.pointerId] && (Ft[t.pointerId] = t)
                }
                function Vt(t) {
                    delete Ft[t.pointerId]
                }
                function Yt(t, e) {
                    if (e.pointerType !== (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
                        for (var i in e.touches = [], Ft)
                            e.touches.push(Ft[i]);
                        e.changedTouches = [e],
                        t(e)
                    }
                }
                var qt,
                Xt,
                Kt,
                Jt,
                $t,
                Qt = _e(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]),
                te = _e(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]),
                ee = "webkitTransition" === te || "OTransition" === te ? te + "End" : "transitionend";
                function ie(t) {
                    return "string" == typeof t ? document.getElementById(t) : t
                }
                function ne(t, e) {
                    var i = t.style[e] || t.currentStyle && t.currentStyle[e];
                    if ((!i || "auto" === i) && document.defaultView) {
                        var n = document.defaultView.getComputedStyle(t, null);
                        i = n ? n[e] : null
                    }
                    return "auto" === i ? null : i
                }
                function oe(t, e, i) {
                    var n = document.createElement(t);
                    return n.className = e || "",
                    i && i.appendChild(n),
                    n
                }
                function re(t) {
                    var e = t.parentNode;
                    e && e.removeChild(t)
                }
                function se(t) {
                    for (; t.firstChild; )
                        t.removeChild(t.firstChild)
                }
                function ae(t) {
                    var e = t.parentNode;
                    e && e.lastChild !== t && e.appendChild(t)
                }
                function he(t) {
                    var e = t.parentNode;
                    e && e.firstChild !== t && e.insertBefore(t, e.firstChild)
                }
                function le(t, e) {
                    if (void 0 !== t.classList)
                        return t.classList.contains(e);
                    var i = pe(t);
                    return i.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(i)
                }
                function ce(t, e) {
                    if (void 0 !== t.classList)
                        for (var i = u(e), n = 0, o = i.length; n < o; n++)
                            t.classList.add(i[n]);
                    else if (!le(t, e)) {
                        var r = pe(t);
                        de(t, (r ? r + " " : "") + e)
                    }
                }
                function ue(t, e) {
                    void 0 !== t.classList ? t.classList.remove(e) : de(t, c((" " + pe(t) + " ").replace(" " + e + " ", " ")))
                }
                function de(t, e) {
                    void 0 === t.className.baseVal ? t.className = e : t.className.baseVal = e
                }
                function pe(t) {
                    return t.correspondingElement && (t = t.correspondingElement),
                    void 0 === t.className.baseVal ? t.className : t.className.baseVal
                }
                function fe(t, e) {
                    "opacity" in t.style ? t.style.opacity = e : "filter" in t.style && function (t, e) {
                        var i = !1,
                        n = "DXImageTransform.Microsoft.Alpha";
                        try {
                            i = t.filters.item(n)
                        } catch (t) {
                            if (1 === e)
                                return
                        }
                        e = Math.round(100 * e),
                        i ? (i.Enabled = 100 !== e, i.Opacity = e) : t.style.filter += " progid:" + n + "(opacity=" + e + ")"
                    }
                    (t, e)
                }
                function _e(t) {
                    for (var e = document.documentElement.style, i = 0; i < t.length; i++)
                        if (t[i]in e)
                            return t[i];
                    return !1
                }
                function me(t, e, i) {
                    var n = e || new E(0, 0);
                    t.style[Qt] = (At.ie3d ? "translate(" + n.x + "px," + n.y + "px)" : "translate3d(" + n.x + "px," + n.y + "px,0)") + (i ? " scale(" + i + ")" : "")
                }
                function ge(t, e) {
                    t._leaflet_pos = e,
                    At.any3d ? me(t, e) : (t.style.left = e.x + "px", t.style.top = e.y + "px")
                }
                function ve(t) {
                    return t._leaflet_pos || new E(0, 0)
                }
                if ("onselectstart" in document)
                    qt = function () {
                        ke(window, "selectstart", Ze)
                    },
                Xt = function () {
                    Ce(window, "selectstart", Ze)
                };
                else {
                    var ye = _e(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
                    qt = function () {
                        if (ye) {
                            var t = document.documentElement.style;
                            Kt = t[ye],
                            t[ye] = "none"
                        }
                    },
                    Xt = function () {
                        ye && (document.documentElement.style[ye] = Kt, Kt = void 0)
                    }
                }
                function Le() {
                    ke(window, "dragstart", Ze)
                }
                function we() {
                    Ce(window, "dragstart", Ze)
                }
                function be(t) {
                    for (; -1 === t.tabIndex; )
                        t = t.parentNode;
                    t.style && (xe(), Jt = t, $t = t.style.outline, t.style.outline = "none", ke(window, "keydown", xe))
                }
                function xe() {
                    Jt && (Jt.style.outline = $t, Jt = void 0, $t = void 0, Ce(window, "keydown", xe))
                }
                function Pe(t) {
                    do {
                        t = t.parentNode
                    } while (!(t.offsetWidth && t.offsetHeight || t === document.body));
                    return t
                }
                function Te(t) {
                    var e = t.getBoundingClientRect();
                    return {
                        x: e.width / t.offsetWidth || 1,
                        y: e.height / t.offsetHeight || 1,
                        boundingClientRect: e
                    }
                }
                var Se = {
                    __proto__: null,
                    TRANSFORM: Qt,
                    TRANSITION: te,
                    TRANSITION_END: ee,
                    get: ie,
                    getStyle: ne,
                    create: oe,
                    remove: re,
                    empty: se,
                    toFront: ae,
                    toBack: he,
                    hasClass: le,
                    addClass: ce,
                    removeClass: ue,
                    setClass: de,
                    getClass: pe,
                    setOpacity: fe,
                    testProp: _e,
                    setTransform: me,
                    setPosition: ge,
                    getPosition: ve,
                    get disableTextSelection() {
                        return qt
                    },
                    get enableTextSelection() {
                        return Xt
                    },
                    disableImageDrag: Le,
                    enableImageDrag: we,
                    preventOutline: be,
                    restoreOutline: xe,
                    getSizedParentNode: Pe,
                    getScale: Te
                };
                function ke(t, e, i, n) {
                    if (e && "object" == typeof e)
                        for (var o in e)
                            ze(t, o, e[o], i);
                    else
                        for (var r = 0, s = (e = u(e)).length; r < s; r++)
                            ze(t, e[r], i, n);
                    return this
                }
                var Me = "_leaflet_events";
                function Ce(t, e, i, n) {
                    if (1 === arguments.length)
                        Ie(t), delete t[Me];
                    else if (e && "object" == typeof e)
                        for (var o in e)
                            Oe(t, o, e[o], i);
                    else if (e = u(e), 2 === arguments.length)
                        Ie(t, (function (t) {
                                return -1 !== g(e, t)
                            }));
                    else
                        for (var r = 0, s = e.length; r < s; r++)
                            Oe(t, e[r], i, n);
                    return this
                }
                function Ie(t, e) {
                    for (var i in t[Me]) {
                        var n = i.split(/\d/)[0];
                        e && !e(n) || Oe(t, n, null, null, i)
                    }
                }
                var Ee = {
                    mouseenter: "mouseover",
                    mouseleave: "mouseout",
                    wheel: !("onwheel" in window) && "mousewheel"
                };
                function ze(t, e, i, n) {
                    var o = e + r(i) + (n ? "_" + r(n) : "");
                    if (t[Me] && t[Me][o])
                        return this;
                    var s = function (e) {
                        return i.call(n || t, e || window.event)
                    },
                    a = s;
                    !At.touchNative && At.pointer && 0 === e.indexOf("touch") ? s = Gt(t, e, s) : At.touch && "dblclick" === e ? s = function (t, e) {
                        t.addEventListener("dblclick", e);
                        var i,
                        n = 0;
                        function o(t) {
                            if (1 === t.detail) {
                                if ("mouse" !== t.pointerType && (!t.sourceCapabilities || t.sourceCapabilities.firesTouchEvents)) {
                                    var o = je(t);
                                    if (!o.some((function (t) {
                                                return t instanceof HTMLLabelElement && t.attributes.for
                                            })) || o.some((function (t) {
                                                return t instanceof HTMLInputElement || t instanceof HTMLSelectElement
                                            }))) {
                                        var r = Date.now();
                                        r - n <= 200 ? 2 == ++i && e(function (t) {
                                            var e,
                                            i,
                                            n = {};
                                            for (i in t)
                                                e = t[i], n[i] = e && e.bind ? e.bind(t) : e;
                                            return t = n,
                                            n.type = "dblclick",
                                            n.detail = 2,
                                            n.isTrusted = !1,
                                            n._simulated = !0,
                                            n
                                        }
                                            (t)) : i = 1,
                                        n = r
                                    }
                                }
                            } else
                                i = t.detail
                        }
                        return t.addEventListener("click", o), {
                            dblclick: e,
                            simDblclick: o
                        }
                    }
                    (t, s) : "addEventListener" in t ? "touchstart" === e || "touchmove" === e || "wheel" === e || "mousewheel" === e ? t.addEventListener(Ee[e] || e, s, !!At.passiveEvents && {
                        passive: !1
                    }) : "mouseenter" === e || "mouseleave" === e ? (s = function (e) {
                        e = e || window.event,
                        Ge(t, e) && a(e)
                    }, t.addEventListener(Ee[e], s, !1)) : t.addEventListener(e, a, !1) : t.attachEvent("on" + e, s),
                    t[Me] = t[Me] || {},
                    t[Me][o] = s
                }
                function Oe(t, e, i, n, o) {
                    o = o || e + r(i) + (n ? "_" + r(n) : "");
                    var s = t[Me] && t[Me][o];
                    if (!s)
                        return this;
                    !At.touchNative && At.pointer && 0 === e.indexOf("touch") ? function (t, e, i) {
                        jt[e] ? t.removeEventListener(jt[e], i, !1) : console.warn("wrong event specified:", e)
                    }
                    (t, e, s) : At.touch && "dblclick" === e ? function (t, e) {
                        t.removeEventListener("dblclick", e.dblclick),
                        t.removeEventListener("click", e.simDblclick)
                    }
                    (t, s) : "removeEventListener" in t ? t.removeEventListener(Ee[e] || e, s, !1) : t.detachEvent("on" + e, s),
                    t[Me][o] = null
                }
                function Ae(t) {
                    return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0,
                    this
                }
                function Be(t) {
                    return ze(t, "wheel", Ae),
                    this
                }
                function Ne(t) {
                    return ke(t, "mousedown touchstart dblclick contextmenu", Ae),
                    t._leaflet_disable_click = !0,
                    this
                }
                function Ze(t) {
                    return t.preventDefault ? t.preventDefault() : t.returnValue = !1,
                    this
                }
                function De(t) {
                    return Ze(t),
                    Ae(t),
                    this
                }
                function je(t) {
                    if (t.composedPath)
                        return t.composedPath();
                    for (var e = [], i = t.target; i; )
                        e.push(i), i = i.parentNode;
                    return e
                }
                function Re(t, e) {
                    if (!e)
                        return new E(t.clientX, t.clientY);
                    var i = Te(e),
                    n = i.boundingClientRect;
                    return new E((t.clientX - n.left) / i.x - e.clientLeft, (t.clientY - n.top) / i.y - e.clientTop)
                }
                var Fe = At.linux && At.chrome ? window.devicePixelRatio : At.mac ? 3 * window.devicePixelRatio : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
                function Ue(t) {
                    return At.edge ? t.wheelDeltaY / 2 : t.deltaY && 0 === t.deltaMode ? -t.deltaY / Fe : t.deltaY && 1 === t.deltaMode ? 20 * -t.deltaY : t.deltaY && 2 === t.deltaMode ? 60 * -t.deltaY : t.deltaX || t.deltaZ ? 0 : t.wheelDelta ? (t.wheelDeltaY || t.wheelDelta) / 2 : t.detail && Math.abs(t.detail) < 32765 ? 20 * -t.detail : t.detail ? t.detail / -32765 * 60 : 0
                }
                function Ge(t, e) {
                    var i = e.relatedTarget;
                    if (!i)
                        return !0;
                    try {
                        for (; i && i !== t; )
                            i = i.parentNode
                    } catch (t) {
                        return !1
                    }
                    return i !== t
                }
                var He = {
                    __proto__: null,
                    on: ke,
                    off: Ce,
                    stopPropagation: Ae,
                    disableScrollPropagation: Be,
                    disableClickPropagation: Ne,
                    preventDefault: Ze,
                    stop: De,
                    getPropagationPath: je,
                    getMousePosition: Re,
                    getWheelDelta: Ue,
                    isExternalTarget: Ge,
                    addListener: ke,
                    removeListener: Ce
                },
                We = I.extend({
                    run: function (t, e, i, n) {
                        this.stop(),
                        this._el = t,
                        this._inProgress = !0,
                        this._duration = i || .25,
                        this._easeOutPower = 1 / Math.max(n || .5, .2),
                        this._startPos = ve(t),
                        this._offset = e.subtract(this._startPos),
                        this._startTime = +new Date,
                        this.fire("start"),
                        this._animate()
                    },
                    stop: function () {
                        this._inProgress && (this._step(!0), this._complete())
                    },
                    _animate: function () {
                        this._animId = T(this._animate, this),
                        this._step()
                    },
                    _step: function (t) {
                        var e = +new Date - this._startTime,
                        i = 1e3 * this._duration;
                        e < i ? this._runFrame(this._easeOut(e / i), t) : (this._runFrame(1), this._complete())
                    },
                    _runFrame: function (t, e) {
                        var i = this._startPos.add(this._offset.multiplyBy(t));
                        e && i._round(),
                        ge(this._el, i),
                        this.fire("step")
                    },
                    _complete: function () {
                        S(this._animId),
                        this._inProgress = !1,
                        this.fire("end")
                    },
                    _easeOut: function (t) {
                        return 1 - Math.pow(1 - t, this._easeOutPower)
                    }
                }),
                Ve = I.extend({
                    options: {
                        crs: Y,
                        center: void 0,
                        zoom: void 0,
                        minZoom: void 0,
                        maxZoom: void 0,
                        layers: [],
                        maxBounds: void 0,
                        renderer: void 0,
                        zoomAnimation: !0,
                        zoomAnimationThreshold: 4,
                        fadeAnimation: !0,
                        markerZoomAnimation: !0,
                        transform3DLimit: 8388608,
                        zoomSnap: 1,
                        zoomDelta: 1,
                        trackResize: !0
                    },
                    initialize: function (t, e) {
                        e = d(this, e),
                        this._handlers = [],
                        this._layers = {},
                        this._zoomBoundLayers = {},
                        this._sizeChanged = !0,
                        this._initContainer(t),
                        this._initLayout(),
                        this._onResize = n(this._onResize, this),
                        this._initEvents(),
                        e.maxBounds && this.setMaxBounds(e.maxBounds),
                        void 0 !== e.zoom && (this._zoom = this._limitZoom(e.zoom)),
                        e.center && void 0 !== e.zoom && this.setView(j(e.center), e.zoom, {
                            reset: !0
                        }),
                        this.callInitHooks(),
                        this._zoomAnimated = te && At.any3d && !At.mobileOpera && this.options.zoomAnimation,
                        this._zoomAnimated && (this._createAnimProxy(), ke(this._proxy, ee, this._catchTransitionEnd, this)),
                        this._addLayers(this.options.layers)
                    },
                    setView: function (t, i, n) {
                        return i = void 0 === i ? this._zoom : this._limitZoom(i),
                        t = this._limitCenter(j(t), i, this.options.maxBounds),
                        n = n || {},
                        this._stop(),
                        this._loaded && !n.reset && !0 !== n && (void 0 !== n.animate && (n.zoom = e({
                                    animate: n.animate
                                }, n.zoom), n.pan = e({
                                    animate: n.animate,
                                    duration: n.duration
                                }, n.pan)), this._zoom !== i ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, i, n.zoom) : this._tryAnimatedPan(t, n.pan)) ? (clearTimeout(this._sizeTimer), this) : (this._resetView(t, i, n.pan && n.pan.noMoveStart), this)
                    },
                    setZoom: function (t, e) {
                        return this._loaded ? this.setView(this.getCenter(), t, {
                            zoom: e
                        }) : (this._zoom = t, this)
                    },
                    zoomIn: function (t, e) {
                        return t = t || (At.any3d ? this.options.zoomDelta : 1),
                        this.setZoom(this._zoom + t, e)
                    },
                    zoomOut: function (t, e) {
                        return t = t || (At.any3d ? this.options.zoomDelta : 1),
                        this.setZoom(this._zoom - t, e)
                    },
                    setZoomAround: function (t, e, i) {
                        var n = this.getZoomScale(e),
                        o = this.getSize().divideBy(2),
                        r = (t instanceof E ? t : this.latLngToContainerPoint(t)).subtract(o).multiplyBy(1 - 1 / n),
                        s = this.containerPointToLatLng(o.add(r));
                        return this.setView(s, e, {
                            zoom: i
                        })
                    },
                    _getBoundsCenterZoom: function (t, e) {
                        e = e || {},
                        t = t.getBounds ? t.getBounds() : Z(t);
                        var i = O(e.paddingTopLeft || e.padding || [0, 0]),
                        n = O(e.paddingBottomRight || e.padding || [0, 0]),
                        o = this.getBoundsZoom(t, !1, i.add(n));
                        if ((o = "number" == typeof e.maxZoom ? Math.min(e.maxZoom, o) : o) === 1 / 0)
                            return {
                                center: t.getCenter(),
                                zoom: o
                            };
                        var r = n.subtract(i).divideBy(2),
                        s = this.project(t.getSouthWest(), o),
                        a = this.project(t.getNorthEast(), o);
                        return {
                            center: this.unproject(s.add(a).divideBy(2).add(r), o),
                            zoom: o
                        }
                    },
                    fitBounds: function (t, e) {
                        if (!(t = Z(t)).isValid())
                            throw new Error("Bounds are not valid.");
                        var i = this._getBoundsCenterZoom(t, e);
                        return this.setView(i.center, i.zoom, e)
                    },
                    fitWorld: function (t) {
                        return this.fitBounds([[-90, -180], [90, 180]], t)
                    },
                    panTo: function (t, e) {
                        return this.setView(t, this._zoom, {
                            pan: e
                        })
                    },
                    panBy: function (t, e) {
                        if (e = e || {}, !(t = O(t).round()).x && !t.y)
                            return this.fire("moveend");
                        if (!0 !== e.animate && !this.getSize().contains(t))
                            return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
                        if (this._panAnim || (this._panAnim = new We, this._panAnim.on({
                                    step: this._onPanTransitionStep,
                                    end: this._onPanTransitionEnd
                                }, this)), e.noMoveStart || this.fire("movestart"), !1 !== e.animate) {
                            ce(this._mapPane, "leaflet-pan-anim");
                            var i = this._getMapPanePos().subtract(t).round();
                            this._panAnim.run(this._mapPane, i, e.duration || .25, e.easeLinearity)
                        } else
                            this._rawPanBy(t), this.fire("move").fire("moveend");
                        return this
                    },
                    flyTo: function (t, e, i) {
                        if (!1 === (i = i || {}).animate || !At.any3d)
                            return this.setView(t, e, i);
                        this._stop();
                        var n = this.project(this.getCenter()),
                        o = this.project(t),
                        r = this.getSize(),
                        s = this._zoom;
                        t = j(t),
                        e = void 0 === e ? s : e;
                        var a = Math.max(r.x, r.y),
                        h = a * this.getZoomScale(s, e),
                        l = o.distanceTo(n) || 1,
                        c = 1.42,
                        u = 2.0164;
                        function d(t) {
                            var e = (h * h - a * a + (t ? -1 : 1) * u * u * l * l) / (2 * (t ? h : a) * u * l),
                            i = Math.sqrt(e * e + 1) - e;
                            return i < 1e-9 ? -18 : Math.log(i)
                        }
                        function p(t) {
                            return (Math.exp(t) - Math.exp(-t)) / 2
                        }
                        function f(t) {
                            return (Math.exp(t) + Math.exp(-t)) / 2
                        }
                        var _ = d(0);
                        function m(t) {
                            return a * (f(_) * (p(e = _ + c * t) / f(e)) - p(_)) / u;
                            var e
                        }
                        var g = Date.now(),
                        v = (d(1) - _) / c,
                        y = i.duration ? 1e3 * i.duration : 1e3 * v * .8;
                        return this._moveStart(!0, i.noMoveStart),
                        function i() {
                            var r = (Date.now() - g) / y,
                            h = function (t) {
                                return 1 - Math.pow(1 - t, 1.5)
                            }
                            (r) * v;
                            r <= 1 ? (this._flyToFrame = T(i, this), this._move(this.unproject(n.add(o.subtract(n).multiplyBy(m(h) / l)), s), this.getScaleZoom(a / function (t) {
                                        return a * (f(_) / f(_ + c * t))
                                    }
                                        (h), s), {
                                    flyTo: !0
                                })) : this._move(t, e)._moveEnd(!0)
                        }
                        .call(this),
                        this
                    },
                    flyToBounds: function (t, e) {
                        var i = this._getBoundsCenterZoom(t, e);
                        return this.flyTo(i.center, i.zoom, e)
                    },
                    setMaxBounds: function (t) {
                        return t = Z(t),
                        this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds),
                        t.isValid() ? (this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this)
                    },
                    setMinZoom: function (t) {
                        var e = this.options.minZoom;
                        return this.options.minZoom = t,
                        this._loaded && e !== t && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(t) : this
                    },
                    setMaxZoom: function (t) {
                        var e = this.options.maxZoom;
                        return this.options.maxZoom = t,
                        this._loaded && e !== t && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(t) : this
                    },
                    panInsideBounds: function (t, e) {
                        this._enforcingBounds = !0;
                        var i = this.getCenter(),
                        n = this._limitCenter(i, this._zoom, Z(t));
                        return i.equals(n) || this.panTo(n, e),
                        this._enforcingBounds = !1,
                        this
                    },
                    panInside: function (t, e) {
                        var i = O((e = e || {}).paddingTopLeft || e.padding || [0, 0]),
                        n = O(e.paddingBottomRight || e.padding || [0, 0]),
                        o = this.project(this.getCenter()),
                        r = this.project(t),
                        s = this.getPixelBounds(),
                        a = B([s.min.add(i), s.max.subtract(n)]),
                        h = a.getSize();
                        if (!a.contains(r)) {
                            this._enforcingBounds = !0;
                            var l = r.subtract(a.getCenter()),
                            c = a.extend(r).getSize().subtract(h);
                            o.x += l.x < 0 ? -c.x : c.x,
                            o.y += l.y < 0 ? -c.y : c.y,
                            this.panTo(this.unproject(o), e),
                            this._enforcingBounds = !1
                        }
                        return this
                    },
                    invalidateSize: function (t) {
                        if (!this._loaded)
                            return this;
                        t = e({
                            animate: !1,
                            pan: !0
                        }, !0 === t ? {
                            animate: !0
                        }
                                 : t);
                        var i = this.getSize();
                        this._sizeChanged = !0,
                        this._lastCenter = null;
                        var o = this.getSize(),
                        r = i.divideBy(2).round(),
                        s = o.divideBy(2).round(),
                        a = r.subtract(s);
                        return a.x || a.y ? (t.animate && t.pan ? this.panBy(a) : (t.pan && this._rawPanBy(a), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(n(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
                                oldSize: i,
                                newSize: o
                            })) : this
                    },
                    stop: function () {
                        return this.setZoom(this._limitZoom(this._zoom)),
                        this.options.zoomSnap || this.fire("viewreset"),
                        this._stop()
                    },
                    locate: function (t) {
                        if (t = this._locateOptions = e({
                                timeout: 1e4,
                                watch: !1
                            }, t), !("geolocation" in navigator))
                            return this._handleGeolocationError({
                                code: 0,
                                message: "Geolocation not supported."
                            }), this;
                        var i = n(this._handleGeolocationResponse, this),
                        o = n(this._handleGeolocationError, this);
                        return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(i, o, t) : navigator.geolocation.getCurrentPosition(i, o, t),
                        this
                    },
                    stopLocate: function () {
                        return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId),
                        this._locateOptions && (this._locateOptions.setView = !1),
                        this
                    },
                    _handleGeolocationError: function (t) {
                        if (this._container._leaflet_id) {
                            var e = t.code,
                            i = t.message || (1 === e ? "permission denied" : 2 === e ? "position unavailable" : "timeout");
                            this._locateOptions.setView && !this._loaded && this.fitWorld(),
                            this.fire("locationerror", {
                                code: e,
                                message: "Geolocation error: " + i + "."
                            })
                        }
                    },
                    _handleGeolocationResponse: function (t) {
                        if (this._container._leaflet_id) {
                            var e = new D(t.coords.latitude, t.coords.longitude),
                            i = e.toBounds(2 * t.coords.accuracy),
                            n = this._locateOptions;
                            if (n.setView) {
                                var o = this.getBoundsZoom(i);
                                this.setView(e, n.maxZoom ? Math.min(o, n.maxZoom) : o)
                            }
                            var r = {
                                latlng: e,
                                bounds: i,
                                timestamp: t.timestamp
                            };
                            for (var s in t.coords)
                                "number" == typeof t.coords[s] && (r[s] = t.coords[s]);
                            this.fire("locationfound", r)
                        }
                    },
                    addHandler: function (t, e) {
                        if (!e)
                            return this;
                        var i = this[t] = new e(this);
                        return this._handlers.push(i),
                        this.options[t] && i.enable(),
                        this
                    },
                    remove: function () {
                        if (this._initEvents(!0), this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this._containerId !== this._container._leaflet_id)
                            throw new Error("Map container is being reused by another instance");
                        try {
                            delete this._container._leaflet_id,
                            delete this._containerId
                        } catch (t) {
                            this._container._leaflet_id = void 0,
                            this._containerId = void 0
                        }
                        var t;
                        for (t in void 0 !== this._locationWatchId && this.stopLocate(), this._stop(), re(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (S(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload"), this._layers)
                            this._layers[t].remove();
                        for (t in this._panes)
                            re(this._panes[t]);
                        return this._layers = [],
                        this._panes = [],
                        delete this._mapPane,
                        delete this._renderer,
                        this
                    },
                    createPane: function (t, e) {
                        var i = oe("div", "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), e || this._mapPane);
                        return t && (this._panes[t] = i),
                        i
                    },
                    getCenter: function () {
                        return this._checkIfLoaded(),
                        this._lastCenter && !this._moved() ? this._lastCenter.clone() : this.layerPointToLatLng(this._getCenterLayerPoint())
                    },
                    getZoom: function () {
                        return this._zoom
                    },
                    getBounds: function () {
                        var t = this.getPixelBounds();
                        return new N(this.unproject(t.getBottomLeft()), this.unproject(t.getTopRight()))
                    },
                    getMinZoom: function () {
                        return void 0 === this.options.minZoom ? this._layersMinZoom || 0 : this.options.minZoom
                    },
                    getMaxZoom: function () {
                        return void 0 === this.options.maxZoom ? void 0 === this._layersMaxZoom ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
                    },
                    getBoundsZoom: function (t, e, i) {
                        t = Z(t),
                        i = O(i || [0, 0]);
                        var n = this.getZoom() || 0,
                        o = this.getMinZoom(),
                        r = this.getMaxZoom(),
                        s = t.getNorthWest(),
                        a = t.getSouthEast(),
                        h = this.getSize().subtract(i),
                        l = B(this.project(a, n), this.project(s, n)).getSize(),
                        c = At.any3d ? this.options.zoomSnap : 1,
                        u = h.x / l.x,
                        d = h.y / l.y,
                        p = e ? Math.max(u, d) : Math.min(u, d);
                        return n = this.getScaleZoom(p, n),
                        c && (n = Math.round(n / (c / 100)) * (c / 100), n = e ? Math.ceil(n / c) * c : Math.floor(n / c) * c),
                        Math.max(o, Math.min(r, n))
                    },
                    getSize: function () {
                        return this._size && !this._sizeChanged || (this._size = new E(this._container.clientWidth || 0, this._container.clientHeight || 0), this._sizeChanged = !1),
                        this._size.clone()
                    },
                    getPixelBounds: function (t, e) {
                        var i = this._getTopLeftPoint(t, e);
                        return new A(i, i.add(this.getSize()))
                    },
                    getPixelOrigin: function () {
                        return this._checkIfLoaded(),
                        this._pixelOrigin
                    },
                    getPixelWorldBounds: function (t) {
                        return this.options.crs.getProjectedBounds(void 0 === t ? this.getZoom() : t)
                    },
                    getPane: function (t) {
                        return "string" == typeof t ? this._panes[t] : t
                    },
                    getPanes: function () {
                        return this._panes
                    },
                    getContainer: function () {
                        return this._container
                    },
                    getZoomScale: function (t, e) {
                        var i = this.options.crs;
                        return e = void 0 === e ? this._zoom : e,
                        i.scale(t) / i.scale(e)
                    },
                    getScaleZoom: function (t, e) {
                        var i = this.options.crs;
                        e = void 0 === e ? this._zoom : e;
                        var n = i.zoom(t * i.scale(e));
                        return isNaN(n) ? 1 / 0 : n
                    },
                    project: function (t, e) {
                        return e = void 0 === e ? this._zoom : e,
                        this.options.crs.latLngToPoint(j(t), e)
                    },
                    unproject: function (t, e) {
                        return e = void 0 === e ? this._zoom : e,
                        this.options.crs.pointToLatLng(O(t), e)
                    },
                    layerPointToLatLng: function (t) {
                        var e = O(t).add(this.getPixelOrigin());
                        return this.unproject(e)
                    },
                    latLngToLayerPoint: function (t) {
                        return this.project(j(t))._round()._subtract(this.getPixelOrigin())
                    },
                    wrapLatLng: function (t) {
                        return this.options.crs.wrapLatLng(j(t))
                    },
                    wrapLatLngBounds: function (t) {
                        return this.options.crs.wrapLatLngBounds(Z(t))
                    },
                    distance: function (t, e) {
                        return this.options.crs.distance(j(t), j(e))
                    },
                    containerPointToLayerPoint: function (t) {
                        return O(t).subtract(this._getMapPanePos())
                    },
                    layerPointToContainerPoint: function (t) {
                        return O(t).add(this._getMapPanePos())
                    },
                    containerPointToLatLng: function (t) {
                        var e = this.containerPointToLayerPoint(O(t));
                        return this.layerPointToLatLng(e)
                    },
                    latLngToContainerPoint: function (t) {
                        return this.layerPointToContainerPoint(this.latLngToLayerPoint(j(t)))
                    },
                    mouseEventToContainerPoint: function (t) {
                        return Re(t, this._container)
                    },
                    mouseEventToLayerPoint: function (t) {
                        return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))
                    },
                    mouseEventToLatLng: function (t) {
                        return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))
                    },
                    _initContainer: function (t) {
                        var e = this._container = ie(t);
                        if (!e)
                            throw new Error("Map container not found.");
                        if (e._leaflet_id)
                            throw new Error("Map container is already initialized.");
                        ke(e, "scroll", this._onScroll, this),
                        this._containerId = r(e)
                    },
                    _initLayout: function () {
                        var t = this._container;
                        this._fadeAnimated = this.options.fadeAnimation && At.any3d,
                        ce(t, "leaflet-container" + (At.touch ? " leaflet-touch" : "") + (At.retina ? " leaflet-retina" : "") + (At.ielt9 ? " leaflet-oldie" : "") + (At.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
                        var e = ne(t, "position");
                        "absolute" !== e && "relative" !== e && "fixed" !== e && "sticky" !== e && (t.style.position = "relative"),
                        this._initPanes(),
                        this._initControlPos && this._initControlPos()
                    },
                    _initPanes: function () {
                        var t = this._panes = {};
                        this._paneRenderers = {},
                        this._mapPane = this.createPane("mapPane", this._container),
                        ge(this._mapPane, new E(0, 0)),
                        this.createPane("tilePane"),
                        this.createPane("overlayPane"),
                        this.createPane("shadowPane"),
                        this.createPane("markerPane"),
                        this.createPane("tooltipPane"),
                        this.createPane("popupPane"),
                        this.options.markerZoomAnimation || (ce(t.markerPane, "leaflet-zoom-hide"), ce(t.shadowPane, "leaflet-zoom-hide"))
                    },
                    _resetView: function (t, e, i) {
                        ge(this._mapPane, new E(0, 0));
                        var n = !this._loaded;
                        this._loaded = !0,
                        e = this._limitZoom(e),
                        this.fire("viewprereset");
                        var o = this._zoom !== e;
                        this._moveStart(o, i)._move(t, e)._moveEnd(o),
                        this.fire("viewreset"),
                        n && this.fire("load")
                    },
                    _moveStart: function (t, e) {
                        return t && this.fire("zoomstart"),
                        e || this.fire("movestart"),
                        this
                    },
                    _move: function (t, e, i, n) {
                        void 0 === e && (e = this._zoom);
                        var o = this._zoom !== e;
                        return this._zoom = e,
                        this._lastCenter = t,
                        this._pixelOrigin = this._getNewPixelOrigin(t),
                        n ? i && i.pinch && this.fire("zoom", i) : ((o || i && i.pinch) && this.fire("zoom", i), this.fire("move", i)),
                        this
                    },
                    _moveEnd: function (t) {
                        return t && this.fire("zoomend"),
                        this.fire("moveend")
                    },
                    _stop: function () {
                        return S(this._flyToFrame),
                        this._panAnim && this._panAnim.stop(),
                        this
                    },
                    _rawPanBy: function (t) {
                        ge(this._mapPane, this._getMapPanePos().subtract(t))
                    },
                    _getZoomSpan: function () {
                        return this.getMaxZoom() - this.getMinZoom()
                    },
                    _panInsideMaxBounds: function () {
                        this._enforcingBounds || this.panInsideBounds(this.options.maxBounds)
                    },
                    _checkIfLoaded: function () {
                        if (!this._loaded)
                            throw new Error("Set map center and zoom first.")
                    },
                    _initEvents: function (t) {
                        this._targets = {},
                        this._targets[r(this._container)] = this;
                        var e = t ? Ce : ke;
                        e(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this),
                        this.options.trackResize && e(window, "resize", this._onResize, this),
                        At.any3d && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd)
                    },
                    _onResize: function () {
                        S(this._resizeRequest),
                        this._resizeRequest = T((function () {
                                    this.invalidateSize({
                                        debounceMoveend: !0
                                    })
                                }), this)
                    },
                    _onScroll: function () {
                        this._container.scrollTop = 0,
                        this._container.scrollLeft = 0
                    },
                    _onMoveEnd: function () {
                        var t = this._getMapPanePos();
                        Math.max(Math.abs(t.x), Math.abs(t.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom())
                    },
                    _findEventTargets: function (t, e) {
                        for (var i, n = [], o = "mouseout" === e || "mouseover" === e, s = t.target || t.srcElement, a = !1; s; ) {
                            if ((i = this._targets[r(s)]) && ("click" === e || "preclick" === e) && this._draggableMoved(i)) {
                                a = !0;
                                break
                            }
                            if (i && i.listens(e, !0)) {
                                if (o && !Ge(s, t))
                                    break;
                                if (n.push(i), o)
                                    break
                            }
                            if (s === this._container)
                                break;
                            s = s.parentNode
                        }
                        return n.length || a || o || !this.listens(e, !0) || (n = [this]),
                        n
                    },
                    _isClickDisabled: function (t) {
                        for (; t && t !== this._container; ) {
                            if (t._leaflet_disable_click)
                                return !0;
                            t = t.parentNode
                        }
                    },
                    _handleDOMEvent: function (t) {
                        var e = t.target || t.srcElement;
                        if (!(!this._loaded || e._leaflet_disable_events || "click" === t.type && this._isClickDisabled(e))) {
                            var i = t.type;
                            "mousedown" === i && be(e),
                            this._fireDOMEvent(t, i)
                        }
                    },
                    _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
                    _fireDOMEvent: function (t, i, n) {
                        if ("click" === t.type) {
                            var o = e({}, t);
                            o.type = "preclick",
                            this._fireDOMEvent(o, o.type, n)
                        }
                        var r = this._findEventTargets(t, i);
                        if (n) {
                            for (var s = [], a = 0; a < n.length; a++)
                                n[a].listens(i, !0) && s.push(n[a]);
                            r = s.concat(r)
                        }
                        if (r.length) {
                            "contextmenu" === i && Ze(t);
                            var h = r[0],
                            l = {
                                originalEvent: t
                            };
                            if ("keypress" !== t.type && "keydown" !== t.type && "keyup" !== t.type) {
                                var c = h.getLatLng && (!h._radius || h._radius <= 10);
                                l.containerPoint = c ? this.latLngToContainerPoint(h.getLatLng()) : this.mouseEventToContainerPoint(t),
                                l.layerPoint = this.containerPointToLayerPoint(l.containerPoint),
                                l.latlng = c ? h.getLatLng() : this.layerPointToLatLng(l.layerPoint)
                            }
                            for (a = 0; a < r.length; a++)
                                if (r[a].fire(i, l, !0), l.originalEvent._stopped || !1 === r[a].options.bubblingMouseEvents && -1 !== g(this._mouseEvents, i))
                                    return
                        }
                    },
                    _draggableMoved: function (t) {
                        return (t = t.dragging && t.dragging.enabled() ? t : this).dragging && t.dragging.moved() || this.boxZoom && this.boxZoom.moved()
                    },
                    _clearHandlers: function () {
                        for (var t = 0, e = this._handlers.length; t < e; t++)
                            this._handlers[t].disable()
                    },
                    whenReady: function (t, e) {
                        return this._loaded ? t.call(e || this, {
                            target: this
                        }) : this.on("load", t, e),
                        this
                    },
                    _getMapPanePos: function () {
                        return ve(this._mapPane) || new E(0, 0)
                    },
                    _moved: function () {
                        var t = this._getMapPanePos();
                        return t && !t.equals([0, 0])
                    },
                    _getTopLeftPoint: function (t, e) {
                        return (t && void 0 !== e ? this._getNewPixelOrigin(t, e) : this.getPixelOrigin()).subtract(this._getMapPanePos())
                    },
                    _getNewPixelOrigin: function (t, e) {
                        var i = this.getSize()._divideBy(2);
                        return this.project(t, e)._subtract(i)._add(this._getMapPanePos())._round()
                    },
                    _latLngToNewLayerPoint: function (t, e, i) {
                        var n = this._getNewPixelOrigin(i, e);
                        return this.project(t, e)._subtract(n)
                    },
                    _latLngBoundsToNewLayerBounds: function (t, e, i) {
                        var n = this._getNewPixelOrigin(i, e);
                        return B([this.project(t.getSouthWest(), e)._subtract(n), this.project(t.getNorthWest(), e)._subtract(n), this.project(t.getSouthEast(), e)._subtract(n), this.project(t.getNorthEast(), e)._subtract(n)])
                    },
                    _getCenterLayerPoint: function () {
                        return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
                    },
                    _getCenterOffset: function (t) {
                        return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())
                    },
                    _limitCenter: function (t, e, i) {
                        if (!i)
                            return t;
                        var n = this.project(t, e),
                        o = this.getSize().divideBy(2),
                        r = new A(n.subtract(o), n.add(o)),
                        s = this._getBoundsOffset(r, i, e);
                        return Math.abs(s.x) <= 1 && Math.abs(s.y) <= 1 ? t : this.unproject(n.add(s), e)
                    },
                    _limitOffset: function (t, e) {
                        if (!e)
                            return t;
                        var i = this.getPixelBounds(),
                        n = new A(i.min.add(t), i.max.add(t));
                        return t.add(this._getBoundsOffset(n, e))
                    },
                    _getBoundsOffset: function (t, e, i) {
                        var n = B(this.project(e.getNorthEast(), i), this.project(e.getSouthWest(), i)),
                        o = n.min.subtract(t.min),
                        r = n.max.subtract(t.max);
                        return new E(this._rebound(o.x, -r.x), this._rebound(o.y, -r.y))
                    },
                    _rebound: function (t, e) {
                        return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e))
                    },
                    _limitZoom: function (t) {
                        var e = this.getMinZoom(),
                        i = this.getMaxZoom(),
                        n = At.any3d ? this.options.zoomSnap : 1;
                        return n && (t = Math.round(t / n) * n),
                        Math.max(e, Math.min(i, t))
                    },
                    _onPanTransitionStep: function () {
                        this.fire("move")
                    },
                    _onPanTransitionEnd: function () {
                        ue(this._mapPane, "leaflet-pan-anim"),
                        this.fire("moveend")
                    },
                    _tryAnimatedPan: function (t, e) {
                        var i = this._getCenterOffset(t)._trunc();
                        return !(!0 !== (e && e.animate) && !this.getSize().contains(i) || (this.panBy(i, e), 0))
                    },
                    _createAnimProxy: function () {
                        var t = this._proxy = oe("div", "leaflet-proxy leaflet-zoom-animated");
                        this._panes.mapPane.appendChild(t),
                        this.on("zoomanim", (function (t) {
                                var e = Qt,
                                i = this._proxy.style[e];
                                me(this._proxy, this.project(t.center, t.zoom), this.getZoomScale(t.zoom, 1)),
                                i === this._proxy.style[e] && this._animatingZoom && this._onZoomTransitionEnd()
                            }), this),
                        this.on("load moveend", this._animMoveEnd, this),
                        this._on("unload", this._destroyAnimProxy, this)
                    },
                    _destroyAnimProxy: function () {
                        re(this._proxy),
                        this.off("load moveend", this._animMoveEnd, this),
                        delete this._proxy
                    },
                    _animMoveEnd: function () {
                        var t = this.getCenter(),
                        e = this.getZoom();
                        me(this._proxy, this.project(t, e), this.getZoomScale(e, 1))
                    },
                    _catchTransitionEnd: function (t) {
                        this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd()
                    },
                    _nothingToAnimate: function () {
                        return !this._container.getElementsByClassName("leaflet-zoom-animated").length
                    },
                    _tryAnimatedZoom: function (t, e, i) {
                        if (this._animatingZoom)
                            return !0;
                        if (i = i || {}, !this._zoomAnimated || !1 === i.animate || this._nothingToAnimate() || Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold)
                            return !1;
                        var n = this.getZoomScale(e),
                        o = this._getCenterOffset(t)._divideBy(1 - 1 / n);
                        return !(!0 !== i.animate && !this.getSize().contains(o) || (T((function () {
                                        this._moveStart(!0, !1)._animateZoom(t, e, !0)
                                    }), this), 0))
                    },
                    _animateZoom: function (t, e, i, o) {
                        this._mapPane && (i && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = e, ce(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
                                center: t,
                                zoom: e,
                                noUpdate: o
                            }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(n(this._onZoomTransitionEnd, this), 250))
                    },
                    _onZoomTransitionEnd: function () {
                        this._animatingZoom && (this._mapPane && ue(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0))
                    }
                });
                var Ye = M.extend({
                    options: {
                        position: "topright"
                    },
                    initialize: function (t) {
                        d(this, t)
                    },
                    getPosition: function () {
                        return this.options.position
                    },
                    setPosition: function (t) {
                        var e = this._map;
                        return e && e.removeControl(this),
                        this.options.position = t,
                        e && e.addControl(this),
                        this
                    },
                    getContainer: function () {
                        return this._container
                    },
                    addTo: function (t) {
                        this.remove(),
                        this._map = t;
                        var e = this._container = this.onAdd(t),
                        i = this.getPosition(),
                        n = t._controlCorners[i];
                        return ce(e, "leaflet-control"),
                        -1 !== i.indexOf("bottom") ? n.insertBefore(e, n.firstChild) : n.appendChild(e),
                        this._map.on("unload", this.remove, this),
                        this
                    },
                    remove: function () {
                        return this._map ? (re(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this
                    },
                    _refocusOnMap: function (t) {
                        this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus()
                    }
                }),
                qe = function (t) {
                    return new Ye(t)
                };
                Ve.include({
                    addControl: function (t) {
                        return t.addTo(this),
                        this
                    },
                    removeControl: function (t) {
                        return t.remove(),
                        this
                    },
                    _initControlPos: function () {
                        var t = this._controlCorners = {},
                        e = "leaflet-",
                        i = this._controlContainer = oe("div", e + "control-container", this._container);
                        function n(n, o) {
                            var r = e + n + " " + e + o;
                            t[n + o] = oe("div", r, i)
                        }
                        n("top", "left"),
                        n("top", "right"),
                        n("bottom", "left"),
                        n("bottom", "right")
                    },
                    _clearControlPos: function () {
                        for (var t in this._controlCorners)
                            re(this._controlCorners[t]);
                        re(this._controlContainer),
                        delete this._controlCorners,
                        delete this._controlContainer
                    }
                });
                var Xe = Ye.extend({
                    options: {
                        collapsed: !0,
                        position: "topright",
                        autoZIndex: !0,
                        hideSingleBase: !1,
                        sortLayers: !1,
                        sortFunction: function (t, e, i, n) {
                            return i < n ? -1 : n < i ? 1 : 0
                        }
                    },
                    initialize: function (t, e, i) {
                        for (var n in d(this, i), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, t)
                            this._addLayer(t[n], n);
                        for (n in e)
                            this._addLayer(e[n], n, !0)
                    },
                    onAdd: function (t) {
                        this._initLayout(),
                        this._update(),
                        this._map = t,
                        t.on("zoomend", this._checkDisabledLayers, this);
                        for (var e = 0; e < this._layers.length; e++)
                            this._layers[e].layer.on("add remove", this._onLayerChange, this);
                        return this._container
                    },
                    addTo: function (t) {
                        return Ye.prototype.addTo.call(this, t),
                        this._expandIfNotCollapsed()
                    },
                    onRemove: function () {
                        this._map.off("zoomend", this._checkDisabledLayers, this);
                        for (var t = 0; t < this._layers.length; t++)
                            this._layers[t].layer.off("add remove", this._onLayerChange, this)
                    },
                    addBaseLayer: function (t, e) {
                        return this._addLayer(t, e),
                        this._map ? this._update() : this
                    },
                    addOverlay: function (t, e) {
                        return this._addLayer(t, e, !0),
                        this._map ? this._update() : this
                    },
                    removeLayer: function (t) {
                        t.off("add remove", this._onLayerChange, this);
                        var e = this._getLayer(r(t));
                        return e && this._layers.splice(this._layers.indexOf(e), 1),
                        this._map ? this._update() : this
                    },
                    expand: function () {
                        ce(this._container, "leaflet-control-layers-expanded"),
                        this._section.style.height = null;
                        var t = this._map.getSize().y - (this._container.offsetTop + 50);
                        return t < this._section.clientHeight ? (ce(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = t + "px") : ue(this._section, "leaflet-control-layers-scrollbar"),
                        this._checkDisabledLayers(),
                        this
                    },
                    collapse: function () {
                        return ue(this._container, "leaflet-control-layers-expanded"),
                        this
                    },
                    _initLayout: function () {
                        var t = "leaflet-control-layers",
                        e = this._container = oe("div", t),
                        i = this.options.collapsed;
                        e.setAttribute("aria-haspopup", !0),
                        Ne(e),
                        Be(e);
                        var n = this._section = oe("section", t + "-list");
                        i && (this._map.on("click", this.collapse, this), ke(e, {
                                mouseenter: this._expandSafely,
                                mouseleave: this.collapse
                            }, this));
                        var o = this._layersLink = oe("a", t + "-toggle", e);
                        o.href = "#",
                        o.title = "Layers",
                        o.setAttribute("role", "button"),
                        ke(o, {
                            keydown: function (t) {
                                13 === t.keyCode && this._expandSafely()
                            },
                            click: function (t) {
                                Ze(t),
                                this._expandSafely()
                            }
                        }, this),
                        i || this.expand(),
                        this._baseLayersList = oe("div", t + "-base", n),
                        this._separator = oe("div", t + "-separator", n),
                        this._overlaysList = oe("div", t + "-overlays", n),
                        e.appendChild(n)
                    },
                    _getLayer: function (t) {
                        for (var e = 0; e < this._layers.length; e++)
                            if (this._layers[e] && r(this._layers[e].layer) === t)
                                return this._layers[e]
                    },
                    _addLayer: function (t, e, i) {
                        this._map && t.on("add remove", this._onLayerChange, this),
                        this._layers.push({
                            layer: t,
                            name: e,
                            overlay: i
                        }),
                        this.options.sortLayers && this._layers.sort(n((function (t, e) {
                                    return this.options.sortFunction(t.layer, e.layer, t.name, e.name)
                                }), this)),
                        this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)),
                        this._expandIfNotCollapsed()
                    },
                    _update: function () {
                        if (!this._container)
                            return this;
                        se(this._baseLayersList),
                        se(this._overlaysList),
                        this._layerControlInputs = [];
                        var t,
                        e,
                        i,
                        n,
                        o = 0;
                        for (i = 0; i < this._layers.length; i++)
                            n = this._layers[i], this._addItem(n), e = e || n.overlay, t = t || !n.overlay, o += n.overlay ? 0 : 1;
                        return this.options.hideSingleBase && (t = t && o > 1, this._baseLayersList.style.display = t ? "" : "none"),
                        this._separator.style.display = e && t ? "" : "none",
                        this
                    },
                    _onLayerChange: function (t) {
                        this._handlingClick || this._update();
                        var e = this._getLayer(r(t.target)),
                        i = e.overlay ? "add" === t.type ? "overlayadd" : "overlayremove" : "add" === t.type ? "baselayerchange" : null;
                        i && this._map.fire(i, e)
                    },
                    _createRadioElement: function (t, e) {
                        var i = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (e ? ' checked="checked"' : "") + "/>",
                        n = document.createElement("div");
                        return n.innerHTML = i,
                        n.firstChild
                    },
                    _addItem: function (t) {
                        var e,
                        i = document.createElement("label"),
                        n = this._map.hasLayer(t.layer);
                        t.overlay ? ((e = document.createElement("input")).type = "checkbox", e.className = "leaflet-control-layers-selector", e.defaultChecked = n) : e = this._createRadioElement("leaflet-base-layers_" + r(this), n),
                        this._layerControlInputs.push(e),
                        e.layerId = r(t.layer),
                        ke(e, "click", this._onInputClick, this);
                        var o = document.createElement("span");
                        o.innerHTML = " " + t.name;
                        var s = document.createElement("span");
                        return i.appendChild(s),
                        s.appendChild(e),
                        s.appendChild(o),
                        (t.overlay ? this._overlaysList : this._baseLayersList).appendChild(i),
                        this._checkDisabledLayers(),
                        i
                    },
                    _onInputClick: function () {
                        var t,
                        e,
                        i = this._layerControlInputs,
                        n = [],
                        o = [];
                        this._handlingClick = !0;
                        for (var r = i.length - 1; r >= 0; r--)
                            t = i[r], e = this._getLayer(t.layerId).layer, t.checked ? n.push(e) : t.checked || o.push(e);
                        for (r = 0; r < o.length; r++)
                            this._map.hasLayer(o[r]) && this._map.removeLayer(o[r]);
                        for (r = 0; r < n.length; r++)
                            this._map.hasLayer(n[r]) || this._map.addLayer(n[r]);
                        this._handlingClick = !1,
                        this._refocusOnMap()
                    },
                    _checkDisabledLayers: function () {
                        for (var t, e, i = this._layerControlInputs, n = this._map.getZoom(), o = i.length - 1; o >= 0; o--)
                            t = i[o], e = this._getLayer(t.layerId).layer, t.disabled = void 0 !== e.options.minZoom && n < e.options.minZoom || void 0 !== e.options.maxZoom && n > e.options.maxZoom
                    },
                    _expandIfNotCollapsed: function () {
                        return this._map && !this.options.collapsed && this.expand(),
                        this
                    },
                    _expandSafely: function () {
                        var t = this._section;
                        ke(t, "click", Ze),
                        this.expand(),
                        setTimeout((function () {
                                Ce(t, "click", Ze)
                            }))
                    }
                }),
                Ke = Ye.extend({
                    options: {
                        position: "topleft",
                        zoomInText: '<span aria-hidden="true">+</span>',
                        zoomInTitle: "Zoom in",
                        zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
                        zoomOutTitle: "Zoom out"
                    },
                    onAdd: function (t) {
                        var e = "leaflet-control-zoom",
                        i = oe("div", e + " leaflet-bar"),
                        n = this.options;
                        return this._zoomInButton = this._createButton(n.zoomInText, n.zoomInTitle, e + "-in", i, this._zoomIn),
                        this._zoomOutButton = this._createButton(n.zoomOutText, n.zoomOutTitle, e + "-out", i, this._zoomOut),
                        this._updateDisabled(),
                        t.on("zoomend zoomlevelschange", this._updateDisabled, this),
                        i
                    },
                    onRemove: function (t) {
                        t.off("zoomend zoomlevelschange", this._updateDisabled, this)
                    },
                    disable: function () {
                        return this._disabled = !0,
                        this._updateDisabled(),
                        this
                    },
                    enable: function () {
                        return this._disabled = !1,
                        this._updateDisabled(),
                        this
                    },
                    _zoomIn: function (t) {
                        !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1))
                    },
                    _zoomOut: function (t) {
                        !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1))
                    },
                    _createButton: function (t, e, i, n, o) {
                        var r = oe("a", i, n);
                        return r.innerHTML = t,
                        r.href = "#",
                        r.title = e,
                        r.setAttribute("role", "button"),
                        r.setAttribute("aria-label", e),
                        Ne(r),
                        ke(r, "click", De),
                        ke(r, "click", o, this),
                        ke(r, "click", this._refocusOnMap, this),
                        r
                    },
                    _updateDisabled: function () {
                        var t = this._map,
                        e = "leaflet-disabled";
                        ue(this._zoomInButton, e),
                        ue(this._zoomOutButton, e),
                        this._zoomInButton.setAttribute("aria-disabled", "false"),
                        this._zoomOutButton.setAttribute("aria-disabled", "false"),
                        (this._disabled || t._zoom === t.getMinZoom()) && (ce(this._zoomOutButton, e), this._zoomOutButton.setAttribute("aria-disabled", "true")),
                        (this._disabled || t._zoom === t.getMaxZoom()) && (ce(this._zoomInButton, e), this._zoomInButton.setAttribute("aria-disabled", "true"))
                    }
                });
                Ve.mergeOptions({
                    zoomControl: !0
                }),
                Ve.addInitHook((function () {
                        this.options.zoomControl && (this.zoomControl = new Ke, this.addControl(this.zoomControl))
                    }));
                var Je = Ye.extend({
                    options: {
                        position: "bottomleft",
                        maxWidth: 100,
                        metric: !0,
                        imperial: !0
                    },
                    onAdd: function (t) {
                        var e = "leaflet-control-scale",
                        i = oe("div", e),
                        n = this.options;
                        return this._addScales(n, e + "-line", i),
                        t.on(n.updateWhenIdle ? "moveend" : "move", this._update, this),
                        t.whenReady(this._update, this),
                        i
                    },
                    onRemove: function (t) {
                        t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
                    },
                    _addScales: function (t, e, i) {
                        t.metric && (this._mScale = oe("div", e, i)),
                        t.imperial && (this._iScale = oe("div", e, i))
                    },
                    _update: function () {
                        var t = this._map,
                        e = t.getSize().y / 2,
                        i = t.distance(t.containerPointToLatLng([0, e]), t.containerPointToLatLng([this.options.maxWidth, e]));
                        this._updateScales(i)
                    },
                    _updateScales: function (t) {
                        this.options.metric && t && this._updateMetric(t),
                        this.options.imperial && t && this._updateImperial(t)
                    },
                    _updateMetric: function (t) {
                        var e = this._getRoundNum(t),
                        i = e < 1e3 ? e + " m" : e / 1e3 + " km";
                        this._updateScale(this._mScale, i, e / t)
                    },
                    _updateImperial: function (t) {
                        var e,
                        i,
                        n,
                        o = 3.2808399 * t;
                        o > 5280 ? (e = o / 5280, i = this._getRoundNum(e), this._updateScale(this._iScale, i + " mi", i / e)) : (n = this._getRoundNum(o), this._updateScale(this._iScale, n + " ft", n / o))
                    },
                    _updateScale: function (t, e, i) {
                        t.style.width = Math.round(this.options.maxWidth * i) + "px",
                        t.innerHTML = e
                    },
                    _getRoundNum: function (t) {
                        var e = Math.pow(10, (Math.floor(t) + "").length - 1),
                        i = t / e;
                        return e * (i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1)
                    }
                }),
                $e = Ye.extend({
                    options: {
                        position: "bottomright",
                        prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (At.inlineSvg ? '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg> ' : "") + "Leaflet</a>"
                    },
                    initialize: function (t) {
                        d(this, t),
                        this._attributions = {}
                    },
                    onAdd: function (t) {
                        for (var e in t.attributionControl = this, this._container = oe("div", "leaflet-control-attribution"), Ne(this._container), t._layers)
                            t._layers[e].getAttribution && this.addAttribution(t._layers[e].getAttribution());
                        return this._update(),
                        t.on("layeradd", this._addAttribution, this),
                        this._container
                    },
                    onRemove: function (t) {
                        t.off("layeradd", this._addAttribution, this)
                    },
                    _addAttribution: function (t) {
                        t.layer.getAttribution && (this.addAttribution(t.layer.getAttribution()), t.layer.once("remove", (function () {
                                    this.removeAttribution(t.layer.getAttribution())
                                }), this))
                    },
                    setPrefix: function (t) {
                        return this.options.prefix = t,
                        this._update(),
                        this
                    },
                    addAttribution: function (t) {
                        return t ? (this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update(), this) : this
                    },
                    removeAttribution: function (t) {
                        return t ? (this._attributions[t] && (this._attributions[t]--, this._update()), this) : this
                    },
                    _update: function () {
                        if (this._map) {
                            var t = [];
                            for (var e in this._attributions)
                                this._attributions[e] && t.push(e);
                            var i = [];
                            this.options.prefix && i.push(this.options.prefix),
                            t.length && i.push(t.join(", ")),
                            this._container.innerHTML = i.join(' <span aria-hidden="true">|</span> ')
                        }
                    }
                });
                Ve.mergeOptions({
                    attributionControl: !0
                }),
                Ve.addInitHook((function () {
                        this.options.attributionControl && (new $e).addTo(this)
                    }));
                Ye.Layers = Xe,
                Ye.Zoom = Ke,
                Ye.Scale = Je,
                Ye.Attribution = $e,
                qe.layers = function (t, e, i) {
                    return new Xe(t, e, i)
                },
                qe.zoom = function (t) {
                    return new Ke(t)
                },
                qe.scale = function (t) {
                    return new Je(t)
                },
                qe.attribution = function (t) {
                    return new $e(t)
                };
                var Qe = M.extend({
                    initialize: function (t) {
                        this._map = t
                    },
                    enable: function () {
                        return this._enabled || (this._enabled = !0, this.addHooks()),
                        this
                    },
                    disable: function () {
                        return this._enabled ? (this._enabled = !1, this.removeHooks(), this) : this
                    },
                    enabled: function () {
                        return !!this._enabled
                    }
                });
                Qe.addTo = function (t, e) {
                    return t.addHandler(e, this),
                    this
                };
                var ti,
                ei = {
                    Events: C
                },
                ii = At.touch ? "touchstart mousedown" : "mousedown",
                ni = I.extend({
                    options: {
                        clickTolerance: 3
                    },
                    initialize: function (t, e, i, n) {
                        d(this, n),
                        this._element = t,
                        this._dragStartTarget = e || t,
                        this._preventOutline = i
                    },
                    enable: function () {
                        this._enabled || (ke(this._dragStartTarget, ii, this._onDown, this), this._enabled = !0)
                    },
                    disable: function () {
                        this._enabled && (ni._dragging === this && this.finishDrag(!0), Ce(this._dragStartTarget, ii, this._onDown, this), this._enabled = !1, this._moved = !1)
                    },
                    _onDown: function (t) {
                        if (this._enabled && (this._moved = !1, !le(this._element, "leaflet-zoom-anim")))
                            if (t.touches && 1 !== t.touches.length)
                                ni._dragging === this && this.finishDrag();
                            else if (!(ni._dragging || t.shiftKey || 1 !== t.which && 1 !== t.button && !t.touches || (ni._dragging = this, this._preventOutline && be(this._element), Le(), qt(), this._moving))) {
                                this.fire("down");
                                var e = t.touches ? t.touches[0] : t,
                                i = Pe(this._element);
                                this._startPoint = new E(e.clientX, e.clientY),
                                this._startPos = ve(this._element),
                                this._parentScale = Te(i);
                                var n = "mousedown" === t.type;
                                ke(document, n ? "mousemove" : "touchmove", this._onMove, this),
                                ke(document, n ? "mouseup" : "touchend touchcancel", this._onUp, this)
                            }
                    },
                    _onMove: function (t) {
                        if (this._enabled)
                            if (t.touches && t.touches.length > 1)
                                this._moved = !0;
                            else {
                                var e = t.touches && 1 === t.touches.length ? t.touches[0] : t,
                                i = new E(e.clientX, e.clientY)._subtract(this._startPoint);
                                (i.x || i.y) && (Math.abs(i.x) + Math.abs(i.y) < this.options.clickTolerance || (i.x /= this._parentScale.x, i.y /= this._parentScale.y, Ze(t), this._moved || (this.fire("dragstart"), this._moved = !0, ce(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), ce(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(i), this._moving = !0, this._lastEvent = t, this._updatePosition()))
                            }
                    },
                    _updatePosition: function () {
                        var t = {
                            originalEvent: this._lastEvent
                        };
                        this.fire("predrag", t),
                        ge(this._element, this._newPos),
                        this.fire("drag", t)
                    },
                    _onUp: function () {
                        this._enabled && this.finishDrag()
                    },
                    finishDrag: function (t) {
                        ue(document.body, "leaflet-dragging"),
                        this._lastTarget && (ue(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null),
                        Ce(document, "mousemove touchmove", this._onMove, this),
                        Ce(document, "mouseup touchend touchcancel", this._onUp, this),
                        we(),
                        Xt(),
                        this._moved && this._moving && this.fire("dragend", {
                            noInertia: t,
                            distance: this._newPos.distanceTo(this._startPos)
                        }),
                        this._moving = !1,
                        ni._dragging = !1
                    }
                });
                function oi(t, e) {
                    if (!e || !t.length)
                        return t.slice();
                    var i = e * e;
                    return function (t, e) {
                        var i = t.length,
                        n = new(typeof Uint8Array != void 0 + "" ? Uint8Array : Array)(i);
                        n[0] = n[i - 1] = 1,
                        si(t, n, e, 0, i - 1);
                        var o,
                        r = [];
                        for (o = 0; o < i; o++)
                            n[o] && r.push(t[o]);
                        return r
                    }
                    (t = function (t, e) {
                        for (var i = [t[0]], n = 1, o = 0, r = t.length; n < r; n++)
                            ci(t[n], t[o]) > e && (i.push(t[n]), o = n);
                        return o < r - 1 && i.push(t[r - 1]),
                        i
                    }
                        (t, i), i)
                }
                function ri(t, e, i) {
                    return Math.sqrt(ui(t, e, i, !0))
                }
                function si(t, e, i, n, o) {
                    var r,
                    s,
                    a,
                    h = 0;
                    for (s = n + 1; s <= o - 1; s++)
                        (a = ui(t[s], t[n], t[o], !0)) > h && (r = s, h = a);
                    h > i && (e[r] = 1, si(t, e, i, n, r), si(t, e, i, r, o))
                }
                function ai(t, e, i, n, o) {
                    var r,
                    s,
                    a,
                    h = n ? ti : li(t, i),
                    l = li(e, i);
                    for (ti = l; ; ) {
                        if (!(h | l))
                            return [t, e];
                        if (h & l)
                            return !1;
                        a = li(s = hi(t, e, r = h || l, i, o), i),
                        r === h ? (t = s, h = a) : (e = s, l = a)
                    }
                }
                function hi(t, e, i, n, o) {
                    var r,
                    s,
                    a = e.x - t.x,
                    h = e.y - t.y,
                    l = n.min,
                    c = n.max;
                    return 8 & i ? (r = t.x + a * (c.y - t.y) / h, s = c.y) : 4 & i ? (r = t.x + a * (l.y - t.y) / h, s = l.y) : 2 & i ? (r = c.x, s = t.y + h * (c.x - t.x) / a) : 1 & i && (r = l.x, s = t.y + h * (l.x - t.x) / a),
                    new E(r, s, o)
                }
                function li(t, e) {
                    var i = 0;
                    return t.x < e.min.x ? i |= 1 : t.x > e.max.x && (i |= 2),
                    t.y < e.min.y ? i |= 4 : t.y > e.max.y && (i |= 8),
                    i
                }
                function ci(t, e) {
                    var i = e.x - t.x,
                    n = e.y - t.y;
                    return i * i + n * n
                }
                function ui(t, e, i, n) {
                    var o,
                    r = e.x,
                    s = e.y,
                    a = i.x - r,
                    h = i.y - s,
                    l = a * a + h * h;
                    return l > 0 && ((o = ((t.x - r) * a + (t.y - s) * h) / l) > 1 ? (r = i.x, s = i.y) : o > 0 && (r += a * o, s += h * o)),
                    a = t.x - r,
                    h = t.y - s,
                    n ? a * a + h * h : new E(r, s)
                }
                function di(t) {
                    return !m(t[0]) || "object" != typeof t[0][0] && void 0 !== t[0][0]
                }
                function pi(t) {
                    return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),
                    di(t)
                }
                function fi(t, e) {
                    var i,
                    n,
                    o,
                    r,
                    s,
                    a,
                    h,
                    l;
                    if (!t || 0 === t.length)
                        throw new Error("latlngs not passed");
                    di(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
                    var c = [];
                    for (var u in t)
                        c.push(e.project(j(t[u])));
                    var d = c.length;
                    for (i = 0, n = 0; i < d - 1; i++)
                        n += c[i].distanceTo(c[i + 1]) / 2;
                    if (0 === n)
                        l = c[0];
                    else
                        for (i = 0, r = 0; i < d - 1; i++)
                            if (s = c[i], a = c[i + 1], (r += o = s.distanceTo(a)) > n) {
                                h = (r - n) / o,
                                l = [a.x - h * (a.x - s.x), a.y - h * (a.y - s.y)];
                                break
                            }
                    return e.unproject(O(l))
                }
                var _i = {
                    __proto__: null,
                    simplify: oi,
                    pointToSegmentDistance: ri,
                    closestPointOnSegment: function (t, e, i) {
                        return ui(t, e, i)
                    },
                    clipSegment: ai,
                    _getEdgeIntersection: hi,
                    _getBitCode: li,
                    _sqClosestPointOnSegment: ui,
                    isFlat: di,
                    _flat: pi,
                    polylineCenter: fi
                };
                function mi(t, e, i) {
                    var n,
                    o,
                    r,
                    s,
                    a,
                    h,
                    l,
                    c,
                    u,
                    d = [1, 4, 2, 8];
                    for (o = 0, l = t.length; o < l; o++)
                        t[o]._code = li(t[o], e);
                    for (s = 0; s < 4; s++) {
                        for (c = d[s], n = [], o = 0, r = (l = t.length) - 1; o < l; r = o++)
                            a = t[o], h = t[r], a._code & c ? h._code & c || ((u = hi(h, a, c, e, i))._code = li(u, e), n.push(u)) : (h._code & c && ((u = hi(h, a, c, e, i))._code = li(u, e), n.push(u)), n.push(a));
                        t = n
                    }
                    return t
                }
                function gi(t, e) {
                    var i,
                    n,
                    o,
                    r,
                    s,
                    a,
                    h,
                    l,
                    c;
                    if (!t || 0 === t.length)
                        throw new Error("latlngs not passed");
                    di(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
                    var u = [];
                    for (var d in t)
                        u.push(e.project(j(t[d])));
                    var p = u.length;
                    for (a = h = l = 0, i = 0, n = p - 1; i < p; n = i++)
                        o = u[i], r = u[n], s = o.y * r.x - r.y * o.x, h += (o.x + r.x) * s, l += (o.y + r.y) * s, a += 3 * s;
                    return c = 0 === a ? u[0] : [h / a, l / a],
                    e.unproject(O(c))
                }
                var vi = {
                    __proto__: null,
                    clipPolygon: mi,
                    polygonCenter: gi
                },
                yi = {
                    project: function (t) {
                        return new E(t.lng, t.lat)
                    },
                    unproject: function (t) {
                        return new D(t.y, t.x)
                    },
                    bounds: new A([-180, -90], [180, 90])
                },
                Li = {
                    R: 6378137,
                    R_MINOR: 6356752.314245179,
                    bounds: new A([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),
                    project: function (t) {
                        var e = Math.PI / 180,
                        i = this.R,
                        n = t.lat * e,
                        o = this.R_MINOR / i,
                        r = Math.sqrt(1 - o * o),
                        s = r * Math.sin(n),
                        a = Math.tan(Math.PI / 4 - n / 2) / Math.pow((1 - s) / (1 + s), r / 2);
                        return n = -i * Math.log(Math.max(a, 1e-10)),
                        new E(t.lng * e * i, n)
                    },
                    unproject: function (t) {
                        for (var e, i = 180 / Math.PI, n = this.R, o = this.R_MINOR / n, r = Math.sqrt(1 - o * o), s = Math.exp(-t.y / n), a = Math.PI / 2 - 2 * Math.atan(s), h = 0, l = .1; h < 15 && Math.abs(l) > 1e-7; h++)
                            e = r * Math.sin(a), e = Math.pow((1 - e) / (1 + e), r / 2), a += l = Math.PI / 2 - 2 * Math.atan(s * e) - a;
                        return new D(a * i, t.x * i / n)
                    }
                },
                wi = {
                    __proto__: null,
                    LonLat: yi,
                    Mercator: Li,
                    SphericalMercator: H
                },
                bi = e({}, U, {
                    code: "EPSG:3395",
                    projection: Li,
                    transformation: function () {
                        var t = .5 / (Math.PI * Li.R);
                        return V(t, .5, -t, .5)
                    }
                    ()
                }),
                xi = e({}, U, {
                    code: "EPSG:4326",
                    projection: yi,
                    transformation: V(1 / 180, 1, -1 / 180, .5)
                }),
                Pi = e({}, F, {
                    projection: yi,
                    transformation: V(1, 0, -1, 0),
                    scale: function (t) {
                        return Math.pow(2, t)
                    },
                    zoom: function (t) {
                        return Math.log(t) / Math.LN2
                    },
                    distance: function (t, e) {
                        var i = e.lng - t.lng,
                        n = e.lat - t.lat;
                        return Math.sqrt(i * i + n * n)
                    },
                    infinite: !0
                });
                F.Earth = U,
                F.EPSG3395 = bi,
                F.EPSG3857 = Y,
                F.EPSG900913 = q,
                F.EPSG4326 = xi,
                F.Simple = Pi;
                var Ti = I.extend({
                    options: {
                        pane: "overlayPane",
                        attribution: null,
                        bubblingMouseEvents: !0
                    },
                    addTo: function (t) {
                        return t.addLayer(this),
                        this
                    },
                    remove: function () {
                        return this.removeFrom(this._map || this._mapToAdd)
                    },
                    removeFrom: function (t) {
                        return t && t.removeLayer(this),
                        this
                    },
                    getPane: function (t) {
                        return this._map.getPane(t ? this.options[t] || t : this.options.pane)
                    },
                    addInteractiveTarget: function (t) {
                        return this._map._targets[r(t)] = this,
                        this
                    },
                    removeInteractiveTarget: function (t) {
                        return delete this._map._targets[r(t)],
                        this
                    },
                    getAttribution: function () {
                        return this.options.attribution
                    },
                    _layerAdd: function (t) {
                        var e = t.target;
                        if (e.hasLayer(this)) {
                            if (this._map = e, this._zoomAnimated = e._zoomAnimated, this.getEvents) {
                                var i = this.getEvents();
                                e.on(i, this),
                                this.once("remove", (function () {
                                        e.off(i, this)
                                    }), this)
                            }
                            this.onAdd(e),
                            this.fire("add"),
                            e.fire("layeradd", {
                                layer: this
                            })
                        }
                    }
                });
                Ve.include({
                    addLayer: function (t) {
                        if (!t._layerAdd)
                            throw new Error("The provided object is not a Layer.");
                        var e = r(t);
                        return this._layers[e] || (this._layers[e] = t, t._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t)),
                        this
                    },
                    removeLayer: function (t) {
                        var e = r(t);
                        return this._layers[e] ? (this._loaded && t.onRemove(this), delete this._layers[e], this._loaded && (this.fire("layerremove", {
                                    layer: t
                                }), t.fire("remove")), t._map = t._mapToAdd = null, this) : this
                    },
                    hasLayer: function (t) {
                        return r(t)in this._layers
                    },
                    eachLayer: function (t, e) {
                        for (var i in this._layers)
                            t.call(e, this._layers[i]);
                        return this
                    },
                    _addLayers: function (t) {
                        for (var e = 0, i = (t = t ? m(t) ? t : [t] : []).length; e < i; e++)
                            this.addLayer(t[e])
                    },
                    _addZoomLimit: function (t) {
                        isNaN(t.options.maxZoom) && isNaN(t.options.minZoom) || (this._zoomBoundLayers[r(t)] = t, this._updateZoomLevels())
                    },
                    _removeZoomLimit: function (t) {
                        var e = r(t);
                        this._zoomBoundLayers[e] && (delete this._zoomBoundLayers[e], this._updateZoomLevels())
                    },
                    _updateZoomLevels: function () {
                        var t = 1 / 0,
                        e = -1 / 0,
                        i = this._getZoomSpan();
                        for (var n in this._zoomBoundLayers) {
                            var o = this._zoomBoundLayers[n].options;
                            t = void 0 === o.minZoom ? t : Math.min(t, o.minZoom),
                            e = void 0 === o.maxZoom ? e : Math.max(e, o.maxZoom)
                        }
                        this._layersMaxZoom = e === -1 / 0 ? void 0 : e,
                        this._layersMinZoom = t === 1 / 0 ? void 0 : t,
                        i !== this._getZoomSpan() && this.fire("zoomlevelschange"),
                        void 0 === this.options.maxZoom && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom),
                        void 0 === this.options.minZoom && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom)
                    }
                });
                var Si = Ti.extend({
                    initialize: function (t, e) {
                        var i,
                        n;
                        if (d(this, e), this._layers = {}, t)
                            for (i = 0, n = t.length; i < n; i++)
                                this.addLayer(t[i])
                    },
                    addLayer: function (t) {
                        var e = this.getLayerId(t);
                        return this._layers[e] = t,
                        this._map && this._map.addLayer(t),
                        this
                    },
                    removeLayer: function (t) {
                        var e = t in this._layers ? t : this.getLayerId(t);
                        return this._map && this._layers[e] && this._map.removeLayer(this._layers[e]),
                        delete this._layers[e],
                        this
                    },
                    hasLayer: function (t) {
                        return ("number" == typeof t ? t : this.getLayerId(t))in this._layers
                    },
                    clearLayers: function () {
                        return this.eachLayer(this.removeLayer, this)
                    },
                    invoke: function (t) {
                        var e,
                        i,
                        n = Array.prototype.slice.call(arguments, 1);
                        for (e in this._layers)
                            (i = this._layers[e])[t] && i[t].apply(i, n);
                        return this
                    },
                    onAdd: function (t) {
                        this.eachLayer(t.addLayer, t)
                    },
                    onRemove: function (t) {
                        this.eachLayer(t.removeLayer, t)
                    },
                    eachLayer: function (t, e) {
                        for (var i in this._layers)
                            t.call(e, this._layers[i]);
                        return this
                    },
                    getLayer: function (t) {
                        return this._layers[t]
                    },
                    getLayers: function () {
                        var t = [];
                        return this.eachLayer(t.push, t),
                        t
                    },
                    setZIndex: function (t) {
                        return this.invoke("setZIndex", t)
                    },
                    getLayerId: function (t) {
                        return r(t)
                    }
                }),
                ki = Si.extend({
                    addLayer: function (t) {
                        return this.hasLayer(t) ? this : (t.addEventParent(this), Si.prototype.addLayer.call(this, t), this.fire("layeradd", {
                                layer: t
                            }))
                    },
                    removeLayer: function (t) {
                        return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), Si.prototype.removeLayer.call(this, t), this.fire("layerremove", {
                                layer: t
                            })) : this
                    },
                    setStyle: function (t) {
                        return this.invoke("setStyle", t)
                    },
                    bringToFront: function () {
                        return this.invoke("bringToFront")
                    },
                    bringToBack: function () {
                        return this.invoke("bringToBack")
                    },
                    getBounds: function () {
                        var t = new N;
                        for (var e in this._layers) {
                            var i = this._layers[e];
                            t.extend(i.getBounds ? i.getBounds() : i.getLatLng())
                        }
                        return t
                    }
                }),
                Mi = M.extend({
                    options: {
                        popupAnchor: [0, 0],
                        tooltipAnchor: [0, 0],
                        crossOrigin: !1
                    },
                    initialize: function (t) {
                        d(this, t)
                    },
                    createIcon: function (t) {
                        return this._createIcon("icon", t)
                    },
                    createShadow: function (t) {
                        return this._createIcon("shadow", t)
                    },
                    _createIcon: function (t, e) {
                        var i = this._getIconUrl(t);
                        if (!i) {
                            if ("icon" === t)
                                throw new Error("iconUrl not set in Icon options (see the docs).");
                            return null
                        }
                        var n = this._createImg(i, e && "IMG" === e.tagName ? e : null);
                        return this._setIconStyles(n, t),
                        (this.options.crossOrigin || "" === this.options.crossOrigin) && (n.crossOrigin = !0 === this.options.crossOrigin ? "" : this.options.crossOrigin),
                        n
                    },
                    _setIconStyles: function (t, e) {
                        var i = this.options,
                        n = i[e + "Size"];
                        "number" == typeof n && (n = [n, n]);
                        var o = O(n),
                        r = O("shadow" === e && i.shadowAnchor || i.iconAnchor || o && o.divideBy(2, !0));
                        t.className = "leaflet-marker-" + e + " " + (i.className || ""),
                        r && (t.style.marginLeft = -r.x + "px", t.style.marginTop = -r.y + "px"),
                        o && (t.style.width = o.x + "px", t.style.height = o.y + "px")
                    },
                    _createImg: function (t, e) {
                        return (e = e || document.createElement("img")).src = t,
                        e
                    },
                    _getIconUrl: function (t) {
                        return At.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"]
                    }
                });
                var Ci = Mi.extend({
                    options: {
                        iconUrl: "marker-icon.png",
                        iconRetinaUrl: "marker-icon-2x.png",
                        shadowUrl: "marker-shadow.png",
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        tooltipAnchor: [16, -28],
                        shadowSize: [41, 41]
                    },
                    _getIconUrl: function (t) {
                        return "string" != typeof Ci.imagePath && (Ci.imagePath = this._detectIconPath()),
                        (this.options.imagePath || Ci.imagePath) + Mi.prototype._getIconUrl.call(this, t)
                    },
                    _stripUrl: function (t) {
                        var e = function (t, e, i) {
                            var n = e.exec(t);
                            return n && n[i]
                        };
                        return (t = e(t, /^url\((['"])?(.+)\1\)$/, 2)) && e(t, /^(.*)marker-icon\.png$/, 1)
                    },
                    _detectIconPath: function () {
                        var t = oe("div", "leaflet-default-icon-path", document.body),
                        e = ne(t, "background-image") || ne(t, "backgroundImage");
                        if (document.body.removeChild(t), e = this._stripUrl(e))
                            return e;
                        var i = document.querySelector('link[href$="leaflet.css"]');
                        return i ? i.href.substring(0, i.href.length - "leaflet.css".length - 1) : ""
                    }
                }),
                Ii = Qe.extend({
                    initialize: function (t) {
                        this._marker = t
                    },
                    addHooks: function () {
                        var t = this._marker._icon;
                        this._draggable || (this._draggable = new ni(t, t, !0)),
                        this._draggable.on({
                            dragstart: this._onDragStart,
                            predrag: this._onPreDrag,
                            drag: this._onDrag,
                            dragend: this._onDragEnd
                        }, this).enable(),
                        ce(t, "leaflet-marker-draggable")
                    },
                    removeHooks: function () {
                        this._draggable.off({
                            dragstart: this._onDragStart,
                            predrag: this._onPreDrag,
                            drag: this._onDrag,
                            dragend: this._onDragEnd
                        }, this).disable(),
                        this._marker._icon && ue(this._marker._icon, "leaflet-marker-draggable")
                    },
                    moved: function () {
                        return this._draggable && this._draggable._moved
                    },
                    _adjustPan: function (t) {
                        var e = this._marker,
                        i = e._map,
                        n = this._marker.options.autoPanSpeed,
                        o = this._marker.options.autoPanPadding,
                        r = ve(e._icon),
                        s = i.getPixelBounds(),
                        a = i.getPixelOrigin(),
                        h = B(s.min._subtract(a).add(o), s.max._subtract(a).subtract(o));
                        if (!h.contains(r)) {
                            var l = O((Math.max(h.max.x, r.x) - h.max.x) / (s.max.x - h.max.x) - (Math.min(h.min.x, r.x) - h.min.x) / (s.min.x - h.min.x), (Math.max(h.max.y, r.y) - h.max.y) / (s.max.y - h.max.y) - (Math.min(h.min.y, r.y) - h.min.y) / (s.min.y - h.min.y)).multiplyBy(n);
                            i.panBy(l, {
                                animate: !1
                            }),
                            this._draggable._newPos._add(l),
                            this._draggable._startPos._add(l),
                            ge(e._icon, this._draggable._newPos),
                            this._onDrag(t),
                            this._panRequest = T(this._adjustPan.bind(this, t))
                        }
                    },
                    _onDragStart: function () {
                        this._oldLatLng = this._marker.getLatLng(),
                        this._marker.closePopup && this._marker.closePopup(),
                        this._marker.fire("movestart").fire("dragstart")
                    },
                    _onPreDrag: function (t) {
                        this._marker.options.autoPan && (S(this._panRequest), this._panRequest = T(this._adjustPan.bind(this, t)))
                    },
                    _onDrag: function (t) {
                        var e = this._marker,
                        i = e._shadow,
                        n = ve(e._icon),
                        o = e._map.layerPointToLatLng(n);
                        i && ge(i, n),
                        e._latlng = o,
                        t.latlng = o,
                        t.oldLatLng = this._oldLatLng,
                        e.fire("move", t).fire("drag", t)
                    },
                    _onDragEnd: function (t) {
                        S(this._panRequest),
                        delete this._oldLatLng,
                        this._marker.fire("moveend").fire("dragend", t)
                    }
                }),
                Ei = Ti.extend({
                    options: {
                        icon: new Ci,
                        interactive: !0,
                        keyboard: !0,
                        title: "",
                        alt: "Marker",
                        zIndexOffset: 0,
                        opacity: 1,
                        riseOnHover: !1,
                        riseOffset: 250,
                        pane: "markerPane",
                        shadowPane: "shadowPane",
                        bubblingMouseEvents: !1,
                        autoPanOnFocus: !0,
                        draggable: !1,
                        autoPan: !1,
                        autoPanPadding: [50, 50],
                        autoPanSpeed: 10
                    },
                    initialize: function (t, e) {
                        d(this, e),
                        this._latlng = j(t)
                    },
                    onAdd: function (t) {
                        this._zoomAnimated = this._zoomAnimated && t.options.markerZoomAnimation,
                        this._zoomAnimated && t.on("zoomanim", this._animateZoom, this),
                        this._initIcon(),
                        this.update()
                    },
                    onRemove: function (t) {
                        this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()),
                        delete this.dragging,
                        this._zoomAnimated && t.off("zoomanim", this._animateZoom, this),
                        this._removeIcon(),
                        this._removeShadow()
                    },
                    getEvents: function () {
                        return {
                            zoom: this.update,
                            viewreset: this.update
                        }
                    },
                    getLatLng: function () {
                        return this._latlng
                    },
                    setLatLng: function (t) {
                        var e = this._latlng;
                        return this._latlng = j(t),
                        this.update(),
                        this.fire("move", {
                            oldLatLng: e,
                            latlng: this._latlng
                        })
                    },
                    setZIndexOffset: function (t) {
                        return this.options.zIndexOffset = t,
                        this.update()
                    },
                    getIcon: function () {
                        return this.options.icon
                    },
                    setIcon: function (t) {
                        return this.options.icon = t,
                        this._map && (this._initIcon(), this.update()),
                        this._popup && this.bindPopup(this._popup, this._popup.options),
                        this
                    },
                    getElement: function () {
                        return this._icon
                    },
                    update: function () {
                        if (this._icon && this._map) {
                            var t = this._map.latLngToLayerPoint(this._latlng).round();
                            this._setPos(t)
                        }
                        return this
                    },
                    _initIcon: function () {
                        var t = this.options,
                        e = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"),
                        i = t.icon.createIcon(this._icon),
                        n = !1;
                        i !== this._icon && (this._icon && this._removeIcon(), n = !0, t.title && (i.title = t.title), "IMG" === i.tagName && (i.alt = t.alt || "")),
                        ce(i, e),
                        t.keyboard && (i.tabIndex = "0", i.setAttribute("role", "button")),
                        this._icon = i,
                        t.riseOnHover && this.on({
                            mouseover: this._bringToFront,
                            mouseout: this._resetZIndex
                        }),
                        this.options.autoPanOnFocus && ke(i, "focus", this._panOnFocus, this);
                        var o = t.icon.createShadow(this._shadow),
                        r = !1;
                        o !== this._shadow && (this._removeShadow(), r = !0),
                        o && (ce(o, e), o.alt = ""),
                        this._shadow = o,
                        t.opacity < 1 && this._updateOpacity(),
                        n && this.getPane().appendChild(this._icon),
                        this._initInteraction(),
                        o && r && this.getPane(t.shadowPane).appendChild(this._shadow)
                    },
                    _removeIcon: function () {
                        this.options.riseOnHover && this.off({
                            mouseover: this._bringToFront,
                            mouseout: this._resetZIndex
                        }),
                        this.options.autoPanOnFocus && Ce(this._icon, "focus", this._panOnFocus, this),
                        re(this._icon),
                        this.removeInteractiveTarget(this._icon),
                        this._icon = null
                    },
                    _removeShadow: function () {
                        this._shadow && re(this._shadow),
                        this._shadow = null
                    },
                    _setPos: function (t) {
                        this._icon && ge(this._icon, t),
                        this._shadow && ge(this._shadow, t),
                        this._zIndex = t.y + this.options.zIndexOffset,
                        this._resetZIndex()
                    },
                    _updateZIndex: function (t) {
                        this._icon && (this._icon.style.zIndex = this._zIndex + t)
                    },
                    _animateZoom: function (t) {
                        var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
                        this._setPos(e)
                    },
                    _initInteraction: function () {
                        if (this.options.interactive && (ce(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), Ii)) {
                            var t = this.options.draggable;
                            this.dragging && (t = this.dragging.enabled(), this.dragging.disable()),
                            this.dragging = new Ii(this),
                            t && this.dragging.enable()
                        }
                    },
                    setOpacity: function (t) {
                        return this.options.opacity = t,
                        this._map && this._updateOpacity(),
                        this
                    },
                    _updateOpacity: function () {
                        var t = this.options.opacity;
                        this._icon && fe(this._icon, t),
                        this._shadow && fe(this._shadow, t)
                    },
                    _bringToFront: function () {
                        this._updateZIndex(this.options.riseOffset)
                    },
                    _resetZIndex: function () {
                        this._updateZIndex(0)
                    },
                    _panOnFocus: function () {
                        var t = this._map;
                        if (t) {
                            var e = this.options.icon.options,
                            i = e.iconSize ? O(e.iconSize) : O(0, 0),
                            n = e.iconAnchor ? O(e.iconAnchor) : O(0, 0);
                            t.panInside(this._latlng, {
                                paddingTopLeft: n,
                                paddingBottomRight: i.subtract(n)
                            })
                        }
                    },
                    _getPopupAnchor: function () {
                        return this.options.icon.options.popupAnchor
                    },
                    _getTooltipAnchor: function () {
                        return this.options.icon.options.tooltipAnchor
                    }
                });
                var zi = Ti.extend({
                    options: {
                        stroke: !0,
                        color: "#3388ff",
                        weight: 3,
                        opacity: 1,
                        lineCap: "round",
                        lineJoin: "round",
                        dashArray: null,
                        dashOffset: null,
                        fill: !1,
                        fillColor: null,
                        fillOpacity: .2,
                        fillRule: "evenodd",
                        interactive: !0,
                        bubblingMouseEvents: !0
                    },
                    beforeAdd: function (t) {
                        this._renderer = t.getRenderer(this)
                    },
                    onAdd: function () {
                        this._renderer._initPath(this),
                        this._reset(),
                        this._renderer._addPath(this)
                    },
                    onRemove: function () {
                        this._renderer._removePath(this)
                    },
                    redraw: function () {
                        return this._map && this._renderer._updatePath(this),
                        this
                    },
                    setStyle: function (t) {
                        return d(this, t),
                        this._renderer && (this._renderer._updateStyle(this), this.options.stroke && t && Object.prototype.hasOwnProperty.call(t, "weight") && this._updateBounds()),
                        this
                    },
                    bringToFront: function () {
                        return this._renderer && this._renderer._bringToFront(this),
                        this
                    },
                    bringToBack: function () {
                        return this._renderer && this._renderer._bringToBack(this),
                        this
                    },
                    getElement: function () {
                        return this._path
                    },
                    _reset: function () {
                        this._project(),
                        this._update()
                    },
                    _clickTolerance: function () {
                        return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0)
                    }
                }),
                Oi = zi.extend({
                    options: {
                        fill: !0,
                        radius: 10
                    },
                    initialize: function (t, e) {
                        d(this, e),
                        this._latlng = j(t),
                        this._radius = this.options.radius
                    },
                    setLatLng: function (t) {
                        var e = this._latlng;
                        return this._latlng = j(t),
                        this.redraw(),
                        this.fire("move", {
                            oldLatLng: e,
                            latlng: this._latlng
                        })
                    },
                    getLatLng: function () {
                        return this._latlng
                    },
                    setRadius: function (t) {
                        return this.options.radius = this._radius = t,
                        this.redraw()
                    },
                    getRadius: function () {
                        return this._radius
                    },
                    setStyle: function (t) {
                        var e = t && t.radius || this._radius;
                        return zi.prototype.setStyle.call(this, t),
                        this.setRadius(e),
                        this
                    },
                    _project: function () {
                        this._point = this._map.latLngToLayerPoint(this._latlng),
                        this._updateBounds()
                    },
                    _updateBounds: function () {
                        var t = this._radius,
                        e = this._radiusY || t,
                        i = this._clickTolerance(),
                        n = [t + i, e + i];
                        this._pxBounds = new A(this._point.subtract(n), this._point.add(n))
                    },
                    _update: function () {
                        this._map && this._updatePath()
                    },
                    _updatePath: function () {
                        this._renderer._updateCircle(this)
                    },
                    _empty: function () {
                        return this._radius && !this._renderer._bounds.intersects(this._pxBounds)
                    },
                    _containsPoint: function (t) {
                        return t.distanceTo(this._point) <= this._radius + this._clickTolerance()
                    }
                });
                var Ai = Oi.extend({
                    initialize: function (t, i, n) {
                        if ("number" == typeof i && (i = e({}, n, {
                                    radius: i
                                })), d(this, i), this._latlng = j(t), isNaN(this.options.radius))
                            throw new Error("Circle radius cannot be NaN");
                        this._mRadius = this.options.radius
                    },
                    setRadius: function (t) {
                        return this._mRadius = t,
                        this.redraw()
                    },
                    getRadius: function () {
                        return this._mRadius
                    },
                    getBounds: function () {
                        var t = [this._radius, this._radiusY || this._radius];
                        return new N(this._map.layerPointToLatLng(this._point.subtract(t)), this._map.layerPointToLatLng(this._point.add(t)))
                    },
                    setStyle: zi.prototype.setStyle,
                    _project: function () {
                        var t = this._latlng.lng,
                        e = this._latlng.lat,
                        i = this._map,
                        n = i.options.crs;
                        if (n.distance === U.distance) {
                            var o = Math.PI / 180,
                            r = this._mRadius / U.R / o,
                            s = i.project([e + r, t]),
                            a = i.project([e - r, t]),
                            h = s.add(a).divideBy(2),
                            l = i.unproject(h).lat,
                            c = Math.acos((Math.cos(r * o) - Math.sin(e * o) * Math.sin(l * o)) / (Math.cos(e * o) * Math.cos(l * o))) / o;
                            (isNaN(c) || 0 === c) && (c = r / Math.cos(Math.PI / 180 * e)),
                            this._point = h.subtract(i.getPixelOrigin()),
                            this._radius = isNaN(c) ? 0 : h.x - i.project([l, t - c]).x,
                            this._radiusY = h.y - s.y
                        } else {
                            var u = n.unproject(n.project(this._latlng).subtract([this._mRadius, 0]));
                            this._point = i.latLngToLayerPoint(this._latlng),
                            this._radius = this._point.x - i.latLngToLayerPoint(u).x
                        }
                        this._updateBounds()
                    }
                });
                var Bi = zi.extend({
                    options: {
                        smoothFactor: 1,
                        noClip: !1
                    },
                    initialize: function (t, e) {
                        d(this, e),
                        this._setLatLngs(t)
                    },
                    getLatLngs: function () {
                        return this._latlngs
                    },
                    setLatLngs: function (t) {
                        return this._setLatLngs(t),
                        this.redraw()
                    },
                    isEmpty: function () {
                        return !this._latlngs.length
                    },
                    closestLayerPoint: function (t) {
                        for (var e, i, n = 1 / 0, o = null, r = ui, s = 0, a = this._parts.length; s < a; s++)
                            for (var h = this._parts[s], l = 1, c = h.length; l < c; l++) {
                                var u = r(t, e = h[l - 1], i = h[l], !0);
                                u < n && (n = u, o = r(t, e, i))
                            }
                        return o && (o.distance = Math.sqrt(n)),
                        o
                    },
                    getCenter: function () {
                        if (!this._map)
                            throw new Error("Must add layer to map before using getCenter()");
                        return fi(this._defaultShape(), this._map.options.crs)
                    },
                    getBounds: function () {
                        return this._bounds
                    },
                    addLatLng: function (t, e) {
                        return e = e || this._defaultShape(),
                        t = j(t),
                        e.push(t),
                        this._bounds.extend(t),
                        this.redraw()
                    },
                    _setLatLngs: function (t) {
                        this._bounds = new N,
                        this._latlngs = this._convertLatLngs(t)
                    },
                    _defaultShape: function () {
                        return di(this._latlngs) ? this._latlngs : this._latlngs[0]
                    },
                    _convertLatLngs: function (t) {
                        for (var e = [], i = di(t), n = 0, o = t.length; n < o; n++)
                            i ? (e[n] = j(t[n]), this._bounds.extend(e[n])) : e[n] = this._convertLatLngs(t[n]);
                        return e
                    },
                    _project: function () {
                        var t = new A;
                        this._rings = [],
                        this._projectLatlngs(this._latlngs, this._rings, t),
                        this._bounds.isValid() && t.isValid() && (this._rawPxBounds = t, this._updateBounds())
                    },
                    _updateBounds: function () {
                        var t = this._clickTolerance(),
                        e = new E(t, t);
                        this._rawPxBounds && (this._pxBounds = new A([this._rawPxBounds.min.subtract(e), this._rawPxBounds.max.add(e)]))
                    },
                    _projectLatlngs: function (t, e, i) {
                        var n,
                        o,
                        r = t[0]instanceof D,
                        s = t.length;
                        if (r) {
                            for (o = [], n = 0; n < s; n++)
                                o[n] = this._map.latLngToLayerPoint(t[n]), i.extend(o[n]);
                            e.push(o)
                        } else
                            for (n = 0; n < s; n++)
                                this._projectLatlngs(t[n], e, i)
                    },
                    _clipPoints: function () {
                        var t = this._renderer._bounds;
                        if (this._parts = [], this._pxBounds && this._pxBounds.intersects(t))
                            if (this.options.noClip)
                                this._parts = this._rings;
                            else {
                                var e,
                                i,
                                n,
                                o,
                                r,
                                s,
                                a,
                                h = this._parts;
                                for (e = 0, n = 0, o = this._rings.length; e < o; e++)
                                    for (i = 0, r = (a = this._rings[e]).length; i < r - 1; i++)
                                        (s = ai(a[i], a[i + 1], t, i, !0)) && (h[n] = h[n] || [], h[n].push(s[0]), s[1] === a[i + 1] && i !== r - 2 || (h[n].push(s[1]), n++))
                            }
                    },
                    _simplifyPoints: function () {
                        for (var t = this._parts, e = this.options.smoothFactor, i = 0, n = t.length; i < n; i++)
                            t[i] = oi(t[i], e)
                    },
                    _update: function () {
                        this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath())
                    },
                    _updatePath: function () {
                        this._renderer._updatePoly(this)
                    },
                    _containsPoint: function (t, e) {
                        var i,
                        n,
                        o,
                        r,
                        s,
                        a,
                        h = this._clickTolerance();
                        if (!this._pxBounds || !this._pxBounds.contains(t))
                            return !1;
                        for (i = 0, r = this._parts.length; i < r; i++)
                            for (n = 0, o = (s = (a = this._parts[i]).length) - 1; n < s; o = n++)
                                if ((e || 0 !== n) && ri(t, a[o], a[n]) <= h)
                                    return !0;
                        return !1
                    }
                });
                Bi._flat = pi;
                var Ni = Bi.extend({
                    options: {
                        fill: !0
                    },
                    isEmpty: function () {
                        return !this._latlngs.length || !this._latlngs[0].length
                    },
                    getCenter: function () {
                        if (!this._map)
                            throw new Error("Must add layer to map before using getCenter()");
                        return gi(this._defaultShape(), this._map.options.crs)
                    },
                    _convertLatLngs: function (t) {
                        var e = Bi.prototype._convertLatLngs.call(this, t),
                        i = e.length;
                        return i >= 2 && e[0]instanceof D && e[0].equals(e[i - 1]) && e.pop(),
                        e
                    },
                    _setLatLngs: function (t) {
                        Bi.prototype._setLatLngs.call(this, t),
                        di(this._latlngs) && (this._latlngs = [this._latlngs])
                    },
                    _defaultShape: function () {
                        return di(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0]
                    },
                    _clipPoints: function () {
                        var t = this._renderer._bounds,
                        e = this.options.weight,
                        i = new E(e, e);
                        if (t = new A(t.min.subtract(i), t.max.add(i)), this._parts = [], this._pxBounds && this._pxBounds.intersects(t))
                            if (this.options.noClip)
                                this._parts = this._rings;
                            else
                                for (var n, o = 0, r = this._rings.length; o < r; o++)
                                    (n = mi(this._rings[o], t, !0)).length && this._parts.push(n)
                    },
                    _updatePath: function () {
                        this._renderer._updatePoly(this, !0)
                    },
                    _containsPoint: function (t) {
                        var e,
                        i,
                        n,
                        o,
                        r,
                        s,
                        a,
                        h,
                        l = !1;
                        if (!this._pxBounds || !this._pxBounds.contains(t))
                            return !1;
                        for (o = 0, a = this._parts.length; o < a; o++)
                            for (r = 0, s = (h = (e = this._parts[o]).length) - 1; r < h; s = r++)
                                i = e[r], n = e[s], i.y > t.y != n.y > t.y && t.x < (n.x - i.x) * (t.y - i.y) / (n.y - i.y) + i.x && (l = !l);
                        return l || Bi.prototype._containsPoint.call(this, t, !0)
                    }
                });
                var Zi = ki.extend({
                    initialize: function (t, e) {
                        d(this, e),
                        this._layers = {},
                        t && this.addData(t)
                    },
                    addData: function (t) {
                        var e,
                        i,
                        n,
                        o = m(t) ? t : t.features;
                        if (o) {
                            for (e = 0, i = o.length; e < i; e++)
                                ((n = o[e]).geometries || n.geometry || n.features || n.coordinates) && this.addData(n);
                            return this
                        }
                        var r = this.options;
                        if (r.filter && !r.filter(t))
                            return this;
                        var s = Di(t, r);
                        return s ? (s.feature = Wi(t), s.defaultOptions = s.options, this.resetStyle(s), r.onEachFeature && r.onEachFeature(t, s), this.addLayer(s)) : this
                    },
                    resetStyle: function (t) {
                        return void 0 === t ? this.eachLayer(this.resetStyle, this) : (t.options = e({}, t.defaultOptions), this._setLayerStyle(t, this.options.style), this)
                    },
                    setStyle: function (t) {
                        return this.eachLayer((function (e) {
                                this._setLayerStyle(e, t)
                            }), this)
                    },
                    _setLayerStyle: function (t, e) {
                        t.setStyle && ("function" == typeof e && (e = e(t.feature)), t.setStyle(e))
                    }
                });
                function Di(t, e) {
                    var i,
                    n,
                    o,
                    r,
                    s = "Feature" === t.type ? t.geometry : t,
                    a = s ? s.coordinates : null,
                    h = [],
                    l = e && e.pointToLayer,
                    c = e && e.coordsToLatLng || Ri;
                    if (!a && !s)
                        return null;
                    switch (s.type) {
                    case "Point":
                        return ji(l, t, i = c(a), e);
                    case "MultiPoint":
                        for (o = 0, r = a.length; o < r; o++)
                            i = c(a[o]), h.push(ji(l, t, i, e));
                        return new ki(h);
                    case "LineString":
                    case "MultiLineString":
                        return n = Fi(a, "LineString" === s.type ? 0 : 1, c),
                        new Bi(n, e);
                    case "Polygon":
                    case "MultiPolygon":
                        return n = Fi(a, "Polygon" === s.type ? 1 : 2, c),
                        new Ni(n, e);
                    case "GeometryCollection":
                        for (o = 0, r = s.geometries.length; o < r; o++) {
                            var u = Di({
                                geometry: s.geometries[o],
                                type: "Feature",
                                properties: t.properties
                            }, e);
                            u && h.push(u)
                        }
                        return new ki(h);
                    case "FeatureCollection":
                        for (o = 0, r = s.features.length; o < r; o++) {
                            var d = Di(s.features[o], e);
                            d && h.push(d)
                        }
                        return new ki(h);
                    default:
                        throw new Error("Invalid GeoJSON object.")
                    }
                }
                function ji(t, e, i, n) {
                    return t ? t(e, i) : new Ei(i, n && n.markersInheritOptions && n)
                }
                function Ri(t) {
                    return new D(t[1], t[0], t[2])
                }
                function Fi(t, e, i) {
                    for (var n, o = [], r = 0, s = t.length; r < s; r++)
                        n = e ? Fi(t[r], e - 1, i) : (i || Ri)(t[r]), o.push(n);
                    return o
                }
                function Ui(t, e) {
                    return void 0 !== (t = j(t)).alt ? [l(t.lng, e), l(t.lat, e), l(t.alt, e)] : [l(t.lng, e), l(t.lat, e)]
                }
                function Gi(t, e, i, n) {
                    for (var o = [], r = 0, s = t.length; r < s; r++)
                        o.push(e ? Gi(t[r], di(t[r]) ? 0 : e - 1, i, n) : Ui(t[r], n));
                    return !e && i && o.push(o[0].slice()),
                    o
                }
                function Hi(t, i) {
                    return t.feature ? e({}, t.feature, {
                        geometry: i
                    }) : Wi(i)
                }
                function Wi(t) {
                    return "Feature" === t.type || "FeatureCollection" === t.type ? t : {
                        type: "Feature",
                        properties: {},
                        geometry: t
                    }
                }
                var Vi = {
                    toGeoJSON: function (t) {
                        return Hi(this, {
                            type: "Point",
                            coordinates: Ui(this.getLatLng(), t)
                        })
                    }
                };
                function Yi(t, e) {
                    return new Zi(t, e)
                }
                Ei.include(Vi),
                Ai.include(Vi),
                Oi.include(Vi),
                Bi.include({
                    toGeoJSON: function (t) {
                        var e = !di(this._latlngs);
                        return Hi(this, {
                            type: (e ? "Multi" : "") + "LineString",
                            coordinates: Gi(this._latlngs, e ? 1 : 0, !1, t)
                        })
                    }
                }),
                Ni.include({
                    toGeoJSON: function (t) {
                        var e = !di(this._latlngs),
                        i = e && !di(this._latlngs[0]),
                        n = Gi(this._latlngs, i ? 2 : e ? 1 : 0, !0, t);
                        return e || (n = [n]),
                        Hi(this, {
                            type: (i ? "Multi" : "") + "Polygon",
                            coordinates: n
                        })
                    }
                }),
                Si.include({
                    toMultiPoint: function (t) {
                        var e = [];
                        return this.eachLayer((function (i) {
                                e.push(i.toGeoJSON(t).geometry.coordinates)
                            })),
                        Hi(this, {
                            type: "MultiPoint",
                            coordinates: e
                        })
                    },
                    toGeoJSON: function (t) {
                        var e = this.feature && this.feature.geometry && this.feature.geometry.type;
                        if ("MultiPoint" === e)
                            return this.toMultiPoint(t);
                        var i = "GeometryCollection" === e,
                        n = [];
                        return this.eachLayer((function (e) {
                                if (e.toGeoJSON) {
                                    var o = e.toGeoJSON(t);
                                    if (i)
                                        n.push(o.geometry);
                                    else {
                                        var r = Wi(o);
                                        "FeatureCollection" === r.type ? n.push.apply(n, r.features) : n.push(r)
                                    }
                                }
                            })),
                        i ? Hi(this, {
                            geometries: n,
                            type: "GeometryCollection"
                        }) : {
                            type: "FeatureCollection",
                            features: n
                        }
                    }
                });
                var qi = Yi,
                Xi = Ti.extend({
                    options: {
                        opacity: 1,
                        alt: "",
                        interactive: !1,
                        crossOrigin: !1,
                        errorOverlayUrl: "",
                        zIndex: 1,
                        className: ""
                    },
                    initialize: function (t, e, i) {
                        this._url = t,
                        this._bounds = Z(e),
                        d(this, i)
                    },
                    onAdd: function () {
                        this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()),
                        this.options.interactive && (ce(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)),
                        this.getPane().appendChild(this._image),
                        this._reset()
                    },
                    onRemove: function () {
                        re(this._image),
                        this.options.interactive && this.removeInteractiveTarget(this._image)
                    },
                    setOpacity: function (t) {
                        return this.options.opacity = t,
                        this._image && this._updateOpacity(),
                        this
                    },
                    setStyle: function (t) {
                        return t.opacity && this.setOpacity(t.opacity),
                        this
                    },
                    bringToFront: function () {
                        return this._map && ae(this._image),
                        this
                    },
                    bringToBack: function () {
                        return this._map && he(this._image),
                        this
                    },
                    setUrl: function (t) {
                        return this._url = t,
                        this._image && (this._image.src = t),
                        this
                    },
                    setBounds: function (t) {
                        return this._bounds = Z(t),
                        this._map && this._reset(),
                        this
                    },
                    getEvents: function () {
                        var t = {
                            zoom: this._reset,
                            viewreset: this._reset
                        };
                        return this._zoomAnimated && (t.zoomanim = this._animateZoom),
                        t
                    },
                    setZIndex: function (t) {
                        return this.options.zIndex = t,
                        this._updateZIndex(),
                        this
                    },
                    getBounds: function () {
                        return this._bounds
                    },
                    getElement: function () {
                        return this._image
                    },
                    _initImage: function () {
                        var t = "IMG" === this._url.tagName,
                        e = this._image = t ? this._url : oe("img");
                        ce(e, "leaflet-image-layer"),
                        this._zoomAnimated && ce(e, "leaflet-zoom-animated"),
                        this.options.className && ce(e, this.options.className),
                        e.onselectstart = h,
                        e.onmousemove = h,
                        e.onload = n(this.fire, this, "load"),
                        e.onerror = n(this._overlayOnError, this, "error"),
                        (this.options.crossOrigin || "" === this.options.crossOrigin) && (e.crossOrigin = !0 === this.options.crossOrigin ? "" : this.options.crossOrigin),
                        this.options.zIndex && this._updateZIndex(),
                        t ? this._url = e.src : (e.src = this._url, e.alt = this.options.alt)
                    },
                    _animateZoom: function (t) {
                        var e = this._map.getZoomScale(t.zoom),
                        i = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
                        me(this._image, i, e)
                    },
                    _reset: function () {
                        var t = this._image,
                        e = new A(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
                        i = e.getSize();
                        ge(t, e.min),
                        t.style.width = i.x + "px",
                        t.style.height = i.y + "px"
                    },
                    _updateOpacity: function () {
                        fe(this._image, this.options.opacity)
                    },
                    _updateZIndex: function () {
                        this._image && void 0 !== this.options.zIndex && null !== this.options.zIndex && (this._image.style.zIndex = this.options.zIndex)
                    },
                    _overlayOnError: function () {
                        this.fire("error");
                        var t = this.options.errorOverlayUrl;
                        t && this._url !== t && (this._url = t, this._image.src = t)
                    },
                    getCenter: function () {
                        return this._bounds.getCenter()
                    }
                }),
                Ki = Xi.extend({
                    options: {
                        autoplay: !0,
                        loop: !0,
                        keepAspectRatio: !0,
                        muted: !1,
                        playsInline: !0
                    },
                    _initImage: function () {
                        var t = "VIDEO" === this._url.tagName,
                        e = this._image = t ? this._url : oe("video");
                        if (ce(e, "leaflet-image-layer"), this._zoomAnimated && ce(e, "leaflet-zoom-animated"), this.options.className && ce(e, this.options.className), e.onselectstart = h, e.onmousemove = h, e.onloadeddata = n(this.fire, this, "load"), t) {
                            for (var i = e.getElementsByTagName("source"), o = [], r = 0; r < i.length; r++)
                                o.push(i[r].src);
                            this._url = i.length > 0 ? o : [e.src]
                        } else {
                            m(this._url) || (this._url = [this._url]),
                            !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(e.style, "objectFit") && (e.style.objectFit = "fill"),
                            e.autoplay = !!this.options.autoplay,
                            e.loop = !!this.options.loop,
                            e.muted = !!this.options.muted,
                            e.playsInline = !!this.options.playsInline;
                            for (var s = 0; s < this._url.length; s++) {
                                var a = oe("source");
                                a.src = this._url[s],
                                e.appendChild(a)
                            }
                        }
                    }
                });
                var Ji = Xi.extend({
                    _initImage: function () {
                        var t = this._image = this._url;
                        ce(t, "leaflet-image-layer"),
                        this._zoomAnimated && ce(t, "leaflet-zoom-animated"),
                        this.options.className && ce(t, this.options.className),
                        t.onselectstart = h,
                        t.onmousemove = h
                    }
                });
                var $i = Ti.extend({
                    options: {
                        interactive: !1,
                        offset: [0, 0],
                        className: "",
                        pane: void 0,
                        content: ""
                    },
                    initialize: function (t, e) {
                        t && (t instanceof D || m(t)) ? (this._latlng = j(t), d(this, e)) : (d(this, t), this._source = e),
                        this.options.content && (this._content = this.options.content)
                    },
                    openOn: function (t) {
                        return (t = arguments.length ? t : this._source._map).hasLayer(this) || t.addLayer(this),
                        this
                    },
                    close: function () {
                        return this._map && this._map.removeLayer(this),
                        this
                    },
                    toggle: function (t) {
                        return this._map ? this.close() : (arguments.length ? this._source = t : t = this._source, this._prepareOpen(), this.openOn(t._map)),
                        this
                    },
                    onAdd: function (t) {
                        this._zoomAnimated = t._zoomAnimated,
                        this._container || this._initLayout(),
                        t._fadeAnimated && fe(this._container, 0),
                        clearTimeout(this._removeTimeout),
                        this.getPane().appendChild(this._container),
                        this.update(),
                        t._fadeAnimated && fe(this._container, 1),
                        this.bringToFront(),
                        this.options.interactive && (ce(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container))
                    },
                    onRemove: function (t) {
                        t._fadeAnimated ? (fe(this._container, 0), this._removeTimeout = setTimeout(n(re, void 0, this._container), 200)) : re(this._container),
                        this.options.interactive && (ue(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container))
                    },
                    getLatLng: function () {
                        return this._latlng
                    },
                    setLatLng: function (t) {
                        return this._latlng = j(t),
                        this._map && (this._updatePosition(), this._adjustPan()),
                        this
                    },
                    getContent: function () {
                        return this._content
                    },
                    setContent: function (t) {
                        return this._content = t,
                        this.update(),
                        this
                    },
                    getElement: function () {
                        return this._container
                    },
                    update: function () {
                        this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan())
                    },
                    getEvents: function () {
                        var t = {
                            zoom: this._updatePosition,
                            viewreset: this._updatePosition
                        };
                        return this._zoomAnimated && (t.zoomanim = this._animateZoom),
                        t
                    },
                    isOpen: function () {
                        return !!this._map && this._map.hasLayer(this)
                    },
                    bringToFront: function () {
                        return this._map && ae(this._container),
                        this
                    },
                    bringToBack: function () {
                        return this._map && he(this._container),
                        this
                    },
                    _prepareOpen: function (t) {
                        var e = this._source;
                        if (!e._map)
                            return !1;
                        if (e instanceof ki) {
                            e = null;
                            var i = this._source._layers;
                            for (var n in i)
                                if (i[n]._map) {
                                    e = i[n];
                                    break
                                }
                            if (!e)
                                return !1;
                            this._source = e
                        }
                        if (!t)
                            if (e.getCenter)
                                t = e.getCenter();
                            else if (e.getLatLng)
                                t = e.getLatLng();
                            else {
                                if (!e.getBounds)
                                    throw new Error("Unable to get source layer LatLng.");
                                t = e.getBounds().getCenter()
                            }
                        return this.setLatLng(t),
                        this._map && this.update(),
                        !0
                    },
                    _updateContent: function () {
                        if (this._content) {
                            var t = this._contentNode,
                            e = "function" == typeof this._content ? this._content(this._source || this) : this._content;
                            if ("string" == typeof e)
                                t.innerHTML = e;
                            else {
                                for (; t.hasChildNodes(); )
                                    t.removeChild(t.firstChild);
                                t.appendChild(e)
                            }
                            this.fire("contentupdate")
                        }
                    },
                    _updatePosition: function () {
                        if (this._map) {
                            var t = this._map.latLngToLayerPoint(this._latlng),
                            e = O(this.options.offset),
                            i = this._getAnchor();
                            this._zoomAnimated ? ge(this._container, t.add(i)) : e = e.add(t).add(i);
                            var n = this._containerBottom = -e.y,
                            o = this._containerLeft = -Math.round(this._containerWidth / 2) + e.x;
                            this._container.style.bottom = n + "px",
                            this._container.style.left = o + "px"
                        }
                    },
                    _getAnchor: function () {
                        return [0, 0]
                    }
                });
                Ve.include({
                    _initOverlay: function (t, e, i, n) {
                        var o = e;
                        return o instanceof t || (o = new t(n).setContent(e)),
                        i && o.setLatLng(i),
                        o
                    }
                }),
                Ti.include({
                    _initOverlay: function (t, e, i, n) {
                        var o = i;
                        return o instanceof t ? (d(o, n), o._source = this) : (o = e && !n ? e : new t(n, this)).setContent(i),
                        o
                    }
                });
                var Qi = $i.extend({
                    options: {
                        pane: "popupPane",
                        offset: [0, 7],
                        maxWidth: 300,
                        minWidth: 50,
                        maxHeight: null,
                        autoPan: !0,
                        autoPanPaddingTopLeft: null,
                        autoPanPaddingBottomRight: null,
                        autoPanPadding: [5, 5],
                        keepInView: !1,
                        closeButton: !0,
                        autoClose: !0,
                        closeOnEscapeKey: !0,
                        className: ""
                    },
                    openOn: function (t) {
                        return !(t = arguments.length ? t : this._source._map).hasLayer(this) && t._popup && t._popup.options.autoClose && t.removeLayer(t._popup),
                        t._popup = this,
                        $i.prototype.openOn.call(this, t)
                    },
                    onAdd: function (t) {
                        $i.prototype.onAdd.call(this, t),
                        t.fire("popupopen", {
                            popup: this
                        }),
                        this._source && (this._source.fire("popupopen", {
                                popup: this
                            }, !0), this._source instanceof zi || this._source.on("preclick", Ae))
                    },
                    onRemove: function (t) {
                        $i.prototype.onRemove.call(this, t),
                        t.fire("popupclose", {
                            popup: this
                        }),
                        this._source && (this._source.fire("popupclose", {
                                popup: this
                            }, !0), this._source instanceof zi || this._source.off("preclick", Ae))
                    },
                    getEvents: function () {
                        var t = $i.prototype.getEvents.call(this);
                        return (void 0 !== this.options.closeOnClick ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this.close),
                        this.options.keepInView && (t.moveend = this._adjustPan),
                        t
                    },
                    _initLayout: function () {
                        var t = "leaflet-popup",
                        e = this._container = oe("div", t + " " + (this.options.className || "") + " leaflet-zoom-animated"),
                        i = this._wrapper = oe("div", t + "-content-wrapper", e);
                        if (this._contentNode = oe("div", t + "-content", i), Ne(e), Be(this._contentNode), ke(e, "contextmenu", Ae), this._tipContainer = oe("div", t + "-tip-container", e), this._tip = oe("div", t + "-tip", this._tipContainer), this.options.closeButton) {
                            var n = this._closeButton = oe("a", t + "-close-button", e);
                            n.setAttribute("role", "button"),
                            n.setAttribute("aria-label", "Close popup"),
                            n.href = "#close",
                            n.innerHTML = '<span aria-hidden="true">&#215;</span>',
                            ke(n, "click", (function (t) {
                                    Ze(t),
                                    this.close()
                                }), this)
                        }
                    },
                    _updateLayout: function () {
                        var t = this._contentNode,
                        e = t.style;
                        e.width = "",
                        e.whiteSpace = "nowrap";
                        var i = t.offsetWidth;
                        i = Math.min(i, this.options.maxWidth),
                        i = Math.max(i, this.options.minWidth),
                        e.width = i + 1 + "px",
                        e.whiteSpace = "",
                        e.height = "";
                        var n = t.offsetHeight,
                        o = this.options.maxHeight,
                        r = "leaflet-popup-scrolled";
                        o && n > o ? (e.height = o + "px", ce(t, r)) : ue(t, r),
                        this._containerWidth = this._container.offsetWidth
                    },
                    _animateZoom: function (t) {
                        var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center),
                        i = this._getAnchor();
                        ge(this._container, e.add(i))
                    },
                    _adjustPan: function () {
                        if (this.options.autoPan)
                            if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning)
                                this._autopanning = !1;
                            else {
                                var t = this._map,
                                e = parseInt(ne(this._container, "marginBottom"), 10) || 0,
                                i = this._container.offsetHeight + e,
                                n = this._containerWidth,
                                o = new E(this._containerLeft, -i - this._containerBottom);
                                o._add(ve(this._container));
                                var r = t.layerPointToContainerPoint(o),
                                s = O(this.options.autoPanPadding),
                                a = O(this.options.autoPanPaddingTopLeft || s),
                                h = O(this.options.autoPanPaddingBottomRight || s),
                                l = t.getSize(),
                                c = 0,
                                u = 0;
                                r.x + n + h.x > l.x && (c = r.x + n - l.x + h.x),
                                r.x - c - a.x < 0 && (c = r.x - a.x),
                                r.y + i + h.y > l.y && (u = r.y + i - l.y + h.y),
                                r.y - u - a.y < 0 && (u = r.y - a.y),
                                (c || u) && (this.options.keepInView && (this._autopanning = !0), t.fire("autopanstart").panBy([c, u]))
                            }
                    },
                    _getAnchor: function () {
                        return O(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0])
                    }
                });
                Ve.mergeOptions({
                    closePopupOnClick: !0
                }),
                Ve.include({
                    openPopup: function (t, e, i) {
                        return this._initOverlay(Qi, t, e, i).openOn(this),
                        this
                    },
                    closePopup: function (t) {
                        return (t = arguments.length ? t : this._popup) && t.close(),
                        this
                    }
                }),
                Ti.include({
                    bindPopup: function (t, e) {
                        return this._popup = this._initOverlay(Qi, this._popup, t, e),
                        this._popupHandlersAdded || (this.on({
                                click: this._openPopup,
                                keypress: this._onKeyPress,
                                remove: this.closePopup,
                                move: this._movePopup
                            }), this._popupHandlersAdded = !0),
                        this
                    },
                    unbindPopup: function () {
                        return this._popup && (this.off({
                                click: this._openPopup,
                                keypress: this._onKeyPress,
                                remove: this.closePopup,
                                move: this._movePopup
                            }), this._popupHandlersAdded = !1, this._popup = null),
                        this
                    },
                    openPopup: function (t) {
                        return this._popup && (this instanceof ki || (this._popup._source = this), this._popup._prepareOpen(t || this._latlng) && this._popup.openOn(this._map)),
                        this
                    },
                    closePopup: function () {
                        return this._popup && this._popup.close(),
                        this
                    },
                    togglePopup: function () {
                        return this._popup && this._popup.toggle(this),
                        this
                    },
                    isPopupOpen: function () {
                        return !!this._popup && this._popup.isOpen()
                    },
                    setPopupContent: function (t) {
                        return this._popup && this._popup.setContent(t),
                        this
                    },
                    getPopup: function () {
                        return this._popup
                    },
                    _openPopup: function (t) {
                        if (this._popup && this._map) {
                            De(t);
                            var e = t.layer || t.target;
                            this._popup._source !== e || e instanceof zi ? (this._popup._source = e, this.openPopup(t.latlng)) : this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(t.latlng)
                        }
                    },
                    _movePopup: function (t) {
                        this._popup.setLatLng(t.latlng)
                    },
                    _onKeyPress: function (t) {
                        13 === t.originalEvent.keyCode && this._openPopup(t)
                    }
                });
                var tn = $i.extend({
                    options: {
                        pane: "tooltipPane",
                        offset: [0, 0],
                        direction: "auto",
                        permanent: !1,
                        sticky: !1,
                        opacity: .9
                    },
                    onAdd: function (t) {
                        $i.prototype.onAdd.call(this, t),
                        this.setOpacity(this.options.opacity),
                        t.fire("tooltipopen", {
                            tooltip: this
                        }),
                        this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", {
                                tooltip: this
                            }, !0))
                    },
                    onRemove: function (t) {
                        $i.prototype.onRemove.call(this, t),
                        t.fire("tooltipclose", {
                            tooltip: this
                        }),
                        this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", {
                                tooltip: this
                            }, !0))
                    },
                    getEvents: function () {
                        var t = $i.prototype.getEvents.call(this);
                        return this.options.permanent || (t.preclick = this.close),
                        t
                    },
                    _initLayout: function () {
                        var t = "leaflet-tooltip " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
                        this._contentNode = this._container = oe("div", t),
                        this._container.setAttribute("role", "tooltip"),
                        this._container.setAttribute("id", "leaflet-tooltip-" + r(this))
                    },
                    _updateLayout: function () {},
                    _adjustPan: function () {},
                    _setPosition: function (t) {
                        var e,
                        i,
                        n = this._map,
                        o = this._container,
                        r = n.latLngToContainerPoint(n.getCenter()),
                        s = n.layerPointToContainerPoint(t),
                        a = this.options.direction,
                        h = o.offsetWidth,
                        l = o.offsetHeight,
                        c = O(this.options.offset),
                        u = this._getAnchor();
                        "top" === a ? (e = h / 2, i = l) : "bottom" === a ? (e = h / 2, i = 0) : "center" === a ? (e = h / 2, i = l / 2) : "right" === a ? (e = 0, i = l / 2) : "left" === a ? (e = h, i = l / 2) : s.x < r.x ? (a = "right", e = 0, i = l / 2) : (a = "left", e = h + 2 * (c.x + u.x), i = l / 2),
                        t = t.subtract(O(e, i, !0)).add(c).add(u),
                        ue(o, "leaflet-tooltip-right"),
                        ue(o, "leaflet-tooltip-left"),
                        ue(o, "leaflet-tooltip-top"),
                        ue(o, "leaflet-tooltip-bottom"),
                        ce(o, "leaflet-tooltip-" + a),
                        ge(o, t)
                    },
                    _updatePosition: function () {
                        var t = this._map.latLngToLayerPoint(this._latlng);
                        this._setPosition(t)
                    },
                    setOpacity: function (t) {
                        this.options.opacity = t,
                        this._container && fe(this._container, t)
                    },
                    _animateZoom: function (t) {
                        var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
                        this._setPosition(e)
                    },
                    _getAnchor: function () {
                        return O(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0])
                    }
                });
                Ve.include({
                    openTooltip: function (t, e, i) {
                        return this._initOverlay(tn, t, e, i).openOn(this),
                        this
                    },
                    closeTooltip: function (t) {
                        return t.close(),
                        this
                    }
                }),
                Ti.include({
                    bindTooltip: function (t, e) {
                        return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(),
                        this._tooltip = this._initOverlay(tn, this._tooltip, t, e),
                        this._initTooltipInteractions(),
                        this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(),
                        this
                    },
                    unbindTooltip: function () {
                        return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), this._tooltip = null),
                        this
                    },
                    _initTooltipInteractions: function (t) {
                        if (t || !this._tooltipHandlersAdded) {
                            var e = t ? "off" : "on",
                            i = {
                                remove: this.closeTooltip,
                                move: this._moveTooltip
                            };
                            this._tooltip.options.permanent ? i.add = this._openTooltip : (i.mouseover = this._openTooltip, i.mouseout = this.closeTooltip, i.click = this._openTooltip, this._map ? this._addFocusListeners() : i.add = this._addFocusListeners),
                            this._tooltip.options.sticky && (i.mousemove = this._moveTooltip),
                            this[e](i),
                            this._tooltipHandlersAdded = !t
                        }
                    },
                    openTooltip: function (t) {
                        return this._tooltip && (this instanceof ki || (this._tooltip._source = this), this._tooltip._prepareOpen(t) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))),
                        this
                    },
                    closeTooltip: function () {
                        if (this._tooltip)
                            return this._tooltip.close()
                    },
                    toggleTooltip: function () {
                        return this._tooltip && this._tooltip.toggle(this),
                        this
                    },
                    isTooltipOpen: function () {
                        return this._tooltip.isOpen()
                    },
                    setTooltipContent: function (t) {
                        return this._tooltip && this._tooltip.setContent(t),
                        this
                    },
                    getTooltip: function () {
                        return this._tooltip
                    },
                    _addFocusListeners: function () {
                        this.getElement ? this._addFocusListenersOnLayer(this) : this.eachLayer && this.eachLayer(this._addFocusListenersOnLayer, this)
                    },
                    _addFocusListenersOnLayer: function (t) {
                        var e = t.getElement();
                        e && (ke(e, "focus", (function () {
                                    this._tooltip._source = t,
                                    this.openTooltip()
                                }), this), ke(e, "blur", this.closeTooltip, this))
                    },
                    _setAriaDescribedByOnLayer: function (t) {
                        var e = t.getElement();
                        e && e.setAttribute("aria-describedby", this._tooltip._container.id)
                    },
                    _openTooltip: function (t) {
                        !this._tooltip || !this._map || this._map.dragging && this._map.dragging.moving() || (this._tooltip._source = t.layer || t.target, this.openTooltip(this._tooltip.options.sticky ? t.latlng : void 0))
                    },
                    _moveTooltip: function (t) {
                        var e,
                        i,
                        n = t.latlng;
                        this._tooltip.options.sticky && t.originalEvent && (e = this._map.mouseEventToContainerPoint(t.originalEvent), i = this._map.containerPointToLayerPoint(e), n = this._map.layerPointToLatLng(i)),
                        this._tooltip.setLatLng(n)
                    }
                });
                var en = Mi.extend({
                    options: {
                        iconSize: [12, 12],
                        html: !1,
                        bgPos: null,
                        className: "leaflet-div-icon"
                    },
                    createIcon: function (t) {
                        var e = t && "DIV" === t.tagName ? t : document.createElement("div"),
                        i = this.options;
                        if (i.html instanceof Element ? (se(e), e.appendChild(i.html)) : e.innerHTML = !1 !== i.html ? i.html : "", i.bgPos) {
                            var n = O(i.bgPos);
                            e.style.backgroundPosition = -n.x + "px " + -n.y + "px"
                        }
                        return this._setIconStyles(e, "icon"),
                        e
                    },
                    createShadow: function () {
                        return null
                    }
                });
                Mi.Default = Ci;
                var nn = Ti.extend({
                    options: {
                        tileSize: 256,
                        opacity: 1,
                        updateWhenIdle: At.mobile,
                        updateWhenZooming: !0,
                        updateInterval: 200,
                        zIndex: 1,
                        bounds: null,
                        minZoom: 0,
                        maxZoom: void 0,
                        maxNativeZoom: void 0,
                        minNativeZoom: void 0,
                        noWrap: !1,
                        pane: "tilePane",
                        className: "",
                        keepBuffer: 2
                    },
                    initialize: function (t) {
                        d(this, t)
                    },
                    onAdd: function () {
                        this._initContainer(),
                        this._levels = {},
                        this._tiles = {},
                        this._resetView()
                    },
                    beforeAdd: function (t) {
                        t._addZoomLimit(this)
                    },
                    onRemove: function (t) {
                        this._removeAllTiles(),
                        re(this._container),
                        t._removeZoomLimit(this),
                        this._container = null,
                        this._tileZoom = void 0
                    },
                    bringToFront: function () {
                        return this._map && (ae(this._container), this._setAutoZIndex(Math.max)),
                        this
                    },
                    bringToBack: function () {
                        return this._map && (he(this._container), this._setAutoZIndex(Math.min)),
                        this
                    },
                    getContainer: function () {
                        return this._container
                    },
                    setOpacity: function (t) {
                        return this.options.opacity = t,
                        this._updateOpacity(),
                        this
                    },
                    setZIndex: function (t) {
                        return this.options.zIndex = t,
                        this._updateZIndex(),
                        this
                    },
                    isLoading: function () {
                        return this._loading
                    },
                    redraw: function () {
                        if (this._map) {
                            this._removeAllTiles();
                            var t = this._clampZoom(this._map.getZoom());
                            t !== this._tileZoom && (this._tileZoom = t, this._updateLevels()),
                            this._update()
                        }
                        return this
                    },
                    getEvents: function () {
                        var t = {
                            viewprereset: this._invalidateAll,
                            viewreset: this._resetView,
                            zoom: this._resetView,
                            moveend: this._onMoveEnd
                        };
                        return this.options.updateWhenIdle || (this._onMove || (this._onMove = s(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove),
                        this._zoomAnimated && (t.zoomanim = this._animateZoom),
                        t
                    },
                    createTile: function () {
                        return document.createElement("div")
                    },
                    getTileSize: function () {
                        var t = this.options.tileSize;
                        return t instanceof E ? t : new E(t, t)
                    },
                    _updateZIndex: function () {
                        this._container && void 0 !== this.options.zIndex && null !== this.options.zIndex && (this._container.style.zIndex = this.options.zIndex)
                    },
                    _setAutoZIndex: function (t) {
                        for (var e, i = this.getPane().children, n = -t(-1 / 0, 1 / 0), o = 0, r = i.length; o < r; o++)
                            e = i[o].style.zIndex, i[o] !== this._container && e && (n = t(n, +e));
                        isFinite(n) && (this.options.zIndex = n + t(-1, 1), this._updateZIndex())
                    },
                    _updateOpacity: function () {
                        if (this._map && !At.ielt9) {
                            fe(this._container, this.options.opacity);
                            var t = +new Date,
                            e = !1,
                            i = !1;
                            for (var n in this._tiles) {
                                var o = this._tiles[n];
                                if (o.current && o.loaded) {
                                    var r = Math.min(1, (t - o.loaded) / 200);
                                    fe(o.el, r),
                                    r < 1 ? e = !0 : (o.active ? i = !0 : this._onOpaqueTile(o), o.active = !0)
                                }
                            }
                            i && !this._noPrune && this._pruneTiles(),
                            e && (S(this._fadeFrame), this._fadeFrame = T(this._updateOpacity, this))
                        }
                    },
                    _onOpaqueTile: h,
                    _initContainer: function () {
                        this._container || (this._container = oe("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container))
                    },
                    _updateLevels: function () {
                        var t = this._tileZoom,
                        e = this.options.maxZoom;
                        if (void 0 !== t) {
                            for (var i in this._levels)
                                i = Number(i), this._levels[i].el.children.length || i === t ? (this._levels[i].el.style.zIndex = e - Math.abs(t - i), this._onUpdateLevel(i)) : (re(this._levels[i].el), this._removeTilesAtZoom(i), this._onRemoveLevel(i), delete this._levels[i]);
                            var n = this._levels[t],
                            o = this._map;
                            return n || ((n = this._levels[t] = {}).el = oe("div", "leaflet-tile-container leaflet-zoom-animated", this._container), n.el.style.zIndex = e, n.origin = o.project(o.unproject(o.getPixelOrigin()), t).round(), n.zoom = t, this._setZoomTransform(n, o.getCenter(), o.getZoom()), n.el.offsetWidth, this._onCreateLevel(n)),
                            this._level = n,
                            n
                        }
                    },
                    _onUpdateLevel: h,
                    _onRemoveLevel: h,
                    _onCreateLevel: h,
                    _pruneTiles: function () {
                        if (this._map) {
                            var t,
                            e,
                            i = this._map.getZoom();
                            if (i > this.options.maxZoom || i < this.options.minZoom)
                                this._removeAllTiles();
                            else {
                                for (t in this._tiles)
                                    (e = this._tiles[t]).retain = e.current;
                                for (t in this._tiles)
                                    if ((e = this._tiles[t]).current && !e.active) {
                                        var n = e.coords;
                                        this._retainParent(n.x, n.y, n.z, n.z - 5) || this._retainChildren(n.x, n.y, n.z, n.z + 2)
                                    }
                                for (t in this._tiles)
                                    this._tiles[t].retain || this._removeTile(t)
                            }
                        }
                    },
                    _removeTilesAtZoom: function (t) {
                        for (var e in this._tiles)
                            this._tiles[e].coords.z === t && this._removeTile(e)
                    },
                    _removeAllTiles: function () {
                        for (var t in this._tiles)
                            this._removeTile(t)
                    },
                    _invalidateAll: function () {
                        for (var t in this._levels)
                            re(this._levels[t].el), this._onRemoveLevel(Number(t)), delete this._levels[t];
                        this._removeAllTiles(),
                        this._tileZoom = void 0
                    },
                    _retainParent: function (t, e, i, n) {
                        var o = Math.floor(t / 2),
                        r = Math.floor(e / 2),
                        s = i - 1,
                        a = new E(+o, +r);
                        a.z = +s;
                        var h = this._tileCoordsToKey(a),
                        l = this._tiles[h];
                        return l && l.active ? (l.retain = !0, !0) : (l && l.loaded && (l.retain = !0), s > n && this._retainParent(o, r, s, n))
                    },
                    _retainChildren: function (t, e, i, n) {
                        for (var o = 2 * t; o < 2 * t + 2; o++)
                            for (var r = 2 * e; r < 2 * e + 2; r++) {
                                var s = new E(o, r);
                                s.z = i + 1;
                                var a = this._tileCoordsToKey(s),
                                h = this._tiles[a];
                                h && h.active ? h.retain = !0 : (h && h.loaded && (h.retain = !0), i + 1 < n && this._retainChildren(o, r, i + 1, n))
                            }
                    },
                    _resetView: function (t) {
                        var e = t && (t.pinch || t.flyTo);
                        this._setView(this._map.getCenter(), this._map.getZoom(), e, e)
                    },
                    _animateZoom: function (t) {
                        this._setView(t.center, t.zoom, !0, t.noUpdate)
                    },
                    _clampZoom: function (t) {
                        var e = this.options;
                        return void 0 !== e.minNativeZoom && t < e.minNativeZoom ? e.minNativeZoom : void 0 !== e.maxNativeZoom && e.maxNativeZoom < t ? e.maxNativeZoom : t
                    },
                    _setView: function (t, e, i, n) {
                        var o = Math.round(e);
                        o = void 0 !== this.options.maxZoom && o > this.options.maxZoom || void 0 !== this.options.minZoom && o < this.options.minZoom ? void 0 : this._clampZoom(o);
                        var r = this.options.updateWhenZooming && o !== this._tileZoom;
                        n && !r || (this._tileZoom = o, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), void 0 !== o && this._update(t), i || this._pruneTiles(), this._noPrune = !!i),
                        this._setZoomTransforms(t, e)
                    },
                    _setZoomTransforms: function (t, e) {
                        for (var i in this._levels)
                            this._setZoomTransform(this._levels[i], t, e)
                    },
                    _setZoomTransform: function (t, e, i) {
                        var n = this._map.getZoomScale(i, t.zoom),
                        o = t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e, i)).round();
                        At.any3d ? me(t.el, o, n) : ge(t.el, o)
                    },
                    _resetGrid: function () {
                        var t = this._map,
                        e = t.options.crs,
                        i = this._tileSize = this.getTileSize(),
                        n = this._tileZoom,
                        o = this._map.getPixelWorldBounds(this._tileZoom);
                        o && (this._globalTileRange = this._pxBoundsToTileRange(o)),
                        this._wrapX = e.wrapLng && !this.options.noWrap && [Math.floor(t.project([0, e.wrapLng[0]], n).x / i.x), Math.ceil(t.project([0, e.wrapLng[1]], n).x / i.y)],
                        this._wrapY = e.wrapLat && !this.options.noWrap && [Math.floor(t.project([e.wrapLat[0], 0], n).y / i.x), Math.ceil(t.project([e.wrapLat[1], 0], n).y / i.y)]
                    },
                    _onMoveEnd: function () {
                        this._map && !this._map._animatingZoom && this._update()
                    },
                    _getTiledPixelBounds: function (t) {
                        var e = this._map,
                        i = e._animatingZoom ? Math.max(e._animateToZoom, e.getZoom()) : e.getZoom(),
                        n = e.getZoomScale(i, this._tileZoom),
                        o = e.project(t, this._tileZoom).floor(),
                        r = e.getSize().divideBy(2 * n);
                        return new A(o.subtract(r), o.add(r))
                    },
                    _update: function (t) {
                        var e = this._map;
                        if (e) {
                            var i = this._clampZoom(e.getZoom());
                            if (void 0 === t && (t = e.getCenter()), void 0 !== this._tileZoom) {
                                var n = this._getTiledPixelBounds(t),
                                o = this._pxBoundsToTileRange(n),
                                r = o.getCenter(),
                                s = [],
                                a = this.options.keepBuffer,
                                h = new A(o.getBottomLeft().subtract([a, -a]), o.getTopRight().add([a, -a]));
                                if (!(isFinite(o.min.x) && isFinite(o.min.y) && isFinite(o.max.x) && isFinite(o.max.y)))
                                    throw new Error("Attempted to load an infinite number of tiles");
                                for (var l in this._tiles) {
                                    var c = this._tiles[l].coords;
                                    c.z === this._tileZoom && h.contains(new E(c.x, c.y)) || (this._tiles[l].current = !1)
                                }
                                if (Math.abs(i - this._tileZoom) > 1)
                                    this._setView(t, i);
                                else {
                                    for (var u = o.min.y; u <= o.max.y; u++)
                                        for (var d = o.min.x; d <= o.max.x; d++) {
                                            var p = new E(d, u);
                                            if (p.z = this._tileZoom, this._isValidTile(p)) {
                                                var f = this._tiles[this._tileCoordsToKey(p)];
                                                f ? f.current = !0 : s.push(p)
                                            }
                                        }
                                    if (s.sort((function (t, e) {
                                                return t.distanceTo(r) - e.distanceTo(r)
                                            })), 0 !== s.length) {
                                        this._loading || (this._loading = !0, this.fire("loading"));
                                        var _ = document.createDocumentFragment();
                                        for (d = 0; d < s.length; d++)
                                            this._addTile(s[d], _);
                                        this._level.el.appendChild(_)
                                    }
                                }
                            }
                        }
                    },
                    _isValidTile: function (t) {
                        var e = this._map.options.crs;
                        if (!e.infinite) {
                            var i = this._globalTileRange;
                            if (!e.wrapLng && (t.x < i.min.x || t.x > i.max.x) || !e.wrapLat && (t.y < i.min.y || t.y > i.max.y))
                                return !1
                        }
                        if (!this.options.bounds)
                            return !0;
                        var n = this._tileCoordsToBounds(t);
                        return Z(this.options.bounds).overlaps(n)
                    },
                    _keyToBounds: function (t) {
                        return this._tileCoordsToBounds(this._keyToTileCoords(t))
                    },
                    _tileCoordsToNwSe: function (t) {
                        var e = this._map,
                        i = this.getTileSize(),
                        n = t.scaleBy(i),
                        o = n.add(i);
                        return [e.unproject(n, t.z), e.unproject(o, t.z)]
                    },
                    _tileCoordsToBounds: function (t) {
                        var e = this._tileCoordsToNwSe(t),
                        i = new N(e[0], e[1]);
                        return this.options.noWrap || (i = this._map.wrapLatLngBounds(i)),
                        i
                    },
                    _tileCoordsToKey: function (t) {
                        return t.x + ":" + t.y + ":" + t.z
                    },
                    _keyToTileCoords: function (t) {
                        var e = t.split(":"),
                        i = new E(+e[0], +e[1]);
                        return i.z = +e[2],
                        i
                    },
                    _removeTile: function (t) {
                        var e = this._tiles[t];
                        e && (re(e.el), delete this._tiles[t], this.fire("tileunload", {
                                tile: e.el,
                                coords: this._keyToTileCoords(t)
                            }))
                    },
                    _initTile: function (t) {
                        ce(t, "leaflet-tile");
                        var e = this.getTileSize();
                        t.style.width = e.x + "px",
                        t.style.height = e.y + "px",
                        t.onselectstart = h,
                        t.onmousemove = h,
                        At.ielt9 && this.options.opacity < 1 && fe(t, this.options.opacity)
                    },
                    _addTile: function (t, e) {
                        var i = this._getTilePos(t),
                        o = this._tileCoordsToKey(t),
                        r = this.createTile(this._wrapCoords(t), n(this._tileReady, this, t));
                        this._initTile(r),
                        this.createTile.length < 2 && T(n(this._tileReady, this, t, null, r)),
                        ge(r, i),
                        this._tiles[o] = {
                            el: r,
                            coords: t,
                            current: !0
                        },
                        e.appendChild(r),
                        this.fire("tileloadstart", {
                            tile: r,
                            coords: t
                        })
                    },
                    _tileReady: function (t, e, i) {
                        e && this.fire("tileerror", {
                            error: e,
                            tile: i,
                            coords: t
                        });
                        var o = this._tileCoordsToKey(t);
                        (i = this._tiles[o]) && (i.loaded = +new Date, this._map._fadeAnimated ? (fe(i.el, 0), S(this._fadeFrame), this._fadeFrame = T(this._updateOpacity, this)) : (i.active = !0, this._pruneTiles()), e || (ce(i.el, "leaflet-tile-loaded"), this.fire("tileload", {
                                    tile: i.el,
                                    coords: t
                                })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), At.ielt9 || !this._map._fadeAnimated ? T(this._pruneTiles, this) : setTimeout(n(this._pruneTiles, this), 250)))
                    },
                    _getTilePos: function (t) {
                        return t.scaleBy(this.getTileSize()).subtract(this._level.origin)
                    },
                    _wrapCoords: function (t) {
                        var e = new E(this._wrapX ? a(t.x, this._wrapX) : t.x, this._wrapY ? a(t.y, this._wrapY) : t.y);
                        return e.z = t.z,
                        e
                    },
                    _pxBoundsToTileRange: function (t) {
                        var e = this.getTileSize();
                        return new A(t.min.unscaleBy(e).floor(), t.max.unscaleBy(e).ceil().subtract([1, 1]))
                    },
                    _noTilesToLoad: function () {
                        for (var t in this._tiles)
                            if (!this._tiles[t].loaded)
                                return !1;
                        return !0
                    }
                });
                var on = nn.extend({
                    options: {
                        minZoom: 0,
                        maxZoom: 18,
                        subdomains: "abc",
                        errorTileUrl: "",
                        zoomOffset: 0,
                        tms: !1,
                        zoomReverse: !1,
                        detectRetina: !1,
                        crossOrigin: !1,
                        referrerPolicy: !1
                    },
                    initialize: function (t, e) {
                        this._url = t,
                        (e = d(this, e)).detectRetina && At.retina && e.maxZoom > 0 ? (e.tileSize = Math.floor(e.tileSize / 2), e.zoomReverse ? (e.zoomOffset--, e.minZoom = Math.min(e.maxZoom, e.minZoom + 1)) : (e.zoomOffset++, e.maxZoom = Math.max(e.minZoom, e.maxZoom - 1)), e.minZoom = Math.max(0, e.minZoom)) : e.zoomReverse ? e.minZoom = Math.min(e.maxZoom, e.minZoom) : e.maxZoom = Math.max(e.minZoom, e.maxZoom),
                        "string" == typeof e.subdomains && (e.subdomains = e.subdomains.split("")),
                        this.on("tileunload", this._onTileRemove)
                    },
                    setUrl: function (t, e) {
                        return this._url === t && void 0 === e && (e = !0),
                        this._url = t,
                        e || this.redraw(),
                        this
                    },
                    createTile: function (t, e) {
                        var i = document.createElement("img");
                        return ke(i, "load", n(this._tileOnLoad, this, e, i)),
                        ke(i, "error", n(this._tileOnError, this, e, i)),
                        (this.options.crossOrigin || "" === this.options.crossOrigin) && (i.crossOrigin = !0 === this.options.crossOrigin ? "" : this.options.crossOrigin),
                        "string" == typeof this.options.referrerPolicy && (i.referrerPolicy = this.options.referrerPolicy),
                        i.alt = "",
                        i.src = this.getTileUrl(t),
                        i
                    },
                    getTileUrl: function (t) {
                        var i = {
                            r: At.retina ? "@2x" : "",
                            s: this._getSubdomain(t),
                            x: t.x,
                            y: t.y,
                            z: this._getZoomForUrl()
                        };
                        if (this._map && !this._map.options.crs.infinite) {
                            var n = this._globalTileRange.max.y - t.y;
                            this.options.tms && (i.y = n),
                            i["-y"] = n
                        }
                        return _(this._url, e(i, this.options))
                    },
                    _tileOnLoad: function (t, e) {
                        At.ielt9 ? setTimeout(n(t, this, null, e), 0) : t(null, e)
                    },
                    _tileOnError: function (t, e, i) {
                        var n = this.options.errorTileUrl;
                        n && e.getAttribute("src") !== n && (e.src = n),
                        t(i, e)
                    },
                    _onTileRemove: function (t) {
                        t.tile.onload = null
                    },
                    _getZoomForUrl: function () {
                        var t = this._tileZoom,
                        e = this.options.maxZoom;
                        return this.options.zoomReverse && (t = e - t),
                        t + this.options.zoomOffset
                    },
                    _getSubdomain: function (t) {
                        var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
                        return this.options.subdomains[e]
                    },
                    _abortLoading: function () {
                        var t,
                        e;
                        for (t in this._tiles)
                            if (this._tiles[t].coords.z !== this._tileZoom && ((e = this._tiles[t].el).onload = h, e.onerror = h, !e.complete)) {
                                e.src = v;
                                var i = this._tiles[t].coords;
                                re(e),
                                delete this._tiles[t],
                                this.fire("tileabort", {
                                    tile: e,
                                    coords: i
                                })
                            }
                    },
                    _removeTile: function (t) {
                        var e = this._tiles[t];
                        if (e)
                            return e.el.setAttribute("src", v), nn.prototype._removeTile.call(this, t)
                    },
                    _tileReady: function (t, e, i) {
                        if (this._map && (!i || i.getAttribute("src") !== v))
                            return nn.prototype._tileReady.call(this, t, e, i)
                    }
                });
                function rn(t, e) {
                    return new on(t, e)
                }
                var sn = on.extend({
                    defaultWmsParams: {
                        service: "WMS",
                        request: "GetMap",
                        layers: "",
                        styles: "",
                        format: "image/jpeg",
                        transparent: !1,
                        version: "1.1.1"
                    },
                    options: {
                        crs: null,
                        uppercase: !1
                    },
                    initialize: function (t, i) {
                        this._url = t;
                        var n = e({}, this.defaultWmsParams);
                        for (var o in i)
                            o in this.options || (n[o] = i[o]);
                        var r = (i = d(this, i)).detectRetina && At.retina ? 2 : 1,
                        s = this.getTileSize();
                        n.width = s.x * r,
                        n.height = s.y * r,
                        this.wmsParams = n
                    },
                    onAdd: function (t) {
                        this._crs = this.options.crs || t.options.crs,
                        this._wmsVersion = parseFloat(this.wmsParams.version);
                        var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
                        this.wmsParams[e] = this._crs.code,
                        on.prototype.onAdd.call(this, t)
                    },
                    getTileUrl: function (t) {
                        var e = this._tileCoordsToNwSe(t),
                        i = this._crs,
                        n = B(i.project(e[0]), i.project(e[1])),
                        o = n.min,
                        r = n.max,
                        s = (this._wmsVersion >= 1.3 && this._crs === xi ? [o.y, o.x, r.y, r.x] : [o.x, o.y, r.x, r.y]).join(","),
                        a = on.prototype.getTileUrl.call(this, t);
                        return a + p(this.wmsParams, a, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + s
                    },
                    setParams: function (t, i) {
                        return e(this.wmsParams, t),
                        i || this.redraw(),
                        this
                    }
                });
                on.WMS = sn,
                rn.wms = function (t, e) {
                    return new sn(t, e)
                };
                var an = Ti.extend({
                    options: {
                        padding: .1
                    },
                    initialize: function (t) {
                        d(this, t),
                        r(this),
                        this._layers = this._layers || {}
                    },
                    onAdd: function () {
                        this._container || (this._initContainer(), this._zoomAnimated && ce(this._container, "leaflet-zoom-animated")),
                        this.getPane().appendChild(this._container),
                        this._update(),
                        this.on("update", this._updatePaths, this)
                    },
                    onRemove: function () {
                        this.off("update", this._updatePaths, this),
                        this._destroyContainer()
                    },
                    getEvents: function () {
                        var t = {
                            viewreset: this._reset,
                            zoom: this._onZoom,
                            moveend: this._update,
                            zoomend: this._onZoomEnd
                        };
                        return this._zoomAnimated && (t.zoomanim = this._onAnimZoom),
                        t
                    },
                    _onAnimZoom: function (t) {
                        this._updateTransform(t.center, t.zoom)
                    },
                    _onZoom: function () {
                        this._updateTransform(this._map.getCenter(), this._map.getZoom())
                    },
                    _updateTransform: function (t, e) {
                        var i = this._map.getZoomScale(e, this._zoom),
                        n = this._map.getSize().multiplyBy(.5 + this.options.padding),
                        o = this._map.project(this._center, e),
                        r = n.multiplyBy(-i).add(o).subtract(this._map._getNewPixelOrigin(t, e));
                        At.any3d ? me(this._container, r, i) : ge(this._container, r)
                    },
                    _reset: function () {
                        for (var t in this._update(), this._updateTransform(this._center, this._zoom), this._layers)
                            this._layers[t]._reset()
                    },
                    _onZoomEnd: function () {
                        for (var t in this._layers)
                            this._layers[t]._project()
                    },
                    _updatePaths: function () {
                        for (var t in this._layers)
                            this._layers[t]._update()
                    },
                    _update: function () {
                        var t = this.options.padding,
                        e = this._map.getSize(),
                        i = this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();
                        this._bounds = new A(i, i.add(e.multiplyBy(1 + 2 * t)).round()),
                        this._center = this._map.getCenter(),
                        this._zoom = this._map.getZoom()
                    }
                }),
                hn = an.extend({
                    options: {
                        tolerance: 0
                    },
                    getEvents: function () {
                        var t = an.prototype.getEvents.call(this);
                        return t.viewprereset = this._onViewPreReset,
                        t
                    },
                    _onViewPreReset: function () {
                        this._postponeUpdatePaths = !0
                    },
                    onAdd: function () {
                        an.prototype.onAdd.call(this),
                        this._draw()
                    },
                    _initContainer: function () {
                        var t = this._container = document.createElement("canvas");
                        ke(t, "mousemove", this._onMouseMove, this),
                        ke(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this),
                        ke(t, "mouseout", this._handleMouseOut, this),
                        t._leaflet_disable_events = !0,
                        this._ctx = t.getContext("2d")
                    },
                    _destroyContainer: function () {
                        S(this._redrawRequest),
                        delete this._ctx,
                        re(this._container),
                        Ce(this._container),
                        delete this._container
                    },
                    _updatePaths: function () {
                        if (!this._postponeUpdatePaths) {
                            for (var t in this._redrawBounds = null, this._layers)
                                this._layers[t]._update();
                            this._redraw()
                        }
                    },
                    _update: function () {
                        if (!this._map._animatingZoom || !this._bounds) {
                            an.prototype._update.call(this);
                            var t = this._bounds,
                            e = this._container,
                            i = t.getSize(),
                            n = At.retina ? 2 : 1;
                            ge(e, t.min),
                            e.width = n * i.x,
                            e.height = n * i.y,
                            e.style.width = i.x + "px",
                            e.style.height = i.y + "px",
                            At.retina && this._ctx.scale(2, 2),
                            this._ctx.translate(-t.min.x, -t.min.y),
                            this.fire("update")
                        }
                    },
                    _reset: function () {
                        an.prototype._reset.call(this),
                        this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths())
                    },
                    _initPath: function (t) {
                        this._updateDashArray(t),
                        this._layers[r(t)] = t;
                        var e = t._order = {
                            layer: t,
                            prev: this._drawLast,
                            next: null
                        };
                        this._drawLast && (this._drawLast.next = e),
                        this._drawLast = e,
                        this._drawFirst = this._drawFirst || this._drawLast
                    },
                    _addPath: function (t) {
                        this._requestRedraw(t)
                    },
                    _removePath: function (t) {
                        var e = t._order,
                        i = e.next,
                        n = e.prev;
                        i ? i.prev = n : this._drawLast = n,
                        n ? n.next = i : this._drawFirst = i,
                        delete t._order,
                        delete this._layers[r(t)],
                        this._requestRedraw(t)
                    },
                    _updatePath: function (t) {
                        this._extendRedrawBounds(t),
                        t._project(),
                        t._update(),
                        this._requestRedraw(t)
                    },
                    _updateStyle: function (t) {
                        this._updateDashArray(t),
                        this._requestRedraw(t)
                    },
                    _updateDashArray: function (t) {
                        if ("string" == typeof t.options.dashArray) {
                            var e,
                            i,
                            n = t.options.dashArray.split(/[, ]+/),
                            o = [];
                            for (i = 0; i < n.length; i++) {
                                if (e = Number(n[i]), isNaN(e))
                                    return;
                                o.push(e)
                            }
                            t.options._dashArray = o
                        } else
                            t.options._dashArray = t.options.dashArray
                    },
                    _requestRedraw: function (t) {
                        this._map && (this._extendRedrawBounds(t), this._redrawRequest = this._redrawRequest || T(this._redraw, this))
                    },
                    _extendRedrawBounds: function (t) {
                        if (t._pxBounds) {
                            var e = (t.options.weight || 0) + 1;
                            this._redrawBounds = this._redrawBounds || new A,
                            this._redrawBounds.extend(t._pxBounds.min.subtract([e, e])),
                            this._redrawBounds.extend(t._pxBounds.max.add([e, e]))
                        }
                    },
                    _redraw: function () {
                        this._redrawRequest = null,
                        this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()),
                        this._clear(),
                        this._draw(),
                        this._redrawBounds = null
                    },
                    _clear: function () {
                        var t = this._redrawBounds;
                        if (t) {
                            var e = t.getSize();
                            this._ctx.clearRect(t.min.x, t.min.y, e.x, e.y)
                        } else
                            this._ctx.save(), this._ctx.setTransform(1, 0, 0, 1, 0, 0), this._ctx.clearRect(0, 0, this._container.width, this._container.height), this._ctx.restore()
                    },
                    _draw: function () {
                        var t,
                        e = this._redrawBounds;
                        if (this._ctx.save(), e) {
                            var i = e.getSize();
                            this._ctx.beginPath(),
                            this._ctx.rect(e.min.x, e.min.y, i.x, i.y),
                            this._ctx.clip()
                        }
                        this._drawing = !0;
                        for (var n = this._drawFirst; n; n = n.next)
                            t = n.layer, (!e || t._pxBounds && t._pxBounds.intersects(e)) && t._updatePath();
                        this._drawing = !1,
                        this._ctx.restore()
                    },
                    _updatePoly: function (t, e) {
                        if (this._drawing) {
                            var i,
                            n,
                            o,
                            r,
                            s = t._parts,
                            a = s.length,
                            h = this._ctx;
                            if (a) {
                                for (h.beginPath(), i = 0; i < a; i++) {
                                    for (n = 0, o = s[i].length; n < o; n++)
                                        r = s[i][n], h[n ? "lineTo" : "moveTo"](r.x, r.y);
                                    e && h.closePath()
                                }
                                this._fillStroke(h, t)
                            }
                        }
                    },
                    _updateCircle: function (t) {
                        if (this._drawing && !t._empty()) {
                            var e = t._point,
                            i = this._ctx,
                            n = Math.max(Math.round(t._radius), 1),
                            o = (Math.max(Math.round(t._radiusY), 1) || n) / n;
                            1 !== o && (i.save(), i.scale(1, o)),
                            i.beginPath(),
                            i.arc(e.x, e.y / o, n, 0, 2 * Math.PI, !1),
                            1 !== o && i.restore(),
                            this._fillStroke(i, t)
                        }
                    },
                    _fillStroke: function (t, e) {
                        var i = e.options;
                        i.fill && (t.globalAlpha = i.fillOpacity, t.fillStyle = i.fillColor || i.color, t.fill(i.fillRule || "evenodd")),
                        i.stroke && 0 !== i.weight && (t.setLineDash && t.setLineDash(e.options && e.options._dashArray || []), t.globalAlpha = i.opacity, t.lineWidth = i.weight, t.strokeStyle = i.color, t.lineCap = i.lineCap, t.lineJoin = i.lineJoin, t.stroke())
                    },
                    _onClick: function (t) {
                        for (var e, i, n = this._map.mouseEventToLayerPoint(t), o = this._drawFirst; o; o = o.next)
                            (e = o.layer).options.interactive && e._containsPoint(n) && ("click" !== t.type && "preclick" !== t.type || !this._map._draggableMoved(e)) && (i = e);
                        this._fireEvent(!!i && [i], t)
                    },
                    _onMouseMove: function (t) {
                        if (this._map && !this._map.dragging.moving() && !this._map._animatingZoom) {
                            var e = this._map.mouseEventToLayerPoint(t);
                            this._handleMouseHover(t, e)
                        }
                    },
                    _handleMouseOut: function (t) {
                        var e = this._hoveredLayer;
                        e && (ue(this._container, "leaflet-interactive"), this._fireEvent([e], t, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1)
                    },
                    _handleMouseHover: function (t, e) {
                        if (!this._mouseHoverThrottled) {
                            for (var i, o, r = this._drawFirst; r; r = r.next)
                                (i = r.layer).options.interactive && i._containsPoint(e) && (o = i);
                            o !== this._hoveredLayer && (this._handleMouseOut(t), o && (ce(this._container, "leaflet-interactive"), this._fireEvent([o], t, "mouseover"), this._hoveredLayer = o)),
                            this._fireEvent(!!this._hoveredLayer && [this._hoveredLayer], t),
                            this._mouseHoverThrottled = !0,
                            setTimeout(n((function () {
                                        this._mouseHoverThrottled = !1
                                    }), this), 32)
                        }
                    },
                    _fireEvent: function (t, e, i) {
                        this._map._fireDOMEvent(e, i || e.type, t)
                    },
                    _bringToFront: function (t) {
                        var e = t._order;
                        if (e) {
                            var i = e.next,
                            n = e.prev;
                            i && (i.prev = n, n ? n.next = i : i && (this._drawFirst = i), e.prev = this._drawLast, this._drawLast.next = e, e.next = null, this._drawLast = e, this._requestRedraw(t))
                        }
                    },
                    _bringToBack: function (t) {
                        var e = t._order;
                        if (e) {
                            var i = e.next,
                            n = e.prev;
                            n && (n.next = i, i ? i.prev = n : n && (this._drawLast = n), e.prev = null, e.next = this._drawFirst, this._drawFirst.prev = e, this._drawFirst = e, this._requestRedraw(t))
                        }
                    }
                });
                function ln(t) {
                    return At.canvas ? new hn(t) : null
                }
                var cn = function () {
                    try {
                        return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
                        function (t) {
                            return document.createElement("<lvml:" + t + ' class="lvml">')
                        }
                    } catch (t) {}
                    return function (t) {
                        return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
                    }
                }
                (),
                un = {
                    _initContainer: function () {
                        this._container = oe("div", "leaflet-vml-container")
                    },
                    _update: function () {
                        this._map._animatingZoom || (an.prototype._update.call(this), this.fire("update"))
                    },
                    _initPath: function (t) {
                        var e = t._container = cn("shape");
                        ce(e, "leaflet-vml-shape " + (this.options.className || "")),
                        e.coordsize = "1 1",
                        t._path = cn("path"),
                        e.appendChild(t._path),
                        this._updateStyle(t),
                        this._layers[r(t)] = t
                    },
                    _addPath: function (t) {
                        var e = t._container;
                        this._container.appendChild(e),
                        t.options.interactive && t.addInteractiveTarget(e)
                    },
                    _removePath: function (t) {
                        var e = t._container;
                        re(e),
                        t.removeInteractiveTarget(e),
                        delete this._layers[r(t)]
                    },
                    _updateStyle: function (t) {
                        var e = t._stroke,
                        i = t._fill,
                        n = t.options,
                        o = t._container;
                        o.stroked = !!n.stroke,
                        o.filled = !!n.fill,
                        n.stroke ? (e || (e = t._stroke = cn("stroke")), o.appendChild(e), e.weight = n.weight + "px", e.color = n.color, e.opacity = n.opacity, n.dashArray ? e.dashStyle = m(n.dashArray) ? n.dashArray.join(" ") : n.dashArray.replace(/( *, *)/g, " ") : e.dashStyle = "", e.endcap = n.lineCap.replace("butt", "flat"), e.joinstyle = n.lineJoin) : e && (o.removeChild(e), t._stroke = null),
                        n.fill ? (i || (i = t._fill = cn("fill")), o.appendChild(i), i.color = n.fillColor || n.color, i.opacity = n.fillOpacity) : i && (o.removeChild(i), t._fill = null)
                    },
                    _updateCircle: function (t) {
                        var e = t._point.round(),
                        i = Math.round(t._radius),
                        n = Math.round(t._radiusY || i);
                        this._setPath(t, t._empty() ? "M0 0" : "AL " + e.x + "," + e.y + " " + i + "," + n + " 0,23592600")
                    },
                    _setPath: function (t, e) {
                        t._path.v = e
                    },
                    _bringToFront: function (t) {
                        ae(t._container)
                    },
                    _bringToBack: function (t) {
                        he(t._container)
                    }
                },
                dn = At.vml ? cn : X,
                pn = an.extend({
                    _initContainer: function () {
                        this._container = dn("svg"),
                        this._container.setAttribute("pointer-events", "none"),
                        this._rootGroup = dn("g"),
                        this._container.appendChild(this._rootGroup)
                    },
                    _destroyContainer: function () {
                        re(this._container),
                        Ce(this._container),
                        delete this._container,
                        delete this._rootGroup,
                        delete this._svgSize
                    },
                    _update: function () {
                        if (!this._map._animatingZoom || !this._bounds) {
                            an.prototype._update.call(this);
                            var t = this._bounds,
                            e = t.getSize(),
                            i = this._container;
                            this._svgSize && this._svgSize.equals(e) || (this._svgSize = e, i.setAttribute("width", e.x), i.setAttribute("height", e.y)),
                            ge(i, t.min),
                            i.setAttribute("viewBox", [t.min.x, t.min.y, e.x, e.y].join(" ")),
                            this.fire("update")
                        }
                    },
                    _initPath: function (t) {
                        var e = t._path = dn("path");
                        t.options.className && ce(e, t.options.className),
                        t.options.interactive && ce(e, "leaflet-interactive"),
                        this._updateStyle(t),
                        this._layers[r(t)] = t
                    },
                    _addPath: function (t) {
                        this._rootGroup || this._initContainer(),
                        this._rootGroup.appendChild(t._path),
                        t.addInteractiveTarget(t._path)
                    },
                    _removePath: function (t) {
                        re(t._path),
                        t.removeInteractiveTarget(t._path),
                        delete this._layers[r(t)]
                    },
                    _updatePath: function (t) {
                        t._project(),
                        t._update()
                    },
                    _updateStyle: function (t) {
                        var e = t._path,
                        i = t.options;
                        e && (i.stroke ? (e.setAttribute("stroke", i.color), e.setAttribute("stroke-opacity", i.opacity), e.setAttribute("stroke-width", i.weight), e.setAttribute("stroke-linecap", i.lineCap), e.setAttribute("stroke-linejoin", i.lineJoin), i.dashArray ? e.setAttribute("stroke-dasharray", i.dashArray) : e.removeAttribute("stroke-dasharray"), i.dashOffset ? e.setAttribute("stroke-dashoffset", i.dashOffset) : e.removeAttribute("stroke-dashoffset")) : e.setAttribute("stroke", "none"), i.fill ? (e.setAttribute("fill", i.fillColor || i.color), e.setAttribute("fill-opacity", i.fillOpacity), e.setAttribute("fill-rule", i.fillRule || "evenodd")) : e.setAttribute("fill", "none"))
                    },
                    _updatePoly: function (t, e) {
                        this._setPath(t, K(t._parts, e))
                    },
                    _updateCircle: function (t) {
                        var e = t._point,
                        i = Math.max(Math.round(t._radius), 1),
                        n = "a" + i + "," + (Math.max(Math.round(t._radiusY), 1) || i) + " 0 1,0 ",
                        o = t._empty() ? "M0 0" : "M" + (e.x - i) + "," + e.y + n + 2 * i + ",0 " + n + 2 * -i + ",0 ";
                        this._setPath(t, o)
                    },
                    _setPath: function (t, e) {
                        t._path.setAttribute("d", e)
                    },
                    _bringToFront: function (t) {
                        ae(t._path)
                    },
                    _bringToBack: function (t) {
                        he(t._path)
                    }
                });
                function fn(t) {
                    return At.svg || At.vml ? new pn(t) : null
                }
                At.vml && pn.include(un),
                Ve.include({
                    getRenderer: function (t) {
                        var e = t.options.renderer || this._getPaneRenderer(t.options.pane) || this.options.renderer || this._renderer;
                        return e || (e = this._renderer = this._createRenderer()),
                        this.hasLayer(e) || this.addLayer(e),
                        e
                    },
                    _getPaneRenderer: function (t) {
                        if ("overlayPane" === t || void 0 === t)
                            return !1;
                        var e = this._paneRenderers[t];
                        return void 0 === e && (e = this._createRenderer({
                                pane: t
                            }), this._paneRenderers[t] = e),
                        e
                    },
                    _createRenderer: function (t) {
                        return this.options.preferCanvas && ln(t) || fn(t)
                    }
                });
                var _n = Ni.extend({
                    initialize: function (t, e) {
                        Ni.prototype.initialize.call(this, this._boundsToLatLngs(t), e)
                    },
                    setBounds: function (t) {
                        return this.setLatLngs(this._boundsToLatLngs(t))
                    },
                    _boundsToLatLngs: function (t) {
                        return [(t = Z(t)).getSouthWest(), t.getNorthWest(), t.getNorthEast(), t.getSouthEast()]
                    }
                });
                pn.create = dn,
                pn.pointsToPath = K,
                Zi.geometryToLayer = Di,
                Zi.coordsToLatLng = Ri,
                Zi.coordsToLatLngs = Fi,
                Zi.latLngToCoords = Ui,
                Zi.latLngsToCoords = Gi,
                Zi.getFeature = Hi,
                Zi.asFeature = Wi,
                Ve.mergeOptions({
                    boxZoom: !0
                });
                var mn = Qe.extend({
                    initialize: function (t) {
                        this._map = t,
                        this._container = t._container,
                        this._pane = t._panes.overlayPane,
                        this._resetStateTimeout = 0,
                        t.on("unload", this._destroy, this)
                    },
                    addHooks: function () {
                        ke(this._container, "mousedown", this._onMouseDown, this)
                    },
                    removeHooks: function () {
                        Ce(this._container, "mousedown", this._onMouseDown, this)
                    },
                    moved: function () {
                        return this._moved
                    },
                    _destroy: function () {
                        re(this._pane),
                        delete this._pane
                    },
                    _resetState: function () {
                        this._resetStateTimeout = 0,
                        this._moved = !1
                    },
                    _clearDeferredResetState: function () {
                        0 !== this._resetStateTimeout && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0)
                    },
                    _onMouseDown: function (t) {
                        if (!t.shiftKey || 1 !== t.which && 1 !== t.button)
                            return !1;
                        this._clearDeferredResetState(),
                        this._resetState(),
                        qt(),
                        Le(),
                        this._startPoint = this._map.mouseEventToContainerPoint(t),
                        ke(document, {
                            contextmenu: De,
                            mousemove: this._onMouseMove,
                            mouseup: this._onMouseUp,
                            keydown: this._onKeyDown
                        }, this)
                    },
                    _onMouseMove: function (t) {
                        this._moved || (this._moved = !0, this._box = oe("div", "leaflet-zoom-box", this._container), ce(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")),
                        this._point = this._map.mouseEventToContainerPoint(t);
                        var e = new A(this._point, this._startPoint),
                        i = e.getSize();
                        ge(this._box, e.min),
                        this._box.style.width = i.x + "px",
                        this._box.style.height = i.y + "px"
                    },
                    _finish: function () {
                        this._moved && (re(this._box), ue(this._container, "leaflet-crosshair")),
                        Xt(),
                        we(),
                        Ce(document, {
                            contextmenu: De,
                            mousemove: this._onMouseMove,
                            mouseup: this._onMouseUp,
                            keydown: this._onKeyDown
                        }, this)
                    },
                    _onMouseUp: function (t) {
                        if ((1 === t.which || 1 === t.button) && (this._finish(), this._moved)) {
                            this._clearDeferredResetState(),
                            this._resetStateTimeout = setTimeout(n(this._resetState, this), 0);
                            var e = new N(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point));
                            this._map.fitBounds(e).fire("boxzoomend", {
                                boxZoomBounds: e
                            })
                        }
                    },
                    _onKeyDown: function (t) {
                        27 === t.keyCode && (this._finish(), this._clearDeferredResetState(), this._resetState())
                    }
                });
                Ve.addInitHook("addHandler", "boxZoom", mn),
                Ve.mergeOptions({
                    doubleClickZoom: !0
                });
                var gn = Qe.extend({
                    addHooks: function () {
                        this._map.on("dblclick", this._onDoubleClick, this)
                    },
                    removeHooks: function () {
                        this._map.off("dblclick", this._onDoubleClick, this)
                    },
                    _onDoubleClick: function (t) {
                        var e = this._map,
                        i = e.getZoom(),
                        n = e.options.zoomDelta,
                        o = t.originalEvent.shiftKey ? i - n : i + n;
                        "center" === e.options.doubleClickZoom ? e.setZoom(o) : e.setZoomAround(t.containerPoint, o)
                    }
                });
                Ve.addInitHook("addHandler", "doubleClickZoom", gn),
                Ve.mergeOptions({
                    dragging: !0,
                    inertia: !0,
                    inertiaDeceleration: 3400,
                    inertiaMaxSpeed: 1 / 0,
                    easeLinearity: .2,
                    worldCopyJump: !1,
                    maxBoundsViscosity: 0
                });
                var vn = Qe.extend({
                    addHooks: function () {
                        if (!this._draggable) {
                            var t = this._map;
                            this._draggable = new ni(t._mapPane, t._container),
                            this._draggable.on({
                                dragstart: this._onDragStart,
                                drag: this._onDrag,
                                dragend: this._onDragEnd
                            }, this),
                            this._draggable.on("predrag", this._onPreDragLimit, this),
                            t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this))
                        }
                        ce(this._map._container, "leaflet-grab leaflet-touch-drag"),
                        this._draggable.enable(),
                        this._positions = [],
                        this._times = []
                    },
                    removeHooks: function () {
                        ue(this._map._container, "leaflet-grab"),
                        ue(this._map._container, "leaflet-touch-drag"),
                        this._draggable.disable()
                    },
                    moved: function () {
                        return this._draggable && this._draggable._moved
                    },
                    moving: function () {
                        return this._draggable && this._draggable._moving
                    },
                    _onDragStart: function () {
                        var t = this._map;
                        if (t._stop(), this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
                            var e = Z(this._map.options.maxBounds);
                            this._offsetLimit = B(this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),
                            this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity))
                        } else
                            this._offsetLimit = null;
                        t.fire("movestart").fire("dragstart"),
                        t.options.inertia && (this._positions = [], this._times = [])
                    },
                    _onDrag: function (t) {
                        if (this._map.options.inertia) {
                            var e = this._lastTime = +new Date,
                            i = this._lastPos = this._draggable._absPos || this._draggable._newPos;
                            this._positions.push(i),
                            this._times.push(e),
                            this._prunePositions(e)
                        }
                        this._map.fire("move", t).fire("drag", t)
                    },
                    _prunePositions: function (t) {
                        for (; this._positions.length > 1 && t - this._times[0] > 50; )
                            this._positions.shift(), this._times.shift()
                    },
                    _onZoomEnd: function () {
                        var t = this._map.getSize().divideBy(2),
                        e = this._map.latLngToLayerPoint([0, 0]);
                        this._initialWorldOffset = e.subtract(t).x,
                        this._worldWidth = this._map.getPixelWorldBounds().getSize().x
                    },
                    _viscousLimit: function (t, e) {
                        return t - (t - e) * this._viscosity
                    },
                    _onPreDragLimit: function () {
                        if (this._viscosity && this._offsetLimit) {
                            var t = this._draggable._newPos.subtract(this._draggable._startPos),
                            e = this._offsetLimit;
                            t.x < e.min.x && (t.x = this._viscousLimit(t.x, e.min.x)),
                            t.y < e.min.y && (t.y = this._viscousLimit(t.y, e.min.y)),
                            t.x > e.max.x && (t.x = this._viscousLimit(t.x, e.max.x)),
                            t.y > e.max.y && (t.y = this._viscousLimit(t.y, e.max.y)),
                            this._draggable._newPos = this._draggable._startPos.add(t)
                        }
                    },
                    _onPreDragWrap: function () {
                        var t = this._worldWidth,
                        e = Math.round(t / 2),
                        i = this._initialWorldOffset,
                        n = this._draggable._newPos.x,
                        o = (n - e + i) % t + e - i,
                        r = (n + e + i) % t - e - i,
                        s = Math.abs(o + i) < Math.abs(r + i) ? o : r;
                        this._draggable._absPos = this._draggable._newPos.clone(),
                        this._draggable._newPos.x = s
                    },
                    _onDragEnd: function (t) {
                        var e = this._map,
                        i = e.options,
                        n = !i.inertia || t.noInertia || this._times.length < 2;
                        if (e.fire("dragend", t), n)
                            e.fire("moveend");
                        else {
                            this._prunePositions(+new Date);
                            var o = this._lastPos.subtract(this._positions[0]),
                            r = (this._lastTime - this._times[0]) / 1e3,
                            s = i.easeLinearity,
                            a = o.multiplyBy(s / r),
                            h = a.distanceTo([0, 0]),
                            l = Math.min(i.inertiaMaxSpeed, h),
                            c = a.multiplyBy(l / h),
                            u = l / (i.inertiaDeceleration * s),
                            d = c.multiplyBy(-u / 2).round();
                            d.x || d.y ? (d = e._limitOffset(d, e.options.maxBounds), T((function () {
                                        e.panBy(d, {
                                            duration: u,
                                            easeLinearity: s,
                                            noMoveStart: !0,
                                            animate: !0
                                        })
                                    }))) : e.fire("moveend")
                        }
                    }
                });
                Ve.addInitHook("addHandler", "dragging", vn),
                Ve.mergeOptions({
                    keyboard: !0,
                    keyboardPanDelta: 80
                });
                var yn = Qe.extend({
                    keyCodes: {
                        left: [37],
                        right: [39],
                        down: [40],
                        up: [38],
                        zoomIn: [187, 107, 61, 171],
                        zoomOut: [189, 109, 54, 173]
                    },
                    initialize: function (t) {
                        this._map = t,
                        this._setPanDelta(t.options.keyboardPanDelta),
                        this._setZoomDelta(t.options.zoomDelta)
                    },
                    addHooks: function () {
                        var t = this._map._container;
                        t.tabIndex <= 0 && (t.tabIndex = "0"),
                        ke(t, {
                            focus: this._onFocus,
                            blur: this._onBlur,
                            mousedown: this._onMouseDown
                        }, this),
                        this._map.on({
                            focus: this._addHooks,
                            blur: this._removeHooks
                        }, this)
                    },
                    removeHooks: function () {
                        this._removeHooks(),
                        Ce(this._map._container, {
                            focus: this._onFocus,
                            blur: this._onBlur,
                            mousedown: this._onMouseDown
                        }, this),
                        this._map.off({
                            focus: this._addHooks,
                            blur: this._removeHooks
                        }, this)
                    },
                    _onMouseDown: function () {
                        if (!this._focused) {
                            var t = document.body,
                            e = document.documentElement,
                            i = t.scrollTop || e.scrollTop,
                            n = t.scrollLeft || e.scrollLeft;
                            this._map._container.focus(),
                            window.scrollTo(n, i)
                        }
                    },
                    _onFocus: function () {
                        this._focused = !0,
                        this._map.fire("focus")
                    },
                    _onBlur: function () {
                        this._focused = !1,
                        this._map.fire("blur")
                    },
                    _setPanDelta: function (t) {
                        var e,
                        i,
                        n = this._panKeys = {},
                        o = this.keyCodes;
                        for (e = 0, i = o.left.length; e < i; e++)
                            n[o.left[e]] = [-1 * t, 0];
                        for (e = 0, i = o.right.length; e < i; e++)
                            n[o.right[e]] = [t, 0];
                        for (e = 0, i = o.down.length; e < i; e++)
                            n[o.down[e]] = [0, t];
                        for (e = 0, i = o.up.length; e < i; e++)
                            n[o.up[e]] = [0, -1 * t]
                    },
                    _setZoomDelta: function (t) {
                        var e,
                        i,
                        n = this._zoomKeys = {},
                        o = this.keyCodes;
                        for (e = 0, i = o.zoomIn.length; e < i; e++)
                            n[o.zoomIn[e]] = t;
                        for (e = 0, i = o.zoomOut.length; e < i; e++)
                            n[o.zoomOut[e]] = -t
                    },
                    _addHooks: function () {
                        ke(document, "keydown", this._onKeyDown, this)
                    },
                    _removeHooks: function () {
                        Ce(document, "keydown", this._onKeyDown, this)
                    },
                    _onKeyDown: function (t) {
                        if (!(t.altKey || t.ctrlKey || t.metaKey)) {
                            var e,
                            i = t.keyCode,
                            n = this._map;
                            if (i in this._panKeys) {
                                if (!n._panAnim || !n._panAnim._inProgress)
                                    if (e = this._panKeys[i], t.shiftKey && (e = O(e).multiplyBy(3)), n.options.maxBounds && (e = n._limitOffset(O(e), n.options.maxBounds)), n.options.worldCopyJump) {
                                        var o = n.wrapLatLng(n.unproject(n.project(n.getCenter()).add(e)));
                                        n.panTo(o)
                                    } else
                                        n.panBy(e)
                            } else if (i in this._zoomKeys)
                                n.setZoom(n.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[i]);
                            else {
                                if (27 !== i || !n._popup || !n._popup.options.closeOnEscapeKey)
                                    return;
                                n.closePopup()
                            }
                            De(t)
                        }
                    }
                });
                Ve.addInitHook("addHandler", "keyboard", yn),
                Ve.mergeOptions({
                    scrollWheelZoom: !0,
                    wheelDebounceTime: 40,
                    wheelPxPerZoomLevel: 60
                });
                var Ln = Qe.extend({
                    addHooks: function () {
                        ke(this._map._container, "wheel", this._onWheelScroll, this),
                        this._delta = 0
                    },
                    removeHooks: function () {
                        Ce(this._map._container, "wheel", this._onWheelScroll, this)
                    },
                    _onWheelScroll: function (t) {
                        var e = Ue(t),
                        i = this._map.options.wheelDebounceTime;
                        this._delta += e,
                        this._lastMousePos = this._map.mouseEventToContainerPoint(t),
                        this._startTime || (this._startTime = +new Date);
                        var o = Math.max(i - (+new Date - this._startTime), 0);
                        clearTimeout(this._timer),
                        this._timer = setTimeout(n(this._performZoom, this), o),
                        De(t)
                    },
                    _performZoom: function () {
                        var t = this._map,
                        e = t.getZoom(),
                        i = this._map.options.zoomSnap || 0;
                        t._stop();
                        var n = this._delta / (4 * this._map.options.wheelPxPerZoomLevel),
                        o = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(n)))) / Math.LN2,
                        r = i ? Math.ceil(o / i) * i : o,
                        s = t._limitZoom(e + (this._delta > 0 ? r : -r)) - e;
                        this._delta = 0,
                        this._startTime = null,
                        s && ("center" === t.options.scrollWheelZoom ? t.setZoom(e + s) : t.setZoomAround(this._lastMousePos, e + s))
                    }
                });
                Ve.addInitHook("addHandler", "scrollWheelZoom", Ln);
                Ve.mergeOptions({
                    tapHold: At.touchNative && At.safari && At.mobile,
                    tapTolerance: 15
                });
                var wn = Qe.extend({
                    addHooks: function () {
                        ke(this._map._container, "touchstart", this._onDown, this)
                    },
                    removeHooks: function () {
                        Ce(this._map._container, "touchstart", this._onDown, this)
                    },
                    _onDown: function (t) {
                        if (clearTimeout(this._holdTimeout), 1 === t.touches.length) {
                            var e = t.touches[0];
                            this._startPos = this._newPos = new E(e.clientX, e.clientY),
                            this._holdTimeout = setTimeout(n((function () {
                                            this._cancel(),
                                            this._isTapValid() && (ke(document, "touchend", Ze), ke(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", e))
                                        }), this), 600),
                            ke(document, "touchend touchcancel contextmenu", this._cancel, this),
                            ke(document, "touchmove", this._onMove, this)
                        }
                    },
                    _cancelClickPrevent: function t() {
                        Ce(document, "touchend", Ze),
                        Ce(document, "touchend touchcancel", t)
                    },
                    _cancel: function () {
                        clearTimeout(this._holdTimeout),
                        Ce(document, "touchend touchcancel contextmenu", this._cancel, this),
                        Ce(document, "touchmove", this._onMove, this)
                    },
                    _onMove: function (t) {
                        var e = t.touches[0];
                        this._newPos = new E(e.clientX, e.clientY)
                    },
                    _isTapValid: function () {
                        return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
                    },
                    _simulateEvent: function (t, e) {
                        var i = new MouseEvent(t, {
                            bubbles: !0,
                            cancelable: !0,
                            view: window,
                            screenX: e.screenX,
                            screenY: e.screenY,
                            clientX: e.clientX,
                            clientY: e.clientY
                        });
                        i._simulated = !0,
                        e.target.dispatchEvent(i)
                    }
                });
                Ve.addInitHook("addHandler", "tapHold", wn),
                Ve.mergeOptions({
                    touchZoom: At.touch,
                    bounceAtZoomLimits: !0
                });
                var bn = Qe.extend({
                    addHooks: function () {
                        ce(this._map._container, "leaflet-touch-zoom"),
                        ke(this._map._container, "touchstart", this._onTouchStart, this)
                    },
                    removeHooks: function () {
                        ue(this._map._container, "leaflet-touch-zoom"),
                        Ce(this._map._container, "touchstart", this._onTouchStart, this)
                    },
                    _onTouchStart: function (t) {
                        var e = this._map;
                        if (t.touches && 2 === t.touches.length && !e._animatingZoom && !this._zooming) {
                            var i = e.mouseEventToContainerPoint(t.touches[0]),
                            n = e.mouseEventToContainerPoint(t.touches[1]);
                            this._centerPoint = e.getSize()._divideBy(2),
                            this._startLatLng = e.containerPointToLatLng(this._centerPoint),
                            "center" !== e.options.touchZoom && (this._pinchStartLatLng = e.containerPointToLatLng(i.add(n)._divideBy(2))),
                            this._startDist = i.distanceTo(n),
                            this._startZoom = e.getZoom(),
                            this._moved = !1,
                            this._zooming = !0,
                            e._stop(),
                            ke(document, "touchmove", this._onTouchMove, this),
                            ke(document, "touchend touchcancel", this._onTouchEnd, this),
                            Ze(t)
                        }
                    },
                    _onTouchMove: function (t) {
                        if (t.touches && 2 === t.touches.length && this._zooming) {
                            var e = this._map,
                            i = e.mouseEventToContainerPoint(t.touches[0]),
                            o = e.mouseEventToContainerPoint(t.touches[1]),
                            r = i.distanceTo(o) / this._startDist;
                            if (this._zoom = e.getScaleZoom(r, this._startZoom), !e.options.bounceAtZoomLimits && (this._zoom < e.getMinZoom() && r < 1 || this._zoom > e.getMaxZoom() && r > 1) && (this._zoom = e._limitZoom(this._zoom)), "center" === e.options.touchZoom) {
                                if (this._center = this._startLatLng, 1 === r)
                                    return
                            } else {
                                var s = i._add(o)._divideBy(2)._subtract(this._centerPoint);
                                if (1 === r && 0 === s.x && 0 === s.y)
                                    return;
                                this._center = e.unproject(e.project(this._pinchStartLatLng, this._zoom).subtract(s), this._zoom)
                            }
                            this._moved || (e._moveStart(!0, !1), this._moved = !0),
                            S(this._animRequest);
                            var a = n(e._move, e, this._center, this._zoom, {
                                pinch: !0,
                                round: !1
                            }, void 0);
                            this._animRequest = T(a, this, !0),
                            Ze(t)
                        }
                    },
                    _onTouchEnd: function () {
                        this._moved && this._zooming ? (this._zooming = !1, S(this._animRequest), Ce(document, "touchmove", this._onTouchMove, this), Ce(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom))) : this._zooming = !1
                    }
                });
                Ve.addInitHook("addHandler", "touchZoom", bn),
                Ve.BoxZoom = mn,
                Ve.DoubleClickZoom = gn,
                Ve.Drag = vn,
                Ve.Keyboard = yn,
                Ve.ScrollWheelZoom = Ln,
                Ve.TapHold = wn,
                Ve.TouchZoom = bn,
                t.Bounds = A,
                t.Browser = At,
                t.CRS = F,
                t.Canvas = hn,
                t.Circle = Ai,
                t.CircleMarker = Oi,
                t.Class = M,
                t.Control = Ye,
                t.DivIcon = en,
                t.DivOverlay = $i,
                t.DomEvent = He,
                t.DomUtil = Se,
                t.Draggable = ni,
                t.Evented = I,
                t.FeatureGroup = ki,
                t.GeoJSON = Zi,
                t.GridLayer = nn,
                t.Handler = Qe,
                t.Icon = Mi,
                t.ImageOverlay = Xi,
                t.LatLng = D,
                t.LatLngBounds = N,
                t.Layer = Ti,
                t.LayerGroup = Si,
                t.LineUtil = _i,
                t.Map = Ve,
                t.Marker = Ei,
                t.Mixin = ei,
                t.Path = zi,
                t.Point = E,
                t.PolyUtil = vi,
                t.Polygon = Ni,
                t.Polyline = Bi,
                t.Popup = Qi,
                t.PosAnimation = We,
                t.Projection = wi,
                t.Rectangle = _n,
                t.Renderer = an,
                t.SVG = pn,
                t.SVGOverlay = Ji,
                t.TileLayer = on,
                t.Tooltip = tn,
                t.Transformation = W,
                t.Util = k,
                t.VideoOverlay = Ki,
                t.bind = n,
                t.bounds = B,
                t.canvas = ln,
                t.circle = function (t, e, i) {
                    return new Ai(t, e, i)
                },
                t.circleMarker = function (t, e) {
                    return new Oi(t, e)
                },
                t.control = qe,
                t.divIcon = function (t) {
                    return new en(t)
                },
                t.extend = e,
                t.featureGroup = function (t, e) {
                    return new ki(t, e)
                },
                t.geoJSON = Yi,
                t.geoJson = qi,
                t.gridLayer = function (t) {
                    return new nn(t)
                },
                t.icon = function (t) {
                    return new Mi(t)
                },
                t.imageOverlay = function (t, e, i) {
                    return new Xi(t, e, i)
                },
                t.latLng = j,
                t.latLngBounds = Z,
                t.layerGroup = function (t, e) {
                    return new Si(t, e)
                },
                t.map = function (t, e) {
                    return new Ve(t, e)
                },
                t.marker = function (t, e) {
                    return new Ei(t, e)
                },
                t.point = O,
                t.polygon = function (t, e) {
                    return new Ni(t, e)
                },
                t.polyline = function (t, e) {
                    return new Bi(t, e)
                },
                t.popup = function (t, e) {
                    return new Qi(t, e)
                },
                t.rectangle = function (t, e) {
                    return new _n(t, e)
                },
                t.setOptions = d,
                t.stamp = r,
                t.svg = fn,
                t.svgOverlay = function (t, e, i) {
                    return new Ji(t, e, i)
                },
                t.tileLayer = rn,
                t.tooltip = function (t, e) {
                    return new tn(t, e)
                },
                t.transformation = V,
                t.version = "1.9.3",
                t.videoOverlay = function (t, e, i) {
                    return new Ki(t, e, i)
                };
                var xn = window.L;
                t.noConflict = function () {
                    return window.L = xn,
                    this
                },
                window.L = t
            }
            (e)
        },
        600: t => {
            t.exports = function (t) {
                !function (t) {
                    if (!t)
                        throw new Error("Eventify cannot use falsy object as events subject");
                    for (var e = ["on", "fire", "off"], i = 0; i < e.length; ++i)
                        if (t.hasOwnProperty(e[i]))
                            throw new Error("Subject cannot be eventified, since it already has property '" + e[i] + "'")
                }
                (t);
                var e = function (t) {
                    var e = Object.create(null);
                    return {
                        on: function (i, n, o) {
                            if ("function" != typeof n)
                                throw new Error("callback is expected to be a function");
                            var r = e[i];
                            return r || (r = e[i] = []),
                            r.push({
                                callback: n,
                                ctx: o
                            }),
                            t
                        },
                        off: function (i, n) {
                            if (void 0 === i)
                                return e = Object.create(null), t;
                            if (e[i])
                                if ("function" != typeof n)
                                    delete e[i];
                                else
                                    for (var o = e[i], r = 0; r < o.length; ++r)
                                        o[r].callback === n && o.splice(r, 1);
                            return t
                        },
                        fire: function (i) {
                            var n,
                            o = e[i];
                            if (!o)
                                return t;
                            arguments.length > 1 && (n = Array.prototype.splice.call(arguments, 1));
                            for (var r = 0; r < o.length; ++r) {
                                var s = o[r];
                                s.callback.apply(s.ctx, n)
                            }
                            return t
                        }
                    }
                }
                (t);
                return t.on = e.on,
                t.off = e.off,
                t.fire = e.fire,
                t
            }
        },
        944: (t, e, i) => {
            t.exports = function (t) {
                if ("uniqueLinkId" in(t = t || {}) && (console.warn("ngraph.graph: Starting from version 0.14 `uniqueLinkId` is deprecated.\nUse `multigraph` option instead\n", "\n", "Note: there is also change in default behavior: From now on each graph\nis considered to be not a multigraph by default (each edge is unique)."), t.multigraph = t.uniqueLinkId), void 0 === t.multigraph && (t.multigraph = !1), "function" != typeof Map)
                    throw new Error("ngraph.graph requires `Map` to be defined. Please polyfill it before using ngraph");
                var e,
                i = new Map,
                h = new Map,
                l = {},
                c = 0,
                u = t.multigraph ? function (t, e, i) {
                    var n = a(t, e),
                    o = l.hasOwnProperty(n);
                    if (o || S(t, e)) {
                        o || (l[n] = 0);
                        var r = "@" + ++l[n];
                        n = a(t + r, e + r)
                    }
                    return new s(t, e, i, n)
                }
                 : function (t, e, i) {
                    var n = a(t, e),
                    o = h.get(n);
                    return o ? (o.data = i, o) : new s(t, e, i, n)
                },
                d = [],
                p = k,
                f = k,
                _ = k,
                m = k,
                g = {
                    version: 20,
                    addNode: L,
                    addLink: function (t, e, i) {
                        _();
                        var n = w(t) || L(t),
                        o = w(e) || L(e),
                        s = u(t, e, i),
                        a = h.has(s.id);
                        return h.set(s.id, s),
                        r(n, s),
                        t !== e && r(o, s),
                        p(s, a ? "update" : "add"),
                        m(),
                        s
                    },
                    removeLink: function (t, e) {
                        return void 0 !== e && (t = S(t, e)),
                        T(t)
                    },
                    removeNode: b,
                    getNode: w,
                    getNodeCount: x,
                    getLinkCount: P,
                    getEdgeCount: P,
                    getLinksCount: P,
                    getNodesCount: x,
                    getLinks: function (t) {
                        var e = w(t);
                        return e ? e.links : null
                    },
                    forEachNode: I,
                    forEachLinkedNode: function (t, e, n) {
                        var o = w(t);
                        if (o && o.links && "function" == typeof e)
                            return n ? function (t, e, n) {
                                for (var o = t.values(), r = o.next(); !r.done; ) {
                                    var s = r.value;
                                    if (s.fromId === e && n(i.get(s.toId), s))
                                        return !0;
                                    r = o.next()
                                }
                            }
                        (o.links, t, e) : function (t, e, n) {
                            for (var o = t.values(), r = o.next(); !r.done; ) {
                                var s = r.value,
                                a = s.fromId === e ? s.toId : s.fromId;
                                if (n(i.get(a), s))
                                    return !0;
                                r = o.next()
                            }
                        }
                        (o.links, t, e)
                    },
                    forEachLink: function (t) {
                        if ("function" == typeof t)
                            for (var e = h.values(), i = e.next(); !i.done; ) {
                                if (t(i.value))
                                    return !0;
                                i = e.next()
                            }
                    },
                    beginUpdate: _,
                    endUpdate: m,
                    clear: function () {
                        _(),
                        I((function (t) {
                                b(t.id)
                            })),
                        m()
                    },
                    hasLink: S,
                    hasNode: w,
                    getLink: S
                };
                return n(g),
                e = g.on,
                g.on = function () {
                    return g.beginUpdate = _ = M,
                    g.endUpdate = m = C,
                    p = v,
                    f = y,
                    g.on = e,
                    e.apply(g, arguments)
                },
                g;
                function v(t, e) {
                    d.push({
                        link: t,
                        changeType: e
                    })
                }
                function y(t, e) {
                    d.push({
                        node: t,
                        changeType: e
                    })
                }
                function L(t, e) {
                    if (void 0 === t)
                        throw new Error("Invalid node identifier");
                    _();
                    var n = w(t);
                    return n ? (n.data = e, f(n, "update")) : (n = new o(t, e), f(n, "add")),
                    i.set(t, n),
                    m(),
                    n
                }
                function w(t) {
                    return i.get(t)
                }
                function b(t) {
                    var e = w(t);
                    if (!e)
                        return !1;
                    _();
                    var n = e.links;
                    return n && (n.forEach(T), e.links = null),
                    i.delete(t),
                    f(e, "remove"),
                    m(),
                    !0
                }
                function x() {
                    return i.size
                }
                function P() {
                    return h.size
                }
                function T(t) {
                    if (!t)
                        return !1;
                    if (!h.get(t.id))
                        return !1;
                    _(),
                    h.delete(t.id);
                    var e = w(t.fromId),
                    i = w(t.toId);
                    return e && e.links.delete(t),
                    i && i.links.delete(t),
                    p(t, "remove"),
                    m(),
                    !0
                }
                function S(t, e) {
                    if (void 0 !== t && void 0 !== e)
                        return h.get(a(t, e))
                }
                function k() {}
                function M() {
                    c += 1
                }
                function C() {
                    0 == (c -= 1) && d.length > 0 && (g.fire("changed", d), d.length = 0)
                }
                function I(t) {
                    if ("function" != typeof t)
                        throw new Error("Function is expected to iterate over graph nodes. You passed " + t);
                    for (var e = i.values(), n = e.next(); !n.done; ) {
                        if (t(n.value))
                            return !0;
                        n = e.next()
                    }
                }
            };
            var n = i(600);
            function o(t, e) {
                this.id = t,
                this.links = null,
                this.data = e
            }
            function r(t, e) {
                t.links ? t.links.add(e) : t.links = new Set([e])
            }
            function s(t, e, i, n) {
                this.fromId = t,
                this.toId = e,
                this.data = i,
                this.id = n
            }
            function a(t, e) {
                return t.toString() + "👉 " + e.toString()
            }
        },
        392: t => {
            function e(t, o) {
                if (!(this instanceof e))
                    return new e(t, o);
                if (Array.isArray(t) || (o = t, t = []), o = o || {}, this.data = t || [], this.length = this.data.length, this.compare = o.compare || n, this.setNodeId = o.setNodeId || i, this.length > 0)
                    for (var r = this.length >> 1; r >= 0; r--)
                        this._down(r);
                if (o.setNodeId)
                    for (r = 0; r < this.length; ++r)
                        this.setNodeId(this.data[r], r)
            }
            function i() {}
            function n(t, e) {
                return t - e
            }
            t.exports = e,
            e.prototype = {
                push: function (t) {
                    this.data.push(t),
                    this.setNodeId(t, this.length),
                    this.length++,
                    this._up(this.length - 1)
                },
                pop: function () {
                    if (0 !== this.length) {
                        var t = this.data[0];
                        return this.length--,
                        this.length > 0 && (this.data[0] = this.data[this.length], this.setNodeId(this.data[0], 0), this._down(0)),
                        this.data.pop(),
                        t
                    }
                },
                peek: function () {
                    return this.data[0]
                },
                updateItem: function (t) {
                    this._down(t),
                    this._up(t)
                },
                _up: function (t) {
                    for (var e = this.data, i = this.compare, n = this.setNodeId, o = e[t]; t > 0; ) {
                        var r = t - 1 >> 1,
                        s = e[r];
                        if (i(o, s) >= 0)
                            break;
                        e[t] = s,
                        n(s, t),
                        t = r
                    }
                    e[t] = o,
                    n(o, t)
                },
                _down: function (t) {
                    for (var e = this.data, i = this.compare, n = this.length >> 1, o = e[t], r = this.setNodeId; t < n; ) {
                        var s = 1 + (t << 1),
                        a = s + 1,
                        h = e[s];
                        if (a < this.length && i(e[a], h) < 0 && (s = a, h = e[a]), i(h, o) >= 0)
                            break;
                        e[t] = h,
                        r(h, t),
                        t = s
                    }
                    e[t] = o,
                    r(o, t)
                }
            }
        },
        8: (t, e, i) => {
            t.exports = function (t, e) {
                var i = (e = e || {}).oriented,
                r = e.heuristic;
                r || (r = s.heuristic);
                var h = e.distance;
                h || (h = s.distance);
                var l = o();
                return {
                    find: function (e, o) {
                        var c = t.getNode(e);
                        if (!c)
                            throw new Error("fromId is not defined in this graph: " + e);
                        var u = t.getNode(o);
                        if (!u)
                            throw new Error("toId is not defined in this graph: " + o);
                        if (c === u)
                            return [c];
                        l.reset();
                        var d = i ? function (t, e) {
                            if (1 === b) {
                                if (e.fromId === x.node.id)
                                    return T(t, e, x)
                            } else if (2 === b && e.toId === x.node.id)
                                return T(t, e, x)
                        }
                         : function (t, e) {
                            return T(t, e, x)
                        },
                        p = new Map,
                        f = new n({
                            compare: s.compareFScore,
                            setNodeId: s.setHeapIndex
                        }),
                        _ = new n({
                            compare: s.compareFScore,
                            setNodeId: s.setHeapIndex
                        }),
                        m = l.createNewState(c);
                        p.set(e, m),
                        m.fScore = r(c, u),
                        m.distanceToSource = 0,
                        f.push(m),
                        m.open = 1;
                        var g = l.createNewState(u);
                        g.fScore = r(u, c),
                        g.distanceToSource = 0,
                        _.push(g),
                        g.open = 2;
                        for (var v, y, L = Number.POSITIVE_INFINITY, w = f, b = 1; f.length > 0 && _.length > 0; ) {
                            f.length < _.length ? (b = 1, w = f) : (b = 2, w = _);
                            var x = w.pop();
                            if (x.closed = !0, !(x.distanceToSource > L) && (t.forEachLinkedNode(x.node.id, d), v && y))
                                return P(v, y)
                        }
                        return a;
                        function P(t, e) {
                            for (var i = [], n = t; n; )
                                i.push(n.node), n = n.parent;
                            for (var o = e; o; )
                                i.unshift(o.node), o = o.parent;
                            return i
                        }
                        function T(t, e, i) {
                            var n,
                            o = p.get(t.id);
                            if (o || (o = l.createNewState(t), p.set(t.id, o)), !o.closed)
                                if ((n = o.open) && n !== b) {
                                    var s = o.distanceToSource + i.distanceToSource;
                                    s < L && (v = o, y = i, L = s)
                                } else {
                                    var a = i.distanceToSource + h(o.node, i.node, e);
                                    if (!(a >= o.distanceToSource)) {
                                        var d = 1 === b ? u : c,
                                        f = a + r(o.node, d);
                                        f >= L || (o.fScore = f, 0 === o.open && (w.push(o), w.updateItem(o.heapIndex), o.open = b), o.parent = i, o.distanceToSource = a)
                                    }
                                }
                        }
                    }
                }
            };
            var n = i(392),
            o = i(212),
            r = i(338),
            s = i(410),
            a = s.NO_PATH;
            t.exports.l2 = r.l2,
            t.exports.l1 = r.l1
        },
        20: (t, e, i) => {
            t.exports = function (t, e) {
                var i = (e = e || {}).oriented,
                r = e.heuristic;
                r || (r = s.heuristic);
                var l = e.distance;
                l || (l = s.distance);
                var c = o();
                return {
                    find: function (e, o) {
                        var u = t.getNode(e);
                        if (!u)
                            throw new Error("fromId is not defined in this graph: " + e);
                        var d = t.getNode(o);
                        if (!d)
                            throw new Error("toId is not defined in this graph: " + o);
                        c.reset();
                        var p,
                        f,
                        _,
                        m = new Map,
                        g = new n({
                            compare: s.compareFScore,
                            setNodeId: s.setHeapIndex
                        }),
                        v = c.createNewState(u);
                        for (m.set(e, v), v.fScore = r(u, d), v.distanceToSource = 0, g.push(v), v.open = 1; g.length > 0; ) {
                            if (f = p = g.pop(), _ = d, f.node === _)
                                return h(p);
                            p.closed = !0,
                            t.forEachLinkedNode(p.node.id, y, i)
                        }
                        return a;
                        function y(t, e) {
                            var i = m.get(t.id);
                            if (i || (i = c.createNewState(t), m.set(t.id, i)), !i.closed) {
                                0 === i.open && (g.push(i), i.open = 1);
                                var n = p.distanceToSource + l(t, p.node, e);
                                n >= i.distanceToSource || (i.parent = p, i.distanceToSource = n, i.fScore = n + r(i.node, d), g.updateItem(i.heapIndex))
                            }
                        }
                    }
                }
            };
            var n = i(392),
            o = i(212),
            r = i(338),
            s = i(410),
            a = s.NO_PATH;
            function h(t) {
                for (var e = [t.node], i = t.parent; i; )
                    e.push(i.node), i = i.parent;
                return e
            }
            t.exports.l2 = r.l2,
            t.exports.l1 = r.l1
        },
        410: t => {
            var e = [];
            "function" == typeof Object.freeze && Object.freeze(e),
            t.exports = {
                heuristic: function () {
                    return 0
                },
                distance: function () {
                    return 1
                },
                compareFScore: function (t, e) {
                    return t.fScore - e.fScore
                },
                NO_PATH: e,
                setHeapIndex: function (t, e) {
                    t.heapIndex = e
                },
                setH1: function (t, e) {
                    t.h1 = e
                },
                setH2: function (t, e) {
                    t.h2 = e
                },
                compareF1Score: function (t, e) {
                    return t.f1 - e.f1
                },
                compareF2Score: function (t, e) {
                    return t.f2 - e.f2
                }
            }
        },
        338: t => {
            t.exports = {
                l2: function (t, e) {
                    var i = t.x - e.x,
                    n = t.y - e.y;
                    return Math.sqrt(i * i + n * n)
                },
                l1: function (t, e) {
                    var i = t.x - e.x,
                    n = t.y - e.y;
                    return Math.abs(i) + Math.abs(n)
                }
            }
        },
        212: t => {
            function e(t) {
                this.node = t,
                this.parent = null,
                this.closed = !1,
                this.open = 0,
                this.distanceToSource = Number.POSITIVE_INFINITY,
                this.fScore = Number.POSITIVE_INFINITY,
                this.heapIndex = -1
            }
            t.exports = function () {
                var t = 0,
                i = [];
                return {
                    createNewState: function (n) {
                        var o = i[t];
                        return o ? (o.node = n, o.parent = null, o.closed = !1, o.open = 0, o.distanceToSource = Number.POSITIVE_INFINITY, o.fScore = Number.POSITIVE_INFINITY, o.heapIndex = -1) : (o = new e(n), i[t] = o),
                        t++,
                        o
                    },
                    reset: function () {
                        t = 0
                    }
                }
            }
        },
        95: (t, e, i) => {
            t.exports = function (t, e) {
                var i = (e = e || {}).oriented,
                o = e.quitFast,
                h = e.heuristic;
                h || (h = r.heuristic);
                var l = e.distance;
                l || (l = r.distance);
                var c = s();
                return {
                    find: function (e, s) {
                        var u = t.getNode(e);
                        if (!u)
                            throw new Error("fromId is not defined in this graph: " + e);
                        var d = t.getNode(s);
                        if (!d)
                            throw new Error("toId is not defined in this graph: " + s);
                        c.reset();
                        var p,
                        f = i ? function (t, e) {
                            if (e.fromId === x.node.id)
                                return T(t, e)
                        }
                         : T,
                        _ = i ? function (t, e) {
                            if (e.toId === x.node.id)
                                return S(t, e)
                        }
                         : S,
                        m = new Map,
                        g = new n({
                            compare: r.compareF1Score,
                            setNodeId: r.setH1
                        }),
                        v = new n({
                            compare: r.compareF2Score,
                            setNodeId: r.setH2
                        }),
                        y = Number.POSITIVE_INFINITY,
                        L = c.createNewState(u);
                        m.set(e, L),
                        L.g1 = 0;
                        var w = h(u, d);
                        L.f1 = w,
                        g.push(L);
                        var b = c.createNewState(d);
                        m.set(s, b),
                        b.g2 = 0;
                        var x,
                        P = w;
                        for (b.f2 = P, v.push(b); v.length && g.length && (g.length < v.length ? (x = g.pop()).closed || (x.closed = !0, x.f1 < y && x.g1 + P - h(u, x.node) < y && t.forEachLinkedNode(x.node.id, f), g.length > 0 && (w = g.peek().f1)) : (x = v.pop()).closed || (x.closed = !0, x.f2 < y && x.g2 + w - h(x.node, d) < y && t.forEachLinkedNode(x.node.id, _), v.length > 0 && (P = v.peek().f2)), !o || !p); );
                        return function (t) {
                            if (!t)
                                return a;
                            for (var e = [t.node], i = t.p1; i; )
                                e.push(i.node), i = i.p1;
                            for (var n = t.p2; n; )
                                e.unshift(n.node), n = n.p2;
                            return e
                        }
                        (p);
                        function T(t, e) {
                            var i = m.get(t.id);
                            if (i || (i = c.createNewState(t), m.set(t.id, i)), !i.closed) {
                                var n = x.g1 + l(x.node, t, e);
                                n < i.g1 && (i.g1 = n, i.f1 = n + h(i.node, d), i.p1 = x, i.h1 < 0 ? g.push(i) : g.updateItem(i.h1));
                                var o = i.g1 + i.g2;
                                o < y && (y = o, p = i)
                            }
                        }
                        function S(t, e) {
                            var i = m.get(t.id);
                            if (i || (i = c.createNewState(t), m.set(t.id, i)), !i.closed) {
                                var n = x.g2 + l(x.node, t, e);
                                n < i.g2 && (i.g2 = n, i.f2 = n + h(u, i.node), i.p2 = x, i.h2 < 0 ? v.push(i) : v.updateItem(i.h2));
                                var o = i.g1 + i.g2;
                                o < y && (y = o, p = i)
                            }
                        }
                    }
                }
            };
            var n = i(392),
            o = i(338),
            r = i(410),
            s = i(262),
            a = r.NO_PATH;
            t.exports.l2 = o.l2,
            t.exports.l1 = o.l1
        },
        262: t => {
            function e(t) {
                this.node = t,
                this.p1 = null,
                this.p2 = null,
                this.closed = !1,
                this.g1 = Number.POSITIVE_INFINITY,
                this.g2 = Number.POSITIVE_INFINITY,
                this.f1 = Number.POSITIVE_INFINITY,
                this.f2 = Number.POSITIVE_INFINITY,
                this.h1 = -1,
                this.h2 = -1
            }
            t.exports = function () {
                var t = 0,
                i = [];
                return {
                    createNewState: function (n) {
                        var o = i[t];
                        return o ? (o.node = n, o.p1 = null, o.p2 = null, o.closed = !1, o.g1 = Number.POSITIVE_INFINITY, o.g2 = Number.POSITIVE_INFINITY, o.f1 = Number.POSITIVE_INFINITY, o.f2 = Number.POSITIVE_INFINITY, o.h1 = -1, o.h2 = -1) : (o = new e(n), i[t] = o),
                        t++,
                        o
                    },
                    reset: function () {
                        t = 0
                    }
                }
            }
        },
        320: (t, e, i) => {
            t.exports = {
                aStar: i(20),
                aGreedy: i(8),
                nba: i(95)
            }
        },
        261: () => {
            function t(e) {
                return t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                }
                 : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                },
                t(e)
            }
            function e(e, i) {
                for (var n = 0; n < i.length; n++) {
                    var o = i[n];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, (void 0, r = function (e, i) {
                            if ("object" !== t(e) || null === e)
                                return e;
                            var n = e[Symbol.toPrimitive];
                            if (void 0 !== n) {
                                var o = n.call(e, "string");
                                if ("object" !== t(o))
                                    return o;
                                throw new TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return String(e)
                        }
                            (o.key), "symbol" === t(r) ? r : String(r)), o)
                }
                var r
            }
            function i(t, e) {
                return i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
                    return t.__proto__ = e,
                    t
                },
                i(t, e)
            }
            function n(e, i) {
                if (i && ("object" === t(i) || "function" == typeof i))
                    return i;
                if (void 0 !== i)
                    throw new TypeError("Derived constructors may only return object or undefined");
                return o(e)
            }
            function o(t) {
                if (void 0 === t)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t
            }
            function r(t) {
                return r = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                },
                r(t)
            }
            function s(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var i = 0, n = new Array(e); i < e; i++)
                    n[i] = t[i];
                return n
            }
            var a = function (t) {
                !function (t, e) {
                    if ("function" != typeof e && null !== e)
                        throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    Object.defineProperty(t, "prototype", {
                        writable: !1
                    }),
                    e && i(t, e)
                }
                (u, L.Circle);
                var s,
                a,
                h,
                l,
                c = (h = u, l = function () {
                    if ("undefined" == typeof Reflect || !Reflect.construct)
                        return !1;
                    if (Reflect.construct.sham)
                        return !1;
                    if ("function" == typeof Proxy)
                        return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))),
                        !0
                    } catch (t) {
                        return !1
                    }
                }
                    (), function () {
                    var t,
                    e = r(h);
                    if (l) {
                        var i = r(this).constructor;
                        t = Reflect.construct(e, arguments, i)
                    } else
                        t = e.apply(this, arguments);
                    return n(this, t)
                });
                function u(t, e) {
                    var i;
                    return function (t, e) {
                        if (!(t instanceof e))
                            throw new TypeError("Cannot call a class as a function")
                    }
                    (this, u),
                    (i = c.call(this, t, e)).Island = null,
                    i.bindPopup = i.bindPopup.bind(o(i)),
                    i._popupMouseOut = i._popupMouseOut.bind(o(i)),
                    i._getParent = i._getParent.bind(o(i)),
                    i
                }
                return s = u,
                (a = [{
                            key: "bindPopup",
                            value: function (t, e) {
                                e && e.showOnMouseOver && (L.Marker.prototype.bindPopup.apply(this, [t, e]), this.off("click", this.openPopup, this), this.on("mouseover", (function (t) {
                                            var e = t.originalEvent.fromElement || t.originalEvent.relatedTarget;
                                            if (this._getParent(e, "leaflet-popup") == this._popup._container)
                                                return !0;
                                            this.openPopup()
                                        }), this), this.on("mouseout", (function (t) {
                                            var e = t.originalEvent.toElement || t.originalEvent.relatedTarget;
                                            if (this._getParent(e, "leaflet-popup"))
                                                return L.DomEvent.on(this._popup._container, "mouseout", this._popupMouseOut, this), !0;
                                            this.closePopup()
                                        }), this))
                            }
                        }, {
                            key: "_popupMouseOut",
                            value: function (t) {
                                L.DomEvent.off(this._popup, "mouseout", this._popupMouseOut, this);
                                var e = t.toElement || t.relatedTarget;
                                return !!this._getParent(e, "leaflet-popup") || e == this._path || void this.closePopup()
                            }
                        }, {
                            key: "_getParent",
                            value: function (t, e) {
                                if (null == t)
                                    return !1;
                                for (var i = t.parentNode; null != i; ) {
                                    if (i.className && L.DomUtil.hasClass(i, e))
                                        return i;
                                    i = i.parentNode
                                }
                                return !1
                            }
                        }
                    ]) && e(s.prototype, a),
                Object.defineProperty(s, "prototype", {
                    writable: !1
                }),
                u
            }
            (),
            h = new URLSearchParams(window.location.search),
            l = "";
            if (h.has("v")) {
                var c = h.get("v");
                /^[a-z0-9]{1,10}$/.test(c) && (l = "-" + c)
            }
            var u = "json/config.js";
            l && (u = "json" + l + "/config.js"),
            fetch(u).then((function (t) {
                    return t.json()
                })).then((function (t) {
                    t.version = l,
                    function (t) {
                        var e = {
                            maxZoom: 9,
                            maxNativeZoom: 6,
                            minZoom: 1,
                            bounds: L.latLngBounds([0, 0], [-256, 256]),
                            noWrap: !0
                        },
                        i = L.tileLayer("tiles" + t.version + "/{z}/{x}/{y}.png", e),
                        n = L.atlasmap("worldmap", {
                            config: t,
                            crs: L.CRS.Simple,
                            layers: [i],
                            zoomControl: !1,
                            attributionControl: !1
                        });
                        n._originalBounds = e.bounds,
                        fetch("json" + t.version + "/regions.json", {
                            dataType: "json"
                        }).then((function (t) {
                                return t.json()
                            })).then((function (t) {
                                n._regions = t
                            })),
                        L.control.zoom({
                            position: "topright"
                        }).addTo(n),
                        n.Grid = new L.AtlasGrid({
                            xticks: t.ServersX,
                            yticks: t.ServersY
                        }).addTo(n),
                        n.IslandTerritories = L.layerGroup(e),
                        n.IslandResources = L.layerGroup(e),
                        n.Discoveries = L.layerGroup(e),
                        n.Bosses = L.layerGroup(e),
                        n.ControlPoints = L.layerGroup(e),
                        n.Portals = L.layerGroup(e).addTo(n),
                        n.Altars = L.layerGroup(e),
                        n.Shops = L.layerGroup(e),
                        n.Ships = L.layerGroup(e),
                        n.TradeWinds = L.layerGroup(e),
                        n.Stones = L.layerGroup(e),
                        (new(L.Control.extend({
                                    onAdd: function () {
                                        var t = document.createElement("input");
                                        return t.id = "searchBox",
                                        t.onchange = function () {
                                            var t = document.getElementById("searchBox").value.toLowerCase(),
                                            e = !1;
                                            n.IslandResources.eachLayer((function (i) {
                                                    console.log(i),
                                                    "" !== t ? i.name.toLowerCase().includes(t) || i.animals.find((function (i) {
                                                            if (null !== i)
                                                                return i.toLowerCase() === t ? (e = !0, !0) : !e && i.toLowerCase().includes(t)
                                                        })) || i.resources.find((function (i) {
                                                            if (null !== i)
                                                                return i.toLowerCase() === t ? (e = !0, !0) : !e && i.toLowerCase().includes(t)
                                                        })) ? (i.setStyle({
                                                            radius: 1.5
                                                        }), L.DomUtil.addClass(i._path, "resource-found")) : (i.setStyle({
                                                            radius: 1.5
                                                        }), L.DomUtil.removeClass(i._path, "resource-found")) : (e = !1, i.setStyle({
                                                            radius: 1.5
                                                        }), L.DomUtil.removeClass(i._path, "resource-found"))
                                                }))
                                        },
                                        t
                                    }
                                }))).addTo(n),
                        L.control.layers({}, {
                            Grid: n.Grid,
                            Discoveries: n.Discoveries,
                            ControlPoints: n.ControlPoints,
                            Resources: n.IslandResources.addTo(n),
                            Portals: n.Portals,
                            Altars: n.Altars,
                            Bosses: n.Bosses,
                            Shops: n.Shops,
                            Ships: n.Ships,
                            TradeWinds: n.TradeWinds.addTo(n),
                            Stones: n.Stones
                        }, {
                            position: "topright"
                        }).addTo(n);
                        window.atlasGrid = n.Grid;
                        var o = {};
                        n.on("overlayadd", (function (t) {
                                o[t.name] = !0
                            })),
                        n.on("overlayremove", (function (t) {
                                o[t.name] = !1
                            })),
                        n.on("zoomend", (function () {
                                n.getZoom() < 5 ? (o.Bosses || n.removeLayer(n.Bosses), o.Stones || n.removeLayer(n.Stones), o.Shops || n.removeLayer(n.Shops)) : (o.Bosses || (n.addLayer(n.Bosses), o.Bosses = !1), o.Stones || (n.addLayer(n.Stones), o.Stones = !1), o.Shops || (n.addLayer(n.Shops), o.Shops = !1))
                            })),
                        n.setView([-128, 128], 2),
                        t.ItemLink && L.easyButton("<div>📝</div>", (function () {
                                var t = new URLSearchParams(window.location.search),
                                e = t.get("v");
                                e = null === e ? "" : parseInt(e) + 1,
                                window.open("items.html?v=" + t.get("v"), "_self")
                            })).addTo(n),
                        t.KofiLink && L.easyButton("<div>☕</div>", (function () {
                                window.open("https://ko-fi.com/antihax", "_blank")
                            })).addTo(n);
                        var r = L.icon({
                            iconUrl: "icons/Arrow.svg",
                            iconSize: [12, 12],
                            iconAnchor: [6, 6]
                        }),
                        h = L.icon({
                            iconUrl: "icons/Portal1.svg",
                            iconSize: [12, 12],
                            iconAnchor: [6, 6]
                        }),
                        l = L.icon({
                            iconUrl: "icons/Portal2.svg",
                            iconSize: [12, 12],
                            iconAnchor: [6, 6]
                        }),
                        c = L.icon({
                            iconUrl: "icons/Portal3.svg",
                            iconSize: [12, 12],
                            iconAnchor: [6, 6]
                        }),
                        u = L.icon({
                            iconUrl: "icons/Portal4.svg",
                            iconSize: [12, 12],
                            iconAnchor: [6, 6]
                        }),
                        d = L.icon({
                            iconUrl: "icons/lighthouse.svg",
                            iconSize: [12, 12],
                            iconAnchor: [6, 6]
                        }),
                        p = L.icon({
                            iconUrl: "icons/Hydra.svg",
                            iconSize: [32, 32],
                            iconAnchor: [16, 16]
                        }),
                        f = L.icon({
                            iconUrl: "icons/Boss.svg",
                            iconSize: [32, 32],
                            iconAnchor: [16, 16]
                        }),
                        _ = L.icon({
                            iconUrl: "icons/Shop.svg",
                            iconSize: [32, 32],
                            iconAnchor: [16, 16]
                        }),
                        m = L.icon({
                            iconUrl: "icons/Yeti.svg",
                            iconSize: [32, 32],
                            iconAnchor: [16, 16]
                        }),
                        g = L.icon({
                            iconUrl: "icons/Drake.svg",
                            iconSize: [32, 32],
                            iconAnchor: [16, 16]
                        }),
                        v = L.icon({
                            iconUrl: "icons/MeanWhale.svg",
                            iconSize: [32, 32],
                            iconAnchor: [16, 16]
                        }),
                        y = L.icon({
                            iconUrl: "icons/GentleWhale.svg",
                            iconSize: [32, 32],
                            iconAnchor: [16, 16]
                        }),
                        w = L.icon({
                            iconUrl: "icons/GiantSquid.svg",
                            iconSize: [32, 32],
                            iconAnchor: [16, 16]
                        }),
                        b = L.icon({
                            iconUrl: "icons/Altar.svg",
                            iconSize: [16, 16],
                            iconAnchor: [8, 8]
                        }),
                        x = L.icon({
                            iconUrl: "icons/SulfurPit.svg",
                            shadowUrl: "icons/Backdrop.svg",
                            shadowSize: [20, 20],
                            shadowAnchor: [10, 10],
                            iconSize: [16, 16],
                            iconAnchor: [8, 8]
                        }),
                        P = L.icon({
                            iconUrl: "icons/CursedAltar.svg",
                            shadowUrl: "icons/Backdrop.svg",
                            shadowSize: [20, 20],
                            shadowAnchor: [10, 10],
                            iconSize: [16, 16],
                            iconAnchor: [8, 8]
                        }),
                        T = L.icon({
                            iconUrl: "icons/LavaVent.svg",
                            shadowUrl: "icons/Backdrop.svg",
                            shadowSize: [20, 20],
                            shadowAnchor: [10, 10],
                            iconSize: [16, 16],
                            iconAnchor: [8, 8]
                        }),
                        S = L.icon({
                            iconUrl: "icons/Stone.svg",
                            iconSize: [32, 32],
                            iconAnchor: [16, 16]
                        });
                        fetch("json" + t.version + "/portals.json", {
                            dataType: "json"
                        }).then((function (t) {
                                return t.json()
                            })).then((function (t) {
                                t.forEach((function (t) {
                                        var e,
                                        i = null,
                                        o = h;
                                        switch (t.PathPortalType) {
                                        case 0:
                                            o = h;
                                            break;
                                        case 1:
                                            o = l;
                                            break;
                                        case 2:
                                            o = c;
                                            break;
                                        case 3:
                                            o = u
                                        }
                                        t.Nodes.forEach((function (t) {
                                                var r = n.addPortalPin(o, n.worldToLeaflet(t.worldX, t.worldY), t.PortalName);
                                                if (n.Portals.addLayer(r), void 0 === e)
                                                    e = t, r.lines = [], r.firstPin = r, i = r;
                                                else {
                                                    var s = L.polyline([n.worldToLeaflet(t.worldX, t.worldY), n.worldToLeaflet(e.worldX, e.worldY)], {
                                                        color: "red",
                                                        opacity: .01
                                                    });
                                                    i.lines.push(s),
                                                    r.firstPin = i,
                                                    n.Portals.addLayer(s)
                                                }
                                            }))
                                    }))
                            })).catch((function (t) {
                                console.log(t)
                            })),
                        fetch("json" + t.version + "/altars.json", {
                            dataType: "json"
                        }).then((function (t) {
                                return t.json()
                            })).then((function (t) {
                                t.forEach((function (t) {
                                        var e = {};
                                        (e = "Altar of the Damned" === t.name ? new L.Marker(n.GPStoLeaflet(t.long, t.lat), {
                                                icon: P
                                            }) : "Lava Vent" === t.name ? new L.Marker(n.GPStoLeaflet(t.long, t.lat), {
                                                icon: T
                                            }) : "Sulfur Pit" === t.name ? new L.Marker(n.GPStoLeaflet(t.long, t.lat), {
                                                icon: x
                                            }) : new L.Marker(n.GPStoLeaflet(t.long, t.lat), {
                                                icon: b
                                            })).bindPopup(t.name, {
                                            showOnMouseOver: !0,
                                            autoPan: !0,
                                            keepInView: !0
                                        }),
                                        n.Altars.addLayer(e)
                                    }))
                            })).catch((function (t) {
                                console.log(t)
                            })),
                        fetch("json" + t.version + "/bosses.json", {
                            dataType: "json"
                        }).then((function (t) {
                                return t.json()
                            })).then((function (t) {
                                t.forEach((function (t) {
                                        var e = {};
                                        (e = "Drake" === t.name ? new L.Marker(n.GPStoLeaflet(t.long, t.lat), {
                                                icon: g
                                            }) : "Hydra" === t.name ? new L.Marker(n.GPStoLeaflet(t.long, t.lat), {
                                                icon: p
                                            }) : "Yeti" === t.name ? new L.Marker(n.GPStoLeaflet(t.long, t.lat), {
                                                icon: m
                                            }) : "GiantSquid" === t.name ? new L.Marker(n.GPStoLeaflet(t.long, t.lat), {
                                                icon: w
                                            }) : "GentleWhale" === t.name ? new L.Marker(n.GPStoLeaflet(t.long, t.lat), {
                                                icon: y
                                            }) : "MeanWhale" === t.name ? new L.Marker(n.GPStoLeaflet(t.long, t.lat), {
                                                icon: v
                                            }) : new L.Marker(n.GPStoLeaflet(t.long, t.lat), {
                                                icon: f
                                            })) && (e.bindPopup("".concat(t.name, ": ").concat(t.long.toFixed(2), " / ").concat(t.lat.toFixed(2)), {
                                                showOnMouseOver: !0,
                                                autoPan: !0,
                                                keepInView: !0
                                            }), n.Bosses.addLayer(e))
                                    }))
                            })).catch((function (t) {
                                console.log(t)
                            })),
                        fetch("json" + t.version + "/stones.json", {
                            dataType: "json"
                        }).then((function (t) {
                                return t.json()
                            })).then((function (t) {
                                t.forEach((function (t) {
                                        var e = new L.Marker(n.GPStoLeaflet(t.long, t.lat), {
                                            icon: S
                                        });
                                        e.bindPopup("".concat(t.name, ": ").concat(t.long.toFixed(2), " / ").concat(t.lat.toFixed(2)), {
                                            showOnMouseOver: !0,
                                            autoPan: !0,
                                            keepInView: !0
                                        }),
                                        n.Stones.addLayer(e)
                                    }))
                            })).catch((function (t) {
                                console.log(t)
                            })),
                        fetch("json" + t.version + "/shipPaths.json", {
                            dataType: "json"
                        }).then((function (t) {
                                return t.json()
                            })).then((function (t) {
                                t.forEach((function (t) {
                                        var e = [],
                                        i = t.Nodes[0],
                                        o = [i.worldX, i.worldY],
                                        s = n.rotateVector2DAroundAxis([i.worldX - i.controlPointsDistance, i.worldY], o, i.rotation),
                                        a = n.rotateVector2DAroundAxis([i.worldX + i.controlPointsDistance, i.worldY], o, i.rotation);
                                        e.push("M", n.worldToLeaflet(i.worldX, i.worldY)),
                                        e.push("C", n.worldToLeafletArray(a), n.worldToLeafletArray(s), n.worldToLeafletArray(o)),
                                        t.Nodes.push(t.Nodes.shift());
                                        for (var h = 0; h < t.Nodes.length; h++) {
                                            var l = t.Nodes[h],
                                            c = [l.worldX, l.worldY],
                                            u = n.rotateVector2DAroundAxis([l.worldX - l.controlPointsDistance, l.worldY], c, l.rotation);
                                            e.push("S", n.worldToLeafletArray(u), n.worldToLeafletArray(c));
                                            var d = l.rotation + 90;
                                            t.reverseDir && (d += 180);
                                            var p = new L.Marker(n.worldToLeafletArray(c), {
                                                icon: r,
                                                rotationAngle: d
                                            });
                                            n.Ships.addLayer(p)
                                        }
                                        var f = "yellow",
                                        _ = .5;
                                        t.PathName.includes("Ghost") && (f = "darkred", _ = 1);
                                        var m = L.curve(e, {
                                            color: f,
                                            dashArray: "10",
                                            opacity: _
                                        });
                                        n.Ships.addLayer(m)
                                    }))
                            })).catch((function (t) {
                                console.log(t)
                            })),
                        fetch("json" + t.version + "/pveShops.json", {
                            dataType: "json"
                        }).then((function (t) {
                                return t.json()
                            })).then((function (t) {
                                t.forEach((function (t) {
                                        var e = new L.Marker(CheatToLeaflet(t.location), {
                                            icon: _
                                        });
                                        e && (e.bindPopup("".concat(t.name), {
                                                showOnMouseOver: !0,
                                                autoPan: !0,
                                                keepInView: !0
                                            }), n.Shops.addLayer(e))
                                    }))
                            })).catch((function (t) {
                                console.log(t)
                            })),
                        fetch("json" + t.version + "/tradeWinds.json", {
                            dataType: "json"
                        }).then((function (t) {
                                return t.json()
                            })).then((function (t) {
                                t.forEach((function (t) {
                                        var e = [],
                                        i = t.Nodes[0],
                                        o = [i.worldX, i.worldY],
                                        s = n.rotateVector2DAroundAxis([i.worldX - i.controlPointsDistance, i.worldY], o, i.rotation),
                                        a = n.rotateVector2DAroundAxis([i.worldX + i.controlPointsDistance, i.worldY], o, i.rotation);
                                        e.push("M", n.worldToLeaflet(i.worldX, i.worldY)),
                                        e.push("C", n.worldToLeafletArray(a), n.worldToLeafletArray(s), n.worldToLeafletArray(o));
                                        for (var h = 0; h < t.Nodes.length; h++) {
                                            var l = t.Nodes[h],
                                            c = [l.worldX, l.worldY],
                                            u = n.rotateVector2DAroundAxis([l.worldX - l.controlPointsDistance, l.worldY], c, l.rotation);
                                            e.push("S", n.worldToLeafletArray(u), n.worldToLeafletArray(c));
                                            var d = l.rotation + 90;
                                            t.reverseDir && (d += 180);
                                            var p = new L.Marker(n.worldToLeafletArray(c), {
                                                icon: r,
                                                rotationAngle: d
                                            });
                                            n.TradeWinds.addLayer(p)
                                        }
                                        var f = L.curve(e, {
                                            color: "white",
                                            dashArray: "10",
                                            opacity: .7
                                        });
                                        n.TradeWinds.addLayer(f)
                                    }))
                            })).catch((function (t) {
                                console.log(t)
                            })),
                        fetch("json" + t.version + "/islands.json", {
                            dataType: "json"
                        }).then((function (t) {
                                return t.json()
                            })).then((function (t) {
                                n._islands = t;
                                var e = function () {
                                    var e = t[i];
                                    if (e.isControlPoint) {
                                        var o = new L.Marker(n.worldToLeaflet(e.worldX, e.worldY), {
                                            icon: d
                                        });
                                        return o.bindPopup("Control Point", {
                                            showOnMouseOver: !0,
                                            autoPan: !0,
                                            keepInView: !0
                                        }),
                                        n.ControlPoints.addLayer(o),
                                        "continue"
                                    }
                                    if (e.animals || e.resources) {
                                        var r = new a(n.worldToLeaflet(e.worldX, e.worldY), {
                                            radius: 1.5,
                                            color: "#f00",
                                            opacity: 0,
                                            fillOpacity: 0
                                        });
                                        if (r.animals = [], r.resources = [], r.biomes = [], r.name = e.name, r.animals = e.animals.slice(), e.biomes) {
                                            var s = {};
                                            for (var h in e.biomes) {
                                                var l = e.biomes[h],
                                                c = l.name + l.temp[0] + l.temp[1];
                                                s[c] || l.name.includes("At Land") || l.name.includes("Ocean Water") || (s[c] = 1, r.biomes.push(e.biomes[h]))
                                            }
                                            r.biomes.sort()
                                        }
                                        var u = "<b>".concat(e.name, " - ").concat(e.id, "</b><br>");
                                        for (var p in r.biomes.sort()) {
                                            var f = r.biomes[p];
                                            u += "".concat(f.name, " [Min: ").concat(f.temp[0].toFixed(), "  Max: ").concat(f.temp[1].toFixed(), "]<br>")
                                        }
                                        for (var _ in u += "<ul class='split-ul'>", r.animals.sort())
                                            u += "<li>" + r.animals[_] + "</li>";
                                        if (u += "</ul>", e.resources) {
                                            for (var m in e.resources)
                                                m.length > 2 && r.resources.push(m);
                                            r.resources.sort(),
                                            u += "<ul class='split-ul'>",
                                            r.resources.forEach((function (t) {
                                                    u += "<li>" + t + " (" + e.resources[t] + ")</li>"
                                                })),
                                            u += "</ul>"
                                        }
                                        r.bindPopup(u, {
                                            showOnMouseOver: !0,
                                            autoPan: !1,
                                            keepInView: !0,
                                            maxWidth: 560
                                        }),
                                        n.IslandResources.addLayer(r)
                                    }
                                    if (e.discoveries)
                                        for (var g in e.discoveries) {
                                            var v = e.discoveries[g],
                                            y = new a(n.GPStoLeaflet(v.long, v.lat), {
                                                radius: .05,
                                                color: "#000000",
                                                opacity: .5,
                                                fillOpacity: .5
                                            });
                                            y.disco = v,
                                            y.bindPopup("".concat(v.name, ": ").concat(v.long.toFixed(2), " / ").concat(v.lat.toFixed(2)), {
                                                showOnMouseOver: !0,
                                                autoPan: !1,
                                                keepInView: !0
                                            }),
                                            n.Discoveries.addLayer(y)
                                        }
                                };
                                for (var i in t)
                                    e()
                            })).catch((function (t) {
                                console.log(t)
                            })),
                        L.Control.MousePosition = L.Control.extend({
                            options: {
                                position: "bottomleft",
                                separator: " : ",
                                emptyString: "Unavailable",
                                lngFirst: !1,
                                numDigits: 5,
                                lngFormatter: void 0,
                                latFormatter: void 0,
                                prefix: ""
                            },
                            onAdd: function (t) {
                                return this._container = L.DomUtil.create("div", "leaflet-control-mouseposition"),
                                L.DomEvent.disableClickPropagation(this._container),
                                t.on("mousemove", this._onMouseMove, this),
                                this._container.innerHTML = this.options.emptyString,
                                this._container
                            },
                            onRemove: function (t) {
                                t.off("mousemove", this._onMouseMove)
                            },
                            scaleLeafletToAtlas: function (t) {
                                return t / 1.28
                            },
                            _onMouseMove: function (e) {
                                var i = L.Util.formatNum(this.scaleLeafletToAtlas(e.latlng.lng) / t.YScale - t.GPSBounds.min[1], 2),
                                o = L.Util.formatNum(this.scaleLeafletToAtlas(e.latlng.lat) / t.XScale - t.GPSBounds.min[0], 2),
                                r = i + this.options.separator + o,
                                a = Math.floor(e.latlng.lng / (256 / t.ServersX)),
                                h = Math.floor(-e.latlng.lat / (256 / t.ServersY));
                                n._regions && a >= 0 && h >= 0 && a < t.ServersX && h < t.ServersY && Object.entries(n._regions).forEach((function (t) {
                                        var e,
                                        i,
                                        n = (i = 2, function (t) {
                                            if (Array.isArray(t))
                                                return t
                                        }
                                            (e = t) || function (t, e) {
                                            var i = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                                            if (null != i) {
                                                var n,
                                                o,
                                                r,
                                                s,
                                                a = [],
                                                h = !0,
                                                l = !1;
                                                try {
                                                    if (r = (i = i.call(t)).next, 0 === e) {
                                                        if (Object(i) !== i)
                                                            return;
                                                        h = !1
                                                    } else
                                                        for (; !(h = (n = r.call(i)).done) && (a.push(n.value), a.length !== e); h = !0);
                                                } catch (t) {
                                                    l = !0,
                                                    o = t
                                                } finally {
                                                    try {
                                                        if (!h && null != i.return && (s = i.return(), Object(s) !== s))
                                                            return
                                                    } finally {
                                                        if (l)
                                                            throw o
                                                    }
                                                }
                                                return a
                                            }
                                        }
                                            (e, i) || function (t, e) {
                                            if (t) {
                                                if ("string" == typeof t)
                                                    return s(t, e);
                                                var i = Object.prototype.toString.call(t).slice(8, -1);
                                                return "Object" === i && t.constructor && (i = t.constructor.name),
                                                "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? s(t, e) : void 0
                                            }
                                        }
                                            (e, i) || function () {
                                            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                                        }
                                            ()),
                                        o = n[0],
                                        l = n[1];
                                        a >= l.MinX && a <= l.MaxX && h >= l.MinY && h <= l.MaxY && "undefined" !== o && (r += " " + o)
                                    })),
                                this._container.innerHTML = r
                            }
                        }),
                        L.Control.TeleportPosition = L.Control.extend({
                            options: {
                                position: "bottomright",
                                separator: " : ",
                                emptyString: "Click map for TP command",
                                lngFirst: !1,
                                numDigits: 5,
                                lngFormatter: void 0,
                                latFormatter: void 0,
                                prefix: ""
                            },
                            onAdd: function (t) {
                                return this._container = L.DomUtil.create("div", "leaflet-control-mouseposition"),
                                L.DomEvent.disableClickPropagation(this._container),
                                t.on("click", this._onMouseClick, this),
                                this._container.innerHTML = this.options.emptyString,
                                this._container
                            },
                            onRemove: function (t) {
                                t.off("click", this._onMouseClick)
                            },
                            _onMouseClick: function (t) {
                                var e = this._map.ccc(t.latlng.lng, -t.latlng.lat),
                                i = "cheat TP ".concat(e[0], " ").concat(e[1], " ").concat(e[2], " 10000");
                                this._container.innerHTML = i
                            }
                        }),
                        L.Map.mergeOptions({
                            positionControl: !1
                        }),
                        L.Map.addInitHook((function () {
                                this.options.positionControl && (this.positionControl = new L.Control.MousePosition, this.addControl(this.positionControl), this.teleportControl = new L.Control.TeleportPosition, this.addControl(this.teleportControl))
                            })),
                        L.control.mousePosition = function (t) {
                            return new L.Control.MousePosition(t)
                        },
                        L.control.mousePosition().addTo(n),
                        L.control.teleportPosition = function (t) {
                            return new L.Control.TeleportPosition(t)
                        },
                        L.control.teleportPosition().addTo(n)
                    }
                    (t)
                }))
        },
        738: () => {
            L.Control.AccountService = L.Control.extend({
                options: {
                    position: "topleft"
                },
                _icons_src: {
                    Bed: "Item_SimpleBed_Icon",
                    Broadsider: "ICON_Broadsider",
                    Carrack: "ICON_Carrack",
                    Cog: "ICON_Cog",
                    Brigantine: "Item_BrigHull_Icon",
                    Harrier: "ICON_Harrier",
                    Kraken: "KrakenShipNewIcon",
                    Turtle: "Turtleship_Icon",
                    MortarShip: "Mortarship_Icon",
                    Ramming_Galley: "Galley_Icon",
                    Galleon: "Item_GalleonHull_Icon",
                    Raft: "Item_Raft_Icon",
                    Schooner: "Item_SchoonerHull_Icon",
                    Sloop: "Item_SloopHull_Icon",
                    Sloop_FromNPC: "Item_SloopHull_Icon",
                    Submarine: "Item_Submarine_Icon",
                    TrampFreighter: "ICON_Tramp_Freighter",
                    TurtleShip: "Turtleship_Icon"
                },
                _icons: {},
                _ships: {},
                _eventSource: {},
                initialize: function (t) {
                    for (var e in L.Util.setOptions(this, t), this._icons_src)
                        this._icons[e] = L.icon({
                            iconUrl: "/atlasIcons/entities/" + this._icons_src[e] + "_32.png",
                            iconSize: [30, 30],
                            iconAnchor: [15, 15],
                            popupAnchor: [0, -15]
                        });
                    this._icons.dead = L.icon({
                        iconUrl: "/atlasIcons/entities/sunk.png",
                        iconSize: [30, 30],
                        iconAnchor: [15, 15],
                        popupAnchor: [0, -15]
                    })
                },
                onAdd: function (t) {
                    var e = this,
                    i = L.DomUtil.create("div", "leaflet-control-zoom leaflet-bar leaflet-control");
                    return this._map = t,
                    this._config = t.options.config,
                    fetch(this._config.AtlasMapServer + "/s/account", {
                        dataType: "json"
                    }).then((function (n) {
                            n.json().then((function (n) {
                                    e._createButton('<img src="icons/logout.svg" height=30 width=30>', "logout", "leaflet-control-pin leaflet-bar-part leaflet-bar-part-top-and-bottom", i, e._logout, e),
                                    e._startEventListener(t)
                                })).catch((function (t) {
                                    e._createButton('<img src="icons/steam.svg" height=30 width=30>', "Login with Steam", "leaflet-control-pin leaflet-bar-part leaflet-bar-part-top-and-bottom", i, e._login, e)
                                }))
                        })).catch((function (t) {
                            console.log("backend unavailable; not enabling login", t)
                        })),
                    i
                },
                onRemove: function (t) {},
                _startEventListener: function (t) {
                    var e = this;
                    this._eventSource = new EventSource(this._config.AtlasMapServer + "/s/events"),
                    this._eventSource.onmessage = function (t) {
                        var i = JSON.parse(t.data);
                        void 0 !== i.EntityType && e._processEntity(i)
                    }
                },
                _processEntity: function (t) {
                    switch (t.EntityType) {
                    case "Ship":
                    case "ETribeEntityType::Ship":
                    case "Bed":
                    case "ETribeEntityType::Bed":
                        this._trackShip(t)
                    }
                },
                _trackShip: function (t) {
                    if (0 === t.ParentEntityID) {
                        var e = 5e3,
                        i = t.ServerID >> 16,
                        n = 65535 & t.ServerID,
                        o = this._map.options.config.GridSize * t.X + this._map.options.config.GridSize * i,
                        r = this._map.options.config.GridSize * t.Y + this._map.options.config.GridSize * n,
                        s = this._map.worldToLeaflet(o, r),
                        a = this._ships[t.EntityID];
                        void 0 === a && (void 0 !== this._icons[t.ShipType] ? a = L.Marker.movingMarker([s], [e], {
                                icon: t.IsDead ? this._icons.dead : this._icons[t.ShipType],
                                title: t.EntityName
                            }).addTo(this._map) : 0 === t.ParentEntityID && (a = L.Marker.movingMarker([s], [e], {
                                        icon: "Bed" === t.EntityType ? this._icons.Bed : null,
                                        title: t.EntityName
                                    }).addTo(this._map))),
                        a.addLatLng(s, e),
                        a.start(),
                        this._ships[t.EntityID] = a
                    }
                },
                _login: function () {
                    window.location = this._config.AtlasMapServer + "/login"
                },
                _logout: function () {
                    window.location = this._config.AtlasMapServer + "/logout"
                },
                _createButton: function (t, e, i, n, o, r) {
                    var s = L.DomUtil.create("a", i, n);
                    return s.innerHTML = t,
                    s.href = "#",
                    s.title = e,
                    L.DomEvent.on(s, "click", L.DomEvent.stopPropagation).on(s, "click", L.DomEvent.preventDefault).on(s, "click", o, r).on(s, "dbclick", L.DomEvent.stopPropagation),
                    s
                },
                draw: function (t) {
                    return this
                }
            }),
            L.control.accountControl = function (t) {
                return new L.Control.AccountService(t)
            },
            L.Map.addInitHook((function () {
                    this.options.config.AtlasMapServer && (this.accountControl = new L.Control.AccountService, this.accountControl, this.addControl(this.accountControl))
                }))
        },
        566: () => {
            function t(t) {
                for (var e in t) {
                    if (t[e].includes(" Ocean Water"))
                        return t[e].replace(" Ocean Water", "");
                    var i = t[e];
                    if (i = (i = (i = (i = (i = (i = (i = (i = (i = i.replace("Western ", "")).replace("Eastern ", "")).replace("Central ", "")).replace("At Land", "")).replace("Ocean Water", "")).replace(" Mountain Peak", "")).replace("High ", "")).replace("Low ", "")).trim())
                        return i
                }
                return !1
            }
            L.AtlasGrid = L.LayerGroup.extend({
                options: {
                    xticks: 2,
                    yticks: 3,
                    grids: [],
                    lineStyle: {
                        stroke: !0,
                        color: "#111",
                        opacity: .2,
                        weight: 1
                    }
                },
                initialize: function (t) {
                    L.LayerGroup.prototype.initialize.call(this),
                    L.Util.setOptions(this, t)
                },
                onAdd: function (t) {
                    console.log("AtlasGrid onAdd called");
                    var e = this;
                    this._map = t;

                    // 1. Fetch server status once and store it
                    this.serverStatusMap = {};
                    fetch('https://raw.githubusercontent.com/Mike100911/ATLASMap/active/docs/server_status.json')
                        .then(res => res.json())
                        .then(statusList => {
                            statusList.forEach(server => {
                                // Assuming server.Name matches grid label (e.g., "A1")
                                this.serverStatusMap[server.Name] = server.State;
                            });
                            // Force a redraw to ensure headers are present and colored
                            if (this._lastDrawData) {
                                this.draw(this._lastDrawData);
                            }
                        });

                    // 2. Function to update grid header colors
                    this.updateGridHeaderColors = function() {
                        var headers = document.querySelectorAll('.leaflet-grid-header');
                        if (headers) {
                            for (var n = 0; n < headers.length; ++n) {
                                var gridName = headers[n].textContent.trim();
                                // Only set to green if online
                                var matchKey = Object.keys(this.serverStatusMap).find(
                                    k => k.startsWith(gridName + ' ') || k === gridName
                                );
                                var state = matchKey !== undefined ? this.serverStatusMap[matchKey] : undefined;
                                if (state && state.trim().toLowerCase() === 'online') {
                                    headers[n].style.color = 'rgb(0, 255, 0)';
                                }
                            }
                        }
                    }.bind(this);

                    // 3. Update font size and color on zoom
                    t.on("zoomend", () => {
                        var headers = document.querySelectorAll('.leaflet-grid-header');
                        if (headers) {
                            for (var n = 0; n < headers.length; ++n) {
                                headers[n].style.fontSize = (7 + 2.5 * t.getZoom()) + "px";
                            }
                        }
                        this.updateGridHeaderColors();
                    });

                    var i = t._originalBounds;
                    this._xTickSize = (i.getEast() - i.getWest()) / this.options.xticks,
                    this._yTickSize = (i.getSouth() - i.getNorth()) / this.options.yticks,
                    this.eachLayer(t.addLayer, t),
                    fetch("json" + t.options.config.version + "/gridList.json", {
                        dataType: "json"
                    }).then((function (t) {
                            return t.json()
                        })).then((function (t) {
                            e.draw(t)
                        })).catch((function (t) {
                            console.log(t)
                        }))
                },
                onRemove: function () {
                    this.eachLayer(this.removeLayer, this)
                },
                _getGridBoarderOverridePosition: function (t, e, i) {
                    if (null !== e[0] && 0 !== e.reduce((function (t, e) {
                                return t + e
                            }), 2)) {
                        var n = L.icon({
                            iconUrl: "icons/Arrow2.svg",
                            iconSize: [8, 8],
                            iconAnchor: [4, 0]
                        }),
                        o = this._xTickSize * e[0] + this._xTickSize / 2,
                        r = this._yTickSize * e[1] + this._yTickSize / 2;
                        this._drawGridBorderPin(t[0], t[1], o, r, n, "Grid Transfer", i)
                    }
                },
                _drawGridBoarderOverrides: function (t, e, i) {
                    this._getGridBoarderOverridePosition([this._xTickSize * (t + 1), this._yTickSize * e + this._yTickSize / 2], i.DestEast, 90),
                    this._getGridBoarderOverridePosition([this._xTickSize * t, this._yTickSize * e + this._yTickSize / 2], i.DestWest, 270),
                    this._getGridBoarderOverridePosition([this._xTickSize * t + this._xTickSize / 2, this._yTickSize * e], i.DestNorth, 0),
                    this._getGridBoarderOverridePosition([this._xTickSize * t + this._xTickSize / 2, this._yTickSize * (e + 1)], i.DestSouth, 180)
                },
                _drawGridBorderPin: function (t, e, i, n, o, r, s) {
                    var a = this._map.addPortalPin(o, [e, t], r, s);
                    this._map.Portals.addLayer(a);
                    var h = L.polyline([[e, t], [n, i]], {
                        color: "red",
                        opacity: .01
                    });
                    a.lines = [h],
                    a.firstPin = a,
                    this._map.Portals.addLayer(h)
                },
                draw: function (e) {
                    this._lastDrawData = e;
                    for (var i = this._map._originalBounds, n = 0; n < this.options.xticks + 1; n++)
                        this.addLayer(new L.Polyline([[i.getNorth(), i.getWest() + this._xTickSize * n], [i.getSouth(), i.getWest() + this._xTickSize * n]], this.options.lineStyle));
                    for (var o = 0; o < this.options.yticks + 1; o++)
                        this.addLayer(new L.Polyline([[i.getNorth() + this._yTickSize * o, i.getWest()], [i.getNorth() + this._yTickSize * o, i.getEast()]], this.options.lineStyle));
                    for (var r = 0; r < this.options.xticks; r++)
                        for (var s = 0; s < this.options.yticks; s++) {
                            var a = String.fromCharCode(65 + r) + (s + 1);
                            this._drawGridBoarderOverrides(r, s, e[a]);
                            var h = "",
                            l = "Lawless";
                            switch (e[a].forceServerRules) {
                            case 1:
                                h = "",
                                l = "Lawless";
                                break;
                            case 2:
                                h = "&#9760;",
                                l = "Claimable";
                                break;
                            case 3:
                                h = "&#9813;",
                                l = "Settlements";
                                break;
                            case 4:
                                h = "&#9774;",
                                l = "Freeport";
                                break;
                            case 5:
                                h = "&#9774;",
                                l = "Golden Age"
                            }
                            var c = '<div><div class="leaflet-grid-header">'.concat(a, '</div> <div class="leaflet-grid-header leaflet-grid-icon">').concat(h, "</div>"),
                            u = L.marker([i.getWest() + this._yTickSize * s, i.getNorth() + this._xTickSize * r], {
                                icon: L.divIcon({
                                    className: "leaflet-grid-marker",
                                    iconAnchor: [-2, -2]
                                }),
                                title: "".concat(t(e[a].biomes), " ").concat(l),
                                clickable: !1
                            });
                            this.addLayer(u),
                            u._icon.innerHTML = c
                        }
                        if (typeof this.updateGridHeaderColors === "function") {
                            this.updateGridHeaderColors();
                        }
                    return this
                }
            }),
            L.atlasgrid = function (t) {
                return new L.Grid(t)
            }
        },
        936: () => {
            function t(e) {
                return t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                }
                 : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                },
                t(e)
            }
            function e(t, e) {
                return function (t) {
                    if (Array.isArray(t))
                        return t
                }
                (t) || function (t, e) {
                    var i = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                    if (null != i) {
                        var n,
                        o,
                        r,
                        s,
                        a = [],
                        h = !0,
                        l = !1;
                        try {
                            if (r = (i = i.call(t)).next, 0 === e) {
                                if (Object(i) !== i)
                                    return;
                                h = !1
                            } else
                                for (; !(h = (n = r.call(i)).done) && (a.push(n.value), a.length !== e); h = !0);
                        } catch (t) {
                            l = !0,
                            o = t
                        } finally {
                            try {
                                if (!h && null != i.return && (s = i.return(), Object(s) !== s))
                                    return
                            } finally {
                                if (l)
                                    throw o
                            }
                        }
                        return a
                    }
                }
                (t, e) || function (t, e) {
                    if (t) {
                        if ("string" == typeof t)
                            return i(t, e);
                        var n = Object.prototype.toString.call(t).slice(8, -1);
                        return "Object" === n && t.constructor && (n = t.constructor.name),
                        "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? i(t, e) : void 0
                    }
                }
                (t, e) || function () {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }
                ()
            }
            function i(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var i = 0, n = new Array(e); i < e; i++)
                    n[i] = t[i];
                return n
            }
            function n() {
                "use strict";
                n = function () {
                    return e
                };
                var e = {},
                i = Object.prototype,
                o = i.hasOwnProperty,
                r = Object.defineProperty || function (t, e, i) {
                    t[e] = i.value
                },
                s = "function" == typeof Symbol ? Symbol : {},
                a = s.iterator || "@@iterator",
                h = s.asyncIterator || "@@asyncIterator",
                l = s.toStringTag || "@@toStringTag";
                function c(t, e, i) {
                    return Object.defineProperty(t, e, {
                        value: i,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }),
                    t[e]
                }
                try {
                    c({}, "")
                } catch (t) {
                    c = function (t, e, i) {
                        return t[e] = i
                    }
                }
                function u(t, e, i, n) {
                    var o = e && e.prototype instanceof f ? e : f,
                    s = Object.create(o.prototype),
                    a = new k(n || []);
                    return r(s, "_invoke", {
                        value: x(t, i, a)
                    }),
                    s
                }
                function d(t, e, i) {
                    try {
                        return {
                            type: "normal",
                            arg: t.call(e, i)
                        }
                    } catch (t) {
                        return {
                            type: "throw",
                            arg: t
                        }
                    }
                }
                e.wrap = u;
                var p = {};
                function f() {}
                function _() {}
                function m() {}
                var g = {};
                c(g, a, (function () {
                        return this
                    }));
                var v = Object.getPrototypeOf,
                y = v && v(v(M([])));
                y && y !== i && o.call(y, a) && (g = y);
                var L = m.prototype = f.prototype = Object.create(g);
                function w(t) {
                    ["next", "throw", "return"].forEach((function (e) {
                            c(t, e, (function (t) {
                                    return this._invoke(e, t)
                                }))
                        }))
                }
                function b(e, i) {
                    function n(r, s, a, h) {
                        var l = d(e[r], e, s);
                        if ("throw" !== l.type) {
                            var c = l.arg,
                            u = c.value;
                            return u && "object" == t(u) && o.call(u, "__await") ? i.resolve(u.__await).then((function (t) {
                                    n("next", t, a, h)
                                }), (function (t) {
                                    n("throw", t, a, h)
                                })) : i.resolve(u).then((function (t) {
                                    c.value = t,
                                    a(c)
                                }), (function (t) {
                                    return n("throw", t, a, h)
                                }))
                        }
                        h(l.arg)
                    }
                    var s;
                    r(this, "_invoke", {
                        value: function (t, e) {
                            function o() {
                                return new i((function (i, o) {
                                        n(t, e, i, o)
                                    }))
                            }
                            return s = s ? s.then(o, o) : o()
                        }
                    })
                }
                function x(t, e, i) {
                    var n = "suspendedStart";
                    return function (o, r) {
                        if ("executing" === n)
                            throw new Error("Generator is already running");
                        if ("completed" === n) {
                            if ("throw" === o)
                                throw r;
                            return {
                                value: void 0,
                                done: !0
                            }
                        }
                        for (i.method = o, i.arg = r; ; ) {
                            var s = i.delegate;
                            if (s) {
                                var a = P(s, i);
                                if (a) {
                                    if (a === p)
                                        continue;
                                    return a
                                }
                            }
                            if ("next" === i.method)
                                i.sent = i._sent = i.arg;
                            else if ("throw" === i.method) {
                                if ("suspendedStart" === n)
                                    throw n = "completed", i.arg;
                                i.dispatchException(i.arg)
                            } else
                                "return" === i.method && i.abrupt("return", i.arg);
                            n = "executing";
                            var h = d(t, e, i);
                            if ("normal" === h.type) {
                                if (n = i.done ? "completed" : "suspendedYield", h.arg === p)
                                    continue;
                                return {
                                    value: h.arg,
                                    done: i.done
                                }
                            }
                            "throw" === h.type && (n = "completed", i.method = "throw", i.arg = h.arg)
                        }
                    }
                }
                function P(t, e) {
                    var i = e.method,
                    n = t.iterator[i];
                    if (void 0 === n)
                        return e.delegate = null, "throw" === i && t.iterator.return && (e.method = "return", e.arg = void 0, P(t, e), "throw" === e.method) || "return" !== i && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + i + "' method")), p;
                    var o = d(n, t.iterator, e.arg);
                    if ("throw" === o.type)
                        return e.method = "throw", e.arg = o.arg, e.delegate = null, p;
                    var r = o.arg;
                    return r ? r.done ? (e[t.resultName] = r.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, p) : r : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, p)
                }
                function T(t) {
                    var e = {
                        tryLoc: t[0]
                    };
                    1 in t && (e.catchLoc = t[1]),
                    2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]),
                    this.tryEntries.push(e)
                }
                function S(t) {
                    var e = t.completion || {};
                    e.type = "normal",
                    delete e.arg,
                    t.completion = e
                }
                function k(t) {
                    this.tryEntries = [{
                            tryLoc: "root"
                        }
                    ],
                    t.forEach(T, this),
                    this.reset(!0)
                }
                function M(t) {
                    if (t) {
                        var e = t[a];
                        if (e)
                            return e.call(t);
                        if ("function" == typeof t.next)
                            return t;
                        if (!isNaN(t.length)) {
                            var i = -1,
                            n = function e() {
                                for (; ++i < t.length; )
                                    if (o.call(t, i))
                                        return e.value = t[i], e.done = !1, e;
                                return e.value = void 0,
                                e.done = !0,
                                e
                            };
                            return n.next = n
                        }
                    }
                    return {
                        next: C
                    }
                }
                function C() {
                    return {
                        value: void 0,
                        done: !0
                    }
                }
                return _.prototype = m,
                r(L, "constructor", {
                    value: m,
                    configurable: !0
                }),
                r(m, "constructor", {
                    value: _,
                    configurable: !0
                }),
                _.displayName = c(m, l, "GeneratorFunction"),
                e.isGeneratorFunction = function (t) {
                    var e = "function" == typeof t && t.constructor;
                    return !!e && (e === _ || "GeneratorFunction" === (e.displayName || e.name))
                },
                e.mark = function (t) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(t, m) : (t.__proto__ = m, c(t, l, "GeneratorFunction")),
                    t.prototype = Object.create(L),
                    t
                },
                e.awrap = function (t) {
                    return {
                        __await: t
                    }
                },
                w(b.prototype),
                c(b.prototype, h, (function () {
                        return this
                    })),
                e.AsyncIterator = b,
                e.async = function (t, i, n, o, r) {
                    void 0 === r && (r = Promise);
                    var s = new b(u(t, i, n, o), r);
                    return e.isGeneratorFunction(i) ? s : s.next().then((function (t) {
                            return t.done ? t.value : s.next()
                        }))
                },
                w(L),
                c(L, l, "Generator"),
                c(L, a, (function () {
                        return this
                    })),
                c(L, "toString", (function () {
                        return "[object Generator]"
                    })),
                e.keys = function (t) {
                    var e = Object(t),
                    i = [];
                    for (var n in e)
                        i.push(n);
                    return i.reverse(),
                    function t() {
                        for (; i.length; ) {
                            var n = i.pop();
                            if (n in e)
                                return t.value = n, t.done = !1, t
                        }
                        return t.done = !0,
                        t
                    }
                },
                e.values = M,
                k.prototype = {
                    constructor: k,
                    reset: function (t) {
                        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(S), !t)
                            for (var e in this)
                                "t" === e.charAt(0) && o.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0)
                    },
                    stop: function () {
                        this.done = !0;
                        var t = this.tryEntries[0].completion;
                        if ("throw" === t.type)
                            throw t.arg;
                        return this.rval
                    },
                    dispatchException: function (t) {
                        if (this.done)
                            throw t;
                        var e = this;
                        function i(i, n) {
                            return s.type = "throw",
                            s.arg = t,
                            e.next = i,
                            n && (e.method = "next", e.arg = void 0),
                            !!n
                        }
                        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                            var r = this.tryEntries[n],
                            s = r.completion;
                            if ("root" === r.tryLoc)
                                return i("end");
                            if (r.tryLoc <= this.prev) {
                                var a = o.call(r, "catchLoc"),
                                h = o.call(r, "finallyLoc");
                                if (a && h) {
                                    if (this.prev < r.catchLoc)
                                        return i(r.catchLoc, !0);
                                    if (this.prev < r.finallyLoc)
                                        return i(r.finallyLoc)
                                } else if (a) {
                                    if (this.prev < r.catchLoc)
                                        return i(r.catchLoc, !0)
                                } else {
                                    if (!h)
                                        throw new Error("try statement without catch or finally");
                                    if (this.prev < r.finallyLoc)
                                        return i(r.finallyLoc)
                                }
                            }
                        }
                    },
                    abrupt: function (t, e) {
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                            var n = this.tryEntries[i];
                            if (n.tryLoc <= this.prev && o.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                                var r = n;
                                break
                            }
                        }
                        r && ("break" === t || "continue" === t) && r.tryLoc <= e && e <= r.finallyLoc && (r = null);
                        var s = r ? r.completion : {};
                        return s.type = t,
                        s.arg = e,
                        r ? (this.method = "next", this.next = r.finallyLoc, p) : this.complete(s)
                    },
                    complete: function (t, e) {
                        if ("throw" === t.type)
                            throw t.arg;
                        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e),
                        p
                    },
                    finish: function (t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var i = this.tryEntries[e];
                            if (i.finallyLoc === t)
                                return this.complete(i.completion, i.afterLoc), S(i), p
                        }
                    },
                    catch : function (t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var i = this.tryEntries[e];
                            if (i.tryLoc === t) {
                                var n = i.completion;
                                if ("throw" === n.type) {
                                    var o = n.arg;
                                    S(i)
                                }
                                return o
                            }
                        }
                        throw new Error("illegal catch attempt")
                    },
                delegateYield: function (t, e, i) {
                    return this.delegate = {
                        iterator: M(t),
                        resultName: e,
                        nextLoc: i
                    },
                    "next" === this.method && (this.arg = void 0),
                    p
                }
            },
            e
        }
        function o(t, e, i, n, o, r, s) {
            try {
                var a = t[r](s),
                h = a.value
            } catch (t) {
                return void i(t)
            }
            a.done ? e(h) : Promise.resolve(h).then(n, o)
        }
        var r,
        s;
        L.AtlasMap = L.Map.extend({
            initialize: (r = n().mark((function t(e, i) {
                            return n().wrap((function (t) {
                                    for (; ; )
                                        switch (t.prev = t.next) {
                                        case 0:
                                            return i = L.extend(i || {}, {}),
                                            t.abrupt("return", L.Map.prototype.initialize.call(this, e, i));
                                        case 2:
                                        case "end":
                                            return t.stop()
                                        }
                                }), t, this)
                        })), s = function () {
                var t = this,
                e = arguments;
                return new Promise((function (i, n) {
                        var s = r.apply(t, e);
                        function a(t) {
                            o(s, i, n, a, h, "next", t)
                        }
                        function h(t) {
                            o(s, i, n, a, h, "throw", t)
                        }
                        a(void 0)
                    }))
            }, function (t, e) {
                return s.apply(this, arguments)
            }),
            ccc: function (t, e) {
                var i = 256 / this.options.config.ServersX;
                return [["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"][Math.floor(t / i)] + (Math.floor(e / i) + 1), this.constraintInv(t % i, 0, i, -7e5, 7e5).toFixed(0), this.constraintInv(e % i, 0, i, -7e5, 7e5).toFixed(0)]
            },
            gridStringToIntegers: function (t) {
                return [t.toLowerCase().charCodeAt(0) - 97, parseInt(t.substring(1) - 1)]
            },
            worldToLeaflet: function (t, e) {
                var i = this.options.config,
                n = i.GridSize * i.ServersX;
                return [-e / (i.GridSize * i.ServersY) * 256, t / n * 256]
            },
            GPStoLeaflet: function (t, e) {
                var i = this.options.config;
                return [(e - i.GPSBounds.min[1]) * i.XScale * 1.28, (t - i.GPSBounds.min[0]) * i.YScale * 1.28]
            },
            rotateVector2DAroundAxis: function (t, e, i) {
                i *= Math.PI / 180;
                var n = Math.cos(i),
                o = Math.sin(i);
                t[0] -= e[0],
                t[1] -= e[1];
                var r = new Array(t[0] * n - t[1] * o, t[0] * o + t[1] * n);
                return r[0] += e[0],
                r[1] += e[1],
                r
            },
            worldToLeafletSize: function (t) {
                var e = this.options.config;
                return t / (e.GridSize * e.ServersX) * 256
            },
            cheatToLeaflet: function (t) {
                var i = this.options.config,
                n = t.split(" "),
                o = e(this.gridStringToIntegers(n[0]), 2),
                r = o[0],
                s = o[1],
                a = parseInt(n[2]) + i.GridSize / 2,
                h = parseInt(n[1]) + i.GridSize / 2,
                l = e(this.worldToLeaflet(h + i.GridSize * s, a + i.GridSize * r), 2);
                return [l[0], l[1]]
            },
            worldToLeafletArray: function (t) {
                return this.worldToLeaflet(t[0], t[1])
            },
            GPSStringtoLeaflet: function (t) {
                var e = this.options.config,
                i = t.split(",");
                return [(i[1] - e.GPSBounds.min[1]) * e.YScale * 1.28, (i[0] - e.GPSBounds.min[0]) * e.XScale * 1.28]
            },
            worldToGlobalGPS: function (t, e, i) {
                var n = this.options.config,
                o = n.ServersX * n.GridSize,
                r = n.ServersY * n.GridSize,
                s = t / o * Math.abs(i.min[0] - i.max[0]) + i.min[0],
                a = i.min[1] - e / r * Math.abs(i.min[1] - i.max[1]);
                return [parseFloat(s.toFixed(1)), parseFloat(a.toFixed(1))]
            },
            leafletToWorld: function (t) {
                var i = e(t, 2),
                n = i[0],
                o = i[1],
                r = this.options.config;
                return [this.constraintInv(n, 0, 256, 0, r.GridSize * r.ServersX - 1).toFixed(0), this.constraintInv(o, 0, -256, 0, r.GridSize * r.ServersY - 1).toFixed(0)]
            },
            constraintInv: function (t, e, i, n, o) {
                return this.constraint(t, e, i, n, o) + n
            },
            constraint: function (t, e, i, n, o) {
                return (t - e) / (i - e) * (o - n)
            },
            getClientParameters: function () {
                return window.location.href.indexOf("#") > 0 ? new URLSearchParams(window.location.href.substring(window.location.href.indexOf("#") + 1)) : new URLSearchParams
            },
            setClientParameters: function (t) {
                window.location.href = "#" + t.toString()
            },
            addPortalPin: function (t, e, i) {
                var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                o = new L.Marker(e, {
                    icon: t,
                    rotationAngle: n
                });
                return o.bindPopup(i, {
                    showOnMouseOver: !0,
                    autoPan: !0,
                    keepInView: !0
                }),
                o.on({
                    mouseover: function (t) {
                        t.target.firstPin.lines.forEach((function (t) {
                                t.setStyle({
                                    opacity: 1
                                })
                            }))
                    },
                    mouseout: function (t) {
                        t.target.firstPin.lines.forEach((function (t) {
                                t.setStyle({
                                    opacity: .01
                                })
                            }))
                    }
                }),
                o
            }
        }),
        L.atlasmap = function (t, e) {
            return new L.AtlasMap(t, e)
        }
    },
    381: () => {
        function t(t, e) {
            return 710.9375 * Math.sqrt(Math.pow(t.lng - e.lng, 2) + Math.pow(t.lat - e.lat, 2))
        }
        L.Control.Measure = L.Control.extend({
            options: {
                position: "topleft",
                keyboard: !0,
                cancelKeyCode: 27,
                lineColor: "black",
                lineWeight: 2,
                lineDashArray: "6, 6",
                lineOpacity: 1,
                formatDistance: null,
                textColor: "black"
            },
            initialize: function (t) {
                L.Util.setOptions(this, t)
            },
            onAdd: function (t) {
                var e = L.DomUtil.create("div", "leaflet-control-zoom leaflet-bar leaflet-control");
                return this._createButton("&#8674;", "Warehouse Planner / Measure", "leaflet-control-measure leaflet-bar-part leaflet-bar-part-top-and-bottom", e, this._toggleMeasure, this),
                this.options.keyboard && L.DomEvent.on(document, "keydown", this._onKeyDown, this),
                e
            },
            onRemove: function (t) {
                this.options.keyboard && L.DomEvent.off(document, "keydown", this._onKeyDown, this)
            },
            _createButton: function (t, e, i, n, o, r) {
                var s = L.DomUtil.create("a", i, n);
                return s.innerHTML = t,
                s.href = "#",
                s.title = e,
                L.DomEvent.on(s, "click", L.DomEvent.stopPropagation).on(s, "click", L.DomEvent.preventDefault).on(s, "click", o, r).on(s, "dbclick", L.DomEvent.stopPropagation),
                s
            },
            _toggleMeasure: function () {
                this._measuring = !this._measuring,
                this._measuring ? (L.DomUtil.addClass(this._container, "leaflet-control-measure-on"), this._startMeasuring()) : (L.DomUtil.removeClass(this._container, "leaflet-control-measure-on"), this._stopMeasuring())
            },
            _startMeasuring: function () {
                this._oldCursor = this._map._container.style.cursor,
                this._map._container.style.cursor = "crosshair",
                this._doubleClickZoom = this._map.doubleClickZoom.enabled(),
                this._map.doubleClickZoom.disable(),
                this._isRestarted = !1,
                L.DomEvent.on(this._map, "mousemove", this._mouseMove, this).on(this._map, "click", this._mouseClick, this).on(this._map, "dbclick", this._finishPath, this),
                this._layerPaint || (this._layerPaint = L.layerGroup().addTo(this._map)),
                this._points || (this._points = [])
            },
            _stopMeasuring: function () {
                this._map._container.style.cursor = this._oldCursor,
                L.DomEvent.off(this._map, "mousemove", this._mouseMove, this).off(this._map, "click", this._mouseClick, this).off(this._map, "dbclick", this._finishPath, this),
                this._doubleClickZoom && this._map.doubleClickZoom.enabled(),
                this._layerPaint && this._layerPaint.clearLayers(),
                this._restartPath()
            },
            _mouseMove: function (e) {
                e.latlng && this._lastPoint && (this._layerPaintPathTemp ? (this._layerPaintPathTemp.getLatLngs().splice(0, 2, this._lastPoint, e.latlng), this._layerPaintPathTemp.redraw()) : this._layerPaintPathTemp = L.polyline([this._lastPoint, e.latlng], {
                        color: this.options.lineColor,
                        weight: this.options.lineWeight,
                        opacity: this.options.lineOpacity,
                        clickable: !1,
                        dashArray: this.options.lineDashArray,
                        interactive: !1
                    }).addTo(this._layerPaint), this._tooltip && (this._distance = 0, this._updateTooltipPosition(e.latlng), this._updateTooltipDistance(t(e.latlng, this._lastPoint))))
            },
            _mouseClick: function (e) {
                if (e.latlng)
                    if (this._isRestarted)
                        this._isRestarted = !1;
                    else {
                        if (this._lastPoint && this._tooltip) {
                            this._distance || (this._distance = 0),
                            this._updateTooltipPosition(e.latlng);
                            var i = t(e.latlng, this._lastPoint);
                            this._updateTooltipDistance(i),
                            this._distance += i
                        }
                        this._createTooltip(e.latlng),
                        this._lastPoint && !this._layerPaintPath && (this._layerPaintPath = L.polyline([this._lastPoint], {
                                color: this.options.lineColor,
                                weight: this.options.lineWeight,
                                opacity: this.options.lineOpacity,
                                clickable: !1,
                                interactive: !1
                            }).addTo(this._layerPaint)),
                        this._layerPaintPath && this._layerPaintPath.addLatLng(e.latlng),
                        this._lastPoint = L.circle(e.latlng, {
                            radius: .6329230769230769,
                            interactive: !1
                        }).addTo(this._layerPaint),
                        this._lastPoint && (this._lastCircle && this._lastCircle.off("click", this._finishPath, this), this._lastCircle = this._createCircle(e.latlng).addTo(this._layerPaint), this._lastCircle.on("click", this._finishPath, this)),
                        this._lastPoint = e.latlng
                    }
            },
            _finishPath: function (t) {
                t && L.DomEvent.preventDefault(t),
                this._lastCircle && this._lastCircle.off("click", this._finishPath, this),
                this._tooltip && this._layerPaint.removeLayer(this._tooltip),
                this._layerPaint && this._layerPaintPathTemp && this._layerPaint.removeLayer(this._layerPaintPathTemp),
                this._restartPath()
            },
            _restartPath: function () {
                this._distance = 0,
                this._lastCircle = void 0,
                this._lastPoint = void 0,
                this._tooltip = void 0,
                this._layerPaintPath = void 0,
                this._layerPaintPathTemp = void 0,
                this._isRestarted = !0
            },
            _createCircle: function (t) {
                return new L.CircleMarker(t, {
                    color: "black",
                    opacity: 1,
                    weight: 1,
                    fillColor: "white",
                    fill: !0,
                    fillOpacity: 1,
                    radius: 4,
                    clickable: Boolean(this._lastCircle)
                })
            },
            _createTooltip: function (t) {
                var e = L.divIcon({
                    className: "leaflet-measure-tooltip",
                    iconAnchor: [-5, -5]
                });
                this._tooltip = L.marker(t, {
                    icon: e,
                    clickable: !1
                }).addTo(this._layerPaint)
            },
            _updateTooltipPosition: function (t) {
                this._tooltip.setLatLng(t)
            },
            _updateTooltipDistance: function (t) {
                if (this._tooltip._icon) {
                    var e = this._formatDistance(t),
                    i = '<div class="leaflet-measure-tooltip-total" style="color:' + this.options.textColor + '">' + e + "</div>";
                    this._tooltip._icon.innerHTML = i
                }
            },
            _formatDistance: function (t) {
                return "function" == typeof this.options.formatDistance ? this.options.formatDistance(t) : Math.round(t) + "m"
            },
            _onKeyDown: function (t) {
                t.keyCode === this.options.cancelKeyCode && this._measuring && (this._lastPoint ? (this._finishPath(), this._isRestarted = !1) : this._toggleMeasure())
            }
        }),
        L.control.measure = function (t) {
            return new L.Control.Measure(t)
        },
        L.Map.mergeOptions({
            measureControl: !1
        }),
        L.Map.addInitHook((function () {
                this.options.config.WarehouseTool && (this.measureControl = new L.Control.Measure, this.addControl(this.measureControl))
            }))
    },
    620: () => {
        L.interpolate = function (t, e, i, n) {
            var o = n / i;
            return o = (o = o > 0 ? o : 0) > 1 ? 1 : o,
            L.latLng(t.lat + o * (e.lat - t.lat), t.lng + o * (e.lng - t.lng))
        },
        L.Marker.MovingMarker = L.Marker.extend({
            statics: {
                notStartedState: 0,
                endedState: 1,
                pausedState: 2,
                runState: 3
            },
            options: {
                autostart: !1,
                loop: !1
            },
            initialize: function (t, e, i) {
                L.Marker.prototype.initialize.call(this, t[0], i),
                this._latlngs = t.map((function (t) {
                            return L.latLng(t)
                        })),
                this._durations = e instanceof Array ? e : this._createDurations(this._latlngs, e),
                this._currentDuration = 0,
                this._currentIndex = 0,
                this._state = L.Marker.MovingMarker.notStartedState,
                this._startTime = 0,
                this._startTimeStamp = 0,
                this._pauseStartTime = 0,
                this._animId = 0,
                this._animRequested = !1,
                this._currentLine = [],
                this._stations = {}
            },
            isRunning: function () {
                return this._state === L.Marker.MovingMarker.runState
            },
            isEnded: function () {
                return this._state === L.Marker.MovingMarker.endedState
            },
            isStarted: function () {
                return this._state !== L.Marker.MovingMarker.notStartedState
            },
            isPaused: function () {
                return this._state === L.Marker.MovingMarker.pausedState
            },
            start: function () {
                this.isRunning() || (this.isPaused() ? this.resume() : (this._loadLine(0), this._startAnimation(), this.fire("start")))
            },
            resume: function () {
                this.isPaused() && (this._currentLine[0] = this.getLatLng(), this._currentDuration -= this._pauseStartTime - this._startTime, this._startAnimation())
            },
            pause: function () {
                this.isRunning() && (this._pauseStartTime = Date.now(), this._state = L.Marker.MovingMarker.pausedState, this._stopAnimation(), this._updatePosition())
            },
            stop: function (t) {
                this.isEnded() || (this._stopAnimation(), void 0 === t && (t = 0, this._updatePosition()), this._latlngs = this._latlngs.slice(-1), this._durations = this._durations.slice(-1), this._state = L.Marker.MovingMarker.endedState, this.fire("end", {
                        elapsedTime: t
                    }))
            },
            addLatLng: function (t, e) {
                this._latlngs.push(L.latLng(t)),
                this._durations.push(e)
            },
            moveTo: function (t, e) {
                this._stopAnimation(),
                this._latlngs = [this.getLatLng(), L.latLng(t)],
                this._durations = [e],
                this._state = L.Marker.MovingMarker.notStartedState,
                this.start(),
                this.options.loop = !1
            },
            addStation: function (t, e) {
                t > this._latlngs.length - 2 || t < 1 || (this._stations[t] = e)
            },
            onAdd: function (t) {
                L.Marker.prototype.onAdd.call(this, t),
                !this.options.autostart || this.isStarted() ? this.isRunning() && this._resumeAnimation() : this.start()
            },
            onRemove: function (t) {
                L.Marker.prototype.onRemove.call(this, t),
                this._stopAnimation()
            },
            _createDurations: function (t, e) {
                for (var i = t.length - 1, n = [], o = 0, r = 0, s = 0; s < i; s++)
                    r = t[s + 1].distanceTo(t[s]), n.push(r) , o += r;
                    var a = e / o,
                    h = [];
                    for (s = 0; s < n.length; s++)
                        h.push(n[s] * a);
                    return h
                },
                _startAnimation: function () {
                    this._state = L.Marker.MovingMarker.runState,
                    this._animId = L.Util.requestAnimFrame((function (t) {
                                this._startTime = Date.now(),
                                this._startTimeStamp = t,
                                this._animate(t)
                            }), this, !0),
                    this._animRequested = !0
                },
                _resumeAnimation: function () {
                    this._animRequested || (this._animRequested = !0, this._animId = L.Util.requestAnimFrame((function (t) {
                                    this._animate(t)
                                }), this, !0))
                },
                _stopAnimation: function () {
                    this._animRequested && (L.Util.cancelAnimFrame(this._animId), this._animRequested = !1)
                },
                _updatePosition: function () {
                    var t = Date.now() - this._startTime;
                    this._animate(this._startTimeStamp + t, !0)
                },
                _loadLine: function (t) {
                    this._currentIndex = t,
                    this._currentDuration = this._durations[t],
                    this._currentLine = this._latlngs.slice(t, t + 2)
                },
                _updateLine: function (t) {
                    var e = t - this._startTimeStamp;
                    if (e <= this._currentDuration)
                        return e;
                    for (var i, n = this._currentIndex, o = this._currentDuration; e > o; ) {
                        if (e -= o, void 0 !== (i = this._stations[n + 1])) {
                            if (e < i)
                                return this.setLatLng(this._latlngs[n + 1]), null;
                            e -= i
                        }
                        if (++n >= this._latlngs.length - 1) {
                            if (!this.options.loop)
                                return this.setLatLng(this._latlngs[this._latlngs.length - 1]), this.stop(e), null;
                            n = 0,
                            this.fire("loop", {
                                elapsedTime: e
                            })
                        }
                        o = this._durations[n]
                    }
                    return this._loadLine(n),
                    this._startTimeStamp = t - e,
                    this._startTime = Date.now() - e,
                    e
                },
                _animate: function (t, e) {
                    this._animRequested = !1;
                    var i = this._updateLine(t);
                    if (!this.isEnded()) {
                        if (null !== i) {
                            var n = L.interpolate(this._currentLine[0], this._currentLine[1], this._currentDuration, i);
                            this.setLatLng(n)
                        }
                        e || (this._animId = L.Util.requestAnimFrame(this._animate, this, !1), this._animRequested = !0)
                    }
                }
            }),
        L.Marker.movingMarker = function (t, e, i) {
            return new L.Marker.MovingMarker(t, e, i)
        }
    },
    198: () => {
        function t(e) {
            return t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            }
             : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            t(e)
        }
        function e(t, e) {
            return function (t) {
                if (Array.isArray(t))
                    return t
            }
            (t) || function (t, e) {
                var i = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                if (null != i) {
                    var n,
                    o,
                    r,
                    s,
                    a = [],
                    h = !0,
                    l = !1;
                    try {
                        if (r = (i = i.call(t)).next, 0 === e) {
                            if (Object(i) !== i)
                                return;
                            h = !1
                        } else
                            for (; !(h = (n = r.call(i)).done) && (a.push(n.value), a.length !== e); h = !0);
                    } catch (t) {
                        l = !0,
                        o = t
                    } finally {
                        try {
                            if (!h && null != i.return && (s = i.return(), Object(s) !== s))
                                return
                        } finally {
                            if (l)
                                throw o
                        }
                    }
                    return a
                }
            }
            (t, e) || function (t, e) {
                if (t) {
                    if ("string" == typeof t)
                        return i(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    return "Object" === n && t.constructor && (n = t.constructor.name),
                    "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? i(t, e) : void 0
                }
            }
            (t, e) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            ()
        }
        function i(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var i = 0, n = new Array(e); i < e; i++)
                n[i] = t[i];
            return n
        }
        function n() {
            "use strict";
            n = function () {
                return e
            };
            var e = {},
            i = Object.prototype,
            o = i.hasOwnProperty,
            r = Object.defineProperty || function (t, e, i) {
                t[e] = i.value
            },
            s = "function" == typeof Symbol ? Symbol : {},
            a = s.iterator || "@@iterator",
            h = s.asyncIterator || "@@asyncIterator",
            l = s.toStringTag || "@@toStringTag";
            function c(t, e, i) {
                return Object.defineProperty(t, e, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }),
                t[e]
            }
            try {
                c({}, "")
            } catch (t) {
                c = function (t, e, i) {
                    return t[e] = i
                }
            }
            function u(t, e, i, n) {
                var o = e && e.prototype instanceof f ? e : f,
                s = Object.create(o.prototype),
                a = new k(n || []);
                return r(s, "_invoke", {
                    value: x(t, i, a)
                }),
                s
            }
            function d(t, e, i) {
                try {
                    return {
                        type: "normal",
                        arg: t.call(e, i)
                    }
                } catch (t) {
                    return {
                        type: "throw",
                        arg: t
                    }
                }
            }
            e.wrap = u;
            var p = {};
            function f() {}
            function _() {}
            function m() {}
            var g = {};
            c(g, a, (function () {
                    return this
                }));
            var v = Object.getPrototypeOf,
            y = v && v(v(M([])));
            y && y !== i && o.call(y, a) && (g = y);
            var L = m.prototype = f.prototype = Object.create(g);
            function w(t) {
                ["next", "throw", "return"].forEach((function (e) {
                        c(t, e, (function (t) {
                                return this._invoke(e, t)
                            }))
                    }))
            }
            function b(e, i) {
                function n(r, s, a, h) {
                    var l = d(e[r], e, s);
                    if ("throw" !== l.type) {
                        var c = l.arg,
                        u = c.value;
                        return u && "object" == t(u) && o.call(u, "__await") ? i.resolve(u.__await).then((function (t) {
                                n("next", t, a, h)
                            }), (function (t) {
                                n("throw", t, a, h)
                            })) : i.resolve(u).then((function (t) {
                                c.value = t,
                                a(c)
                            }), (function (t) {
                                return n("throw", t, a, h)
                            }))
                    }
                    h(l.arg)
                }
                var s;
                r(this, "_invoke", {
                    value: function (t, e) {
                        function o() {
                            return new i((function (i, o) {
                                    n(t, e, i, o)
                                }))
                        }
                        return s = s ? s.then(o, o) : o()
                    }
                })
            }
            function x(t, e, i) {
                var n = "suspendedStart";
                return function (o, r) {
                    if ("executing" === n)
                        throw new Error("Generator is already running");
                    if ("completed" === n) {
                        if ("throw" === o)
                            throw r;
                        return {
                            value: void 0,
                            done: !0
                        }
                    }
                    for (i.method = o, i.arg = r; ; ) {
                        var s = i.delegate;
                        if (s) {
                            var a = P(s, i);
                            if (a) {
                                if (a === p)
                                    continue;
                                return a
                            }
                        }
                        if ("next" === i.method)
                            i.sent = i._sent = i.arg;
                        else if ("throw" === i.method) {
                            if ("suspendedStart" === n)
                                throw n = "completed", i.arg;
                            i.dispatchException(i.arg)
                        } else
                            "return" === i.method && i.abrupt("return", i.arg);
                        n = "executing";
                        var h = d(t, e, i);
                        if ("normal" === h.type) {
                            if (n = i.done ? "completed" : "suspendedYield", h.arg === p)
                                continue;
                            return {
                                value: h.arg,
                                done: i.done
                            }
                        }
                        "throw" === h.type && (n = "completed", i.method = "throw", i.arg = h.arg)
                    }
                }
            }
            function P(t, e) {
                var i = e.method,
                n = t.iterator[i];
                if (void 0 === n)
                    return e.delegate = null, "throw" === i && t.iterator.return && (e.method = "return", e.arg = void 0, P(t, e), "throw" === e.method) || "return" !== i && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + i + "' method")), p;
                var o = d(n, t.iterator, e.arg);
                if ("throw" === o.type)
                    return e.method = "throw", e.arg = o.arg, e.delegate = null, p;
                var r = o.arg;
                return r ? r.done ? (e[t.resultName] = r.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, p) : r : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, p)
            }
            function T(t) {
                var e = {
                    tryLoc: t[0]
                };
                1 in t && (e.catchLoc = t[1]),
                2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]),
                this.tryEntries.push(e)
            }
            function S(t) {
                var e = t.completion || {};
                e.type = "normal",
                delete e.arg,
                t.completion = e
            }
            function k(t) {
                this.tryEntries = [{
                        tryLoc: "root"
                    }
                ],
                t.forEach(T, this),
                this.reset(!0)
            }
            function M(t) {
                if (t) {
                    var e = t[a];
                    if (e)
                        return e.call(t);
                    if ("function" == typeof t.next)
                        return t;
                    if (!isNaN(t.length)) {
                        var i = -1,
                        n = function e() {
                            for (; ++i < t.length; )
                                if (o.call(t, i))
                                    return e.value = t[i], e.done = !1, e;
                            return e.value = void 0,
                            e.done = !0,
                            e
                        };
                        return n.next = n
                    }
                }
                return {
                    next: C
                }
            }
            function C() {
                return {
                    value: void 0,
                    done: !0
                }
            }
            return _.prototype = m,
            r(L, "constructor", {
                value: m,
                configurable: !0
            }),
            r(m, "constructor", {
                value: _,
                configurable: !0
            }),
            _.displayName = c(m, l, "GeneratorFunction"),
            e.isGeneratorFunction = function (t) {
                var e = "function" == typeof t && t.constructor;
                return !!e && (e === _ || "GeneratorFunction" === (e.displayName || e.name))
            },
            e.mark = function (t) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(t, m) : (t.__proto__ = m, c(t, l, "GeneratorFunction")),
                t.prototype = Object.create(L),
                t
            },
            e.awrap = function (t) {
                return {
                    __await: t
                }
            },
            w(b.prototype),
            c(b.prototype, h, (function () {
                    return this
                })),
            e.AsyncIterator = b,
            e.async = function (t, i, n, o, r) {
                void 0 === r && (r = Promise);
                var s = new b(u(t, i, n, o), r);
                return e.isGeneratorFunction(i) ? s : s.next().then((function (t) {
                        return t.done ? t.value : s.next()
                    }))
            },
            w(L),
            c(L, l, "Generator"),
            c(L, a, (function () {
                    return this
                })),
            c(L, "toString", (function () {
                    return "[object Generator]"
                })),
            e.keys = function (t) {
                var e = Object(t),
                i = [];
                for (var n in e)
                    i.push(n);
                return i.reverse(),
                function t() {
                    for (; i.length; ) {
                        var n = i.pop();
                        if (n in e)
                            return t.value = n, t.done = !1, t
                    }
                    return t.done = !0,
                    t
                }
            },
            e.values = M,
            k.prototype = {
                constructor: k,
                reset: function (t) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(S), !t)
                        for (var e in this)
                            "t" === e.charAt(0) && o.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0)
                },
                stop: function () {
                    this.done = !0;
                    var t = this.tryEntries[0].completion;
                    if ("throw" === t.type)
                        throw t.arg;
                    return this.rval
                },
                dispatchException: function (t) {
                    if (this.done)
                        throw t;
                    var e = this;
                    function i(i, n) {
                        return s.type = "throw",
                        s.arg = t,
                        e.next = i,
                        n && (e.method = "next", e.arg = void 0),
                        !!n
                    }
                    for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                        var r = this.tryEntries[n],
                        s = r.completion;
                        if ("root" === r.tryLoc)
                            return i("end");
                        if (r.tryLoc <= this.prev) {
                            var a = o.call(r, "catchLoc"),
                            h = o.call(r, "finallyLoc");
                            if (a && h) {
                                if (this.prev < r.catchLoc)
                                    return i(r.catchLoc, !0);
                                if (this.prev < r.finallyLoc)
                                    return i(r.finallyLoc)
                            } else if (a) {
                                if (this.prev < r.catchLoc)
                                    return i(r.catchLoc, !0)
                            } else {
                                if (!h)
                                    throw new Error("try statement without catch or finally");
                                if (this.prev < r.finallyLoc)
                                    return i(r.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function (t, e) {
                    for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                        var n = this.tryEntries[i];
                        if (n.tryLoc <= this.prev && o.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                            var r = n;
                            break
                        }
                    }
                    r && ("break" === t || "continue" === t) && r.tryLoc <= e && e <= r.finallyLoc && (r = null);
                    var s = r ? r.completion : {};
                    return s.type = t,
                    s.arg = e,
                    r ? (this.method = "next", this.next = r.finallyLoc, p) : this.complete(s)
                },
                complete: function (t, e) {
                    if ("throw" === t.type)
                        throw t.arg;
                    return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e),
                    p
                },
                finish: function (t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var i = this.tryEntries[e];
                        if (i.finallyLoc === t)
                            return this.complete(i.completion, i.afterLoc), S(i), p
                    }
                },
                catch : function (t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var i = this.tryEntries[e];
                        if (i.tryLoc === t) {
                            var n = i.completion;
                            if ("throw" === n.type) {
                                var o = n.arg;
                                S(i)
                            }
                            return o
                        }
                    }
                    throw new Error("illegal catch attempt")
                },
            delegateYield: function (t, e, i) {
                return this.delegate = {
                    iterator: M(t),
                    resultName: e,
                    nextLoc: i
                },
                "next" === this.method && (this.arg = void 0),
                p
            }
        },
        e
    }
    function o(t, e, i, n, o, r, s) {
        try {
            var a = t[r](s),
            h = a.value
        } catch (t) {
            return void i(t)
        }
        a.done ? e(h) : Promise.resolve(h).then(n, o)
    }
    var r,
    s;
    L.Control.Pin = L.Control.extend({
        options: {
            position: "topleft"
        },
        _gPins: [],
        _lPins: [],
        initialize: (r = n().mark((function t(e) {
                        return n().wrap((function (t) {
                                for (; ; )
                                    switch (t.prev = t.next) {
                                    case 0:
                                        L.Util.setOptions(this, e),
                                        this.options.keyboard && L.DomEvent.on(document, "keydown", this._onKeyDown, this);
                                    case 2:
                                    case "end":
                                        return t.stop()
                                    }
                            }), t, this)
                    })), s = function () {
            var t = this,
            e = arguments;
            return new Promise((function (i, n) {
                    var s = r.apply(t, e);
                    function a(t) {
                        o(s, i, n, a, h, "next", t)
                    }
                    function h(t) {
                        o(s, i, n, a, h, "throw", t)
                    }
                    a(void 0)
                }))
        }, function (t) {
            return s.apply(this, arguments)
        }),
        getDistance: function (t, e) {
            return Math.sqrt(Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2))
        },
        GPSStringtoLeaflet: function (t) {
            var e = t.split(",");
            return [(e[1] - config.GPSBounds.min[1]) * config.YScale * 1.28, (e[0] - config.GPSBounds.min[0]) * config.XScale * 1.28]
        },
        onAdd: function () {
            var t = L.DomUtil.create("div", "leaflet-control-zoom leaflet-bar leaflet-control");
            this._createButton("&#128204;", "Pin", "leaflet-control-pin leaflet-bar-part", t, this._togglePin, this);
            var e = this;
            return fetch("json" + this._map.options.config.version + "/regions.json", {
                dataType: "json"
            }).then((function (t) {
                    return t.json()
                })).then((function (t) {
                    e._regions = t,
                    e._addPins()
                })),
            t
        },
        onRemove: function () {
            this.options.keyboard && L.DomEvent.off(document, "keydown", this._onKeyDown, this)
        },
        _createButton: function (t, e, i, n, o, r) {
            var s = L.DomUtil.create("a", i, n);
            return s.innerHTML = t,
            s.href = "#",
            s.title = e,
            L.DomEvent.on(s, "click", L.DomEvent.stopPropagation).on(s, "click", L.DomEvent.preventDefault).on(s, "click", o, r).on(s, "dbclick", L.DomEvent.stopPropagation),
            s
        },
        _togglePin: function () {
            this._pinning = !this._pinning,
            this._pinning ? (L.DomUtil.addClass(this._container, "leaflet-control-pin-on"), this._startPinning()) : (L.DomUtil.removeClass(this._container, "leaflet-control-pin-on"), this._stopPinning())
        },
        _startPinning: function () {
            this._oldCursor = this._map._container.style.cursor,
            this._map._container.style.cursor = "crosshair",
            this._doubleClickZoom = this._map.doubleClickZoom.enabled(),
            this._map.doubleClickZoom.disable(),
            this._isRestarted = !1,
            L.DomEvent.on(this._map, "mousemove", this._mouseMove, this).on(this._map, "click", this._mouseClick, this),
            this._layerPaint || (this._layerPaint = L.layerGroup().addTo(this._map)),
            this._points || (this._points = [])
        },
        _stopPinning: function () {
            this._map._container.style.cursor = this._oldCursor,
            L.DomEvent.off(this._map, "mousemove", this._mouseMove, this).off(this._map, "click", this._mouseClick, this),
            this._doubleClickZoom && this._map.doubleClickZoom.enabled(),
            this._layerPaint && this._layerPaint.clearLayers()
        },
        _mouseMove: function (t) {
            t.latlng && this._lastPoint && (this._layerPaintPathTemp ? (this._layerPaintPathTemp.getLatLngs().splice(0, 2, this._lastPoint, t.latlng), this._layerPaintPathTemp.redraw()) : this._layerPaintPathTemp = L.polyline([this._lastPoint, t.latlng], {
                    color: this.options.lineColor,
                    weight: this.options.lineWeight,
                    opacity: this.options.lineOpacity,
                    clickable: !1,
                    dashArray: this.options.lineDashArray,
                    interactive: !1
                }).addTo(this._layerPaint))
        },
        _localGPStoWorld: function (t, i, n) {
            var o,
            r,
            s = this,
            a = e(this._map.gridStringToIntegers(t), 2),
            h = a[0],
            l = a[1];
            return Object.values(this._regions).forEach((function (t) {
                    if (h <= t.MaxX && h >= t.MinX && l <= t.MaxY && l >= t.MinY) {
                        var e = config.GridSize * (t.MaxX - t.MinX + 1),
                        a = config.GridSize * (t.MaxY - t.MinY + 1);
                        return o = s._map.constraintInv(i, -100, 100, 0, e) + t.MinX * config.GridSize,
                        r = s._map.constraintInv(n, 100, -100, 0, a) + t.MinY * config.GridSize,
                        !1
                    }
                })),
            [o, r]
        },
        _addPins: function () {
            var t = this,
            i = new URLSearchParams(window.location.href.substring(window.location.href.indexOf("#") + 1));
            i.has("gps") && i.get("gps").split(",").forEach((function (e) {
                    t._gPins.push(e),
                    L.marker(e.split(";"), {
                        name: "globalPin",
                        v: e,
                        parent: t
                    }).addTo(t._map).on("click", t._gMarkerClick)
                })),
            i.has("localgps") && i.get("localgps").split(",").forEach((function (i) {
                    t._lPins.push(i);
                    var n = i.split(";"),
                    o = e(t._localGPStoWorld(n[0], parseInt(n[1]), parseInt(n[2])), 2),
                    r = o[0],
                    s = o[1];
                    L.marker(t._map.worldToLeaflet(r, s), {
                        name: "localPin",
                        v: i,
                        parent: t
                    }).addTo(t._map).on("click", t._lMarkerClick)
                }))
        },
        _gMarkerClick: function () {
            var t = this,
            e = this.options.parent;
            e._gPins.forEach((function (e) {
                    e === t._latlng.lat + ";" + t._latlng.lng && t.options.parent._gPins.splice(t.options.parent._gPins.indexOf(e), 1)
                })),
            this._map.removeLayer(this),
            e._updateURI()
        },
        _lMarkerClick: function () {
            var t = this,
            e = this.options.parent;
            e._lPins.forEach((function (e) {
                    e === t._latlng.lat + ";" + t._latlng.lng && t.options.parent._lPins.splice(t.options.parent._lPins.indexOf(e), 1)
                })),
            this._map.removeLayer(this),
            e._updateURI()
        },
        _updateURI: function () {
            var t = this._map.getClientParameters(),
            e = [],
            i = [];
            this._map.eachLayer((function (t) {
                    "globalPin" === t.options.name ? i.push([t.options.v]) : "localPin" === t.options.name && e.push([t.options.v])
                })),
            e.length > 0 ? t.set("localgps", e.join(",")) : t.delete("localgps"),
            i.length > 0 ? t.set("gps", i.join(",")) : t.delete("gps"),
            this._map.setClientParameters(t)
        },
        _mouseClick: function (t) {
            t.latlng && (this._gPins.push(t.latlng.lat + ";" + t.latlng.lng), L.marker(t.latlng, {
                    name: "globalPin",
                    v: t.latlng.lat + ";" + t.latlng.lng,
                    parent: this
                }).addTo(this._map).on("click", this._markerClick), this._updateURI())
        },
        _onKeyDown: function (t) {
            switch (t.keyCode) {
            case this.options.activeKeyCode:
                this._pinning || this._togglePin();
                break;
            case this.options.cancelKeyCode:
                this._pinning && (this._lastPoint ? this._isRestarted = !1 : this._togglePin())
            }
        }
    }),
    L.control.pin = function (t) {
        return new L.Control.Pin(t)
    },
    L.Map.mergeOptions({
        pinControl: !1
    }),
    L.Map.addInitHook((function () {
            this.options.config.PinTool && (this.pinControl = new L.Control.Pin, this.addControl(this.pinControl))
        }))
},
502: () => {
    var t,
    e,
    i;
    t = L.Marker.prototype._initIcon,
    e = L.Marker.prototype._setPos,
    i = "msTransform" === L.DomUtil.TRANSFORM,
    L.Marker.addInitHook((function () {
            var t = this.options.icon && this.options.icon.options && this.options.icon.options.iconAnchor;
            t && (t = t[0] + "px " + t[1] + "px"),
            this.options.rotationOrigin = this.options.rotationOrigin || t || "center bottom",
            this.options.rotationAngle = this.options.rotationAngle || 0,
            this.on("drag", (function (t) {
                    t.target._applyRotation()
                }))
        })),
    L.Marker.include({
        _initIcon: function () {
            t.call(this)
        },
        _setPos: function (t) {
            e.call(this, t),
            this._applyRotation()
        },
        _applyRotation: function () {
            this.options.rotationAngle && (this._icon.style[L.DomUtil.TRANSFORM + "Origin"] = this.options.rotationOrigin, i ? this._icon.style[L.DomUtil.TRANSFORM] = "rotate(" + this.options.rotationAngle + "deg)" : this._icon.style[L.DomUtil.TRANSFORM] += " rotateZ(" + this.options.rotationAngle + "deg)")
        },
        setRotationAngle: function (t) {
            return this.options.rotationAngle = t,
            this.update(),
            this
        },
        setRotationOrigin: function (t) {
            return this.options.rotationOrigin = t,
            this.update(),
            this
        }
    })
}
},
e = {};
function i(n) {
    var o = e[n];
    if (void 0 !== o)
        return o.exports;
    var r = e[n] = {
        exports: {}
    };
    return t[n].call(r.exports, r, r.exports, i),
    r.exports
}
i.n = t => {
    var e = t && t.__esModule ? () => t.default : () => t;
    return i.d(e, {
        a: e
    }),
    e
},
i.d = (t, e) => {
    for (var n in e)
        i.o(e, n)
             && !i.o(t, n) && Object.defineProperty(t, n, {
                enumerable: !0,
                get: e[n]
            })
    },
    i.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e),
    (() => {
        "use strict";
        i(58),
        i(157),
        i(630),
        i(784),
        i(381),
        i(198);
        var t,
        e,
        n = i(320),
        o = i.n(n),
        r = i(944),
        s = i.n(r);
        function a(t) {
            return a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            }
             : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            a(t)
        }
        function h(t, e) {
            return function (t) {
                if (Array.isArray(t))
                    return t
            }
            (t) || function (t, e) {
                var i = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                if (null != i) {
                    var n,
                    o,
                    r,
                    s,
                    a = [],
                    h = !0,
                    l = !1;
                    try {
                        if (r = (i = i.call(t)).next, 0 === e) {
                            if (Object(i) !== i)
                                return;
                            h = !1
                        } else
                            for (; !(h = (n = r.call(i)).done) && (a.push(n.value), a.length !== e); h = !0);
                    } catch (t) {
                        l = !0,
                        o = t
                    } finally {
                        try {
                            if (!h && null != i.return && (s = i.return(), Object(s) !== s))
                                return
                        } finally {
                            if (l)
                                throw o
                        }
                    }
                    return a
                }
            }
            (t, e) || function (t, e) {
                if (t) {
                    if ("string" == typeof t)
                        return l(t, e);
                    var i = Object.prototype.toString.call(t).slice(8, -1);
                    return "Object" === i && t.constructor && (i = t.constructor.name),
                    "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? l(t, e) : void 0
                }
            }
            (t, e) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            ()
        }
        function l(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var i = 0, n = new Array(e); i < e; i++)
                n[i] = t[i];
            return n
        }
        function c() {
            c = function () {
                return t
            };
            var t = {},
            e = Object.prototype,
            i = e.hasOwnProperty,
            n = Object.defineProperty || function (t, e, i) {
                t[e] = i.value
            },
            o = "function" == typeof Symbol ? Symbol : {},
            r = o.iterator || "@@iterator",
            s = o.asyncIterator || "@@asyncIterator",
            h = o.toStringTag || "@@toStringTag";
            function l(t, e, i) {
                return Object.defineProperty(t, e, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }),
                t[e]
            }
            try {
                l({}, "")
            } catch (t) {
                l = function (t, e, i) {
                    return t[e] = i
                }
            }
            function u(t, e, i, o) {
                var r = e && e.prototype instanceof f ? e : f,
                s = Object.create(r.prototype),
                a = new k(o || []);
                return n(s, "_invoke", {
                    value: x(t, i, a)
                }),
                s
            }
            function d(t, e, i) {
                try {
                    return {
                        type: "normal",
                        arg: t.call(e, i)
                    }
                } catch (t) {
                    return {
                        type: "throw",
                        arg: t
                    }
                }
            }
            t.wrap = u;
            var p = {};
            function f() {}
            function _() {}
            function m() {}
            var g = {};
            l(g, r, (function () {
                    return this
                }));
            var v = Object.getPrototypeOf,
            y = v && v(v(M([])));
            y && y !== e && i.call(y, r) && (g = y);
            var L = m.prototype = f.prototype = Object.create(g);
            function w(t) {
                ["next", "throw", "return"].forEach((function (e) {
                        l(t, e, (function (t) {
                                return this._invoke(e, t)
                            }))
                    }))
            }
            function b(t, e) {
                function o(n, r, s, h) {
                    var l = d(t[n], t, r);
                    if ("throw" !== l.type) {
                        var c = l.arg,
                        u = c.value;
                        return u && "object" == a(u) && i.call(u, "__await") ? e.resolve(u.__await).then((function (t) {
                                o("next", t, s, h)
                            }), (function (t) {
                                o("throw", t, s, h)
                            })) : e.resolve(u).then((function (t) {
                                c.value = t,
                                s(c)
                            }), (function (t) {
                                return o("throw", t, s, h)
                            }))
                    }
                    h(l.arg)
                }
                var r;
                n(this, "_invoke", {
                    value: function (t, i) {
                        function n() {
                            return new e((function (e, n) {
                                    o(t, i, e, n)
                                }))
                        }
                        return r = r ? r.then(n, n) : n()
                    }
                })
            }
            function x(t, e, i) {
                var n = "suspendedStart";
                return function (o, r) {
                    if ("executing" === n)
                        throw new Error("Generator is already running");
                    if ("completed" === n) {
                        if ("throw" === o)
                            throw r;
                        return {
                            value: void 0,
                            done: !0
                        }
                    }
                    for (i.method = o, i.arg = r; ; ) {
                        var s = i.delegate;
                        if (s) {
                            var a = P(s, i);
                            if (a) {
                                if (a === p)
                                    continue;
                                return a
                            }
                        }
                        if ("next" === i.method)
                            i.sent = i._sent = i.arg;
                        else if ("throw" === i.method) {
                            if ("suspendedStart" === n)
                                throw n = "completed", i.arg;
                            i.dispatchException(i.arg)
                        } else
                            "return" === i.method && i.abrupt("return", i.arg);
                        n = "executing";
                        var h = d(t, e, i);
                        if ("normal" === h.type) {
                            if (n = i.done ? "completed" : "suspendedYield", h.arg === p)
                                continue;
                            return {
                                value: h.arg,
                                done: i.done
                            }
                        }
                        "throw" === h.type && (n = "completed", i.method = "throw", i.arg = h.arg)
                    }
                }
            }
            function P(t, e) {
                var i = e.method,
                n = t.iterator[i];
                if (void 0 === n)
                    return e.delegate = null, "throw" === i && t.iterator.return && (e.method = "return", e.arg = void 0, P(t, e), "throw" === e.method) || "return" !== i && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + i + "' method")), p;
                var o = d(n, t.iterator, e.arg);
                if ("throw" === o.type)
                    return e.method = "throw", e.arg = o.arg, e.delegate = null, p;
                var r = o.arg;
                return r ? r.done ? (e[t.resultName] = r.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, p) : r : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, p)
            }
            function T(t) {
                var e = {
                    tryLoc: t[0]
                };
                1 in t && (e.catchLoc = t[1]),
                2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]),
                this.tryEntries.push(e)
            }
            function S(t) {
                var e = t.completion || {};
                e.type = "normal",
                delete e.arg,
                t.completion = e
            }
            function k(t) {
                this.tryEntries = [{
                        tryLoc: "root"
                    }
                ],
                t.forEach(T, this),
                this.reset(!0)
            }
            function M(t) {
                if (t) {
                    var e = t[r];
                    if (e)
                        return e.call(t);
                    if ("function" == typeof t.next)
                        return t;
                    if (!isNaN(t.length)) {
                        var n = -1,
                        o = function e() {
                            for (; ++n < t.length; )
                                if (i.call(t, n))
                                    return e.value = t[n], e.done = !1, e;
                            return e.value = void 0,
                            e.done = !0,
                            e
                        };
                        return o.next = o
                    }
                }
                return {
                    next: C
                }
            }
            function C() {
                return {
                    value: void 0,
                    done: !0
                }
            }
            return _.prototype = m,
            n(L, "constructor", {
                value: m,
                configurable: !0
            }),
            n(m, "constructor", {
                value: _,
                configurable: !0
            }),
            _.displayName = l(m, h, "GeneratorFunction"),
            t.isGeneratorFunction = function (t) {
                var e = "function" == typeof t && t.constructor;
                return !!e && (e === _ || "GeneratorFunction" === (e.displayName || e.name))
            },
            t.mark = function (t) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(t, m) : (t.__proto__ = m, l(t, h, "GeneratorFunction")),
                t.prototype = Object.create(L),
                t
            },
            t.awrap = function (t) {
                return {
                    __await: t
                }
            },
            w(b.prototype),
            l(b.prototype, s, (function () {
                    return this
                })),
            t.AsyncIterator = b,
            t.async = function (e, i, n, o, r) {
                void 0 === r && (r = Promise);
                var s = new b(u(e, i, n, o), r);
                return t.isGeneratorFunction(i) ? s : s.next().then((function (t) {
                        return t.done ? t.value : s.next()
                    }))
            },
            w(L),
            l(L, h, "Generator"),
            l(L, r, (function () {
                    return this
                })),
            l(L, "toString", (function () {
                    return "[object Generator]"
                })),
            t.keys = function (t) {
                var e = Object(t),
                i = [];
                for (var n in e)
                    i.push(n);
                return i.reverse(),
                function t() {
                    for (; i.length; ) {
                        var n = i.pop();
                        if (n in e)
                            return t.value = n, t.done = !1, t
                    }
                    return t.done = !0,
                    t
                }
            },
            t.values = M,
            k.prototype = {
                constructor: k,
                reset: function (t) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(S), !t)
                        for (var e in this)
                            "t" === e.charAt(0) && i.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0)
                },
                stop: function () {
                    this.done = !0;
                    var t = this.tryEntries[0].completion;
                    if ("throw" === t.type)
                        throw t.arg;
                    return this.rval
                },
                dispatchException: function (t) {
                    if (this.done)
                        throw t;
                    var e = this;
                    function n(i, n) {
                        return s.type = "throw",
                        s.arg = t,
                        e.next = i,
                        n && (e.method = "next", e.arg = void 0),
                        !!n
                    }
                    for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                        var r = this.tryEntries[o],
                        s = r.completion;
                        if ("root" === r.tryLoc)
                            return n("end");
                        if (r.tryLoc <= this.prev) {
                            var a = i.call(r, "catchLoc"),
                            h = i.call(r, "finallyLoc");
                            if (a && h) {
                                if (this.prev < r.catchLoc)
                                    return n(r.catchLoc, !0);
                                if (this.prev < r.finallyLoc)
                                    return n(r.finallyLoc)
                            } else if (a) {
                                if (this.prev < r.catchLoc)
                                    return n(r.catchLoc, !0)
                            } else {
                                if (!h)
                                    throw new Error("try statement without catch or finally");
                                if (this.prev < r.finallyLoc)
                                    return n(r.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function (t, e) {
                    for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                        var o = this.tryEntries[n];
                        if (o.tryLoc <= this.prev && i.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                            var r = o;
                            break
                        }
                    }
                    r && ("break" === t || "continue" === t) && r.tryLoc <= e && e <= r.finallyLoc && (r = null);
                    var s = r ? r.completion : {};
                    return s.type = t,
                    s.arg = e,
                    r ? (this.method = "next", this.next = r.finallyLoc, p) : this.complete(s)
                },
                complete: function (t, e) {
                    if ("throw" === t.type)
                        throw t.arg;
                    return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e),
                    p
                },
                finish: function (t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var i = this.tryEntries[e];
                        if (i.finallyLoc === t)
                            return this.complete(i.completion, i.afterLoc), S(i), p
                    }
                },
                catch : function (t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var i = this.tryEntries[e];
                        if (i.tryLoc === t) {
                            var n = i.completion;
                            if ("throw" === n.type) {
                                var o = n.arg;
                                S(i)
                            }
                            return o
                        }
                    }
                    throw new Error("illegal catch attempt")
                },
            delegateYield: function (t, e, i) {
                return this.delegate = {
                    iterator: M(t),
                    resultName: e,
                    nextLoc: i
                },
                "next" === this.method && (this.arg = void 0),
                p
            }
        },
        t
    }
    function u(t, e, i, n, o, r, s) {
        try {
            var a = t[r](s),
            h = a.value
        } catch (t) {
            return void i(t)
        }
        a.done ? e(h) : Promise.resolve(h).then(n, o)
    }
    L.Control.PathFinder = L.Control.extend({
        options: {
            position: "topleft"
        },
        _icon: L.divIcon({
            iconSize: [16, 16],
            iconAnchor: [8, 8],
            className: "div-marker",
            html: "&#x274C;"
        }),
        _arrowIcon: L.icon({
            iconUrl: "icons/Arrow.svg",
            iconSize: [12, 12],
            iconAnchor: [6, 6]
        }),
        _pins: [],
        _path: [],
        _graph: s()(),
        initialize: (t = c().mark((function t(e) {
                        var i,
                        n = this;
                        return c().wrap((function (t) {
                                for (; ; )
                                    switch (t.prev = t.next) {
                                    case 0:
                                        return L.Util.setOptions(this, e),
                                        this.options.keyboard && L.DomEvent.on(document, "keydown", this._onKeyDown, this),
                                        t.next = 4,
                                        fetch("json/pathfinder.json");
                                    case 4:
                                        return i = t.sent,
                                        t.next = 7,
                                        i.json().then((function (t) {
                                                t.forEach((function (t) {
                                                        n._graph.addLink(t.f, t.t, {
                                                            weight: 20
                                                        })
                                                    })),
                                                n._pathfinder = o().aStar(n._graph, {
                                                    oriented: !0,
                                                    distance: function (t, e, i) {
                                                        return i.data.weight
                                                    }
                                                }),
                                                n._addPins()
                                            }));
                                    case 7:
                                        t.sent;
                                    case 8:
                                    case "end":
                                        return t.stop()
                                    }
                            }), t, this)
                    })), e = function () {
            var e = this,
            i = arguments;
            return new Promise((function (n, o) {
                    var r = t.apply(e, i);
                    function s(t) {
                        u(r, n, o, s, a, "next", t)
                    }
                    function a(t) {
                        u(r, n, o, s, a, "throw", t)
                    }
                    s(void 0)
                }))
        }, function (t) {
            return e.apply(this, arguments)
        }),
        getDistance: function (t, e) {
            return Math.sqrt(Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2))
        },
        onAdd: function () {
            var t = L.DomUtil.create("div", "leaflet-control-zoom leaflet-bar");
            return this._createButton("&#x1F6A2;", "PathFinder", "leaflet-control-pathfinder", t, this._togglePin, this),
            this._createButton("&#128269;", "Optimize Path", "leaflet-control-pathfinder", t, this._optimize, this),
            t
        },
        onRemove: function () {
            this.options.keyboard && L.DomEvent.off(document, "keydown", this._onKeyDown, this)
        },
        _createButton: function (t, e, i, n, o, r) {
            var s = L.DomUtil.create("a", i, n);
            return s.innerHTML = t,
            s.href = "#",
            s.title = e,
            L.DomEvent.on(s, "click", L.DomEvent.stopPropagation).on(s, "click", L.DomEvent.preventDefault).on(s, "click", o, r).on(s, "dbclick", L.DomEvent.stopPropagation),
            s
        },
        _togglePin: function () {
            this._pinning = !this._pinning,
            this._pinning ? (L.DomUtil.addClass(this._container, "leaflet-control-pin-on"), this._startPinning()) : (L.DomUtil.removeClass(this._container, "leaflet-control-pin-on"), this._stopPinning())
        },
        _optimize: function () {
            if (this._pins.length >= 3) {
                for (var t = [this._pins[0]], e = this._pins.shift(); this._pins.length > 0; ) {
                    for (var i = 0, n = 0, o = 0; o < this._pins.length; o++) {
                        var r = this._closestNode(e.split(";")),
                        s = this._closestNode(this._pins[o].split(";")),
                        a = this._pathfinder.find(r.toString(), s.toString());
                        (0 === n || a.length < n) && (n = a.length, i = o)
                    }
                    t.push(this._pins[i]),
                    e = this._pins[i],
                    this._pins.splice(i, 1)
                }
                this._pins = t,
                this._updatePaths(),
                this._updateURI()
            }
        },
        _startPinning: function () {
            this._oldCursor = this._map._container.style.cursor,
            this._map._container.style.cursor = "crosshair",
            this._doubleClickZoom = this._map.doubleClickZoom.enabled(),
            this._map.doubleClickZoom.disable(),
            this._isRestarted = !1,
            L.DomEvent.on(this._map, "mousemove", this._mouseMove, this).on(this._map, "click", this._mouseClick, this),
            this._layerPaint || (this._layerPaint = L.layerGroup().addTo(this._map)),
            this._points || (this._points = [])
        },
        _stopPinning: function () {
            this._map._container.style.cursor = this._oldCursor,
            L.DomEvent.off(this._map, "mousemove", this._mouseMove, this).off(this._map, "click", this._mouseClick, this),
            this._doubleClickZoom && this._map.doubleClickZoom.enabled(),
            this._layerPaint && this._layerPaint.clearLayers()
        },
        _mouseMove: function (t) {
            t.latlng && this._lastPoint && (this._layerPaintPathTemp ? (this._layerPaintPathTemp.getLatLngs().splice(0, 2, this._lastPoint, t.latlng), this._layerPaintPathTemp.redraw()) : this._layerPaintPathTemp = L.polyline([this._lastPoint, t.latlng], {
                    color: this.options.lineColor,
                    weight: this.options.lineWeight,
                    opacity: this.options.lineOpacity,
                    clickable: !1,
                    dashArray: this.options.lineDashArray,
                    interactive: !1
                }).addTo(this._layerPaint))
        },
        _addPins: function () {
            var t = this,
            e = new URLSearchParams(window.location.href.substring(window.location.href.indexOf("#") + 1));
            e.has("pathFinder") && e.get("pathFinder").split(",").forEach((function (e) {
                    t._pins.push(e),
                    L.marker(e.split(";"), {
                        name: "pathFinder",
                        icon: t._icon,
                        v: e,
                        parent: t
                    }).addTo(t._map).on("click", t._markerClick)
                })),
            this._updatePaths()
        },
        _markerClick: function () {
            var t = this,
            e = this.options.parent;
            e._pins.forEach((function (e) {
                    e === t._latlng.lat + ";" + t._latlng.lng && t.options.parent._pins.splice(t.options.parent._pins.indexOf(e), 1)
                })),
            this._map.removeLayer(this),
            e._updateURI(),
            e._updatePaths()
        },
        _updateURI: function () {
            var t = this._map.getClientParameters();
            this._pins.length > 0 ? t.set("pathFinder", this._pins.join(",")) : t.delete("pathFinder"),
            this._map.setClientParameters(t)
        },
        _getNode: function (t, e) {
            var i = this._map.options.config,
            n = this._map.worldToGlobalGPS(this._roundNodeLocation(t), this._roundNodeLocation(e), i.GPSBounds);
            return this._graph.getNode(n.toString()) ? n : void 0
        },
        _closestNode: function (t) {
            var e = h(t, 2),
            i = e[0],
            n = e[1],
            o = this._map.options.config,
            r = h(this._map.leafletToWorld([n, i]), 2),
            s = r[0],
            a = r[1],
            l = o.GridSize / o.NodesPerAxis,
            c = this._getNode(s, a);
            if (c)
                return c;
            for (var u = 1; u < 6; u++)
                for (var d = l * u, p = -1; p <= 1; p++)
                    for (var f = -1; f <= 1; f++) {
                        var _ = this._getNode(+s + d * p, +a + d * f);
                        if (_)
                            return _
                    }
        },
        _roundNodeLocation: function (t) {
            var e = this._map.options.config,
            i = e.GridSize / e.NodesPerAxis;
            return t % i == 0 ? Math.floor(t / i) * i + e.GridOffset : Math.floor(t / i) * i + i + e.GridOffset
        },
        _pointFromLine: function (t, e, i, n) {
            var o = n[0] - i[0],
            r = n[1] - i[1];
            return [i[0] + o * t - r * e, i[1] + r * t + o * e]
        },
        _updatePaths: function () {
            var t = this;
            if (this._path.forEach((function (e) {
                        t._map.removeLayer(e)
                    })), this._pins.length >= 2)
                for (var e = 1; e < this._pins.length; e++)
                    for (var i = this._closestNode(this._pins[e - 1].split(";")), n = this._closestNode(this._pins[e].split(";")), o = this._pathfinder.find(i.toString(), n.toString()), r = 1; r < o.length; r++) {
                        var s = this._map.GPSStringtoLeaflet(o[r - 1].id),
                        a = this._map.GPSStringtoLeaflet(o[r].id),
                        h = {
                            name: "path"
                        },
                        l = [];
                        if (l.push("M", s), this.getDistance(s, a) > 2) {
                            h.dashArray = "10, 10",
                            h.opacity = .5,
                            l.push("C", this._pointFromLine(.333, .2, s, a), this._pointFromLine(.667, .2, s, a), a);
                            var c = this._pointFromLine(.667, .2, s, a),
                            u = new L.Marker(a, {
                                icon: this._arrowIcon,
                                rotationAngle: 180 * Math.atan2(a[1] - c[1], a[0] - c[0]) / Math.PI
                            }).addTo(this._map);
                            this._path.push(u)
                        } else
                            l.push("L", a);
                        var d = L.curve(l, h).addTo(this._map);
                        this._path.push(d)
                    }
        },
        _mouseClick: function (t) {
            t.latlng && (this._pins.push(t.latlng.lat + ";" + t.latlng.lng), L.marker(t.latlng, {
                    name: "pathFinder",
                    icon: this._icon,
                    v: t.latlng.lat + ";" + t.latlng.lng,
                    parent: this
                }).addTo(this._map).on("click", this._markerClick), this._updateURI(), this._updatePaths())
        },
        _onKeyDown: function (t) {
            switch (t.keyCode) {
            case this.options.activeKeyCode:
                this._pinning || this._togglePin();
                break;
            case this.options.cancelKeyCode:
                this._pinning && (this._lastPoint ? this._isRestarted = !1 : this._togglePin())
            }
        }
    }),
    L.control.pathFinder = function (t) {
        return new L.Control.PathFinder(t)
    },
    L.Map.mergeOptions({
        pinControl: !1
    }),
    L.Map.addInitHook((function () {
            this.options.config.PathFinder && (this.pinControl = new L.Control.PathFinder, this.addControl(this.pinControl))
        })),
    i(566),
    i(502),
    i(936),
    i(738),
    i(620),
    i(261)
})()
})();