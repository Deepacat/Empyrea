ServerEvents.recipes(e => {
    e.shaped('kubejs:watering_can', [
        '  A',
        'ACB',
        'BBB'
    ], {
        A: 'botania:livingrock_slab',
        B: 'botania:livingrock',
        C: 'botania:water_bowl'
    }).id('kubejs:shaped/watering_can')

    e.shaped('kubejs:sifting_spade', [
        '  A',
        ' B ',
        'B  '
    ], {
        A: 'botania:livingrock',
        B: 'botania:livingwood_twig'
    }).id('kubejs:shaped/sifting_spade')

    e.shaped('kubejs:pulverizing_catalyst', [
        'ABA',
        'CDC',
        'AEA'
    ], {
        A: 'botania:livingrock',
        B: 'botania:piston_relay',
        C: '#forge:ingots/manasteel',
        D: 'minecraft:grindstone',
        E: 'minecraft:piston'
    }).id('kubejs:shaped/pulverizing_catalyst')

    e.shaped('kubejs:astral_attractor', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: 'spectrum:polished_calcite_pillar',
        B: 'botania:lens_magnet',
        C: 'spectrum:amethyst_storage_block',
        D: 'botania:sextant',
        E: 'spectrum:notched_polished_basalt',
        F: 'botania:rune_mana'
    }).id('kubejs:shaped/astral_attractor')
})