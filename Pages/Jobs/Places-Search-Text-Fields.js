
var _addressTextChanged = false;
var _longitudeChanged = false;
var _latitudeChanged = false;


var revertButton = document.getElementById("revert-button");


window.addEventListener('DOMContentLoaded', function () {
	revertButton.disabled = true;
}, false);


function modifyAddressTextChange(){
	if(jobAddressTextField.value != job.address){
		_addressTextChanged = true;
	}else{
		_addressTextChanged = false;
	}

	toggleSearchButton();
}


function modifyLongTextChange(){
	if(jobLongitudeTextField.value != locationLong){
		_longitudeChanged = true;
	}else{
		_longitudeChanged = false;
	}

	toggleSearchButton();
}




function modifyLatTextChange(){
	if(jobLatitudeTextField.value != locationLat){
		_latitudeChanged = true;
	}else{
		_latitudeChanged = false;
	}

	toggleSearchButton();
}


function toggleRevertButton(){

}



function revertButtonOnClick(){
	jobAddressTextField.value = job.address;
	jobLongitudeTextField.value = locationLong;
	jobLatitudeTextField.value = locationLat;
}



function toggleSearchButton(){


	// if we start typing in the search bar, I would like for the coordinates to disappear
}