// Original Calendar App Logic Ported to JS
let eventsData = [];
let selectedEventId = null;
let currentView = 'list'; // 'list' or 'month'
let currentDate = new Date();

const DEFAULT_EVENTS = [
  { "id": "ksu-20260801", "date": "2026-08-01", "title": "第 1 學期開始", "category": "校務", "target": "all", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20260806", "date": "2026-08-06", "title": "碩士在職專班新生註冊", "category": "註冊", "target": "student", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "user-2026081101", "date": "2026-08-11", "title": "看接案平台", "category": "個人", "target": "all", "source": "user", "completed": false },
  { "id": "user-2026081401", "date": "2026-08-14", "title": "發行最後一版cpcStudio", "category": "個人", "target": "all", "source": "user", "completed": false },
  { "id": "user-2026081701", "date": "2026-08-17", "title": "檢查汽車水箱", "category": "個人", "target": "all", "source": "user", "completed": false },
  { "id": "user-2026081702", "date": "2026-08-17", "title": "給老家消毒用酒精", "category": "個人", "target": "all", "source": "user", "completed": false },
  { "id": "user-20260804221250929243", "date": "2026-08-18", "title": "彰濱太空中心出差", "category": "個人", "source": "user", "completed": false },
  { "id": "ksu-20260819", "date": "2026-08-19", "title": "二技、四技單獨招生新生註冊", "category": "註冊", "target": "student", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20260828b", "date": "2026-08-28", "title": "全體教師完成課程教學大綱輸入", "category": "校務", "target": "teacher", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20260828a", "date": "2026-08-28", "title": "暑修結束（09/02 前輸入成績）", "category": "成績", "target": "teacher", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "user-2026083101", "date": "2026-08-31", "title": "檢查美國股票帳戶", "category": "個人", "target": "all", "source": "user", "completed": false },
  { "id": "user-20260804222130862693", "date": "2026-08-31", "title": "直得科技Resigned", "category": "個人", "target": "teacher", "source": "user", "completed": false },
  { "id": "user-20260804221406971452", "date": "2026-08-31", "title": "直德科技Resigned", "category": "個人", "source": "user", "completed": true },
  { "id": "ksu-20260907a", "date": "2026-09-07", "title": "全校學生非跨部網路選課開始", "category": "選課", "target": "student", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20260907b", "date": "2026-09-07", "title": "延修生就學貸款辦理期間開始（至 09/14）", "category": "申請", "target": "student", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20260911", "date": "2026-09-11", "title": "導師會議／教師輔導知能研習；完全／混合式網路教學申請截止", "category": "校務", "target": "teacher", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20260914b", "date": "2026-09-14", "title": "跨部網路選課開始；延修生就業資料收件截止", "category": "選課", "target": "student", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20260914a", "date": "2026-09-14", "title": "開學、註冊、正式上課", "category": "開學", "target": "all", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "course-2026091601", "date": "2026-09-16", "title": "夜間部課程：夜四資工一A - 資訊工程導論（週三 12~13 堂、週四 13 堂）", "category": "課程", "target": "teacher", "source": "115學年第1學期課表", "completed": false },
  { "id": "course-2026091701", "date": "2026-09-17", "title": "夜間部課程：夜四資工四A - 生成式AI基礎應用（週四 10~12 堂）", "category": "課程", "target": "teacher", "source": "115學年第1學期課表", "completed": false },
  { "id": "course-2026091801", "date": "2026-09-18", "title": "日間部課程：資工三A - 智慧能源與物聯網（週五 2,3,4 堂）", "category": "課程", "target": "teacher", "source": "115學年第1學期課表", "completed": false },
  { "id": "course-2026091802", "date": "2026-09-18", "title": "日間部課程：資工三C(南向班) - 行動程式設計（週五 7~9 堂）", "category": "課程", "target": "teacher", "source": "115學年第1學期課表", "completed": false },
  { "id": "ksu-20260923", "date": "2026-09-23", "title": "跨部網路選課截止（中午 12 時）", "category": "選課", "target": "all", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20260925a", "date": "2026-09-25", "title": "中秋節放假", "category": "放假", "target": "all", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20260925b", "date": "2026-09-25", "title": "選課結果以學校超級課表為準", "category": "選課", "target": "student", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20260928", "date": "2026-09-28", "title": "孔子誕辰紀念日放假", "category": "放假", "target": "all", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20261005", "date": "2026-10-05", "title": "延修生自行下載繳費單（10/12 前完成繳費）", "category": "繳費", "target": "student", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20261009", "date": "2026-10-09", "title": "國慶日補假", "category": "放假", "target": "all", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20261010", "date": "2026-10-10", "title": "國慶日放假", "category": "放假", "target": "all", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20261025", "date": "2026-10-25", "title": "臺灣光復暨金門古寧頭大捷紀念日", "category": "紀念日", "target": "all", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20261026", "date": "2026-10-26", "title": "臺灣光復暨金門古寧頭大捷紀念日補假", "category": "放假", "target": "all", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20261030", "date": "2026-10-30", "title": "加退選後補繳差額截止；未繳者回復原班課程", "category": "繳費", "target": "student", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20261106", "date": "2026-11-06", "title": "各教學單位次學期開課／排課作業開始", "category": "校務", "target": "teacher", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20261109", "date": "2026-11-09", "title": "期中評量開始（11/13 結束；11/20 前完成成績輸入）", "category": "考試", "target": "teacher", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20261127", "date": "2026-11-27", "title": "轉系申請開始（至 12/11）", "category": "申請", "target": "student", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20261201", "date": "2026-12-01", "title": "教師教學評量問卷填答開始（至 2027/01/01）", "category": "校務", "target": "teacher", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20261225", "date": "2026-12-25", "title": "行憲紀念日放假", "category": "放假", "target": "all", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20270101", "date": "2027-01-01", "title": "元旦放假", "category": "放假", "target": "all", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20270108", "date": "2027-01-08", "title": "開放下學期課表（草案）網頁查詢", "category": "選課", "target": "all", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20270111", "date": "2027-01-11", "title": "期末考試開始（01/15 結束）", "category": "考試", "target": "teacher", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20270122", "date": "2027-01-22", "title": "成績輸入完畢", "category": "成績", "target": "teacher", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20270131", "date": "2027-01-31", "title": "第 1 學期結束", "category": "校務", "target": "all", "source": "115學年第1學期行事曆", "completed": false }
];

document.addEventListener('DOMContentLoaded', () => {
  setupTodayHeader();
  loadEventsData();
  setupEventListeners();
  render();
});

function setupTodayHeader() {
  const todayStr = formatDate(new Date());
  document.getElementById('header-today-text').textContent = `今天：${todayStr}`;
}

function loadEventsData() {
  let localEvents = [];
  const localData = localStorage.getItem('steve_calendar_events');
  if (localData) {
    try {
      localEvents = JSON.parse(localData);
      eventsData = [...localEvents];
      sortEvents();
      render();
    } catch (e) { console.error(e); }
  } else {
    eventsData = [...DEFAULT_EVENTS];
    sortEvents();
    render();
  }

  fetch('events.json?v=' + Date.now())
    .then(res => res.json())
    .then(serverData => {
      const mergedMap = new Map();
      serverData.forEach(item => mergedMap.set(item.id, item));

      localEvents.forEach(item => {
        if (mergedMap.has(item.id)) {
          mergedMap.get(item.id).completed = item.completed;
        } else {
          mergedMap.set(item.id, item);
        }
      });

      eventsData = Array.from(mergedMap.values());
      sortEvents();
      saveEventsToLocal();
      render();
    })
    .catch(e => console.error('Fetch events error:', e));
}

function saveEventsToLocal() {
  sortEvents();
  localStorage.setItem('steve_calendar_events', JSON.stringify(eventsData));
}

function sortEvents() {
  eventsData.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return (a.title || '').localeCompare(b.title || '');
  });
}

