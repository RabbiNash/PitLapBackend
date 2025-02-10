import mongoose, { Document, Schema } from "mongoose";

interface IConstructorStanding extends Document {
    position: number;
    positionText: string;
    points: number;
    wins: number;
    constructorId: string;
    constructorName: string;
}

const ConstructorStandingSchema = new Schema<IConstructorStanding>({
    position: { type: Number, required: true },
    positionText: { type: String, required: true },
    points: { type: Number, required: true },
    wins: { type: Number, required: true },
    constructorId: { type: String, required: true },
    constructorName: { type: String, required: true },
}, { collection: "constructor_standings" });

export const ConstructorStandingModel = mongoose.model<IConstructorStanding>("ConstructorStanding", ConstructorStandingSchema);

export const getStandings = () => ConstructorStandingModel.find();
