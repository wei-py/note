from 查找使用中 import find_listing
from concurrent.futures import ThreadPoolExecutor, as_completed
import numpy as np
import pandas as pd
import asyncio
import json
import os


def split_arr(items, n):
    return [items[i:i+n] for i in range(0, len(items), n)]


def filter_error(csv):
    top = pd.read_csv(csv, index_col=0)
    # 初始化数据
    top.loc[:, "相对昨日均增加或减少"] = top['相对昨日均增加或减少'].fillna(
        '0').str.replace("%", "")
    top = top.fillna('')
    # 找到小于 -60%
    top = top.loc[(top['avg'] == '') | (top['avg'] == 0) |
                  (top['相对昨日均增加或减少'].astype('float') < -60), :]
    top = top.sort_values(by=['max_cts', 'avg'])

    # 过滤listingpage无使用的pubcode 可能是新镇
    if not os.path.exists('noUsing.json'):
        index = split_arr(top.index, 50)
        # nousingIndex = asyncio.run(find_listing(top.index))
        loop = asyncio.get_event_loop()
        task = [loop.create_task(find_listing(i)) for i in index]
        nousingIndex = loop.run_until_complete(asyncio.wait(task))[0]
        nousingIndex = [i for j in [i.result()
                                    for i in list(nousingIndex)] for i in j]
        DownNo = {'nousingInex': nousingIndex}
        with open('noUsing.json', 'w') as f:
            f.write(json.dumps(DownNo))
    else:
        with open('noUsing.json', 'r') as f:
            nousingIndex = json.loads(f.read())['nousingInex']

    usingIndex = list(set(top.index).difference(set(nousingIndex)))

    # 标记错误并排序
    nousing_top = top.loc[nousingIndex,
                          :].sort_values(by=['max_cts', 'avg'])
    nousing_top.loc[:, ['max_cts']] = 'NoListing'

    top = pd.concat([top.loc[usingIndex, :].sort_values(
        by=['max_cts', 'avg']), nousing_top])

    # 保存数据
    top.to_csv('top_error.csv')


csv = './top458.csv'
filter_error(csv)
