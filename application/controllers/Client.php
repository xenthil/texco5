<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Client extends CI_Controller {

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
        if ($this->session->userdata('organization') != null)
            return TRUE;
        else
            return FALSE;
    }

 
    public function dashboard()
    {
        if ($this->session_check() != false) {
            $auth['organization'] = $this->session->userdata('organization');
            $this->load->view('shared/clientheader',$auth);
            $this->load->view('client/dashboard');
            $this->load->view('shared/clientfooter');
        } else {
            redirect('');
        }
    }

    public function editclientattendance() 
    {
        if ($this->session_check() != false) {
            $auth['organization'] = $this->session->userdata('organization');
            $auth['clientid'] = $this->session->userdata('clientid');
            $this->load->view('shared/clientheader', $auth);
            $this->load->view('client/editclientattendance');
            $this->load->view('shared/clientfooter');
        } else {
            redirect('');
        }
    }

    public function invoicelist()
    {
        if ($this->session_check() != false) {
            $auth['organization'] = $this->session->userdata('organization');
            $auth['clientid'] = $this->session->userdata('clientid');
            $this->load->view('shared/clientheader', $auth);
            $this->load->view('client/invoicelist');
            $this->load->view('shared/clientfooter');
        } else {
            redirect('');
        }
    }  

    public function helpvideos() {
        if ($this->session_check() != false) {
            $auth['organization'] = $this->session->userdata('organization');
            $auth['clientid'] = $this->session->userdata('clientid');
            $this->load->view('shared/clientheader', $auth);
            $this->load->view('client/helpvideos');
            $this->load->view('shared/clientfooter');
        } else {
            redirect('');
        } 
    }

    public function printinvoice()
    {
        if ($this->session_check() != false) {
            $auth['organization'] = $this->session->userdata('organization');
            $auth['clientid'] = $this->session->userdata('clientid');
            $this->load->view('client/printinvoice');
        } else {
            redirect('');
        }
    }

    public function profile()
    {
        if ($this->session_check()!=false){
            $auth['organization'] = $this->session->userdata('organization');
            $auth['clientid'] = $this->session->userdata('clientid');
            $this->load->view('shared/clientheader',$auth);
            $this->load->view('client/profile');
            $this->load->view('shared/clientfooter');
        }
        else
            {
                redirect('');
            }
    }


    public function project()
	{
		if ($this->session_check()!=false){
			$auth['organization'] = $this->session->userdata('organization');
			$auth['clientid'] = $this->session->userdata('clientid');
			$this->load->view('shared/clientheader',$auth);
			$this->load->view('client/project');
			$this->load->view('shared/clientfooter');
		}
		else
			{
				redirect('');
			}
	}

    public function jobposting()
    {
        if ($this->session_check() != false) {
            $auth['organization'] = $this->session->userdata('organization');
            $auth['clientid'] = $this->session->userdata('clientid');
			$this->load->view('shared/clientheader',$auth);
            $this->load->view('client/jobposting');
            $this->load->view('shared/clientfooter');
           
        } else {
            redirect('');
        }
    }

    public function printprojects()
    {
        if ($this->session_check() != false) {
            $auth['organization'] = $this->session->userdata('organization');
            $auth['clientid'] = $this->session->userdata('clientid');
            $this->load->view('client/printprojects');
        } else {
            redirect('');
        }
    }

    public function printemployees()
    {
        if ($this->session_check() != false) {
            $auth['organization'] = $this->session->userdata('organization');
            $auth['clientid'] = $this->session->userdata('clientid');
            $this->load->view('client/printemployees');
        } else {
            redirect('');
        }
    }

    public function attendance()
    {
        if ($this->session_check()!=false){
            $auth['organization'] = $this->session->userdata('organization');
            $auth['clientid'] = $this->session->userdata('clientid');
            $this->load->view('shared/clientheader',$auth);
            $this->load->view('client/attendance');
            $this->load->view('shared/clientfooter');
        }
        else
            {
                redirect('');
            }
    }

    public function history()
	{
		if ($this->session_check()!=false){
			$auth['organization'] = $this->session->userdata('organization');
            $auth['clientid'] = $this->session->userdata('clientid');
			$this->load->view('shared/clientheader',$auth);
			$this->load->view('client/history');
			$this->load->view('shared/clientfooter');
		}
		else
			{
				redirect('');
			}
	}


     public function login()
    {
        if ($this->session_check() != TRUE) {
            $this->load->view('home/login');
        } else {
            redirect('');
        }
    }

    function logout()
    {
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
        
        $this->session->unset_userdata('organization');
        $this->load->view('shared/header');
        $this->load->view('home/index');
        $this->load->view('shared/footer');
    }

    public function forgotpassword()
    {
        $this->load->view('home/forgotpassword');
    }

	function Resetpassword()
	{
		if ($this->session_check()==false){

    		$organization=$this->input->get('organization');
			$data['login']=$this->uri->segment(4);
			$data['token']=$this->uri->segment(3);

			$this->load->view('home/resetpassword',$data);
		}
		else{
			redirect('home/login');
		}
	}

    public function changepassword()
    {
        if ($this->session_check() != false) {
            $auth['organization'] = $this->session->userdata('organization');
            $auth['clientid'] = $this->session->userdata('clientid');
            $this->load->view('shared/clientheader',$auth);
            $this->load->view('client/changepassword');
            $this->load->view('shared/clientfooter');
        } else {
            redirect('Texco/login');
        }
    }

    function check_login()
    {
        $requestval  = $_POST['data'];
        $requestval['password']=base64_decode($requestval['password']);
        $login_input = json_encode($requestval);
        $url         = $this->config->item('api_url') . '/client/authenticate/';

        $response_opt = $this->curl_operation($url, $login_input);
        if ($response_opt['httpcode'] != 200) {
            echo "You have entered an invalid username or password";
        } else {
            $logindata = json_decode($response_opt['output'], 1);
            $organization  = $logindata['organization'];
            $this->session->set_userdata(array(
                'organization' => $organization,
                'clientid' => $logindata['clientid'],
                'employeeid' =>  $logindata['clientid'],
                'email' => $logindata['email'],
                'mobile' => $logindata['mobile']
            ));
            echo 'success';
        }
    }

    function curl_operation($url, $input)
    {
        $headers = array(
            'Accept: application/json',
            'Content-Type: application/json',
            'Authorization: '. $this->session->usertoken('atoken')
        );
        $ch      = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
        $register_opt = curl_exec($ch);
        $httpcode     = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $result = array(
            'output' => $register_opt,
            'httpcode' => $httpcode
        );
        return $result;
    }

    function Get_operation($url)
    {
        $headers = array(
            'Authorization: '. $this->session->usertoken('atoken')
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

    public function editattendance()
    {
         if ($this->session_check() != false) {
            $auth['organization'] = $this->session->userdata('organization');
            $auth['clientid'] = $this->session->userdata('clientid');
            $this->load->view('shared/clientheader',$auth);
            $this->load->view('client/editattendance');
            $this->load->view('shared/clientfooter');
           
        } else {
            redirect('');
        }
    }

    public function printreview()
    {
        if ($this->session_check() != false) {
            $this->load->view('client/printreview');
        } else {
            redirect('Texco/login');
        }
    }

    public function addaccountnumber()
    {
        if ($this->session_check() != false) {
            $auth['organization'] = $this->session->userdata('organization');
            $auth['clientid'] = $this->session->userdata('clientid');
            $this->load->view('shared/clientheader', $auth);
            $this->load->view('client/addaccountnumber');
            $this->load->view('shared/clientfooter');
        } else {
            redirect('Texco/login');
        }
    }
}
