import exp from "constants";
import { ServiceInterface } from './Interfaces';

/*{
  "_id": {
    "$oid": "65b8d148fc13ae7a5123494c"
  },
  "categoryId": {
    "$oid": "65a9a3912f10d0a3fd7106c5"
  },
  "partnerId": {
    "$oid": "60b5c5b4c7a3c0b4e4f0f8c4"
  },
  "name": "rcleeton0",
  "description": "Colles' fracture of right radius",
  "price": 552,
  "position": {
    "lat": -22.7691646,
    "lng": -43.6950804
  },
  "range": 4,
  "availability": true,
  "status": "accepted"
} */
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

  _id: string; // Added missing '_id' property

  constructor(service: ServiceInterface) {
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
}

export default Service;