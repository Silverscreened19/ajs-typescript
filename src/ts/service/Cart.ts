import Buyable from '../domain/Buyable';

export default class Cart {
    private _items: Buyable[] = [];

    add(item: Buyable): void {
        this._items.push(item);
    }

    get items(): Buyable[] {
        return [...this._items];
    }

    calculateTotalCost(): number {
        return this.items.reduce((sum, current) => sum + current.price, 0);
    }

    calculateTotalCostDicsount(discount: number): number {
        return this.calculateTotalCost() - this.calculateTotalCost()*discount/100;
    }

    deleteItem(id: number): void {
        const itemToRemove = this._items.find(item => item.id === id);

        if(itemToRemove === undefined) {
            throw new Error('Wrong ID');
        }
        this._items.splice(this._items.indexOf(itemToRemove), 1);
    }
}
