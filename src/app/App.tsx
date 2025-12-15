import Main from "./Main";

//provider
import {UploadImageProvider } from "../features/uploadImage/provider/UploadImageProvider";
import  {ElementsProvider} from "../app/provider/ElementsProvider";

// toast
import 'seo-toast';
import 'seo-toast/styles';

function App(){
    return (
        <div className="App">
            <UploadImageProvider >
                <ElementsProvider>
                        <Main />
                </ElementsProvider>
            </UploadImageProvider>
            <seo-toast position="top-right" />
        </div>
    )
}

export default App;