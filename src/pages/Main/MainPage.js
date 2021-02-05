import React, { useEffect, useState } from 'react'
import { useFetch } from '../../api/useFetch'
import { LINKS } from '../../api/constants'
import { LeaguesTable } from './LeaguesTable'
import { SearchBar } from '../../components/SearchBar'
import { DateFilter } from '../../components/DateFilter'
import { Title } from '../../components/Title'
import { useHistory } from 'react-router-dom'
import { Grid, Paper, makeStyles, CircularProgress } from '@material-ui/core'
import { ObjectToQueryString } from '../../helpers/url'
import * as queryString from 'querystring'

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  paper: {
    width: '100%',
    padding: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    overflow: 'auto'
  },
  paperContainer: {
    display: 'flex',
    alignItems: 'center'
  }
}))

export const MainPage = () => {
  const classes = useStyles()
  const history = useHistory()
  const { data, isLoading, hasError, errorMessage } = useFetch(LINKS.COMPETITIONS_LINK)
  const [competitions, setCompetitions] = useState([])

  useEffect(() => {
    if (data) {
      setCompetitions(data.competitions)
      applyFilters()
    }
  }, [data])

  const applyFilters = () => {
    const parsed = queryString.parse(history.location.search.substr(1))
    let competitionsArray = data.competitions
    if (parsed.search !== undefined) {
      const searchTerm = String(parsed.search).toLowerCase()
      competitionsArray = competitionsArray.filter((competition) => {
        return (
          competition.name.toLowerCase().includes(searchTerm) ||
          competition.area.name.toLowerCase().includes(searchTerm) ||
          (competition.plan && competition.plan.toLowerCase().includes(searchTerm)) ||
          (competition.currentSeason?.startDate && competition.currentSeason.startDate.toLowerCase().includes(searchTerm)) ||
          (competition.currentSeason?.endDate && competition.currentSeason.endDate.toLowerCase().includes(searchTerm))
        )
      })
    }
    if (parsed.dateFrom !== undefined && parsed.dateTo !== undefined) {
      competitionsArray = competitionsArray.filter((competition) => {
        return (
          new Date(competition.currentSeason?.startDate).getTime() >= new Date(parsed.dateFrom).getTime() &&
          new Date(competition.currentSeason?.endDate).getTime() <= new Date(parsed.dateTo).getTime()
        )
      })
    }
    setCompetitions(competitionsArray)
  }

  const onFilterSubmit = (obj) => {
    const parsed = { ...queryString.parse(history.location.search.substr(1)), ...obj }
    history.push({
      search: ObjectToQueryString(parsed)
    })
    applyFilters()
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9} className={classes.paperContainer}>
        <Paper className={classes.paper}>
          <SearchBar onFilterSubmit={onFilterSubmit} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={classes.paper}>
          <DateFilter onFilterSubmit={onFilterSubmit} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Title>Leagues</Title>
          {hasError && <div>{errorMessage}</div>}
          {isLoading && <CircularProgress />}
          {data && <LeaguesTable leagues={competitions} />}
        </Paper>
      </Grid>
    </Grid>
  )
}
