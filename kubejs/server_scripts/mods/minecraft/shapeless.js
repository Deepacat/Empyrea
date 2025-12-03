ServerEvents.recipes(e => {
    e.shaped('minecraft:damaged_anvil', [
        'ABA',
        ' A ',
        'AAA'
    ], {
        A: '#forge:ingots/iron',
        B: 'minecraft:iron_block'
    }).id('kubejs:minecraft/shaped/damaged_anvil')
})