import mongoose, { Document, Schema } from 'mongoose';

interface ITheoreticalDriverStanding extends Document {
    position: number;
    name: string;
    current_points: number;
    theoretical_max_points: number;
    can_win: string;
}

const TheoreticalDriverStandingSchema = new Schema<ITheoreticalDriverStanding>({
    position: { type: Number, required: true },
    name: { type: String, required: true },
    current_points: { type: Number, required: true },
    theoretical_max_points: { type: Number, required: true },
    can_win: { type: String, required: true },
}, { collection: "driver_theoretical_standings" });

export const TheoreticalDriverStandingModel = mongoose.model<ITheoreticalDriverStanding>("TheoreticalDriverStanding", TheoreticalDriverStandingSchema);

export const getTheoreticalDriverStandings = () => TheoreticalDriverStandingModel.find();
