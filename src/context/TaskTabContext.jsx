import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const TaskTabContext = createContext();

TaskTab.propTypes = {
    children: PropTypes.node.isRequired,
};

export function TaskTab({ children }) {
    const [taskTab, setTaskTab] = useState("allTasks");

    const toggleTaskTab = (tab) => {
        setTaskTab(tab);
    };

    return (
        <TaskTabContext.Provider value={{ taskTab, toggleTaskTab }}>
            {children}
        </TaskTabContext.Provider>
    );
}