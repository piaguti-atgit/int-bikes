import type { BikeType, Rental } from "./Rental.ts";

export class RentalList {
  #items: Rental[] = [];

  add(item: Rental): void {
    const exists = this.#items.some(
      (rental) => rental.bikeCode === item.bikeCode,
    );
    if (exists) {
      throw new Error("Esa bicicleta ya está alquilada.");
    }
    this.#items.push(item);
  }

  remove(_bikeCode: string): void {
    const ix = this.#items.findIndex(
      (rental) => rental.bikeCode === _bikeCode,
    );
    if(ix === -1) {
      throw new Error("Esa bicicleta no existe.");
    }
    this.#items.splice(ix, 1);
  }

  getItems(): readonly Rental[] {
    return [...this.#items];
  }

  getByType(type: BikeType): readonly Rental[] {
    return this.#items.filter((rental) => rental.bikeType === type);
  }

  totalIncome(): number {
    return this.#items.reduce((total, rental) => total + rental.cost(), 0);
  }

  totalLateFees(): number {
    let total = 0;
    for(const rent of this.#items){
      total+= rent.lateHours*rent.pricePerHour*2;
    }
    return total;
  }
}
