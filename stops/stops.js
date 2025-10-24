// stop101.js — Patiala Bus Stops Page Script

document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------------
     1️⃣ Animated Table Reveal
  ------------------------------- */
  const tableRows = document.querySelectorAll("tbody tr");
  tableRows.forEach((row, index) => {
    row.style.opacity = "0";
    row.style.transform = "translateY(20px)";
    setTimeout(() => {
      row.style.transition = "all 0.6s ease";
      row.style.opacity = "1";
      row.style.transform = "translateY(0)";
    }, 150 * index);
  });

  /* -------------------------------
     2️⃣ Live Clock Display
  ------------------------------- */
  const heading = document.querySelector("h1");
  const clock = document.createElement("div");
  clock.className = "clock";
  heading.after(clock);

  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    clock.textContent = `🕒 Current Time: ${time}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* -------------------------------
     3️⃣ Highlight Upcoming Stop
  ------------------------------- */
  const parseTime = timeStr => {
    const [time, meridian] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (meridian.toLowerCase() === "p.m." && hours < 12) hours += 12;
    if (meridian.toLowerCase() === "a.m." && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  function highlightNextStop() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    let closestRow = null;
    let smallestDiff = Infinity;

    tableRows.forEach(row => {
      const timeText = row.children[1].textContent.trim();
      const stopMinutes = parseTime(timeText);
      const diff = stopMinutes - currentMinutes;

      row.classList.remove("next-stop");

      if (diff >= 0 && diff < smallestDiff) {
        smallestDiff = diff;
        closestRow = row;
      }
    });

    if (closestRow) closestRow.classList.add("next-stop");
  }

  highlightNextStop();
  setInterval(highlightNextStop, 60000); // update every minute

  /* -------------------------------
     4️⃣ Countdown for Next Stop
  ------------------------------- */
  const countdown = document.createElement("div");
  countdown.className = "countdown";
  document.querySelector(".container").appendChild(countdown);

  function updateCountdown() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    let nextArrival = Infinity;

    tableRows.forEach(row => {
      const timeText = row.children[1].textContent.trim();
      const stopMinutes = parseTime(timeText);
      if (stopMinutes >= currentMinutes && stopMinutes < nextArrival) {
        nextArrival = stopMinutes;
      }
    });

    if (nextArrival === Infinity) {
      countdown.textContent = "🚍 All buses have departed for today.";
      return;
    }

    const diffMinutes = nextArrival - currentMinutes;
    const minutes = Math.floor(diffMinutes);
    const seconds = 60 - now.getSeconds();

    countdown.textContent = `🕑 Next Bus Arrives In: ${minutes} min ${seconds}s`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});
