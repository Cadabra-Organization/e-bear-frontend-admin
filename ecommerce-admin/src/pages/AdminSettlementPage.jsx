import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { settlementApi } from '../api/settlementApi';
import SettlementDetailModal from '../components/SettlementDetailModal';

const statusBadge = {
  PENDING: { label: '정산 대기', color: 'warning' },
  CONFIRMED: { label: '정산 확정', color: 'info' },
  PAID: { label: '지급 완료', color: 'success' },
  CANCELED: { label: '정산 취소', color: 'error' }
};

export default function AdminSettlementPage() {
  const [settlements, setSettlements] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [targetDate, setTargetDate] = useState('');

  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const fetchSettlements = async () => {
    try {
      const response = await settlementApi.getAllSettlements(statusFilter, page, rowsPerPage);
      setSettlements(response.data.content || []);
      setTotalElements(response.data.totalElements || 0);
    } catch (err) {
      console.error('관리자 정산 목록 조회 실패:', err);
    }
  };

  useEffect(() => {
    fetchSettlements();
  }, [page, rowsPerPage, statusFilter]);

  const handleExecuteSettlement = async () => {
    if (!window.confirm(`정산 집계를 실행하시겠습니까? ${targetDate ? `(기준일: ${targetDate})` : '(금일 기준)'}`)) {
      return;
    }
    try {
      const res = await settlementApi.executeSettlement(targetDate || null);
      alert(`정산 집계 완료: 총 ${res.data.createdSettlementsCount}건의 판매자 정산이 생성되었습니다.`);
      fetchSettlements();
    } catch (err) {
      alert('정산 실행 실패: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleConfirm = async (settlementNo) => {
    if (!window.confirm(`No.${settlementNo} 정산 내역을 확정하시겠습니까?`)) return;
    try {
      await settlementApi.confirmSettlement(settlementNo);
      alert('정산이 확정되었습니다.');
      fetchSettlements();
    } catch (err) {
      alert('정산 확정 실패: ' + (err.response?.data?.message || err.message));
    }
  };

  const handlePayout = async (settlementNo) => {
    if (!window.confirm(`No.${settlementNo} 건에 대해 PG사(토스) 지급 대행을 실행하시겠습니까?`)) return;
    try {
      const res = await settlementApi.completePayout(settlementNo);
      alert(`지급 대행 완료!\n지급번호: ${res.data.payoutId}\n지급금액: ${res.data.amount.toLocaleString()}원`);
      fetchSettlements();
    } catch (err) {
      alert('지급 대행 실패: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleOpenDetail = async (settlementNo) => {
    try {
      const res = await settlementApi.getSettlementDetail(settlementNo);
      setSelectedDetail(res.data);
      setDetailOpen(true);
    } catch (err) {
      alert('상세 조회 실패: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        관리자 정산 총괄 관리
      </Typography>

      <Paper sx={{ p: 2, mb: 3, bgcolor: '#f8f9fa' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              type="date"
              size="small"
              label="정산 기준일자"
              InputLabelProps={{ shrink: true }}
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlayArrowIcon />}
              onClick={handleExecuteSettlement}
            >
              수동 정산 생성
            </Button>
          </Stack>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>정산 상태 필터</InputLabel>
            <Select
              value={statusFilter}
              label="정산 상태 필터"
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(0);
              }}
            >
              <MenuItem value="ALL">전체 상태</MenuItem>
              <MenuItem value="PENDING">정산 대기</MenuItem>
              <MenuItem value="CONFIRMED">정산 확정</MenuItem>
              <MenuItem value="PAID">지급 완료</MenuItem>
              <MenuItem value="CANCELED">정산 취소</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 900 }}>
            <TableHead sx={{ bgcolor: '#fafafa' }}>
              <TableRow>
                <TableCell align="center">번호</TableCell>
                <TableCell align="center">판매자명</TableCell>
                <TableCell align="center">정산 기준일</TableCell>
                <TableCell align="right">총 판매액</TableCell>
                <TableCell align="right">수수료 합계</TableCell>
                <TableCell align="right">최종 지급액</TableCell>
                <TableCell align="center">상태</TableCell>
                <TableCell align="center">관리자 조치</TableCell>
                <TableCell align="center">상세</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {settlements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 5, color: 'text.secondary' }}>
                    조회된 정산 내역이 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                settlements.map((row) => {
                  const badge = statusBadge[row.status] || { label: row.statusDescription || row.status, color: 'default' };
                  return (
                    <TableRow key={row.settlementNo} hover>
                      <TableCell align="center">{row.settlementNo}</TableCell>
                      <TableCell align="center" sx={{ fontWeight: '600' }}>
                        {row.sellerName} (ID:{row.sellerNo})
                      </TableCell>
                      <TableCell align="center">{row.settlementDate}</TableCell>
                      <TableCell align="right">{row.totalSalesAmount?.toLocaleString()}원</TableCell>
                      <TableCell align="right" sx={{ color: 'error.main' }}>
                        {((row.platformFeeAmount || 0) + (row.pgFeeAmount || 0))?.toLocaleString()}원
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        {row.finalPayoutAmount?.toLocaleString()}원
                      </TableCell>
                      <TableCell align="center">
                        <Chip label={badge.label} color={badge.color} size="small" />
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          {row.status === 'PENDING' && (
                            <Button
                              size="small"
                              variant="outlined"
                              color="info"
                              startIcon={<CheckCircleIcon />}
                              onClick={() => handleConfirm(row.settlementNo)}
                            >
                              확정
                            </Button>
                          )}
                          {row.status === 'CONFIRMED' && (
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              startIcon={<PaymentIcon />}
                              onClick={() => handlePayout(row.settlementNo)}
                            >
                              지급 실행
                            </Button>
                          )}
                          {row.status === 'PAID' && (
                            <Typography variant="caption" color="text.secondary">
                              지급 완료
                            </Typography>
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          variant="text"
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleOpenDetail(row.settlementNo)}
                        >
                          보기
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalElements}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>

      <SettlementDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        detailData={selectedDetail}
      />
    </Box>
  );
}
