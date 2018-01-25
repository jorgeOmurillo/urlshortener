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
        $('#url-result').html('<a id="myLink" href="' + data.url + '">' + data.url + '</a> <button class="btn btn-default" type="button" id="copy-button" data-toggle="tooltip" data-placement="button" title="Copiar">Copiar</button>');
        $('#url').val("");
    } else {
        $('#url-result').text("No ingresaste un URL."); 
    }

}

$(document).ready(function() {
	//Initialize the tooltip.
	$('#copy-button').tooltip();
	
	// When the copy button is clicked, select the value of the hyperlink, attempt
	// to execute the copy command, and trigger event to update tooltip message
	// to indicate whether the text was successfully copied.
	$('#copy-button').bind('click', function() {
		var input = document.querySelector('#myLink');
console.log("created input variable");
		input.setSelectionRange(0, input.value.length + 1);
		try {
			var success = document.execCommand('copy');
			if (success) {
				$('#copy-button').trigger('copied', ['Copiado!']);
			} else {
				$('#copy-button').trigger('copied', ['Copiar con Ctrl-c']);
			}
		} catch (err) {
			$('#copy-button').trigger('copied', ['Copia con Ctrl-c']);
		}
	});

	// Handler for updating the tooltip message.
	$('#copy-button').bind('copied', function(event, message) {
		$(this).attr('title', message)
			.tooltip('fixTitle')
			.tooltip('show')
			.attr('title', "Copiar URL")
			.tooltip('fixTitle');
	});
});
