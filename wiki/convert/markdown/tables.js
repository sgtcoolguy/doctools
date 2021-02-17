'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const indexOf = Array.prototype.indexOf;
const every = Array.prototype.every;
const rules = {};

rules.tableCell = {
	filter: [ 'th', 'td' ],
	replacement: function (content, node) {
		return cell(content, node);
	}
};

rules.tableRow = {
	filter: 'tr',
	replacement: function (content, node) {
		let borderCells = '';
		const alignMap = { left: ':--', right: '--:', center: ':-:' };

		if (isHeadingRow(node)) {
			for (let i = 0; i < node.childNodes.length; i++) {
				let border = '---';
				const align = (
					node.childNodes[i].getAttribute('align') || ''
				).toLowerCase();

				if (align) {
					border = alignMap[align] || border;
				}

				borderCells += cell(border, node.childNodes[i]);
			}
		}
		return '\n' + content + (borderCells ? '\n' + borderCells : '');
	}
};

rules.table = {
	// Only convert tables with a heading row.
	// Tables with no heading row are kept using `keep` (see below).
	filter: function (node) {
		return node.nodeName === 'TABLE' && isHeadingRow(node.rows[0]);
	},

	replacement: function (content) {
	// Ensure there are no blank lines
		content = content.replace('\n\n', '\n');
		return '\n\n' + content + '\n\n';
	}
};

rules.tableSection = {
	filter: [ 'thead', 'tbody', 'tfoot' ],
	replacement: content => content
};

// A tr is a heading row if:
// - the parent is a THEAD
// - or if its the first child of the TABLE or the first TBODY (possibly
//   following a blank THEAD)
// - and every cell is a TH OR is a TD with first child P containing first child STRONG
function isHeadingRow (tr) {
	const parentNode = tr.parentNode;
	if (parentNode.nodeName === 'THEAD') {
		return true;
	}
	// this isn't the first child (row)
	if (parentNode.firstChild !== tr) {
		return false;
	}
	// parent must be TABLE or first TBODY
	if (parentNode.nodeName !== 'TABLE' && !isFirstTbody(parentNode)) {
		return false;
	}
	// every child in the row must be either TH, or a TD w/ child P > STRONG
	return every.call(tr.childNodes, n => {
		return n.nodeName === 'TH' || (n.nodeName === 'TD' && n.firstChild.nodeName === 'P' && n.firstChild.firstChild.nodeName === 'STRONG');
	});
}

function isFirstTbody (element) {
	const parent = element.parentNode;
	const tbodies = parent.childNodes.filter(n => n.nodeName === 'TBODY');
	if (tbodies.length < 1) {
		return false;
	}
	return tbodies[0] === element;
}

function cell (content, node) {
	const index = indexOf.call(node.parentNode.childNodes, node);
	let prefix = ' ';
	if (index === 0) {
		prefix = '| ';
	}
	return prefix + content + ' |';
}

function tables (turndownService) {
	turndownService.keep(function (node) {
		return node.nodeName === 'TABLE' && !isHeadingRow(node.rows[0]);
	});
	for (let key in rules) {
		turndownService.addRule(key, rules[key]);
	}
}

exports.tables = tables;
