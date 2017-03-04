<?php 
/**
  * @author Ovel Heslop
  * @Date Mar 3, 2017
  * 
  * This class handle the configution of the data and send the approriate email to each staff
  *
  */

class Config
{

 	private $email_address = array();
 	private $resultcount =0;
 	private $email_message;

 	
	public function __construct(){}


	


	private function generate_template($mailInfo=array(), $staff=array()){

		return $email_message = 

				" <html>
					<body>

						<h2><b>5 Day Work Forecast Schedule</b></h2><br />

		    			Hi ".$staff['name'].','."<br /><br />
					<p>Please see work schedule for the following days</p>".

					$this->condition($mailInfo[0],$staff)."<br/>".
					$this->condition($mailInfo[1],$staff)."<br/>".
					$this->condition($mailInfo[2],$staff)."<br/>".
					$this->condition($mailInfo[3],$staff)."<br/>".
					$this->condition($mailInfo[4],$staff)."<br/>".
					

					"<p>Sign Management.</p>

					</body>
 				</html>";
 	}



	public function generate_email($arg=array()){


		//We need to filter out the city from the staff list
		$selectedCityStaff = array();
		$counter = 0;
		foreach ($arg['staff'] as $person) {
			# code...

			if($arg['city']==$person['city']){
				$selectedCityStaff[$counter] = array("name"=>$person->name,"email"=>$person->email,"role"=>$person->role);
			}

			$counter++;
		}

		$counter = 0;
		foreach($selectedCityStaff as $staff){	
	
			//c
			$staffEmail = $staff['email'];
			$staffName = $staff['name'];
			

			$adminEmail = "<admin@example.com>"; //This is the email that will send the mail - required
	 				

			$email_to =  $staffEmail;
	    	
	    	$email_subject = "Krace Kenndy Work Schedule";
			

			//Generating the email body base on staff role day weather condition
			$email_message = $this->generate_template($arg['forecastData'],$staff);

	    		


			// create email headers

			$headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
			
			$headers .= 'From: '.$adminEmail."\r\n".
			'Reply-To: '.$adminEmail."\r\n".
			'X-Mailer: PHP/' . phpversion();

			

			//Email fn that send the mail
			mail($email_to, $email_subject, $email_message, $headers);  

			$count++;

	 	}

	 	echo json_encode(array("city"=>$arg['city'], "mesg"=>$count." staff was email.", "date"=>strtotime("now"), "reverseOrder"=>-strtotime("now")));
	}//end of generate_email



	/**
	  *
	  * This function return the condition for a given day 
	  *
	  */
	private function condition($arg=array(),$staff=array()){
		$WEEKEND = array("Sat","Sun");
		$day = date('D',$arg['dt']);

		if(in_array($day, $WEEKEND)){
			return date('D d',$arg['dt']).": Day Off";
		}

		if(!in_array($day, $WEEKEND) && $staff['role'] == "Manufactor" && $arg['weather'][0]['main']=='Rain' ){
			return date('D d',$arg['dt']).": Half Day - 4hrs";
		}else if(!in_array($day, $WEEKEND) && $staff['role'] == "Manufactor" && $arg['weather'][0]['main'] !=='Rain' ){
			return date('D d',$arg['dt']).": Normal Work Day - 8hrs";
		}
		

		if(!in_array($day, $WEEKEND) && $staff['role'] == "Information Technician" && $arg['weather'][0]['main']=='Rain' ){
			return date('D d',$arg['dt']).": Work From Office";
		}else if(!in_array($day, $WEEKEND) && $staff['role'] == "Information Technician" && $arg['weather'][0]['main'] !=='Rain' ){
			return date('D d',$arg['dt']).": Normal Work Day";
		}
	}

}//end of Class 
