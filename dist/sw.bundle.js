(() => {
  const e = {
    913: () => { try { self['workbox:core:7.0.0'] && _(); } catch (e) {} }, 977: () => { try { self['workbox:precaching:7.0.0'] && _(); } catch (e) {} }, 80: () => { try { self['workbox:routing:7.0.0'] && _(); } catch (e) {} }, 873: () => { try { self['workbox:strategies:7.0.0'] && _(); } catch (e) {} },
  }; const t = {}; function s(a) { const r = t[a]; if (void 0 !== r) return r.exports; const n = t[a] = { exports: {} }; return e[a](n, n.exports, s), n.exports; }(() => {
    s(913); class e extends Error {constructor(e, t) { super(((e, ...t) => { let s = e; return t.length > 0 && (s += ` :: ${JSON.stringify(t)}`), s; })(e, t)), this.name = e, this.details = t; }} const t = {
      googleAnalytics: 'googleAnalytics', precache: 'precache-v2', prefix: 'workbox', runtime: 'runtime', suffix: typeof registration !== 'undefined' ? registration.scope : '',
    }; const a = (e) => [t.prefix, e, t.suffix].filter(((e) => e && e.length > 0)).join('-'); const r = (e) => e || a(t.precache); function n(e, t) { const s = t(); return e.waitUntil(s), s; } function i(t) { if (!t) throw new e('add-to-cache-list-unexpected-type', { entry: t }); if (typeof t === 'string') { const e = new URL(t, location.href); return { cacheKey: e.href, url: e.href }; } const { revision: s, url: a } = t; if (!a) throw new e('add-to-cache-list-unexpected-type', { entry: t }); if (!s) { const e = new URL(a, location.href); return { cacheKey: e.href, url: e.href }; } const r = new URL(a, location.href); const n = new URL(a, location.href); return r.searchParams.set('__WB_REVISION__', s), { cacheKey: r.href, url: n.href }; }s(977); class c {constructor() { this.updatedURLs = [], this.notUpdatedURLs = [], this.handlerWillStart = async ({ request: e, state: t }) => { t && (t.originalRequest = e); }, this.cachedResponseWillBeUsed = async ({ event: e, state: t, cachedResponse: s }) => { if (e.type === 'install' && t && t.originalRequest && t.originalRequest instanceof Request) { const e = t.originalRequest.url; s ? this.notUpdatedURLs.push(e) : this.updatedURLs.push(e); } return s; }; }} class o {constructor({ precacheController: e }) { this.cacheKeyWillBeUsed = async ({ request: e, params: t }) => { const s = (t == null ? void 0 : t.cacheKey) || this._precacheController.getCacheKeyForURL(e.url); return s ? new Request(s, { headers: e.headers }) : e; }, this._precacheController = e; }} let h; function l(e, t) { const s = new URL(e); for (const e of t)s.searchParams.delete(e); return s.href; } class u {constructor() { this.promise = new Promise(((e, t) => { this.resolve = e, this.reject = t; })); }} const d = new Set(); function f(e) { return typeof e === 'string' ? new Request(e) : e; }s(873); class p {
      constructor(e, t) { this._cacheKeys = {}, Object.assign(this, t), this.event = t.event, this._strategy = e, this._handlerDeferred = new u(), this._extendLifetimePromises = [], this._plugins = [...e.plugins], this._pluginStateMap = new Map(); for (const e of this._plugins) this._pluginStateMap.set(e, {}); this.event.waitUntil(this._handlerDeferred.promise); }

      async fetch(t) {
        const { event: s } = this; let a = f(t); if (a.mode === 'navigate' && s instanceof FetchEvent && s.preloadResponse) { const e = await s.preloadResponse; if (e) return e; } const r = this.hasCallback('fetchDidFail') ? a.clone() : null; try { for (const e of this.iterateCallbacks('requestWillFetch'))a = await e({ request: a.clone(), event: s }); } catch (t) { if (t instanceof Error) throw new e('plugin-error-request-will-fetch', { thrownErrorMessage: t.message }); } const n = a.clone(); try { let e; e = await fetch(a, a.mode === 'navigate' ? void 0 : this._strategy.fetchOptions); for (const t of this.iterateCallbacks('fetchDidSucceed'))e = await t({ event: s, request: n, response: e }); return e; } catch (e) {
          throw r && await this.runCallbacks('fetchDidFail', {
            error: e, event: s, originalRequest: r.clone(), request: n.clone(),
          }), e;
        }
      }

      async fetchAndCachePut(e) { const t = await this.fetch(e); const s = t.clone(); return this.waitUntil(this.cachePut(e, s)), t; }

      async cacheMatch(e) {
        const t = f(e); let s; const { cacheName: a, matchOptions: r } = this._strategy; const n = await this.getCacheKey(t, 'read'); const i = { ...r, cacheName: a }; s = await caches.match(n, i); for (const e of this.iterateCallbacks('cachedResponseWillBeUsed')) {
          s = await e({
            cacheName: a, matchOptions: r, cachedResponse: s, request: n, event: this.event,
          }) || void 0;
        } return s;
      }

      async cachePut(t, s) {
        const a = f(t); await (0, new Promise(((e) => setTimeout(e, 0)))); const r = await this.getCacheKey(a, 'write'); if (!s) throw new e('cache-put-with-no-response', { url: (n = r.url, new URL(String(n), location.href).href.replace(new RegExp(`^${location.origin}`), '')) }); let n; const i = await this._ensureResponseSafeToCache(s); if (!i) return !1; const { cacheName: c, matchOptions: o } = this._strategy; const h = await self.caches.open(c); const u = this.hasCallback('cacheDidUpdate'); const p = u ? await (async function (e, t, s, a) { const r = l(t.url, s); if (t.url === r) return e.match(t, a); const n = { ...a, ignoreSearch: !0 }; const i = await e.keys(t, n); for (const t of i) if (r === l(t.url, s)) return e.match(t, a); }(h, r.clone(), ['__WB_REVISION__'], o)) : null; try { await h.put(r, u ? i.clone() : i); } catch (e) { if (e instanceof Error) throw e.name === 'QuotaExceededError' && await (async function () { for (const e of d) await e(); }()), e; } for (const e of this.iterateCallbacks('cacheDidUpdate')) {
          await e({
            cacheName: c, oldResponse: p, newResponse: i.clone(), request: r, event: this.event,
          });
        } return !0;
      }

      async getCacheKey(e, t) {
        const s = `${e.url} | ${t}`; if (!this._cacheKeys[s]) {
          let a = e; for (const e of this.iterateCallbacks('cacheKeyWillBeUsed')) {
            a = f(await e({
              mode: t, request: a, event: this.event, params: this.params,
            }));
          } this._cacheKeys[s] = a;
        } return this._cacheKeys[s];
      }

      hasCallback(e) { for (const t of this._strategy.plugins) if (e in t) return !0; return !1; }

      async runCallbacks(e, t) { for (const s of this.iterateCallbacks(e)) await s(t); }

      * iterateCallbacks(e) { for (const t of this._strategy.plugins) if (typeof t[e] === 'function') { const s = this._pluginStateMap.get(t); const a = (a) => { const r = { ...a, state: s }; return t[e](r); }; yield a; } }

      waitUntil(e) { return this._extendLifetimePromises.push(e), e; }

      async doneWaiting() { let e; for (;e = this._extendLifetimePromises.shift();) await e; }

      destroy() { this._handlerDeferred.resolve(null); }

      async _ensureResponseSafeToCache(e) { let t = e; let s = !1; for (const e of this.iterateCallbacks('cacheWillUpdate')) if (t = await e({ request: this.request, response: t, event: this.event }) || void 0, s = !0, !t) break; return s || t && t.status !== 200 && (t = void 0), t; }
    } class g {
      constructor(e = {}) { this.cacheName = e.cacheName || a(t.runtime), this.plugins = e.plugins || [], this.fetchOptions = e.fetchOptions, this.matchOptions = e.matchOptions; }

      handle(e) { const [t] = this.handleAll(e); return t; }

      handleAll(e) { e instanceof FetchEvent && (e = { event: e, request: e.request }); const t = e.event; const s = typeof e.request === 'string' ? new Request(e.request) : e.request; const a = 'params' in e ? e.params : void 0; const r = new p(this, { event: t, request: s, params: a }); const n = this._getResponse(r, s, t); return [n, this._awaitComplete(n, r, s, t)]; }

      async _getResponse(t, s, a) { let r; await t.runCallbacks('handlerWillStart', { event: a, request: s }); try { if (r = await this._handle(s, t), !r || r.type === 'error') throw new e('no-response', { url: s.url }); } catch (e) { if (e instanceof Error) for (const n of t.iterateCallbacks('handlerDidError')) if (r = await n({ error: e, event: a, request: s }), r) break; if (!r) throw e; } for (const e of t.iterateCallbacks('handlerWillRespond'))r = await e({ event: a, request: s, response: r }); return r; }

      async _awaitComplete(e, t, s, a) {
        let r; let n; try { r = await e; } catch (n) {} try { await t.runCallbacks('handlerDidRespond', { event: a, request: s, response: r }), await t.doneWaiting(); } catch (e) { e instanceof Error && (n = e); } if (await t.runCallbacks('handlerDidComplete', {
          event: a, request: s, response: r, error: n,
        }), t.destroy(), n) throw n;
      }
    } class y extends g {
      constructor(e = {}) { e.cacheName = r(e.cacheName), super(e), this._fallbackToNetwork = !1 !== e.fallbackToNetwork, this.plugins.push(y.copyRedirectedCacheableResponsesPlugin); }

      async _handle(e, t) { return await t.cacheMatch(e) || (t.event && t.event.type === 'install' ? await this._handleInstall(e, t) : await this._handleFetch(e, t)); }

      async _handleFetch(t, s) { let a; const r = s.params || {}; if (!this._fallbackToNetwork) throw new e('missing-precache-entry', { cacheName: this.cacheName, url: t.url }); { const e = r.integrity; const n = t.integrity; const i = !n || n === e; a = await s.fetch(new Request(t, { integrity: t.mode !== 'no-cors' ? n || e : void 0 })), e && i && t.mode !== 'no-cors' && (this._useDefaultCacheabilityPluginIfNeeded(), await s.cachePut(t, a.clone())); } return a; }

      async _handleInstall(t, s) { this._useDefaultCacheabilityPluginIfNeeded(); const a = await s.fetch(t); if (!await s.cachePut(t, a.clone())) throw new e('bad-precaching-response', { url: t.url, status: a.status }); return a; }

      _useDefaultCacheabilityPluginIfNeeded() { let e = null; let t = 0; for (const [s, a] of this.plugins.entries())a !== y.copyRedirectedCacheableResponsesPlugin && (a === y.defaultPrecacheCacheabilityPlugin && (e = s), a.cacheWillUpdate && t++); t === 0 ? this.plugins.push(y.defaultPrecacheCacheabilityPlugin) : t > 1 && e !== null && this.plugins.splice(e, 1); }
    }y.defaultPrecacheCacheabilityPlugin = { cacheWillUpdate: async ({ response: e }) => (!e || e.status >= 400 ? null : e) }, y.copyRedirectedCacheableResponsesPlugin = { cacheWillUpdate: async ({ response: t }) => (t.redirected ? await (async function (t, s) { let a = null; if (t.url && (a = new URL(t.url).origin), a !== self.location.origin) throw new e('cross-origin-copy-response', { origin: a }); const r = t.clone(); const n = { headers: new Headers(r.headers), status: r.status, statusText: r.statusText }; const i = s ? s(n) : n; const c = (function () { if (void 0 === h) { const e = new Response(''); if ('body' in e) try { new Response(e.body), h = !0; } catch (e) { h = !1; }h = !1; } return h; }()) ? r.body : await r.blob(); return new Response(c, i); }(t)) : t) }; class w {
      constructor({ cacheName: e, plugins: t = [], fallbackToNetwork: s = !0 } = {}) { this._urlsToCacheKeys = new Map(), this._urlsToCacheModes = new Map(), this._cacheKeysToIntegrities = new Map(), this._strategy = new y({ cacheName: r(e), plugins: [...t, new o({ precacheController: this })], fallbackToNetwork: s }), this.install = this.install.bind(this), this.activate = this.activate.bind(this); }

      get strategy() { return this._strategy; }

      precache(e) { this.addToCacheList(e), this._installAndActiveListenersAdded || (self.addEventListener('install', this.install), self.addEventListener('activate', this.activate), this._installAndActiveListenersAdded = !0); }

      addToCacheList(t) { const s = []; for (const a of t) { typeof a === 'string' ? s.push(a) : a && void 0 === a.revision && s.push(a.url); const { cacheKey: t, url: r } = i(a); const n = typeof a !== 'string' && a.revision ? 'reload' : 'default'; if (this._urlsToCacheKeys.has(r) && this._urlsToCacheKeys.get(r) !== t) throw new e('add-to-cache-list-conflicting-entries', { firstEntry: this._urlsToCacheKeys.get(r), secondEntry: t }); if (typeof a !== 'string' && a.integrity) { if (this._cacheKeysToIntegrities.has(t) && this._cacheKeysToIntegrities.get(t) !== a.integrity) throw new e('add-to-cache-list-conflicting-integrities', { url: r }); this._cacheKeysToIntegrities.set(t, a.integrity); } if (this._urlsToCacheKeys.set(r, t), this._urlsToCacheModes.set(r, n), s.length > 0) { const e = `Workbox is precaching URLs without revision info: ${s.join(', ')}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`; console.warn(e); } } }

      install(e) { return n(e, (async () => { const t = new c(); this.strategy.plugins.push(t); for (const [t, s] of this._urlsToCacheKeys) { const a = this._cacheKeysToIntegrities.get(s); const r = this._urlsToCacheModes.get(t); const n = new Request(t, { integrity: a, cache: r, credentials: 'same-origin' }); await Promise.all(this.strategy.handleAll({ params: { cacheKey: s }, request: n, event: e })); } const { updatedURLs: s, notUpdatedURLs: a } = t; return { updatedURLs: s, notUpdatedURLs: a }; })); }

      activate(e) { return n(e, (async () => { const e = await self.caches.open(this.strategy.cacheName); const t = await e.keys(); const s = new Set(this._urlsToCacheKeys.values()); const a = []; for (const r of t)s.has(r.url) || (await e.delete(r), a.push(r.url)); return { deletedURLs: a }; })); }

      getURLsToCacheKeys() { return this._urlsToCacheKeys; }

      getCachedURLs() { return [...this._urlsToCacheKeys.keys()]; }

      getCacheKeyForURL(e) { const t = new URL(e, location.href); return this._urlsToCacheKeys.get(t.href); }

      getIntegrityForCacheKey(e) { return this._cacheKeysToIntegrities.get(e); }

      async matchPrecache(e) { const t = e instanceof Request ? e.url : e; const s = this.getCacheKeyForURL(t); if (s) return (await self.caches.open(this.strategy.cacheName)).match(s); }

      createHandlerBoundToURL(t) { const s = this.getCacheKeyForURL(t); if (!s) throw new e('non-precached-url', { url: t }); return (e) => (e.request = new Request(t), e.params = { cacheKey: s, ...e.params }, this.strategy.handle(e)); }
    } let m; const _ = () => (m || (m = new w()), m); s(80); const R = (e) => (e && typeof e === 'object' ? e : { handle: e }); class v {
      constructor(e, t, s = 'GET') { this.handler = R(t), this.match = e, this.method = s; }

      setCatchHandler(e) { this.catchHandler = R(e); }
    } class C extends v {constructor(e, t, s) { super((({ url: t }) => { const s = e.exec(t.href); if (s && (t.origin === location.origin || s.index === 0)) return s.slice(1); }), t, s); }} class b {
      constructor() { this._routes = new Map(), this._defaultHandlerMap = new Map(); }

      get routes() { return this._routes; }

      addFetchListener() { self.addEventListener('fetch', ((e) => { const { request: t } = e; const s = this.handleRequest({ request: t, event: e }); s && e.respondWith(s); })); }

      addCacheListener() { self.addEventListener('message', ((e) => { if (e.data && e.data.type === 'CACHE_URLS') { const { payload: t } = e.data; const s = Promise.all(t.urlsToCache.map(((t) => { typeof t === 'string' && (t = [t]); const s = new Request(...t); return this.handleRequest({ request: s, event: e }); }))); e.waitUntil(s), e.ports && e.ports[0] && s.then((() => e.ports[0].postMessage(!0))); } })); }

      handleRequest({ request: e, event: t }) {
        const s = new URL(e.url, location.href); if (!s.protocol.startsWith('http')) return; const a = s.origin === location.origin; const { params: r, route: n } = this.findMatchingRoute({
          event: t, request: e, sameOrigin: a, url: s,
        }); let i = n && n.handler; const c = e.method; if (!i && this._defaultHandlerMap.has(c) && (i = this._defaultHandlerMap.get(c)), !i) return; let o; try {
          o = i.handle({
            url: s, request: e, event: t, params: r,
          });
        } catch (e) { o = Promise.reject(e); } const h = n && n.catchHandler; return o instanceof Promise && (this._catchHandler || h) && (o = o.catch((async (a) => {
          if (h) {
            try {
              return await h.handle({
                url: s, request: e, event: t, params: r,
              });
            } catch (e) { e instanceof Error && (a = e); }
          } if (this._catchHandler) return this._catchHandler.handle({ url: s, request: e, event: t }); throw a;
        }))), o;
      }

      findMatchingRoute({
        url: e, sameOrigin: t, request: s, event: a,
      }) {
        const r = this._routes.get(s.method) || []; for (const n of r) {
          let r; const i = n.match({
            url: e, sameOrigin: t, request: s, event: a,
          }); if (i) return r = i, (Array.isArray(r) && r.length === 0 || i.constructor === Object && Object.keys(i).length === 0 || typeof i === 'boolean') && (r = void 0), { route: n, params: r };
        } return {};
      }

      setDefaultHandler(e, t = 'GET') { this._defaultHandlerMap.set(t, R(e)); }

      setCatchHandler(e) { this._catchHandler = R(e); }

      registerRoute(e) { this._routes.has(e.method) || this._routes.set(e.method, []), this._routes.get(e.method).push(e); }

      unregisterRoute(t) { if (!this._routes.has(t.method)) throw new e('unregister-route-but-not-found-with-method', { method: t.method }); const s = this._routes.get(t.method).indexOf(t); if (!(s > -1)) throw new e('unregister-route-route-not-registered'); this._routes.get(t.method).splice(s, 1); }
    } let U; function q(t, s, a) { let r; if (typeof t === 'string') { const e = new URL(t, location.href); r = new v((({ url: t }) => t.href === e.href), s, a); } else if (t instanceof RegExp)r = new C(t, s, a); else if (typeof t === 'function')r = new v(t, s, a); else { if (!(t instanceof v)) throw new e('unsupported-route-type', { moduleName: 'workbox-routing', funcName: 'registerRoute', paramName: 'capture' }); r = t; } return (U || (U = new b(), U.addFetchListener(), U.addCacheListener()), U).registerRoute(r), r; } class L extends v {
      constructor(e, t) {
        super((({ request: s }) => {
          const a = e.getURLsToCacheKeys(); for (const r of (function* (e, {
            ignoreURLParametersMatching: t = [/^utm_/, /^fbclid$/], directoryIndex: s = 'index.html', cleanURLs: a = !0, urlManipulation: r,
          } = {}) { const n = new URL(e, location.href); n.hash = '', yield n.href; const i = (function (e, t = []) { for (const s of [...e.searchParams.keys()])t.some(((e) => e.test(s))) && e.searchParams.delete(s); return e; }(n, t)); if (yield i.href, s && i.pathname.endsWith('/')) { const e = new URL(i.href); e.pathname += s, yield e.href; } if (a) { const e = new URL(i.href); e.pathname += '.html', yield e.href; } if (r) { const e = r({ url: n }); for (const t of e) yield t.href; } }(s.url, t))) { const t = a.get(r); if (t) return { cacheKey: t, integrity: e.getIntegrityForCacheKey(t) }; }
        }), e.strategy);
      }
    } const k = { cacheWillUpdate: async ({ response: e }) => (e.status === 200 || e.status === 0 ? e : null) }; class K extends g {
      constructor(e = {}) { super(e), this.plugins.some(((e) => 'cacheWillUpdate' in e)) || this.plugins.unshift(k); }

      async _handle(t, s) { const a = s.fetchAndCachePut(t).catch((() => {})); s.waitUntil(a); let r; let n = await s.cacheMatch(t); if (n);else try { n = await a; } catch (e) { e instanceof Error && (r = e); } if (!n) throw new e('no-response', { url: t.url, error: r }); return n; }
    } let T; T = [{ revision: '0f36fa8dfb798d098629b7d4d63def6f', url: '14.jpeg' }, { revision: null, url: '65a8ce52fc5427e8f94d.eot' }, { revision: null, url: '913d4a6ba0e9d0cad2f9.svg' }, { revision: 'ffbdcf9bedd71494c0585ab2a48b076c', url: 'MilkyWay_Apps-removebg-preview (1).png' }, { revision: '6e80678c850b467be15de63850d7bb85', url: 'app.bundle.js' }, { revision: '4e0e34f265fae8f33b01b27ae29d9d6f', url: 'app.bundle.js.LICENSE.txt' }, { revision: 'd5fa613fdcc406f2786f7620d6de5d04', url: 'app.webmanifest' }, { revision: null, url: 'd12afc36557395143e4b.woff' }, { revision: null, url: 'db9ddb1898dbd76badca.ttf' }, { revision: '1c5dd3c9138fd986da6da30a53e9a861', url: 'defaultprofile.png' }, { revision: null, url: 'df635aaf04cd75132f62.woff2' }, { revision: '4e1e5824a3c96f5fff4e8e9572264b2b', url: 'eatogo.png' }, { revision: '49f78cae81de4f48caf1c2fe0271c828', url: 'hero-image_2.jpg' }, { revision: '1c5dd3c9138fd986da6da30a53e9a861', url: 'icons/defaultprofile.png' }, { revision: 'c30a1ce9dcc2cb4131d4b52785a192cc', url: 'icons/maskable-icon(1).png' }, { revision: 'e90d662ca6a9ec25653923407354720c', url: 'icons/maskable-icon(2).png' }, { revision: '2a3b1af5496e8d61ef6fbe787821d44d', url: 'icons/maskable-icon(3).png' }, { revision: '85c3f923b09f67a551869739441c0ab7', url: 'icons/maskable-icon(4).png' }, { revision: 'effe28f8971a4dff92231c8694f3e31c', url: 'icons/maskable-icon(5).png' }, { revision: '31a1d889218e91da5b91e22b8b10c399', url: 'icons/maskable-icon(6).png' }, { revision: 'f1ab647726f147a7e7e4ffffd0757e4e', url: 'icons/maskable_icon.png' }, { revision: '7a70844092793c6e08319ab2680e3f17', url: 'index.html' }, { revision: 'ffbdcf9bedd71494c0585ab2a48b076c', url: 'milkyway.png' }, { revision: 'b0bb967778275b356010f01219188eb0', url: 'public/boxicons.svg' }, { revision: '1c5dd3c9138fd986da6da30a53e9a861', url: 'public/defaultprofile.png' }, { revision: '49f78cae81de4f48caf1c2fe0271c828', url: 'public/hero-image_2.jpg' }, { revision: 'ffbdcf9bedd71494c0585ab2a48b076c', url: 'public/milkyway.png' }], _().precache(T), (function (e) { const t = _(); q(new L(t, undefined)); }()), q(((e) => e.url.href.startsWith('https://restaurant-api.dicoding.dev')), new K({ cacheName: 'restaurant-api' })), q(((e) => e.url.href.startsWith('https://restaurant-api.dicoding.dev/images/large/')), new K({ cacheName: 'restaurant-image-large-api' })), q(((e) => e.url.href.startsWith('https://restaurant-api.dicoding.dev/images/medium/')), new K({ cacheName: 'restaurant-image-medium-api' })), q(((e) => e.url.href.startsWith('https://restaurant-api.dicoding.dev/images/small/')), new K({ cacheName: 'restaurant-image-small-api' })), self.addEventListener('install', (() => { console.log('Service Worker: Installed'), self.skipWaiting(); }));
  })();
})();
// # sourceMappingURL=sw.bundle.js.map
