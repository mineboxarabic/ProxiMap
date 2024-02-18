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

export interface Position 
{
    lat: GLfloat;
    lng: GLfloat;
}