var formdatacore = function(){
	var input = document.querySelector('input');
		input.addEventListener("change", function (evt) {

			var data = new FormData();
			for(var i = 0;i < input.files.length; ++i)
			{
				if(input.files[i].type.match(/image.*/))
				{
					file = input.files[i];
					data.append("images[]",file);
					console.log(file);
				}
				else
				{
					alert('Please upload Only Images');
				}
			}
			var xhr;
			if(window.XMLHttpRequest)
			{
				xhr = new XMLHttpRequest();
			}
			xhr.upload.addEventListener("progress",function(evt){
				if(event.lengthComputable)
				{
					var percent = (evt.loaded)/(evt.total);
					var progress = document.getElementById('upload_progress');
					while(progress.hasChildNodes())
					{
						progress.removeChild(progress.firstChild);
					}
					progress.appendChild(document.createTextNode(Math.round(percent*100)+"%"));
					console.log("completed");
				}
			},false);
			xhr.upload.addEventListener("load",function(){
				document.getElementById('upload_progress').textContent = "Completed";
				console.log("completed");
			},false);
			xhr.upload.addEventListener("error",function(){
				alert("Upload Failed");
				console.log("completed");
			},false);
			xhr.open('POST',uri);
			xhr.setRequestHeader('Cache-Control','no-cache');
			xhr.send(data);
		},false);	
};