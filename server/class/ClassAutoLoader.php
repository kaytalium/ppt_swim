<?php

class ClassAutoloader {
        public function __construct() 
		{
            spl_autoload_register(array($this, 'loader'));
        }
        private function loader($className) 
		{
          include realpath(dirname(__FILE__)).'/'.$className . '.inc';
        }
}
  $autoloader = new ClassAutoloader();
  if(!isset($_SESSION['parent'])){
   	$_SESSION['parent'] = '/home/content/88/7195088/html/swim';  
  }
  
  include $_SESSION['parent'].'/class/helpers.php';
  include $_SESSION['parent'].'/appids.inc';
  $script_tz = date_default_timezone_set('America/Bogota');