import os
import json
import requests
from concurrent.futures import ThreadPoolExecutor, thread


def findError(pubcodes, cookies):
    def str2dic(x):
        return {x[:x.find(':')].strip(): x[x.find(':') + 1:].strip() for x in x.split('\n')}

    result = []
    url = 'http://tnp.wisers.net:8080/ListingPage/listingpage.action?pageNo=0&real=real'

    header = f'''
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
    Accept-Encoding: gzip, deflate
    Accept-Language: en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7
    Cache-Control: max-age=0
    Connection: keep-alive
    Content-Length: 390
    Content-Type: application/x-www-form-urlencoded
    Cookie: {cookies}
    Host: tnp.wisers.net:8080
    Origin: http://tnp.wisers.net:8080
    Referer: http://tnp.wisers.net:8080/ListingPage/listingpage.action?pageNo=0&real=real
    Upgrade-Insecure-Requests: 1
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36 OPR/78.0.4093.231
    '''.strip()
    header = str2dic(header)
    formData = '''
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
    searchF.listingpageStatus: 1
    searchF.qcStatus: 
    mapping_remark: 
    status: 1
    qc_remark: 2
    qc_reslut: 
    taskID: 
    '''.strip()
    i = 0
    for pub in pubcodes:
        resp = requests.post(url, headers=header,
                             data=str2dic(formData.format(pub))).text
        if '没有搜索到你想要的数据' in resp:
            result.append(pub)
        i += 1
        print(len(pubcodes), i, pub)

    resultJson = {'noPubcode': result}
    with open('noPubcode.json', 'w') as f:
        f.write(json.dumps(resultJson))
    return result
