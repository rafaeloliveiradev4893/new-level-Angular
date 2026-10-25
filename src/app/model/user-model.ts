// models/user.ts
import { Atributos } from "./atributos-model"
import { AtributosXp } from "./atributos-model"

export interface User {
  auth0Id: string,
  name: string | null,
  level: number,
  atributos: Atributos,
  atributosXp: AtributosXp,
  createdAt: string,
  updatedAt: string,
  version: number
}
