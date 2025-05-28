import NavBar from '../Navbar/Navbar'
import './CSS/home.css'
import About from "./About"
import Features from "./Features"
import Contact from "./Contact"
import FAQ from "./FAQ"
import UpcomingFeatures from "./Upcoming"

const Home = () => {
    return (
        <div className="Home" >
            <div className="Home-content">
                <NavBar />
                <About/>
                <Features/>
                <FAQ/>
                <UpcomingFeatures/>
                <Contact/>
            </div>
        </div>
    )
}

export default Home;