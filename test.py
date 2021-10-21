import requests_html

session = requests_html.HTMLSession()
cookies = 'JSESSIONID=F7878DAA2CD5CE4EF08F6D6AE69C335B'


def strTodic(x):
    return {x[:x.find(':')]: x[x.find(':') + 1:].strip() for x in x.strip().split('\n')}


header = '''
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7
Cache-Control: max-age=0
Connection: keep-alive
Cookie: {}
Host: tnp.wisers.net:8080
Referer: http://tnp.wisers.net:8080/ListingPage/listingpage.action?pageNo=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36 OPR/78.0.4093.231
'''
header = strTodic(header.format(cookies))

resp = session.get(
    'http://tnp.wisers.net:8080/ListingPage/searchlistingpageByid.action?id=1990562&addShow=show', headers=header)

href = resp.html.xpath("//table[@id='advanced']/tbody/tr[6]/td[2]/span[2]")
print(href)
with open('test.html', 'w') as f:
    f.write(resp.text)
