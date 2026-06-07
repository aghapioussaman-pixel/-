import React, { useState } from "react";

const DAYS = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

const SERVANTS = [
  { id: 1,  name: "نرمين شنودة",          password: "kP9mV2aQ", role: "servant" },
  { id: 2,  name: "ساندي غبريال",          password: "7fQaB4sD", role: "servant" },
  { id: 3,  name: "شيري مرزق",             password: "Zx3rT6pL", role: "servant" },
  { id: 4,  name: "اماني مشهور",           password: "pL5cD8wK", role: "servant" },
  { id: 5,  name: "المس ليديا نادي",       password: "2mK9sF3r", role: "servant" },
  { id: 6,  name: "المس مريم وجيه",        password: "rV4wY1nH", role: "servant" },
  { id: 7,  name: "المس نسمه حليم",        password: "9dEuH6gT", role: "servant" },
  { id: 8,  name: "ايريني واصف",           password: "Bn7zP3mJ", role: "servant" },
  { id: 9,  name: "كاترين عاطف",           password: "tG2kQ8aR", role: "servant" },
  { id: 10, name: "كاترين منصور",          password: "5sWeR4pM", role: "servant" },
  { id: 11, name: "مريم مرزق",             password: "Xp6mC1zB", role: "servant" },
  { id: 12, name: "مارينا جمال",           password: "qA3nJ7vF", role: "servant" },
  { id: 13, name: "مارينا رضا",            password: "8fTvL2gH", role: "servant" },
  { id: 14, name: "سارة ممدوح",            password: "Mh4bZ9kD", role: "servant" },
  { id: 15, name: "نرمين سمير",            password: "1gKrN5pS", role: "servant" },
  { id: 16, name: "ايريني شنودة",          password: "Jd7wX3cV", role: "servant" },
  { id: 17, name: "فايزة نزيه",            password: "6cVqP2mN", role: "servant" },
  { id: 18, name: "مريم اشرف",             password: "aShB4rT7", role: "servant" },
  { id: 19, name: "مريم فنيار",            password: "Fz2tR8kW", role: "servant" },
  { id: 20, name: "هيلانه عادل",           password: "3pLmD6nQ", role: "servant" },
  { id: 21, name: "روجينا شنودة",          password: "Uw5rE7xZ", role: "servant" },
  { id: 22, name: "ايفون طلعت",            password: "kByG1sA4", role: "servant" },
  { id: 23, name: "مارينا نزيه",           password: "9xNqT3pL", role: "servant" },
  { id: 24, name: "مارينا بطرس",           password: "vH6zK8dF", role: "servant" },
  { id: 25, name: "مارتينا يوسف",          password: "2rMaP7cB", role: "servant" },
  { id: 26, name: "ايمان سليمان",          password: "sC3wF5nM", role: "servant" },
  { id: 27, name: "مريم رأفت",             password: "7tGjL9qR", role: "servant" },
  { id: 28, name: "نرمين ممدوح",           password: "QdxV4kP2", role: "servant" },
  { id: 29, name: "ايريني بهاء",           password: "4mKzB6wH", role: "servant" },
  { id: 30, name: "جاسيكا رامي",           password: "ePhR2sT8", role: "servant" },
  { id: 31, name: "ايريني ناجح",           password: "Yn5fT3gK", role: "servant" },
  { id: 32, name: "مهرائيل ظريف",          password: "6bTwF2pL", role: "servant" },
  { id: 33, name: "مهرائيل جرجس",          password: "6wQuJ7mD", role: "servant" },
  { id: 34, name: "كرمينا عصام",           password: "bZ2kM9pL", role: "servant" },
  { id: 35, name: "مريم مدحت",             password: "8sXgN4rC", role: "servant" },
  { id: 36, name: "اماني حلمي",            password: "L3vR7tB6", role: "servant" },
  { id: 37, name: "مينا هاني حلمي",        password: "1aDhC5kM", role: "servant" },
  { id: 38, name: "ماير مشيل ميخائيل",     password: "pFmQ2nZ9", role: "servant" },
  { id: 39, name: "يوسف فرج مسعود",        password: "5tBnW8vR", role: "servant" },
  { id: 40, name: "اثناسيوس هاني نبيل",    password: "0kZrE6pQ", role: "servant" },
  { id: 41, name: "ابانوب سعيد",           password: "XhyS7mF3", role: "servant" },
  { id: 42, name: "جرجس صبحي فرح",         password: "3gPqV9kL", role: "servant" },
  { id: 43, name: "فادي نتعي فايز",        password: "cMjT5nB2", role: "servant" },
  { id: 44, name: "انطونيوس نزيه",         password: "9rWkD1pH", role: "servant" },
  { id: 45, name: "كيرلس وجيه",            password: "fNzB8mQ4", role: "servant" },
  { id: 0,  name: "الاستاذ مينا اسكندس",   password: "7vLtH3rS", role: "senior" },
];

