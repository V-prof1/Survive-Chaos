// Survive Chaos Beta 0.2 — sprint, stamina e perigo de proximidade
(() => {
  const B02 = { drain: 24, regen: 18, regenDelay: .7, dashCost: 25, sprintMul: 1.45 };
  const byId = id => document.getElementById(id);

  if (!document.querySelector('link[href="beta02.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'beta02.css';
    document.head.appendChild(link);
  }
  const hud = byId('hud');
  if (hud && !byId('stam')) {
    hud.insertAdjacentHTML('beforeend', '<div id="stam"><span>STAMINA</span><div><b id="stf"></b></div></div><div id="stam2"><span>P2 STAMINA</span><div><b id="stf2"></b></div></div><button id="run"><b>🏃</b><small>RUN</small></button><button id="run1"><b>🏃</b><small>RUN</small></button>');
  }

  const initStam = q => {
    if (!q) return;
    if (q.stam == null) q.stam = 100;
    if (!q.stamM) q.stamM = 100;
    if (q.stR == null) q.stR = 0;
    if (q.spr == null) q.spr = 0;
  };

  if (typeof start === 'function') {
    const baseStart = start;
    start = function () {
      const r = baseStart.apply(this, arguments);
      if (typeof PL !== 'undefined') PL.forEach(initStam);
      return r;
    };
  }

  if (typeof upd === 'function') {
    const baseUpd = upd;
    upd = function (dt) {
      const restores = [];
      if (typeof PL !== 'undefined' && typeof st !== 'undefined' && st === 'play') {
        for (const q of PL) {
          if (!q || q.dead) continue;
          initStam(q);
          q.stR = Math.max(0, q.stR - dt);
          let moving = true;
          try {
            if (typeof withP === 'function' && typeof PIN === 'function') {
              let inp;
              withP(q, () => { inp = PIN(); });
              moving = !!inp && Math.hypot(inp.mx || 0, inp.my || 0) > .1;
            }
          } catch (_) {}
          if (q.spr && moving && q.dT <= 0) {
            if (q.stam > 0) {
              q.stam = Math.max(0, q.stam - B02.drain * dt);
              q.stR = B02.regenDelay;
              const original = q.sp;
              q.sp = original * B02.sprintMul;
              restores.push([q, original]);
            } else q.spr = 0;
          } else if (q.stR <= 0) {
            q.stam = Math.min(q.stamM, q.stam + B02.regen * dt);
          }
        }
      }
      const r = baseUpd.apply(this, arguments);
      for (const [q, speed] of restores) q.sp = speed;
      return r;
    };
  }

  if (typeof dash === 'function') {
    const baseDash = dash;
    dash = function () {
      if (typeof P === 'undefined' || !P) return;
      initStam(P);
      if (typeof st !== 'undefined' && st === 'play' && !P.dead && P.dc <= 0) {
        if (P.stam < B02.dashCost) return;
        P.stam = Math.max(0, P.stam - B02.dashCost);
        P.stR = .85;
      }
      return baseDash.apply(this, arguments);
    };
  }

  function setSprintFor(q, on) {
    if (!q) return;
    initStam(q);
    q.spr = (on && typeof st !== 'undefined' && st === 'play' && !q.dead && q.stam > 0) ? 1 : 0;
  }

  function mainTouchPlayer() {
    if (typeof PL === 'undefined' || !PL.length) return null;
    if (typeof CO !== 'undefined' && CO.on && CO.tr >= 0) return PL[CO.tr];
    return PL[0];
  }

  function leftTouchPlayer() {
    if (typeof PL === 'undefined' || !PL.length || typeof CO === 'undefined' || !CO.on || CO.tl < 0) return null;
    return PL[CO.tl];
  }

  const run = byId('run'), run1 = byId('run1');
  let runPointer = -1, run1Pointer = -1;
  if (run) {
    run.addEventListener('pointerdown', e => {
      e.preventDefault(); e.stopPropagation();
      runPointer = e.pointerId; run.classList.add('on'); setSprintFor(mainTouchPlayer(), true);
    });
  }
  if (run1) {
    run1.addEventListener('pointerdown', e => {
      e.preventDefault(); e.stopPropagation();
      run1Pointer = e.pointerId; run1.classList.add('on'); setSprintFor(leftTouchPlayer(), true);
    });
  }
  const releaseRun = e => {
    if (e.pointerId === runPointer) { runPointer = -1; run?.classList.remove('on'); setSprintFor(mainTouchPlayer(), false); }
    if (e.pointerId === run1Pointer) { run1Pointer = -1; run1?.classList.remove('on'); setSprintFor(leftTouchPlayer(), false); }
  };
  addEventListener('pointerup', releaseRun);
  addEventListener('pointercancel', releaseRun);

  addEventListener('keydown', e => {
    if (e.code !== 'ShiftLeft' && e.code !== 'ShiftRight' && e.code !== 'ControlRight') return;
    if (typeof st === 'undefined' || st !== 'play') return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if (typeof CO !== 'undefined' && CO.on) {
      if (e.code === 'ControlRight') {
        const i = CO.sch ? CO.sch.findIndex(v => v === 2) : -1;
        if (i >= 0) setSprintFor(PL[i], true);
      } else {
        const i = CO.sch ? CO.sch.findIndex(v => v === 1) : -1;
        if (i >= 0) setSprintFor(PL[i], true);
      }
    } else if (e.code !== 'ControlRight') setSprintFor(PL && PL[0], true);
  }, true);

  addEventListener('keyup', e => {
    if (e.code !== 'ShiftLeft' && e.code !== 'ShiftRight' && e.code !== 'ControlRight') return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if (typeof PL === 'undefined') return;
    if (typeof CO !== 'undefined' && CO.on) {
      if (e.code === 'ControlRight') {
        const i = CO.sch ? CO.sch.findIndex(v => v === 2) : -1;
        if (i >= 0) setSprintFor(PL[i], false);
      } else {
        const i = CO.sch ? CO.sch.findIndex(v => v === 1) : -1;
        if (i >= 0) setSprintFor(PL[i], false);
      }
    } else if (e.code !== 'ControlRight') setSprintFor(PL[0], false);
  }, true);

  addEventListener('blur', () => {
    try { if (typeof PL !== 'undefined') PL.forEach(q => { if (q) q.spr = 0; }); } catch (_) {}
    run?.classList.remove('on'); run1?.classList.remove('on');
  });

  if (typeof setBtn === 'function') {
    const baseSetBtn = setBtn;
    setBtn = function () {
      const r = baseSetBtn.apply(this, arguments);
      if (run) run.style.display = (typeof CO !== 'undefined' && CO.on && CO.tr < 0) ? 'none' : 'flex';
      if (run1) run1.style.display = (typeof CO !== 'undefined' && CO.on && CO.tl >= 0) ? 'flex' : 'none';
      return r;
    };
  }

  let danger = byId('betaDanger');
  if (!danger) {
    danger = document.createElement('div'); danger.id = 'betaDanger'; document.body.appendChild(danger);
  }
  const stf = byId('stf'), stf2 = byId('stf2'), stam = byId('stam'), stam2 = byId('stam2');

  function hudLoop() {
    try {
      if (typeof PL !== 'undefined' && PL.length) {
        const q = mainTouchPlayer() || PL[0];
        if (q) {
          initStam(q);
          if (stf) stf.style.width = (100 * q.stam / q.stamM) + '%';
          stam?.classList.toggle('low', q.stam < 30);
        }
        const q2 = (typeof CO !== 'undefined' && CO.on && CO.tl >= 0) ? PL[CO.tl] : null;
        if (stam2) stam2.style.display = q2 ? 'block' : 'none';
        if (q2) {
          initStam(q2);
          if (stf2) stf2.style.width = (100 * q2.stam / q2.stamM) + '%';
          stam2?.classList.toggle('low', q2.stam < 30);
        }
        let nearest = Infinity, threat = null;
        if (typeof E !== 'undefined' && q && typeof st !== 'undefined' && st === 'play') {
          for (const en of E) if (en && !en.dead && (en.boss || en.el || en.dv)) {
            const d = Math.hypot(q.x - en.x, q.y - en.y);
            if (d < nearest) { nearest = d; threat = en; }
          }
        }
        if (threat && nearest < 220) {
          const k = 1 - nearest / 220;
          danger.style.opacity = String(Math.min(.78, .08 + k * .62));
          danger.classList.toggle('dev', !!threat.dv);
        } else danger.style.opacity = '0';
      } else danger.style.opacity = '0';
    } catch (_) { danger.style.opacity = '0'; }
    requestAnimationFrame(hudLoop);
  }
  requestAnimationFrame(hudLoop);
})();
