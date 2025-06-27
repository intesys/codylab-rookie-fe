// components/DoctorCard.tsx
import React from "react";

interface DoctorCardProps {
  name: string;
  specialization: string;
  rating: number;
  onClick: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ name, specialization, rating, onClick }) => {
  return (
    <div className="doctor-card" onClick={onClick}>
      <h3>{name}</h3>
      <p>Specializzazione: {specialization}</p>
      <p>Valutazione: ⭐ {rating}/5</p>
    </div>
  );
};

export default DoctorCard;
