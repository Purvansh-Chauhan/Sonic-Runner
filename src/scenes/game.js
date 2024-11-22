import k from "../kaplayCtx";
import { makeSonic } from "../entities/sonic";
import { makeMotobug } from "../entities/motobug";
import { makeRing } from "../entities/ring";
export default function Game()
{
   k.setGravity(3100); //using setGravity function here we are applying gravity to the game and the value of gravity will be 3100
   const citySfx = k.play("city", {volume:0.2, loop: true}); //putting the sound inside the loops means the sound will continue to play even outside the scenes
   
   const bgPieceWidth = 1920;
   const bgPieces = [
       k.add([k.sprite("chemical-bg"), k.pos(0,0), k.scale(2), k.opacity(0.8)]), // scale,pos, opacity are the components of kaplay all these are available on the documentation of kaplay at js.com
       k.add([
           k.sprite("chemical-bg"), 
           k.pos(bgPieceWidth , 0), 
           k.scale(2),
            k.opacity(0.8),
           ]), 

// here we have used bgPieceWidth * 2 because we want to place it after the first image and the first image is already scaled to 2.. so to get an infinite scroll it is a necessary step
       // here in line 10 and 11 we are designing two pieces more precisely the BUILDDING background or the FLOOR on which the sonic is running here two components
       // have been used so that we can get an infinite scroll view  and that can be obtaind when we place the first behind the second and later the
       // second image will be the first image and the first image will be the second image i.e. vice versa  
   // thus using this concept we can create an parallax
   ];

   const platformWidth = 1280;
const platforms = [
   k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
   k.add([k.sprite("platforms"), k.pos(platformWidth  * 4, 450), k.scale(4)]),
];

let score = 0;
let scoreMultiplier = 0;

const scoreText = k.add([
    k.text("SCORE : 0", {font: "mania", size: 72}),
    k.pos(20, 20),
]);


    
const sonic = makeSonic(k.vec2(200, 745)); // specifying the position of the sonic..
sonic.setControls();
sonic.setEvents();
// arrow function never create the scope of their own they inheret it from the parent function..
sonic.onCollide("enemy", (enemy) =>{ //passing enemy object to the function call
    if(!sonic.isGrounded()) {
        k.play("destroy", {volume: 0.5 });
        k.play("hyper-ring", {volume: 0.5 });
        k.destroy(enemy);
        sonic.play("jump");
        sonic.jump();
        scoreMultiplier += 1;
        score += 10 * scoreMultiplier;
        scoreText.text = 'SCORE :' + score;
        if (scoreMultiplier === 1)sonic.ringCollectUI.text = "+10";
        if (scoreMultiplier > 1) {
            sonic.ringCollectUI.text = `x${scoreMultiplier}`;
        }        
        k.wait( 1, () => {
            sonic.ringCollectUI.text = "";
        });
        return;
    }    // if the above condition is not true that is the sonic is hurt then the below piece of code will be executed
    k.play("hurt", {volume: 0.5 })
    k.setData("current-score", score)// resets the current-score when the sonic is not grounded..
    k.go("gameover", citySfx);
});
sonic.onCollide("ring", (ring) => {
    k.play("ring", {volume: 0.5 });
    k.destroy(ring);
    score++;
    scoreText.text = 'SCORE : ${score}';
    sonic.ringCollectUI.text = "+1"; // this will give the yellow effect that we get after collecting the ring
    k.wait(1, () => (sonic.ringCollectUI.text = ""));// after the wait of 1 sec the +1 effect will be gone because we have set sonic.ringCOLLECTUI.text as 0;
});

let gameSpeed = 300; // here in this logic the speed of the game will be incremented after every 1s by 50
   k.loop(1, ()=> {
       gameSpeed +=50;
   });

const spawnMotoBug = () => {
const motobug = makeMotobug(k.vec2(1950, 773));
motobug.onUpdate(() => {
  if(gameSpeed < 3000){
    motobug.move(-(gameSpeed + 300), 0); // here -gameSpeed means the motobug is moving in left direction..
    return;  
} // setting the Y velocity as 0..
 
motobug.move(-gameSpeed, 0);
}); 

motobug.onExitScreen(() =>{
    if(motobug.pos.x < 0)k.destroy(motobug);
    });
    const waitTime = k.rand(0.5, 2.5);

    k.wait(waitTime, spawnMotoBug); // this block of code will help in infinite respawn of enemies..after a specific interval of time
};
 
spawnMotoBug();
    // here in this concept we are creating an invisible block or a platform in which the sonic we will do all the movements such as run jump and roll
const spawnRing = () => {
    const ring = makeRing(k.vec2(1950, 745));
    ring.onUpdate(() => {
        ring.move(-gameSpeed, 0);
    })
    ring.onExitScreen(() =>{
        if(ring.pos.x < 0)k.destroy(ring);
        });
        const waitTime = k.rand(0.5, 2.5);
    
        k.wait(waitTime, spawnRing); // this block of code will help in infinite respawn of enemies..after a specific interval of time
    };
    spawnRing();

    k.add([

        k.rect(1920, 300),
        k.opacity(0), // settin opacity to 0 will make it invisible
        k.area(),
        k.pos(0, 832), // it means the initial or the starting position that we need to define for the invisible platform..
        k.body({isStatic: true}),
        "platform", // here in this code we have set area and body.. the isStatic object is set to True it makes sure that the object is fixed and static and gravity will not act on it..
    ]);// this isStatic willl act like a wall or object so that the sonic remains at the invisible area and do all the actions..
      k.onUpdate(() => {
        if (sonic.isGrounded()) scoreMultiplier = 0;// this will reset the score..
   
        if (bgPieces[1].pos.x < 0){
        bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0); 
        bgPieces.push(bgPieces.shift());
    }
    
    bgPieces[0].move(-gameSpeed, 0);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

   if (platforms[1].pos.x < 0)
    { 
    platforms[0].moveTo(platforms[1].pos.x + platformWidth * 4, 450); // here v have platformwidth * 4 because we scale the platform as 4 while designing the game
    platforms.push(platforms.shift());
   }

   platforms[0].move(-gameSpeed, 0);
   platforms[1].moveTo(platforms[0].pos.x + platformWidth * 4, 450);

});

}