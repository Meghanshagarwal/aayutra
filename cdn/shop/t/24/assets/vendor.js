/*!* enquire.min.js v2.1.2 - Awesome Media Queries http://wicky.nillia.ms/enquire.js */ ! function(e, t, n) {
    "use strict";
    var i = window.matchMedia;
    "undefined" != typeof module && module.exports ? module.exports = n(i) : "function" == typeof define && define.amd ? define(function() {
        return t[e] = n(i)
    }) : t[e] = n(i)
}("enquire", this, function(e) {
    "use strict";

    function t(e, t) {
        var n, i = 0,
            o = e.length;
        for (i; o > i && (n = t(e[i], i), n !== !1); i++);
    }

    function n(e) {
        return "[object Array]" === Object.prototype.toString.apply(e)
    }

    function i(e) {
        return "function" == typeof e
    }

    function o(e) {
        this.options = e, !e.deferSetup && this.setup()
    }

    function r(t, n) {
        this.query = t, this.isUnconditional = n, this.handlers = [], this.mql = e(t);
        var i = this;
        this.listener = function(e) {
            i.mql = e, i.assess()
        }, this.mql.addListener(this.listener)
    }

    function s() {
        if (!e) throw new Error("matchMedia not present, legacy browsers require a polyfill");
        this.queries = {}, this.browserIsIncapable = !e("only all").matches
    }
    return o.prototype = {
        setup: function() {
            this.options.setup && this.options.setup(), this.initialised = !0
        },
        on: function() {
            !this.initialised && this.setup(), this.options.match && this.options.match()
        },
        off: function() {
            this.options.unmatch && this.options.unmatch()
        },
        destroy: function() {
            this.options.destroy ? this.options.destroy() : this.off()
        },
        equals: function(e) {
            return this.options === e || this.options.match === e
        }
    }, r.prototype = {
        addHandler: function(e) {
            var t = new o(e);
            this.handlers.push(t), this.matches() && t.on()
        },
        removeHandler: function(e) {
            var n = this.handlers;
            t(n, function(t, i) {
                return t.equals(e) ? (t.destroy(), !n.splice(i, 1)) : void 0
            })
        },
        matches: function() {
            return this.mql.matches || this.isUnconditional
        },
        clear: function() {
            t(this.handlers, function(e) {
                e.destroy()
            }), this.mql.removeListener(this.listener), this.handlers.length = 0
        },
        assess: function() {
            var e = this.matches() ? "on" : "off";
            t(this.handlers, function(t) {
                t[e]()
            })
        }
    }, s.prototype = {
        register: function(e, o, s) {
            var a = this.queries,
                l = s && this.browserIsIncapable;
            return a[e] || (a[e] = new r(e, l)), i(o) && (o = {
                match: o
            }), n(o) || (o = [o]), t(o, function(t) {
                i(t) && (t = {
                    match: t
                }), a[e].addHandler(t)
            }), this
        },
        unregister: function(e, t) {
            var n = this.queries[e];
            return n && (t ? n.removeHandler(t) : (n.clear(), delete this.queries[e])), this
        }
    }, new s
}),
/* jquery.zoom.min.js - http://www.jacklmoore.com/zoom */
function(e) {
    "use strict";
    var t = {
        url: !1,
        callback: !1,
        target: !1,
        duration: 120,
        on: "mouseover",
        touch: !0,
        onZoomIn: !1,
        onZoomOut: !1,
        magnify: 1
    };
    e.zoom = function(t, n, i, o) {
        var r, s, a, l, u, c, d, p = e(t),
            f = p.css("position"),
            h = e(n);
        return p.css("position", /(absolute|fixed)/.test(f) ? f : "relative"), p.css("overflow", "hidden"), i.style.width = i.style.height = "", e(i).addClass("zoomImg").css({
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            width: i.width * o,
            height: i.height * o,
            border: "none",
            maxWidth: "none",
            maxHeight: "none"
        }).appendTo(t), {
            init: function() {
                s = p.outerWidth(), r = p.outerHeight(), n === p[0] ? (l = s, a = r) : (l = h.outerWidth(), a = h.outerHeight()), u = (i.width - s) / l, c = (i.height - r) / a, d = h.offset()
            },
            move: function(e) {
                var t = e.pageX - d.left,
                    n = e.pageY - d.top;
                n = Math.max(Math.min(n, a), 0), t = Math.max(Math.min(t, l), 0), i.style.left = t * -u + "px", i.style.top = n * -c + "px"
            }
        }
    }, e.fn.zoom = function(n) {
        return this.each(function() {
            var i, o = e.extend({}, t, n || {}),
                r = o.target || this,
                s = this,
                a = e(s),
                l = e(r),
                u = document.createElement("img"),
                c = e(u),
                d = "mousemove.zoom",
                p = !1,
                f = !1;
            (o.url || (i = a.find("img"), i[0] && (o.url = i.data("src") || i.attr("src")), o.url)) && (! function() {
                var e = l.css("position"),
                    t = l.css("overflow");
                a.one("zoom.destroy", function() {
                    a.off(".zoom"), l.css("position", e), l.css("overflow", t), c.remove()
                })
            }(), u.onload = function() {
                function t(t) {
                    i.init(), i.move(t), c.stop().fadeTo(e.support.opacity ? o.duration : 0, 1, !!e.isFunction(o.onZoomIn) && o.onZoomIn.call(u))
                }

                function n() {
                    c.stop().fadeTo(o.duration, 0, !!e.isFunction(o.onZoomOut) && o.onZoomOut.call(u))
                }
                var i = e.zoom(r, s, u, o.magnify);
                "grab" === o.on ? a.on("mousedown.zoom", function(o) {
                    1 === o.which && (e(document).one("mouseup.zoom", function() {
                        n(), e(document).off(d, i.move)
                    }), t(o), e(document).on(d, i.move), o.preventDefault())
                }) : "click" === o.on ? a.on("click.zoom", function(o) {
                    return p ? void 0 : (p = !0, t(o), e(document).on(d, i.move), e(document).one("click.zoom", function() {
                        n(), p = !1, e(document).off(d, i.move)
                    }), !1)
                }) : "toggle" === o.on ? a.on("click.zoom", function(e) {
                    p ? n() : t(e), p = !p
                }) : "mouseover" === o.on && (i.init(), a.on("mouseenter.zoom", t).on("mouseleave.zoom", n).on(d, i.move)), o.touch && a.on("touchstart.zoom", function(e) {
                    e.preventDefault(), f ? (f = !1, n()) : (f = !0, t(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]))
                }).on("touchmove.zoom", function(e) {
                    e.preventDefault(), i.move(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0])
                }).on("touchend.zoom", function(e) {
                    e.preventDefault(), f && (f = !1, n())
                }), e.isFunction(o.callback) && o.callback.call(u)
            }, u.src = o.url)
        })
    }, e.fn.zoom.defaults = t
}(window.jQuery),
function() {
    function e(e, t) {
        for (var n = -1, i = t.length, o = e.length; ++n < i;) e[o + n] = t[n];
        return e
    }

    function t(e, t, n) {
        for (var i = -1, o = e.length; ++i < o;) {
            var r = e[i],
                s = t(r);
            if (null != s && (a === le ? s === s : n(s, a))) var a = s,
                l = r
        }
        return l
    }

    function n(e, t, n) {
        var i;
        return n(e, function(e, n, o) {
            return t(e, n, o) ? (i = e, !1) : void 0
        }), i
    }

    function i(e, t, n, i, o) {
        return o(e, function(e, o, r) {
            n = i ? (i = !1, e) : t(n, e, o, r)
        }), n
    }

    function o(e, t) {
        return T(t, function(t) {
            return e[t]
        })
    }

    function r(e) {
        return e && e.Object === Object ? e : null
    }

    function s(e) {
        return fe[e]
    }

    function a(e) {
        var t = !1;
        if (null != e && "function" != typeof e.toString) try {
            t = !!(e + "")
        } catch (e) {}
        return t
    }

    function l(e, t) {
        return e = "number" == typeof e || pe.test(e) ? +e : -1, e > -1 && 0 == e % 1 && (null == t ? 9007199254740991 : t) > e
    }

    function u(e) {
        if (Z(e) && !Re(e)) {
            if (e instanceof c) return e;
            if (Ce.call(e, "__wrapped__")) {
                var t = new c(e.__wrapped__, e.__chain__);
                return t.__actions__ = A(e.__actions__), t
            }
        }
        return new c(e)
    }

    function c(e, t) {
        this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t
    }

    function d(e, t, n, i) {
        var o;
        return (o = e === le) || (o = Te[n], o = (e === o || e !== e && o !== o) && !Ce.call(i, n)), o ? t : e
    }

    function p(e) {
        return J(e) ? Ne(e) : {}
    }

    function f(e, t, n) {
        if ("function" != typeof e) throw new TypeError("Expected a function");
        return setTimeout(function() {
            e.apply(le, n)
        }, t)
    }

    function h(e, t) {
        var n = !0;
        return Pe(e, function(e, i, o) {
            return n = !!t(e, i, o)
        }), n
    }

    function v(e, t) {
        var n = [];
        return Pe(e, function(e, i, o) {
            t(e, i, o) && n.push(e)
        }), n
    }

    function g(t, n, i, o) {
        o || (o = []);
        for (var r = -1, s = t.length; ++r < s;) {
            var a = t[r];
            n > 0 && Z(a) && V(a) && (i || Re(a) || Y(a)) ? n > 1 ? g(a, n - 1, i, o) : e(o, a) : i || (o[o.length] = a)
        }
        return o
    }

    function m(e, t) {
        return e && Le(e, t, ie)
    }

    function y(e, t) {
        return v(t, function(t) {
            return G(e[t])
        })
    }

    function w(e, t, n, i, o) {
        return e === t || (null == e || null == t || !J(e) && !Z(t) ? e !== e && t !== t : b(e, t, w, n, i, o))
    }

    function b(e, t, n, i, o, r) {
        var s = Re(e),
            l = Re(t),
            u = "[object Array]",
            c = "[object Array]";
        s || (u = $e.call(e), "[object Arguments]" == u && (u = "[object Object]")), l || (c = $e.call(t), "[object Arguments]" == c && (c = "[object Object]"));
        var d = "[object Object]" == u && !a(e),
            l = "[object Object]" == c && !a(t);
        return !(c = u == c) || s || d ? 2 & o || (u = d && Ce.call(e, "__wrapped__"), l = l && Ce.call(t, "__wrapped__"), !u && !l) ? !!c && (r || (r = []), (u = M(r, function(t) {
            return t[0] === e
        })) && u[1] ? u[1] == t : (r.push([e, t]), t = (s ? P : _)(e, t, n, i, o, r), r.pop(), t)) : n(u ? e.value() : e, l ? t.value() : t, i, o, r) : L(e, t, u)
    }

    function x(e) {
        var t = typeof e;
        return "function" == t ? e : null == e ? se : ("object" == t ? C : $)(e)
    }

    function k(e) {
        e = null == e ? e : Object(e);
        var t, n = [];
        for (t in e) n.push(t);
        return n
    }

    function T(e, t) {
        var n = -1,
            i = V(e) ? Array(e.length) : [];
        return Pe(e, function(e, o, r) {
            i[++n] = t(e, o, r)
        }), i
    }

    function C(e) {
        var t = ie(e);
        return function(n) {
            var i = t.length;
            if (null == n) return !i;
            for (n = Object(n); i--;) {
                var o = t[i];
                if (!(o in n && w(e[o], n[o], le, 3))) return !1
            }
            return !0
        }
    }

    function S(e, t) {
        return e = Object(e), W(t, function(t, n) {
            return n in e && (t[n] = e[n]), t
        }, {})
    }

    function $(e) {
        return function(t) {
            return null == t ? le : t[e]
        }
    }

    function E(e, t, n) {
        var i = -1,
            o = e.length;
        for (0 > t && (t = -t > o ? 0 : o + t), n = n > o ? o : n, 0 > n && (n += o), o = t > n ? 0 : n - t >>> 0, t >>>= 0, n = Array(o); ++i < o;) n[i] = e[i + t];
        return n
    }

    function A(e) {
        return E(e, 0, e.length)
    }

    function j(e, t) {
        var n;
        return Pe(e, function(e, i, o) {
            return n = t(e, i, o), !n
        }), !!n
    }

    function N(t, n) {
        return W(n, function(t, n) {
            return n.func.apply(n.thisArg, e([t], n.args))
        }, t)
    }

    function D(e, t, n, i) {
        n || (n = {});
        for (var o = -1, r = t.length; ++o < r;) {
            var s = t[o],
                a = i ? i(n[s], e[s], s, n, e) : e[s],
                l = n,
                u = l[s];
            Ce.call(l, s) && (u === a || u !== u && a !== a) && (a !== le || s in l) || (l[s] = a)
        }
        return n
    }

    function O(e) {
        return U(function(t, n) {
            var i = -1,
                o = n.length,
                r = o > 1 ? n[o - 1] : le,
                r = "function" == typeof r ? (o--, r) : le;
            for (t = Object(t); ++i < o;) {
                var s = n[i];
                s && e(t, s, i, r)
            }
            return t
        })
    }

    function H(e) {
        return function() {
            var t = arguments,
                n = p(e.prototype),
                t = e.apply(n, t);
            return J(t) ? t : n
        }
    }

    function q(e, t, n) {
        function i() {
            for (var r = -1, s = arguments.length, a = -1, l = n.length, u = Array(l + s), c = this && this !== xe && this instanceof i ? o : e; ++a < l;) u[a] = n[a];
            for (; s--;) u[a++] = arguments[++r];
            return c.apply(t, u)
        }
        if ("function" != typeof e) throw new TypeError("Expected a function");
        var o = H(e);
        return i
    }

    function P(e, t, n, i, o, r) {
        var s = -1,
            a = 1 & o,
            l = e.length,
            u = t.length;
        if (l != u && !(2 & o && u > l)) return !1;
        for (u = !0; ++s < l;) {
            var c = e[s],
                d = t[s];
            if (void 0 !== le) {
                u = !1;
                break
            }
            if (a) {
                if (!j(t, function(e) {
                        return c === e || n(c, e, i, o, r)
                    })) {
                    u = !1;
                    break
                }
            } else if (c !== d && !n(c, d, i, o, r)) {
                u = !1;
                break
            }
        }
        return u
    }

    function L(e, t, n) {
        switch (n) {
            case "[object Boolean]":
            case "[object Date]":
                return +e == +t;
            case "[object Error]":
                return e.name == t.name && e.message == t.message;
            case "[object Number]":
                return e != +e ? t != +t : e == +t;
            case "[object RegExp]":
            case "[object String]":
                return e == t + ""
        }
        return !1
    }

    function _(e, t, n, i, o, r) {
        var s = 2 & o,
            a = ie(e),
            l = a.length,
            u = ie(t).length;
        if (l != u && !s) return !1;
        for (var c = l; c--;) {
            var d = a[c];
            if (!(s ? d in t : Ce.call(t, d))) return !1
        }
        for (u = !0; ++c < l;) {
            var d = a[c],
                p = e[d],
                f = t[d];
            if (void 0 !== le || p !== f && !n(p, f, i, o, r)) {
                u = !1;
                break
            }
            s || (s = "constructor" == d)
        }
        return u && !s && (n = e.constructor, i = t.constructor, n != i && "constructor" in e && "constructor" in t && !("function" == typeof n && n instanceof n && "function" == typeof i && i instanceof i) && (u = !1)), u
    }

    function z(e) {
        var t = e ? e.length : le;
        if (Q(t) && (Re(e) || ee(e) || Y(e))) {
            e = String;
            for (var n = -1, i = Array(t); ++n < t;) i[n] = e(n);
            t = i
        } else t = null;
        return t
    }

    function I(e) {
        var t = e && e.constructor,
            t = G(t) && t.prototype || Te;
        return e === t
    }

    function F(e) {
        return e ? e[0] : le
    }

    function M(e, t) {
        return n(e, x(t), Pe)
    }

    function R(e, t) {
        return Pe(e, "function" == typeof t ? t : se)
    }

    function W(e, t, n) {
        return i(e, x(t), n, 3 > arguments.length, Pe)
    }

    function B(e, t) {
        var n;
        if ("function" != typeof t) throw new TypeError("Expected a function");
        return e = We(e),
            function() {
                return 0 < --e && (n = t.apply(this, arguments)), 1 >= e && (t = le), n
            }
    }

    function U(e) {
        var t;
        if ("function" != typeof e) throw new TypeError("Expected a function");
        return t = qe(t === le ? e.length - 1 : We(t), 0),
            function() {
                for (var n = arguments, i = -1, o = qe(n.length - t, 0), r = Array(o); ++i < o;) r[i] = n[t + i];
                for (o = Array(t + 1), i = -1; ++i < t;) o[i] = n[i];
                return o[t] = r, e.apply(this, o)
            }
    }

    function X(e, t) {
        return e > t
    }

    function Y(e) {
        return Z(e) && V(e) && Ce.call(e, "callee") && (!De.call(e, "callee") || "[object Arguments]" == $e.call(e))
    }

    function V(e) {
        return null != e && !("function" == typeof e && G(e)) && Q(_e(e))
    }

    function G(e) {
        return e = J(e) ? $e.call(e) : "", "[object Function]" == e || "[object GeneratorFunction]" == e
    }

    function Q(e) {
        return "number" == typeof e && e > -1 && 0 == e % 1 && 9007199254740991 >= e
    }

    function J(e) {
        var t = typeof e;
        return !!e && ("object" == t || "function" == t)
    }

    function Z(e) {
        return !!e && "object" == typeof e
    }

    function K(e) {
        return "number" == typeof e || Z(e) && "[object Number]" == $e.call(e)
    }

    function ee(e) {
        return "string" == typeof e || !Re(e) && Z(e) && "[object String]" == $e.call(e)
    }

    function te(e, t) {
        return t > e
    }

    function ne(e) {
        return "string" == typeof e ? e : null == e ? "" : e + ""
    }

    function ie(e) {
        var t = I(e);
        if (!t && !V(e)) return He(Object(e));
        var n, i = z(e),
            o = !!i,
            i = i || [],
            r = i.length;
        for (n in e) !Ce.call(e, n) || o && ("length" == n || l(n, r)) || t && "constructor" == n || i.push(n);
        return i
    }

    function oe(e) {
        for (var t = -1, n = I(e), i = k(e), o = i.length, r = z(e), s = !!r, r = r || [], a = r.length; ++t < o;) {
            var u = i[t];
            s && ("length" == u || l(u, a)) || "constructor" == u && (n || !Ce.call(e, u)) || r.push(u)
        }
        return r
    }

    function re(e) {
        return e ? o(e, ie(e)) : []
    }

    function se(e) {
        return e
    }

    function ae(t, n, i) {
        var o = ie(n),
            r = y(n, o);
        null != i || J(n) && (r.length || !o.length) || (i = n, n = t, t = this, r = y(n, ie(n)));
        var s = !(J(i) && "chain" in i) || i.chain,
            a = G(t);
        return Pe(r, function(i) {
            var o = n[i];
            t[i] = o, a && (t.prototype[i] = function() {
                var n = this.__chain__;
                if (s || n) {
                    var i = t(this.__wrapped__);
                    return (i.__actions__ = A(this.__actions__)).push({
                        func: o,
                        args: arguments,
                        thisArg: t
                    }), i.__chain__ = n, i
                }
                return o.apply(t, e([this.value()], arguments))
            })
        }), t
    }
    var le, ue = 1 / 0,
        ce = /[&<>"'`]/g,
        de = RegExp(ce.source),
        pe = /^(?:0|[1-9]\d*)$/,
        fe = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "`": "&#96;"
        },
        he = {
            function: !0,
            object: !0
        },
        ve = he[typeof exports] && exports && !exports.nodeType ? exports : le,
        ge = he[typeof module] && module && !module.nodeType ? module : le,
        me = ge && ge.exports === ve ? ve : le,
        ye = r(he[typeof self] && self),
        we = r(he[typeof window] && window),
        be = r(he[typeof this] && this),
        xe = r(ve && ge && "object" == typeof global && global) || we !== (be && be.window) && we || ye || be || Function("return this")(),
        ke = Array.prototype,
        Te = Object.prototype,
        Ce = Te.hasOwnProperty,
        Se = 0,
        $e = Te.toString,
        Ee = xe._,
        Ae = xe.Reflect,
        je = Ae ? Ae.f : le,
        Ne = Object.create,
        De = Te.propertyIsEnumerable,
        Oe = xe.isFinite,
        He = Object.keys,
        qe = Math.max,
        Pe = function(e, t) {
            return function(n, i) {
                if (null == n) return n;
                if (!V(n)) return e(n, i);
                for (var o = n.length, r = t ? o : -1, s = Object(n);
                    (t ? r-- : ++r < o) && !1 !== i(s[r], r, s););
                return n
            }
        }(m),
        Le = function(e) {
            return function(t, n, i) {
                var o = -1,
                    r = Object(t);
                i = i(t);
                for (var s = i.length; s--;) {
                    var a = i[e ? s : ++o];
                    if (!1 === n(r[a], a, r)) break
                }
                return t
            }
        }();
    je && !De.call({
        valueOf: 1
    }, "valueOf") && (k = function(e) {
        e = je(e);
        for (var t, n = []; !(t = e.next()).done;) n.push(t.value);
        return n
    });
    var _e = $("length"),
        ze = U(function(t, n) {
            return Re(t) || (t = null == t ? [] : [Object(t)]), g(n, 1), e(A(t), re)
        }),
        Ie = U(function(e, t, n) {
            return q(e, t, n)
        }),
        Fe = U(function(e, t) {
            return f(e, 1, t)
        }),
        Me = U(function(e, t, n) {
            return f(e, Be(t) || 0, n)
        }),
        Re = Array.isArray,
        We = Number,
        Be = Number,
        Ue = O(function(e, t) {
            D(t, ie(t), e)
        }),
        Xe = O(function(e, t) {
            D(t, oe(t), e)
        }),
        Ye = O(function(e, t, n, i) {
            D(t, oe(t), e, i)
        }),
        Ve = U(function(e) {
            return e.push(le, d), Ye.apply(le, e)
        }),
        Ge = U(function(e, t) {
            return null == e ? {} : S(e, g(t, 1))
        }),
        Qe = x;
    c.prototype = p(u.prototype), c.prototype.constructor = c, u.assignIn = Xe, u.before = B, u.bind = Ie, u.chain = function(e) {
        return e = u(e), e.__chain__ = !0, e
    }, u.compact = function(e) {
        return v(e, Boolean)
    }, u.concat = ze, u.create = function(e, t) {
        var n = p(e);
        return t ? Ue(n, t) : n
    }, u.defaults = Ve, u.defer = Fe, u.delay = Me, u.filter = function(e, t) {
        return v(e, x(t))
    }, u.flatten = function(e) {
        return e && e.length ? g(e, 1) : []
    }, u.flattenDeep = function(e) {
        return e && e.length ? g(e, ue) : []
    }, u.iteratee = Qe, u.keys = ie, u.map = function(e, t) {
        return T(e, x(t))
    }, u.matches = function(e) {
        return C(Ue({}, e))
    }, u.mixin = ae, u.negate = function(e) {
        if ("function" != typeof e) throw new TypeError("Expected a function");
        return function() {
            return !e.apply(this, arguments)
        }
    }, u.once = function(e) {
        return B(2, e)
    }, u.pick = Ge, u.slice = function(e, t, n) {
        var i = e ? e.length : 0;
        return n = n === le ? i : +n, i ? E(e, null == t ? 0 : +t, n) : []
    }, u.sortBy = function(e, t) {
        var n = 0;
        return t = x(t), T(T(e, function(e, i, o) {
            return {
                c: e,
                b: n++,
                a: t(e, i, o)
            }
        }).sort(function(e, t) {
            var n;
            e: {
                n = e.a;
                var i = t.a;
                if (n !== i) {
                    var o = null === n,
                        r = n === le,
                        s = n === n,
                        a = null === i,
                        l = i === le,
                        u = i === i;
                    if (n > i && !a || !s || o && !l && u || r && u) {
                        n = 1;
                        break e
                    }
                    if (i > n && !o || !u || a && !r && s || l && s) {
                        n = -1;
                        break e
                    }
                }
                n = 0
            }
            return n || e.b - t.b
        }), $("c"))
    }, u.tap = function(e, t) {
        return t(e), e
    }, u.thru = function(e, t) {
        return t(e)
    }, u.toArray = function(e) {
        return V(e) ? e.length ? A(e) : [] : re(e)
    }, u.values = re, u.extend = Xe, ae(u, u), u.clone = function(e) {
        return J(e) ? Re(e) ? A(e) : D(e, ie(e)) : e
    }, u.escape = function(e) {
        return (e = ne(e)) && de.test(e) ? e.replace(ce, s) : e
    }, u.every = function(e, t, n) {
        return t = n ? le : t, h(e, x(t))
    }, u.find = M, u.forEach = R, u.has = function(e, t) {
        return null != e && Ce.call(e, t)
    }, u.head = F, u.identity = se, u.indexOf = function(e, t, n) {
        var i = e ? e.length : 0;
        n = "number" == typeof n ? 0 > n ? qe(i + n, 0) : n : 0, n = (n || 0) - 1;
        for (var o = t === t; ++n < i;) {
            var r = e[n];
            if (o ? r === t : r !== r) return n
        }
        return -1
    }, u.isArguments = Y, u.isArray = Re, u.isBoolean = function(e) {
        return !0 === e || !1 === e || Z(e) && "[object Boolean]" == $e.call(e)
    }, u.isDate = function(e) {
        return Z(e) && "[object Date]" == $e.call(e)
    }, u.isEmpty = function(e) {
        if (V(e) && (Re(e) || ee(e) || G(e.splice) || Y(e))) return !e.length;
        for (var t in e)
            if (Ce.call(e, t)) return !1;
        return !0
    }, u.isEqual = function(e, t) {
        return w(e, t)
    }, u.isFinite = function(e) {
        return "number" == typeof e && Oe(e)
    }, u.isFunction = G, u.isNaN = function(e) {
        return K(e) && e != +e
    }, u.isNull = function(e) {
        return null === e
    }, u.isNumber = K, u.isObject = J, u.isRegExp = function(e) {
        return J(e) && "[object RegExp]" == $e.call(e)
    }, u.isString = ee, u.isUndefined = function(e) {
        return e === le
    }, u.last = function(e) {
        var t = e ? e.length : 0;
        return t ? e[t - 1] : le
    }, u.max = function(e) {
        return e && e.length ? t(e, se, X) : le
    }, u.min = function(e) {
        return e && e.length ? t(e, se, te) : le
    }, u.noConflict = function() {
        return xe._ === this && (xe._ = Ee), this
    }, u.noop = function() {}, u.reduce = W, u.result = function(e, t, n) {
        return t = null == e ? le : e[t], t === le && (t = n), G(t) ? t.call(e) : t
    }, u.size = function(e) {
        return null == e ? 0 : (e = V(e) ? e : ie(e), e.length)
    }, u.some = function(e, t, n) {
        return t = n ? le : t, j(e, x(t))
    }, u.uniqueId = function(e) {
        var t = ++Se;
        return ne(e) + t
    }, u.each = R, u.first = F, ae(u, function() {
        var e = {};
        return m(u, function(t, n) {
            Ce.call(u.prototype, n) || (e[n] = t)
        }), e
    }(), {
        chain: !1
    }), u.VERSION = "4.5.1", Pe("pop join replace reverse split push shift sort splice unshift".split(" "), function(e) {
        var t = (/^(?:replace|split)$/.test(e) ? String.prototype : ke)[e],
            n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru",
            i = /^(?:pop|join|replace|shift)$/.test(e);
        u.prototype[e] = function() {
            var e = arguments;
            return i && !this.__chain__ ? t.apply(this.value(), e) : this[n](function(n) {
                return t.apply(n, e)
            })
        }
    }), u.prototype.toJSON = u.prototype.valueOf = u.prototype.value = function() {
        return N(this.__wrapped__, this.__actions__)
    }, (we || ye || {})._ = u, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return u
    }) : ve && ge ? (me && ((ge.exports = u)._ = u), ve._ = u) : xe._ = u
}.call(this),
    /*!
    /*! Magnific Popup - v1.1.0 - 2016-02-20 */
    ! function(a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
    }(function(a) {
        var b, c, d, e, f, g, h = "Close",
            i = "BeforeClose",
            j = "AfterClose",
            k = "BeforeAppend",
            l = "MarkupParse",
            m = "Open",
            n = "Change",
            o = "mfp",
            p = "." + o,
            q = "mfp-ready",
            r = "mfp-removing",
            s = "mfp-prevent-close",
            t = function() {},
            u = !!window.jQuery,
            v = a(window),
            w = function(a, c) {
                b.ev.on(o + a + p, c)
            },
            x = function(b, c, d, e) {
                var f = document.createElement("div");
                return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
            },
            y = function(c, d) {
                b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]))
            },
            z = function(c) {
                return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), g = c), b.currTemplate.closeBtn
            },
            A = function() {
                a.magnificPopup.instance || (b = new t, b.init(), a.magnificPopup.instance = b)
            },
            B = function() {
                var a = document.createElement("p").style,
                    b = ["ms", "O", "Moz", "Webkit"];
                if (void 0 !== a.transition) return !0;
                for (; b.length;)
                    if (b.pop() + "Transition" in a) return !0;
                return !1
            };
        t.prototype = {
            constructor: t,
            init: function() {
                var c = navigator.appVersion;
                b.isLowIE = b.isIE8 = document.all && !document.addEventListener, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = B(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), d = a(document), b.popupsCache = {}
            },
            open: function(c) {
                var e;
                if (c.isObj === !1) {
                    b.items = c.items.toArray(), b.index = 0;
                    var g, h = c.items;
                    for (e = 0; e < h.length; e++)
                        if (g = h[e], g.parsed && (g = g.el[0]), g === c.el[0]) {
                            b.index = e;
                            break
                        }
                } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;
                if (b.isOpen) return void b.updateItemHTML();
                b.types = [], f = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function() {
                    b.close()
                }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function(a) {
                    b._checkIfClose(a.target) && b.close()
                }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
                var i = a.magnificPopup.modules;
                for (e = 0; e < i.length; e++) {
                    var j = i[e];
                    j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b)
                }
                y("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function(a, b, c, d) {
                    c.close_replaceWith = z(d.type)
                }), f += " mfp-close-btn-in") : b.wrap.append(z())), b.st.alignTop && (f += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({
                    overflow: b.st.overflowY,
                    overflowX: "hidden",
                    overflowY: b.st.overflowY
                }) : b.wrap.css({
                    top: v.scrollTop(),
                    position: "absolute"
                }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
                    height: d.height(),
                    position: "absolute"
                }), b.st.enableEscapeKey && d.on("keyup" + p, function(a) {
                    27 === a.keyCode && b.close()
                }), v.on("resize" + p, function() {
                    b.updateSize()
                }), b.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && b.wrap.addClass(f);
                var k = b.wH = v.height(),
                    n = {};
                if (b.fixedContentPos && b._hasScrollBar(k)) {
                    var o = b._getScrollbarSize();
                    o && (n.marginRight = o)
                }
                b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
                var r = b.st.mainClass;
                return b.isIE7 && (r += " mfp-ie7"), r && b._addClassToMFP(r), b.updateItemHTML(), y("BuildControls"), a("html").css(n), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)), b._lastFocusedEl = document.activeElement, setTimeout(function() {
                    b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn)
                }, 16), b.isOpen = !0, b.updateSize(k), y(m), c
            },
            close: function() {
                b.isOpen && (y(i), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r), setTimeout(function() {
                    b._close()
                }, b.st.removalDelay)) : b._close())
            },
            _close: function() {
                y(h);
                var c = r + " " + q + " ";
                if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
                    var e = {
                        marginRight: ""
                    };
                    b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e)
                }
                d.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j)
            },
            updateSize: function(a) {
                if (b.isIOS) {
                    var c = document.documentElement.clientWidth / window.innerWidth,
                        d = window.innerHeight * c;
                    b.wrap.css("height", d), b.wH = d
                } else b.wH = a || v.height();
                b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize")
            },
            updateItemHTML: function() {
                var c = b.items[b.index];
                b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
                var d = c.type;
                if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
                    var f = b.st[d] ? b.st[d].markup : !1;
                    y("FirstMarkupParse", f), f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0
                }
                e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
                var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
                b.appendContent(g, d), c.preloaded = !0, y(n, c), e = c.type, b.container.prepend(b.contentContainer), y("AfterChange")
            },
            appendContent: function(a, c) {
                b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "", y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content)
            },
            parseEl: function(c) {
                var d, e = b.items[c];
                if (e.tagName ? e = {
                        el: a(e)
                    } : (d = e.type, e = {
                        data: e,
                        src: e.src
                    }), e.el) {
                    for (var f = b.types, g = 0; g < f.length; g++)
                        if (e.el.hasClass("mfp-" + f[g])) {
                            d = f[g];
                            break
                        }
                    e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"))
                }
                return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, y("ElementParse", e), b.items[c]
            },
            addGroup: function(a, c) {
                var d = function(d) {
                    d.mfpEl = this, b._openClick(d, a, c)
                };
                c || (c = {});
                var e = "click.magnificPopup";
                c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)))
            },
            _openClick: function(c, d, e) {
                var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
                if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
                    var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
                    if (g)
                        if (a.isFunction(g)) {
                            if (!g.call(b)) return !0
                        } else if (v.width() < g) return !0;
                    c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e)
                }
            },
            updateStatus: function(a, d) {
                if (b.preloader) {
                    c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
                    var e = {
                        status: a,
                        text: d
                    };
                    y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function(a) {
                        a.stopImmediatePropagation()
                    }), b.container.addClass("mfp-s-" + a), c = a
                }
            },
            _checkIfClose: function(c) {
                if (!a(c).hasClass(s)) {
                    var d = b.st.closeOnContentClick,
                        e = b.st.closeOnBgClick;
                    if (d && e) return !0;
                    if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;
                    if (c === b.content[0] || a.contains(b.content[0], c)) {
                        if (d) return !0
                    } else if (e && a.contains(document, c)) return !0;
                    return !1
                }
            },
            _addClassToMFP: function(a) {
                b.bgOverlay.addClass(a), b.wrap.addClass(a)
            },
            _removeClassFromMFP: function(a) {
                this.bgOverlay.removeClass(a), b.wrap.removeClass(a)
            },
            _hasScrollBar: function(a) {
                return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
            },
            _setFocus: function() {
                (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus()
            },
            _onFocusIn: function(c) {
                return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1)
            },
            _parseMarkup: function(b, c, d) {
                var e;
                d.data && (c = a.extend(d.data, c)), y(l, [b, c, d]), a.each(c, function(c, d) {
                    if (void 0 === d || d === !1) return !0;
                    if (e = c.split("_"), e.length > 1) {
                        var f = b.find(p + "-" + e[0]);
                        if (f.length > 0) {
                            var g = e[1];
                            "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d)
                        }
                    } else b.find(p + "-" + c).html(d)
                })
            },
            _getScrollbarSize: function() {
                if (void 0 === b.scrollbarSize) {
                    var a = document.createElement("div");
                    a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
                }
                return b.scrollbarSize
            }
        }, a.magnificPopup = {
            instance: null,
            proto: t.prototype,
            modules: [],
            open: function(b, c) {
                return A(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
            },
            close: function() {
                return a.magnificPopup.instance && a.magnificPopup.instance.close()
            },
            registerModule: function(b, c) {
                c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
            },
            defaults: {
                disableOn: 0,
                key: null,
                midClick: !1,
                mainClass: "",
                preloader: !0,
                focus: "",
                closeOnContentClick: !1,
                closeOnBgClick: !0,
                closeBtnInside: !0,
                showCloseBtn: !0,
                enableEscapeKey: !0,
                modal: !1,
                alignTop: !1,
                removalDelay: 0,
                prependTo: null,
                fixedContentPos: "auto",
                fixedBgPos: "auto",
                overflowY: "auto",
                closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                tClose: "Close (Esc)",
                tLoading: "Loading...",
                autoFocusLast: !0
            }
        }, a.fn.magnificPopup = function(c) {
            A();
            var d = a(this);
            if ("string" == typeof c)
                if ("open" === c) {
                    var e, f = u ? d.data("magnificPopup") : d[0].magnificPopup,
                        g = parseInt(arguments[1], 10) || 0;
                    f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({
                        mfpEl: e
                    }, d, f)
                } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
            else c = a.extend(!0, {}, c), u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
            return d
        };
        var C, D, E, F = "inline",
            G = function() {
                E && (D.after(E.addClass(C)).detach(), E = null)
            };
        a.magnificPopup.registerModule(F, {
            options: {
                hiddenClass: "hide",
                markup: "",
                tNotFound: "Content not found"
            },
            proto: {
                initInline: function() {
                    b.types.push(F), w(h + "." + F, function() {
                        G()
                    })
                },
                getInline: function(c, d) {
                    if (G(), c.src) {
                        var e = b.st.inline,
                            f = a(c.src);
                        if (f.length) {
                            var g = f[0].parentNode;
                            g && g.tagName && (D || (C = e.hiddenClass, D = x(C), C = "mfp-" + C), E = f.after(D).detach().removeClass(C)), b.updateStatus("ready")
                        } else b.updateStatus("error", e.tNotFound), f = a("<div>");
                        return c.inlineElement = f, f
                    }
                    return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d
                }
            }
        });
        var H, I = "ajax",
            J = function() {
                H && a(document.body).removeClass(H)
            },
            K = function() {
                J(), b.req && b.req.abort()
            };
        a.magnificPopup.registerModule(I, {
            options: {
                settings: null,
                cursor: "mfp-ajax-cur",
                tError: '<a href="%url%">The content</a> could not be loaded.'
            },
            proto: {
                initAjax: function() {
                    b.types.push(I), H = b.st.ajax.cursor, w(h + "." + I, K), w("BeforeChange." + I, K)
                },
                getAjax: function(c) {
                    H && a(document.body).addClass(H), b.updateStatus("loading");
                    var d = a.extend({
                        url: c.src,
                        success: function(d, e, f) {
                            var g = {
                                data: d,
                                xhr: f
                            };
                            y("ParseAjax", g), b.appendContent(a(g.data), I), c.finished = !0, J(), b._setFocus(), setTimeout(function() {
                                b.wrap.addClass(q)
                            }, 16), b.updateStatus("ready"), y("AjaxContentAdded")
                        },
                        error: function() {
                            J(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src))
                        }
                    }, b.st.ajax.settings);
                    return b.req = a.ajax(d), ""
                }
            }
        });
        var L, M = function(c) {
            if (c.data && void 0 !== c.data.title) return c.data.title;
            var d = b.st.image.titleSrc;
            if (d) {
                if (a.isFunction(d)) return d.call(b, c);
                if (c.el) return c.el.attr(d) || ""
            }
            return ""
        };
        a.magnificPopup.registerModule("image", {
            options: {
                markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                cursor: "mfp-zoom-out-cur",
                titleSrc: "title",
                verticalFit: !0,
                tError: '<a href="%url%">The image</a> could not be loaded.'
            },
            proto: {
                initImage: function() {
                    var c = b.st.image,
                        d = ".image";
                    b.types.push("image"), w(m + d, function() {
                        "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor)
                    }), w(h + d, function() {
                        c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p)
                    }), w("Resize" + d, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage)
                },
                resizeImage: function() {
                    var a = b.currItem;
                    if (a && a.img && b.st.image.verticalFit) {
                        var c = 0;
                        b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c)
                    }
                },
                _onImageHasSize: function(a) {
                    a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1))
                },
                findImageSize: function(a) {
                    var c = 0,
                        d = a.img[0],
                        e = function(f) {
                            L && clearInterval(L), L = setInterval(function() {
                                return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), c++, void(3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)))
                            }, f)
                        };
                    e(1)
                },
                getImage: function(c, d) {
                    var e = 0,
                        f = function() {
                            c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, y("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(f, 100) : g()))
                        },
                        g = function() {
                            c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0)
                        },
                        h = b.st.image,
                        i = d.find(".mfp-img");
                    if (i.length) {
                        var j = document.createElement("img");
                        j.className = "mfp-img", c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")), c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1)
                    }
                    return b._parseMarkup(d, {
                        title: M(c),
                        img_replaceWith: c.img
                    }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d)
                }
            }
        });
        var N, O = function() {
            return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N
        };
        a.magnificPopup.registerModule("zoom", {
            options: {
                enabled: !1,
                easing: "ease-in-out",
                duration: 300,
                opener: function(a) {
                    return a.is("img") ? a : a.find("img")
                }
            },
            proto: {
                initZoom: function() {
                    var a, c = b.st.zoom,
                        d = ".zoom";
                    if (c.enabled && b.supportsTransition) {
                        var e, f, g = c.duration,
                            j = function(a) {
                                var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                    d = "all " + c.duration / 1e3 + "s " + c.easing,
                                    e = {
                                        position: "fixed",
                                        zIndex: 9999,
                                        left: 0,
                                        top: 0,
                                        "-webkit-backface-visibility": "hidden"
                                    },
                                    f = "transition";
                                return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b
                            },
                            k = function() {
                                b.content.css("visibility", "visible")
                            };
                        w("BuildControls" + d, function() {
                            if (b._allowZoom()) {
                                if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
                                f = j(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function() {
                                    f.css(b._getOffset(!0)), e = setTimeout(function() {
                                        k(), setTimeout(function() {
                                            f.remove(), a = f = null, y("ZoomAnimationEnded")
                                        }, 16)
                                    }, g)
                                }, 16)
                            }
                        }), w(i + d, function() {
                            if (b._allowZoom()) {
                                if (clearTimeout(e), b.st.removalDelay = g, !a) {
                                    if (a = b._getItemToZoom(), !a) return;
                                    f = j(a)
                                }
                                f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function() {
                                    f.css(b._getOffset())
                                }, 16)
                            }
                        }), w(h + d, function() {
                            b._allowZoom() && (k(), f && f.remove(), a = null)
                        })
                    }
                },
                _allowZoom: function() {
                    return "image" === b.currItem.type
                },
                _getItemToZoom: function() {
                    return b.currItem.hasSize ? b.currItem.img : !1
                },
                _getOffset: function(c) {
                    var d;
                    d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
                    var e = d.offset(),
                        f = parseInt(d.css("padding-top"), 10),
                        g = parseInt(d.css("padding-bottom"), 10);
                    e.top -= a(window).scrollTop() - f;
                    var h = {
                        width: d.width(),
                        height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f
                    };
                    return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h
                }
            }
        });
        var P = "iframe",
            Q = "//about:blank",
            R = function(a) {
                if (b.currTemplate[P]) {
                    var c = b.currTemplate[P].find("iframe");
                    c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none"))
                }
            };
        a.magnificPopup.registerModule(P, {
            options: {
                markup: '<div class="mfp-iframe-scaler mfp-with-anim"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                srcAction: "iframe_src",
                patterns: {
                    youtube: {
                        index: "youtube.com",
                        id: "v=",
                        src: "//www.youtube.com/embed/%id%?autoplay=1"
                    },
                    vimeo: {
                        index: "vimeo.com/",
                        id: "/",
                        src: "//player.vimeo.com/video/%id%?autoplay=1"
                    },
                    gmaps: {
                        index: "//maps.google.",
                        src: "%id%&output=embed"
                    }
                }
            },
            proto: {
                initIframe: function() {
                    b.types.push(P), w("BeforeChange", function(a, b, c) {
                        b !== c && (b === P ? R() : c === P && R(!0))
                    }), w(h + "." + P, function() {
                        R()
                    })
                },
                getIframe: function(c, d) {
                    var e = c.src,
                        f = b.st.iframe;
                    a.each(f.patterns, function() {
                        return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0
                    });
                    var g = {};
                    return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d
                }
            }
        });
        var S = function(a) {
                var c = b.items.length;
                return a > c - 1 ? a - c : 0 > a ? c + a : a
            },
            T = function(a, b, c) {
                return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
            };
        a.magnificPopup.registerModule("gallery", {
            options: {
                enabled: !1,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                preload: [0, 2],
                navigateByImgClick: !0,
                arrows: !0,
                tPrev: "Previous (Left arrow key)",
                tNext: "Next (Right arrow key)",
                tCounter: "%curr% of %total%"
            },
            proto: {
                initGallery: function() {
                    var c = b.st.gallery,
                        e = ".mfp-gallery";
                    return b.direction = !0, c && c.enabled ? (f += " mfp-gallery", w(m + e, function() {
                        c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function() {
                            return b.items.length > 1 ? (b.next(), !1) : void 0
                        }), d.on("keydown" + e, function(a) {
                            37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next()
                        })
                    }), w("UpdateStatus" + e, function(a, c) {
                        c.text && (c.text = T(c.text, b.currItem.index, b.items.length))
                    }), w(l + e, function(a, d, e, f) {
                        var g = b.items.length;
                        e.counter = g > 1 ? T(c.tCounter, f.index, g) : ""
                    }), w("BuildControls" + e, function() {
                        if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                            var d = c.arrowMarkup,
                                e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s),
                                f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s);
                            e.click(function() {
                                b.prev()
                            }), f.click(function() {
                                b.next()
                            }), b.container.append(e.add(f))
                        }
                    }), w(n + e, function() {
                        b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function() {
                            b.preloadNearbyImages(), b._preloadTimeout = null
                        }, 16)
                    }), void w(h + e, function() {
                        d.off(e), b.wrap.off("click" + e), b.arrowRight = b.arrowLeft = null
                    })) : !1
                },
                next: function() {
                    b.direction = !0, b.index = S(b.index + 1), b.updateItemHTML()
                },
                prev: function() {
                    b.direction = !1, b.index = S(b.index - 1), b.updateItemHTML()
                },
                goTo: function(a) {
                    b.direction = a >= b.index, b.index = a, b.updateItemHTML()
                },
                preloadNearbyImages: function() {
                    var a, c = b.st.gallery.preload,
                        d = Math.min(c[0], b.items.length),
                        e = Math.min(c[1], b.items.length);
                    for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a);
                    for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a)
                },
                _preloadItem: function(c) {
                    if (c = S(c), !b.items[c].preloaded) {
                        var d = b.items[c];
                        d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
                            d.hasSize = !0
                        }).on("error.mfploader", function() {
                            d.hasSize = !0, d.loadError = !0, y("LazyLoadError", d)
                        }).attr("src", d.src)), d.preloaded = !0
                    }
                }
            }
        });
        var U = "retina";
        a.magnificPopup.registerModule(U, {
            options: {
                replaceSrc: function(a) {
                    return a.src.replace(/\.\w+$/, function(a) {
                        return "@2x" + a
                    })
                },
                ratio: 1
            },
            proto: {
                initRetina: function() {
                    if (window.devicePixelRatio > 1) {
                        var a = b.st.retina,
                            c = a.ratio;
                        c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + U, function(a, b) {
                            b.img.css({
                                "max-width": b.img[0].naturalWidth / c,
                                width: "100%"
                            })
                        }), w("ElementParse." + U, function(b, d) {
                            d.src = a.replaceSrc(d, c)
                        }))
                    }
                }
            }
        }), A()
    });
