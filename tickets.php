<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'pdo.php';



//get tickets and information
$sql="SELECT m.*,i.`Status`, (SELECT date FROM comments_maintenance cm WHERE m.`ticket_id`=cm.`ticket_id` ORDER BY date LIMIT 1) as date, (SELECT COUNT(*) FROM comments_maintenance cm WHERE m.`ticket_id`=cm.`ticket_id`) as commentsnum, Concat(s.`First Name`,' ', s.`Last Name`) AS `Student Name` FROM `maintenance` m, `students14_15` s, `iPads` i WHERE m.`student_id`=s.`Student ID` and i.`iPad #`=m.`ipad_id` and m.`open`=".$_GET['opentics']." ORDER BY `ticket_id` DESC";
$stmt = $pdo->query($sql);
$outp = "";
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	if ($outp != "") {$outp .= ",";}
	$outp .= '{';
    $outp .= '"Ticketnum":"'  . $row["ticket_id"] . '",';
    $outp .= '"open":"'  . $row["open"] . '",';
    $outp .= '"date":"'  . date("F j, Y, g:i a", strtotime($row["date"])) . '",';
    $outp .= '"iPadnum":"'  . $row["ipad_id"] . '",';
    $outp .= '"status":"'  . $row["Status"] . '",';
    $outp .= '"student":"'  . $row["Student Name"] . '",';
    $outp .= '"commentsnum":"'  . $row["commentsnum"] . '",';
    	$csql="SELECT `date`,`comment` FROM `comments_maintenance` WHERE `ticket_id`=".$row["ticket_id"]." ORDER BY date DESC";
    	$cstmt = $pdo->query($csql);
    	$cmt= "";
    	while($crow = $cstmt->fetch(PDO::FETCH_ASSOC)) {
    		if ($cmt != "") {$cmt .= ",";}
			$cmt .= '{';
		    $cmt .= '"date":"'  . date("F j, Y, g:i a", strtotime($crow["date"])) . '",';
		    $cmt .= '"comment":"'  . $crow["comment"] . '"}';
    	}
    $outp .='"comments":['.$cmt.']'. '}';
}
$outp ='{"records":['.$outp.'], "sql": "'.$sql.'", "csql": "'.$csql.'"}';
echo($outp);