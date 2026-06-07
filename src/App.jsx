cat > /mnt/user-data/outputs/App.jsx << 'ENDOFFILE'
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, get } from "firebase/database";

// ===================== 🔥 FIREBASE CONFIG =====================
// ⚠️ غيري الأرقام دي بالـ config بتاعك من Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

// ===================== USERS =====================
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
  { id: 0,  name: "الاستاذ مينا اسكندس",   password: "754069", role: "senior"  },
];

const DAYS = ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
const emptyWeek = () => DAYS.map(day => ({ day, prayer: false, bible: false, liturgy: false }));

// ===================== WEEK KEY =====================
function getWeekKey() {
  const now = new Date();
  const year = now.getFullYear();
  const start = new Date(year, 0, 1);
  const week = Math.ceil(((now - start) / 86400000 + start.getDay() + 1) / 7);
  return `${year}-W${String(week).padStart(2, "0")}`;
}
function getWeekLabel(wk) {
  const [year, w] = wk.split("-W");
  return `أسبوع ${parseInt(w)} — ${year}`;
}

// ===================== FIREBASE SAVE =====================
async function saveWeek(userId, weekKey, weekData, confession) {
  await set(ref(db, `users/${userId}/${weekKey}`), { week: weekData, confession: confession || "" });
}

// ===================== MAIN APP =====================
export default function App() {
  const [screen, setScreen]           = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab]     = useState("tracker");
  const [ready, setReady]             = useState(false);

  useEffect(() => {
    // ✅ كلمة المرور مرة واحدة بس — لما يفتح التطبيق من جديد يكتبها تاني
    const stored = sessionStorage.getItem("snb_session");
    if (stored) {
      try {
        const { id, password } = JSON.parse(stored);
        const found = SERVANTS.find(s => s.id === id && s.password === password);
        if (found) { setCurrentUser(found); setScreen("app"); }
      } catch {}
    }
    setReady(true);
  }, []);

  const handleLogin = (servant) => {
    sessionStorage.setItem("snb_session", JSON.stringify({ id: servant.id, password: servant.password }));
    setCurrentUser(servant);
    setScreen("app");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("snb_session");
    setCurrentUser(null);
    setScreen("login");
    setActiveTab("tracker");
  };

  if (!ready) return null;
  if (screen === "login") return <LoginScreen onLogin={handleLogin} />;
  if (currentUser?.role === "senior") return <SeniorDashboard onLogout={handleLogout} />;
  return <ServantApp user={currentUser} onLogout={handleLogout} activeTab={activeTab} setActiveTab={setActiveTab} />;
}

