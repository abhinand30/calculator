// import Calculator from './Pages/Calculator'

import { useEffect } from "react";
import AOS from "aos";

import 'aos/dist/aos.css';
import Navbar from "./components/frontend/Navbar"
import Home from "./components/frontend/Home";
import CustomMultiForm from "./Pages/CustomMultiForm";

// import Search from "./Pages/search"
// import ScrollTracker from "./Pages/throttle"
// import CompoundComponents from "./Pages/CompoundComponents"
// import TraditionalList from "./Pages/TraditionalList"

// import WithoutTransition from "./Pages/withoutTranstion"
// import WithTransition from "./Pages/WithTranstion"

// import ChartCard from "./components/chart";
// import SegmentedBars from "./components/chart"
// import ChartTooltipDefault from "./components/chart"

function App() {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 1000,
      easing: 'ease-in-sine',
      delay: 100,
      once: false
    });
  }, []);
  return (
    <div className="">
      <CustomMultiForm />
      {/* <Navbar /> */}
      {/* <Home />
      <Home /> */}
      {/* <SegmentedBars /> 
        <WithTransition /> 
        <WithoutTransition /> 
        <Search /> 
        <ScrollTracker /> 
     <TraditionalList /> */}
      {/* <CompoundComponents />
      <TraditionalList /> */}
    </div>
  )
}

export default App