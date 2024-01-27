import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const LayoutWrapper = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default LayoutWrapper
