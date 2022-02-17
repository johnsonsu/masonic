!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports, require("react"))
    : "function" == typeof define && define.amd
    ? define(["exports", "react"], t)
    : t(
        ((e =
          "undefined" != typeof globalThis ? globalThis : e || self).Masonic =
          {}),
        e.React
      );
})(this, function (e, t) {
  "use strict";
  function n(e) {
    return e && "object" == typeof e && "default" in e ? e : { default: e };
  }
  function r(e) {
    if (e && e.__esModule) return e;
    var t = Object.create(null);
    return (
      e &&
        Object.keys(e).forEach(function (n) {
          if ("default" !== n) {
            var r = Object.getOwnPropertyDescriptor(e, n);
            Object.defineProperty(
              t,
              n,
              r.get
                ? r
                : {
                    enumerable: 1,
                    get: function () {
                      return e[n];
                    },
                  }
            );
          }
        }),
      (t.default = e),
      Object.freeze(t)
    );
  }
  function i(e) {
    var t = e.high;
    e.L === $ && e.R === $
      ? (e.max = t)
      : e.L === $
      ? (e.max = Math.max(e.R.max, t))
      : e.R === $
      ? (e.max = Math.max(e.L.max, t))
      : (e.max = Math.max(Math.max(e.L.max, e.R.max), t));
  }
  function o(e) {
    for (var t = e; t.P !== $; ) i(t.P), (t = t.P);
  }
  function u(e, t) {
    if (t.R !== $) {
      var n = t.R;
      (t.R = n.L),
        n.L !== $ && (n.L.P = t),
        (n.P = t.P),
        t.P === $ ? (e.root = n) : t === t.P.L ? (t.P.L = n) : (t.P.R = n),
        (n.L = t),
        (t.P = n),
        i(t),
        i(n);
    }
  }
  function s(e, t) {
    if (t.L !== $) {
      var n = t.L;
      (t.L = n.R),
        n.R !== $ && (n.R.P = t),
        (n.P = t.P),
        t.P === $ ? (e.root = n) : t === t.P.R ? (t.P.R = n) : (t.P.L = n),
        (n.R = t),
        (t.P = n),
        i(t),
        i(n);
    }
  }
  function c(e, t, n) {
    t.P === $ ? (e.root = n) : t === t.P.L ? (t.P.L = n) : (t.P.R = n),
      (n.P = t.P);
  }
  function a() {
    var e = { root: $, size: 0 },
      t = {};
    return {
      insert: function (n, r, c) {
        for (var a = e.root, f = $; a !== $ && n !== (f = a).low; )
          a = n < a.low ? a.L : a.R;
        if (n === f.low && f !== $) {
          if (
            !(function (e, t, n) {
              for (var r, i = e.list; i; ) {
                if (i.index === n) return 0;
                if (t > i.high) break;
                (r = i), (i = i.next);
              }
              return (
                r || (e.list = { index: n, high: t, next: i }),
                r && (r.next = { index: n, high: t, next: r.next }),
                1
              );
            })(f, r, c)
          )
            return;
          return (
            (f.high = Math.max(f.high, r)),
            i(f),
            o(f),
            (t[c] = f),
            void e.size++
          );
        }
        var l = {
          low: n,
          high: r,
          max: r,
          C: 0,
          P: f,
          L: $,
          R: $,
          list: { index: c, high: r, next: null },
        };
        f === $ ? (e.root = l) : (l.low < f.low ? (f.L = l) : (f.R = l), o(l)),
          (function (e, t) {
            for (var n; 0 === t.P.C; )
              t.P === t.P.P.L
                ? 0 === (n = t.P.P.R).C
                  ? ((t.P.C = 1), (n.C = 1), (t.P.P.C = 0), (t = t.P.P))
                  : (t === t.P.R && u(e, (t = t.P)),
                    (t.P.C = 1),
                    (t.P.P.C = 0),
                    s(e, t.P.P))
                : 0 === (n = t.P.P.L).C
                ? ((t.P.C = 1), (n.C = 1), (t.P.P.C = 0), (t = t.P.P))
                : (t === t.P.L && s(e, (t = t.P)),
                  (t.P.C = 1),
                  (t.P.P.C = 0),
                  u(e, t.P.P));
            e.root.C = 1;
          })(e, l),
          (t[c] = l),
          e.size++;
      },
      remove: function (n) {
        var r = t[n];
        if (void 0 !== r) {
          delete t[n];
          var a = (function (e, t) {
            var n = e.list;
            if (n.index === t)
              return null === n.next ? 0 : ((e.list = n.next), 1);
            var r = n;
            for (n = n.next; null !== n; ) {
              if (n.index === t) return (r.next = n.next), 1;
              (r = n), (n = n.next);
            }
          })(r, n);
          if (void 0 !== a) {
            if (1 === a)
              return (r.high = r.list.high), i(r), o(r), void e.size--;
            var f,
              l = r,
              d = l.C;
            r.L === $
              ? ((f = r.R), c(e, r, r.R))
              : r.R === $
              ? ((f = r.L), c(e, r, r.L))
              : ((d = (l = (function (e) {
                  for (; e.L !== $; ) e = e.L;
                  return e;
                })(r.R)).C),
                (f = l.R),
                l.P === r
                  ? (f.P = l)
                  : (c(e, l, l.R), (l.R = r.R), (l.R.P = l)),
                c(e, r, l),
                (l.L = r.L),
                (l.L.P = l),
                (l.C = r.C)),
              i(f),
              o(f),
              1 === d &&
                (function (e, t) {
                  for (var n; t !== $ && 1 === t.C; )
                    t === t.P.L
                      ? (0 === (n = t.P.R).C &&
                          ((n.C = 1), (t.P.C = 0), u(e, t.P), (n = t.P.R)),
                        1 === n.L.C && 1 === n.R.C
                          ? ((n.C = 0), (t = t.P))
                          : (1 === n.R.C &&
                              ((n.L.C = 1), (n.C = 0), s(e, n), (n = t.P.R)),
                            (n.C = t.P.C),
                            (t.P.C = 1),
                            (n.R.C = 1),
                            u(e, t.P),
                            (t = e.root)))
                      : (0 === (n = t.P.L).C &&
                          ((n.C = 1), (t.P.C = 0), s(e, t.P), (n = t.P.L)),
                        1 === n.R.C && 1 === n.L.C
                          ? ((n.C = 0), (t = t.P))
                          : (1 === n.L.C &&
                              ((n.R.C = 1), (n.C = 0), u(e, n), (n = t.P.L)),
                            (n.C = t.P.C),
                            (t.P.C = 1),
                            (n.L.C = 1),
                            s(e, t.P),
                            (t = e.root)));
                  t.C = 1;
                })(e, f),
              e.size--;
          }
        }
      },
      search: function (t, n, r) {
        for (var i = [e.root]; 0 !== i.length; ) {
          var o = i.pop();
          if (
            o !== $ &&
            t <= o.max &&
            (o.L !== $ && i.push(o.L),
            o.R !== $ && i.push(o.R),
            o.low <= n && o.high >= t)
          )
            for (var u = o.list; null !== u; )
              u.high < t || r(u.index, o.low), (u = u.next);
        }
      },
      get size() {
        return e.size;
      },
    };
  }
  function f() {
    return (f =
      Object.assign ||
      function (e) {
        for (var t = 1; arguments.length > t; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      }).apply(this, arguments);
  }
  function l(e, t, n, r) {
    var i = Q.useRef(n),
      o = Q.useRef(r);
    ne(function () {
      (i.current = n), (o.current = r);
    }),
      ne(
        function () {
          function n() {
            if (!u) {
              for (
                var e = arguments.length, t = new Array(e), n = 0;
                e > n;
                n++
              )
                t[n] = arguments[n];
              i.current.apply(this, t);
            }
          }
          var r = e && "current" in e ? e.current : e;
          if (r) {
            var u = 0;
            r.addEventListener(t, n);
            var s = o.current;
            return function () {
              (u = 1), r.removeEventListener(t, n), s && s();
            };
          }
        },
        [e, t]
      );
  }
  function d() {
    var e = Q.useState(de)[1];
    return Q.useRef(function () {
      return e({});
    }).current;
  }
  function v(e) {
    var t,
      n = e.positioner,
      r = e.resizeObserver,
      i = e.items,
      o = e.as,
      u = void 0 === o ? "div" : o,
      s = e.id,
      c = e.className,
      a = e.style,
      l = e.role,
      v = void 0 === l ? "grid" : l,
      p = e.tabIndex,
      g = void 0 === p ? 0 : p,
      m = e.containerRef,
      b = e.itemAs,
      x = void 0 === b ? "div" : b,
      w = e.itemStyle,
      y = e.itemHeightEstimate,
      P = void 0 === y ? 300 : y,
      R = e.itemKey,
      T = void 0 === R ? h : R,
      C = e.overscanBy,
      E = void 0 === C ? 2 : C,
      z = e.scrollTop,
      L = e.isScrolling,
      S = e.height,
      M = e.render,
      O = e.onRender,
      B = 0,
      k = d(),
      I = we(n, r),
      W = i.length,
      A = n.columnWidth,
      N = n.columnCount,
      H = n.range,
      j = n.estimateHeight,
      D = n.size,
      _ = n.shortestColumn,
      F = D(),
      X = _(),
      q = [],
      G = "list" === v ? "listitem" : "grid" === v ? "gridcell" : void 0,
      V = ee(O),
      Y = z + (E *= S),
      K = Y > X && W > F;
    if (
      (H(Math.max(0, z - E / 2), Y, function (e, n, r) {
        var o = i[e],
          u = T(o, e),
          s = {
            top: r,
            left: n,
            width: A,
            writingMode: "horizontal-tb",
            position: "absolute",
          };
        q.push(
          ve(
            x,
            {
              key: u,
              ref: I(e),
              role: G,
              style: "object" == typeof w && null !== w ? f({}, s, w) : s,
            },
            pe(M, e, o, A)
          )
        ),
          void 0 === t
            ? ((B = e), (t = e))
            : ((B = Math.min(B, e)), (t = Math.max(t, e)));
      }),
      K)
    )
      for (
        var J = Math.min(W - F, Math.ceil(((z + E - X) / P) * N)),
          U = F,
          Z = xe(A);
        F + J > U;
        U++
      ) {
        var $ = i[U],
          te = T($, U);
        q.push(
          ve(
            x,
            {
              key: te,
              ref: I(U),
              role: G,
              style: "object" == typeof w ? f({}, Z, w) : Z,
            },
            pe(M, U, $, A)
          )
        );
      }
    Q.useEffect(
      function () {
        "function" == typeof V.current && void 0 !== t && V.current(B, t, i),
          (he = "1");
      },
      [B, t, i, V]
    ),
      Q.useEffect(
        function () {
          K && k();
        },
        [K]
      );
    var ne = ge(L, j(W, P));
    return ve(u, {
      ref: m,
      key: he,
      id: s,
      role: v,
      className: c,
      tabIndex: g,
      style: "object" == typeof a ? be(ne, a) : ne,
      children: q,
    });
  }
  function h(e, t) {
    return t;
  }
  function p(e, t, n) {
    function r() {
      (u.current = 0), c();
    }
    void 0 === t && (t = 30), void 0 === n && (n = 0);
    var i = ee(e),
      o = 1e3 / t,
      u = Q.useRef(0),
      s = Q.useRef(),
      c = function () {
        return s.current && clearTimeout(s.current);
      },
      a = [t, n, i];
    return (
      Q.useEffect(function () {
        return r;
      }, a),
      Q.useCallback(function () {
        var e = arguments,
          t = ke(),
          r = function () {
            (u.current = t), c(), i.current.apply(null, e);
          },
          a = u.current;
        if (n && 0 === a) return r();
        if (t - a > o) {
          if (a > 0) return r();
          u.current = t;
        }
        c(),
          (s.current = setTimeout(function () {
            r(), (u.current = 0);
          }, o));
      }, a)
    );
  }
  function g(e, t) {
    void 0 === e && (e = 0), void 0 === t && (t = 12);
    var n = Ae(t),
      r = Q.useState(0),
      i = r[0],
      o = r[1],
      u = Q.useRef(0);
    return (
      Q.useEffect(
        function () {
          1 === u.current && o(1);
          var e,
            n,
            r,
            i,
            s = 0,
            c =
              ((e = function () {
                s || o(0);
              }),
              (n = 40 + 1e3 / t),
              (r = Te()),
              ((i = {}).v = Le(function t() {
                Te() - r < n ? (i.v = Le(t)) : e.call(null);
              })),
              i);
          return (
            (u.current = 1),
            function () {
              (s = 1),
                (function (e) {
                  Se(e.v || -1);
                })(c);
            }
          );
        },
        [t, n]
      ),
      { scrollTop: Math.max(0, n - e), isScrolling: i }
    );
  }
  function m(e) {
    var t = g(e.offset, e.scrollFps);
    return v({
      scrollTop: t.scrollTop,
      isScrolling: t.isScrolling,
      positioner: e.positioner,
      resizeObserver: e.resizeObserver,
      items: e.items,
      onRender: e.onRender,
      as: e.as,
      id: e.id,
      className: e.className,
      style: e.style,
      role: e.role,
      tabIndex: e.tabIndex,
      containerRef: e.containerRef,
      itemAs: e.itemAs,
      itemStyle: e.itemStyle,
      itemHeightEstimate: e.itemHeightEstimate,
      itemKey: e.itemKey,
      overscanBy: e.overscanBy,
      height: e.height,
      render: e.render,
    });
  }
  function b(e, t) {
    void 0 === t && (t = Ne);
    var n = Q.useState({ offset: 0, width: 0 }),
      r = n[0],
      i = n[1];
    return (
      ne(function () {
        var t = e.current;
        if (null !== t) {
          var n = 0,
            o = t;
          do {
            (n += o.offsetTop || 0), (o = o.offsetParent);
          } while (o);
          (n === r.offset && t.offsetWidth === r.width) ||
            i({ offset: n, width: t.offsetWidth });
        }
      }, t),
      r
    );
  }
  function x(e, t) {
    var n = e.width,
      r = e.columnWidth,
      i = void 0 === r ? 200 : r,
      o = e.columnGutter,
      u = void 0 === o ? 0 : o,
      s = e.rowGutter,
      c = e.columnCount;
    void 0 === t && (t = _e);
    var a = function () {
        var e = De(n, i, u, c),
          t = e[0],
          r = e[1];
        return He(r, t, u, null != s ? s : u);
      },
      f = Q.useRef();
    void 0 === f.current && (f.current = a());
    var l = Q.useRef(t),
      d = [n, i, u, s, c],
      v = Q.useRef(d),
      h = !d.every(function (e, t) {
        return v.current[t] === e;
      });
    if (
      h ||
      !t.every(function (e, t) {
        return l.current[t] === e;
      })
    ) {
      var p = f.current,
        g = a();
      if (((l.current = t), (v.current = d), h))
        for (var m = p.size(), b = 0; m > b; b++) {
          var x = p.get(b);
          g.set(b, void 0 !== x ? x.height : 0);
        }
      f.current = g;
    }
    return f.current;
  }
  function w(e) {
    return e.activeTargets.length > 0;
  }
  function y(e) {
    return e.skippedTargets.length > 0;
  }
  function P(e, t) {
    (this.inlineSize = e), (this.blockSize = t), Ve(this);
  }
  function R(e, t, n, r) {
    return (
      (this.x = e),
      (this.y = t),
      (this.width = n),
      (this.height = r),
      (this.top = this.y),
      (this.left = this.x),
      (this.bottom = this.top + this.height),
      (this.right = this.left + this.width),
      Ve(this)
    );
  }
  function T() {
    var e = this;
    return {
      x: e.x,
      y: e.y,
      top: e.top,
      right: e.right,
      bottom: e.bottom,
      left: e.left,
      width: e.width,
      height: e.height,
    };
  }
  function C(e) {
    return new R(e.x, e.y, e.width, e.height);
  }
  function E(e) {
    var t = ut(e);
    (this.target = e),
      (this.contentRect = t.contentRect),
      (this.borderBoxSize = Ve([t.borderBoxSize])),
      (this.contentBoxSize = Ve([t.contentBoxSize])),
      (this.devicePixelContentBoxSize = Ve([t.devicePixelContentBoxSize]));
  }
  function z(e) {
    return e();
  }
  function L() {
    return dt.splice(0).forEach(z);
  }
  function S() {
    var e = this;
    (this.stopped = 1),
      (this.listener = function () {
        return e.schedule();
      });
  }
  function M(e) {
    var t = this;
    if ((void 0 === e && (e = 250), !mt)) {
      mt = 1;
      var n,
        r = gt(e);
      (n = function () {
        var n = 0;
        try {
          n = (function () {
            var e,
              t = 0;
            for (lt(t); Xe(); ) (t = ft()), lt(t);
            return (
              Fe.some(y) &&
                ("function" == typeof ErrorEvent
                  ? (e = new ErrorEvent("error", { message: qe }))
                  : ((e = document.createEvent("Event")).initEvent(
                      "error",
                      0,
                      0
                    ),
                    (e.message = qe)),
                window.dispatchEvent(e)),
              t > 0
            );
          })();
        } finally {
          if (((mt = 0), (e = r - gt()), !vt)) return;
          n ? t.run(1e3) : e > 0 ? t.run(e) : t.start();
        }
      }),
        (function () {
          if (!Ge) {
            var e = 0,
              t = document.createTextNode("");
            new MutationObserver(L).observe(t, { characterData: 1 }),
              (Ge = function () {
                t.textContent = "" + (e ? e-- : e++);
              });
          }
          dt.push(function () {
            requestAnimationFrame(n);
          }),
            Ge();
        })();
    }
  }
  function O() {
    this.stop(), this.run();
  }
  function B() {
    var e = this,
      t = function () {
        return e.observer && e.observer.observe(document.body, ht);
      };
    document.body ? t() : Ze.addEventListener("DOMContentLoaded", t);
  }
  function k() {
    var e = this;
    this.stopped &&
      ((this.stopped = 0),
      (this.observer = new MutationObserver(this.listener)),
      this.observe(),
      pt.forEach(function (t) {
        return Ze.addEventListener(t, e.listener, 1);
      }));
  }
  function I() {
    var e = this;
    this.stopped ||
      (this.observer && this.observer.disconnect(),
      pt.forEach(function (t) {
        return Ze.removeEventListener(t, e.listener, 1);
      }),
      (this.stopped = 1));
  }
  function W(e, t) {
    (this.target = e),
      (this.observedBox = t || Oe.CONTENT_BOX),
      (this.lastReportedSize = { inlineSize: 0, blockSize: 0 });
  }
  function A() {
    var e,
      t = st(this.target, this.observedBox, 1);
    return (
      (e = this.target),
      Je(e) ||
        (function (e) {
          switch (e.tagName) {
            case "INPUT":
              if ("image" !== e.type) break;
            case "VIDEO":
            case "AUDIO":
            case "EMBED":
            case "OBJECT":
            case "CANVAS":
            case "IFRAME":
            case "IMG":
              return 1;
          }
          return 0;
        })(e) ||
        "inline" !== getComputedStyle(e).display ||
        (this.lastReportedSize = t),
      this.lastReportedSize.inlineSize !== t.inlineSize ||
      this.lastReportedSize.blockSize !== t.blockSize
        ? 1
        : 0
    );
  }
  function N(e, t) {
    (this.activeTargets = []),
      (this.skippedTargets = []),
      (this.observationTargets = []),
      (this.observer = e),
      (this.callback = t);
  }
  function H() {}
  function j(e, t) {
    var n = new yt(e, t);
    Pt.set(e, n);
  }
  function D(e, t, n) {
    var r = Pt.get(e),
      i = 0 === r.observationTargets.length;
    0 > Rt(r.observationTargets, t) &&
      (i && Fe.push(r),
      r.observationTargets.push(new wt(t, n && n.box)),
      xt(1),
      bt.schedule());
  }
  function _(e, t) {
    var n = Pt.get(e),
      r = Rt(n.observationTargets, t),
      i = 1 === n.observationTargets.length;
    0 > r ||
      (i && Fe.splice(Fe.indexOf(n), 1),
      n.observationTargets.splice(r, 1),
      xt(-1));
  }
  function F(e) {
    var t = this,
      n = Pt.get(e);
    n.observationTargets.slice().forEach(function (n) {
      return t.unobserve(e, n.target);
    }),
      n.activeTargets.splice(0, n.activeTargets.length);
  }
  function X(e) {
    if (0 === arguments.length)
      throw new TypeError(
        "Failed to construct 'ResizeObserver': 1 argument required, but only 0 present."
      );
    if ("function" != typeof e)
      throw new TypeError(
        "Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function."
      );
    Tt.connect(this, e);
  }
  function q(e, t) {
    if (0 === arguments.length)
      throw new TypeError(
        "Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present."
      );
    if (!Qe(e))
      throw new TypeError(
        "Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element"
      );
    Tt.observe(this, e, t);
  }
  function G(e) {
    if (0 === arguments.length)
      throw new TypeError(
        "Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present."
      );
    if (!Qe(e))
      throw new TypeError(
        "Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element"
      );
    Tt.unobserve(this, e);
  }
  function V() {
    Tt.disconnect(this);
  }
  function Y() {
    return "function ResizeObserver () { [polyfill code] }";
  }
  function K(e) {
    function t() {
      return r.disconnect();
    }
    var n = d(),
      r = zt(e, n);
    return (
      Q.useEffect(
        function () {
          return t;
        },
        [r]
      ),
      r
    );
  }
  function J(e, t) {
    var n,
      r = t.align,
      i = void 0 === r ? "top" : r,
      o = t.element,
      u = void 0 === o ? "undefined" != typeof window && window : o,
      s = t.offset,
      c = void 0 === s ? 0 : s,
      a = t.height,
      f =
        void 0 === a
          ? "undefined" != typeof window
            ? window.innerHeight
            : 0
          : a,
      d = ee({ positioner: e, element: u, align: i, offset: c, height: f }),
      v = Q.useRef(function () {
        var e = d.current.element;
        return e && "current" in e ? e.current : e;
      }).current,
      h = Q.useReducer(function (e, t) {
        var n,
          r = { position: e.position, index: e.index, prevTop: e.prevTop };
        if ("scrollToIndex" === t.type)
          return {
            position: d.current.positioner.get(
              null !== (n = t.value) && void 0 !== n ? n : -1
            ),
            index: t.value,
            prevTop: void 0,
          };
        if ("setPosition" === t.type) r.position = t.value;
        else if ("setPrevTop" === t.type) r.prevTop = t.value;
        else if ("reset" === t.type) return Lt;
        return r;
      }, Lt),
      g = h[0],
      m = h[1],
      b = p(m, 15);
    l(v(), "scroll", function () {
      if (!g.position && g.index) {
        var e = d.current.positioner.get(g.index);
        e && m({ type: "setPosition", value: e });
      }
    });
    var x =
      void 0 !== g.index &&
      (null === (n = d.current.positioner.get(g.index)) || void 0 === n
        ? void 0
        : n.top);
    return (
      Q.useEffect(
        function () {
          var e = v();
          if (e) {
            var t = d.current,
              n = t.height,
              r = t.align,
              i = t.offset,
              o = t.positioner;
            if (g.position) {
              var u = g.position.top;
              "bottom" === r
                ? (u = u - n + g.position.height)
                : "center" === r && (u -= (n - g.position.height) / 2),
                e.scrollTo(0, Math.max(0, (u += i)));
              var s = 0,
                c = setTimeout(function () {
                  return !s && m({ type: "reset" });
                }, 400);
              return function () {
                (s = 1), clearTimeout(c);
              };
            }
            if (void 0 !== g.index) {
              var a = (o.shortestColumn() / o.size()) * g.index;
              g.prevTop && (a = Math.max(a, g.prevTop + n)),
                e.scrollTo(0, a),
                b({ type: "setPrevTop", value: a });
            }
          }
        },
        [x, g, d, v, b]
      ),
      Q.useRef(function (e) {
        m({ type: "scrollToIndex", value: e });
      }).current
    );
  }
  function U(e) {
    var t = Q.useRef(null),
      n = (function (e) {
        void 0 === e && (e = re);
        var t = e,
          n = t.wait,
          r = t.leading,
          i = t.initialWidth,
          o = void 0 === i ? 0 : i,
          u = t.initialHeight,
          s = (function (e, t, n) {
            var r = Q.useState(e);
            return [r[0], te(r[1], t, n)];
          })(
            "undefined" == typeof document ? [o, void 0 === u ? 0 : u] : oe,
            n,
            r
          ),
          c = s[0],
          a = s[1],
          f = function () {
            return a(oe);
          };
        return l(ie, "resize", f), l(ie, "orientationchange", f), c;
      })({ initialWidth: e.ssrWidth, initialHeight: e.ssrHeight }),
      r = b(t, n),
      i = f(
        {
          offset: r.offset,
          width: r.width || n[0],
          height: n[1],
          containerRef: t,
        },
        e
      );
    (i.positioner = x(i)), (i.resizeObserver = K(i.positioner));
    var o = J(i.positioner, {
        height: i.height,
        offset: r.offset,
        align:
          "object" == typeof e.scrollToIndex ? e.scrollToIndex.align : void 0,
      }),
      u =
        e.scrollToIndex &&
        ("number" == typeof e.scrollToIndex
          ? e.scrollToIndex
          : e.scrollToIndex.index);
    return (
      Q.useEffect(
        function () {
          void 0 !== u && o(u);
        },
        [u, o]
      ),
      St(m, i)
    );
  }
  var Q = r(t),
    Z = n(t),
    $ = {
      low: 0,
      max: 0,
      high: 0,
      C: 2,
      P: void 0,
      R: void 0,
      L: void 0,
      list: void 0,
    };
  ($.P = $), ($.L = $), ($.R = $);
  var ee = function (e) {
      var t = Q.useRef(e);
      return (
        Q.useEffect(function () {
          t.current = e;
        }),
        t
      );
    },
    te = function (e, t, n) {
      function r() {
        u.current && clearTimeout(u.current), (u.current = void 0);
      }
      function i() {
        u.current = void 0;
      }
      void 0 === t && (t = 100), void 0 === n && (n = 0);
      var o = ee(e),
        u = Q.useRef(),
        s = [t, n, o];
      return (
        Q.useEffect(function () {
          return r;
        }, s),
        Q.useCallback(function () {
          var e = arguments,
            r = u.current;
          if (void 0 === r && n)
            return (u.current = setTimeout(i, t)), o.current.apply(null, e);
          r && clearTimeout(r),
            (u.current = setTimeout(function () {
              (u.current = void 0), o.current.apply(null, e);
            }, t));
        }, s)
      );
    },
    ne =
      Z.default[
        "undefined" != typeof document && void 0 !== document.createElement
          ? "useLayoutEffect"
          : "useEffect"
      ],
    re = {},
    ie = "undefined" == typeof window ? null : window,
    oe = function () {
      return [
        document.documentElement.clientWidth,
        document.documentElement.clientHeight,
      ];
    },
    ue = function (e, t) {
      var n,
        r,
        i = t || se;
      return function () {
        return n && i(arguments, n) ? r : (r = e.apply(null, (n = arguments)));
      };
    },
    se = function (e, t) {
      return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3];
    },
    ce = function () {
      var e, t;
      (this.set = void 0),
        (this.get = void 0),
        (this.get = function (n) {
          return n === e ? t : void 0;
        }),
        (this.set = function (n, r) {
          (e = n), (t = r);
        });
    },
    ae = function (e) {
      try {
        return new e();
      } catch (e) {
        var t = {};
        return {
          set: function (e, n) {
            t[e] = n;
          },
          get: function (e) {
            return t[e];
          },
        };
      }
    },
    fe = function (e, t) {
      var n,
        r,
        i,
        o,
        u,
        s,
        c,
        a,
        f,
        l =
          ((c = (r = e).length),
          (a = ae(r[0])),
          (f = 1 === c),
          3 > c
            ? {
                g: function (e) {
                  return void 0 === (i = a.get(e[0])) || f ? i : i.get(e[1]);
                },
                s: function (e, t) {
                  return (
                    f
                      ? a.set(e[0], t)
                      : void 0 === (i = a.get(e[0]))
                      ? ((o = ae(r[1])).set(e[1], t), a.set(e[0], o))
                      : i.set(e[1], t),
                    t
                  );
                },
              }
            : {
                g: function (e) {
                  for (s = a, u = 0; c > u; u++)
                    if (void 0 === (s = s.get(e[u]))) return;
                  return s;
                },
                s: function (e, t) {
                  for (s = a, u = 0; c - 1 > u; u++)
                    void 0 === (o = s.get(e[u]))
                      ? ((o = ae(r[u + 1])), s.set(e[u], o), (s = o))
                      : (s = o);
                  return s.set(e[c - 1], t), t;
                },
              }),
        d = l.g,
        v = l.s;
      return function () {
        return void 0 === (n = d(arguments))
          ? v(arguments, t.apply(null, arguments))
          : n;
      };
    },
    le = new WeakMap(),
    de = {},
    ve = Q.createElement,
    he = "0",
    pe = fe([ce, {}, WeakMap, ce], function (e, t, n, r) {
      return ve(e, { index: t, data: n, width: r });
    }),
    ge = ue(function (e, t) {
      return {
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        height: Math.ceil(t),
        maxHeight: Math.ceil(t),
        willChange: e ? "contents" : void 0,
        pointerEvents: e ? "none" : void 0,
      };
    }),
    me = function (e, t) {
      return e[0] === t[0] && e[1] === t[1];
    },
    be = ue(function (e, t) {
      return f({}, e, t);
    }, me),
    xe = ue(
      function (e) {
        return {
          width: e,
          zIndex: -1e3,
          visibility: "hidden",
          position: "absolute",
          writingMode: "horizontal-tb",
        };
      },
      function (e, t) {
        return e[0] === t[0];
      }
    ),
    we = ue(function (e, t) {
      return function (n) {
        return function (r) {
          null !== r &&
            (t && (t.observe(r), le.set(r, n)),
            void 0 === e.get(n) && e.set(n, r.offsetHeight));
        };
      };
    }, me),
    ye = "undefined",
    Pe = typeof window !== ye ? window : {},
    Re = typeof performance !== ye ? performance : Date,
    Te = function () {
      return Re.now();
    },
    Ce = "AnimationFrame",
    Ee = "cancel" + Ce,
    ze = "request" + Ce,
    Le = Pe[ze] && Pe[ze].bind(Pe),
    Se = Pe[Ee] && Pe[Ee].bind(Pe);
  if (!Le || !Se) {
    var Me = 0;
    (Le = function (e) {
      var t = Te(),
        n = Math.max(Me + 1e3 / 60, t);
      return setTimeout(function () {
        e((Me = n));
      }, n - t);
    }),
      (Se = function (e) {
        return clearTimeout(e);
      });
  }
  var Oe,
    Be = "undefined" != typeof performance ? performance : Date,
    ke = function () {
      return Be.now();
    },
    Ie = "undefined" == typeof window ? null : window,
    We = function () {
      return void 0 !== Ie.scrollY
        ? Ie.scrollY
        : void 0 === Ie.pageYOffset
        ? 0
        : Ie.pageYOffset;
    },
    Ae = function (e) {
      void 0 === e && (e = 30);
      var t = (function (e, t) {
        var n = Q.useState(e);
        return [n[0], p(n[1], t, 1)];
      })("undefined" == typeof window ? 0 : We, e);
      return (
        l(Ie, "scroll", function () {
          return t[1](We());
        }),
        t[0]
      );
    },
    Ne = [],
    He = function (e, t, n, r) {
      void 0 === n && (n = 0), void 0 === r && (r = n);
      for (
        var i = a(), o = new Array(e), u = [], s = new Array(e), c = 0;
        e > c;
        c++
      )
        (o[c] = 0), (s[c] = []);
      return {
        columnCount: e,
        columnWidth: t,
        set: function (e, c) {
          void 0 === c && (c = 0);
          for (var a = 0, f = 1; f < o.length; f++) o[f] < o[a] && (a = f);
          var l = o[a] || 0;
          (o[a] = l + c + r),
            s[a].push(e),
            (u[e] = { left: a * (t + n), top: l, height: c, column: a }),
            i.insert(l, l + c, e);
        },
        get: function (e) {
          return u[e];
        },
        update: function (t) {
          for (var n = new Array(e), c = 0, a = 0; c < t.length - 1; c++) {
            var f = t[c],
              l = u[f];
            (l.height = t[++c]),
              i.remove(f),
              i.insert(l.top, l.top + l.height, f),
              (n[l.column] =
                void 0 === n[l.column] ? f : Math.min(f, n[l.column]));
          }
          for (c = 0; c < n.length; c++)
            if (void 0 !== n[c]) {
              var d = s[c],
                v = je(d, n[c]),
                h = s[c][v],
                p = u[h];
              for (o[c] = p.top + p.height + r, a = v + 1; a < d.length; a++) {
                var g = d[a],
                  m = u[g];
                (m.top = o[c]),
                  (o[c] = m.top + m.height + r),
                  i.remove(g),
                  i.insert(m.top, m.top + m.height, g);
              }
            }
        },
        range: function (e, t, n) {
          return i.search(e, t, function (e, t) {
            return n(e, u[e].left, t);
          });
        },
        estimateHeight: function (t, n) {
          var r = Math.max(0, Math.max.apply(null, o));
          return t === i.size ? r : r + Math.ceil((t - i.size) / e) * n;
        },
        shortestColumn: function () {
          return o.length > 1 ? Math.min.apply(null, o) : o[0] || 0;
        },
        size: function () {
          return i.size;
        },
        all: function () {
          return u;
        },
      };
    },
    je = function (e, t) {
      for (var n = 0, r = e.length - 1; r >= n; ) {
        var i = (n + r) >>> 1,
          o = e[i];
        if (o === t) return i;
        o > t ? (r = i - 1) : (n = i + 1);
      }
      return -1;
    },
    De = function (e, t, n, r) {
      return (
        void 0 === e && (e = 0),
        void 0 === t && (t = 0),
        void 0 === n && (n = 8),
        (r = r || Math.floor(e / (t + n)) || 1),
        [Math.floor((e - n * (r - 1)) / r), r]
      );
    },
    _e = [],
    Fe = [],
    Xe = function () {
      return Fe.some(w);
    },
    qe = "ResizeObserver loop completed with undelivered notifications.";
  !(function (e) {
    (e.BORDER_BOX = "border-box"),
      (e.CONTENT_BOX = "content-box"),
      (e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box");
  })(Oe || (Oe = {}));
  var Ge,
    Ve = function (e) {
      return Object.freeze(e);
    },
    Ye = (function () {
      return P;
    })(),
    Ke = (function () {
      return (R.prototype.toJSON = T), (R.fromRect = C), R;
    })(),
    Je = function (e) {
      return e instanceof SVGElement && "getBBox" in e;
    },
    Ue = function (e) {
      if (Je(e)) {
        var t = e.getBBox(),
          n = t.width,
          r = t.height;
        return !n && !r;
      }
      var i = e,
        o = i.offsetWidth,
        u = i.offsetHeight;
      return !(o || u || e.getClientRects().length);
    },
    Qe = function (e) {
      var t, n;
      if (e instanceof Element) return 1;
      var r =
        null ===
          (n = null === (t = e) || void 0 === t ? void 0 : t.ownerDocument) ||
        void 0 === n
          ? void 0
          : n.defaultView;
      return !!(r && e instanceof r.Element);
    },
    Ze = "undefined" != typeof window ? window : {},
    $e = new WeakMap(),
    et = /auto|scroll/,
    tt = /^tb|vertical/,
    nt = /msie|trident/i.test(Ze.navigator && Ze.navigator.userAgent),
    rt = function (e) {
      return parseFloat(e || "0");
    },
    it = function (e, t, n) {
      return (
        void 0 === e && (e = 0),
        void 0 === t && (t = 0),
        void 0 === n && (n = 0),
        new Ye((n ? t : e) || 0, (n ? e : t) || 0)
      );
    },
    ot = Ve({
      devicePixelContentBoxSize: it(),
      borderBoxSize: it(),
      contentBoxSize: it(),
      contentRect: new Ke(0, 0, 0, 0),
    }),
    ut = function (e, t) {
      if ((void 0 === t && (t = 0), $e.has(e) && !t)) return $e.get(e);
      if (Ue(e)) return $e.set(e, ot), ot;
      var n = getComputedStyle(e),
        r = Je(e) && e.ownerSVGElement && e.getBBox(),
        i = !nt && "border-box" === n.boxSizing,
        o = tt.test(n.writingMode || ""),
        u = !r && et.test(n.overflowY || ""),
        s = !r && et.test(n.overflowX || ""),
        c = r ? 0 : rt(n.paddingTop),
        a = r ? 0 : rt(n.paddingRight),
        f = r ? 0 : rt(n.paddingBottom),
        l = r ? 0 : rt(n.paddingLeft),
        d = r ? 0 : rt(n.borderTopWidth),
        v = r ? 0 : rt(n.borderRightWidth),
        h = r ? 0 : rt(n.borderBottomWidth),
        p = l + a,
        g = c + f,
        m = (r ? 0 : rt(n.borderLeftWidth)) + v,
        b = d + h,
        x = s ? e.offsetHeight - b - e.clientHeight : 0,
        w = u ? e.offsetWidth - m - e.clientWidth : 0,
        y = i ? p + m : 0,
        P = i ? g + b : 0,
        R = r ? r.width : rt(n.width) - y - w,
        T = r ? r.height : rt(n.height) - P - x,
        C = R + p + w + m,
        E = T + g + x + b,
        z = Ve({
          devicePixelContentBoxSize: it(
            Math.round(R * devicePixelRatio),
            Math.round(T * devicePixelRatio),
            o
          ),
          borderBoxSize: it(C, E, o),
          contentBoxSize: it(R, T, o),
          contentRect: new Ke(l, c, R, T),
        });
      return $e.set(e, z), z;
    },
    st = function (e, t, n) {
      var r = ut(e, n),
        i = r.borderBoxSize,
        o = r.contentBoxSize,
        u = r.devicePixelContentBoxSize;
      switch (t) {
        case Oe.DEVICE_PIXEL_CONTENT_BOX:
          return u;
        case Oe.BORDER_BOX:
          return i;
        default:
          return o;
      }
    },
    ct = (function () {
      return E;
    })(),
    at = function (e) {
      if (Ue(e)) return 1 / 0;
      for (var t = 0, n = e.parentNode; n; ) (t += 1), (n = n.parentNode);
      return t;
    },
    ft = function () {
      var e = 1 / 0,
        t = [];
      Fe.forEach(function (n) {
        if (0 !== n.activeTargets.length) {
          var r = [];
          n.activeTargets.forEach(function (t) {
            var n = new ct(t.target),
              i = at(t.target);
            r.push(n),
              (t.lastReportedSize = st(t.target, t.observedBox)),
              e > i && (e = i);
          }),
            t.push(function () {
              n.callback.call(n.observer, r, n.observer);
            }),
            n.activeTargets.splice(0, n.activeTargets.length);
        }
      });
      for (var n = 0, r = t; n < r.length; n++) (0, r[n])();
      return e;
    },
    lt = function (e) {
      Fe.forEach(function (t) {
        t.activeTargets.splice(0, t.activeTargets.length),
          t.skippedTargets.splice(0, t.skippedTargets.length),
          t.observationTargets.forEach(function (n) {
            n.isActive() &&
              (at(n.target) > e
                ? t.activeTargets.push(n)
                : t.skippedTargets.push(n));
          });
      });
    },
    dt = [],
    vt = 0,
    ht = { attributes: 1, characterData: 1, childList: 1, subtree: 1 },
    pt = [
      "resize",
      "load",
      "transitionend",
      "animationend",
      "animationstart",
      "animationiteration",
      "keyup",
      "keydown",
      "mouseup",
      "mousedown",
      "mouseover",
      "mouseout",
      "blur",
      "focus",
    ],
    gt = function (e) {
      return void 0 === e && (e = 0), Date.now() + e;
    },
    mt = 0,
    bt = new ((function () {
      return (
        (S.prototype.run = M),
        (S.prototype.schedule = O),
        (S.prototype.observe = B),
        (S.prototype.start = k),
        (S.prototype.stop = I),
        S
      );
    })())(),
    xt = function (e) {
      !vt && e > 0 && bt.start(), !(vt += e) && bt.stop();
    },
    wt = (function () {
      return (W.prototype.isActive = A), W;
    })(),
    yt = (function () {
      return N;
    })(),
    Pt = new WeakMap(),
    Rt = function (e, t) {
      for (var n = 0; n < e.length; n += 1) if (e[n].target === t) return n;
      return -1;
    },
    Tt = (function () {
      return (
        (H.connect = j),
        (H.observe = D),
        (H.unobserve = _),
        (H.disconnect = F),
        H
      );
    })(),
    Ct = (function () {
      return (
        (X.prototype.observe = q),
        (X.prototype.unobserve = G),
        (X.prototype.disconnect = V),
        (X.toString = Y),
        X
      );
    })(),
    Et =
      "undefined" != typeof window && "ResizeObserver" in window
        ? window.ResizeObserver
        : Ct,
    zt = fe([WeakMap], function (e, t) {
      var n = (function (e) {
          function t() {
            (r = null), e.apply(void 0, n);
          }
          var n = [],
            r = null,
            i = function () {
              for (
                var e = arguments.length, i = new Array(e), o = 0;
                e > o;
                o++
              )
                i[o] = arguments[o];
              (n = i), r || (r = requestAnimationFrame(t));
            };
          return (
            (i.cancel = function () {
              r && (cancelAnimationFrame(r), (r = null));
            }),
            i
          );
        })(function (n) {
          for (var r = [], i = 0; i < n.length; i++) {
            var o = n[i],
              u = o.target.offsetHeight;
            if (u > 0) {
              var s = le.get(o.target);
              if (void 0 !== s) {
                var c = e.get(s);
                void 0 !== c && u !== c.height && r.push(s, u);
              }
            }
          }
          r.length > 0 && (e.update(r), t(r));
        }),
        r = new Et(n),
        i = r.disconnect.bind(r);
      return (
        (r.disconnect = function () {
          i(), n.cancel();
        }),
        r
      );
    }),
    Lt = { index: void 0, position: void 0, prevTop: void 0 },
    St = Q.createElement,
    Mt = Q.createElement,
    Ot = function (e, t) {
      return void 0 !== t[e];
    },
    Bt = {};
  (e.List = function (e) {
    return Mt(
      U,
      f(
        {
          role: "list",
          rowGutter: e.rowGutter,
          columnCount: 1,
          columnWidth: 1,
        },
        e
      )
    );
  }),
    (e.Masonry = U),
    (e.MasonryScroller = m),
    (e.createIntervalTree = a),
    (e.createPositioner = He),
    (e.createResizeObserver = zt),
    (e.useContainerPosition = b),
    (e.useInfiniteLoader = function (e, t) {
      void 0 === t && (t = Bt);
      var n = t,
        r = n.isItemLoaded,
        i = n.minimumBatchSize,
        o = void 0 === i ? 16 : i,
        u = n.threshold,
        s = void 0 === u ? 16 : u,
        c = n.totalItems,
        a = void 0 === c ? 9e9 : c,
        f = ee(e),
        l = ee(r);
      return Q.useCallback(
        function (e, t, n) {
          for (
            var r = (function (e, t, n, r, i, o) {
                void 0 === e && (e = Ot),
                  void 0 === t && (t = 16),
                  void 0 === r && (r = 9e9);
                for (var u, s, c = [], a = i; o >= a; a++)
                  e(a, n)
                    ? void 0 !== u &&
                      void 0 !== s &&
                      (c.push(u, s), (u = s = void 0))
                    : ((s = a), void 0 === u && (u = a));
                if (void 0 !== u && void 0 !== s) {
                  var f = Math.min(Math.max(s, u + t - 1), r - 1);
                  for (a = s + 1; f >= a && !e(a, n); a++) s = a;
                  c.push(u, s);
                }
                if (c.length)
                  for (var l = c[0], d = c[1]; t > d - l + 1 && l > 0; ) {
                    var v = l - 1;
                    if (e(v, n)) break;
                    c[0] = l = v;
                  }
                return c;
              })(
                l.current,
                o,
                n,
                a,
                Math.max(0, e - s),
                Math.min(a - 1, (t || 0) + s)
              ),
              i = 0;
            i < r.length - 1;
            ++i
          )
            f.current(r[i], r[++i], n);
        },
        [a, o, s, f, l]
      );
    }),
    (e.useMasonry = v),
    (e.usePositioner = x),
    (e.useResizeObserver = K),
    (e.useScrollToIndex = J),
    (e.useScroller = g),
    Object.defineProperty(e, "__esModule", { value: 1 });
});
//# sourceMappingURL=masonic.js.map
