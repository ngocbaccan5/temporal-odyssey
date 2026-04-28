/*
   Temporal Odyssey - Vietnamese text, asset icon, and assistant UI cleanup.
   Loaded after app.js and api-layer.js so it can normalize static and dynamic UI.
*/
(function () {
  'use strict';

  var ICON_URL = '/static/assets/images/icons/icon1.jpg';
  var MYTH_MAP_BG = '/static/assets/images/backgrounds/cacman.jpg';
  var GREETING_PREFIX = 'Chào bạn, tôi là trợ lý AI của Temporal Odyssey.';

  var CP1252 = {
    0x20AC: 0x80, 0x201A: 0x82, 0x0192: 0x83, 0x201E: 0x84,
    0x2026: 0x85, 0x2020: 0x86, 0x2021: 0x87, 0x02C6: 0x88,
    0x2030: 0x89, 0x0160: 0x8A, 0x2039: 0x8B, 0x0152: 0x8C,
    0x017D: 0x8E, 0x2018: 0x91, 0x2019: 0x92, 0x201C: 0x93,
    0x201D: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97,
    0x02DC: 0x98, 0x2122: 0x99, 0x0161: 0x9A, 0x203A: 0x9B,
    0x0153: 0x9C, 0x017E: 0x9E, 0x0178: 0x9F
  };

  var MOJIBAKE_RE = /(Ã|Â|â|ð|áº|á»|Æ|Ä|Å|€|™|œ|ž|Ÿ|¿|½|¼|ƒ)/g;
  var EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}\u{1F1E0}-\u{1F1FF}]/gu;

  function mojibakeScore(text) {
    if (!text) return 0;
    var matches = text.match(MOJIBAKE_RE);
    return matches ? matches.length : 0;
  }

  function fixMojibake(text) {
    if (typeof text !== 'string' || mojibakeScore(text) === 0) return text;
    try {
      var bytes = [];
      for (var i = 0; i < text.length; i++) {
        var code = text.charCodeAt(i);
        if (code <= 0xFF) bytes.push(code);
        else if (CP1252[code]) bytes.push(CP1252[code]);
        else return text;
      }
      var fixed = new TextDecoder('utf-8', { fatal: true }).decode(new Uint8Array(bytes));
      return mojibakeScore(fixed) < mojibakeScore(text) ? fixed : text;
    } catch (e) {
      return text;
    }
  }

  function normalizeText(text) {
    return fixMojibake(String(text || '')).replace(/\s+/g, ' ').trim();
  }

  function stripEmoji(text) {
    return normalizeText(text).replace(EMOJI_RE, '').replace(/\s+/g, ' ').trim();
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach(function (el, index) {
      el.textContent = typeof value === 'function' ? value(el, index) : value;
    });
  }

  function functionTextByIndex(values) {
    return function (el, index) {
      return values[index] || el.textContent;
    };
  }

  function iconImg(className) {
    var img = document.createElement('img');
    img.src = ICON_URL;
    img.alt = '';
    img.className = 'asset-icon ' + (className || '');
    img.loading = 'lazy';
    return img;
  }

  function replaceWithIcon(selector, className) {
    document.querySelectorAll(selector).forEach(function (el) {
      if (el.querySelector('img.asset-icon')) return;
      el.textContent = '';
      el.appendChild(iconImg(className));
    });
  }

  function prependIcon(selector, className) {
    document.querySelectorAll(selector).forEach(function (el) {
      if (el.querySelector(':scope > img.asset-icon')) return;
      el.insertBefore(iconImg(className), el.firstChild);
    });
  }

  function setIconText(selector, text, className) {
    document.querySelectorAll(selector).forEach(function (el) {
      var img = el.querySelector(':scope > img.asset-icon') || iconImg(className || 'brand-icon');
      el.textContent = '';
      el.appendChild(img);
      el.appendChild(document.createTextNode(text));
    });
  }

  function injectStyles() {
    if (document.getElementById('to-cleanup-style')) return;
    var style = document.createElement('style');
    style.id = 'to-cleanup-style';
    style.textContent = [
      'html,body,input,button,select,textarea{font-family:"Segoe UI",Tahoma,Verdana,Arial,sans-serif!important;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;}',
      '.asset-icon{width:1em;height:1em;border-radius:50%;object-fit:cover;object-position:center;display:inline-block;vertical-align:-.12em;box-shadow:0 0 10px rgba(201,168,76,.28);}',
      '.tnbrand .asset-icon,.side-menu-brand .asset-icon{width:38px;height:38px;margin-right:10px;flex:0 0 auto;}',
      '#chatbot-btn{width:58px!important;height:58px!important;z-index:1201!important;}',
      '#chatbot-btn .asset-icon{width:54px;height:54px;}',
      '.chatbot-title .asset-icon{width:22px;height:22px;margin-right:8px;}',
      '.cat-em .asset-icon{width:74px;height:74px;border:2px solid rgba(240,208,128,.65);}',
      '.bni-ic{width:38px!important;height:38px!important;}',
      '.bni-ic::after{display:none!important;}',
      '.bni-ic .asset-icon{width:34px;height:34px;}',
      '.diff-icon .asset-icon,.pw-icon .asset-icon,.pay-hero-icon .asset-icon,.pay-card-icon .asset-icon,.pay-success-icon .asset-icon{width:30px;height:30px;}',
      '#evhem .asset-icon{width:70px;height:70px;border:2px solid rgba(240,208,128,.55);}',
      '.path-node-circle .asset-icon{width:52px;height:52px;border:2px solid rgba(240,208,128,.75);box-shadow:0 0 0 3px rgba(0,0,0,.35),0 0 14px rgba(240,208,128,.35);}',
      '#s-map .reward-section{width:min(960px,calc(100% - 32px))!important;max-width:960px!important;margin:10px auto 0!important;padding:10px 14px!important;border-radius:18px!important;background:rgba(12,13,24,.68)!important;border:1px solid rgba(240,208,128,.18)!important;backdrop-filter:blur(10px);box-shadow:0 12px 28px rgba(0,0,0,.25)!important;}',
      '#s-map .reward-ttl{font-size:12px!important;color:#f0d080!important;letter-spacing:1.4px!important;margin:0 0 8px!important;text-align:left!important;}',
      '#s-map .badges-row{justify-content:center;gap:14px!important;}',
      '#s-map .badge-item{min-width:92px!important;padding:8px 10px!important;background:rgba(255,255,255,.06)!important;border:1px solid rgba(240,208,128,.14)!important;}',
      '#s-map .badge-lbl{font-size:12px!important;color:#f8eac5!important;line-height:1.25!important;}',
      '.badge-item .asset-icon{width:34px;height:34px;margin-bottom:3px;}',
      '.chatbot-modal{left:14px!important;bottom:136px!important;width:min(360px,calc(100vw - 28px))!important;max-height:min(520px,calc(100vh - 170px))!important;z-index:1200!important;}',
      '.chatbot-messages{min-height:0!important;}',
      '.chat-bubble{word-break:break-word;}',
      '#s-map.theme-myth{background:linear-gradient(180deg,rgba(18,5,15,.38),rgba(18,5,15,.88)),url("' + MYTH_MAP_BG + '") center center/cover no-repeat!important;}',
      '#s-map.theme-myth .path-map-wrap,#s-map.theme-myth .path-map-viewport,#s-map.theme-myth .path-map-canvas{background:transparent!important;}',
      '#s-map.theme-myth .path-map-viewport::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(18,5,15,.18),rgba(18,5,15,.72));z-index:0;pointer-events:none;}',
      '#s-map.theme-myth .path-map-canvas{z-index:1;}',
      '#chatbot-msgs .chat-msg.bot[data-auto-greeting]{display:none!important;}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function normalizeDataObject(root) {
    if (!root || typeof root !== 'object') return;
    Object.keys(root).forEach(function (key) {
      var value = root[key];
      if (typeof value === 'string') root[key] = fixMojibake(value);
      else if (Array.isArray(value)) value.forEach(function (item, i) {
        if (typeof item === 'string') value[i] = fixMojibake(item);
        else normalizeDataObject(item);
      });
      else if (value && typeof value === 'object') normalizeDataObject(value);
    });
  }

  function normalizeAppData() {
    if (window.CATS) normalizeDataObject(window.CATS);
    if (window.EVS) normalizeDataObject(window.EVS);
    try {
      if (typeof CATS !== 'undefined') normalizeDataObject(CATS);
      if (typeof EVS !== 'undefined') normalizeDataObject(EVS);
    } catch (e) {
      /* Global lexical bindings may be unavailable in unusual script loaders. */
    }
  }

  function fixStaticVietnamese() {
    setIconText('.tnbrand,.side-menu-brand', ' TEMPORAL ODYSSEY', 'brand-icon');
    setText('.side-tab[onclick*="info"]', 'Thông tin');
    setText('.side-tab[onclick*="lang"]', 'Ngôn ngữ');
    setText('#side-username', 'Khách');
    var sideStats = document.querySelectorAll('.side-stat');
    if (sideStats[1] && document.getElementById('side-plays')) {
      sideStats[1].firstChild.textContent = '';
      var playsTail = document.getElementById('side-plays').nextSibling;
      if (playsTail) playsTail.textContent = ' bàn đã chơi';
    }
    var sideFree = document.querySelector('.side-user-free');
    if (sideFree && document.getElementById('side-free')) {
      sideFree.firstChild.textContent = 'Còn ';
      var tail = document.getElementById('side-free').nextSibling;
      if (tail) tail.textContent = ' lượt miễn phí';
    }
    setText('.side-menu-item[onclick*="journal"]', 'Nhật Ký & Xếp Hạng');
    document.querySelectorAll('.side-menu-item').forEach(function (el) {
      if ((el.getAttribute('onclick') || '').indexOf("go('pay'") >= 0) el.textContent = 'Nâng Cấp';
    });
    setText('.side-menu-item[onclick*="showSearchModal"]', 'Tìm kiếm lịch sử');
    setText('.side-menu-item.danger', 'Đăng xuất');
    setText('.side-menu-section', 'Tiến độ mở khóa');
    setText('#acc-myth .side-acc-header > span', 'Huyền Thoại');
    setText('#acc-battle .side-acc-header > span', 'Chiến Trận');
    setText('#acc-dynasty .side-acc-header > span', 'Triều Đại');
    setText('#acc-myth .side-unlock-badge', 'Đã mở');
    setText('#acc-myth .side-acc-desc', 'Dễ - Kể chuyện chọn nhánh');
    setText('#acc-battle .side-acc-desc', 'Vừa - Quiz tốc độ có đếm giờ');
    setText('#acc-dynasty .side-acc-desc', 'Khó - Sắp xếp timeline lịch sử');
    setText('#battle-req', 'Cần chơi Huyền Thoại đến bàn 15');
    setText('#dynasty-req', 'Cần CT bàn 15 + HT bàn 30');
    setText('#slang-vi .slang-name', 'Tiếng Việt');
    setText('#slang-vi .slang-sub', 'Việt Nam');
    setText('#slang-fr .slang-name', 'Français');
    setText('#spanel-lang > div:first-child', 'Chọn ngôn ngữ hiển thị trong ứng dụng.');
    setText('#s-catselect .topnav > div:last-child', 'Chọn hành trình');
    setText('.catselect-title', 'Chọn Hành Trình Của Bạn');
    setText('.catselect-sub', 'Mỗi con đường có cách chơi, độ khó và phần thưởng riêng');
    setText('#cs-myth .cat-name', 'Huyền Thoại');
    setText('#cs-battle .cat-name', 'Chiến Trận');
    setText('#cs-dynasty .cat-name', 'Triều Đại');
    setText('#cs-myth-status', 'Mở khóa');
    setText('#cs-battle-status', 'Cần Huyền Thoại bàn 15');
    setText('#cs-dynasty-status', 'Cần Chiến Trận bàn 15 + Huyền Thoại bàn 30');
    document.querySelectorAll('.cat[data-cat="myth"]').forEach(function (cat) {
      var meta = cat.querySelectorAll('.cat-meta span');
      if (meta[0]) meta[0].textContent = 'Dễ';
      if (meta[1]) meta[1].textContent = 'Kể Chuyện';
      var name = cat.querySelector('.cat-name');
      if (name) name.textContent = 'Huyền Thoại';
      var pill = cat.querySelector('.cat-pill');
      if (pill) pill.textContent = pill.classList.contains('cat-status') ? 'Mở khóa' : 'Khám Phá';
    });
    document.querySelectorAll('.cat[data-cat="battle"]').forEach(function (cat) {
      var meta = cat.querySelectorAll('.cat-meta span');
      if (meta[0]) meta[0].textContent = 'Vừa';
      if (meta[1]) meta[1].textContent = 'Tốc Độ';
      var name = cat.querySelector('.cat-name');
      if (name) name.textContent = 'Chiến Trận';
      var pill = cat.querySelector('.cat-pill');
      if (pill && !cat.querySelector('.cat-locked-overlay')) pill.textContent = 'Khám Phá';
    });
    document.querySelectorAll('.cat[data-cat="dynasty"]').forEach(function (cat) {
      var meta = cat.querySelectorAll('.cat-meta span');
      if (meta[0]) meta[0].textContent = 'Khó';
      if (meta[1]) meta[1].textContent = 'Timeline';
      var name = cat.querySelector('.cat-name');
      if (name) name.textContent = 'Triều Đại';
      var pill = cat.querySelector('.cat-pill');
      if (pill && !cat.querySelector('.cat-locked-overlay')) pill.textContent = 'Khám Phá';
    });
    setText('.tnlink[onclick*="showSearchModal"]', 'Tìm Kiếm');
    var langToggle = document.querySelector('#lang-sel-wrap > span[onclick]');
    if (langToggle) langToggle.innerHTML = '<span id="lang-label">VI</span> ▾';
    var langOpts = document.querySelectorAll('.lang-menu .lang-opt');
    if (langOpts[0]) langOpts[0].textContent = 'Tiếng Việt';
    if (langOpts[1]) langOpts[1].textContent = 'English';
    if (langOpts[2]) langOpts[2].textContent = '中文';
    setText('.hsub', 'Cuộc Hành Trình Xuyên Thời Gian');
    setText('.hdesc', 'Mỗi con đường có cách chơi, độ khó và phần thưởng riêng.');
    setText('.intro-trigger', 'Giới thiệu trò chơi');
    setText('.intro-popup-title', 'Temporal Odyssey là gì?');
    document.querySelectorAll('.intro-popup p').forEach(function (p, i) {
      if (i === 0) p.innerHTML = 'Ứng dụng học lịch sử Việt Nam qua <strong>trò chơi tương tác</strong>. Chọn một trong ba hành trình:';
      if (i === 1) p.innerHTML = 'Mỗi sự kiện có <em>video minh họa, câu hỏi và phần thưởng huy hiệu</em> riêng. Hoàn thành để bản đồ mở khóa chủ đề mới!';
    });
    var introItems = document.querySelectorAll('.intro-popup li');
    if (introItems[0]) introItems[0].innerHTML = '<strong>Huyền Thoại</strong> - kể chuyện chọn nhánh, phù hợp người mới';
    if (introItems[1]) introItems[1].innerHTML = '<strong>Chiến Trận</strong> - quiz tốc độ có đếm giờ';
    if (introItems[2]) introItems[2].innerHTML = '<strong>Triều Đại</strong> - sắp xếp timeline lịch sử';
    setText('.btn-main[onclick*="catselect"]', 'BẮT ĐẦU HÀNH TRÌNH');
    setText('.journal-tab#journal-tab-history', 'Nhật Ký');
    setText('.journal-tab#journal-tab-rank', 'Xếp Hạng');
    setText('#s-journal .mapbar-title', 'Nhật Ký & Xếp Hạng');
    setText('.journal-kicker', functionTextByIndex(['Hồ sơ hiện tại', 'Tổng điểm', 'Lượt miễn phí', 'Tổng quan']));
    setText('#journal-current-summary', 'Theo dõi lịch sử trải nghiệm và tiến trình điểm số của bạn.');
    setText('#journal-stats-summary', 'Chưa có dữ liệu trải nghiệm.');
    setText('#ev-bar-title', 'Sự Kiện');
    setText('#evhtitle', 'Trận Bạch Đằng');
    var cat = window.curCat || 'myth';
    var catText = cat === 'myth' ? 'HUYỀN THOẠI' : cat === 'battle' ? 'CHIẾN TRẬN' : 'TRIỀU ĐẠI';
    var diffText = cat === 'myth' ? 'DỄ' : cat === 'battle' ? 'TRUNG BÌNH' : 'KHÓ';
    var diffDesc = cat === 'myth'
      ? 'Kể chuyện tương tác - chọn nhánh câu chuyện, không giới hạn thời gian.'
      : cat === 'battle'
        ? 'Quiz tốc độ có đếm giờ - trả lời nhanh để nhận điểm x2.'
        : 'Sắp xếp các triều đại hoặc sự kiện theo đúng thứ tự thời gian.';
    setText('#diff-name', catText + ' - ĐỘ KHÓ: ' + diffText);
    setText('#diff-desc', diffDesc);
    setText('#reward-ttl', 'HUY HIỆU ' + catText);
    setText('#s-pay .mapbar-title', 'Nâng Cấp Hành Trình');
    setText('#pw-title-text', 'Nâng Cấp Hành Trình');
    var pwDesc = document.getElementById('pw-desc-text');
    if (pwDesc && /\?/.test(pwDesc.textContent)) {
      pwDesc.innerHTML = 'Bạn đã dùng hết <strong style="color:var(--gold)">5 lượt miễn phí</strong>.<br>Dùng XP hoặc nâng cấp để tiếp tục!';
    }
    setText('.xp-redeem-title', 'Dùng XP để mở khóa');
    document.querySelectorAll('.xp-reward').forEach(function (el) {
      var t = el.textContent;
      if (/3/.test(t)) el.textContent = '+3 lượt chơi';
      else if (/8/.test(t)) el.textContent = '+8 lượt chơi';
      else el.textContent = 'Không giới hạn 24h';
    });
    setText('.xp-badge', 'Tốt nhất');
    var xpCurrent = document.querySelector('.xp-current');
    if (xpCurrent && document.getElementById('pw-xp-display')) {
      xpCurrent.firstChild.textContent = 'XP hiện tại: ';
    }
    setText('.plan-ribbon', 'PHỔ BIẾN NHẤT');
    var planNames = document.querySelectorAll('.plan-name');
    if (planNames[0]) planNames[0].textContent = 'Chiến Binh Thời Gian';
    if (planNames[1]) planNames[1].textContent = 'Người Khám Phá';
    document.querySelectorAll('.plan-feats > div').forEach(function (el) {
      var text = stripEmoji(el.textContent);
      if (/Video/i.test(text)) el.lastChild.textContent = 'Video AI chất lượng cao';
      else if (/huy/i.test(text)) el.lastChild.textContent = 'Tất cả huy hiệu';
      else if (/x.p h.ng|xếp hạng/i.test(text)) el.lastChild.textContent = 'Bảng xếp hạng toàn quốc';
      else if (/qu.ng|c.o/i.test(text)) el.lastChild.textContent = 'Không quảng cáo';
      else if (/Ch.n|danh/i.test(text)) el.lastChild.textContent = 'Chọn 1 danh mục - 20 sự kiện';
      else if (/co b.n|cơ bản/i.test(text)) el.lastChild.textContent = 'Video cơ bản';
      else if (/To.n|50/i.test(text)) el.lastChild.textContent = 'Toàn bộ 3 danh mục - 50+ sự kiện';
      else if (/Kh.ng c.|Không có/i.test(text)) el.lastChild.textContent = 'Không có bảng xếp hạng';
    });
    setText('#vmod-ttl', 'Video Lịch Sử');
    setText('#vsim-txt', 'Đang tải...');
    setText('.vmod-note', 'Nguồn: Nhóm phát triển Temporal Odyssey');
    setText('#pay-plan-title', 'Thanh Toán');
    setText('#pay-name', 'Chiến Binh Thời Gian');
    setText('#pay-price', '49.000 VNĐ / tháng');
    setText('.pay-section-title', 'Thông tin thanh toán');
    setText('.pay-label', functionTextByIndex(['Số thẻ', 'Hạn sử dụng', 'CVV', 'Tên chủ thẻ']));
    setText('.pay-demo-note', 'Demo - nhập bất kỳ thông tin để thử nghiệm');
    setText('.pay-confirm-btn', 'Xác nhận thanh toán');
    setText('.pay-secure', 'Thanh toán bảo mật SSL 256-bit');
    setText('.pay-success-title', 'Thanh toán thành công!');
    setText('.pay-success-sub', 'Hành trình của bạn đã được mở khóa');
    setText('.pay-start-btn', 'Bắt đầu ngay');
    setText('#s-admin .mapbar-title', 'QUẢN TRỊ HỆ THỐNG');
    setText('#s-admin .btn-ghost[onclick*="landing"]', 'Về trang chủ');
    setText('#s-admin .btn-ghost[onclick*="handleLogout"]', 'Đăng xuất');
    setText('#s-admin h2', 'Danh sách người chơi');
    setText('#s-admin .btn-main', 'Xóa toàn bộ dữ liệu người chơi');
    setText('#quiz-title', 'Kiểm Tra Kiến Thức');
    setText('.quiz-loading', 'Đang tải câu hỏi...');
    setText('#chatbot-btn', '');
    var chatbotButton = document.getElementById('chatbot-btn');
    if (chatbotButton) chatbotButton.title = 'Hỏi đáp lịch sử AI';
    setText('.chatbot-title', 'Trợ Lý Lịch Sử AI');
    setText('.chatbot-close', '×');
    dedupeChatbotGreeting();
    setText('.chatbot-input', '');
    var chatInput = document.getElementById('chatbot-input');
    if (chatInput) chatInput.placeholder = 'Hỏi về lịch sử Việt Nam...';
  }

  function cleanChips() {
    document.querySelectorAll('.chip').forEach(function (chip) {
      var span = chip.querySelector('span');
      if (!span) return;
      var suffix = /xp/i.test(chip.textContent) ? ' XP' : '';
      chip.textContent = '';
      chip.appendChild(span);
      chip.appendChild(document.createTextNode(suffix));
    });
  }

  function fixGenericTextNodes(root) {
    var walker = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      var node = walker.currentNode;
      var fixed = fixMojibake(node.textContent);
      if (fixed !== node.textContent) node.textContent = fixed;
    }
  }

  function cleanLabels() {
    document.querySelectorAll('.bni-lb').forEach(function (el) {
      var text = stripEmoji(el.textContent);
      if (/b.n/i.test(text)) el.textContent = 'Bản Đồ';
      else if (/nh.t/i.test(text)) el.textContent = 'Nhật Ký';
      else if (/n.ng|c.p/i.test(text)) el.textContent = 'Nâng Cấp';
      else el.textContent = text;
    });
    document.querySelectorAll('.cat-meta span,.cat-pill,.mapbar-title,.side-menu-item,.side-acc-desc,.side-acc-count,.side-unlock-badge').forEach(function (el) {
      el.textContent = stripEmoji(el.textContent);
    });
    cleanChips();
  }

  function applyIcons() {
    document.querySelectorAll('link[rel~="icon"]').forEach(function (link) {
      link.href = ICON_URL;
    });
    replaceWithIcon('#chatbot-btn', 'chat-main-icon');
    prependIcon('.tnbrand,.side-menu-brand', 'brand-icon');
    replaceWithIcon('.cat-em,.bni-ic,.diff-icon,.pw-icon,.pay-hero-icon,.pay-card-icon,.pay-success-icon,#evhem,.lock-icon,.fy,.fn,.path-lock', 'ui-main-icon');
    replaceWithIcon('.path-node-circle > span', 'node-icon');
    document.querySelectorAll('.back-btn,.side-menu-close,.quiz-close,.vmod-x,.path-arrow,.path-nav-btn').forEach(function (el) {
      var text = stripEmoji(el.textContent);
      if (!text || /\?/.test(text)) el.textContent = '‹';
      if (el.classList.contains('path-arrow-r') || el.id === 'path-next') el.textContent = '›';
    });
    document.querySelectorAll('.badge-item').forEach(function (item) {
      if (!item.querySelector(':scope > img.asset-icon')) item.insertBefore(iconImg('badge-icon'), item.firstChild);
      Array.from(item.childNodes).forEach(function (node) {
        if (node.nodeType === Node.TEXT_NODE) node.textContent = '';
      });
    });
  }

  function getScreenLabel(screen, cat) {
    if (screen === 'map') return cat === 'myth' ? 'bản đồ Huyền Thoại' : cat === 'battle' ? 'bản đồ Chiến Trận' : 'bản đồ Triều Đại';
    if (screen === 'event') return 'màn sự kiện lịch sử';
    if (screen === 'journal') return 'màn Nhật Ký và Xếp Hạng';
    if (screen === 'pay' || screen === 'payment') return 'màn thanh toán';
    if (screen === 'catselect') return 'màn chọn hành trình';
    if (screen === 'admin') return 'màn quản trị';
    return 'Temporal Odyssey';
  }

  function dedupeChatbotGreeting() {
    var msgs = document.getElementById('chatbot-msgs');
    if (!msgs) return;
    var greeting = 'Xin chào! Tôi là trợ lý AI chuyên về lịch sử Việt Nam. Bạn muốn hỏi gì?';
    var botRows = Array.from(msgs.querySelectorAll('.chat-msg.bot'));
    var kept = false;
    botRows.forEach(function (row) {
      var bubble = row.querySelector('.chat-bubble');
      var text = bubble ? normalizeText(bubble.textContent) : '';
      var isGreeting = /xin chào|xin ch\?o|trợ lý ai|tr\? l\? ai|Temporal Odyssey/i.test(text);
      if (!isGreeting) return;
      if (!kept) {
        if (bubble) bubble.textContent = greeting;
        row.removeAttribute('data-auto-greeting');
        kept = true;
      } else {
        row.remove();
      }
    });
    if (!kept) {
      var row = document.createElement('div');
      row.className = 'chat-msg bot';
      var bubble = document.createElement('div');
      bubble.className = 'chat-bubble';
      bubble.textContent = greeting;
      row.appendChild(bubble);
      msgs.insertBefore(row, msgs.firstChild);
    }
  }

  function autoComposeGreeting(screen, cat) {
    dedupeChatbotGreeting();
    var input = document.getElementById('chatbot-input');
    if (input && !input.value) {
      input.value = GREETING_PREFIX + ' Tôi có thể giúp bạn tìm hiểu nội dung ở ' + getScreenLabel(screen, cat) + '.';
      input.dataset.autoDraft = '1';
    }
  }

  function escapeHtml(value) {
    var div = document.createElement('div');
    div.textContent = value || '';
    return div.innerHTML;
  }

  function renderChatText(value) {
    return escapeHtml(value)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  function localChatFallback(question) {
    var q = stripEmoji(question).toLowerCase();
    if (/lạc long|lac long|âu cơ|au co/.test(q)) {
      return 'Lạc Long Quân và Âu Cơ là truyền thuyết giải thích nguồn gốc dân tộc Việt: bọc trăm trứng, 50 con xuống biển và 50 con lên núi.';
    }
    if (/bạch đằng|bach dang|ngô quyền|ngo quyen/.test(q)) {
      return 'Trận Bạch Đằng năm 938 do Ngô Quyền chỉ huy, dùng cọc gỗ và thủy triều để đánh bại quân Nam Hán.';
    }
    if (/hùng vương|hung vuong|văn lang|van lang/.test(q)) {
      return 'Vua Hùng gắn với thời Văn Lang và các truyền thuyết dựng nước như bánh chưng bánh dày, Sơn Tinh Thủy Tinh, Thánh Gióng.';
    }
    return 'Mình có thể trả lời về lịch sử, văn hóa và truyền thuyết Việt Nam. Bạn hãy hỏi về một nhân vật, sự kiện hoặc triều đại cụ thể.';
  }

  function appendChatMessage(role, html) {
    var msgs = document.getElementById('chatbot-msgs');
    if (!msgs) return null;
    var row = document.createElement('div');
    row.className = 'chat-msg ' + role;
    var bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = html;
    row.appendChild(bubble);
    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;
    return row;
  }

  function patchChatbot() {
    var input = document.getElementById('chatbot-input');
    if (input && !input.dataset.cleanupBound) {
      input.dataset.cleanupBound = '1';
      input.addEventListener('input', function () {
        delete input.dataset.autoDraft;
      });
      input.addEventListener('focus', function () {
        if (input.dataset.autoDraft === '1') input.select();
      });
    }

    window.sendChat = async function () {
      var inp = document.getElementById('chatbot-input');
      var msgs = document.getElementById('chatbot-msgs');
      if (!inp || !msgs || window.__chatBusy) return;
      var question = inp.value.trim();
      if (!question) return;
      delete inp.dataset.autoDraft;
      inp.value = '';
      appendChatMessage('user', escapeHtml(question));
      var typing = appendChatMessage('bot', '<div class="chat-typing"><div class="chat-dot"></div><div class="chat-dot"></div><div class="chat-dot"></div></div>');
      window.__chatBusy = true;
      try {
        var headers = { 'Content-Type': 'application/json' };
        var token = sessionStorage.getItem('to_token') || localStorage.getItem('token') || localStorage.getItem('access_token') || '';
        if (token) headers.Authorization = 'Bearer ' + token;
        var res = await fetch('/api/chat', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ message: question })
        });
        var data = {};
        try { data = await res.json(); } catch (e) {}
        var answer = res.ok && data.reply ? data.reply : localChatFallback(question);
        if (typing) typing.remove();
        appendChatMessage('bot', renderChatText(answer));
      } catch (e) {
        if (typing) typing.remove();
        appendChatMessage('bot', escapeHtml(localChatFallback(question)));
      } finally {
        window.__chatBusy = false;
        msgs.scrollTop = msgs.scrollHeight;
      }
    };
  }

  function patchNavigation() {
    if (window.__toCleanupPatched) return;
    window.__toCleanupPatched = true;
    if (typeof window.go === 'function') {
      var originalGo = window.go;
      window.go = function (screen, cat, opts) {
        var result = originalGo.apply(this, arguments);
        setTimeout(function () {
          runCleanup();
          autoComposeGreeting(screen, cat || window.curCat);
        }, 80);
        return result;
      };
    }
    if (typeof window.openEv === 'function') {
      var originalOpenEv = window.openEv;
      window.openEv = function () {
        var result = originalOpenEv.apply(this, arguments);
        setTimeout(function () {
          runCleanup();
          autoComposeGreeting('event', window.curCat);
        }, 80);
        return result;
      };
    }
  }

  function observeDynamic() {
    if (window.__toCleanupObserver) return;
    var timer = null;
    window.__toCleanupObserver = new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(runCleanup, 80);
    });
    window.__toCleanupObserver.observe(document.body, { childList: true, subtree: true });
  }

  function runCleanup() {
    injectStyles();
    fixGenericTextNodes(document.body);
    fixStaticVietnamese();
    cleanLabels();
    applyIcons();
  }

  function init() {
    normalizeAppData();
    runCleanup();
    patchChatbot();
    patchNavigation();
    observeDynamic();
    var active = document.querySelector('.screen.active');
    if (active) autoComposeGreeting(active.id.replace(/^s-/, ''), window.curCat);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
