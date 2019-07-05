// eslint-disable-next-line
!(function(e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var o in e)
          n.d(
            r,
            o,
            function(t) {
              return e[t];
            }.bind(null, o)
          );
      return r;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ''),
    n((n.s = 3));
})([
  function(e, t, n) {
    'use strict';
    const r = 'UA-135746811-1';
    var o, a, i, c, u, s;
    (o = window),
      (a = document),
      (i = 'script'),
      (c = 'ga'),
      (o.GoogleAnalyticsObject = c),
      (o.ga =
        o.ga ||
        function() {
          (o.ga.q = o.ga.q || []).push(arguments);
        }),
      (o.ga.l = 1 * new Date()),
      (u = a.createElement(i)),
      (s = a.getElementsByTagName(i)[0]),
      (u.async = 1),
      (u.src = 'https://www.google-analytics.com/analytics.js'),
      s.parentNode.insertBefore(u, s);
    n.d(t, 'a', function() {
      return d;
    });
    var l = !1,
      f = !0;
    function g(e) {
      f &&
        (l ||
          ((l = !0),
          ga('create', r, 'auto'),
          ga('set', 'checkProtocolTask', function() {}),
          ga('require', 'displayfeatures')),
        e());
    }
    function d(e) {
      g(() => ga('send', 'pageview', e));
    }
  },
  ,
  ,
  function(e, t, n) {
    'use strict';
    n.r(t);
    var r = n(0);
    const o = 'Eye Timer';
    function a(e, t) {
      return chrome.i18n.getMessage(e, t);
    }
    const i = 20;
    let c = !1;
    Object(r.a)('/background.html'),
      c ||
        ((c = !0),
        chrome.alarms.create({ delayInMinutes: i, periodInMinutes: i }),
        chrome.alarms.onAlarm.addListener(e =>
          (function(e) {
            var t, n;
            (t = a('notification_title')),
              (n = a('notification_message')),
              chrome.notifications.clear(o, e => {
                chrome.notifications.create(
                  o,
                  {
                    type: 'basic',
                    title: t,
                    message: n,
                    iconUrl: 'assets/icon.png',
                    eventTime: Date.now()
                  },
                  function(e) {}
                );
              });
          })()
        ));
  }
]);
