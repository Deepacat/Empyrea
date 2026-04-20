ServerEvents.recipes(e => {
    // Move netherrack brick smelting to blasting so that molten rod doesn't autosmelt netherrack
    e.remove({ type: "smelting", input: "netherrack" })
    e.blasting('nether_brick', 'netherrack')
})