const emptyWeek = () => DAYS.map(day => ({ day, prayer: false, bible: false, liturgy: false }));
const STORAGE_KEY = "spiritual_notebook_v2";

function loadAllData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  const data = {};
  SERVANTS.filter(s => s.role === "servant").forEach(s => {
    data[s.id] = { week: emptyWeek(), confession: "" };
  });
  return data;
}

function saveAllData(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) {}
}

export default function App() {
  const [screen, setScreen] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [allData, setAllData] = useState(loadAllData);
  const [activeTab, setActiveTab] = useState("tracker");

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
      const updated = { ...prev };
      if (!updated[currentUser.id]) updated[currentUser.id] = { week: emptyWeek(), confession: "" };
      const userWeek = updated[currentUser.id].week.map((d, i) =>
        i === dayIndex ? { ...d, [field]: !d[field] } : d
      );
      updated[currentUser.id] = { ...updated[currentUser.id], week: userWeek };
      saveAllData(updated);
      return updated;
    });
  };

  const updateConfession = (val) => {
    setAllData(prev => {
      const updated = { ...prev };
      if (!updated[currentUser.id]) updated[currentUser.id] = { week: emptyWeek(), confession: "" };
      updated[currentUser.id] = { ...updated[currentUser.id], confession: val };
      saveAllData(updated);
      return updated;
    });
  };

  if (screen === "login") return <LoginScreen onLogin={handleLogin} />;
  if (currentUser?.role === "senior") return <SeniorDashboard allData={allData} onLogout={handleLogout} />;
  const userData = allData[currentUser.id] || { week: emptyWeek(), confession: "" };
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

