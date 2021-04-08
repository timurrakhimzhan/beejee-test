import React from "react"
import { LayoutWrapper } from "./styled-components"
import Header from "../header";

const Layout: React.FC = ({children}) => {
    return <LayoutWrapper>
        <Header />
        <main>
            {children}
        </main>
    </LayoutWrapper>
}

export default Layout