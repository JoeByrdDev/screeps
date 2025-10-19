/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('util');
 * mod.thing == 'a thing'; // true
 */

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
    }
};