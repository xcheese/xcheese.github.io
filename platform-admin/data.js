(function () {
  const trend30 = [86, 104, 91, 118, 127, 105, 134, 123, 142, 137, 116, 108, 121, 148, 156, 141, 132, 151, 162, 154, 171, 166, 149, 145, 158, 173, 169, 181, 177, 192];

  window.PlatformData = {
    nav: [
      { id: "dashboard", label: "工作台", icon: "home" },
      { id: "shops", label: "店铺", icon: "shop" },
      { id: "memberships", label: "会员方案", icon: "membership" },
      { id: "products", label: "商品", icon: "bag" },
      { id: "users", label: "用户", icon: "user" },
      { id: "orders", label: "订单", icon: "order" },
      { id: "finance", label: "退款与结算", icon: "finance" },
      { id: "tickets", label: "客诉工单", icon: "ticket" },
      { id: "traffic", label: "流量与页面", icon: "chart" },
      { id: "reports", label: "分析报告", icon: "report" },
      { id: "notes", label: "标注与备注", icon: "note" },
      { id: "settings", label: "系统设置", icon: "settings" }
    ],

    dashboard: {
      priorities: [
        {
          level: "P0",
          label: "紧急 · 需立即处理",
          items: [
            ["12 笔大额退款待复核", "李婷婷", "2小时", "orders"],
            ["8 个实体订单超时未发货", "王磊", "3小时", "orders"],
            ["5 个高价值店铺 GMV 异常下滑", "陈晨", "4小时", "shops"],
            ["17 个客诉即将超 SLA", "赵宇", "1小时", "tickets"]
          ]
        },
        {
          level: "P1",
          label: "今日 · 当天处理",
          items: [
            ["23 个支付失败订单待跟进", "周航", "5小时", "orders"],
            ["14 个退款申请待审核", "李婷婷", "6小时", "finance"],
            ["9 个店铺资料待审核", "陈晨", "7小时", "shops"],
            ["6 个结算异常待处理", "王磊", "8小时", "finance"]
          ]
        },
        {
          level: "P2",
          label: "跟进中 · 本周内处理",
          items: [
            ["32 个客诉处理中", "赵宇", "1天2小时", "tickets"],
            ["11 个店铺整改中", "陈晨", "2天", "shops"],
            ["7 个高风险用户待验证", "周航", "2天6小时", "users"],
            ["4 个物流异常待确认", "王磊", "3天", "orders"]
          ]
        }
      ],
      kpis: [
        { label: "净收入", value: "¥ 3,256,892.60", delta: "↑ 18.6%", values: [3, 5, 4, 8, 6, 9, 5, 7] },
        { label: "支付订单", value: "22,847", delta: "↑ 12.3%", values: [4, 3, 7, 5, 8, 6, 7, 9] },
        { label: "退款率", value: "2.48%", delta: "↓ 0.35pp", values: [8, 7, 7, 5, 6, 4, 5, 3] },
        { label: "活跃店铺", value: "8,614", delta: "↑ 9.8%", values: [3, 4, 4, 6, 5, 7, 6, 8] },
        { label: "新增付费会员", value: "4,237", delta: "↑ 15.7%", values: [2, 4, 3, 6, 5, 8, 7, 9] },
        { label: "购买转化率", value: "3.62%", delta: "↑ 0.42pp", values: [3, 2, 5, 4, 6, 5, 8, 7] }
      ],
      risks: [
        ["异常预警", "店铺「ArtisanStudio」GMV 连续 7 天下滑 62%", "¥128,560", "P0"],
        ["续费风险", "1,243 个会员将于 7 天内到期", "¥356,700", "P1"],
        ["退款激增", "店铺「PixelCraft」退款率 7.8%（行业 2.3%）", "¥45,320", "P1"],
        ["发货积压", "312 个实体订单超时未发货", "¥89,640", "P0"],
        ["转化机会", "128 个高流量页面转化率低于行业均值 40%", "—", "P2"],
        ["潜力店铺", "店铺「CreativeBox」增长潜力评分 TOP 10%", "—", "P2"]
      ],
      trend: trend30
    },

    shops: [
      { id: "S-10284", name: "ArtisanStudio", owner: "林语", value: "高价值", gmv: 682450, net: 512360, members: 2853, conversion: 5.31, refund: 1.72, complaints: 6, risk: "需关注", manager: "陈晨", status: "正常", joined: "2023-08-12", category: "手作与设计", region: "上海", note: "已联系店铺排查渠道投放变化" },
      { id: "S-09831", name: "PixelCraft", owner: "周明", value: "高价值", gmv: 561230, net: 421880, members: 2164, conversion: 4.12, refund: 7.80, complaints: 23, risk: "高风险", manager: "李婷婷", status: "限制结算", joined: "2023-03-26", category: "数字设计", region: "北京", note: "退款率异常，跟进中" },
      { id: "S-11209", name: "CreativeBox", owner: "沈亦", value: "潜力店铺", gmv: 498760, net: 372190, members: 1892, conversion: 6.45, refund: 1.35, complaints: 3, risk: "低风险", manager: "周航", status: "正常", joined: "2024-01-18", category: "创意素材", region: "杭州", note: "活动转化良好，观察中" },
      { id: "S-08445", name: "DesignNest", owner: "陈南", value: "高价值", gmv: 436580, net: 329410, members: 1675, conversion: 3.88, refund: 2.11, complaints: 8, risk: "低风险", manager: "王磊", status: "正常", joined: "2022-11-05", category: "设计教育", region: "深圳", note: "物流延迟问题已反馈" },
      { id: "S-12031", name: "MakerMarket", owner: "江禾", value: "潜力店铺", gmv: 389120, net: 291330, members: 1432, conversion: 4.03, refund: 1.64, complaints: 4, risk: "低风险", manager: "赵宇", status: "正常", joined: "2024-05-22", category: "实体手作", region: "成都", note: "内容上新，持续关注" },
      { id: "S-09376", name: "PaperMoon", owner: "许岚", value: "成长店铺", gmv: 274300, net: 203670, members: 986, conversion: 2.91, refund: 2.48, complaints: 11, risk: "需关注", manager: "陈晨", status: "整改中", joined: "2023-01-09", category: "插画周边", region: "广州", note: "客诉集中在预售周期" },
      { id: "S-12758", name: "SoundWave", owner: "吴声", value: "成长店铺", gmv: 218900, net: 176420, members: 732, conversion: 3.17, refund: 1.20, complaints: 2, risk: "低风险", manager: "周航", status: "正常", joined: "2024-09-14", category: "音频内容", region: "武汉", note: "会员续费率上升" },
      { id: "S-13109", name: "ClayLab", owner: "苏北", value: "新店铺", gmv: 92400, net: 68410, members: 284, conversion: 1.86, refund: 3.70, complaints: 5, risk: "需关注", manager: "赵宇", status: "观察期", joined: "2025-02-08", category: "陶艺手作", region: "景德镇", note: "首月转化偏低" }
    ],

    memberships: [
      { id: "M-24018", name: "灵感月度会员", shop: "ArtisanStudio", price: 38, cycle: "30天", active: 1842, newCount: 326, renewal: 82.4, revenue: 186920, churn: 3.2, conversion: 6.8, status: "销售中" },
      { id: "M-23994", name: "专业素材年卡", shop: "PixelCraft", price: 398, cycle: "365天", active: 1164, newCount: 82, renewal: 71.6, revenue: 142800, churn: 5.9, conversion: 4.1, status: "销售中" },
      { id: "M-25120", name: "创意进阶季卡", shop: "CreativeBox", price: 128, cycle: "90天", active: 928, newCount: 211, renewal: 86.7, revenue: 126340, churn: 2.1, conversion: 8.2, status: "销售中" },
      { id: "M-22913", name: "设计课月卡", shop: "DesignNest", price: 68, cycle: "30天", active: 805, newCount: 129, renewal: 79.2, revenue: 98560, churn: 3.8, conversion: 5.6, status: "销售中" },
      { id: "M-25877", name: "手作伙伴半年卡", shop: "MakerMarket", price: 218, cycle: "180天", active: 614, newCount: 94, renewal: 76.9, revenue: 84320, churn: 4.5, conversion: 3.9, status: "销售中" },
      { id: "M-21840", name: "插画收藏会员", shop: "PaperMoon", price: 25, cycle: "30天", active: 476, newCount: 61, renewal: 66.3, revenue: 41980, churn: 8.2, conversion: 2.7, status: "整改中" },
      { id: "M-26381", name: "无损音频季卡", shop: "SoundWave", price: 88, cycle: "90天", active: 392, newCount: 77, renewal: 84.1, revenue: 37650, churn: 2.6, conversion: 4.8, status: "销售中" },
      { id: "M-27005", name: "陶艺新手月卡", shop: "ClayLab", price: 19, cycle: "30天", active: 168, newCount: 43, renewal: 58.4, revenue: 10840, churn: 10.6, conversion: 1.9, status: "已暂停" }
    ],

    products: [
      { id: "P-83021", name: "手作图案素材包 Vol.6", shop: "ArtisanStudio", type: "数字商品", price: 69, sales: 3284, revenue: 226596, conversion: 7.8, refund: 0.8, stock: "不限", status: "在售" },
      { id: "P-77218", name: "Procreate 笔刷全集", shop: "PixelCraft", type: "数字商品", price: 128, sales: 2167, revenue: 277376, conversion: 5.2, refund: 8.6, stock: "不限", status: "审核中" },
      { id: "P-91024", name: "品牌提案模板系统", shop: "CreativeBox", type: "数字商品", price: 199, sales: 1462, revenue: 290938, conversion: 9.1, refund: 1.1, stock: "不限", status: "在售" },
      { id: "P-68115", name: "设计基础系统课", shop: "DesignNest", type: "虚拟服务", price: 499, sales: 684, revenue: 341316, conversion: 3.9, refund: 2.3, stock: "120席", status: "在售" },
      { id: "P-90432", name: "黄铜书签手作套装", shop: "MakerMarket", type: "实体商品", price: 89, sales: 1258, revenue: 111962, conversion: 4.4, refund: 1.7, stock: "86件", status: "在售" },
      { id: "P-76400", name: "春日插画限定画册", shop: "PaperMoon", type: "实体商品", price: 118, sales: 832, revenue: 98176, conversion: 3.3, refund: 3.8, stock: "预售", status: "预售中" },
      { id: "P-94417", name: "环境音效合集 2025", shop: "SoundWave", type: "数字商品", price: 48, sales: 960, revenue: 46080, conversion: 4.7, refund: 0.6, stock: "不限", status: "在售" },
      { id: "P-96172", name: "手捏咖啡杯", shop: "ClayLab", type: "实体商品", price: 168, sales: 214, revenue: 35952, conversion: 1.8, refund: 4.2, stock: "12件", status: "库存预警" }
    ],

    users: [
      { id: "U-691204", name: "陆晓安", segment: "高价值客户", spend: 12840, orders: 42, memberships: 4, shops: 7, refund: 0.0, complaint: 1, lastActive: "10分钟前", status: "正常", joined: "2022-08-19" },
      { id: "U-824105", name: "苏小满", segment: "高价值客户", spend: 9860, orders: 31, memberships: 6, shops: 5, refund: 3.2, complaint: 2, lastActive: "1小时前", status: "正常", joined: "2023-04-12" },
      { id: "U-731940", name: "张一禾", segment: "稳定复购", spend: 6840, orders: 28, memberships: 3, shops: 4, refund: 0.0, complaint: 0, lastActive: "今天 09:42", status: "正常", joined: "2023-01-28" },
      { id: "U-931257", name: "陈墨", segment: "退款风险", spend: 5620, orders: 19, memberships: 1, shops: 3, refund: 21.1, complaint: 5, lastActive: "昨天", status: "待验证", joined: "2024-06-02" },
      { id: "U-885390", name: "王小野", segment: "会员偏好", spend: 4380, orders: 17, memberships: 8, shops: 6, refund: 5.9, complaint: 1, lastActive: "2天前", status: "正常", joined: "2023-11-23" },
      { id: "U-750184", name: "周蓝", segment: "流失风险", spend: 3290, orders: 14, memberships: 2, shops: 4, refund: 7.1, complaint: 3, lastActive: "21天前", status: "需唤回", joined: "2023-02-16" },
      { id: "U-997124", name: "林可", segment: "新客", spend: 890, orders: 3, memberships: 1, shops: 2, refund: 0.0, complaint: 0, lastActive: "5分钟前", status: "正常", joined: "2025-05-18" },
      { id: "U-992783", name: "赵新雨", segment: "新客", spend: 418, orders: 2, memberships: 0, shops: 1, refund: 0.0, complaint: 0, lastActive: "3小时前", status: "正常", joined: "2025-05-23" }
    ],

    orders: [
      { id: "O-202505260184", time: "05-26 10:24", user: "陆晓安", shop: "ArtisanStudio", item: "灵感月度会员", type: "会员", amount: 38, paid: 38, payment: "支付宝", status: "已支付", risk: "低风险" },
      { id: "O-202505260173", time: "05-26 10:18", user: "陈墨", shop: "PixelCraft", item: "Procreate 笔刷全集", type: "数字商品", amount: 128, paid: 128, payment: "微信支付", status: "退款审核", risk: "高风险" },
      { id: "O-202505260165", time: "05-26 10:06", user: "苏小满", shop: "MakerMarket", item: "黄铜书签手作套装 ×2", type: "实体商品", amount: 178, paid: 168, payment: "支付宝", status: "待发货", risk: "低风险" },
      { id: "O-202505260149", time: "05-26 09:51", user: "张一禾", shop: "CreativeBox", item: "品牌提案模板系统", type: "数字商品", amount: 199, paid: 199, payment: "微信支付", status: "已完成", risk: "低风险" },
      { id: "O-202505260126", time: "05-26 09:28", user: "周蓝", shop: "PaperMoon", item: "春日插画限定画册", type: "实体商品", amount: 118, paid: 118, payment: "支付宝", status: "物流异常", risk: "需关注" },
      { id: "O-202505260105", time: "05-26 09:03", user: "王小野", shop: "SoundWave", item: "无损音频季卡", type: "会员", amount: 88, paid: 88, payment: "微信支付", status: "已支付", risk: "低风险" },
      { id: "O-202505250982", time: "05-25 23:42", user: "林可", shop: "ClayLab", item: "手捏咖啡杯", type: "实体商品", amount: 168, paid: 168, payment: "支付宝", status: "库存锁定", risk: "需关注" },
      { id: "O-202505250947", time: "05-25 22:19", user: "赵新雨", shop: "DesignNest", item: "设计基础系统课", type: "虚拟服务", amount: 499, paid: 469, payment: "微信支付", status: "已完成", risk: "低风险" },
      { id: "O-202505250901", time: "05-25 21:07", user: "陈墨", shop: "PixelCraft", item: "专业素材年卡", type: "会员", amount: 398, paid: 398, payment: "支付宝", status: "支付失败", risk: "高风险" },
      { id: "O-202505250866", time: "05-25 20:33", user: "陆晓安", shop: "MakerMarket", item: "黄铜书签手作套装", type: "实体商品", amount: 89, paid: 89, payment: "微信支付", status: "已发货", risk: "低风险" }
    ],

    finance: [
      { id: "R-58421", kind: "退款", related: "O-202505260173", shop: "PixelCraft", amount: 128, fee: 3.84, reason: "数字内容与描述不符", requested: "05-26 10:31", status: "待审核", owner: "李婷婷" },
      { id: "ST-26051", kind: "结算", related: "2025-05 第4期", shop: "ArtisanStudio", amount: 426820, fee: 18420, reason: "周结算", requested: "05-26 09:00", status: "待复核", owner: "王磊" },
      { id: "R-58398", kind: "退款", related: "O-202505240714", shop: "PaperMoon", amount: 118, fee: 3.54, reason: "物流长时间未更新", requested: "05-25 18:42", status: "商家举证", owner: "李婷婷" },
      { id: "ST-26049", kind: "结算", related: "2025-05 第4期", shop: "PixelCraft", amount: 318760, fee: 13698, reason: "风险暂缓", requested: "05-26 09:00", status: "暂缓结算", owner: "王磊" },
      { id: "R-58362", kind: "退款", related: "O-202505230281", shop: "ClayLab", amount: 168, fee: 5.04, reason: "商品破损", requested: "05-24 11:20", status: "退款中", owner: "赵宇" },
      { id: "ST-26044", kind: "结算", related: "2025-05 第4期", shop: "CreativeBox", amount: 284130, fee: 12218, reason: "周结算", requested: "05-26 09:00", status: "已打款", owner: "王磊" }
    ],

    tickets: [
      { id: "T-260519", title: "数字素材无法下载且商家未回复", user: "陈墨", shop: "PixelCraft", type: "数字商品", channel: "站内", priority: "P0", age: "1小时42分", sla: "18分钟", status: "处理中", owner: "赵宇", amount: 128 },
      { id: "T-260506", title: "预售画册超过承诺时间未发货", user: "周蓝", shop: "PaperMoon", type: "物流发货", channel: "邮件", priority: "P0", age: "3小时08分", sla: "52分钟", status: "等待商家", owner: "赵宇", amount: 118 },
      { id: "T-260488", title: "会员自动续费希望取消并退款", user: "王小野", shop: "SoundWave", type: "会员续费", channel: "站内", priority: "P1", age: "5小时24分", sla: "2小时", status: "待处理", owner: "李婷婷", amount: 88 },
      { id: "T-260451", title: "实体商品收到时有明显破损", user: "林可", shop: "ClayLab", type: "商品质量", channel: "在线客服", priority: "P1", age: "8小时17分", sla: "4小时", status: "商家举证", owner: "周航", amount: 168 },
      { id: "T-260392", title: "课程内容与详情介绍差异较大", user: "赵新雨", shop: "DesignNest", type: "虚拟服务", channel: "站内", priority: "P2", age: "1天2小时", sla: "1天", status: "协商中", owner: "周航", amount: 499 },
      { id: "T-260311", title: "优惠券使用后订单金额不正确", user: "苏小满", shop: "MakerMarket", type: "订单价格", channel: "邮件", priority: "P2", age: "2天4小时", sla: "已超时", status: "待回访", owner: "赵宇", amount: 178 }
    ],

    pages: [
      { id: "PG-10021", title: "ArtisanStudio 店铺主页", path: "/artisan-studio", type: "店铺主页", shop: "ArtisanStudio", uv: 48260, pv: 91640, duration: "02:18", bounce: 28.4, conversion: 5.8, revenue: 186420 },
      { id: "PG-10384", title: "品牌提案模板系统", path: "/creative-box/p/91024", type: "商品页", shop: "CreativeBox", uv: 28430, pv: 43820, duration: "03:06", bounce: 21.8, conversion: 9.1, revenue: 148860 },
      { id: "PG-09812", title: "PixelCraft 店铺主页", path: "/pixel-craft", type: "店铺主页", shop: "PixelCraft", uv: 36890, pv: 68410, duration: "01:42", bounce: 39.2, conversion: 3.7, revenue: 126780 },
      { id: "PG-11840", title: "黄铜书签手作套装", path: "/maker-market/p/90432", type: "商品页", shop: "MakerMarket", uv: 21680, pv: 33140, duration: "02:31", bounce: 31.6, conversion: 4.4, revenue: 98420 },
      { id: "PG-12008", title: "CreativeBox 店铺主页", path: "/creative-box", type: "店铺主页", shop: "CreativeBox", uv: 18940, pv: 38620, duration: "02:54", bounce: 25.3, conversion: 6.9, revenue: 86230 },
      { id: "PG-10557", title: "春日插画限定画册", path: "/paper-moon/p/76400", type: "商品页", shop: "PaperMoon", uv: 17260, pv: 29480, duration: "01:36", bounce: 44.8, conversion: 3.3, revenue: 67120 },
      { id: "PG-12772", title: "无损音频季卡", path: "/sound-wave/m/26381", type: "会员页", shop: "SoundWave", uv: 12830, pv: 19620, duration: "02:47", bounce: 23.6, conversion: 4.8, revenue: 44230 },
      { id: "PG-13102", title: "ClayLab 店铺主页", path: "/clay-lab", type: "店铺主页", shop: "ClayLab", uv: 9460, pv: 13280, duration: "00:52", bounce: 58.4, conversion: 1.8, revenue: 18420 }
    ],

    reports: [
      { id: "RP-0526", name: "平台经营日报", range: "2025-05-26", owner: "系统", updated: "今天 10:30", recipients: "管理层、运营", status: "已生成" },
      { id: "RP-0525-W", name: "高价值店铺周报", range: "2025-05-19 至 05-25", owner: "陈晨", updated: "今天 09:12", recipients: "客户成功", status: "待审阅" },
      { id: "RP-0525-R", name: "退款与客诉风险周报", range: "2025-05-19 至 05-25", owner: "李婷婷", updated: "昨天 18:46", recipients: "风控、客服", status: "已生成" },
      { id: "RP-0501-M", name: "平台经营月报", range: "2025-04", owner: "王磊", updated: "05-02 11:00", recipients: "管理层", status: "已归档" },
      { id: "RP-Q1", name: "2025 Q1 创作者生态报告", range: "2025 Q1", owner: "数据团队", updated: "04-08 16:22", recipients: "全员", status: "已归档" }
    ],

    notes: [
      { id: "N-1001", target: "ArtisanStudio", type: "店铺", author: "陈晨", time: "05-26 10:20", content: "下滑原因已定位为某渠道投放减少，与店铺沟通后恢复投放中。", pinned: true },
      { id: "N-1002", target: "PixelCraft", type: "店铺", author: "李婷婷", time: "05-26 09:45", content: "已要求店铺提交退款原因分析报告，预计今日内给出处理方案。", pinned: true },
      { id: "N-1003", target: "会员续费", type: "分析", author: "周航", time: "05-26 09:10", content: "本周会员续费提醒已发送，关注到期转化情况。", pinned: false },
      { id: "N-1004", target: "T-260506", type: "客诉", author: "赵宇", time: "05-25 18:36", content: "商家承诺明日上午完成发货并补偿运费券，等待物流单号。", pinned: false },
      { id: "N-1005", target: "ClayLab", type: "店铺", author: "赵宇", time: "05-24 14:20", content: "新店首月转化偏低，建议优化首屏商品陈列和新客优惠。", pinned: false }
    ]
  };
})();
