:root{
  /* Palette officielle MLPB */
  --ml-vert:#95c11f;
  --ml-orange:#f39200;
  --ml-bleu:#2897d5;
  --ml-rose:#d60b52;
  --ml-violet:#a3195b;
  --ml-brique:#9f3d3f;
  --ml-noir:#171718;
  --ml-blanc:#ffffff;

  --bg: var(--ml-blanc);
  --text: var(--ml-noir);
  --muted: rgba(23,23,24,.70);
  --border: rgba(23,23,24,.12);

  --radius: 16px;
  --shadow: 0 12px 28px rgba(23,23,24,.10);

  /* Typos (Politica/Akrobat fallback if not installed) */
  --font-title: "Politica","Muli",Arial,sans-serif;
  --font-body: "Muli",Arial,sans-serif;
  --font-ui: "Akrobat","Muli",Arial,sans-serif;
}

*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  font-family:var(--font-body);
  color:var(--text);
  background:var(--bg);
}

a{color:inherit;text-decoration:none}
a:hover{text-decoration:underline}

.skip-link{
  position:absolute;left:-999px;top:auto;width:1px;height:1px;overflow:hidden;
}
.skip-link:focus{left:16px;top:16px;width:auto;height:auto;background:var(--ml-orange);padding:10px 12px;border-radius:10px}

.container{max-width:1100px;margin:0 auto;padding:22px}
.h1,.h2{font-family:var(--font-title);margin:0 0 10px}
.h1{font-size:28px;line-height:1.15}
.h2{font-size:18px;line-height:1.2}
.lead{font-size:16px;line-height:1.45;margin:0 0 16px}
.muted{color:var(--muted);margin:0}

.header{
  position:sticky;top:0;z-index:10;
  background:var(--ml-blanc);
  border-bottom:1px solid var(--border);
}
.header__inner{
  max-width:1100px;margin:0 auto;padding:14px 22px;
  display:flex;gap:16px;align-items:center;justify-content:space-between;
}
.brand{display:flex;gap:12px;align-items:center}
.brand__logo{
  width:40px;height:40px;border-radius:14px;
  display:grid;place-items:center;
  background:linear-gradient(135deg,var(--ml-bleu),var(--ml-violet));
  color:var(--ml-blanc);
}
.brand__kicker{font-size:12px;color:var(--muted)}
.brand__title{font-family:var(--font-title);font-size:16px}

.nav{display:flex;gap:14px;flex-wrap:wrap}
.nav__link{
  font-size:13px;
  padding:8px 10px;border-radius:10px;
  border:1px solid transparent;
}
.nav__link:hover{border-color:var(--border);text-decoration:none}
.nav__link.is-active{
  border-color:var(--ml-bleu);
  background:rgba(40,151,213,.08);
}

.btn{
  font-family:var(--font-ui);
  font-weight:700;
  border:1px solid var(--border);
  background:var(--ml-blanc);
  padding:10px 12px;border-radius:12px;
  cursor:pointer;
  display:inline-flex;gap:8px;align-items:center;
  transition:transform .08s ease, box-shadow .12s ease;
}
.btn:hover{box-shadow:var(--shadow);text-decoration:none}
.btn:active{transform:translateY(1px)}
.btn--primary{
  background:var(--ml-orange);
  border-color:rgba(23,23,24,.15);
  color:var(--ml-noir);
}
.btn--accent{
  background:var(--ml-bleu);
  border-color:rgba(23,23,24,.15);
  color:var(--ml-blanc);
}
.btn--ghost{
  background:var(--ml-blanc);
  border-color:var(--border);
}

.hero{
  display:grid;grid-template-columns: 1.35fr .65fr;
  gap:18px;align-items:start;
}
.hero__content{
  border:1px solid var(--border);
  border-radius:var(--radius);
  padding:18px;
  box-shadow:var(--shadow);
}
.hero__card{
  border:1px solid var(--border);
  border-radius:var(--radius);
  padding:18px;
}
.hero__actions{display:flex;gap:10px;flex-wrap:wrap;margin:14px 0 10px}

.statbar{
  display:grid;grid-template-columns:repeat(4,1fr);
  gap:10px;margin-top:12px;
}
.stat{
  border:1px solid var(--border);
  border-radius:14px;padding:12px;
  background:linear-gradient(180deg,rgba(149,193,31,.08),rgba(255,255,255,0));
}
.stat__num{font-family:var(--font-ui);font-weight:800;font-size:20px}
.stat__label{font-size:12px;color:var(--muted)}

.progress{margin-top:14px}
.progress__bar{
  height:10px;border-radius:999px;
  border:1px solid var(--border);
  overflow:hidden;background:rgba(23,23,24,.04);
}
.progress__fill{
  height:100%;
  background:linear-gradient(90deg,var(--ml-vert),var(--ml-bleu));
}
.progress__hint{margin-top:8px;font-size:12px;color:var(--muted)}

