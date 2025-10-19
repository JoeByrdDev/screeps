/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('rooms');
 * mod.thing == 'a thing'; // true
 */

var util = require("util")
var jobs = require("jobs")

module.exports = {
    outbuilder : function() {
        jobs.runClaimer(Game.creeps["claimer"])
        //Game.spawns["Spawn_W53S3"].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "outbuilder", {})
        //Game.spawns["Spawn_W53S3"].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "outbuilder2", {})
        //Game.spawns["Spawn_W52S4"].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "outbuilder3", {})
        jobs.runOutbuilder(Game.creeps["outbuilder"])
        jobs.runOutbuilder2(Game.creeps["outbuilder2"])
        jobs.runOutbuilder3(Game.creeps["outbuilder3"])
    },
    runLevel1 : function(r) {
        var rSpawn = Game.spawns["Spawn_" + r]
        rSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], r + "_basic", {harvesting: false})
        var c = Game.creeps[r + "_basic"]
        jobs.runBasic(c, r)
    },
    runLevel2 : function(r) {
        var rSpawn = Game.spawns["Spawn_" + r]
        if (Game.rooms[r].energyCapacityAvailable > 500) {
            if (Game.rooms[r].energyAvailable >= 550) {
                rSpawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_filler", {harvesting: false})
                rSpawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_builder", {harvesting: false})
                rSpawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_basic", {harvesting: false})
            } else {
                rSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], r + "_filler", {harvesting: false})
                rSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], r + "_builder", {harvesting: false})
                rSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], r + "_basic", {harvesting: false})
            }
        } else {
            rSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], r + "_builder", {harvesting: false})
            rSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], r + "_basic", {harvesting: false})
        }
        jobs.runBasic(Game.creeps[r + "_basic"], r)
        jobs.runBuilder (Game.creeps[r + "_builder"], r)
        jobs.runFiller(Game.creeps[r + "_filler"], r)
    },
    runLevel3 : function(r) {
        var rSpawn = Game.spawns["Spawn_" + r]
        
        if (Game.rooms[r].energyAvailable > 700) {
            rSpawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_filler", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_builder", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_basic", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_basic2", {harvesting: false})
        } else if (Game.rooms[r].energyAvailable > 500) {
            rSpawn.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], r + "_filler", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], r + "_builder", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], r + "_basic", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], r + "_basic2", {harvesting: false})
        } else {
            rSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], r + "_filler", {harvesting: false})
            rSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], r + "_builder", {harvesting: false})
            rSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], r + "_basic", {harvesting: false})
            rSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], r + "_basic2", {harvesting: false})
        }
        
        jobs.runBuilder(Game.creeps[r + "_builder"], r)
        jobs.runBuilder(Game.creeps[r + "_basic"], r)
        jobs.runFiller(Game.creeps[r + "_basic2"], r)
        jobs.runFiller(Game.creeps[r + "_filler"], r)
        
        
        var tower = Game.rooms[r].find(FIND_MY_STRUCTURES, {filter: {STRUCTURE_TOWER}})
        
        if (tower[0]) {
            
        }
    },
    runLevel4 : function(r) {
        var rSpawn = Game.spawns["Spawn_" + r]
        
        if (Game.rooms[r].energyAvailable > 1000) {
            rSpawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_filler", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_builder", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_basic", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_basic2", {harvesting: false})
        } else if (Game.rooms[r].energyAvailable > 700) {
            rSpawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_filler", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_builder", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_basic", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_basic2", {harvesting: false})

        } else if (Game.rooms[r].energyAvailable > 500) {
            rSpawn.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], r + "_filler", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], r + "_builder", {harvesting: false})
            //rSpawn.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], r + "_basic", {harvesting: false})
            //rSpawn.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], r + "_basic2", {harvesting: false})
        } else {
            rSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], r + "_filler", {harvesting: false})
            //rSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], r + "_builder", {harvesting: false})
            //rSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], r + "_basic", {harvesting: false})
            //rSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], r + "_basic2", {harvesting: false})
        }
        
        jobs.runBuilder(Game.creeps[r + "_builder"], r)
        jobs.runBuilder(Game.creeps[r + "_basic"], r)
        jobs.runFiller(Game.creeps[r + "_basic2"], r)
        jobs.runFiller(Game.creeps[r + "_filler"], r)
    },
    runLevel5 : function(r) {
        var rSpawn = Game.spawns["Spawn_" + r]
        
        if (Game.rooms[r].energyAvailable > 1400) {
            rSpawn.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_filler", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_builder", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_basic", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_basic2", {harvesting: false})
        } else if (Game.rooms[r].energyAvailable > 1000) {
            rSpawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_filler", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_builder", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_basic", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_basic2", {harvesting: false})
        } else if (Game.rooms[r].energyAvailable > 700) {
            rSpawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_filler", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_builder", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_basic", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], r + "_basic2", {harvesting: false})
        } else if (Game.rooms[r].energyAvailable > 500) {
            rSpawn.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], r + "_filler", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], r + "_builder", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], r + "_basic", {harvesting: false})
            rSpawn.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], r + "_basic2", {harvesting: false})
        } else {
            rSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], r + "_filler", {harvesting: false})
            rSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], r + "_builder", {harvesting: false})
            rSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], r + "_basic", {harvesting: false})
            rSpawn.spawnCreep([WORK, CARRY, MOVE, MOVE], r + "_basic2", {harvesting: false})
        }
        
        jobs.runBuilder(Game.creeps[r + "_builder"], r)
        jobs.runBuilder(Game.creeps[r + "_basic"], r)
        jobs.runFiller(Game.creeps[r + "_basic2"], r)
        jobs.runFiller(Game.creeps[r + "_filler"], r)
    }
};