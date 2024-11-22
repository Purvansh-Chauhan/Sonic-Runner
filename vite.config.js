import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
});
// this file is necessary to put the game on any hosting website and for this we need to create a dist file using this 
// dist file we can upload it on any hosting website and it will be available to others for use..
// all we have to do now is zip the dist folder and host it on any platform like host.io