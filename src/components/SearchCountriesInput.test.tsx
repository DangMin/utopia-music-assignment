import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, {ChangeEvent} from 'react'
import {SearchCountriesInput} from './SearchCountriesInput'

describe('Testing SearchCountriesInput component', () => {
    test('able to render component and trigger event', async () => {
        const onChange = jest.fn().mockImplementationOnce((e: ChangeEvent<HTMLInputElement>) => {})

        const renderInputWithValue = (value: string = '') => <SearchCountriesInput value={value} onChange={onChange} />
        render(renderInputWithValue())

        expect(screen.getByPlaceholderText(/search countries by name/i)).toHaveValue('')
        await userEvent.type(screen.getByPlaceholderText(/search countries by name/i), 'fi')
        expect(onChange).toBeCalled()
        expect(onChange).toBeCalledTimes(2)
    })
})
