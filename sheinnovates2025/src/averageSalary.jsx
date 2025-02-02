import Papa from "papaparse";

// Function to read and parse the CSV file (this will work in the browser)
async function readCSV(filePath) {
  const response = await fetch(filePath); // Fetch the CSV file
  const csvText = await response.text(); // Get the text content of the CSV file

  return new Promise((resolve, reject) => {
    // Use Papaparse to parse the CSV data
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        resolve(result.data); // Resolves with the parsed data
      },
      error: (err) => {
        reject(err); // Reject in case of an error
      },
    });
  });
}

// Function to get the median salary for a given state and city
export async function getMedianSalary(state, city) {
  try {
    const data = await readCSV("/state_financials.csv"); // Fetch and parse the CSV file

    // Iterate over the parsed data to find the matching state and city
    for (let row of data) {
      if (row["State"] === state && row["City"] === city) {
        return parseInt(row["Median-Salary"], 10); // Return the median salary if found
      }
    }

    return null; // Return null if no matching data is found
  } catch (error) {
    console.error("Error reading CSV file:", error);
    return null; // Handle any errors gracefully
  }
}

// Example usage
getMedianSalary("South Dakota", "Brookings").then((salary) => {
  if (salary !== null) {
    console.log(`The median salary is: ${salary}`);
  } else {
    console.log("No data found for the given city and state.");
  }
});
