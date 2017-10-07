<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
//tickets
$tid = $request->tid;
$newcomment = $request->newcomment;
//devices
$deviceid=$request->did;
$dserial=$request->serial;
$dstatus=$request->status;
//students
$studentid=$request->studentid;
$sfname=$request->fname;
$slname=$request->lname;
$susername=$request->username;
$sgrade=$request->grade;
$shomeroom=$request->homeroom;
$sipadnum=$request->ipadnum;
if($sipadnum===''|| empty($sipadnum)){
	$sipadnum= "NULL";
}
//update device status from ticket
$updeviceid=$request->updid;
$updstatus=$request->upstatus;
//close ticket
$close=$request->close;
$tid=$request->tid;

include 'pdo.php';
//add new comment to ticket
if(isset($newcomment) && $newcomment!= ''){
    $comsql ="INSERT INTO `ip2`.`comments_maintenance` (`ticket_id`, `comment`, `date`) VALUES ('".$tid."', '".$newcomment."', CURRENT_TIMESTAMP);";
    $stmtcom = $pdo->prepare ($comsql);
    $stmtcom->execute();
    echo $comsql;
}
//update device
if(isset($deviceid) && $deviceid!=''){
	$upddevice ="INSERT INTO `iPads` (`iPad #`, `Serial Number`, `Status`) VALUES ('".$deviceid."', '".$dserial."', '".$dstatus."') ON DUPLICATE KEY UPDATE `iPad #`=VALUES(`iPad #`), `Serial Number`=VALUES(`Serial Number`), `Status`=VALUES(`Status`)";
	$stmup = $pdo->prepare ($upddevice);
	$stmup->execute();
	echo $upddevice;
}
//update student
if(isset($studentid) && $studentid!=''){
	$updstudent ="INSERT INTO `students14_15` (`Student ID`, `First Name`, `Last Name`, `Username`, `Grade`,`Homeroom`, `iPad #`) VALUES ('".$studentid."', '".$sfname."', '".$slname."', '".$susername."', '".$sgrade."', '".$shomeroom."', ".$sipadnum.") ON DUPLICATE KEY UPDATE `Student ID`=VALUES(`Student ID`), `First Name`=VALUES(`First Name`), `Last Name`=VALUES(`Last Name`), `Username`=VALUES(`Username`), `Grade`=VALUES(`Grade`), `Homeroom`=VALUES(`Homeroom`), `iPad #`=VALUES(`iPad #`)";
	$stmup = $pdo->prepare ($updstudent);
	$stmup->execute();
	echo $updstudent;
}
//update device status
if(isset($updeviceid) && $updeviceid!='' && isset($updstatus) && $updstatus!=''){
	$statsql ="UPDATE `iPads` SET `Status` = ".$updstatus." WHERE `iPad #` = ".$updeviceid;
	$statstmt =$pdo->prepare ($statsql);
	$statstmt->execute();
	echo $statsql;
}
//close ticket
if (isset($tid) && isset($close)){
	if ($close) {
		$openclose = 0;
	}else{
		$openclose = 1;
	}
	$closesql="UPDATE `maintenance` SET `open` = ".$openclose." WHERE `ticket_id` = ".$tid;
	$closestmt=$pdo->prepare ($closesql);
	$closestmt->execute();
	echo $closesql;
}