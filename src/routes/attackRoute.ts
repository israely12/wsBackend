import { Router } from "express";
import { addAttack } from "../controllers/attackController";
import { getAttacksByDestination , getAttacksByLocation} from "../controllers/attackController";

const attackRouter = Router();

attackRouter.get("/destination/:destination",getAttacksByDestination);
attackRouter.get("/location/:location",getAttacksByLocation);
attackRouter.post("/add",addAttack);


export default attackRouter