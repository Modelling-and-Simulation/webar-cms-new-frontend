import { useState, useEffect } from 'react';
import { ToastContainer } from "react-toastify";

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useRouter } from 'src/routes/hooks';

import useApi from 'src/hooks/useApi';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import SceneTableRow from '../scene-table-row';
import SceneTableHead from '../scene-table-head';
import TableEmptyRows from '../table-empty-rows';
import SceneTableToolbar from '../scene-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function ScenePage() {
  const router = useRouter();
  const { getAllScenes } = useApi();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('sceneName');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [scenes, setScenes] = useState([]);

  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllScenes();

      setScenes(response.data);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const handleClickNewScene = () => {
    router.push('/scenes/new');
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = scenes.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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

  const refreshContents = () => {
    setRefresh(!refresh);
  };

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <ToastContainer />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} >
        <Typography variant="h4">Scenes</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleClickNewScene}
        >
          New Scene
        </Button>
      </Stack>

      <Card>
        <SceneTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <SceneTableHead
                order={order}
                orderBy={orderBy}
                rowCount={scenes.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'sceneName', label: 'Name' },
                  { id: 'description', label: 'Description' },
                  { id: 'createdAt', label: 'Created at' },
                  { id: 'updatedAt', label: 'Updated at' },
                  { id: 'views', label: 'Views' },
                  { id: 'isEnabled', label: 'Enabled', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <SceneTableRow
                      key={row._id}
                      id={row._id}
                      name={row.sceneName}
                      description={row.description}
                      isEnabled={row.isEnabled}
                      createdAt={row.createdAt}
                      updatedAt={row.updatedAt}
                      views={row.views}
                      selected={selected.indexOf(row.sceneName) !== -1}
                      handleClick={(event) => handleClick(event, row.sceneName)}
                      refresh={refreshContents}
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
