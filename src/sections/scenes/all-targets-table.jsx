import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from './table-no-data';
import DataTableRow from './data-table-row';
import DataTableHead from './data-table-head';
import TableEmptyRows from './table-empty-rows';
import DataTableToolbar from './data-table-toolbar';
import { emptyRows, applyFilter, getComparator } from './utils';

// ----------------------------------------------------------------------

export default function AllTargetsTable({ selected, setSelected, targets, isLoading }) {
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('targetName');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    const handleClick = (event, item) => {
        setSelected(item);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const dataFiltered = applyFilter({
        inputData: targets,
        comparator: getComparator(order, orderBy),
        filterName,
        filterBy: 'targetName',
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <Container disableGutters>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="h5">Targets</Typography>
            </Stack>

            {isLoading ? <CircularProgress color='inherit' /> :

                <Card>
                    <DataTableToolbar
                        numSelected={0}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    />

                    <Scrollbar>
                        <TableContainer sx={{ overflow: 'unset' }}>
                            <Table sx={{ minWidth: 800 }}>
                                <DataTableHead
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleSort}
                                    headLabel={[
                                        { id: 'targetName', label: 'Name', width: 250 },
                                        { id: 'description', label: 'Description' },
                                    ]}
                                />
                                <TableBody>
                                    {dataFiltered
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <DataTableRow
                                                key={row._id}
                                                id={row._id}
                                                preview={row.targetImage}
                                                name={row.targetName}
                                                description={row.description}
                                                isSelected={selected?.targetName === row?.targetName}
                                                handleClick={(event) => handleClick(event, row)}
                                                data={row}
                                            />
                                        ))}

                                    <TableEmptyRows
                                        height={77}
                                        emptyRows={emptyRows(page, rowsPerPage, targets.length)}
                                    />

                                    {notFound && <TableNoData query={filterName} />}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        page={page}
                        component="div"
                        count={targets.length}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        rowsPerPageOptions={[5, 10, 25]}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            }
        </Container>
    );
}

AllTargetsTable.propTypes = {
    selected: PropTypes.object,
    setSelected: PropTypes.func,
    targets: PropTypes.array,
    isLoading: PropTypes.bool
};
