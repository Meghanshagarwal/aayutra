(function(shopify) {
    (() => {
        var ae = "WebPixel::Render";
        var D = e => shopify.extend(ae, e);
        var F = {
                config: 0,
                set: 1,
                page_view: 2,
                view_item: 3,
                add_to_cart: 4,
                purchase: 5,
                begin_checkout: 6,
                search: 7,
                add_payment_info: 8,
                update: 9,
                default: 10
            },
            oe = {
                send_to: 0,
                page_path: 1,
                page_title: 2,
                page_location: 3,
                ignore_referrer: 4,
                ecomm_prodid: 5,
                ecomm_totalvalue: 6,
                ecomm_pagetype: 7,
                items: 8,
                id: 9,
                name: 10,
                brand: 11,
                category: 12,
                coupon: 13,
                price: 14,
                quantity: 15,
                variant: 16,
                value: 17,
                currency: 18,
                tax: 19,
                shipping: 20,
                search_term: 21,
                total: 22,
                transaction_id: 23,
                ad_storage: 24,
                ad_user_data: 25,
                ad_personalization: 26,
                analytics_storage: 27
            },
            se = {
                config: [],
                set: [],
                page_view: ["send_to"],
                view_item: ["send_to", "ecomm_prodid"],
                add_to_cart: ["send_to", "ecomm_prodid"],
                purchase: ["send_to", "transaction_id"],
                begin_checkout: ["send_to"],
                search: ["send_to"],
                add_payment_info: ["send_to"]
            };
        var de = "",
            ue = function(e) {
                de = e
            },
            ve = Math.floor(Math.random() * 2147483648),
            fe = function() {
                if (arguments[0] === "js") return;
                let r = window.dataLayer.filter(o => Object.prototype.toString.call(o) === "[object Arguments]").filter(o => le(o, arguments)),
                    c = be(r, arguments);
                if (!c) {
                    let o = arguments,
                        i = !1,
                        v = window.gtag;
                    window.gtag = function() {
                        return !i && le(arguments, o) && (ce(arguments, o), i = !0), v == null ? void 0 : v(...arguments)
                    };
                    return
                }
                ce(c, arguments)
            };

        function be(e, r) {
            if (e.length === 0) return;
            if (r[0] === "set") {
                let o = e.filter(i => O(r[1], i[1], []));
                return o.length > 0 ? o[0] : e[0]
            } else e.sort((o, i) => we(r[2], o[2], i[2]));
            return e[0]
        }

        function we(e, r, c) {
            let o = [],
                i = [];
            return O(e, r, o), O(e, c, i), o.length - i.length
        }
        var ce = function(e, r) {
            let c = r[0],
                o = r[1],
                i = r[2],
                v = F[o];
            (c === "set" || c === "config") && (v = F[c]);
            let d = [`id=${de}`, `pid=${ve}`];
            if (c === "set") {
                if (!O(r[1], e[1], [])) {
                    d.push(`cdm=${v}`), K(d);
                    return
                }
            } else {
                let p = e[2],
                    E = [];
                if (O(i, p, E), E.length) {
                    let h = E.map(P => oe[P]).filter(P => P !== void 0);
                    d.push(`cdm=${v}.${h.join(".")}`), K(d);
                    return
                }
            }
            d.push(`cm=${v}`), K(d)
        };

        function O(e, r, c) {
            let o = [];
            if (e === r) return !0;
            if (!(e instanceof Object) || !(r instanceof Object)) return !1;
            for (let i in e) {
                if (!e.hasOwnProperty(i) || i === "user_data") continue;
                if (!r.hasOwnProperty(i)) {
                    o.push(i);
                    continue
                }
                let v = e[i],
                    d = r[i];
                if (v != d) {
                    if (Array.isArray(v) && Array.isArray(d)) {
                        if (Pe(v, d, o)) continue
                    } else if (v instanceof Object && O(v, d, o)) continue;
                    o.push(i)
                }
            }
            for (let i in r) r.hasOwnProperty(i) && !e.hasOwnProperty(i) && o.push(i);
            return c.push(...o), o.length === 0
        }

        function Pe(e, r, c) {
            let o = [];
            if (e.length !== r.length) return !1;
            for (let i = 0; i < e.length; i++)
                if (e[i] instanceof Object && r[i] instanceof Object) O(e[i], r[i], o);
                else if (e[i] !== r[i]) return !1;
            return c.push(...o), o.length === 0
        }

        function K(e) {
            let r = ["v=3", "t=h"];
            r.push(...e);
            let c = `https://www.googletagmanager.com/a?${r.join("&")}`;
            window.fetch(c, {
                method: "GET",
                mode: "no-cors",
                keepalive: !0
            })
        }

        function le(e, r) {
            let c = r[0];
            if (c === "set") return e[0] === "set";
            if (c === "config") return e[0] === c && e[1] === r[1];
            if (c === "consent") return e[1] === r[1];
            if (c === "event") {
                let o = r[1];
                if (e[0] !== r[0] || e[1] !== o) return !1;
                let i = r[2],
                    v = se[o];
                return v ? v.map(p => {
                    let E = e[2][p],
                        h = i[p];
                    return p === "send_to" || p === "ecomm_prodid" ? JSON.stringify(E) === JSON.stringify(h) : p === "transaction_id" ? E == h : E === h
                }).every(p => p === !0) : !1
            }
            return !1
        }

        function _e(e) {
            let r = e.init.customerPrivacy;
            if (r === void 0 || r.marketingAllowed || r.analyticsProcessingAllowed) ge(e, r);
            else {
                let c = !1;
                e.customerPrivacy.subscribe("visitorConsentCollected", o => {
                    let i = o.customerPrivacy;
                    !c && (i.marketingAllowed || i.analyticsProcessingAllowed) && (ge(e, i), c = !0)
                })
            }
        }

        function ge(e, r) {
            var J, Y, B, X, Z, H, Q, V, k, ee, te, ne, re;
            let c = window.dataLayer = window.dataLayer || [],
                o = JSON.parse(e.settings.config),
                i = o.pixel_id;
            ue(i);
            let v = o.enable_monitoring_mode;
            if (v && !((J = new URL(window.location.href)) != null && J.searchParams.has("force_monitor")) && Math.floor(Math.random() * 1e3) > 10) return;
            let d = window.gtag = window.gtag || function() {
                    c.push(arguments)
                },
                p = v ? fe : d;
            r && (p("consent", "default", me(r)), p("set", pe(r))), I(e) && p("set", {
                ignore_referrer: "true"
            }), d("policy", "detect_click_events", () => !1), d("policy", "detect_element_visibility_events", () => !1), d("policy", "detect_history_change_events", () => !1), d("policy", "detect_link_click_events", () => !1), d("policy", "detect_timer_events", () => !1), d("policy", "detect_youtube_activity_events", () => !1), d("policy", "detect_scroll_events", () => !1), d("policy", "detect_user_provided_data", () => !1), d("policy", "detect_form_submit_events", () => !1), d("policy", "detect_form_interaction_events", () => !1), d("policy", "internal_sw_allowed", () => !1), d("js", new Date);
            let E = document.createElement("script");
            E.src = `https://www.googletagmanager.com/gtag/js?id=${i}`, document.body.appendChild(E);
            let h = {
                send_page_view: !1
            };
            I(e) && (h.ignore_referrer = "true"), p("config", i, h);
            let P = o.gtag_events,
                N = t => {
                    var a;
                    return "shopify_" + (o.target_country || "US") + "_" + String((a = t == null ? void 0 : t.product) == null ? void 0 : a.id) + "_" + String(t == null ? void 0 : t.id)
                },
                x = t => {
                    let a = t == null ? void 0 : t.title;
                    return ["default", "title", "default title", ""].includes(String(a).toLowerCase()) ? null : a
                },
                L = (t, a) => a ? `${t} - ${a}` : t,
                ye = (t, a) => {
                    var u;
                    if (t === "/search") {
                        let f = (u = document.querySelector("link[rel='canonical']")) == null ? void 0 : u.getAttribute("href");
                        if (f) return f
                    }
                    return a
                },
                W = t => {
                    var a, u, f, m, l, b, w;
                    return {
                        email: t == null ? void 0 : t.email,
                        phone_number: t == null ? void 0 : t.phone,
                        address: {
                            first_name: (a = t == null ? void 0 : t.billingAddress) == null ? void 0 : a.firstName,
                            last_name: (u = t == null ? void 0 : t.billingAddress) == null ? void 0 : u.lastName,
                            street: (f = t == null ? void 0 : t.billingAddress) == null ? void 0 : f.address1,
                            city: (m = t == null ? void 0 : t.billingAddress) == null ? void 0 : m.city,
                            region: (l = t == null ? void 0 : t.billingAddress) == null ? void 0 : l.province,
                            postal_code: (b = t == null ? void 0 : t.billingAddress) == null ? void 0 : b.zip,
                            country: (w = t == null ? void 0 : t.billingAddress) == null ? void 0 : w.country
                        }
                    }
                },
                S = {
                    email: (X = (B = (Y = e.init) == null ? void 0 : Y.data) == null ? void 0 : B.customer) == null ? void 0 : X.email,
                    phone_number: (Q = (H = (Z = e.init) == null ? void 0 : Z.data) == null ? void 0 : H.customer) == null ? void 0 : Q.phone,
                    address: {
                        first_name: (ee = (k = (V = e.init) == null ? void 0 : V.data) == null ? void 0 : k.customer) == null ? void 0 : ee.firstName,
                        last_name: (re = (ne = (te = e.init) == null ? void 0 : te.data) == null ? void 0 : ne.customer) == null ? void 0 : re.lastName
                    }
                };
            e.analytics.subscribe("page_viewed", t => {
                var u, f, m, l, b, w, s, C;
                let a = P.find(n => n.type === "page_view");
                if (a && a.action_label) {
                    let n = (m = (f = (u = t.context) == null ? void 0 : u.window) == null ? void 0 : f.location) == null ? void 0 : m.pathname,
                        A = {
                            send_to: a.action_label,
                            page_path: n,
                            page_title: Ce((b = (l = t.context) == null ? void 0 : l.document) == null ? void 0 : b.title, n),
                            page_location: ye(n, (C = (s = (w = t.context) == null ? void 0 : w.window) == null ? void 0 : s.location) == null ? void 0 : C.href),
                            user_data: S
                        };
                    I(e) && (A.ignore_referrer = "true"), p("event", "page_view", A)
                }
            }), e.analytics.subscribe("product_viewed", t => {
                var u, f, m, l, b, w;
                let a = P.find(s => s.type === "view_item");
                if (a && a.action_label) {
                    let s = (u = t.data) == null ? void 0 : u.productVariant;
                    p("event", "view_item", {
                        send_to: a.action_label,
                        ecomm_prodid: [N(s)],
                        ecomm_totalvalue: (f = s == null ? void 0 : s.price) == null ? void 0 : f.amount,
                        ecomm_pagetype: "product",
                        items: [{
                            id: N(s),
                            name: L((m = s == null ? void 0 : s.product) == null ? void 0 : m.title, x(s)),
                            brand: (l = s == null ? void 0 : s.product) == null ? void 0 : l.vendor,
                            category: (b = s == null ? void 0 : s.product) == null ? void 0 : b.type,
                            price: (w = s == null ? void 0 : s.price) == null ? void 0 : w.amount,
                            variant: x(s)
                        }],
                        user_data: S
                    })
                }
            }), e.analytics.subscribe("product_added_to_cart", t => {
                var u, f, m, l, b, w, s, C, n, A, _;
                let a = P.find(g => g.type === "add_to_cart");
                if (a && a.action_label) {
                    let g = (u = t.data) == null ? void 0 : u.cartLine,
                        y = g == null ? void 0 : g.merchandise;
                    p("event", "add_to_cart", {
                        send_to: a.action_label,
                        ecomm_prodid: [N(g == null ? void 0 : g.merchandise)],
                        ecomm_totalvalue: (m = (f = g == null ? void 0 : g.cost) == null ? void 0 : f.totalAmount) == null ? void 0 : m.amount,
                        ecomm_pagetype: "cart",
                        value: (b = (l = g == null ? void 0 : g.cost) == null ? void 0 : l.totalAmount) == null ? void 0 : b.amount,
                        currency: ((s = (w = g == null ? void 0 : g.cost) == null ? void 0 : w.totalAmount) == null ? void 0 : s.currencyCode) || "USD",
                        items: [{
                            id: N(y),
                            name: L((C = y == null ? void 0 : y.product) == null ? void 0 : C.title, x(y)),
                            brand: (n = y == null ? void 0 : y.product) == null ? void 0 : n.vendor,
                            category: (A = y == null ? void 0 : y.product) == null ? void 0 : A.type,
                            price: (_ = y == null ? void 0 : y.price) == null ? void 0 : _.amount,
                            quantity: g == null ? void 0 : g.quantity,
                            variant: x(y)
                        }],
                        user_data: S
                    })
                }
            }), e.analytics.subscribe("checkout_completed", t => {
                var u, f, m, l, b, w, s, C;
                let a = P.find(n => n.type === "purchase");
                if (a && a.action_label) {
                    let n = (u = t.data) == null ? void 0 : u.checkout,
                        A = {
                            send_to: a.action_label,
                            transaction_id: (f = n == null ? void 0 : n.order) == null ? void 0 : f.id,
                            value: (m = n == null ? void 0 : n.subtotalPrice) == null ? void 0 : m.amount,
                            currency: ((l = n == null ? void 0 : n.subtotalPrice) == null ? void 0 : l.currencyCode) || "USD",
                            tax: (b = n == null ? void 0 : n.totalTax) == null ? void 0 : b.amount,
                            shipping: (s = (w = n == null ? void 0 : n.shippingLine) == null ? void 0 : w.price) == null ? void 0 : s.amount,
                            items: (C = n == null ? void 0 : n.lineItems) == null ? void 0 : C.map(_ => {
                                var g, y, T, M, R, j, G, q, U, $, z;
                                return {
                                    id: N(_.variant),
                                    name: (y = (g = _.variant) == null ? void 0 : g.product) == null ? void 0 : y.title,
                                    brand: (M = (T = _.variant) == null ? void 0 : T.product) == null ? void 0 : M.vendor,
                                    category: (j = (R = _.variant) == null ? void 0 : R.product) == null ? void 0 : j.type,
                                    coupon: (U = (q = (G = _.discountAllocations) == null ? void 0 : G[0]) == null ? void 0 : q.discountApplication) == null ? void 0 : U.title,
                                    price: (z = ($ = _.variant) == null ? void 0 : $.price) == null ? void 0 : z.amount,
                                    quantity: _.quantity,
                                    variant: x(_.variant)
                                }
                            }),
                            user_data: W(n)
                        };
                    I(e) && (A.ignore_referrer = "true"), p("event", "purchase", A)
                }
            }), e.analytics.subscribe("checkout_started", t => {
                var u, f, m, l, b, w, s, C;
                let a = P.find(n => n.type === "begin_checkout");
                if (a && a.action_label) {
                    let n = (u = t.data) == null ? void 0 : u.checkout,
                        A = {
                            send_to: a.action_label,
                            ecomm_prodid: (f = n == null ? void 0 : n.lineItems) == null ? void 0 : f.map(_ => N(_.variant)),
                            ecomm_totalvalue: (m = n == null ? void 0 : n.subtotalPrice) == null ? void 0 : m.amount,
                            ecomm_pagetype: "cart",
                            value: (l = n == null ? void 0 : n.subtotalPrice) == null ? void 0 : l.amount,
                            currency: ((b = n == null ? void 0 : n.subtotalPrice) == null ? void 0 : b.currencyCode) || "USD",
                            coupon: (s = (w = n == null ? void 0 : n.discountApplications) == null ? void 0 : w[0]) == null ? void 0 : s.title,
                            items: (C = n == null ? void 0 : n.lineItems) == null ? void 0 : C.map(_ => {
                                var g, y, T, M, R, j, G, q, U, $, z, ie;
                                return {
                                    id: N(_.variant),
                                    name: (y = (g = _.variant) == null ? void 0 : g.product) == null ? void 0 : y.title,
                                    brand: (M = (T = _.variant) == null ? void 0 : T.product) == null ? void 0 : M.vendor,
                                    category: (j = (R = _.variant) == null ? void 0 : R.product) == null ? void 0 : j.type,
                                    coupon: (U = (q = (G = _.discountAllocations) == null ? void 0 : G[0]) == null ? void 0 : q.discountApplication) == null ? void 0 : U.title,
                                    price: (z = ($ = _.variant) == null ? void 0 : $.price) == null ? void 0 : z.amount,
                                    quantity: _.quantity,
                                    variant: (ie = _.variant) == null ? void 0 : ie.title
                                }
                            }),
                            user_data: W(n)
                        };
                    I(e) && (A.ignore_referrer = "true"), p("event", "begin_checkout", A)
                }
            }), e.analytics.subscribe("search_submitted", t => {
                var u, f;
                let a = P.find(m => m.type === "search");
                a && a.action_label && p("event", "search", {
                    send_to: a.action_label,
                    search_term: (f = (u = t.data) == null ? void 0 : u.searchResult) == null ? void 0 : f.query,
                    user_data: S
                })
            }), e.analytics.subscribe("payment_info_submitted", t => {
                var u, f, m;
                let a = P.find(l => l.type === "add_payment_info");
                if (a && a.action_label) {
                    let l = (u = t.data) == null ? void 0 : u.checkout,
                        b = {
                            send_to: a.action_label,
                            currency: ((f = l == null ? void 0 : l.totalPrice) == null ? void 0 : f.currencyCode) || "USD",
                            total: (m = l == null ? void 0 : l.totalPrice) == null ? void 0 : m.amount,
                            user_data: W(l)
                        };
                    I(e) && (b.ignore_referrer = "true"), p("event", "add_payment_info", b)
                }
            }), e.customerPrivacy.subscribe("visitorConsentCollected", t => {
                let a = t.customerPrivacy;
                p("consent", "update", me(a)), p("set", pe(a))
            })
        }

        function pe(e) {
            return {
                restricted_data_processing: !e.saleOfDataAllowed
            }
        }

        function me(e) {
            return {
                ad_storage: e.marketingAllowed ? "granted" : "denied",
                ad_user_data: e.marketingAllowed ? "granted" : "denied",
                ad_personalization: e.marketingAllowed ? "granted" : "denied",
                analytics_storage: e.analyticsProcessingAllowed ? "granted" : "denied"
            }
        }

        function I(e) {
            var r;
            return ((r = e == null ? void 0 : e._pixelInfo) == null ? void 0 : r.surfaceNext) === "checkout"
        }

        function Ce(e, r) {
            if (!r) return e;
            let c = [
                ["/information", "Checkout - Contact Information"],
                ["/shipping", "Checkout - Shipping"],
                ["/payment", "Checkout - Payment"],
                ["/review", "Checkout - Review"],
                ["/processing", "Checkout - Processing"],
                ["/thank-you", "Checkout - Receipt"],
                ["/stock-problems", "Checkout - Stock problems"],
                ["/error", "Checkout - Error"]
            ];
            for (let [o, i] of c)
                if (r.endsWith(o)) return i;
            return /^\/checkouts\/[A-Za-z0-9]+\/[A-Za-z0-9]+$/.test(r) ? "Checkout - Contact Information" : e
        }
        D(_e);
    })();

})(self.webPixelsManager.createShopifyExtend('170557649', 'app'));