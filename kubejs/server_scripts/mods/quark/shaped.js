ServerEvents.recipes(e => {
    e.shaped('quark:matrix_enchanter', [
        ' A ',
        'BCB',
        'DDD'
    ], {
        A: 'ars_nouveau:apprentice_spell_book',
        B: 'botania:rune_mana',
        C: 'ars_nouveau:arcane_core',
        D: 'minecraft:obsidian'
    }).id('kubejs:quark/shaped/matrix_enchanter')
})