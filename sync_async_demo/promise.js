const p = new Promise((resolve, reject) => {
	setTimeout( () => {
		// resolve(1);
		reject(new Error('some message'))
	})
})

p.then(res => console.log(res))
 .catch(err => console.log('ERROR:', err.message))	