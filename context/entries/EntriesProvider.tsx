import { FC, useEffect, useReducer } from "react";

import { useSnackbar } from "notistack";

import { entriesApi } from "../../apis";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { useRouter } from "next/router";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const addEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description });
    dispatch({ type: "[Entry] - add-Entry", payload: data });
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({ type: "[Entry] - Update-Entry", payload: data });

      if (showSnackbar)
        enqueueSnackbar("Entrada eliminada", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      router.push("/");
    } catch (error) {
      console.log({ error });
    }
  };
  const deleteEntry = async ({ _id }: Entry) => {
    try {
      const { data } = await entriesApi.delete<Entry>(`/entries/${_id}`, {});
      // dispatch({ type: "[Entry] - Update-Entry", payload: data });

      enqueueSnackbar("Entrada actualizada", {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      router.push("/");
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "[Entry] - Entries", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        // Methods
        addEntry,
        updateEntry,
        deleteEntry
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
