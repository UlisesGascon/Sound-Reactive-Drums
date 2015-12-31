pixel = require("node-pixel");
five = require("johnny-five");

var board = new five.Board();
var ruidoAmbiental = 150;

board.on("ready", function() {
	var bomboMic = new five.Sensor("A0");
    var bomboLeds = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [ {pin: 6, length: 30} ],
    });

    bomboLeds.on("ready", function() {
    	// En caso de reset
   		bomboLeds.colour("black");
    	
    	bomboMic.on("data", function() {
    		var estimacion = (this.value - 512) - ruidoAmbiental;
			bomboIluminacion(estimacion);
		});
	
    });
	
	bomboLeds.on("error", function(err) {
        console.log("El error es ", err);
    });

	function bomboIluminacion (estimacion) {
		if (estimacion > 200) {
		   	bomboLeds.color("#BD1A1A");
			bomboLeds.show();
    	} else {
    		bomboLeds.colour("black");
    		bomboLeds.show();
    	}
	}
});