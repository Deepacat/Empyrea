ServerEvents.recipes(e => {
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

    e.recipes.botania.mana_infusion('spectrum:mermaids_gem', 'minecraft:heart_of_the_sea', 10000, 'botania:alchemy_catalyst')
        .id('kubejs:botania/mana_infusion/heart_to_mermaids_gem')

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