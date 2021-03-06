var jsp = {};
jsp.dom = {};
jsp.dom.Text = function () {
    this.insert = function (where) {
        var txt = document.createTextNode(this.url);
        where.appendChild(txt);
    };
};
jsp.dom.Link = function () {
    this.insert = function (where) {
        var link = document.createElement('a');
        link.href = this.url;
        link.appendChild(document.createTextNode(this.url));
        where.appendChild(link);
    };
};
jsp.dom.Image = function () {
    this.insert = function (where) {
        var im = document.createElement('img');
        im.src = this.url;
        where.appendChild(im);
    };
};
jsp.dom.factory = function (type) {
    return new jsp.dom[type];
}
var o = jsp.dom.factory('Link');
o.url = 'http://google.com';
o.insert(document.body);
var taskManager = {};
taskManager.update = function () {
    console.log('update');
}
taskManager.read = function () {
    console.log('read');
}
var type = 'update';
var task;
if (type === 'update') {
    task = new taskManager.update();
}
if (type === 'read') {
    task = new taskManager.read();
}
taskManager.factory = function (typeType) {
    return new taskManager[typeType];
}
task = new taskManager[type];
/*** Built-in Object Factory ***/
var o = new Object(),
    n = new Object(1),
    s = Object('1'),
    b = Object(true);
// test
o.constructor === Object;  // true
n.constructor === Number;  // true
s.constructor === String;  // true
b.constructor === Boolean; // true