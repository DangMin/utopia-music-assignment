import React, {FC} from 'react'
import {Country as CountryDataType} from '../types'

export const Country: FC<CountryProps> = ({country, selectedContinent}) => {
    const className = `country pointer flex items-center justify-center text-center text-large font-600 ${
        country.continent === selectedContinent ? 'pink' : ''
    } `

    return <div className={className}>{country.name}</div>
}

type CountryProps = {
    country: Partial<CountryDataType>
    selectedContinent?: string | null
}
