var room = require("rooms")
var util = require("util")

var rooms = ['W22S23']

for (var i in rooms) {
    var r = rooms[i]
    var level = Game.rooms[r].controller.level
    
    if (!Game.spawns["Spawn_" + r]) continue
    
    if (Game.spawns["Spawn_" + r].hits < Game.spawns["Spawn_" + r].hitsMax) {
        Game.rooms[r].controller.activateSafeMode()
    }
    
    util.runTower(r)
    
    if (level == 1) {
        room.runLevel1(r)
    } else if (level == 2) {
        room.runLevel2(r)
    } else if (level == 3) {
        room.runLevel3(r)
    } else if (level == 4) {
        room.runLevel4(r)
    } else {
        room.runLevel5(r)
    }
}