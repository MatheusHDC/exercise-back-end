import IAgenda from "./interfaces/IAgenda";
import IFutebol from "./interfaces/IFutebol";

// src/Quadra.ts
abstract class Quadra {
  protected abstract reservar<T>(dia: Date): IAgenda<T>;
}

export default Quadra;