function getVisibleEvents() {
  const today = getZeroTimeDate(new Date());
  const role = document.getElementById('role-select').value;
  const showAllDays = document.getElementById('show-all-days-cb').checked;
  const daysAhead = parseInt(document.getElementById('days-ahead-input').value, 10) || 30;
  const showPast = document.getElementById('show-past-cb').checked;
  const showCompleted = document.getElementById('show-completed-cb').checked;
  const searchQuery = document.getElementById('search-input').value.toLowerCase().trim();

  const endDate = new Date(today);
  endDate.setDate(today.getDate() + Math.max(1, daysAhead));

  return eventsData.filter(event => {
    const eventDate = parseDate(event.date);
    if (!eventDate) return false;

    // Role filter
    const target = event.target || 'all';
    if (role === '教師視角' && target === 'student') return false;
    if (role === '學生視角' && target === 'teacher') return false;

    // Past & Days ahead filter
    if (!showPast && eventDate < today) return false;
    if (!showAllDays && eventDate > endDate) return false;
    if (!showCompleted && event.completed) return false;

    // Search filter
    if (searchQuery) {
      const matchTitle = (event.title || '').toLowerCase().includes(searchQuery);
      const matchCat = (event.category || '').toLowerCase().includes(searchQuery);
      if (!matchTitle && !matchCat) return false;
    }

    return true;
  });
}

