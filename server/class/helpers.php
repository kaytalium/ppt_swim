<?php


function isAvailable($value,$obj){
	return array_key_exists($value, $obj);
}

function sendMail($arg=array()){    
  $mailer = new SendEmail();
  $mailer->handleInput($arg);    
}