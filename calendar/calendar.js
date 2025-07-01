const daysContainer = document.getElementById('days-container');
const monthYearText = document.getElementById('month-year-text');


let currentDate = new Date();

function updateCalendar() {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDay = new Date(currentYear, currentMonth, 0);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDay.getDate();
  const firstDayIndex = firstDay.getDay();
  const lastDayIndex = lastDay.getDay();

  const monthYearString = currentDate.toLocaleString('default', 
    {month: 'long', year: 'numeric'});
    monthYearText.textContent = monthYearString;

  //adds previous days to match weekday row
  for (let i = firstDayIndex; i > 0; i--) {
    const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
    daysContainer.innerHTML += `<div class="day inactive">${prevDate.getDate()}</div>`;
  }
  //adds days for the month matching the weekday row
  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const activeClass = date.toDateString() === new Date().toDateString()
    ? 'active' : '';
    daysContainer.innerHTML += `<div class="day ${activeClass}">${i}</div>`;

  }
  //adds days after the month matching the weekday row
  for (let i = 1; i <= 7 - lastDayIndex; i++) {
    const nextDate = new Date(currentYear, currentMonth + 1, i);
    daysContainer.innerHTML += `<div class="day inactive">${nextDate.getDate()}</div>`;
  }
}

updateCalendar();