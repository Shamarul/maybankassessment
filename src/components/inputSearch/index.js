import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function InputSearch(props) {
  const [placeId, setPlaceId] = React.useState('');
  const [description, setDescription] = React.useState('');

  let {options, searchOnChange, dispatchRunUpdateMap} = props
  const classes = useStyles();

  return (
    <Autocomplete
      id="goole-autocomplete"
      style={{ width: 800 }}
      options={options}
      onChange={(event, newValue) => {
        setPlaceId(newValue?.place_id);
        dispatchRunUpdateMap(newValue?.place_id);
      }}
      inputValue={description}
      onInputChange={(event, newInputValue) => {
        setDescription(newInputValue);
      }}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option.description}
      getOptionSelected={(option, value) => option.description === value.description}
      renderOption={(option) => (
        <React.Fragment>
          {option.description}
        </React.Fragment>
      )}
      renderInput={(params) => <TextField {...params} variant="outlined" label="Search location" style={{backgroundColor:"rgba(255,255,255,0.6)"}} onChange={(e)=>searchOnChange(e)}/>}
    />
  );
}