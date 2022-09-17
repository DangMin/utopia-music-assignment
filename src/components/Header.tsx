import React, {FC} from 'react'

export const Header: FC = () => (
    <header className="bg-black">
        <div className="container flex justify-between items-center pv-4">
            <h2 className="pl-4 white">Utopia Country Highligher</h2>
            <img className="header__logo rounded-full" alt="UtopiaMusicLogo" src="https://utopiamusic.com/logo.png" />
        </div>
    </header>
)
