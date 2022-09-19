import React, {ChangeEventHandler, MouseEventHandler, useCallback, useEffect, useMemo, useState} from 'react'
import './App.scss'
import {ContinentButton} from './components/ContinentButton'
import {Country} from './components/Country'
import {Header} from './components/Header'
import {SearchCountriesInput} from './components/SearchCountriesInput'
import {Country as CountryDataType} from './types'

const COUNTRIES_URL = process.env.REACT_APP_COUNTRIES_URL

function App() {
    const [loading, setLoading] = useState(false)
    const [countries, setCountries] = useState<CountryDataType[]>([])
    const [continents, setContinents] = useState<Set<string>>()
    const [errorMessage, setErrorMessage] = useState<string | null>()

    const [selectedContinent, setSelectedContinent] = useState<string | null>()
    const [searchValue, setSearchValue] = useState<string>('')

    const loadCountries = useCallback(() => {
        setLoading(true)
        setErrorMessage(null)

        return new Promise<void>(async (resolve) => {
            const response = await fetch(COUNTRIES_URL as string, {method: 'GET'})

            if (response.ok) {
                const data: CountryDataType[] = await response.json()

                const continents = new Set<string>(data.map(({continent}) => continent))

                setCountries(data)
                setContinents(continents)
                resolve()
            } else {
                setErrorMessage('An error has occurred while loading countries.')
            }

            setLoading(false)
        })
    }, [])

    const filteredCountries = useMemo(
        () => countries.filter(({name}) => searchValue === '' || name.match(new RegExp(searchValue, 'i'))),
        [countries, searchValue]
    )

    const chooseContinent =
        (continent: string): MouseEventHandler =>
        () => {
            setSelectedContinent(continent)
        }

    const updateSearchValue: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchValue((e.target as HTMLInputElement).value)
    }

    useEffect(() => {
        loadCountries()
    }, [loadCountries])

    if (loading) {
        return (
            <div className="w-full h-full">
                <Header />

                <div className="container flex items-center justify-center pv-8">
                    <h1>Loading...</h1>
                </div>
            </div>
        )
    }

    if (errorMessage) {
        return (
            <div className="w-full h-full">
                <Header />
                <div className="container flex flex-column items-center justify-center pv-8">
                    <h1>{errorMessage}</h1>
                    <h2 className="flex items-center gap-2">
                        Press{' '}
                        <button className="inline-button" onClick={loadCountries}>
                            here
                        </button>{' '}
                        to retry.
                    </h2>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full">
            <Header />
            <div className="container pv-8">
                <h4 className="text-center">Select region and click on the countries you want to highlight</h4>

                <div className="continent_buttons_container">
                    {continents &&
                        Array.from(continents).map((continent) => (
                            <ContinentButton
                                key={continent.toLowerCase()}
                                continent={continent}
                                selectedContinent={selectedContinent}
                                onClick={chooseContinent}
                            />
                        ))}
                </div>

                <hr />
                <div className="flex p-4 m-4 gap-4">
                    <SearchCountriesInput value={searchValue} onChange={updateSearchValue} />
                </div>
                <hr />

                <div className="countries__list relative gap-6 mt-6">
                    {filteredCountries.map((country) => (
                        <Country key={country.alpha3Code} country={country} selectedContinent={selectedContinent} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App
