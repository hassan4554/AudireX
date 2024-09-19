import Header from "../Header/Header"
import Carousel from "../Carousel/Carousel"
import Services from "../Services/Services"
import ProductsListing from "../ProductsListing/ProductsListing.jsx"
import { ScrollToTop } from "../Utilities/ScrollToTop.jsx"

const Home = () => {
    ScrollToTop();
    return (
        <>
            <Header />
            <Carousel />
            <ProductsListing />
            <Services />
        </>
    )
}

export default Home
