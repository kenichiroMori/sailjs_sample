$(document).ready(function(){

	// Validate
	// http://bassistance.de/jquery-plugins/jquery-plugin-validation/
	// http://docs.jquery.com/Plugins/Validation/
	// http://docs.jquery.com/Plugins/Validation/validate#toptions
		$('#sign-up-form').validate({
		rules: {
			name: {
				required: true
			},
			email: {
				email: true
			},
			bet_A1: {
				required: true
			},
			bet_A2: {
				required: true
			},
			bet_B1: {
				required: true
			},
			bet_B2: {
				required: true
			},
			bet_C1: {
				required: true
			},
			bet_C2: {
				required: true
			},
			bet_D1: {
				required: true
			},
			bet_D2: {
				required: true
			},
			bet_E1: {
				required: true
			},
			bet_E2: {
				required: true
			},
			bet_F1: {
				required: true
			},
			bet_F2: {
				required: true
			},
			bet_G1: {
				required: true
			},
			bet_G2: {
				required: true
			},
			bet_H1: {
				required: true
			},
			bet_H2: {
				required: true
			},
		},
		success: function(element) {
			element
			.text('OK!').addClass('valid')
		}
	  });

});
