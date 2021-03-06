// **** this is for the modal view variables **** //
var modifyEmployeeSpan = document.getElementsByClassName("modifyEmployeeModalClose")[0];
var modifyEmployeeModal = document.getElementById('modify-employee-modal-box');

// **** this is for the modify data section **** //
var employee;

var modifyButton = document.getElementById("modify-button");

var modifyFirst = document.getElementById("modify-first-name-text");
var modifyLast = document.getElementById("modify-last-name-text");
var modifyEmail = document.getElementById("modify-email-text");
var modifyPhone = document.getElementById("modify-phone-text");
var modifyEmployeeNumber = document.getElementById("modify-employee-Number-text");

var listOfJobsForThisEmployee = [];

var arrayOfJobs = [];

var firstModified = false;
var lastModified = false;
var emailModified = false;
var phoneModified = false;
var employeeNumberModified = false;

// checking if the user has logged in //
window.addEventListener('DOMContentLoaded', function () {

	createButton.disabled = true;
	
}, false);


modifyEmployeeSpan.onclick = function(){
	modifyEmployeeModal.style.display = "none";
}


// **** closing the modal view is handled through window-onclick.js **** //


// **** when the user clicks on an employee, a new modal view will come up **** //
function listItemOnClick(item){	
	// get the employee info from the main array of employees //
	for(var r = 0; r < listOfEmployees.length; r++){
		if(listOfEmployees[r].employeeNumber == item.id){
			employee = listOfEmployees[r];
		}
	}

	modifyButton.disabled = true;
	
	modifyEmail.value = employee.email;

	modifyFirst.value = employee.first;
	modifyLast.value = employee.last;
	modifyEmail.value = employee.email;
	modifyPhone.value = employee.phone;
	modifyEmployeeNumber.value = employee.employeeNumber;

	
	$("#jobs-attached-to-listview-div ul").empty();

	

	bringUpEmployeeJobsByUniqueId(employee.uniqueId);
	modifyEmployeeModal.style.display = "block";
}


function modifyFirstNameTextChange(){
	if(modifyFirst.value != employee.first){
		firstModified = true;
	}else{
		firstModified = false;
	}
	toggleModifyButton();
}

function modifyLastNameTextChange(){
	if(modifyLast.value != employee.last){
		lastModified = true;
	}else{
		lastModified = false;
	}
	toggleModifyButton();
}

function modifyEmailTextChange(){
	if(modifyEmail.value != employee.email){
		emailModified = true;
	}else{
		emailModified = false;
	}
	toggleModifyButton();
}

function modifyPhoneTextChange(){
	if(modifyPhone.value != employee.phone){
		phoneModified = true;
	}else{
		phoneModified = false;
	}
	toggleModifyButton();
}

function modifyEmployeeNumberTextChange(){
	if(modifyEmployeeNumber.value != employee.employeeNumber){
		employeeNumberModified = true;
	}else{
		employeeNumberModified = false;
	}
	toggleModifyButton();
}


function toggleModifyButton(){
	if(firstModified == true || lastModified == true || emailModified == true || phoneModified == true || employeeNumberModified == true){
		modifyButton.disabled = false;
	}else{
		modifyButton.disabled = true;
	}
}

function bringUpEmployeeJobsByUniqueId(uId){
	listOfJobsForThisEmployee = [];

	var emailRef = db.collection('companies').doc(companyName).collection('employees').doc(uId);
	emailRef.onSnapshot(function(doc){
		if(doc.data() != undefined){
			var dataArray = doc.data();

		
			arrayOfJobs = dataArray["jobs"];
		
			for(var i in arrayOfJobs){
			
				var jobRef = db.collection('companies').doc(companyName).collection('jobs').doc(arrayOfJobs[i]);
				jobRef.get().then(function(doc){

					var data = doc.data();

					if(data.name != undefined && data.address != undefined && data.employees != undefined && data.date != undefined){
						var newJob = new Jobs();
						newJob.name = data.name;
						newJob.address = data.address;
						newJob.employees = data.employees;
						newJob.date = data.date;
						newJob.id = doc.id;
			
						listOfJobsForThisEmployee.push(newJob);
					}
					parseJobList(listOfJobsForThisEmployee);
				}).catch(function(error){
			
				});	
			}
		}
	});
}



















function parseJobList(list){
	$("#jobs-attached-to-listview-div ul").empty();

	for(var i = 0; i < list.length; i++){
		var _name = list[i].name;
		var _address = list[i].address;
		var _employees = list[i].employees;
		var _date = list[i].date;
		var replaceWhiteSpaceWithDash = _address.replace(/ /g, "-");

		$("#jobs-attached-to-listview-div ul").append('<li id=job-' + replaceWhiteSpaceWithDash + ' onclick="mainJobListOnClick(this)"><a href="#"><h2>' + _name + '</h2><p><strong>' + _address + '</strong></p><p class="ui-li-aside"><strong>' + _date + '</strong></p></a></li>');
	}

	$("#jobs-attached-to-listview-div ul").listview('refresh');
}



function modifyOnClick(){

	let confirmOk = confirm("Are you sure you want to modify this employee?");
	if(confirmOk){
		var batch = db.batch();

		var updateEmployeeAtEmployees = db.collection('companies').doc(companyName).collection('employees').doc(employee.uniqueId);
		batch.update(updateEmployeeAtEmployees, {"first": modifyFirst.value,
												"last": modifyLast.value,
												"email": modifyEmail.value,
												"phoneNumber": parseInt(modifyPhone.value, 10),
												"employeeNumber": parseInt(modifyEmployeeNumber.value, 10),
												"status": false});

		batch.commit().then(function(){
			modifyEmployeeModal.style.display = "none";
		});
	}
}



function deleteOnClick(){
	
	let confirmOk = confirm("Are you sure you want to delete this employee?");
	if(confirmOk){

		var batch = db.batch();
		var deleteFromEmployeeRef = db.collection('companies').doc(companyName).collection('employees').doc(employee.uniqueId);
		batch.delete(deleteFromEmployeeRef);

		for(var i in listOfJobsForThisEmployee){
			var deleteFromJobRef = db.collection('companies').doc(companyName).collection('jobs').doc(listOfJobsForThisEmployee[i].id);
			batch.update(deleteFromJobRef, {"employees": firebase.firestore.FieldValue.arrayRemove(employee.uniqueId)} );
		}

		batch.commit().then(function(){
			modifyEmployeeModal.style.display = "none";
		});

	}
}




