import mongoose, { Document, Schema } from "mongoose"

export interface ICircuit extends Document {
    circuitId: string;
    url: string;
    name: string;
    eventName: string;
    location: {
        lat: string;
        lng: string;
        locality: string;
        country: string;
    };
}
const CircuitSchema = new Schema<ICircuit>({
    circuitId: { type: String, required: true },
    url: { type: String, required: true },
    name: { type: String, required: true },
    eventName: { type: String, required: true },
    location: {
        lat: { type: String, required: true },
        lng: { type: String, required: true },
        locality: { type: String, required: true },
        country: { type: String, required: true },
    },
}, { collection: "circuits" });

export const CircuitModel = mongoose.model<ICircuit>("Circuit", CircuitSchema);

export const getCircuits = () => CircuitModel.find();

export const getCircuitById = (circuitId: string) => {
    return CircuitModel.findOne({ circuitId });
}

export const getCircuitByName = (circuitName: string) => {
    return CircuitModel.findOne({ eventName: circuitName });
}
export const getCircuitByLocation = (locality: string, country: string) => {
    return CircuitModel.findOne({ "Location.locality": locality, "Location.country": country });
}
