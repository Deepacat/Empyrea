ServerEvents.recipes(e => {
    e.remove({ output: 'farmersdelight:organic_compost' })
    e.shapeless('3x farmersdelight:organic_compost', [
        '3x minecraft:rotten_flesh', '2x farmersdelight:straw', '4x minecraft:bone_meal'
    ]).id('kubejs:farmersdelight/shapeless/organic_compost_flesh')
    e.shapeless('3x farmersdelight:organic_compost', [
        '3x farmersdelight:straw', '2x minecraft:bone_meal', '4x farmersdelight:tree_bark'
    ]).id('kubejs:farmersdelight/shapeless/organic_compost_bark')
})