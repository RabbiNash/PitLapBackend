import mongoose, { Document, Schema } from "mongoose";

interface IDriverStanding extends Document {
    driverNumber: number;
    constructorName: string;
    driverId: string;
    familyName: string;
    givenName: string;
    points: number;
    position: number;
    positionText: string;
    wins: number;
}

const DriverStandingSchema = new Schema<IDriverStanding>({
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

export const DriverStandingModel = mongoose.model<IDriverStanding>("DriverStanding", DriverStandingSchema);

export const getStandings = () => DriverStandingModel.find().sort({ position: 1 });
