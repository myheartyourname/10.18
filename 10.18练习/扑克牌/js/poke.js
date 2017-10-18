/*
* @Author: lenovo
* @Date:   2017-10-17 16:53:35
* @Last Modified by:   lenovo
* @Last Modified time: 2017-10-18 16:19:39
*/
$(function(){
	/*产生扑克牌*/
	let color=['c','d','h','s'];
	let poke=[];
	let flag={};
	let index=0;  //记录当前是第几张
	for (let i=0;i<52;i++){
		let hua=color[Math.floor(Math.random()*color.length)];
		let num=Math.floor(Math.random()*13+1);
		while(flag[`${hua}_${num}`]){
			hua=color[Math.floor(Math.random()*color.length)];
			num=Math.floor(Math.random()*13+1);
		}
		poke.push({hua,num});
		flag[`${hua}_${num}`]=true;
	}
	
	for (let i=0;i<7;i++){
		for (let j=0;j<=i;j++){
			let left=300-50*i+100*j,top=50*i;
			$('<div>').addClass('poke box')
			.attr('id',`${i}_${j}`)
			.data('num',poke[index].num)  //或者写： .attr('num',poke[index].num)
			.css({backgroundImage:`url(img/images/${poke[index].num}${poke[index].hua}.png)`})
			.appendTo('.desk').delay(index*10)
			.animate({left,top,opacity:1})
			index++;
		}
	}

	//剩余的牌
	for (;index<poke.length;index++){
		$('<div>').addClass('poke zuo')
		.attr('id',`${-2}_${-2}`)  //随便加的
		.data('num',poke[index].num)
		.css({backgroundImage:`url(img/images/${poke[index].num}${poke[index].hua}.png)`})
	    .appendTo('.desk').delay(index*8)
	    .animate({left:0,top:'460px',opacity:1})
	}

	//zuo
	let first=null;  //记录点击
	$('.desk').on('click','.poke',function(e){
        let element=$(e.target);
        // $(element).css('box-shadow','0 0 0 3px #45ff00').animate({top:'-=10'})
        
        //判断是否被压住
        let ids=element.attr('id').split('_'); //拆开字符串，还是字符串

        //['0','0']  0,0  1,0  1,1 
        // #x+1_y 
        let ele1=`#${ids[0]*1+1}_${ids[1]*1}`; //将字符串转成数字
        let ele2=`#${ids[0]*1+1}_${ids[1]*1+1}`;
        if ($(ele1).length || $(ele2).length){ //$()获取回来是个对象
            return;
        }

        //选中第一、第二张
        element.toggleClass('active');
	    if(element.hasClass('active')){
	    	/*第一次点击*/
	    	element.animate({top:'-=20'})
	    }else{
	    	/*第二次点击*/
	    	element.animate({top:'+=20'})
	    }

        if (!first){  //未点击，进行选择
        	first=element;
        }else{
        	//first   element   active
        	if(first.data('num')+element.data('num')==14){ //飞走并消失
        		$('.active').animate({left:600,top:0},function(){  
        			$(this).remove();  
        		})
        	}else{ //不等于14，两个都放下
        		$('.active').animate({top:'+=20'},function(){
        			$(this).removeClass('active');
        		})
        	}
        	first=null;  //重新进行选择
        }

	}) 
	let zindex=0;
	//左
	$('<div>').addClass('reverse').html('&gt').appendTo('.desk')
	.click(function(){
		if (!$('.zuo').length){return}
		$('.zuo').last().css('z-index',zindex++).animate({left:400}).removeClass('zuo').addClass('you')
	});

	//右
	$('<div>').addClass('reverse1').html('&lt').appendTo('.desk')
	.click(function(){
		if (!$('.you').length){return}
		$('.you').each(function(index){
            $(this).delay(index*100).css('z-index',zindex++).animate({left:0}).removeClass('you').addClass('zuo')
		})
	})
})