import pandas as pd

# Read the CSV file
df = pd.read_csv('state_financials/state_financials.csv')

# Function to get median salary for a given state and city
def get_median_salary(state, city):
    # Iterate through the rows to find the matching city and state
    for index, row in df.iterrows():
        if row['State'] == state and row['City'] == city:
            return row['Median-Salary']
    return f"No data found for {city}, {state}"

# Example usage

print(get_median_salary("Alabama", "Mobile"))
