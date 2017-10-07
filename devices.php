<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'pdo.php';

$sql ="SELECT i.`iPad #`,i.`Serial Number` , s.* FROM iPads i, device_status s WHERE i.`Status`=s.`status_id`";
$stmt = $pdo->query($sql);
$outp = "";
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	if ($outp != "") {$outp .= ",";}
	$outp .= '{';
    $outp .= '"did":"'  . $row["iPad #"] . '",';
    $outp .= '"serial":"'  . $row["Serial Number"] . '",';
    $outp .= '"statusid":"'  . $row["status_id"] . '",';
    $outp .= '"status":"'  . $row["status"] . '"}';
}
$outp ='{"records":['.$outp.'], "sql": "'.$sql.'"}';
echo($outp);