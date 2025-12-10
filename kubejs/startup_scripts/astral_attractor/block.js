// Meteor spawner block registry
const $BooleanProperty = Java.loadClass("net.minecraft.world.level.block.state.properties.BooleanProperty")
const meteor_spawned = $BooleanProperty.create("meteor_spawned")

StartupEvents.registry("block", (e) => {
    e.create("kubejs:astral_attractor", "cardinal")
        .tagBlock("minecraft:mineable/pickaxe")
        .tagBlock("minecraft:needs_stone_tool")
        .defaultCutout()
        .soundType("copper")
        .item(item => {
            item.tooltip(Text.gray("Allures shimmering clusters from above"))
            item.tooltip(Text.gray("test"))
        })
        .model("minecraft:block/furnace")
        .property(meteor_spawned)
        .defaultState(state => { state.cycle(meteor_spawned) })
        .blockEntity(blockInfo => {
            blockInfo.serverTick(20, 0, (entity) => {
                global.attractorSpawnMeteor(entity)
            })
        })
})
