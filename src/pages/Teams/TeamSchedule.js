import { CircularProgress, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, makeStyles } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../../api/useFetch'
import { LINKS } from '../../api/constants'
import { underscoreTextNormalizer } from '../../helpers/text'

const useStyles = makeStyles({
  table: {
    marginTop: 70
  },
  info: {
    margin: '30px auto 0 auto'
  }
})

export const TeamSchedule = ({ dateFrom, dateTo, id }) => {
  const classes = useStyles()
  const { data, isLoading, hasError, errorMessage } = useFetch(LINKS.TEAM_MATCHES_LINK(id), { dateFrom, dateTo })

  const checkWinner = (match) => {
    const winner = match.score.winner
    if (winner != null) {
      if (
        (winner.toLowerCase().includes('home') && match.homeTeam.id == id) ||
        (winner.toLowerCase().includes('away') && match.awayTeam.id == id)
      ) {
        return 'Win'
      }
      if (winner.toLowerCase().includes('draw')) {
        return 'Draw'
      }
      return 'Lose'
    }
    return
  }

  return (
    <>
      {hasError && <div className={classes.info}>{errorMessage}</div>}
      {isLoading && (
        <div className={classes.info}>
          <CircularProgress />
        </div>
      )}
      {data && (
        <TableContainer>
          <Table className={classes.table} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>Opposite Team</TableCell>
                <TableCell align="right">Result</TableCell>
                <TableCell align="right">Competition</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.matches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell component="th" scope="row">
                    <Link to={`/Teams/${match.awayTeam.id !== id ? match.awayTeam.id : match.homeTeam.id}`}>
                      {match.awayTeam.id !== id ? match.awayTeam.name : match.homeTeam.name}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{checkWinner(match)}</TableCell>
                  <TableCell align="right">{match.competition?.name && match.competition.name}</TableCell>
                  <TableCell align="right">{(new Date(match.utcDate)).toLocaleDateString()}</TableCell>
                  <TableCell align="right">{match.status &&  underscoreTextNormalizer(match.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
