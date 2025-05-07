<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Member extends CI_Controller {
	
	 function __construct()
	{
		parent::__construct();
		$this->load->library('session');
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
	 
	 
	 public function session_check()
	{
	    if ($this->session->userdata('membername') != null)
            return TRUE;
        else
            return FALSE;
	}
	
	public function dashboard()
	{
		if ($this->session_check() != false) {
			$auth['membername'] = $this->session->userdata('membername');
			$this->load->view('shared/memberheader', $auth);
			$this->load->view('member/dashboard');
			$this->load->view('shared/memberfooter');
		}
			else
			{
				redirect('');
			}
	}

	public function profile()
	{
		if ($this->session_check()!=false){
			$auth['membername'] = $this->session->userdata('membername');
			$this->load->view('shared/memberheader', $auth);
			$this->load->view('member/profile');
			$this->load->view('shared/memberfooter');
		}
		else
			{
				redirect('');
			}
	
	}

	public function history()
	{
		if ($this->session_check()!=false){
			$auth['membername'] = $this->session->userdata('membername');
			$this->load->view('shared/memberheader', $auth);
			$this->load->view('member/history');
			$this->load->view('shared/memberfooter');
		}
		else
			{
				redirect('');
			}
	}

	public function jobhistory()
	{
		if ($this->session_check()!=false){
			$auth['membername'] = $this->session->userdata('membername');
			$this->load->view('shared/memberheader', $auth);
			$this->load->view('member/jobhistory');
			$this->load->view('shared/memberfooter');
		}
		else
			{
				redirect('');
			}
	}


	public function dependency()
	{
		if ($this->session_check()!=false){
			$auth['membername'] = $this->session->userdata('membername');
			$this->load->view('shared/memberheader', $auth);
			$this->load->view('member/dependency');
			$this->load->view('shared/memberfooter');
		}
		else
			{
				redirect('');
			}
	}

	public function depdocupload()
    {
        $json                    = array();
        $config['upload_path']   = 'assets/dependent/members';
        $config['allowed_types'] = 'pdf|doc|png';

        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        if (!$this->upload->do_upload('file')) {
            $json = array(
                'error' => true,
                'message' => $this->upload->display_errors()
            );
        } else {
            $upload_details = $this->upload->data();
            echo $upload_details['file_name'];
        }

    }

	public function adddependency()
	{
		if ($this->session_check()!=false){
			$auth['membername'] = $this->session->userdata('membername');
			$memdata['memberid'] = $this->session->userdata('memberid');
			$this->load->view('shared/memberheader', $auth);
			$this->load->view('member/adddependency',$memdata);
			$this->load->view('shared/memberfooter');
		}
		else
			{
				redirect('');
			}
	}
	public function vacancy()
	{

		$url =$this->config->item('api_url'). '/vacancypublishstatuss';		 
		$response_opt = $this->Get_operation_vacancy($url);
	
   
		if ($this->session_check()!=false){
			$auth['membername'] = $this->session->userdata('membername');
			$auth['regionid'] = $this->session->userdata('regionid');	
			
		if ($this->session->userdata('membername') != null)
		{	
					if($response_opt==1)
			{
			$this->load->view('shared/memberheader', $auth);
			$this->load->view('member/newvacancy', $auth);
			$this->load->view('shared/memberfooter');
		}
		else
		{
			$this->load->view('shared/memberheader', $auth);
			$this->load->view('home/notavailable');
			$this->load->view('shared/memberfooter');
		}
		}
		else
			{
				redirect('');
			}
		}
	
	}

	public function dgrvacancy()
	{
		if ($this->session_check()!=false){
			$auth['membername'] = $this->session->userdata('membername');
			$auth['regionid'] = $this->session->userdata('regionid');
		$this->load->view('shared/memberheader', $auth);
		$this->load->view('member/dgrvacancy', $auth);
		$this->load->view('shared/memberfooter');
	}
	else
			{
				redirect('');
			}
		}

	public function tnvacancy()
	{
		if ($this->session_check()!=false){
			$auth['membername'] = $this->session->userdata('membername');
			$auth['regionid'] = $this->session->userdata('regionid');
		$this->load->view('shared/memberheader', $auth);
		$this->load->view('member/tnvacancy', $auth);
		$this->load->view('shared/memberfooter');
	}
	else
			{
				redirect('');
			}
		}

	public function apply()
	{
		$url =$this->config->item('api_url'). '/vacancypublishstatuss';		 
		$response_opt = $this->Get_operation_vacancy($url);
		
   

		if ($this->session_check()!=false){
			$auth['membername'] = $this->session->userdata('membername');
		$auth['serviceno'] = $this->session->userdata('serviceno');
			if($response_opt==1)
			{
		
		$this->load->view('shared/memberheader', $auth);
		$this->load->view('member/apply', $auth);
		$this->load->view('shared/memberfooter');
	}
	
	else
	{
		$this->load->view('shared/memberheader', $auth);
		$this->load->view('home/notavailable');
		$this->load->view('shared/memberfooter');
	}
		}
		else
			{
				redirect('');
			}
		
	}
	
	public function logout()
    {	
		//$memberid = $this->session->set_userdata('memberid');
		
		$memberid = $this->session->userdata('memberid');

   $memurl=$this->config->item('api_url'). '/member/logout?memberid='.$memberid;
   $memurldata = $this->Get_operation($memurl);
	//	echo  $memurl;
		// $url =$this->config->item('api_url'). '/logout';		 
		// $response_opt = $this->curl_operation($url,$memberdata);
		// if ($response_opt['httpcode'] != 200) {
        //     echo $response_opt['output'];
		// }

		$tokenvalue = $this->session->usertoken('atoken');
        $permurl = $this->config->item('api_url') . '/loginsession/removevalue?atoken=' . $tokenvalue;
		$permurldata = $this->Get_operation($permurl);
        $this->session->unset_usertoken('atoken');

		if ($this->session->usertoken('atoken') == null) {
            $this->session->set_usertoken(array(
                'atoken' => md5(uniqid(rand(), true))
            ));
            $tokenvalue = $this->session->usertoken('atoken');
            $permurl = $this->config->item('api_url') . '/loginsession/addvalue?atoken=' . $tokenvalue;
            $permurldata = $this->Get_operation($permurl);
        }
		
        $this->session->unset_userdata('membername');
		$this->session->unset_userdata('memberid');
        $this->load->view('shared/header');
        $this->load->view('home/index');
        $this->load->view('shared/footer');
    }

    public function printjob()
    { 
        $this->load->view('member/confirmation');
    }
	
	function checkmember_login()
	{
		$requestval = $_POST['data'];
		//echo $requestval;
		$url =$this->config->item('api_url'). '/memberinfo?texserno='.$requestval;		 
		$response_opt = $this->Get_operation($url);
		if ($response_opt['httpcode'] != 200) {
            echo $response_opt['output'];
        } else {
            $logindata = json_decode($response_opt['output'], 1);
            $membername  = $logindata['firstname'] . ' ' . $logindata['lastname'];
            $this->session->set_userdata(array(
                'membername' => $membername,
				'memberid' => $logindata['memberid'],
				'employeeid' => $logindata['memberid'],
                'texcono' => $logindata['texcono'],
                'serviceno' => $logindata['serviceno'],
                'regionid' => $logindata['regionid']
            ));
            echo 'success';
        }		
	}
	
	function curl_operation ($url,$input) {
		$headers = array(
            'Accept: application/json',
            'Content-Type: application/json',
            'Authorization: '. $this->session->usertoken('atoken')
        );
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
		curl_setopt($ch, CURLOPT_TIMEOUT, 500);
		$register_opt  = curl_exec($ch);
		$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close($ch);
		$result=array('output'=>$register_opt,'httpcode'=>$httpcode);
		return $result;
	 }


	 function Get_operation ($url) {
		  	$headers = array(
            	'Authorization: '. $this->session->usertoken('atoken')
        	);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_TIMEOUT, 500);
       // curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
        $register_opt  = curl_exec($ch);
		$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $result=array('output'=>$register_opt,'httpcode'=>$httpcode);
					return  $result;
		 }

		 function Get_operation_vacancy ($url) {
			$headers = array(
			  'Authorization: '. $this->session->usertoken('atoken')
		  );
	  $ch = curl_init();
	  curl_setopt($ch, CURLOPT_URL, $url);
	  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	  curl_setopt($ch, CURLOPT_TIMEOUT, 500);
	 // curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
	  $register_opt  = curl_exec($ch);
	  $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	  curl_close($ch);
	 // $result=array('output'=>$register_opt,'httpcode'=>$httpcode);
	  return $register_opt;;
	   }
}
