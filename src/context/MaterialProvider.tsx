import { IMaterialList } from "@components/Home/Materials/Types";
import { basePathSW } from "@config/api";
import React, { useEffect, useState } from "react";

const apiEndpoint = `${basePathSW}/materials`;

export const MaterialContext = React.createContext({
  drugs: [],
  nursing: [],
} as IMaterialList);

export const getMaterials = (): Promise<IMaterialList> => fetch(apiEndpoint).then((r) => r.json());

export const MaterialProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [materials, setMaterials] = useState({
    drugs: [],
    nursing: [],
  } as IMaterialList);

  useEffect(() => {
    getMaterials().then((materials) => setMaterials(materials));
  }, []);

  return <MaterialContext.Provider value={{ ...materials }}>{children}</MaterialContext.Provider>;
};
