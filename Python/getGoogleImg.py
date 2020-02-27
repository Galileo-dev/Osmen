
#======================================================================
#===https://gist.github.com/ZerataX/a0719af17fdf8d338f8fdd6601f90a36===
#======================================================================
#====================== Big thanks to Zeratax =========================
#======================================================================


from bs4 import BeautifulSoup
import requests
import json

import time
import os
import sys


import ctypes


def run(query):
    imageUrl = get_google_img(query)
    print(imageUrl)
    imageFileName = storeImageInStoredBackgroundsFolder(imageUrl)
    print (imageFileName)
    return getFullPathOfImage(imageFileName)

def get_google_img(query):
    """
    gets a link to the first google image search result
    :param query: search query string
    :result: url string to first result
    """
    url = "https://www.google.com/search?q=" + str(query) + "&source=lnms&tbm=isch"
    headers={'User-Agent':"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36"}

    try:
        html = requests.get(url, headers=headers).text
    except requests.ConnectionError:
        print("couldn't reach google")

    soup = BeautifulSoup(html, 'html.parser')
    image = soup.find("div",{"class":"rg_meta"})

    try:
        imgLink = json.loads(image.text)["ou"]
    except AttributeError:
        print("couldn't find any images")
    except ValueError:
        print("ill formated json")

    return imgLink

if __name__ == '__main__':
    query = input("search term\n")
    print(get_google_img(query))

def storeImageInStoredBackgroundsFolder(image):
	createStoredBackgroundsFolderIfNotExists()
	imageSuffix = int(round(time.time() * 1000))
	imageFilename = "bg_" + str(imageSuffix) + ".jpg"
	with open("stored_backgrounds/" + imageFilename, "wb") as handle:
            response = requests.get(image, stream=True)

            if not response.ok:
                print (response)

            for block in response.iter_content(1024):
                if not block:
                    break

                handle.write(block)
	return imageFilename

def createStoredBackgroundsFolderIfNotExists():
	if not os.path.exists("stored_backgrounds"):
		os.makedirs("stored_backgrounds")



def getFullPathOfImage(imageFilename):
	return os.path.dirname(os.path.realpath("stored_backgrounds/" + imageFilename)) + "\\" + imageFilename