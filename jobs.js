var util = require("util")

module.exports = {
    runBasic : function(c, r) {
        if (c) {
            util.setHarvesting(c)
            if (c.memory.harvesting) {
                util.harvest(c)
            } else {
                util.upgradeController(c, Game.rooms[r].controller)
            }
        }
    },
    runFiller : function(c, r) {
        if (c) {
            util.setHarvesting(c)
            
            if (c.memory.harvesting) {
                util.harvest(c)
                return
            }
            
            const towers = c.room.find(FIND_MY_STRUCTURES, {filter: (structure) => { 
                return structure.structureType == STRUCTURE_TOWER && structure.store.getUsedCapacity(RESOURCE_ENERGY) < structure.store.getCapacity(RESOURCE_ENERGY) / 2
            }})
            const extensions = c.room.find(FIND_MY_STRUCTURES, {filter: (structure) => {
                return structure.structureType == STRUCTURE_EXTENSION && structure.store.getUsedCapacity(RESOURCE_ENERGY) < structure.store.getCapacity(RESOURCE_ENERGY)
            }})
            var target = extensions ? c.pos.findClosestByPath(extensions) : towers ? c.pos.findClosestByPath(towers) : null
            if(target) {
                if(c.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    c.moveTo(target, {reusePath:0});
                }
            } else {
                util.upgradeController(c, Game.rooms[r].controller)
            }
        }
    },
    runBuilder : function(c, r) {
        if (c) {
            util.setHarvesting(c)
            if (c.memory.harvesting) {
                util.harvest(c)
                return
            }
            
            if (Game.spawns["Spawn_"+r] && Game.spawns["Spawn_"+r].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                c.moveTo(Game.spawns["Spawn_"+r]);
                c.transfer(Game.spawns["Spawn_"+r], RESOURCE_ENERGY)
                return
            }
            
            var buildSpots = Game.rooms[r].find(FIND_CONSTRUCTION_SITES)
            if (buildSpots.length > 0) {
                if(c.build(buildSpots[0]) == ERR_NOT_IN_RANGE) {
                    c.moveTo(buildSpots[0], {reusePath:0})
                }
            } else {
                util.upgradeController(c, Game.rooms[r].controller)
            }
        }
    }
};