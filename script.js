function getDayOfWeek(dateString) {
  const date = new Date(dateString);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
}

function generateCalendar() {
  document.getElementById("calendar-holder").style.display = "block";
  let year = document.getElementById("year").value;
  if (!year || year < 1) {
    alert("Please enter a valid year!");
    return;
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Calculate the first day of each month
  const firstDays = months.map((month, index) => {
    const firstDate = new Date(year, index, 1);
    return { month, firstDay: getDayOfWeek(firstDate) };
  });

  // Group months by the first day of the week
  const groups = daysOfWeek.map((day) => ({
    day,
    months: firstDays
      .filter((item) => item.firstDay === day)
      .map((item) => item.month),
  }));

  // Update the calendar's table structure
  let monthsTH = document.getElementById("months-th");
  monthsTH.setAttribute("colspan", groups.length);

  let monthTR = document.getElementById("month-tr");
  monthTR.innerHTML = ""; // Clear previous content
  groups.forEach((group) => {
    monthTR.innerHTML += `<td>${group.months.join(", ")}</td>`;
  });

  const rows = [
    "first-line",
    "second-line",
    "third-line",
    "fourth-line",
    "fifth-line",
    "sixth-line",
    "seventh-line",
  ];

  // Populate each line dynamically
  rows.forEach((rowId, lineIndex) => {
    const row = document.getElementById(rowId);
    row.innerHTML = ""; // Clear previous content

    for (let i = 1 + lineIndex; i <= 35; i += 7) {
      if (i <= 31) {
        row.innerHTML += `<td>${i}</td>`;
      } else {
        row.innerHTML += `<td></td>`;
      }
    }

    // Add the corresponding days of the week for each group
    groups.forEach((group) => {
      const startDayIndex = daysOfWeek.indexOf(group.day);
      const dayIndex = (startDayIndex + lineIndex) % 7; // Shift start day for each line
      row.innerHTML += `<td class="${daysOfWeek[dayIndex]}">${daysOfWeek[dayIndex]}</td>`;
    });
  });
}

document.getElementById("year").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    document.getElementById("generate-btn").click();
  }
});

document
  .getElementById("generate-btn")
  .addEventListener("click", generateCalendar);
