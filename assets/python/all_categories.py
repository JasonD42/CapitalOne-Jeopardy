import requests
import json
import unicodedata


f = open("all_cats.txt", "a")
for i in range (11510, 18419, 1):
    parameters = {
        "id": i
    }
    response = requests.get("http://jservice.io/api/category", params=parameters)
    if response.status_code != 200:
        f.write("\"no_cat\",")
        print(i)
        continue
    str_ = unicodedata.normalize('NFKD', response.json()["title"]).encode('ascii','ignore').decode("utf-8")
    #str_ = "\"hey\""
    str_ = str_.replace("\"", "\\\"")
    f.write("\"")
    f.write(str_)
    f.write("\"")
    f.write(",")
    if i % 500 == 0:
        print(i)
f.close()