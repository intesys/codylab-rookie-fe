import BreadcrumbEl from "@components/breadcrumb/BreadcrumbEl";
import Breadcrumb from "@components/breadcrumb/breadcrumb";
import { DOCTORS_PATH } from "@config/paths";
import { getPath } from "@lib/utils";
import { Link } from "react-router-dom";

const DoctorEdit: React.FC = () => {
  /**/
  return (
    <Breadcrumb>
      <BreadcrumbEl>
        <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
      </BreadcrumbEl>
      <BreadcrumbEl active>Edit</BreadcrumbEl>
    </Breadcrumb>
  );
};
export default DoctorEdit;
