import express, {Request, Response} from 'express'
import {addDays} from 'date-fns'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

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

const resolutions: Array<string> = [
    'P144',
    'P240',
    'P360',
    'P480',
    'P720',
    'P1080',
    'P1440',
    'P2160']

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

app.get('/videos', (req: Request, res: Response) => {
    res.status(200).send(videos)
})

app.get('/videos/:id', (req: Request, res: Response) => {
    const videoID: number = +req.params.id
    const foundVideo = videos.find(v => (v.id === videoID))
    if (foundVideo) {
        res.status(200).send(foundVideo)
    } else {
        res.sendStatus(404)
    }
})

app.post('/videos', (req: Request, res: Response) => {
    // Input validation

    let errors: Array<FieldError> = []
    if (typeof(req.body.title) !== "string" ||
        req.body.title === "" ||
        req.body.title.length > 40 ||
        req.body.title.trim() === "") {
        errors.push({message: 'Invalid input', field: 'title'})
    }
    if (req.body.author === "" ||
        req.body.author.length > 20 ||
        req.body.author.trim() === "") {
        errors.push({message: 'invalid input', field: 'author'})
    }
    if (req.body.availableResolutions.length < 1) {
        errors.push({message: 'invalid input', field: 'availableResolutions'})
    }
    let resCheck: boolean = true
    req.body.availableResolutions.forEach((res:string) => {
        if (!resolutions.includes(res)) resCheck = false
    })
    if (!resCheck) {
        errors.push({message: 'invalid input', field: 'availableResolutions'})
    }

    if (errors.length > 0) {
        res.status(400).send({errorsMessages: errors})
        return
    }

    // Video adding

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

})

app.put('/videos/:id', (req: Request, res: Response) => {
    // Input validation

    let errors: Array<FieldError> = []
    if (typeof(req.body.title) !== "string" ||
        req.body.title === "" ||
        req.body.title.length > 40 ||
        req.body.title.trim() === "") {
        errors.push({message: 'Invalid input', field: 'title'})
    }
    if (req.body.author === "" ||
        req.body.author.length > 20 ||
        req.body.author.trim() === "") {
        errors.push({message: 'invalid input', field: 'author'})
    }
    if (req.body.availableResolutions.length < 1) {
        errors.push({message: 'invalid input', field: 'availableResolutions'})
    }
    let resCheck: boolean = true
    req.body.availableResolutions.forEach((res:string) => {
        if (!resolutions.includes(res)) resCheck = false
    })
    if (!resCheck) {
        errors.push({message: 'invalid input', field: 'availableResolutions'})
    }

    if (typeof(req.body.canBeDownloaded) !== "boolean") {
        errors.push({message: 'expected boolean', field: 'canBeDownloaded'})
    }
    if (req.body.minAgeRestriction > 18 ||
        (req.body.minAgeRestriction < 1 && req.body.minAgeRestriction > 0)) {
        errors.push({message: 'invalid age restriction', field: 'minAgeRestriction'})
    }

    if (errors.length > 0) {
        res.status(400).send({errorsMessages: errors})
        return
    }

    // Video updating

    videos.forEach((v) => {
       if (v.id === +req.params.id) {
           v.title = req.body.title
           v.author = req.body.author
           v.availableResolutions = req.body.availableResolutions
           v.canBeDownloaded = req.body.canBeDownloaded
           v.minAgeRestriction = req.body.minAgeRestriction
           v.publicationDate = new Date().toISOString()
           res.sendStatus(204)
       }
       else res.sendStatus(404)

    })

})

app.delete('/videos/:id', (req: Request, res: Response) => {
    const foundVideo = videos.find(v => (v.id === +req.params.id))
    if (foundVideo !== undefined) {
        videos = videos.filter(v => v.id !== +req.params.id)
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})


app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos = []
    res.sendStatus(204)
    return
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})