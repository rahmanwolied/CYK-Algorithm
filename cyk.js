document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('submit').onclick = function (e) {
		e.preventDefault();
		var table = document.getElementById('table');
		resetTable(table);
		var rules = getGrammar();
		var string = document.querySelector('#string').value;
		var tableArray = new Array(string.length);

		for (let i = 0; i < string.length; i++) {
			tableArray[i] = new Array(string.length - i);
		}

		var set;

		for (let i = 0; i < string.length; i++) {
			set = [];
			for (const key in rules) {
				var rule = rules[key];
				if (rule.includes(string[i])) {
					set.push(key);
				}
			}
			tableArray[0][i] = set;
		}

		for (let i = 1; i < string.length; i++) {
			for (let j = 0; j < string.length - i; j++) {
				var climber = 0;
				var union = [];
				console.log(`for ${i} and ${j}`);
				while (climber < i) {
					var up = tableArray[climber][j];
					var diagonal = tableArray[i - (climber + 1)][j + climber + 1];

					console.log(up);
					console.log(diagonal);

					var concatination = (function (up, diagonal) {
						var arr = [];
						for (let i = 0; i < up.length; i++) {
							for (let j = 0; j < diagonal.length; j++) {
								var conc = up[i] + diagonal[j];
								arr.push(conc);
							}
						}
						return arr;
					})(up, diagonal);

					console.log('conc: ' + concatination);
					for (let i in concatination) {
						union.push(concatination[i]);
					}

					climber++;
				}
				console.log('union: ' + union);
				set = [];
				union.forEach((item) => {
					for (const key in rules) {
						var rule = rules[key];
						if (rule.includes(item)) {
							if (!set.includes(key)) {
								set.push(key);
							}
						}
					}
				});
				tableArray[i][j] = set;
				console.log('set:' + set);
			}
		}
		console.table(tableArray);
		var success;
		if (tableArray[tableArray.length - 1][0].includes('S')) {
			success = true;
		} else {
			success = false;
		}
		drawTable(tableArray, table, success);
		displayWord(string);
	};
});

function drawTable(tableArray, table, success) {
	for (let i = tableArray.length - 1; i >= 0; i--) {
		var row = table.insertRow();
		for (let j = 0; j < tableArray[i].length; j++) {
			var cell = row.insertCell(j);
			if (tableArray[i][j] !== undefined) {
				var set = tableArray[i][j];
				cell.innerHTML = '{' + set.join(', ') + '}';
			} else {
				cell.innerHTML = '';
			}
		}
	}
	var alertDiv = document.createElement('div');
	alertDiv.classList.add('alert');
	if (success) {
		table.classList.add('table-success');
		table.classList.remove('table-danger');

		alertDiv.classList.add('alert-success');
		alertDiv.classList.remove('alert-danger');
		alertDiv.innerHTML = 'The given string can be derived from this grammar';
	} else {
		table.classList.add('table-danger');
		table.classList.remove('table-success');

		alertDiv.classList.remove('alert-success');
		alertDiv.classList.add('alert-danger');
		alertDiv.innerHTML = 'The given string can NOT be derived from this grammar';
	}
	table.parentElement.classList.add('active');
	table.parentElement.parentElement.appendChild(alertDiv);
}

function displayWord(string) {
	var wordRow = table.insertRow();
	wordRow.classList.add('word-row');
	for (let i in string) {
		var letter = wordRow.insertCell(i);
		letter.innerHTML = string[i];
		letter.classList.add('word-cell');
		// letter.classList.add('table-light');
		// wordRow.innerHTML += `<td> ${string[i]} </td>`;
	}
}

function resetTable(table) {
	while (table.rows.length > 0) {
		table.deleteRow(0);
	}
	var alert = document.querySelector('.alert');
	if (alert) {
		alert.remove();
	}
}

function getGrammar() {
	var rules = {};
	var rows = document.querySelectorAll('.grammar-row');
	rows.forEach((row) => {
		var rowValues = [];
		var variable = row.querySelector('.variable').value;
		var values = row.querySelectorAll('.value');
		values.forEach((value) => {
			rowValues.push(value.value);
		});
		rules[variable] = rowValues;
	});
	console.log('Rules: ' + JSON.stringify(rules));
	return rules;
}
