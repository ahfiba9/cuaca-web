import axios from "axios";
import {getCurrentMetApiSettings} from "src/Common/metApiSettings";
import _ from "lodash";
import {store} from "src/App/store";
import {setStateLocationsById} from "src/MainMap/redux/locationStates";

const headers = {'Authorization': process.env["REACT_APP_MET_API_KEY"] || ''}

const locationUrl = (locationType: string, offset: number) => `/locations?locationcategoryid=${locationType}&offset=${offset}`
const locationsForecastUrl = (location: string, startDate: string, endDate: string) => `/data?datasetid=FORECAST&datacategoryid=GENERAL&locationid=${location}&start_date=${startDate}&end_date=${endDate}`
const dataTypesUrl = () => `/datatypes`

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

export interface LocationResult {
    id: string
    latitude: number
    locationcategoryid: string
    longitude: number
    name: string
    locationCollections: ForecastResult[]
}

interface LocationResponseRaw {
    metadata: {
        resultset:
            ResultSet
    }
    results: LocationResult[]
}

interface ForecastResultSet {
    count: number
    datacategoryid: string
    datasetid: string
    limit: number
    locationid: string
    offset: number
}

interface ForecastResult {
    attributes?:
        {
            ref?: string
            valid_from?: string
            valid_to?: string
        }
    datatype: string
    date: string
    latitude: number
    locationid: string
    locationname: string
    locationrootid: string
    locationrootname: string
    longitude: number
    value: string
}

interface ForecastResponseRaw {
    metadata: {
        resultset:
            ForecastResultSet
    }
    results: ForecastResult[]
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
            for (let i=1 ; i <= numberOfIterations ; i++) {
                console.log('number of i =', i )
                const moreTown = await getTownLocations(i * 50)

                allTowns.push(...moreTown.results)
            }
        }
    }

    return _.uniqBy(allTowns, 'id')
}

export const hydrateAllLocationsForecastStates = async (): Promise<Record<string, LocationResult>> => {
    await getDataTypes()
    const todayDate = new Date().toLocaleDateString().split('/').reverse().join('-')

    const stateLocations = await getStateLocations()
    const stateLocationsById = _.keyBy(stateLocations.results,'id')

    Object.keys(stateLocationsById).map( (key, index) => stateLocationsById[key]['locationCollections'] = [] )

    const { data } = await apiMet.get(locationsForecastUrl('ALL_LOCATIONS', todayDate, todayDate))

    data.results.forEach( (item: ForecastResult) => {
        stateLocationsById[item.locationrootid]['locationCollections'].push(item)
    })

    console.log('stateLocationById = ', stateLocationsById)
    store.dispatch(setStateLocationsById({ stateLocationsById }))

    return stateLocationsById
}

export const getDataTypes = async () => {
    // there should be more data types available and we can get that by using offset in the api call
    // but since we are only interested in the data types for general forecast, we only call the api once
    const response = await apiMet.get(dataTypesUrl())

    console.log('data types = ', response)

    return response.data
}