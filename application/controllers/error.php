<?php 
class error extends CI_Controller 
{
    public function __construct() 
    {
        parent::__construct(); 
		    $this->load->library('session');
        if ($this->session->usertoken('atoken') == null) {
            $this->session->set_usertoken(array(
                'atoken' => md5(uniqid(rand(), true))
            ));
            $tokenvalue = $this->session->usertoken('atoken');
            $permurl = $this->config->item('api_url') . '/loginsession/addvalue?atoken=' . $tokenvalue;
            $permurldata = $this->Get_operation($permurl);
        }
    } 
    
    function Get_operation($url)
    {
        $headers = array(
            'Content-Type: application/json'
        );
        $ch      = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        // curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
        $register_opt = curl_exec($ch);
        $httpcode     = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return $register_opt;
    }
	
    public function index() 
    { 
        
	    $this->load->view('shared/header');
		$this->load->view('home/404error');
		$this->load->view('shared/footer');
    } 
	
	
    } 
    ?>