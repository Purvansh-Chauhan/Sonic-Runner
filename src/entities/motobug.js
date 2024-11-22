import k from "../kaplayCtx";

export function makeMotobug(pos) {
    return k.add([  // here we are returning an object..
        k.sprite("Motobug", {anim: "run"}),
        k.area({ shape: new k.Rect(k.vec2(-5, 0), 32, 32) }),
        k.scale(4),
        k.anchor("center"),
        k.pos(pos),
        k.offscreen(),// this component will allow us to check on methods when the enemy is off screen
        // this component is useful we gonna spawn number of enemies and destroy them later as soon as they leave the screen otherwise it wil effect the perfomance of the game
        "enemy", // this is the tag.
    ]);
}