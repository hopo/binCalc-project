import re
import requests
from bs4 import BeautifulSoup

url = ''

html = request.get(url).text
soup = BeautifulSoup(html)

for member_tag in soup.select('.memberna_list dl dt a'):
	name = member_tag.text
	link = member_tag['href']

	matched = re.search(r'\d+', link)
	if matched:
		member_id = matched.group(0)
	else:
		member_id = None

	print(name, member_id)
