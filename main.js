var room = require("rooms")
var util = require("util")

var rooms = ['W22S23', 'W23S23', 'W22S21', 'W21S22', 'W23S21', 'W22S22']

var claimer = Game.creeps["claimer"]
if (claimer) {
    try {
        util.runClaimer(claimer)
    } catch (e) {
        console.log("Claimer error: " + e)
    }
}

var outbuilders = [
    {name:"outbuilder", room:"W23S21"}, 
    {name:"outbuilder2", room:"W22S22"}, 
    {name:"outbuilder3", room:"W21S22"}]
for (var o of outbuilders) {
    var outbuilder = Game.creeps[o.name]
    if (outbuilder) {
        try {
            util.runOutbuilder(outbuilder)
        } catch (e) {
            console.log(o.name + " error: " + e)
        }
    } else {
        Game.spawns["Spawn_W22S23"].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], o.name, {memory:{newRoom: o.room}})
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