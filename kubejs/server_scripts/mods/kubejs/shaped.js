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
})