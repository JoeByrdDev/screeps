var room = require("rooms")
var util = require("util")

var rooms = ['W22S23', 'W23S23', 'W22S21', 'W21S22', 'W23S21', 'W22S22', 'W21S23', 'W21S24', 'W23S25', 'W7S8']

var claimer = Game.creeps["claimer"]
if (claimer) {
    try {
        util.runClaimer(claimer)
    } catch (e) {
        console.log("Claimer error: " + e)
    }
}

if (Game.shard.name == "shard0" && Game.time % 2000 == 0) {
    if (Game.spawns["Spawn_W21S22"].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], "sharder", {memory:{newRoom: "W7S8"}}) != 0) {
        Game.spawns["Spawn_W21S22"].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE], "sharder", {memory:{newRoom: "W7S8"}})
    }
}
var sharder = Game.creeps["sharder"]
util.runSharder(sharder)

if (Game.shard.name == "shard0" && Game.time % 2000 == 0) {
    if (Game.spawns["Spawn_W22S23"].spawnCreep([WORK, WORK,WORK,WORK,CARRY, CARRY,CARRY,MOVE, MOVE, MOVE,MOVE,MOVE,MOVE,MOVE], "sharder2", {memory:{newRoom: "W7S8"}}) != 0) {
        Game.spawns["Spawn_W22S23"].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE], "sharder2", {memory:{newRoom: "W7S8"}})
    }
}
var sharder2 = Game.creeps["sharder2"]
util.runSharder(sharder2)

if (Game.shard.name == "shard0" && Game.time % 2000 == 0) {
    if (Game.spawns["Spawn_W22S21"].spawnCreep([WORK, WORK,WORK,WORK,CARRY, CARRY,CARRY,MOVE, MOVE, MOVE,MOVE,MOVE,MOVE,MOVE], "sharder3", {memory:{newRoom: "W7S8"}}) != 0) {
        Game.spawns["Spawn_W22S21"].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE], "sharder3", {memory:{newRoom: "W7S8"}})
    }
}
var sharder3 = Game.creeps["sharder3"]
util.runSharder(sharder3)

/*
var outbuilders = [
    {name:"outbuilder", room:"W21S24"}, 
    {name:"outbuilder2", room:"W23S25"}]
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
*/

for (var i in rooms) {
    var r = rooms[i]
    if (!Game.rooms[r] || Game.rooms[r].controller == null) continue
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