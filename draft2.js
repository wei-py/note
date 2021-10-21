function arg() {
    var a = [];
    a = a.concat([...arguments]);
    return a;
}

console.log(arg(1, 2, 3));