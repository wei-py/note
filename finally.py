import pandas as pd
import re

source = pd.DataFrame(pd.read_csv('source.csv', index_col=0))
target = pd.DataFrame(pd.read_csv('target.csv', index_col=0))

flag = source.loc[[i for i in target.index.tolist() if i in source.index.tolist()], [
    '定制人', '抓文频率', '代码地址']]
for pub in flag.index.values:
    target.loc[pub]['定制人'] = flag.loc[pub]['定制人']
    target.loc[pub]['抓文频率'] = flag.loc[pub]['抓文频率']
    if re.search('源码地址：(.*?)运行地址', str(flag.loc[pub]['代码地址']), re.S):
        target.loc[pub]['gitlab地址'] = re.findall(
            '源码地址：(.*?)运行地址', flag.loc[pub]['代码地址'], re.S)[0]
    if re.search('运行地址：(\S+)', str(flag.loc[pub]['代码地址']), re.S):
        target.loc[pub]['rancher地址'] = re.findall(
            '运行地址：(\S+)', flag.loc[pub]['代码地址'], re.S)[0]

target.to_csv('test.csv')
