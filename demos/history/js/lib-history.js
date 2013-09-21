var HistoryView = { 
	init:function(){
		var self = this;
		$('div>ul>li').on('click','a',function(e){
			e.preventDefault();
			self.templ(this);
			self.updateHistroy(this);
		});
	},
	templ:function(temp){
		var template = $('#template').html().replace(/{{title}}/g,temp.title).replace(/{{src}}/g,temp.href);
		$('#content').html(template);
	},
	updateHistroy:function(data){
		var datastore = { "tit": data.dataset.state ,"title": data.title ,"href": data.href};
		history.pushState(datastore, data.title, data.href);
	},
	handleState:function(){
		var self = this;
		$(window).bind('popstate',function(e){
			if(e.originalEvent.state)
			{
				self.templ(e.originalEvent.state);	
			}
		});
	}
};