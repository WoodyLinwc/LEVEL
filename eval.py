import csv
import json

def read_csv_file(file_name):
    data = []
    with open(file_name, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)
    return data

def evaluate_data():
    # Add your evaluation logic here and update the json_output accordingly
    json_output = [
        {
            "team": "Team D",
            "dataset1": 0.21,
            "dataset2": 0.45,
            "dataset3": 0.55
        }
    ]
    return json_output

def write_json_file(data, file_name):
    with open(file_name, 'w') as json_file:
        json.dump(data, json_file, indent=2)

if __name__ == "__main__":
    json_output = evaluate_data()

    write_json_file(json_output, "new.json")
