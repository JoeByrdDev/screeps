module.exports = {
    setHarvesting: function(c){
        if (c.store.getFreeCapacity() == 0) {
            c.memory.harvesting = false
        }
        
        if (c.store.getUsedCapacity() == 0) {
            c.memory.harvesting = true
        }
    },
    harvest: function(c) {
        var target = c.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if(target) {
            if(c.harvest(target) == ERR_NOT_IN_RANGE) {
                if (c.name == 'outbuilder') console.log("here")
                c.moveTo(target, {reusePath:0});
            } 
        }
    },
    upgradeController: function(c, target) {
        if(target) {
            if(c.upgradeController(target) == ERR_NOT_IN_RANGE) {
                c.moveTo(target, {reusePath:0});
            }
        }
    }, 
    coinFlip: function() {
        return Math.random() > .5
    },
    runTower: function(roomName) {
        var room = Game.rooms[roomName]
        var towers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}})
        if (towers.length > 0) {
            var roads = room.find(FIND_STRUCTURES, {filter: (structure) => {
                return structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax * .85 }})
        
            var ramparts = room.find(FIND_STRUCTURES, {filter: (structure) => {
                return structure.structureType == STRUCTURE_RAMPART && structure.hits <  1300}})
    
            var hostiles = room.find(FIND_HOSTILE_CREEPS)
            
            if(hostiles.length > 0) {
                towers.forEach(tower => tower.attack(hostiles[0]))
                return
            }
            
            if (roads.length > 0) {
                towers.forEach(tower => tower.repair(roads[0]))
                return
            }
    
            if (ramparts.length > 0) {
                towers.forEach(tower => tower.repair(ramparts[0]))
                return
            }
    
        }
    }
};