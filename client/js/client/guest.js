//ckelner setImgThumbNail defunct... not sure why we don't need it
// timeline view... guest image rezie
function setImgThumbNail(){
	jQuery.fn.nailthumb.defaults.method = 'resize';
	jQuery('.guestThumbTimeline').nailthumb();
	jQuery('.guestThumbTimelineModal').nailthumb({fitDirection:'top left'});
}
//reset no guest image
function setNoGuestImg(){
	// timeout needed... thanks to default jasny bootstrap
	$("#addGuestPhoto").html("<img src='/guests_photos/no_image.gif' />");
}
function guestPhotoUpload(){
	if(isErrorWithGuestData(false)){
		// abort
		console.log("there was an error - abort");
		return;
	}else{
		addGuestModalSetup();
		filepicker.store($("#guestPhotoInput")[0], function(FPFile){
	            guestDBSave(FPFile.url);
	        }, function(FPError){
	        	$("#guestAddPhotoUploadPlsWait").hide();
	        	$("#guestAddPhotoUploadBadMsg").show();
	        	$("#guestAddPhotoUploadBadMsg").html("Something went wrong with upload!");
	            photoMissingOrUploadErr(FPError);
	        }, function(progress){
	        	$("#guestAddPhotoUploadProgressBar").css("width",progress+"%");
	        }
	   );
	}
}
function addGuestModalSetup(){
	$('#addGuestModalDiv').modal();
	$("#guestAddPhotoUploadPlsWait").show();
	$("#guestAddPhotoUploadBadMsg").hide();
	$("#guestAddPhotoUploadGoodMsg").hide();
	$("#guestAddPhotoUploadProgressBar").css("width","0%");
}
function addGuestSuccesfulModalAction(){
	$("#guestAddPhotoUploadPlsWait").hide();
	$("#guestAddPhotoUploadGoodMsg").show();
	$("#guestAddPhotoUploadGoodMsg").html("Upload & save successful!");
	$('#addGuestModalDiv').on('hide',function(){
		addGuestClearData();
	});
}
function addGuestClearData(){
	$("#addGPname").val("");
	$("#addGPhone").val("");
	$("#addGuestTitle").val("");
	$("#addGuestFname").val("");
	$("#addGuestLname").val("");
	$("#addGuestPCRStatusSelect").val("");
	$("#addGuestATime").val("");
	$("#addGuestADate").val("");
	$("#guestAddSexMale").val("");
	$("#addGuestImportantCheck").val("");
	$("#addGuestNotes").val("");
	$("#addGuestRemoveImgBtn").trigger('click');
	$("#guestAddSexUnknown")[0].checked=true;
	$("#guestAddSexMale")[0].checked=false;
	$("#guestAddSexFemale")[0].checked=false;
	$("#addGuestImportantCheck")[0].checked=false;
	setDateTool();
	setTimeTool();
}
function guestDBSave(photoUrl){
	var firstname=$("#addGuestFname").val();
	var lastname=$("#addGuestLname").val();
	var pcStat=$("#addGuestPCRStatusSelect").val();
	var aTime=$("#addGuestATime").val();
	aTime=formatTimeForDB(aTime);
	var aDate=$("#addGuestADate").val();
	var imp=getGuestImportant();
	var photo=photoUrl;
	var note=$("#addGuestNotes").val();
	var pronounce=$("#addGPname").val("");
	var gphone=$("#addGPhone").val("");
	var gtitle=$("#addGuestTitle").val("");
	Guests.insert({
		fname: firstname,
		lname: lastname,
		pcrStatus: pcStat,
		arrivaltime: aTime,
		arrivaldate: aDate,
		arrive: false,
		important: imp,
		notes: note,
		img: photo,
		pname: pronounce,
		title: gtitle,
		phone: gphone,
		type: 'complete',
		timestamp: (new Date()).getTime()+Meteor.uuid()
    });
    addGuestSuccesfulModalAction();
}
function getGuestImportant(){
	if($("#addGuestImportantCheck").is(':checked')){
		return true;
	}else{
		return false;
	}
}
function editGuestData(gImg){
	if(isErrorWithGuestData(true)){
		// abort
		console.log("there was an error - abort");
		return;
	}else{
		$('#addGuestModalDiv').modal();
		$("#guestAddPhotoUploadPlsWait").show();
		$("#guestAddPhotoUploadBadMsg").hide();
		$("#guestAddPhotoUploadGoodMsg").hide();
		$("#guestAddPhotoUploadProgressBar").css("width","0%");
		if($("#guestPhotoInput")[0].files.length>0){
			filepicker.store($("#guestPhotoInput")[0], function(FPFile){
		            guestEditDBSave(FPFile.url,true);
		        }, function(FPError){
		        	$("#guestAddPhotoUploadPlsWait").hide();
		        	$("#guestAddPhotoUploadBadMsg").show();
		            $("#guestAddPhotoUploadBadMsg").html("Something went wrong with upload!");
		            photoMissingOrUploadErr(FPError);
		        }, function(progress){
		        	$("#guestAddPhotoUploadProgressBar").css("width",progress+"%");
		        }
		   );
		}else{
			$("#guestAddPhotoUploadPlsWait").html("Please wait while we  "+
				"save changes to the database");
			guestEditDBSave(gImg,false);
		}
	}
}
function guestEditDBSave(photoUrl,uploaded){
	var firstname=$("#addGuestFname").val();
	var lastname=$("#addGuestLname").val();
	//var pcrNum=$("#addGuestPCR").val();
	var pcStat=$("#addGuestPCRStatusSelect").val();
	var aTime=$("#addGuestATime").val();
	aTime=formatTimeForDB(aTime);
	var aDate=$("#addGuestADate").val();
	var pronounce=$("#addGPname").val();
	var gphone=$("#addGPhone").val();
	var gtitle=$("#addGuestTitle").val();
	var imp=getGuestImportant();
	var photo=photoUrl;
	var note=$("#addGuestNotes").val();
	Guests.update({timestamp: getURLParameter("ts")},{$set:{
		fname: firstname,
		lname: lastname,
		pcrStatus: pcStat,
		arrivaltime: aTime,
		arrivaldate: aDate,
		important: imp,
		notes: note,
		img: photo,
		pname: pronounce,
		title: gtitle,
		phone: gphone,
    }});
	$("#guestAddPhotoUploadPlsWait").hide();
	$("#guestAddPhotoUploadGoodMsg").show();
	if(uploaded){
		$("#guestAddPhotoUploadGoodMsg").html("Upload & save successful!");
	}else{
		$("#guestAddPhotoUploadProgressBar").css("width","100%");
		$("#guestAddPhotoUploadGoodMsg").html("Save successful!");
	}
}
function photoMissingOrUploadErr(err){
	console.log(err);
	$('#addGuestModalDiv').modal('hide');
	$('#addGuestPhotoControlGrp').addClass('error');
	var helpDiv=$('#addGuestPhotoHelpErr');
	helpDiv.css('display','block');
	helpDiv.css('visibility','visible');
}
function isErrorWithGuestData(isEditMode){
	hideAllErrorMsg();
	var isErr=false;
	var isErrCur=false;
	//var pcrNum=$("#addGuestPCR").val();
	if(!isEditMode){
		if($("#guestPhotoInput")[0].files.length<1){
			photoMissingOrUploadErr('no detected photo');
			isErrCur=true;
		}
		if(isErrCur===true){
			isErr=isErrCur;
		}
	}
	isErrCur=firstNameDataErrTest();
	if(isErrCur===true){
		isErr=isErrCur;
	}
	isErrCur=lastNameDataErrTest();
	if(isErrCur===true){
		isErr=isErrCur;
	}
	isErrCur=aTimeDataErrTest();
	if(isErrCur===true){
		isErr=isErrCur;
	}
	isErrCur=aDateDataErrTest();
	if(isErrCur===true){
		isErr=isErrCur;
	}
	isErrCur=noteDataErrTest();
	if(isErrCur===true){
		isErr=isErrCur;
	}
	isErrCur=pcrStatusDataErrTest();
	if(isErrCur===true){
		isErr=isErrCur;
	}
	isErrCur=aGTitleDataErrTest();
	if(isErrCur===true){
		isErr=isErrCur;
	}
	isErrCur=pNameDataErrTest();
	if(isErrCur===true){
		isErr=isErrCur;
	}
	isErrCur=gPhoneDataErrTest();
	if(isErrCur===true){
		isErr=isErrCur;
	}
	//do this
	setTimeTool();
	return isErr;
}
function aGTitleDataErrTest(){
	var gTit=$("#addGuestTitle").val();
	var isErr=false;
	if(gTit==="Not selected"){
		gTitErr('blank');
		isErr=true;
	}
	return isErr;
}
function firstNameDataErrTest(){
	var firstname=$("#addGuestFname").val();
	var isErr=false;
	if(firstname.length<1){
		firstNameErr('blank');
		isErr=true;
	}else if(!(/^[a-zA-Z'-]+$/.test(firstname))){
		firstNameErr('badchar');
		isErr=true;
	}
	if(firstname.length>30){
		firstNameErr('toolong');
		isErr=true;
	}
	if(isErr===false){
		hideErrorFName();
	}
	return isErr;
}
function lastNameDataErrTest(){
	var lastname=$("#addGuestLname").val();
	var isErr=false;
	if(lastname.length<1){
		lastNameErr('blank');
		isErr=true;
	}else if(!(/^[a-zA-Z'-]+$/.test(lastname))){
		lastNameErr('badchar');
		isErr=true;
	}
	if(lastname.length>30){
		lastNameErr('toolong');
		isErr=true;
	}
	if(isErr===false){
		hideErrorLName();
	}
	return isErr;
}
function aTimeDataErrTest(){
	var aTime=$("#addGuestATime").val();
	var isErr=false;
	if(aTime===""){
		ArrivalTimeErr('blank');
		isErr=true;
	}else if(!(/^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/.test(aTime))){
		ArrivalTimeErr('format');
		isErr=true;
	}
	if(isErr===false){
		hideErrorATime();
	}
	return isErr;
}
function aDateDataErrTest(){
	var aDate=$("#addGuestADate").val();
	var isErr=false;
	if(aDate===""){
		ArrivalDateErr('blank');
		isErr=true;
	}else if(!(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(aDate))){
		ArrivalDateErr('format');
		isErr=true;
	}
	if(isErr===false){
		hideErrorADate();
	}
	return isErr;
}
function noteDataErrTest(){
	var notes=$("#addGuestNotes").val();
	var isErr=false;
	if(notes.length>200){
		NotesErr('toolong');
		isErr=true;
	}
	if(isErr===false){
		hideErrorNotes();
	}
	return isErr;
}
function pcrStatusDataErrTest(){
	var pcStat=$("#addGuestPCRStatusSelect").val();
	var isErr=false;
	if(pcStat==="Not selected"){
		pcStatErr('notselected');
		isErr=true;
	}
	if(isErr===false){
		hideErrorPcStat();
	}
	return isErr;
}
function hideErrorGTit(){
	$('#addGuestTitleControlGrp').removeClass('error');
	$('#addGuestTitleHelpErrBlank').hide();
}
function hideErrorFName(){
	$('#addGuestFNameControlGrp').removeClass('error');
	$('#addGuestFNameHelpErrBlank').hide();
	$('#addGuestFNameHelpErrBad').hide();
	$('#addGuestFNameHelpErrTooLong').hide();
}
function hideErrorLName(){
	$('#addGuestLNameControlGrp').removeClass('error');
	$('#addGuestLNameHelpErrBlank').hide();
	$('#addGuestLNameHelpErrBad').hide();
	$('#addGuestLNameHelpErrTooLong').hide()
}
function hideErrorATime(){
	$('#addGuestATimeControlGrp').removeClass('error');
	$('#addGuestATimeHelpErrFormat').hide();
	$('#addGuestATimeHelpErrBlank').hide();
}
function hideErrorADate(){
	$('#addGuestADateControlGrp').removeClass('error');
	$('#addGuestADateHelpErrFormat').hide();
	$('#addGuestADateHelpErrBlank').hide();
}
function hideErrorNotes(){
	$('#addGuestNotesControlGrp').removeClass('error');
	$('#addGuestNotesHelpErr').hide();
}
function hideErrorPcStat(){
	$('#addGuestPcStatControlGrp').removeClass('error');
	$('#addGuestPcStatHelpErr').hide();
}
function hideAllErrorMsg(){
	hideErrorFName();
	hideErrorLName();
	hideErrorATime();
	hideErrorADate();
	hideErrorNotes();
	hideErrorGTit();
	hideErrorPcStat();
	hideErrorGPhoneGA();
	$('#addGuestPhotoControlGrp').removeClass('error');
	//$('#addGuestPCRControlGrp').removeClass('error');
	$('#addGuestPhotoHelpErr').hide();
	/*$('#addGuestPCRHelpErrBad').hide();
	$('#addGuestPCRHelpErrShort').hide();
	$('#addGuestPCRHelpErrLong').hide();
	$('#addGuestPCRHelpErrStart').hide();*/
}
function gTitErr(err){
	$('#addGuestTitleControlGrp').addClass('error');
	if(err==='blank'){
		var helpDiv=$('#addGuestTitleHelpErrBlank');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}
}
function firstNameErr(err){
	$('#addGuestFNameControlGrp').addClass('error');
	if(err==='blank'){
		var helpDiv=$('#addGuestFNameHelpErrBlank');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}else if(err==='toolong'){
		var helpDiv=$('#addGuestFNameHelpErrTooLong');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}else{
		var helpDiv=$('#addGuestFNameHelpErrBad');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}
}
function lastNameErr(err){
	$('#addGuestLNameControlGrp').addClass('error');
	if(err==='blank'){
		var helpDiv=$('#addGuestLNameHelpErrBlank');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}else if(err==='toolong'){
		var helpDiv=$('#addGuestLNameHelpErrTooLong');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}else{
		var helpDiv=$('#addGuestLNameHelpErrBad');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}
}
function pcrNumErr(err){
	$('#addGuestPCRControlGrp').addClass('error');
	if(err==='toolong'){
		var helpDiv=$('#addGuestPCRHelpErrLong');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}else if(err==='tooshort'){
		var helpDiv=$('#addGuestPCRHelpErrShort');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}
	if(err==='badchar'){
		var helpDiv=$('#addGuestPCRHelpErrBad');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}
	if(err==='startnine'){
		var helpDiv=$('#addGuestPCRHelpErrStart');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}
}
function ArrivalTimeErr(err){
	$('#addGuestATimeControlGrp').addClass('error');
	if(err==='format'){
		var helpDiv=$('#addGuestATimeHelpErrFormat');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}
	if(err==='blank'){
		var helpDiv=$('#addGuestATimeHelpErrBlank');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}
}
function ArrivalDateErr(err){
	$('#addGuestADateControlGrp').addClass('error');
	if(err==='format'){
		var helpDiv=$('#addGuestADateHelpErrFormat');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}
	if(err==='blank'){
		var helpDiv=$('#addGuestADateHelpErrBlank');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}
}
function NotesErr(err){
	$('#addGuestNotesControlGrp').addClass('error');
	if(err==='toolong'){
		var helpDiv=$('#addGuestNotesHelpErr');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}
}
function pcStatErr(err){
	$('#addGuestPcStatControlGrp').addClass('error');
	if(err==='notselected'){
		var helpDiv=$('#addGuestPcStatHelpErr');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}
}
function pNameDataErrTest(){
	var lastnameP=$("#addGPname").val();
	var isErr=false;
	if(!(/^[a-zA-Z'-]+$/.test(lastnameP))){
		if(lastnameP.length>0){
			pNameErr('badchar');
			isErr=true;
		}
	}
	if(lastnameP.length>40){
		pNameErr('toolong');
		isErr=true;
	}
	if(isErr===false){
		hideErrorPName();
	}
	return isErr;
}
function pNameErr(err){
	$('#addGPNameControlGrp').addClass('error');
	if(err==='toolong'){
		var helpDiv=$('#addGPNameHelpErrTooLong');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}else{
		var helpDiv=$('#addGPNameHelpErrBad');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}
}
function hideErrorPName(){
	$('#addGPNameControlGrp').removeClass('error');
	$('#addGPNameHelpErrBlank').hide();
	$('#addGPNameHelpErrBad').hide();
	$('#addGPNameHelpErrTooLong').hide()
}
function gPhoneDataErrTest(){
	var gPhone=$("#addGPhone").val();
	var isErr=false;
	if(gPhone.length<1){
		gPhoneErr('blank');
		isErr=true;
	}else if(!(/^\d+$/.test(gPhone))){
		gPhoneErr('badchar');
		isErr=true;
	}
	if(gPhone.length>15){
		gPhoneErr('toolong');
		isErr=true;
	}
	if(gPhone.length>1&&gPhone.length<11){
		gPhoneErr('tooshort');
		isErr=true;
	}
	if(isErr===false){
		hideErrorGPhone();
	}
	return isErr;
}
function gPhoneErr(err){
	$('#addGCellPhoneControlGrp').addClass('error');
	if(err==='blank'){
		var helpDiv=$('#addGPhoneHelpErrBlank');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}else if(err==='toolong'){
		var helpDiv=$('#addGPhoneHelpErrTooLong');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}else if(err==='tooshort'){
		var helpDiv=$('#addGPhoneHelpErrTooShort');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}else{
		var helpDiv=$('#addGPhoneHelpErrBad');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}
}
function hideErrorGPhone(){
	$('#addGCellPhoneControlGrp').removeClass('error');
	$('#addGPhoneHelpErrBlank').hide();
	$('#addGPhoneHelpErrBad').hide();
	$('#addGPhoneHelpErrTooLong').hide()
	$('#addGPhoneHelpErrTooShort').hide()
}
function formatTimeForDB(deTime){
	var mTime=moment(deTime, "hh:mm a");
	return mTime.format("HH:mm");
}
