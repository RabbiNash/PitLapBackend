import { Request, Response } from 'express';

/**
 * A reusable function for handling GET requests and responses.
 * 
 * @param fetchFunction - The function to fetch data from the database.
 * @param successMessage - The success message to send if data is found.
 * @param errorMessage - The error message to send if something goes wrong.
 */
export const handleGetRequest = async (
    fetchFunction: Function,
    successMessage: string,
    errorMessage: string,
    res: Response
): Promise<void> => {
    try {
        const data = await fetchFunction();

        if (!data.length) {
            res.status(404).json({ success: false, message: successMessage });
            return;
        }

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error(errorMessage, error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
