// getUser(1, displayUser);

console.log('Before');
console.log('After');

// getUser(1)
// .then(user => getRepositories(user.gitUserName))
// .then(repos => console.log(repos))
// .catch(err => console.log('ERROR:', err.message));

async function displayAllRepos(){
	try{
			const user = await getUser(1);
			const repos = await getRepositories(user.gitUserName);
			console.log('Repos:', repos)
	}
	catch (err){
			console.log('ERROR', err.message);
	}
}

displayAllRepos();

// function displayrepos(repos){
// 	console.log(repos);
// }

// function displayUser(users){
// 	console.log(users);
// 	getRepositories(users.gitUserName, displayrepos);
// }

function getUser(id){
	return new Promise((resolve, reject) => {
		setTimeout(() => {
		// console.log('Reading user from database');
		resolve({ id:id, gitUserName:'rock' });
	}, 2000)
	})
}

function getRepositories(userName){
	return new Promise((resolve, reject) => {
		setTimeout(() => {
		// console.log('Reading repositories');
		resolve(['repo1', 'repo2', 'repo3']);
		// reject(new Error('Not Found'))
	}, 2000)
	})
}