ServerEvents.recipes(e => {
    e.remove({ output: 'minecraft:brewing_stand' })
    e.shaped('minecraft:brewing_stand', [
        ' A ',
        'BCB',
        'DDD'
    ], {
        A: 'minecraft:blaze_powder',
        B: 'minecraft:iron_bars',
        C: 'botania:blaze_block',
        D: 'minecraft:stone_slab'
    }).id('kubejs:botania/shaped/brewing_stand_mesh')

    e.shaped('minecraft:brewing_stand', [
        ' A ',
        'BAB',
        'CCC'
    ], {
        A: 'minecraft:blaze_rod',
        B: 'minecraft:iron_bars',
        C: 'minecraft:stone_slab'
    }).id('kubejs:botania/shaped/brewing_stand_rod')

    e.shaped('botania:alchemy_catalyst', [
        'ABA',
        'CDC',
        'ABA'
    ], {
        A: 'botania:livingrock',
        B: '#forge:ingots/gold',
        C: 'minecraft:brewing_stand',
        D: '#forge:gems/mana_diamond'
    }).id('kubejs:botania/shaped/alchemy_catalyst')
})