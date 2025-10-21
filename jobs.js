var util = require("util")

module.exports = {
    runBasic : function(c, r) {
        if (c) {
            util.setHarvesting(c)
            if (c.memory.harvesting) {
                util.harvest(c)
            } else {
                const target = Game.rooms[r].controller
                util.upgradeController(c, target)
            }
        }
    },

    runFiller : function(c, r) {
        if (c) {
            util.setHarvesting(c)
        
            const towers = c.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_TOWER }
            });
        
        
            if (towers[0]) {
                tower = towers[0]
            }
            
        
            if (c.memory.harvesting) {
                util.harvest(c)
            } else {
                const extensions = c.room.find(FIND_MY_STRUCTURES, {
                    filter: { structureType: STRUCTURE_EXTENSION }
                });
            
                var extensions2 = []
                for (var i = 0; i < extensions.length; i++) {
                    if (extensions[i].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                        extensions2.push(extensions[i])
                    }
                }
            
                var target = extensions2.length > 0 ? c.pos.findClosestByPath(extensions2) : null;
            
                if (!target && tower) {
                    var capacity = tower.store.getCapacity(RESOURCE_ENERGY)
                    var amount = tower.store.getUsedCapacity(RESOURCE_ENERGY)
                    target = amount < capacity / 2 ? tower : null
                }
            
                if(target) {
                    if(c.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        c.moveTo(target, {reusePath:0});
                    }
                } else {
                    this.runBasic(c,r)
                }
            }
        }
    },

    runBuilder : function(c, r) {
        var buildSpots = Game.rooms[r].find(FIND_CONSTRUCTION_SITES);
        if (c) {
            util.setHarvesting(c)
        
            if (!c.memory.harvesting && Game.spawns["Spawn_"+r] && Game.spawns["Spawn_"+r].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                c.moveTo(Game.spawns["Spawn_"+r]);
                c.transfer(Game.spawns["Spawn_"+r], RESOURCE_ENERGY)
                return
            }
        
            if (buildSpots.length > 0) {
                if (c.memory.harvesting) {
                    util.harvest(c)
                } else {
                    const target = buildSpots[0]
                    if(target) {
                        if(c.build(target) == ERR_NOT_IN_RANGE) {
                            c.moveTo(target, {reusePath:0});
                        }
                    }
                }
            } else {
                this.runBasic(c, r)
            }
        }
    },
    runClaimer : function(c) {
        if (c) {
            if (c.room.name == "W52S4") {
                c.moveTo(29,49)
                return
            }
            c.moveTo(c.room.controller)
            c.claimController(c.room.controller)
        }
    }
};