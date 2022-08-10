"use strict"

var blockGreen = false
var conditionsSatisfied = false
var receivedCommand
var statusText
var consoleDiv
var blockSet

var allBlocks = {
	"T000": false,
	"T001": false,
	"T003": false
}

var routes = {
	// Field Entry
	"Route01": false,
	"Route02": false,
	"Route03": false,
	"Route04": false,
	"Route05": false,
	"Route06": false,
	// Field Exit
	"Route11": false,
	"Route12": false,
	"Route13": false,
	"Route14": false,
	"Route15": false,
	"Route16": false,
	// Parking Entry - South
	"Route21": false,
	"Route22": false,
	"Route23": false,
	"Route24": false,
	"Route25": false,
	"Route26": false,
	"Route27": false,
	"Route28": false,
	// Parking Entry - North
	"Route31": false,
	"Route32": false,
	"Route33": false,
	"Route34": false,
	"Route35": false,
	"Route36": false,
	"Route37": false,
	"Route38": false,
	// Parking Exit - South
	"Route41": false,
	"Route42": false,
	"Route43": false,
	"Route44": false,
	"Route45": false,
	"Route46": false,
	"Route47": false,
	"Route48": false,
	// Parking Exit - North
	"Route51": false,
	"Route52": false,
	"Route53": false,
	"Route54": false,
	"Route55": false,
	"Route56": false,
	"Route57": false,
	"Route58": false,
}

var routeBlocks = {
	// Field Entry
	"Route01": ["T001", "T003", "T000"],
	"Route02": ["T002", "T003", "T000"],
	"Route03": ["T001", "T003", "T006"],
	"Route04": ["T002", "T003", "T006"],
	"Route05": ["T004", "T007"],
	"Route06": ["T005", "T007"],
	// Field Exit
	"Route11": ["T001", "T003", "T000"],
	"Route12": ["T002", "T003", "T000"],
	"Route13": ["T001", "T003", "T006"],
	"Route14": ["T002", "T003", "T006"],
	"Route15": ["T004", "T007"],
	"Route16": ["T005", "T007"],
	// Parking Entry - South
	"Route21": ["T006", "T009", "T030", "T020", "T010", "T011", "T012"],
	"Route22": ["T006", "T009", "T030", "T020", "T021", "T022"],
	"Route23": ["T006", "T009", "T030", "T130", "T031", "T032"],
	"Route24": ["T006", "T009", "T030", "T130", "T040", "T041", "T042"],
	"Route25": ["T006", "T060", "T160", "T050", "T051", "T052"],
	"Route26": ["T006", "T060", "T160", "T061", "T062"],
	"Route27": ["T006", "T060", "T070", "T071", "T072"],
	"Route28": ["T006", "T060", "T070", "T080", "T081", "T082"],
	// Parking Entry - North
	"Route31": ["T007", "T034", "T033", "T120", "T013", "T012", "T011"],
	"Route32": ["T007", "T034", "T033", "T120", "T023", "T022", "T021"],
	"Route33": ["T007", "T034", "T033", "T230", "T032", "T031"],
	"Route34": ["T007", "T034", "T033", "T230", "T043", "T042", "T041"],
	"Route35": ["T007", "T085", "T064", "T063", "T053", "T052", "T051"],
	"Route36": ["T007", "T085", "T064", "T063", "T062", "T061"],
	"Route37": ["T007", "T085", "T084", "T073", "T072", "T071"],
	"Route38": ["T007", "T085", "T084", "T083", "T082", "T081"],
	// Parking Exit - South
	"Route41": ["T006", "T009", "T030", "T020", "T010", "T011", "T012"],
	"Route42": ["T006", "T009", "T030", "T020", "T021", "T022"],
	"Route43": ["T006", "T009", "T030", "T130", "T031", "T032"],
	"Route44": ["T006", "T009", "T030", "T130", "T040", "T041", "T042"],
	"Route45": ["T006", "T060", "T160", "T050", "T051", "T052"],
	"Route46": ["T006", "T060", "T160", "T061", "T062"],
	"Route47": ["T006", "T060", "T070", "T071", "T072"],
	"Route48": ["T006", "T060", "T070", "T080", "T081", "T082"],
	// Parking Exit - North
	"Route51": ["T007", "T034", "T033", "T120", "T013", "T012", "T011"],
	"Route52": ["T007", "T034", "T033", "T120", "T023", "T022", "T021"],
	"Route53": ["T007", "T034", "T033", "T230", "T032", "T031"],
	"Route54": ["T007", "T034", "T033", "T230", "T043", "T042", "T041"],
	"Route55": ["T007", "T085", "T064", "T063", "T053", "T052", "T051"],
	"Route56": ["T007", "T085", "T064", "T063", "T062", "T061"],
	"Route57": ["T007", "T085", "T084", "T073", "T072", "T071"],
	"Route58": ["T007", "T085", "T084", "T083", "T082", "T081"],
}

