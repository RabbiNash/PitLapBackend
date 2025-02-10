import mongoose from "mongoose";

const ConstructorStandingSchema = new mongoose.Schema({
    position: { type: Number, required: true },
    positionText: { type: String, required: true },
    points: { type: Number, required: true },
    wins: { type: Number, required: true },
    constructorId: { type: String, required: true },
    constructorName: { type: String, required: true },
}, { collection: "constructor_standings" });

export const ConstructorStandingModel = mongoose.model("ConstructorStanding", ConstructorStandingSchema);
export const getStandings = () =>  ConstructorStandingModel.find();

