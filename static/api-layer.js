/* ════════════════════════════════════════════════════════════════
   Temporal Odyssey — API Layer
   Thay thế Firebase & localStorage bằng FastAPI backend.
   File này được load cuối cùng, override tất cả hàm auth/profile.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ── Token & State ──
  const LEGACY_USER_KEY = 'temporal_currentUser';
  let _token = sessionStorage.getItem('to_token') ||
    localStorage.getItem('token') ||
    localStorage.getItem('access_token') ||
    '';
  let _username = sessionStorage.getItem('to_user') ||
    localStorage.getItem(LEGACY_USER_KEY) ||
    '';
  let _cachedProfile = null;
  let _playedCache = {};
  const rawFetch = window.fetch.bind(window);

  function clientLog(type, detail) {
    var payload = JSON.stringify({
      type: type,
      path: window.location.pathname,
      detail: detail || {}
    });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/client-log', new Blob([payload], { type: 'application/json' }));
        return;
      }
    } catch (e) { /* fallback below */ }

    rawFetch('/api/client-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true
    }).catch(function () {});
  }

  window.fetch = async function () {
    var input = arguments[0];
    var opts = arguments[1] || {};
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    var method = (opts.method || (input && input.method) || 'GET').toUpperCase();

    try {
      var res = await rawFetch.apply(null, arguments);
      if (String(url).indexOf('/api/client-log') === -1) {
        clientLog('fetch', { method: method, url: String(url), status: res.status });
      }
      return res;
    } catch (e) {
      if (String(url).indexOf('/api/client-log') === -1) {
        clientLog('fetch-error', { method: method, url: String(url), text: e.message || 'fetch failed' });
      }
      throw e;
    }
  };

  window.addEventListener('load', function () {
    clientLog('load', { url: window.location.href, status: 'loaded' });
  });

  document.addEventListener('click', function (event) {
    var target = event.target.closest('button,[onclick],a,.cat,.path-node,.bni,.tnlink,.side-menu-item,.choice-btn');
    if (!target) return;
    clientLog('click', {
      tag: target.tagName,
      id: target.id || '',
      text: (target.innerText || target.getAttribute('aria-label') || '').trim().slice(0, 90),
      onclick: target.getAttribute('onclick') || ''
    });
  }, true);

  // ── API helper ──
  async function api(url, opts) {
    opts = opts || {};
    var headers = { 'Content-Type': 'application/json' };
    if (_token) headers['Authorization'] = 'Bearer ' + _token;
    if (opts.headers) Object.assign(headers, opts.headers);
    opts.headers = headers;
    var res = await fetch(url, opts);
    if (res.status === 401) {
      clearAuth();
      checkAuth();
      throw new Error('Phiên đăng nhập hết hạn');
    }
    if (res.status === 429) {
      throw new Error('Quá nhiều yêu cầu, vui lòng thử lại sau 1 phút');
    }
    var data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Lỗi hệ thống');
    return data;
  }

  function setAuth(token, username) {
    _token = token;
    _username = username;
    sessionStorage.setItem('to_token', token);
    sessionStorage.setItem('to_user', username);
    localStorage.setItem('token', token);
    localStorage.setItem('access_token', token);
    localStorage.setItem(LEGACY_USER_KEY, username);
  }

  function clearAuth() {
    _token = '';
    _username = '';
    _cachedProfile = null;
    _playedCache = {};
    sessionStorage.removeItem('to_token');
    sessionStorage.removeItem('to_user');
    localStorage.removeItem('token');
    localStorage.removeItem('access_token');
    localStorage.removeItem(LEGACY_USER_KEY);
  }

  // ══════════════════════════════════════
  //  AUTH OVERRIDES
  // ══════════════════════════════════════

  window.getCurrentUsername = function () {
    return _username;
  };

  window.handleLogin = async function () {
    var u = document.getElementById('login-user');
    var p = document.getElementById('login-pass');
    var err = document.getElementById('login-err');
    var uv = u ? u.value.trim() : '';
    var pv = p ? p.value : '';
    if (!uv || !pv) { if (err) err.textContent = 'Vui lòng nhập đầy đủ!'; return; }
    try {
      var d = await api('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username: uv, password: pv })
      });
      setAuth(d.access_token, d.username);
      window.xp = d.xp;
      window.freeLeft = d.free_left;
      if (err) err.textContent = '';
      checkAuth();
      if (typeof toast === 'function') toast('Xin chào ' + d.username);
    } catch (e) {
      if (err) err.textContent = e.message || 'Đăng nhập thất bại!';
    }
  };

  window.handleRegister = async function () {
    var u = document.getElementById('reg-user');
    var p = document.getElementById('reg-pass');
    var p2 = document.getElementById('reg-pass2');
    var err = document.getElementById('reg-err');
    var uv = u ? u.value.trim() : '';
    var pv = p ? p.value : '';
    var p2v = p2 ? p2.value : '';
    if (!uv || !pv || !p2v) { if (err) err.textContent = 'Vui lòng điền đầy đủ!'; return; }
    if (pv !== p2v) { if (err) err.textContent = 'Mật khẩu không khớp!'; return; }
    try {
      var d = await api('/api/register', {
        method: 'POST',
        body: JSON.stringify({ username: uv, password: pv })
      });
      setAuth(d.access_token, d.username);
      window.xp = d.xp;
      window.freeLeft = d.free_left;
      if (err) err.textContent = '';
      checkAuth();
      if (typeof toast === 'function') toast('Đăng ký thành công!');
    } catch (e) {
      if (err) err.textContent = e.message || 'Đăng ký thất bại!';
    }
  };

  window.handleLogout = function () {
    clearAuth();
    window.xp = 120;
    window.freeLeft = 5;
    if (typeof syncHud === 'function') syncHud();
    checkAuth();
    if (typeof toast === 'function') toast('Đã đăng xuất');
  };

  // ══════════════════════════════════════
  //  CHECK AUTH (core)
  // ══════════════════════════════════════

  window.checkAuth = async function () {
    var authScreen = document.querySelector('.auth-screen') || document.getElementById('s-auth');
    var navInfo = document.getElementById('user-info-nav');
    var navUser = document.getElementById('nav-username');

    if (_token && _username) {
      try {
        var p = await api('/api/profile');
        _cachedProfile = p;
        _playedCache = p.played || {};
        window.xp = p.xp;
        window.freeLeft = p.free_left;
        if (typeof syncHud === 'function') syncHud();
        document.body.classList.add('logged-in');
        if (authScreen) authScreen.classList.remove('active');
        if (navInfo) navInfo.style.display = 'flex';
        if (navUser) navUser.textContent = _username;
        var su = document.getElementById('side-username');
        if (su) su.textContent = _username;
        // Nếu chưa có màn hình active nào (hoặc chỉ có auth), mở landing
        var activeScreens = document.querySelectorAll('.screen.active');
        if (!activeScreens.length || (activeScreens.length === 1 && activeScreens[0].id === 's-auth')) {
          var landing = document.getElementById('s-landing');
          if (landing) landing.classList.add('active');
          if (authScreen) authScreen.classList.remove('active');
        }
        if (document.getElementById('s-journal') &&
            document.getElementById('s-journal').classList.contains('active') &&
            typeof renderJournalScreen === 'function') {
          renderJournalScreen();
        }
        return;
      } catch (e) {
        clearAuth();
      }
    }

    // Chưa đăng nhập
    document.body.classList.remove('logged-in');
    window.xp = 120;
    window.freeLeft = 5;
    if (typeof syncHud === 'function') syncHud();
    if (navInfo) navInfo.style.display = 'none';
    document.querySelectorAll('.screen').forEach(function (s) {
      s.classList.remove('active');
    });
    if (authScreen) authScreen.classList.add('active');
    if (typeof switchAuth === 'function') switchAuth('login');
  };

  // ══════════════════════════════════════
  //  PROFILE PERSISTENCE
  // ══════════════════════════════════════

  window.persistCurrentProfile = async function () {
    if (!_token) return;
    try {
      await api('/api/profile', {
        method: 'PUT',
        body: JSON.stringify({ xp: window.xp, free_left: window.freeLeft })
      });
    } catch (e) { /* silent */ }
  };
  window.persistCurrentProfile_local = window.persistCurrentProfile;
  window._saveProfile = window.persistCurrentProfile;

  window.getUserProfile = function () {
    if (_cachedProfile) return _cachedProfile;
    return { xp: window.xp || 120, freeLeft: window.freeLeft || 5, journal: [], played: {} };
  };

  window.loadCurrentUserState = function (username) {
    _username = username || _username;
    if (typeof syncHud === 'function') syncHud();
  };

  window.getStoredUsers = function () {
    if (!_username) return {};
    var obj = {};
    obj[_username] = { xp: window.xp || 120, freeLeft: window.freeLeft || 5 };
    return obj;
  };

  // ══════════════════════════════════════
  //  XP / FREE PLAY
  // ══════════════════════════════════════

  window.awardXp = async function (amount, entry) {
    var delta = Number(amount) || 0;
    window.xp += delta;
    if (typeof syncHud === 'function') syncHud();
    if (!_token) return;
    try {
      var d = await api('/api/award-xp', {
        method: 'POST',
        body: JSON.stringify({
          amount: delta,
          event_id: (entry && entry.eventId) || '',
          entry_type: (entry && entry.type) || 'experience',
          title: (entry && entry.title) || '',
          details: (entry && entry.details) || '',
          category: (entry && entry.category) || '',
          year: (entry && entry.year) || ''
        })
      });
      window.xp = d.xp;
      if (typeof syncHud === 'function') syncHud();
    } catch (e) { /* silent */ }
  };

  window.consumeFreePlay = async function () {
    if (window.freeLeft !== 99) window.freeLeft = Math.max(0, window.freeLeft - 1);
    if (typeof syncHud === 'function') syncHud();
    if (!_token) return;
    try {
      var d = await api('/api/consume-play', { method: 'POST' });
      window.freeLeft = d.free_left;
      if (typeof syncHud === 'function') syncHud();
    } catch (e) { /* silent */ }
  };

  window.logExperience = async function (entry) {
    if (!_token || !entry) return;
    try {
      await api('/api/journal', {
        method: 'POST',
        body: JSON.stringify({
          entry_type: entry.type || 'experience',
          title: entry.title || 'Trải nghiệm lịch sử',
          details: entry.details || '',
          category: entry.category || '',
          year: entry.year || '',
          event_id: entry.eventId || '',
          xp_delta: entry.xpDelta || 0
        })
      });
    } catch (e) { /* silent */ }
    // Refresh journal if visible
    if (document.getElementById('s-journal') &&
        document.getElementById('s-journal').classList.contains('active') &&
        typeof renderJournalScreen === 'function') {
      renderJournalScreen();
    }
  };

  // ══════════════════════════════════════
  //  PLAYED COUNTS
  // ══════════════════════════════════════

  window.getPlayedCount = function (cat) {
    return _playedCache[cat] || 0;
  };

  window.recordPlay = async function (cat) {
    _playedCache[cat] = (_playedCache[cat] || 0) + 1;
    if (!_token) return;
    try {
      await api('/api/played', {
        method: 'POST',
        body: JSON.stringify({ category: cat })
      });
    } catch (e) { /* silent */ }
  };

  // ══════════════════════════════════════
  //  REDEEM XP
  // ══════════════════════════════════════

  window.redeemXP = async function (cost) {
    if (window.xp < cost) {
      if (typeof toast === 'function') toast('❌ Không đủ XP! Cần ' + cost + ' XP');
      return;
    }
    try {
      var d = await api('/api/redeem-xp', {
        method: 'POST',
        body: JSON.stringify({ cost: cost })
      });
      window.xp = d.xp;
      window.freeLeft = d.free_left;
      if (typeof syncHud === 'function') syncHud();
      var rewards = { 50: 3, 100: 8, 200: 99 };
      var label = rewards[cost] === 99 ? 'Không giới hạn 24h' : '+' + rewards[cost] + ' lượt chơi';
      if (typeof toast === 'function') toast('✅ Đổi ' + cost + ' XP → ' + label);
      setTimeout(function () { if (typeof go === 'function') go('map', window.curCat); }, 800);
    } catch (e) {
      if (typeof toast === 'function') toast('❌ ' + e.message);
    }
  };

  // ══════════════════════════════════════
  //  LEADERBOARD
  // ══════════════════════════════════════

  window.renderLeaderboard = async function () {
    var board = document.getElementById('leaderboard-list');
    var summary = document.getElementById('journal-current-summary');
    var nameBox = document.getElementById('journal-current-user');
    if (!board) return;
    try {
      var ranking = await api('/api/leaderboard');
      if (!ranking || !ranking.length) {
        board.innerHTML = '<div class="leaderboard-empty">Chưa có người chơi nào.</div>';
        return;
      }
      var idx = -1;
      for (var i = 0; i < ranking.length; i++) {
        if (ranking[i].username === _username) { idx = i; break; }
      }
      if (nameBox) nameBox.textContent = _username || 'Khách';
      if (summary) summary.textContent = idx >= 0
        ? 'Hạng ' + (idx + 1) + '/' + ranking.length + ' với ' + window.xp + ' XP.'
        : '';

      var html = '';
      for (var i = 0; i < ranking.length; i++) {
        var r = ranking[i];
        html += '<article class="leaderboard-item">'
          + '<div class="leaderboard-top">'
          + '<div class="leaderboard-line">'
          + '<div class="leaderboard-rank">#' + (i + 1) + '</div>'
          + '<div>'
          + '<div class="leaderboard-name">' + escapeHtml(r.username) + '</div>'
          + '<div class="leaderboard-meta">' + (r.journal_count || 0) + ' hoạt động</div>'
          + '</div></div>'
          + '<div class="leaderboard-score">' + r.xp + ' XP</div>'
          + '</div></article>';
      }
      board.innerHTML = html;
    } catch (e) {
      board.innerHTML = '<div class="leaderboard-empty">Không thể tải bảng xếp hạng.</div>';
    }
  };

  // ══════════════════════════════════════
  //  JOURNAL HISTORY
  // ══════════════════════════════════════

  window.renderJournalHistory = async function () {
    var historyList = document.getElementById('journal-history-list');
    var statsSummary = document.getElementById('journal-stats-summary');
    if (!historyList) return;
    try {
      var journal = _token ? await api('/api/journal') : [];
      if (!journal || !journal.length) {
        historyList.innerHTML = '<div class="journal-empty">Chưa có dữ liệu.</div>';
      } else {
        var html = '';
        for (var i = 0; i < journal.length; i++) {
          var item = journal[i];
          var xpLabel = (item.xpDelta > 0) ? '+' + item.xpDelta + ' XP'
            : (typeof getJournalTypeLabel === 'function' ? getJournalTypeLabel(item.type) : item.type);
          var timeLabel = typeof formatJournalTime === 'function' ? formatJournalTime(item.time) : (item.time || '');
          html += '<article class="journal-item">'
            + '<div class="journal-item-top">'
            + '<div class="journal-item-title">' + escapeHtml(item.title || '') + '</div>'
            + '<div class="journal-item-window.xp">' + xpLabel + '</div>'
            + '</div>'
            + '<div class="journal-item-meta">' + escapeHtml(item.details || '') + '</div>'
            + '<div class="journal-item-meta">' + timeLabel + (item.year ? ' · ' + escapeHtml(item.year) : '') + '</div>'
            + '</article>';
        }
        historyList.innerHTML = html;
      }
      // Stats
      if (statsSummary && journal) {
        var completed = 0, saved = 0, scored = 0;
        for (var i = 0; i < journal.length; i++) {
          if (journal[i].type === 'complete') completed++;
          if (journal[i].type === 'bookmark') saved++;
          if ((journal[i].xpDelta || 0) > 0) scored++;
        }
        statsSummary.innerHTML =
          '<div class="journal-card"><div class="journal-kicker">Tổng hoạt động</div><div class="journal-big">' + journal.length + '</div></div>'
          + '<div class="journal-card"><div class="journal-kicker">Hoàn thành</div><div class="journal-big">' + completed + '</div></div>'
          + '<div class="journal-card"><div class="journal-kicker">Đã lưu</div><div class="journal-big">' + saved + '</div></div>'
          + '<div class="journal-card"><div class="journal-kicker">Ghi điểm</div><div class="journal-big">' + scored + '</div></div>';
      }
    } catch (e) {
      historyList.innerHTML = '<div class="journal-empty">Không thể tải nhật ký.</div>';
    }
  };

  window.renderJournalScreen = async function () {
    if (typeof syncHud === 'function') syncHud();
    var nameNode = document.getElementById('journal-current-user');
    if (nameNode) nameNode.textContent = _username || 'Khách';
    await renderJournalHistory();
    await renderLeaderboard();
    if (typeof switchJournalTab === 'function' && typeof currentJournalTab !== 'undefined') {
      switchJournalTab(currentJournalTab);
    }
  };

  // ══════════════════════════════════════
  //  ADMIN OVERRIDES
  // ══════════════════════════════════════

  window.secretAdminLogin = async function () {
    var pass = prompt('Nhập mã truy cập Quản trị viên:');
    if (!pass) return;
    try {
      await api('/api/admin/verify', {
        method: 'POST',
        body: JSON.stringify({ password: pass })
      });
      document.querySelectorAll('.screen').forEach(function (s) { s.classList.remove('active'); });
      var admin = document.getElementById('s-admin');
      if (admin) admin.classList.add('active');
      renderAdminPanel();
      alert('Xác thực thành công!');
    } catch (e) {
      alert(e.message || 'Sai mã truy cập');
    }
  };

  window.renderAdminPanel = async function () {
    var div = document.getElementById('admin-user-list');
    if (!div) return;
    try {
      var users = await api('/api/admin/users');
      if (!users || !users.length) {
        div.innerHTML = '<p style="text-align:center;opacity:.7;padding:20px">Chưa có tài khoản nào.</p>';
        return;
      }
      var html = '<table style="width:100%;text-align:left;border-collapse:collapse;min-width:640px;">'
        + '<tr style="border-bottom:1px solid var(--gold);">'
        + '<th style="padding:10px">ID</th><th style="padding:10px">Tên</th>'
        + '<th style="padding:10px">XP</th><th style="padding:10px">Lượt</th>'
        + '<th style="padding:10px">Ngày tạo</th><th style="padding:10px;text-align:right">Thao tác</th></tr>';
      for (var i = 0; i < users.length; i++) {
        var u = users[i];
        html += '<tr style="border-bottom:1px solid rgba(255,255,255,.1);">'
          + '<td style="padding:10px">' + u.id + '</td>'
          + '<td style="padding:10px;font-weight:bold;color:var(--gold2)">' + escapeHtml(u.username) + '</td>'
          + '<td style="padding:10px">' + u.xp + '</td>'
          + '<td style="padding:10px">' + (u.free_left === 99 ? '∞' : u.free_left) + '</td>'
          + '<td style="padding:10px;opacity:.6">' + (u.created_at || '').slice(0, 10) + '</td>'
          + '<td style="padding:10px;text-align:right">'
          + '<button class="btn-ghost" style="padding:4px 12px;font-size:14px;color:#f08090;border-color:#f08090" onclick="adminDeleteUser(' + u.id + ')">Xóa</button>'
          + '</td></tr>';
      }
      html += '</table>';
      div.innerHTML = html;
    } catch (e) {
      div.innerHTML = '<p style="color:#f08090;text-align:center;padding:20px">Không có quyền truy cập.</p>';
    }
  };

  window.adminDeleteUser = async function (userId) {
    if (!confirm('Bạn có chắc muốn xóa tài khoản này?')) return;
    try {
      await api('/api/admin/users/' + userId, { method: 'DELETE' });
      renderAdminPanel();
      if (typeof toast === 'function') toast('Đã xóa tài khoản');
    } catch (e) {
      if (typeof toast === 'function') toast('❌ ' + e.message);
    }
  };

  window.adminClearAllData = function () {
    if (typeof toast === 'function') toast('⚠️ Chức năng này đã bị vô hiệu hóa vì lý do bảo mật.');
  };

  // ══════════════════════════════════════
  //  PAYMENT ACTIVATION (demo)
  // ══════════════════════════════════════

  window.activatePlan = async function () {
    window.freeLeft = 99;
    if (typeof syncHud === 'function') syncHud();
    await persistCurrentProfile();
    if (typeof toast === 'function') toast('🎉 Đã mở khóa toàn bộ hành trình!');
    if (typeof go === 'function') go('map', window.curCat);
  };

  // ══════════════════════════════════════
  //  INIT — chạy checkAuth sau khi override
  // ══════════════════════════════════════

  setTimeout(function () {
    (window.checkAuth || checkAuth)();
  }, 250);

})();
