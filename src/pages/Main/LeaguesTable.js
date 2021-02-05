import React from 'react'
import { underscoreTextNormalizer } from '../../helpers/text'
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Link } from '@material-ui/core'

export const LeaguesTable = ({ leagues }) => {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Competition</TableCell>
            <TableCell>Area</TableCell>
            <TableCell>Plan</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leagues.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <Link href={`/Leagues/${row.id}`}>{row.name}</Link>
              </TableCell>
              <TableCell>{row.area?.name && row.area.name}</TableCell>
              <TableCell>{row.plan && underscoreTextNormalizer(row.plan)}</TableCell>
              <TableCell>{row.currentSeason?.startDate && new Date(row.currentSeason.startDate).toLocaleDateString()}</TableCell>
              <TableCell>{row.currentSeason?.endDate && new Date(row.currentSeason.endDate).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
