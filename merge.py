import json


def read_json_file(file_name):
    with open(file_name, 'r') as json_file:
        data = json.load(json_file)
    return data


def merge_json_files(json_data1, json_data2):
    merged_data = json_data1 + json_data2
    return merged_data


def write_json_file(data, file_name):
    with open(file_name, 'w') as json_file:
        json.dump(data, json_file, indent=2)


if __name__ == "__main__":
    json_data1 = read_json_file("json/table.json")
    json_data2 = read_json_file("json/new.json")

    # Check if table.json is empty
    if not json_data1:
        # If table.json is empty, copy the content of new.json to table.json
        write_json_file(json_data2, "json/table.json")
    else:
        # If table.json is not empty, merge the content of new.json with table.json
        merged_data = merge_json_files(json_data1, json_data2)
        write_json_file(merged_data, "json/table.json")
