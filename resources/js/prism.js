/* eslint-disable */

import '../css/prism.css'
const _self =
  typeof window !== 'undefined'
    ? window
    : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope
    ? self
    : {}
const Prism = (function (u) {
  const t = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i
  let n = 0
  const e = {}
  var M = {
    manual: u.Prism && u.Prism.manual,
    disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
    util: {
      encode: function e(n) {
        return n instanceof W
          ? new W(n.type, e(n.content), n.alias)
          : Array.isArray(n)
          ? n.map(e)
          : n
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/\u00a0/g, ' ')
      },
      type: function (e) {
        return Object.prototype.toString.call(e).slice(8, -1)
      },
      objId: function (e) {
        return e.__id || Object.defineProperty(e, '__id', { value: ++n }), e.__id
      },
      clone: function t(e, r) {
        let a
        let n
        switch (((r = r || {}), M.util.type(e))) {
          case 'Object':
            if (((n = M.util.objId(e)), r[n])) return r[n]
            for (const i in ((a = {}), (r[n] = a), e)) e.hasOwnProperty(i) && (a[i] = t(e[i], r))
            return a
          case 'Array':
            return (
              (n = M.util.objId(e)),
              r[n]
                ? r[n]
                : ((a = []),
                  (r[n] = a),
                  e.forEach(function (e, n) {
                    a[n] = t(e, r)
                  }),
                  a)
            )
          default:
            return e
        }
      },
      getLanguage: function (e) {
        for (; e; ) {
          const n = t.exec(e.className)
          if (n) return n[1].toLowerCase()
          e = e.parentElement
        }
        return 'none'
      },
      setLanguage: function (e, n) {
        ;(e.className = e.className.replace(RegExp(t, 'gi'), '')), e.classList.add('language-' + n)
      },
      currentScript: function () {
        if (typeof document === 'undefined') return null
        if ('currentScript' in document) return document.currentScript
        try {
          throw new Error()
        } catch (e) {
          const n = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(e.stack) || [])[1]
          if (n) {
            const t = document.getElementsByTagName('script')
            for (const r in t) if (t[r].src == n) return t[r]
          }
          return null
        }
      },
      isActive: function (e, n, t) {
        for (let r = 'no-' + n; e; ) {
          const a = e.classList
          if (a.contains(n)) return !0
          if (a.contains(r)) return !1
          e = e.parentElement
        }
        return !!t
      },
    },
    languages: {
      plain: e,
      plaintext: e,
      text: e,
      txt: e,
      extend: function (e, n) {
        const t = M.util.clone(M.languages[e])
        for (const r in n) t[r] = n[r]
        return t
      },
      insertBefore: function (t, e, n, r) {
        const a = (r = r || M.languages)[t]
        const i = {}
        for (const l in a)
          if (a.hasOwnProperty(l)) {
            if (l == e) for (const o in n) n.hasOwnProperty(o) && (i[o] = n[o])
            n.hasOwnProperty(l) || (i[l] = a[l])
          }
        const s = r[t]
        return (
          (r[t] = i),
          M.languages.DFS(M.languages, function (e, n) {
            n === s && e != t && (this[e] = i)
          }),
          i
        )
      },
      DFS: function e(n, t, r, a) {
        a = a || {}
        const i = M.util.objId
        for (const l in n)
          if (n.hasOwnProperty(l)) {
            t.call(n, l, n[l], r || l)
            const o = n[l]
            const s = M.util.type(o)
            s !== 'Object' || a[i(o)]
              ? s !== 'Array' || a[i(o)] || ((a[i(o)] = !0), e(o, t, l, a))
              : ((a[i(o)] = !0), e(o, t, null, a))
          }
      },
    },
    plugins: {},
    highlightAll: function (e, n) {
      M.highlightAllUnder(document, e, n)
    },
    highlightAllUnder: function (e, n, t) {
      const r = {
        callback: t,
        container: e,
        selector:
          'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
      }
      M.hooks.run('before-highlightall', r),
        (r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector))),
        M.hooks.run('before-all-elements-highlight', r)
      // file deepcode ignore OperatorPrecedence: <not needed>
      for (var a, i = 0; (a = r.elements[i++]); ) M.highlightElement(a, !0 === n, r.callback)
    },
    highlightElement: function (e, n, t) {
      const r = M.util.getLanguage(e)
      const a = M.languages[r]
      M.util.setLanguage(e, r)
      let i = e.parentElement
      i && i.nodeName.toLowerCase() === 'pre' && M.util.setLanguage(i, r)
      const l = { element: e, language: r, grammar: a, code: e.textContent }
      function o(e) {
        ;(l.highlightedCode = e),
          M.hooks.run('before-insert', l),
          (l.element.innerHTML = l.highlightedCode),
          M.hooks.run('after-highlight', l),
          M.hooks.run('complete', l),
          t && t.call(l.element)
      }
      if (
        (M.hooks.run('before-sanity-check', l),
        (i = l.element.parentElement) &&
          i.nodeName.toLowerCase() === 'pre' &&
          !i.hasAttribute('tabindex') &&
          i.setAttribute('tabindex', '0'),
        !l.code)
      )
        return M.hooks.run('complete', l), void (t && t.call(l.element))
      if ((M.hooks.run('before-highlight', l), l.grammar))
        if (n && u.Worker) {
          const s = new Worker(M.filename)
          ;(s.onmessage = function (e) {
            o(e.data)
          }),
            s.postMessage(
              JSON.stringify({ language: l.language, code: l.code, immediateClose: !0 })
            )
        } else o(M.highlight(l.code, l.grammar, l.language))
      else o(M.util.encode(l.code))
    },
    highlight: function (e, n, t) {
      const r = { code: e, grammar: n, language: t }
      return (
        M.hooks.run('before-tokenize', r),
        (r.tokens = M.tokenize(r.code, r.grammar)),
        M.hooks.run('after-tokenize', r),
        W.stringify(M.util.encode(r.tokens), r.language)
      )
    },
    tokenize: function (e, n) {
      const t = n.rest
      if (t) {
        for (const r in t) n[r] = t[r]
        delete n.rest
      }
      const a = new i()
      return (
        I(a, a.head, e),
        (function e(n, t, r, a, i, l) {
          for (const o in r)
            if (r.hasOwnProperty(o) && r[o]) {
              let s = r[o]
              s = Array.isArray(s) ? s : [s]
              for (let u = 0; u < s.length; ++u) {
                if (l && l.cause == o + ',' + u) return
                const c = s[u]
                const g = c.inside
                const f = !!c.lookbehind
                const h = !!c.greedy
                const d = c.alias
                if (h && !c.pattern.global) {
                  const v = c.pattern.toString().match(/[imsuy]*$/)[0]
                  c.pattern = RegExp(c.pattern.source, v + 'g')
                }
                for (
                  let p = c.pattern || c, m = a.next, y = i;
                  m !== t.tail && !(l && y >= l.reach);
                  y += m.value.length, m = m.next
                ) {
                  let k = m.value
                  if (t.length > n.length) return
                  if (!(k instanceof W)) {
                    var x
                    let b = 1
                    if (h) {
                      if (!(x = z(p, y, n, f)) || x.index >= n.length) break
                      var w = x.index
                      const A = x.index + x[0].length
                      let P = y
                      for (P += m.value.length; P <= w; ) (m = m.next), (P += m.value.length)
                      if (((P -= m.value.length), (y = P), m.value instanceof W)) continue
                      for (
                        let E = m;
                        E !== t.tail && (P < A || typeof E.value === 'string');
                        E = E.next
                      )
                        b++, (P += E.value.length)
                      b--, (k = n.slice(y, P)), (x.index -= y)
                    } else if (!(x = z(p, 0, k, f))) continue
                    var w = x.index
                    const L = x[0]
                    const S = k.slice(0, w)
                    const O = k.slice(w + L.length)
                    const j = y + k.length
                    l && j > l.reach && (l.reach = j)
                    let C = m.prev
                    S && ((C = I(t, C, S)), (y += S.length)), q(t, C, b)
                    const N = new W(o, g ? M.tokenize(L, g) : L, d, L)
                    if (((m = I(t, C, N)), O && I(t, m, O), b > 1)) {
                      const _ = { cause: o + ',' + u, reach: j }
                      e(n, t, r, m.prev, y, _), l && _.reach > l.reach && (l.reach = _.reach)
                    }
                  }
                }
              }
            }
        })(e, a, n, a.head, 0),
        (function (e) {
          const n = []
          let t = e.head.next
          for (; t !== e.tail; ) n.push(t.value), (t = t.next)
          return n
        })(a)
      )
    },
    hooks: {
      all: {},
      add: function (e, n) {
        const t = M.hooks.all
        ;(t[e] = t[e] || []), t[e].push(n)
      },
      run: function (e, n) {
        const t = M.hooks.all[e]
        if (t && t.length) for (var r, a = 0; (r = t[a++]); ) r(n)
      },
    },
    Token: W,
  }
  function W(e, n, t, r) {
    ;(this.type = e), (this.content = n), (this.alias = t), (this.length = 0 | (r || '').length)
  }
  function z(e, n, t, r) {
    e.lastIndex = n
    const a = e.exec(t)
    if (a && r && a[1]) {
      const i = a[1].length
      ;(a.index += i), (a[0] = a[0].slice(i))
    }
    return a
  }
  function i() {
    const e = { value: null, prev: null, next: null }
    const n = { value: null, prev: e, next: null }
    ;(e.next = n), (this.head = e), (this.tail = n), (this.length = 0)
  }
  function I(e, n, t) {
    const r = n.next
    const a = { value: t, prev: n, next: r }
    return (n.next = a), (r.prev = a), e.length++, a
  }
  function q(e, n, t) {
    for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next
    ;((n.next = r).prev = n), (e.length -= a)
  }
  if (
    ((u.Prism = M),
    (W.stringify = function n(e, t) {
      if (typeof e === 'string') return e
      if (Array.isArray(e)) {
        let r = ''
        return (
          e.forEach(function (e) {
            r += n(e, t)
          }),
          r
        )
      }
      const a = {
        type: e.type,
        content: n(e.content, t),
        tag: 'span',
        classes: ['token', e.type],
        attributes: {},
        language: t,
      }
      const i = e.alias
      i && (Array.isArray(i) ? Array.prototype.push.apply(a.classes, i) : a.classes.push(i)),
        M.hooks.run('wrap', a)
      let l = ''
      for (const o in a.attributes)
        l += ' ' + o + '="' + (a.attributes[o] || '').replace(/"/g, '&quot;') + '"'
      return (
        '<' +
        a.tag +
        ' class="' +
        a.classes.join(' ') +
        '"' +
        l +
        '>' +
        a.content +
        '</' +
        a.tag +
        '>'
      )
    }),
    !u.document)
  )
    return (
      u.addEventListener &&
        (M.disableWorkerMessageHandler ||
          u.addEventListener(
            'message',
            // deepcode ignore InsufficientValidation: <not needed>
            function (e) {
              const n = JSON.parse(e.data)
              const t = n.language
              const r = n.code
              const a = n.immediateClose
              u.postMessage(M.highlight(r, M.languages[t], t)), a && u.close()
            },
            !1
          )),
      M
    )
  const r = M.util.currentScript()
  function a() {
    M.manual || M.highlightAll()
  }
  if ((r && ((M.filename = r.src), r.hasAttribute('data-manual') && (M.manual = !0)), !M.manual)) {
    const l = document.readyState
    l === 'loading' || (l === 'interactive' && r && r.defer)
      ? document.addEventListener('DOMContentLoaded', a)
      : window.requestAnimationFrame
      ? window.requestAnimationFrame(a)
      : window.setTimeout(a, 16)
  }
  return M
})(_self)
typeof module !== 'undefined' && module.exports && (module.exports = Prism),
  typeof global !== 'undefined' && (global.Prism = Prism)
