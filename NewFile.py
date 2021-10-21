import os
import re
import execjs
import requests_html

# 请求
pubcode = '''
wm_intcjcn
wm_chinaestatwatchcn
wm_dcjrcn
wm_newscx368cn
wm_escolifesciencescn
wm_nikkeibphk
forum_tgbbscn
'''
pubcode = [i for i in pubcode.strip().split('\n')]
cookies = 'JSESSIONID=F7878DAA2CD5CE4EF08F6D6AE69C335B'


# 路径管理
curPath = __file__.replace('NewFile.py', '')
fileFolder = curPath + 'newfile'
'' if os.path.exists(fileFolder) else os.mkdir(fileFolder)

# 模板
xml = '''
<?xml version="1.0" encoding="UTF-8"?>
<crawling_plan type="news" pubcode="" url="" outputCharset="GBK" fromDate="20201201">
    <listings></listings>
    <listing_extractor charset="Auto" html2xml="htmlCleaner">
        <link_path strategy="IdClass"></link_path>
        <title_path strategy="IdClass"></title_path>
        <date_path strategy="IdClass" date_strategy="Simple"></date_path>
        <nextpage_path strategy="IdClass" maxpages="" page_strategy="NextPage"></nextpage_path>
    </listing_extractor>
    <content_extractor charset="Auto" html2xml="htmlCleaner">
        <content_path strategy="IdClass" filter_nodes=""></content_path>
        <author_path strategy="IdClass"></author_path>
        <nextpage_path strategy="IdClass" maxpages="" page_strategy="NextPage"></nextpage_path>
    </content_extractor>
</crawling_plan>
'''.strip()
forumXml = '''
<?xml version="1.0" encoding="UTF-8"?>
<crawling_plan type="forum" pubcode="" url="" outputCharset="GBK" oldVersion="1" fromDate="20120420" onlyExtractFirstPost="true">
  <listings></listings>
  <listing_extractor charset="Auto" html2xml="htmlCleaner">
    <forum_url_id regular_expression="" match_strategy="false" />
    <link_path strategy="IdClass"></link_path>
    <title_path strategy="IdClass"></title_path>
    <reply_number_path strategy="IdClass" num_strategy="Loose"></reply_number_path>
    <click_number_path strategy="IdClass" num_strategy="Loose"></click_number_path>
	<nextpage_path strategy="IdClass" maxpages="" page_strategy="NextPage"></nextpage_path>
  </listing_extractor>
  <forum_content_extractor charset="Auto" html2xml="htmlCleaner">
    <content_path strategy="IdClass" filter_nodes="div[@class='modact']"></content_path>
    <author_path strategy="IdClass"></author_path>
    <date_path strategy="IdClass" date_strategy="Simple"></date_path>
	<nextpage_path strategy="IdClass" maxpages="" page_strategy="NextPage"></nextpage_path>
  </forum_content_extractor>
</crawling_plan>
'''.strip()


# 处理请求信息
js = r'''
var handle = (inc) => {
    var patt = /(.+?)\s+(http.+)/img;
    var jg = "";
    while ((result = patt.exec(inc)) != null) {
        jg = jg + "<url section=\"" + result[1] + "\">" + result[2].replace(/&/g, "&amp;") + "</url>" + "\n";
    }
    return jg
}
'''


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
Referer: http://tnp.wisers.net:8080/ListingPage/loginLSCT.action
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
searchF.listingpageStatus: 3
searchF.qcStatus: 
mapping_remark: 
status: 1
qc_remark: 2
qc_reslut: 
taskID: 
'''

# 打开url
url = 'http://tnp.wisers.net:8080/ListingPage/listingpage.action?pageNo=0&real=real'
session = requests_html.HTMLSession()


for pub in pubcode:
    resp = session.post(url, headers=header,
                        data=strTodic(formdata.format(pub)))

    th = ''  # 保存title和href
    title = resp.html.xpath("//a[@class='ellipsis_cell']/../../td[4]/@title")
    href = resp.html.xpath("//a[@class='ellipsis_cell']/@href")
    for t, h in zip(title, href):
        th += t + '  ' + h + '\n'
    th = execjs.compile(js).call('handle', th)  # 执行js

    if('blog' in pub or 'wm' in pub):
        th = re.sub('<listings></listings>',
                    '<listings>'+'\n'+th+'</listings>', xml + '\n')
    if('forum' in pub):
        th = re.sub('<listings></listings>',
                    '<listings>'+'\n'+th+'</listings>', forumXml + '\n')
    th = re.sub('pubcode="',
                'pubcode="' + pub, th)

    # 链接超过30条，需要手动添加
    if('''listingpage.action','');">下一页</a>''' in resp.text):
        print(pub, '链接数多于30条')

    # 创建文件
    with open(fileFolder + '/' + pub + '.xml', 'w') as f:
        f.write(th)
