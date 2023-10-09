import { getTip } from './functions';

const body = document.querySelector('body');

const setup = () => {
	const container = buildElement('div', { id: 'container' });
	const inputContainer = buildBillContainer();
	const tipContainer = buildTipContainer();
	const resultContainer = buildResultContainer();
	container.append(inputContainer, tipContainer, resultContainer);
	body.append(container);
	addBillListener();
};

const buildResultContainer = () => {
	const container = buildElement('div', { id: 'result-container', className: 'container' });
	container.style.display = 'none';
	return container;
};

const buildBillContainer = () => {
	const billContainer = buildElement('div', { id: 'bill-container', className: 'container' });
	const prompt = buildElement('h3', { id: 'bill-prompt', textContent: 'How much is the bill?' });
	const billInput = buildElement('input', { id: 'bill-input', placeholder: 'Enter bill amount...' });
	const submitButton = buildElement('button', {
		id: 'bill-submit',
		className: 'btn-submit',
		textContent: 'Submit'
	});

	billContainer.append(prompt, billInput, submitButton);
	return billContainer;
};

const buildTipContainer = () => {
	const tipContainer = buildElement('div', { id: 'tip-container', className: 'container' });
	const buttonsContainer = buildElement('div', { id: 'tip-buttons-container' });
	const tenPercent = buildElement('button', {
		id: 'ten-percent',
		className: 'btn-submit',
		textContent: '10%',
		value: '10'
	});
	const fifteenPercent = buildElement('button', {
		id: 'fifteen-percent',
		className: 'btn-submit',
		textContent: '15%',
		value: '15'
	});
	const twentyPercent = buildElement('button', {
		id: 'twenty-percent',
		className: 'btn-submit',
		textContent: '20%',
		value: '20'
	});
	buttonsContainer.append(tenPercent, fifteenPercent, twentyPercent);
	const inputContainer = buildElement('div', { id: 'tip-input-container', className: 'input-container' });
	const prompt = buildElement('h3', { id: 'tip-prompt', textContent: 'Custom amount?' });
	const tipInput = buildElement('input', { id: 'tip-input', placeholder: 'Enter tip amount...' });
	const submitButton = buildElement('button', {
		id: 'tip-submit',
		className: 'btn-submit',
		textContent: 'Submit'
	});
	inputContainer.append(prompt, tipInput, submitButton);
	tipContainer.append(buttonsContainer, inputContainer);
	tipContainer.style.display = 'none';
	return tipContainer;
};

const addBillListener = () => {
	const button = document.querySelector('#bill-submit');
	const input = document.querySelector('#bill-input');
	button.addEventListener('click', () => {
		const bill = input.value;
		if (bill) {
			switchToTipPercent();
			addTipListener(bill);
		}
	});
};

const addTipListener = (bill) => {
	addButtonListeners(bill);
	const button = document.querySelector('#tip-submit');
	const input = document.querySelector('#tip-input');
	button.addEventListener('click', () => {
		const tip = input.value;
		if (tip) {
			getTip(bill, tip);
		}
	});
};

const addButtonListeners = (bill) => {
	const ten = document.querySelector('#ten-percent');
	const fifteen = document.querySelector('#fifteen-percent');
	const twenty = document.querySelector('#twenty-percent');
	const buttons = [ten, fifteen, twenty];
	for (const button of buttons) {
		button.addEventListener('click', () => {
			const tip = Number.parseFloat(button.value);
			getTip(bill, tip);
		});
	}
};

const switchToTipPercent = () => {
	const billContainer = document.querySelector('#bill-container');
	billContainer.style.display = 'none';
	const tipContainer = document.querySelector('#tip-container');
	tipContainer.style.display = 'flex';
};

const displayResult = (result) => {
	const tipContainer = document.querySelector('#tip-container');
	tipContainer.style.display = 'none';
	const resultContainer = document.querySelector('#result-container');
	resultContainer.style.display = 'flex';
	let USD = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	});
	const billElement = buildElement('p', { id: 'result-bill', textContent: `Bill: ${USD.format(result.bill)}` });
	const tipElement = buildElement('p', {
		id: 'result-tip',
		textContent: `Tip: ${USD.format(result.tip)} (${result.tipPercent}%)`
	});
	const totalElement = buildElement('p', { id: 'result-total', textContent: `Total: ${USD.format(result.total)}` });
	resultContainer.append(billElement, tipElement, totalElement);
	return resultContainer;
};

const buildElement = (type, arguments_) => {
	const element = document.createElement(type);
	for (const key in arguments_) element[key] = arguments_[key];
	return element;
};

export { displayResult, setup };
