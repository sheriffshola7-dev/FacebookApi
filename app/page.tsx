"use client";

import { useState } from "react";
import {
  Activity, ArrowDownRight, ArrowRight, Bell, BookOpen, Boxes, CheckCircle2,
  ChevronDown, CircleHelp, Code2, Facebook, FileCode2, Gauge, Globe2, LayoutDashboard,
  LifeBuoy, LockKeyhole, Menu, MessageCircle, MoreHorizontal, PanelLeftClose,
  Plug, Radio, Search, Settings2, ShieldCheck, Webhook, X
} from "lucide-react";

type ModuleKey = "overview" | "login" | "graph" | "pages" | "marketing" | "messenger" | "webhooks" | "diagnostics" | "projects" | "settings";
const nav: { key: ModuleKey; label: string; icon: typeof LayoutDashboard; group: string }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard, group: "WORKSPACE" },
  { key: "login", label: "Facebook Login", icon: LockKeyhole, group: "INTEGRATIONS" },
  { key: "graph", label: "Graph API Explorer", icon: Code2, group: "INTEGRATIONS" },
  { key: "pages", label: "Facebook Pages", icon: Facebook, group: "INTEGRATIONS" },
  { key: "marketing", label: "Marketing API", icon: Gauge, group: "INTEGRATIONS" },
  { key: "messenger", label: "Messenger", icon: MessageCircle, group: "INTEGRATIONS" },
  { key: "webhooks", label: "Webhooks", icon: Webhook, group: "INTEGRATIONS" },
  { key: "diagnostics", label: "Diagnostics", icon: Activity, group: "DEVELOPMENT" },
  { key: "projects", label: "Client projects", icon: Boxes, group: "DEVELOPMENT" },
  { key: "settings", label: "Settings", icon: Settings2, group: "PREFERENCES" },
];

const moduleInfo: Record<Exclude<ModuleKey, "overview">, { eyebrow: string; title: string; description: string; icon: typeof Code2; bullets: string[] }> = {
  login: { eyebrow: "AUTHENTICATION", title: "Facebook Login", description: "Set up a secure OAuth sign-in flow for websites and applications, with explicit permission handling.", icon: LockKeyhole, bullets: ["OAuth redirect and callback handling", "State validation and secure session exchange", "Permission review and re-authentication flow"] },
  graph: { eyebrow: "API DEVELOPMENT", title: "Graph API Explorer", description: "Prepare and inspect Graph API requests from a controlled workspace. Live requests will be enabled after a Meta app is configured.", icon: Code2, bullets: ["Version-aware request builder", "GET, POST and DELETE method support", "Structured JSON response viewer"] },
  pages: { eyebrow: "PAGE INTEGRATIONS", title: "Facebook Pages", description: "Connect eligible Pages and build approved Page workflows using permissions granted by the Page administrator.", icon: Facebook, bullets: ["Connected Page inventory", "Page insights and content workflows", "Permission and access diagnostics"] },
  marketing: { eyebrow: "ADVERTISING", title: "Marketing API", description: "Build reporting and campaign-management integrations for authorized ad accounts.", icon: Gauge, bullets: ["Ad account connection and scope checks", "Campaign and insights reporting", "Safe read-first workflow before write actions"] },
  messenger: { eyebrow: "CUSTOMER MESSAGING", title: "Messenger automation", description: "Design policy-compliant messaging workflows for eligible Pages and opted-in conversations.", icon: MessageCircle, bullets: ["Webhook-driven conversation events", "Reusable reply and routing workflows", "Human handoff and delivery monitoring"] },
  webhooks: { eyebrow: "EVENT DELIVERY", title: "Webhooks", description: "Receive, verify and inspect Meta platform events with secure signature validation and delivery logs.", icon: Webhook, bullets: ["Webhook endpoint and subscription setup", "Challenge verification and signature checks", "Event history, retries and troubleshooting"] },
  diagnostics: { eyebrow: "DEVELOPER TOOLS", title: "API diagnostics", description: "A single place to understand configuration, permission, token and webhook issues.", icon: Activity, bullets: ["Configuration readiness checks", "Readable error explanations", "Redacted request and event logs"] },
  projects: { eyebrow: "CLIENT WORKSPACE", title: "Client projects", description: "Keep each client's Meta app configuration, integration notes and deployment checklist separate.", icon: Boxes, bullets: ["Per-client project workspaces", "Role-aware access and audit history", "Credential references without exposing secrets"] },
  settings: { eyebrow: "WORKSPACE", title: "Settings", description: "Manage workspace preferences and prepare secure Meta application configuration.", icon: Settings2, bullets: ["Workspace profile and preferences", "Meta app ID and environment setup", "Security, access and audit settings"] },
};

