import mongoose,{Schema , Document} from "mongoose";

export interface IOrganization extends Document{
    name: string;
    resources: string[];
    budget: number;
}

const OrganizationSchema = new Schema<IOrganization>({
    name: { type: String, required: true },
    resources: { type: [String], required: true },
    budget: { type: Number, required: true },
});     

export default mongoose.model<IOrganization>("organizations", OrganizationSchema);
