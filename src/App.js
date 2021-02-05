import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { MainPage } from './pages/Main/MainPage'
import { Teams } from './pages/Teams/Teams'
import { Team } from './pages/Teams/Team'
import { League } from './pages/Main/League'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import { makeStyles, CssBaseline, Container } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    textDecoration: 'none'
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  appBarSpacer: theme.mixins.toolbar
}))

export const App = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navigation />
      <main className={classes.content}>
        <div className={classes.appBarSpacer}></div>
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route path="/" component={MainPage} exact />
            <Route path="/Leagues/:id" component={League} />
            <Route path="/Teams" component={Teams} exact />
            <Route path="/Teams/:id" component={Team} />
          </Switch>
        </Container>
        <Footer />
      </main>
    </div>
  )
}
