let $Pickarang = Java.loadClass("org.violetmoon.quark.content.tools.entity.rang.Pickarang");
let $PickarangType = Java.loadClass("org.violetmoon.quark.content.tools.config.PickarangType");
let $PickarangModule = Java.loadClass("org.violetmoon.quark.content.tools.module.PickarangModule");
let $PickarangConstructor = Java.loadClass("org.violetmoon.quark.content.tools.config.PickarangType$PickarangConstructor");
let $Quark = Java.loadClass("org.violetmoon.quark.base.Quark");
let $EntityFactory = Java.loadClass("net.minecraft.world.entity.EntityType$EntityFactory");
let $BooleanSupplier = Java.loadClass("java.util.function.BooleanSupplier");
let $CreativeModeTabs = Java.loadClass("net.minecraft.world.item.CreativeModeTabs");

let module = $Quark.ZETA.modules.get($PickarangModule);
let makePickarang;
for (let m of $PickarangModule.__javaObject__.getDeclaredMethods()) {
  if (m.getName() == 'makePickarang') {
    m.setAccessible(true);
    makePickarang = m;
    break;
  }
}

// TODO: entity not appearing client side for some reason
// TODO: custom max hardness & timeout values probably doesn't work right now.. fix later if needed

makePickarang.invoke(module,
    new $PickarangType(
        Items.IRON_INGOT,
        Items.IRON_PICKAXE,
        20,   // timeout
        2,    // harvest level (iron tier)
        500,  // durability
        20.0, // max hardness
        1,    // attack damage
        1     // cooldown
    ),
    "kubejs:whatahuh",
    new $EntityFactory({create: (type, level) => new $Pickarang(type, level)}),
    new $PickarangConstructor({makePickarang: (type, level, thrower) => new $Pickarang(type, level, thrower)}),
    new $BooleanSupplier({getAsBoolean: () => true})
).setCreativeTab($CreativeModeTabs.TOOLS_AND_UTILITIES);
