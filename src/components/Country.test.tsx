import {render, screen} from '@testing-library/react'
import React from 'react'
import {Country as CountryDataType} from '../types'
import {Country} from './Country'

const mockCountry: CountryDataType = {
    name: 'Afghanistan',
    topLevelDomain: ['.af'],
    alpha2Code: 'AF',
    alpha3Code: 'AFG',
    callingCodes: ['93'],
    capital: 'Kabul',
    altSpellings: ['AF', 'Afġānistān'],
    region: 'Southern Asia',
    continent: 'Asia',
    population: 27657145,
    latlng: [33, 65],
    demonym: 'Afghan',
    area: 652230,
    gini: 29.4,
    timezones: ['UTC+04:30'],
    borders: ['IRN', 'PAK', 'TKM', 'UZB', 'TJK', 'CHN'],
    nativeName: 'افغانستان',
    numericCode: '004',
    currencies: [
        {
            code: 'AFN',
            name: 'Afghan afghani',
            symbol: '؋',
        },
    ],
    languages: [
        {
            iso639_1: 'ps',
            iso639_2: 'pus',
            name: 'Pashto',
            nativeName: 'پښتو',
        },
        {
            iso639_1: 'uz',
            iso639_2: 'uzb',
            name: 'Uzbek',
            nativeName: 'Oʻzbek',
        },
        {
            iso639_1: 'tk',
            iso639_2: 'tuk',
            name: 'Turkmen',
            nativeName: 'Türkmen',
        },
    ],
    translations: {
        br: 'Afeganistão',
        pt: 'Afeganistão',
        nl: 'Afghanistan',
        hr: 'Afganistan',
        fa: 'افغانستان',
        de: 'Afghanistan',
        es: 'Afganistán',
        fr: 'Afghanistan',
        ja: 'アフガニスタン',
        it: 'Afghanistan',
        hu: 'Afganisztán',
    },
    flags: ['https://restcountries.com/data/afg.svg', 'https://restcountries.com/data/png/afg.png'],
    regionalBlocs: [
        {
            acronym: 'SAARC',
            name: 'South Asian Association for Regional Cooperation',
        },
    ],
    cioc: 'AFG',
    independent: true,
}

describe('Testing Country component', () => {
    test('able to render component', () => {
        render(<Country country={mockCountry} />)

        expect(screen.getByText(mockCountry.name)).toBeInTheDocument()
    })

    test('able to highlight country with matching selected continent', () => {
        render(<Country country={mockCountry} selectedContinent="Asia" />)

        expect(screen.getByText(mockCountry.name)?.classList).toContain('pink')
    })

    test('no highlight country with unmatched selected continent', () => {
        render(<Country country={mockCountry} selectedContinent="Europe" />)

        expect(screen.getByText(mockCountry.name)?.classList).not.toContain('pink')
    })
})
