/**
 * Created by mshoc on 10/10/2017.
 */


import {resolveSelector} from "../common/dom";

export class Menu {
    menuClassName = "menu";
    itemClassName = "menuitem";
    dropDownClassName = "dropdown";
    activeClassName = "active";
    disabledClassName = "disabled";
    multipleClassName = "multiple";
    noAutoActivateClassName = "no-auto-activate";
    toggleClassName = "toggle";

    noAutoActivateSelector = false;

    /**
     * The amount of time after the mouse leaves the menu that it will deactivate.
     * The value can be a boolean value as well. False means it will never timeout
     * and true means it will timeout immediately.  Equivalent to a value of 0
     * milliseconds.
     * @type {number|boolean}
     */
    timeout = 1000;

    /**
     * If true the menu will automatically activate if the user mouses over an item, otherwise
     * the user will need to click an item in order to activate the menu.  This can be set to
     * positive integer that will cause the menu to activate after the given delay in
     * milliseconds.
     * @type {boolean|number}
     */
    autoActivate = false;

    /**
     * Controls if the menu can be toggled off by clicking a root item.
     * @type {boolean}
     */
    toggle = true;

    /**
     * If true the menu will toggle off when a menu is clicked directly or a disabled item is clicked.
     * @type {boolean}
     */
    closeOnClick = true;

    closeOnSelect = true;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization methods

    constructor(selector, config={}) {
        Object.assign(this, config);

        if(selector) {
            this.setView(resolveSelector(selector));
            this.init();
        }
    }

    init() {
        this.onClick = this.onClick.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);

