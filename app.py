from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

import requests
from bs4 import BeautifulSoup

@app.route('/')
def home():
	return render_template('index.html')

@app.route("/apt", methods=["GET"])
def apt_post():
    url = 'https://www.apartments.com/off-campus-housing/fl/tampa/university-of-south-florida-at-tampa-tampa-campus/apartments/student-housing/'
    apt_info = []        
    for page in range(1, 3):
        headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
        if page == 1:
            data = requests.get(url, headers=headers)
        else:
            data = requests.get(url + str(page) + '/', headers=headers)
        soup = BeautifulSoup(data.text, 'html.parser')

        trs = soup.select('#placardContainer > ul > li')
        for tr in trs:
            apt = tr.select_one('article > header > div.property-information > a > div.property-title > span')
            if apt is not None:
                apt_name = apt.text
                apt_address = tr.select_one('article > header > div.property-information > a > div.property-address.js-url').text
                apt_link = tr.select_one('article > header > div.property-information > a')['href']
                try:
                    apt_price = tr.select_one('article > section > div > div.property-info > div > div.top-level-info > a > p.property-pricing').text
                except:
                    apt_price = tr.select_one('article > section > div > div.property-info > div > a.property-link > div > p.property-pricing').text
                try:
                    apt_size = tr.select_one('article > section > div > div.property-info > div > div.top-level-info > a > p.property-beds').text
                except:
                    apt_size = tr.select_one('article > section > div > div.property-info > div > a.property-link > div > p.property-beds').text
                try:
                    apt_img = tr.select_one('article > section > div > div.media-wrapper > div.media-outer > div > div > div.imageContainer.carousel.slide > div.carouselInner > div')['style'][23:-3]
                except:
                    try:   
                        apt_img = tr.select_one('article > section > div > div.media-wrapper > div.media-outer > div > div > div.imageContainer.carousel.slide > div.carouselInner > div')['data-image']
                    except:
                        apt_img = tr.select_one('article > section > div > div.media-wrapper > div.media-outer > a > div > div > div.imageContainer.carousel.slide > div > div')['data-image']
                
                info = {
                    'name': apt_name,
                    'address': apt_address,
                    'price': apt_price,
                    'size': apt_size,
                    'link': apt_link,
                    'image': apt_img
                }
                apt_info.append(info)

    return jsonify({'apt_info': apt_info})

if __name__ == '__main__':
	app.run('0.0.0.0', port=5000, debug=True)
            
