<?php

class SendEmail{ 
	
	private $mailConfig;


	public function __constructor(){
		
	}


	public function handleInput($arg = array()){
		

		$error = array();


		if(!isAvailable('staff',$arg) || !is_array($arg['staff'])){
			$error[0] = "staff";
		}

		if(!isAvailable('city',$arg) || is_array($arg['city'])){
			$error[1] = "city";
		}

		if(!isAvailable('forecastData',$arg) || !is_array($arg['forecastData'])){
			$error[2] = 'forecastData';
		}

		if(count($error)>0){
			$error = json_encode($error);
			echo json_encode(array('code'=>'020', "message"=>"missing data or incorrect format".$error));
		}else{
			//proceed to send info
			 $this->set($arg);
		}
	}




	/**
	  *
	  *
	  *
	  */

	private function set($arg=array()){
		//we need to create the message template
		$mailConfig = new Config();
		$mailConfig->generate_email($arg);

	}

}