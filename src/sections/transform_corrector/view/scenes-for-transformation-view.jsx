import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useRouter } from 'src/routes/hooks';

import useApi from 'src/hooks/useApi';

import Scrollbar from 'src/components/scrollbar';

import TableRow from '../table-row';
import TableHead from '../table-head';
import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import SceneTableToolbar from '../table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function ScenesForTransformationView() {
    const router = useRouter();
    const { getScenesForTransformation } = useApi();

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('updatedAt');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [scenes, setScenes] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const response = await getScenesForTransformation();

            setScenes(response.data);
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    const handleClick = (event, scene) => {
        router.push(`/transformations/${scene._id}`);
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
        inputData: scenes,
        comparator: getComparator(order, orderBy),
        filterName,
        filterBy: 'sceneName',
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} >
                <Typography variant="h4">For Transformations</Typography>
            </Stack>

            <Card>
                <SceneTableToolbar
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead
                                order={order}
                                orderBy={orderBy}
                                rowCount={scenes.length}
                                onRequestSort={handleSort}
                                headLabel={[
                                    { id: 'sceneName', label: 'Name' },
                                    { id: 'description', label: 'Description' },
                                    { id: 'createdAt', label: 'Created at' },
                                    { id: 'updatedAt', label: 'Updated at' },
                                    { id: 'noOfTargets', label: '#Targets' },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow
                                            key={row._id}
                                            name={row.sceneName}
                                            description={row.description}
                                            createdAt={row.createdAt}
                                            updatedAt={row.updatedAt}
                                            noOfTargets={row.targetsAndContents?.length}
                                            handleClick={(event) => handleClick(event, row)}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(page, rowsPerPage, scenes.length)}
                                />

                                {notFound && <TableNoData query={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    page={page}
                    component="div"
                    count={scenes.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Container>
    );
}
