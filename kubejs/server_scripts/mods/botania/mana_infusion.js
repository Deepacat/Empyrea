ServerEvents.recipes(e => {
    // magical infusion
    e.recipes.botania.mana_infusion('botania:quartz_mana', 'malum:natural_quartz', 500)
        .id('kubejs:botania/mana_infusion/mana_quartz_natural')

    e.remove({ id: 'botania:mana_infusion/deepslate_to_tuff' })
    e.remove({ id: 'botania:mana_infusion/calcite_to_deepslate' })
    e.remove({ id: 'botania:mana_infusion/tuff_to_calcite' })

    // otherstone > basalt
    e.recipes.botania.mana_infusion('minecraft:basalt', 'occultism:otherstone', 300, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/otherstone_to_basalt')

    // basalt > calcite > tuff <> cycle
    e.recipes.botania.mana_infusion('minecraft:calcite', 'minecraft:basalt', 250, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/basalt_to_calcite')
    e.recipes.botania.mana_infusion('minecraft:tuff', 'minecraft:calcite', 250, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/calcite_to_tuff')
    e.recipes.botania.mana_infusion('minecraft:basalt', 'minecraft:tuff', 250, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/tuff_to_basalt')

    // netherrack <> blackstone cycle
    e.recipes.botania.mana_infusion('minecraft:netherrack', 'minecraft:blackstone', 100, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/blackstone_to_netherrack')
    e.recipes.botania.mana_infusion('minecraft:blackstone', 'minecraft:netherrack', 100, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/netherrack_to_blackstone')

    // kelp <> bamboo cycle
    e.recipes.botania.mana_infusion('minecraft:bamboo', 'minecraft:kelp', 250, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/kelp_to_bamboo')
    e.recipes.botania.mana_infusion('minecraft:kelp', 'minecraft:bamboo', 250, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/bamboo_to_kelp')

    // misc. alchemy reverting recipes (Non crushing)
    e.recipes.botania.mana_infusion('spectrum:mermaids_gem', 'minecraft:heart_of_the_sea', 10000, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/heart_to_mermaids_gem')

    // Crushing catalyst recipes
    e.recipes.botania.mana_infusion('hexcasting:amethyst_dust', 'minecraft:amethyst_shard', 200, 'kubejs:pulverizing_catalyst')
        .id('kubejs:botania/mana_infusion/amethyst_to_dust')
    e.recipes.botania.mana_infusion('waystones:warp_stone', '#waystones:waystones', 5000, 'kubejs:pulverizing_catalyst')
        .id('kubejs:botania/mana_infusion/waystone_to_warp_stone')
    e.recipes.botania.mana_infusion('waystones:warp_stone', '#waystones:sharestones', 5000, 'kubejs:pulverizing_catalyst')
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