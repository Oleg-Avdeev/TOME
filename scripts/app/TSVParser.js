const parse = require('papaparse');
const actionsParser = require('./ActionParser');
const conditionsParser = require('./ConditionsParser');
const fs = require('fs');

exports.parseFile = function (file, callback) {

	fs.readFile(file.filePaths[0], 'utf-8', (er, data) => {
		if (er != null) return;
		parseTSV(data, callback);
	});
};

exports.parseTSV = function (tsv, callback) {
	return parseTSV(tsv, callback);
};

let parseTSV = function (data, callback) {

	let result = parse.parse(data, {
		delimiter: '\t',
		encoding: 'utf-8',
		header: true,
		trimHeaders: true,
	});

	let json = toTJSON(result);

	if (callback) 
		callback(json);
		
	return json;
};

let toTJSON = function (tsv) {
	let json = { 'Scenes': [] };

	let scene = { 'Id': '', 'Lines': [] };
	let lastCharacter = '';

	tsv.data.forEach(l => {
		if (l.Text == null || l.Text.length == 0)
			return;

		if (l.Scene == '')
			l.Scene = scene.Id;

		if (l.Character == '')
			l.Character = lastCharacter;
		else lastCharacter = l.Character;

		if (scene.Id == '')
			scene.Id = l.Scene;

		let line = {};
		var keys = Object.keys(l);
		keys.forEach(key => line[key] = l[key]);

		if (l.Scene != scene.Id) {
			json.Scenes.push(scene);
			scene = { 'Id': l.Scene, 'Lines': [] };
		}

		line.Actions = actionsParser.parse(l.Actions);
		line.Conditions = conditionsParser.ConditionParser.parse(l.Conditions);

		scene.Lines.push(line);
	});

	json.Scenes.push(scene);

	return json;
};