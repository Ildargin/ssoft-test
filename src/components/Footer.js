import { Typography, Link } from '@material-ui/core'
import React from 'react'

export const Footer = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://github.com/ildargin">
      Ildargin
    </Link>
    {` ${new Date().getFullYear()} .`}
  </Typography>
)
