const API_BASE = "https://ku5l46l1li.execute-api.ap-south-1.amazonaws.com/prod";
const EXPENSE_KEY = "expenses_db";
const INCOME_KEY = "income_db";
const USER_KEY = "tracker_user_name";

// --- 1. CLOUD SYNC FUNCTION ---
async function saveToCloud(payload) {
    try {
        const response = await fetch(`${API_BASE}/expense`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        return response.ok;
    } catch (err) {
        console.error("Cloud Error:", err);
        return false;
    }
}

// --- 2. MAIN PAGE LOADER ---
document.addEventListener("DOMContentLoaded", () => {
    const storedName = localStorage.getItem(USER_KEY);
    const overlay = document.getElementById("signup-overlay");
    const footer = document.getElementById("main-nav");

    // Signup Logic
    if (!storedName) {
        if (overlay) overlay.classList.remove("hidden");
        if (footer) footer.classList.add("hidden");
    } else {
        const welcomeEl = document.getElementById("welcome-name");
        if (welcomeEl) welcomeEl.innerText = `Hi, ${storedName}`;
    }

    const saveUserBtn = document.getElementById("save-user-btn");
    if (saveUserBtn) {
        saveUserBtn.onclick = () => {
            const name = document.getElementById("user-name-input").value.trim();
            if (name) {
                localStorage.setItem(USER_KEY, name);
                location.reload(); 
            }
        };
    }

    // --- 3. DASHBOARD CALCULATIONS (Only if elements exist) ---
    const allExpenses = JSON.parse(localStorage.getItem(EXPENSE_KEY)) || [];
const allIncomes  = JSON.parse(localStorage.getItem(INCOME_KEY)) || [];

const currentUser = localStorage.getItem(USER_KEY);

const expenses = allExpenses.filter(e => e.userId === currentUser);
const incomes  = allIncomes.filter(i => i.userId === currentUser);


    const totalExp = expenses.reduce((a, b) => a + Number(b.amount), 0);
    const totalInc = incomes.reduce((a, b) => a + Number(b.amount), 0);

    if (document.getElementById("balance")) {
        document.getElementById("balance").innerText = `₹${totalInc - totalExp}`;
        document.getElementById("incomeTotal").innerText = `₹${totalInc}`;
        document.getElementById("expenseTotal").innerText = `₹${totalExp}`;
    }

    // --- 4. RENDER RECENT LIST ---
    const recentList = document.getElementById("recentList");
    if (recentList) {
        const combined = [
            ...expenses.map(e => ({ ...e, t: 'E' })),
            ...incomes.map(i => ({ ...i, t: 'I' }))
        ]
        .sort((a, b) => Number(b.Id) - Number(a.Id))
        .slice(0, 4);

        recentList.innerHTML = combined.map(item => `
            <div class="bg-white p-5 rounded-[2rem] shadow-sm flex justify-between items-center mb-3">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl flex items-center justify-center ${item.t === 'I' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}">
                        ${item.t === 'I' ? '💰' : '💸'}
                    </div>
                    <div>
                        <p class="font-bold text-gray-700 text-sm">${item.note || item.category || 'Transaction'}</p>
                        <p class="text-[10px] text-gray-400 font-bold uppercase tracking-tight">${item.date}</p>
                    </div>
                </div>
                <p class="font-bold ${item.t === 'I' ? 'text-green-500' : 'text-red-500'}">
                    ${item.t === 'I' ? '+' : '-'}₹${item.amount}
                </p>
            </div>
        `).join('') || '<p class="text-center text-gray-400 py-10">No activity yet</p>';
    }

    // --- 5. FORM SUBMISSION LOGIC (Fixes the continuous adding) ---
    const expForm = document.getElementById("expense-form");
    if (expForm) {
        expForm.onsubmit = async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            btn.disabled = true;
            btn.innerText = "Syncing...";

            const obj = {
    userId: localStorage.getItem(USER_KEY),   // ✅ ADD THIS LINE
    Id: Date.now().toString(),
    amount: Number(document.getElementById("expense-amount").value),
    category: document.getElementById("expense-category").value,
    date: document.getElementById("expense-date").value,
    note: document.getElementById("expense-note").value,
    type: "Expense"
};


            expenses.push(obj);
            localStorage.setItem(EXPENSE_KEY, JSON.stringify(expenses));
            await saveToCloud(obj);
            window.location.href = "index.html";
        };
    }

    const incForm = document.getElementById("income-form");
    if (incForm) {
        incForm.onsubmit = async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            btn.disabled = true;
            btn.innerText = "Syncing...";

            const obj = {
    userId: localStorage.getItem(USER_KEY),   // ✅ ADD THIS
    Id: Date.now().toString(),
    amount: Number(document.getElementById("income-amount").value),
    category: "Income",
    date: document.getElementById("income-date").value,
    note: document.getElementById("income-note").value,
    type: "Income"
};


            incomes.push(obj);
            localStorage.setItem(INCOME_KEY, JSON.stringify(incomes));
            await saveToCloud(obj);
            window.location.href = "index.html";
        };
    }
});

// Settings functions
function clearAll() {
    if (confirm("Reset everything?")) {
        localStorage.clear();
        window.location.href = 'index.html';
    }
}