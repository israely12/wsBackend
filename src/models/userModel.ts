import mongoose, { Schema , Document} from "mongoose";
import bcrypt from "bcrypt";
export interface IUser extends Document {
    _id: string;
    username: string;
    password: string;
    organization?: 'IDF' | 'Hezbollah' | 'Hamas' | 'IRGC' | 'Houthis';
    location?: 'IDF - North' | 'IDF - South' | 'IDF - Center' | 'IDF - West Bank' ; 
    comparePassword(userPassword: string): Promise<boolean>;

}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    organization: {
        type: String,
        
    },
    location: {
        type: String,
        required: false
    }
});
    
UserSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  UserSchema.methods.comparePassword = async function (
    userPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(userPassword, this.password);
  };


export default mongoose.model<IUser>("users", UserSchema);