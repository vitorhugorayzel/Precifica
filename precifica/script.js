
  // =====================================================================
  // CONFIGURAÇÃO DO SITE — tudo que precisa ser preenchido antes do ar
  // fica reunido aqui. Edite só esses valores; o resto do arquivo não
  // precisa ser mexido.
  // =====================================================================
  const CONFIG = {
    // Formulário de lista de espera (formspree.io) — crie um formulário
    // grátis lá e cole o link completo abaixo (formato: https://formspree.io/f/xxxxxxx)
    FORMSPREE_ACTION: 'https://formspree.io/f/xqevwbdy',

    // E-mail de contato exibido no rodapé, nos Termos e na Privacidade
    CONTACT_EMAIL: 'Guiscavalli@gmail.com',

    // Domínio do site, usado no texto copiado pela calculadora
    SITE_DOMAIN: 'precifica.htmly.com.br'
  };

  function configPendente(valor){
    return !valor || valor.indexOf('COLE_SUA') === 0 || valor.indexOf('SEU_ID_AQUI') !== -1;
  }

  // Aplica o e-mail de contato em todos os lugares que o usam (data-contact-email)
  document.querySelectorAll('[data-contact-email]').forEach(el => {
    el.textContent = CONFIG.CONTACT_EMAIL;
    if (el.tagName === 'A') el.href = 'mailto:' + CONFIG.CONTACT_EMAIL;
  });

  // Aplica o link do Formspree no formulário de lista de espera
  const waitlistFormEl = document.getElementById('waitlistForm');
  if (waitlistFormEl) waitlistFormEl.action = CONFIG.FORMSPREE_ACTION;
  // =====================================================================

  const categoria = document.getElementById('categoria');
  const categoriaEmpresa = document.getElementById('categoriaEmpresa');
  const nivel = document.getElementById('nivel');
  const regiao = document.getElementById('regiao');
  const horaEl = document.getElementById('hora');
  const faixaEl = document.getElementById('faixa');
  const labelResultado1 = document.getElementById('labelResultado1');
  const labelResultado2 = document.getElementById('labelResultado2');
  const calcHint = document.getElementById('calcHint');
  const fieldFreelancer = document.getElementById('fieldFreelancer');
  const fieldEmpresa = document.getElementById('fieldEmpresa');

  let calcMode = 'empresa';
  let currentPlan = 'free';

  const dicasNegociacao = {
    design: { pt: 'Mostre referências do seu portfólio e o tempo real do projeto — inclua revisões no escopo.', en: 'Show references from your portfolio and the real project timeline — include revisions in scope.' },
    dev: { pt: 'Justifique pelo impacto técnico da entrega, não só pelas horas — sistemas complexos valem mais.', en: 'Justify by the technical impact of the delivery, not just hours — complex systems are worth more.' },
    aulas: { pt: 'Destaque resultados de alunos anteriores e a personalização do método de ensino.', en: 'Highlight past students\' results and how personalized your teaching method is.' },
    beleza: { pt: 'Reforce a qualidade dos produtos usados e a experiência do atendimento, não só a técnica.', en: 'Emphasize the quality of the products used and the service experience, not just the technique.' },
    reforma: { pt: 'Detalhe material + mão de obra separadamente — fica mais fácil o cliente entender o valor.', en: 'Break down materials and labor separately — it makes it easier for clients to understand the value.' },
    diarista: { pt: 'Cobre por período fechado (diária) em vez de hora, e seja clara sobre o que está incluso.', en: 'Charge a fixed day rate instead of hourly, and be clear about what\'s included.' },
    personal: { pt: 'Venda o acompanhamento e os resultados, não só o horário de treino.', en: 'Sell the ongoing coaching and results, not just the training slot.' },
    marketing: { pt: 'Amarre o preço a métricas de resultado (alcance, conversão), não só a horas de trabalho.', en: 'Tie your price to result metrics (reach, conversion), not just hours worked.' },
    dev_empresa: { pt: 'Compare com o salário médio de mercado para reter o profissional — turnover técnico custa caro pra recontratar e retreinar.', en: 'Compare with the average market salary to retain the professional — technical turnover is expensive to rehire and retrain for.' },
    design_empresa: { pt: 'Considere benefícios além do salário — eles pesam na decisão de aceitar a proposta.', en: 'Consider benefits beyond salary — they weigh heavily on the decision to accept an offer.' },
    dados_empresa: { pt: 'Cargo escasso no mercado — pagar abaixo da faixa costuma significar vaga aberta por meses.', en: 'A scarce role in the market — paying below range usually means the position stays open for months.' },
    marketing_empresa: { pt: 'Avalie o histórico de resultados do candidato antes de fechar abaixo da média de mercado.', en: 'Evaluate the candidate\'s track record before closing below the market average.' },
    social_empresa: { pt: 'Considere fechar com freelancer ou PJ pra funções de conteúdo — reduz o custo fixo do cargo.', en: 'Consider hiring a freelancer or contractor for content roles — it reduces the fixed cost of the position.' },
    vendas_empresa: { pt: 'Salário fixo + comissão bem definida evita disputas e melhora a retenção do time.', en: 'A fixed salary plus a well-defined commission avoids disputes and improves team retention.' },
    cs_empresa: { pt: 'Bônus atrelado a retenção de cliente costuma reter melhor do que salário fixo mais alto.', en: 'A bonus tied to customer retention usually retains talent better than a higher fixed salary.' },
    admin_empresa: { pt: 'Cargos administrativos têm baixa variação regional — atenção pra não subvalorizar.', en: 'Administrative roles have low regional variation — be careful not to undervalue them.' },
    financeiro_empresa: { pt: 'Considere certificações (CFC, CFA) como diferencial de faixa, não só tempo de experiência.', en: 'Consider certifications (CFC, CFA) as a range differentiator, not just years of experience.' },
    contabil_empresa: { pt: 'Muitas PMEs terceirizam esse cargo — compare o custo de contratar com o de um escritório contábil.', en: 'Many small businesses outsource this role — compare the cost of hiring versus an accounting firm.' },
    rh_empresa: { pt: 'Quem recruta bem se paga sozinho — avalie o impacto em tempo de contratação, não só o salário.', en: 'A good recruiter pays for themselves — evaluate the impact on time-to-hire, not just salary.' },
    projetos_empresa: { pt: 'Cargos de gestão pesam mais a faixa por complexidade do time do que por tempo de casa.', en: 'Management roles weigh team complexity more heavily in the range than tenure.' },
    juridico_empresa: { pt: 'Avalie se compensa CLT versus consultoria jurídica pontual, dependendo do volume de demanda.', en: 'Evaluate whether a full-time hire pays off versus occasional legal consulting, depending on demand volume.' },
    operacoes_empresa: { pt: 'Cargo com alta variação entre setores — compare com empresas do mesmo segmento, não só da região.', en: 'A role with high variation across sectors — compare with companies in the same segment, not just region.' },
    suporte_empresa: { pt: 'Turnover é alto nessa função — pagar abaixo do mercado costuma sair mais caro no fim.', en: 'Turnover is high in this role — paying below market usually costs more in the end.' },
    logistica_empresa: { pt: 'Considere adicionais de risco/deslocamento — eles mudam bastante a faixa final.', en: 'Consider risk/travel allowances — they change the final range significantly.' }
  };

  function formatBRL(v){
    return 'R$ ' + v.toLocaleString('pt-BR', {maximumFractionDigits:0});
  }

  function calcular(){
    let base, mNivel, mRegiao, estimado, min, max, tipKey, catLabel;

    if (calcMode === 'freelancer') {
      base = parseFloat(categoria.selectedOptions[0].dataset.base);
      catLabel = categoria.selectedOptions[0].text;
      tipKey = categoria.value;
    } else {
      base = parseFloat(categoriaEmpresa.selectedOptions[0].dataset.base);
      catLabel = categoriaEmpresa.selectedOptions[0].text;
      tipKey = categoriaEmpresa.value + '_empresa';
    }

    mNivel = parseFloat(nivel.value);
    mRegiao = parseFloat(regiao.value);
    estimado = base * mNivel * mRegiao;
    min = estimado * (calcMode === 'freelancer' ? 0.85 : 0.9);
    max = estimado * (calcMode === 'freelancer' ? 1.25 : 1.15);

    const i18n = window.PrecificaI18N;
    if (calcMode === 'freelancer') {
      horaEl.textContent = formatBRL(estimado) + (i18n && i18n.lang === 'en' ? ' / hour' : ' / hora');
      labelResultado1.textContent = i18n ? i18n.t('result.freelancer.label1') : 'Preço/hora estimado';
      labelResultado2.textContent = i18n ? i18n.t('result.freelancer.label2') : 'Faixa recomendada';
      calcHint.textContent = i18n ? i18n.t('calc.hint.freelancer') : 'Estimativa ilustrativa baseada em faixas médias de mercado por categoria, experiência e região. No produto real, esse valor vem de dados coletados com a comunidade de prestadores.';
    } else {
      horaEl.textContent = formatBRL(estimado) + (i18n && i18n.lang === 'en' ? ' / month' : ' / mês');
      labelResultado1.textContent = i18n ? i18n.t('result.empresa.label1') : 'Salário mensal estimado';
      labelResultado2.textContent = i18n ? i18n.t('result.empresa.label2') : 'Faixa salarial recomendada';
      calcHint.textContent = i18n ? i18n.t('calc.hint.empresa') : 'Estimativa ilustrativa baseada em faixas médias de mercado por cargo, senioridade e região. No produto real, esse valor vem de dados coletados com empresas e vagas reais.';
    }
    faixaEl.textContent = formatBRL(min) + ' – ' + formatBRL(max);

    // Bloco Premium (só populado/mostrado quando o plano é premium)
    document.getElementById('pBase').textContent = formatBRL(base) + (calcMode === 'freelancer' ? (i18n && i18n.lang === 'en' ? '/hour' : '/hora') : (i18n && i18n.lang === 'en' ? '/month' : '/mês'));
    document.getElementById('pNivel').textContent = (mNivel >= 1 ? '+' : '') + Math.round((mNivel - 1) * 100) + '%';
    document.getElementById('pRegiao').textContent = (mRegiao >= 1 ? '+' : '') + Math.round((mRegiao - 1) * 100) + '%';
    const dicaPadrao = i18n
      ? (i18n.lang === 'en'
          ? (calcMode === 'freelancer' ? i18n.t('premium.tip.freelancer') : i18n.t('premium.tip.empresa'))
          : 'Use os dados de mercado para justificar o valor com segurança.')
      : 'Use os dados de mercado para justificar o valor com segurança.';
    const dicaEntry = dicasNegociacao[tipKey];
    const dicaEscolhida = dicaEntry ? (dicaEntry[i18n ? i18n.lang : 'pt'] || dicaEntry.pt) : dicaPadrao;
    document.getElementById('premiumTip').textContent = '💡 ' + dicaEscolhida;
  }

  [categoria, categoriaEmpresa, nivel, regiao].forEach(el => el.addEventListener('change', calcular));
  calcular();
  document.addEventListener('precifica:langchange', calcular);

  // ---------- Combobox de região (busca inteligente de cidade/estado) ----------
  (function () {
    const input = document.getElementById('regiaoBusca');
    const list = document.getElementById('regiaoLista');
    const hint = document.getElementById('regiaoHint');
    if (!input || !list || !window.PrecificaLocations) return;

    const TIER_TO_MULT = { capital: '1.2', media: '1', interior: '0.85' };
    const TIER_LABEL = {
      capital: { pt: 'Perfil: capital / região metropolitana', en: 'Profile: capital / metro area' },
      media: { pt: 'Perfil: cidade de médio porte', en: 'Profile: mid-size city' },
      interior: { pt: 'Perfil: interior / cidade pequena', en: 'Profile: smaller inland town' }
    };

    let results = [];
    let activeIndex = -1;
    let debounceTimer = null;
    let lastTier = null;

    function renderList() {
      list.innerHTML = '';
      if (!results.length) { list.hidden = true; input.removeAttribute('aria-activedescendant'); return; }
      results.forEach((loc, i) => {
        const li = document.createElement('li');
        li.setAttribute('role', 'option');
        li.id = 'regiao-opt-' + i;
        li.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false');
        li.className = 'combo-item' + (i === activeIndex ? ' active' : '');
        li.innerHTML = '<span class="ci-label"></span><span class="ci-sub"></span>';
        li.querySelector('.ci-label').textContent = loc.label;
        li.querySelector('.ci-sub').textContent = loc.sub;
        li.addEventListener('mousedown', (e) => { e.preventDefault(); selectLocation(loc); });
        list.appendChild(li);
      });
      list.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      if (activeIndex >= 0) {
        input.setAttribute('aria-activedescendant', 'regiao-opt-' + activeIndex);
      } else {
        input.removeAttribute('aria-activedescendant');
      }
    }

    function closeList() {
      list.hidden = true;
      activeIndex = -1;
      input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
    }

    function renderTierHint(tier) {
      const lang = window.PrecificaI18N ? window.PrecificaI18N.lang : 'pt';
      const tierLabel = (TIER_LABEL[tier] && TIER_LABEL[tier][lang]) || TIER_LABEL[tier].pt;
      const suffix = lang === 'en'
        ? ' — simplified comparison across 3 regional profiles (not a specific average for this location).'
        : ' — comparação simplificada em 3 perfis regionais (não é uma média específica dessa localidade).';
      hint.textContent = tierLabel + suffix;
    }

    function selectLocation(loc) {
      input.value = loc.label;
      regiao.value = TIER_TO_MULT[loc.tier] || '1';
      lastTier = loc.tier;
      renderTierHint(loc.tier);
      closeList();
      calcular();
    }

    document.addEventListener('precifica:langchange', () => {
      if (lastTier) renderTierHint(lastTier);
    });

    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      const q = input.value;
      debounceTimer = setTimeout(() => {
        results = q.trim() ? window.PrecificaLocations.search(q, 8) : [];
        activeIndex = -1;
        renderList();
      }, 150);
    });

    input.addEventListener('keydown', (e) => {
      if (list.hidden && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        results = window.PrecificaLocations.search(input.value, 8);
        renderList();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, results.length - 1);
        renderList();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        renderList();
      } else if (e.key === 'Enter') {
        if (activeIndex >= 0 && results[activeIndex]) {
          e.preventDefault();
          selectLocation(results[activeIndex]);
        }
      } else if (e.key === 'Escape') {
        closeList();
      }
    });

    input.addEventListener('blur', () => {
      // pequeno delay pra permitir o mousedown do item registrar antes de fechar
      setTimeout(closeList, 120);
    });
  })();

  // Modelo de trabalho: campo informativo (ainda não altera o cálculo)
  const modeloTrabalhoEl = document.getElementById('modeloTrabalho');
  if (modeloTrabalhoEl) modeloTrabalhoEl.addEventListener('change', calcular);

  // Copiar resultado da calculadora
  const copyBtn = document.getElementById('copyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const lang = window.PrecificaI18N ? window.PrecificaI18N.lang : 'pt';
      const catLabel = calcMode === 'freelancer'
        ? categoria.selectedOptions[0].text
        : categoriaEmpresa.selectedOptions[0].text;
      const calculadoEm = lang === 'en' ? 'Calculated at' : 'Calculado em';
      const texto = `Precifica — ${catLabel}\n${labelResultado1.textContent}: ${horaEl.textContent}\n${labelResultado2.textContent}: ${faixaEl.textContent}\n${calculadoEm} ${CONFIG.SITE_DOMAIN}`;
      try {
        await navigator.clipboard.writeText(texto);
        copyBtn.textContent = lang === 'en' ? '✓ Copied!' : '✓ Copiado!';
        copyBtn.classList.add('copied');
      } catch (err) {
        copyBtn.textContent = lang === 'en' ? 'Could not copy' : 'Não foi possível copiar';
      }
      setTimeout(() => {
        copyBtn.textContent = lang === 'en' ? '📋 Copy result' : '📋 Copiar resultado';
        copyBtn.classList.remove('copied');
      }, 2200);
    });
  }

  // Alternar modo Prestador / Empresa
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calcMode = btn.dataset.mode;
      fieldFreelancer.style.display = calcMode === 'freelancer' ? 'block' : 'none';
      fieldEmpresa.style.display = calcMode === 'empresa' ? 'block' : 'none';
      const labelNivel = document.getElementById('labelNivel');
      if (labelNivel) labelNivel.textContent = calcMode === 'freelancer' ? 'Nível de experiência' : 'Senioridade';
      calcular();
    });
  });

  // Aplica visualmente o plano atual (free x premium) na calculadora
  function aplicarPlano(){
    const premiumBlock = document.getElementById('premiumBlock');
    const premiumLocked = document.getElementById('premiumLocked');
    if (currentPlan === 'premium') {
      premiumBlock.style.display = 'block';
      premiumLocked.style.display = 'none';
    } else {
      premiumBlock.style.display = 'none';
      premiumLocked.style.display = 'block';
    }
  }
  aplicarPlano();

  // Barra de progresso de scroll
  const progressBar = document.getElementById('progressBar');
  function updateProgress(){
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const height = h.scrollHeight - h.clientHeight;
    progressBar.style.width = (height > 0 ? (scrolled / height) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', updateProgress);
  updateProgress();

  // Animação de entrada das seções
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // Contadores animados (estatísticas com efeito de contagem ao entrar na tela)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function formatCount(value, decimals){
    return decimals > 0
      ? value.toLocaleString('pt-BR', {minimumFractionDigits:decimals, maximumFractionDigits:decimals})
      : Math.round(value).toLocaleString('pt-BR');
  }
  function animateCount(el){
    const target = parseFloat(el.dataset.countTo);
    if (isNaN(target)) return;
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    if (prefersReducedMotion) {
      el.textContent = prefix + formatCount(target, decimals) + suffix;
      return;
    }
    const duration = 1400;
    const start = performance.now();
    function tick(now){
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      el.textContent = prefix + formatCount(target * eased, decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const countEls = document.querySelectorAll('[data-count-to]');
  if (countEls.length) {
    const countIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    countEls.forEach(el => countIo.observe(el));
  }

  // Link ativo no menu conforme a seção visível
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href')));
  function updateActiveNav(){
    let current = sections[0];
    sections.forEach(sec => {
      if (sec && sec.getBoundingClientRect().top - 120 <= 0) current = sec;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', current && a.getAttribute('href') === '#' + current.id);
    });
  }
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // Menu mobile (hambúrguer)
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  function openMobileMenu(){
    mobileMenu.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
    if (closeMenuBtn) closeMenuBtn.focus();
  }
  function closeMobileMenu(){
    mobileMenu.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
    hamburgerBtn.focus();
  }
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', openMobileMenu);
    closeMenuBtn.addEventListener('click', closeMobileMenu);
    document.querySelectorAll('[data-mnav]').forEach(a => {
      a.addEventListener('click', closeMobileMenu);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMobileMenu();
    });
  }

  // Toggle de planos Free / Premium — muda de verdade o que aparece na calculadora
  const plansToggle = document.getElementById('plansToggle');
  if (plansToggle) {
    plansToggle.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        plansToggle.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const plan = btn.dataset.plan;
        currentPlan = plan;
        document.querySelectorAll('.plan-card').forEach(card => {
          card.classList.toggle('active-plan', card.dataset.planCard === plan);
        });
        aplicarPlano();
      });
    });
  }

  // Teste de disposição a pagar — sinal vai junto com o e-mail da lista de espera
  document.querySelectorAll('.price-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.price-btn').forEach(b => b.classList.remove('chosen'));
      btn.classList.add('chosen');
      const sinalInput = document.getElementById('sinalPreco');
      if (sinalInput) sinalInput.value = btn.dataset.sinal === 'sim' ? 'Pagaria pelo plano Empresa' : 'Não pagaria pelo plano Empresa';
      const perfilSelect = document.querySelector('#waitlistForm [name="perfil"]');
      if (perfilSelect) perfilSelect.value = 'Empresa / RH';
      document.getElementById('lista').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  // Lista de espera (envia para o Formspree sem sair da página)
  const waitlistForm = document.getElementById('waitlistForm');
  const waitlistOk = document.getElementById('waitlistOk');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // honeypot anti-spam: se o campo invisível foi preenchido, é bot — finge sucesso e não envia
      const honeypot = waitlistForm.querySelector('[name="_gotcha"]');
      if (honeypot && honeypot.value) {
        waitlistForm.style.display = 'none';
        waitlistOk.style.display = 'block';
        return;
      }

      if (configPendente(CONFIG.FORMSPREE_ACTION)) {
        const lang = window.PrecificaI18N ? window.PrecificaI18N.lang : 'pt';
        alert(lang === 'en'
          ? 'The form hasn\'t been connected to Formspree yet — see LEIA-ME.txt or the top of script.js.'
          : 'O formulário ainda não foi conectado a um Formspree — veja o LEIA-ME.txt ou o topo do script.js.');
        return;
      }

      const btn = waitlistForm.querySelector('button');
      const originalText = btn.textContent;
      const lang = window.PrecificaI18N ? window.PrecificaI18N.lang : 'pt';
      btn.textContent = lang === 'en' ? 'Sending...' : 'Enviando...';
      btn.disabled = true;
      try {
        const res = await fetch(waitlistForm.action, {
          method: 'POST',
          body: new FormData(waitlistForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          waitlistForm.style.display = 'none';
          waitlistOk.style.display = 'block';
        } else {
          throw new Error('Falha no envio');
        }
      } catch (err) {
        btn.textContent = originalText;
        btn.disabled = false;
        alert(lang === 'en'
          ? 'Could not send right now. Please try again shortly.'
          : 'Não foi possível enviar agora. Tente novamente em instantes.');
      }
    });
  }

  // Modais de Termos de Uso / Privacidade
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalBox = modalOverlay ? modalOverlay.querySelector('.modal-box') : null;
  let modalTriggerEl = null;

  function focusableIn(el){
    return Array.from(el.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'))
      .filter(node => node.offsetParent !== null);
  }

  function abrirModal(nome, trigger){
    document.querySelectorAll('.modal-panel').forEach(p => p.style.display = 'none');
    const alvo = document.getElementById('modal-' + nome);
    if (alvo) alvo.style.display = 'block';
    if (modalBox) modalBox.setAttribute('aria-labelledby', nome === 'privacidade' ? 'privacyTitle' : 'termosTitle');
    modalOverlay.classList.add('open');
    document.body.classList.add('no-scroll');
    modalTriggerEl = trigger || document.activeElement;
    if (modalClose) modalClose.focus();
  }
  function fecharModal(){
    modalOverlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
    if (modalTriggerEl) modalTriggerEl.focus();
  }
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => abrirModal(btn.dataset.modal, btn));
  });
  if (modalClose) modalClose.addEventListener('click', fecharModal);
  if (modalOverlay) modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) fecharModal();
  });
  document.addEventListener('keydown', (e) => {
    if (!modalOverlay || !modalOverlay.classList.contains('open')) return;
    if (e.key === 'Escape') { fecharModal(); return; }
    if (e.key === 'Tab' && modalBox) {
      const focusables = focusableIn(modalBox);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });
