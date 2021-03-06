class TreeBorkLine { 
	
	constructor(node1, node2) {
		
		let direction = node1.x >= 0 ? 1 : -1;

		let offsetX = 0;
		let shoulder = direction * (this.calculateMinShoulder(node1, node2) + offsetX);

		let shorten = direction * 17;
		let offset = ((node2.x + node1.x + node1.y + node2.y) % 9);

		const a = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		const b = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		const c = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		
		a.setAttribute('x1', node1.x + shorten);
		a.setAttribute('x2', node1.x + shoulder + offset);
		a.setAttribute('y1', node1.y + offset);
		a.setAttribute('y2', node1.y + offset);
		a.classList.add('line');

		b.setAttribute('x1', node1.x + shoulder + offset);
		b.setAttribute('x2', node1.x + shoulder + offset);
		b.setAttribute('y1', node1.y + offset);
		b.setAttribute('y2', node2.y - offset);
		b.classList.add('line');

		c.setAttribute('x1', node1.x + shoulder + offset);
		c.setAttribute('x2', node2.x + shorten);
		c.setAttribute('y1', node2.y - offset);
		c.setAttribute('y2', node2.y - offset);
		c.classList.add('connector');

		this.group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		this.group.appendChild(a);
		this.group.appendChild(b);
		this.group.appendChild(c);
		return this.group;
	}

	calculateMinShoulder(node1, node2, direction) {
		let min = Math.min(node1.depth, node2.depth);
		let max = Math.max(node1.depth, node2.depth);
		let maxWidth = 0;
		
		for (let i = min; i < max; i++)
		{
			let width = depthMap.get(i)
				.filter(n => !n.isPhantom)
				.map(n => n.x)
				.reduce((x1, x2) => direction * x1 < direction * x2 ? x1 : x2);
			
			if (width > maxWidth)
				maxWidth = width;
		}
		
		let maxOffset = Math.abs(maxWidth + xOffset);
		let currentOffset = Math.abs(node1.x + xOffset * 0.5);
		let shoulder = maxOffset - currentOffset;

		if (Math.abs(shoulder) < 40)
			shoulder = 40;

		return shoulder;
	}

	destroy() {
		if (this.group && this.group.parentNode)
			this.group.parentNode.removeChild(this.group);
	}
}