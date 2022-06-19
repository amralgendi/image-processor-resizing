import { log } from 'console'
import express from 'express'
import { checkParams } from '../middleware/images'
import { checkForImage, resizeImage } from '../utils/imageUtils'

const router = express.Router()

// ONLY ONE ENDPOINT FOR RESIZING THE IMAGE
router.get('/', checkParams, async (req, res) => {
    const { filename, width, height } = req.query

    const file = checkForImage(filename as string, 'images')
    if (!file)
        return res.status(400).json({
            error: 'file does not exists',
            message: 'Filename does not exists!',
        })
    const processedFile = checkForImage(
        `${filename}-${width}-${height}`,
        'thumbs'
    )
    if (processedFile) return res.sendFile(processedFile)

    try {
        const newFile = await resizeImage(
            file,
            parseInt(width as string),
            parseInt(height as string)
        )
        res.status(200).sendFile(newFile)
    } catch (e) {
        let message = 'Uknown Error'
        if (e instanceof Error) message = e.message
        res.status(400).json({ error: e, message })
    }
})

export default router
