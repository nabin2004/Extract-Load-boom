const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTyEYH9r5CGS7rlRbQIRWp3x7-X6Ao1pFqQ_yhgljOcIgVFMwvGlUM1L3E40wRaI9Sb7wdKd8JWHuhA/pubhtml?gid=1112358377&single=true';

function parseCSV(data) {
  const lines = data.trim().split('\n');
  const headers = lines[0].split(',');
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const entry = {};

    for (let j = 0; j < headers.length; j++) {
      entry[headers[j]] = values[j];
    }

    result.push(entry);
  }

  return result;
}

fetch(sheetURL)
  .then(response => response.text())
  .then(data => {
    const parsedData = parseCSV(data);
    const tbody = document.querySelector('#data-table tbody');

    parsedData.forEach(entry => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.PassengerId}</td>
        <td>${entry.Age}</td>
        <td>${entry.Sex}</td>
        <!-- Add more cells as needed -->
      `;
      tbody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
