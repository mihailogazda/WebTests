
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="style.css" >
        
        <script>
            
            
            <?php
                echo "var tilesetJSON = '" . preg_replace('/[^(\x20-\x7F)]*/','', file_get_contents("./images/tileset.json")) . "';";
            ?>
           
            
        </script>
        
        <script type="text/javascript" src="jquery-1.8.2.min.js"> </script>
        <script type="text/javascript" src="crafty.js"></script>
        <script type="text/javascript" src="play.js"></script>
        <script type="text/javascript" src="menu.js"></script>
        <script type="text/javascript" src="complete.js"></script>
        <script type="text/javascript" src="main.js"></script>
        
        
        <script type="text/javascript">

          var _gaq = _gaq || [];
          _gaq.push(['_setAccount', 'UA-37191279-1']);
          _gaq.push(['_trackPageview']);

          (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
          })();

        </script>            
        
    </head>
    <body>
        
        <noscript> Oh noez JavaScript... Looks like we have a badass over here...</noscript>
        
        <div id="cr-outer">
            <h1> The PSY Stretch Game </h1>
            <div id="cr-stage"></div>                        
        </div>
    
    </body>
</html>
