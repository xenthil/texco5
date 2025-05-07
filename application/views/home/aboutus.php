<style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 60%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC12zLASngnKX6nOMXWMvlvWO4kan8R52w"></script>
    <script>
      // In this example, we center the map, and add a marker, using a LatLng object
      // literal instead of a google.maps.LatLng object. LatLng object literals are
      // a convenient way to add a LatLng coordinate and, in most cases, can be used
      // in place of a google.maps.LatLng object.

      var map;
      function initialize() {
        var mapOptions = {
          zoom: 15,
          center: {lat: 13.014357, lng: 80.227913}
        };
        map = new google.maps.Map(document.getElementById('map'),
            mapOptions);

        var marker = new google.maps.Marker({
          position: {lat: 13.014357, lng: 80.227913},
          map: map
        });

        // You can use a LatLng literal in place of a google.maps.LatLng object when
        // creating the Marker object. Once the Marker object is instantiated, its
        // position will be available as a google.maps.LatLng object. In this case,
        // we retrieve the marker's position using the
        // google.maps.LatLng.getPosition() method.
        var infowindow = new google.maps.InfoWindow({
          content: '<p>Marker Location:' + marker.getPosition() + '</p>'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
        });
      }

      google.maps.event.addDomListener(window, 'load', initialize);
    </script>

<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">About Us</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url()?>" class="breadcrumb">Home</a> <span class="breadcrumb">About Us</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax">
     <img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row">
   <div class=" container">
      <div class="row">
         <ul class="collection">
            <li class="collection-item avatar">
               <i class="material-icons circle green">assignment_ind</i>
               <h4>Who are we?</h4>
               <p style="font-size: 17px;">
				<br>
           		  A committee under the Chairmanship of then Deputy Minister for Defence, Thiru.K.P.Singh Deo, had been formed for creation
                  of State Ex-Servicemen's Corporation like TEXCO, in the interest of Ex-Servicemen. Based on the recommendations of the
                  Committee, Tamil Nadu Ex-Servicemen's Corporation Limited was formed on 28.01.1986 as approved by Government of Tamil
                  Nadu vide G.O.Ms.No. 889 dt 07.05.1985 of Public (Ex-Servicemen) Department. Accordingly, this Corporation was registered
                  under the Companies Act 1956 vide registration number 12609 / 1986. The date of incorporation of business was 12.02.1986.
               <br>
               <br>
                  Providing Industrial Security and other allied services based on the needs of Government Institutions / Departments / PSUs and
                  Societies.
               <br>
               <br>
                  Providing Security arrangements and other man power like, Accountant, Computer Literate, Warden, Nursing
                  Assistant, Clerks, Typist, Telecommunication Operators, Pharmacist, Auto mobile Mechanics, Drivers, Fire Fighting
                  Crew, Gun man, etc.,
               <br>
               <br>
                  Managing Paid Parking System.
               <br>
               <br>
                  Maintenance and management of BELL 412 HELICOPTER AND
                  CESSNA Air Craft of Government of Tamil Nadu.
               </p>
            </li>
            <li class="collection-item avatar">
               <i class="material-icons circle green">thumb_up</i>
               <h4>What do we do?</h4>
               <p style="font-size: 17px;">
               	 <br>
                  1. To provide necessary assistance to the Ex-Servicemen belonging to Tamil Nadu (hereinafter referred to as the Ex-Servicemen /
                  and their dependants) in planning, formulating, securing of financial assistance / commencement and conduct of various business
                  enterprises, and in establishing them for the resettlement / rehabilitation of Ex-Servicemen.
                  <br>
                  <br>
                  2. To formulate and execute various schemes for the welfare and economic uplift of the Ex-Servicemen and their dependants.
                  <br>
                  <br>
                  3. To promote entrepreneurship among Ex-Servicemen and their dependants.
               </p>
            </li>
            <li class="collection-item avatar">
               <i class="material-icons circle green">thumb_up</i>
               <h4>Our Address</h4>
               <div class="row">
               <div class="col s4">
               <h5>Tamil Nadu Ex Servicemen's Corporation Limited</h5>
               <br>
               <p style="font-size: 17px;">
               No.2,
               <br>
               West Mada Street,
			   <br>
               Sri Nagar Colony,
			   <br>
               Saidapet,
               <br>
               Chennai,
			   <br>
               Tamil Nadu - 600015
               </p>
               </div>
               <div class="col s8">
               <div id="map"></div>
               </div>
               </div>
            </li>
         </ul>
      </div>
   </div>
</div>
