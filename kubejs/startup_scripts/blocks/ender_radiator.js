/**
 * create an array of all block positions in the area to fade
 * @param {number[]} pos1
 * @param {number[]} pos2
 */
function getAreaArray(pos1, pos2) {
    let positions = []
    for (let x = pos1[0]; x <= pos2[0]; x++) {
        for (let y = pos1[1]; y <= pos2[1]; y++) {
            for (let z = pos1[2]; z <= pos2[2]; z++) {
                positions.push([x, y, z])
            }
        }
    }
    return positions
}

/**
 * @param {Internal.Entity} blockEntity 
 */
global.ender_radiator_tick = (blockEntity) => {
    let rand = rndFrom(1, 10)
    if (rand != 1) return
    // get all blocks in a 5x5x5 area around radiator
    let blocks = getAreaArray(
        [blockEntity.x - 2, blockEntity.y - 2, blockEntity.z - 2],
        [blockEntity.x + 2, blockEntity.y + 2, blockEntity.z + 2]
    )
    // shuffles the array for randomness
    let shuffledPositions = blocks.sort(() => Math.random() - 0.5)
    // Get first position from shuffle
    let pos = shuffledPositions[0]
    let { x, y, z } = { x: pos[0], y: pos[1], z: pos[2] }

    let block = blockEntity.level.getBlock(pos)
    // if the position is not sandstone, cancel
    if (block.id != "minecraft:sandstone") return
    Utils.server.runCommandSilent(`/setblock ${pos[0]} ${pos[1]} ${pos[2]} minecraft:end_stone`)
    // /particle minecraft:portal ~ ~ ~ 0.5 0.5 0.5 10 100
    blockEntity.level.spawnParticles(`minecraft:portal`, false,
        x + 0.5, y + 0.5, z + 0.5,
        0.5, 0.5, 0.5,
        100, 1
    )
    blockEntity.level.playSound(null, x, y, z,
        "wizards_reborn:arcanum_dust_transmutation", "blocks", 1,
        Math.random() * (1.2 - 0.8) + 0.8
    )
    return
}

StartupEvents.registry("block", (e) => {
    e.create("kubejs:ender_radiator")
        .tagBlock("minecraft:mineable/pickaxe")
        .tagBlock("minecraft:needs_stone_tool")
        .hardness(5)
        .soundType("STONE")
        .property(global.meteor_spawned_prop)
        .defaultState(state => { state.cycle(global.meteor_spawned_prop) })
        .item(item => {
            item.tooltip(Text.gray("It... well... Radiates ender!"))
            item.tooltip(Text.gray("Will convert nearby sandstone to endstone."))
        })
        .blockEntity(blockInfo => {
            blockInfo.serverTick(20, 0, (blockEntity) => { // Runs block entity function once per second
                global.ender_radiator_tick(blockEntity)
            })
        })
})