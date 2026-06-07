 // 1. مصفوفة المستخدمين (يمكنك تغيير كلمات المرور هنا بكل سهولة)
const users = [
    { name: "نرمين شنودة", pin: "483917", isAdmin: false },
    { name: "ساندي غبريال", pin: "620481", isAdmin: false },
    { name: "شيري مرزق", pin: "159204", isAdmin: false },
    { name: "اماني مشهور", pin: "837502", isAdmin: false },
    { name: "المس ليديا نادي", pin: "294613", isAdmin: false },
    { name: "المس مريم وجيه", pin: "571839", isAdmin: false },
    { name: "المس نسمه حليم", pin: "906428", isAdmin: false },
    { name: "ايريني واصف", pin: "348571", isAdmin: false },
    { name: "كاترين عاطف", pin: "715926", isAdmin: false },
    { name: "كاترين منصور", pin: "482063", isAdmin: false },
    { name: "مريم مرزق", pin: "639147", isAdmin: false },
    { name: "مارينا جمال", pin: "821504", isAdmin: false },
    { name: "مارينا رضا", pin: "104739", isAdmin: false },
    { name: "سارة ممدوح", pin: "567281", isAdmin: false },
    { name: "نرمين سمير", pin: "392840", isAdmin: false },
    { name: "ايريني شنودة", pin: "614972", isAdmin: false },
    { name: "فايزة نزيه", pin: "850316", isAdmin: false },
    { name: "مريم اشرف", pin: "273594", isAdmin: false },
    { name: "مريم فنيار", pin: "906172", isAdmin: false },
    { name: "هيلانه عادل", pin: "431865", isAdmin: false },
    { name: "روجينا شنودة", pin: "758203", isAdmin: false },
    { name: "ايفون طلعت", pin: "194627", isAdmin: false },
    { name: "مارينا نزيه", pin: "580394", isAdmin: false },
    { name: "مارينا بطرس", pin: "326718", isAdmin: false },
    { name: "مارتينا يوسف", pin: "947501", isAdmin: false },
    { name: "ايمان سليمان", pin: "618432", isAdmin: false },
    { name: "مريم رأفت", pin: "204859", isAdmin: false },
    { name: "نرمين ممدوح", pin: "739261", isAdmin: false },
    { name: "ايريني بهاء", pin: "581904", isAdmin: false },
    { name: "جاسيكا رامي", pin: "426137", isAdmin: false },
    { name: "ايريني ناجح", pin: "953680", isAdmin: false },
    { name: "مهرائيل ظريف", pin: "172849", isAdmin: false },
    { name: "مهرائيل جرجس", pin: "805216", isAdmin: false },
    { name: "كرمينا عصام", pin: "367492", isAdmin: false },
    { name: "مريم مدحت", pin: "624081", isAdmin: false },
    { name: "اماني حلمي", pin: "598173", isAdmin: false },
    { name: "مينا هاني حلمي", pin: "841206", isAdmin: false },
    { name: "ماير مشيل ميخائيل", pin: "370925", isAdmin: false },
    { name: "يوسف فرج مسعود", pin: "516784", isAdmin: false },
    { name: "اثناسيوس هاني نبيل", pin: "249613", isAdmin: false },
    { name: "ابانوب سعيد", pin: "783052", isAdmin: false },
    { name: "جرجس صبحي فرح", group: "605437", isAdmin: false },
    { name: "فادي نتعي فايز", pin: "932814", isAdmin: false },
    { name: "انطونيوس نزيه", pin: "417590", isAdmin: false },
    { name: "كيرلس وجيه", pin: "186327", isAdmin: false },
    { name: "الاستاذ مينا اسكندس", pin: "754069", isAdmin: true } // تم تعيينه كـ Admin
];

// المتغيرات الحالية للمستخدم النشط
let currentUser = null;

// تشغيل التطبيق والتحقق من التذكر تلقائياً (طلبك الأول)
window.onload = function() {
    const savedUser = localStorage.getItem('loggedUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        loadApplicationInterface(); // الدخول المباشر للتطبيق دون طلب الباسورد
    } else {
        showLoginPage(); // إظهار صفحة تسجيل الدخول لو أول مرة
    }
};

