ServerEvents.recipes(e => {
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