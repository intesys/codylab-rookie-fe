import { appointments } from "@mocks/fixtures/appointments";
import { materials } from "@mocks/fixtures/materials";
import { rest } from "msw";

export const handlers = [
  rest.get("/msw/appointmentsByDate", (req, res, ctx) => res(ctx.json(appointments))),

  rest.get("/msw/materials", (req, res, ctx) => res(ctx.json(materials))),
];
