// priority: 0

/**
 * @param {Internal.RecipeSchemaRegistryEventJS} e
 * @param {{ components?: Special.RecipeComponentMap; anyFloatNumber?: Internal.NumberComponent$FloatRange; anyString?: Internal.StringComponent; bool?: Internal.BooleanComponent; id: any; intNumber: any; filteredString?: (...args: any[]) => Internal.RecipeComponent<any>; nonBlankString?: Internal.StringComponent; floatNumber?: Internal.NumberComponent$FloatRange; inputItem: any; outputItem: any; inputFluid?: Internal.FluidComponents$1; outputFluid?: Internal.FluidComponents$2; outputFluidOrItem?: Internal.OrRecipeComponent<any, any>; fluidTag?: Internal.RecipeComponent<any>; blockTag?: Internal.TagKeyComponent<any>; inputStackedItem?: any; inputFluidOrFluidTag?: (tagKeyStr: any) => Internal.OrRecipeComponent<Internal.InputFluid, any>; outputFluidOrFluidTag?: (tagKeyStr: any) => Internal.OrRecipeComponent<Internal.OutputFluid, any>; inputFluidOrItem?: (tagKeyStr: any) => Internal.OrRecipeComponent<InputItem, any>; inputFluidOrStackedItem?: (tagKeyStr: any) => any; heatCondition?: Internal.RecipeComponent<any>; }} c
 */
function recipeSchema_spectrum(e, c) {
    if (Platform.isLoaded('spectrum')) {
        e.register('spectrum:anvil_crushing',
            new $RecipeSchema(
                c.outputItem.key('result'),
                c.inputItem.key('ingredient'),
                c.floatNumber.key('crushedItemsPerPointOfDamage').optional(0.6).exclude(),
                c.floatNumber.key('experience').optional(0).exclude(),
                c.anyString.key('particleEffectIdentifier').optional('cloud').exclude(),
                c.anyString.key('soundEventIdentifier').optional('block.stone.break').exclude(),
                c.anyString.key('group').defaultOptional().exclude(),
                c.anyString.key('required_advancement').defaultOptional().exclude()
            )
        )
    }
}