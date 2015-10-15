import csv
import urllib2
import json
import re
with open('../data/data_usmrceni/CSDA!hranice_F1_umysl_vyber9.csv', 'rb') as csvfile:
    database = csv.reader(csvfile, delimiter=',', quotechar='"')
    i = 0
    for row in database:
    	print row
        if i != 0:
        	latLng = row[7].split(',')
        	if re.match('\d{1,}\.\d{1,}', latLng[0].strip()) and re.match('\d{1,}\.\d{1,}', latLng[1].strip()):
        		url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latLng[0].strip() + "," + latLng[1].strip()
        		print url
        		response = urllib2.urlopen(url)
        		data = json.load(response)
        		# print data
        		print data['results'][0]['address_components'][4]['short_name'].encode("utf8")
     	i += 1


