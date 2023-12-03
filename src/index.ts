import Clube from "./Clube";
import QuadraFutebol from "./QuadraFutebol";
import QuadraTenis from "./QuadraTenis";

const gin = new Clube();
const futGin = new QuadraFutebol();
const tenisGIn = new QuadraTenis();

gin.adicionarQuadra(futGin);
gin.adicionarQuadra(tenisGIn)

const futReserva = futGin.reservar(new Date('2024-02-06'));
const tenisReserva = tenisGIn.reservar(new Date('2024-02-06 12:00'));

console.log(futReserva);
console.log(tenisReserva);
