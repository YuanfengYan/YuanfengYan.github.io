/*
    获取屏幕宽度设定rem值
 */
(function() {
    var html = document.documentElement;
    var windowWidth = html.clientWidth;
    var offsetWidth = html.offsetWidth;
    var maxWidth = Math.max(windowWidth, offsetWidth);
    if (maxWidth >= 414) { //ipad
        maxWidth = 414;
    }
    html.style.fontSize = maxWidth / 7.5 + 'px';
})();
/*
异步获取图片路径（json文件）
 */
$.ajax({
    url: 'lib/img.json',
    dataType: "json",
    success: function(json) {
        loading(json, {
            complete: main
        });
    }
});
/**
 * 预加载完成后执行程序
 */
function main() {
    $(".swiper-container").removeClass('hide');
    $("#can").addClass('hide');
    $(function() {

        var mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            noSwipingClass: 'stop-swiping',
            // effect: 'cube',
            cube: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 100,
                shadowScale: 0.6,
            },
            onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
                swiperAnimateCache(swiper); //隐藏动画元素 
                swiperAnimate(swiper); //初始化完成开始动画
            },
            onSlideChangeEnd: function(swiper) {
                swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            },
            onSlideChangeStart: function(swiper) {
                if (mySwiper.activeIndex == 1) {
                    arrPos = [
                        [0, 0],
                        [30, 20],
                        [30, 130],
                        [50, 130],
                        [50, 200]
                    ];
                    arrPos1 = [
                        [68, 20],
                        [68, 80],
                        [88, 120],
                        [68, 120],
                        [68, 100]
                    ]
                    var line1 = new Draw(arrPos, '.drawLine1');
                    var line2 = new Draw(arrPos1, '.drawLine1');
                    line1.drawA();
                    line2.drawA();
                } else {
                    $(".drawLine1").empty();
                }
            }
        });
        $("#si img").on('touchend', function() {
            $(this).toggleClass("widthChange");
        });

        //page4图片切换
        var $mark = $(".mark");
        var $loader_img = $(".loader_img");
        var $imgs = $(".pictures img");
        var $y_line=$(".y .y_line");
        var isfirst=true,islast=false,isremove=false,isadd=false;
        $y_line.css({height:60+"vh"});
        $(".page4").on('touchstart', function() {
            $mark.toggleClass("hide");
            $loader_img.toggleClass("hide");
        });
        //给每个图片设置一个index
        for (var i = 0; i < $imgs.length; i++) {
            $imgs[i].index = $imgs.length-i-1;
        }
        $imgs.on("touchstart", function(ev) {
            ev.stopPropagation();//阻止冒泡事件
            ev.preventDefault();//阻止默认事件

            var touch = ev.targetTouches[0];
            var oldx = touch.clientX;
            var dx = 0;
            $(this).on("touchmove", function(ev) {
                ev.stopPropagation();//阻止冒泡事件
                ev.preventDefault();//阻止默认事件
                var touch = ev.targetTouches[0];
                var x = touch.clientX;
                var y = touch.clientY;
                dx = oldx - x;
                if (dx > 0 && this.index<$imgs.length-1) { //向左滑动
                    var angle = -Math.atan2(dx, $('body')[0].offsetWidth) / Math.PI * 180;
                    this.style.transform = "rotate(" + angle + "deg)";
                    isremove=true;
                    isadd=false;
                } else if(this.index>0) { //向右划动
                    isadd=true;
                    isremove=false;
                }
                if(this.index==0&&dx<0||this.index==$imgs.length-1&&dx>0){
                    isadd=false;
                    isremove=false;
                }
                
            });
        });
            $imgs.on("touchend", function() {
                $(this).off("touchmove");
                if (isremove) {
                    isremove=false;
                    $(this).animate({
                        left: -400 + "px"
                    }, 500);
                }
                if (isadd) {
                    isadd=false;
                    this.style.transform = "rotate(" + 0 + "deg)";
                    this.nextElementSibling.style.transform = "rotate(" + 0 + "deg)";
                    $(this).next().animate({
                        left: 0 + 'px'
                    }, 500);

                }
            $y_line.animate({height:($imgs.length-this.index-1)/($imgs.length-1)*60+"vh"},500);

            });

    })
}