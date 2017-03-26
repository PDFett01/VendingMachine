$(document).ready(function(){
	loadQuantities();

	$("#make-purchase").click(function(event) {
		var messagebox = $('#message-box')


		$.ajax({
			type: 'GET',
			url: 'http://localhost:8080/money/' + $('#demo').text() +'/item/' + $('#item-box').text(),
			success: function(data, status) {
			 
			 	var quarters = data.quarters;
			 	var dimes = data.dimes;
			 	var nickels = data.nickels;


	 			$('#change-box')
	 				.empty()
            		.append($('<p> Quarters:' + quarters + '</p>'))
            		.append($('<p> Dimes:' + dimes + '</p>'))
            		.append($('<p> Nickles:' + nickels + '</p>'));


			

				$('#message-box')
								.empty()
								.append($('<p> Thank You!!! </p>'))

				$('#demo').empty().append('<br/>');
				amountEntered = 0;
				$('#item-box').empty().append('<br/>');
				clearQuanities();
				loadQuantities();



			},
			error: function(data, status) {
			 $.each(data, function(index, item) { 
			 	var messageToPrint = item.message;
			 	if(messageToPrint != undefined){
			 			$('#message-box')
			 				.empty()
	                		.append($('<p>' + messageToPrint + '</p>'));
			 	}

			 })	

	        }
		})

	});

	

});

var amountEntered = 0;

function addMoney (amount) {
	amountEntered += amount;
	$('#demo').empty().append(amountEntered.toFixed(2));
}


function itemWanted(id) {
	$('#item-box').empty().append(id);
}

function returnChange() {
	$('#change-box').empty().append('<br/><br/><br/>');
	$('#message-box').empty().append('<br/>');

	console.log(((2.15 * 100)/(25)).toString().charAt(0));
	console.log( (((2.15 * 100)%25)/10).toString().charAt(0)  );
	console.log( ((((2.15 * 100)%25)%10)/5).toString().charAt(0)  );
}

function loadQuantities() {
	clearQuanities();


	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/items',
		success: function(data, status) {
			$.each(data, function(index, item) {
				var quantity = item.quantity;
				var idToBeCalled = "#quantity-container" + (index + 1);
				
				var row = '<p> Quantity Left:' + quantity + '</p>';

				$(idToBeCalled).append(row);

			})
		}
	});
}

function clearQuanities(){
	$('.quantity-class').empty();
}