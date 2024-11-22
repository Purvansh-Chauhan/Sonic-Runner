import k from "../kaplayCtx";
export function makeSonic(pos){
    const sonic = k.add([
        k.sprite("sonic", {anim: "run" }),
        k.scale(4),
        k.area(),
        k.anchor("center"),
        k.pos(pos),
        k.body({ jumpForce: 1700 }),
        {
            ringCollectUI: null,
            //in kaplay we can pass area of object in an array this is the concept of OOP
            setControls(){
                k.onButtonPress("jump",()=>{
                 if(this.isGrounded())// this function tells us if the sonic is on the platform or not..
                 {
                    this.play("jump"); // here the play method is using the jump animation
                    this.jump(); // this function will help in jumping the sonic physically
                     k.play("jump",{volume: 0.5 });  // here k.play is used for making the sound while jumping where as this.play is used for making the sonic jump.. 
                }
                });
            },
            setEvents(){
                this.onGround(()=> {
                    this.play("run")
                }) // as soon as the object touches the ground the action is fired that is run
            }
        },
    ]);

    //here this UI will help in giving that +1 effect that we are getting after collecting the ring on the screen..
   sonic.ringCollectUI = sonic.add([ // this is the child object for sonic which will be used in the game..
    k.text("", { font: "mania", size: 24}),
    k.color(255,255, 0),
    k.anchor("center"),
    k.pos(30, -10),
   ]);
    return sonic;
}