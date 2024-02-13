
/*{
  "_id": {
    "$oid": "65b8d148fc13ae7a51234951"
  },
  "categoryId": {
    "$oid": "65a9a3912f10d0a3fd7106c3"
  },
  "partnerId": {
    "$oid": "60b5c5b4c7a3c0b4e4f0f8c3"
  },
  "name": "mvidgeon5",
  "description": "Pressure ulcer of right elbow, stage 1",
  "price": 56,
  "position": {
    "type": "Point",
    "coordinates": [
      4.568749743547676,
      46.0841182620497
    ]
  },
  "range": 1,
  "availability": true,
  "status": "pending",
  "ratings": []
}*/

import { ObjectId } from "mongodb";
const SERVICES_DATA = [
  {
    _id: new ObjectId("65b8d148fc13ae7a5123494c"),
    categoryId: new ObjectId("65a9a3912f10d0a3fd7106c5"),
    partnerId: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c6"),
    name: "rcleeton0",
    description: "Colles' fracture of right radius",
    price: 552,
    position: {
      type: "Point",
      coordinates: [
        4.568749743547676,
        46.0841182620497
      ]
    },
    range: 4,
    availability: true,
    status: "accepted",
  },
  {
    _id: new ObjectId("65b8d148fc13ae7a5123494d"),
    categoryId: new ObjectId("65a9a3912f10d0a3fd7106c5"),
    partnerId: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c6"),
    name: "rkubu1",
    description: "Other specified disorders of arteries and arterioles",
    price: 150,
    position: {
      type: "Point",
      coordinates: [
        2.568749743547676,
        26.0841182620497
      ]
    },
    range: 8,
    availability: false,
    status: "accepted",
  },
  {
    _id: new ObjectId("65b8d148fc13ae7a5123494e"),
    categoryId: new ObjectId("65a9a3912f10d0a3fd7106c4"),
    partnerId: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c6"),
    name: "wricart2",
    description:
      "Unspecified fracture of shaft of right radius, subsequent encounter for open fracture type IIIA, IIIB, or IIIC with routine healing",
    price: 885,
    position: {
        type: "Point",
        coordinates: [
            3.568749743547676,
            36.0841182620497
        ]

    },
      range: 4,
    availability: false,
    status: "pending",
  },
  {
    _id: new ObjectId("65b8d148fc13ae7a5123494f"),
    categoryId: new ObjectId("65a9a3912f10d0a3fd7106c3"),
    partnerId: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c6"),
    name: "wwattam3",
    description:
      "Other injury of other muscles, fascia and tendons at shoulder and upper arm level, right arm, initial encounter",
    price: 770,
    position: {
        type: "Point",
        coordinates: [
            3.568749743547676,
            36.0841182620497
        ]
    },
    range: 7,
    availability: false,
    status: "pending",
  },
  {
    _id: new ObjectId("65b8d148fc13ae7a51234950"),
    categoryId: new ObjectId("65a9a3912f10d0a3fd7106c3"),
    partnerId: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c4"),
    name: "ieastcott4",
    description:
      "Traumatic rupture of unspecified ligament of right middle finger at metacarpophalangeal and interphalangeal joint, sequela",
    price: 531,
    position: {
        type: "Point",
        coordinates: [
            3.568749743547676,
            36.0841182620497
        ]
    },
    range: 4,
    availability: true,
    status: "accepted",
  },
  {
    _id: new ObjectId("65b8d148fc13ae7a51234951"),
    categoryId: new ObjectId("65a9a3912f10d0a3fd7106c3"),
    partnerId: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c3"),
    name: "mvidgeon5",
    description: "Pressure ulcer of right elbow, stage 1",
    price: 56,
    position: {
        type: "Point",
        coordinates: [
            4.568749743547676,
            46.0841182620497
        ]
    },
    range: 1,
    availability: true,
    status: "pending",
  },
  {
    _id: new ObjectId("65b8d148fc13ae7a51234952"),
    categoryId: new ObjectId("65a9a3912f10d0a3fd7106c6"),
    partnerId: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c3"),
    name: "lpickering6",
    description: "Injury of unspecified nerves of neck",
    price: 412,
    position: {
        type: "Point",
        coordinates: [
            4.568749743547676,
            46.0841182620497
        ]
    },
    range: 10,
    availability: false,
    status: "pending",
  },
  {
    _id: new ObjectId("65b8d148fc13ae7a51234953"),
    categoryId: new ObjectId("65a9a3912f10d0a3fd7106c4"),
    partnerId: new ObjectId("60b5c5b4c7a3c0b4e4f0f824"),
    name: "bbails7",
    description: "Chronic multifocal osteomyelitis, left femur",
    price: 87,
    position: {
        type: "Point",
        coordinates: [
            4.568749743547676,
            46.0841182620497
        ]
    },
    range: 5,
    availability: true,
    status: "accepted",
  },
  {
    _id: new ObjectId("65b8d148fc13ae7a51234954"),
    categoryId: new ObjectId("65a9a3912f10d0a3fd7106c5"),
    partnerId: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c1"),
    name: "kayer8",
    description:
      "Asphyxiation due to plastic bag, intentional self-harm, subsequent encounter",
    price: 680,
    position: {
        type: "Point",
        coordinates: [
            6.568749743547676,
            46.0841182620497
        ]
    },
    range: 1,
    availability: false,
    status: "pending",
  },
  {
    _id: new ObjectId("65b8d148fc13ae7a51234955"),
    categoryId: new ObjectId("65a9a3912f10d0a3fd7106cb"),
    partnerId: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c5"),
    name: "tdiruggero9",
    description: "Thyrotoxicosis factitia without thyrotoxic crisis or storm",
    price: 609,
    position: {
        type: "Point",
        coordinates: [
            5.568749743547676,
            46.0841182620497
        ]
    },
    range: 4,
    availability: true,
    status: "rejected",
  },
];


export default SERVICES_DATA;