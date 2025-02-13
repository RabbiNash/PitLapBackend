import mongoose, { Document, Schema } from 'mongoose';

interface IRaceSummary extends Document {
    key: string;
    round: number;
    name: string;
    year: number;
    summary: string;
}

const RaceSummarySchema = new Schema<IRaceSummary>({
    key: { type: String, required: true, index: true },
    round: { type: Number, required: true },
    name: { type: String, required: true },
    year: { type: Number, required: true },
    summary: { type: String, required: true },
}, { collection: "race_summaries" });

export const RaceSummaryModel = mongoose.model<IRaceSummary>("RaceSummary", RaceSummarySchema);
export const getRaceSummary = (key: string) => { 
    return RaceSummaryModel.findOne({ key }); 
}
