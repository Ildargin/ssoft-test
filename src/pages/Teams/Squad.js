import { Typography, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  roleText: {
    fontWeight: 'bold',
    fontSize: '.8rem'
  },
  roleContainer: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    '& > *': {
      minWidth: '100px',
      margin: theme.spacing(1)
    }
  },
  nameContainer: {
    fontSize: '.7rem',
    margin: 0,
    display: 'block'
  }
}))

export const Squad = ({ squad }) => {
  const classes = useStyles()
  return (
    <div className={classes.roleContainer}>
      <div>
        <Typography className={classes.roleText} variant="subtitle1">
          Goalkeeper
        </Typography>
        {squad
          .filter((pos) => pos.position === 'Goalkeeper')
          .map((man) => (
            <div className={classes.nameContainer} key={man.id}>
              {man.name}
            </div>
          ))}
      </div>
      <div>
        <Typography className={classes.roleText} variant="subtitle1">
          Defender
        </Typography>
        {squad
          .filter((pos) => pos.position === 'Defender')
          .map((man) => (
            <div className={classes.nameContainer} key={man.id}>
              {man.name}
            </div>
          ))}
      </div>
      <div>
        <Typography className={classes.roleText} variant="subtitle1">
          Midfielder
        </Typography>
        {squad
          .filter((pos) => pos.position === 'Midfielder')
          .map((man) => (
            <div className={classes.nameContainer} key={man.id}>
              {man.name}
            </div>
          ))}
      </div>
      <div>
        <Typography className={classes.roleText} variant="subtitle1">
          Forvard
        </Typography>
        {squad
          .filter((pos) => pos.position === 'Attacker')
          .map((man) => (
            <div className={classes.nameContainer} key={man.id}>
              {man.name}
            </div>
          ))}
      </div>
      <div>
        {squad
          .filter((rl) => rl.role === 'COACH')
          .map((man) => (
            <div key={man.id}>
              <Typography className={classes.roleText} variant="subtitle1">
                Manager:
              </Typography>
              <div className={classes.nameContainer}>{man.name}</div>
            </div>
          ))}
      </div>
    </div>
  )
}
