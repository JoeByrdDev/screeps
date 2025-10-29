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

var outbuilder = Game.creeps["outbuilder"]
if (outbuilder) {
    try {
        util.runOutbuilder(outbuilder)
    } catch (e) {
        console.log("Outbuilder error: " + e)
    }
} else {
    Game.spawns["Spawn_W22S23"].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], "outbuilder", {memory:{newRoom: "W23S23"}})
}

var outbuilder2 = Game.creeps["outbuilder2"]
if (outbuilder2) {
    try {
        util.runOutbuilder(outbuilder2)
    } catch (e) {
        console.log("Outbuilder2 error: " + e)
    }
} else {
    Game.spawns["Spawn_W22S23"].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], "outbuilder2", {memory:{newRoom: "W22S21"}})
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