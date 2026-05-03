const leftmost = 10

JEIAddedEvents.registerCategories(e => {
    const guiHelper = e.JEI_HELPERS.guiHelper
    // Register a new CustomCategory with the id "kubejsadditions:ender_radiator".
    e.custom("kubejsadditions:ender_radiator", (category) => {
        category.width = 120
        category.height = 30

        category.title("Ender Radiating")
            // Set the background of the category to a blank 100x50 drawable canvas.
            .background(guiHelper.createBlankDrawable(120, 30))
            // Set the icon of the category to a cactus item.
            .icon(guiHelper.createDrawableItemStack(Item.of('kubejs:ender_radiator')))
            // Set the callback function that will verify if a recipe is a valid recipe for this category.
            .isRecipeHandled((recipe) => {
                return global["verifyRecipe"](category.jeiHelpers, recipe)
            })
            // Set the callback function that will allow JEI to index this recipe and determine
            // what the inputs and outputs of each recipe are.
            .handleLookup((builder, recipe, focuses) => {
                global["handleLookup"](category.jeiHelpers, builder, recipe, focuses)
            })
            // Set the callback function for renderering additional detials to the screen.
            .setDrawHandler((recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
                global["renderer"](category.jeiHelpers, recipe, recipeSlotsView, guiGraphics, mouseX, mouseY)
            })
    })
})

global["verifyRecipe"] = (jeiHelpers, recipe) => {
    if (!recipe) return false
    if (!recipe.data) return false
    if (!recipe.data.input) return false
    if (!recipe.data.output) return false
}

global["handleLookup"] = (jeiHelpers, builder, recipe, focuses) => {
    builder.addSlot("CATALYST", leftmost, 7)
        .addItemStack(Item.of("kubejs:ender_radiator"))
        .setSlotName("radiator")

    builder.addSlot("INPUT", leftmost + 30, 7)
        .addItemStack(Item.of(recipe.data.input))
        .setSlotName("input")

    builder.addSlot("OUTPUT", leftmost + 79, 7)
        .addItemStack(Item.of(recipe.data.output))
        .setSlotName("output")
    // Add an invisible output slot so that if you look at how the item is made, it shows this recipe.
    builder.addInvisibleIngredients("OUTPUT")
        .addItemStack(Item.of("kubejs:ender_radiator"))
}

global["renderer"] = (jeiHelpers, recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
    guiGraphics.blit(
        new ResourceLocation("kubejs", "textures/gui/arrow.png"),
        leftmost + 50, 7, 0, 0, 24, 17, 24, 17
    )
}

JEIAddedEvents.registerRecipes((event) => {
    event.custom("kubejsadditions:ender_radiator")
        .add({ input: 'minecraft:sandstone', output: 'minecraft:end_stone' })
})