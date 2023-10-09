import { displayResult } from './html-elements';

const getTip = (bill, tip) => {
	bill = Number(bill);
	tip = Number(tip);
	const tipPercent = tip / 100;
	const amountToTip = bill * tipPercent;
	const total = bill + amountToTip;
	const result = {
		bill: bill,
		tip: amountToTip,
		tipPercent: tip,
		total: total
	};
	displayResult(result);
};

export { getTip };
