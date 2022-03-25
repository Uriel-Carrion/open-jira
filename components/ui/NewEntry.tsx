import React, { useState, ChangeEvent } from "react";
import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useContext } from "react";
import { EntriesContext } from "../../context/entries/EntriesContext";
import { UIContext } from "../../context/ui";

export const NewEntry = () => {
  
  const { addEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);


  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addEntry(inputValue);
    onCancel();
  };

  const onCancel = () => {
    setTouched(false);
    setIsAddingEntry(false);
    setInputValue("");
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={
              inputValue.length <= 0 && touched && "Ingrese una tarea"
            }
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onTextChange}
            // onBlur={() => setTouched(true)}
          />

          <Box display={"flex"} justifyContent="space-between">
            <Button variant="text" onClick={() => onCancel()}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  );
};
