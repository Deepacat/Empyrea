ServerEvents.recipes(e => {
    e.remove({ id: 'ars_nouveau:manipulation_essence_to_flourishing_sapling' })
    e.shapeless('ars_elemental:yellow_archwood_sapling', ['ars_nouveau:manipulation_essence', 'ars_nouveau:blue_archwood_sapling'],)
        .id('kubejs:ars_nouveau/shapeless/flashing_sapling')
    e.shapeless('ars_nouveau:green_archwood_sapling', ['ars_nouveau:manipulation_essence', 'ars_elemental:yellow_archwood_sapling'],)
        .id('kubejs:ars_nouveau/shapeless/flourishing_sapling')
})