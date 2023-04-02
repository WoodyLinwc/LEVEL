function showDataset(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Sample data for demonstration
// it is hashMap not json file
const leaderboardData = [
  { team: "Team A", dataset1: Math.random(), dataset2: Math.random(), dataset3: Math.random() },
  { team: "Team B", dataset1: Math.random(), dataset2: Math.random(), dataset3: Math.random() },
  { team: "Team C", dataset1: Math.random(), dataset2: Math.random(), dataset3: Math.random() },
  { team: "Team D", dataset1: Math.random(), dataset2: Math.random(), dataset3: Math.random() },
];

const datasetSelect = document.getElementById("dataset");
const leaderboardTable = document.querySelector("tbody");

datasetSelect.addEventListener("change", (event) => {
  updateLeaderboard(event.target.value);
});

function updateLeaderboard(selectedDataset) {
leaderboardTable.innerHTML = "";
let sortedData;

if (selectedDataset === "All_Datasets") {
  sortedData = leaderboardData.slice().sort((a, b) => {
    const aTotal = a.dataset1 + a.dataset2 + a.dataset3;
    const bTotal = b.dataset1 + b.dataset2 + b.dataset3;
    return bTotal - aTotal;
  });
} else {
  sortedData = leaderboardData.slice().sort((a, b) => b[selectedDataset] - a[selectedDataset]);
}

sortedData.forEach((entry) => {
  const row = document.createElement("tr");

  const teamCell = document.createElement("td");
  teamCell.textContent = entry.team;
  row.appendChild(teamCell);

  const dataset1Cell = document.createElement("td");
  dataset1Cell.textContent = entry.dataset1.toFixed(2);
  row.appendChild(dataset1Cell);

  const dataset2Cell = document.createElement("td");
  dataset2Cell.textContent = entry.dataset2.toFixed(2);
  row.appendChild(dataset2Cell);

  const dataset3Cell = document.createElement("td");
  dataset3Cell.textContent = entry.dataset3.toFixed(2);
  row.appendChild(dataset3Cell);

  leaderboardTable.appendChild(row);
});
}

// Initialize the leaderboard with default sorting

function highlightColumn(selectedDataset) {
const thElements = document.querySelectorAll("th");
const rows = document.querySelectorAll("tbody tr");

thElements.forEach((thElement, index) => {
  if (index > 0 && thElements[index].classList.contains("highlighted")) {
    thElements[index].classList.remove("highlighted");
  }
});

rows.forEach((row) => {
  row.childNodes.forEach((cell, index) => {
    if (index > 0 && cell.classList.contains("highlighted")) {
      cell.classList.remove("highlighted");
    }
  });
});

switch (selectedDataset) {
  case "dataset1":
    thElements[1].classList.add("highlighted");
    rows.forEach((row) => row.childNodes[1].classList.add("highlighted"));
    break;
  case "dataset2":
    thElements[2].classList.add("highlighted");
    rows.forEach((row) => row.childNodes[2].classList.add("highlighted"));
    break;
  case "dataset3":
    thElements[3].classList.add("highlighted");
    rows.forEach((row) => row.childNodes[3].classList.add("highlighted"));
    break;
}
}

datasetSelect.addEventListener("change", (event) => {
  updateLeaderboard(event.target.value);
  highlightColumn(event.target.value);
});

// Initialize the leaderboard with default sorting and highlighting
updateLeaderboard("All_Datasets");
highlightColumn("All_Datasets");
