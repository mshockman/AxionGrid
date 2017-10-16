import {FullGrid} from './FullGrid';
import {randomChoice} from "../../src/common/util";


let itemCount = 0;


class TestDataItem {
    constructor() {
        this.id = itemCount++;
        this.inventory_number = "TEST_" + this.id;
        this.title = `NEW ${this.inventory_number} Test Item #${this.id}`;
        this.progress = Math.round(Math.random()*100);
        this.price = parseFloat((Math.random()*100).toFixed(2));
        this.cost = parseFloat((Math.random()*100).toFixed(2));
        this.brand = randomChoice(["Sony", "Nintendo", "Microsoft", "Google", "Apple", "Dell"]);
        this.color = randomChoice(["Red", "Green", "Blue", "Yellow", "Black", "White", "Orange", "Pink", "Brown", "Purple", "Teal", "Lime Green", "Tan"]);
    }

    static createItems(count) {
        let r = [];

        for(let i = 0; i < count; i++) {
            r.push(new TestDataItem());
        }

        return r;
    }
}


class TestGrid extends FullGrid {
    constructor() {
        let filters = null,
            columns = {
                id: {
                    id: "id",
                    width: 100,
                    label: "ID",
                    resizeable: false,
                    sortable: true,
                    dataSortable: true
                },

                inventory_number: {
                    id: "inventory_number",
                    width: 250,
                    maxWidth: 400,
                    label: "Inventory Number",
                    resizeable: true,
                    sortable: true,
                    dataSortable: true
                },

                title: {
                    id: "title",
                    width: 400,
                    maxWidth: 600,
                    label: "Title",
                    resizeable: true,
                    sortable: true,
                    dataSortable: true
                },

                progress: {
                    id: "progress",
                    width: 100,
                    label: "Progress",
                    resizeable: false,
                    sortable: true,
                    dataSortable: true
                },

                price: {
                    id: "price",
                    width: 100,
                    maxWidth: 200,
                    label: "Price",
                    resizeable: true,
                    sortable: true,
                    dataSortable: true
                },

                cost: {
                    id: "cost",
                    width: 100,
                    maxWidth: 200,
                    label: "Cost",
                    resizeable: true,
                    sortable: true,
                    dataSortable: true
                },

                brand: {
                    id: "brand",
                    width: 100,
                    maxWidth: 200,
                    label: "Brand",
                    resizeable: true,
                    sortable: true,
                    dataSortable: true
                },

                color: {
                    id: "color",
                    width: 100,
                    maxWidth: 200,
                    label: "Color",
                    resizeable: true,
                    sortable: true,
                    dataSortable: true
                }
            };

        super("#container", null, columns, filters);
        this.setData(TestDataItem.createItems(50000));

        this.setColumns("inventory_number", "brand", "title", "price", "cost");

        this.canvas.render();
    }
}


window.addEventListener("load", () => {
    new TestGrid("#container", null);
});