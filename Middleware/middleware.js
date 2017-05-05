// 我们先看下express中间件写法：

var express = require('express');
var app = express();

app.use(function(req, res, next) {
    console.log('数据统计');
    next();//执行权利传递给
});

app.use(function(req, res, next) {
    console.log('日志统计');
    next();
});

app.get('/', function(req, res, next) {
    res.send('Hello World!');
});

app.listen(3000);
//整个请求处理过程就是先数据统计、日志统计，最后返回一个Hello World！

//每一个“管道”都是一个中间件，每个中间件通过next方法传递执行权给下一个中间件，express就是一个收集并调用各种中间件的容器。

// 中间件就是一个函数，通过express的use方法接收中间件，每个中间件有express传入的req，res和next参数。
// 如果要把请求传递给下一个中间件必须使用 next() 方法。当调用res.send方法则此次请求结束，node直接返回请求给客户，
// 但是若在res.send方法之后调用next方法，整个中间件链式调用还会往下执行，因为当前hello world所处的函数也是一块中间件，而res.send只是一个方法用于返回请求。

//我们可以借用中间件思想来分解我们的前端业务逻辑，通过next方法层层传递给下一个业务。做到这几点首先必须有个管理中间件的对象，我们先创建一个名为Middleware的对象：
function Middleware(){
    this.cache = [];
    this.options = null;//缓存options
}

Middleware.prototype.use = function(fn){
    if(typeof fn !== 'function'){
        throw 'middleware must be a function';
    }
    this.cache.push(fn);
    return this;
}

Middleware.prototype.next = function(fn){

    if(this.middlewares && this.middlewares.length > 0 ){
        var ware = this.middlewares.shift();
        ware.call(this, this.options, this.next.bind(this));//传入options与next
    }
}
/**
 * @param options 数据的入口
 * @param next
 */
Middleware.prototype.handleRequest = function(options){
    this.middlewares = this.cache.map(function(fn){//复制
        return fn;
    });
    this.options = options;//缓存数据
    this.next();
}

//简单使用
var middleware = new Middleware();
middleware.use(function(next){console.log(1);next();})
middleware.use(function(next){console.log(2);next();})
middleware.use(function(next){console.log(3);})
middleware.use(function(next){console.log(4);next();})
middleware.handleRequest();
//输出结果：
//1
//2
//3
//

//高级使用
var middleware = new Middleware();
middleware.use(function(next){
    console.log(1);next();console.log('1结束');
});
middleware.use(function(next){
    console.log(2);next();console.log('2结束');
});
middleware.use(function(next){
    console.log(3);console.log('3结束');
});
middleware.use(function(next){
    console.log(4);next();console.log('4结束');
});
middleware.handleRequest();
//输出结果：
//1
//2
//3
//3结束
//2结束
//1结束

//实际使用

function validate(options, next){
    console.log('validate', options.data);
    next();//通过验证
}
function send(options, next){
    setTimeout(function(){//模拟异步
        console.log('send', options.data);
        options.url = 'www.baidu.com';//设置跳转的url
        next();
    }, 100);
}
function goTo(options){
    console.log('goTo', options.url);
}

var submitForm = new Middleware();
submitForm.use(validate).use(send).use(goBack);
submitForm.handleRequest({data:{name:'xiaoxiong', age: 20}});

//结果：
// validate Object {name: "xiaoxiong", age: 20}
//
// send Object {name: "xiaoxiong", age: 20}
// goTo www.baidu.com


submitForm.handleRequest({data:{name:'xiaohong', age: 21}});//触发第二次，改变数据内容

//结果：
// validate Object {name: "xiaohong", age: 21}
//
// send Object {name: "xiaohong", age: 21}
// goTo www.baidu.com