function render() {
  if (currentView === 'list') {
    renderTableList();
  } else {
    renderMonthView();
  }
}

function renderTableList() {
  const tbody = document.getElementById('calendar-table-body');
  tbody.innerHTML = '';

  const visibleList = getVisibleEvents();
  const today = getZeroTimeDate(new Date());

  visibleList.forEach(event => {
    const eventDate = parseDate(event.date);
    const delta = Math.round((eventDate - today) / (1000 * 60 * 60 * 24));

    let distanceText = '';
    if (delta < 0) {
      distanceText = `${Math.abs(delta)} 天前`;
    } else if (delta === 0) {
      distanceText = '🔥 今天';
    } else {
      distanceText = `${delta} 天後`;
    }

    const statusText = event.completed ? '已完成 ✅' : '待辦 ⏳';
    const category = event.category || '其他';

    // Tags matching Python app rules
    const classes = [];
    if (event.completed) {
      classes.push('row-done');
    } else if (delta < 0) {
      classes.push('row-past');
    } else if (delta === 0) {
      classes.push('row-today');
    } else if (delta <= 3) {
      classes.push('row-urgent');
    }

    if (category === '放假') classes.push('row-holiday');
    else if (category === '考試') classes.push('row-exam');
    else if (category === '成績') classes.push('row-grade');
    else if (['校務', '課程', '開學'].includes(category)) classes.push('row-affairs');

    if (event.id === selectedEventId) {
      classes.push('selected');
    }

    const tr = document.createElement('tr');
    tr.className = classes.join(' ');
    tr.dataset.id = event.id;

    tr.innerHTML = `
      <td style="text-align: center; font-weight: 700;">${event.date}</td>
      <td style="text-align: center; font-weight: 700;">${distanceText}</td>
      <td style="text-align: center;">📌 ${category}</td>
      <td style="font-weight: 600;">${escapeHtml(event.title)}</td>
      <td style="text-align: center; font-weight: 700;">${statusText}</td>
      <td style="text-align: center;">
        <button class="btn btn-sm btn-warning" onclick="editEvent('${event.id}', event)">✏️</button>
        <button class="btn btn-sm btn-danger" onclick="deleteEvent('${event.id}', event)">🗑️</button>
      </td>
    `;

    // Row selection and double click to toggle
    tr.addEventListener('click', () => {
      document.querySelectorAll('.calendar-table tbody tr').forEach(r => r.classList.remove('selected'));
      tr.classList.add('selected');
      selectedEventId = event.id;
    });

    tr.addEventListener('dblclick', () => {
      toggleCompleteEvent(event.id);
    });

    tbody.appendChild(tr);
  });

  document.getElementById('status-bar-text').textContent = 
    `📊 顯示 ${visibleList.length} 筆事項（總計 ${eventsData.length} 筆）`;
}

function renderMonthView() {
  const grid = document.getElementById('month-days-grid');
  grid.innerHTML = '';

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  document.getElementById('current-month-label').textContent = `${year}年 ${month + 1}月`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();

  const visibleList = getVisibleEvents();
  const todayStr = formatDate(new Date());

  // Prev month padding
  for (let x = firstDay; x > 0; x--) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell other-month';
    cell.innerHTML = `<div class="cell-num">${prevLastDate - x + 1}</div>`;
    grid.appendChild(cell);
  }

  // Current month
  for (let d = 1; d <= lastDate; d++) {
    const monthStr = String(month + 1).padStart(2, '0');
    const dayStr = String(d).padStart(2, '0');
    const fullDate = `${year}-${monthStr}-${dayStr}`;

    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    if (fullDate === todayStr) cell.classList.add('is-today');

    let cellHTML = `<div class="cell-num">${d}</div>`;

    const dayEvents = visibleList.filter(e => e.date === fullDate);
    dayEvents.forEach(e => {
      cellHTML += `<div class="cell-item ${e.completed ? 'done' : ''}" title="${escapeHtml(e.title)}" onclick="toggleCompleteEvent('${e.id}')">${escapeHtml(e.title)}</div>`;
    });

    cell.innerHTML = cellHTML;
    grid.appendChild(cell);
  }
}

