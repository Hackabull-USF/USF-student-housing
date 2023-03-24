from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

import requests, json
from bs4 import BeautifulSoup

@app.route('/')
def home():
	return render_template('index.html')

@app.route("/apt", methods=["GET"])
def apt_post():
    headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get('https://www.apartments.com/off-campus-housing/fl/tampa/university-of-south-florida-at-tampa-tampa-campus/apartments/student-housing/',headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')

    trs = soup.select('#placardContainer > ul > li')
    apt_info = []
    for tr in trs:
        apt = tr.select_one('article > header > div.property-information > a > div.property-title > span')
        if apt is not None:
            apt_name = apt.text
            apt_address = tr.select_one('article > header > div.property-information > a > div.property-address.js-url').text
            apt_price = tr.select_one('article > section > div > div.property-info > div > div.top-level-info > a > p.property-pricing').text
            apt_size = tr.select_one('article > section > div > div.property-info > div > div.top-level-info > a > p.property-beds').text
            apt_link = tr.select_one('article > header > div.property-information > a')['href']
            apt_img = 'img'
            try: 
                apt_img = tr.select_one('article > section > div > div.media-wrapper > div.media-outer > div > div > div.imageContainer.carousel.slide > div.carouselInner > div')['style'][23:-3]
            except:
                apt_img = tr.select_one('article > section > div > div.media-wrapper > div.media-outer > div > div > div.imageContainer.carousel.slide > div.carouselInner > div')['data-image']
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
            
