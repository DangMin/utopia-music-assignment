import React, {ChangeEventHandler, FC} from 'react'

export const SearchCountriesInput: FC<SearchCountriesInputProps> = ({onChange, value}) => (
    <input
        type="text"
        id="country-search"
        name="country-search"
        onChange={onChange}
        value={value}
        placeholder="Search countries by name"
        className="ph-4 pv-2 rounded-5 w-full"
    />
)

type SearchCountriesInputProps = {
    onChange: ChangeEventHandler
    value: string
}
