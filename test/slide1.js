/*!
 * Date: 2012-9-5 by wang
 * auto slide
 * effect: click, hover
 */
(function($){
    var slideAdv = function(){};
    slideAdv.prototype = {
        default:{
                effect: 'click',
            speed: 3500,
            index:0
        },
        init: function(options){
            var options = this.options = $.extend({},this.default,options);
            if(!options.obj) return false;
            var that = this;
            this.obj = options.obj; //ģ�����
            this.item = $('.item',this.obj); // ���ݶ���
            this.num = this.item.length;
            this.t = null;  //��ʼ����ʱ����
            this.index = options.index; //��ʼ������
            this.item.eq(this.index).show();
            this.createAct();
            this.auto();
        },
        createAct: function(){
            var that, ul, li, i=0, s='', effect;
            that = this;
            for(i;i<this.num; i++){
                if(i==this.index){
                    s += '<li class="cur">'+ i+1 +'</li>';
                }else{
                    s += '<li>'+ i+1 +'</li>';
                }
            }
            ul = $('<ul class="act">'+ s +'</ul>');
            this.obj.append(ul);
            this.lis = $('li',ul);

            effect = this.options.effect;
            switch(effect){
                case 'click' :
                    this.lis.click(function(){
                        clearTimeout(that.t);
                        var idx = $(this).index();
                        that.slide(idx);
                        that.auto()
                    })
                    break;
                case 'hover' :
                    this.lis.hover(
                            function(){
                                clearTimeout(that.t);
                                var idx = $(this).index();
                                that.slide(idx);
                            },
                            function(){
                                that.auto();
                            }
                            )
                        break;
            }
       },
        auto: function(){
            var that = this;
            this.slide(that.index);
            this.index++;
            if(this.index==this.num){   //�������ֵ��λ
                this.index = 0;
            }
            this.t = setTimeout(function(){
                that.auto();
            },this.options.speed);
        },
        slide: function(idx){
            var li = this.lis.eq(idx); // ��ǰ������li
            if(li.hasClass('cur')) return false;
            this.lis.removeClass("cur").eq(idx).addClass('cur');
            this.item.hide().eq(idx).show(); //ƥ�����������ݿ�
            this.index = idx++; // ���¶�λ �Զ��л�����
        }
    }
    var objslideAdv = new slideAdv();
    objslideAdv.init({obj:$("#slideAdv"),effect:'hover',effect:3500});
})(jQuery)
