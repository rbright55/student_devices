<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'pdo.php';

$sql ="SELECT * FROM `device_status`";
$stmt = $pdo->query($sql);
$outp = "";
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	if ($outp != "") {$outp .= ",";}
	$outp .= '{';
    $outp .= '"statusid":"'  . $row["status_id"] . '",';
    $outp .= '"status":"'  . $row["status"] . '",';
    $outp .= '"description":"'  . $row["description"] . '"}';
}
$outp ='{"records":['.$outp.'], "sql": "'.$sql.'"}';
echo($outp);