function setupEventListeners() {
  // Filters trigger refresh
  ['role-select', 'show-all-days-cb', 'days-ahead-input', 'show-past-cb', 'show-completed-cb'].forEach(id => {
    document.getElementById(id).addEventListener('change', render);
    document.getElementById(id).addEventListener('input', render);
  });

  document.getElementById('btn-refresh').addEventListener('click', render);
  document.getElementById('search-input').addEventListener('input', render);

  // Tabs
  document.getElementById('tab-list-btn').addEventListener('click', () => switchTab('list'));
  document.getElementById('tab-month-btn').addEventListener('click', () => switchTab('month'));

  // Month Controls
  document.getElementById('prev-month-btn').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderMonthView();
  });
  document.getElementById('next-month-btn').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderMonthView();
  });
  document.getElementById('today-month-btn').addEventListener('click', () => {
    currentDate = new Date();
    renderMonthView();
  });

  // Action Buttons
  document.getElementById('btn-add-event').addEventListener('click', () => {
    document.getElementById('modal-title').textContent = '➕ 新增事項';
    document.getElementById('event-id-hidden').value = '';
    document.getElementById('event-form').reset();
    document.getElementById('event-date').value = formatDate(new Date());
    document.getElementById('event-modal').classList.add('active');
  });

  document.getElementById('btn-toggle-done').addEventListener('click', () => {
    if (!selectedEventId) {
      alert('請先選取一個事項。');
      return;
    }
    toggleCompleteEvent(selectedEventId);
  });

  document.getElementById('btn-export-json').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(eventsData, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = "events.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
  });

  document.getElementById('btn-reset-default').addEventListener('click', () => {
    if (confirm('確定要將行事曆重置為初始預設資料嗎？')) {
      eventsData = [...DEFAULT_EVENTS];
      saveEventsToLocal();
      render();
    }
  });

  // Modal Controls
  document.getElementById('close-modal-btn').addEventListener('click', closeModal);
  document.getElementById('cancel-modal-btn').addEventListener('click', closeModal);

  document.getElementById('event-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = document.getElementById('event-id-hidden').value;
    const dateVal = document.getElementById('event-date').value;
    const titleVal = document.getElementById('event-title').value.trim();
    const categoryVal = document.getElementById('event-category').value;

    if (editId) {
      const item = eventsData.find(x => x.id === editId);
      if (item) {
        item.date = dateVal;
        item.title = titleVal;
        item.category = categoryVal;
      }
    } else {
      const newEvt = {
        id: 'user-' + Date.now(),
        date: dateVal,
        title: titleVal,
        category: categoryVal,
        target: 'teacher',
        source: 'user',
        completed: false
      };
      eventsData.push(newEvt);
    }

    saveEventsToLocal();
    closeModal();
    render();
  });
}

function switchTab(tab) {
  currentView = tab;
  document.getElementById('tab-list-btn').classList.toggle('active', tab === 'list');
  document.getElementById('tab-month-btn').classList.toggle('active', tab === 'month');
  document.getElementById('view-list-container').classList.toggle('active', tab === 'list');
  document.getElementById('view-month-container').classList.toggle('active', tab === 'month');
  render();
}

function closeModal() {
  document.getElementById('event-modal').classList.remove('active');
}

window.toggleCompleteEvent = function(id) {
  const item = eventsData.find(x => x.id === id);
  if (item) {
    item.completed = !item.completed;
    saveEventsToLocal();
    render();
  }
};

window.editEvent = function(id, e) {
  if (e) e.stopPropagation();
  const item = eventsData.find(x => x.id === id);
  if (!item) return;

  document.getElementById('modal-title').textContent = '✏️ 編輯事項';
  document.getElementById('event-id-hidden').value = item.id;
  document.getElementById('event-date').value = item.date;
  document.getElementById('event-title').value = item.title;
  document.getElementById('event-category').value = item.category || '個人';
  document.getElementById('event-modal').classList.add('active');
};

window.deleteEvent = function(id, e) {
  if (e) e.stopPropagation();
  const item = eventsData.find(x => x.id === id);
  if (!item) return;

  if (item.source !== 'user') {
    alert('保留行事曆資料，基礎事項不直接刪除；可將它標記為完成。');
    return;
  }

  if (confirm(`確定刪除「${item.title}」？`)) {
    eventsData = eventsData.filter(x => x.id !== id);
    saveEventsToLocal();
    render();
  }
};

function parseDate(str) {
  if (!str) return null;
  const parts = str.split('-');
  if (parts.length !== 3) return null;
  return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
}

function getZeroTimeDate(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[m]);
}
