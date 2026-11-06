const monthNameEl = document.getElementById('monthName');
const yearNameEl = document.getElementById('yearName');
const daysContainer = document.getElementById('daysContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const monthsFr = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

let currentDate = new Date();

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  monthNameEl.innerText = monthsFr[month];
  yearNameEl.innerText = year;
  daysContainer.innerHTML = '';

  let firstDayIndex = new Date(year, month, 1).getDay();
  firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  for (let i = 0; i < firstDayIndex; i++) {
    const emptyLi = document.createElement('li');
    emptyLi.classList.add('empty');
    daysContainer.appendChild(emptyLi);
  }

  const totalDays = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  for (let day = 1; day <= totalDays; day++) {
    const li = document.createElement('li');
    li.innerText = day;

    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      li.classList.add('active');
    }

    daysContainer.appendChild(li);
  }
}

prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

renderCalendar(currentDate);