/**
 *
 * @param data
 * @constructor
 * Inspired from http://ife.baidu.com/note/detail/id/302
 * https://github.com/liujianhuanzz/ife_2016_spring/blob/master/ife_2017_spring/%E7%99%BE%E5%BA%A6%E7%B3%AF%E7%B1%B3%E5%89%8D%E7%AB%AF%E5%AD%A6%E9%99%A2/vue-2.js
 */
function Observer (data) {
    //暂不考虑数组
    this.data = data;
    this.makeObserver(data);
    this.eventsBus = new Event();
}

Observer.prototype.setterAndGetter = function (key, val) {
    let _this = this;
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function(){
            console.log('你访问了' + key);
            return val;
        },
        set: function(newVal){
            console.log('你设置了' + key);
            console.log('新的' + key + '=' + newVal);
            //触发$watch函数
            _this.eventsBus.emit(key, val, newVal);
            val = newVal;
            //如果newval是对象的话
            if(typeof newVal === 'object'){
                new Observer(val);
            }
        }
    })
}

Observer.prototype.makeObserver = function (obj) {
    let val;
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            val = obj[key];
            //深度遍历
            if(typeof val === 'object'){
                new Observer(val);
            }
        }
        this.setterAndGetter(key, val);
    }
}

Observer.prototype.$watch = function(attr, callback){
    this.eventsBus.on(attr, callback);
}

//实现一个事件
function Event(){
    this.events = {};
}

Event.prototype.on = function(attr, callback){
    if(this.events[attr]){
        this.events[attr].push(callback);
    }else{
        this.events[attr] = [callback];
    }
}

Event.prototype.off = function(attr){
    for(let key in this.events){
        if(this.events.hasOwnProperty(key) && key === attr){
            delete this.events[key];
        }
    }
}

Event.prototype.emit = function(attr, ...arg){
    this.events[attr] && this.events[attr].forEach(function(item){
        item(...arg);
    })
}


//测试单层对象
let app = new Observer({
    name: 'liujianhuan',
    age: 25,
    company: 'Qihoo 360',
    address: 'Chaoyang, Beijing'
})

app.$watch('age', function(oldVal, newVal){
    console.log(`我的年龄变了，原来是: ${oldVal}岁，现在是：${newVal}岁了`)
})

app.$watch('age', function(oldVal, newVal){
    console.log(`我的年龄真的变了诶，竟然年轻了${oldVal - newVal}岁`)
})

app.data.age = 20;

//测试深层对象
//目前只可注册监听对象的第一层的属性，对于对象的深层属性并不能有效监听
let app2 = new Observer({
    basicInfo: {
        name: 'liujianhuan',
        age: 25
    },
    age: 25,
    company: 'Qihoo 360',
    address: 'Chaoyang, Beijing'
});

app2.$watch('age', function(oldVal, newVal){
    console.log(`我的年龄变了，原来是: ${oldVal}岁，现在是：${newVal}岁了`)
});

app2.$watch('age', function(oldVal, newVal){
    console.log(`我的年龄真的变了诶，竟然年轻了${oldVal - newVal}岁`)
});

app2.data.basicInfo.age = 20;

// 还未解决掉的问题：
//
// 当传入的参数为数组时，如何监听数组对象的变化
// 深层对象属性的事件回调监听，或者描述为：对象的深层属性值发生变化后如何向上传递到顶层
// 动态数据与视图的绑定，如何绑定，当数据变化后如何触发视图的自动刷新。