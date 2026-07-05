/*
 * Precifica — motor de troca de idioma (PT-BR / EN)
 * ---------------------------------------------------
 * Como funciona:
 *  - Cada elemento traduzido carrega os textos direto nos atributos
 *    data-pt / data-en (ou data-pt-html / data-en-html para casos com
 *    HTML simples embutido, como <em> ou <a>).
 *  - Essa função troca o conteúdo visível com base no idioma escolhido.
 *  - A escolha do usuário fica salva no navegador (localStorage) e
 *    é reaplicada automaticamente na próxima visita.
 *
 * Para adicionar um novo texto traduzível, basta colocar no elemento:
 *   data-i18n data-pt="Texto em português" data-en="Text in English"
 * ou, se o conteúdo tiver tags HTML dentro (como <strong> ou <a>):
 *   data-i18n-html data-pt-html="..." data-en-html="..."
 *
 * O script.js consulta window.PrecificaI18N.lang / .t() pra também
 * traduzir os textos que são gerados dinamicamente pela calculadora.
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'precifica_lang';
  var SUPPORTED = ['pt', 'en'];
  var current = 'pt';

  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.indexOf(saved) > -1) current = saved;
  } catch (e) { /* localStorage indisponível — segue com 'pt' */ }

  // Pequeno dicionário para strings geradas dinamicamente pelo script.js
  // (essas não vivem no HTML porque mudam de acordo com a categoria escolhida).
  var DICT = {
    'result.freelancer.label1': { pt: 'Preço/hora sugerido', en: 'Suggested hourly rate' },
    'result.freelancer.label2': { pt: 'Faixa de preço recomendada', en: 'Recommended price range' },
    'result.empresa.label1': { pt: 'Salário mensal estimado', en: 'Estimated monthly salary' },
    'result.empresa.label2': { pt: 'Faixa salarial recomendada', en: 'Recommended salary range' },
    'calc.hint.empresa': {
      pt: 'Estimativa ilustrativa baseada em faixas médias de mercado por cargo, senioridade e região. No produto real, esse valor vem de dados coletados com empresas e vagas reais.',
      en: 'Illustrative estimate based on average market ranges by role, seniority and region. In the real product, this value comes from data collected from real companies and job postings.'
    },
    'calc.hint.freelancer': {
      pt: 'Estimativa ilustrativa baseada em faixas médias de mercado por categoria, experiência e região. No produto real, esse valor vem de dados coletados com prestadores de serviço reais.',
      en: 'Illustrative estimate based on average market ranges by category, experience and region. In the real product, this value comes from data collected from real service providers.'
    },
    'copy.button.default': { pt: '📋 Copiar resultado', en: '📋 Copy result' },
    'copy.button.copied': { pt: '✓ Copiado!', en: '✓ Copied!' },
    'premium.tip.empresa': {
      pt: 'Use esse número como argumento em negociações salariais ou para justificar reajustes.',
      en: 'Use this number as a talking point in salary negotiations or to justify raises.'
    },
    'premium.tip.freelancer': {
      pt: 'Use esse número como argumento pra justificar seu preço com clientes.',
      en: 'Use this number as a talking point to justify your price with clients.'
    },
    'combo.hint.capital': { pt: 'Perfil: capital / região metropolitana.', en: 'Profile: capital / metro area.' },
    'combo.hint.media': { pt: 'Perfil: cidade de médio porte.', en: 'Profile: mid-size city.' },
    'combo.hint.interior': { pt: 'Perfil: interior / cidade menor.', en: 'Profile: smaller inland town.' },
    'combo.no-results': { pt: 'Nenhuma localidade encontrada.', en: 'No location found.' },
    'waitlist.pending': {
      pt: 'A lista de espera ainda não foi configurada — mas o resto do site (calculadora, planos, navegação) já funciona normalmente. Configure FORMSPREE_ACTION no script.js pra ativar.',
      en: 'The waitlist isn\'t configured yet — but the rest of the site (calculator, pricing, navigation) already works normally. Set FORMSPREE_ACTION in script.js to enable it.'
    }
  };

  function applyStaticText(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var text = el.getAttribute('data-' + lang);
      if (text !== null) el.textContent = text;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var html = el.getAttribute('data-' + lang + '-html');
      if (html !== null) el.innerHTML = html;
    });
    document.querySelectorAll('option[data-pt]').forEach(function (el) {
      var text = el.getAttribute('data-' + lang);
      if (text !== null) el.textContent = text;
    });
    document.querySelectorAll('[data-' + lang + '-placeholder]').forEach(function (el) {
      var ph = el.getAttribute('data-' + lang + '-placeholder');
      if (ph !== null) el.setAttribute('placeholder', ph);
    });
  }

  function updateLangButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var active = btn.dataset.lang === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    current = lang;
    document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
    applyStaticText(lang);
    updateLangButtons(lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignora */ }
    document.dispatchEvent(new CustomEvent('precifica:langchange', { detail: { lang: lang } }));
  }

  function t(key) {
    var entry = DICT[key];
    if (!entry) return key;
    return entry[current] || entry.pt || key;
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { setLang(btn.dataset.lang); });
    });
    setLang(current);
  });

  global.PrecificaI18N = {
    setLang: setLang,
    t: t,
    get lang() { return current; }
  };
})(window);
