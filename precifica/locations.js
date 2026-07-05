/*
 * Base de localidades do Precifica
 * -------------------------------------------------
 * Fonte: divisão político-administrativa oficial do Brasil
 * (26 estados + Distrito Federal, 5 regiões IBGE, capitais oficiais).
 *
 * IMPORTANTE — honestidade dos dados:
 * Hoje o Precifica NÃO possui uma base de salário real por estado/cidade
 * (isso exigiria dados pagos ou acesso direto a microdados RAIS/CAGED).
 * Por isso, cada localidade abaixo é classificada em um dos 3 perfis
 * regionais já usados no cálculo (capital, media, interior) — a mesma
 * simplificação ilustrativa usada no restante da calculadora, só que
 * agora com busca de verdade em vez de um <select> genérico.
 * Nada aqui é uma média salarial por localidade.
 */
(function (global) {
  'use strict';

  var REGIOES = {
    N: 'Norte', NE: 'Nordeste', CO: 'Centro-Oeste', SE: 'Sudeste', S: 'Sul'
  };

  // 26 estados + DF, com capital oficial e região do IBGE.
  var ESTADOS = [
    { uf: 'AC', nome: 'Acre', capital: 'Rio Branco', regiao: 'N' },
    { uf: 'AL', nome: 'Alagoas', capital: 'Maceió', regiao: 'NE' },
    { uf: 'AP', nome: 'Amapá', capital: 'Macapá', regiao: 'N' },
    { uf: 'AM', nome: 'Amazonas', capital: 'Manaus', regiao: 'N' },
    { uf: 'BA', nome: 'Bahia', capital: 'Salvador', regiao: 'NE' },
    { uf: 'CE', nome: 'Ceará', capital: 'Fortaleza', regiao: 'NE' },
    { uf: 'DF', nome: 'Distrito Federal', capital: 'Brasília', regiao: 'CO' },
    { uf: 'ES', nome: 'Espírito Santo', capital: 'Vitória', regiao: 'SE' },
    { uf: 'GO', nome: 'Goiás', capital: 'Goiânia', regiao: 'CO' },
    { uf: 'MA', nome: 'Maranhão', capital: 'São Luís', regiao: 'NE' },
    { uf: 'MT', nome: 'Mato Grosso', capital: 'Cuiabá', regiao: 'CO' },
    { uf: 'MS', nome: 'Mato Grosso do Sul', capital: 'Campo Grande', regiao: 'CO' },
    { uf: 'MG', nome: 'Minas Gerais', capital: 'Belo Horizonte', regiao: 'SE' },
    { uf: 'PA', nome: 'Pará', capital: 'Belém', regiao: 'N' },
    { uf: 'PB', nome: 'Paraíba', capital: 'João Pessoa', regiao: 'NE' },
    { uf: 'PR', nome: 'Paraná', capital: 'Curitiba', regiao: 'S' },
    { uf: 'PE', nome: 'Pernambuco', capital: 'Recife', regiao: 'NE' },
    { uf: 'PI', nome: 'Piauí', capital: 'Teresina', regiao: 'NE' },
    { uf: 'RJ', nome: 'Rio de Janeiro', capital: 'Rio de Janeiro', regiao: 'SE' },
    { uf: 'RN', nome: 'Rio Grande do Norte', capital: 'Natal', regiao: 'NE' },
    { uf: 'RS', nome: 'Rio Grande do Sul', capital: 'Porto Alegre', regiao: 'S' },
    { uf: 'RO', nome: 'Rondônia', capital: 'Porto Velho', regiao: 'N' },
    { uf: 'RR', nome: 'Roraima', capital: 'Boa Vista', regiao: 'N' },
    { uf: 'SC', nome: 'Santa Catarina', capital: 'Florianópolis', regiao: 'S' },
    { uf: 'SP', nome: 'São Paulo', capital: 'São Paulo', regiao: 'SE' },
    { uf: 'SE', nome: 'Sergipe', capital: 'Aracaju', regiao: 'NE' },
    { uf: 'TO', nome: 'Tocantins', capital: 'Palmas', regiao: 'N' }
  ];

  // Cidades grandes/metropolitanas não-capitais, curadas manualmente.
  // Não é uma lista completa dos 5.570 municípios — ver nota de honestidade acima.
  // tier 'capital' = grande região metropolitana; 'media' = cidade média de porte relevante.
  var CIDADES_EXTRA = [
    { nome: 'Campinas', uf: 'SP', tier: 'capital' },
    { nome: 'Guarulhos', uf: 'SP', tier: 'capital' },
    { nome: 'São Bernardo do Campo', uf: 'SP', tier: 'capital' },
    { nome: 'Santo André', uf: 'SP', tier: 'capital' },
    { nome: 'Osasco', uf: 'SP', tier: 'capital' },
    { nome: 'Niterói', uf: 'RJ', tier: 'capital' },
    { nome: 'Duque de Caxias', uf: 'RJ', tier: 'capital' },
    { nome: 'São Gonçalo', uf: 'RJ', tier: 'capital' },
    { nome: 'Contagem', uf: 'MG', tier: 'capital' },
    { nome: 'São José dos Campos', uf: 'SP', tier: 'media' },
    { nome: 'Sorocaba', uf: 'SP', tier: 'media' },
    { nome: 'Ribeirão Preto', uf: 'SP', tier: 'media' },
    { nome: 'São José do Rio Preto', uf: 'SP', tier: 'media' },
    { nome: 'Santos', uf: 'SP', tier: 'media' },
    { nome: 'Jundiaí', uf: 'SP', tier: 'media' },
    { nome: 'Piracicaba', uf: 'SP', tier: 'media' },
    { nome: 'Bauru', uf: 'SP', tier: 'media' },
    { nome: 'Uberlândia', uf: 'MG', tier: 'media' },
    { nome: 'Uberaba', uf: 'MG', tier: 'media' },
    { nome: 'Juiz de Fora', uf: 'MG', tier: 'media' },
    { nome: 'Governador Valadares', uf: 'MG', tier: 'interior' },
    { nome: 'Joinville', uf: 'SC', tier: 'media' },
    { nome: 'Blumenau', uf: 'SC', tier: 'media' },
    { nome: 'São José', uf: 'SC', tier: 'media' },
    { nome: 'Chapecó', uf: 'SC', tier: 'interior' },
    { nome: 'Londrina', uf: 'PR', tier: 'media' },
    { nome: 'Maringá', uf: 'PR', tier: 'media' },
    { nome: 'Ponta Grossa', uf: 'PR', tier: 'interior' },
    { nome: 'Cascavel', uf: 'PR', tier: 'interior' },
    { nome: 'Foz do Iguaçu', uf: 'PR', tier: 'interior' },
    { nome: 'Caxias do Sul', uf: 'RS', tier: 'media' },
    { nome: 'Pelotas', uf: 'RS', tier: 'interior' },
    { nome: 'Canoas', uf: 'RS', tier: 'capital' },
    { nome: 'Feira de Santana', uf: 'BA', tier: 'media' },
    { nome: 'Vitória da Conquista', uf: 'BA', tier: 'interior' },
    { nome: 'Ilhéus', uf: 'BA', tier: 'interior' },
    { nome: 'Caruaru', uf: 'PE', tier: 'interior' },
    { nome: 'Petrolina', uf: 'PE', tier: 'interior' },
    { nome: 'Juazeiro do Norte', uf: 'CE', tier: 'interior' },
    { nome: 'Anápolis', uf: 'GO', tier: 'interior' },
    { nome: 'Pato Branco', uf: 'PR', tier: 'interior' }
  ];

  function tierDaCapital(uf) {
    // Todas as capitais oficiais entram como perfil "capital / região metropolitana".
    return 'capital';
  }

  // Monta a lista final de localidades pesquisáveis.
  var LOCATIONS = [];

  LOCATIONS.push({
    id: 'brasil',
    label: 'Brasil (média nacional)',
    sub: 'Todos os estados',
    tier: 'media',
    aliases: ['brasil', 'nacional', 'brazil', 'br']
  });

  ESTADOS.forEach(function (e) {
    // Estado como um todo (não temos índice por estado — usamos o perfil médio)
    LOCATIONS.push({
      id: 'uf-' + e.uf.toLowerCase(),
      label: e.nome,
      sub: 'Estado · ' + REGIOES[e.regiao],
      tier: 'media',
      aliases: [e.uf.toLowerCase(), e.nome]
    });
    // Capital do estado
    LOCATIONS.push({
      id: 'cidade-' + e.capital.toLowerCase().replace(/\s+/g, '-'),
      label: e.capital + ' - ' + e.uf,
      sub: 'Capital · ' + e.nome,
      tier: tierDaCapital(e.uf),
      aliases: [e.capital, e.uf.toLowerCase()]
    });
  });

  CIDADES_EXTRA.forEach(function (c) {
    LOCATIONS.push({
      id: 'cidade-' + c.nome.toLowerCase().replace(/\s+/g, '-') + '-' + c.uf.toLowerCase(),
      label: c.nome + ' - ' + c.uf,
      sub: 'Cidade · ' + c.uf,
      tier: c.tier,
      aliases: [c.nome, c.uf.toLowerCase()]
    });
  });

  // ---------- normalização e busca fuzzy ----------
  function normalize(str) {
    return String(str || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove acentos
      .trim();
  }

  // Distância de Levenshtein simples, para tolerar erros leves de digitação.
  function levenshtein(a, b) {
    if (a === b) return 0;
    var al = a.length, bl = b.length;
    if (al === 0) return bl;
    if (bl === 0) return al;
    var prev = new Array(bl + 1);
    var curr = new Array(bl + 1);
    for (var j = 0; j <= bl; j++) prev[j] = j;
    for (var i = 1; i <= al; i++) {
      curr[0] = i;
      for (var k = 1; k <= bl; k++) {
        var cost = a[i - 1] === b[k - 1] ? 0 : 1;
        curr[k] = Math.min(prev[k] + 1, curr[k - 1] + 1, prev[k - 1] + cost);
      }
      var tmp = prev; prev = curr; curr = tmp;
    }
    return prev[bl];
  }

  function search(query, max) {
    max = max || 8;
    var q = normalize(query);
    if (!q) return [];
    var scored = [];
    for (var i = 0; i < LOCATIONS.length; i++) {
      var loc = LOCATIONS[i];
      var best = Infinity;
      for (var a = 0; a < loc.aliases.length; a++) {
        var alias = normalize(loc.aliases[a]);
        if (alias.indexOf(q) === 0) { best = Math.min(best, 0); continue; } // prefixo = melhor
        if (alias.indexOf(q) > -1) { best = Math.min(best, 1); continue; } // substring
        // fuzzy leve só pra termos de tamanho parecido (evita ruído)
        if (q.length >= 3 && Math.abs(alias.length - q.length) <= 3) {
          var dist = levenshtein(q, alias.slice(0, q.length + 2));
          if (dist <= 1) best = Math.min(best, 2 + dist);
        }
      }
      if (best < Infinity) scored.push({ loc: loc, score: best });
    }
    scored.sort(function (x, y) {
      if (x.score !== y.score) return x.score - y.score;
      return x.loc.label.length - y.loc.label.length;
    });
    return scored.slice(0, max).map(function (s) { return s.loc; });
  }

  global.PrecificaLocations = {
    all: LOCATIONS,
    search: search,
    normalize: normalize
  };
})(window);
