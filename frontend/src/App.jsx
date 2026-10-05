import { useCallback, useEffect, useState } from 'react';

const stageIcons = { Build: '⌘', Test: '✓', Security: '◇', Docker: '▣', Deploy: '↗' };
const statusLabel = { success: 'Passed', failure: 'Failed', running: 'Running', queued: 'Queued', cancelled: 'Cancelled', skipped: 'Skipped' };
const uiStatus = { success: 'success', failure: 'failed', running: 'running', queued: 'queued', cancelled: 'cancelled', skipped: 'skipped' };
const formatDuration = (seconds = 0) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins ? `${mins}m ${String(secs).padStart(2, '0')}s` : `${secs}s`;
};
const relativeTime = (value) => {
  if (!value) return '—';
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hour${Math.floor(seconds / 3600) === 1 ? '' : 's'} ago`;
  return `${Math.floor(seconds / 86400)} day${Math.floor(seconds / 86400) === 1 ? '' : 's'} ago`;
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const triggerLabel = (trigger) => ({ push: 'Push', pull_request: 'Pull request', manual: 'Manual', schedule: 'Schedule' }[trigger] || trigger);

function Icon({ children, size=18 }) { return <span className="icon" style={{fontSize:size}} aria-hidden="true">{children}</span> }
function App() {
  const [filter, setFilter] = useState('All runs');
  const [selected, setSelected] = useState('');
  const [range, setRange] = useState('10 runs');
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setApiError('');
    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard/`);
      if (!response.ok) throw new Error(`API returned ${response.status}`);
      const payload = await response.json();
      setDashboard(payload);
      setSelected((current) => current || (payload.latest_run ? `#${payload.latest_run.run_number}` : ''));
    } catch (error) {
      setApiError(error.message || 'Could not load dashboard data.');
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => { loadDashboard(); }, [loadDashboard]);
  const latestRun = dashboard?.latest_run;
  const stages = latestRun?.stages || [];
  const runs = dashboard?.recent_runs || [];
  const shown = runs.filter((run) => filter === 'All runs' || statusLabel[run.status] === filter);
  const metrics = dashboard?.metrics || {};
  const executionTrend = dashboard?.execution_trend || [];
  const maxDuration = Math.max(...executionTrend.map((run) => run.duration_seconds), 1);
  const bars = executionTrend.map((run) => ({ ...run, height: Math.max(10, Math.round((run.duration_seconds / maxDuration) * 100)) }));
  const successRate = Number(metrics.success_rate || 0);
  const averageDuration = formatDuration(metrics.average_duration_seconds || 0);
  const failedStage = stages.find((stage) => stage.status === 'failure');
  const failureText = latestRun?.failure_summary || failedStage?.failure_message || 'No failure details provided.';
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><span></span><span></span><span></span></div><span>pulse<span className="brand-dot">.</span></span></div>
      <div className="workspace"><div className="workspace-avatar">A</div><div><strong>Aarush Gupta</strong><small>Personal workspace</small></div><span className="chevron">⌄</span></div>
      <div className="side-label">WORKSPACE</div>
      <nav><a className="nav-item active"><Icon>▦</Icon>Overview</a><a className="nav-item"><Icon>⌁</Icon>Workflows<span className="nav-count">3</span></a><a className="nav-item"><Icon>◷</Icon>Run history</a><a className="nav-item"><Icon>◈</Icon>Analytics</a></nav>
      <div className="side-label repo-label">REPOSITORY</div>
      <div className="repo-mini"><div className="repo-avatar">◉</div><div><strong>{dashboard?.repository?.name || 'Repository'}</strong><small>{dashboard?.repository?.owner || 'GitHub'}</small></div><span className="chevron">⌄</span></div>
      <div className="side-bottom"><div className="connection"><span className="live-dot"></span><span>{apiError ? 'Backend disconnected' : loading ? 'Connecting to API…' : 'Django API connected'}</span><Icon>↗</Icon></div><a className="nav-item"><Icon>⚙</Icon>Settings</a><div className="profile"><div className="profile-avatar">AG</div><div><strong>Aarush Gupta</strong><small>Free plan</small></div><span className="chevron">···</span></div></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="breadcrumbs"><span>Repositories</span><b>/</b><strong>{dashboard?.repository?.name || 'Repository'}</strong><b>/</b><strong>Overview</strong></div><div className="top-actions"><button className="icon-button" aria-label="Notifications">♧<i></i></button><div className="top-avatar">AG</div></div></header>
      <div className="content">
        {apiError && <div className="api-alert"><strong>Backend unavailable</strong><span>{apiError}. Start Django on port 8000, then refresh.</span></div>}
        <div className="page-heading"><div><div className="eyebrow"><span className="repo-symbol">◉</span> {dashboard?.repository?.owner?.toUpperCase() || 'REPOSITORY'} <span className="slash">/</span> {dashboard?.repository?.name?.toUpperCase() || '—'} <span className="visibility">{dashboard?.repository?.visibility?.toUpperCase() || 'REPOSITORY'}</span></div><h1>Pipeline overview</h1><p className="subtitle">A clear view of your delivery health and recent activity.</p></div><div className="heading-actions"><a className="btn btn-secondary" href={dashboard?.repository?.html_url || '#'} target="_blank" rel="noreferrer"><Icon>⌘</Icon> View on GitHub <span className="external">↗</span></a><button className="btn btn-primary" onClick={loadDashboard} disabled={loading}><Icon>↻</Icon> {loading ? 'Loading…' : 'Refresh data'}</button></div></div>
        <div className="selectors"><button className="selector"><span className="selector-label">WORKFLOW</span><strong><span className="workflow-icon">ϟ</span> {dashboard?.workflow?.name || 'No workflow selected'}</strong><span className="chevron">⌄</span></button><span className="selector-divider"></span><button className="selector"><span className="selector-label">BRANCH</span><strong><span className="branch-icon">⑂</span> {latestRun?.branch || '—'}</strong><span className="chevron">⌄</span></button><div className="updated">{loading ? 'Loading API…' : apiError ? 'API unavailable' : <><span className="live-dot"></span> Synced just now</>}</div></div>
        <section className="kpi-grid">
          <article className="kpi-card"><div className="kpi-top"><span>Total runs</span><span className="kpi-icon blue">▤</span></div><div className="kpi-value">{metrics.total_runs ?? 0}</div><div className="kpi-foot"><span className="trend-up">{metrics.total_runs ?? 0}</span><span>recorded workflow runs</span><div className="sparkline"><svg viewBox="0 0 80 24"><path d="M1 19 L13 15 L25 17 L37 8 L49 13 L61 5 L79 2" /></svg></div></div></article>
          <article className="kpi-card"><div className="kpi-top"><span>Success rate</span><span className="kpi-icon green">↗</span></div><div className="kpi-value">{successRate}<span className="unit">%</span></div><div className="kpi-foot"><span className="trend-up">{successRate}%</span><span>of completed runs</span><div className="sparkline green-line"><svg viewBox="0 0 80 24"><path d="M1 18 L13 14 L25 17 L37 10 L49 12 L61 5 L79 3" /></svg></div></div></article>
          <article className="kpi-card"><div className="kpi-top"><span>Average duration</span><span className="kpi-icon violet">◷</span></div><div className="kpi-value">{averageDuration}</div><div className="kpi-foot"><span className="trend-good">{averageDuration}</span><span>mean completed run</span><div className="sparkline violet-line"><svg viewBox="0 0 80 24"><path d="M1 3 L13 8 L25 5 L37 12 L49 9 L61 17 L79 20" /></svg></div></div></article>
          <article className="kpi-card"><div className="kpi-top"><span>Failed runs</span><span className="kpi-icon red">!</span></div><div className="kpi-value">{metrics.failed_runs ?? 0}</div><div className="kpi-foot"><span className="trend-down">{metrics.failed_runs ?? 0}</span><span>failed workflow runs</span><div className="sparkline red-line"><svg viewBox="0 0 80 24"><path d="M1 4 L13 10 L25 7 L37 16 L49 13 L61 20 L79 22" /></svg></div></div></article>
        </section>
        <section className="panel pipeline-panel"><div className="section-head"><div><div className="section-kicker">LATEST EXECUTION</div><h2>Pipeline run <span className="muted-id">{latestRun ? `#${latestRun.run_number}` : '—'}</span>{latestRun && <span className={`status-pill ${latestRun.status === 'failure' ? 'failed-pill' : 'status-neutral'}`}><i></i> {statusLabel[latestRun.status] || latestRun.status}</span>}</h2></div><button className="text-link">Full run details <span>↗</span></button></div><div className="run-meta"><span><Icon>⑂</Icon> {latestRun?.branch || '—'}</span><span><Icon>⌘</Icon> <code>{latestRun?.commit_sha?.slice(0, 7) || '—'}</code> {latestRun?.commit_message || 'No commit message'}</span><span><Icon>♧</Icon> {latestRun?.actor || 'Unknown actor'}</span><span><Icon>◷</Icon> {latestRun?.created_at ? new Date(latestRun.created_at).toLocaleString() : '—'}</span><span className="meta-duration"><Icon>◷</Icon> {formatDuration(latestRun?.duration_seconds || 0)}</span></div>
          <div className="pipeline-flow">{stages.map((stage,i)=><div className={`stage-wrap ${i===stages.length-1?'last':''}`} key={stage.id}><button className={`stage-node ${uiStatus[stage.status] || 'queued'} ${selected===stage.name?'chosen':''}`} onClick={()=>setSelected(stage.name)}><div className="stage-node-top"><span className="stage-glyph">{stageIcons[stage.name] || '◈'}</span><span className="stage-check">{stage.status==='failure'?'×':stage.status==='running'?'↻':stage.status==='queued'?'·':stage.status==='skipped'?'–':'✓'}</span></div><strong>{stage.name}</strong><small>{stage.detail}</small><div className="stage-time">◷ <span>{formatDuration(stage.duration_seconds)}</span></div></button>{i<stages.length-1&&<div className={`flow-line ${stage.status==='success'?'done':''}`}><span></span></div>}</div>)}</div>
          <div className={`failure-callout ${latestRun?.status === 'failure' ? '' : 'success-callout'}`}><div className="failure-icon">{latestRun?.status === 'failure' ? '!' : '✓'}</div><div className="failure-copy"><strong>{latestRun?.status === 'failure' ? (failedStage?.name || 'Pipeline') + ' failed' : latestRun ? 'No pipeline failure' : 'No run data yet'}</strong><span>{latestRun?.status === 'failure' ? failureText : 'Failure details will appear here when a run fails.'}</span></div><div className="failure-error"><span>{latestRun?.status === 'failure' ? 'FAILURE DETAIL' : 'LATEST STATUS'}</span><code>{latestRun?.status ? statusLabel[latestRun.status] || latestRun.status : 'Waiting for data'}</code></div>{latestRun?.logs_url && <a className="btn btn-log" href={latestRun.logs_url} target="_blank" rel="noreferrer">View logs <span>↗</span></a>}</div>
        </section>
        <div className="lower-grid">
          <section className="panel history-panel"><div className="section-head compact"><div><div className="section-kicker">ACTIVITY</div><h2>Recent runs</h2></div><button className="text-link">View all <span>→</span></button></div><div className="filter-row">{['All runs','Passed','Failed'].map(f=><button key={f} className={`filter-chip ${filter===f?'selected':''}`} onClick={()=>setFilter(f)}>{f}{f==='All runs'&&<span> {runs.length}</span>}</button>)}<button className="more-filter">Last 7 days⌄</button></div><div className="table-wrap"><table><thead><tr><th>RUN</th><th>COMMIT</th><th>STATUS</th><th>DURATION</th><th>TRIGGER</th><th>WHEN</th></tr></thead><tbody>{shown.map(r=><tr key={r.id} className={selected===`#${r.run_number}`?'row-selected':''} onClick={()=>setSelected(`#${r.run_number}`)}><td><strong>#{r.run_number}</strong><small>{r.commit_message}</small></td><td><code>{r.commit_sha?.slice(0,7) || '—'}</code><small className="branch-cell">⑂ {r.branch}</small></td><td><span className={`table-status ${r.status==='failure'?'table-failed':r.status==='success'?'table-passed':'table-running'}`}><i></i>{statusLabel[r.status] || r.status}</span></td><td>{formatDuration(r.duration_seconds)}</td><td>{triggerLabel(r.trigger)}</td><td className="when-cell">{relativeTime(r.created_at)}</td></tr>)}</tbody></table></div></section>
          <section className="panel trend-panel"><div className="section-head compact"><div><div className="section-kicker">PERFORMANCE</div><h2>Execution time</h2></div><button className="range-select" onClick={()=>setRange(range==='10 runs'?'30 days':'10 runs')}>{range}⌄</button></div><div className="chart-legend"><span><i className="legend-dot"></i> Duration</span><span><i className="legend-dash"></i> Average <b>{averageDuration}</b></span></div><div className="chart"><div className="y-labels"><span>6m</span><span>4m</span><span>2m</span><span>0</span></div><div className="plot"><div className="grid-line l1"></div><div className="grid-line l2"></div><div className="grid-line l3"></div><div className="avg-line"><span>{averageDuration}</span></div><div className="bars">{bars.map((run,i)=><div className={`bar ${i===bars.length-1?'bar-current':''}`} key={run.run_number} style={{height:`${run.height}%`}}><span className="bar-tooltip">{formatDuration(run.duration_seconds)}</span></div>)}</div><div className="x-labels"><span>{bars.length ? `#${bars[0].run_number}` : '—'}</span><span>{bars.length > 1 ? `#${bars[Math.floor((bars.length-1)/3)].run_number}` : ''}</span><span>{bars.length > 2 ? `#${bars[Math.floor(2*(bars.length-1)/3)].run_number}` : ''}</span><span>{bars.length ? `#${bars[bars.length-1].run_number}` : '—'}</span></div></div></div><div className="chart-foot"><span><i className="tiny-dot"></i> Last {bars.length} workflow runs</span><span className="chart-improve">{loading ? 'Loading' : 'API data'}</span></div></section>
        </div>
        <footer><span>Pulse <b>·</b> CI/CD Pipeline Visualizer</span><span>Django REST API <i className="live-dot"></i></span></footer>
      </div>
    </main>
  </div>
}
export default App;
