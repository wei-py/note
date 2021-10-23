var XMLHttpRequest = require("xmlhttprequest-ssl").XMLHttpRequest;


class Ajax {
    constructor(methor = 'GET', url, options) {
        this.methor = methor;
        this.url = url;
        // this.data = this.formatData(data);
        this.options = options;
        // Object.assign(this.options, options);
    }

    // formatData(data) {
    //     if (typeof data != 'object' || data == null) data = {}
    //     let form = new FormData()
    //     for (const [name, value] of Object.entries(data)) {
    //         form.append(name, value)
    //     }

    //     return form
    // }
    static get(url, options) {
        return new this('GET', url, options).xhr();
    };
    static post() {
        return new this();
    };
    xhr() {
        return new Promise((resovle, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open(this.methor, this.url);
            xhr.responseType = this.options.responseType;
            xhr.send(this.data);
            xhr.onload = function () {
                if (xhr.status === 200 | xhr.status === 304) {
                    resovle(xhr.responseText);
                } else {
                    reject({ 'status': xhr.status, 'statusText': xhr.statusText })
                }
            }
            xhr.onerror = function (error) {
                reject(error);
            }
        })

    }


}
url = 'https://api.github.com'
Ajax.get(url, { responseType: 'json' }).then(response => console.log(response))