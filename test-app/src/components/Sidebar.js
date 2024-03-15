import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../redux/actions/authActions'
import { English } from '../localization/English'
import { Ukrainian } from '../localization/Ukrainian'

const Sidebar = () => {
    const user = useSelector((state) => state.auth)
    const language = useSelector((state) => state.app.language)
    const localization = language === 'Ukrainian' ? Ukrainian : English
    const dispatch = useDispatch()

    const signOutHandler = () => {
        dispatch(signOut())
    }

    return (
        <div className="w-1/4 bg-gray-800 text-white p-5">
            <div className="profile-section mb-5">
                <h5 className="text-lg font-bold">{user.companyName}</h5>
                <p className="text-sm">{user.email}</p>
            </div>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-5"
                onClick={signOutHandler}
            >
                {localization.sidebar.signOutBtn}
            </button>
            <nav>
                <ul className="list-none">
                    <li className="mb-3">
                        <a href="/" className="text-white hover:text-gray-300">
                            {localization.sidebar.homeLnk}
                        </a>
                    </li>
                    <li className="mb-3">
                        <a href="/reports" className="text-white hover:text-gray-300">
                            {localization.sidebar.reportsLnk}
                        </a>
                    </li>
                    <li className="mb-3">
                        <a href="/settings" className="text-white hover:text-gray-300">
                            {localization.sidebar.settingsLnk}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
