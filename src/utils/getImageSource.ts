import contentJson from '../content.json'

export const getImageSource = (image: string) => {
    return `${contentJson.imageSourceBase}${image}`
}