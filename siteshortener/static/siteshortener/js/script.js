$(function() {
	$('#submitButton').click(function() {
		$.ajax({
			type: "POST",
			url: "/makeshort/",
			data: {
				'url' : $('#url').val(),
				'csrfmiddlewaretoken' : $("input[name=csrfmiddlewaretoken]").val()
			},
			success: returnSuccess,
			dataType: 'json'
		});
	});
});

function returnSuccess(data, textStatus, jqXHR) {
	if(data.url) {
		$('#url-result').html('<a id="myLink" href="' + data.url + '">' + data.url + '</a><button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="button" id="copy-button" title="Copiar"><svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 24 24"><path d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" /></svg></button>');
		//$(document).ready(function() {
			//$('#copy-button').tooltip();
			//$('#copy-button').bind('click', function() {
				//var input = document.getElementById('myLink').innerHTML;
				//console.log(input);
				//try {
					//var success = document.execCommand('copy');
					//if (success) {
						//$('#copy-button').trigger('copied', ['¡Copiado!']);
					//} else {
						//$('#copy-button').trigger('copied', ['Copiar con Ctrl-c']);
					//}
				//} catch (err) {
					//$('#copy-button').trigger('copied', ['Copiar con Ctrl-c']);
				//}
			//});

			//$('#copy-button').bind('copied', function(event, message) {
				//$(this).attr('title', message)
					//.tooltip('fixTitle')
					//.tooltip('show')
					//.attr('title', "¡Copiar!")
					//.tooltip('fixTitle');
			//});
		//});
		
		$(document).ready(function() {
			$('#copy-button').tooltip();
			$('#copy-button').bind('click', function() {
				var input = document.getElementById('myLink').innerHTML;
				var aux = document.createElement("input");

				aux.setAttribute("value", input);
				document.body.appendChild(aux);
				aux.select();
				try {
					var success = document.execCommand('copy');
					if (success) {
						$('#copy-button').trigger('copied', ['¡Copiado!']);
						document.body.removeChild(aux);
					} else {
						$('#copy-button').trigger('copied', ['Copiar con Ctrl-c']);
					}
				} catch (err) {
					$('#copy-button').trigger('copied', ['Copiar con Ctrl-c']);
				}
			});

			$('#copy-button').bind('copied', function(event, message) {
				$(this).attr('title', message)
					.tooltip('fixTitle')
					.tooltip('show')
					.attr('title', "¡Copiar!")
					.tooltip('fixTitle');
			});
		});
		$('#url').val("");
	} else {
		$('#url-result').text("No ingresaste un URL."); 
	}

}
