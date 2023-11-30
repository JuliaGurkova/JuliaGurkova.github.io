// Get data

function getDataForm(formNode) {
	return new FormData(formNode)
}

// Send data

async function sendData(data) {
	return fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		headers: { 'Content-Type': 'multipart/form-data' },
		body: data,
	});
}


async function contuctSubmit(event) {
	try {
		event.preventDefault()
		const data = getDataForm(event.target)
		Loader()

		const response = await sendData(data);			
		Loader()		

		if (response.status === 200 || response.status === 201) {
			onSuccess(event.target)
			const currentUrl = window.location.protocol + '//' + window.location.host;
			location.replace(currentUrl + '/contactus/index_contsend.html')
			return { status: 200 }
		} else {
			onError("Something is wrong!");
		}
	} catch (error) {		
		onError(error.message)
	}
}

const contactusForm = document.getElementById('contactusform')
contactusForm.addEventListener('submit', contuctSubmit)




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

function onError(message) {
	alert(message)
}

// Check Validity

function checkValidity(event) {
	const formNode = event.target.form
	const isValid = formNode.checkValidity()

	formNode.querySelector('button').disabled = !isValid
}

contactusForm.addEventListener('input', checkValidity)








