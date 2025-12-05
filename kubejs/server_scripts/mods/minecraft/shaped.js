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
        B: '#kubejs:rare_mana',
        C: 'ars_nouveau:arcane_core',
        D: 'occultism:otherstone'
    }).id('kubejs:minecraft/shaped/enchanting_table')

    e.shaped('minecraft:nautilus_shell', [
        ' A ',
        'BCB',
        ' A '
    ], {
        A: 'minecraft:pufferfish',
        B: 'minecraft:tropical_fish',
        C: 'botania:rune_mana'
    }).id('kubejs:minecraft/shaped/nautilus_shell')
})