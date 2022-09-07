import store from './store';
import {Provider} from 'react-redux';
import {useState} from 'react'

import AnimatedRoutes from "./Components/AnimatedRoutes";
import {BeatLoader} from "react-spinners";
import logo from "../src/images/hi-removebg-preview.png"

function App() {
    let [loading, setLoading] = useState(false);

    return (
        <Provider store={store}>
            <div className="App">
                {loading &&
                    <div
                        className="flex justify-center m-auto absolute h-[100vh] w-full loadingScreen bg-gray-500 opacity-75 z-[3000]">
                        <div className="h-[15%] w-[15%] block  my-[100px] items-center opacity-100 ">
                            <img className=''
                                // src={'./images/aloha-loading-screen.png'}
                                 src={logo}
                                 alt="Aloha Loading"/>

                                <BeatLoader
                                    color="#2EB74B"
                                    cssOverride={{
                                        marginLeft: "130px",
                                        marginTop: "50px"
                                    }}
                                    size={20}
                                    speedMultiplier={1}
                                />
                        </div>
                    </div>
                }
                <AnimatedRoutes setLoading={setLoading}/>
            </div>
        </Provider>
    );
}

export default App;
