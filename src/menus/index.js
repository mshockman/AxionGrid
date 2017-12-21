/**
 * Created by mshoc on 10/10/2017.
 */


import {resolveSelector} from "../common/dom";

export class Menu {
    timeout = 1000;
    delay = false;
    autoActivate = true;

    closeOnClick = false;
    closeOnSelect = false;

    multiple = false;

    constructor(selector) {
        this.view = resolveSelector(selector);

        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onClick = this.onClick.bind(this);

        this.view.addEventListener("click", this.onClick);
        this.view.addEventListener("mouseover", this.onMouseOver);
        this.view.addEventListener("mouseout", this.onMouseOut);
    }

    show() {

    }

    hide() {

    }

    activate() {

    }

    deactivate() {

    }

    appendTo(selector) {
        let node = resolveSelector(selector);
        node.appendChild(this.view);
    }

    onClick(event) {
        console.log("Click");
    }

    onMouseOver(event) {
        console.log("On Mouse Out");
    }

    onMouseOut(event) {
        console.log("On Mouse Over.");
    }

    getItems() {

    }
}


class Dropdown {

}