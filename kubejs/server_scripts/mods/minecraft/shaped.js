ServerEvents.recipes(e => {
    e.shaped('minecraft:damaged_anvil', [
        'ABA',
        ' A ',
        'AAA'
    ], {
        A: '#forge:ingots/iron',
        B: 'minecraft:iron_block'
    }).id('kubejs:minecraft/shaped/damaged_anvil')

    e.remove({ id: 'minecraft:enchanting_table' })
    e.shaped('minecraft:enchanting_table', [
        ' A ',
        'BCB',
        'DDD'
    ], {
        A: 'ars_nouveau:novice_spell_book',
        B: 'botania:mana_diamond',
        C: 'ars_nouveau:arcane_core',
        D: 'occultism:otherstone'
    }).id('kubejs:minecraft/shaped/enchanting_table')
})