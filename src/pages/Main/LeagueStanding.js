import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { useState } from 'react'
import { underscoreTextNormalizer } from '../../helpers/text'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

export const LeagueStanding = ({ standings }) => {
  return (
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Stage</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Group</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {standings.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Row = ({ row }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {underscoreTextNormalizer(row.stage).replace('Stage', '')}
        </TableCell>
        <TableCell>{underscoreTextNormalizer(row.type)}</TableCell>
        <TableCell align="left ">{underscoreTextNormalizer(row.group).replace('Group', '')}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Pos</TableCell>
                    <TableCell>Team</TableCell>
                    <TableCell>Played Games</TableCell>
                    <TableCell>W</TableCell>
                    <TableCell>L</TableCell>
                    <TableCell>Points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.table.map((TeamInfo) => (
                    <TableRow key={TeamInfo.position && TeamInfo.position}>
                      <TableCell component="th" scope="row">
                        {TeamInfo.position && TeamInfo.position}
                      </TableCell>
                      <TableCell>{TeamInfo.team.name && TeamInfo.team.name}</TableCell>
                      <TableCell>{TeamInfo.playedGames && TeamInfo.playedGames}</TableCell>
                      <TableCell>{TeamInfo.won && TeamInfo.won}</TableCell>
                      <TableCell>{TeamInfo.lost && TeamInfo.lost}</TableCell>
                      <TableCell>{TeamInfo.points && TeamInfo.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
