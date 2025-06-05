import MaterialItem from "@components/Home/Materials/MaterialItem";
import { IMaterialItem } from "@components/Home/Materials/Types";
import { MaterialContext } from "@context/MaterialProvider";
import { Tab, Tabs } from "@mui/material";
import React, { useContext, useState } from "react";

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
        variant="fullWidth"
        onChange={handleChange}
        data-cy="material-tabs"
      >
        <Tab label="Running out drugs" data-cy="drugs-tab" />
        <Tab label="Running out nursing material" data-cy="nursing-tab" />
      </Tabs>

      <div data-cy="material-items-list">
        {list.map((item) => (
          <MaterialItem {...item} key={item.id} />
        ))}
      </div>

      <Tab className="drug_list__see_all_button" label="See all materials"></Tab>
    </React.Fragment>
  );
};

export default MaterialList;
