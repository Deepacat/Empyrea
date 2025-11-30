ServerEvents.recipes(e => {
    // repairing
    e.shapeless('kubejs:watering_can', [
        Item.of('kubejs:watering_can'),
        'botania:water_bowl'
    ]).id('kubejs:shapeless/watering_can')

    e.shapeless('kubejs:sifting_spade', [
        Item.of('kubejs:sifting_spade'),
        '2x botania:livingrock'
    ]).id('kubejs:shapeless/sifting_spade')
})