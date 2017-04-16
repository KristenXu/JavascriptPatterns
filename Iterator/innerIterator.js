/**
 each 函数属于内部迭代器，each 函数的内部已经定义好了迭代规则，它完
 全接手整个迭代过程，外部只需要一次初始调用。
 内部迭代器在调用的时候非常方便，外界不用关心迭代器内部的实现，跟迭代器的交互也仅
 仅是一次初始调用，但这也刚好是内部迭代器的缺点。由于内部迭代器的迭代规则已经被提前规
 定，each 函数就无法同时迭代 2 个数组了。
 **/
var each = function( ary, callback ){
    for ( var i = 0, l = ary.length; i < l; i++ ){
        callback.call( ary[i], i, ary[ i ] ); // 把下标和元素当作参数传给 callback 函数
    }
};
each( [ 1, 2, 3 ], function( i, n ){
    alert ( [ i, n ] );
});
var compare = function( ary1, ary2 ){
    if ( ary1.length !== ary2.length ){
        throw new Error ( 'ary1 和 ary2 不相等' );
    }
    each( ary1, function( i, n ){
        if ( n !== ary2[ i ] ){
            throw new Error ( 'ary1 和 ary2 不相等' );
        }
    });
    alert ( 'ary1 和 ary2 相等' );
};
compare( [ 1, 2, 3 ], [ 1, 2, 4 ] ); // throw new Error ( 'ary1 和 ary2 不相等' );