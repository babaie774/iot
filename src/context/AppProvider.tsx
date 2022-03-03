import React, { useReducer, useContext , createContext} from "react";
import reducer from "./reducer";
import initialState from "./state";
const AppStateContext = createContext<any>(null);
export const AppDispatchContext = createContext<any>(null);

export const AppProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={{ state }}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
};

export const useApp = () => useContext(AppStateContext);
