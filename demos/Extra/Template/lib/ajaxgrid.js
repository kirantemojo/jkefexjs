var ajaxgrid = function(){

};
ajaxgrid.prototype.topGrid = function(obj)
{
	var heightArray = [];
	var setHeightArray = [];
	var topArray = [];
	$.fn.getHeight = function()
	{	
		$(this).each(function(){
			heightArray.push($(this).height());
		});
		return heightArray;
	}
	$.fn.setHeight = function(setOptions)
	{
		$(this).each(function(i){
			$(this).height(setOptions[i]);
		});
	}
	$.fn.getTop = function()
	{
		$(this).each(function(i){
			topArray.push($(this).position().top);
		});
		return topArray;
	}
	$.fn.setTop = function(setTopOptions)
	{
		$(this).each(function(i){
			$(this).css({'top':setTopOptions[i]+'px'});	
		});
	}
	$.fn.setColumn = function(noCol,colWidth)
	{
		$(this).filter(function(i){
			if((i % noCol)==0)
			{
				$(this).css('left',colWidth[0]+'%');
			}
			else if((i % noCol)!=0)
			{
				$(this).css('left',colWidth[1]+'%');
			}
		});
	}
	var setTopOptions = function(htmlObj)
	{
		var height = $(htmlObj).getHeight();
		var top = $(htmlObj).getTop();
		$(htmlObj).setColumn(2,[0,50]);
		var newTop = [];
		newTop.push(top[0]);
		newTop.push(top[1]);
		for(var i=2;i < 10; i++ )
		{
			if(((i%2)==0) && (i!=0))
			{
				top[i] += top[i-2]+height[i-2];
				newTop.push(top[i]);
			}
			else
			{
				top[i] += top[i-2]+height[i-2];
				newTop.push(top[i]);
			}
		}
		$(htmlObj).setTop(newTop);
		$(htmlObj).setHeight(height);
	};
	setTopOptions(obj);
}