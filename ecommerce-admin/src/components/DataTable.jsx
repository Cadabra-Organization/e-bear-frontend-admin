import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ width: 30, minWidth: 30 }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              width: headCell.width,
              minWidth: headCell.width,
              maxWidth: headCell.width,
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  headCells: PropTypes.array.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, pageInfo } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {pageInfo?.pageType || '목록'}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}


export default function EnhancedTable ({ pageInfo, headCells, rows }) {
  const [order, setOrder] = React.useState('asc'); //정렬방향
  const [orderBy, setOrderBy] = React.useState('num'); //정렬기준
  const [selected, setSelected] = React.useState([]); //체크박스 선택값
  const [page, setPage] = React.useState(0); //현재 페이지 번호
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10); //페이지당 표시 갯수
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [searchCondition, setSearchCondition] = React.useState('all');
  const [searchText, setSearchText] = React.useState(''); 
  const searchOptions = pageInfo?.searchList 
    ? Object.entries(pageInfo.searchList) 
    : [];
  
  const handleSearchConditionChange = (event) => {
    setSearchCondition(event.target.value);
  };
  
  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.num);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // 데이터 가공 및 렌더링
  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), //현재페이지에 해당하는 데이터만 잘라냄
    [order, orderBy, page, rowsPerPage, rows],
  );
  const pageCount = Math.ceil(rows.length / rowsPerPage);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} pageInfo={pageInfo} />
        <LocalizationProvider 
          dateAdapter={AdapterDayjs}
          dateFormats={{ keyboardDate: 'YYYY-MM-DD' }}
        >
          <Box
            sx={{ 
              p: 2, 
              borderBottom: '1px solid #eee', 
              display: 'flex',
              gap: 2, 
              alignItems: 'center', 
              flexWrap: 'wrap'
            }}
          >
            <DatePicker 
              label="시작일" 
              value={startDate} 
              onChange={(newValue) => setStartDate(newValue)} 
              slotProps={{ textField: { size: 'small', sx: { width: 180 } } }}
            />
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              ~
            </Typography>
            <DatePicker 
              label="종료일" 
              value={endDate} 
              onChange={(newValue) => setEndDate(newValue)} 
              slotProps={{ textField: { size: 'small', sx: { width: 180 } } }}
            />
          <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
            <InputLabel id="demo-select-small-label">조건</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={searchCondition}
              label="조건"
              onChange={handleSearchConditionChange}
            >
              {searchOptions.map(([valueKey, labelName]) => (
                <MenuItem 
                  key={valueKey}
                  value={valueKey}       
                >
                  {labelName}             
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField 
            size="small" 
            id="outlined-basic" 
            label="내용" 
            placeholder='내용을 입력하세요.' 
            value={searchText} 
            onChange={handleSearchTextChange} 
          />
          <Button 
            variant="contained" 
            size="medium"
            sx={{
              backgroundColor: '#000000', 
              color: '#FFFFFF',          
              '&:hover': {               
                backgroundColor: '#959595ff', 
              },
            }}>
            검색
          </Button>
          <Button 
            variant="contained" 
            size="medium"
            sx={{
              marginLeft: 'auto',
              backgroundColor: '#000000', 
              color: '#FFFFFF',         
              '&:hover': {               
                backgroundColor: '#959595ff', 
              },
            }}>
            글쓰기
          </Button>
          </Box>
        </LocalizationProvider>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.num);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.num}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={(event) => handleClick(event, row.num)}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {headCells.map((headCell, cellIndex) => (
                      <TableCell 
                            key={headCell.id} 
                            // 첫 번째 셀 (번호)에만 scope="row"와 component="th"를 적용
                            component={cellIndex === 0 ? "th" : "td"}
                            scope={cellIndex === 0 ? "row" : undefined}
                            id={cellIndex === 0 ? labelId : undefined}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            align={headCell.align || 'left'}
                            sx={{
                                width: headCell.width,
                                minWidth: headCell.width,
                                maxWidth: headCell.width,
                            }}
                        >
                            {row[headCell.id]} 
                        </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2} sx={{ 
          mt: 2, 
          p: 2, 
          alignItems: 'center' 
        }}>
          <Pagination 
            count={pageCount}
            page={page + 1}
            onChange={handleChangePage}
            showFirstButton 
            showLastButton 
          />
        </Stack>
    </Paper>
      
    </Box>
  );
}

EnhancedTable.propTypes = {
  pageInfo: PropTypes.shape({
    pageType: PropTypes.string,
  }),
  rows: PropTypes.array.isRequired,
};

EnhancedTable.defaultProps = {
  pageInfo: null,
  rows: [],
};
