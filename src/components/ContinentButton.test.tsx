import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import {ContinentButton} from './ContinentButton'

describe('testing ContinentButton component', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('able to render ContinentButton', () => {
        const onClick = jest.fn().mockImplementationOnce((continent: string) => (e: MouseEvent) => {})

        render(<ContinentButton continent="Europe" onClick={onClick} />)

        expect(screen.getByText(/europe/i)).toBeInTheDocument()
    })

    test('able to trigger click event', async () => {
        const onClick = jest.fn().mockImplementationOnce((continent: string) => (e: MouseEvent) => {})

        render(<ContinentButton continent="Europe" onClick={onClick} />)

        await userEvent.click(screen.getByText(/europe/i))
        expect(onClick).toBeCalled()
        expect(onClick).toBeCalledTimes(1)
    })
})
