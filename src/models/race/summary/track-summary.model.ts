import mongoose, { Document, Schema } from 'mongoose';

interface ITrackSummary extends Document {
    track: string;
    fact: string;
    location: string;
    circuitLengthKm: number;
    firstRace: number;
}

const TrackSummarySchema = new Schema<ITrackSummary>({
    track: { type: String, required: true, index: true },
    fact: { type: String, required: true },
    location: { type: String, required: true },
    circuitLengthKm: { type: Number, required: true },
    firstRace: { type: Number, required: true },
}, { collection: "track_summaries" });  

export const TrackSummaryModel = mongoose.model<ITrackSummary>("TrackSummary", TrackSummarySchema);

export const getTrackSummary = (track: string) => {
    return TrackSummaryModel.findOne({ track });
}
