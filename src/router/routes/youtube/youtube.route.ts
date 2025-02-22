import express from 'express';

import { fetchYoutubeVideos } from '../../../controllers/youtube/youtube.controller';

/**
 * @swagger
 * /youtube/{channelTitle}:
 *   get:
 *     summary: Get F1 youtube videos by channel title
 *     description: Retrieves a list of youtube videos for the channel title
 *     tags:
 *       - Youtube
 *     parameters:
 *       - in: path
 *         name: channelTitle
 *         required: true
 *         description: Title of the channel to get videos from
 *         schema:
 *           type: string
 *           example: "Formula 1"
 *     responses:
 *       200:
 *         description: Successfully retrieved the summary.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     key:
 *                         type: string
 *       404:
 *         description: No videos found.
 *       500:
 *         description: Internal server error.
 */
export const youtubeRouter = (router: express.Router) => {
    router.get(
        '/youtube/:channelTitle',
        (req: express.Request, res: express.Response, next: express.NextFunction) => {
            fetchYoutubeVideos(req, res).catch(next);
        }
    );
    return router;
};