        this.view.addEventListener("click", this.onClick, false);
        this.view.addEventListener("mouseover", this.onMouseOver, false);
        this.view.addEventListener("mouseout", this.onMouseOut, false);
    }

    setView(view) {
        this.view = view;
    }

    destroy() {
        this.view.removeEventListener("click", this.onClick);
        this.view.removeEventListener("mouseover", this.onMouseOver);
        this.view.removeEventListener("mouseout", this.onMouseOut);

        if(this._onDocumentClick) {
            document.removeEventListener("click", this._onDocumentClick);
            this._onDocumentClick = null;
        }

        this.view = null;

        if(this._timer) {
            clearTimeout(this._timer);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Action methods

    activate(node) {
        if(this.isActive(node)) return;

        let parent = this.getParentNode(node);

        if(parent && !this.isActive(parent)) {
            this.activate(parent);
        }

        node.classList.add(this.activeClassName);

        if(parent) {
            let activeItems = this.getActiveItems(parent);

            if(activeItems.length > 1 && !parent.classList.contains(this.multipleClassName)) {
                for(let i = 0, l = activeItems.length; i < l; i++) {
                    if(activeItems[i] !== node) {
                        this.deactivate(activeItems[i]);
                    }
                }
            }
        }

        if(node === this.view) {
            this._onDocumentClick = (event) => {
                if(!this.view.contains(event.target) && this.view !== event.target) {
                    document.removeEventListener("click", this._onDocumentClick);
                    this._onDocumentClick = null;
                    this.deactivate(this.view);
                }
            };

            document.addEventListener("click", this._onDocumentClick);
        }

        let activateEvent = new CustomEvent("menu-activate", {
            detail: {
                menu: this
            }
        });

        node.dispatchEvent(activateEvent);
    }

    deactivate(node) {
        if(!this.isActive(node)) return;

        let selector = `.${this.menuClassName}.${this.activeClassName}, .${this.itemClassName}.${this.activeClassName}`;
        let activeItems = node.querySelectorAll(selector);

        for(let i = 0, l = activeItems.length; i < l; i++) {
            activeItems[i].classList.remove(this.activeClassName);
        }

        node.classList.remove(this.activeClassName);

        if(this.isItem(node)) {
            let parent = this.getParentMenu(node);

            if(this.getActiveItems(parent).length === 0) {
                parent.classList.remove(this.activeClassName);
            }
        }

        if(this._onDocumentClick && node === this.view) {
            document.removeEventListener("click", this._onDocumentClick);
            this._onDocumentClick = null;
        }

        let deactivateEvent = new CustomEvent("deactivate-activate", {
            detail: {
                menu: this
            }
        });

        node.dispatchEvent(deactivateEvent);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event methods

    onClick(event) {
        let target = this.getClosestNode(event.target);

        // If the target was an item and closeOnSelect is true, deactivate the entire menu.
        if(this.closeOnSelect && !this.isDropDown(target)) {
            this.deactivate(this.view);
            return;
        }

        // If the target was an item or dropdown and is wasn't activated, activate it now.
        if((this.isItem(target) || this.isDropDown(target)) && !this.isActive(target)) {
            this.activate(target);
            return;
        }

        // If the view is active and the target wasn't an enabled item or dropdown, deactivate the entire menu.
        if(this.isActive(this.view) && (!(this.isItem(target) || this.isDropDown(target)) || this.isDisabled(target))) {
            this.deactivate(this.view);
            return;
        }

        // If an active item or dropdown was clicked and it is toggleable, deactivate it.
        if(this.isItem(target) || this.isDropDown(target)) {
            let parent = this.getParentMenu(target),
                toggle;

            if(parent === this.view) {
                toggle = parent.classList.contains(this.toggleClassName) || target.classList.contains(this.toggleClassName);
            } else {
                toggle = parent.classList.contains(this.toggleClassName) || target.classList.contains(this.toggleClassName);
            }

            if(toggle) {
                this.deactivate(target);
            }
        }
    }

    onMouseOver(event) {
        let target = this.getClosestNode(event.target);

        if(this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }

        if(this.isItem(target) && !(target.classList.contains(this.noAutoActivateClassName) || (this.noAutoActivateSelector && target.matches(this.noAutoActivateSelector)))) {
            let parent = this.getParentMenu(target);

            if(parent !== this.view || this.autoActivate === true || this.isActive(this.view)) {
                this.activate(target);
            } else if(typeof this.autoActivate === "number" && this.autoActivate >= 0) {
                this._timer = setTimeout(() => {
                    this._timer = null;
                    this.activate(target);
                }, this.autoActivate);
            }
        }
    }

    onMouseOut(event) {
        if(this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }

        let target = this.getClosestNode(event.target);

        if(this.timeout >= 0 && !this.view.contains(event.relatedTarget)) {
            this._timer = setTimeout(() => {
                console.log("Timeout");
                this._timer = null;
                this.deactivate(this.view);
            }, this.timeout);
        }

        if(this.isActive(target) && this.isItem(target) && !this.isDropDown(target)) {
            this.deactivate(target);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Methods used to transversing the menu.

    getClosestNode(element) {
        if(!this.view.contains(element)) return null;

        let selector = `.${this.menuClassName}, .${this.itemClassName}`,
            target = element.closest(selector);

        return target && this.view.contains(target) ? target : this.view;
    }

    getClosestItem(element) {
        let selector = `.${this.itemClassName}`,
            target = element.closest(selector);

        return target && this.view.contains(target) ? target : null;
    }

    getClosestMenu(element) {
        let selector = `.${this.menuClassName}`,
            target = element.closest(selector);

        return target && this.view.contains(target) ? target : this.view;
    }

    getChildren(element) {
        let items = element.querySelectorAll(`.${this.menuClassName}, .${this.itemClassName}`);
        items = Array.prototype.slice.call(items, 0);
        items.filter((item) => this.getClosestNode(item.parent) === element);
        return items;
    }

    getParentNode(element) {
        return this.getClosestNode(element.parentNode);
    }

    getParentItem(element) {
        return this.getClosestItem(element.parentNode);
    }

    getParentMenu(element) {
        return this.getClosestMenu(element.parentNode);
    }

    getActiveItems(element) {
        let children = this.getChildren(element);
        children = children.filter((item) => this.isActive(item));
        return children;
    }

    isMenu(element) {
        return element.classList.contains(this.menuClassName);
    }

    isItem(element) {
        return element.classList.contains(this.itemClassName);
    }

    isActive(element) {
        return element.classList.contains(this.activeClassName);
    }

    isDisabled(element) {
        let d = element.closest(`.${this.disabledClassName}`);

        if(!this.view.contains(d) && d !== this.view) {
            d = null;
        }

        return !!d;
    }

    isDropDown(element) {
        return element.classList.contains(this.dropDownClassName);
    }
}