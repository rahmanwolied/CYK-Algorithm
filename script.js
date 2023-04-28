document.addEventListener('DOMContentLoaded', function () {
	const inputContainer = document.getElementById('grammar');

	inputContainer.addEventListener('keydown', function (event) {
		var field = event.target;
		var parent = field.parentElement;
		if (field.classList.contains('value') && event.key === '|') {
			event.preventDefault();
			const newInput = document.createElement('input');
			const orSymbol = document.createElement('div');
			newInput.type = 'text';
			newInput.classList.add('value');
			newInput.classList.add('form-control');
			orSymbol.innerHTML = '|';
			orSymbol.classList.add('input-group-text');
			parent.appendChild(orSymbol);
			parent.appendChild(newInput);
			newInput.focus();
		}

		if (field.classList.contains('value') && event.key === 'Enter') {
			event.preventDefault();
			var addbtn = document.getElementById('add');
			addbtn.click();
		}

		if (field.classList.contains('value') && event.key === 'Backspace' && field.value === '') {
			if (parent.querySelectorAll('.value').length > 1) {
				event.preventDefault();
				field.previousElementSibling.remove();
				field.previousElementSibling.focus();
				field.remove();
			}
		}
	});

	const addButton = document.getElementById('add');

	addButton.addEventListener('click', (event) => {
		event.preventDefault();
		const rowDiv = document.createElement('div');
		rowDiv.classList.add('grammar-row');
		rowDiv.classList.add('input-group');

		var variableInput = document.createElement('input');
		variableInput.type = 'text';
		variableInput.maxLength = 1;
		variableInput.classList.add('variable');
		variableInput.classList.add('form-control');
		rowDiv.appendChild(variableInput);

		var arrow = document.createElement('div');
		arrow.innerHTML = '→';
		arrow.classList.add('input-group-text');
		rowDiv.appendChild(arrow);

		var valueInput = document.createElement('input');
		valueInput.type = 'text';
		valueInput.classList.add('value');
		valueInput.classList.add('form-control');
		rowDiv.appendChild(valueInput);

		inputContainer.insertBefore(rowDiv, addButton);
		variableInput.focus();
	});
});
