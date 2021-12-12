function dragElement(element, direction) {
	var md; // remember mouse down info
	const leftElement = document.getElementsByClassName('left')[0];
	const rightElement = document.getElementsByClassName('right')[0];
	const editorPanel = document.getElementsByClassName('editor')[0];

	element.onmousedown = onMouseDown;

	function onMouseDown(e) {

		md = {
			e,
			offsetLeft: element.offsetLeft,
			offsetTop: element.offsetTop,
			firstWidth: leftElement.offsetWidth,
			secondWidth: rightElement.offsetWidth
		};

		document.onmousemove = onMouseMove;
		document.onmouseup = () => {
			document.onmousemove = document.onmouseup = null;
		};
	}

	function onMouseMove(e) {

		var delta = {
			x: e.clientX - md.e.clientX,
			y: e.clientY - md.e.clientY
		};

		if (direction === 'H') // Horizontal
		{
			// Prevent negative-sized elements
			delta.x = Math.min(Math.max(delta.x, -md.firstWidth), md.secondWidth);
			
			leftElement.style.width = (md.firstWidth + delta.x) + 'px';
			rightElement.style.width = (editorPanel.clientWidth) - (element.clientWidth) - (md.firstWidth + delta.x) + 'px';
			element.style.left = leftElement.style.width;
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	dragElement(document.getElementById('splitter'), 'H');
});  