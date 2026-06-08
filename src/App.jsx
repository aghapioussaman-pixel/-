import React, { useState, useEffect } from "react";

const DAYS = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

const SERVANTS = [
  { id: 1,  name: "نرمين شنودة",          password: "483917", role: "servant" },
  { id: 2,  name: "ساندي غبريال",          password: "620481", role: "servant" },
  { id: 3,  name: "شيري مرزق",             password: "159204", role: "servant" },
  { id: 4,  name: "اماني مشهور",           password: "837502", role: "servant" },
  { id: 5,  name: "المس ليديا نادي",       password: "294613", role: "servant" },
  { id: 6,  name: "المس مريم وجيه",        password: "571839", role: "servant" },
  { id: 7,  name: "المس نسمه حليم",        password: "906428", role: "servant" },
  { id: 8,  name: "ايريني واصف",           password: "348571", role: "servant" },
  { id: 9,  name: "كاترين عاطف",           password: "715926", role: "servant" },
  { id: 10, name: "كاترين منصور",          password: "482063", role: "servant" },
  { id: 11, name: "مريم مرزق",             password: "639147", role: "servant" },
  { id: 12, name: "مارينا جمال",           password: "821504", role: "servant" },
  { id: 13, name: "مارينا رضا",            password: "104739", role: "servant" },
  { id: 14, name: "سارة ممدوح",            password: "567281", role: "servant" },
  { id: 15, name: "نرمين سمير",            password: "392840", role: "servant" },
  { id: 16, name: "ايريني شنودة",          password: "614972", role: "servant" },
  { id: 17, name: "فايزة نزيه",            password: "850316", role: "servant" },
  { id: 18, name: "مريم اشرف",             password: "273594", role: "servant" },
  { id: 19, name: "مريم فنيار",            password: "906172", role: "servant" },
  { id: 20, name: "هيلانه عادل",           password: "431865", role: "servant" },
  { id: 21, name: "روجينا شنودة",          password: "758203", role: "servant" },
  { id: 22, name: "ايفون طلعت",            password: "194627", role: "servant" },
  { id: 23, name: "مارينا نزيه",           password: "580394", role: "servant" },
  { id: 24, name: "مارينا بطرس",           password: "326718", role: "servant" },
  { id: 25, name: "مارتينا يوسف",          password: "947501", role: "servant" },
  { id: 26, name: "ايمان سليمان",          password: "618432", role: "servant" },
  { id: 27, name: "مريم رأفت",             password: "204859", role: "servant" },
  { id: 28, name: "نرمين ممدوح",           password: "739261", role: "servant" },
  { id: 29, name: "ايريني بهاء",           password: "581904", role: "servant" },
  { id: 30, name: "جاسيكا رامي",           password: "426137", role: "servant" },
  { id: 31, name: "ايريني ناجح",           password: "953680", role: "servant" },
  { id: 32, name: "مهرائيل ظريف",          password: "172849", role: "servant" },
  { id: 33, name: "مهرائيل جرجس",          password: "805216", role: "servant" },
  { id: 34, name: "كرمينا عصام",           password: "367492", role: "servant" },
  { id: 35, name: "مريم مدحت",             password: "624081", role: "servant" },
  { id: 36, name: "اماني حلمي",            password: "598173", role: "servant" },
  { id: 37, name: "مينا هاني حلمي",        password: "841206", role: "servant" },
  { id: 38, name: "ماير مشيل ميخائيل",     password: "370925", role: "servant" },
  { id: 39, name: "يوسف فرج مسعود",        password: "516784", role: "servant" },
  { id: 40, name: "اثناسيوس هاني نبيل",    password: "249613", role: "servant" },
  { id: 41, name: "ابانوب سعيد",           password: "783052", role: "servant" },
  { id: 42, name: "جرجس صبحي فرح",         password: "605437", role: "servant" },
  { id: 43, name: "فادي نتعي فايز",        password: "932814", role: "servant" },
  { id: 44, name: "انطونيوس نزيه",         password: "417590", role: "servant" },
  { id: 45, name: "كيرلس وجيه",            password: "186327", role: "servant" },
  { id: 0,  name: "الاستاذ مينا اسكندس",   password: "754069", role: "senior" },
];

const STORAGE_KEY = "spiritual_notebook_v3";
const AUTH_KEY = "spiritual_auth_v3";

// Get Sunday-based week number (for weekly reset detection)
function getWeekKey() {
  const now = new Date();
  const day = now.getDay(); // 0=Sunday
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - day);
  sunday.setHours(0, 0, 0, 0);
  return sunday.toISOString().slice(0, 10);
}

