var room = require("rooms")
var util = require("util")

var rooms = ['W22S23']

var claimer = Game.creeps["claimer"]
if (claimer) {
    try {
        util.runClaimer(claimer)
    } catch (e) {
        console.log("Claimer error: " + e)
    }
}

for (var i in rooms) {
    var r = rooms[i]
    try {
        var level = Game.rooms[r].controller.level
        
        if (!Game.spawns["Spawn_" + r]) continue
        
        if (Game.spawns["Spawn_" + r].hits < Game.spawns["Spawn_" + r].hitsMax) {
            Game.rooms[r].controller.activateSafeMode()
        }
        room.basicRoom(r)
    } catch (e) {
        console.log("Error in room " + r + ": " + e)
    }
}