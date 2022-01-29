import axios from "axios";
import {getCurrentMetApiSettings} from "src/Common/metApiSettings";
import _ from "lodash";

const headers = {'Authorization': process.env["REACT_APP_MET_API_KEY"] || ''}

const locationUrl = (locationType: string, offset: number) => `/locations?locationcategoryid=${locationType}&offset=${offset}`

export const apiMet = axios.create({
    baseURL: getCurrentMetApiSettings().baseMetUrl,
    timeout: 1000,
    headers: headers
});

interface ResultSet {
    count: number
    limit: number
    locationcategoryid: string
    offset: number
}

interface LocationResult {
    id: string
    latitude: number
    locationcategoryid: string
    longitude: number
    name: string
}

interface LocationResponseRaw {
    metadata: {
        resultset:
            ResultSet
    }
    results: LocationResult[]
}

export const getStateLocations = async (): Promise<LocationResponseRaw> => {
    const response = await apiMet.get(locationUrl('STATE', 0))

    return response.data
}

export const getTownLocations = async (offset: number): Promise<LocationResponseRaw> => {
    const response = await apiMet.get(locationUrl('TOWN', offset))

    return response.data
}

export const getAllTownLocations = async (): Promise<LocationResult[]> => {
    const town = await getTownLocations(0)

    console.log('town = ', town)

    const allTowns = town.results

    if (town) {
        const numberOfIterations = Math.ceil(town.metadata.resultset.count/town.metadata.resultset.limit)

        console.log('number of iterations = ', numberOfIterations)

        if (numberOfIterations > 1) {
            for (let i=0 ; i < numberOfIterations ; i++) {
                console.log('number of i =', i )
                const moreTown = await getTownLocations(i * 50)

                allTowns.push(...moreTown.results)
            }
        }
    }

    return _.uniqBy(allTowns, 'id')
}