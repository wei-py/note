from ichrome import AsyncChromeDaemon
import pandas as pd
import asyncio

# df = pd.read_csv('result.csv', index_col=0)
# pubcodes = df.index[:10]


async def find_listing(pubcodes):
    result = []

    # async def main():
    async with AsyncChromeDaemon(headless=0, disable_image=False, port=9223, chrome_path='/Applications/Chromium.app/Contents/MacOS/Chromium') as cd:
        async with cd.connect_tab(index=0, auto_close=True) as tab:
            # login
            await tab.set_url('http://tnp.wisers.net:8080/ListingPage/listingpage.action?pageNo=0&real=real', timeout=5)
            await tab.js('document.querySelector("tr:nth-child(1) > td:nth-child(3) > input").value = "bj_weixu"')
            await tab.js('document.querySelector("tr:nth-child(2) > td:nth-child(3) > input").value = "weixu"')
            await tab.click('tr:nth-child(3) > td > a:nth-child(3) > img')

            # redire
            await tab.wait_tag('#cssmenu > ul > li:nth-child(4) > a')
            await tab.click('#cssmenu > ul > li:nth-child(4) > a')

            # find
            j = 0
            for pubcode in pubcodes:
                j += 1
                print(j, pubcode)
                await find_using(tab, pubcode, result)

            # 等待关闭
            await asyncio.sleep(5)
            # 关闭窗口
            await tab.close()
        # 关闭浏览器
        # await cd.clear_user_data_dir()
    return result
# mark fail


async def find_using(tab, pubcode, result):
    # for pubcode in pubcodes:
    await tab.wait_tag('#form > div > div.content.shadow > div > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(2) > input')
    # 清空输入宽
    await tab.wait_tag('tbody > tr:nth-child(1) > td:nth-child(2) > input')
    await tab.js('document.querySelector("tbody > tr:nth-child(1) > td:nth-child(2) > input").value = ""')
    # pubcode输入
    await tab.js('document.querySelector("tbody > tr:nth-child(1) > td:nth-child(2) > input").value = "{}"'.format(pubcode))
    # 状态使用中
    await tab.wait_tag('#search_status')
    await tab.js('document.querySelector("#search_status").value = 1')
    # 精确查找
    await tab.wait_tag('#real')
    await tab.js('document.querySelector("#real").click()')
    await asyncio.sleep(3)
    # 点击查找
    await tab.js('document.querySelector("#search").click()')
    # await tab.wait_tag('#form > div > div.content.shadow > div > table.kenji-table > tbody > tr:nth-child(2) > td')
    await tab.wait_page_loading()

    # 添加到结果队列

    html = await tab.html
    if '没有搜索到你想要的数据' in html:
        result.append(pubcode)

# asyncio.run(main())


async def find():
    result = await find_listing(pubcodes)
    print(result)

if __name__ == "__main__":
    asyncio.run(find())
