/* Survive Chaos Web — compact landscape setup shell */
(() => {
  'use strict';
  if (window.__SC_SETUP_SHELL__) return;
  window.__SC_SETUP_SHELL__ = true;

  let activeTab = window.__scSetupTab || 'run';
  const TAB_META = [
    ['run','⚔️','Partida'],
    ['world','🌎','Mundo'],
    ['players','👥','Jogadores'],
    ['advanced','🌀','Avançado']
  ];

  const keyOf = el => {
    if (!el) return 'run';
    if (el.id === 'scWebAdvancedModes') return 'advanced';
    if (el.classList && el.classList.contains('tog')) return 'run';
    const label = (el.querySelector && el.querySelector('.lbl')?.textContent || '').trim().toLowerCase();
    if (label.includes('jogador')) return 'players';
    if (label.includes('bioma') || label.includes('arma inicial')) return 'world';
    if (label.includes('modo de jogo') || label.includes('dificuldade')) return 'run';
    return 'run';
  };

  function activate(panel, tab) {
    if (!panel) return;
    if (!panel.querySelector(`.scSetupPane[data-pane="${tab}"]`)) tab = 'run';
    activeTab = tab;
    window.__scSetupTab = tab;
    panel.querySelectorAll('.scSetupTab').forEach(b => {
      const on = b.dataset.tab === tab;
      b.classList.toggle('on', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    panel.querySelectorAll('.scSetupPane').forEach(p => {
      p.classList.toggle('on', p.dataset.pane === tab);
    });
  }

  function arrangeSetup() {
    const setup = document.getElementById('setup');
    const panel = setup?.querySelector('.panel.setup');
    if (!setup || !panel || panel.dataset.scShell === '1') return;

    panel.dataset.scShell = '1';
    setup.classList.add('sc-shell-ready');
    panel.classList.add('scSetupShell');

    const title = panel.querySelector(':scope > h2');
    if (title) {
      title.classList.add('scSetupTitle');
      title.innerHTML = '<span>⚙️</span><b>Preparar partida</b><small>Monte a run sem sair desta tela</small>';
    }

    const children = [...panel.children].filter(el => el !== title);
    let actions = children.find(el => el.id === 'bk' || el.id === 'go' || el.querySelector?.('#bk,#go'));
    if (actions && (actions.id === 'bk' || actions.id === 'go')) actions = actions.parentElement;

    const tabs = document.createElement('div');
    tabs.id = 'scSetupTabs';
    tabs.setAttribute('role','tablist');
    tabs.innerHTML = TAB_META.map(([id,ic,name]) =>
      `<button type="button" class="scSetupTab" data-tab="${id}" role="tab"><span>${ic}</span><b>${name}</b></button>`
    ).join('');

    const stage = document.createElement('div');
    stage.id = 'scSetupStage';
    const panes = {};
    for (const [id] of TAB_META) {
      const p = document.createElement('div');
      p.className = 'scSetupPane';
      p.dataset.pane = id;
      p.setAttribute('role','tabpanel');
      panes[id] = p;
      stage.appendChild(p);
    }

    for (const el of children) {
      if (!el || el === actions || el.id === 'scSetupTabs' || el.id === 'scSetupStage') continue;
      panes[keyOf(el)].appendChild(el);
    }

    if (title) title.after(tabs);
    else panel.prepend(tabs);
    tabs.after(stage);

    if (actions) {
      actions.classList.add('scSetupActions');
      panel.appendChild(actions);
    }

    tabs.addEventListener('click', e => {
      const b = e.target.closest('.scSetupTab');
      if (!b) return;
      try { sfx('ui'); } catch (_) {}
      activate(panel, b.dataset.tab);
    });

    activate(panel, activeTab);
  }

  if (typeof setupUI === 'function') {
    const originalSetup = setupUI;
    setupUI = function() {
      const out = originalSetup.apply(this, arguments);
      arrangeSetup();
      return out;
    };
  }

  const observer = new MutationObserver(() => {
    if (document.getElementById('setup')?.classList.contains('on')) arrangeSetup();
  });
  const setupRoot = document.getElementById('setup');
  if (setupRoot) observer.observe(setupRoot, { childList:true, subtree:false });

  arrangeSetup();
})();