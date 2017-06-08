
<html>
	<head>
		<title>CSIE Guide</title>
		<style type="text/css">
			#ctrlPanel{
				margin-top: 25px;
				border-style: solid;
				border-color: #000000;
			}
		</style>
		<script type="text/javascript" src="savepoint.js"></script>
		<script type="text/javascript">
			
			// GUI
			var ctrlPanel;
			var inputPanel;
			var nameInput;
			var wifiAmpInputs = [];
			var websiteInput;
			
			readInputSavePoint = function(){
				var wifiAmps = [];
				for(var i=0;i<MAX_WIFI;i++){
					wifiAmps[i] = wifiAmpInputs[i].value;
					if(wifiAmps[i]==""){
						return null;
					}
				}
				return new SavePoint(wifiAmps);
			}
			
			//refresh control panel according to current savepoint data
			function refreshCtrlPanel(){
				//clear control panel
				while (ctrlPanel.firstChild) {
					ctrlPanel.removeChild(ctrlPanel.firstChild);	
				}
				//add new things on control panel
				for(var name in savePoints){
					var div = document.createElement("div");
					div.innerHTML = name;
					//add save button
					var loadButton = document.createElement("button");
					loadButton.innerHTML = "Load";
					loadButton.onclick = (function(name){
						return function(){
							nameInput.value = name;
							for(var i=0;i<MAX_WIFI;i++){
								wifiAmpInputs[i].value = savePoints[name].wifiAmps[i];
							}
							websiteInput.value = savePoints[name].website;
						}
					})(name);
					div.appendChild(loadButton);
					//add delete button
					var deleteButton = document.createElement("button");
					deleteButton.innerHTML = "Delete";
					deleteButton.onclick = (function(div, name){
						return function(){
							ctrlPanel.removeChild(div);
							delete savePoints[name];
							saveCookies();
						}
					})(div, name);
					div.appendChild(deleteButton);
					ctrlPanel.appendChild(div);	
				}
			}
			
			function onLoad(){
				//init
				ctrlPanel = document.getElementById("ctrlPanel");
				inputPanel = document.getElementById("inputPanel");
				savePoints = loadCookies();
				//load inputPanel
				var div;
				div = document.createElement("div");
				div.innerHTML = "SavePointName: ";
				nameInput = document.createElement("input");
				nameInput.type = "text";
				nameInput.id = "savePointName";
				div.appendChild(nameInput);
				div.appendChild(document.createElement("br"));
				inputPanel.appendChild(div);
				for(var i=0;i<ssid.length;i++){
					div = document.createElement("div");
					div.innerHTML = "WifiAmp" + i + ": ";
					//add save button
					wifiAmpInputs[i] = document.createElement("input");
					wifiAmpInputs[i].type = "text";
					wifiAmpInputs[i].id = "wifiAmp" + i;
					div.appendChild(wifiAmpInputs[i]);
					div.appendChild(document.createElement("br"));
					inputPanel.appendChild(div);	
				}
				div = document.createElement("div");
				div.innerHTML = "Website: ";
				websiteInput = document.createElement("input");
				websiteInput.type = "text";
				websiteInput.id = "website";
				div.appendChild(websiteInput);
				div.appendChild(document.createElement("br"));
				inputPanel.appendChild(div);
				refreshCtrlPanel();
			}
		
			function saveOnClick(){
				var name = nameInput.value;
				var website= websiteInput.value;
				var savePoint = readInputSavePoint();
				if(name != "" && website != "" && savePoint != null){
					savePoint.bind(website);
					savePoints[name] = savePoint;
				}
				refreshCtrlPanel();
				saveCookies();
				
			}
			
			function cmpOnClick(){
				var savePoint = readInputSavePoint();
				if(savePoint!=null){
					//find the one that matches
					var min = 1000000;
					var minSavePoint = "";
					for(var name in savePoints){
						var dot = SavePoint.compare(savePoints[name], savePoint);
						if(dot < min){
							min = dot;
							minSavePoint = name;
						}
					}
					if(minSavePoint==""){
						alert("Not found");
					}
					else{
						alert("Save point " + minSavePoint + " Amp = " + min);
					}
				}
				else{
					alert("Some input fields are empty.")
				}
				
			}
			
			
		</script>
	</head>
	<body onload="onLoad()">
		<h1>Welcome to CSIE Guide</h1>
		<div id=inputPanel>
		</div>
		<br>
		
		<button id=saveButton onclick="saveOnClick()">Save</button>
		<button id=cmpButton onclick="cmpOnClick()">Compare</button>
		<hr>
		<h2>Save points:</h2>
		<div id=ctrlPanel margin-top=25px>
			
		</div>
			
	</body>
</html>