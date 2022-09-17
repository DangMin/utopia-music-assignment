import React, {FC, MouseEventHandler} from 'react'

export const ContinentButton: FC<ContinentButtonProps> = ({continent, onClick, selectedContinent}) => (
    <button
        className={`continent__button
            ${continent === selectedContinent && 'continent__button--selected'}`}
        onClick={onClick(continent)}
    >
        {continent}
    </button>
)

type ContinentButtonProps = {
    continent: string
    selectedContinent?: string | null
    onClick: (continent: string) => MouseEventHandler
}
