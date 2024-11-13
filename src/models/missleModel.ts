import mongoose,{ Schema , Document} from "mongoose";

export interface IMissle extends Document {
        name: string;
        description: string;
        speed: number;
        intercepts: string[];
        price: number;
    }

const MissleSchema = new Schema<IMissle>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    speed: { type: Number, required: true },
    intercepts: { type: [String], required: true },
    price: { type: Number, required: true },
});

export default mongoose.model<IMissle>("missles", MissleSchema);

