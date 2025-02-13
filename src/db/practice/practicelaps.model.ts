import mongoose, { Document, Schema } from "mongoose"

interface IPracticeSession extends Document {
    year: number;
    round: number;
    sessionName: string;
    eventFormat: string;
    laps: IPracticeLap[];
}

interface IPracticeLap {
    driver: string;
    headshotUrl: string;
    compound: string;
    lapTime: string;
    lapNumber: number;
    isPersonalBest: boolean;
    fullName: string;
}

const PracticeLapSchema = new Schema<IPracticeSession>({
    year: { type: Number, required: true },
    round: { type: Number, required: true },
    sessionName: { type: String, required: true },
    eventFormat: { type: String, required: true },
    laps: [{
        driver: { type: String, required: true },
        headshotUrl: { type: String, required: true },
        compound: { type: String, required: true },
        lapTime: { type: String, required: true },
        lapNumber: { type: Number, required: true },
        isPersonalBest: { type: Boolean, required: true },
        fullName: { type: String, required: true },
    }]
}, { collection: "practice_laps" });

export const PracticeSessionModel = mongoose.model<IPracticeSession>("PracticeLap", PracticeLapSchema);

export const getPracticeLaps = () => PracticeSessionModel.find();

export const getPracticeLapsByKey = (key: string) => {
    return PracticeSessionModel.findOne({ key });
}

export const getPracticeLapsByEventName = (eventName: string) => {
    return PracticeSessionModel.findOne({ eventName });
}

export const getPracticeLapsByEventNameAndKey = (eventName: string, key: string) => {
    return PracticeSessionModel.findOne({ eventName, key });
}

export const getPracticeLapsByYearRoundAndEventName = (year: number, round: number, sessionName: string) => {
    return PracticeSessionModel.findOne({ year, round, sessionName });
}
