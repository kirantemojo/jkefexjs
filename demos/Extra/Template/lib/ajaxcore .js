var ajaxcore = function(){
	
};

ajaxcore.prototype.coreGetPost = function(url,method,elemId){
	var xhr;
	if(window.XMLHttpRequest)
	{
		xhr = new XMLHttpRequest();
	}
	else
	{
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	xhr.onreadystatechange = function()
	{
		if(xhr.readyState == 4 && xhr.status == 200)
		{
			document.getElementById(elemId).innerHTML = JSON.parse(xhr.responseText)[1];
		}
	};
	xhr.open(method,url,true);
	xhr.send();
}