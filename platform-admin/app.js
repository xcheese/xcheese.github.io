(function () {
  const D = window.PlatformData;
  const app = document.getElementById("app");
  const overlay = document.getElementById("overlay-root");

  const state = {
    dateIndex: 1,
    roleIndex: 0,
    filter: "",
    status: "全部状态",
    sortKey: "",
    sortDirection: "desc",
    detailTab: "overview",
    trendMetric: "收入",
    toastTimer: null
  };

  const roles = ["平台运营", "客服视图", "财务视图", "管理层视图"];
  const dates = ["近7天", "近30天", "近90天", "本年度"];
  const money = new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 0 });
  const integer = new Intl.NumberFormat("zh-CN");

  const paths = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5M9 21v-7h6v7"/>',
    shop: '<path d="M4 10v10h16V10"/><path d="M3 4h18l-1 6H4L3 4Z"/><path d="M8 10v3m4-3v3m4-3v3"/>',
    membership: '<path d="m12 3 7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4Z"/><path d="m9 12 2 2 4-4"/>',
    crowdfunding: '<path d="M14 4c2.6-1.1 4.9-1.1 6-1-.1 1.1-.1 3.4-1.2 6L14 14l-6-6 6-4Z"/><circle cx="15.5" cy="7.5" r="1.5"/><path d="m9 15-4 1 1-4m6 3-1 4-4 2 1-4"/>',
    bag: '<path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    order: '<path d="M6 3h12v18H6z"/><path d="M9 8h6M9 12h6M9 16h4"/>',
    finance: '<circle cx="12" cy="12" r="9"/><path d="M9 8h5a2 2 0 0 1 0 4h-4a2 2 0 0 0 0 4h5M12 6v12"/>',
    ticket: '<path d="M5 4h14v5a3 3 0 0 0 0 6v5H5v-5a3 3 0 0 0 0-6V4Z"/><path d="M12 7v2m0 4v4"/>',
    chart: '<path d="M4 19V9m6 10V5m6 14v-7m4 7H2"/>',
    report: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v5h5M9 13h7M9 17h7"/>',
    note: '<path d="M5 4h14v13l-4 4H5z"/><path d="M15 21v-4h4M8 9h8M8 13h6"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    calendar: '<path d="M5 4h14v16H5zM8 2v4m8-4v4M5 9h14"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M6.1 8a7 7 0 0 1 11.8-2L20 8M4 16l2.1 2a7 7 0 0 0 11.8-2"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6m0 4h.01"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    more: '<circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M4 21h16"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    filter: '<path d="M4 5h16M7 12h10M10 19h4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v7H4V6h7"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    arrowLeft: '<path d="m15 18-6-6 6-6"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/>'
  };

  function icon(name, className) {
    return `<svg class="icon${className ? ` ${className}` : ""}" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.alert}</svg>`;
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>"]/g, (match) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[match]);
  }

  function currentRoute() {
    const hash = location.hash.replace(/^#\/?/, "") || "dashboard";
    const parts = hash.split("/").filter(Boolean);
    return { name: parts[0] || "dashboard", id: parts[1] || "", parts };
  }

  function pageTitle(route) {
    return D.nav.find((item) => item.id === route)?.label || "工作台";
  }

  function sparkline(values) {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const span = max - min || 1;
    const points = values.map((value, index) => `${(index / (values.length - 1)) * 56 + 1},${18 - ((value - min) / span) * 15}`).join(" ");
    return `<svg class="sparkline" viewBox="0 0 58 20" aria-hidden="true"><polyline points="${points}"/></svg>`;
  }

  function lineChart(values, metric) {
    const width = 760;
    const height = 190;
    const pad = { left: 42, right: 18, top: 18, bottom: 26 };
    const max = Math.max(...values) * 1.12;
    const min = Math.min(...values) * .78;
    const x = (i) => pad.left + (i / (values.length - 1)) * (width - pad.left - pad.right);
    const y = (v) => pad.top + (1 - (v - min) / (max - min)) * (height - pad.top - pad.bottom);
    const points = values.map((v, i) => `${x(i)},${y(v)}`).join(" ");
    const area = `${pad.left},${height - pad.bottom} ${points} ${width - pad.right},${height - pad.bottom}`;
    const bars = values.map((v, i) => `<rect class="chart-bar" x="${x(i) - 4}" y="${y(v * .78)}" width="8" height="${height - pad.bottom - y(v * .78)}" rx="1"/>`).join("");
    const grid = [0, 1, 2, 3].map((i) => {
      const yy = pad.top + i * ((height - pad.top - pad.bottom) / 3);
      return `<line class="chart-grid" x1="${pad.left}" x2="${width - pad.right}" y1="${yy}" y2="${yy}"/>`;
    }).join("");
    const labels = [0, 5, 10, 15, 20, 25, 29].map((i) => `<text class="chart-label" x="${x(i)}" y="${height - 7}" text-anchor="middle">05-${String(i + 1).padStart(2, "0")}</text>`).join("");
    const annotationX = x(14);
    const annotationY = Math.max(4, y(values[14]) - 29);
    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(metric)}近30天趋势图">
      ${grid}${bars}<polygon class="chart-area" points="${area}"/><polyline class="chart-line" points="${points}"/>
      ${values.filter((_, i) => i % 3 === 0).map((v, i) => `<circle class="chart-point" cx="${x(i * 3)}" cy="${y(v)}" r="2.5"/>`).join("")}
      ${labels}<rect class="chart-annotation" x="${annotationX - 37}" y="${annotationY}" width="74" height="23" rx="3"/><text class="chart-label" x="${annotationX}" y="${annotationY + 15}" text-anchor="middle">05-15 活动峰值</text>
    </svg>`;
  }

  function status(value) {
    const strong = /高风险|P0|限制|超时|暂缓|异常/.test(value);
    const muted = /正常|低风险|已完成|已支付|已归档|已生成|已打款|在售|销售中/.test(value);
    return `<span class="status ${strong ? "strong" : muted ? "muted" : ""}">${esc(value)}</span>`;
  }

  function priorityTag(value) {
    return `<span class="priority-tag ${String(value).toLowerCase()}">${esc(value)}</span>`;
  }

  function shell() {
    const route = currentRoute();
    return `<div class="app-shell">
      <aside class="sidebar" aria-label="主导航">
        <div class="brand"><span class="brand-mark">p</span><span>平台管理后台</span><span class="brand-collapse">‹‹</span></div>
        <nav class="nav-list">
          ${D.nav.map((item) => `<a class="nav-item ${route.name === item.id ? "active" : ""}" href="#/${item.id}" data-nav="${item.id}">${icon(item.icon)}<span>${item.label}</span>${["shops", "memberships", "crowdfunding", "products", "users", "orders", "tickets", "traffic", "reports", "settings"].includes(item.id) ? icon("down", "chevron") : ""}</a>`).join("")}
        </nav>
        <div class="sidebar-foot"><button data-action="collapse-sidebar">${icon("arrowLeft")}<span>收起侧栏</span></button></div>
      </aside>
      <div class="main-shell">
        <header class="topbar">
          <button class="icon-button mobile-menu" data-action="toggle-sidebar" aria-label="打开导航">${icon("menu")}</button>
          <label class="global-search">${icon("search")}<input id="global-search" type="search" placeholder="搜索店铺、订单、用户…" autocomplete="off"></label>
          <div class="top-actions">
            <a class="control storefront-link" href="./discover.html">${icon("external")}前台发现</a>
            <button class="control date-control" data-action="cycle-date">${dates[state.dateIndex]} ${icon("calendar")}</button>
            <button class="control role-control" data-action="cycle-role">${roles[state.roleIndex]} ${icon("down")}</button>
            <button class="icon-button notify-button" data-action="notify" aria-label="通知">${icon("bell")}<span class="dot"></span></button>
            <div class="profile"><span class="avatar">张</span><span>张运营⌄</span></div>
          </div>
        </header>
        <main class="content"><div class="page">${renderPage(route)}</div></main>
      </div>
    </div>`;
  }

  function pageHeading(title, desc, actions) {
    return `<div class="page-heading"><div><h1>${esc(title)}</h1><p>${esc(desc)}</p></div><div class="page-actions">${actions || `<button class="control" data-action="refresh">${icon("refresh")}刷新数据</button>`}</div></div>`;
  }

  function renderPage(route) {
    if (route.id && ["shops", "memberships", "crowdfunding", "products", "users", "orders", "finance", "tickets", "traffic"].includes(route.name)) {
      return renderDetail(route.name, route.id);
    }
    switch (route.name) {
      case "shops": return renderEntityList("shops");
      case "memberships": return renderEntityList("memberships");
      case "crowdfunding": return renderEntityList("crowdfunding");
      case "products": return renderEntityList("products");
      case "users": return renderEntityList("users");
      case "orders": return renderEntityList("orders");
      case "finance": return renderFinance();
      case "tickets": return renderEntityList("tickets");
      case "traffic": return renderTraffic();
      case "reports": return renderReports();
      case "notes": return renderNotes();
      case "settings": return renderSettings();
      default: return renderDashboard();
    }
  }

  function renderDashboard() {
    return `${pageHeading("今日工作台", "数据更新：2025-05-26 10:30", `<button class="control" data-action="refresh">${icon("refresh")}刷新数据</button>`)}
      <section class="panel priority-panel">
        <div class="panel-head"><div class="panel-title">待处理优先级</div><span class="panel-meta">按影响金额、SLA 与客户价值综合排序</span></div>
        <div class="priority-grid">
          ${D.dashboard.priorities.map((group) => `<div class="priority-column"><div class="priority-column-title"><span class="priority-level">${group.level}</span><span>${group.label}</span></div>${group.items.map((item) => `<div class="priority-row"><span class="priority-task">${icon(group.level === "P0" ? "alert" : "order")}${esc(item[0])}</span><span class="owner">${esc(item[1])}</span><span class="muted">${esc(item[2])}</span><button class="action-link" data-route="${item[3]}">去处理</button></div>`).join("")}</div>`).join("")}
        </div>
      </section>
      <section class="panel kpi-strip">${D.dashboard.kpis.map((item) => `<div class="kpi-item"><div class="kpi-label">${esc(item.label)}</div><div class="kpi-value">${item.value}</div><div class="kpi-foot"><span>较上期 <strong>${item.delta}</strong></span>${sparkline(item.values)}</div></div>`).join("")}</section>
      ${signalRadar()}
      <div class="dashboard-grid">
        <section class="panel trend-panel"><div class="panel-head"><div class="panel-title">经营趋势</div><div class="segmented">${["收入", "订单", "退款", "结算"].map((metric) => `<button class="${state.trendMetric === metric ? "active" : ""}" data-trend="${metric}">${metric}</button>`).join("")}</div></div><div class="chart-wrap">${lineChart(D.dashboard.trend.map((value) => value * ({ 收入: 1, 订单: .78, 退款: .28, 结算: .9 }[state.trendMetric] || 1)), state.trendMetric)}</div></section>
        <section class="panel risk-panel"><div class="panel-head"><div class="panel-title">风险与机会</div><button class="action-link" data-route="reports">查看全部 ${icon("chevron")}</button></div><div class="risk-list">${D.dashboard.risks.map((item) => `<div class="risk-row"><span class="risk-type">${icon(item[3] === "P0" ? "alert" : "clock")}${item[0]}</span><strong title="${esc(item[1])}">${esc(item[1])}</strong><span class="impact number">${item[2]}</span>${priorityTag(item[3])}</div>`).join("")}</div></section>
      </div>
      <div class="bottom-grid">
        <section class="panel"><div class="panel-head"><div class="panel-title">店铺经营排行</div><div><button class="control" data-action="export" data-export="shops">${icon("download")}导出</button></div></div>${shopTable(D.shops.slice(0, 6), true)}<div class="pagination"><span>共 ${D.shops.length} 家重点店铺</span><div class="pages"><button class="active">1</button><button>2</button><button>3</button><button>${icon("chevron")}</button></div></div></section>
        ${notesRail()}
      </div>`;
  }

  function signalRadar() {
    return `<section class="panel signal-radar">
      <div class="panel-head"><div><div class="panel-title">${icon("chart")}智能经营雷达</div><div class="panel-meta">跨店铺、商品、众筹、用户、流量和结算自动找出突增、突降、风险与潜力</div></div><span class="value-tag">按预计影响 × 紧急度排序</span></div>
      <div class="signal-summary">
        <span><strong>3</strong> 个 P0 需立即处理</span><span><strong>4</strong> 个增长机会</span><span><strong>¥3,260,420</strong> 待结算</span><span><strong>¥468,000</strong> 可挽回收入</span>
      </div>
      <div class="table-scroll"><table class="data-table signal-table"><thead><tr><th>优先级</th><th>信号</th><th>对象</th><th>关键变化</th><th>预计影响</th><th>建议动作</th><th>负责人</th><th></th></tr></thead><tbody>
        ${D.signals.map((item) => `<tr data-detail-route="${item.route}"><td>${priorityTag(item.priority)}</td><td>${status(item.type)}</td><td class="primary-cell">${esc(item.entity)}</td><td>${esc(item.change)}</td><td>${esc(item.impact)}</td><td class="action-copy">${esc(item.action)}</td><td>${esc(item.owner)}</td><td><button class="action-link" data-route="${item.route}">立即处理</button></td></tr>`).join("")}
      </tbody></table></div>
    </section>`;
  }

  const configs = {
    shops: {
      title: "店铺", desc: "识别高价值、爆发增长、经营风险与待结算店铺", data: () => D.shops, search: "搜索店铺名称、创作者类型、店主或负责人",
      summary: [["近30天 GMV", "¥3,153,740", "↑ 18.6%"], ["平台净收入", "¥2,375,670", "↑ 16.4%"], ["已结算", "¥1,820,160", "本期 5 家"], ["待结算", "¥555,920", "含风险暂缓 ¥102,430"]],
      columns: [["name", "店铺", "primary"], ["creatorCategory", "创作者类型", "status"], ["value", "客户价值", "status"], ["gmv", "GMV", "money"], ["revenueChange", "收入变化", "signedPercent"], ["salesChange", "销量变化", "signedPercent"], ["favorites", "收藏", "integer"], ["conversion", "转化率", "percent"], ["conversionChange", "转化变化", "signedPp"], ["refund", "退款率", "percent"], ["refundDelta", "退款变化", "signedPp"], ["complaintDelta", "客诉变化", "signedInteger"], ["settled", "已结算", "money"], ["pending", "待结算", "money"], ["risk", "风险", "status"], ["manager", "负责人", "text"], ["note", "建议/备注", "text"]]
    },
    memberships: {
      title: "会员方案", desc: "比较各周期与价格层级的拉新、续费和流失表现", data: () => D.memberships, search: "搜索方案或所属店铺",
      summary: [["有效方案", "18,426", "↑ 7.2%"], ["付费会员", "284,736", "↑ 15.7%"], ["30日续费率", "78.6%", "↑ 2.4pp"], ["会员净收入", "¥8,362,480", "↑ 18.1%"]],
      columns: [["name", "方案", "primary"], ["shop", "所属店铺", "text"], ["price", "价格", "money"], ["cycle", "有效期", "text"], ["active", "有效会员", "integer"], ["newCount", "新增会员", "integer"], ["renewal", "续费率", "percent"], ["churn", "流失率", "percent"], ["conversion", "购买转化", "percent"], ["revenue", "净收入", "money"], ["status", "状态", "status"]]
    },
    crowdfunding: {
      title: "众筹", desc: "追踪目标进度、收藏转化、收入突变、交付与失败风险", data: () => D.crowdfunding, search: "搜索众筹项目、店铺或创作分类",
      summary: [["进行中项目", "2,684", "↑ 12.8%"], ["众筹金额", "¥1,409,220", "↑ 28.4%"], ["平均达成率", "89.0%", "↑ 6.8pp"], ["风险项目", "126", "3 个 P0 需处理"]],
      columns: [["name", "众筹项目", "primary"], ["shop", "店铺", "text"], ["category", "分类", "status"], ["goal", "目标", "money"], ["raised", "已筹", "money"], ["progress", "达成率", "percent"], ["supporters", "支持者", "integer"], ["favorites", "收藏", "integer"], ["daysLeft", "剩余天数", "integer"], ["conversion", "收藏/支持转化", "percent"], ["conversionChange", "转化变化", "signedPp"], ["revenueChange", "收入变化", "signedPercent"], ["refund", "退款率", "percent"], ["risk", "信号", "status"], ["manager", "负责人", "text"], ["status", "状态", "status"]]
    },
    products: {
      title: "商品", desc: "发现销量与收入突增、退款升高、库存风险和收藏转化机会", data: () => D.products, search: "搜索商品、店铺、信号或商品编号",
      summary: [["在售商品", "36,284", "↑ 11.3%"], ["爆发增长商品", "284", "收入平均 +48.6%"], ["实体待发货", "312", "需处理"], ["商品净收入", "¥12,840,620", "↑ 16.9%"]],
      columns: [["name", "商品", "primary"], ["shop", "所属店铺", "text"], ["type", "类型", "status"], ["price", "售价", "money"], ["sales", "销量", "integer"], ["salesChange", "销量变化", "signedPercent"], ["revenue", "净收入", "money"], ["revenueChange", "收入变化", "signedPercent"], ["favorites", "收藏", "integer"], ["conversion", "购买转化", "percent"], ["conversionChange", "转化变化", "signedPp"], ["refund", "退款率", "percent"], ["refundDelta", "退款变化", "signedPp"], ["stock", "库存/额度", "text"], ["signal", "经营信号", "status"], ["status", "状态", "status"]]
    },
    users: {
      title: "用户", desc: "按价值评分、消费变化、复购潜力与流失风险指导精细化运营", data: () => D.users, search: "搜索用户昵称、信号或用户编号",
      summary: [["注册用户", "2,846,920", "↑ 12.4%"], ["月活用户", "684,230", "↑ 8.9%"], ["付费用户", "316,842", "↑ 14.7%"], ["高价值客户", "28,614", "↑ 17.2%"]],
      columns: [["name", "用户", "primary"], ["valueScore", "价值评分", "integer"], ["signal", "客户信号", "status"], ["segment", "客户分层", "status"], ["spend", "累计消费", "money"], ["spendChange", "消费变化", "signedPercent"], ["orders", "订单数", "integer"], ["memberships", "会员数", "integer"], ["shops", "消费店铺", "integer"], ["refund", "退款率", "percent"], ["complaint", "客诉", "integer"], ["complaintChange", "客诉变化", "signedInteger"], ["churnRisk", "流失风险", "status"], ["lastActive", "最近活跃", "text"], ["status", "状态", "status"]]
    },
    orders: {
      title: "订单", desc: "追踪会员、数字商品、实体商品与虚拟服务的完整交易链路", data: () => D.orders, search: "搜索订单号、用户、店铺或商品",
      summary: [["支付订单", "22,847", "↑ 12.3%"], ["支付金额", "¥4,286,920", "↑ 17.8%"], ["待发货", "312", "↑ 24 笔"], ["支付成功率", "96.4%", "↑ 0.8pp"]],
      columns: [["id", "订单号", "primary"], ["time", "下单时间", "text"], ["user", "用户", "text"], ["shop", "店铺", "text"], ["item", "商品/方案", "text"], ["type", "订单类型", "status"], ["amount", "订单金额", "money"], ["paid", "实付", "money"], ["payment", "支付方式", "text"], ["status", "状态", "status"], ["risk", "风险", "status"]]
    },
    tickets: {
      title: "客诉工单", desc: "以 SLA、客户价值与影响金额确定处理优先级", data: () => D.tickets, search: "搜索工单号、用户、店铺或问题",
      summary: [["待处理", "86", "↓ 14.2%"], ["即将超 SLA", "17", "需立即处理"], ["今日解决", "142", "↑ 9.6%"], ["满意度", "94.8%", "↑ 1.2pp"]],
      columns: [["id", "工单", "primary"], ["title", "问题", "text"], ["user", "用户", "text"], ["shop", "店铺", "text"], ["type", "类型", "status"], ["channel", "渠道", "text"], ["priority", "优先级", "priority"], ["age", "已等待", "text"], ["sla", "SLA 剩余", "text"], ["amount", "影响金额", "money"], ["owner", "负责人", "text"], ["status", "状态", "status"]]
    }
  };

  function summaryStrip(items) {
    return `<section class="panel summary-grid">${items.map((item) => `<div class="summary-item"><div class="summary-label">${item[0]}</div><div class="summary-value">${item[1]}</div><div class="summary-delta">${item[2]}</div></div>`).join("")}</section>`;
  }

  function renderEntityList(type) {
    const config = configs[type];
    const data = filteredData(config.data(), config.columns);
    return `${pageHeading(config.title, config.desc, `<button class="control" data-action="export" data-export="${type}">${icon("download")}导出</button><button class="primary-button" data-action="create" data-type="${type}">${icon("plus")}新建${config.title}</button>`)}
      ${summaryStrip(config.summary)}
      <section class="panel">
        ${toolbar(config.search, config.data())}
        ${dataTable(data, config.columns, type)}
        ${pagination(data.length, config.data().length)}
      </section>
      ${listInsights(type)}`;
  }

  function toolbar(placeholder, source) {
    const statuses = ["全部状态", ...new Set(source.flatMap((item) => [item.status, item.risk, item.type, item.segment]).filter(Boolean))].slice(0, 9);
    return `<div class="toolbar"><label class="search">${icon("search")}<input data-filter-search value="${esc(state.filter)}" placeholder="${esc(placeholder)}"></label><select data-filter-status>${statuses.map((item) => `<option ${state.status === item ? "selected" : ""}>${esc(item)}</option>`).join("")}</select><button class="control" data-action="more-filter">${icon("filter")}更多筛选</button><span class="toolbar-spacer"></span><span class="result-count">已显示 ${filteredData(source).length} 条</span></div>`;
  }

  function filteredData(source, columns) {
    const query = state.filter.trim().toLowerCase();
    let data = source.filter((item) => {
      const matchesQuery = !query || Object.values(item).join(" ").toLowerCase().includes(query);
      const matchesStatus = state.status === "全部状态" || Object.values(item).some((value) => String(value) === state.status);
      return matchesQuery && matchesStatus;
    });
    if (state.sortKey) {
      const direction = state.sortDirection === "asc" ? 1 : -1;
      data = [...data].sort((a, b) => (a[state.sortKey] > b[state.sortKey] ? 1 : a[state.sortKey] < b[state.sortKey] ? -1 : 0) * direction);
    }
    return data;
  }

  function formatCell(item, column) {
    const [key, , kind] = column;
    const value = item[key];
    if (kind === "money") return `<span class="number">${money.format(value)}</span>`;
    if (kind === "integer") return `<span class="number">${integer.format(value)}</span>`;
    if (kind === "percent") return `<span class="number">${Number(value).toFixed(1)}%</span>`;
    if (kind === "signedPercent") return `<span class="metric-change ${Number(value) < 0 ? "down" : "up"}">${Number(value) >= 0 ? "+" : ""}${Number(value).toFixed(1)}%</span>`;
    if (kind === "signedPp") return `<span class="metric-change ${Number(value) > 0 ? "down" : "up"}">${Number(value) >= 0 ? "+" : ""}${Number(value).toFixed(1)}pp</span>`;
    if (kind === "signedInteger") return `<span class="metric-change ${Number(value) > 0 ? "down" : "up"}">${Number(value) >= 0 ? "+" : ""}${integer.format(value)}</span>`;
    if (kind === "status") return status(value);
    if (kind === "priority") return priorityTag(value);
    if (kind === "primary") return `<span class="primary-cell">${esc(value)}</span>${key !== "id" ? `<span class="secondary-cell">${esc(item.id)}</span>` : ""}`;
    return esc(value);
  }

  function dataTable(data, columns, type) {
    if (!data.length) return `<div class="empty-state">${icon("search")}<h3>没有匹配的数据</h3><p>调整搜索词或筛选条件后重试。</p></div>`;
    return `<div class="table-scroll"><table class="data-table"><thead><tr>${columns.map((column) => `<th><button class="sortable" data-sort="${column[0]}">${column[1]} ${state.sortKey === column[0] ? (state.sortDirection === "asc" ? "↑" : "↓") : "↕"}</button></th>`).join("")}</tr></thead><tbody>${data.map((item) => `<tr data-detail-route="${type}/${encodeURIComponent(item.id)}">${columns.map((column) => `<td>${formatCell(item, column)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }

  function pagination(showing, total) {
    return `<div class="pagination"><span>显示 ${showing} / ${total} 条</span><div class="pages"><button class="active">1</button><button>2</button><button>3</button><button>…</button><button>${icon("chevron")}</button></div></div>`;
  }

  function listInsights(type) {
    const insights = {
      shops: [["高价值店铺", "近30天贡献平台净收入的 54.8%", "1,286 家"], ["增长机会", "184 家店铺流量增长但转化落后", "预计 +¥620万"], ["经营风险", "23 家高价值店铺连续两周下滑", "需跟进"]],
      memberships: [["最优周期", "90天方案续费与客单价综合表现最好", "续费 83.7%"], ["即将到期", "未来7天到期会员需要触达", "1,243 人"], ["高流失方案", "28 个方案流失率高于同类均值", "需优化"]],
      crowdfunding: [["爆发项目", "3D 打印图纸收入增长 82.1%，已超目标", "建议加曝光"], ["失败风险", "Minecraft 模组仅完成 24.3% 且收入下滑", "P0"], ["收藏待转化", "模拟人生4模组收藏 7,840，截止仅剩6天", "可触达"]],
      products: [["数字商品", "收入增速高于实体商品 8.6pp", "增长最快"], ["发货积压", "实体订单超时主要集中在 9 家店铺", "312 笔"], ["库存机会", "56 个高转化商品库存不足", "预计影响 ¥48万"]],
      users: [["高价值客户", "客均消费 ¥8,642，复购率 76.2%", "28,614 人"], ["流失风险", "45天未活跃且曾付费的用户", "18,420 人"], ["退款风险", "近30天退款率高于 20%", "1,104 人"]],
      orders: [["支付失败", "主要集中在 21:00–23:00 与微信支付", "需排查"], ["履约压力", "实体订单平均发货时长上升 6.4 小时", "312 待发"], ["客单增长", "会员年卡与虚拟服务带动客单价", "↑ 11.8%"]],
      tickets: [["首响效率", "P0 工单平均首响时间 6 分钟", "达标"], ["集中问题", "物流延迟占本周客诉的 32.4%", "需联动运营"], ["高价值客诉", "高价值客户未结工单", "8 件"]]
    }[type] || [];
    return `<div class="insight-layout"><section class="panel"><div class="panel-head"><div class="panel-title">趋势分析</div><span class="panel-meta">${dates[state.dateIndex]}</span></div><div class="chart-wrap">${lineChart(D.dashboard.trend.map((value, i) => value * (.72 + (i % 5) * .03)), pageTitle(type))}</div></section><section class="panel"><div class="panel-head"><div class="panel-title">分析建议</div></div><div class="insight-list">${insights.map((item, index) => `<div class="insight-item"><span class="insight-index">${index + 1}</span><span><strong>${item[0]}</strong><small>${item[1]}</small></span><span class="value-tag">${item[2]}</span></div>`).join("")}</div></section></div>`;
  }

  function shopTable(data, compact) {
    const compactKeys = ["name", "value", "gmv", "revenueChange", "favorites", "conversion", "conversionChange", "refund", "pending", "risk", "manager", "note"];
    const columns = configs.shops.columns.filter((column) => !compact || compactKeys.includes(column[0]));
    return dataTable(data, columns, "shops");
  }

  function renderFinance() {
    const columns = [["id", "单号", "primary"], ["kind", "类型", "status"], ["related", "关联订单/账期", "text"], ["shop", "店铺", "text"], ["amount", "金额", "money"], ["fee", "手续费", "money"], ["reason", "原因/说明", "text"], ["requested", "发起时间", "text"], ["owner", "负责人", "text"], ["status", "状态", "status"]];
    const data = filteredData(D.finance, columns);
    return `${pageHeading("退款与结算", "统一复核退款申请、风险暂缓与店铺结算", `<button class="control" data-action="export" data-export="finance">${icon("download")}导出账单</button><button class="primary-button" data-action="batch-finance">批量复核</button>`)}
      ${summaryStrip([["待审核退款", "14", "¥28,642"], ["待结算金额", "¥8,426,910", "126 家店铺"], ["暂缓结算", "¥386,420", "6 个风险店铺"], ["本月退款率", "2.48%", "↓ 0.35pp"]])}
      <section class="panel">${toolbar("搜索退款单、账期或店铺", D.finance)}${dataTable(data, columns, "finance")}${pagination(data.length, D.finance.length)}</section>
      ${listInsights("finance")}`;
  }

  function renderTraffic() {
    const columns = [["title", "页面", "primary"], ["path", "路径", "text"], ["type", "页面类型", "status"], ["shop", "所属店铺", "text"], ["source", "主要来源", "status"], ["region", "核心地区", "text"], ["uv", "访问人数", "integer"], ["duration", "平均时长", "text"], ["favorites", "收藏", "integer"], ["bounce", "跳出率", "percent"], ["conversion", "购买转化", "percent"], ["conversionChange", "转化变化", "signedPp"], ["revenue", "归因收入", "money"]];
    const data = filteredData(D.pages, columns);
    return `${pageHeading("流量与页面", "按来源、地区和关键转化目标定位增长与流失环节", `<button class="control" data-action="export" data-export="pages">${icon("download")}导出明细</button><button class="primary-button" data-action="create-report">创建分析任务</button>`)}
      ${summaryStrip([["访问人数", "1,286,420", "↑ 16.8%"], ["普通用户注册", "8.42%", "↑ 0.76pp"], ["成为店铺商家", "6.58%", "↑ 1.12pp"], ["购买下单", "9.45%", "↓ 0.38pp"]])}
      <section class="panel traffic-alerts"><div class="panel-head"><div class="panel-title">${icon("alert")}本期最值得处理的转化信号</div><span class="panel-meta">已按影响用户数排序</span></div><div class="traffic-alert-grid">
        <div><strong>P0 · 购买支付</strong><span>支付成功率下降 0.38pp，预计影响 184 单</span><button class="action-link" data-action="create-report">检查支付失败来源</button></div>
        <div><strong>P1 · 小红书来源</strong><span>访问 +36%，购买转化却下降 1.4pp</span><button class="action-link" data-action="create-report">检查落地页匹配</button></div>
        <div><strong>P1 · 湖北地区</strong><span>访问 -8.4%，购买转化仅 2.8%</span><button class="action-link" data-action="create-report">创建地区召回</button></div>
        <div><strong>P2 · 四川商家</strong><span>商家注册转化升至 6.8%，适合加大招募</span><button class="action-link" data-action="create-report">复制招募策略</button></div>
      </div></section>
      <div class="funnel-grid">${D.funnels.map((funnel) => funnelPanel(funnel)).join("")}</div>
      <div class="traffic-split">
        <section class="panel"><div class="panel-head"><div class="panel-title">${icon("link")}来源分析</div><span class="panel-meta">比较流量规模与三类转化</span></div>${trafficDimensionTable(D.trafficSources, "source")}</section>
        <section class="panel"><div class="panel-head"><div class="panel-title">${icon("chart")}地区分析</div><span class="panel-meta">定位高价值与低转化区域</span></div>${trafficDimensionTable(D.regions, "region")}</section>
      </div>
      <section class="panel"><div class="panel-head"><div class="panel-title">${icon("chart")}访问、注册与购买趋势</div><span class="panel-meta">${dates[state.dateIndex]}</span></div><div class="chart-wrap">${lineChart(D.dashboard.trend.map((v, i) => v * (5.2 + (i % 4) * .12)), "流量")}</div></section>
      <section class="panel page-performance">${toolbar("搜索页面标题、来源、地区、路径或店铺", D.pages)}${dataTable(data, columns, "traffic")}${pagination(data.length, D.pages.length)}</section>`;
  }

  function funnelPanel(funnel) {
    const max = funnel.steps[0][1];
    return `<section class="panel funnel-panel"><div class="panel-head"><div class="panel-title">${funnel.name}</div><span class="metric-change ${funnel.change < 0 ? "down" : "up"}">${funnel.change >= 0 ? "+" : ""}${funnel.change}pp</span></div><div class="funnel-rate"><strong>${funnel.rate}%</strong><span>总体转化率</span></div><div class="funnel-steps">${funnel.steps.map((step, index) => `<div class="funnel-step"><span>${step[0]}</span><div><i style="width:${Math.max(18, step[1] / max * 100)}%"></i></div><strong>${integer.format(step[1])}</strong>${index ? `<small>${(step[1] / funnel.steps[index - 1][1] * 100).toFixed(1)}%</small>` : ""}</div>`).join("")}</div></section>`;
  }

  function trafficDimensionTable(items, kind) {
    return `<div class="table-scroll"><table class="data-table dimension-table"><thead><tr><th>${kind === "source" ? "来源" : "地区"}</th><th>访问人数</th><th>访问变化</th><th>用户注册</th><th>商家转化</th><th>购买转化</th>${kind === "region" ? "<th>归因收入</th>" : ""}<th>判断</th></tr></thead><tbody>${items.map((item) => `<tr><td class="primary-cell">${item.name}</td><td>${integer.format(item.visitors)}</td><td><span class="metric-change ${item.change < 0 ? "down" : "up"}">${item.change >= 0 ? "+" : ""}${item.change}%</span></td><td>${item.register}%</td><td>${item.merchant}%</td><td>${item.purchase}%</td>${kind === "region" ? `<td>${money.format(item.revenue)}</td>` : ""}<td>${status(item.signal)}</td></tr>`).join("")}</tbody></table></div>`;
  }

  function renderReports() {
    return `${pageHeading("分析报告", "沉淀日常经营、客户价值与风险判断", `<button class="control" data-action="report-template">报告模板</button><button class="primary-button" data-action="create-report">${icon("plus")}新建报告</button>`)}
      ${summaryStrip([["本月报告", "28", "6 份自动生成"], ["待审阅", "4", "平均 1.6 天"], ["订阅人数", "86", "↑ 12 人"], ["自动发送", "12", "全部正常"]])}
      <div class="report-grid">${D.reports.map((report) => `<article class="panel report-card" data-action="open-report" data-id="${report.id}"><div>${status(report.status)}<h3>${esc(report.name)}</h3><p>${esc(report.range)} · 面向 ${esc(report.recipients)}</p></div><div class="report-card-foot"><span>负责人：${esc(report.owner)} · ${esc(report.updated)}</span><span>${icon("external")} 查看报告</span></div></article>`).join("")}</div>`;
  }

  function allNotes() {
    let local = [];
    try { local = JSON.parse(localStorage.getItem("platform-admin-notes") || "[]"); } catch (_) { local = []; }
    return [...local, ...D.notes];
  }

  function notesRail(target) {
    const notes = allNotes().filter((note) => !target || note.target === target).slice(0, 4);
    return `<aside class="panel notes-rail"><div class="panel-head"><div class="panel-title">团队备注</div><button class="icon-button" data-action="add-note" data-target="${esc(target || "平台经营")}" aria-label="添加备注">${icon("plus")}</button></div><div class="note-list">${notes.length ? notes.map((note) => `<div class="note-row"><div class="note-meta"><span>${esc(note.time)}</span><strong>${esc(note.author)}</strong><span>${esc(note.target)}</span></div><p>${esc(note.content)}</p></div>`).join("") : `<div class="empty-state"><p>暂无相关备注</p></div>`}</div><div class="panel-head"><button class="action-link" data-action="add-note" data-target="${esc(target || "平台经营")}">${icon("plus")} 添加备注</button></div></aside>`;
  }

  function renderNotes() {
    const notes = allNotes();
    return `${pageHeading("标注与备注", "集中回顾团队对店铺、订单、客诉与分析结果的判断", `<button class="primary-button" data-action="add-note" data-target="平台经营">${icon("plus")}添加备注</button>`)}
      <div class="notes-page-grid"><section class="panel"><div class="toolbar"><label class="search">${icon("search")}<input data-filter-search placeholder="搜索备注内容或关联对象"></label><select><option>全部类型</option><option>店铺</option><option>订单</option><option>客诉</option><option>分析</option></select><span class="toolbar-spacer"></span><span class="result-count">${notes.length} 条备注</span></div>${notes.filter((note) => !state.filter || Object.values(note).join(" ").includes(state.filter)).map((note) => `<article class="note-card"><div class="note-card-head">${status(note.type)}<strong>${esc(note.target)}</strong>${note.pinned ? `<span class="value-tag">置顶</span>` : ""}<time>${esc(note.time)} · ${esc(note.author)}</time></div><p>${esc(note.content)}</p></article>`).join("")}</section><aside class="panel"><div class="panel-head"><div class="panel-title">备注统计</div></div><div class="insight-list">${[["店铺跟进", "32 条", "本周 +8"], ["客诉协作", "18 条", "待回顾 4"], ["风险判断", "12 条", "已解决 7"], ["经营分析", "26 条", "置顶 3"]].map((item, i) => `<div class="insight-item"><span class="insight-index">${i + 1}</span><span><strong>${item[0]}</strong><small>${item[2]}</small></span><span class="value-tag">${item[1]}</span></div>`).join("")}</div></aside></div>`;
  }

  function renderSettings() {
    const sections = [
      ["工作台与通知", [["P0 任务实时提醒", "当退款、客诉、发货或店铺异常达到 P0 时通知负责人", true], ["每日经营摘要", "每天 09:00 向平台运营推送关键指标与待办", true], ["异常趋势自动标注", "在趋势图中标注超出历史区间的异常点", true]]],
      ["数据口径", [["收入默认使用净收入口径", "支付金额扣除退款与平台承担优惠，不扣除待结算手续费", true], ["转化率按 UV 计算", "购买用户数 / 商品或方案页访问用户数", true], ["过滤内部访问", "排除平台员工与店铺主预览产生的访问事件", true]]],
      ["权限与审计", [["敏感金额二次确认", "大额退款、手动结算和冻结店铺需要再次确认", true], ["导出数据添加水印", "导出的 CSV 和报告记录操作人及时间", true], ["详情页展示完整联系方式", "仅客服主管和风控岗位可见", false]]]
    ];
    return `${pageHeading("系统设置", "配置岗位视图、指标口径、通知和敏感操作规则", `<button class="primary-button" data-action="save-settings">保存设置</button>`)}${sections.map((section) => `<section class="panel settings-section"><div class="panel-head"><div class="panel-title">${section[0]}</div></div>${section[1].map((row, i) => `<div class="settings-row"><div class="settings-copy"><strong>${row[0]}</strong><span>${row[1]}</span></div><button class="toggle ${row[2] ? "on" : ""}" data-action="toggle-setting" aria-label="切换${row[0]}"></button></div>`).join("")}</section>`).join("")}`;
  }

  function entitySource(type) {
    return ({ shops: D.shops, memberships: D.memberships, crowdfunding: D.crowdfunding, products: D.products, users: D.users, orders: D.orders, finance: D.finance, tickets: D.tickets, traffic: D.pages })[type] || [];
  }

  function renderDetail(type, id) {
    const item = entitySource(type).find((entry) => String(entry.id) === decodeURIComponent(id));
    if (!item) return `${pageHeading("未找到记录", "该记录可能已被删除或编号不正确")}<section class="panel empty-state">${icon("alert")}<h3>记录不存在</h3><p><a href="#/${type}" class="action-link">返回${pageTitle(type)}列表</a></p></section>`;
    const title = item.name || item.title || item.id;
    const subtitle = [item.id, item.shop, item.owner, item.type].filter(Boolean).join(" · ");
    const facts = detailFacts(type, item);
    const entries = Object.entries(item).filter(([key]) => !["name", "title", "emoji"].includes(key)).slice(0, 18);
    return `<section class="panel detail-hero"><div class="detail-top"><div class="detail-avatar">${esc(String(title).slice(0, 1))}</div><div class="detail-title"><h1>${esc(title)}</h1><p>${esc(subtitle)}</p></div><div class="detail-actions"><a class="control" href="#/${type}">${icon("arrowLeft")}返回列表</a><button class="ghost-button" data-action="add-note" data-target="${esc(title)}">${icon("note")}添加备注</button><button class="primary-button" data-action="detail-primary" data-type="${type}">${detailActionLabel(type)}</button></div></div><div class="detail-facts">${facts.map((fact) => `<div class="detail-fact"><label>${fact[0]}</label><strong>${fact[1]}</strong></div>`).join("")}</div></section>
      <div class="detail-flat-grid">
        <section class="panel"><div class="panel-head"><div class="panel-title">${icon("report")}基本信息</div><button class="action-link" data-action="edit-detail">编辑信息</button></div><dl class="definition-list">${entries.map(([key, value]) => `<div class="definition"><dt>${fieldLabel(key)}</dt><dd>${typeof value === "number" && ["gmv", "net", "revenue", "amount", "paid", "price", "spend", "fee", "goal", "raised", "settled", "pending"].includes(key) ? money.format(value) : esc(value)}</dd></div>`).join("")}</dl></section>
        <section class="panel"><div class="panel-head"><div class="panel-title">${icon("alert")}系统判断与建议</div><span class="panel-meta">按重要程度排序</span></div><div class="insight-list">${detailInsights(type).map((insight, i) => `<div class="insight-item"><span class="insight-index">${i + 1}</span><span><strong>${insight[0]}</strong><small>${insight[1]}</small></span><span class="value-tag">${insight[2]}</span></div>`).join("")}</div></section>
      </div>
      <section class="panel detail-trend"><div class="panel-head"><div class="panel-title">${icon("chart")}近30天经营趋势</div><span class="panel-meta">收入、销量、收藏、转化、退款与客诉变化已合并展示</span></div><div class="chart-wrap">${lineChart(D.dashboard.trend.map((v, i) => v * (.68 + (i % 6) * .04)), title)}</div></section>
      <div class="detail-grid"><section class="panel"><div class="panel-head"><div class="panel-title">${icon("clock")}关联记录与下一步</div></div><div class="activity">${["负责人已查看异常信号并生成处理任务", "系统检测到关键指标相对上期发生变化", "关联订单、支付与结算事实已完成同步", "客户或店铺提交了补充材料", "记录进入持续观察队列"].map((text, i) => `<div class="activity-row"><strong>${text}</strong><span>2025-05-${26 - i} ${10 + i}:2${i} · ${["张运营", "系统", "王磊", "赵宇", "系统"][i]}</span></div>`).join("")}</div></section>${notesRail(title)}</div>`;
  }

  function detailFacts(type, item) {
    const maps = {
      shops: [["客户分层", status(item.value)], ["近30天 GMV", money.format(item.gmv)], ["收入变化", `${item.revenueChange >= 0 ? "+" : ""}${item.revenueChange}%`], ["收藏数", integer.format(item.favorites)], ["已结算", money.format(item.settled)], ["待结算", money.format(item.pending)]],
      memberships: [["状态", status(item.status)], ["价格", money.format(item.price)], ["有效期", item.cycle], ["有效会员", integer.format(item.active)], ["续费率", `${item.renewal}%`], ["流失率", `${item.churn}%`]],
      crowdfunding: [["状态", status(item.status)], ["已筹金额", money.format(item.raised)], ["目标达成", `${item.progress}%`], ["支持者", integer.format(item.supporters)], ["收藏数", integer.format(item.favorites)], ["剩余时间", `${item.daysLeft} 天`]],
      products: [["状态", status(item.status)], ["类型", item.type], ["售价", money.format(item.price)], ["销量变化", `${item.salesChange >= 0 ? "+" : ""}${item.salesChange}%`], ["收藏数", integer.format(item.favorites)], ["退款变化", `${item.refundDelta >= 0 ? "+" : ""}${item.refundDelta}pp`]],
      users: [["客户分层", status(item.segment)], ["价值评分", item.valueScore], ["消费变化", `${item.spendChange >= 0 ? "+" : ""}${item.spendChange}%`], ["流失风险", status(item.churnRisk)], ["退款率", `${item.refund}%`], ["最近活跃", item.lastActive]],
      orders: [["状态", status(item.status)], ["订单类型", item.type], ["订单金额", money.format(item.amount)], ["实付金额", money.format(item.paid)], ["支付方式", item.payment], ["风险", status(item.risk)]],
      finance: [["状态", status(item.status)], ["类型", item.kind], ["金额", money.format(item.amount)], ["手续费", money.format(item.fee)], ["关联单号", item.related], ["负责人", item.owner]],
      tickets: [["状态", status(item.status)], ["优先级", priorityTag(item.priority)], ["影响金额", money.format(item.amount)], ["已等待", item.age], ["SLA 剩余", item.sla], ["负责人", item.owner]],
      traffic: [["页面类型", status(item.type)], ["访问人数", integer.format(item.uv)], ["访问次数", integer.format(item.pv)], ["平均时长", item.duration], ["购买转化", `${item.conversion}%`], ["归因收入", money.format(item.revenue)]]
    };
    return maps[type] || [];
  }

  function detailActionLabel(type) {
    return ({ shops: "创建店铺跟进", memberships: "触达到期会员", crowdfunding: "创建众筹运营任务", products: "创建商品优化任务", users: "创建用户运营任务", orders: "处理订单", finance: "复核申请", tickets: "更新工单", traffic: "创建页面分析" })[type] || "处理";
  }

  function detailTabContent(type, item, title) {
    if (state.detailTab === "analysis") return `<div class="detail-grid"><section class="panel"><div class="panel-head"><div class="panel-title">近30天趋势</div><span class="panel-meta">与上期对比</span></div><div class="chart-wrap">${lineChart(D.dashboard.trend.map((v, i) => v * (.68 + (i % 6) * .04)), title)}</div></section><section class="panel"><div class="panel-head"><div class="panel-title">系统分析</div></div><div class="insight-list">${detailInsights(type).map((insight, i) => `<div class="insight-item"><span class="insight-index">${i + 1}</span><span><strong>${insight[0]}</strong><small>${insight[1]}</small></span><span class="value-tag">${insight[2]}</span></div>`).join("")}</div></section></div>`;
    if (state.detailTab === "activity") return `<div class="detail-grid"><section class="panel"><div class="panel-head"><div class="panel-title">关联记录</div></div><div class="activity">${["负责人已查看并更新处理状态", "系统检测到关键指标发生变化", "关联订单与支付事实已完成同步", "客户或店铺提交了补充材料", "记录创建并进入平台处理队列"].map((text, i) => `<div class="activity-row"><strong>${text}</strong><span>2025-05-${26 - i} ${10 + i}:2${i} · ${["张运营", "系统", "王磊", "赵宇", "系统"][i]}</span></div>`).join("")}</div></section>${notesRail(title)}</div>`;
    if (state.detailTab === "notes") return `<div class="detail-grid"><section class="panel"><div class="panel-head"><div class="panel-title">全部标注与备注</div><button class="primary-button" data-action="add-note" data-target="${esc(title)}">${icon("plus")}添加备注</button></div><div class="note-list">${allNotes().filter((note) => note.target === title).map((note) => `<div class="note-row"><div class="note-meta"><span>${note.time}</span><strong>${note.author}</strong></div><p>${esc(note.content)}</p></div>`).join("") || `<div class="empty-state"><p>暂无备注，添加第一条团队判断。</p></div>`}</div></section><section class="panel"><div class="panel-head"><div class="panel-title">备注原则</div></div><div class="insight-list">${[["记录判断依据", "写明数据、反馈或沟通事实"], ["区分事实与推断", "不确定内容明确标注待验证"], ["给出下一步", "添加负责人和建议复核时间"]].map((x, i) => `<div class="insight-item"><span class="insight-index">${i + 1}</span><span><strong>${x[0]}</strong><small>${x[1]}</small></span></div>`).join("")}</div></section></div>`;
    const entries = Object.entries(item).filter(([key]) => !["name", "title"].includes(key)).slice(0, 12);
    return `<div class="detail-grid"><section class="panel"><div class="panel-head"><div class="panel-title">基本信息</div><button class="action-link" data-action="edit-detail">编辑信息</button></div><dl class="definition-list">${entries.map(([key, value]) => `<div class="definition"><dt>${fieldLabel(key)}</dt><dd>${typeof value === "number" && ["gmv", "net", "revenue", "amount", "paid", "price", "spend", "fee"].includes(key) ? money.format(value) : esc(value)}</dd></div>`).join("")}</dl></section>${notesRail(title)}</div>`;
  }

  function fieldLabel(key) {
    return ({ id: "编号", owner: "店主/负责人", value: "客户分层", gmv: "GMV", net: "净收入", members: "会员数", conversion: "转化率", refund: "退款率", complaints: "客诉数", risk: "风险", manager: "平台负责人", status: "状态", joined: "加入时间", category: "类目", creatorCategory: "创作者类型", region: "地区", source: "主要来源", note: "最近备注", shop: "所属店铺", price: "价格", cycle: "有效期", active: "有效会员", newCount: "新增会员", renewal: "续费率", revenue: "收入", revenueChange: "收入变化", salesChange: "销量变化", conversionChange: "转化变化", favorites: "收藏数", settled: "已结算", pending: "待结算", refundDelta: "退款变化", complaintDelta: "客诉变化", churn: "流失率", type: "类型", sales: "销量", stock: "库存", signal: "经营信号", segment: "客户分层", valueScore: "价值评分", spend: "累计消费", spendChange: "消费变化", churnRisk: "流失风险", orders: "订单数", memberships: "会员数", lastActive: "最近活跃", goal: "众筹目标", raised: "已筹金额", progress: "达成率", supporters: "支持者", daysLeft: "剩余天数", time: "时间", user: "用户", item: "商品/方案", amount: "金额", paid: "实付", payment: "支付方式", kind: "类型", related: "关联记录", fee: "手续费", reason: "原因", requested: "发起时间", channel: "渠道", priority: "优先级", age: "已等待", sla: "SLA", path: "页面路径", uv: "访问人数", pv: "访问次数", duration: "平均时长", bounce: "跳出率" })[key] || key;
  }

  function detailInsights(type) {
    return ({ shops: [["收入与销量", "收入和销量相对上期的变化已进入监控", "持续观察"], ["结算建议", "待结算金额需结合退款与客诉风险复核", "财务联动"], ["收藏机会", "高收藏低转化内容可定向触达", "可增长"], ["客户价值", "综合 GMV、会员、留存和服务成本评分", "动态分层"]], memberships: [["续费表现", "高于同周期方案均值", "+6.2pp"], ["到期风险", "7天内到期会员占比", "12.4%"], ["价格机会", "相邻价位转化仍有空间", "可测试"]], crowdfunding: [["目标进度", "结合剩余天数判断成功或失败风险", "每日更新"], ["收藏转化", "收藏用户是截止前最优先触达人群", "高潜人群"], ["交付容量", "超额项目需提前核查承诺与交付能力", "风险防控"], ["来源优化", "比较来源渠道与地区的支持转化", "可增长"]], products: [["销量与收入", "突增商品优先获得曝光，突降商品排查来源", "自动识别"], ["退款原因", "退款升高时联动商品描述和客诉", "需优化"], ["收藏机会", "高收藏低购买商品适合限时提醒", "可触达"], ["履约能力", "实体库存与发货时长共同决定推荐强度", "风险防控"]], users: [["客户价值", "综合消费、复购、跨店和服务成本评分", "动态评分"], ["流失判断", "消费下降和活跃间隔共同识别流失风险", "需召回"], ["潜力识别", "新客、会员偏好和收藏行为用于预测潜力", "可培育"], ["风险控制", "退款与客诉显著升高时进入人工复核", "防损失"]], orders: [["支付链路", "支付回调与到账一致", "正常"], ["履约状态", "当前节点未超平台时限", "正常"], ["风险校验", "设备与支付账户一致", "低风险"]], finance: [["金额影响", "占店铺本期结算比例", "3.8%"], ["历史表现", "近90天同类申请通过率", "84%"], ["审核建议", "核对材料后人工复核", "需处理"]], tickets: [["客户价值", "用户属于稳定复购客群", "较高"], ["问题集中度", "同店铺近7天相似工单", "12 件"], ["处理建议", "优先给出明确履约时间", "P0"]], traffic: [["流量质量", "访问时长高于同类页面", "+18秒"], ["转化表现", "购买转化高于平台均值", "+1.2pp"], ["来源机会", "站内推荐贡献增长", "+16.4%"]] })[type] || [];
  }

  function openModal(title, body, submitLabel, submitAction) {
    overlay.innerHTML = `<div class="backdrop" data-action="close-modal"></div><section class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modal-head"><h2>${esc(title)}</h2><button class="icon-button" data-action="close-modal" aria-label="关闭">${icon("close")}</button></div><div class="modal-body">${body}</div><div class="modal-foot"><button class="control" data-action="close-modal">取消</button><button class="primary-button" data-action="${submitAction}">${esc(submitLabel)}</button></div></section>`;
    setTimeout(() => overlay.querySelector("input, textarea, select")?.focus(), 10);
  }

  function addNoteModal(target) {
    openModal("添加团队备注", `<div class="field"><label>关联对象</label><input id="note-target" value="${esc(target || "平台经营")}"></div><div class="field"><label>备注类型</label><select id="note-type"><option>店铺</option><option>订单</option><option>客诉</option><option>分析</option><option>跟进</option></select></div><div class="field"><label>备注内容</label><textarea id="note-content" placeholder="记录事实、判断依据和建议的下一步…"></textarea></div>`, "保存备注", "save-note");
  }

  function globalSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) return;
    const collections = [["店铺", "shops", D.shops], ["会员方案", "memberships", D.memberships], ["众筹", "crowdfunding", D.crowdfunding], ["商品", "products", D.products], ["用户", "users", D.users], ["订单", "orders", D.orders], ["客诉", "tickets", D.tickets]];
    const results = collections.flatMap(([label, route, data]) => data.filter((item) => Object.values(item).join(" ").toLowerCase().includes(q)).slice(0, 3).map((item) => ({ label, route, item })));
    openModal(`搜索“${query}”`, results.length ? `<div class="insight-list">${results.map((result, index) => `<button class="insight-item" style="width:100%;border:0;background:white;text-align:left;cursor:pointer" data-detail-route="${result.route}/${encodeURIComponent(result.item.id)}"><span class="insight-index">${index + 1}</span><span><strong>${esc(result.item.name || result.item.title || result.item.id)}</strong><small>${result.label} · ${esc(result.item.shop || result.item.owner || result.item.user || result.item.id)}</small></span>${icon("chevron")}</button>`).join("")}</div>` : `<div class="empty-state">${icon("search")}<h3>没有找到结果</h3><p>尝试输入店铺、订单号、用户名或商品名称。</p></div>`, "关闭", "close-modal");
  }

  function toast(message) {
    clearTimeout(state.toastTimer);
    document.querySelector(".toast")?.remove();
    const node = document.createElement("div");
    node.className = "toast";
    node.innerHTML = `${icon("check")}<span>${esc(message)}</span>`;
    document.body.appendChild(node);
    state.toastTimer = setTimeout(() => node.remove(), 2600);
  }

  function exportCsv(type) {
    const source = ({ shops: D.shops, memberships: D.memberships, crowdfunding: D.crowdfunding, products: D.products, users: D.users, orders: D.orders, finance: D.finance, pages: D.pages })[type] || [];
    if (!source.length) return toast("当前列表没有可导出的数据");
    const keys = Object.keys(source[0]);
    const csv = [keys.join(","), ...source.map((item) => keys.map((key) => `"${String(item[key] ?? "").replaceAll('"', '""')}"`).join(","))].join("\n");
    const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${type}-2025-05-26.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    toast("CSV 已生成并开始下载");
  }

  function resetListState() {
    state.filter = "";
    state.status = "全部状态";
    state.sortKey = "";
    state.detailTab = "overview";
  }

  function render() {
    app.innerHTML = shell();
    document.title = `${pageTitle(currentRoute().name)} · 平台管理后台`;
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action], [data-route], [data-detail-route], [data-trend], [data-sort], [data-detail-tab]");
    if (!target) return;

    if (target.dataset.route) {
      location.hash = `#/${target.dataset.route}`;
      return;
    }
    if (target.dataset.detailRoute) {
      overlay.innerHTML = "";
      location.hash = `#/${target.dataset.detailRoute}`;
      return;
    }
    if (target.dataset.trend) {
      state.trendMetric = target.dataset.trend;
      render();
      return;
    }
    if (target.dataset.sort) {
      state.sortDirection = state.sortKey === target.dataset.sort && state.sortDirection === "desc" ? "asc" : "desc";
      state.sortKey = target.dataset.sort;
      render();
      return;
    }
    if (target.dataset.detailTab) {
      state.detailTab = target.dataset.detailTab;
      render();
      return;
    }

    const action = target.dataset.action;
    if (action === "toggle-sidebar") document.body.classList.toggle("sidebar-open");
    if (action === "collapse-sidebar") toast("桌面端固定导航已保留，移动端会自动收起");
    if (action === "cycle-date") { state.dateIndex = (state.dateIndex + 1) % dates.length; render(); }
    if (action === "cycle-role") { state.roleIndex = (state.roleIndex + 1) % roles.length; render(); toast(`已切换为${roles[state.roleIndex]}`); }
    if (action === "notify") openModal("待处理通知", `<div class="insight-list">${D.dashboard.priorities[0].items.map((item, i) => `<div class="insight-item"><span class="insight-index">${i + 1}</span><span><strong>${item[0]}</strong><small>${item[1]} · 已等待 ${item[2]}</small></span>${priorityTag("P0")}</div>`).join("")}</div>`, "查看工作台", "go-dashboard");
    if (action === "refresh") { target.classList.add("loading"); setTimeout(() => toast("数据已更新至 2025-05-26 10:30"), 450); }
    if (action === "export") exportCsv(target.dataset.export);
    if (action === "add-note") addNoteModal(target.dataset.target);
    if (action === "close-modal") overlay.innerHTML = "";
    if (action === "save-note") {
      const targetName = document.getElementById("note-target")?.value.trim();
      const content = document.getElementById("note-content")?.value.trim();
      if (!content) return toast("请先填写备注内容");
      let local = [];
      try { local = JSON.parse(localStorage.getItem("platform-admin-notes") || "[]"); } catch (_) { local = []; }
      local.unshift({ id: `N-${Date.now()}`, target: targetName || "平台经营", type: document.getElementById("note-type")?.value || "跟进", author: "张运营", time: "刚刚", content, pinned: false });
      localStorage.setItem("platform-admin-notes", JSON.stringify(local));
      overlay.innerHTML = "";
      render();
      toast("备注已保存到本机浏览器");
    }
    if (action === "go-dashboard") { overlay.innerHTML = ""; location.hash = "#/dashboard"; }
    if (["create", "create-report", "report-template", "batch-finance", "more-filter", "edit-detail"].includes(action)) openModal("原型操作", `<div class="empty-state">${icon("check")}<h3>交互入口已就绪</h3><p>当前为产品原型，该操作会在接入真实接口后提交。</p></div>`, "知道了", "close-modal");
    if (action === "detail-primary") toast(`${detailActionLabel(target.dataset.type)}任务已加入你的待办`);
    if (action === "open-report") openModal("报告预览", `<div class="summary-grid" style="grid-template-columns:repeat(2,1fr)"><div class="summary-item"><div class="summary-label">平台净收入</div><div class="summary-value">¥3,256,893</div><div class="summary-delta">↑ 18.6%</div></div><div class="summary-item"><div class="summary-label">购买转化</div><div class="summary-value">3.62%</div><div class="summary-delta">↑ 0.42pp</div></div></div><div class="chart-wrap">${lineChart(D.dashboard.trend, "报告")}</div>`, "关闭", "close-modal");
    if (action === "toggle-setting") target.classList.toggle("on");
    if (action === "save-settings") toast("设置已保存");
  });

  document.addEventListener("input", (event) => {
    if (event.target.matches("[data-filter-search]")) {
      state.filter = event.target.value;
      const value = event.target.value;
      clearTimeout(event.target._timer);
      event.target._timer = setTimeout(() => { render(); const input = document.querySelector("[data-filter-search]"); if (input) { input.focus(); input.setSelectionRange(value.length, value.length); } }, 180);
    }
  });

  document.addEventListener("change", (event) => {
    if (event.target.matches("[data-filter-status]")) { state.status = event.target.value; render(); }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target.id === "global-search") globalSearch(event.target.value);
    if (event.key === "Escape" && overlay.innerHTML) overlay.innerHTML = "";
  });

  window.addEventListener("hashchange", () => {
    resetListState();
    document.body.classList.remove("sidebar-open");
    overlay.innerHTML = "";
    render();
    window.scrollTo(0, 0);
  });

  render();
})();
