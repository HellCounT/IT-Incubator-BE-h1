import express, {Request, Response} from 'express'
import bodyParser from "body-parser"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

/*enum Resolutions {
    P144,
    P240,
    P360,
    P480,
    P720,
    P1080,
    P1440,
    P2160,
}*/
type Video = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded?: false,
    minAgeRestriction?: number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: Array<string>
}
type FieldError = {
    message: string,
    field: string
}
type APIErrorResult = Array<FieldError>

let videos = [
    {
        id: 1,
        title: "Funny Cats",
        author: "Alex",
        canBeDownloaded: true,
        minAgeRestriction: 1,
        createdAt: "2022-12-09T10:21:32.245Z",
        publicationDate: "2022-12-10T10:21:32.245Z",
        availableResolutions: ["P720", "P1440", "P2160"]
    },
    {
        id: 2,
        title: "Rock am Ring 2001 Concert",
        author: "Serg",
        canBeDownloaded: false,
        minAgeRestriction: 18,
        createdAt: "2022-12-11T10:21:32.245Z",
        publicationDate: "2022-12-12T10:21:32.245Z",
        availableResolutions: ["P720", "P1440", "P2160"]
    },
    {
        id: 3,
        title: "Qlimax 2022 Aftermovie",
        author: "Andrey",
        canBeDownloaded: false,
        minAgeRestriction: 16,
        createdAt: "2022-12-11T10:21:32.245Z",
        publicationDate: "2022-12-12T10:21:32.245Z",
        availableResolutions: ["P480", "P1440", "P2160"]
    }
]
const errorsMessages: APIErrorResult = []

app.get('/hometask_01/api/videos', (req: Request, res: Response) => {
    res.send(videos)
    res.sendStatus(200)
})

app.get('/hometask_01/api/videos/:id', (req: Request, res: Response) => {
    const videoID: number = +req.params.id
    const foundVideo = videos.find(v => (v.id === videoID))
    if (foundVideo) {
        res.send(foundVideo)
        res.sendStatus(201)
    } else {
        const errorMessage: FieldError = {
            message: "Video not found",
            field: "404"
        }
        errorsMessages.push(errorMessage)
        res.send(errorsMessages)
        res.sendStatus(404)
    }
})

app.post('/hometask_01/api/videos', (req: Request, res: Response) => {
    const addVideo: Video = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        createdAt: (new Date().toISOString()),
        publicationDate: (new Date().toISOString()),
        availableResolutions: req.body.availableResolutions,
    }
    if (addVideo.id &&
        addVideo.title.length > 0 &&
        addVideo.title.length < 40 &&
        addVideo.author.length > 0 &&
        addVideo.author.length < 20) {
        videos.push(addVideo)
        res.send(addVideo)
        res.sendStatus(201)
    }
})

app.put('hometask_01/api/videos/:id', (req: Request, res: Response) => {

})

app.delete('hometask_01/api/videos/:id', (req: Request, res: Response) => {
    const foundVideo = videos.find(v => (v.id === +req.params.id))
    if (foundVideo) {
        videos = videos.filter(v => v.id !== +req.params.id)
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})




app.delete('hometask_01/api/testing/all-data', (req: Request, res: Response) => {

})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})