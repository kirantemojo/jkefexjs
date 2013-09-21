self.addEventListener('message',function(e){
	self.postMessage(e.data + " JKefex HTML5 Rocking Web Worker Demo <hr /> <h6>Your Web Worker ran Successfully</h6>");
},false);