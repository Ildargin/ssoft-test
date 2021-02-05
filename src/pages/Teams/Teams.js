import React from 'react'
import { useFetch } from '../../api/useFetch'
import { LINKS } from '../../api/constants'
import { TeamCard } from './TeamsCard'
import { makeStyles, CircularProgress, Container } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(2)
    }
  },
  container: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

export const Teams = () => {
  const fetchedData = useFetch(LINKS.TEAMS_LINK)
  const classes = useStyles()
  return (
    <Container className={classes.container}>
      {fetchedData.hasError && <div>...error</div>}
      {fetchedData.isLoading && <CircularProgress />}
      {fetchedData.data && (
        <div className={classes.root}>
          {fetchedData.data.teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}
    </Container>
  )
}
