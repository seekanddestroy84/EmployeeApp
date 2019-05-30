
var _addressTextChanged = false;
var _longitudeChanged = false;
var _latitudeChanged = false;


var revertButton = document.getElementById("revert-button");


window.addEventListener('DOMContentLoaded', function () {
	revertButton.disabled = true;
}, false);


function modifyAddressTextChange(){

	if(jobAddressTextField.value != job.address){
		jobLongitudeTextField.value = "";
		jobLatitudeTextField.value = "";
		modifySearchButton.disabled = false;
		_addressTextChanged = true;

	}else{
		jobLongitudeTextField.value = locationLong;
		jobLatitudeTextField.value = locationLat;
		modifySearchButton.disabled = true;
		_addressTextChanged = false;
	}
	toggleRevertButton();
}


function modifyLongTextChange(){
	if(jobLongitudeTextField.value != locationLong){

		jobAddressTextField.value = "";
		modifySearchButton.disabled = false;
		_longitudeChanged = true;
	}else{

		jobAddressTextField = job.address;
		modifySearchButton.disabled = true;
		_longitudeChanged = false;
	}
	

	//toggleSearchModifyButton();
	toggleRevertButton();
}




function modifyLatTextChange(){
	if(jobLatitudeTextField.value != locationLat){
		_latitudeChanged = true;
	}else{
		_latitudeChanged = false;
	}

	toggleSearchModifyButton();
	toggleRevertButton();
}


function toggleRevertButton(){
	if(jobAddressTextField.value != job.address || jobLongitudeTextField.value != locationLong || jobLatitudeTextField.value != locationLat){
		revertButton.disabled = false;
	}else{
		revertButton.disabled = true;
	}
}



function revertButtonOnClick(){
	jobAddressTextField.value = job.address;
	jobLongitudeTextField.value = locationLong;
	jobLatitudeTextField.value = locationLat;

	revertButton.disabled = true;
	modifySearchButton.disabled = true;
}





function toggleSearchModifyButton(){

}

function toggleJobModifyButton(){
	if(nameTextChanged == true || 
		_addressTextChanged == true || 
		employeeListChanged == true || 
		_latitudeChanged == true || 
		_longitudeChanged == true){

			modifyJobButton.disabled = false;
			
	}else{
		modifyJobButton.disabled = true;
	}
}