// 2. دالة تسجيل الدخول لأول مرة
function login(inputName, inputPin) {
    const user = users.find(u => u.name === inputName && u.pin === inputPin);
    
    if (user) {
        // حفظ بيانات المستخدم في المتصفح حتى لا يكتب الباسورد مجدداً
        localStorage.setItem('loggedUser', JSON.stringify(user));
        currentUser = user;
        loadApplicationInterface();
    } else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة!");
    }
}

// 3. تحميل الواجهة بناءً على الصلاحيات (طلبك الثاني والثالث)
function loadApplicationInterface() {
    // إخفاء صفحة تسجيل الدخول وإظهار الصفحة الرئيسية
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('app-section').style.display = 'block';
    
    document.getElementById('welcome-msg').innerText = `أهلاً بك يا ${currentUser.name}`;

    // التحقق هل المستخدم هو الأستاذ مينا؟
    if (currentUser.isAdmin) {
        // إظهار لوحة التحكم بالأرشيف وزر تصفير الأسبوع
        document.getElementById('admin-panel').style.display = 'block';
        displayArchiveForAdmin();
    } else {
        // إخفاء الأرشيف والأسابيع القديمة عن باقي المستخدمين
        document.getElementById('admin-panel').style.display = 'none';
        displayCurrentWeekOnly();
    }
}

// 4. دالة تصفير الأسبوع ونقل البيانات للأرشيف (للأستاذ مينا فقط)
function resetCurrentWeek() {
    if (!currentUser.isAdmin) return alert("غير مصرح لك بهذا الإجراء!");

    // جلب العلامات الحالية المخزنة
    let currentMarks = JSON.parse(localStorage.getItem('currentWeekMarks')) || {};
    let archive = JSON.parse(localStorage.getItem('weeksArchive')) || [];

    if (Object.keys(currentMarks).length === 0) {
        alert("لا توجد علامات مسجلة هذا الأسبوع لتصفيرها.");
        return;
    }

    // حفظ الأسبوع الحالي في الأرشيف مع التاريخ
    const weekData = {
        date: new Date().toLocaleDateString('ar-EG'),
        marks: currentMarks
    };
    archive.push(weekData);
    localStorage.setItem('weeksArchive', JSON.stringify(archive));

    // تصفير العلامات تماماً لتبدأ من جديد بدون علامات
    localStorage.removeItem('currentWeekMarks');
    
    alert("تم تصفير الأسبوع الحالي بنجاح وحفظ البيانات في أرشيف الأستاذ مينا!");
    loadApplicationInterface(); // إعادة تحميل الواجهة لتحديث البيانات
}

// 5. عرض الأرشيف للأستاذ مينا فقط
function displayArchiveForAdmin() {
    const archive = JSON.parse(localStorage.getItem('weeksArchive')) || [];
    const archiveDiv = document.getElementById('archive-content');
    archiveDiv.innerHTML = "";

    if(archive.length === 0) {
        archiveDiv.innerHTML = "<p>الأرشيف فارغ حالياً.</p>";
        return;
    }

    // بناء جدول أو قائمة للأسابيع المحفوظة للأستاذ مينا
    archive.forEach((week, index) => {
        let weekHtml = `<h4>أسابيع قديمة - أسبوع بتاريخ (${week.date}):</h4><ul>`;
        for (let user in week.marks) {
            weekHtml += `<li>${user}: سجل ${week.marks[user]} علامات</li>`;
        }
        weekHtml += `</ul><hr>`;
        archiveDiv.innerHTML += weekHtml;
    });
}

// دالة افتراضية لعرض أسبوع المستخدم العادي فارغاً أو حسب تفاعله الحالي
function displayCurrentWeekOnly() {
    let currentMarks = JSON.parse(localStorage.getItem('currentWeekMarks')) || {};
    // هنا يتم عرض علامات الأسبوع الحالي للمستخدم العادي فقط وتحديثها
}

// دالة تسجيل الخروج (إذا لزم الأمر مستقبلاً)
function logout() {
    localStorage.removeItem('loggedUser');
    location.reload();
  }
