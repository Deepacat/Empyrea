const $ClipContext = Java.loadClass("net.minecraft.world.level.ClipContext")

function rndFrom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function rndPerimeter(cx, cz, size) {
    const dir = Math.floor(Math.random() * 4);
    const t = Math.round((Math.random() * 2 * size) - size);
    switch (dir) {
        case 0: // north
            return { x: cx + t, z: cz - size };
        case 1: // east
            return { x: cx + size, z: cz + t };
        case 2: // south
            return { x: cx + t, z: cz + size };
        case 3: // west
            return { x: cx - size, z: cz + t };
    }
}
/** 
* @param {Vec3d|Object} sourceVecObj
* @param {Vec3d|Object} targetVecObj
* @returns {Vec3d}
* Gets a motion vector from one position to another, used for item throwing motion
*/
function getMotionVec(sourceVecObj, targetVecObj) {
    let startVec = sourceVecObj instanceof Vec3d ? sourceVecObj : new Vec3d(sourceVecObj.x, sourceVecObj.y, sourceVecObj.z)
    let endVec = targetVecObj instanceof Vec3d ? targetVecObj : new Vec3d(targetVecObj.x, targetVecObj.y, targetVecObj.z)
    return endVec.subtract(startVec).normalize()
}
/** @param {Internal.Entity} entity */
function onMeteorHit(entity) {
    entity.level.spawnParticles('minecraft:explosion', false, entity.x, entity.y, entity.z, 1, 1, 1, 10, 0)
    entity.level.spawnParticles('minecraft:campfire_cosy_smoke', false, entity.x, entity.y, entity.z, 2, 2, 2, 30, 0)
    entity.level.spawnParticles('spectrum:shooting_star', false, entity.x, entity.y, entity.z, 3, 3, 3, 50, 0)
    entity.level.spawnParticles('spectrum:shimmerstone_sparkle', false, entity.x, entity.y, entity.z, 4, 4, 4, 500, 0)
    entity.level.playSound(null, entity.x, entity.y, entity.z, 'minecraft:entity.generic.explode', 'blocks', 6, 1)
    entity.level.playSound(null, entity.x, entity.y, entity.z, 'spectrum:shooting_star_cracker', 'blocks', 6, 1)

    let radius = 1.8
    let seed = Math.random() * 10000
    let noise = (x, y, z) => Math.sin((x + seed) * 0.5) * Math.cos((y + seed) * 0.5) * Math.sin((z + seed) * 0.5) * 0.5 + 0.5

    for (let offX = -radius; offX <= radius; offX++) {
        for (let offY = -radius; offY <= radius; offY++) {
            for (let offZ = -radius; offZ <= radius; offZ++) {
                let distance = Math.sqrt(offX * offX + offY * offY + offZ * offZ);
                let jitter = (noise(offX, offY, offZ) - 0.5) * 1.5 + (Math.random() - 0.5) * 0.5;
                // skip outside sphere
                if (distance >= radius + jitter) { continue }
                // get final position to check for block replacing
                let { finalX, finalY, finalZ } = {
                    finalX: entity.x + offX + 0.5,
                    finalY: entity.y + offY - 1,
                    finalZ: entity.z + offZ + 0.5
                }
                let finalVec = Vec3d(finalX, finalY, finalZ)
                let finalPosBlock = entity.level.getBlock(finalVec) // get block at position
                // check block destroy speed to see if it can be replaced
                let destroySpeed = finalPosBlock.blockState.getDestroySpeed(entity.level, finalVec)
                // skip unbreakable or hard blocks
                if (destroySpeed > 2.5 || destroySpeed == -1) { continue }
                // sometimes entity is deleted before all blocks finish placing? just skip
                if (entity.server == null) { continue }
                // place block
                entity.server.runCommandSilent(
                    `execute in ${entity.level.dimension.toString()} positioned ${finalX} ${finalY} ${finalZ} run setblock ~ ~ ~ spectrum:deepslate_shimmerstone_ore`
                )
            }
        }
    }
    entity.remove('discarded') // delete entity
}

