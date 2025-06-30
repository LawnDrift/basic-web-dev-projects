const daysContainer = document.getElementById('days-container');

const date = new Date();
const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
const daysInCurrentMonth = daysInMonth(date.getFullYear(), date.getMonth() + 1);

for (let i = 1; i <= daysInCurrentMonth; i++) {
  daysContainer.innerHTML += `
  <div class="day">${i}</div>
  `;
}