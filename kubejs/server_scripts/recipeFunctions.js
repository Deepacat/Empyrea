/**
 * @param {Internal.RecipesEventJS} e
 * @param {{ type: string; item: string; count: number; }[]} post
 * @param {any[]} inputs
 * @param {string} insideBlock
 */
function insideBlock(e, post, inputs, insideBlock) {
    let recipe = {}
    recipe.type = "lychee:item_inside"
    recipe.block_in = insideBlock
    recipe.item_in = inputs
    recipe.post = post
    recipe.max_repeats = 16
    const r = e.custom(recipe)

    return {
        id: function (/** @type {string} */ customId) {
            r.id(customId)
        }
    }
}