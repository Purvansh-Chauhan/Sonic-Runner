import kaplay from "kaplay"; // we created kaplayContext.js so that we can use kaplay in a non global way..
// and certain functions in kaplay can conflict with other functions and libraries in the game so to avoid it we are using it in a non-global way


export const k = kaplay({
    width: 1920,
    height: 1080,
    letterbox: true,
    background: [0, 0, 0],
    global: false,
    touchToMouse: true, //converts any touch into mouseclicks..with the help of this game will now can be played in the mobile too..
    buttons: { //making a button object for the number of button that will be used to play the game through the game pad..
      jump: {
        keyboard: ["space"],
        mouse: "left",
      },
},
  debugKey: "d",
  debug: true, //debug and debug key is basically  used for debugging the game here..by default its true but later we will set it to false
});

export default k;