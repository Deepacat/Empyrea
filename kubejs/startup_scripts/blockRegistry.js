const $FelPumpkinBlock = Java.loadClass('vazkii.botania.common.block.FelPumpkinBlock')
const $Properties = Java.loadClass('net.minecraft.world.level.block.state.BlockBehaviour$Properties')
const $Blocks = Java.loadClass('net.minecraft.world.level.block.Blocks')
const $BlockItem = Java.loadClass('net.minecraft.world.item.BlockItem')
const $IProperties = Java.loadClass('net.minecraft.world.item.Item$Properties')

let felonBlock

StartupEvents.registry('block', e => {
    e.create('kubejs:pulverizing_catalyst')
        .soundType('stone')
        .tagBlock('minecraft:mineable/pickaxe')
        .hardness(2)

    // Fel melon block
    felonBlock = e.createCustom('kubejs:felon',
        () => new $FelPumpkinBlock(new $Properties.copy($Blocks.MELON))
    ).tagBlock('minecraft:mineable/axe')
})

// Fel melon item 
StartupEvents.registry('item', e => {
    e.createCustom(
        'kubejs:felon',
        () => new $BlockItem(felonBlock.get(), new $IProperties())
    )
})