window.onload=function(){
	//轮播图
	var Imgdata = [{
		imgSrc: "img/swiper01.jpg",
		imgurl: "#1"
	}, {
		imgSrc: "img/swiper02.jpg",
		imgurl:"#2"
	}, {
		imgSrc: "img/swiper03.jpg",
		imgurl:"#3"
	}, {
		imgSrc: "img/swiper04.jpg",
		imgurl:"#4"
	}, {
		imgSrc: "img/swiper05.jpg",
		imgurl:"#5"
	}, ];

	function BannerSwiper(id, data) {
		this.id = '#' + id;
		this.data = data;
		this.count = 0;
		this.timer = null;
	}
	BannerSwiper.prototype.init = function() {
		this.render();
		this.bind();
		this.start();
	}
	BannerSwiper.prototype.render = function() {
		var swiperGroup = document.querySelector(this.id + '>.swiper-group');
		var swiperCtrls = document.querySelector(this.id + ' .ctrls .ctrl');
		for(var i = 0; i < this.data.length; i++) {
			var imgs_a = document.createElement('a'); // 创建a便签
			imgs_a.href = this.data[i].imgurl ;
			var imgs_a_img = document.createElement('img'); //创建a标签下的img标签
			imgs_a_img.src = this.data[i].imgSrc;
			imgs_a.appendChild(imgs_a_img); //在a标签中添加img标签

			var ctrl = document.createElement('a');
			ctrl.href = this.data[i].imgurl ;
			ctrl.innerHTML = i+1;
			swiperGroup.appendChild(imgs_a); //将创建的标签加入到对应的dom中
			swiperCtrls.appendChild(ctrl);
			if(i == 0) {
				imgs_a.classList.add('active');
				ctrl.classList.add('active');
			}
		}
	}
	BannerSwiper.prototype.bind = function() {
		var ctrl = document.querySelectorAll(this.id + '  .ctrls .ctrl a');
		var imgs_a = document.querySelectorAll(this.id + ' .swiper-group a ');
		var changeRL = document.querySelector('.changeRL');
		var swiper =document.querySelector(this.id);
		var changeR = document.querySelector('.changeRL .changeR');
		var changeL = document.querySelector('.changeRL .changeL');
		var self = this;
		//下面圆点和轮播图同步变换
		for(var i = 0; i < ctrl.length; i++) {
			ctrl[i].index = i;
			ctrl[i].onmouseenter = function() {
				self.count = this.index;
				document.querySelector('  .ctrls .ctrl .active').classList.remove('active');
				this.classList.add('active');
				document.querySelector(' .swiper-group .active').classList.remove('active');
				imgs_a[self.count].classList.add('active');
//				self.stop();
			}
//			ctrl[i].onmouseleave = function() {
//				self.start();
//			}
		}
		//轮播图左右切换
		swiper.onmouseenter=function(){
			this.classList.add('active');
			self.stop();
		}
		swiper.onmouseleave=function(){
			this.classList.remove('active');
			self.start();
		}
		changeR.onclick = function(){//向右切换图片
			self.count=self.count==self.data.length-1?0:self.count+1;
			document.querySelector('  .ctrls .ctrl .active').classList.remove('active');
			ctrl[self.count].classList.add('active');
			document.querySelector(' .swiper-group .active').classList.remove('active');
			imgs_a[self.count].classList.add('active');
		}
		changeL.onclick = function(){//向左切换图片
			self.count=self.count==0?self.data.length-1:self.count-1;
			document.querySelector('  .ctrls .ctrl .active').classList.remove('active');
			ctrl[self.count].classList.add('active');
			document.querySelector(' .swiper-group .active').classList.remove('active');
			imgs_a[self.count].classList.add('active');
		}
	}
	BannerSwiper.prototype.start = function() {
		var self = this;
		var imgs_a = document.querySelectorAll(self.id + ' .swiper-group a');
		var ctrl = document.querySelectorAll(this.id + '  .ctrls .ctrl a');
		//		console.log("")
		this.timer = setInterval(function() {
			for(var i = 0; i < self.data.length; i++) {
				if(imgs_a[i].classList.contains('active')) {
					imgs_a[i].classList.remove('active');
					self.count = i == self.data.length - 1 ? 0 : i + 1;
					imgs_a[self.count].classList.add('active');
					document.querySelector('  .ctrls .ctrl .active').classList.remove('active');
					ctrl[self.count].classList.add('active');
					break;
				}
			}
		}, 2000);
	}
	BannerSwiper.prototype.stop = function() {
		clearInterval(this.timer);
	}
	var banner = new BannerSwiper('swiper', Imgdata);
	banner.init();
}