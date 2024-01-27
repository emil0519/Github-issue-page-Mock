import './index.css'

import { FC } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Error from './component/Error/Error'
import IssueList from './component/IssueList/App'
import Label from './component/LabelList/Label'
import NewIssue from './component/NewIssue'
import RepoList from './pages/RepoList'
import SignIn from './pages/SignIn'
import IssuePage from './IssuePage/IssuePage'
import reportWebVitals from './reportWebVitals'
import ErrorBoundary from './ErrorBoundary'
import LayoutWrapper from './component/LayoutWrapper'

import { store } from './state/store'

const App: FC = () => {
    return (
        <ErrorBoundary fallback="Error happened">
            <BrowserRouter>
                <Provider store={store}>
                    <Routes>
                        <Route path="/" element={<SignIn />}></Route>
                        <Route element={<LayoutWrapper />}>
                            <Route path="/Repo" element={<RepoList />}></Route>
                            <Route path="/App" element={<IssueList />}></Route>
                            <Route path="/Label" element={<Label />}></Route>
                            <Route
                                path="/NewIssue"
                                element={<NewIssue />}
                            ></Route>
                            <Route
                                path="/IssuePage"
                                element={<IssuePage />}
                            ></Route>
                        </Route>
                        <Route path="*" element={<Error />}></Route>
                    </Routes>
                </Provider>
            </BrowserRouter>
        </ErrorBoundary>
    )
}

export default App

reportWebVitals()
