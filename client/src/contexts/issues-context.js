import React, { useContext, createContext } from "react";

export const IssuesContext = createContext();
export const useIssues = () => useContext(IssuesContext);

export const IssuesProvider = props => {
    // const children = props;


    const configObj = {
        test: "yeet"
    }

    return (
        <IssuesContext.Provider value={configObj}>
            {/* {children} */}
        </IssuesContext.Provider>
    )
}
