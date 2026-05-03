let $FelPumpkinBlock = Java.loadClass('vazkii.botania.common.block.FelPumpkinBlock')
let $BlockProperties = Java.loadClass('net.minecraft.world.level.block.state.BlockBehaviour$Properties')
let $Blocks = Java.loadClass('net.minecraft.world.level.block.Blocks')
let $BlockItem = Java.loadClass('net.minecraft.world.item.BlockItem')
let $ItemProperties = Java.loadClass('net.minecraft.world.item.Item$Properties')

let felonBlock

StartupEvents.registry('block', e => {
    // Pulverizing catalyst for botania mana pool
    e.create('kubejs:pulverizing_catalyst')
        .soundType('stone')
        .tagBlock('minecraft:mineable/pickaxe')
        .hardness(2)

    // Fel melon block (Fel pumpkin alternative)
    felonBlock = e.createCustom('kubejs:felon',
        () => new $FelPumpkinBlock(new $BlockProperties.copy($Blocks.MELON))
    )
})

// Fel melon item 
StartupEvents.registry('item', e => {
    e.createCustom('kubejs:felon',
        () => new $BlockItem(felonBlock.get(), new $ItemProperties())
    )
})