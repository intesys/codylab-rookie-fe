import { DoctorDTO } from "../../generated/axios";

export const DoctorsListaProva: DoctorDTO[] = [
  {
    id: 5,
    name: "Dr. Michael",
    surname: "Johnson",
    phoneNumber: "5555555555",
    address: "789 Elm Street",
    email: "michael.johnson@example.com",
    avatar: "https://example.com/avatar.jpg",
    profession: "Cardiologist",
    latestPatients: [],
  },
  {
    id: 6,
    name: "Dr. Sarah",
    surname: "Davis",
    phoneNumber: "9876543210",
    address: "456 Oak Street",
    email: "sarah.davis@example.com",
    avatar: "https://example.com/avatar.jpg",
    profession: "Dermatologist",
    latestPatients: [],
  },
  {
    id: 7,
    name: "Dr. Emily",
    surname: "Wilson",
    phoneNumber: "5555555555",
    address: "321 Pine Street",
    email: "emily.wilson@example.com",
    avatar: "https://example.com/avatar.jpg",
    profession: "Pediatrician",
    latestPatients: [],
  },
];
