import { PatientDTO } from "../../generated/axios";

export const PatientListProva: PatientDTO[] = [
  {
    id: 1,
    opd: 12345,
    idp: 67890,
    name: "John",
    surname: "Doe",
    phoneNumber: 1234567890,
    address: "123 Main Street",
    email: "john.doe@example.com",
    avatar: "https://example.com/avatar.jpg",
    bloodGroup: "A_PLUS",
    notes: "Lorem ipsum dolor sit amet.",
    chronicPatient: false,
    lastAdmission: "2023-06-15",
    lastDoctorVisitedId: 1,
    patientRecords: [
      // Array di record del paziente
      // ...
    ],
    doctorIds: [1, 2, 3],
  },
  {
    id: 2,
    opd: 54321,
    idp: 98765,
    name: "Jane",
    surname: "Smith",
    phoneNumber: 9876543210,
    address: "456 Oak Street",
    email: "jane.smith@example.com",
    avatar: "https://example.com/avatar.jpg",
    bloodGroup: "A_PLUS",
    notes: "Lorem ipsum dolor sit amet.",
    chronicPatient: true,
    lastAdmission: "2023-06-20",
    lastDoctorVisitedId: 2,
    patientRecords: [],
    doctorIds: [2, 3, 4],
  },
  {
    id: 3,
    opd: 67890,
    idp: 54321,
    name: "Michael",
    surname: "Johnson",
    phoneNumber: 5555555555,
    address: "789 Elm Street",
    email: "michael.johnson@example.com",
    avatar: "https://example.com/avatar.jpg",
    bloodGroup: "A_PLUS",
    notes: "Lorem ipsum dolor sit amet.",
    chronicPatient: false,
    lastAdmission: "2023-06-25",
    lastDoctorVisitedId: 3,
    patientRecords: [
      // Array di record del paziente
      // ...
    ],
    doctorIds: [1, 3],
  },
  {
    id: 4,
    opd: 13579,
    idp: 24680,
    name: "Emily",
    surname: "Davis",
    phoneNumber: 9998887777,
    address: "987 Maple Street",
    email: "emily.davis@example.com",
    avatar: "https://example.com/avatar.jpg",
    bloodGroup: "A_PLUS",
    notes: "Lorem ipsum dolor sit amet.",
    chronicPatient: true,
    lastAdmission: "2023-06-30",
    lastDoctorVisitedId: 4,
    patientRecords: [
      // Array di record del paziente
      // ...
    ],
    doctorIds: [2, 4],
  },
  {
    id: 5,
    opd: 24680,
    idp: 13579,
    name: "Sophia",
    surname: "Wilson",
    phoneNumber: 7776665555,
    address: "321 Pine Street",
    email: "sophia.wilson@example.com",
    avatar: "https://example.com/avatar.jpg",
    bloodGroup: "A_PLUS",
    notes: "Lorem ipsum dolor sit amet.",
    chronicPatient: false,
    lastAdmission: "2023-07-05",
    lastDoctorVisitedId: 1,
    patientRecords: [
      // Array di record del paziente
      // ...
    ],
    doctorIds: [3, 4],
  },
  {
    id: 6,
    opd: 98765,
    idp: 43210,
    name: "David",
    surname: "Johnson",
    phoneNumber: 1234567890,
    address: "789 Elm Street",
    email: "david.johnson@example.com",
    avatar: "https://example.com/avatar.jpg",
    bloodGroup: "B_PLUS",
    notes: "Lorem ipsum dolor sit amet.",
    chronicPatient: true,
    lastAdmission: "2023-07-10",
    lastDoctorVisitedId: 2,
    patientRecords: [
      // Array of patient records
      // ...
    ],
    doctorIds: [1, 2, 4],
  },
  {
    id: 7,
    opd: 56789,
    idp: 54321,
    name: "Emma",
    surname: "Brown",
    phoneNumber: 9876543210,
    address: "456 Oak Street",
    email: "emma.brown@example.com",
    avatar: "https://example.com/avatar.jpg",
    bloodGroup: "AB_PLUS",
    notes: "Lorem ipsum dolor sit amet.",
    chronicPatient: false,
    lastAdmission: "2023-07-15",
    lastDoctorVisitedId: 3,
    patientRecords: [
      // Array of patient records
      // ...
    ],
    doctorIds: [2, 3, 4],
  },
  {
    id: 8,
    opd: 87654,
    idp: 67890,
    name: "Olivia",
    surname: "Lee",
    phoneNumber: 5555555555,
    address: "123 Main Street",
    email: "olivia.lee@example.com",
    avatar: "https://example.com/avatar.jpg",
    bloodGroup: "AB_PLUS",
    notes: "Lorem ipsum dolor sit amet.",
    chronicPatient: true,
    lastAdmission: "2023-07-20",
    lastDoctorVisitedId: 1,
    patientRecords: [
      // Array of patient records
      // ...
    ],
    doctorIds: [1, 4],
  },
];
