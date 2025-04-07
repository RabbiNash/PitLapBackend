import mongoose, { Document, Schema } from 'mongoose';

export interface IRaceSummary {
    key: string;
    round: number;
    name: string;
    year: number;
    summary: string;
}

export interface IRaceSummaryDocument extends Document, IRaceSummary {}

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

export const upsertRaceSummary = (summary: IRaceSummary) => {
    return RaceSummaryModel.updateOne(
        { year: summary.year, round: summary.round },
        { $set: summary },
        { upsert: true }
    );
}
