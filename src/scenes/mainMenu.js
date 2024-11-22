import { makeSonic } from "../entities/sonic";
import k from "../kaplayCtx";
export default function mainMenu() {
    if (!k.getData("best-score")) k.setData("best-score", 0);// both of these getData and SetData are imported from the kaplay library..
    k.onButtonPress("jump", () => k.go("game"));

    const bgPieceWidth = 1920;
    const bgPieces = [
        k.add([k.sprite("chemical-bg"), k.pos(0,0), k.scale(2), k.opacity(0.8)]), // scale,pos, opacity are the components of kaplay all these are available on the documentation of kaplay at js.com
        k.add([
            k.sprite("chemical-bg"), 
            k.pos(bgPieceWidth * 2, 0), 
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

k.add([k.text("SONIC RING RUN",{font: "mania", size: 96 }),
    k.pos(k.center().x, 200), //.x specifies at the x coordinate and 200 specifies at the y coordinate 
    // to adjust the position we can directly use dot and the coordinate that is the x coordinate or the y coordinate..
    k.anchor("center"), // the anchor tag places the text at the center 
]);
k.add([k.text("Press Space/Click/Touch To Play",{font: "mania", size: 32 }),
    //.x specifies at the x coordinate and 200 specifies at the y coordinate 
    // to adjust the position we can directly use dot and the coordinate that is the x coordinate or the y coordinate..
    k.anchor("center"), // the anchor tag places the text at the center 
    k.pos(k.center().x, k.center().y - 200),// the value of y is decreasing i.e. the value of y is subtracting so we will go up if we will increase the value it will come down the texts..
]);

makeSonic(k.vec2(200, 745));// here vec2 is the data structure that has been used for the positioning of the sonic..


k.onUpdate(() =>{ //this function will run every frame like 60 frames per second this function loop every statement
    if (bgPieces[1].pos.x < 0){ //in the array bgPieces that we created at the second index that is index 1 of the array bgPieces array
        //here we will check if the position of the frame has gone behind the left or outside the boundds of the canvas 
        bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0); // so if the above condition happens that is out of bounds of the frame
        // then we will put it behind the first frame, we have used pos.x because motion is happening only in the x direction and not in y direction 
        // thats why we have used bgPieces[1].pos.x + bgPieceWidth * 2 , 0 here 0 means no motion in the y direction.. and bgPieceWidth * 2 because we set frame to twice..
        bgPieces.push(bgPieces.shift()); // here we are changing the order of the frames i.e. the first frame will now become the second frame 
        //and the second frame will become the first frame with the 
        //here bgPieces.push will add last element to the end of an array and bgPieces.shift()takes out the first element of an array and returns it
        // so in short we are taking out the first game object from the array bgPieces and putting it at the end..
    }
    bgPieces[0].move(-100, 0); // logic to move the pieces to the left the move function in kaplay libraray allows us to move the game object
    // here in move (x,y) x specifies the velocity in x direction and y specifies the velocity of the object in Y direction..
    // here we have put y velocity to zero in move() functiion because we dont want the frame to move in y direction
    // -100 signifies the velocity of the frame to left 
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);
     // moving frame second behind frame first..
     //this function will run every frame like 60 frames per second this function loop every statement
        if (platforms[1].pos.x < 0){ //in the array bgPieces that we created at the second index that is index 1 of the array bgPieces array
            //here we will check if the position of the frame has gone behind the left or outside the boundds of the canvas 
            platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 2, 0); // so if the above condition happens that is out of bounds of the frame
            // then we will put it behind the first frame, we have used pos.x because motion is happening only in the x direction and not in y direction 
            // thats why we have used bgPieces[1].pos.x + bgPieceWidth * 2 , 0 here 0 means no motion in the y direction.. and bgPieceWidth * 2 because we set frame to twice..
            platforms.push(platforms.shift()); // here we are changing the order of the frames i.e. the first frame will now become the second frame 
            //and the second frame will become the first frame with the 
            //here bgPieces.push will add last element to the end of an array and bgPieces.shift()takes out the first element of an array and returns it
            // so in short we are taking out the first game object from the array bgPieces and putting it at the end..
        }
        platforms[0].move(-4000, 0); // logic to move the pieces to the left the move function in kaplay libraray allows us to move the game object
        // here in move (x,y) x specifies the velocity in x direction and y specifies the velocity of the object in Y direction..
        // here we have put y velocity to zero in move() functiion because we dont want the frame to move in y direction
        // -100 signifies the velocity of the frame to left 
       platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450); // moving frame second behind frame first..
    
});// the above code will give the infinite run loop or the parallax..
}