function Pill({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "green" | "amber" }) {
  return <span className={`pill pill-${tone}`}>{children}</span>;
}

export default function Home() {
  const [active, setActive] = useState<ModuleKey>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");

  const select = (key: ModuleKey) => { setActive(key); setSidebarOpen(false); setNotice(""); };
  const groups = ["WORKSPACE", "INTEGRATIONS", "DEVELOPMENT", "PREFERENCES"];

  return (
    <main className="app-shell">
      {sidebarOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Facebook size={19} fill="currentColor" /></div>
          <div><strong>SHORLAH CLOUD</strong><span>META TOOLKIT</span></div>
          <button className="icon-button sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar"><X size={17}/></button>
        </div>
        <button className="workspace-switch">
          <div className="workspace-avatar">SC</div>
          <div className="workspace-name"><strong>Shorlah Cloud</strong><span>Developer workspace</span></div>
          <ChevronDown size={15} />
        </button>
        <div className="nav-list">
          {groups.map(group => <div className="nav-group" key={group}>
            <div className="nav-heading">{group}</div>
            {nav.filter(item => item.group === group).map(item => {
              const Icon = item.icon;
              return <button key={item.key} className={`nav-item ${active === item.key ? "nav-active" : ""}`} onClick={() => select(item.key)}>
                <Icon size={17}/><span>{item.label}</span>{item.key === "webhooks" && <i className="nav-dot"/>}
              </button>;
            })}
          </div>)}
        </div>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><LifeBuoy size={17}/></div><strong>Need a hand?</strong><p>Explore Meta integration guides and setup notes.</p><a href="https://developers.facebook.com/docs/" target="_blank" rel="noreferrer">Open Meta docs <ArrowRight size={13}/></a></div>
          <div className="profile-row"><div className="profile-avatar">SC</div><div><strong>Shorlah Cloud</strong><span>Workspace owner</span></div><MoreHorizontal size={18}/></div>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="topbar-left"><button className="icon-button mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={19}/></button><div className="breadcrumbs">Workspace <span>/</span> <strong>{active === "overview" ? "Overview" : nav.find(n => n.key === active)?.label}</strong></div></div>
          <div className="topbar-actions"><div className="environment"><span/> Development</div><button className="icon-button" aria-label="Notifications" onClick={() => setNotice("You're all caught up. No integration events have been recorded yet.")}><Bell size={18}/></button><a className="docs-link" href="https://developers.facebook.com/" target="_blank" rel="noreferrer"><BookOpen size={16}/> Meta Developers</a></div>
        </header>

        <div className="content">
          {notice && <div className="notice"><CheckCircle2 size={16}/>{notice}<button onClick={() => setNotice("")} aria-label="Dismiss"><X size={15}/></button></div>}
          {active === "overview" ? <>
            <div className="page-heading"><div><div className="eyebrow">DEVELOPER WORKSPACE <span className="live-dot"/></div><h1>Good afternoon.</h1><p>Build, connect and monitor your Meta platform integrations.</p></div><a className="primary-button" href="https://developers.facebook.com/apps/" target="_blank" rel="noreferrer"><Plug size={16}/> Set up Meta app <ArrowRight size={15}/></a></div>

            <div className="setup-banner"><div className="banner-symbol"><ShieldCheck size={23}/></div><div className="banner-copy"><strong>Your workspace is ready for configuration</strong><p>Connect a Meta developer app to unlock live API tools. No accounts or credentials are connected yet.</p></div><Pill tone="amber">Setup required</Pill></div>

            <div className="section-title"><div><h2>Workspace snapshot</h2><p>Live metrics will appear when integrations are connected.</p></div><span className="updated-label"><span/> No live data yet</span></div>
            <div className="stats-grid">
              <div className="stat-card"><div className="stat-top"><span>Connected apps</span><div className="stat-icon"><Globe2 size={17}/></div></div><div className="stat-number">0</div><div className="stat-foot">No Meta apps connected</div></div>
              <div className="stat-card"><div className="stat-top"><span>Active integrations</span><div className="stat-icon"><Boxes size={17}/></div></div><div className="stat-number">0</div><div className="stat-foot">Connect a module to begin</div></div>
              <div className="stat-card"><div className="stat-top"><span>Webhook events</span><div className="stat-icon"><Radio size={17}/></div></div><div className="stat-number">0</div><div className="stat-foot">No events received</div></div>
              <div className="stat-card"><div className="stat-top"><span>Client projects</span><div className="stat-icon"><Boxes size={17}/></div></div><div className="stat-number">0</div><div className="stat-foot">No client workspaces yet</div></div>
            </div>

            <div className="section-title module-title"><div><h2>Integration modules</h2><p>Choose a capability to configure or explore its setup requirements.</p></div><span className="text-link">6 modules</span></div>
            <div className="modules-grid">
              {([
                ["login","Facebook Login","Secure OAuth sign-in for your apps.",LockKeyhole,"OAuth"],
                ["graph","Graph API Explorer","Build and inspect API requests.",Code2,"API tools"],
                ["pages","Facebook Pages","Connect and manage eligible Pages.",Facebook,"Pages"],
                ["marketing","Marketing API","Advertising insights and workflows.",Gauge,"Ads"],
                ["messenger","Messenger automation","Build customer messaging workflows.",MessageCircle,"Messaging"],
                ["webhooks","Webhooks","Receive and inspect platform events.",Webhook,"Events"],
              ] as const).map(([key,title,desc,Icon,tag]) => <button className="module-card" key={key} onClick={() => select(key as ModuleKey)}><div className="module-card-top"><div className="module-icon"><Icon size={19}/></div><span className="module-arrow"><ArrowDownRight size={16}/></span></div><strong>{title}</strong><p>{desc}</p><div className="module-card-foot"><Pill>{tag}</Pill><span>Not connected</span></div></button>)}
            </div>

            <div className="bottom-grid"><div className="panel"><div className="panel-heading"><div><h2>Getting started</h2><p>Your first steps to a working integration.</p></div><span className="progress-count">0 of 3</span></div><div className="progress-track"><span/></div><div className="checklist"><div><span className="step-number">1</span><div><strong>Create a Meta developer app</strong><p>Register an app in Meta for Developers.</p></div><a href="https://developers.facebook.com/apps/" target="_blank" rel="noreferrer">Open <ArrowRight size={13}/></a></div><div><span className="step-number">2</span><div><strong>Add app credentials securely</strong><p>Store App ID and secret in server environment variables.</p></div><span className="step-state">Pending</span></div><div><span className="step-number">3</span><div><strong>Configure OAuth and permissions</strong><p>Set redirect URLs and request only required scopes.</p></div><span className="step-state">Pending</span></div></div></div>
              <div className="panel activity-panel"><div className="panel-heading"><div><h2>Recent activity</h2><p>Workspace events and integration updates.</p></div><Activity size={17} className="muted-icon"/></div><div className="empty-activity"><div className="empty-icon"><Activity size={20}/></div><strong>No activity yet</strong><p>Connection events, API requests and webhook deliveries will appear here.</p></div></div></div>
            <footer>© 2026 Shorlah Cloud <span>•</span> Built for secure Meta integrations <span className="footer-right"><LockKeyhole size={12}/> Credentials stay server-side</span></footer>
          </> : (() => { const info = moduleInfo[active as Exclude<ModuleKey,"overview">]; const Icon = info.icon; return <div className="module-page"><div className="eyebrow">{info.eyebrow}</div><div className="module-hero"><div className="module-hero-icon"><Icon size={25}/></div><Pill tone="amber">Not configured</Pill></div><h1>{info.title}</h1><p className="module-description">{info.description}</p><div className="module-content-grid"><div className="panel"><h2>What you'll be able to do</h2><div className="feature-list">{info.bullets.map((b,i)=><div key={b}><CheckCircle2 size={17}/><span>{b}</span></div>)}</div></div><div className="panel configuration-panel"><div className="config-lock"><LockKeyhole size={19}/></div><h2>Connect your Meta app</h2><p>This module becomes available after the workspace has a Meta developer app configured and the required permissions have been reviewed.</p><a className="primary-button" href="https://developers.facebook.com/apps/" target="_blank" rel="noreferrer">Open Meta Developers <ArrowRight size={15}/></a><small>Never paste App Secrets or access tokens into browser-visible fields.</small></div></div><button className="back-link" onClick={() => select("overview")}>← Back to overview</button></div>; })()}
        </div>
      </section>
    </main>
  );
}