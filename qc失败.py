import os
import re
import execjs
import requests_html
import pandas as pd

pubcode = '''
forum_club6parkbbsca
blog_blogdwnewsus
wm_pinterestus
wm_stdsamrgovcn
wm_cncacn
wm_inencn
wm_wsnewscn
wm_ucai123cn
'''
pubcode = [i for i in pubcode.strip().split('\n')]
cookies = 'JSESSIONID=F7878DAA2CD5CE4EF08F6D6AE69C335B'


def strTodic(x):
    return {x[:x.find(':')]: x[x.find(':') + 1:].strip() for x in x.strip().split('\n')}


header = '''
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signeexchange;v=b3;q=0.9
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

formdata = '''
orderby: 
sortflag: desc
searchF.pubcodeName: {}
searchF.section: 
searchF.taskid: 
searchF.media_flag: 
searchF.URL: 
searchF.updatename: 
searchF.updatetime: 
searchF.seo_fg: 0
searchF.websiteNameCn: 
searchF.websiteNameEn: 
searchF.mappingStatus: 
searchF.firstClass: 
searchF.secondClass: 
searchF.listingpageStatus: 
searchF.qcStatus: 1
mapping_remark: 
status: 1
qc_remark: 2
qc_reslut: 
taskID: 
'''


# 打开url
url = 'http://tnp.wisers.net:8080/ListingPage/listingpage.action?pageNo=0&real=real'
session = requests_html.HTMLSession()
result = pd.DataFrame()
df = pd.DataFrame([], columns=['pubcode', '日期', '链接', '备注'])
df.index.name = 'index'
index = 1
for pub in pubcode:
    resp = session.post(url, headers=header,
                        data=strTodic(formdata.format(pub)))
    hrefs = resp.html.xpath("//a[@class='ellipsis_cell']/@href")
    details = resp.html.xpath("//a[@class='ellipsis_cell']/../a[2]/@href")
    details = ['http://tnp.wisers.net:8080/ListingPage/' + i for i in details]
    for d in details:
        d_resp = session.get(d, headers=header)
        d_bz = d_resp.html.xpath('//*[@id="qc_result_show"]/text()')[0].strip()
        d_url = d_resp.html.xpath('//*[@id="url_show"]/text()')[0].strip()
        d_date = d_resp.html.xpath(
            '//*[@id="deploy_date_show"]/text()')[0].strip()

        df.loc[str(index), 'pubcode'] = pub
        df.loc[str(index), '日期'] = d_date
        df.loc[str(index), '链接'] = d_url
        df.loc[str(index), '备注'] = d_bz
        print(df)
        index += 1
df.to_csv('qc.csv')
