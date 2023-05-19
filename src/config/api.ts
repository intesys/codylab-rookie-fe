import axios from "axios";
import { Configuration, DoctorOpenHospitalApi, PatientOpenHospitalApi } from "../generated/axios";

/**
 * Api endpoint
 */

// Service worker basepath API
export const basePathSW = `${window.location.protocol}//${window.location.host}`;

/**
 * Axis setup
 */

axios.defaults.withCredentials = false;

// API always served by ENV configuration
const configuration = new Configuration({ basePath: `${process.env.API_PATH}` });

function bindMethods<T extends object>(klass: T): T {
  Object.getOwnPropertyNames(klass.constructor.prototype).forEach((method) => {
    if (method !== "constructor") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      klass[method] = klass[method].bind(klass);
    }
  });
  return klass;
}

export const api = {
  doctors: bindMethods(new DoctorOpenHospitalApi(configuration)),
  patients: bindMethods(new PatientOpenHospitalApi(configuration)),
};
