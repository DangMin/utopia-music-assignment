export type Country = {
    name: string
    topLevelDomain: string[]
    alpha2Code: string
    alpha3Code: string
    callingCodes: string[]
    capital: string
    altSpellings: string[]
    region: string
    continent: string
    population: number
    latlng: [number, number]
    demonym: string
    area: number
    gini: number
    timezones: string[]
    borders: string[]
    nativeName: string
    numericCode: string
    currencies: Currency[]
    languages: Language[]
    translations: {[index: string]: string}
    flags: string[]
    regionalBlocs: RegionalBloc[]
    cioc: string
    independent: boolean
}

type Currency = {
    code: string
    name: string
    symbol: string
}

type Language = {
    iso639_1: string
    iso639_2: string
    name: string
    nativeName: string
}

type RegionalBloc = {
    acronym: string
    name: string
}
