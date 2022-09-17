/* eslint-disable testing-library/no-node-access */
import React from 'react'
import {render, screen} from '@testing-library/react'
import App from './App'
import mockData from './mockedData.json'
import {act} from 'react-dom/test-utils'
import userEvent from '@testing-library/user-event'

describe('Application testing', () => {
    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockData),
        })
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    test('render application with loading state', () => {
        render(<App />)

        expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })

    test('render application with fetched data', async () => {
        let container: unknown
        await act(async () => {
            const view = await render(<App />)
            container = view.container
        })

        const countriesElements = (container as HTMLElement).getElementsByClassName('country')
        const continentElements = (container as HTMLElement).getElementsByClassName('continent__button')

        expect(countriesElements.length).toBe(245)
        expect(continentElements).toHaveLength(5)

        expect(await screen.findByText(/asia/i)).toBeInTheDocument()
        expect(await screen.findByText(/oceania/i)).toBeInTheDocument()
        expect(await screen.findByText(/bonaire/i)).toBeInTheDocument()
        expect(await screen.findByText(/vietnam/i)).toBeInTheDocument()

        expect(screen.getByPlaceholderText(/search countries by name/i)).toBeInTheDocument()
    })

    test('able to highlight country when a continent is selected', async () => {
        let container: unknown, testElement: unknown
        await act(async () => {
            const view = await render(<App />)
            container = view.container
        })

        userEvent.click(screen.getByText(/asia/i))
        testElement = await screen.findByText(/asia/i)
        expect((testElement as HTMLElement)?.classList).toContain('continent__button--selected')
        testElement = await screen.findByText(/china/i)
        expect((testElement as HTMLElement)?.classList).toContain('pink')
        testElement = await screen.findByText(/taiwan/i)
        expect((testElement as HTMLElement)?.classList).toContain('pink')
        testElement = await screen.findByText(/finland/i)
        expect((testElement as HTMLElement)?.classList).not.toContain('pink')
        expect((container as HTMLElement).getElementsByClassName('pink')).toHaveLength(49)

        userEvent.click(screen.getByText(/europe/i))
        testElement = await screen.findByText(/europe/i)
        expect((testElement as HTMLElement)?.classList).toContain('continent__button--selected')
        testElement = await screen.findByText(/china/i)
        expect((testElement as HTMLElement)?.classList).not.toContain('pink')
        testElement = await screen.findByText(/taiwan/i)
        expect((testElement as HTMLElement)?.classList).not.toContain('pink')
        testElement = await screen.findByText(/finland/i)
        expect((testElement as HTMLElement)?.classList).toContain('pink')
        testElement = await screen.findByText(/germany/i)
        expect((testElement as HTMLElement)?.classList).toContain('pink')
        expect((container as HTMLElement).getElementsByClassName('pink')).toHaveLength(52)
    })

    test('able to filter countries when typing in search box', async () => {
        let container: unknown
        await act(async () => {
            const view = await render(<App />)
            container = view.container
        })

        const testElement = await screen.findByPlaceholderText(/search countries by name/i)
        await userEvent.type(testElement, 'vi')
        expect((container as HTMLElement).getElementsByClassName('country')?.length).toBe(9)
        await userEvent.clear(testElement)
        await userEvent.type(testElement, 'fi')
        expect((container as HTMLElement).getElementsByClassName('country')?.length).toBe(2)
    })
})
