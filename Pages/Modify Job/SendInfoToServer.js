




// **** left off here **** //

// modifies the job with the data given //
function modifyJobOnClick(companyName, jobId){

	let confirmOk = confirm("Are you sure you want to modify this job?");
	if(confirmOk){
		var batch = db.batch();

		var mainUpdate = db.collection('companies').doc(companyName).collection('jobs').doc(jobId);
		batch.update(mainUpdate, {"name": modifyJobNameTextField.value, 
								"address": modifyJobAddressTextField.value,
								"location": new firebase.firestore.GeoPoint(parseFloat(modifyJobLongitudeTextField.value),parseFloat(modifyJobLatitudeTextField.value)),
								"notes": modifyJobNotes.value});

		var addedArr = resultsOfCheckingDifferencesInArrays["updatedToAdd"];
		var deletedArr = resultsOfCheckingDifferencesInArrays["originalsToDelete"];

		for(var i in addedArr){
			var employeesUpdate = db.collection('companies').doc(companyName).collection('employees').doc(addedArr[i]);
			batch.update(employeesUpdate, {"jobs": firebase.firestore.FieldValue.arrayUnion(jobId)});

			batch.update(mainUpdate, {"employees": firebase.firestore.FieldValue.arrayUnion(addedArr[i])} );
		}

		for(var j in deletedArr){
			var employeesDelete = db.collection('companies').doc(companyName).collection('employees').doc(deletedArr[j]);
			batch.update(employeesDelete, {"jobs": firebase.firestore.FieldValue.arrayRemove(jobId)});

			batch.update(mainUpdate, {"employees": firebase.firestore.FieldValue.arrayRemove(deletedArr[j])} );
		}

		console.log("added arr " + addedArr.length);
		console.log("deleted arr " + deletedArr.length);

		/*
		batch.commit().then(function(){
			modifyJobModal.style.display = "none";
		});
		*/
	}
}


function deleteButtonOnClick(companyName, jobId, dictionaryOfEmployeesForThisJob){
let confirmOk = confirm("Are you sure you want to delete this job?");
	if(confirmOk){
		var batch = db.batch();

		var deleteFromJob = db.collection('companies').doc(companyName).collection('jobs').doc(jobId);
		batch.delete(deleteFromJob);

		for(var j in dictionaryOfEmployeesForThisJob){
			var deleteFromEmployee = db.collection('companies').doc(companyName).collection('employees').doc(dictionaryOfEmployeesForThisJob[j]);
			batch.update(deleteFromEmployee, {"jobs": firebase.firestore.FieldValue.arrayRemove(jobId)});
		}

		batch.commit().then(function(){
			modifyJobModal.style.display = "none";
		});
	}
}