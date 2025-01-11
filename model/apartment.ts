interface ApartmentImage {
  apartmentImageID: string;
  imageUrl: string;
  description: string;
}

interface VRImage {
  vrExperienceID: string;
  videoUrl: string;
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
  direction: string;
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
  vrVideoUrls: VRImage[];
  assignedAccount: string;
}
