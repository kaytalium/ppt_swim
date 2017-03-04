<?php ob_start(); ?>
<?php

/**
 * Description of sendEmail
 *
 * @author Ovel Heslop
 * @Date March 2, 2017
 * @package swim api
 * 
 * Staff Weather Interpretor Manager (swim)
 */


 /**
  * $postdata get the input coming from the post request 
  * Data capture in this is stored as json, as such we have to decode postdata before we can use it
  * 
  */
$postdata = file_get_contents("php://input");


 /*
  * this block exit script and redirect user to home page if the request is coming direcly from the browser
  */
if(empty($postdata))
{
	header("Location: https://www.google.com"); //Change to you own redirect page https://www.google.com
	exit();
}

 /*
  * import all the class and helper fn 
  *
  */
include "class/ClassAutoLoader.php";

 /*
  * We have to decode the json object before is can be used in the script 
  */
$request = json_decode($postdata, true);

 /*
  * This block of code is checking to see if the App id is exist and correct before moving on.
  * on true it passes the request to the sendMail fn to package and send mail.
  * 
  * On false it return msg to caller advising of missing data
  */
if(isAvailable('APPID',$request) && isAppIdValid($request['APPID'])){
		sendMail($request);
}else{
	//Create json error msg and echo 
  echo json_encode(Array("code"=>"05","message"=>"invalid APPID, please make sure an app id, is sent or check if correct."));
}