global.meteorOnHitBlock = (/** @type {Internal.ContextUtils$ProjectileBlockHitContext} */ ctx) => {
    const { entity, result } = ctx;
    onMeteorHit(entity)
}
global.meteorOnHitEntity = (/** @type {Internal.ContextUtils$ProjectileEntityHitContext} */ ctx) => {
    const { entity, result } = ctx;
    onMeteorHit(entity)
}
global.meteorOnAddedToWorld = (/** @type {Internal.Entity} */ entity) => {
    entity.setNoGravity(true)
}
global.meteorTick = (/** @type {Internal.Entity} */ entity) => {
    entity.level.spawnParticles('minecraft:campfire_cosy_smoke', false, entity.x, entity.y, entity.z, 0.5, 0.5, 0.5, 3, 0)
    entity.level.spawnParticles('spectrum:shimmerstone_sparkle', false, entity.x, entity.y, entity.z, 1, 1, 1, 25, 0)
    let moveDelta = entity.nbt["BalmData"].delta
    if (moveDelta == null || moveDelta.x == null) return
    // reset motion delta constantly to bypass 1% movement loss/tick
    entity.setDeltaMovement(Vec3d(moveDelta.x, moveDelta.y, moveDelta.z))

    // let chunkCoords = { x: Math.floor(rndPos.x / 16), z: Math.floor(rndPos.z / 16) }
    // let coordVec = Vec3d(rndPos.x, rndPos.y, rndPos.z)

    // entity.level.getChunkAt(coordVec).setLoaded(true)
    // entity.level.getLoadedChunk(chunkCoords.x, chunkCoords.z)
    // entity.level.server.runCommandSilent('awa')


    // entity.level.server.scheduleInTicks(60, () => {
    //     entity.level.getChunkAt(coordVec).setLoaded(false)
    // })

    // if (Utils.server.tickCount % 20 == 0) { // debug position
    //     Utils.server.tell(`${entity.stringUUID.slice(0, 3)}: ${Math.floor(entity.x)}, ${Math.floor(entity.y)}, ${Math.floor(entity.z)}`)
    // }
}

/** @param {Internal.BlockEntity} attractor */
global.attractorSpawnMeteor = (attractor) => {
    try {
        let heightMapPos = attractor.level.getHeightmapPos("motion_blocking", attractor.blockPos)
        if (heightMapPos.below().y != attractor.blockPos.y) { return } // check if any blocks above
        let dayTime = attractor.level.dayTime()
        if (dayTime % 24000 < 13000) { return } // check if night time

        let rnd = rndFrom(0, 1000)
        if (rnd != 0) { return } // 1 in 1000 every second

        /** @type {Internal.Entity} */
        let meteorEntity = attractor.level // create the meteor entity
            .createEntity("kubejs:meteor")

        let rndPos = Object.assign(
            { y: attractor.blockPos.y + 300 },
            rndPerimeter(attractor.blockPos.x, attractor.blockPos.z, 128)
        )

        // let chunkCoords = { x: Math.floor(rndPos.x / 16), z: Math.floor(rndPos.z / 16) }
        // let coordVec = Vec3d(rndPos.x, rndPos.y, rndPos.z)

        // console.log(`blockpos: ${rndPos.x}, ${rndPos.y}, ${rndPos.z}`)
        // console.log(`chunkpos: ${chunkCoords.x}, ${chunkCoords.z}`)
        // console.log(level.getChunkAt(coordVec).getFullStatus())

        let meteorSpawnPos = rndPos

        meteorEntity.setPosition(meteorSpawnPos.x, meteorSpawnPos.y, meteorSpawnPos.z)

        let attractorVec = new Vec3d(attractor.blockPos.x + 0.5, attractor.blockPos.y + 0.5, attractor.blockPos.z + 0.5)

        let delta = getMotionVec(meteorEntity.getPos(), attractorVec).scale(2)
        meteorEntity.setDeltaMovement(delta)
        meteorEntity.spawn()

        // // debug spawn position
        Utils.server.tell(`spawning emetor at ${meteorSpawnPos.x}, ${meteorSpawnPos.y}, ${meteorSpawnPos.z}`)

        // save movement data to nbt so it can be reset constantly
        meteorEntity.mergeNbt({ BalmData: { delta: { x: delta.x(), y: delta.y(), z: delta.z() } } })
    } catch (e) { console.log(e) }
}

// Meteor entity registry 
StartupEvents.registry('entity_type', event => {
    /** @type {Internal.ProjectileEntityJSBuilder} */
    let meteor = event.create('meteor', 'entityjs:projectile')
        .isAttackable(false)
        .mobCategory('misc')
        .sized(2, 2)
        .noItem()

    if (global.meteorRenderer) {
        meteor.render(global.meteorRenderer)
            .renderType(_ => global.CUTOUT_MIPPED)
            .renderScale(0, 0, 0);
    }

    // Meteor entity action functions
    meteor.tick(entity => { global.meteorTick(entity) })
    meteor.onHitEntity(ctx => { global.meteorOnHitEntity(ctx) })
    meteor.onAddedToWorld(entity => { global.meteorOnAddedToWorld(entity) })
    meteor.onHitBlock(ctx => { global.meteorOnHitBlock(ctx) })
})
