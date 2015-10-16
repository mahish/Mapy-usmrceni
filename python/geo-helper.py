import csv
import urllib2
import json
import re

resultFile = open("output.csv",'wb')
wr = csv.writer(resultFile, dialect='excel')

with open('../data/data_usmrceni/CSDA!hranice_F1_umysl_vyber9.csv', 'rb') as csvfile:
    database = csv.reader(csvfile, delimiter=',', quotechar='"')
    i = 0
    for row in database:
    	print row
        if i != 0:
        	latLngResidence = row[7].split(',')
        	if re.match('\d{1,}\.\d{1,}', latLngResidence[0].strip()) and re.match('\d{1,}\.\d{1,}', latLngResidence[1].strip()):
        		url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latLngResidence[0].strip() + "," + latLngResidence[1].strip()
        		print url
        		response = urllib2.urlopen(url)
        		data = json.load(response)
                j = 0
                for item in data['results'][0]['address_components']:
                    if 'administrative_area_level_2' in item['types']:
                        residenceArea = item['short_name']

        		# break
                row.append(residenceArea.encode("utf8"))
        if i != 0:
            latLngIncident = row[10].split(',')
            if re.match('\d{1,}\.\d{1,}', latLngIncident[0].strip()) and re.match('\d{1,}\.\d{1,}', latLngIncident[1].strip()):
                url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latLngIncident[0].strip() + "," + latLngIncident[1].strip()
                print url
                response = urllib2.urlopen(url)
                data = json.load(response)
                j = 0
                for item in data['results'][0]['address_components']:
                    if 'administrative_area_level_2' in item['types']:
                        incidentArea = item['short_name']

                # break
                row.append(incidentArea.encode("utf8"))
        wr.writerow(row)
     	i += 1
        # if i == 5:
        #     break
