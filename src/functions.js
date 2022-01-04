const generateHashkey = () => {
	return (
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	);
}
const removeChildren = (parent) => {
	while (parent.lastChild) {
		parent.removeChild(parent.lastChild);
	}
};
const getPackageJSON = async() => {
  return await (await fetch("../package.json")).json();
};

function openFeedback() {
	createTab('https://github.com/JaydenDev/Catalyst/issues/new')	
}

function openGithub() {
	createTab('https://github.com/JaydenDev/Catalyst')
}