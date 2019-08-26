const p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('First Resolved');
		// reject(new Error('Some Error Occurred ...'));
		resolve(1);
	}, 3000);
});

const p2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('Second Resolved');
		resolve(2);
	},2500)
})

Promise.race([p1,p2])
.then(res => console.log('Response', res))
.catch(err => console.log('ERROR:', err.message));