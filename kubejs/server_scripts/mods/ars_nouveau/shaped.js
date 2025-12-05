ServerEvents.recipes(e => {
    e.shaped('ars_nouveau:ritual_brazier', [
        'ABA',
        ' C ',
        'DDD'
    ], {
        A: 'supplementaries:gold_trapdoor',
        B: 'spectrum:amethyst_storage_block',
        C: '#kubejs:rare_mana',
        D: '#forge:ingots/gold'
    }).id('kubejs:ars_nouveau/shaped/ritual_brazier')
})