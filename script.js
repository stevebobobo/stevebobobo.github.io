// State Management
let eventsData = [];
let currentCategory = 'all';
let searchQuery = '';
let currentView = 'month'; // 'month' or 'list'
let currentDate = new Date(); // Current date object for calendar navigation
let hideCompleted = false;

// Default initial events data (Kun Shan University + Personal Events)
const DEFAULT_EVENTS = [
  { "id": "ksu-20260801", "date": "2026-08-01", "title": "第 1 學期開始", "category": "校務", "target": "all", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20260806", "date": "2026-08-06", "title": "碩士在職專班新生註冊", "category": "註冊", "target": "student", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "user-20260804221250929243", "date": "2026-08-18", "title": "彰濱太空中心出差", "category": "個人", "source": "user", "completed": false },
  { "id": "ksu-20260819", "date": "2026-08-19", "title": "二技、四技單獨招生新生註冊", "category": "註冊", "target": "student", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20260828b", "date": "2026-08-28", "title": "全體教師完成課程教學大綱輸入", "category": "校務", "target": "teacher", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20260828a", "date": "2026-08-28", "title": "暑修結束（09/02 前輸入成績）", "category": "成績", "target": "teacher", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "user-20260804222130862693", "date": "2026-08-31", "title": "直得科技Resigned", "category": "個人", "target": "teacher", "source": "user", "completed": false },
  { "id": "user-20260804221406971452", "date": "2026-08-31", "title": "直德科技Resigned", "category": "個人", "source": "user", "completed": true },
  { "id": "ksu-20260907a", "date": "2026-09-07", "title": "全校學生非跨部網路選課開始", "category": "選課", "target": "student", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20260907b", "date": "2026-09-07", "title": "延修生就學貸款辦理期間開始（至 09/14）", "category": "申請", "target": "student", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20260911", "date": "2026-09-11", "title": "導師會議／教師輔導知能研習；完全／混合式網路教學申請截止", "category": "校務", "target": "teacher", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20260914b", "date": "2026-09-14", "title": "跨部網路選課開始；延修生就業資料收件截止", "category": "選課", "target": "student", "source": "115學年第1學期行事曆", "completed": false },
  { "id": "ksu-20260914a", "date": "2026-09-14", "title": "開學、註冊、正式上課", "category": "開學", "target": "all", "source": "115學年第1學期行事曆", "completed": false },
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

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  loadEventsData();
  setupTodayWidget();
  setupEventListeners();
  renderUpcomingAlerts();
  renderView();
});

// Load events from LocalStorage or fallback to json / defaults
function loadEventsData() {
  const localData = localStorage.getItem('steve_calendar_events');
  if (localData) {
    try {
      eventsData = JSON.parse(localData);
      return;
    } catch (e) {
      console.error('Failed to parse localStorage events', e);
    }
  }

  // Fetch events.json or fallback
  fetch('events.json')
    .then(res => res.json())
    .then(data => {
      eventsData = data;
      saveEventsToLocal();
      renderView();
      renderUpcomingAlerts();
    })
    .catch(err => {
      console.warn('Could not fetch events.json, using default fallback.', err);
      eventsData = [...DEFAULT_EVENTS];
      saveEventsToLocal();
      renderView();
      renderUpcomingAlerts();
    });
}

function saveEventsToLocal() {
  localStorage.setItem('steve_calendar_events', JSON.stringify(eventsData));
}

// Setup Today Widget
function setupTodayWidget() {
  const now = new Date();
  const daysOfWeek = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
  document.getElementById('today-day-name').textContent = daysOfWeek[now.getDay()];
  document.getElementById('today-date-num').textContent = now.getDate();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  document.getElementById('today-full-str').textContent = `${year}年${month}月${day}日`;
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation View Switching
  document.getElementById('view-month-btn').addEventListener('click', () => switchView('month'));
  document.getElementById('view-list-btn').addEventListener('click', () => switchView('list'));

  // Month Navigation
  document.getElementById('prev-month-btn').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderMonthCalendar();
  });
  document.getElementById('next-month-btn').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderMonthCalendar();
  });
  document.getElementById('today-btn').addEventListener('click', () => {
    currentDate = new Date();
    renderMonthCalendar();
  });

  // Search Input
  document.getElementById('search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderView();
  });

  // Category Filter Pills
  document.getElementById('category-pills-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('pill')) {
      document.querySelectorAll('.category-pills .pill').forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.dataset.cat;
      renderView();
    }
  });

  // Hide Completed Checkbox
  document.getElementById('hide-completed-checkbox').addEventListener('change', (e) => {
    hideCompleted = e.target.checked;
    renderListView();
  });

  // Modal Controls
  const modal = document.getElementById('event-modal');
  document.getElementById('btn-add-event').addEventListener('click', () => {
    document.getElementById('event-form').reset();
    document.getElementById('event-date').valueAsDate = new Date();
    modal.classList.add('active');
  });
  document.getElementById('close-modal-btn').addEventListener('click', () => modal.classList.remove('active'));
  document.getElementById('cancel-modal-btn').addEventListener('click', () => modal.classList.remove('active'));

  // Form Submit
  document.getElementById('event-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const newEvent = {
      id: 'user-' + Date.now(),
      title: document.getElementById('event-title').value.trim(),
      date: document.getElementById('event-date').value,
      category: document.getElementById('event-category').value,
      source: document.getElementById('event-source').value.trim() || 'user',
      completed: false
    };
    eventsData.push(newEvent);
    saveEventsToLocal();
    modal.classList.remove('active');
    renderView();
    renderUpcomingAlerts();
  });

  // Reset to Default
  document.getElementById('btn-sync').addEventListener('click', () => {
    if (confirm('確定要將行事曆重置為初始預設資料嗎？')) {
      eventsData = [...DEFAULT_EVENTS];
      saveEventsToLocal();
      renderView();
      renderUpcomingAlerts();
    }
  });

  // Export JSON
  document.getElementById('btn-export').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(eventsData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "events_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });
}

