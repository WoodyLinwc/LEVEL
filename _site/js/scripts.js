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
  leaderboardData = data.map((entry) => {
    return {
      team: entry.team,
      LEVEL1: entry.level_1_mean_rmse,
      LEVEL2: entry.level_2_mean_rmse,
      LEVEL3: entry.level_3_mean_error,
    };
  });

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
      const aTotal = (a.LEVEL1 || 0) + (a.LEVEL2 || 0) + (a.LEVEL3 || 0);
      const bTotal = (b.LEVEL1 || 0) + (b.LEVEL2 || 0) + (b.LEVEL3 || 0);
      const aNAs = [a.LEVEL1, a.LEVEL2, a.LEVEL3].filter((value) => value === undefined).length;
      const bNAs = [b.LEVEL1, b.LEVEL2, b.LEVEL3].filter((value) => value === undefined).length;

      if (aNAs === bNAs) {
        return aTotal - bTotal; // Sort from smallest to largest when equal "N/A" count
      } else {
        return aNAs - bNAs; // Sort from smallest to largest "N/A" count
      }
    });
  } else {
    sortedData = leaderboardData.slice().sort((a, b) => {
      const aValue = a[selectedDataset] === undefined ? Infinity : a[selectedDataset];
      const bValue = b[selectedDataset] === undefined ? Infinity : b[selectedDataset];
      return aValue - bValue;
    });
  }

  sortedData.forEach((entry, index) => {
    const row = document.createElement("tr");

    // Add a crown emoji to the team name if it's the first/second/third row (top of the leaderboard)
    let teamName;
    if (index === 0) {
      teamName = entry.team + " 👑";
    } else if (index === 1) {
      teamName = entry.team + " 🥈";
    } else if (index === 2) {
      teamName = entry.team + " 🥉";
    } else {
      teamName = entry.team;
    }


    row.appendChild(createTableCell(teamName));
    row.appendChild(createTableCell(entry.LEVEL1 === undefined ? "N/A" : entry.LEVEL1.toFixed(2)));
    row.appendChild(createTableCell(entry.LEVEL2 === undefined ? "N/A" : entry.LEVEL2.toFixed(2)));
    row.appendChild(createTableCell(entry.LEVEL3 === undefined ? "N/A" : entry.LEVEL3.toFixed(2)));

    leaderboardTable.appendChild(row);
  });
}

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
    case "LEVEL1":
      thElements[1].classList.add("highlighted");
      rows.forEach((row) => row.childNodes[1].classList.add("highlighted"));
      break;
    case "LEVEL2":
      thElements[2].classList.add("highlighted");
      rows.forEach((row) => row.childNodes[2].classList.add("highlighted"));
      break;
    case "LEVEL3":
      thElements[3].classList.add("highlighted");
      rows.forEach((row) => row.childNodes[3].classList.add("highlighted"));
      break;
  }
}

// Event listener for the dataset selector
datasetSelect.addEventListener("change", (event) => {
  const selectedDataset = event.target.value;
  updateLeaderboard(selectedDataset);
  highlightColumn(selectedDataset);
});