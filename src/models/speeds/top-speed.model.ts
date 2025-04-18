import mongoose, { Document, Schema } from "mongoose"

interface IEventTopSpeeds extends Document {
    year: number;
    round: number;
    sessionName: string;
    eventFormat: string;
    speeds: ITopSpeed[];
}

interface ITopSpeed {
    driver: string;
    topSpeed: number;
}

const EventTopSpeedSchema = new Schema<IEventTopSpeeds>({
    year: { type: Number, required: true },
    round: { type: Number, required: true },
    sessionName: { type: String, required: true },
    eventFormat: { type: String, required: true },
    speeds: [{
        driver: { type: String, required: true },
        topSpeed: { type: Number, required: true },       
    }]
}, { collection: "top_speeds" });

export const EventTopSpeedModel = mongoose.model<IEventTopSpeeds>("TopSpeeds", EventTopSpeedSchema);

export const getTopSpeeds = () => EventTopSpeedModel.find();

export const getTopSpeedsByYearRoundAndEventName = (year: number, round: number, sessionName: string) => {
    return EventTopSpeedModel.findOne({ year, round, sessionName });
}
