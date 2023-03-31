import { Tab, Tabs } from "@mui/material";
import React, { useContext, useState } from "react";
import { MaterialContext } from "../../../lib/MaterialProvider";
import MaterialItem from "./MaterialItem";
import { IMaterialItem } from "./Types";

const MaterialList: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const listMap = ["drugs", "nursing"];

  const activeList = listMap[activeTab];

  const materials = useContext(MaterialContext);

  const list: IMaterialItem[] = materials[activeList];

  return (
    <React.Fragment>
      <Tabs
        className="drug_list__header"
        value={activeTab}
        onChange={handleChange}
      >
        <Tab label="Running out drugs" />
        <Tab label="Running out nursing material" />
      </Tabs>

      {list.map((item) => (
        <MaterialItem {...item} key={item.id} />
      ))}

      <Tab
        className="drug_list__see_all_button"
        label="See all materials"
      ></Tab>
    </React.Fragment>
  );
};

export default MaterialList;
