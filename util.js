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
                c.moveTo(target, {reusePath:0});
            } 
        }
    },
    coinFlip: function(a, b) {
        return Math.random() > .5 ? a : b
    },
    upgradeController: function(c, target) {
        if(target) {
            if(c.upgradeController(target) == ERR_NOT_IN_RANGE) {
                c.moveTo(target, {reusePath:0});
            }
        }
    },
    runClaimer: function(claimer) {
        //Game.spawns["Spawn_W21S22"].spawnCreep([MOVE,CLAIM], "claimer", {memory:{newRoom: "W21S23"}})
        if (claimer.pos.roomName != claimer.memory.newRoom) {
            claimer.moveTo(new RoomPosition(10,10,claimer.memory.newRoom))
        } else {
            claimer.moveTo(claimer.room.controller)
            claimer.claimController(claimer.room.controller)
        }
    },
    runOutbuilder: function(outbuilder) {
        //Game.spawns["Spawn_W22S23"].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], "outbuilder", {memory:{newRoom: "W23S23"}})
        if (outbuilder.pos.roomName != outbuilder.memory.newRoom) {
            outbuilder.moveTo(new RoomPosition(10,10,outbuilder.memory.newRoom), {reusePath:10})
        } else {
            this.setHarvesting(outbuilder)
            if (outbuilder.memory.harvesting) {
                this.harvest(outbuilder)
                return
            }
            
            r = outbuilder.pos.roomName
            if (Game.spawns["Spawn_"+r] && Game.spawns["Spawn_"+r].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                outbuilder.moveTo(Game.spawns["Spawn_"+r]);
                outbuilder.transfer(Game.spawns["Spawn_"+r], RESOURCE_ENERGY)
                return
            }
            
            var buildSpots = Game.rooms[r].find(FIND_CONSTRUCTION_SITES)
            if (buildSpots.length > 0) {
                if(outbuilder.build(buildSpots[0]) == ERR_NOT_IN_RANGE) {
                    outbuilder.moveTo(buildSpots[0], {reusePath:0})
                }
            } else {
                this.upgradeController(outbuilder, Game.rooms[r].controller)
            }
        }
        
    },
    runTowers: function(roomName) {
        var room = Game.rooms[roomName]
        var towers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}})
        if (towers.length > 0) {
            var roads = room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax * .85 }})
            var ramparts = room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_RAMPART && structure.hits <  5000}})
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