.section-head{display:flex;justify-content:space-between;align-items:end;gap:10px;margin:18px 0 10px}

.cards{margin-top:18px}
.grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:12px;
}
.card{
  border:1px solid var(--border);
  border-radius:var(--radius);
  padding:14px;
  background:var(--ml-blanc);
  display:flex;flex-direction:column;gap:10px;
  min-height:190px;
}
.card__top{display:flex;justify-content:space-between;gap:10px}
.pill{
  display:inline-flex;align-items:center;gap:8px;
  font-size:12px;padding:6px 10px;border-radius:999px;
  border:1px solid var(--border);
}
.pill--blue{background:rgba(40,151,213,.10);border-color:rgba(40,151,213,.35)}
.pill--green{background:rgba(149,193,31,.12);border-color:rgba(149,193,31,.45)}
.pill--pink{background:rgba(214,11,82,.10);border-color:rgba(214,11,82,.35)}
.pill--orange{background:rgba(243,146,0,.12);border-color:rgba(243,146,0,.45)}
.pill--violet{background:rgba(163,25,91,.10);border-color:rgba(163,25,91,.35)}

.card__title{font-family:var(--font-title);font-size:16px;margin:0}
.card__desc{font-size:13px;color:var(--muted);margin:0}
.card__meta{display:flex;gap:10px;flex-wrap:wrap;color:var(--muted);font-size:12px}
.card__actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:auto}
.locked{
  opacity:.62;
}
.locked .btn{cursor:not-allowed;opacity:.8}
.badge{
  width:34px;height:34px;border-radius:12px;
  display:grid;place-items:center;
  border:1px solid var(--border);
  background:rgba(23,23,24,.02);
}

.panel{
  margin-top:18px;
  border:1px solid var(--border);
  border-radius:var(--radius);
  padding:16px;
}
.panel__head{margin-bottom:10px}
.flow{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:12px;
}
.flowstep{
  border:1px solid var(--border);
  border-radius:14px;
  padding:12px;
}
.flowstep__t{font-family:var(--font-title);font-size:14px;margin:0 0 6px}
.flowstep__p{margin:0;color:var(--muted);font-size:12px}
.flowstep__cta{margin-top:10px}

.footer{
  margin-top:26px;
  background:var(--ml-noir);
  color:var(--ml-blanc);
}
.footer__inner{
  max-width:1100px;margin:0 auto;padding:18px 22px;
  display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;
}
.footer__title{font-family:var(--font-title);font-size:14px}
.footer__meta{font-size:12px;opacity:.85}
.footer__links{display:flex;gap:12px;flex-wrap:wrap}
.footer__links a{opacity:.92}
.footer__links a:hover{opacity:1}

.pagehead{
  display:flex;justify-content:space-between;align-items:flex-end;gap:12px;
  margin:10px 0 14px;
}
.breadcrumb{font-size:12px;color:var(--muted)}
.kpirow{display:flex;gap:10px;flex-wrap:wrap}
.kpi{
  border:1px solid var(--border);
  border-radius:14px;
  padding:10px 12px;
  background:rgba(40,151,213,.06);
  font-size:12px;
}
.kpi strong{font-family:var(--font-ui);font-size:14px}

.modulewrap{
  display:grid;
  grid-template-columns: 1fr .55fr;
  gap:12px;
}
.block{
  border:1px solid var(--border);
  border-radius:var(--radius);
  padding:14px;
}
.block__title{font-family:var(--font-title);font-size:16px;margin:0 0 10px}
.list{margin:0;padding-left:18px}
.list li{margin:6px 0}
hr.sep{border:none;border-top:1px solid var(--border);margin:14px 0}

.q{
  border:1px solid var(--border);
  border-radius:14px;
  padding:12px;
  margin:10px 0;
}
.q__title{margin:0 0 8px;font-family:var(--font-title);font-size:14px}
.q__opts{display:grid;gap:8px}
.opt{
  border:1px solid var(--border);
  border-radius:12px;
  padding:10px 10px;
  background:rgba(23,23,24,.02);
  cursor:pointer;
}
.opt:hover{background:rgba(149,193,31,.10)}
.toast{
  margin-top:10px;
  border:1px solid rgba(149,193,31,.55);
  background:rgba(149,193,31,.12);
  border-radius:14px;
  padding:10px;
  font-size:12px;
}
.toast--warn{
  border-color:rgba(159,61,63,.55);
  background:rgba(159,61,63,.10);
}

@media (max-width: 980px){
  .hero{grid-template-columns:1fr}
  .grid{grid-template-columns:1fr}
  .flow{grid-template-columns:1fr}
  .modulewrap{grid-template-columns:1fr}
  .statbar{grid-template-columns:repeat(2,1fr)}
}