// ===================== LOGIN (نفس التصميم الأصلي) =====================
function LoginScreen({ onLogin }) {
  const [selected, setSelected] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSelect = (s) => { setSelected(s); setPassword(""); setError(""); };
  const handleLogin = () => {
    if (!selected) return;
    if (password === selected.password) onLogin(selected);
    else setError("❌ كلمة السر غلط، حاول تاني");
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
                <button key={s.id}
                  style={{ ...styles.servantBtn, ...(s.role === "senior" ? styles.seniorBtn : {}) }}
                  onClick={() => handleSelect(s)}>
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
              <button style={styles.backBtn} onClick={() => { setSelected(null); setPassword(""); setError(""); }}>← رجوع</button>
              <button style={{ ...styles.loginBtn, opacity: password ? 1 : 0.4 }} disabled={!password} onClick={handleLogin}>دخول</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ===================== SERVANT APP =====================
function ServantApp({ user, onLogout, activeTab, setActiveTab }) {
  const weekKey = getWeekKey();
  const [weekData,   setWeekData]   = useState(emptyWeek());
  const [confession, setConfession] = useState("");
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [saved,      setSaved]      = useState(false);

  // ✅ تحميل بيانات الأسبوع الحالي فقط من Firebase
  useEffect(() => {
    const dbRef = ref(db, `users/${user.id}/${weekKey}`);
    const unsub = onValue(dbRef, snap => {
      if (snap.exists()) {
        const val = snap.val();
        setWeekData(val.week || emptyWeek());
        setConfession(val.confession || "");
      } else {
        setWeekData(emptyWeek());
        setConfession("");
      }
      setLoading(false);
    });
    return () => unsub();
  }, [user.id, weekKey]);

  const updateCell = async (dayIndex, field) => {
    const updated = weekData.map((d, i) => i === dayIndex ? { ...d, [field]: !d[field] } : d);
    setWeekData(updated);
    setSaving(true);
    await saveWeek(user.id, weekKey, updated, confession);
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const updateConfession = async (val) => {
    setConfession(val);
    setSaving(true);
    await saveWeek(user.id, weekKey, weekData, val);
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const score = weekData.reduce((acc, d) => acc + (d.prayer?1:0) + (d.bible?1:0) + (d.liturgy?1:0), 0);
  const pct   = Math.round((score / 21) * 100);

  if (loading) return <div style={styles.loadingScreen}>⏳ جاري التحميل...</div>;

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
            <div style={styles.scoreBar}><div style={{ ...styles.scoreBarFill, width:`${pct}%` }} /></div>
            <div style={styles.scoreSub}>{score} من 21 نقطة</div>
          </div>
        </div>

        {/* ✅ badge الحفظ على السحابة */}
        {(saving || saved) && (
          <div style={{
            ...styles.saveBadge,
            background:   saving ? "rgba(100,150,255,0.12)" : "rgba(74,222,128,0.12)",
            borderColor:  saving ? "rgba(100,150,255,0.3)"  : "rgba(74,222,128,0.3)",
            color:        saving ? "#93b4ff"                : "#4ade80",
          }}>
            {saving ? "⏳ جاري الحفظ على السحابة..." : "✓ تم الحفظ — متاح على كل أجهزتك"}
          </div>
        )}

        <div style={styles.tabs}>
          <button style={{ ...styles.tab, ...(activeTab==="tracker"    ? styles.tabActive : {}) }} onClick={() => setActiveTab("tracker")}>📅 المتابعة الأسبوعية</button>
          <button style={{ ...styles.tab, ...(activeTab==="confession" ? styles.tabActive : {}) }} onClick={() => setActiveTab("confession")}>🙏 الاعتراف</button>
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
                {weekData.map((row, i) => (
                  <tr key={i} style={i%2===0 ? styles.rowEven : styles.rowOdd}>
                    <td style={styles.tdDay}>{row.day}</td>
                    {["prayer","bible","liturgy"].map(f => (
                      <td key={f} style={styles.td}>
                        <button style={{ ...styles.check, ...(row[f] ? styles.checkOn : {}) }} onClick={() => updateCell(i, f)}>
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
            <input type="date" value={confession} onChange={e => updateConfession(e.target.value)} style={styles.dateInput} />
            {confession && (
              <div style={styles.confessionResult}>
                🙏 آخر اعتراف: <strong>{new Date(confession).toLocaleDateString("ar-EG", { year:"numeric", month:"long", day:"numeric" })}</strong>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ===================== SENIOR DASHBOARD =====================
function SeniorDashboard({ onLogout }) {
  const weekKey  = getWeekKey();
  const servants = SERVANTS.filter(s => s.role === "servant");

  const [allData,      setAllData]      = useState({});
  const [selectedWeek, setSelectedWeek] = useState(weekKey);
  const [weekKeys,     setWeekKeys]     = useState([weekKey]);
  const [loading,      setLoading]      = useState(true);

  useEffect(() => {
    // ✅ الأستاذ مينا يحمّل كل البيانات — كل الأسابيع — لكل الخادمين
    const loadAll = async () => {
      const result = {};
      const allWks = new Set([weekKey]);
      for (const s of servants) {
        const snap = await get(ref(db, `users/${s.id}`));
        if (snap.exists()) {
          result[s.id] = snap.val();
          Object.keys(snap.val()).forEach(k => allWks.add(k));
        } else {
          result[s.id] = {};
        }
      }
      setAllData(result);
      setWeekKeys([...allWks].sort().reverse());
      setLoading(false);
    };
    loadAll();

    // Realtime للأسبوع الحالي بس
    const unsubs = servants.map(s =>
      onValue(ref(db, `users/${s.id}/${weekKey}`), snap => {
        setAllData(prev => ({
          ...prev,
          [s.id]: { ...(prev[s.id] || {}), [weekKey]: snap.exists() ? snap.val() : {} }
        }));
      })
    );
    return () => unsubs.forEach(fn => fn());
  }, []);

  const getStats = (id) => {
    const wkData   = allData[id]?.[selectedWeek];
    const week      = wkData?.week       || emptyWeek();
    const confession= wkData?.confession || "";
    const score     = week.reduce((acc, r) => acc + (r.prayer?1:0) + (r.bible?1:0) + (r.liturgy?1:0), 0);
    return { score, pct: Math.round((score/21)*100), confession, week };
  };

  if (loading) return <div style={styles.loadingScreen}>⏳ جاري تحميل بيانات الجميع...</div>;

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

        {/* ✅ اختيار الأسبوع — للأستاذ مينا بس */}
        <div style={styles.weekSelector}>
          <span style={styles.weekSelectorLabel}>📅 عرض أسبوع:</span>
          <select value={selectedWeek} onChange={e => setSelectedWeek(e.target.value)} style={styles.weekSelect}>
            {weekKeys.map(wk => (
              <option key={wk} value={wk} style={{ background:"#1e2d5a" }}>
                {getWeekLabel(wk)}{wk === weekKey ? " (الحالي)" : ""}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.dashGrid}>
          {servants.map(s => {
            const { score, pct, confession, week } = getStats(s.id);
            const color = pct >= 70 ? "#4ade80" : pct >= 40 ? "#fbbf24" : "#f87171";
            return (
              <div key={s.id} style={styles.dashCard}>
                <div style={styles.dashName}>🕊 {s.name}</div>
                <div style={{ ...styles.dashPct, color }}>{pct}%</div>
                <div style={styles.dashBar}><div style={{ ...styles.dashBarFill, width:`${pct}%`, background:color }} /></div>
                <div style={styles.dashScore}>{score}/21 نقطة</div>
                <div style={styles.dashConfession}>
                  {confession
                    ? `✝ اعتراف: ${new Date(confession).toLocaleDateString("ar-EG",{month:"short",day:"numeric"})}`
                    : "✝ لم يُسجل اعتراف"}
                </div>
                <table style={styles.miniTable}>
                  <thead><tr><th style={styles.miniTh}>اليوم</th><th style={styles.miniTh}>🤲</th><th style={styles.miniTh}>📖</th><th style={styles.miniTh}>⛪</th></tr></thead>
                  <tbody>
                    {week.map((row, i) => (
                      <tr key={i}>
                        <td style={styles.miniTd}>{row.day.slice(0,3)}</td>
                        <td style={{ ...styles.miniTd, color: row.prayer  ? "#4ade80":"#f87171" }}>{row.prayer  ? "✓":"✗"}</td>
                        <td style={{ ...styles.miniTd, color: row.bible   ? "#4ade80":"#f87171" }}>{row.bible   ? "✓":"✗"}</td>
                        <td style={{ ...styles.miniTd, color: row.liturgy ? "#4ade80":"#f87171" }}>{row.liturgy ? "✓":"✗"}</td>
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

// ===================== STYLES (نفس التصميم الأصلي تماماً) =====================
const styles = {
  loginBg: { minHeight:"100vh", background:"linear-gradient(135deg,#1a0533 0%,#2d1b5e 50%,#1a0533 100%)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Noto Naskh Arabic',Georgia,serif", direction:"rtl", padding:16 },
  loginCard: { background:"rgba(255,255,255,0.07)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:24, padding:"40px 32px", width:"100%", maxWidth:420, textAlign:"center" },
  cro
