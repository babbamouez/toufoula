// قاعدة بيانات مصغرة للمستخدمين وصلاحياتهم
// role: "central" (إدارة مركزية - ترى كل الولايات)
// role: "regional" (إدارة جهوية - ترى ولايتها فقط)

const usersDB = {
    "admin": { 
        password: "123", 
        role: "central", 
        state: "الكل", 
        name: "الإدارة العامة للطفولة" 
    },
    "sousse": { 
        password: "000", 
        role: "regional", 
        state: "سوسة", 
        name: "المندوبية الجهوية بسوسة" 
    },
    "tunis": { 
        password: "111", 
        role: "regional", 
        state: "تونس", 
        name: "المندوبية الجهوية بتونس" 
    },
    "monastir": { 
        password: "222", 
        role: "regional", 
        state: "المنستير", 
        name: "المندوبية الجهوية بالمنستير" 
    }
    // يمكنك إضافة المزيد من الولايات بنفس الطريقة
};