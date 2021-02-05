import { Grid, Button, makeStyles } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import React, { useState } from 'react'
import { dateObjectToStringObject } from '../helpers/date'

const useStyles = makeStyles((theme) => ({
  datePickerConatiner: {
    justifyContent: 'space-evenly',
    flexdirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  },
  datePickers: {
    display: 'flex',
    justifyContent: 'space-evenly',
    maxWidth: '600px'
  }
}))

export const DateFilter = ({ onFilterSubmit, dateFrom, dateTo }) => {
  const classes = useStyles()
  const [selectedDate, setSelectedDate] = useState({
    dateFrom: dateFrom || new Date('2010-01-01T00:00:00Z'),
    dateTo: dateTo || new Date('2022-01-01T00:00:00Z')
  })

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={1} className={classes.datePickerConatiner}>
        <Grid container className={classes.datePickers}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd.MM.yyyy"
            label="from"
            margin="normal"
            value={selectedDate.dateFrom}
            onChange={(date) => {
              setSelectedDate({ ...selectedDate, dateFrom: date })
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            label="to"
            margin="normal"
            format="dd.MM.yyyy"
            value={selectedDate.dateTo}
            onChange={(date) => {
              setSelectedDate({ ...selectedDate, dateTo: date })
            }}
          />
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            margin="normal"
            disableElevation
            onClick={() => {
              onFilterSubmit(dateObjectToStringObject(selectedDate))
            }}
          >
            apply
          </Button>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  )
}
