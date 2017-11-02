<?php
$data = json_decode(file_get_contents('php://input'), true);
$d1 = new DateTime;
$d1->setTimezone(new DateTimezone($data['timezone']));
echo $d1->format($data['format']);
?>