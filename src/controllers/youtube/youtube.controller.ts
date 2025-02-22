import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import moment from 'moment';
import {
  getYoutubeChannelByTitle,
  getVideosByChannelTitle,
  upsertVideos,
  IYoutubeVideo
} from '../../db/youtube/youtube.model';

dotenv.config();

const API_KEY = process.env.YT_DATA_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3/playlistItems";
const DEFAULT_MAX_RESULTS = 20;

interface IYoutubeApiResponse {
  kind: string;
  etag: string;
  items: Array<{
    snippet: IYoutubeVideo;
  }>;
}

export const fetchYoutubeVideos = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { channelTitle } = req.params;
    
    if (!channelTitle) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameter: channelTitle'
      });
    }

    const channels = await getYoutubeChannelByTitle(channelTitle);
    const channel = channels?.[0];
    
    if (!channel?.uploads) {
      return res.status(404).json({
        success: false,
        error: 'Channel not found or missing uploads playlist ID'
      });
    }

    let videos = await getVideosByChannelTitle(channelTitle);

    if (videos.length === 0 || moment().diff(videos[0].updatedAt, 'hours') >= 3) {
      const apiResponse = await axios.get<IYoutubeApiResponse>(BASE_URL, {
        params: {
          part: "snippet",
          playlistId: channel.uploads,
          maxResults: DEFAULT_MAX_RESULTS,
          key: API_KEY
        }
      });

      if (!apiResponse.data?.items?.length) {
        return res.status(404).json({
          success: false,
          error: 'No videos found for this channel'
        });
      }

      const youtubeVideos = apiResponse.data.items.map(item => item.snippet);
      console.log(youtubeVideos)
      await upsertVideos(youtubeVideos);
      
      videos = await getVideosByChannelTitle(channelTitle);
    }

    return res.status(200).json({
      success: true,
      data: videos
    });

  } catch (error) {
    const statusCode = error instanceof Error && error.message.includes('Missing') ? 400 : 500;
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';

    return res.status(statusCode).json({
      success: false,
      error: errorMessage
    });
  }
};