var requirements = {
	"Route01": ["Route11", "Route02", "Route03", "Route04"],
	"Route02": ["Route12", "Route01", "Route03", "Route04"],
	"Route03": ["Route13", "Route01", "Route02", "Route04"],
	"Route04": ["Route14", "Route01", "Route02", "Route03"],
	"Route05": ["Route06"],
	"Route06": ["Route05"],
	// Field Exit
	"Route11": ["Route01"],
	"Route12": ["Route02"],
	"Route13": ["Route03"],
	"Route14": ["Route04"],
	"Route15": ["Route05"],
	"Route16": ["Route06"],
	// Parking Entry - South
	"Route21": ["Route41"],
	"Route22": ["Route42"],
	"Route23": ["Route43"],
	"Route24": ["Route44"],
	"Route25": ["Route45"],
	"Route26": ["Route46"],
	"Route27": ["Route47"],
	"Route28": ["Route48"],
	// Parking Entry - North
	"Route31": [],
	"Route32": [],
	"Route33": [],
	"Route34": [],
	"Route35": [],
	"Route36": [],
	"Route37": [],
	"Route38": [],
	// Parking Exit - South
	"Route41": [],
	"Route42": [],
	"Route43": [],
	"Route44": [],
	"Route45": [],
	"Route46": [],
	"Route47": [],
	"Route48": [],
	// Parking Exit - North
	"Route51": [],
	"Route52": [],
	"Route53": [],
	"Route54": [],
	"Route55": [],
	"Route56": [],
	"Route57": [],
	"Route58": [],
}

function help() {
	newMessage("<br>Commands<br>set x: Set the x route<br>help: Show help<br>clear: Clear the console<br>status: Display the routes' current status")
}

function showStatus() {
	statusText = "<br>"
	for (var route in routes) {
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
			newMessage(e + " cannot be set because it conflicts with other routes. Check these routes first: " + requirements[e], "red")
		}
	}
}


function setBlocks() {
	for (var block in allBlocks) {
		allBlocks[block] = false
	}
	for (var route in routeBlocks) {
		if (routes[route]) {
			routeBlocks[route].forEach(i => {
				allBlocks[i] = true
			})
		}
	}
}

function newMessage(msg, color = "white") {
    consoleDiv = document.getElementById("consoleDiv")
    var d = new Date()
    consoleDiv.insertAdjacentHTML("beforeend", "<p style='margin-bottom: 10px'><b style='color: " + color + "'>" + d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}) + "</b> " + msg + "</p>")
    consoleDiv.scrollTop = consoleDiv.scrollHeight
}

function displayBlocks() {
	//console.log(allBlocks)
	for(var block in allBlocks) {
		if (allBlocks[block]) {
			document.getElementById("stationsvg").getElementById(block).style.fill = "#00db00"
		} else {
			document.getElementById("stationsvg").getElementById(block).style.fill = "#FFE212"
		}
	}
}

function update() {
    requestAnimationFrame(update);

	for (var a in routes) {
		document.getElementById(a).setAttribute("active", routes[a])
	}
	var d = new Date()
	document.getElementById("timedisplay").innerHTML = d.toLocaleTimeString()

	setBlocks()
	displayBlocks()
}

requestAnimationFrame(update);

function consolesend() {
	receivedCommand = document.getElementById("consoleinput").value.split(/(\s+)/).filter( e => e.trim().length > 0)
	if (receivedCommand == "") {
		return
	}
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