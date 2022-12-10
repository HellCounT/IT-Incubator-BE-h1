import express, {Request, Response} from 'express'
import { addDays } from 'date-fns'
import e from "express";

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

enum Resolutions {
    P144= 'P144',
    P240 = 'P240',
    P360 ='P360',
    P480 = 'P480',
    P720 = 'P720',
    P1080 = 'P1080',
    P1440 = 'P1440',
    P2160 = 'P2160',
}
type Video = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: Array<string>
}
type FieldError = {
    message: string,
    field: string
}
type APIErrorResult = {
    errorsMessages: Array<FieldError>
}

let videos: Array<Video> = [
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
        author: "Sergey",
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
// const errorsMessages: APIErrorResult = []

app.get('/hometask_01/api/videos', (req: Request, res: Response) => {
    res.status(200).send(videos)
})

app.get('/hometask_01/api/videos/:id', (req: Request, res: Response) => {
    const videoID: number = +req.params.id
    const foundVideo = videos.find(v => (v.id === videoID))
    if (foundVideo) {
        res.status(200).send(foundVideo)
    } else {
        res.sendStatus(401)
    }
})

app.post('/hometask_01/api/videos', (req: Request, res: Response) => {
    // validation
    let errors: Array<FieldError> = []
    if ('error in title') {
        errors.push({message: 'invalid title', field: 'title'})
    }
    if (errors.length > 0) return res.status(400).send({errorsMessages: errors})
    const dateNow = new Date()
    const addVideo: Video = {
        id: +dateNow,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: dateNow.toISOString(),
        publicationDate: addDays(dateNow, 1).toISOString(),
        availableResolutions: req.body.availableResolutions,
    }
    videos.push(addVideo)

    return res.status(201).send(addVideo)
    // res.sendStatus(201)
    // res.status(201).send()
    // res.send(201)

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
    videos = []
    res.sendStatus(204)
})



app.listen(port, () => {
    // const dateNow = new Date()
    // const dateNowPlusDay = new Date(+dateNow + (1000 * 60 * 60 * 24)).toISOString()
    // console.log(dateNow, dateNowPlusDay)
    console.log(`Example app listening on port ${port}`)
})