import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// eslint-disable-next-line react/prop-types
function DropdownTipoReparacion({onChange}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [, setTipoReparacion] = useState('');

  const handleChange = (event) => {
    setSelectedOptions(event.target.value);
    setTipoReparacion(event.target.value.join(','));
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="tipoReparacion-label" style={{ color: "#f0f0f0" }}>Tipo de Reparación</InputLabel>
      <Select
        labelId="tipoReparacion-label"
        id="tipoReparacion"
        multiple
        value={selectedOptions}
        onChange={handleChange}
        inputProps={{
          style: { color: "#f0f0f0" }
        }}
      >
        <MenuItem value="opcion1">Opción 1</MenuItem>
        <MenuItem value="opcion2">Opción 2</MenuItem>
        <MenuItem value="opcion3">Opción 3</MenuItem>
      </Select>
    </FormControl>
  );
}

export default DropdownTipoReparacion;
