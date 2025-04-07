import mongoose, { Document, Schema } from "mongoose";

interface IRaceResult {
    position: number;
    driver: string;
    headshotUrl: string;
    points: number;
    status: string;
    gridPosition: number;
    teamColor: string;
    broadcastName: string;
    fullName: string;
}

interface IRaceWeekend extends Document {
    round: number;
    country: string;
    officialEventName: string;
    eventName: string;
    eventFormat: string;
    year: string;
    session1: string;
    session1DateUtc: string;
    session2: string;
    session2DateUtc: string;
    session3: string;
    session3DateUtc: string;
    session4: string;
    session4DateUtc: string;
    session5: string;
    session5DateUtc: string;
    latitude: number;
    longitude: number;
    results: IRaceResult[];
}

const RaceResultSchema = new Schema<IRaceResult>({
    position: { type: Number, required: true },
    driver: { type: String, required: true },
    headshotUrl: { type: String, required: true },
    points: { type: Number, required: true },
    status: { type: String, required: true },
    gridPosition: { type: Number, required: true },
    teamColor: { type: String, required: true },
    broadcastName: { type: String, required: true },
    fullName: { type: String, required: true },
});

const RaceWeekendSchema = new Schema<IRaceWeekend>({
    round: { type: Number, required: true },
    country: { type: String, required: true },
    officialEventName: { type: String, required: true },
    eventName: { type: String, required: true },
    eventFormat: { type: String, required: true },
    year: { type: String, required: true, index: true },
    session1: { type: String, required: false },
    session1DateUtc: { type: String, required: false },
    session2: { type: String, required: false },
    session2DateUtc: { type: String, required: false },
    session3: { type: String, required: false },
    session3DateUtc: { type: String, required: false },
    session4: { type: String, required: false },
    session4DateUtc: { type: String, required: false },
    session5: { type: String, required: false },
    session5DateUtc: { type: String, required: false },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
    results: { type: [RaceResultSchema], required: false },
}, { collection: "schedule" });

export const RaceWeekendModel = mongoose.model<IRaceWeekend>("RaceWeekend", RaceWeekendSchema);

export const getScheduleByYear = async (year: string) => {
    return RaceWeekendModel.find({ year }).exec();
};

export const getSchedule = async () => {
    return RaceWeekendModel.find().exec();
};

export const getScheduleByYearAndRound = async (year: string, round: number) => {
    return RaceWeekendModel.findOne({ year, round }).exec();
};
