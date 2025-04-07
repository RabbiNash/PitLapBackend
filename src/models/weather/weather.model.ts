import mongoose, { Document, Schema, Model } from "mongoose";

export interface IWeatherBase {
    round: number;
    session: string;
    year: number;
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    summary: string;
    precipitation?: number;
    aiSummary?: string;
}

export interface IWeatherDocument extends IWeatherBase, Document {}

interface IWeatherModel extends Model<IWeatherDocument> {}

const WeatherSchema = new Schema<IWeatherDocument, IWeatherModel>({
    round: { type: Number, required: true },
    session: { type: String, required: true },
    year: { type: Number, required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    windSpeed: { type: Number, required: true },
    condition: { type: String, required: true },
    summary: { type: String, required: true },
    precipitation: { type: Number, required: false },
    aiSummary: { type: String, required: false }
}, { collection: "weather" });

export const WeatherModel = mongoose.model<IWeatherDocument, IWeatherModel>("Weather", WeatherSchema);

export const getWeather = () => WeatherModel.find();

export const getWeatherByYearAndRound = (year: number, round: number) => {
    return WeatherModel.findOne({ year, round });
}

export const upsertWeather = (weather: IWeatherBase) => {
    return WeatherModel.updateOne(
        { year: weather.year, round: weather.round },
        { $set: weather },
        { upsert: true }
    );
}
