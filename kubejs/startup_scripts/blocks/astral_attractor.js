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
* @param {Object} sourceVecObj
* @param {Object} targetVecObj
* @returns {Vec3d}
* Gets a motion vector from one position to another, used for item throwing motion
*/
function getMotionVec(sourceVecObj, targetVecObj) {
    let startVec = { x: sourceVecObj.x, y: sourceVecObj.y, z: sourceVecObj.z }
    let endVec = { x: targetVecObj.x, y: targetVecObj.y, z: targetVecObj.z }
    let dir = { x: endVec.x - startVec.x, y: endVec.y - startVec.y, z: endVec.z - startVec.z }
    let distance = Math.sqrt(dir.x * dir.x + dir.y * dir.y + dir.z * dir.z)
    return new Vec3d(dir.x / distance, dir.y / distance, dir.z / distance)
}
/**
 * 
 * @param {Entity} entity 
 */
function onMeteorHit(entity) {
    entity.level.spawnParticles('minecraft:explosion', false, entity.x, entity.y, entity.z, 1, 1, 1, 10, 0);
    entity.level.playSound(null, entity.x, entity.y, entity.z, 'minecraft:entity.generic.explode', 'blocks', 5, 1);
    entity.remove('discarded')
}

global.meteorOnHitBlock = (/** @type {Internal.ContextUtils$ProjectileBlockHitContext} */ ctx) => {
    const { entity, result } = ctx;
    onMeteorHit(entity)
}
global.meteorOnHitEntity = (/** @type {Internal.ContextUtils$ProjectileEntityHitContext} */ ctx) => {
    const { entity, result } = ctx;
    onMeteorHit(entity)
}
global.meteorOnAddedToWorld = (/** @type {Entity} */ entity) => {
    entity.setNoGravity(true)
}
global.meteorTick = (/** @type {Entity} */ entity) => {
    entity.level.addParticle('minecraft:campfire_cosy_smoke', entity.x, entity.y, entity.z, 0, 0, 0);
    let moveDelta = entity.nbt["BalmData"].delta
    if (moveDelta == null || moveDelta.x == null) return
    // reset motion delta constantly to bypass 1% movement loss/tick
    entity.setDeltaMovement(Vec3d(moveDelta.x, moveDelta.y, moveDelta.z))

    let chunkCoords = { x: Math.floor(rndPos.x / 16), z: Math.floor(rndPos.z / 16) }
    let coordVec = Vec3d(rndPos.x, rndPos.y, rndPos.z)

    entity.level.getChunkAt(coordVec).setLoaded(true)
    entity.level.getLoadedChunk(chunkCoords.x, chunkCoords.z)
    entity.level.server.runCommandSilent('awa')


    entity.level.server.scheduleInTicks(60, () => {
        entity.level.getChunkAt(coordVec).setLoaded(false)
    })

    if (Utils.server.tickCount % 20 == 0) {
        Utils.server.tell(`${entity.stringUUID.slice(0, 3)}: ${Math.floor(entity.x)}, ${Math.floor(entity.y)}, ${Math.floor(entity.z)}`)
    }
}

/**
 * @param {Internal.BlockEntity} attractor 
 */
global.attractorSpawnMeteor = (attractor) => {
    try {
        /** @type {Entity} */
        let meteorEntity = attractor.level // create the meteor entity
            .createEntity("kubejs:meteor")

        let level = attractor.level
        let server = level.server

        let rndPos = Object.assign(
            { y: attractor.blockPos.y + 300 },
            rndPerimeter(attractor.blockPos.x, attractor.blockPos.z, 128)
        )

        let chunkCoords = { x: Math.floor(rndPos.x / 16), z: Math.floor(rndPos.z / 16) }
        let coordVec = Vec3d(rndPos.x, rndPos.y, rndPos.z)

        console.log(`blockpos: ${rndPos.x}, ${rndPos.y}, ${rndPos.z}`)
        console.log(`chunkpos: ${chunkCoords.x}, ${chunkCoords.z}`)
        console.log(level.getChunkAt(coordVec).getFullStatus())

        let meteorSpawnPos = rndPos

        meteorEntity.setPosition(meteorSpawnPos.x, meteorSpawnPos.y, meteorSpawnPos.z)

        let delta = getMotionVec({ x: meteorEntity.x, y: meteorEntity.y, z: meteorEntity.z }, attractor.blockPos).scale(5)
        meteorEntity.setDeltaMovement(delta)
        meteorEntity.spawn()

        server.tell(`spawning emetor at ${meteorSpawnPos.x}, ${meteorSpawnPos.y}, ${meteorSpawnPos.z}`)
        // save movement data to nbt so it can be reset constantly
        meteorEntity.mergeNbt({ BalmData: { delta: { x: delta.x(), y: delta.y(), z: delta.z() } } })
    } catch (e) { console.log(e) }
}

StartupEvents.registry('entity_type', event => {
    /** @type {Internal.ProjectileEntityJSBuilder} */
    let meteor = event.create('meteor', 'entityjs:projectile')
        .isAttackable(false)
        .mobCategory('misc')
        .sized(2, 2)
        .renderOffset(0, 0, 0)
        .renderScale(2, 2, 2)
        .noItem()

    // Meteor entity action functions
    meteor.tick(entity => { global.meteorTick(entity) })
    meteor.onHitEntity(ctx => { global.meteorOnHitEntity(ctx) })
    meteor.onAddedToWorld(entity => { global.meteorOnAddedToWorld(entity) })
    meteor.onHitBlock(ctx => { global.meteorOnHitBlock(ctx) })
})

StartupEvents.registry("block", (e) => {
    e.create("kubejs:astral_attractor", "cardinal")
        .tagBlock("minecraft:mineable/pickaxe")
        .tagBlock("minecraft:needs_stone_tool")
        .defaultCutout()
        .soundType("copper")
        .item(item => {
            item.tooltip(Text.gray("Allures shimmering clusters to home in on it's position"))
        })
        .textureAll('awawatextureme')
        // .model("minecraft:block/furnace")
        .blockEntity(blockInfo => {
            blockInfo.serverTick(20, 0, (entity) => {
                global.attractorSpawnMeteor(entity)
            })
        })
})