//Cookie Js
function setCookie(e, t, i) {
    var o = new Date;
    o.setTime(o.getTime() + 864e5 * i);
    var n = "expires=" + o.toUTCString();
    document.cookie = e + "=" + t + ";" + n + ";path=/;SameSite=None; secure"
}

function getCookie(e) {
    var t, i, o, n = document.cookie.split(";");
    for (t = 0; t < n.length; t++)
        if (i = n[t].substr(0, n[t].indexOf("=")), o = n[t].substr(n[t].indexOf("=") + 1), (i = i.replace(/^\s+|\s+$/g, "")) == e) return unescape(o)
}
/** Flickity PACKAGED v2.3.0 ** https://flickity.metafizzy.co */
(function(e, i) {
    if (typeof define == "function" && define.amd) {
        define("jquery-bridget/jquery-bridget", ["jquery"], function(t) {
            return i(e, t)
        })
    } else if (typeof module == "object" && module.exports) {
        module.exports = i(e, require("jquery"))
    } else {
        e.jQueryBridget = i(e, e.jQuery)
    }
})(window, function t(e, r) {
    "use strict";
    var o = Array.prototype.slice;
    var i = e.console;
    var u = typeof i == "undefined" ? function() {} : function(t) {
        i.error(t)
    };

    function n(h, s, c) {
        c = c || r || e.jQuery;
        if (!c) {
            return
        }
        if (!s.prototype.option) {
            s.prototype.option = function(t) {
                if (!c.isPlainObject(t)) {
                    return
                }
                this.options = c.extend(true, this.options, t)
            }
        }
        c.fn[h] = function(t) {
            if (typeof t == "string") {
                var e = o.call(arguments, 1);
                return i(this, t, e)
            }
            n(this, t);
            return this
        };

        function i(t, r, o) {
            var a;
            var l = "$()." + h + '("' + r + '")';
            t.each(function(t, e) {
                var i = c.data(e, h);
                if (!i) {
                    u(h + " not initialized. Cannot call methods, i.e. " + l);
                    return
                }
                var n = i[r];
                if (!n || r.charAt(0) == "_") {
                    u(l + " is not a valid method");
                    return
                }
                var s = n.apply(i, o);
                a = a === undefined ? s : a
            });
            return a !== undefined ? a : t
        }

        function n(t, n) {
            t.each(function(t, e) {
                var i = c.data(e, h);
                if (i) {
                    i.option(n);
                    i._init()
                } else {
                    i = new s(e, n);
                    c.data(e, h, i)
                }
            })
        }
        a(c)
    }

    function a(t) {
        if (!t || t && t.bridget) {
            return
        }
        t.bridget = n
    }
    a(r || e.jQuery);
    return n
});
(function(t, e) {
    if (typeof define == "function" && define.amd) {
        define("ev-emitter/ev-emitter", e)
    } else if (typeof module == "object" && module.exports) {
        module.exports = e()
    } else {
        t.EvEmitter = e()
    }
})(typeof window != "undefined" ? window : this, function() {
    function t() {}
    var e = t.prototype;
    e.on = function(t, e) {
        if (!t || !e) {
            return
        }
        var i = this._events = this._events || {};
        var n = i[t] = i[t] || [];
        if (n.indexOf(e) == -1) {
            n.push(e)
        }
        return this
    };
    e.once = function(t, e) {
        if (!t || !e) {
            return
        }
        this.on(t, e);
        var i = this._onceEvents = this._onceEvents || {};
        var n = i[t] = i[t] || {};
        n[e] = true;
        return this
    };
    e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (!i || !i.length) {
            return
        }
        var n = i.indexOf(e);
        if (n != -1) {
            i.splice(n, 1)
        }
        return this
    };
    e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (!i || !i.length) {
            return
        }
        i = i.slice(0);
        e = e || [];
        var n = this._onceEvents && this._onceEvents[t];
        for (var s = 0; s < i.length; s++) {
            var r = i[s];
            var o = n && n[r];
            if (o) {
                this.off(t, r);
                delete n[r]
            }
            r.apply(this, e)
        }
        return this
    };
    e.allOff = function() {
        delete this._events;
        delete this._onceEvents
    };
    return t
});
/*!* getSize v2.0.3 * measure size of elements */
(function(t, e) {
    if (typeof define == "function" && define.amd) {
        define("get-size/get-size", e)
    } else if (typeof module == "object" && module.exports) {
        module.exports = e()
    } else {
        t.getSize = e()
    }
})(window, function t() {
    "use strict";

    function m(t) {
        var e = parseFloat(t);
        var i = t.indexOf("%") == -1 && !isNaN(e);
        return i && e
    }

    function e() {}
    var i = typeof console == "undefined" ? e : function(t) {
        console.error(t)
    };
    var y = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
    var b = y.length;

    function E() {
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        };
        for (var e = 0; e < b; e++) {
            var i = y[e];
            t[i] = 0
        }
        return t
    }

    function S(t) {
        var e = getComputedStyle(t);
        if (!e) {
            i("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? " + "See https://bit.ly/getsizebug1")
        }
        return e
    }
    var n = false;
    var C;

    function x() {
        if (n) {
            return
        }
        n = true;
        var t = document.createElement("div");
        t.style.width = "200px";
        t.style.padding = "1px 2px 3px 4px";
        t.style.borderStyle = "solid";
        t.style.borderWidth = "1px 2px 3px 4px";
        t.style.boxSizing = "border-box";
        var e = document.body || document.documentElement;
        e.appendChild(t);
        var i = S(t);
        C = Math.round(m(i.width)) == 200;
        s.isBoxSizeOuter = C;
        e.removeChild(t)
    }

    function s(t) {
        x();
        if (typeof t == "string") {
            t = document.querySelector(t)
        }
        if (!t || typeof t != "object" || !t.nodeType) {
            return
        }
        var e = S(t);
        if (e.display == "none") {
            return E()
        }
        var i = {};
        i.width = t.offsetWidth;
        i.height = t.offsetHeight;
        var n = i.isBorderBox = e.boxSizing == "border-box";
        for (var s = 0; s < b; s++) {
            var r = y[s];
            var o = e[r];
            var a = parseFloat(o);
            i[r] = !isNaN(a) ? a : 0
        }
        var l = i.paddingLeft + i.paddingRight;
        var h = i.paddingTop + i.paddingBottom;
        var c = i.marginLeft + i.marginRight;
        var u = i.marginTop + i.marginBottom;
        var d = i.borderLeftWidth + i.borderRightWidth;
        var f = i.borderTopWidth + i.borderBottomWidth;
        var p = n && C;
        var v = m(e.width);
        if (v !== false) {
            i.width = v + (p ? 0 : l + d)
        }
        var g = m(e.height);
        if (g !== false) {
            i.height = g + (p ? 0 : h + f)
        }
        i.innerWidth = i.width - (l + d);
        i.innerHeight = i.height - (h + f);
        i.outerWidth = i.width + c;
        i.outerHeight = i.height + u;
        return i
    }
    return s
});
(function(t, e) {
    "use strict";
    if (typeof define == "function" && define.amd) {
        define("desandro-matches-selector/matches-selector", e)
    } else if (typeof module == "object" && module.exports) {
        module.exports = e()
    } else {
        t.matchesSelector = e()
    }
})(window, function t() {
    "use strict";
    var n = function() {
        var t = window.Element.prototype;
        if (t.matches) {
            return "matches"
        }
        if (t.matchesSelector) {
            return "matchesSelector"
        }
        var e = ["webkit", "moz", "ms", "o"];
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            var s = n + "MatchesSelector";
            if (t[s]) {
                return s
            }
        }
    }();
    return function t(e, i) {
        return e[n](i)
    }
});
(function(e, i) {
    if (typeof define == "function" && define.amd) {
        define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(t) {
            return i(e, t)
        })
    } else if (typeof module == "object" && module.exports) {
        module.exports = i(e, require("desandro-matches-selector"))
    } else {
        e.fizzyUIUtils = i(e, e.matchesSelector)
    }
})(window, function t(h, r) {
    var c = {};
    c.extend = function(t, e) {
        for (var i in e) {
            t[i] = e[i]
        }
        return t
    };
    c.modulo = function(t, e) {
        return (t % e + e) % e
    };
    var i = Array.prototype.slice;
    c.makeArray = function(t) {
        if (Array.isArray(t)) {
            return t
        }
        if (t === null || t === undefined) {
            return []
        }
        var e = typeof t == "object" && typeof t.length == "number";
        if (e) {
            return i.call(t)
        }
        return [t]
    };
    c.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        if (i != -1) {
            t.splice(i, 1)
        }
    };
    c.getParent = function(t, e) {
        while (t.parentNode && t != document.body) {
            t = t.parentNode;
            if (r(t, e)) {
                return t
            }
        }
    };
    c.getQueryElement = function(t) {
        if (typeof t == "string") {
            return document.querySelector(t)
        }
        return t
    };
    c.handleEvent = function(t) {
        var e = "on" + t.type;
        if (this[e]) {
            this[e](t)
        }
    };
    c.filterFindElements = function(t, n) {
        t = c.makeArray(t);
        var s = [];
        t.forEach(function(t) {
            if (!(t instanceof HTMLElement)) {
                return
            }
            if (!n) {
                s.push(t);
                return
            }
            if (r(t, n)) {
                s.push(t)
            }
            var e = t.querySelectorAll(n);
            for (var i = 0; i < e.length; i++) {
                s.push(e[i])
            }
        });
        return s
    };
    c.debounceMethod = function(t, e, n) {
        n = n || 100;
        var s = t.prototype[e];
        var r = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[r];
            clearTimeout(t);
            var e = arguments;
            var i = this;
            this[r] = setTimeout(function() {
                s.apply(i, e);
                delete i[r]
            }, n)
        }
    };
    c.docReady = function(t) {
        var e = document.readyState;
        if (e == "complete" || e == "interactive") {
            setTimeout(t)
        } else {
            document.addEventListener("DOMContentLoaded", t)
        }
    };
    c.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var u = h.console;
    c.htmlInit = function(a, l) {
        c.docReady(function() {
            var t = c.toDashed(l);
            var s = "data-" + t;
            var e = document.querySelectorAll("[" + s + "]");
            var i = document.querySelectorAll(".js-" + t);
            var n = c.makeArray(e).concat(c.makeArray(i));
            var r = s + "-options";
            var o = h.jQuery;
            n.forEach(function(e) {
                var t = e.getAttribute(s) || e.getAttribute(r);
                var i;
                try {
                    i = t && JSON.parse(t)
                } catch (t) {
                    if (u) {
                        u.error("Error parsing " + s + " on " + e.className + ": " + t)
                    }
                    return
                }
                var n = new a(e, i);
                if (o) {
                    o.data(e, l, n)
                }
            })
        })
    };
    return c
});
(function(e, i) {
    if (typeof define == "function" && define.amd) {
        define("flickity/js/cell", ["get-size/get-size"], function(t) {
            return i(e, t)
        })
    } else if (typeof module == "object" && module.exports) {
        module.exports = i(e, require("get-size"))
    } else {
        e.Flickity = e.Flickity || {};
        e.Flickity.Cell = i(e, e.getSize)
    }
})(window, function t(e, i) {
    function n(t, e) {
        this.element = t;
        this.parent = e;
        this.create()
    }
    var s = n.prototype;
    s.create = function() {
        this.element.style.position = "absolute";
        this.element.setAttribute("aria-hidden", "true");
        this.x = 0;
        this.shift = 0;
        this.element.style[this.parent.originSide] = 0
    };
    s.destroy = function() {
        this.unselect();
        this.element.style.position = "";
        var t = this.parent.originSide;
        this.element.style[t] = "";
        this.element.style.transform = "";
        this.element.removeAttribute("aria-hidden")
    };
    s.getSize = function() {
        this.size = i(this.element)
    };
    s.setPosition = function(t) {
        this.x = t;
        this.updateTarget();
        this.renderPosition(t)
    };
    s.updateTarget = s.setDefaultTarget = function() {
        var t = this.parent.originSide == "left" ? "marginLeft" : "marginRight";
        this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign
    };
    s.renderPosition = function(t) {
        var e = this.parent.originSide === "left" ? 1 : -1;
        var i = this.parent.options.percentPosition ? t * e * (this.parent.size.innerWidth / this.size.width) : t * e;
        this.element.style.transform = "translateX(" + this.parent.getPositionValue(i) + ")"
    };
    s.select = function() {
        this.element.classList.add("is-selected");
        this.element.removeAttribute("aria-hidden")
    };
    s.unselect = function() {
        this.element.classList.remove("is-selected");
        this.element.setAttribute("aria-hidden", "true")
    };
    s.wrapShift = function(t) {
        this.shift = t;
        this.renderPosition(this.x + this.parent.slideableWidth * t)
    };
    s.remove = function() {
        this.element.parentNode.removeChild(this.element)
    };
    return n
});
(function(t, e) {
    if (typeof define == "function" && define.amd) {
        define("flickity/js/slide", e)
    } else if (typeof module == "object" && module.exports) {
        module.exports = e()
    } else {
        t.Flickity = t.Flickity || {};
        t.Flickity.Slide = e()
    }
})(window, function t() {
    "use strict";

    function e(t) {
        this.parent = t;
        this.isOriginLeft = t.originSide == "left";
        this.cells = [];
        this.outerWidth = 0;
        this.height = 0
    }
    var i = e.prototype;
    i.addCell = function(t) {
        this.cells.push(t);
        this.outerWidth += t.size.outerWidth;
        this.height = Math.max(t.size.outerHeight, this.height);
        if (this.cells.length == 1) {
            this.x = t.x;
            var e = this.isOriginLeft ? "marginLeft" : "marginRight";
            this.firstMargin = t.size[e]
        }
    };
    i.updateTarget = function() {
        var t = this.isOriginLeft ? "marginRight" : "marginLeft";
        var e = this.getLastCell();
        var i = e ? e.size[t] : 0;
        var n = this.outerWidth - (this.firstMargin + i);
        this.target = this.x + this.firstMargin + n * this.parent.cellAlign
    };
    i.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    };
    i.select = function() {
        this.cells.forEach(function(t) {
            t.select()
        })
    };
    i.unselect = function() {
        this.cells.forEach(function(t) {
            t.unselect()
        })
    };
    i.getCellElements = function() {
        return this.cells.map(function(t) {
            return t.element
        })
    };
    return e
});
(function(e, i) {
    if (typeof define == "function" && define.amd) {
        define("flickity/js/animate", ["fizzy-ui-utils/utils"], function(t) {
            return i(e, t)
        })
    } else if (typeof module == "object" && module.exports) {
        module.exports = i(e, require("fizzy-ui-utils"))
    } else {
        e.Flickity = e.Flickity || {};
        e.Flickity.animatePrototype = i(e, e.fizzyUIUtils)
    }
})(window, function t(e, i) {
    var n = {};
    n.startAnimation = function() {
        if (this.isAnimating) {
            return
        }
        this.isAnimating = true;
        this.restingFrames = 0;
        this.animate()
    };
    n.animate = function() {
        this.applyDragForce();
        this.applySelectedAttraction();
        var t = this.x;
        this.integratePhysics();
        this.positionSlider();
        this.settle(t);
        if (this.isAnimating) {
            var e = this;
            requestAnimationFrame(function t() {
                e.animate()
            })
        }
    };
    n.positionSlider = function() {
        var t = this.x;
        if (this.options.wrapAround && this.cells.length > 1) {
            t = i.modulo(t, this.slideableWidth);
            t -= this.slideableWidth;
            this.shiftWrapCells(t)
        }
        this.setTranslateX(t, this.isAnimating);
        this.dispatchScrollEvent()
    };
    n.setTranslateX = function(t, e) {
        t += this.cursorPosition;
        t = this.options.rightToLeft ? -t : t;
        var i = this.getPositionValue(t);
        this.slider.style.transform = e ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")"
    };
    n.dispatchScrollEvent = function() {
        var t = this.slides[0];
        if (!t) {
            return
        }
        var e = -this.x - t.target;
        var i = e / this.slidesWidth;
        this.dispatchEvent("scroll", null, [i, e])
    };
    n.positionSliderAtSelected = function() {
        if (!this.cells.length) {
            return
        }
        this.x = -this.selectedSlide.target;
        this.velocity = 0;
        this.positionSlider()
    };
    n.getPositionValue = function(t) {
        if (this.options.percentPosition) {
            return Math.round(t / this.size.innerWidth * 1e4) * .01 + "%"
        } else {
            return Math.round(t) + "px"
        }
    };
    n.settle = function(t) {
        var e = !this.isPointerDown && Math.round(this.x * 100) == Math.round(t * 100);
        if (e) {
            this.restingFrames++
        }
        if (this.restingFrames > 2) {
            this.isAnimating = false;
            delete this.isFreeScrolling;
            this.positionSlider();
            this.dispatchEvent("settle", null, [this.selectedIndex])
        }
    };
    n.shiftWrapCells = function(t) {
        var e = this.cursorPosition + t;
        this._shiftCells(this.beforeShiftCells, e, -1);
        var i = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);
        this._shiftCells(this.afterShiftCells, i, 1)
    };
    n._shiftCells = function(t, e, i) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n];
            var r = e > 0 ? i : 0;
            s.wrapShift(r);
            e -= s.size.outerWidth
        }
    };
    n._unshiftCells = function(t) {
        if (!t || !t.length) {
            return
        }
        for (var e = 0; e < t.length; e++) {
            t[e].wrapShift(0)
        }
    };
    n.integratePhysics = function() {
        this.x += this.velocity;
        this.velocity *= this.getFrictionFactor()
    };
    n.applyForce = function(t) {
        this.velocity += t
    };
    n.getFrictionFactor = function() {
        return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
    };
    n.getRestingPosition = function() {
        return this.x + this.velocity / (1 - this.getFrictionFactor())
    };
    n.applyDragForce = function() {
        if (!this.isDraggable || !this.isPointerDown) {
            return
        }
        var t = this.dragX - this.x;
        var e = t - this.velocity;
        this.applyForce(e)
    };
    n.applySelectedAttraction = function() {
        var t = this.isDraggable && this.isPointerDown;
        if (t || this.isFreeScrolling || !this.slides.length) {
            return
        }
        var e = this.selectedSlide.target * -1 - this.x;
        var i = e * this.options.selectedAttraction;
        this.applyForce(i)
    };
    return n
});
(function(o, a) {
    if (typeof define == "function" && define.amd) {
        define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function(t, e, i, n, s, r) {
            return a(o, t, e, i, n, s, r)
        })
    } else if (typeof module == "object" && module.exports) {
        module.exports = a(o, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"))
    } else {
        var t = o.Flickity;
        o.Flickity = a(o, o.EvEmitter, o.getSize, o.fizzyUIUtils, t.Cell, t.Slide, t.animatePrototype)
    }
})(window, function t(n, e, i, a, s, o, r) {
    var l = n.jQuery;
    var h = n.getComputedStyle;
    var c = n.console;

    function u(t, e) {
        t = a.makeArray(t);
        while (t.length) {
            e.appendChild(t.shift())
        }
    }
    var d = 0;
    var f = {};

    function p(t, e) {
        var i = a.getQueryElement(t);
        if (!i) {
            if (c) {
                c.error("Bad element for Flickity: " + (i || t))
            }
            return
        }
        this.element = i;
        if (this.element.flickityGUID) {
            var n = f[this.element.flickityGUID];
            if (n) n.option(e);
            return n
        }
        if (l) {
            this.$element = l(this.element)
        }
        this.options = a.extend({}, this.constructor.defaults);
        this.option(e);
        this._create()
    }
    p.defaults = {
        accessibility: true,
        cellAlign: "center",
        freeScrollFriction: .075,
        friction: .28,
        namespaceJQueryEvents: true,
        percentPosition: true,
        resize: true,
        selectedAttraction: .025,
        setGallerySize: true
    };
    p.createMethods = [];
    var v = p.prototype;
    a.extend(v, e.prototype);
    v._create = function() {
        var t = this.guid = ++d;
        this.element.flickityGUID = t;
        f[t] = this;
        this.selectedIndex = 0;
        this.restingFrames = 0;
        this.x = 0;
        this.velocity = 0;
        this.originSide = this.options.rightToLeft ? "right" : "left";
        this.viewport = document.createElement("div");
        this.viewport.className = "flickity-viewport";
        this._createSlider();
        if (this.options.resize || this.options.watchCSS) {
            n.addEventListener("resize", this)
        }
        for (var e in this.options.on) {
            var i = this.options.on[e];
            this.on(e, i)
        }
        p.createMethods.forEach(function(t) {
            this[t]()
        }, this);
        if (this.options.watchCSS) {
            this.watchCSS()
        } else {
            this.activate()
        }
    };
    v.option = function(t) {
        a.extend(this.options, t)
    };
    v.activate = function() {
        if (this.isActive) {
            return
        }
        this.isActive = true;
        this.element.classList.add("flickity-enabled");
        if (this.options.rightToLeft) {
            this.element.classList.add("flickity-rtl")
        }
        this.getSize();
        var t = this._filterFindCellElements(this.element.children);
        u(t, this.slider);
        this.viewport.appendChild(this.slider);
        this.element.appendChild(this.viewport);
        this.reloadCells();
        if (this.options.accessibility) {
            this.element.tabIndex = 0;
            this.element.addEventListener("keydown", this)
        }
        this.emitEvent("activate");
        this.selectInitialIndex();
        this.isInitActivated = true;
        this.dispatchEvent("ready")
    };
    v._createSlider = function() {
        var t = document.createElement("div");
        t.className = "flickity-slider";
        t.style[this.originSide] = 0;
        this.slider = t
    };
    v._filterFindCellElements = function(t) {
        return a.filterFindElements(t, this.options.cellSelector)
    };
    v.reloadCells = function() {
        this.cells = this._makeCells(this.slider.children);
        this.positionCells();
        this._getWrapShiftCells();
        this.setGallerySize()
    };
    v._makeCells = function(t) {
        var e = this._filterFindCellElements(t);
        var i = e.map(function(t) {
            return new s(t, this)
        }, this);
        return i
    };
    v.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    };
    v.getLastSlide = function() {
        return this.slides[this.slides.length - 1]
    };
    v.positionCells = function() {
        this._sizeCells(this.cells);
        this._positionCells(0)
    };
    v._positionCells = function(t) {
        t = t || 0;
        this.maxCellHeight = t ? this.maxCellHeight || 0 : 0;
        var e = 0;
        if (t > 0) {
            var i = this.cells[t - 1];
            e = i.x + i.size.outerWidth
        }
        var n = this.cells.length;
        for (var s = t; s < n; s++) {
            var r = this.cells[s];
            r.setPosition(e);
            e += r.size.outerWidth;
            this.maxCellHeight = Math.max(r.size.outerHeight, this.maxCellHeight)
        }
        this.slideableWidth = e;
        this.updateSlides();
        this._containSlides();
        this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0
    };
    v._sizeCells = function(t) {
        t.forEach(function(t) {
            t.getSize()
        })
    };
    v.updateSlides = function() {
        this.slides = [];
        if (!this.cells.length) {
            return
        }
        var n = new o(this);
        this.slides.push(n);
        var t = this.originSide == "left";
        var s = t ? "marginRight" : "marginLeft";
        var r = this._getCanCellFit();
        this.cells.forEach(function(t, e) {
            if (!n.cells.length) {
                n.addCell(t);
                return
            }
            var i = n.outerWidth - n.firstMargin + (t.size.outerWidth - t.size[s]);
            if (r.call(this, e, i)) {
                n.addCell(t)
            } else {
                n.updateTarget();
                n = new o(this);
                this.slides.push(n);
                n.addCell(t)
            }
        }, this);
        n.updateTarget();
        this.updateSelectedSlide()
    };
    v._getCanCellFit = function() {
        var t = this.options.groupCells;
        if (!t) {
            return function() {
                return false
            }
        } else if (typeof t == "number") {
            var e = parseInt(t, 10);
            return function(t) {
                return t % e !== 0
            }
        }
        var i = typeof t == "string" && t.match(/^(\d+)%$/);
        var n = i ? parseInt(i[1], 10) / 100 : 1;
        return function(t, e) {
            return e <= (this.size.innerWidth + 1) * n
        }
    };
    v._init = v.reposition = function() {
        this.positionCells();
        this.positionSliderAtSelected()
    };
    v.getSize = function() {
        this.size = i(this.element);
        this.setCellAlign();
        this.cursorPosition = this.size.innerWidth * this.cellAlign
    };
    var g = {
        center: {
            left: .5,
            right: .5
        },
        left: {
            left: 0,
            right: 1
        },
        right: {
            right: 0,
            left: 1
        }
    };
    v.setCellAlign = function() {
        var t = g[this.options.cellAlign];
        this.cellAlign = t ? t[this.originSide] : this.options.cellAlign
    };
    v.setGallerySize = function() {
        if (this.options.setGallerySize) {
            var t = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
            this.viewport.style.height = t + "px"
        }
    };
    v._getWrapShiftCells = function() {
        if (!this.options.wrapAround) {
            return
        }
        this._unshiftCells(this.beforeShiftCells);
        this._unshiftCells(this.afterShiftCells);
        var t = this.cursorPosition;
        var e = this.cells.length - 1;
        this.beforeShiftCells = this._getGapCells(t, e, -1);
        t = this.size.innerWidth - this.cursorPosition;
        this.afterShiftCells = this._getGapCells(t, 0, 1)
    };
    v._getGapCells = function(t, e, i) {
        var n = [];
        while (t > 0) {
            var s = this.cells[e];
            if (!s) {
                break
            }
            n.push(s);
            e += i;
            t -= s.size.outerWidth
        }
        return n
    };
    v._containSlides = function() {
        if (!this.options.contain || this.options.wrapAround || !this.cells.length) {
            return
        }
        var t = this.options.rightToLeft;
        var e = t ? "marginRight" : "marginLeft";
        var i = t ? "marginLeft" : "marginRight";
        var n = this.slideableWidth - this.getLastCell().size[i];
        var s = n < this.size.innerWidth;
        var r = this.cursorPosition + this.cells[0].size[e];
        var o = n - this.size.innerWidth * (1 - this.cellAlign);
        this.slides.forEach(function(t) {
            if (s) {
                t.target = n * this.cellAlign
            } else {
                t.target = Math.max(t.target, r);
                t.target = Math.min(t.target, o)
            }
        }, this)
    };
    v.dispatchEvent = function(t, e, i) {
        var n = e ? [e].concat(i) : i;
        this.emitEvent(t, n);
        if (l && this.$element) {
            t += this.options.namespaceJQueryEvents ? ".flickity" : "";
            var s = t;
            if (e) {
                var r = new l.Event(e);
                r.type = t;
                s = r
            }
            this.$element.trigger(s, i)
        }
    };
    v.select = function(t, e, i) {
        if (!this.isActive) {
            return
        }
        t = parseInt(t, 10);
        this._wrapSelect(t);
        if (this.options.wrapAround || e) {
            t = a.modulo(t, this.slides.length)
        }
        if (!this.slides[t]) {
            return
        }
        var n = this.selectedIndex;
        this.selectedIndex = t;
        this.updateSelectedSlide();
        if (i) {
            this.positionSliderAtSelected()
        } else {
            this.startAnimation()
        }
        if (this.options.adaptiveHeight) {
            this.setGallerySize()
        }
        this.dispatchEvent("select", null, [t]);
        if (t != n) {
            this.dispatchEvent("change", null, [t])
        }
        this.dispatchEvent("cellSelect")
    };
    v._wrapSelect = function(t) {
        var e = this.slides.length;
        var i = this.options.wrapAround && e > 1;
        if (!i) {
            return t
        }
        var n = a.modulo(t, e);
        var s = Math.abs(n - this.selectedIndex);
        var r = Math.abs(n + e - this.selectedIndex);
        var o = Math.abs(n - e - this.selectedIndex);
        if (!this.isDragSelect && r < s) {
            t += e
        } else if (!this.isDragSelect && o < s) {
            t -= e
        }
        if (t < 0) {
            this.x -= this.slideableWidth
        } else if (t >= e) {
            this.x += this.slideableWidth
        }
    };
    v.previous = function(t, e) {
        this.select(this.selectedIndex - 1, t, e)
    };
    v.next = function(t, e) {
        this.select(this.selectedIndex + 1, t, e)
    };
    v.updateSelectedSlide = function() {
        var t = this.slides[this.selectedIndex];
        if (!t) {
            return
        }
        this.unselectSelectedSlide();
        this.selectedSlide = t;
        t.select();
        this.selectedCells = t.cells;
        this.selectedElements = t.getCellElements();
        this.selectedCell = t.cells[0];
        this.selectedElement = this.selectedElements[0]
    };
    v.unselectSelectedSlide = function() {
        if (this.selectedSlide) {
            this.selectedSlide.unselect()
        }
    };
    v.selectInitialIndex = function() {
        var t = this.options.initialIndex;
        if (this.isInitActivated) {
            this.select(this.selectedIndex, false, true);
            return
        }
        if (t && typeof t == "string") {
            var e = this.queryCell(t);
            if (e) {
                this.selectCell(t, false, true);
                return
            }
        }
        var i = 0;
        if (t && this.slides[t]) {
            i = t
        }
        this.select(i, false, true)
    };
    v.selectCell = function(t, e, i) {
        var n = this.queryCell(t);
        if (!n) {
            return
        }
        var s = this.getCellSlideIndex(n);
        this.select(s, e, i)
    };
    v.getCellSlideIndex = function(t) {
        for (var e = 0; e < this.slides.length; e++) {
            var i = this.slides[e];
            var n = i.cells.indexOf(t);
            if (n != -1) {
                return e
            }
        }
    };
    v.getCell = function(t) {
        for (var e = 0; e < this.cells.length; e++) {
            var i = this.cells[e];
            if (i.element == t) {
                return i
            }
        }
    };
    v.getCells = function(t) {
        t = a.makeArray(t);
        var i = [];
        t.forEach(function(t) {
            var e = this.getCell(t);
            if (e) {
                i.push(e)
            }
        }, this);
        return i
    };
    v.getCellElements = function() {
        return this.cells.map(function(t) {
            return t.element
        })
    };
    v.getParentCell = function(t) {
        var e = this.getCell(t);
        if (e) {
            return e
        }
        t = a.getParent(t, ".flickity-slider > *");
        return this.getCell(t)
    };
    v.getAdjacentCellElements = function(t, e) {
        if (!t) {
            return this.selectedSlide.getCellElements()
        }
        e = e === undefined ? this.selectedIndex : e;
        var i = this.slides.length;
        if (1 + t * 2 >= i) {
            return this.getCellElements()
        }
        var n = [];
        for (var s = e - t; s <= e + t; s++) {
            var r = this.options.wrapAround ? a.modulo(s, i) : s;
            var o = this.slides[r];
            if (o) {
                n = n.concat(o.getCellElements())
            }
        }
        return n
    };
    v.queryCell = function(t) {
        if (typeof t == "number") {
            return this.cells[t]
        }
        if (typeof t == "string") {
            if (t.match(/^[#.]?[\d/]/)) {
                return
            }
            t = this.element.querySelector(t)
        }
        return this.getCell(t)
    };
    v.uiChange = function() {
        this.emitEvent("uiChange")
    };
    v.childUIPointerDown = function(t) {
        if (t.type != "touchstart") {
            t.preventDefault()
        }
        this.focus()
    };
    v.onresize = function() {
        this.watchCSS();
        this.resize()
    };
    a.debounceMethod(p, "onresize", 150);
    v.resize = function() {
        if (!this.isActive || this.isAnimating || this.isDragging) {
            return
        }
        this.getSize();
        if (this.options.wrapAround) {
            this.x = a.modulo(this.x, this.slideableWidth)
        }
        this.positionCells();
        this._getWrapShiftCells();
        this.setGallerySize();
        this.emitEvent("resize");
        var t = this.selectedElements && this.selectedElements[0];
        this.selectCell(t, false, true)
    };
    v.watchCSS = function() {
        var t = this.options.watchCSS;
        if (!t) {
            return
        }
        var e = h(this.element, ":after").content;
        if (e.indexOf("flickity") != -1) {
            this.activate()
        } else {
            this.deactivate()
        }
    };
    v.onkeydown = function(t) {
        var e = document.activeElement && document.activeElement != this.element;
        if (!this.options.accessibility || e) {
            return
        }
        var i = p.keyboardHandlers[t.keyCode];
        if (i) {
            i.call(this)
        }
    };
    p.keyboardHandlers = {
        37: function() {
            var t = this.options.rightToLeft ? "next" : "previous";
            this.uiChange();
            this[t]()
        },
        39: function() {
            var t = this.options.rightToLeft ? "previous" : "next";
            this.uiChange();
            this[t]()
        }
    };
    v.focus = function() {
        var t = n.pageYOffset;
        this.element.focus({
            preventScroll: true
        });
        if (n.pageYOffset != t) {
            n.scrollTo(n.pageXOffset, t)
        }
    };
    v.deactivate = function() {
        if (!this.isActive) {
            return
        }
        this.element.classList.remove("flickity-enabled");
        this.element.classList.remove("flickity-rtl");
        this.unselectSelectedSlide();
        this.cells.forEach(function(t) {
            t.destroy()
        });
        this.element.removeChild(this.viewport);
        u(this.slider.children, this.element);
        if (this.options.accessibility) {
            this.element.removeAttribute("tabIndex");
            this.element.removeEventListener("keydown", this)
        }
        this.isActive = false;
        this.emitEvent("deactivate")
    };
    v.destroy = function() {
        this.deactivate();
        n.removeEventListener("resize", this);
        this.allOff();
        this.emitEvent("destroy");
        if (l && this.$element) {
            l.removeData(this.element, "flickity")
        }
        delete this.element.flickityGUID;
        delete f[this.guid]
    };
    a.extend(v, r);
    p.data = function(t) {
        t = a.getQueryElement(t);
        var e = t && t.flickityGUID;
        return e && f[e]
    };
    a.htmlInit(p, "flickity");
    if (l && l.bridget) {
        l.bridget("flickity", p)
    }
    p.setJQuery = function(t) {
        l = t
    };
    p.Cell = s;
    p.Slide = o;
    return p
});
/*!* Unipointer v2.4.0 * base class for doing one thing with pointer event */
(function(e, i) {
    if (typeof define == "function" && define.amd) {
        define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function(t) {
            return i(e, t)
        })
    } else if (typeof module == "object" && module.exports) {
        module.exports = i(e, require("ev-emitter"))
    } else {
        e.Unipointer = i(e, e.EvEmitter)
    }
})(window, function t(s, e) {
    function i() {}

    function n() {}
    var r = n.prototype = Object.create(e.prototype);
    r.bindStartEvent = function(t) {
        this._bindStartEvent(t, true)
    };
    r.unbindStartEvent = function(t) {
        this._bindStartEvent(t, false)
    };
    r._bindStartEvent = function(t, e) {
        e = e === undefined ? true : e;
        var i = e ? "addEventListener" : "removeEventListener";
        var n = "mousedown";
        if ("ontouchstart" in s) {
            n = "touchstart"
        } else if (s.PointerEvent) {
            n = "pointerdown"
        }
        t[i](n, this)
    };
    r.handleEvent = function(t) {
        var e = "on" + t.type;
        if (this[e]) {
            this[e](t)
        }
    };
    r.getTouch = function(t) {
        for (var e = 0; e < t.length; e++) {
            var i = t[e];
            if (i.identifier == this.pointerIdentifier) {
                return i
            }
        }
    };
    r.onmousedown = function(t) {
        var e = t.button;
        if (e && (e !== 0 && e !== 1)) {
            return
        }
        this._pointerDown(t, t)
    };
    r.ontouchstart = function(t) {
        this._pointerDown(t, t.changedTouches[0])
    };
    r.onpointerdown = function(t) {
        this._pointerDown(t, t)
    };
    r._pointerDown = function(t, e) {
        if (t.button || this.isPointerDown) {
            return
        }
        this.isPointerDown = true;
        this.pointerIdentifier = e.pointerId !== undefined ? e.pointerId : e.identifier;
        this.pointerDown(t, e)
    };
    r.pointerDown = function(t, e) {
        this._bindPostStartEvents(t);
        this.emitEvent("pointerDown", [t, e])
    };
    var o = {
        mousedown: ["mousemove", "mouseup"],
        touchstart: ["touchmove", "touchend", "touchcancel"],
        pointerdown: ["pointermove", "pointerup", "pointercancel"]
    };
    r._bindPostStartEvents = function(t) {
        if (!t) {
            return
        }
        var e = o[t.type];
        e.forEach(function(t) {
            s.addEventListener(t, this)
        }, this);
        this._boundPointerEvents = e
    };
    r._unbindPostStartEvents = function() {
        if (!this._boundPointerEvents) {
            return
        }
        this._boundPointerEvents.forEach(function(t) {
            s.removeEventListener(t, this)
        }, this);
        delete this._boundPointerEvents
    };
    r.onmousemove = function(t) {
        this._pointerMove(t, t)
    };
    r.onpointermove = function(t) {
        if (t.pointerId == this.pointerIdentifier) {
            this._pointerMove(t, t)
        }
    };
    r.ontouchmove = function(t) {
        var e = this.getTouch(t.changedTouches);
        if (e) {
            this._pointerMove(t, e)
        }
    };
    r._pointerMove = function(t, e) {
        this.pointerMove(t, e)
    };
    r.pointerMove = function(t, e) {
        this.emitEvent("pointerMove", [t, e])
    };
    r.onmouseup = function(t) {
        this._pointerUp(t, t)
    };
    r.onpointerup = function(t) {
        if (t.pointerId == this.pointerIdentifier) {
            this._pointerUp(t, t)
        }
    };
    r.ontouchend = function(t) {
        var e = this.getTouch(t.changedTouches);
        if (e) {
            this._pointerUp(t, e)
        }
    };
    r._pointerUp = function(t, e) {
        this._pointerDone();
        this.pointerUp(t, e)
    };
    r.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e])
    };
    r._pointerDone = function() {
        this._pointerReset();
        this._unbindPostStartEvents();
        this.pointerDone()
    };
    r._pointerReset = function() {
        this.isPointerDown = false;
        delete this.pointerIdentifier
    };
    r.pointerDone = i;
    r.onpointercancel = function(t) {
        if (t.pointerId == this.pointerIdentifier) {
            this._pointerCancel(t, t)
        }
    };
    r.ontouchcancel = function(t) {
        var e = this.getTouch(t.changedTouches);
        if (e) {
            this._pointerCancel(t, e)
        }
    };
    r._pointerCancel = function(t, e) {
        this._pointerDone();
        this.pointerCancel(t, e)
    };
    r.pointerCancel = function(t, e) {
        this.emitEvent("pointerCancel", [t, e])
    };
    n.getPointerPoint = function(t) {
        return {
            x: t.pageX,
            y: t.pageY
        }
    };
    return n
});
/*!* Unidragger v2.4.0 * Draggable base class */
(function(e, i) {
    if (typeof define == "function" && define.amd) {
        define("unidragger/unidragger", ["unipointer/unipointer"], function(t) {
            return i(e, t)
        })
    } else if (typeof module == "object" && module.exports) {
        module.exports = i(e, require("unipointer"))
    } else {
        e.Unidragger = i(e, e.Unipointer)
    }
})(window, function t(r, e) {
    function i() {}
    var n = i.prototype = Object.create(e.prototype);
    n.bindHandles = function() {
        this._bindHandles(true)
    };
    n.unbindHandles = function() {
        this._bindHandles(false)
    };
    n._bindHandles = function(t) {
        t = t === undefined ? true : t;
        var e = t ? "addEventListener" : "removeEventListener";
        var i = t ? this._touchActionValue : "";
        for (var n = 0; n < this.handles.length; n++) {
            var s = this.handles[n];
            this._bindStartEvent(s, t);
            s[e]("click", this);
            if (r.PointerEvent) {
                s.style.touchAction = i
            }
        }
    };
    n._touchActionValue = "none";
    n.pointerDown = function(t, e) {
        var i = this.okayPointerDown(t);
        if (!i) {
            return
        }
        this.pointerDownPointer = {
            pageX: e.pageX,
            pageY: e.pageY
        };
        t.preventDefault();
        this.pointerDownBlur();
        this._bindPostStartEvents(t);
        this.emitEvent("pointerDown", [t, e])
    };
    var s = {
        TEXTAREA: true,
        INPUT: true,
        SELECT: true,
        OPTION: true
    };
    var o = {
        radio: true,
        checkbox: true,
        button: true,
        submit: true,
        image: true,
        file: true
    };
    n.okayPointerDown = function(t) {
        var e = s[t.target.nodeName];
        var i = o[t.target.type];
        var n = !e || i;
        if (!n) {
            this._pointerReset()
        }
        return n
    };
    n.pointerDownBlur = function() {
        var t = document.activeElement;
        var e = t && t.blur && t != document.body;
        if (e) {
            t.blur()
        }
    };
    n.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.emitEvent("pointerMove", [t, e, i]);
        this._dragMove(t, e, i)
    };
    n._dragPointerMove = function(t, e) {
        var i = {
            x: e.pageX - this.pointerDownPointer.pageX,
            y: e.pageY - this.pointerDownPointer.pageY
        };
        if (!this.isDragging && this.hasDragStarted(i)) {
            this._dragStart(t, e)
        }
        return i
    };
    n.hasDragStarted = function(t) {
        return Math.abs(t.x) > 3 || Math.abs(t.y) > 3
    };
    n.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e]);
        this._dragPointerUp(t, e)
    };
    n._dragPointerUp = function(t, e) {
        if (this.isDragging) {
            this._dragEnd(t, e)
        } else {
            this._staticClick(t, e)
        }
    };
    n._dragStart = function(t, e) {
        this.isDragging = true;
        this.isPreventingClicks = true;
        this.dragStart(t, e)
    };
    n.dragStart = function(t, e) {
        this.emitEvent("dragStart", [t, e])
    };
    n._dragMove = function(t, e, i) {
        if (!this.isDragging) {
            return
        }
        this.dragMove(t, e, i)
    };
    n.dragMove = function(t, e, i) {
        t.preventDefault();
        this.emitEvent("dragMove", [t, e, i])
    };
    n._dragEnd = function(t, e) {
        this.isDragging = false;
        setTimeout(function() {
            delete this.isPreventingClicks
        }.bind(this));
        this.dragEnd(t, e)
    };
    n.dragEnd = function(t, e) {
        this.emitEvent("dragEnd", [t, e])
    };
    n.onclick = function(t) {
        if (this.isPreventingClicks) {
            t.preventDefault()
        }
    };
    n._staticClick = function(t, e) {
        if (this.isIgnoringMouseUp && t.type == "mouseup") {
            return
        }
        this.staticClick(t, e);
        if (t.type != "mouseup") {
            this.isIgnoringMouseUp = true;
            setTimeout(function() {
                delete this.isIgnoringMouseUp
            }.bind(this), 400)
        }
    };
    n.staticClick = function(t, e) {
        this.emitEvent("staticClick", [t, e])
    };
    i.getPointerPoint = e.getPointerPoint;
    return i
});
(function(n, s) {
    if (typeof define == "function" && define.amd) {
        define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function(t, e, i) {
            return s(n, t, e, i)
        })
    } else if (typeof module == "object" && module.exports) {
        module.exports = s(n, require("./flickity"), require("unidragger"), require("fizzy-ui-utils"))
    } else {
        n.Flickity = s(n, n.Flickity, n.Unidragger, n.fizzyUIUtils)
    }
})(window, function t(n, e, i, a) {
    a.extend(e.defaults, {
        draggable: ">1",
        dragThreshold: 3
    });
    e.createMethods.push("_createDrag");
    var s = e.prototype;
    a.extend(s, i.prototype);
    s._touchActionValue = "pan-y";
    s._createDrag = function() {
        this.on("activate", this.onActivateDrag);
        this.on("uiChange", this._uiChangeDrag);
        this.on("deactivate", this.onDeactivateDrag);
        this.on("cellChange", this.updateDraggable)
    };
    s.onActivateDrag = function() {
        this.handles = [this.viewport];
        this.bindHandles();
        this.updateDraggable()
    };
    s.onDeactivateDrag = function() {
        this.unbindHandles();
        this.element.classList.remove("is-draggable")
    };
    s.updateDraggable = function() {
        if (this.options.draggable == ">1") {
            this.isDraggable = this.slides.length > 1
        } else {
            this.isDraggable = this.options.draggable
        }
        if (this.isDraggable) {
            this.element.classList.add("is-draggable")
        } else {
            this.element.classList.remove("is-draggable")
        }
    };
    s.bindDrag = function() {
        this.options.draggable = true;
        this.updateDraggable()
    };
    s.unbindDrag = function() {
        this.options.draggable = false;
        this.updateDraggable()
    };
    s._uiChangeDrag = function() {
        delete this.isFreeScrolling
    };
    s.pointerDown = function(t, e) {
        if (!this.isDraggable) {
            this._pointerDownDefault(t, e);
            return
        }
        var i = this.okayPointerDown(t);
        if (!i) {
            return
        }
        this._pointerDownPreventDefault(t);
        this.pointerDownFocus(t);
        if (document.activeElement != this.element) {
            this.pointerDownBlur()
        }
        this.dragX = this.x;
        this.viewport.classList.add("is-pointer-down");
        this.pointerDownScroll = o();
        n.addEventListener("scroll", this);
        this._pointerDownDefault(t, e)
    };
    s._pointerDownDefault = function(t, e) {
        this.pointerDownPointer = {
            pageX: e.pageX,
            pageY: e.pageY
        };
        this._bindPostStartEvents(t);
        this.dispatchEvent("pointerDown", t, [e])
    };
    var r = {
        INPUT: true,
        TEXTAREA: true,
        SELECT: true
    };
    s.pointerDownFocus = function(t) {
        var e = r[t.target.nodeName];
        if (!e) {
            this.focus()
        }
    };
    s._pointerDownPreventDefault = function(t) {
        var e = t.type == "touchstart";
        var i = t.pointerType == "touch";
        var n = r[t.target.nodeName];
        if (!e && !i && !n) {
            t.preventDefault()
        }
    };
    s.hasDragStarted = function(t) {
        return Math.abs(t.x) > this.options.dragThreshold
    };
    s.pointerUp = function(t, e) {
        delete this.isTouchScrolling;
        this.viewport.classList.remove("is-pointer-down");
        this.dispatchEvent("pointerUp", t, [e]);
        this._dragPointerUp(t, e)
    };
    s.pointerDone = function() {
        n.removeEventListener("scroll", this);
        delete this.pointerDownScroll
    };
    s.dragStart = function(t, e) {
        if (!this.isDraggable) {
            return
        }
        this.dragStartPosition = this.x;
        this.startAnimation();
        n.removeEventListener("scroll", this);
        this.dispatchEvent("dragStart", t, [e])
    };
    s.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.dispatchEvent("pointerMove", t, [e, i]);
        this._dragMove(t, e, i)
    };
    s.dragMove = function(t, e, i) {
        if (!this.isDraggable) {
            return
        }
        t.preventDefault();
        this.previousDragX = this.dragX;
        var n = this.options.rightToLeft ? -1 : 1;
        if (this.options.wrapAround) {
            i.x %= this.slideableWidth
        }
        var s = this.dragStartPosition + i.x * n;
        if (!this.options.wrapAround && this.slides.length) {
            var r = Math.max(-this.slides[0].target, this.dragStartPosition);
            s = s > r ? (s + r) * .5 : s;
            var o = Math.min(-this.getLastSlide().target, this.dragStartPosition);
            s = s < o ? (s + o) * .5 : s
        }
        this.dragX = s;
        this.dragMoveTime = new Date;
        this.dispatchEvent("dragMove", t, [e, i])
    };
    s.dragEnd = function(t, e) {
        if (!this.isDraggable) {
            return
        }
        if (this.options.freeScroll) {
            this.isFreeScrolling = true
        }
        var i = this.dragEndRestingSelect();
        if (this.options.freeScroll && !this.options.wrapAround) {
            var n = this.getRestingPosition();
            this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target
        } else if (!this.options.freeScroll && i == this.selectedIndex) {
            i += this.dragEndBoostSelect()
        }
        delete this.previousDragX;
        this.isDragSelect = this.options.wrapAround;
        this.select(i);
        delete this.isDragSelect;
        this.dispatchEvent("dragEnd", t, [e])
    };
    s.dragEndRestingSelect = function() {
        var t = this.getRestingPosition();
        var e = Math.abs(this.getSlideDistance(-t, this.selectedIndex));
        var i = this._getClosestResting(t, e, 1);
        var n = this._getClosestResting(t, e, -1);
        var s = i.distance < n.distance ? i.index : n.index;
        return s
    };
    s._getClosestResting = function(t, e, i) {
        var n = this.selectedIndex;
        var s = Infinity;
        var r = this.options.contain && !this.options.wrapAround ? function(t, e) {
            return t <= e
        } : function(t, e) {
            return t < e
        };
        while (r(e, s)) {
            n += i;
            s = e;
            e = this.getSlideDistance(-t, n);
            if (e === null) {
                break
            }
            e = Math.abs(e)
        }
        return {
            distance: s,
            index: n - i
        }
    };
    s.getSlideDistance = function(t, e) {
        var i = this.slides.length;
        var n = this.options.wrapAround && i > 1;
        var s = n ? a.modulo(e, i) : e;
        var r = this.slides[s];
        if (!r) {
            return null
        }
        var o = n ? this.slideableWidth * Math.floor(e / i) : 0;
        return t - (r.target + o)
    };
    s.dragEndBoostSelect = function() {
        if (this.previousDragX === undefined || !this.dragMoveTime || new Date - this.dragMoveTime > 100) {
            return 0
        }
        var t = this.getSlideDistance(-this.dragX, this.selectedIndex);
        var e = this.previousDragX - this.dragX;
        if (t > 0 && e > 0) {
            return 1
        } else if (t < 0 && e < 0) {
            return -1
        }
        return 0
    };
    s.staticClick = function(t, e) {
        var i = this.getParentCell(t.target);
        var n = i && i.element;
        var s = i && this.cells.indexOf(i);
        this.dispatchEvent("staticClick", t, [e, n, s])
    };
    s.onscroll = function() {
        var t = o();
        var e = this.pointerDownScroll.x - t.x;
        var i = this.pointerDownScroll.y - t.y;
        if (Math.abs(e) > 3 || Math.abs(i) > 3) {
            this._pointerDone()
        }
    };

    function o() {
        return {
            x: n.pageXOffset,
            y: n.pageYOffset
        }
    }
    return e
});
(function(n, s) {
    if (typeof define == "function" && define.amd) {
        define("flickity/js/prev-next-button", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function(t, e, i) {
            return s(n, t, e, i)
        })
    } else if (typeof module == "object" && module.exports) {
        module.exports = s(n, require("./flickity"), require("unipointer"), require("fizzy-ui-utils"))
    } else {
        s(n, n.Flickity, n.Unipointer, n.fizzyUIUtils)
    }
})(window, function t(e, i, n, s) {
    "use strict";
    var r = "http://www.w3.org/2000/svg";

    function o(t, e) {
        this.direction = t;
        this.parent = e;
        this._create()
    }
    o.prototype = Object.create(n.prototype);
    o.prototype._create = function() {
        this.isEnabled = true;
        this.isPrevious = this.direction == -1;
        var t = this.parent.options.rightToLeft ? 1 : -1;
        this.isLeft = this.direction == t;
        var e = this.element = document.createElement("button");
        e.className = "flickity-button flickity-prev-next-button";
        e.className += this.isPrevious ? " previous" : " next";
        e.setAttribute("type", "button");
        this.disable();
        e.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
        var i = this.createSVG();
        e.appendChild(i);
        this.parent.on("select", this.update.bind(this));
        this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    };
    o.prototype.activate = function() {
        this.bindStartEvent(this.element);
        this.element.addEventListener("click", this);
        this.parent.element.appendChild(this.element)
    };
    o.prototype.deactivate = function() {
        this.parent.element.removeChild(this.element);
        this.unbindStartEvent(this.element);
        this.element.removeEventListener("click", this)
    };
    o.prototype.createSVG = function() {
        var t = document.createElementNS(r, "svg");
        t.setAttribute("class", "flickity-button-icon");
        t.setAttribute("viewBox", "0 0 100 100");
        var e = document.createElementNS(r, "path");
        var i = a(this.parent.options.arrowShape);
        e.setAttribute("d", i);
        e.setAttribute("class", "arrow");
        if (!this.isLeft) {
            e.setAttribute("transform", "translate(100, 100) rotate(180) ")
        }
        t.appendChild(e);
        return t
    };

    function a(t) {
        if (typeof t == "string") {
            return t
        }
        return "M " + t.x0 + ",50" + " L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50 " + " L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z"
    }
    o.prototype.handleEvent = s.handleEvent;
    o.prototype.onclick = function() {
        if (!this.isEnabled) {
            return
        }
        this.parent.uiChange();
        var t = this.isPrevious ? "previous" : "next";
        this.parent[t]()
    };
    o.prototype.enable = function() {
        if (this.isEnabled) {
            return
        }
        this.element.disabled = false;
        this.isEnabled = true
    };
    o.prototype.disable = function() {
        if (!this.isEnabled) {
            return
        }
        this.element.disabled = true;
        this.isEnabled = false
    };
    o.prototype.update = function() {
        var t = this.parent.slides;
        if (this.parent.options.wrapAround && t.length > 1) {
            this.enable();
            return
        }
        var e = t.length ? t.length - 1 : 0;
        var i = this.isPrevious ? 0 : e;
        var n = this.parent.selectedIndex == i ? "disable" : "enable";
        this[n]()
    };
    o.prototype.destroy = function() {
        this.deactivate();
        this.allOff()
    };
    s.extend(i.defaults, {
        prevNextButtons: true,
        arrowShape: {
            x0: 10,
            x1: 60,
            y1: 50,
            x2: 70,
            y2: 40,
            x3: 30
        }
    });
    i.createMethods.push("_createPrevNextButtons");
    var l = i.prototype;
    l._createPrevNextButtons = function() {
        if (!this.options.prevNextButtons) {
            return
        }
        this.prevButton = new o(-1, this);
        this.nextButton = new o(1, this);
        this.on("activate", this.activatePrevNextButtons)
    };
    l.activatePrevNextButtons = function() {
        this.prevButton.activate();
        this.nextButton.activate();
        this.on("deactivate", this.deactivatePrevNextButtons)
    };
    l.deactivatePrevNextButtons = function() {
        this.prevButton.deactivate();
        this.nextButton.deactivate();
        this.off("deactivate", this.deactivatePrevNextButtons)
    };
    i.PrevNextButton = o;
    return i
});
(function(n, s) {
    if (typeof define == "function" && define.amd) {
        define("flickity/js/page-dots", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function(t, e, i) {
            return s(n, t, e, i)
        })
    } else if (typeof module == "object" && module.exports) {
        module.exports = s(n, require("./flickity"), require("unipointer"), require("fizzy-ui-utils"))
    } else {
        s(n, n.Flickity, n.Unipointer, n.fizzyUIUtils)
    }
})(window, function t(e, i, n, s) {
    function r(t) {
        this.parent = t;
        this._create()
    }
    r.prototype = Object.create(n.prototype);
    r.prototype._create = function() {
        this.holder = document.createElement("ol");
        this.holder.className = "flickity-page-dots";
        this.dots = [];
        this.handleClick = this.onClick.bind(this);
        this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    };
    r.prototype.activate = function() {
        this.setDots();
        this.holder.addEventListener("click", this.handleClick);
        this.bindStartEvent(this.holder);
        this.parent.element.appendChild(this.holder)
    };
    r.prototype.deactivate = function() {
        this.holder.removeEventListener("click", this.handleClick);
        this.unbindStartEvent(this.holder);
        this.parent.element.removeChild(this.holder)
    };
    r.prototype.setDots = function() {
        var t = this.parent.slides.length - this.dots.length;
        if (t > 0) {
            this.addDots(t)
        } else if (t < 0) {
            this.removeDots(-t)
        }
    };
    r.prototype.addDots = function(t) {
        var e = document.createDocumentFragment();
        var i = [];
        var n = this.dots.length;
        var s = n + t;
        for (var r = n; r < s; r++) {
            var o = document.createElement("li");
            o.className = "dot";
            o.setAttribute("aria-label", "Page dot " + (r + 1));
            e.appendChild(o);
            i.push(o)
        }
        this.holder.appendChild(e);
        this.dots = this.dots.concat(i)
    };
    r.prototype.removeDots = function(t) {
        var e = this.dots.splice(this.dots.length - t, t);
        e.forEach(function(t) {
            this.holder.removeChild(t)
        }, this)
    };
    r.prototype.updateSelected = function() {
        if (this.selectedDot) {
            this.selectedDot.className = "dot";
            this.selectedDot.removeAttribute("aria-current")
        }
        if (!this.dots.length) {
            return
        }
        this.selectedDot = this.dots[this.parent.selectedIndex];
        this.selectedDot.className = "dot is-selected";
        this.selectedDot.setAttribute("aria-current", "step")
    };
    r.prototype.onTap = r.prototype.onClick = function(t) {
        var e = t.target;
        if (e.nodeName != "LI") {
            return
        }
        this.parent.uiChange();
        var i = this.dots.indexOf(e);
        this.parent.select(i)
    };
    r.prototype.destroy = function() {
        this.deactivate();
        this.allOff()
    };
    i.PageDots = r;
    s.extend(i.defaults, {
        pageDots: true
    });
    i.createMethods.push("_createPageDots");
    var o = i.prototype;
    o._createPageDots = function() {
        if (!this.options.pageDots) {
            return
        }
        this.pageDots = new r(this);
        this.on("activate", this.activatePageDots);
        this.on("select", this.updateSelectedPageDots);
        this.on("cellChange", this.updatePageDots);
        this.on("resize", this.updatePageDots);
        this.on("deactivate", this.deactivatePageDots)
    };
    o.activatePageDots = function() {
        this.pageDots.activate()
    };
    o.updateSelectedPageDots = function() {
        this.pageDots.updateSelected()
    };
    o.updatePageDots = function() {
        this.pageDots.setDots()
    };
    o.deactivatePageDots = function() {
        this.pageDots.deactivate()
    };
    i.PageDots = r;
    return i
});
(function(t, n) {
    if (typeof define == "function" && define.amd) {
        define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function(t, e, i) {
            return n(t, e, i)
        })
    } else if (typeof module == "object" && module.exports) {
        module.exports = n(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity"))
    } else {
        n(t.EvEmitter, t.fizzyUIUtils, t.Flickity)
    }
})(window, function t(e, i, n) {
    function s(t) {
        this.parent = t;
        this.state = "stopped";
        this.onVisibilityChange = this.visibilityChange.bind(this);
        this.onVisibilityPlay = this.visibilityPlay.bind(this)
    }
    s.prototype = Object.create(e.prototype);
    s.prototype.play = function() {
        if (this.state == "playing") {
            return
        }
        var t = document.hidden;
        if (t) {
            document.addEventListener("visibilitychange", this.onVisibilityPlay);
            return
        }
        this.state = "playing";
        document.addEventListener("visibilitychange", this.onVisibilityChange);
        this.tick()
    };
    s.prototype.tick = function() {
        if (this.state != "playing") {
            return
        }
        var t = this.parent.options.autoPlay;
        t = typeof t == "number" ? t : 3e3;
        var e = this;
        this.clear();
        this.timeout = setTimeout(function() {
            e.parent.next(true);
            e.tick()
        }, t)
    };
    s.prototype.stop = function() {
        this.state = "stopped";
        this.clear();
        document.removeEventListener("visibilitychange", this.onVisibilityChange)
    };
    s.prototype.clear = function() {
        clearTimeout(this.timeout)
    };
    s.prototype.pause = function() {
        if (this.state == "playing") {
            this.state = "paused";
            this.clear()
        }
    };
    s.prototype.unpause = function() {
        if (this.state == "paused") {
            this.play()
        }
    };
    s.prototype.visibilityChange = function() {
        var t = document.hidden;
        this[t ? "pause" : "unpause"]()
    };
    s.prototype.visibilityPlay = function() {
        this.play();
        document.removeEventListener("visibilitychange", this.onVisibilityPlay)
    };
    i.extend(n.defaults, {
        pauseAutoPlayOnHover: true
    });
    n.createMethods.push("_createPlayer");
    var r = n.prototype;
    r._createPlayer = function() {
        this.player = new s(this);
        this.on("activate", this.activatePlayer);
        this.on("uiChange", this.stopPlayer);
        this.on("pointerDown", this.stopPlayer);
        this.on("deactivate", this.deactivatePlayer)
    };
    r.activatePlayer = function() {
        if (!this.options.autoPlay) {
            return
        }
        this.player.play();
        this.element.addEventListener("mouseenter", this)
    };
    r.playPlayer = function() {
        this.player.play()
    };
    r.stopPlayer = function() {
        this.player.stop()
    };
    r.pausePlayer = function() {
        this.player.pause()
    };
    r.unpausePlayer = function() {
        this.player.unpause()
    };
    r.deactivatePlayer = function() {
        this.player.stop();
        this.element.removeEventListener("mouseenter", this)
    };
    r.onmouseenter = function() {
        if (!this.options.pauseAutoPlayOnHover) {
            return
        }
        this.player.pause();
        this.element.addEventListener("mouseleave", this)
    };
    r.onmouseleave = function() {
        this.player.unpause();
        this.element.removeEventListener("mouseleave", this)
    };
    n.Player = s;
    return n
});
(function(i, n) {
    if (typeof define == "function" && define.amd) {
        define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function(t, e) {
            return n(i, t, e)
        })
    } else if (typeof module == "object" && module.exports) {
        module.exports = n(i, require("./flickity"), require("fizzy-ui-utils"))
    } else {
        n(i, i.Flickity, i.fizzyUIUtils)
    }
})(window, function t(e, i, n) {
    function l(t) {
        var e = document.createDocumentFragment();
        t.forEach(function(t) {
            e.appendChild(t.element)
        });
        return e
    }
    var s = i.prototype;
    s.insert = function(t, e) {
        var i = this._makeCells(t);
        if (!i || !i.length) {
            return
        }
        var n = this.cells.length;
        e = e === undefined ? n : e;
        var s = l(i);
        var r = e == n;
        if (r) {
            this.slider.appendChild(s)
        } else {
            var o = this.cells[e].element;
            this.slider.insertBefore(s, o)
        }
        if (e === 0) {
            this.cells = i.concat(this.cells)
        } else if (r) {
            this.cells = this.cells.concat(i)
        } else {
            var a = this.cells.splice(e, n - e);
            this.cells = this.cells.concat(i).concat(a)
        }
        this._sizeCells(i);
        this.cellChange(e, true)
    };
    s.append = function(t) {
        this.insert(t, this.cells.length)
    };
    s.prepend = function(t) {
        this.insert(t, 0)
    };
    s.remove = function(t) {
        var e = this.getCells(t);
        if (!e || !e.length) {
            return
        }
        var i = this.cells.length - 1;
        e.forEach(function(t) {
            t.remove();
            var e = this.cells.indexOf(t);
            i = Math.min(e, i);
            n.removeFrom(this.cells, t)
        }, this);
        this.cellChange(i, true)
    };
    s.cellSizeChange = function(t) {
        var e = this.getCell(t);
        if (!e) {
            return
        }
        e.getSize();
        var i = this.cells.indexOf(e);
        this.cellChange(i)
    };
    s.cellChange = function(t, e) {
        var i = this.selectedElement;
        this._positionCells(t);
        this._getWrapShiftCells();
        this.setGallerySize();
        var n = this.getCell(i);
        if (n) {
            this.selectedIndex = this.getCellSlideIndex(n)
        }
        this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex);
        this.emitEvent("cellChange", [t]);
        this.select(this.selectedIndex);
        if (e) {
            this.positionSliderAtSelected()
        }
    };
    return i
});
(function(i, n) {
    if (typeof define == "function" && define.amd) {
        define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function(t, e) {
            return n(i, t, e)
        })
    } else if (typeof module == "object" && module.exports) {
        module.exports = n(i, require("./flickity"), require("fizzy-ui-utils"))
    } else {
        n(i, i.Flickity, i.fizzyUIUtils)
    }
})(window, function t(e, i, o) {
    "use strict";
    i.createMethods.push("_createLazyload");
    var n = i.prototype;
    n._createLazyload = function() {
        this.on("select", this.lazyLoad)
    };
    n.lazyLoad = function() {
        var t = this.options.lazyLoad;
        if (!t) {
            return
        }
        var e = typeof t == "number" ? t : 0;
        var i = this.getAdjacentCellElements(e);
        var n = [];
        i.forEach(function(t) {
            var e = s(t);
            n = n.concat(e)
        });
        n.forEach(function(t) {
            new r(t, this)
        }, this)
    };

    function s(t) {
        if (t.nodeName == "IMG") {
            var e = t.getAttribute("data-flickity-lazyload");
            var i = t.getAttribute("data-flickity-lazyload-src");
            var n = t.getAttribute("data-flickity-lazyload-srcset");
            if (e || i || n) {
                return [t]
            }
        }
        var s = "img[data-flickity-lazyload], " + "img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]";
        var r = t.querySelectorAll(s);
        return o.makeArray(r)
    }

    function r(t, e) {
        this.img = t;
        this.flickity = e;
        this.load()
    }
    r.prototype.handleEvent = o.handleEvent;
    r.prototype.load = function() {
        this.img.addEventListener("load", this);
        this.img.addEventListener("error", this);
        var t = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src");
        var e = this.img.getAttribute("data-flickity-lazyload-srcset");
        this.img.src = t;
        if (e) {
            this.img.setAttribute("srcset", e)
        }
        this.img.removeAttribute("data-flickity-lazyload");
        this.img.removeAttribute("data-flickity-lazyload-src");
        this.img.removeAttribute("data-flickity-lazyload-srcset")
    };
    r.prototype.onload = function(t) {
        this.complete(t, "flickity-lazyloaded")
    };
    r.prototype.onerror = function(t) {
        this.complete(t, "flickity-lazyerror")
    };
    r.prototype.complete = function(t, e) {
        this.img.removeEventListener("load", this);
        this.img.removeEventListener("error", this);
        var i = this.flickity.getParentCell(this.img);
        var n = i && i.element;
        this.flickity.cellSizeChange(n);
        this.img.classList.add(e);
        this.flickity.dispatchEvent("lazyLoad", t, n)
    };
    i.LazyLoader = r;
    return i
});
/*!* Flickity v2.3.0 * https://flickity.metafizzy.co */
(function(t, e) {
    if (typeof define == "function" && define.amd) {
        define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], e)
    } else if (typeof module == "object" && module.exports) {
        module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload"))
    }
})(window, function t(e) {
    return e
});
/*!* Flickity asNavFor v2.0.2 * enable asNavFor for Flickity */
(function(t, e) {
    if (typeof define == "function" && define.amd) {
        define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], e)
    } else if (typeof module == "object" && module.exports) {
        module.exports = e(require("flickity"), require("fizzy-ui-utils"))
    } else {
        t.Flickity = e(t.Flickity, t.fizzyUIUtils)
    }
})(window, function t(n, s) {
    n.createMethods.push("_createAsNavFor");
    var e = n.prototype;
    e._createAsNavFor = function() {
        this.on("activate", this.activateAsNavFor);
        this.on("deactivate", this.deactivateAsNavFor);
        this.on("destroy", this.destroyAsNavFor);
        var e = this.options.asNavFor;
        if (!e) {
            return
        }
        var i = this;
        setTimeout(function t() {
            i.setNavCompanion(e)
        })
    };
    e.setNavCompanion = function(t) {
        t = s.getQueryElement(t);
        var e = n.data(t);
        if (!e || e == this) {
            return
        }
        this.navCompanion = e;
        var i = this;
        this.onNavCompanionSelect = function() {
            i.navCompanionSelect()
        };
        e.on("select", this.onNavCompanionSelect);
        this.on("staticClick", this.onNavStaticClick);
        this.navCompanionSelect(true)
    };
    e.navCompanionSelect = function(t) {
        var e = this.navCompanion && this.navCompanion.selectedCells;
        if (!e) {
            return
        }
        var i = e[0];
        var n = this.navCompanion.cells.indexOf(i);
        var s = n + e.length - 1;
        var r = Math.floor(a(n, s, this.navCompanion.cellAlign));
        this.selectCell(r, false, t);
        this.removeNavSelectedElements();
        if (r >= this.cells.length) {
            return
        }
        var o = this.cells.slice(n, s + 1);
        this.navSelectedElements = o.map(function(t) {
            return t.element
        });
        this.changeNavSelectedClass("add")
    };

    function a(t, e, i) {
        return (e - t) * i + t
    }
    e.changeNavSelectedClass = function(e) {
        this.navSelectedElements.forEach(function(t) {
            t.classList[e]("is-nav-selected")
        })
    };
    e.activateAsNavFor = function() {
        this.navCompanionSelect(true)
    };
    e.removeNavSelectedElements = function() {
        if (!this.navSelectedElements) {
            return
        }
        this.changeNavSelectedClass("remove");
        delete this.navSelectedElements
    };
    e.onNavStaticClick = function(t, e, i, n) {
        if (typeof n == "number") {
            this.navCompanion.selectCell(n)
        }
    };
    e.deactivateAsNavFor = function() {
        this.removeNavSelectedElements()
    };
    e.destroyAsNavFor = function() {
        if (!this.navCompanion) {
            return
        }
        this.navCompanion.off("select", this.onNavCompanionSelect);
        this.off("staticClick", this.onNavStaticClick);
        delete this.navCompanion
    };
    return n
});
/** Flickity fade v1.0.0 * Fade between Flickity slides */
! function(b, a) {
    "function" == typeof define && define.amd ? define(["flickity/js/index", "fizzy-ui-utils/utils", ], a) : "object" == typeof module && module.exports ? module.exports = a(require("flickity"), require("fizzy-ui-utils")) : a(b.Flickity, b.fizzyUIUtils)
}(this, function(b, d) {
    var c = b.Slide,
        e = c.prototype.updateTarget;
    c.prototype.updateTarget = function() {
        if (e.apply(this, arguments), this.parent.options.fade) {
            var a = this.target - this.x,
                b = this.cells[0].x;
            this.cells.forEach(function(c) {
                var d = c.x - b - a;
                c.renderPosition(d)
            })
        }
    }, c.prototype.setOpacity = function(a) {
        this.cells.forEach(function(b) {
            b.element.style.opacity = a
        })
    };
    var a = b.prototype;
    b.createMethods.push("_createFade"), a._createFade = function() {
        this.fadeIndex = this.selectedIndex, this.prevSelectedIndex = this.selectedIndex, this.on("select", this.onSelectFade), this.on("dragEnd", this.onDragEndFade), this.on("settle", this.onSettleFade), this.on("activate", this.onActivateFade), this.on("deactivate", this.onDeactivateFade)
    };
    var f = a.updateSlides;
    a.updateSlides = function() {
        f.apply(this, arguments), this.options.fade && this.slides.forEach(function(a, b) {
            var c = b == this.selectedIndex ? 1 : 0;
            a.setOpacity(c)
        }, this)
    }, a.onSelectFade = function() {
        this.fadeIndex = Math.min(this.prevSelectedIndex, this.slides.length - 1), this.prevSelectedIndex = this.selectedIndex
    }, a.onSettleFade = function() {
        delete this.didDragEnd, this.options.fade && (this.selectedSlide.setOpacity(1), this.slides[this.fadeIndex] && this.fadeIndex != this.selectedIndex && this.slides[this.fadeIndex].setOpacity(0))
    }, a.onDragEndFade = function() {
        this.didDragEnd = !0
    }, a.onActivateFade = function() {
        this.options.fade && this.element.classList.add("is-fade")
    }, a.onDeactivateFade = function() {
        this.options.fade && (this.element.classList.remove("is-fade"), this.slides.forEach(function(a) {
            a.setOpacity("")
        }))
    };
    var g = a.positionSlider;
    a.positionSlider = function() {
        if (!this.options.fade) {
            g.apply(this, arguments);
            return
        }
        this.fadeSlides(), this.dispatchScrollEvent()
    };
    var h = a.positionSliderAtSelected;
    a.positionSliderAtSelected = function() {
        this.options.fade && this.setTranslateX(0), h.apply(this, arguments)
    }, a.fadeSlides = function() {
        if (!(this.slides.length < 2)) {
            var a = this.getFadeIndexes(),
                c = this.slides[a.a],
                e = this.slides[a.b],
                f = this.wrapDifference(c.target, e.target),
                b = this.wrapDifference(c.target, -this.x);
            b /= f, c.setOpacity(1 - b), e.setOpacity(b);
            var d = a.a;
            this.isDragging && (d = b > .5 ? a.a : a.b), void 0 != this.fadeHideIndex && this.fadeHideIndex != d && this.fadeHideIndex != a.a && this.fadeHideIndex != a.b && this.slides[this.fadeHideIndex].setOpacity(0), this.fadeHideIndex = d
        }
    }, a.getFadeIndexes = function() {
        return this.isDragging || this.didDragEnd ? this.options.wrapAround ? this.getFadeDragWrapIndexes() : this.getFadeDragLimitIndexes() : {
            a: this.fadeIndex,
            b: this.selectedIndex
        }
    }, a.getFadeDragWrapIndexes = function() {
        var b = this.slides.map(function(b, a) {
                return this.getSlideDistance(-this.x, a)
            }, this),
            c = b.map(function(a) {
                return Math.abs(a)
            }),
            e = Math.min.apply(Math, c),
            a = c.indexOf(e),
            f = b[a],
            g = this.slides.length;
        return {
            a: a,
            b: d.modulo(a + (f >= 0 ? 1 : -1), g)
        }
    }, a.getFadeDragLimitIndexes = function() {
        for (var b = 0, a = 0; a < this.slides.length - 1; a++) {
            var c = this.slides[a];
            if (-this.x < c.target) break;
            b = a
        }
        return {
            a: b,
            b: b + 1
        }
    }, a.wrapDifference = function(d, e) {
        var a = e - d;
        if (!this.options.wrapAround) return a;
        var b = a + this.slideableWidth,
            c = a - this.slideableWidth;
        return Math.abs(b) < Math.abs(a) && (a = b), Math.abs(c) < Math.abs(a) && (a = c), a
    };
    var i = a._getWrapShiftCells;
    a._getWrapShiftCells = function() {
        this.options.fade || i.apply(this, arguments)
    };
    var j = a.shiftWrapCells;
    return a.shiftWrapCells = function() {
        this.options.fade || j.apply(this, arguments)
    }, b
});