;(Prism.languages.markup = {
  comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
  prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
  doctype: {
    pattern:
      /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
    inside: {
      'internal-subset': {
        pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
        lookbehind: !0,
        greedy: !0,
        inside: null,
      },
      'string': { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
      'punctuation': /^<!|>$|[[\]]/,
      'doctype-tag': /^DOCTYPE/i,
      'name': /[^\s<>'"]+/,
    },
  },
  cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
  tag: {
    pattern:
      /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      'tag': {
        pattern: /^<\/?[^\s>\/]+/,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
      },
      'special-attr': [],
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: { punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/] },
      },
      'punctuation': /\/?>/,
      'attr-name': { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } },
    },
  },
  entity: [{ pattern: /&[\da-z]{1,8};/i, alias: 'named-entity' }, /&#x?[\da-f]{1,8};/i],
}),
  (Prism.languages.markup.tag.inside['attr-value'].inside.entity = Prism.languages.markup.entity),
  (Prism.languages.markup.doctype.inside['internal-subset'].inside = Prism.languages.markup),
  Prism.hooks.add('wrap', function (a) {
    a.type === 'entity' && (a.attributes.title = a.content.replace(/&amp;/, '&'))
  }),
  Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
    value: function (a, e) {
      const s = {}
      ;(s['language-' + e] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: Prism.languages[e],
      }),
        (s.cdata = /^<!\[CDATA\[|\]\]>$/i)
      const t = { 'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s } }
      t['language-' + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] }
      const n = {}
      ;(n[a] = {
        pattern: RegExp(
          '(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)'.replace(
            /__/g,
            function () {
              return a
            }
          ),
          'i'
        ),
        lookbehind: !0,
        greedy: !0,
        inside: t,
      }),
        Prism.languages.insertBefore('markup', 'cdata', n)
    },
  }),
  Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
    value: function (a, e) {
      // deepcode ignore ArrayMethodOnNonArray: <please specify a reason of ignoring this>
      Prism.languages.markup.tag.inside['special-attr'].push({
        pattern: RegExp(
          '(^|["\'\\s])(?:' + a + ')\\s*=\\s*(?:"[^"]*"|\'[^\']*\'|[^\\s\'">=]+(?=[\\s>]))',
          'i'
        ),
        lookbehind: !0,
        inside: {
          'attr-name': /^[^\s=]+/,
          'attr-value': {
            pattern: /=[\s\S]+/,
            inside: {
              value: {
                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: !0,
                alias: [e, 'language-' + e],
                inside: Prism.languages[e],
              },
              punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/],
            },
          },
        },
      })
    },
  }),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.xml = Prism.languages.extend('markup', {})),
  (Prism.languages.ssml = Prism.languages.xml),
  (Prism.languages.atom = Prism.languages.xml),
  (Prism.languages.rss = Prism.languages.xml)
!(function (s) {
  const e = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/
  ;(s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
      inside: {
        'rule': /^@[\w-]+/,
        'selector-function-argument': {
          pattern:
            /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: !0,
          alias: 'selector',
        },
        'keyword': { pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/, lookbehind: !0 },
      },
    },
    url: {
      pattern: RegExp('\\burl\\((?:' + e.source + '|(?:[^\\\\\r\n()"\']|\\\\[^])*)\\)', 'i'),
      greedy: !0,
      inside: {
        function: /^url/i,
        punctuation: /^\(|\)$/,
        string: { pattern: RegExp('^' + e.source + '$'), alias: 'url' },
      },
    },
    selector: {
      pattern: RegExp(
        '(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + e.source + ')*(?=\\s*\\{)'
      ),
      lookbehind: !0,
    },
    string: { pattern: e, greedy: !0 },
    property: {
      pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
      lookbehind: !0,
    },
    important: /!important\b/i,
    function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0 },
    punctuation: /[(){};:,]/,
  }),
    (s.languages.css.atrule.inside.rest = s.languages.css)
  const t = s.languages.markup
  t && (t.tag.addInlined('style', 'css'), t.tag.addAttribute('style', 'css'))
})(Prism)
