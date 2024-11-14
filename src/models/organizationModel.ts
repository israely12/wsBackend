import mongoose,{Schema , Document} from "mongoose";
 export interface Resource {
     name: string;
     amount: number
 }

const ResourceSchema = new Schema<Resource>({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
})
export interface IOrganization extends Document{
    name: string;
    resources: Resource[];
    budget: number;
}

const OrganizationSchema = new Schema<IOrganization>({
    name: { type: String, required: true },
    resources: { type: [ResourceSchema], required: true },
    budget: { type: Number, required: true },
});     

export default mongoose.model<IOrganization>("organizations", OrganizationSchema);
