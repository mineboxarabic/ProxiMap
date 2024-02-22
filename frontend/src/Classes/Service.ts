import exp from "constants";
export interface ServiceInterface 
{
    _id : string;
    partnerId: string;
    categoryId: string;
    name: string;
    description: string;
    price: number;
    position: {
      type: string;
      coordinates: [number, number];
     };
    range: number;
    availability: boolean;
    ratings: string[];
    status: string;
}
class Service implements ServiceInterface {
  partnerId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  position: { type: string; coordinates: [number, number] }; // Updated type for 'position'
  range: number;
  availability: boolean;
  ratings: string[];
  status: string;
  _id: string;

  constructor(service: Service) {

        this.partnerId = service.partnerId;
        this.categoryId = service.categoryId;
        this.name = service.name;
        this.description = service.description;
        this.price = service.price;
        this.position = service.position;
        this.range = service.range;
        this.availability = service.availability;
        this.ratings = service.ratings;
        this.status = service.status;
        this._id = service._id; // Assigned '_id' property
  }


  //get id 
  getId(): string {
    return this._id;
  }

  //get partnerId
  getPartnerId(): string {
    return this.partnerId;
  }

  //get categoryId
  getCategoryId(): string {
    return this.categoryId;
  }

  //get name
  getName(): string {
    return this.name;
  }

  //get description
  getDescription(): string {
    return this.description;
  }

  //get price
  getPrice(): number {
    return this.price;
  }

  //get position
  getPosition(): { type: string; coordinates: [number, number] } {
    return this.position;
  }

  //get range
  getRange(): number {
    return this.range;
  }

  //get availability
  getAvailability(): boolean {
    return this.availability;
  }

  //get ratings
  getRatings(): string[] {
    return this.ratings;
  }

  //get status
  getStatus(): string {
    return this.status;
  }

  //set id
  setId(id: string): void {
    this._id = id;
  }

  //set partnerId
  setPartnerId(partnerId: string): void {
    this.partnerId = partnerId;
  }

  //set categoryId
  setCategoryId(categoryId: string): void {
    this.categoryId = categoryId;
  }

  //set name
  setName(name: string): void {
    this.name = name;
  }

  //set description
  setDescription(description: string): void {
    this.description = description;
  }

  //set price
  setPrice(price: number): void {
    this.price = price;
  }

  //set position
  setPosition(position: { type: string; coordinates: [number, number] }): void {
    this.position = position;
  }

  //set range
  setRange(range: number): void {
    this.range = range;
  }

  //set availability
  setAvailability(availability: boolean): void {
    this.availability = availability;
  }

  //set ratings
  setRatings(ratings: string[]): void {
    this.ratings = ratings;
  }

  //set status
  setStatus(status: string): void {
    this.status = status;
  }

  //get all data
  getData(): ServiceInterface {
    return {
      _id: this._id,
      partnerId: this.partnerId,
      categoryId: this.categoryId,
      name: this.name,
      description: this.description,
      price: this.price,
      position: this.position,
      range: this.range,
      availability: this.availability,
      ratings: this.ratings,
      status: this.status,
    };
  }
}

export default Service;