import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({unique: true})
    Email: string;

    @Prop({unique: true})
    Username: string;

    @Prop({required: true})
    Password: string;
    
    @Prop()
    AccessToken: string;

    @Prop()
    RefreshToken: string;

    @Prop()
    ResetToken: string;

    @Prop({ enum: ['Student', 'Teacher', 'Admin'], default: 'Student' })
    Role: string;


}
export const UserSchema = SchemaFactory.createForClass(User);
