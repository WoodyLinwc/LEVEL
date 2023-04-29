function showDataset(evt, DatasetName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(DatasetName).style.display = "block";
  evt.currentTarget.className += " active";
}

function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    // Check if the request is complete and the status is OK
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);
        if (callback) callback(data);
      }
    }
  };
  httpRequest.open("GET", path);
  httpRequest.send();
}

// Global leaderboard data array
var leaderboardData = [];

// Fetch JSON data and initialize the leaderboard after the data is loaded
fetchJSONFile("json/table.json", function (data) {
  leaderboardData = data;

  // Initialize the leaderboard with default sorting and highlighting
  updateLeaderboard("All_Datasets");
  highlightColumn("All_Datasets");
});

const datasetSelect = document.getElementById("dataset");
const leaderboardTable = document.querySelector("tbody");

function createTableCell(content) {
  const cell = document.createElement("td");
  cell.textContent = content;
  return cell;
}

function updateLeaderboard(selectedDataset) {
  leaderboardTable.innerHTML = "";
  let sortedData;

// Sort data based on the selected dataset
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

    row.appendChild(createTableCell(entry.team));
    row.appendChild(createTableCell(entry.dataset1.toFixed(2)));
    row.appendChild(createTableCell(entry.dataset2.toFixed(2)));
    row.appendChild(createTableCell(entry.dataset3.toFixed(2)));

    leaderboardTable.appendChild(row);
  });
}

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
  const selectedDataset = event.target.value;
  updateLeaderboard(selectedDataset);
  highlightColumn(selectedDataset);
});
