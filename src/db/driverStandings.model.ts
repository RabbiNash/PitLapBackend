import mongoose from "mongoose";

const DriverStandingSchema = new mongoose.Schema({
    driverNumber: { type: Number, required: true },
    constructorName: { type: String, required: true },
    driverId: { type: String, required: true },
    familyName: { type: String, required: true },
    givenName: { type: String, required: true },
    points: { type: Number, required: true },
    position: { type: Number, required: true },
    positionText: { type: String, required: true },
    wins: { type: Number, required: true },
}, { collection: "driver_standings" });

export const StandingModel = mongoose.model("DriverStanding", DriverStandingSchema);
export const getStandings = () => StandingModel.find();
