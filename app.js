/* =========================================
   BULCHINSA MAGALAA CALANQOO
   VERSION 1
========================================= */

// DATA
let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let assets = JSON.parse(localStorage.getItem("assets")) || [];
let projects = JSON.parse(localStorage.getItem("projects")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [
  {
    name: "Admin",
    role: "Admin"
  }
];


// LOGIN
function login() {

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "1234") {

    localStorage.setItem("loggedIn", "true");

    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");

    updateDashboard();

  } else {

    document.getElementById("loginError").innerText =
      "Username ykn Password sirrii miti.";
  }
}


// LOGOUT
function logout() {

  localStorage.removeItem("loggedIn");

  document.getElementById("app").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");
}


// PAGE SWITCH
function showPage(page) {

  document.querySelectorAll(".page").forEach(p => {
    p.classList.add("hidden");
  });

  document.getElementById(page).classList.remove("hidden");

  const titles = {
    dashboard: "Dashboard",
    galii: "Galii",
    baasii: "Baasii",
    gis: "GIS / GPS",
    qabeenya: "Qabeenya",
    pirojektii: "Pirojektii",
    suuraa: "Suuraa",
    gabaasa: "Gabaasa",
    users: "Users"
  };

  document.getElementById("pageTitle").innerText =
    titles[page] || "Dashboard";

  if (window.innerWidth <= 900) {
    document.querySelector(".sidebar").classList.remove("open");
  }

  updateTables();
}


// SIDEBAR
function toggleSidebar() {

  document.querySelector(".sidebar")
    .classList.toggle("open");
}


