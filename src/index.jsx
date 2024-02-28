import { createRoot } from 'react-dom/client';

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

import { MainView } from "./components/main-view/main-view";


// Main component (will eventually use all the others)
const App = () => {
    return <MainView />;
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);



// Tells React to render your app in the root DOM element
root.render(<App />);


// parcel src/index.html

// look at: http://localhost:1234/


// TEST ELEMENTS

// Main component (will eventually use all the others) - TEST ELEMENT
// const MyFlixApplication = () => {
//     return (
//         <div className="my-flix">
//             <div>Good morning</div>
//         </div>
//     );
// };

// Tells React to render your app in the root DOM element - TEST ELEMENT
// root.render(<MyFlixApplication />);





// RUN THIS TO GET OUTPUT!! :

// parcel src/index.html

// CHECK http://localhost:1234/