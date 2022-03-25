import { FC, useReducer } from "react";
import { EntriesContext, entriesReducer } from "./";
import { v4 as uuidv4 } from "uuid";

import { Entry } from "../../interfaces";

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: "loreeesdhsodidsoisd",
      createAt: Date.now(),
      status: "pending",
    },
    {
      _id: uuidv4(),
      description: "loreeesdhsodidsoisd",
      createAt: Date.now(),
      status: "in-progress",
    },
  ],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createAt: Date.now(),
      status: "pending",
    };

    dispatch({ type: "[Entry] - add-Entry", payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: "[Entry] - Update-Entry", payload: entry });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        //methods
        addEntry,
        updateEntry
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
