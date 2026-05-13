(function () {
  'use strict';

  var CARD_CONTENT = {
    myth: {
      title: 'Huyền Thoại',
      meta: ['Đang mở', 'Kể chuyện tương tác'],
      description: 'Hành trình mở đầu với nhịp chơi rõ ràng, kể chuyện tương tác và từng chặng dẫn dắt nhẹ nhàng.',
      button: 'Vào hành trình',
      playable: true,
      image: '/static/assets/images/thumbnails/thumb-myth.webp',
      alt: 'Minh họa hành trình Huyền Thoại',
      ariaLabel: 'Vào hành trình Huyền Thoại'
    },
    battle: {
      title: 'Chiến Trận',
      meta: ['Đang phát triển', 'Quiz tốc độ'],
      description: 'Nhịp độ nhanh, thiên về quyết định tức thời. Nội dung đang được cân bằng trước khi mở.',
      button: 'Đang phát triển',
      playable: false,
      image: '/static/assets/images/thumbnails/thumb-battle.webp',
      alt: 'Minh họa hành trình Chiến Trận',
      ariaLabel: 'Hành trình Chiến Trận đang phát triển'
    },
    dynasty: {
      title: 'Triều Đại',
      meta: ['Đang phát triển', 'Timeline lịch sử'],
      description: 'Thiên về mốc thời gian, liên kết sự kiện và chiều sâu chiến lược. Hành trình đang hoàn thiện.',
      button: 'Đang phát triển',
      playable: false,
      image: '/static/assets/images/thumbnails/thumb-dynasty.webp',
      alt: 'Minh họa hành trình Triều Đại',
      ariaLabel: 'Hành trình Triều Đại đang phát triển'
    }
  };

  function setText(selector, value, root) {
    var el = (root || document).querySelector(selector);
    if (el && el.textContent !== value) el.textContent = value;
  }

  function setMeta(card, values) {
    var items = card.querySelectorAll('.cat-meta span');
    if (items[0] && items[0].textContent !== values[0]) items[0].textContent = values[0];
    if (items[1] && items[1].textContent !== values[1]) items[1].textContent = values[1];
  }

  function ensureImage(card, config) {
    var frame = card.querySelector('.cat-img');
    if (!frame) return;

    frame.classList.add('journey-card__image');

    var media = frame.querySelector('.cat-img-media');
    if (!media) {
      media = document.createElement('img');
      media.className = 'cat-img-media journey-card__media';
      media.decoding = 'async';
      media.loading = 'eager';
      frame.insertBefore(media, frame.firstChild);
    }

    if (media.getAttribute('src') !== config.image) media.setAttribute('src', config.image);
    if (media.alt !== config.alt) media.alt = config.alt;

    frame.querySelectorAll('.cat-img-bg, .cat-em, .primary-badge, .dev-badge').forEach(function (node) {
      node.remove();
    });

    if (!frame.querySelector('.cat-img-ov')) {
      var overlay = document.createElement('div');
      overlay.className = 'cat-img-ov';
      frame.appendChild(overlay);
    }
  }

  function ensureDescription(card, text) {
    var body = card.querySelector('.cat-foot');
    if (!body) return;

    body.classList.add('journey-card__body');

    var desc = body.querySelector('.cat-desc');
    if (!desc) {
      desc = document.createElement('div');
      desc.className = 'cat-desc';
      var button = body.querySelector('.cat-pill');
      if (button) body.insertBefore(desc, button);
      else body.appendChild(desc);
    }

    if (desc.textContent !== text) desc.textContent = text;
  }

  function ensureButton(card, cat) {
    var pill = card.querySelector('.cat-pill');
    if (!pill) return null;

    var button = pill;
    if (pill.tagName !== 'BUTTON') {
      button = document.createElement('button');
      button.className = pill.className;
      if (pill.id) button.id = pill.id;
      button.textContent = pill.textContent;
      pill.replaceWith(button);
    }

    button.type = 'button';
    button.classList.add('journey-card__button');
    button.onclick = function (event) {
      event.stopPropagation();
      if (typeof window.selectCat === 'function') window.selectCat(cat);
    };
    return button;
  }

  function syncCard(card, cat, config) {
    if (!card) return;

    card.classList.add('journey-card');
    card.querySelectorAll('.cat-locked-overlay, .primary-badge, .dev-badge').forEach(function (node) {
      node.remove();
    });

    var metaRow = card.querySelector('.cat-meta');
    if (metaRow) metaRow.classList.add('journey-card__meta');

    ensureImage(card, config);
    ensureDescription(card, config.description);
    setMeta(card, config.meta);
    setText('.cat-name', config.title, card);

    var button = ensureButton(card, cat);
    if (button) {
      if (button.textContent !== config.button) button.textContent = config.button;
      button.disabled = !config.playable;
      button.setAttribute('aria-disabled', config.playable ? 'false' : 'true');
    }

    card.classList.toggle('cat-primary', config.playable);
    card.classList.toggle('cat-dev', !config.playable);
    card.classList.toggle('locked-cat', !config.playable);
    card.setAttribute('aria-label', config.ariaLabel);
    card.setAttribute('data-state', config.playable ? 'playable' : 'disabled');
  }

  function polishCatSelect() {
    var root = document.getElementById('s-catselect');
    if (!root) return;

    setText('.catselect-title', 'Chọn Hành Trình', root);
    setText('.catselect-sub', 'Bắt đầu hành trình lịch sử.', root);
    setText('.topnav > div:last-child', 'Chọn hành trình', root);

    Object.keys(CARD_CONTENT).forEach(function (cat) {
      syncCard(document.getElementById('cs-' + cat), cat, CARD_CONTENT[cat]);
    });
  }

  function run() {
    polishCatSelect();
  }

  window.__catselectRefresh = polishCatSelect;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  window.addEventListener('load', run);
  [100, 300, 700].forEach(function (delay) {
    setTimeout(run, delay);
  });
})();
