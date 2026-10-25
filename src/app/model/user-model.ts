// models/user.ts
import { AtributosNivel } from "./atributos-model"
import { AtributosXp } from "./atributos-model"

export interface User {
  auth0Id: string,
  name: string | null,
  level: number,
  atributos: AtributosNivel,
  atributosXp: AtributosXp,
  createdAt: string,
  updatedAt: string,
  version: number
}
