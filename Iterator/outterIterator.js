//外部迭代器
/**
 * 迭代器模式不仅可以迭代数组，还可以迭代一些类数组的对象。比如 arguments、
 {"0":'a',"1":'b'}等。通过上面的代码可以观察到，无论是内部迭代器还是外部迭代器，只要被
 迭代的聚合对象拥有 length 属性而且可以用下标访问，那它就可以被迭代。
 */
var Iterator = function( obj ){
    var current = 0;
    var next = function(){
        current += 1;
    };
    var isDone = function(){
        return current >= obj.length;
    };
    var getCurrItem = function(){
        return obj[ current ];
    };
    return {
        next: next,
        isDone: isDone,
        getCurrItem: getCurrItem
    }
};

var compare = function( iterator1, iterator2 ){
    while( !iterator1.isDone() && !iterator2.isDone() ){
        if ( iterator1.getCurrItem() !== iterator2.getCurrItem() ){
            throw new Error ( 'iterator1 和 iterator2 不相等' );
        }
        iterator1.next();
        iterator2.next();
    }
    alert ( 'iterator1 和 iterator2 相等' );
}
var iterator1 = Iterator( [ 1, 2, 3 ] );
var iterator2 = Iterator( [ 1, 2, 3 ] );
compare( iterator1, iterator2 ); // 输出：iterator1 和 iterator2 相等