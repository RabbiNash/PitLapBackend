import mongoose, { Document, Schema } from "mongoose";

interface IRace extends Document {
    year: number;
    round: number;
    key: string;
    results: IRaceResult[];
}

interface IRaceResult extends Document {
    position: number;
    classifiedPosition: String;
    headshotURL: string;
    points: number;
    gridPosition: number;
    fullName: string;
    teamName: string;
}

const RaceResultSchema = new Schema<IRace>({
    year: Number,
    round: Number,
    key: String,
    results: [{
            position: { type: Number, required: true },
            classifiedPosition: { type: String, required: true },
            headshotURL: { type: String, required: true },
            points: { type: Number, required: true },
            gridPosition: { type: Number, required: true },
            fullName: { type: String, required: true },
            teamName: { type: String, required: true },
        }],
}, { collection: "race_results"} );

export const RaceResultModel = mongoose.model<IRace>("RaceResult", RaceResultSchema);

export const getRaceResult = (key: String) => {
    return RaceResultModel.findOne({
        key: key
    }).sort({ position: 1 });
}
