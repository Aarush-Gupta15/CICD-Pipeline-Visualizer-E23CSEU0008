import { useState } from 'react';

const stages = [
  { name: 'Build', detail: 'Compile & bundle', time: '42s', state: 'success', icon: '⌘' },
  { name: 'Test', detail: 'Unit + integration', time: '1m 12s', state: 'success', icon: '✓' },
  { name: 'Security', detail: 'CodeQL analysis', time: '38s', state: 'success', icon: '◇' },
  { name: 'Docker', detail: 'Build image', time: '1m 05s', state: 'success', icon: '▣' },
  { name: 'Deploy', detail: 'Production · us-east-1', time: '54s', state: 'failed', icon: '↗' },
];
const runs = [
  { id: '#142', commit: 'a82f91c', message: 'Fix checkout flow on mobile', status: 'Failed', duration: '4m 32s', trigger: 'Push', when: '5 min ago', branch: 'main' },
  { id: '#141', commit: '7bc921a', message: 'Add product filters', status: 'Passed', duration: '3m 48s', trigger: 'Push', when: '1 hour ago', branch: 'main' },
  { id: '#140', commit: '12de81a', message: 'Update dependencies', status: 'Passed', duration: '4m 02s', trigger: 'Pull request', when: '3 hours ago', branch: 'feature/search' },
  { id: '#139', commit: 'f3c82bd', message: 'Refactor API client', status: 'Passed', duration: '3m 55s', trigger: 'Push', when: 'Yesterday', branch: 'main' },
  { id: '#138', commit: 'c9d14ee', message: 'Add dark mode tokens', status: 'Passed', duration: '4m 11s', trigger: 'Pull request', when: 'Yesterday', branch: 'feature/theme' },
];
const bars = [48, 57, 52, 72, 49, 63, 56, 43, 59, 42];
function Icon({ children, size=18 }) { return <span className="icon" style={{fontSize:size}} aria-hidden="true">{children}</span> }
function App() {
  const [filter, setFilter] = useState('All runs');
  const [selected, setSelected] = useState('#142');
  const [range, setRange] = useState('10 runs');
  const shown = runs.filter(r => filter === 'All runs' || r.status === filter);
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><span></span><span></span><span></span></div><span>pulse<span className="brand-dot">.</span></span></div>
      <div className="workspace"><div className="workspace-avatar">A</div><div><strong>Aarush Gupta</strong><small>Personal workspace</small></div><span className="chevron">⌄</span></div>
      <div className="side-label">WORKSPACE</div>
      <nav><a className="nav-item active"><Icon>▦</Icon>Overview</a><a className="nav-item"><Icon>⌁</Icon>Workflows<span className="nav-count">3</span></a><a className="nav-item"><Icon>◷</Icon>Run history</a><a className="nav-item"><Icon>◈</Icon>Analytics</a></nav>
      <div className="side-label repo-label">REPOSITORY</div>
      <div className="repo-mini"><div className="repo-avatar">◉</div><div><strong>storefront</strong><small>Aarush-Gupta15</small></div><span className="chevron">⌄</span></div>
      <div className="side-bottom"><div className="connection"><span className="live-dot"></span><span>GitHub connected</span><Icon>↗</Icon></div><a className="nav-item"><Icon>⚙</Icon>Settings</a><div className="profile"><div className="profile-avatar">AG</div><div><strong>Aarush Gupta</strong><small>Free plan</small></div><span className="chevron">···</span></div></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="breadcrumbs"><span>Repositories</span><b>/</b><strong>storefront</strong><b>/</b><strong>Overview</strong></div><div className="top-actions"><button className="icon-button" aria-label="Notifications">♧<i></i></button><div className="top-avatar">AG</div></div></header>
      <div className="content">
        <div className="page-heading"><div><div className="eyebrow"><span className="repo-symbol">◉</span> AARUSH-GUPTA15 <span className="slash">/</span> STOREFRONT <span className="visibility">PUBLIC</span></div><h1>Pipeline overview</h1><p className="subtitle">A clear view of your delivery health and recent activity.</p></div><div className="heading-actions"><button className="btn btn-secondary"><Icon>⌘</Icon> View on GitHub <span className="external">↗</span></button><button className="btn btn-primary"><Icon>↻</Icon> Refresh data</button></div></div>
        <div className="selectors"><button className="selector"><span className="selector-label">WORKFLOW</span><strong><span className="workflow-icon">ϟ</span> CI / CD Pipeline</strong><span className="chevron">⌄</span></button><span className="selector-divider"></span><button className="selector"><span className="selector-label">BRANCH</span><strong><span className="branch-icon">⑂</span> main</strong><span className="chevron">⌄</span></button><div className="updated"><span className="live-dot"></span> Updated just now</div></div>
        <section className="kpi-grid">
          <article className="kpi-card"><div className="kpi-top"><span>Total runs</span><span className="kpi-icon blue">▤</span></div><div className="kpi-value">142</div><div className="kpi-foot"><span className="trend-up">↗ 12.8%</span><span>vs. last month</span><div className="sparkline"><svg viewBox="0 0 80 24"><path d="M1 19 L13 15 L25 17 L37 8 L49 13 L61 5 L79 2" /></svg></div></div></article>
          <article className="kpi-card"><div className="kpi-top"><span>Success rate</span><span className="kpi-icon green">↗</span></div><div className="kpi-value">87.3<span className="unit">%</span></div><div className="kpi-foot"><span className="trend-up">↗ 4.2%</span><span>vs. last month</span><div className="sparkline green-line"><svg viewBox="0 0 80 24"><path d="M1 18 L13 14 L25 17 L37 10 L49 12 L61 5 L79 3" /></svg></div></div></article>
          <article className="kpi-card"><div className="kpi-top"><span>Average duration</span><span className="kpi-icon violet">◷</span></div><div className="kpi-value">4<span className="unit">m</span> 18<span className="unit">s</span></div><div className="kpi-foot"><span className="trend-good">↓ 8.1%</span><span>faster this month</span><div className="sparkline violet-line"><svg viewBox="0 0 80 24"><path d="M1 3 L13 8 L25 5 L37 12 L49 9 L61 17 L79 20" /></svg></div></div></article>
          <article className="kpi-card"><div className="kpi-top"><span>Failed runs</span><span className="kpi-icon red">!</span></div><div className="kpi-value">18</div><div className="kpi-foot"><span className="trend-down">↓ 3 runs</span><span>vs. last month</span><div className="sparkline red-line"><svg viewBox="0 0 80 24"><path d="M1 4 L13 10 L25 7 L37 16 L49 13 L61 20 L79 22" /></svg></div></div></article>
        </section>
        <section className="panel pipeline-panel"><div className="section-head"><div><div className="section-kicker">LATEST EXECUTION</div><h2>Pipeline run <span className="muted-id">#142</span><span className="status-pill failed-pill"><i></i> Failed</span></h2></div><button className="text-link">Full run details <span>↗</span></button></div><div className="run-meta"><span><Icon>⑂</Icon> main</span><span><Icon>⌘</Icon> <code>a82f91c</code> Fix checkout flow on mobile</span><span><Icon>♧</Icon> Aarush Gupta</span><span><Icon>◷</Icon> Today, 10:42 AM</span><span className="meta-duration"><Icon>◷</Icon> 4m 32s</span></div>
          <div className="pipeline-flow">{stages.map((stage,i)=><div className={`stage-wrap ${i===stages.length-1?'last':''}`} key={stage.name}><button className={`stage-node ${stage.state} ${selected===stage.name?'chosen':''}`} onClick={()=>setSelected(stage.name)}><div className="stage-node-top"><span className="stage-glyph">{stage.icon}</span><span className="stage-check">{stage.state==='failed'?'×':'✓'}</span></div><strong>{stage.name}</strong><small>{stage.detail}</small><div className="stage-time">◷ <span>{stage.time}</span></div></button>{i<stages.length-1&&<div className={`flow-line ${i<4?'done':''}`}><span></span></div>}</div>)}</div>
          <div className="failure-callout"><div className="failure-icon">!</div><div className="failure-copy"><strong>Deployment failed</strong><span>Image pull failed · <b>deploy-production</b> · Kubernetes</span></div><div className="failure-error"><span>ERROR</span><code>ErrImagePull: manifest not found</code></div><button className="btn btn-log">View logs <span>↗</span></button></div>
        </section>
        <div className="lower-grid">
          <section className="panel history-panel"><div className="section-head compact"><div><div className="section-kicker">ACTIVITY</div><h2>Recent runs</h2></div><button className="text-link">View all <span>→</span></button></div><div className="filter-row">{['All runs','Passed','Failed'].map(f=><button key={f} className={`filter-chip ${filter===f?'selected':''}`} onClick={()=>setFilter(f)}>{f}{f==='All runs'&&<span> 5</span>}</button>)}<button className="more-filter">Last 7 days⌄</button></div><div className="table-wrap"><table><thead><tr><th>RUN</th><th>COMMIT</th><th>STATUS</th><th>DURATION</th><th>TRIGGER</th><th>WHEN</th></tr></thead><tbody>{shown.map(r=><tr key={r.id} className={selected===r.id?'row-selected':''} onClick={()=>setSelected(r.id)}><td><strong>{r.id}</strong><small>{r.message}</small></td><td><code>{r.commit}</code><small className="branch-cell">⑂ {r.branch}</small></td><td><span className={`table-status ${r.status==='Failed'?'table-failed':'table-passed'}`}><i></i>{r.status}</span></td><td>{r.duration}</td><td>{r.trigger}</td><td className="when-cell">{r.when}</td></tr>)}</tbody></table></div></section>
          <section className="panel trend-panel"><div className="section-head compact"><div><div className="section-kicker">PERFORMANCE</div><h2>Execution time</h2></div><button className="range-select" onClick={()=>setRange(range==='10 runs'?'30 days':'10 runs')}>{range}⌄</button></div><div className="chart-legend"><span><i className="legend-dot"></i> Duration</span><span><i className="legend-dash"></i> Average <b>4m 18s</b></span></div><div className="chart"><div className="y-labels"><span>6m</span><span>4m</span><span>2m</span><span>0</span></div><div className="plot"><div className="grid-line l1"></div><div className="grid-line l2"></div><div className="grid-line l3"></div><div className="avg-line"><span>4m 18s</span></div><div className="bars">{bars.map((h,i)=><div className={`bar ${i===9?'bar-current':''}`} key={i} style={{height:`${h}%`}}><span className="bar-tooltip">{Math.round(h*5.2)}s</span></div>)}</div><div className="x-labels"><span>#133</span><span>#136</span><span>#139</span><span>#142</span></div></div></div><div className="chart-foot"><span><i className="tiny-dot"></i> Last 10 workflow runs</span><span className="chart-improve">↓ 8.1% <small>improved</small></span></div></section>
        </div>
        <footer><span>Pulse <b>·</b> CI/CD Pipeline Visualizer</span><span>Data synced with GitHub Actions <i className="live-dot"></i></span></footer>
      </div>
    </main>
  </div>
}
export default App;
