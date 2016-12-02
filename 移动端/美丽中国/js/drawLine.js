        // var html = document.documentElement;
        // windowWidth = html.clientWidth;

        function Draw(arr,content) {
            this.count = 0;
            this.arr=arr;
            this.$line=null;
            this.drawDiv=content;
            for(var i=0;i<arr.length;i++){
                this.arr[i][0]=this.arr[i][0]/100*document.documentElement.offsetWidth;
                this.arr[i][1]=this.arr[i][1]/100*document.documentElement.offsetWidth;
            }

        }
        Draw.prototype.calc = function(x1, y1, x2, y2) {
            var arr = [];
            // var x1=x1/100*document.documentElement.offsetWidth;
            // var x2=x2/100*document.documentElement.offsetWidth;
            // var y1=y1/100*document.documentElement.offsetWidth;
            // var y2=y2/100*document.documentElement.offsetWidth;
            var height = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            var angle = Math.atan2(y2 - y1, x2 - x1);
            angle=angle/Math.PI*180;
            arr.push(height);
            arr.push(angle);
            // console.log(angle/Math.PI*180);
            return arr;
        };
        Draw.prototype.create = function(arr) {
            var $cicle = $("<div class='cicle'></div>");
            var $line=$("<div class='line'></div>");
            $cicle.css({
                "left": arr[0] + "px",
                "top": arr[1]+ "px"
            });
            $line.css({
                "left": (arr[0]+4) + "px",
                "top": (arr[1]+4)+ "px"
            });
            $(this.drawDiv).append($line);
            $(this.drawDiv).append($cicle);
          
             this.$line=$line;
        };
        Draw.prototype.drawA = function() {
        	this.create(this.arr[this.count]);
        	this.count++;
        	var self=this;
        	if(this.count<this.arr.length){//判断是否还有下一点
        		var arrCalc=this.calc(this.arr[this.count-1][0],this.arr[this.count-1][1],this.arr[this.count][0],this.arr[this.count][1]);
        		this.$line.css({"transform":"rotate("+arrCalc[1]+"deg)","transform-origin":"0 center"});
        		this.$line.animate({width:arrCalc[0]+"px"},500,function(){self.drawA()});
        	}
        };
        