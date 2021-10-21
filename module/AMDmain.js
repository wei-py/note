(function () {
    require.config({
        paths: {
            dateServive: './AMDmodule2',
            math: './AMDmodule1'
        }
    })
    require(['dateServive'], function (dataService) {
        dataService.doSomething()
    });
})()