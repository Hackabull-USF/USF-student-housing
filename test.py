import requests
from bs4 import BeautifulSoup

url = 'https://www.apartments.com/off-campus-housing/fl/tampa/university-of-south-florida-at-tampa-tampa-campus/apartments/student-housing/'
apt_info = [] 
apt_id = 0       
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
            apt_details = tr.select('article > section > div > div.property-info > div > a > p')
            details_list = []
            for apt_detail in apt_details:
                for detail in apt_detail:
                    if detail.text != '\n':
                        details_list.append(detail.text)

            info = {
                'id': apt_id,
                'name': apt_name,
                'address': apt_address,
                'price': apt_price,
                'size': apt_size,
                'link': apt_link,
                'image': apt_img,
                'details': details_list
            }
            apt_info.append(info)
            apt_id += 1
            
