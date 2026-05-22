import diningHall from "@/assets/gallery/dining-hall.jpg";
import room2 from "@/assets/gallery/room-2.jpg";
import bedroomPink from "@/assets/gallery/bedroom-pink.jpg";
import lounge from "@/assets/gallery/lounge.jpg";
import bedroomFloral from "@/assets/gallery/bedroom-floral.jpg";
import buildingExterior from "@/assets/gallery/building-exterior.jpg";
import roomExtra1 from "@/assets/gallery/room-extra-1.jpg";
import twinRoom from "@/assets/gallery/twin-room.jpg";
import twinRoom2 from "@/assets/gallery/twin-room-2.jpg";
import roomExtra2 from "@/assets/gallery/room-extra-2.jpg";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export const galleryImages: GalleryImage[] = [
  { src: buildingExterior, alt: "Happy Living hostel building exterior in Roop Nagar, Delhi", caption: "Our Building" },
  { src: lounge, alt: "Common lounge area with sofas at Happy Living girls PG", caption: "Common Lounge" },
  { src: diningHall, alt: "Spacious dining hall with TV at Happy Living", caption: "Dining Hall" },
  { src: twinRoom, alt: "Twin sharing bedroom with wardrobes and AC", caption: "Twin Sharing Room" },
  { src: twinRoom2, alt: "Spacious twin sharing room with marble flooring", caption: "Twin Room" },
  { src: bedroomFloral, alt: "Bright bedroom with floral bedding and AC", caption: "Private Room" },
  { src: bedroomPink, alt: "Cozy bedroom with floral pink bedding", caption: "Cozy Bedroom" },
  { src: roomExtra1, alt: "Furnished room with wardrobe and study space", caption: "Furnished Room" },
  { src: roomExtra2, alt: "Well-lit room with study desk and storage", caption: "Study-Ready Room" },
  { src: room2, alt: "Comfortable shared room at Happy Living", caption: "Shared Room" },
];
