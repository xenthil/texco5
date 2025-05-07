<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ams extends CI_Controller
{

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
        if ($this->session->userdata('username') != null)
            return TRUE;
        else
            return FALSE;
    }

    public function index()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
        } else {
            $auth['username'] = "Login";
        }

        $this->load->view('shared/amsheader', $auth);
        $this->load->view('home/employees');
        $this->load->view('shared/amsfooter');
    }


    public function dashboard()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/dashboard');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }




    public function newvacancyapplist()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VDIRECTOR']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/newvacancyapplist');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }


    public function directors()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VDIRECTOR']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/directors');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function officers()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VDIRECTOR']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/officers');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function employees()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VEMPLOYEE']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/employees');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function members()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VJOBPOST']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $data['saveonly'] = true;
            $data['newmember']=$this->load->view('Shared/addmember', $data, true);
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/members', $data);
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function clients()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VCLIENT']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/clients');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function agreement()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VAGREE']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/agreement');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function projects()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VPROJECT']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/project');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function roles()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['ROLES']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/roles');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function settings()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VSETTINGS']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/settings');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function documents()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VDOCUMENTS']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/documents');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function gallery()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VGALLERY']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/gallery');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function photo()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VJOBMASTER']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/photo');
            $this->load->view('shared/amsfooter');
             } else {
            redirect('Texco/login');
        }
    }
    
    public function jobmaster()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VLOOKUP']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/jobmaster');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

		
	public function noaccess()
    {
       if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VJOBPOST']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/noaccess');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }


	public function getroles ()
 	{
    	$roleid = $this->session->userdata('roleid');
		$permurl=$this->config->item('api_url'). '/roles/permission?roleid='.$roleid;
		$permurldata=$this->Get_operation($permurl);
		return json_decode($permurldata,1);
	 }
	 
    public function jobposting()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
			$auth['roledata']=$roledata=$this->getroles();
			if ($roledata['permissions']['VJOBPOST']!=1)
    		{								
				redirect('Admin/noaccess');
		    }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/jobposting');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function confirm()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VJOBCONFIR']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/confirm');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }
	

    public function profile()
    {
         if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/profile');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

	public function changepassword()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/changepassword');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

	public function manage()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VMANAGEJOB']!=1)
            {                               
                redirect('Admin/noaccess');
            }
        } else {
            $auth['username'] = "Login";
        }

        $this->load->view('shared/amsheader', $auth);
        $this->load->view('ams/manage');
        $this->load->view('shared/amsfooter');
    }

    public function printposting()
    {
        if ($this->session_check() != false) {
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VJOBPOST']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $this->load->view('admin/printposting');
        } else {
            redirect('Texco/login');
        }
    }

	 public function printinvoice()
    {
        if ($this->session_check() != false) {
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VINVOICE']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $this->load->view('admin/printinvoice');
        } else {
            redirect('Texco/login');
        }
    }


	   public function invoice()
   {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VINVOICE']!=1)
            {                               
                redirect('Admin/noaccess');
            }
        } else {
            $auth['username'] = "Login";
        }

        $this->load->view('shared/amsheader', $auth);
        $this->load->view('ams/invoice');
        $this->load->view('shared/amsfooter');
    }
     public function attendance()
   {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VATTEND']!=1)
            {                               
                redirect('Admin/noaccess');
            }
        } else {
            $auth['username'] = "Login";
        }

        $this->load->view('shared/amsheader', $auth);
        $this->load->view('ams/attendance');
        $this->load->view('shared/amsfooter');
    }

    public function document_upload()
    {
        $json                    = array();
        $config['upload_path']   = 'assets/document';
        $config['allowed_types'] = 'doc|docx|pdf';
        $filename = $_FILES["file"]["name"];
        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        $file = $config['upload_path'] . "/". $filename;
        //echo $file;
        chmod($file, 0755);
        unlink($file);
        if (!unlink($file))
          {
          //echo ("Error deleting $file");
          }
        else
          {
          //echo ("Deleted $file");
          }

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

     public function wagemaster()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VWAGE']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/pricemaster');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

     
    public function client_image_upload()
    {
        $json                    = array();
        $config['upload_path']   = 'assets/images/clients';
        $config['allowed_types'] = 'gif|jpg|png';

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

    public function gallery_image_upload()
    {
        $p = $this->uri->segment(3);
        $p = urldecode($p);
        $path = 'assets/images/gallery/'.$p;
        mkdir($path, 0777, true);
        

        $json                    = array();
        $config['upload_path']   = $path;
        $config['allowed_types'] = 'gif|jpg|png';

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

    public function gallery_group_remove()
    {
        $p1 = $this->uri->segment(3);
        $p1 = urldecode($p1);
        $path = getcwd().'/assets/images/gallery/'.$p1;
        echo $path;
        $this->load->helper("file"); // load the helper
        delete_files( $path, true); // delete all files/folders
        rmdir( $path);
    }

    public function gallery_group_image_remove()
    {
        $p1 = $this->uri->segment(3);
        $p2 = $this->uri->segment(4);
        $p1 = urldecode($p1);
        $p2 = urldecode($p2);
        $path = getcwd().'/assets/images/gallery/'.$p1.'/'.$p2;
        unlink($path);
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
    
        $this->session->unset_userdata('username');
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

    		$username=$this->input->get('username');
            $data['login']=$this->uri->segment(4);
			$data['token']=$this->uri->segment(3);

			$this->load->view('home/resetpassword',$data);
		}
		else{
			redirect('home/login');
		}
	}

    function check_login()
    {
        $requestval  = $_POST['data'];
        $requestval['password']=base64_decode($requestval['password']);
        $login_input = json_encode($requestval);
        $url         = $this->config->item('api_url') . '/employees/authenticate/am/';

        $response_opt = $this->curl_operation($url, $login_input);
        if ($response_opt['httpcode'] != 200) { 
            echo "You have entered an invalid username or password";
        } else {
            $logindata = json_decode($response_opt['output'], 1);
            $username  = $logindata['firstname'] . ' ' . $logindata['lastname'];
            $this->session->set_userdata(array(
                'username' => $username,
                'employeeid' => $logindata['employeeid'],
                'email' => $logindata['email'],
                'mobile' => $logindata['mobile'],
				'roleid' => $logindata['roleid'],
                'regionid' => $logindata['regionid']
            ));
            echo $logindata['regionid'];
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

      public function adminattendance()
   {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VATTEND']!=1)
            {                               
                redirect('Admin/noaccess');
            }
        } else {
            $auth['username'] = "Login";
        }

        $this->load->view('shared/amsheader', $auth);
        $this->load->view('ams/adminattendance');
        $this->load->view('shared/amsfooter');
    }

     public function projectreport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VPREPORT']!=1)
            {                               
                 redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/projectreport');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function collectionreport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VPREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('ams/collectionreport');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }


    public function employeereport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VEREPORT']!=1)
            {                               
                 redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/employeereport');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function jobpostingreport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VJREPORT']!=1)
            {                               
                 redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/jobpostingreport');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function agreementreport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VAGREPORT']!=1)
            {                               
                 redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/agreementreport');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function attendancereport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VATREPORT']!=1)
            {                               
                 redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/attendancereport');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function invoicereport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VIREPORT']!=1)
            {                               
                 redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/invoicereport');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

     public function allemployees()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VEREPORT']!=1)
            {                               
                 redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/allemployees');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

     public function employeeresignation()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VEREPORT']!=1)
            {                               
                 redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/employeeresignation');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function vacancy()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VEREPORT']!=1)
            {                               
                 redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/vacancy');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function apply()
    {
         if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VEREPORT']!=1)
            {                               
                 redirect('Admin/noaccess');
            }
             $data['saveonly'] = false;
             $data['newmember']=$this->load->view('shared/addmember', $data, true);
            $this->load->view('shared/amsheader',$auth);
            $this->load->view('ams/apply', $auth,  $data);
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

     public function postedlistreport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VIREPORT']!=1)
            {                               
                 redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/postedlistreport');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

     public function lastaccess()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VSETTINGS']!=1)
            {                               
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/memberlastaccess');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function taluks()
    {
         if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VEREPORT']!=1)
            {                               
                 redirect('Admin/noaccess');
            }
             $data['saveonly'] = false;
             $data['newmember']=$this->load->view('shared/addmember', $data, true);
            $this->load->view('shared/amsheader',$auth);
            $this->load->view('ams/taluks', $auth,  $data);
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function helpvideos()
    {
         if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VEHELP']!=1)
            {                               
                 redirect('Admin/noaccess');
            }
             $data['saveonly'] = false;
             $data['newmember']=$this->load->view('shared/addmember', $data, true);
            $this->load->view('shared/amsheader',$auth);
            $this->load->view('ams/helpvideos', $auth,  $data);
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }
    

    public function settings_upload()
    {
        $json                    = array();
        $config['upload_path']   = 'assets/settings';
        $config['allowed_types'] = 'doc|docx|pdf';
        $filename = $_FILES["file"]["name"];
        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        $file = $config['upload_path'];
        //echo $file;
         chmod($file, 0755);
        // unlink($file);
        // if (!unlink($file))
        //   {
        //   //echo ("Error deleting $file");
        //   }
        // else
        //   {
        //   //echo ("Deleted $file");
        //   }

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

    public function memberhistoryform()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['MEMFORM'] != 1)
            {                                 
                 redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/memberhistoryform');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    } 

    public function registerform() {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['MEMFORM'] != 1)
            {                                 
                 redirect('Admin/noaccess');
            }
            $this->load->view('shared/amsheader', $auth);
            $this->load->view('ams/register');
            $this->load->view('shared/amsfooter');
        } else {
            redirect('Texco/login');
        }
    }

}
