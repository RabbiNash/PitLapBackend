import { Mode } from "fs";
import mongoose, { Document , Schema, Model } from "mongoose";
import { title } from "process";

interface IYoutubeThumbnail {
    url: string;
    width: number;
    height: number;
}

export interface IYoutubeVideo {
    publishedAt: string;
    channelId: string;
    channelTitle: string;
    title: string;
    description: string;
    thumbnails: {
        default: IYoutubeThumbnail;
        medium: IYoutubeThumbnail;
        high: IYoutubeThumbnail;
        standard: IYoutubeThumbnail;
        maxres: IYoutubeThumbnail;
    };
    playlistId: string;
    position: number;
    resourceId: {
        kind: string;
        videoId: string;
    };
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
    updatedAt: string
}

export interface IYoutubeChannel {
    channelId: String,
    channelTitle: String
    uploads: String
}

export interface IYoutubeChannelDocument extends IYoutubeChannel, Document {}
export interface IYoutubeDocument extends IYoutubeVideo, Document {}

interface IYoutubeChannelModel extends Model<IYoutubeChannel> {}
interface IYoutubeModel extends Model<IYoutubeDocument> {}

const YoutubeSchema = new Schema<IYoutubeDocument, IYoutubeModel>({
    publishedAt: { type: String, required: true },
    channelId: { type: String, required: true },
    channelTitle: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnails: {
        default: { type: Object, required: true },
        medium: { type: Object, required: true },
        high: { type: Object, required: true },
        standard: { type: Object, required: true },
        maxres: { type: Object, required: true },
    },
    playlistId: { type: String, required: true },
    position: { type: Number, required: true },
    resourceId: {
        kind: { type: String, required: true },
        videoId: { type: String, required: true },
    },
    videoOwnerChannelTitle: { type: String, required: true },
    videoOwnerChannelId: { type: String, required: true },
    updatedAt: { type: String, required: false}
}, { collection: "youtube_vidoes" });

const YoutubeChannelSchema = new Schema<IYoutubeChannelDocument, IYoutubeChannelModel> ({
    channelId: { type: String, required: true},
    channelTitle: { type: String, required: true },
    uploads: { type: String, required: true }
}, { collection: "youtube_upload_ids"})

export const YoutubeModel = mongoose.model<IYoutubeDocument, IYoutubeModel>("Youtube", YoutubeSchema);
export const YoutubeChannelModel = mongoose.model<IYoutubeChannelDocument, IYoutubeChannelModel>("YoutubeChannel", YoutubeChannelSchema)

export const getVideos = () => YoutubeModel.find();
export const getVideoById = (videoId: String) => {
    return YoutubeModel
        .find({"resourceId.videoId": videoId})
}
export const getVideosByChannelId = (channelId: string) => {
    return YoutubeModel
        .find({ channelId })
        .sort({ publishedAt: -1 })
        .limit(1)
        .exec();
}

export const getVideosByChannelTitle = (channelTitle: string) => {
    return YoutubeModel.find({ channelTitle })
        .collation({ locale: 'en', strength: 2 })
        .exec();
}

export const upsertVideos = (videos: IYoutubeVideo[]) => {
    const bulkOps = videos.map(video => ({
      updateOne: {
        filter: { "resourceId.videoId": video.resourceId.videoId },
        update: {
          $set: { ...video, updatedAt: new Date().toISOString() },
          $setOnInsert: { createdAt: new Date().toISOString() }
        },
        upsert: true,
        timestamps: false
      }
    }));
  
    return YoutubeModel.bulkWrite(bulkOps);
  }
  

export const getYoutubeChannels = () => YoutubeChannelModel.find()
export const getYoutubeChannelByTitle = (channelTitle: string) => {
    return YoutubeChannelModel.find({
        channelTitle
    }).limit(1)
}