ServerEvents.recipes(e => {
    insideBlock(e, [
        { type: "drop_item", item: "minecraft:deepslate", count: 1 },
        { type: "place", block: "*", contextual: { type: "chance", chance: 0.01 } }
    ],
        Ingredient.of('minecraft:basalt').toJson(),
        "starbunclemania:source_fluid_block",
    ).id(`kubejs:lychee/fluid_dipping/deepslate_in_source`)
})