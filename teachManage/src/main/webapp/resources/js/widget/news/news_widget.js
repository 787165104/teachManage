/**
 * 新闻 widget
 */
(function($){
	var defaults = {
			url : '/widget/news/getNewsList',
			ajaxData : {},
			data : {}
	};
	
	function getDataFromServer(pView, options){
		$.ajax({
			url : ParentUrl + options.url,
			type : 'post',
			data : options.ajaxData,
			success : function(rs){
				if(rs && rs.length){
					var newsPanel = buildNewsPanel(rs);
					
					pView.append(newsPanel);
					$('.flexslider', pView).flexslider({
					    animation: "slide"
					 });
				}
			},
			error : function(e){
				
			}
		});
	}
	
	function buildNewsPanel(newsItems){
		var newsPanelTemplate = '<div class="flexslider">' + 
								  '<ul class="slides">' + 
								  '</ul>' + 
								'</div>';
		
		var newsPanel = $(newsPanelTemplate);
		
		if(newsItems) {
			for(var i in newsItems){
				var newsItem = newsItems[i];
				
				var newsItemEle = $('<li><img /></li>');
				$('img', newsItemEle).attr('src', newsItem.imagePath);
				
				if(newsItem.caption){
					var p = $('<p>');
					p.addClass('flex-caption');
					
					var a = $('<a target="_blank">');
					a.html(newsItem.caption);
					a.attr('href', newsItem.detail);
					
					p.append(a);
					
					newsItemEle.append(p);
				}
				
				$('ul',newsPanel).append(newsItemEle);
				
			}
		}
		
		return newsPanel;
	}
	
	$.fn.extend({
		dgtNews : function(options){
			
			var setting = $.extend(true, {}, defaults, options);
			
			return this.each(function(){
				var ele = $(this);
				
				getDataFromServer(ele, setting);
			});
		}
	});
})(jQuery);