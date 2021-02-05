import { makeStyles, CircularProgress, Grid, Paper, CardMedia, Divider, Link } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useFetch } from '../../api/useFetch'
import { LINKS } from '../../api/constants'
import { Title } from '../../components/Title'
import { DateFilter } from '../../components/DateFilter'
import { TeamSchedule } from './TeamSchedule'
import { httpToHttps, ObjectToQueryString } from '../../helpers/url'
import * as queryString from 'querystring'
import PlaceIcon from '@material-ui/icons/Place'
import LanguageIcon from '@material-ui/icons/Language'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import { Squad } from './Squad'
import { removeDuplicateById } from '../../helpers/array'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    lineBreak: 'anywhere',
    '& > *': {
      display: 'flex'
    }
  },
  roleText: {
    fontWeight: 'bold',
    fontSize: '.8rem'
  },
  roleContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  nameContainer: {
    fontSize: '.7rem',
    margin: 0,
    display: 'block'
  },
  media: {
    margin: theme.spacing(2),
    backgroundSize: '100% 100%',
    height: 200
  },
  filter: {
    display: 'flex',
    flexDirection: 'column'
  },
  divider: {
    margin: theme.spacing(5)
  }
}))

export const Team = () => {
  const { id } = useParams()
  const { data, isLoading, hasError, errorMessage } = useFetch(LINKS.TEAM_LINK(id))
  const [scheduleParams, setScheduleParams] = useState({})
  const classes = useStyles()
  const history = useHistory()

  useEffect(() => {
    if (data) {
      applyFilters()
    }
  }, [data])

  const applyFilters = () => {
    const parsed = queryString.parse(history.location.search.substr(1))
    setScheduleParams(parsed)
  }

  const onFilterSubmit = (obj) => {
    history.push({
      search: ObjectToQueryString(obj)
    })
    applyFilters()
  }

  return (
    <div>
      {isLoading && <CircularProgress />}
      {hasError && <div>{errorMessage}</div>}
      {data && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper className={classes.paper}>
              <CardMedia className={classes.media} image={httpToHttps(data?.crestUrl)} title={data?.name} />
              <Title>{data?.name}</Title>
              <div>
                <LocationCityIcon fontSize="small"></LocationCityIcon>
                {data?.venue}
              </div>
              <div display="flex">
                <PlaceIcon fontSize="small"></PlaceIcon>
                {data?.address}
              </div>
              <div>
                <LanguageIcon fontSize="small"></LanguageIcon>
                <Link href={`${httpToHttps(data?.website)}`} target="blank">
                  {httpToHttps(data?.website)}
                </Link>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper className={classes.paper}>
              <Title>{data?.shortName}`s Squad</Title>
              <Squad squad={removeDuplicateById(data?.squad)} />
              <Divider variant="middle" className={classes.divider} />
              <div className={classes.filter}>
                <Title>Team Schedule</Title>
                <DateFilter dateFrom={new Date('2020-01-01T00:00:00.000Z')} onFilterSubmit={onFilterSubmit} />
                {scheduleParams.dateFrom && scheduleParams.dateTo && id && (
                  <TeamSchedule dateFrom={scheduleParams.dateFrom} dateTo={scheduleParams.dateTo} id={id} />
                )}
              </div>
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  )
}
