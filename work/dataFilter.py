import os
import json
import pandas as pd
import numpy as np
from find_error import findError


cookies = 'JSESSIONID=0803BE9DA633A96C8323CB918D8C1827'
curPath = __file__.replace(os.path.basename(__file__), '')
noPubcodePath = curPath + 'noPubcode.json'
csv = curPath + 'top458.csv'

df = pd.read_csv(csv, index_col=0)
pubcodes = df.index.to_list()
if os.path.exists(noPubcodePath):
    with open(noPubcodePath, 'r') as f:
        noPubcodes = json.loads(f.read())['noPubcode']
else:
    noPubcodes = findError(pubcodes, cookies)
usePubcodes = [i for i in pubcodes if i not in noPubcodes]

no_df = df.loc[noPubcodes, :]  # 无用pubcode
df = df.loc[usePubcodes, :]  # 有用pubcode
df['相对昨日均增加或减少'] = df['相对昨日均增加或减少'].str.strip('%').fillna('-999')
# df['avg'] = df['avg'].fillna('999')
df = df.loc[(df['相对昨日均增加或减少'].astype('float') < -30), :]
df = df.sort_values(by=['avg', 'max_cts', '相对昨日均增加或减少'],
                    ascending=[True, False, True])

df['相对昨日均增加或减少'] = df['相对昨日均增加或减少'].replace('-999', '')
# df['avg'] = df['avg'].replace('999', '')
print(len(df.index), len(no_df.index))
df.to_csv('df.csv')

# # 找到小于 -60%
# df = df.loc[np.isnan(df['avg']) | (df['avg'] == 0) |
#             (df['相对昨日均增加或减少'].astype('float') < -30), :]
