// Get data

function getDataForm(formNode) {
	return new FormData(formNode)
}

async function registrSubmit(event) {
	event.preventDefault()
	const data = getDataForm(event.target)

	Loader()

	const { status, error } = await sendData(data)
	Loader()

	if (status === 200) {
		onSuccess(event.target)
		const currentUrl = window.location.protocol + '//' + window.location.host;
		location.replace(currentUrl + '../registration/index_subscribe.html')
		return { status: 200 }
	} else {
		onError(error)
	}
}

const registrationsForm = document.getElementById('signup')
registrationsForm.addEventListener('submit', registrSubmit)


// Send data

async function sendData(data) {
	return await fetch('https://jsonplaceholder.typicode.com/todos/1')
	.then(response => response.json())
	.then(json => console.log(json))
}


// Sending...

function Loader() {
	const loader = document.getElementById('loader')
	loader.classList.toggle('hidden')
}

function onSuccess(formNode) {
	alert('Ihre Bewerbung wurde versendet!')
	formNode.classList.toggle('hidden')
}

// Error

function onError(error) {
	alert(error.message)
}

// Check Validity

function checkValidity(event) {
	const formNode = event.target.form
	const isValid = formNode.checkValidity()

	formNode.querySelector('button').disabled = !isValid
}

registrationsForm.addEventListener('input', checkValidity)








