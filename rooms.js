var jobs = require("jobs")
var util = require("util")

module.exports = {
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