import { BrowserRouter } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Routing from "../Routing/Routing";
import SideNav from "../SideNav/SideNav";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <BrowserRouter>
            <div className="Layout">
                <header>
                    <Header />
                </header>
                <aside>
                    <SideNav />
                </aside>
                <main>
                    <Routing />
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default Layout;
