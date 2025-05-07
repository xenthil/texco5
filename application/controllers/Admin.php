<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Admin extends CI_Controller
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

        $this->load->view('shared/adminheader', $auth);
        $this->load->view('home/employees');
        $this->load->view('shared/adminfooter');
    }

    public function invoicelist()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
        } else {
            $auth['username'] = "Login";
        }
        $this->load->view('shared/adminheader', $auth);
        $this->load->view('admin/invoicelist');
        $this->load->view('shared/adminfooter');
    }

    public function exportinvoice()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
        } else {
            $auth['username'] = "Login";
        }
        $this->load->view('shared/adminheader', $auth);
        $this->load->view('admin/exportinvoice');
        $this->load->view('shared/adminfooter');
    }

    public function exportbank()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
        } else {
            $auth['username'] = "Login";
        }
        $this->load->view('shared/adminheader', $auth);
        $this->load->view('admin/exportbank');
        $this->load->view('shared/adminfooter');
    }

    public function importinvoice()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
        } else {
            $auth['username'] = "Login";
        }
        $this->load->view('shared/adminheader', $auth);
        $this->load->view('admin/importinvoice');
        $this->load->view('shared/adminfooter');
    }

    public function dashboard()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/dashboard');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function directors()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VDIRECTOR'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/directors');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function officers()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VDIRECTOR'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/officers');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function employees()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VEMPLOYEE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/employees');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function members()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VJOBPOST'] != 1) {
                redirect('Admin/noaccess');
            }
            $data['saveonly'] = true;
            $data['newmember'] = $this->load->view('shared/addmember', $data, true);
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/members', $data);
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function memberssearch()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VJOBPOST'] != 1) {
                redirect('Admin/noaccess');
            }
            $data['saveonly'] = true;
            $data['newmember'] = $this->load->view('shared/addmember', $data, true);
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/memberssearch', $data);
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    

    public function expmembers()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VJOBPOST'] != 1) {
                redirect('Admin/noaccess');
            }
            $data['saveonly'] = true;
            $data['newmember'] = $this->load->view('shared/addmember', $data, true);
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/expmembers', $data);
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function clients()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VCLIENT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/clients');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function agreement()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VAGREE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/agreement');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function projects()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VPROJECT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/project');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function roles()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['ROLES'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/roles');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function settings()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VSETTINGS'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/settings');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function documents()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VDOCUMENTS'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/documents');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function gallery()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VGALLERY'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/gallery');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function photo()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VJOBMASTER'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/photo');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function jobmaster()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VLOOKUP'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/jobmaster');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }


    public function noaccess()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VJOBPOST'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/noaccess');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }


    public function getroles()
    {
        $roleid = $this->session->userdata('roleid');
        $permurl = $this->config->item('api_url') . '/roles/permission?roleid=' . $roleid;
        $permurldata = $this->Get_operation($permurl);
        return json_decode($permurldata, 1);
    }

    public function jobposting()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VJOBPOST'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/jobposting');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function carryforward()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VJOBPOST'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/carryforward');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function confirm()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VJOBCONFIR'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/confirm');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }


    public function profile()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/profile');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function changepassword()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/changepassword');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function manage()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VMANAGEJOB'] != 1) {
                redirect('Admin/noaccess');
            }
        } else {
            $auth['username'] = "Login";
        }

        $this->load->view('shared/adminheader', $auth);
        $this->load->view('admin/manage');
        $this->load->view('shared/adminfooter');
    }

    public function printposting()
    {
        if ($this->session_check() != false) {
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VJOBPOST'] != 1) {
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
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VINVOICE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('admin/printinvoice');
        } else {
            redirect('Texco/login');
        }
    }

    public function printclaiminvoice()
    {

       // echo 'hi';
        if ($this->session_check() != false) {
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VINVOICE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('admin/printclaiminvoice');
        } else {
            redirect('Texco/login');
        }
    }

    public function postingorderedit()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VJOBPOSTED'] != 1) {
                redirect('Admin/noaccess');
            }
        } else {
            redirect('Texco/login');
        }
        $this->load->view('shared/adminheader', $auth);
        $this->load->view('admin/postingorderedit');
        $this->load->view('shared/adminfooter');
    }

    public function getMemberhistory()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VJOBPOSTED'] != 1) {
                redirect('Admin/noaccess');
            }
        } else {
            redirect('Texco/login');
        }
        $this->load->view('shared/adminheader', $auth);
        $this->load->view('admin/getMemberhistory');
        $this->load->view('shared/adminfooter');
    }
    public function printclaimpayslip()
    {

       // echo 'hi';
        if ($this->session_check() != false) {
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VINVOICE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('admin/printclaimpayslip');
        } else {
            redirect('Texco/login');
        }
    }


    public function invoice()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VINVOICE'] != 1) {
                redirect('Admin/noaccess');
            }
        } else {
            $auth['username'] = "Login";
        }

        $this->load->view('shared/adminheader', $auth);
        $this->load->view('admin/invoice');
        $this->load->view('shared/adminfooter');
    }

    public function dependency()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VINVOICE'] != 1) {
                redirect('Admin/noaccess');
            }
        } else {
            $auth['username'] = "Login";
        }

        $this->load->view('shared/adminheader', $auth);
        $this->load->view('admin/dependency');
        $this->load->view('shared/adminfooter');
    }



    public function newvacancyapplist()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VINVOICE'] != 1) {
                redirect('Admin/noaccess');
            }
        } else {
            $auth['username'] = "Login";
        }

        $this->load->view('shared/adminheader', $auth);
        $this->load->view('admin/newvacancyapplist');
        $this->load->view('shared/adminfooter');
    }


    public function uploadvacancypdf()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VDOCUMENTS'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/uploadvacancypdf');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function attendance()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VATTEND'] != 1) {
                redirect('Admin/noaccess');
            }
        } else {
            $auth['username'] = "Login";
        }

        $this->load->view('shared/adminheader', $auth);
        $this->load->view('admin/attendance');
        $this->load->view('shared/adminfooter');
    }

    public function document_upload()
    {
        error_reporting(0);
        $foldername = $this->uri->segment(3);
        $foldername = urldecode($foldername);
        $path = 'assets/document/' . $foldername;
        mkdir($path, 0777, true);

        $json                    = array();
        $config['upload_path']   = $path;
        $config['allowed_types'] = 'doc|docx|pdf';
        $filename = $_FILES["file"]["name"];
        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        $file = $config['upload_path'] . "/" . $filename;
       // echo $file;
        chmod($file, 0755);
        unlink($file);
        if (!unlink($file)) {
            //echo ("Error deleting $file");
        } else {
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
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VWAGE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/pricemaster');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function userlogoff()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VWAGE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/userlogoff');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function wageadd()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VWAGE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/wageadd');
            $this->load->view('shared/adminfooter');
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
        $path = 'assets/images/gallery/' . $p;
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
        $path = getcwd() . '/assets/images/gallery/' . $p1;
        echo $path;
        $this->load->helper("file"); // load the helper
        delete_files($path, true); // delete all files/folders
        rmdir($path);
    }

    public function gallery_group_image_remove()
    {
        $p1 = $this->uri->segment(3);
        $p2 = $this->uri->segment(4);
        $p1 = urldecode($p1);
        $p2 = urldecode($p2);
        $path = getcwd() . '/assets/images/gallery/' . $p1 . '/' . $p2;
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
        $url  = $this->config->item('api_url') . '/employees/wageout/';
        $response_opt = $this->curl_operation($url,'');

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
        
       // print_r($response_opt);
        if ($response_opt['httpcode'] != 200) {
        } else {
            $this->session->unset_userdata('username');
            $this->load->view('shared/header');
            $this->load->view('home/index');
            $this->load->view('shared/footer');
        }
       
    }

    public function forgotpassword()
    {
        $this->load->view('home/forgotpassword');
    }

    function Resetpassword()
    {
        if ($this->session_check() == false) {

            $username = $this->input->get('username');
            $data['login'] = $this->uri->segment(4);
            $data['token'] = $this->uri->segment(3);

            $this->load->view('home/resetpassword', $data);
        } else {
            redirect('home/login');
        }
    }

    function check_login()
    {
        $requestval  = $_POST['data'];
        $requestval['password']=base64_decode($requestval['password']);
        $login_input = json_encode($requestval);
       // var_dump($login_input);
       // echo  json_decode($login_input);
       
        //echo   $login_input['password'];
        $url         = $this->config->item('api_url') . '/employees/authenticate/';

        $response_opt = $this->curl_operation($url, $login_input);
        if ($response_opt['httpcode'] != 200) {
            echo "You have entered an invalid username or password";
        } else {
            $logindata = json_decode($response_opt['output'], 1);
            $username  = $logindata['firstname'] . ' ' . $logindata['lastname'];
            $empno  = $logindata['employeeno'];
          // print_r($logindata);
            if($logindata['roleid'] == 5 && $empno !='all002') {
                $this->session->set_userdata(array(
                    'username' => $username,
                    'employeeid' => $logindata['employeeid'],
                    'email' => $logindata['email'],
                    'mobile' => $logindata['mobile'],
                    'roleid' => $logindata['roleid'],
                    'regionid' => $logindata['regionid'],
                    'clientid' => $logindata['clientid']
                ));
            }
            else {
                $this->session->set_userdata(array(
                    'username' => $username,
                    'employeeid' => $logindata['employeeid'],
                    'email' => $logindata['email'],
                    'mobile' => $logindata['mobile'],
                    'roleid' => $logindata['roleid'],
                    'regionid' => 0,
                    'clientid' => $logindata['clientid']
                ));
            }  
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

    public function adminattendance()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VATTEND'] != 1) {
                redirect('Admin/noaccess');
            }
        } else {
            $auth['username'] = "Login";
        }

        $this->load->view('shared/adminheader', $auth);
        $this->load->view('admin/adminattendance');
        $this->load->view('shared/adminfooter');
    }

    public function editattendance()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VATTEND'] != 1) {
                redirect('Admin/noaccess');
            }
        } else {
            $auth['username'] = "Login";
        }

        $this->load->view('shared/adminheader', $auth);
        $this->load->view('admin/editattendance');
        $this->load->view('shared/adminfooter');
    }

    public function attendancereview()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VATTEND'] != 1) {
                redirect('Admin/noaccess');
            }
        } else {
            $auth['username'] = "Login";
        }

        $this->load->view('shared/adminheader', $auth);
        $this->load->view('admin/attendancereview');
        $this->load->view('shared/adminfooter');
    }

    public function projectreport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VPREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/projectreport');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    } 

    public function newprojectslist()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VPREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/newprojectslist');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }
    
    public function employeereport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VEREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/employeereport');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    } 

    public function deptwisereport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VPREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/deptwisereport');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }
    
    public function categorywisesalary()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['CVREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/categorywisesalaryreport');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    } 

    public function newmembers()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VPREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/newmembers');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function loginmembers()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['LGVREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/loginmember');
            $this->load->view('shared/adminfooter');
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
            $this->load->view('admin/collectionreport');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function jobpostingreport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VJREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/jobpostingreport');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function agreementreport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VAGREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/agreementreport');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function attendancereport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VATREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/attendancereport');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function invoicereport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VIREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/invoicereport');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function allemployees()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VEREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/allemployees');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function employeeresignation()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VEREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/employeeresignation');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function vacancy()
    {
      
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VEREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            
            $url =$this->config->item('api_url'). '/vacancypublishstatuss';		 
            $response_opt = $this->Get_operation($url);
            
            if($response_opt==1)
            {
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/vacancy');
            $this->load->view('shared/adminfooter');
        }
        else
            {
                $this->load->view('shared/adminheader', $auth);
                $this->load->view('home/notavailable');
                $this->load->view('shared/adminfooter');
            }

        } else {
            redirect('Texco/login');
        }
    
    }

    public function apply()
    {
       
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VEREPORT'] != 1) {
                redirect('Admin/noaccess');
            }

            $url =$this->config->item('api_url'). '/vacancypublishstatuss';		 
            $response_opt = $this->Get_operation($url);
            
        if($response_opt==1)
        {
    
            $data['saveonly'] = false;
            $data['newmember'] = $this->load->view('shared/addmember', $data, true);
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/apply', $auth,  $data);
            $this->load->view('shared/adminfooter');
        } 
        
    
    else
		{
            $this->load->view('shared/adminheader', $auth);
			$this->load->view('home/notavailable');
			$this->load->view('shared/adminfooter');
		}
    }
        else {
            redirect('Texco/login');
        }
    
    }

    public function postedlistreport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VIREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/postedlistreport');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function lastaccess()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VSETTINGS'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/memberlastaccess');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function taluks()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VEREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $data['saveonly'] = false;
            $data['newmember'] = $this->load->view('shared/addmember', $data, true);
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/taluks', $auth,  $data);
            $this->load->view('shared/adminfooter');
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

    public function memberblock()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VJOBPOST'] != 1) {
                redirect('Admin/noaccess');
            }
            $data['saveonly'] = true;
            $data['newmember'] = $this->load->view('shared/addmember', $data, true);
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/memberblock', $data);
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function payslip()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VINVOICE'] != 1) {
                redirect('Admin/noaccess');
            }
        } else {
            $auth['username'] = "Login";
        }

        $this->load->view('shared/adminheader', $auth);
        $this->load->view('admin/payslip');
        $this->load->view('shared/adminfooter');
    }

    public function printpayslip()
    {
        if ($this->session_check() != false) {
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VINVOICE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('admin/printpayslip');
        } else {
            redirect('Texco/login');
        }
    }

    public function printfund()
    {
        if ($this->session_check() != false) {
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VINVOICE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('admin/printfund');
        } else {
            redirect('Texco/login');
        }
    }

    public function bulkprint()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VINVOICE'] != 1) {
                redirect('Admin/noaccess');
            }
        } else {
            $auth['username'] = "Login";
        }

        $this->load->view('shared/adminheader', $auth);
        $this->load->view('admin/bulkprint');
        $this->load->view('shared/adminfooter');
    }

    public function printbulkprint()
    {
        if ($this->session_check() != false) {
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VINVOICE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('admin/printbulkprint');
        } else {
            redirect('Texco/login');
        }
    }

    public function printbulkprintarrear()
    {
        if ($this->session_check() != false) {
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VINVOICE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('admin/printbulkarrear');
        } else {
            redirect('Texco/login');
        }
    }

    public function printclaimfund()
    {
        if ($this->session_check() != false) {
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VINVOICE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('admin/printclaimfund');
        } else {
            redirect('Texco/login');
        }
    }

    public function authorize()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            $data['roleid']=$this->session->userdata('roleid');
            if ($roledata['permissions']['VINVOICE'] != 1) {
                redirect('Admin/noaccess');
            }
        } else {
            $auth['username'] = "Login";
        }

        $this->load->view('shared/adminheader', $auth);
        $this->load->view('admin/authorize',$data);
        $this->load->view('shared/adminfooter');
    }

    public function arrears()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            $data['roleid']=$this->session->userdata('roleid');
            if ($roledata['permissions']['VINVOICE'] != 1) {
                redirect('Admin/noaccess');
            }
        } else {
            $auth['username'] = "Login";
        }

        $this->load->view('shared/adminheader', $auth);
        $this->load->view('admin/arrears',$data);
        $this->load->view('shared/adminfooter');
    }

    public function wage()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VWAGE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/wage');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function expayslip()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VWAGE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/expayslip');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function printexpayslip()
    {
        if ($this->session_check() != false) {
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VINVOICE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('admin/printexpayslip');
        } else {
            redirect('Texco/login');
        }
    }

    public function previewpayslip()
    {
        if ($this->session_check() != false) {
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VINVOICE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('admin/previewpayslip');
        } else {
            redirect('Texco/login');
        }
    }

    public function previewinvoice()
    {
        if ($this->session_check() != false) {
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VINVOICE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('admin/previewinvoice');
        } else {
            redirect('Texco/login');
        }
    }

    public function agreementprint()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VWAGE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/agreementprint');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function bankslip()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VWAGE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/bankslip');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function deletemembers()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VEMPLOYEE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/deletemembers');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function closedmembers()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VEMPLOYEE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/closedmembers');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function rejectedvacancy()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VEMPLOYEE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/rejectedvacancy');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function updatemembers()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VEMPLOYEE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/memberprofile');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function totalcount()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VIREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/totalcount');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }


    public function districtreport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VIREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/districtreport');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function dgrcountreport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VIREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/dgrcountreport');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function tncountreport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VIREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/tncountreport');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function membercount()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VIREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/membercount');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function authorizestatus()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VAUTHSTATS'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/authorizestatus');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    } 
    
    public function claimaddress() {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VIREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/claimaddress');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    } 

    public function districtwisecount()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VIREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/districtwisecount');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function districtcount()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VIREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/districtcount');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function categorywise()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VIREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/categorywise');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function strengthreport()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VIREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/strengthreport');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function memberwisesalary()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VIREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/memberwisesalary');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function projectwisecount()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VIREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/projectwisecount');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function projectwiseincreased()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VIREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/projectwiseincreased');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function districtwiseincrease()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VIREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/districtwiseincrease');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function projectwisesalary()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VIREPORT'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/projectwisesalary');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    
    public function category()
    {
        if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VCATEGORY'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('shared/adminheader', $auth);
            $this->load->view('admin/categorymaster');
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    function addwages()
    {
        $requestval  = $_POST['objaddwage'];
        $wagearea = $_POST['wagearea'];
        $wageamount = array();
        array_push($wageamount,$requestval,$wagearea);

        $login_input = json_encode($wageamount);
        $url         = $this->config->item('api_url') . '/addwages/';
        $response_opt = $this->curl_operation($url, $login_input);
        if ($response_opt['httpcode'] != 200) {
            echo $response_opt['output'];
        } else {
            echo 'success';
        }
    }   

    public function printarrearfund()
    {
        if ($this->session_check() != false) {
            $auth['roledata'] = $roledata = $this->getroles();
            if ($roledata['permissions']['VINVOICE'] != 1) {
                redirect('Admin/noaccess');
            }
            $this->load->view('admin/printarrearfund');
        } else {
            redirect('Texco/login');
        }
    } 

    public function helpvideos()
    {
         if ($this->session_check() != false) {
            $auth['username'] = $this->session->userdata('username');
            $auth['roledata']=$roledata=$this->getroles();
            if ($roledata['permissions']['VJOBPOST']!=1)
            {                               
                 redirect('Admin/noaccess');
            }
             $data['saveonly'] = false;
             $data['newmember']=$this->load->view('shared/addmember', $data, true);
            $this->load->view('shared/adminheader',$auth);
            $this->load->view('admin/helpvideos', $auth,  $data);
            $this->load->view('shared/adminfooter');
        } else {
            redirect('Texco/login');
        }
    }

    public function newvacancyupload()
    {
        $json                    = array();
        $config['upload_path']   = 'assets/vacancy/uploadadmin';
        $config['allowed_types'] = 'pdf';

        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        if (!$this->upload->do_upload('file')) {
            $json = array(
                'error' => true,
                'message' => $this->upload->display_errors()
            );
			echo json_encode($json);
			
        } else {
            $upload_details = $this->upload->data();

			$json = array(
                'error' => false,
                'message' =>$upload_details['file_name']
            );

            echo json_encode($json);
        }

    }    
}

