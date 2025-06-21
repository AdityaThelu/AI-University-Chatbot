/* --------------------- GET STATES FROM COUNTRY ID ------------------------ */
jQuery(function ($) {
	//console.log("test");
	$("select.country_auto").change(function () {
		var form = (this).closest("form");
		//console.log(form);
		if ($(this).closest("form").find("select.state_auto").length > 0) {
			var cnt = $(form).find("select.country_auto").children("option:selected").attr('data-id');
			//console.log(cnt);
			$(form).find("select.state_auto").html('<option value="0001" data-id="0001">Loading...</option>');
			$(form).find("select.city_auto").html('<option value="0" data-id="0">Select City</option>');
			if (cnt == '0') {
				$(form).find("select.state_auto").html('<option value="0">Select State</option>');
				return false;
			}
			jQuery.ajax({
				url: tc_csca_auto_ajax.ajax_url,
				type: 'post',
				dataType: "json",
				data: { action: "tc_csca_get_states", nonce_ajax: tc_csca_auto_ajax.nonce, cnt: cnt },
				success: function (response) {
					//console.log(response);
					if (response.length > 0) {
						$(form).find("select.state_auto").html('<option value="0" data-id="0">Select State</option>');
						for (i = 0; i < response.length; i++) {
							var st_id = response[i]['id'];
							var st_name = response[i]['name'];
							var opt = "<option data-id='" + st_id + "' value='" + st_name + "'>" + st_name + "</option>";
							$(form).find("select.state_auto").append(opt);
						}
					}
					else {
						$(form).find("select.state_auto").html('');
						var opt = "<option value='0'>State List Not Found</option>";
						$(form).find("select.state_auto").append(opt);
						console.log("State List Not Found");
					}
				}
			});

		}
	});
	
	/* --------------------- GET CITIES ------------------------ */

	$("select.state_auto").change(function () {
		var form = (this).closest("form");
		//console.log(form);
		if ($(this).closest("form").find("select.city_auto").length > 0) {
			var sid = $(form).find("select.state_auto").children("option:selected").attr('data-id');
			//console.log(sid);
			$(form).find("select.city_auto").html('<option value="0001" data-id="0001">Loading...</option>');
			if (sid == '0') {
				$(form).find("select.city_auto").html('<option value="0" data-id="0">Select City</option>');
				return false;
				//return rv;
			}
			jQuery.ajax({
				url: tc_csca_auto_ajax.ajax_url,
				type: 'post',
				dataType: "json",
				data: { action: "tc_csca_get_cities", nonce_ajax: tc_csca_auto_ajax.nonce, sid: sid },
				success: function (response) {
					if (response.length > 0) {
						$(form).find("select.city_auto").html('<option value="0" data-id="0">Select City</option>');
						for (i = 0; i < response.length; i++) {
							var ct_id = response[i]['id'];
							var ct_name = response[i]['name'];
							var opt = "<option value='" + ct_name + "' data-id='" + ct_id + "'>" + ct_name + "</option>";
							$(form).find("select.city_auto").append(opt);
						}
					} else {
						$(form).find("select.city_auto").html('');
						var opt = "<option value='0'>City List Not Found</option>";
						$(form).find("select.city_auto").append(opt);
						console.log("City List Not Found");
					}
				}
			});
		}
	});
});