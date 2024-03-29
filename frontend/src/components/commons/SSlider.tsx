import * as React from 'react';
import { useContext } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';

import { UserContext } from '../../app-context/userContext';

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function SSlider() {

  const {user, colleges, userScores, updateState } = useContext(UserContext);
  //@ts-ignore
  const [sValue, successsetValue] = React.useState<number>(userScores['success']*100);

 const [vValue, valuesetValue] = React.useState<number>(
  //@ts-ignore
    userScores['value']*100
  );

  const [cValue, costsetValue] = React.useState<number>(
  //@ts-ignore
    userScores['cost']*100
  );

   const [oValue, outcomessetValue] = React.useState<number>(
  //@ts-ignore
    userScores['outcomes']*100
  );

    const [dValue, diversitysetValue] = React.useState<number>(
  //@ts-ignore
    userScores['diversity']*100
  );


  function sumValues() {
    return sValue + vValue + cValue + oValue + dValue
    }
  const [value, setValue] = React.useState<number>(
      100 - sumValues()
    );
  function isInBounds(bucketValue: number, difference: number) {
    if (bucketValue - difference < 0 || bucketValue - difference > 100) {
      return false;
    }
    return true;
  }

  function updateValues() {
    updateState({
      userScores: {
        success: sValue/100,
        value: vValue/100,
        cost: cValue/100,
        outcomes: oValue/100,
        diversity: dValue/100
      }
    })
  }

  const handleSliderChangesuccess = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      let diff = newValue - sValue;
      if (isInBounds(value, diff)) {
        setValue(value - (newValue - sValue))
        successsetValue(newValue);
      }
    }
    updateValues();
  };
 const handleSliderChangevalue = (event: Event, newValue: number| number[]) => {
    if (typeof newValue === 'number') {
      let diff = newValue - vValue;
      if (isInBounds(value, diff)) {
        setValue(value - (newValue - vValue))
        valuesetValue(newValue);
      }
    }
    updateValues();
  };
  const handleSliderChangecost = (event: Event, newValue: number| number[]) => {
    if (typeof newValue === 'number') {
      let diff = newValue - cValue;
      if (isInBounds(value, diff)) {
        setValue(value - (newValue - cValue))
        costsetValue(newValue);
      }
    }
    updateValues();
  };
  const handleSliderChangeoutcome = (event: Event, newValue: number| number[]) => {
    if (typeof newValue === 'number') {
      let diff = newValue - oValue;
      if (isInBounds(value, diff)) {
        setValue(value - (newValue - oValue))
        outcomessetValue(newValue);
      }
    }
    updateValues();
  };
  const handleSliderChangediversity = (event: Event, newValue: number| number[]) => {
    if (typeof newValue === 'number') {
      let diff = newValue - dValue;
      if (isInBounds(value, diff)) {
        setValue(value - (newValue - dValue))
        diversitysetValue(newValue);
      }
    }
    updateValues();
  };

return(
  <Box>
    <Typography sx={{fontFamily:'Poppins'}} gutterBottom>
      {value}
    </Typography>
    <Box sx={{ width: 500 }}>
      <Typography id="input-slider" gutterBottom sx={{fontFamily:'Poppins'}}>
        Success
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof sValue === 'number' ? sValue : 0}
            onChange={handleSliderChangesuccess}
            aria-labelledby="input-slider"
          />
        </Grid>
  
      </Grid>
    </Box>

    <Box sx={{ width: 500 }}>
      <Typography id="input-slider" gutterBottom sx={{fontFamily:'Poppins'}}>
        Value
      </Typography>
      <Grid container spacing={2} alignItems="center">
       
        <Grid item xs>
          <Slider
            value={typeof vValue === 'number' ? vValue : 0}
            onChange={handleSliderChangevalue}
            aria-labelledby="input-slider"
          />
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ width: 500 }}>
      <Typography id="input-slider" gutterBottom sx={{fontFamily:'Poppins'}}>
        Cost
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof cValue === 'number' ? cValue : 0}
            onChange={handleSliderChangecost}
            aria-labelledby="input-slider"
          />
        </Grid>
  
      </Grid>
    </Box>

    <Box sx={{ width: 500 }}>
      <Typography id="input-slider" gutterBottom sx={{fontFamily:'Poppins'}}>
        Outcome
      </Typography>
      <Grid container spacing={2} alignItems="center">
       
        <Grid item xs>
          <Slider
            value={typeof oValue === 'number' ? oValue : 0}
            onChange={handleSliderChangeoutcome}
            aria-labelledby="input-slider"
          />
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ width: 500 }}>
      <Typography id="input-slider" gutterBottom sx={{fontFamily:'Poppins'}}>
        Diversity
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof dValue === 'number' ? dValue : 0}
            onChange={handleSliderChangediversity}
            aria-labelledby="input-slider"
          />
        </Grid>
  
      </Grid>
    </Box>
    </Box>
 );
  };
