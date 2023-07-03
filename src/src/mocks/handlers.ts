import { rest } from "msw";
import { appointments } from "./fixtures/appointments";
import { materials } from "./fixtures/materials";

export const handlers = [
  rest.get("/msw/appointmentsByDate", (req, res, ctx) => res(ctx.json(appointments))),

  rest.get("/msw/materials", (req, res, ctx) => res(ctx.json(materials))),
];
