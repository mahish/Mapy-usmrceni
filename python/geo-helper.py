import csv
import urllib2
import json
import re

resultFile = open("output1.csv",'wb')
wr = csv.writer(resultFile, dialect='excel')

def getAreaFromGPS(gps):
    areaName = ''
    latLng = gps.split(',')
    print latLng
    if re.match('\d{1,}\.\d{1,}', latLng[0].strip()) and re.match('\d{1,}\.\d{1,}', latLng[1].strip()):
        url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latLng[0].strip() + "," + latLng[1].strip() + '&key=AIzaSyAEX0ppwsuLCVSqKzyDkj5KDTnx3KXt_zw'
        print url
        response = urllib2.urlopen(url)
        data = json.load(response)
        try:
            address = data['results'][0]['address_components']
        except Exception, e:
            print 'ERROR: ' + str(data)
            return '(error)'
        for item in address:
            if 'administrative_area_level_2' in item['types']:
                areaName = item['short_name']
    return areaName            

with open('/Users/radimsevcik/Dropbox/interaktivni-mapy/okresy/all-data-input.csv', 'rb') as csvfile:
    database = csv.reader(csvfile, delimiter=',', quotechar='"')    
    i = 0
    for row in database:
        print row
        if i != 0:
            residenceArea = getAreaFromGPS(row[7])
            row.append(residenceArea.encode("utf8"))
            incidentArea = getAreaFromGPS(row[10])
            row.append(incidentArea.encode("utf8"))                
        wr.writerow(row)
        i += 1
