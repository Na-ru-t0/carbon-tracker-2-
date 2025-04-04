// Conversion factors
const carFactor = 0.12;  // kg CO2 per km (average car)
const electricityFactor = 0.5; // kg CO2 per kWh (varies by region)
const meatFactor = 27;  // kg CO2 per kg of meat

// Function to calculate carbon footprint
function calculateCarbon() {
    let carKm = document.getElementById('carKm').value || 0;
    let electricity = document.getElementById('electricity').value || 0;
    let meat = document.getElementById('meat').value || 0;

    let carEmission = carKm * carFactor;
    let electricityEmission = electricity * electricityFactor;
    let meatEmission = meat * meatFactor;

    let totalEmission = carEmission + electricityEmission + meatEmission;

    document.getElementById('result').innerText = totalEmission.toFixed(2);

    saveToHistory(totalEmission.toFixed(2));
}

// Function to save history in local storage
function saveToHistory(value) {
    let historyList = JSON.parse(localStorage.getItem('carbonHistory')) || [];
    historyList.push(value);
    localStorage.setItem('carbonHistory', JSON.stringify(historyList));

    updateHistory();
}

// Function to update the history list
function updateHistory() {
    let historyList = JSON.parse(localStorage.getItem('carbonHistory')) || [];
    let historyElement = document.getElementById('history');
    historyElement.innerHTML = "";
    
    historyList.forEach((item, index) => {
        let li = document.createElement('li');
        li.innerText = `Entry ${index + 1}: ${item} kg CO2`;
        historyElement.appendChild(li);
    });
}

// Load history on page load
document.addEventListener("DOMContentLoaded", updateHistory);
