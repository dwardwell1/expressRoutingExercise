const express = require('express');
const ExpressError = require('./expressError');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/mean', function(req, res, next) {
	try {
		const nums = req.query.nums.split`,`.map((x) => +x);
		console.log(nums);
		if (nums.length == 1 && nums[0] == 0) {
			throw new ExpressError('Nums are required', 400);
		} else {
			for (i = 0; i < nums.length; i++) {
				let num = nums[i];
				console.log(num);
				if (typeof num != 'number' || isNaN(parseFloat(num))) {
					console.log('error');
					console.log(num[i]);
					throw new ExpressError('Please Only Include Numbers', 400);
				}
			}
		}
		return res.status(200).json({ operation: 'mean', value: `${average(nums)}` });
	} catch (e) {
		next(e);
	}
});

app.get('/median', function(req, res, next) {
	try {
		const nums = req.query.nums.split`,`.map((x) => +x);
		console.log(nums);
		if (nums.length == 1 && nums[0] == 0) {
			throw new ExpressError('Nums are required', 400);
		} else {
			for (i = 0; i < nums.length; i++) {
				let num = nums[i];
				console.log(num);
				if (typeof num != 'number' || isNaN(parseFloat(num))) {
					console.log('error');
					console.log(num[i]);
					throw new ExpressError('Please Only Include Numbers', 400);
				}
			}
		}
		return res.status(200).json({ operation: 'median', value: `${median(nums)}` });
	} catch (e) {
		next(e);
	}
});

app.get('/mode', function(req, res, next) {
	try {
		const nums = req.query.nums.split`,`.map((x) => +x);
		console.log(nums);
		if (nums.length == 1 && nums[0] == 0) {
			throw new ExpressError('Nums are required', 400);
		} else {
			for (i = 0; i < nums.length; i++) {
				let num = nums[i];
				console.log(num);
				if (typeof num != 'number' || isNaN(parseFloat(num))) {
					console.log('error');
					console.log(num[i]);
					throw new ExpressError('Please Only Include Numbers', 400);
				}
			}
		}
		return res.status(200).json({ operation: 'mode', value: `${mode(nums)}` });
	} catch (e) {
		next(e);
	}
});

app.use(function(err, req, res, next) {
	//Note the 4 parameters!
	// the default status is 500 Internal Server Error
	let status = err.status || 500;
	let message = err.msg;

	// set the status and alert the user
	return res.status(status).json({
		error: { message, status }
	});
});

app.listen(3000, function() {
	console.log('app on port 3000');
});

function median(values) {
	if (values.length === 0) return 0;

	values.sort(function(a, b) {
		return a - b;
	});

	var half = Math.floor(values.length / 2);

	if (values.length % 2) return values[half];

	return (values[half - 1] + values[half]) / 2.0;
}

const mode = (arr) => {
	if (arr.filter((x, index) => arr.indexOf(x) == index).length == arr.length) return arr;
	else
		return mode(
			arr
				.sort((x, index) => x - index)
				.map((x, index) => (arr.indexOf(x) != index ? x : null))
				.filter((x) => x != null)
		);
};

let average = (array) => array.reduce((a, b) => a + b) / array.length;
