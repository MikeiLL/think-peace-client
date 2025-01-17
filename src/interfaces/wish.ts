interface BaseSchema {
  name: string;
  country: string;
  position: {lat: number; lng: number};
  fullAdress: string;
}

export interface WishSchema {
  from: BaseSchema;
  to: BaseSchema;
  message: string;
  date: Date;
  hashTag: string;
  createdAt: Date;
  _id: string;
}
