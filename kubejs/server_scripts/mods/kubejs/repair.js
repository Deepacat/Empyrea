ServerEvents.recipes(e => {
    // repairing
    e.shapeless('kubejs:watering_can', [
        Item.of('kubejs:watering_can'),
        'botania:water_bowl'
    ]).id('kubejs:repair/shapeless/watering_can')

    e.shapeless('kubejs:sifting_spade', [
        Item.of('kubejs:sifting_spade'),
        'botania:livingrock'
    ]).id('kubejs:repair/shapeless/sifting_spade')
})