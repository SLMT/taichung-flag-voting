import requests
import json

page_request = {
    "PageNo": 1,
    "PageSize": 1000,
    "TotalCount": 0
}

response = requests.post(
    "http://www.taichungflag.com.tw/api/Works/Search/Browse",
    data=page_request
)

data_set = response.json().get("Data")

# Retrieve the only information we need
target_fields = ["ID", "FullName", "ImageUrl"]
new_data_set = []
for old_data in data_set:
    new_data = {key: old_data[key] for key in target_fields}
    new_data_set.append(new_data)

output = open("data.json", "w")
output.write(json.dumps(new_data_set))
output.close()
