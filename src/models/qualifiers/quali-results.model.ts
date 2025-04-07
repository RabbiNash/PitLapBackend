import mongoose, { Document, Schema } from "mongoose";

interface IQualiResult extends Document {
    key: string;
    eventName: string;
    results: IQualiResultItem[];
}

interface IQualiResultItem {
    teamName: string;
    headshotUrl: string;
    q1: string;
    q2: string;
    q3: string;
    position: number;
    fullName: string;
}

const QualiResultSchema = new Schema<IQualiResult>({
    key: { type: String, required: true },
    eventName: { type: String, required: true },
    results: [{
        teamName: { type: String, required: true },
        headshotUrl: { type: String, required: true },
        q1: { type: String, required: false },
        q2: { type: String, required: false },
        q3: { type: String, required: false },
        position: { type: Number, required: true },
        fullName: { type: String, required: true },
    }]
}, { collection: "quali_results" });


export const QualiResultModel = mongoose.model<IQualiResult>("QualiResult", QualiResultSchema);

export const getQualiResults = () => QualiResultModel.find();

export const getQualiResultsByKey = (key: string) => {
    return QualiResultModel.findOne({ key });
}