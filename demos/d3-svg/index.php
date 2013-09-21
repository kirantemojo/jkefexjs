<?php
    include '../../mobile.php';
    $detect = new Mobile_Detect;
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/foundation.css">
        <link rel="stylesheet" href="css/custom.css">
        <link rel="stylesheet" href="css/d3.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
        <div id="wrapper">
            <header>
                <div id="img"><img src="img/HTML5CSS3Logos.svg" alt=""></div>
                 <!-- <div id="img"><img src="http://ohdoylerules.com/content/images/css3.svg" alt=""></div> -->
                <h3>D3 JS - SVG Canvas</h3>
                
            </header>
            <section class="d3-wrapper">
            </section>
            <footer id="footer">
                <h6>jKefex JS - Experiments - Amruthaluri Kiran Kumar</h6>
            </footer>
        </div>

        <audio>
          <source src="assets/Beautiful Sound of The Ocean.mp3" type="audio/mpeg">
          <source src="assets/Beautiful_Sound_of_The_Ocean.ogg" type="audio/ogg">
          Your browser does not support this audio format.
        </audio>
        <audio>
          <source src="assets/06 - Subhanallah.mp3" type="audio/mpeg">
          <source src="assets/06_Subhanallah.ogg" type="audio/ogg">
          Your browser does not support this audio format.
        </audio>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.2.min.js"><\/script>')</script>
        <script src="js/d3.v3.min.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/stack.js"></script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='//www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-XXXXX-X');ga('send','pageview');
        </script>
    </body>
</html>