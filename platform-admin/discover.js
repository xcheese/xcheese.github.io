(function () {
  const D = window.PlatformData;
  const root = document.getElementById("discover-app");
  const overlay = document.getElementById("discover-overlay");
  const daySeed = Math.floor(Date.now() / 86400000);
  const state = {
    query: "",
    interests: readJson("discover-interests", ["独立游戏", "音乐", "插画"]),
    favorites: readJson("discover-favorites", []),
    refresh: 0
  };

  const extraShops = [
    { id: "S-14001", name: "FrameByFrame", owner: "阿帧", creatorCategory: "视频创作者", favorites: 21840, members: 4860, conversion: 6.4, revenueChange: 32.8, value: "高价值", desc: "幕后拆解、镜头语言课程和每月短片制作日志。" },
    { id: "S-14002", name: "TinyForge Games", owner: "小锤", creatorCategory: "独立游戏", favorites: 18420, members: 3620, conversion: 8.1, revenueChange: 48.2, value: "高潜力", desc: "开发像素叙事游戏，分享试玩版、原声与开发周报。" },
    { id: "S-14003", name: "OpenKit Lab", owner: "林开", creatorCategory: "软件开发", favorites: 12680, members: 2180, conversion: 5.6, revenueChange: 24.4, value: "增长", desc: "开源效率工具、自动化脚本和独立软件开发记录。" },
    { id: "S-14004", name: "Panel Planet", owner: "栗子", creatorCategory: "漫画家", favorites: 24860, members: 5280, conversion: 7.2, revenueChange: 18.6, value: "高价值", desc: "连载科幻漫画、角色设定集和读者限定番外。" },
    { id: "S-14005", name: "ModMosaic", owner: "摩德", creatorCategory: "游戏模组", favorites: 16840, members: 2940, conversion: 6.8, revenueChange: 42.1, value: "高潜力", desc: "制作模拟人生4、Minecraft 模组与场景资源。" },
    { id: "S-14006", name: "Pattern Forest", owner: "森织", creatorCategory: "图纸与教程", favorites: 9860, members: 1640, conversion: 4.9, revenueChange: 16.3, value: "成长", desc: "毛衣编织、3D 打印和手作图纸，提供分步视频教程。" }
  ];

  const shopDescriptions = [
    "原创插画、手作图案与会员限定创作过程。", "数字绘画笔刷、教程与创作资源。", "品牌模板、视觉素材与创意工作流。", "系统设计课程与创作者成长内容。",
    "实体手作套装、工具和制作图纸。", "漫画、画册与限定纸品。", "原创音乐、环境音效与无损专辑。", "陶艺作品、课程和小批量器物。"
  ];
  const shops = [...D.shops.map((shop, index) => ({ ...shop, desc: shopDescriptions[index] })), ...extraShops];
  const interests = ["全部", "视频", "独立游戏", "软件", "音乐", "漫画", "插画", "手作", "游戏模组", "3D打印", "编织图纸", "Minecraft"];
  const productMarks = ["PACK", "BRUSH", "DECK", "CLASS", "CRAFT", "BOOK", "AUDIO", "CERAMIC"];

  const uiPaths = {
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v7H4V6h7"/>',
    heart: '<path d="M20.8 5.7a5.5 5.5 0 0 0-7.8 0L12 6.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>'
  };

  function uiIcon(name, filled) {
    return `<svg class="ui-icon${filled ? " filled" : ""}" viewBox="0 0 24 24" aria-hidden="true">${uiPaths[name]}</svg>`;
  }

  function initials(value) {
    const clean = String(value || "").replace(/[^\p{L}\p{N}]/gu, "");
    return clean.slice(0, 2).toUpperCase();
  }

  function categoryMark(value) {
    const map = { 独立游戏: "GAME", 软件开发: "APP", 音乐创作: "MUSIC", 漫画: "COMIC", "3D打印图纸": "3D", 游戏模组: "MOD", 毛衣图纸: "PATTERN", Minecraft模组: "MOD" };
    return map[value] || initials(value);
  }

  function readJson(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch (_) { return fallback; }
  }

  function save() {
    localStorage.setItem("discover-interests", JSON.stringify(state.interests));
    localStorage.setItem("discover-favorites", JSON.stringify(state.favorites));
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[m]);
  }

  function rotate(items, offset) {
    if (!items.length) return items;
    const start = Math.abs(offset) % items.length;
    return [...items.slice(start), ...items.slice(0, start)];
  }

  function matches(item) {
    const query = state.query.trim().toLowerCase();
    const relatedShop = item.shop ? shops.find((shop) => shop.name === item.shop) : null;
    const text = `${Object.values(item).join(" ")} ${relatedShop ? Object.values(relatedShop).join(" ") : ""}`;
    const matchesQuery = !query || text.toLowerCase().includes(query);
    if (!state.interests.length || state.interests.includes("全部")) return matchesQuery;
    const aliases = { 独立游戏: "游戏", 软件: "软件", 音乐: "音乐音频", 漫画: "漫画画册", 插画: "插画绘画设计", 手作: "手作陶艺", 游戏模组: "模组", "3D打印": "3D打印图纸", 编织图纸: "毛衣编织图纸", Minecraft: "Minecraft" };
    return matchesQuery && state.interests.some((interest) => text.includes(interest) || text.includes(aliases[interest] || interest));
  }

  function favorite(id) { return state.favorites.includes(id); }

  function favoriteButton(item) {
    return `<button class="favorite-button ${favorite(item.id) ? "active" : ""}" data-favorite="${item.id}" aria-label="${favorite(item.id) ? "取消收藏" : "收藏"}">${uiIcon("heart", favorite(item.id))}</button>`;
  }

  function render() {
    const dailyOffset = daySeed + state.refresh;
    const visibleShops = rotate(shops.filter(matches), dailyOffset).slice(0, 12);
    const memberships = rotate(D.memberships.filter(matches), dailyOffset + 2).slice(0, 8);
    const crowds = rotate(D.crowdfunding.filter(matches), dailyOffset + 4).slice(0, 6);
    const products = rotate(D.products.filter(matches), dailyOffset + 6).slice(0, 8);
    root.innerHTML = `
      <header class="market-header"><div class="header-inner"><a class="market-brand" href="./discover.html"><i>D</i><span>发现创作者</span></a><nav class="market-nav"><a href="#shops">店铺</a><a href="#memberships">会员</a><a href="#crowdfunding">众筹</a><a href="#products">商品</a></nav><label class="market-search">${uiIcon("search")}<input id="market-search" type="search" value="${esc(state.query)}" placeholder="搜索创作者、众筹、商品…"></label><a class="header-action" href="./index.html">${uiIcon("external")}平台后台</a></div></header>
      <main class="market-main">
        <section class="hero"><div><h1>每天发现值得长期关注的创作者。</h1><p>从创作者店铺开始，了解他们的会员内容、正在进行的众筹和作品商品。推荐会根据你的兴趣、收藏和每天的新变化持续更新。</p></div><aside class="daily-panel"><strong>今日发现已更新</strong><p>今天优先推荐 ${esc(state.interests.filter((x) => x !== "全部").slice(0, 3).join("、") || "近期增长与高收藏")} 方向；共发现 6 个快速增长项目和 3 个即将结束的众筹。</p><button data-refresh>换一批今日推荐</button></aside></section>
        <section class="personalize"><div class="personalize-head"><strong>选择你感兴趣的创作</strong><span>已选 ${state.interests.length} 项 · 保存在当前浏览器</span></div><div class="interest-list">${interests.map((interest) => `<button class="interest-chip ${state.interests.includes(interest) ? "active" : ""}" data-interest="${interest}">${interest}</button>`).join("")}</div></section>
        <section class="market-section" id="shops"><div class="section-heading"><div><h2>创作者店铺</h2><p>优先展示与你兴趣相关、近期有新作品或快速成长的创作者</p></div><button data-show-all="shops">查看全部 ${shops.length} 家 ›</button></div><div class="shop-grid">${visibleShops.length ? visibleShops.map(shopCard).join("") : emptyState()}</div></section>
        <section class="market-section" id="memberships"><div class="section-heading"><div><h2>加入会员，持续支持</h2><p>获得创作过程、限定内容、抢先体验和会员权益</p></div><button data-show-all="memberships">全部会员方案 ›</button></div><div class="membership-grid">${memberships.length ? memberships.map(membershipCard).join("") : emptyState()}</div></section>
        <section class="market-section" id="crowdfunding"><div class="section-heading"><div><h2>正在发生的众筹</h2><p>参与一个作品从想法到完成的过程，收藏项目可获得截止提醒</p></div><button data-show-all="crowdfunding">全部众筹 ›</button></div><div class="crowd-grid">${crowds.length ? crowds.map(crowdCard).join("") : emptyState()}</div></section>
        <section class="market-section" id="products"><div class="section-heading"><div><h2>创作者作品与商品</h2><p>数字素材、游戏与软件、模组图纸、音乐、课程和实体作品</p></div><button data-show-all="products">全部商品 ›</button></div><div class="product-grid">${products.length ? products.map(productCard).join("") : emptyState()}</div></section>
        <footer class="market-footer">页面内容为产品原型模拟数据 · 推荐每天更新 · 收藏和兴趣仅保存在当前浏览器</footer>
      </main>`;
  }

  function shopCard(shop) {
    return `<article class="shop-card" data-open="shop" data-id="${shop.id}"><div class="shop-top"><div class="creator-avatar">${initials(shop.name)}</div><div class="shop-name"><h3>${esc(shop.name)}</h3><span>${esc(shop.creatorCategory || shop.category)} · ${esc(shop.owner)}</span></div>${favoriteButton(shop)}</div><p>${esc(shop.desc || "持续分享创作内容、作品与会员限定更新。")}</p><div class="shop-stats"><span>收藏<strong>${Number(shop.favorites || 0).toLocaleString()}</strong></span><span>会员<strong>${Number(shop.members || 0).toLocaleString()}</strong></span><span>近期收入<strong>${shop.revenueChange >= 0 ? "+" : ""}${shop.revenueChange || 0}%</strong></span></div></article>`;
  }

  function membershipCard(plan) {
    return `<article class="membership-card" data-open="membership" data-id="${plan.id}"><span class="membership-shop"><i></i>${esc(plan.shop)}</span><h3>${esc(plan.name)}</h3><p>${plan.active.toLocaleString()} 位有效会员 · 续费率 ${plan.renewal}% · ${plan.cycle}</p><div class="membership-price"><strong>¥${plan.price}</strong><span>每 ${plan.cycle}</span></div></article>`;
  }

  function crowdCard(item) {
    return `<article class="crowd-card" data-open="crowdfunding" data-id="${item.id}"><div class="crowd-visual"><strong>${categoryMark(item.category)}</strong><span>PROJECT</span></div><h3>${esc(item.name)}</h3><p>${esc(item.shop)} · ${esc(item.category)} · 剩余 ${item.daysLeft} 天</p><div class="progress"><i style="width:${Math.min(100, item.progress)}%"></i></div><div class="crowd-stats"><span><strong>${item.progress}%</strong> 达成</span><span>${item.favorites.toLocaleString()} 收藏</span><span>${item.supporters.toLocaleString()} 人支持</span>${favoriteButton(item)}</div></article>`;
  }

  function productCard(item, index) {
    return `<article class="product-card" data-open="product" data-id="${item.id}"><div class="product-mark">${productMarks[D.products.indexOf(item)] || productMarks[index % productMarks.length]}</div><div class="product-copy"><h3>${esc(item.name)}</h3><p>${esc(item.shop)} · ${esc(item.type)} · ${item.favorites.toLocaleString()} 收藏</p><strong>¥${item.price}</strong></div>${favoriteButton(item)}</article>`;
  }

  function emptyState() { return `<div class="empty">没有匹配当前兴趣的内容，尝试选择“全部”或搜索其他关键词。</div>`; }

  function showDetail(kind, id) {
    const source = kind === "shop" ? shops : kind === "membership" ? D.memberships : kind === "crowdfunding" ? D.crowdfunding : D.products;
    const item = source.find((x) => x.id === id);
    if (!item) return;
    const title = item.name;
    const mark = kind === "shop" ? initials(item.name) : kind === "membership" ? "MEMBER" : kind === "product" ? productMarks[D.products.indexOf(item)] : categoryMark(item.category);
    const copy = kind === "shop" ? item.desc : kind === "membership" ? `${item.shop} 的 ${item.cycle} 会员方案，已有 ${item.active.toLocaleString()} 位有效会员。` : kind === "crowdfunding" ? `已筹 ¥${item.raised.toLocaleString()}，完成目标的 ${item.progress}%，还有 ${item.daysLeft} 天结束。` : `${item.shop} 的${item.type}，已售 ${item.sales.toLocaleString()} 份，近期收入变化 ${item.revenueChange >= 0 ? "+" : ""}${item.revenueChange}%。`;
    overlay.innerHTML = `<div class="market-modal-backdrop" data-close></div><section class="market-modal"><div class="market-modal-head"><h2>${esc(title)}</h2><button data-close aria-label="关闭">${uiIcon("close")}</button></div><div class="market-modal-body"><div class="modal-highlight"><i>${mark}</i><div><strong>${kindLabel(kind)}</strong><p>${esc(copy)}</p></div></div><div class="shop-stats" style="margin-top:16px"><span>收藏<strong>${Number(item.favorites || 0).toLocaleString()}</strong></span><span>${kind === "crowdfunding" ? "支持者" : kind === "shop" ? "会员" : "转化率"}<strong>${kind === "crowdfunding" ? item.supporters.toLocaleString() : kind === "shop" ? Number(item.members || 0).toLocaleString() : `${item.conversion || item.renewal}%`}</strong></span><span>近期变化<strong>${item.revenueChange !== undefined ? `${item.revenueChange >= 0 ? "+" : ""}${item.revenueChange}%` : `${item.renewal}% 续费`}</strong></span></div></div></section>`;
  }

  function kindLabel(kind) { return ({ shop: "创作者店铺", membership: "会员方案", crowdfunding: "众筹项目", product: "创作者商品" })[kind]; }

  function toast(message) {
    document.querySelector(".market-toast")?.remove();
    const node = document.createElement("div");
    node.className = "market-toast";
    node.textContent = message;
    document.body.appendChild(node);
    setTimeout(() => node.remove(), 2200);
  }

  document.addEventListener("click", (event) => {
    const favoriteTarget = event.target.closest("[data-favorite]");
    if (favoriteTarget) {
      event.stopPropagation();
      const id = favoriteTarget.dataset.favorite;
      state.favorites = favorite(id) ? state.favorites.filter((x) => x !== id) : [...state.favorites, id];
      save(); render(); toast(favorite(id) ? "已收藏，推荐会更懂你" : "已取消收藏"); return;
    }
    const interestTarget = event.target.closest("[data-interest]");
    if (interestTarget) {
      const value = interestTarget.dataset.interest;
      if (value === "全部") state.interests = state.interests.includes("全部") ? [] : ["全部"];
      else { state.interests = state.interests.filter((x) => x !== "全部"); state.interests = state.interests.includes(value) ? state.interests.filter((x) => x !== value) : [...state.interests, value]; }
      save(); render(); return;
    }
    if (event.target.closest("[data-refresh]")) { state.refresh += 3; render(); toast("今日推荐已换新"); return; }
    const openTarget = event.target.closest("[data-open]");
    if (openTarget) { showDetail(openTarget.dataset.open, openTarget.dataset.id); return; }
    if (event.target.closest("[data-close]")) overlay.innerHTML = "";
    if (event.target.closest("[data-show-all]")) { state.interests = ["全部"]; state.query = ""; render(); toast("已展示全部内容"); }
  });

  document.addEventListener("input", (event) => {
    if (event.target.id !== "market-search") return;
    state.query = event.target.value;
    clearTimeout(event.target._timer);
    const value = event.target.value;
    event.target._timer = setTimeout(() => { render(); const input = document.getElementById("market-search"); input?.focus(); input?.setSelectionRange(value.length, value.length); }, 160);
  });

  document.addEventListener("keydown", (event) => { if (event.key === "Escape") overlay.innerHTML = ""; });
  render();
})();
