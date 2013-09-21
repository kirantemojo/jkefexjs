var moduleHistory = function(){

};

moduleHistory.prototype.init = function() {
	var self = this;
	$('div>ul>li').on('click','a',function(e){
		e.preventDefault();
		self.templ(this);
		self.updateHistroy(this);
	});
};

moduleHistory.prototype.templ = function(temp) {
	var template = $('#template').html().replace(/{{title}}/g,temp.title).replace(/{{src}}/g,temp.href);
	$('#content').html(template);
};

moduleHistory.prototype.updateHistroy = function(data) {
	var datastore = { "tit": data.dataset.state ,"title": data.title ,"href": data.href};
						history.pushState(datastore, data.title, data.href);
};

moduleHistory.prototype.handleState = function(){
	var self = this;
	$(window).bind('popstate',function(e){
		if(e.originalEvent.state)
		{
			self.templ(e.originalEvent.state);	
		}
	});
};