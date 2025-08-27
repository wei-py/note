///////// 原型继承  /////////
// function Parent1() {
//   this.name = "parent1";
//   this.play = [1, 2, 3];
// }

// function Child1() {
//   this.type = "child1";
// }

// Child1.prototype = new Parent1();
// console.log(new Child1());

// let s1 = new Child1();
// let s2 = new Child1();
// s1.play.push(4);
// console.log(s1.play, s2.play); // 因为使用的是同一个原型对象

///////// 使用 call 方法  /////////
// function Parent2() {
//   this.name = 'parent2';
// }

// Parent2.prototype.getName = function() {
//   console.log(this.name);
// }

// function Child2() {
//   Parent2.call(this);
//   this.type = 'child2';
// }

// let s3 = new Child2(); // 只继承了实例属性和方法, 原型并没有继承

///////// 组合继承 /////////
// function Parent3() {
//   this.name = "parent3";
//   this.play = [1, 2, 3];
// }

// Parent3.prototype.getName = function() {
//   console.log(this.name);
// }

// function Child3() {
//   Parent3.call(this); // 执行了一次
//   this.type = "child3";
// }

// Child3.prototype = new Parent3();
// // 手动挂载构造方法，指向自己的构造函数
// Child3.prototype.constructor = Child3; // 执行了一次
// let s3 = new Child3();
// let s4 = new Child3();
// s3.play.push(4)
// console.log(s3.play, s4.play);

///////// 寄生组合继承法 /////////
// function clone(parent, child) {
//   child.prototype = parent.prototype;
//   child.prototype.constructor = child;
// }

// function Parent4() {
//   this.name = "parent4";
//   this.play = [1, 2, 3];
// }

// Parent4.prototype.getName = function() {
//   console.log(this.name);
// }

// function Child4() {
//   Parent4.call(this);
//   this.friends = 'child4';
// }

// clone(Parent4, Child4);
