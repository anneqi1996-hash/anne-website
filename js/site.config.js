/* ============================================================
   SINGLE SOURCE OF TRUTH
   ------------------------------------------------------------
   品牌名 / 域名 / 邮箱 / 电话 / 地址 / WhatsApp 只在本文件定义。
   页头、页脚、mailto、页脚署名行、<title> 后缀由 js/site.js
   在浏览器里读取本文件后写入，页面 HTML 中不含硬编码的
   品牌名、邮箱或电话。

   canonical / og:url / og:site_name / sitemap.xml / robots.txt
   是构建期产物：由 tools/gen_site.py 读取本文件的 domain 与
   brand.name 生成。改这两项后重跑 python tools/gen_site.py。

   11 个品类、4 个分组、导航、FAQ 文案也在此维护。
   ============================================================ */
window.SITE = {
  /* ---- 1. 品牌与联系方式（唯一定义处）---- */
  brand: {
    name: "BOCA STEEL",                                      // 站上对外显示的品牌名
    short: "BS",                                             // logo 方块内的缩写（≤2 字符）
    legal: "HeBei BoChang Metal Products Co., Ltd",           // 营业执照全称；与品牌名的关系在页脚署名行说明
    tagline: "Steel furniture factory"
  },
  domain: "bocasteel.com",                                   // 已定域名
  email: "info@bocasteel.com",                               // 主邮箱
  phone: null,                                               // 待客户提供（null = 页面显示 pending，不生成 tel: 链接）
  whatsapp: null,                                            // 待客户提供（null = WhatsApp 按钮置灰）
  address: {
    line1: null,                                             // 门牌号待提供
    city: "Wuyi County, Jinhua",
    region: "Zhejiang",
    country: "China"
  },
  hours: "Mon–Sat, 08:30–18:00 (GMT+8)",

  /* ---- 1b. 询盘表单（endpoint 只在本文件出现）---- */
  forms: {
    rfqEndpoint: "https://formspree.io/f/mzedqypk",  // Formspree 端点
    uploadsEnabled: false                            // 免费版不收附件；升级付费版后改 true 即可显示附件字段
  },

  /* ---- 2. 导航（一级 5 项 + CTA，见方案 §2.2）---- */
  nav: [
    { label: "Home", href: "index.html" },
    { label: "Products", href: "products/index.html", mega: true },
    { label: "OEM & Custom", href: "about.html#oem" },
    { label: "Factory", href: "about.html#factory" },
    { label: "Contact", href: "about.html#contact" }
  ],

  /* ---- 3. 4 个分组（11 品类全覆盖，不增删）---- */
  groups: [
    {
      slug: "office-furniture", num: "01", name: "Office Furniture",
      lead: "Storage and cabinet systems for office fit-out and dealer programmes.",
      note: "Buyers: office furniture brands, contract dealers, workplace fit-out contractors."
    },
    {
      slug: "school-education", num: "02", name: "School & Education",
      lead: "Classroom, dormitory and library furniture supplied as one school package.",
      note: "Buyers: school procurement, education furniture contractors, government tenders."
    },
    {
      slug: "storage-racking", num: "03", name: "Storage & Racking",
      lead: "Mobile shelving and racking for archive rooms and warehouse expansion.",
      note: "Buyers: warehouse integrators, records-management suppliers, engineering contractors."
    },
    {
      slug: "desk-frames", num: "04", name: "Desk Frames & Components",
      lead: "Steel frames and lifting columns for assemblers and own-brand programmes.",
      note: "Buyers: desk assemblers, e-commerce furniture brands, OEM buyers."
    }
  ],

  /* ---- 4. 11 个品类（slug 与方案 §2.2 一致）---- */
  categories: [
    {
      slug: "school-desks-chairs", num: "01", group: "school-education",
      name: "School Desks & Chairs",
      cardDesc: "Height-graded frames, knock-down, school project ready.",
      h1: "School Desks & Chairs for Whole-School Projects",
      lead: "Height-graded desk and chair frames built for daily classroom use, supplied per classroom, per floor or per school.",
      points: [
        "Height grades mapped to age and stature bands, so one order can cover a full year group.",
        "Welded steel frames with anti-tilt geometry and a book box under the desktop.",
        "Batch delivery against a school fit-out schedule, with spare parts packed per shipment."
      ],
      specs: [
        ["Size range", "Desk 600–1200 W × 400–600 D mm; seat height 260–460 mm across 6 grades"],
        ["Structure", "Welded square-tube frame, 1.2–1.5 mm wall; MDF or steel desktop"],
        ["Load", "Desktop 60 kg static; seat 120 kg static (project-specific test report on request)"],
        ["Finish", "Powder coating, 60–80 µm, pre-treated by spray line"],
        ["Packing", "Flat pack, 5-layer corrugated, desks 2–4 sets per carton"],
        ["MOQ", "100 sets per height grade; mixed grades accepted in one container"]
      ],
      options: [
        ["Desktop", "Melamine MDF in 4 wood tones, or powder-coated steel in any RAL colour"],
        ["Frame colour", "Standard ink grey, sand beige, or matched to your sample"],
        ["Height system", "Fixed grade, or telescopic with visible adjustment holes"],
        ["Accessories", "Book box, hook, chair stacking bumper, nylon or PU floor glides"],
        ["Branding", "Silk-screen or laser-etched logo on frame; branded carton printing"]
      ],
      scenes: [
        ["Primary classroom", "Single or double desks laid out to a fixed row pitch."],
        ["Science and art rooms", "Deeper tops with a steel under-frame for equipment loads."],
        ["Whole-school tender", "Classroom, dormitory and library furniture quoted as one package."]
      ],
      related: ["bunk-beds", "reading-tables", "library-shelving"]
    },
    {
      slug: "mobile-shelving", num: "02", group: "storage-racking",
      name: "Mobile Shelving Systems",
      cardDesc: "Manual or electric, compact storage for archive rooms.",
      h1: "Mobile Shelving Systems for Archive and Records Rooms",
      lead: "Compacting shelving on floor rails, specified from your room dimensions so the same file volume fits in a smaller footprint.",
      points: [
        "Space efficiency: bays share one access aisle instead of one aisle per bay.",
        "Drive options: manual handwheel, mechanical assist, or electric with aisle safety sensing.",
        "Project support from room survey to rail layout drawing before production."
      ],
      specs: [
        ["Bay size", "900–1200 W × 300–600 D mm per side, height 2000–2500 mm"],
        ["Shelf load", "80–120 kg per shelf, evenly distributed"],
        ["Track", "Recessed or surface-mounted rail, 20/25 mm floor plate"],
        ["Drive", "Handwheel, chain-assisted, or 24 V electric motor with sensor bar"],
        ["Finish", "Powder-coated frame and shelves; galvanised rail"],
        ["MOQ", "1 room set (typically 6–20 bays)"]
      ],
      options: [
        ["Control", "Manual handwheel, mechanical assist, or electric with touch panel"],
        ["Access", "Single-sided or double-sided bays; end panel with lock"],
        ["Interior", "Flat shelf, divider, hanging file frame, or combination"],
        ["Safety", "Aisle light, infrared sensor bar, emergency stop (electric units)"],
        ["Finish", "RAL colour match; wood-grain end panels for reader-facing rooms"]
      ],
      scenes: [
        ["Records and archive rooms", "High-density filing where floor area is fixed."],
        ["University libraries", "Compact storage for back-run periodicals."],
        ["Corporate file rooms", "Lockable, colour-coded departments on one track."]
      ],
      related: ["warehouse-racking", "library-shelving", "file-cabinets"]
    },
    {
      slug: "bunk-beds", num: "03", group: "school-education",
      name: "Steel Bunk Beds",
      cardDesc: "Dormitory grade, knock-down, flat-packed for export.",
      h1: "Steel Bunk Beds for Dormitory Projects",
      lead: "Frames engineered for boarding-school and staff dormitory use, flat-packed so a full building ships in fewer containers.",
      points: [
        "Bolted connection blocks with cross rails to limit racking movement in use.",
        "Guardrail height, ladder position and lower clearance specified per dormitory layout.",
        "Anti-rust preparation and moisture-barrier packing for humid and coastal destinations."
      ],
      specs: [
        ["Size", "L 1900–2000 × W 900–1000 mm; upper and lower deck"],
        ["Structure", "50 × 25 mm and 40 × 40 mm steel tube, 1.2–1.5 mm wall"],
        ["Load", "150 kg per deck static (project-specific test report on request)"],
        ["Finish", "Powder coating over phosphate pre-treatment; salt-spray duration on request"],
        ["Packing", "Flat pack, one bed per carton, moisture barrier inside"],
        ["MOQ", "50 sets; mixed models accepted"]
      ],
      options: [
        ["Configuration", "Bunk, loft, or single with under-bed storage"],
        ["Guardrail", "Standard 300 mm, or extended rail with mesh infill"],
        ["Access", "Straight ladder, angled ladder, or built-in stair drawer"],
        ["Extras", "Reading light bracket, curtain rail, lockable under-bed box"],
        ["Colour", "Ink grey, sand beige, school blue-grey, or RAL match"]
      ],
      scenes: [
        ["Boarding schools", "Repeated room types delivered in phased shipments."],
        ["Staff and worker dormitories", "Higher decks with storage under the lower frame."],
        ["Camp and site housing", "Knock-down frames that can be re-sited."]
      ],
      related: ["school-desks-chairs", "steel-office-cabinets", "stacking-racks"]
    },
    {
      slug: "library-shelving", num: "04", group: "school-education",
      name: "Library Shelving",
      cardDesc: "Modular bays, adjustable shelves, wall or island runs.",
      h1: "Library Shelving for Reading Rooms and Stacks",
      lead: "Modular bays in single- or double-faced runs, with shelves that move as the collection grows.",
      points: [
        "Bay system extends along a wall or forms island runs without changing the profile.",
        "Shelves adjust on punched uprights; add a level when the collection grows.",
        "Matched with reading tables and issue desks in one colour for the whole room."
      ],
      specs: [
        ["Bay size", "900/1000 W × 300 (single) / 600 (double) D mm; 5–6 levels"],
        ["Shelf load", "70–100 kg per shelf, evenly distributed"],
        ["Structure", "1.0–1.2 mm cold-rolled steel, punched uprights at 25/32 mm pitch"],
        ["Finish", "Powder coating; shelf edges folded for rigidity"],
        ["Packing", "Flat pack with uprights bundled; assembly hardware included"],
        ["MOQ", "20 bays; project layout drawing issued before production"]
      ],
      options: [
        ["Run type", "Wall single-faced, island double-faced, or starter/add-on extension"],
        ["Shelf", "Flat, with divider, newspaper slope, or display ledge"],
        ["End panel", "Steel, or wood-grain panel for reader-facing ends"],
        ["Extras", "Top canopy, label holder, anti-tilt foot, plinth"],
        ["Colour", "RAL match to reading tables and issue desk"]
      ],
      scenes: [
        ["School libraries", "Low bays for primary, full-height stacks for secondary."],
        ["University reading rooms", "Long runs with matched study tables."],
        ["Public and corporate libraries", "Mixed open and compact storage."]
      ],
      related: ["reading-tables", "mobile-shelving", "school-desks-chairs"]
    },
    {
      slug: "reading-tables", num: "05", group: "school-education",
      name: "Reading Tables",
      cardDesc: "Wide spans, steel under-frame, matched to shelving.",
      h1: "Reading Tables for Library and Study Rooms",
      lead: "Long-span tables with a steel under-frame that holds the top flat, finished to match the shelving in the same room.",
      points: [
        "Twin-beam under-frame limits sag on 1800–2400 mm spans.",
        "Tops in laminate, compact grade or steel, all cleanable with standard products.",
        "Quoted together with shelving and seating so the room arrives in one colour."
      ],
      specs: [
        ["Size", "1200–2400 W × 600–900 D × 720–750 H mm"],
        ["Structure", "Steel twin-beam frame, 40 × 40 mm legs, levelling feet"],
        ["Load", "120 kg evenly distributed per table"],
        ["Top", "25 mm melamine, 12 mm compact laminate, or 1.0 mm steel"],
        ["Packing", "Top and frame packed separately, 2–4 tables per carton set"],
        ["MOQ", "50 tables; mixed sizes accepted"]
      ],
      options: [
        ["Seating", "2, 4, 6 or 8 places; with or without centre screen"],
        ["Top", "Melamine, compact laminate, linoleum, or powder-coated steel"],
        ["Power", "Under-top cable tray with flip-up or grommet access"],
        ["Screen", "Acoustic panel or steel divider to split a long table"],
        ["Colour", "Frame RAL match; top tone matched to shelving"]
      ],
      scenes: [
        ["Reading rooms", "Long tables with centre screens between places."],
        ["Study and seminar rooms", "Modular tables that regroup for exams."],
        ["Staff and office libraries", "Compact 1200 mm tables in matched finish."]
      ],
      related: ["library-shelving", "school-desks-chairs", "desk-legs"]
    },
    {
      slug: "file-cabinets", num: "06", group: "office-furniture",
      name: "File Cabinets",
      cardDesc: "2–4 drawer, anti-tip interlock, knock-down export pack.",
      h1: "File Cabinets for Office and Records Storage",
      lead: "Drawer cabinets with an anti-tip interlock, built to ship flat and stack neatly in a container.",
      points: [
        "Interlock prevents a second drawer opening while one is out.",
        "Drawer runners rated for daily filing loads, with a stop to keep drawers in the cabinet.",
        "Knock-down construction raises container utilisation versus welded cabinets."
      ],
      specs: [
        ["Size", "W 400–900 × D 400–600 × H 620–1320 mm; 2–4 drawers"],
        ["Structure", "0.7–1.0 mm cold-rolled steel body; 3-section ball-bearing runners"],
        ["Load", "40–50 kg per drawer, evenly distributed"],
        ["Finish", "Powder coating 60–80 µm over phosphate pre-treatment"],
        ["Packing", "Knock-down, 1–2 cabinets per carton, assembly sheet inside"],
        ["MOQ", "50 units; mixed models accepted"]
      ],
      options: [
        ["Drawer count", "2, 3 or 4 drawers; narrow or wide body"],
        ["Lock", "Key lock, central lock, or cam lock with master key"],
        ["Handle", "Recessed pull, full-width bar, or label holder"],
        ["Interior", "Hanging file frame, divider set, or pencil tray"],
        ["Branding", "Logo plate, silk-screen, or printed carton"]
      ],
      scenes: [
        ["Open-plan offices", "Personal storage under or beside workstations."],
        ["Records rooms", "Lockable filing for HR and finance."],
        ["Dealer programmes", "Own-brand cabinets shipped on a call-off schedule."]
      ],
      related: ["steel-office-cabinets", "mobile-shelving", "desk-legs"]
    },
    {
      slug: "warehouse-racking", num: "07", group: "storage-racking",
      name: "Warehouse Racking",
      cardDesc: "Light to heavy duty, boltless, expandable uprights.",
      h1: "Warehouse Racking for Storage Expansion",
      lead: "Boltless racking sized by load per level and clear height, so a store can add levels later without replacing the frame.",
      points: [
        "Load classes separated by kg per level, not by marketing name.",
        "Punched uprights let you add a level without buying a new frame.",
        "Loading plan supplied per container type before the order is packed."
      ],
      specs: [
        ["Upright", "55 × 45 / 80 × 50 mm, 1.5–2.0 mm; height 1500–6000 mm"],
        ["Beam", "50 × 30 / 80 × 50 mm stepped beam, 1.2–1.5 mm"],
        ["Load", "Light 100–200 kg, medium 300–500 kg, heavy 800–1500 kg per level"],
        ["Levels", "2–8 levels; pitch 50 mm on punched uprights"],
        ["Finish", "Powder-coated uprights and beams; galvanised option"],
        ["MOQ", "1 container load (approx. 20–25 t)"]
      ],
      options: [
        ["Duty", "Light, medium or heavy; upright thickness matched to load"],
        ["Deck", "Steel panel, wire mesh, or chipboard deck"],
        ["Accessories", "Beam lock, safety pin, upright protector, foot plate"],
        ["Layout", "Single-run, back-to-back, or free-standing island"],
        ["Colour", "Ink grey uprights with accent orange beams, or full RAL match"]
      ],
      scenes: [
        ["Distribution warehouses", "Medium-duty picking with room to add levels."],
        ["Factory stores", "Raw material and tooling on heavy-duty beams."],
        ["Cold and dry stores", "Galvanised frames where humidity is high."]
      ],
      related: ["stacking-racks", "mobile-shelving", "file-cabinets"]
    },
    {
      slug: "stacking-racks", num: "08", group: "storage-racking",
      name: "Stacking Racks",
      cardDesc: "Stack 3–4 high, fold flat when empty, pallet compatible.",
      h1: "Stacking Racks for Pallet and Bulk Storage",
      lead: "Demountable steel racks that stack three or four high, then fold down to a fraction of their height when empty.",
      points: [
        "Stacking posts locate into corner cups so tiers sit square under load.",
        "Empty units nest down, cutting return freight and yard space.",
        "Base dimensions matched to standard pallet footprints and forklift pockets."
      ],
      specs: [
        ["Size", "1200 × 1000 / 1200 × 1200 / 1500 × 1200 mm base"],
        ["Structure", "40 × 40 / 50 × 50 mm tube posts with corner cups, 1.5–2.0 mm"],
        ["Load", "500–1000 kg per unit; 3–4 tiers stacked (static, level floor)"],
        ["Deck", "Steel panel or timber deck; forklift access two or four ways"],
        ["Finish", "Powder coating; galvanised option for outdoor yards"],
        ["MOQ", "50 units"]
      ],
      options: [
        ["Tiers", "3 or 4 high; mixed heights in one order"],
        ["Deck", "Steel, timber, or mesh"],
        ["Feet", "Standard foot, or forklift pocket base"],
        ["Collapse", "Fixed post, demountable post, or folding side"],
        ["Colour", "Ink grey, accent orange, or RAL match"]
      ],
      scenes: [
        ["Bulk warehouses", "Free-standing stacks without a fixed racking install."],
        ["Seasonal overflow", "Extra capacity that folds away out of season."],
        ["Export packing yards", "Stacked goods waiting for container loading."]
      ],
      related: ["warehouse-racking", "mobile-shelving", "bunk-beds"]
    },
    {
      slug: "steel-office-cabinets", num: "09", group: "office-furniture",
      name: "Steel Office Cabinets",
      cardDesc: "Swing, sliding or glass doors; shelving and hanging rail.",
      h1: "Steel Office Cabinets for Fit-Out and OEM Programmes",
      lead: "Swing, sliding and glass-door cabinets with internal shelving or a hanging rail, finished to match the file cabinets on the same floor.",
      points: [
        "Door matrix covers open storage, closed storage and display in one body depth.",
        "Interior configured per floor: shelves, hanging rail, or a mix.",
        "Same colour and texture as the file cabinet range, so a fit-out reads as one system."
      ],
      specs: [
        ["Size", "W 800–1200 × D 400–500 × H 1800–2000 mm"],
        ["Structure", "0.7–0.9 mm cold-rolled steel body and doors; reinforced shelves"],
        ["Load", "40–60 kg per shelf, evenly distributed"],
        ["Finish", "Powder coating 60–80 µm; glass doors in 4 mm tempered glass"],
        ["Packing", "Knock-down, 1 cabinet per carton with edge protection"],
        ["MOQ", "50 units"]
      ],
      options: [
        ["Door type", "Swing, sliding, glass, louvre, or mixed"],
        ["Interior", "4–5 shelves, hanging rail, or shelf-and-rail combination"],
        ["Lock", "Key lock, central lock, or padlock hasp"],
        ["Base", "Plinth, levelling feet, or castors"],
        ["Branding", "Logo plate, silk-screen, or own-brand carton and manual"]
      ],
      scenes: [
        ["Office fit-out", "Storage walls matched to workstation colour."],
        ["Staff rooms and archives", "Hanging rail plus shelving in one body."],
        ["Dealer and OEM programmes", "Own-brand cabinets on a repeat schedule."]
      ],
      related: ["file-cabinets", "mobile-shelving", "bunk-beds"]
    },
    {
      slug: "desk-legs", num: "10", group: "desk-frames",
      name: "Desk Legs & Table Frames",
      cardDesc: "Fixed or adjustable height, square or round tube.",
      h1: "Desk Legs & Table Frames for Assemblers",
      lead: "Steel leg sets and table frames drilled to your desktop pattern, supplied with the hardware pack your line needs.",
      points: [
        "Frame geometry quoted from your drawing, including fixing hole pattern.",
        "Wall thickness and tube profile stated in writing, not left to sample luck.",
        "Small trial batches before a programme order, so your line can validate fit."
      ],
      specs: [
        ["Height", "Fixed 720–750 mm, or adjustable 680–760 mm"],
        ["Tube", "50 × 50 / 60 × 60 mm square, or 50/60 mm round, 1.2–2.0 mm wall"],
        ["Top size", "Matched to desktop 1200–1800 × 600–800 mm"],
        ["Load", "80–120 kg per frame set, static"],
        ["Finish", "Powder coating; optional pre-assembled with hardware bag"],
        ["MOQ", "100 sets; trial order of 20 sets available"]
      ],
      options: [
        ["Profile", "Square tube, round tube, or Y-frame"],
        ["Height", "Fixed, manually adjustable, or telescopic"],
        ["Feet", "Glide, levelling foot, or castor"],
        ["Cross bar", "Standard, or removable for flat packing"],
        ["Finish", "RAL match, chrome-look, or textured black"]
      ],
      scenes: [
        ["Desk assembly lines", "Leg sets drilled to the customer's top pattern."],
        ["Contract tables", "Frames for meeting and canteen tables."],
        ["Own-brand e-commerce", "Flat-packed frames with branded hardware bags."]
      ],
      related: ["adjustable-desk-frames", "reading-tables", "file-cabinets"]
    },
    {
      slug: "adjustable-desk-frames", num: "11", group: "desk-frames",
      name: "Adjustable Desk Frames",
      cardDesc: "Single or dual motor, 3-stage, CE/UL by market.",
      h1: "Adjustable Desk Frames for Own-Brand Programmes",
      lead: "Single- and dual-motor lifting frames in two- or three-stage columns, supplied as a kit for your own top, control panel and packaging.",
      points: [
        "Motor, load and stroke options stated per SKU so you can compare against your current supply.",
        "Compliance documentation listed per target market — only the reports actually held.",
        "Branding on the control panel, carton and manual for own-brand programmes."
      ],
      specs: [
        ["Height range", "2-stage 700–1200 mm; 3-stage 620–1280 mm"],
        ["Load", "Single motor 70 kg; dual motor 100–120 kg (dynamic)"],
        ["Speed / noise", "25–38 mm/s; below 50 dB(A) at no load"],
        ["Column", "2 or 3 stage, 70 × 70 / 80 × 50 mm oval or square"],
        ["Controls", "Up/down panel, 4-preset memory, or app/BLE module"],
        ["MOQ", "50 sets; sample sets available before programme order"]
      ],
      options: [
        ["Motor", "Single or dual; with or without memory panel"],
        ["Stage", "2-stage or 3-stage columns"],
        ["Frame width", "1100–1600 mm adjustable frame, or fixed width"],
        ["Safety", "Anti-collision, child lock, overheat protection"],
        ["Branding", "Panel logo, carton print, manual localisation"]
      ],
      scenes: [
        ["Own-brand desk programmes", "Frames kitted for local top assembly."],
        ["Office fit-out", "Height-adjustable bench systems in matched finish."],
        ["Education and labs", "Shared-use desks with fixed presets."]
      ],
      related: ["desk-legs", "file-cabinets", "reading-tables"]
    }
  ],

  /* ---- 5. 首页文案块 ---- */
  trust: [
    { value: "11", label: "product categories" },
    { value: "4", label: "project lines" },
    { value: "OEM", label: "& project supply" }
  ],

  lines: [
    {
      slug: "school-education", kicker: "Line 01", title: "One School",
      text: "Classrooms, dormitories and library from a single production schedule — desks and chairs, bunk beds, shelving and reading tables quoted together.",
      cats: ["Desks & chairs", "Bunk beds", "Shelving", "Reading tables"],
      media: "Classroom / dormitory scene"
    },
    {
      slug: "storage-racking", kicker: "Line 02", title: "One Warehouse",
      text: "Archive rooms and storage halls: compacting shelving where floor area is fixed, racking and stacking racks where the load grows.",
      cats: ["Mobile shelving", "Racking", "Stacking racks"],
      media: "Warehouse aisle scene"
    },
    {
      slug: "office-furniture", kicker: "Line 03", title: "One Office",
      text: "Cabinet walls, filing and desk frames in one finish for fit-out contractors and own-brand dealer programmes.",
      cats: ["Office cabinets", "File cabinets", "Desk frames"],
      media: "Office storage scene"
    }
  ],

  stats: [
    { value: null, label: "Plant area", unit: "m²" },
    { value: null, label: "Production equipment", unit: "units" },
    { value: null, label: "Monthly output", unit: "containers" },
    { value: null, label: "Export markets", unit: "countries" }
  ],

  process: [
    { k: "01", title: "Drawing", text: "You send a drawing, a sample photo or a room dimension. We return a dimensioned proposal with material and finish called out." },
    { k: "02", title: "Sampling", text: "A pre-production sample is built and shipped for approval before tooling or powder colour is locked." },
    { k: "03", title: "Mass production", text: "Batch scheduled against your delivery window, with inspection points at cutting, welding and coating." },
    { k: "04", title: "Export packing", text: "Flat-pack, moisture barrier, container loading plan. Mixed SKU containers are quoted as a standard option." }
  ],

  certs: [
    { name: "Certificate 01", id: "number + validity — to be supplied" },
    { name: "Certificate 02", id: "number + validity — to be supplied" },
    { name: "Certificate 03", id: "number + validity — to be supplied" },
    { name: "Certificate 04", id: "number + validity — to be supplied" }
  ],

  cases: [
    { industry: "Education", title: "Secondary school fit-out", text: "Classroom desks and chairs, dormitory bunk beds and library shelving delivered in three shipments against a term start date.", meta: "Volume to be confirmed" },
    { industry: "Warehouse", title: "Distribution centre expansion", text: "Medium-duty racking and stacking racks for a store that needed to add levels without relocating.", meta: "Volume to be confirmed" },
    { industry: "Office", title: "Dealer cabinet programme", text: "Own-brand filing and office cabinets on a call-off schedule for a regional contract dealer.", meta: "Volume to be confirmed" }
  ],

  resources: [
    { title: "2026 Product Catalog", meta: "PDF · 11 categories", text: "Every category with size ranges, options and packing data." },
    { title: "MOQ & Lead Time Guide", meta: "PDF · 2 pages", text: "Minimum quantities, sampling time and production windows per category." }
  ],

  faq: [
    { q: "What is the minimum order?", a: "It depends on the category: 50 sets for most furniture lines, one container load for warehouse racking, one room set for mobile shelving. Mixed-category containers are quoted as a standard option, so a first order can combine school and storage items." },
    { q: "How long does sampling take?", a: "A pre-production sample is normally built within 10–15 working days of drawing approval, plus freight. Tooling or a custom powder colour adds time, which we state in the quotation." },
    { q: "Which payment terms do you work on?", a: "Typically a deposit with the balance against the bill of lading copy. Terms for repeat programmes are agreed per customer and confirmed in the proforma invoice." },
    { q: "How is furniture packed for sea freight?", a: "Flat pack in 5-layer corrugated cartons, with a moisture barrier inside for humid destinations. Knock-down construction is used wherever it raises container utilisation." },
    { q: "Can I mix categories in one container?", a: "Yes. School desks, bunk beds, shelving and cabinets can be combined in a single container; we issue a loading plan before packing so the volume and weight are confirmed up front." },
    { q: "What do you need to quote?", a: "A drawing, a reference photo or the room dimensions, plus quantity, destination port and target market. With those four items we can return a price and a lead time rather than a catalogue page." }
  ]
};
