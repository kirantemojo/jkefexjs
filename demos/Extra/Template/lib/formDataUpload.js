var formDataUpload = function(){
	var input = document.getElementById("images"), 
		formdata = false;

	function showUploadedItem (source) {
  		var list = document.getElementById("image-list"),
	  		li   = document.createElement("li"),
	  		img  = document.createElement("img");
  		img.src = source;
  		li.appendChild(img);
		list.appendChild(li);
	}   

	if (window.FormData) {
  		formdata = new FormData();
  		document.getElementById("btn").style.display = "none";
	}

 	input.addEventListener("change", function (evt) {
 		document.getElementById("response").innerHTML = "Uploading . . ."
 		var i = 0, len = this.files.length, img, reader, file;
		if(len <= 3)
		{
			for ( ; i < len; i++ ) {
				file = this.files[i];

				if (!!file.type.match(/image.*/)) {
					if ( window.FileReader ) {
						reader = new FileReader();
						reader.onloadend = function (e) { 
							showUploadedItem(e.target.result, file.fileName);
						};
						reader.readAsDataURL(file);
					}
					if (formdata) {
						formdata.append("images[]", file);
					}
				}	
			}
			if (formdata) {
				$.ajax({
					url: uri,
					type: "POST",
					data: formdata,
					processData: false,
					contentType: false,
					success: function (res) {
						document.getElementById("response").innerHTML = res; 
					}
				});
			}
		}
		else
		{
			alert('Please Select only 3 Files');
		}
	}, false);	
};