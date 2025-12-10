ServerEvents.recipes(e => {
    // magical infusion
    e.recipes.botania.mana_infusion('botania:quartz_mana', 'malum:natural_quartz', 500)
        .id('kubejs:botania/mana_infusion/mana_quartz_natural')

    e.remove({ id: 'botania:mana_infusion/deepslate_to_tuff' })
    e.remove({ id: 'botania:mana_infusion/calcite_to_deepslate' })
    e.remove({ id: 'botania:mana_infusion/tuff_to_calcite' })

    // otherstone to basalt
    e.recipes.botania.mana_infusion('minecraft:basalt', 'occultism:otherstone', 300, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/otherstone_to_basalt')
    // basalt/tuff/calcite cycle
    e.recipes.botania.mana_infusion('minecraft:basalt', 'minecraft:calcite', 300, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/calcite_to_basalt')
    e.recipes.botania.mana_infusion('minecraft:tuff', 'minecraft:basalt', 300, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/basalt_to_tuff')
    e.recipes.botania.mana_infusion('minecraft:calcite', 'minecraft:tuff', 300, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/tuff_to_calcite')
    // kelp bamboo cycle
    e.recipes.botania.mana_infusion('minecraft:bamboo', 'minecraft:kelp', 250, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/kelp_to_bamboo')
    e.recipes.botania.mana_infusion('minecraft:kelp', 'minecraft:bamboo', 250, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/bamboo_to_kelp')
    // misc alchemy reversion/crushing 
    e.recipes.botania.mana_infusion('spectrum:mermaids_gem', 'minecraft:heart_of_the_sea', 10000, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/heart_to_mermaids_gem')
    e.recipes.botania.mana_infusion('hexcasting:amethyst_dust', 'minecraft:amethyst_shard', 200, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/amethyst_to_dust')
    e.recipes.botania.mana_infusion('waystones:warp_stone', '#waystones:waystones', 5000, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/waystone_to_warp_stone')
    e.recipes.botania.mana_infusion('waystones:warp_stone', '#waystones:sharestones', 5000, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/sharestone_to_warp_stone')

    // copy spectrums anvil crushing recipes to pulverizing catalyst infusing
    let recipeIter = 0
    e.forEachRecipe({ type: 'spectrum:anvil_crushing' }, recipe => {
        let anvilRecipeObj = JSON.parse(recipe.json)
        let id = (
            `kubejs:botania/mana_infusion/anvilcopy/` +
            `${Item.of(anvilRecipeObj.result).id.split(':')[1]}/` + recipeIter
        )
        e.recipes.botania.mana_infusion(
            Item.of(anvilRecipeObj.result), // output item stack
            Ingredient.of(anvilRecipeObj.ingredient), // input ingredient
            50 + (Math.round((anvilRecipeObj.crushedItemsPerPointOfDamage * 50) / 10) * 10), // mana cost
            'kubejs:pulverizing_catalyst' // crushing catalyst block
        ).id(id)
        recipeIter++
    })
})