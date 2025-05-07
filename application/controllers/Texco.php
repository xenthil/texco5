<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Texco extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */

	function __construct()
	{ 
		parent::__construct();
		$this->load->library('session'); 
        //$this->session->unset_usertoken('atoken');
		if ($this->session->usertoken('atoken') == null) {
            $this->session->set_usertoken(array(
				'atoken' => md5(uniqid(rand(), true)),
				'base64key' => '2b7e151738aed2a6abf7158809cf4f3c',
				'iv' => '3ad77bb90d7a3770a89ecaf32466ef97',
                'lastactivity' => time()
			));
            $tokenvalue = $this->session->usertoken('atoken');
            $permurl = $this->config->item('api_url') . '/loginsession/addvalue?atoken=' . $tokenvalue;
            $permurldata = $this->Get_operation($permurl);
        }
	}



	public function index()
	{
        $permurl = $this->config->item('api_url') . '/servicetest/addvalue?value=HomePageController-PHP'. $this->session->usertoken('atoken');
        $permurldata = $this->Get_operation($permurl);
		$this->load->view('shared/header');
		$this->load->view('home/index');
		$this->load->view('shared/footer');
	}
	public function aboutus()
	{
		$this->load->view('shared/header');
		$this->load->view('home/aboutus');
		$this->load->view('shared/footer');
	}

	public function vacancy()
	{
		//echo $requestval;
	// 	$url =$this->config->item('api_url'). '/vacancypublishstatuss';		 
	// 	$response_opt = $this->Get_operation($url);
		
    // if($response_opt==1)
	// {
		if ($this->session->userdata('membername') != null)
		{
		
		$auth['membername'] = $this->session->userdata('membername');
		$auth['regionid'] = $this->session->userdata('regionid');		
		$this->load->view('shared/memberheader', $auth);
		$this->load->view('member/newvacancy', $auth);
		$this->load->view('shared/memberfooter');
		}
		else
		{
			$this->load->view('shared/header');
		$this->load->view('home/newvacancy');
		//$this->load->view('home/index');
		$this->load->view('shared/footer');
		}

	// }
	// else
	// {
	// 	$this->load->view('shared/header');
	// 	$this->load->view('home/notavailable');
	// 	$this->load->view('shared/footer');
	// }
		

	}

	public function dgrvacancy()
	{
		$this->load->view('shared/header');
		$this->load->view('home/dgrvacancy');
		$this->load->view('shared/footer');
	}

	public function tnvacancy()
	{
		$this->load->view('shared/header');
		$this->load->view('home/tnvacancy');
		$this->load->view('shared/footer');
	}

	public function apply()
	{

	// 	$url =$this->config->item('api_url'). '/vacancypublishstatuss';		 
	// 	$response_opt = $this->Get_operation($url);
		
    // if($response_opt==1)
	// {
		if ($this->session->userdata('membername') != null)
		{
		$auth['membername'] = $this->session->userdata('membername');
		$auth['serviceno'] = $this->session->userdata('serviceno');
		$this->load->view('shared/memberheader', $auth);
		$this->load->view('member/apply', $auth);
		$this->load->view('shared/memberfooter');
		}
		else
		{
			$data['saveonly'] = false;
			$data['newmember']=$this->load->view('shared/addmember', $data, true);
			$this->load->view('shared/header');
			$this->load->view('home/apply', $data);
			$this->load->view('shared/footer');
		}

	// }
	// else
	// {
	// 	$this->load->view('shared/header');
	// 	$this->load->view('home/notavailable');
	// 	$this->load->view('shared/footer');
	// }
		
	}

	public function contactus()
	{
		$this->load->view('shared/header');
		$this->load->view('home/contactus');
		$this->load->view('shared/footer');
	}

	public function services()
	{
		$this->load->view('shared/header');
		$this->load->view('home/services');
		$this->load->view('shared/footer');
	}

	public function newvacancy()
	{
		$this->load->view('shared/header');
		$this->load->view('home/newvacancypdf');
		$this->load->view('shared/footer');
	}

	public function seniority()
	{
		$this->load->view('shared/header');
		$this->load->view('home/seniorityoverall');
		$this->load->view('shared/footer');
	}
	public function gallery()
	{
		$this->load->view('shared/header');
		$this->load->view('home/gallery');
		$this->load->view('shared/footer');
	}

	public function images()
	{
		$this->load->view('shared/header');
		$this->load->view('home/images');
		$this->load->view('shared/footer');
	}

	public function login()
	{
		$this->load->view('home/login');
	}

	public function forgotpassword()
	{
		$this->load->view('home/forgotpassword');
	}

	public function resetpassword()
	{
		$this->load->view('home/resetpassword');
	}

	// public function postedlist()
	// {
	// 	$this->load->view('shared/header');
	// 	$this->load->view('home/postedlist');
	// 	$this->load->view('shared/footer');
	// }

	public function register()
	{
		$skill=$this->input->get('skill', TRUE);
		if(isset($skill)){
			$data['skills']=1;
		 }
		 else
		 {
			$data['skills']=0;
		 }
		$this->load->view('shared/header');
		$this->load->view('home/register',$data);
		$this->load->view('shared/footer');
	}


	public function newmemberdep()
	{
		$this->load->view('shared/header');
		$this->load->view('home/addmemdep');
		$this->load->view('shared/footer');
	}
	public function skilldevelopment()
	{
		$this->load->view('shared/header');
		$this->load->view('home/skilldevelopment');
		$this->load->view('shared/footer');
	}

	public function vacancyapply()
	{
		$this->load->view('shared/header');
		$this->load->view('home/newvacancyhome');
		$this->load->view('shared/footer');
	}

	public function employerregister()
	{
		$page['title']='Employer Register';
		$this->load->view('shared/header');
		$data['register']=$this->load->view('shared/clientregister',$page,true);
		$this->load->view('home/clientregister',$data);
		$this->load->view('shared/footer');
	}

	public function pfdocuments()
	{
		$this->load->view('shared/header');
		$this->load->view('home/pfdocuments');
		$this->load->view('shared/footer');
	}

	public function gstdocuments()
	{
		$this->load->view('shared/header');
		$this->load->view('home/gstdocuments');
		$this->load->view('shared/footer');
	}


	public function documentsview()
	{
		$this->load->view('shared/header');
		$this->load->view('home/gstdocuments');
		$this->load->view('shared/footer');
	}

	public function wagedocuments()
	{
		$this->load->view('shared/header');
		$this->load->view('home/wagedocuments');
		$this->load->view('shared/footer');
	} 

	
    public function helpvideos()
    {
        $this->load->view('shared/header');
        $this->load->view('home/helpvideos');
        $this->load->view('shared/footer');
    }

	
	function Get_operation($url)
    {
        $headers = array(
            'Authorization :  '. $this->session->usertoken('atoken')
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
}
