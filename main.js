var room = require("rooms")

/*
39 424 400
39 488 610
39 636 574
39 757 886
39 826 123
39 933 980

Game.spawns["Spawn_W52S4"].spawnCreep([CLAIM,MOVE], "claimer", {})

var ext = Game.rooms["W52S4"].find(FIND_STRUCTURES, {
    filter: { structureType: STRUCTURE_EXTENSION }
})

for (e of ext) {
    e.destroy()
}
*/

var rooms = ['E23S16']

for (var i in rooms) {
    var r = rooms[i]
    var level = Game.rooms[r].controller.level
    
    if (!Game.spawns["Spawn_" + r]) continue
    
    if (Game.spawns["Spawn_" + r].hits < Game.spawns["Spawn_" + r].hitsMax) {
        Game.rooms[r].controller.activateSafeMode()
    }
    
    var towers = Game.rooms[r].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    
    
    var hostiles = Game.rooms[r].find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        towers.forEach(tower => tower.attack(hostiles[0]));
    }
    
    var roads = Game.rooms[r].find(FIND_STRUCTURES, {filter: (structure) => {
        return structure.type == STRUCTURE_ROAD && structure.hits < structure.hitsMax }})
    
    if (roads.length > 0) {
        towers.forEach(tower => tower.repair(roads[0]))
    }
    
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

room.outbuilder()
