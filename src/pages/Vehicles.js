import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Vehicles({list}) {
    // return <pre>List {JSON.stringify(list, null, 4)}</pre>
    return    <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell align="right">Brand</TableCell>
          <TableCell align="right">Model</TableCell>
          <TableCell align="right">Owner</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {list.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell align="right">{row.brand}</TableCell>
            <TableCell align="right">{row.model}</TableCell>
            <TableCell align="right">{row.ownerId}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}

Vehicles.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/vehicles/');
    const json = await res.json();
    return {
        list: json
    };
}