// DATE
function updateDate() {

  const now = new Date();

  document.getElementById("date").innerText =
    now.toLocaleDateString("om-ET", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
}


// GALII
function addIncome(event) {

  event.preventDefault();

  const reason =
    document.getElementById("incomeReason").value;

  const amount =
    Number(document.getElementById("incomeAmount").value);

  const date =
    document.getElementById("incomeDate").value;

  incomes.push({
    id: Date.now(),
    reason,
    amount,
    date
  });

  localStorage.setItem("incomes", JSON.stringify(incomes));

  event.target.reset();

  updateDashboard();
  updateTables();

  alert("Galiin galmaa'eera.");
}


// BAASII
function addExpense(event) {

  event.preventDefault();

  const reason =
    document.getElementById("expenseReason").value;

  const amount =
    Number(document.getElementById("expenseAmount").value);

  const date =
    document.getElementById("expenseDate").value;

  expenses.push({
    id: Date.now(),
    reason,
    amount,
    date
  });

  localStorage.setItem("expenses", JSON.stringify(expenses));

  event.target.reset();

  updateDashboard();
  updateTables();

  alert("Baasiin galmaa'eera.");
}


// QABEENYA
function addAsset(event) {

  event.preventDefault();

  const name =
    document.getElementById("assetName").value;

  const type =
    document.getElementById("assetType").value;

  const value =
    Number(document.getElementById("assetValue").value);

  assets.push({
    id: Date.now(),
    name,
    type,
    value
  });

  localStorage.setItem("assets", JSON.stringify(assets));

  event.target.reset();

  updateDashboard();
  updateTables();

  alert("Qabeenyi galmaa'eera.");
}


// PIROJEKTII
function addProject(event) {

  event.preventDefault();

  const name =
    document.getElementById("projectName").value;

  const location =
    document.getElementById("projectLocation").value;

  const budget =
    Number(document.getElementById("projectBudget").value);

  const status =
    document.getElementById("projectStatus").value;

  projects.push({
    id: Date.now(),
    name,
    location,
    budget,
    status
  });

  localStorage.setItem("projects", JSON.stringify(projects));

  event.target.reset();

  updateDashboard();
  updateTables();

  alert("Pirojektiin galmaa'eera.");
}


// USER
function addUser(event) {

  event.preventDefault();

  const name =
    document.getElementById("newUser").value;

  const role =
    document.getElementById("userRole").value;

  users.push({
    name,
    role
  });

  localStorage.setItem("users", JSON.stringify(users));

  event.target.reset();

  updateTables();

  alert("User haaraan dabalameera.");
}


// DELETE
function deleteItem(type, id) {

  if (!confirm("Dhugumaan haquu barbaaddaa?")) {
    return;
  }

  if (type === "income") {
    incomes = incomes.filter(x => x.id !== id);
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }

  if (type === "expense") {
    expenses = expenses.filter(x => x.id !== id);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  if (type === "asset") {
    assets = assets.filter(x => x.id !== id);
    localStorage.setItem("assets", JSON.stringify(assets));
  }

  if (type === "project") {
    projects = projects.filter(x => x.id !== id);
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  if (type === "user") {
    users = users.filter((x, index) =>
      !(x.name === id && index !== 0)
    );

    localStorage.setItem("users", JSON.stringify(users));
  }

  updateDashboard();
  updateTables();
}


// TABLES
function updateTables() {

  // INCOME
  document.getElementById("incomeTable").innerHTML =
    incomes.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.reason}</td>
        <td>${formatMoney(item.amount)}</td>
        <td>${item.date}</td>
        <td>
          <button class="delete"
            onclick="deleteItem('income', ${item.id})">
            Haqi
          </button>
        </td>
      </tr>
    `).join("");


  // EXPENSE
  document.getElementById("expenseTable").innerHTML =
    expenses.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.reason}</td>
        <td>${formatMoney(item.amount)}</td>
        <td>${item.date}</td>
        <td>
          <button class="delete"
            onclick="deleteItem('expense', ${item.id})">
            Haqi
          </button>
        </td>
      </tr>
    `).join("");


  // ASSET
  document.getElementById("assetTable").innerHTML =
    assets.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.type}</td>
        <td>${formatMoney(item.value)}</td>
        <td>
          <button class="delete"
            onclick="deleteItem('asset', ${item.id})">
            Haqi
          </button>
        </td>
      </tr>
    `).join("");


  // PROJECT
  document.getElementById("projectTable").innerHTML =
    projects.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.location}</td>
        <td>${formatMoney(item.budget)}</td>
        <td>${item.status}</td>
        <td>
          <button class="delete"
            onclick="deleteItem('project', ${item.id})">
            Haqi
          </button>
        </td>
      </tr>
    `).join("");


  // USERS
  document.getElementById("userTable").innerHTML =
    users.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.role}</td>
        <td>
          ${
            index === 0
            ? "System Admin"
            : `<button class="delete"
                onclick="deleteItem('user', '${item.name}')">
                Haqi
              </button>`
          }
        </td>
      </tr>
    `).join("");
}


// DASHBOARD
function updateDashboard() {

  const income =
    incomes.reduce((sum, x) => sum + Number(x.amount), 0);

  const expense =
    expenses.reduce((sum, x) => sum + Number(x.amount), 0);

  document.getElementById("totalIncome").innerText =
    formatMoney(income) + " Birr";

  document.getElementById("totalExpense").innerText =
    formatMoney(expense) + " Birr";

  document.getElementById("projectCount").innerText =
    projects.length;

  document.getElementById("assetCount").innerText =
    assets.length;

  document.getElementById("reportIncome").innerText =
    formatMoney(income) + " Birr";

  document.getElementById("reportExpense").innerText =
    formatMoney(expense) + " Birr";

  document.getElementById("reportBalance").innerText =
    formatMoney(income - expense) + " Birr";

  updateRecentActivity();
  updateTables();
}


// RECENT ACTIVITY
function updateRecentActivity() {

  const all = [
    ...incomes.map(x => ({
      type: "💰 Galii",
      text: x.reason,
      amount: x.amount,
      date: x.date
    })),

    ...expenses.map(x => ({
      type: "💸 Baasii",
      text: x.reason,
      amount: x.amount,
      date: x.date
    }))
  ];

  all.sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  );

  const recent = all.slice(0, 8);

  document.getElementById("recentActivity").innerHTML =
    recent.length
    ? recent.map(x => `
        <div style="
          padding:12px 0;
          border-bottom:1px solid #eee;">
          <b>${x.type}</b> —
          ${x.text}
          <strong style="float:right">
            ${formatMoney(x.amount)} Birr
          </strong>
          <br>
          <small>${x.date}</small>
        </div>
      `).join("")
    : "<p>Sochiin galmaa'e hin jiru.</p>";
}


// GPS
function getLocation() {

  const result =
    document.getElementById("locationResult");

  if (!navigator.geolocation) {

    result.innerText =
      "Bilbilli kun GPS hin deeggaru.";

    return;
  }

  result.innerText =
    "📍 GPS barbaadaa jira...";

  navigator.geolocation.getCurrentPosition(

    function(position) {

      const lat =
        position.coords.latitude;

      const lon =
        position.coords.longitude;

      result.innerHTML = `
        <b>GPS Argameera!</b><br><br>
        Latitude: ${lat}<br>
        Longitude: ${lon}<br>
        Accuracy: ${position.coords.accuracy} m
      `;
    },

    function(error) {

      result.innerText =
        "GPS argachuu hin dandeenye. Location permission ilaali.";
    }
  );
}


// PHOTO PREVIEW
function previewPhotos(event) {

  const gallery =
    document.getElementById("photoGallery");

  gallery.innerHTML = "";

  const files = event.target.files;

  [...files].forEach(file => {

    const reader = new FileReader();

    reader.onload = function(e) {

      const img =
        document.createElement("img");

      img.src = e.target.result;

      gallery.appendChild(img);
    };

    reader.readAsDataURL(file);
  });
}


// MONEY FORMAT
function formatMoney(number) {

  return Number(number).toLocaleString("en-US");
}


// START
document.addEventListener("DOMContentLoaded", function() {

  updateDate();

  const loggedIn =
    localStorage.getItem("loggedIn");

  if (loggedIn === "true") {

    document.getElementById("loginPage")
      .classList.add("hidden");

    document.getElementById("app")
      .classList.remove("hidden");

    updateDashboard();

  } else {

    document.getElementById("loginPage")
      .classList.remove("hidden");

    document.getElementById("app")
      .classList.add("hidden");
  }

});
