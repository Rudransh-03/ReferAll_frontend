import About from "./About"
import EndNote from "./EndNote"
import Features from "./Features"
import FunFact from "./FunFact"
import Intro from "./Intro"

const Home = () => {
  return (
    <div className="pb-8">
        <Intro />
        <About />
        <Features />
        <FunFact />
        <EndNote />
    </div>
  )
}

export default Home