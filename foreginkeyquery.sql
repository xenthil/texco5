ALTER TABLE agreement
ADD CONSTRAINT FK__agreement_client
FOREIGN KEY (clientid) REFERENCES client(clientid); 
				 
ALTER TABLE agreement
ADD CONSTRAINT FK__agreement_lookupvalue_wgtype
FOREIGN KEY (wagetypeid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE agreement
ADD CONSTRAINT FK__agreement_lookupvalue_wgcategory
FOREIGN KEY (wagecategoryid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE agreement
ADD CONSTRAINT FK__agreement_lookupvalue_wgyear
FOREIGN KEY (wageyearid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE agreement
ADD CONSTRAINT FK__agreement_lookupvalue_wgarea
FOREIGN KEY (wageareaid) REFERENCES lookupvalue(lkvalid);   
				 
ALTER TABLE agreement
ADD CONSTRAINT FK__agreement_lookupvalue_agstatus
FOREIGN KEY (agreementstatusid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE agreement
ADD CONSTRAINT FK__agreement_lookupvalue_aggtype
FOREIGN KEY (agreementtypeid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE agreement
ADD CONSTRAINT FK__agreement_lookupvalue_agtype
FOREIGN KEY (agtypeid) REFERENCES lookupvalue(lkvalid);  

ALTER TABLE agreement_ams
ADD CONSTRAINT FK__agreement_ams_client
FOREIGN KEY (clientid) REFERENCES client(clientid);
				 
ALTER TABLE agreement_ams
ADD CONSTRAINT FK__agreement_ams_lookupvalue
FOREIGN KEY (wagetypeid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE agreement_ams
ADD CONSTRAINT FK__agreement_ams_lookupvalue_wgcategory
FOREIGN KEY (wagecategoryid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE agreement_ams
ADD CONSTRAINT FK__agreement_ams_lookupvalue_wgyear
FOREIGN KEY (wageyearid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE agreement_ams
ADD CONSTRAINT FK__agreement_ams_lookupvalue_wgarea
FOREIGN KEY (wageareaid) REFERENCES lookupvalue(lkvalid);   
				 
ALTER TABLE agreement_ams
ADD CONSTRAINT FK__agreement_ams_lookupvalue_agstatus
FOREIGN KEY (agreementstatusid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE agreement_ams
ADD CONSTRAINT FK__agreement_ams_lookupvalue_aggtype
FOREIGN KEY (agreementtypeid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE agreement_ams
ADD CONSTRAINT FK__agreement_ams_lookupvalue_agtype
FOREIGN KEY (agtypeid) REFERENCES lookupvalue(lkvalid); 
 	
ALTER TABLE agreementinfo
ADD CONSTRAINT FK__agreementinfo_agreement
FOREIGN KEY (agreementid) REFERENCES agreement(agreementid); 

ALTER TABLE agreementinfo
ADD CONSTRAINT FK__agreementinfo_project
FOREIGN KEY (projectid) REFERENCES project(projectid);
		
ALTER TABLE agreementdetail
ADD CONSTRAINT FK__agreementdetail_agreementinfo
FOREIGN KEY (agreementinfoid) REFERENCES agreementinfo(agreementinfoid); 
		
ALTER TABLE agreementdetail
ADD CONSTRAINT FK__agreementdetail_jobmaster
FOREIGN KEY (jobmasterid) REFERENCES jobmaster(jobmasterid); 

ALTER TABLE agreementdetail_ams
ADD CONSTRAINT FK__agreementdetail_ams_agreementinfo
FOREIGN KEY (agreementinfoid) REFERENCES agreementinfo(agreementinfoid); 
		
ALTER TABLE agreementdetail_ams
ADD CONSTRAINT FK__agreementdetail_ams_jobmaster
FOREIGN KEY (jobmasterid) REFERENCES jobmaster(jobmasterid); 

ALTER TABLE agreement_draft
ADD CONSTRAINT FK__agreement_draft_agreement
FOREIGN KEY (agreementid) REFERENCES agreement(agreementid); 
				 
ALTER TABLE attendance
ADD CONSTRAINT FK__attendance_client
FOREIGN KEY (clientid) REFERENCES client(clientid); 

ALTER TABLE attendance
ADD CONSTRAINT FK__attendance_project
FOREIGN KEY (projectid) REFERENCES project(projectid); 

ALTER TABLE attendance
ADD CONSTRAINT FK__attendance_member
FOREIGN KEY (memberid) REFERENCES member(memberid); 
		
ALTER TABLE attendance
ADD CONSTRAINT FK__attendance_jobmaster
FOREIGN KEY (jobmasterid) REFERENCES jobmaster(jobmasterid); 

ALTER TABLE attendance_other_expense
ADD CONSTRAINT FK__attendance_other_expense_project
FOREIGN KEY (projectid) REFERENCES project(projectid); 

ALTER TABLE attendance_other_expense
ADD CONSTRAINT FK__attendance_other_expense_member
FOREIGN KEY (memberid) REFERENCES member(memberid); 
		
ALTER TABLE attendance_other_expense
ADD CONSTRAINT FK__attendance_other_expense_attendance
FOREIGN KEY (attendanceid) REFERENCES attendance(attendanceid); 

ALTER TABLE bank_slip_details
ADD CONSTRAINT FK__bank_slip_details_bankslip
FOREIGN KEY (bankslipid) REFERENCES bankslip(bankslipid); 
		
ALTER TABLE bank_slip_details
ADD CONSTRAINT FK__bank_slip_details_invoice
FOREIGN KEY (invoiceid) REFERENCES invoice(invoiceid); 
		
				 
ALTER TABLE carryforward
ADD CONSTRAINT FK__carryforward_client
FOREIGN KEY (clientid) REFERENCES client(clientid); 

ALTER TABLE carryforward
ADD CONSTRAINT FK__carryforward_project
FOREIGN KEY (projectid) REFERENCES project(projectid); 
		
ALTER TABLE carryforward
ADD CONSTRAINT FK__carryforward_jobmaster
FOREIGN KEY (jobmasterid) REFERENCES jobmaster(jobmasterid); 
		
ALTER TABLE category
ADD CONSTRAINT FK__category_lookupvalue
FOREIGN KEY (maincategoryid) REFERENCES lookupvalue(lkvalid);  
				 
ALTER TABLE client
ADD CONSTRAINT FK__client_lookupvalue_district
FOREIGN KEY (districtid) REFERENCES lookupvalue(lkvalid); 
				 
ALTER TABLE client
ADD CONSTRAINT FK__client_lookupvalue_region
FOREIGN KEY (regionid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE client
ADD CONSTRAINT FK__client_lookupvalue_taluk
FOREIGN KEY (talukid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE client
ADD CONSTRAINT FK__client_lookupvalue_state
FOREIGN KEY (stateid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE client
ADD CONSTRAINT FK__client_lookupvalue_depttype
FOREIGN KEY (departmenttypeid) REFERENCES lookupvalue(lkvalid); 
				 
ALTER TABLE client
ADD CONSTRAINT FK__client_lookupvalue_country
FOREIGN KEY (countryid) REFERENCES lookupvalue(lkvalid); 
				 
ALTER TABLE client
ADD CONSTRAINT FK__client_lookupvalue_dept
FOREIGN KEY (deptid) REFERENCES lookupvalue(lkvalid); 
				 
ALTER TABLE client
ADD CONSTRAINT FK__client_lookupvalue_approval
FOREIGN KEY (approvalid) REFERENCES lookupvalue(lkvalid);   
				 
ALTER TABLE client_ams
ADD CONSTRAINT FK__client_ams_lookupvalue_district
FOREIGN KEY (districtid) REFERENCES lookupvalue(lkvalid); 
				 
ALTER TABLE client_ams
ADD CONSTRAINT FK__client_ams_lookupvalue_region
FOREIGN KEY (regionid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE client_ams
ADD CONSTRAINT FK__client_ams_lookupvalue_taluk
FOREIGN KEY (talukid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE client_ams
ADD CONSTRAINT FK__client_ams_lookupvalue_state
FOREIGN KEY (stateid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE client_ams
ADD CONSTRAINT FK__client_ams_lookupvalue_depttype
FOREIGN KEY (departmenttypeid) REFERENCES lookupvalue(lkvalid); 
				 
ALTER TABLE client_ams
ADD CONSTRAINT FK__client_ams_lookupvalue_country
FOREIGN KEY (countryid) REFERENCES lookupvalue(lkvalid); 
				 
ALTER TABLE client_ams
ADD CONSTRAINT FK__client_ams_lookupvalue_dept
FOREIGN KEY (deptid) REFERENCES lookupvalue(lkvalid); 
				 
ALTER TABLE client_ams
ADD CONSTRAINT FK__client_ams_lookupvalue_approval
FOREIGN KEY (approvalid) REFERENCES lookupvalue(lkvalid); 
				 
ALTER TABLE closed_project_members
ADD CONSTRAINT FK__closed_project_members_member
FOREIGN KEY (memberid) REFERENCES member(memberid); 
				 
ALTER TABLE document
ADD CONSTRAINT FK__document_documentfolder
FOREIGN KEY (folderid) REFERENCES documentfolder(folderid); 
				 
ALTER TABLE due
ADD CONSTRAINT FK__due_client
FOREIGN KEY (clientid) REFERENCES client(clientid); 

ALTER TABLE due
ADD CONSTRAINT FK__due_project
FOREIGN KEY (projectid) REFERENCES project(projectid); 

ALTER TABLE due
ADD CONSTRAINT FK__due_invoice
FOREIGN KEY (invoiceid) REFERENCES invoice(invoiceid); 

ALTER TABLE employee
ADD CONSTRAINT FK__employee_lookupvalue_region
FOREIGN KEY (regionid) REFERENCES lookupvalue(lkvalid);

ALTER TABLE employee
ADD CONSTRAINT FK__employee_role
FOREIGN KEY (roleid) REFERENCES role(roleid);
				 
ALTER TABLE invoice
ADD CONSTRAINT FK__invoice_client
FOREIGN KEY (clientid) REFERENCES client(clientid); 

ALTER TABLE invoice
ADD CONSTRAINT FK__invoice_project
FOREIGN KEY (projectid) REFERENCES project(projectid); 
				 
ALTER TABLE invoicedetail
ADD CONSTRAINT FK__invoicedetail_client
FOREIGN KEY (clientid) REFERENCES client(clientid); 

ALTER TABLE invoicedetail
ADD CONSTRAINT FK__invoicedetail_project
FOREIGN KEY (projectid) REFERENCES project(projectid); 
				 
ALTER TABLE invoicedetail
ADD CONSTRAINT FK__invoicedetail_jobmaster
FOREIGN KEY (jobmasterid) REFERENCES jobmaster(jobmasterid); 

ALTER TABLE invoicedetail
ADD CONSTRAINT FK__invoicedetail_invoice
FOREIGN KEY (invoiceid) REFERENCES invoice(invoiceid); 
				 
ALTER TABLE jobactivity
ADD CONSTRAINT FK__jobactivity_client
FOREIGN KEY (clientid) REFERENCES client(clientid); 

ALTER TABLE jobactivity
ADD CONSTRAINT FK__jobactivity_project
FOREIGN KEY (projectid) REFERENCES project(projectid); 
				 
ALTER TABLE jobactivity
ADD CONSTRAINT FK__jobactivity_member
FOREIGN KEY (memberid) REFERENCES member(memberid); 

ALTER TABLE jobactivity
ADD CONSTRAINT FK__jobactivity_jobpostingdetail
FOREIGN KEY (jobpostingdetailid) REFERENCES jobpostingdetail(jobpostingdetailid); 

ALTER TABLE jobactivityhistory
ADD CONSTRAINT FK__jobactivityhistory_jobactivity
FOREIGN KEY (jobactivityid) REFERENCES jobactivity(jobactivityid);  

ALTER TABLE jobeligibility
ADD CONSTRAINT FK__jobeligibility_jobmaster
FOREIGN KEY (jobmasterid) REFERENCES jobmaster(jobmasterid); 
				 
ALTER TABLE jobposting
ADD CONSTRAINT FK__jobposting_client
FOREIGN KEY (clientid) REFERENCES client(clientid); 

ALTER TABLE jobposting
ADD CONSTRAINT FK__jobposting_project
FOREIGN KEY (projectid) REFERENCES project(projectid); 

ALTER TABLE `jobposting`
ADD INDEX `FK_jobposting-active` (`active`);	
			 
ALTER TABLE jobpostingdetail
ADD CONSTRAINT FK__jobpostingdetail_jobposting
FOREIGN KEY (jobpostingid) REFERENCES jobposting(jobpostingid); 

ALTER TABLE jobpostingdetail
ADD CONSTRAINT FK__jobpostingdetail_jobmaster
FOREIGN KEY (jobmasterid) REFERENCES jobmaster(jobmasterid); 
				 
ALTER TABLE member
ADD CONSTRAINT FK__member_lookupvalue_taluk
FOREIGN KEY (talukid) REFERENCES lookupvalue(lkvalid); 

ALTER TABLE member
ADD CONSTRAINT FK__member_lookupvalue_state
FOREIGN KEY (stateid) REFERENCES lookupvalue(lkvalid); 
		
ALTER TABLE member
ADD CONSTRAINT FK__member_lookupvalue_country
FOREIGN KEY (countryid) REFERENCES lookupvalue(lkvalid); 

ALTER TABLE member
ADD CONSTRAINT FK__member_lookupvalue_district
FOREIGN KEY (districtid) REFERENCES lookupvalue(lkvalid); 
		
ALTER TABLE member
ADD CONSTRAINT FK__member_lookupvalue_region
FOREIGN KEY (regionid) REFERENCES lookupvalue(lkvalid); 
				 
ALTER TABLE member
ADD CONSTRAINT FK__member_lookupvalue_nominee_relation
FOREIGN KEY (nomineerelationid) REFERENCES lookupvalue(lkvalid); 

ALTER TABLE member
ADD CONSTRAINT FK__member_lookupvalue_rank
FOREIGN KEY (rankid) REFERENCES lookupvalue(lkvalid); 
		
ALTER TABLE member
ADD CONSTRAINT FK__member_lookupvalue_corp
FOREIGN KEY (corpsid) REFERENCES lookupvalue(lkvalid); 
				 
ALTER TABLE member
ADD CONSTRAINT FK__member_lookupvalue_trade
FOREIGN KEY (tradeid) REFERENCES lookupvalue(lkvalid); 

ALTER TABLE member
ADD CONSTRAINT FK__member_lookupvalue_character
FOREIGN KEY (characterid) REFERENCES lookupvalue(lkvalid); 
		
ALTER TABLE member
ADD CONSTRAINT FK__member_lookupvalue_religion
FOREIGN KEY (religionid) REFERENCES lookupvalue(lkvalid); 
		
ALTER TABLE memberblock
ADD CONSTRAINT FK__memberblock_member
FOREIGN KEY (memberid) REFERENCES member(memberid); 

ALTER TABLE memberhistory
ADD CONSTRAINT FK__memberhistory_member
FOREIGN KEY (memberid) REFERENCES member(memberid); 
		
ALTER TABLE memberhistory
ADD CONSTRAINT FK__memberhistory_project
FOREIGN KEY (projectid) REFERENCES project(projectid); 
				 
ALTER TABLE project
ADD CONSTRAINT FK__project_client
FOREIGN KEY (clientid) REFERENCES client(clientid); 
				 
ALTER TABLE project
ADD CONSTRAINT FK__project_lookupvalue_district
FOREIGN KEY (districtid) REFERENCES lookupvalue(lkvalid); 
				 
ALTER TABLE project
ADD CONSTRAINT FK__project_lookupvalue_region
FOREIGN KEY (regionid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE project
ADD CONSTRAINT FK__project_lookupvalue_status
FOREIGN KEY (statusid) REFERENCES lookupvalue(lkvalid); 
				 
ALTER TABLE project
ADD CONSTRAINT FK__project_lookupvalue_taluk
FOREIGN KEY (talukid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE project
ADD CONSTRAINT FK__project_category
FOREIGN KEY (categoryid) REFERENCES category(categoryid); 
				 
ALTER TABLE project
ADD CONSTRAINT FK__project_subcategory
FOREIGN KEY (subcategoryid) REFERENCES subcategory(subcategoryid);
				 
ALTER TABLE project_ams
ADD CONSTRAINT FK__project_ams_project
FOREIGN KEY (projectid) REFERENCES project(projectid); 
				 
ALTER TABLE project_ams
ADD CONSTRAINT FK__project_ams_client
FOREIGN KEY (clientid) REFERENCES client(clientid); 
				 
ALTER TABLE project_ams
ADD CONSTRAINT FK__project_ams_lookupvalue_district
FOREIGN KEY (districtid) REFERENCES lookupvalue(lkvalid); 
				 
ALTER TABLE project_ams
ADD CONSTRAINT FK__project_ams_lookupvalue_region
FOREIGN KEY (regionid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE project_ams
ADD CONSTRAINT FK__project_ams_lookupvalue_status
FOREIGN KEY (statusid) REFERENCES lookupvalue(lkvalid); 
				 
ALTER TABLE project_ams
ADD CONSTRAINT FK__project_ams_lookupvalue_taluk
FOREIGN KEY (talukid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE project_ams
ADD CONSTRAINT FK__project_ams_category
FOREIGN KEY (categoryid) REFERENCES category(categoryid); 
				 
ALTER TABLE project_ams
ADD CONSTRAINT FK__project_ams_subcategory
FOREIGN KEY (subcategoryid) REFERENCES subcategory(subcategoryid); 
				 
ALTER TABLE region_details
ADD CONSTRAINT FK__region_details_lookupvalue_region
FOREIGN KEY (rg_id) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE region_details
ADD CONSTRAINT FK__region_details_lookupvalue_district
FOREIGN KEY (dt_id) REFERENCES lookupvalue(lkvalid); 
				 
ALTER TABLE region_details
ADD CONSTRAINT FK__region_details_lookupvalue_taluk
FOREIGN KEY (tk_id) REFERENCES lookupvalue(lkvalid);
			
ALTER TABLE rolepermission
ADD CONSTRAINT FK__rolepermission_role
FOREIGN KEY (roleid) REFERENCES role(roleid);
				 
ALTER TABLE salaryslip
ADD CONSTRAINT FK__salaryslip_client
FOREIGN KEY (clientid) REFERENCES client(clientid); 

ALTER TABLE salaryslip
ADD CONSTRAINT FK__salaryslip_project
FOREIGN KEY (projectid) REFERENCES project(projectid); 

ALTER TABLE salaryslip
ADD CONSTRAINT FK__salaryslip_member
FOREIGN KEY (memberid) REFERENCES member(memberid); 
		
ALTER TABLE salaryslip
ADD CONSTRAINT FK__salaryslip_jobmaster
FOREIGN KEY (jobmasterid) REFERENCES jobmaster(jobmasterid); 
		
ALTER TABLE salaryslip
ADD CONSTRAINT FK__salaryslip_attendance
FOREIGN KEY (attendanceid) REFERENCES attendance(attendanceid); 
				 
ALTER TABLE salaryslip
ADD CONSTRAINT FK__salaryslip_lookupvalue_wagetype
FOREIGN KEY (wagetypeid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE salaryslip
ADD CONSTRAINT FK__salaryslip_lookupvalue_wagecategory
FOREIGN KEY (wagecategoryid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE salaryslip
ADD CONSTRAINT FK__salaryslip_lookupvalue_wageyear
FOREIGN KEY (wageyearid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE salaryslip
ADD CONSTRAINT FK__salaryslip_lookupvalue_wagearea
FOREIGN KEY (wageareaid) REFERENCES lookupvalue(lkvalid);   
				 
ALTER TABLE salaryslip_difference
ADD CONSTRAINT FK__salaryslip_difference_salaryslip
FOREIGN KEY (salaryslipid) REFERENCES salaryslip(salaryslipid); 
				 
ALTER TABLE salaryslip_difference
ADD CONSTRAINT FK__salaryslip_difference_client
FOREIGN KEY (clientid) REFERENCES client(clientid); 

ALTER TABLE salaryslip_difference
ADD CONSTRAINT FK__salaryslip_difference_project
FOREIGN KEY (projectid) REFERENCES project(projectid); 

ALTER TABLE salaryslip_difference
ADD CONSTRAINT FK__salaryslip_difference_member
FOREIGN KEY (memberid) REFERENCES member(memberid); 
		
ALTER TABLE salaryslip_difference
ADD CONSTRAINT FK__salaryslip_difference_jobmaster
FOREIGN KEY (jobmasterid) REFERENCES jobmaster(jobmasterid); 
		
ALTER TABLE salaryslip_difference
ADD CONSTRAINT FK__salaryslip_difference_attendance
FOREIGN KEY (attendanceid) REFERENCES attendance(attendanceid);  
				 
ALTER TABLE salaryslip_difference
ADD CONSTRAINT FK__salaryslip_difference_lookupvalue_wagetype
FOREIGN KEY (wagetypeid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE salaryslip_difference
ADD CONSTRAINT FK__salaryslip_difference_lookupvalue_wagecategory
FOREIGN KEY (wagecategoryid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE salaryslip_difference
ADD CONSTRAINT FK__salaryslip_difference_lookupvalue_wageyear
FOREIGN KEY (wageyearid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE salaryslip_difference
ADD CONSTRAINT FK__salaryslip_difference_lookupvalue_wagearea
FOREIGN KEY (wageareaid) REFERENCES lookupvalue(lkvalid);   
		
ALTER TABLE subcategory
ADD CONSTRAINT FK__subcategory_attendance
FOREIGN KEY (categoryid) REFERENCES category(categoryid); 

ALTER TABLE texconologs
ADD CONSTRAINT FK__texconologs_member
FOREIGN KEY (memberid) REFERENCES member(memberid); 
				 
ALTER TABLE wages
ADD CONSTRAINT FK__wages_lookupvalue_wagetype
FOREIGN KEY (wagetypeid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE wages
ADD CONSTRAINT FK__wages_lookupvalue_wagecategory
FOREIGN KEY (wagecategoryid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE wages
ADD CONSTRAINT FK__wages_lookupvalue_wageyear
FOREIGN KEY (wageyearid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE wages
ADD CONSTRAINT FK__wages_lookupvalue_wagearea
FOREIGN KEY (wageareaid) REFERENCES lookupvalue(lkvalid);   
				 
ALTER TABLE wages
ADD CONSTRAINT FK__wages_lookupvalue_particular
FOREIGN KEY (particularid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE wages
ADD CONSTRAINT FK__wages_jobmaster
FOREIGN KEY (jobmasterid) REFERENCES jobmaster(jobmasterid); 
				 
ALTER TABLE wage_category_master
ADD CONSTRAINT FK__wage_category_master_lookupvalue_wagetype
FOREIGN KEY (wagetypeid) REFERENCES lookupvalue(lkvalid);
				 
ALTER TABLE wage_category_master
ADD CONSTRAINT FK__wage_category_master_lookupvalue_wageyear
FOREIGN KEY (wageyearid) REFERENCES lookupvalue(lkvalid);