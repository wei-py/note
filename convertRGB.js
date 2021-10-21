// 4、CSS颜色转换
// #0000FF => rgb(0, 0, 255)

function convertRGB(color) {
    color = color.replace('#', '');
    let len = color.length / 3;
    let r = RegExp('(?=(?:\\w{' + len.toString() + '})\+\\b)', 'g')
    color = color.split(r)
    let result = 'rgb('
    for (let c of color) {
        result += Number('0x' + c).toString() + ', '
    }
    return result.replace(/(.*),/, '$1)');
}

// var color = '#0000FF';
var color = '#FAAF39';
color = '#0000FF'
var a = convertRGB(color);
console.log(a);


// if (color.length == 7) {
//     color = color.slice(1).split(/(?=(?:\w{2})+\b)/g);
// }
// else if (color.length == 4) {
//     color = color.slice(1).split(/(?=(?:\w{1})+\b)/g);
// } else {
//     return false
// }