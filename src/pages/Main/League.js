import React from 'react'
import { underscoreTextNormalizer } from '../../helpers/text'
import { useFetch } from '../../api/useFetch'
import { LINKS } from '../../api/constants'
import { useParams } from 'react-router'
import { Title } from '../../components/Title'
import { LeagueStanding } from './LeagueStanding'
import { Grid, Paper, makeStyles, CircularProgress, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  formControl: {
    minWidth: 300
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.grey[800]
  },
  error: {
    textAlign: 'center'
  }
}))

export const League = () => {
  const classes = useStyles()
  const { id } = useParams()
  const fetchedLeague = useFetch(LINKS.COMPETITION_LINK(id))
  const fetchedStandings = useFetch(LINKS.COMPETITION_STANDINGS(id))

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={12} md={3}>
        {fetchedLeague.isLoading && <CircularProgress />}
        {fetchedLeague.data && (
          <Paper className={classes.paper}>
            <Title>{fetchedLeague.data.name && fetchedLeague.data.name}</Title>
            <Typography variant="subtitle1">Area:</Typography>
            <Typography variant="subtitle2">{fetchedLeague.data.area.name && fetchedLeague.data.area.name}</Typography>
            <Typography variant="subtitle1">Plan:</Typography>
            <Typography variant="subtitle2">{underscoreTextNormalizer(fetchedLeague.data.plan)}</Typography>
            <Typography variant="subtitle1">Seasons:</Typography>
            {fetchedLeague.data.seasons.map(({ id, startDate, endDate }) => (
              <Typography key={id} variant="subtitle2">{`from ${new Date(startDate).toLocaleDateString()} to ${new Date(
                endDate
              ).toLocaleDateString()}`}</Typography>
            ))}
          </Paper>
        )}
      </Grid>
      <Grid item xs={12} md={9}>
        {fetchedStandings.isLoading && <CircularProgress />}
        {fetchedStandings.data && (
          <Paper className={classes.paper}>
            <Title>Standings</Title>
            <LeagueStanding standings={fetchedStandings.data.standings} />
          </Paper>
        )}
      </Grid>
      {(fetchedStandings.hasError || fetchedLeague.hasError) && (
        <Typography align="center">
          Error: {fetchedStandings.errorMessage} (example of <a href={`/Leagues/2000`}>working page</a>).
        </Typography>
      )}
    </Grid>
  )
}
