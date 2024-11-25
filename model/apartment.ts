interface ApartmentImage {
  apartmentImageID: string;
  imageUrl: string;
  description: string;
}

interface Apartment {
  apartmentID: string;
  apartmentName: string;
  apartmentCode: string;
  description: string;
  address: string;
  area: number;
  numberOfRooms: number;
  numberOfBathrooms: number;
  location: string;
  direction: number;
  pricePerSquareMeter: number;
  price: number;
  expiryDate: string;
  apartmentStatus: string;
  apartmentType: string;
  balconyDirection: string;
  building: string;
  floor: string;
  roomNumber: string;
  projectApartmentName: string;
  images: ApartmentImage[];
  userLiked: boolean;
  vrVideoUrl: string;
  assignedAccount: string;
}
