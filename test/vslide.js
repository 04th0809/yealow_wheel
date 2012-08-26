$.fn.vslide = function(option){
	var $ul, $len, $len1, idx, curIdx, $big, WIDTH, animated;
	animated = 0;
	$len1 = 4;
	idx = curIdx = 0;
	$big = $("#mid_photo");
	$ul = $("#thumbnail");
	$len = $ul.find('li').size();
	if(!$len)return false;
	WIDTH=option.w;
	$ul.css({width:WIDTH*$len});
	init(0);

	function getImg(img, fCallback){	
		if (document.all){
			img.onreadystatechange = function(){
				if (this.readyState=="loaded" || this.readyState=="complete"){
					fCallback({width:img.width, height:img.height, obj:img});
					img.style.visibility='visible';
				}
			};
		}else{
			img.onload = function(){
				fCallback({width:img.width, height:img.height, obj:img});
					img.style.visibility='visible';
			};
		}
	};

	function resizeImg(arg){
		var tmp_img = arg.obj,
			tmp_w = arg.width,
			tmp_h = arg.height;
		var max_w = 345;
		var max_h = 230;
		if(tmp_w>max_w || tmp_h>max_h){
			var rateW = tmp_w/max_w,
				rateH = tmp_h/max_h;
			if(rateW > rateH){
				arg.obj.style.width = parseInt(tmp_w/rateW) + 'px';
				arg.obj.style.height = parseInt(tmp_h/rateW) + 'px';
				var h = tmp_h/rateW;
			}else{
				arg.obj.style.height = parseInt(tmp_h/rateH) + 'px';
				arg.obj.style.width = parseInt(tmp_w/rateH) + 'px';
			}
		}
	}

	$("#l_move").click(left);
	$("#r_move").click(right);

	$("#thumbnail li").click(function(){
		var i = $(this).index();
		if(i===curIdx) return false;

		if(animated){
			return false;
		}
		animated=1;
		hilight(i);
		curIdx = i;
		return false;
	})


	function left(){
		if($ul.is(':animated')){
			return false;
		}
		idx -= 1;
		if(idx<=0){
			idx=0;
			$("#l_move").addClass('lMove_disabled').removeClass('lMove');
		}
		// 左移动, 最右边的将隐藏,
		if(idx+(option.len1-1)<curIdx){
			curIdx-=1;
			hilight(curIdx);
		}
		pos(idx);
		$("#r_move").addClass('rMove').removeClass('rMove_disabled');
	}
	function right(){
		if($ul.is(':animated')){
			return false;
		}
		idx += 1;
		var s1 = $len-$len1;
		if(idx>=s1){
			idx = s1;
			$("#r_move").addClass('rMove_disabled').removeClass('rMove');
		}
		if(idx>curIdx){
			curIdx+=1;
			hilight(curIdx);
		}
		pos(idx);
		$("#l_move").addClass('lMove').removeClass('lMove_disabled');
	}
	function pos(s){
		$ul.animate({'margin-left':-WIDTH*s},400);
	};
	function init(s){
		var li, res;
		li = $ul.find('li').eq(s);
		res = $('img',li).attr('src');
		li.addClass('cur');
		$big.prepend('<img src="' + res + '" onerror="this.src=\'http://page.resfyou.com/comm2/images/common/ls-photo-04.jpg\'" style="visibility:hidden"/>');
		getImg($("img",$big)[0],function(arg){ resizeImg(arg) })
	}
	function hilight(s){
		var li, res;
		li = $ul.find('li').eq(s);
		res = $('img',li)[0].src;
		li.addClass('cur').siblings().removeClass('cur');
		$("img",$big).fadeOut(300,function(){
			$(this).remove();
			$big.prepend('<img src="' + res + '" onerror="this.src=\'http://page.resfyou.com/comm2/images/common/ls-photo-04.jpg\'" style="visibility:hidden"/>');
			getImg($("img",$big)[0],function(arg){ resizeImg(arg) })
			animated = 0;
		})
	}
};