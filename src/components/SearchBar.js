import React, { useState } from 'react'
import { Button, InputBase, makeStyles, Grid } from '@material-ui/core'

const useStyles = makeStyles({
  searchbar: {
    width: '100%',
    margin: '5px 0'
  },
  searchButton: {
    display: 'flex',
    width: '100%',
    margin: '5px 0'
  }
})

export const SearchBar = ({ onFilterSubmit }) => {
  const classes = useStyles()
  const [search, setSearch] = useState('')
  return (
    <Grid container justify="space-between">
      <Grid item xs={12} md={9} lg={10}>
        <InputBase
          className={classes.searchbar}
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Grid>
      <Grid item xs={3} md={3} lg={2}>
        <Button className={classes.searchButton} onClick={() => onFilterSubmit({ search })} variant="contained" color="primary">
          Search
        </Button>
      </Grid>
    </Grid>
  )
}
