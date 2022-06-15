
import React, { useState, useEffect } from 'react'
import {AppWrapper} from "./AppWrapper";

const App = ({theme}) => {

    const [splash, setSplash] = useState(true);

    useEffect(() => {
        setSplash(false);
    }, [])

    return (
        <AppWrapper theme={theme}>
            <h2>Hello from windows 10 React UI</h2>
        </AppWrapper>
    )
}

export default App;
