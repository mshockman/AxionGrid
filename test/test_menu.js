import {Menu} from "../src/menus/";


window.addEventListener("load", function() {
    console.log("Page Loaded.");

    window.m = new Menu(
        document.querySelector("#test-menu")
    );
});