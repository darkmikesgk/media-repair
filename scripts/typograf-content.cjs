'use strict';

const fs = require('fs');
const path = require('path');
const Typograf = require('typograf');

const tp = new Typograf({ locale: ['ru', 'en-US'] });
tp.disableRule('ru/other/phone-number');
tp.enableRule('common/html/processingAttrs');
tp.setSetting('common/html/processingAttrs', 'attrs', [
	'title',
	'placeholder',
	'alt',
	'aria-label',
]);

function shouldSkipJsonString(s) {
	if (typeof s !== 'string' || !s) {
		return true;
	}
	if (s.startsWith('../')) {
		return true;
	}
	return false;
}

function processJsonBranch(val) {
	if (typeof val === 'string') {
		if (shouldSkipJsonString(val)) {
			return val;
		}
		return tp.execute(val);
	}
	if (Array.isArray(val)) {
		return val.map(processJsonBranch);
	}
	if (val !== null && typeof val === 'object') {
		const out = {};
		for (const k of Object.keys(val)) {
			out[k] = processJsonBranch(val[k]);
		}
		return out;
	}
	return val;
}

function processJsonFile(filePath) {
	const raw = fs.readFileSync(filePath, 'utf8');
	const endsWithNl = raw.endsWith('\n');
	const data = JSON.parse(raw);
	const out = processJsonBranch(data);
	let text = JSON.stringify(out, null, '\t');
	if (endsWithNl && !text.endsWith('\n')) {
		text += '\n';
	}
	fs.writeFileSync(filePath, text, 'utf8');
}

function processHtmlFile(filePath) {
	const raw = fs.readFileSync(filePath, 'utf8');
	fs.writeFileSync(filePath, tp.execute(raw), 'utf8');
}

const roots = [
	path.join(__dirname, '../src/pages'),
	path.join(__dirname, '../src/components'),
	path.join(__dirname, '../src/data'),
];

for (const dir of roots) {
	if (!fs.existsSync(dir)) {
		continue;
	}
	for (const name of fs.readdirSync(dir)) {
		const fp = path.join(dir, name);
		if (!fs.statSync(fp).isFile()) {
			continue;
		}
		if (name.endsWith('.html')) {
			processHtmlFile(fp);
		} else if (name.endsWith('.json')) {
			processJsonFile(fp);
		}
	}
}

console.log('Typograf: обработаны HTML и JSON в src/pages, src/components, src/data');
