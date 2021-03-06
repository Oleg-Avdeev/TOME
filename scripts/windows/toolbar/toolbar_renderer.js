class ToolbarRenderer {
	
	constructor (projectRenderer) {
		
		this.projectRenderer = projectRenderer;

		this.toolbar = document.createElement('div');
		this.toolbar.classList.add('toolbar');
		
		this.list = document.createElement('ul');
		this.list.classList.add('toolbar-list');

		this.toolbar.appendChild(this.list);
		this.items = [];
	}

	initialize() {
		
		this.list.innerHTML = null;
		this.createProjectBrowserButton();
		this.createTransformModeButton();
		
		document.getElementById('editor').appendChild(this.toolbar);
	}

	createProjectBrowserButton() {
		
		let icon = document.createElement('img');
		icon.src = './styles/icons/document.svg';
		icon.classList.add('toolbar-button');

		icon.onclick = () => this.projectRenderer.toggle();
		
		this.list.appendChild(icon);
	}

	createTransformModeButton() {
		
		let icon = document.createElement('img');
		icon.src = './styles/icons/transform.svg';
		icon.classList.add('toolbar-button');

		icon.onclick = () => EditorMode.toggleMode('transform');
		
		EditorMode.currentMode.bind('transformToggle', mode => {
			if (mode === 'transform') icon.classList.add('active');
			else icon.classList.remove('active');
		});
		
		this.list.appendChild(icon);
	}
}