// Switch View Mode
function switchView(view) {
  currentView = view;
  document.getElementById('view-month-btn').classList.toggle('active', view === 'month');
  document.getElementById('view-list-btn').classList.toggle('active', view === 'list');
  document.getElementById('month-view-container').classList.toggle('active', view === 'month');
  document.getElementById('list-view-container').classList.toggle('active', view === 'list');
  renderView();
}

// Main Render Function
function renderView() {
  if (currentView === 'month') {
    renderMonthCalendar();
  } else {
    renderListView();
  }
}

// Filter Helper
function getFilteredEvents() {
  return eventsData.filter(item => {
    // Category match
    const matchCat = (currentCategory === 'all') || (item.category === currentCategory);
    // Search match
    const matchSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery) ||
      (item.category && item.category.toLowerCase().includes(searchQuery)) ||
      (item.source && item.source.toLowerCase().includes(searchQuery));
    return matchCat && matchSearch;
  });
}

// Render Upcoming 7 Days
function renderUpcomingAlerts() {
  const container = document.getElementById('upcoming-list-container');
  container.innerHTML = '';
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const next7Days = new Date(today);
  next7Days.setDate(today.getDate() + 7);

  const upcoming = eventsData.filter(item => {
    if (item.completed) return false;
    const itemDate = new Date(item.date);
    return itemDate >= today && itemDate <= next7Days;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  document.getElementById('upcoming-count').textContent = upcoming.length;

  if (upcoming.length === 0) {
    container.innerHTML = '<div style="color: var(--text-dim); font-size: 12px; text-align: center; padding: 12px;">未來 7 天內無待辦行程</div>';
    return;
  }

  upcoming.forEach(item => {
    const div = document.createElement('div');
    div.className = 'upcoming-item';
    div.innerHTML = `
      <div class="item-title">${escapeHtml(item.title)}</div>
      <div class="item-meta">
        <span><i class="fa-regular fa-calendar"></i> ${item.date}</span>
        <span class="tag-badge" style="background: rgba(99, 102, 241, 0.2); color: #a5b4fc;">${item.category}</span>
      </div>
    `;
    container.appendChild(div);
  });
}

// Render Month Calendar
function renderMonthCalendar() {
  const grid = document.getElementById('calendar-days-grid');
  grid.innerHTML = '';

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  document.getElementById('current-month-label').textContent = `${year}年 ${month + 1}月`;

  // First day of current month
  const firstDayIndex = new Date(year, month, 1).getDay();
  // Last date of current month
  const lastDate = new Date(year, month + 1, 0).getDate();
  // Previous month last date
  const prevLastDate = new Date(year, month, 0).getDate();

  const filteredEvents = getFilteredEvents();
  const todayStr = formatDate(new Date());

  // Render Previous Month Padding Days
  for (let x = firstDayIndex; x > 0; x--) {
    const dayNum = prevLastDate - x + 1;
    const cell = document.createElement('div');
    cell.className = 'day-cell other-month';
    cell.innerHTML = `<div class="day-num">${dayNum}</div>`;
    grid.appendChild(cell);
  }

  // Render Current Month Days
  for (let i = 1; i <= lastDate; i++) {
    const monthStr = String(month + 1).padStart(2, '0');
    const dayStr = String(i).padStart(2, '0');
    const fullDateStr = `${year}-${monthStr}-${dayStr}`;

    const cell = document.createElement('div');
    cell.className = 'day-cell';
    if (fullDateStr === todayStr) {
      cell.classList.add('today');
    }

    let innerHTML = `<div class="day-num"><span>${i}</span></div><div class="cell-events">`;

    const dayEvents = filteredEvents.filter(e => e.date === fullDateStr);
    dayEvents.forEach(evt => {
      let chipClass = 'chip-ksu';
      if (evt.category === '放假') chipClass = 'chip-holiday';
      else if (evt.category === '個人') chipClass = 'chip-user';
      else if (evt.category === '考試') chipClass = 'chip-exam';

      const completedClass = evt.completed ? 'completed' : '';
      innerHTML += `
        <div class="event-chip ${chipClass} ${completedClass}" title="${escapeHtml(evt.title)}" onclick="toggleEventStatus('${evt.id}')">
          ${escapeHtml(evt.title)}
        </div>
      `;
    });

    innerHTML += `</div>`;
    cell.innerHTML = innerHTML;
    grid.appendChild(cell);
  }
}

// Render List View
function renderListView() {
  const container = document.getElementById('events-list-container');
  container.innerHTML = '';

  let filtered = getFilteredEvents();
  if (hideCompleted) {
    filtered = filtered.filter(item => !item.completed);
  }

  // Sort by date ascending
  filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

  document.getElementById('list-event-count').textContent = filtered.length;

  if (filtered.length === 0) {
    container.innerHTML = '<div style="color: var(--text-dim); text-align: center; padding: 40px;">未找到符合條件的行程事項</div>';
    return;
  }

  filtered.forEach(evt => {
    const itemDiv = document.createElement('div');
    itemDiv.className = `list-item ${evt.completed ? 'done' : ''}`;
    
    let catBg = 'rgba(56, 189, 248, 0.2)';
    let catFg = '#7dd3fc';
    if (evt.category === '放假') { catBg = 'rgba(244, 63, 94, 0.2)'; catFg = '#fca5a5'; }
    else if (evt.category === '個人') { catBg = 'rgba(192, 132, 252, 0.2)'; catFg = '#e9d5ff'; }
    else if (evt.category === '考試') { catBg = 'rgba(251, 191, 36, 0.2)'; catFg = '#fde68a'; }

    itemDiv.innerHTML = `
      <div class="list-item-left">
        <div class="checkbox-custom" onclick="toggleEventStatus('${evt.id}')">
          <i class="fa-solid fa-check"></i>
        </div>
        <div class="event-details">
          <span class="event-title-text">${escapeHtml(evt.title)}</span>
          <div class="event-sub-meta">
            <span><i class="fa-regular fa-calendar"></i> ${evt.date}</span>
            <span><i class="fa-solid fa-tag"></i> ${evt.category}</span>
            <span><i class="fa-solid fa-circle-info"></i> ${escapeHtml(evt.source || '無')}</span>
          </div>
        </div>
      </div>
      <div class="action-btns">
        <span class="tag-badge" style="background: ${catBg}; color: ${catFg};">${evt.category}</span>
        <button class="icon-btn" onclick="deleteEvent('${evt.id}')" title="刪除事項">
          <i class="fa-solid fa-trash-can" style="color: #f43f5e;"></i>
        </button>
      </div>
    `;

    container.appendChild(itemDiv);
  });
}

// Toggle Complete Status
window.toggleEventStatus = function(id) {
  const target = eventsData.find(e => e.id === id);
  if (target) {
    target.completed = !target.completed;
    saveEventsToLocal();
    renderView();
    renderUpcomingAlerts();
  }
};

// Delete Event
window.deleteEvent = function(id) {
  if (confirm('確定要刪除此行程事項嗎？')) {
    eventsData = eventsData.filter(e => e.id !== id);
    saveEventsToLocal();
    renderView();
    renderUpcomingAlerts();
  }
};

// Utilities
function formatDate(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
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
