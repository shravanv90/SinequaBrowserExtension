document.addEventListener("DOMContentLoaded", function () {
  // Check if there's any stored selected text and perform the search
  chrome.storage.local.get("selectedText", function (data) {
    if (data.selectedText) {
      const inputBox = document.getElementById("searchInput");
      inputBox.value = data.selectedText; // populate the input box with the selected text
      search(data.selectedText);
      // Optional: clear the storage for next use
      chrome.storage.local.remove("selectedText");
    }
  });

  // Event listener for the search button
  document.getElementById("searchBtn").addEventListener("click", function () {
    const searchText = document.getElementById("searchInput").value;
    search(searchText);
  });
});

// Function to search for records based on input text
function search(query) {
  const payload = buildPayload(query);

  fetchRecords(payload).then(displayRecords).catch(handleError);
}

// Function to build the request payload
function buildPayload(query) {
  return {
    user: "<user>",
    password: "<passw>",
    app: "<app>",
    query: {
      name: "<queryname>",
      text: query,
    },
  };
}

// Function to fetch records from the API
function fetchRecords(payload) {
  return fetch("<Your sinequa host>/api/v1/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

// Function to display the records in the results div
function displayRecords(data) {
  const records = data.records;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // Clear previous results

  records.forEach((record) => {
    const recordElement = document.createElement("div");
    recordElement.className = "record";

    const titleElement = document.createElement("h2");
    titleElement.textContent = record.title;
    recordElement.appendChild(titleElement);

    resultsDiv.appendChild(recordElement);
  });
}

// Function to handle errors
function handleError(error) {
  console.error("Error:", error);
}
