var jobs = require("jobs")
var util = require("util")

const DEFAULT_MEMORY = {memory:{harvesting: false}}

const WORKER_BODY_250 = [WORK, CARRY, MOVE, MOVE]
const WORKER_BODY_500 = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
const WORKER_BODY_750 = [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
const WORKER_BODY_1000 = [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]

var getWorkerBody = function(energy) {
    if (energy >= 1000) {
        return WORKER_BODY_1000
    } else if (energy >= 750) {
        return WORKER_BODY_750
    } else if (energy >= 500) {
        return WORKER_BODY_500
    } else {
        return WORKER_BODY_250
    }
}

module.exports = {
    basicRoom : function(r) {
        var energy = Game.rooms[r].energyAvailable
        var rSpawn = Game.spawns["Spawn_" + r]
        util.runTowers(r)
        var basic = Game.creeps[r + "_basic"]
        var basic2 = Game.creeps[r + "_basic2"]
        var builder = Game.creeps[r + "_builder"]
        var filler = Game.creeps[r + "_filler"]
        
        if (!basic) {
            rSpawn.spawnCreep(getWorkerBody(energy), r + "_basic", DEFAULT_MEMORY)
        } else {
            jobs.runFiller(basic, r)
        }
        
        if (!basic2) {
            rSpawn.spawnCreep(getWorkerBody(energy), r + "_basic2", DEFAULT_MEMORY)
        } else {
            jobs.runBuilder(basic, r)
        }
        
        if (!builder) {
            rSpawn.spawnCreep(getWorkerBody(energy), r + "_builder", DEFAULT_MEMORY)
        } else {
            jobs.runBuilder(basic, r)
        }
        
        if (!filler) {
            rSpawn.spawnCreep(getWorkerBody(energy), r + "_filler", DEFAULT_MEMORY)
        } else {
            jobs.runFiller(basic, r)
        }
    }
};