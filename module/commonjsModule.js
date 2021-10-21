function commonJs() {
    var name;

    this.setName = function (thyname) {
        name = thyname;
    }
    this.getName = function () {
        console.log('Myname is ' + name);
    }
}

// module.exports = commonJs;
exports.commonJs = commonJs;