document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	//Send==========================================================================
	async function formSend(e) {
		e.preventDefault();
		console.log('!!!');

		let error = formValidate(form);

		let formData = new FormData(form);
		formData.append('file', formFile.files[0]);

		if (error === 0) {
			form.classList.add('_sending');
			let response = await fetch('https://httpbin.org/post', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				let result = await response.json();
				console.log(result)
				alert(result.data);
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert("some error")
				form.classList.remove('_sending');
			}

		} else {
			alert('Заполните все поля')
		}
	}
	//==============================================================================

	//Validate======================================================================
	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let i = 0; i < formReq.length; i++) {
			const input = formReq[i];
			console.log(i)
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else {
				if (input.value === '') {
					formAddError(input);
					error;
				}
			}
		}
		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}

	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	//==============================================================================

	//Email test====================================================================
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
	//==============================================================================

	//Attach========================================================================
	const formFile = document.getElementById('formFile');
	const formPreview = document.getElementById('formPreview');

	formFile.addEventListener('change', () => {
		uploadFile(formFile.files[0]);
	});

	function uploadFile(file) {
		if (file.size > 10 * 1024 * 1024) {
			alert('Файл должен быть не более 10мб');
			return;
		}
		let reader = new FileReader();
		reader.onload = function (e) {
			formPreview.innerHTML = `<div>OK</div>`;
		}
		reader.onerror = function (e) {
			alert(e)
		}
		reader.readAsDataURL(file);
	}

	//==============================================================================
});