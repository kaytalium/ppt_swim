<?php

/**
  * This fn return boolean as it check for appid
  *
  */
function isAppIdValid($Appid){

	// The var below represent the Appids this would come from a db 
	$APPIDs = array(0=>"n:LK`sFE0rLD7WWsAUUj*d6E4>*o=J", 1=>"v[ZB9i6!t7(jb+4ucRs80cAq/RLjZ`");

	// var is init with false value, after loop and both ID matches found becomes true 
	$found = false;

	// Looping over the App IDs 
	foreach ($APPIDs as $key) {
		# code...
		//echo json_encode(array("keys"=>$key));
		if($key==$Appid)
		{
			$found = true;
			break;
		}
		
	}
	return $found;
}