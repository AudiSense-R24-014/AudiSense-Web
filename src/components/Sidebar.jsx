import { ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";
import AudiSenseLogoWordOnly from "../assets/images/audisense-words-only.png";

const SidebarContext = createContext();

Sidebar.propTypes = {
  children: PropTypes.node,
};

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const contextValue = useMemo(() => ({ expanded }), [expanded]);
  return (
    <aside className="h-screen shadow-lg shadow-purple-900/20 shadow-b-2 shadow-r-[3px] -shadow-spread-2">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={AudiSenseLogoWordOnly}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt="logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <SidebarContext.Provider value={contextValue}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  active: PropTypes.bool,
  alert: PropTypes.bool,
  logout: PropTypes.bool,
};

export function SidebarItem({ icon, text, active, alert, logout = false }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`
      relative flex items-center py-2 px-3 my-1
      font-medium rounded-md cursor-pointer
      transition-colors group
      ${
        active
          ? "bg-gradient-to-tr from-indigo-300/85 to-indigo-200 text-indigo-800"
          : "hover:bg-indigo-100/75 text-gray-600"
      }
      ${logout && "text-gray-600 hover:bg-red-200/75"}
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all font-nunito font-bold ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            ${logout && "bg-red-200 text-red-800"}
        `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
