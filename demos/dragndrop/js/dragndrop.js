var moduledragndrop = function(elem){
	function handleDragStart(e)
	{
		dragElem = this;
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData('text/html',this.innerHTML);
	}
	function handleDragEnter()
	{
		this.classList.add('over');
	}
	function handleDragOver(e)
	{
		if(e.preventDefault)
		{
			e.preventDefault();
		}
		e.dataTransfer.dropEffect = "move";
	}
	function handleDragLeave()
	{
		this.classList.add('over');
	}
	function dragend()
	{
		this.classList.remove('over');
	}
	function handleDrop(e)
	{
		if(e.stopPropagation)
		{
			e.stopPropagation();
		}
		if(dragElem != this)
		{
			dragElem.innerHTML = this.innerHTML;
			this.innerHTML = e.dataTransfer.getData('text/html');
		}
		return false;
	}
	var cols = document.querySelectorAll(elem);
	[].forEach.call(cols,function(col){
		col.addEventListener('dragstart', handleDragStart, false);
		col.addEventListener('dragenter', handleDragEnter, false);
		col.addEventListener('dragover', handleDragOver, false);
		col.addEventListener('dragleave', handleDragLeave, false);
		col.addEventListener('drop', handleDrop, false);
		col.addEventListener('dragend', dragend, false);
	});
};