//虚拟代理
var myImage = (function(){
    var imgNode = document.createElement( 'img' );
    document.body.appendChild( imgNode );
    return function( src ){
        imgNode.src = src;
    }
})();
var proxyImage = (function(){
    var img = new Image;
    img.onload = function(){
        myImage( this.src );
    };
    return function( src ){
        myImage( 'file:// /C:/Users/svenzeng/Desktop/loading.gif' );
        img.src = src;
    }
})();
proxyImage( 'http:// imgcache.qq.com/music// N/k/000GGDys0yA0Nk.jpg' );