const emptyWeek = () => DAYS.map(day => ({ day, prayer: false, bible: false, liturgy: false }));

function loadAllData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return initFreshData();
}

function initFreshData() {
  const data = { weekKey: getWeekKey(), servants: {}, senior: {} };
  SERVANTS.filter(s => s.role === "servant").forEach(s => {
    data.servants[s.id] = { week: emptyWeek(), confession: "" };
  });
  return data;
}

function saveAllData(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
}

// Auth: { [userId]: true } — records who already entered password
function loadAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {};
}

function saveAuth(auth) {
  try { localStorage.setItem(AUTH_KEY, JSON.stringify(auth)); } catch (e) {}
}

// Weekly reset: clears servants data but keeps senior history
function checkAndResetWeek(data) {
  const currentWeek = getWeekKey();
  if (data.weekKey !== currentWeek) {
    // Archive senior data
    const seniorHistory = data.senior || {};
    const prevWeekKey = data.weekKey;
    const prevServants = data.servants || {};

    // Keep senior's history: append last week
    const newSeniorHistory = { ...seniorHistory };
    newSeniorHistory[prevWeekKey] = prevServants;

    // Reset servants
    const freshServants = {};
    SERVANTS.filter(s => s.role === "servant").forEach(s => {
      freshServants[s.id] = { week: emptyWeek(), confession: "" };
    });

    const newData = {
      weekKey: currentWeek,
      servants: freshServants,
      senior: newSeniorHistory,
    };
    saveAllData(newData);
    return newData;
  }
  return data;
}

