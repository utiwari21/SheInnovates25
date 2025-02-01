import fs from 'fs';
import csv from 'csv-parser';

// Read the CSV file and store the data in an array
function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => data.push(row))
      .on('end', () => resolve(data))
      .on('error', (err) => reject(err));
  });
}

// Function to get median salary for a given state and city
async function getMedianSalary(state, city) {
  const data = await readCSV('state_financials/state_financials.csv');
  
  for (let row of data) {
    if (row['State'] === state && row['City'] === city) {
      return parseInt(row['Median-Salary']);
    }
  }
  
  return null; // Return null if no data is found
}

// Example usage
getMedianSalary("South Dakota", "Brookings")
  .then((salary) => {
    if (salary !== null) {
      console.log(`The median salary is: ${salary}`);
    } else {
      console.log("No data found for the given city and state.");
    }
  });
