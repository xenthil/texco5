
<footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l3 s12" style="margin-right: 35px;">
              	<div class="row">
                	<div class="responsive-img"><div class="responsive-img">
                    <a href="<?php echo base_url()?>">
                    <img src="<?php echo base_url("assets/images/login.PNG")?>"> </a> </div>
                    </div>
                </div>
                <ul>
                <li class="">No.2, West Mada Street, </li>
                  <li> Sri Nagar Colony, </li>
                  <li> Saidapet </li>
                  <li>Chennai - 600015</li>
               </ul>
              </div>
              <div class="col l2 s12" style="margin-right: 10px;">
                <h5 class="">User Links</h5>
                <ul>
                  <li><a class="grey-text" href="<?php echo base_url()?>">Home</a></li>
                  <li><a class="grey-text" href="<?php echo base_url("aboutus")?>">About Us</a></li>
                  <li><a class="grey-text" href="<?php echo base_url("vacancy")?>">Vacancy</a></li>
                  <li><a class="grey-text " href="<?php echo base_url("register")?>">Register (Ex-Servicemen)</a></li>
                   <li><a class="grey-text " href="<?php echo base_url("employerregister")?>">Register (Employer)</a></li>
                  <li><a class="grey-text " href="<?php echo base_url("services")?>">Our Services</a></li>
                  <li><a class="grey-text " href="<?php echo base_url("images")?>">Gallery</a></li>
                  <li><a class="grey-text " href="<?php echo base_url("contactus")?>">Contact Us</a></li>
                </ul>
              </div>
              <div class="col l3 s12" style="margin-right: 20px;">
                <h5 class="">Important Links</h5>
                <ul>
                  <li><a class="grey-text" target="_blank" href="http://www.nvsp.in/">National Voter's Service Portal (NVSP)</a></li>
                  <li><a class="grey-text" target="_blank" href="http://ddpmod.gov.in/">Department of Defence Production</a></li>
                  <li><a class="grey-text" target="_blank" href="http://www.mha.gov.in/">Ministry of Home Affairs</a></li>
                  <li><a class="grey-text " target="_blank" href="http://indianairforce.nic.in/">Indian Air Force</a></li>
                  <li><a class="grey-text " target="_blank" href="https://indianarmy.nic.in/index.aspx">Indian Army</a></li>
                  <li><a class="grey-text " target="_blank" href="https://indiancoastguard.gov.in/">Indian Coast Guard</a></li>
                  <li><a class="grey-text " target="_blank" href="http://echs.gov.in/">Ex-Servicemen Contributory Health Scheme (ECHS)</a></li>
                  <li><a class="grey-text " target="_blank" href="http://www.exarmynaukri.com/APA/WEB/common/index.jsp">Army Welfare Placement Organisation(AWPO)</a></li>
                </ul>
              </div>
              <div class="col l3 s12 ">
                <h5 class="">Related Links</h5>
                <ul>
                  <li><a class="grey-text" target="_blank" href="https://mod.gov.in/">Ministry of Defence</a></li>
                  <li><a class="grey-text" target="_blank" href="https://www.drdo.gov.in/drdo/English/index.jsp?pg=homebody.jsp">Defence Research and Development Organisation (DRDO)</a></li>
                  <li><a class="grey-text" target="_blank" href="http://www.cisf.gov.in/">Central Industrial Security Force</a></li>
                  <li><a class="grey-text " target="_blank" href="http://indiannavy.nic.in/">Indian Navy</a></li>
                  <li><a class="grey-text " target="_blank" href="http://indianarmyveterans.gov.in/">Army Veterans Grievance Handling Portal</a></li>
                  <li><a class="grey-text " target="_blank" href="https://mail.gov.in/iwc_static/c11n/allDomain/layout/login_gov2.jsp?lang=en-US&3.0.1.2.0_15121607&svcs=abs,mail,smime,calendar,c11n">NIC Email</a></li>
                  <li><a class="grey-text " target="_blank" href="https://pgportal.gov.in/">CPGRAMS</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
        <div class="container">  <span class="grey-text">Copyright © 2017 - All Rights Reserved <a href="<?php echo base_url()?>">Texco</a></span></div>
      </div>
        </footer>

<script type="text/javascript">
  // Initialize collapse button
  $(document).ready(function(){
    $(".button-collapse").sideNav();
     $('select').material_select();
    $('.slider').slider();
    $('.modal').modal({
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
    });
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 100, // Creates a dropdown of 15 years to control year
      max: new Date(),
      onSet: function( arg ){
        if ( 'select' in arg ){ //prevent closing on selecting month/year
            this.close();
        }
    }
    });
    

    function escapeSpecialCharacters(string) {
      if (typeof string !== "string" || !string.trim()) {
          return "";
      }
      // Remove HTML tags
      const noHtmlTags = string.replace(/<\/?[^>]+(>|$)/g, "");
      
      // Remove special characters including (){}
      const noSpecialChars = noHtmlTags.replace(/[^a-zA-Z0-9\s]/g, "");
      
      return noSpecialChars;
    }

    $(document).on("keyup", ".validate", function () {
        var cursorPosition = this.selectionStart; // Preserve cursor position
        var sanitizedValue = escapeSpecialCharacters($(this).val());
        $(this).val(sanitizedValue);
        this.setSelectionRange(cursorPosition, cursorPosition); // Restore cursor position
    });
    
  });
  
  
  $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'right', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
      }
    );

</script>

<!-- <script>
(function() {

  var memid ='<?php //echo $this->session->userdata('memberid'); ?>';
  if (memid !='')
  {
    const idleDurationSecs = 5000;    // X number of seconds
    const redirectUrl = 'member/logout';  // Redirect idle users to this URL
    let idleTimeout; // variable to hold the timeout, do not modify

    const resetIdleTimeout = function() {

        // Clears the existing timeout
        if(idleTimeout) clearTimeout(idleTimeout);

        // Set a new idle timeout to load the redirectUrl after idleDurationSecs
        idleTimeout = setTimeout(() => location.href = redirectUrl, idleDurationSecs * 1000);
    };

    // Init on page load
    resetIdleTimeout();

    // Reset the idle timeout on any of the events listed below
    ['click', 'touchstart', 'mousemove'].forEach(evt => 
        document.addEventListener(evt, resetIdleTimeout, false)
    );
  }
})();
</script> -->


</body>
</html>