export default function App() {
  const [screen, setScreen] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [allData, setAllData] = useState(() => {
    const raw = loadAllData();
    return checkAndResetWeek(raw);
  });
  const [activeTab, setActiveTab] = useState("tracker");

  // Check weekly reset on each render cycle (in case app stays open across Sunday)
  useEffect(() => {
    const interval = setInterval(() => {
      setAllData(prev => {
        const updated = checkAndResetWeek(prev);
        return updated;
      });
    }, 60000); // check every minute
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (servant) => {
    setCurrentUser(servant);
    setScreen("app");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setScreen("login");
    setActiveTab("tracker");
  };

  const updateCell = (dayIndex, field) => {
    setAllData(prev => {
      const updated = { ...prev, servants: { ...prev.servants } };
      if (!updated.servants[currentUser.id])
        updated.servants[currentUser.id] = { week: emptyWeek(), confession: "" };
      const userWeek = updated.servants[currentUser.id].week.map((d, i) =>
        i === dayIndex ? { ...d, [field]: !d[field] } : d
      );
      updated.servants[currentUser.id] = { ...updated.servants[currentUser.id], week: userWeek };
      saveAllData(updated);
      return updated;
    });
  };

  const updateConfession = (val) => {
    setAllData(prev => {
      const updated = { ...prev, servants: { ...prev.servants } };
      if (!updated.servants[currentUser.id])
        updated.servants[currentUser.id] = { week: emptyWeek(), confession: "" };
      updated.servants[currentUser.id] = { ...updated.servants[currentUser.id], confession: val };
      saveAllData(updated);
      return updated;
    });
  };

  if (screen === "login") return <LoginScreen onLogin={handleLogin} />;
  if (currentUser?.role === "senior")
    return <SeniorDashboard allData={allData} onLogout={handleLogout} />;

  const userData = allData.servants?.[currentUser.id] || { week: emptyWeek(), confession: "" };
  return (
    <ServantApp
      user={currentUser}
      data={userData}
      onUpdate={updateCell}
      onConfessionUpdate={updateConfession}
      onLogout={handleLogout}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
}

// ─── Login Screen ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [selected, setSelected] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [auth] = useState(loadAuth);

  const handleSelect = (s) => {
    // If already authenticated before → go straight in
    if (auth[s.id]) {
      onLogin(s);
      return;
    }
    setSelected(s);
    setPassword("");
    setError("");
  };

  const handleLogin = () => {
    if (!selected) return;
    if (password === selected.password) {
      // Save auth so next time no password needed
      const newAuth = { ...auth, [selected.id]: true };
      saveAuth(newAuth);
      onLogin(selected);
    } else {
      setError("❌ كلمة السر غلط، حاول تاني");
    }
  };

  return (
    <div style={styles.loginBg}>
      <div style={styles.loginCard}>
        <div style={styles.crossIcon}>✝</div>
        <h1 style={styles.loginTitle}>النوتة الروحية</h1>
        <p style={styles.loginSub}>فريق الخدمة</p>

        {!selected ? (
          <>
            <p style={styles.loginLabel}>اختار اسمك</p>
            <div style={styles.servantList}>
              {SERVANTS.map(s => (
                <button
                  key={s.id}
                  style={{ ...styles.servantBtn, ...(s.role === "senior" ? styles.seniorBtn : {}) }}
                  onClick={() => handleSelect(s)}
                >
                  {s.role === "senior" ? "👑 " : "🕊 "}{s.name}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div style={styles.passwordSection}>
            <div style={styles.selectedName}>
              {selected.role === "senior" ? "👑 " : "🕊 "}{selected.name}
            </div>
            <p style={styles.loginLabel}>ادخل كلمة السر (مرة واحدة بس)</p>
            <div style={styles.passInputWrapper}>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                placeholder="كلمة السر"
                style={styles.passInput}
                autoFocus
              />
              <button style={styles.eyeBtn} onClick={() => setShowPass(!showPass)}>
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
            {error && <div style={styles.errorMsg}>{error}</div>}
            <div style={styles.loginBtns}>
              <button style={styles.backBtn} onClick={() => { setSelected(null); setPassword(""); setError(""); }}>
                ← رجوع
              </button>
              <button
                style={{ ...styles.loginBtn, opacity: password ? 1 : 0.4 }}
                disabled={!password}
                onClick={handleLogin}
              >
                دخول
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Servant App ─────────────────────────────────────────────────────────────
function ServantApp({ user, data, onUpdate, onConfessionUpdate, onLogout, activeTab, setActiveTab }) {
  const score = data.week.reduce((acc, d) => acc + (d.prayer ? 1 : 0) + (d.bible ? 1 : 0) + (d.liturgy ? 1 : 0), 0);
  const pct = Math.round((score / 21) * 100);

  return (
    <div style={styles.appBg}>
      <div style={styles.appContainer}>
        <div style={styles.header}>
          <div>
            <div style={styles.headerName}>🕊 {user.name}</div>
            <div style={styles.headerSub}>النوتة الروحية الأسبوعية</div>
          </div>
          <button style={styles.logoutBtn} onClick={onLogout}>خروج</button>
        </div>

        <div style={styles.scoreCard}>
          <div style={styles.scoreCircle}><span style={styles.scoreNum}>{pct}%</span></div>
          <div style={styles.scoreText}>
            <div style={styles.scoreTitle}>التزامك هذا الأسبوع</div>
            <div style={styles.scoreBar}><div style={{ ...styles.scoreBarFill, width: `${pct}%` }} /></div>
            <div style={styles.scoreSub}>{score} من 21 نقطة</div>
          </div>
        </div>

        <div style={styles.tabs}>
          <button style={{ ...styles.tab, ...(activeTab === "tracker" ? styles.tabActive : {}) }} onClick={() => setActiveTab("tracker")}>📅 المتابعة الأسبوعية</button>
          <button style={{ ...styles.tab, ...(activeTab === "confession" ? styles.tabActive : {}) }} onClick={() => setActiveTab("confession")}>🙏 الاعتراف</button>
        </div>

        {activeTab === "tracker" && (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>اليوم</th>
                  <th style={styles.th}>🤲 الصلاة</th>
                  <th style={styles.th}>📖 الكتاب</th>
                  <th style={styles.th}>⛪ القداس</th>
                </tr>
              </thead>
              <tbody>
                {data.week.map((row, i) => (
                  <tr key={i} style={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                    <td style={styles.tdDay}>{row.day}</td>
                    {["prayer", "bible", "liturgy"].map(f => (
                      <td key={f} style={styles.td}>
                        <button style={{ ...styles.check, ...(row[f] ? styles.checkOn : {}) }} onClick={() => onUpdate(i, f)}>
                          {row[f] ? "✓" : "○"}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "confession" && (
          <div style={styles.confessionCard}>
            <div style={styles.confessionIcon}>✝</div>
            <h3 style={styles.confessionTitle}>سجل الاعتراف</h3>
            <p style={styles.confessionLabel}>تاريخ آخر اعتراف</p>
            <input type="date" value={data.confession} onChange={e => onConfessionUpdate(e.target.value)} style={styles.dateInput} />
            {data.confession && (
              <div style={styles.confessionResult}>
                🙏 آخر اعتراف: <strong>{new Date(data.confession).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}</strong>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Senior Dashboard ─────────────────────────────────────────────────────────
function SeniorDashboard({ allData, onLogout }) {
  const servants = SERVANTS.filter(s => s.role === "servant");
  const [viewWeek, setViewWeek] = useState("current");

  const weekOptions = [
    { key: "current", label: "الأسبوع الحالي" },
    ...Object.keys(allData.senior || {}).sort().reverse().map(k => ({ key: k, label: `أسبوع ${k}` }))
  ];

  const getWeekData = (id) => {
    if (viewWeek === "current") {
      return allData.servants?.[id] || { week: emptyWeek(), confession: "" };
    }
    return allData.senior?.[viewWeek]?.[id] || { week: emptyWeek(), confession: "" };
  };

  const getStats = (id) => {
    const d = getWeekData(id);
    const score = d.week.reduce((acc, r) => acc + (r.prayer ? 1 : 0) + (r.bible ? 1 : 0) + (r.liturgy ? 1 : 0), 0);
    return { score, pct: Math.round((score / 21) * 100), confession: d.confession, week: d.week };
  };

  return (
    <div style={styles.appBg}>
      <div style={styles.appContainer}>
        <div style={styles.header}>
          <div>
            <div style={styles.headerName}>👑 الاستاذ مينا اسكندس</div>
            <div style={styles.headerSub}>متابعة جميع الخادمين</div>
          </div>
          <button style={styles.logoutBtn} onClick={onLogout}>خروج</button>
        </div>

        {weekOptions.length > 1 && (
          <div style={styles.weekSelector}>
            {weekOptions.map(w => (
              <button
                key={w.key}
                style={{ ...styles.weekBtn, ...(viewWeek === w.key ? styles.weekBtnActive : {}) }}
                onClick={() => setViewWeek(w.key)}
              >
                {w.label}
              </button>
            ))}
          </div>
        )}

        <div style={styles.dashGrid}>
          {servants.map(s => {
            const { score, pct, confession, week } = getStats(s.id);
            const color = pct >= 70 ? "#4ade80" : pct >= 40 ? "#fbbf24" : "#f87171";
            return (
              <div key={s.id} style={styles.dashCard}>
                <div style={styles.dashName}>🕊 {s.name}</div>
                <div style={{ ...styles.dashPct, color }}>{pct}%</div>
                <div style={styles.dashBar}><div style={{ ...styles.dashBarFill, width: `${pct}%`, background: color }} /></div>
                <div style={styles.dashScore}>{score}/21 نقطة</div>
                <div style={styles.dashConfession}>{confession ? `✝ اعتراف: ${new Date(confession).toLocaleDateString("ar-EG", { month: "short", day: "numeric" })}` : "✝ لم يُسجل اعتراف"}</div>
                <table style={styles.miniTable}>
                  <thead><tr><th style={styles.miniTh}>اليوم</th><th style={styles.miniTh}>🤲</th><th style={styles.miniTh}>📖</th><th style={styles.miniTh}>⛪</th></tr></thead>
                  <tbody>
                    {week.map((row, i) => (
                      <tr key={i}>
                        <td style={styles.miniTd}>{row.day.slice(0, 3)}</td>
                        <td style={{ ...styles.miniTd, color: row.prayer ? "#4ade80" : "#f87171" }}>{row.prayer ? "✓" : "✗"}</td>
                        <td style={{ ...styles.miniTd, color: row.bible ? "#4ade80" : "#f87171" }}>{row.bible ? "✓" : "✗"}</td>
                        <td style={{ ...styles.miniTd, color: row.liturgy ? "#4ade80" : "#f87171" }}>{row.liturgy ? "✓" : "✗"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  loginBg: { minHeight: "100vh", background: "linear-gradient(135deg, #1a0533 0%, #2d1b5e 50%, #1a0533 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Noto Naskh Arabic', Georgia, serif", direction: "rtl", padding: 16 },
  loginCard: { background: "rgba(255,255,255,0.07)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 24, padding: "40px 32px", width: "100%", maxWidth: 420, textAlign: "center" },
  crossIcon: { fontSize: 48, color: "#d4af37", marginBottom: 8 },
  loginTitle: { color: "#fff", fontSize: 28, fontWeight: "bold", margin: "0 0 4px" },
  loginSub: { color: "#c4b5fd", fontSize: 14, marginBottom: 24 },
  loginLabel: { color: "#e2d9f3", fontSize: 13, marginBottom: 12 },
  servantList: { display: "flex", flexDirection: "column", gap: 8, maxHeight: 380, overflowY: "auto", marginBottom: 20 },
  servantBtn: { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#e2d9f3", padding: "10px 16px", cursor: "pointer", fontSize: 14, textAlign: "right" },
  seniorBtn: { background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)", color: "#fde68a" },
  passwordSection: { display: "flex", fl};
