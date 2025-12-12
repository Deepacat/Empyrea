ServerEvents.recipes(e => {
    e.custom({
        type: "lychee:block_interacting",
        item_in: {
            item: "malum:processed_soulstone"
        },
        block_in: "#minecraft:saplings",
        post: [
            {
                type: "place",
                block: "malum:runewood_sapling"
            }
        ]
    }).id('kubejs:lychee/block_interacting/runewood_sapling')
})
