<?php
	
	function saveMap($data) {
            $filename = "./maps/untitled.htc";
            file_put_contents($filename, $data);
            echo "download.php?file=" . $filename;
	}
	
	$data = $_POST["data"];
	if (isset($data)){
		$data = stripslashes($data);
		saveMap($data);
	}	

?>