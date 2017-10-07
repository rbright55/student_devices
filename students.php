<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'pdo.php';

$sql ="SELECT * FROM students14_15";
$stmt = $pdo->query($sql);
$outp = "";
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	if ($outp != "") {$outp .= ",";}
	$outp .= '{';
    $outp .= '"sid":"'  . $row["Student ID"] . '",';
    $outp .= '"fname":"'  . $row["First Name"] . '",';
    $outp .= '"lname":"'  . $row["Last Name"] . '",';
    $outp .= '"username":"'  . $row["Username"] . '",';
    $outp .= '"grade":"'  . $row["Grade"] . '",';
    $outp .= '"hroom":"'  . $row["Homeroom"] . '",';
    $outp .= '"ipadnum":"'  . $row["iPad #"] . '"}';
}
$outp ='{"records":['.$outp.'], "sql": "'.$sql.'"}';
echo($outp);