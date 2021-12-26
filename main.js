routes = {
	"Route1": false,
	"Route2": false,
	"Route3": false,
	"Route4": false
}

blocks = {
	"AC01AYRST": ["Route1", "Route3"],
	"AC4611BT": ["Route1", "Route3"],
	"AC4701BT": ["Route1", "Route3"],
	"AC02AYRST": ["Route2", "Route4"],
	"AC4612BT": ["Route2", "Route4"],
	"AC4702BT": ["Route2", "Route4"]
}

requirements = {
	"Route1": ["Route3"],
	"Route2": ["Route4"],
	"Route3": ["Route1"],
	"Route4": ["Route2"]
}

function help() {
	newMessage("<br>Commands<br>set x: Set the x route<br>help: Show help<br>clear: Clear the console<br>status: Display the routes' current status")
}

function showStatus() {
	statusText = "<br>"
	for (route in routes) {
		if (routes[route]) {
			statusText = statusText + route + ": set<br>"
		} else {
			statusText = statusText + route + ": not set<br>"
		}
	}
	newMessage(statusText)
}

function setroute(e) {
	if (!(e in routes)) {
		newMessage("Route not found", "red")
		return
	}
	if (routes[e]) {
		routes[e] = false
		newMessage(e + " unset", "lightgreen")
	} else {
		conditionsSatisfied = true
		requirements[e].forEach(element => {
			if (routes[element] == true) {
				conditionsSatisfied = false
			}
		});
		if (conditionsSatisfied == true) {
			routes[e] = true
			newMessage(e + " set", "lightgreen")
		} else {
			newMessage(e + " cannot be set because the following conditions are not satisfied: " + requirements[e], "red")
		}
	}
}

function newMessage(msg, color = "white") {
    consoleDiv = document.getElementById("consoleDiv")
    var d = new Date()
    consoleDiv.insertAdjacentHTML("beforeend", "<p style='margin-bottom: 10px'><b style='color: " + color + "'>" + d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}) + "</b> " + msg + "</p>")
    consoleDiv.scrollTop = consoleDiv.scrollHeight
}

function displayroutes() {
	for (block in blocks) {
		blockGreen = false
		blocks[block].forEach(i => {
			if (routes[i]) {
				blockGreen = true
			}	
		});
		if (blockGreen) {
			document.getElementById("stationsvg").getElementById(block).style.fill = "#00db00"
		} else {
			document.getElementById("stationsvg").getElementById(block).style.fill = "#FFE212"
		}
	}
}

function update() {
    requestAnimationFrame(update);

	for (let a in routes) {
		document.getElementById(a).setAttribute("active", routes[a])
	}
	var d = new Date()
	document.getElementById("timedisplay").innerHTML = d.toLocaleTimeString()

	displayroutes()
}

requestAnimationFrame(update);

function consolesend() {
	receivedCommand = document.getElementById("consoleinput").value.split(/(\s+)/).filter( e => e.trim().length > 0)
	consoleDiv.insertAdjacentHTML("beforeend", "<p style='margin-bottom: 10px'> >>> " + document.getElementById("consoleinput").value + "</p>")
    consoleDiv.scrollTop = consoleDiv.scrollHeight
	document.getElementById("consoleinput").value = ""
	if (receivedCommand[0].toLowerCase() == "set") {
		if (receivedCommand[1]) {
			setroute(receivedCommand[1])
		} else {
			newMessage("Please add the route name to the command", "red")
		}
	} else if (receivedCommand[0].toLowerCase() == "help") {
		help()
	} else if (receivedCommand[0].toLowerCase() == "clear") {
		consoleDiv.innerHTML = ""
	} else if (receivedCommand[0].toLowerCase() == "status") {
		showStatus()
	} else {
		newMessage("Command not found", "red")
	}
}

function toggleFullScreen() {
	if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
	  if (document.documentElement.requestFullscreen) {
		document.documentElement.requestFullscreen();
	  } else if (document.documentElement.mozRequestFullScreen) {
		document.documentElement.mozRequestFullScreen();
	  } else if (document.documentElement.webkitRequestFullscreen) {
		document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	  }
	} else {
	   if (document.cancelFullScreen) {
		  document.cancelFullScreen();
	   } else if (document.mozCancelFullScreen) {
		  document.mozCancelFullScreen();
	   } else if (document.webkitCancelFullScreen) {
		 document.webkitCancelFullScreen();
	   }
	}
  }