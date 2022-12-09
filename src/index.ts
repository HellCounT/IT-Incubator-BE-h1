import express, {Request, Response} from 'express'

const app = express()
const port = process.env.PORT || 3000

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
    canBeDownloaded: boolean,
    minAgeRestriction: number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: Array<string>
}
type FieldError = {
    message: string,
    field: string
}
type APIErrorResult = Array<FieldError>

const videosData = [
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

app.get('/hometask_01/api/videos', (req: Request, res: Response) => {

})

app.get('/hometask_01/api/videos/{id}', (req: Request, res: Response) => {

})

app.post('/hometask_01/api/videos', (req: Request, res: Response) => {

})

app.put('hometask_01/api/videos/{id}', (req: Request, res: Response) => {

})

app.delete('hometask_01/api/videos/{id}', (req: Request, res: Response) => {

})




app.delete('hometask_01/api/testing/all-data', (req: Request, res: Response) => {

})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})