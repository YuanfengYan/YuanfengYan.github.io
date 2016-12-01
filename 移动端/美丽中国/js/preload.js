    

    var can =  document.getElementById('can');
    can.width=$('body').width();
    can.height=$('body').height();
    var ctx = can.getContext('2d'),
            centerX = can.width / 2,   //Canvas中心点x轴坐标
            centerY = can.height / 2,  //Canvas中心点y轴坐标
            rad = Math.PI * 2 / 100;//将360度分成100份，那么每一份就是rad度
    var preNum=0;//预加载百分比
    
/**
     * 预加载图片
     * @param ImgArr  json
     * @param attr   回调函数的对象
     */
    function loading(ImgArr, attr) {
        var len = 0;//用来存放一共多少数据
        var loadingArr = {};//
        for (var prop in ImgArr) {
            len++;
        }
        var num = 0;//加载完一张图片数加一
        preAnimation();
        for (var prop in ImgArr) {
            var img = new Image();
            img.src = ImgArr[prop];
            img.onload = (function (_prop) {
                return function () {
                    num++;
                    loadingArr[_prop] = this;//this--当前加载的数据
                    if (num >= len) {
                        attr.complete(loadingArr);
                        preNum=num/len*100;
                        // preAnimation();
                    } else {
                        preNum=num/len*100;
                        // preAnimation();
                    }
                }
            })(prop)
        }
    }
    function preAnimation() {
        (function draFrame() {
            var preFram= window.requestAnimationFrame(draFrame);
            ctx.clearRect(0, 0, can.width, can.height);
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.arc(centerX, centerY, 80, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle='#49f';
            ctx.lineWidth=10;
            ctx.arc(centerX,centerY,80,-Math.PI/2,rad*preNum-Math.PI/2,false);
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle='#49f';
            ctx.font='40px 黑体';
            ctx.strokeText(preNum.toFixed(0)+'%',centerX-50,centerY+10);
            ctx.stroke();
            ctx.restore();
            if(preNum==100){
                cancelAnimationFrame(preFram);
            }
        })();

    }