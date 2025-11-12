var room = require("rooms")
var util = require("util")

var rooms = ['W22S23', 'W23S23', 'W22S21', 'W21S22', 'W23S21', 'W22S22', 'W21S23', 'W21S24', 'W23S25']

var claimer = Game.creeps["claimer"]
if (claimer) {
    try {
        util.runClaimer(claimer)
    } catch (e) {
        console.log("Claimer error: " + e)
    }
}

var outbuilders = [
    {name:"outbuilder", room:"W21S24"}, 
    {name:"outbuilder2", room:"W23S25"}, 
    {name:"outbuilder3", room:"W21S23"}]
for (var o of outbuilders) {
    var outbuilder = Game.creeps[o.name]
    if (outbuilder) {
        try {
            util.runOutbuilder(outbuilder)
        } catch (e) {
            console.log(o.name + " error: " + e)
        }
    } else {
        Game.spawns["Spawn_W21S22"].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], o.name, {memory:{newRoom: o.room}})
    }
}

var outbuilders2 = [
    {name:"outbuilder2", room:"W21S24"}, 
    {name:"outbuilder22", room:"W23S25"}, 
    {name:"outbuilder32", room:"W21S23"}]
for (var o of outbuilders2) {
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

var outbuilders3 = [
    {name:"outbuilder23", room:"W21S24"}, 
    {name:"outbuilder223", room:"W23S25"}, 
    {name:"outbuilder323", room:"W21S23"}]
for (var o of outbuilders3) {
    var outbuilder = Game.creeps[o.name]
    if (outbuilder) {
        try {
            util.runOutbuilder(outbuilder)
        } catch (e) {
            console.log(o.name + " error: " + e)
        }
    } else {
        Game.spawns["Spawn_W22S21"].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], o.name, {memory:{newRoom: o.room}})
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