function LoginScreen({ onLogin }) {
  const [selected, setSelected] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSelect = (s) => {
    setSelected(s);
    setPassword("");
    setError("");
  };

  const handleLogin = () => {
    if (!selected) return;
    if (password === selected.password) {
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
            <p style={styles.loginLabel}>ادخل كلمة السر</p>
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

function SeniorDashboard({ allData, onLogout }) {
  const servants = SERVANTS.filter(s => s.role === "servant");
  const getStats = (id) => {
    const d = allData[id] || { week: emptyWeek(), confession: "" };
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
  passwordSection: { display: "flex", flexDirection: "column", alignItems: "center", gap: 12 },
  selectedName: { background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 12, padding: "10px 20px", color: "#fde68a", fontSize: 16, fontWeight: "bold", width: "100%" },
  passInputWrapper: { position: "relative", width: "100%" },
  passInput: { width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, color: "#fff", padding: "12px 44px 12px 16px", fontSize: 15, outline: "none", direction: "ltr", boxSizing: "border-box" },
  eyeBtn: { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18 },
  errorMsg: { color: "#f87171", fontSize: 13, background: "rgba(248,113,113,0.1)", borderRadius: 8, padding: "8px 12px", width: "100%", boxSizing: "border-box" },
  loginBtns: { display: "flex", gap: 10, width: "100%" },
  backBtn: { flex: 1, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#e2d9f3", borderRadius: 12, padding: "12px", fontSize: 14, cursor: "pointer" },
  loginBtn: { flex: 2, background: "linear-gradient(135deg, #d4af37, #b8962e)", color: "#1a0533", border: "none", borderRadius: 12, padding: "12px", fontSize: 16, fontWeight: "bold", cursor: "pointer" },
  appBg: { minHeight: "100vh", background: "linear-gradient(135deg, #0f1729 0%, #1e2d5a 100%)", fontFamily: "'Noto Naskh Arabic', Georgia, serif", direction: "rtl", padding: "16px" },
  appContainer: { maxWidth: 700, margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, background: "rgba(255,255,255,0.07)", borderRadius: 16, padding: "16px 20px", border: "1px solid rgba(255,255,255,0.1)" },
  headerName: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  headerSub: { color: "#94a3b8", fontSize: 12 },
  logoutBtn: { background: "rgba(248,113,113,0.2)", border: "1px solid rgba(248,113,113,0.3)", color: "#fca5a5", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 13 },
  scoreCard: { display: "flex", alignItems: "center", gap: 20, background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: "20px", marginBottom: 20, border: "1px solid rgba(212,175,55,0.2)" },
  scoreCircle: { width: 70, height: 70, borderRadius: "50%", background: "linear-gradient(135deg, #d4af37, #b8962e)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  scoreNum: { color: "#1a0533", fontSize: 18, fontWeight: "bold" },
  scoreText: { flex: 1 },
  scoreTitle: { color: "#e2d9f3", fontSize: 14, marginBottom: 8 },
  scoreBar: { height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden", marginBottom: 6 },
  scoreBarFill: { height: "100%", background: "linear-gradient(90deg, #d4af37, #4ade80)", borderRadius: 4, transition: "width 0.5s" },
  scoreSub: { color: "#94a3b8", fontSize: 12 },
  tabs: { display: "flex", gap: 8, marginBottom: 16 },
  tab: { flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", borderRadius: 10, padding: "10px", cursor: "pointer", fontSize: 14 },
  tabActive: { background: "rgba(212,175,55,0.2)", border: "1px solid #d4af37", color: "#fde68a" },
  tableWrapper: { background: "rgba(255,255,255,0.05)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { background: "rgba(212,175,55,0.15)", color: "#fde68a", padding: "12px 8px", fontSize: 13, fontWeight: "bold", textAlign: "center", borderBottom: "1px solid rgba(212,175,55,0.2)" },
  rowEven: { background: "rgba(255,255,255,0.02)" },
  rowOdd: { background: "transparent" },
  tdDay: { color: "#e2d9f3", padding: "12px 16px", fontSize: 14, fontWeight: "bold" },
  td: { padding: "8px", textAlign: "center" },
  check: { width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "2px solid rgba(255,255,255,0.15)", color: "#94a3b8", cursor: "pointer", fontSize: 16, display: "inline-flex", alignItems: "center", justifyContent: "center" },
  checkOn: { background: "rgba(74,222,128,0.2)", border: "2px solid #4ade80", color: "#4ade80" },
  confessionCard: { background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: 32, textAlign: "center", border: "1px solid rgba(212,175,55,0.2)" },
  confessionIcon: { fontSize: 48, color: "#d4af37", marginBottom: 8 },
  confessionTitle: { color: "#fff", fontSize: 20, marginBottom: 4 },
  confessionLabel: { color: "#94a3b8", fontSize: 14, marginBottom: 16 },
  dateInput: { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 10, color: "#fff", padding: "12px 16px", fontSize: 15, width: "100%", maxWidth: 280, outline: "none", direction: "ltr" },
  confessionResult: { marginTop: 16, color: "#c4b5fd", fontSize: 14, background: "rgba(212,175,60,0.1)", borderRadius: 10, padding: "10px 16px" },
  dashGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 },
  dashCard: { background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: 20, border: "1px solid rgba(255,255,255,0.08)" },
  dashName: { color: "#fff", fontSize: 15, fontWeight: "bold", marginBottom: 8 },
  dashPct: { fontSize: 28, fontWeight: "bold", marginBottom: 4 },
  dashBar: { height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden", marginBottom: 6 },
  dashBarFill: { height: "100%", borderRadius: 3, transition: "width 0.5s" },
  dashScore: { color: "#94a3b8", fontSize: 12, marginBottom: 4 },
  dashConfession: { color: "#c4b5fd", fontSize: 12, marginBottom: 12 },
  miniTable: { width: "100%", borderCollapse: "collapse", fontSize: 11 },
  miniTh: { color: "#94a3b8", padding: "4px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.08)" }
  miniTd: { color: "#e2d9f3", padding: "3px 4px", textAlign: "center" },
};

