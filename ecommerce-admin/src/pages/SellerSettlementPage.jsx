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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { settlementApi } from '../api/settlementApi';
import SettlementDetailModal from '../components/SettlementDetailModal';

const BANK_LIST = [
  '토스뱅크', '카카오뱅크', 'KB국민은행', '신한은행', '우리은행',
  '하나은행', 'NH농협은행', 'IBK기업은행', 'SC제일은행'
];

const statusBadge = {
  PENDING: { label: '정산 대기', color: 'warning' },
  CONFIRMED: { label: '정산 확정', color: 'info' },
  PAID: { label: '지급 완료', color: 'success' },
  CANCELED: { label: '정산 취소', color: 'error' }
};

export default function SellerSettlementPage() {
  const [settlements, setSettlements] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 모달 상태
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  // 계좌 폼
  const [accountForm, setAccountForm] = useState({
    bankName: '토스뱅크',
    accountNumber: '',
    accountHolder: ''
  });

  const fetchSettlements = async () => {
    try {
      const response = await settlementApi.getMySettlementList(page, rowsPerPage);
      setSettlements(response.data.content || []);
      setTotalElements(response.data.totalElements || 0);
    } catch (err) {
      console.error('정산 내역 조회 실패:', err);
    }
  };

  useEffect(() => {
    fetchSettlements();
  }, [page, rowsPerPage]);

  const handleOpenDetail = async (settlementNo) => {
    try {
      const res = await settlementApi.getSettlementDetail(settlementNo);
      setSelectedDetail(res.data);
      setDetailOpen(true);
    } catch (err) {
      alert('정산 상세 조회 실패: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleSaveAccount = async () => {
    if (!accountForm.bankName || !accountForm.accountNumber || !accountForm.accountHolder) {
      alert('모든 계좌 정보를 올바르게 입력해주세요.');
      return;
    }
    try {
      await settlementApi.registerAccount(accountForm);
      alert('정산 계좌가 정상 등록되었습니다.');
      setAccountModalOpen(false);
    } catch (err) {
      alert('계좌 등록 실패: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          판매자 정산 내역
        </Typography>
        <Button
          variant="contained"
          startIcon={<AccountBalanceIcon />}
          onClick={() => setAccountModalOpen(true)}
          sx={{ bgcolor: '#000', color: '#fff', '&:hover': { bgcolor: '#333' } }}
        >
          정산 입금 계좌 관리
        </Button>
      </Box>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead sx={{ bgcolor: '#fafafa' }}>
              <TableRow>
                <TableCell align="center">정산번호</TableCell>
                <TableCell align="center">정산 기준일</TableCell>
                <TableCell align="right">총 판매금액</TableCell>
                <TableCell align="right">플랫폼 수수료</TableCell>
                <TableCell align="right">PG 수수료</TableCell>
                <TableCell align="right">최종 실지급액</TableCell>
                <TableCell align="center">정산 상태</TableCell>
                <TableCell align="center">지급일시</TableCell>
                <TableCell align="center">상세보기</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {settlements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 5, color: 'text.secondary' }}>
                    정산 내역이 존재하지 않습니다.
                  </TableCell>
                </TableRow>
              ) : (
                settlements.map((row) => {
                  const badge = statusBadge[row.status] || { label: row.statusDescription || row.status, color: 'default' };
                  return (
                    <TableRow key={row.settlementNo} hover>
                      <TableCell align="center">{row.settlementNo}</TableCell>
                      <TableCell align="center">{row.settlementDate}</TableCell>
                      <TableCell align="right">{row.totalSalesAmount?.toLocaleString()}원</TableCell>
                      <TableCell align="right" sx={{ color: 'error.main' }}>
                        -{row.platformFeeAmount?.toLocaleString()}원
                      </TableCell>
                      <TableCell align="right" sx={{ color: 'error.main' }}>
                        -{row.pgFeeAmount?.toLocaleString()}원
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        {row.finalPayoutAmount?.toLocaleString()}원
                      </TableCell>
                      <TableCell align="center">
                        <Chip label={badge.label} color={badge.color} size="small" />
                      </TableCell>
                      <TableCell align="center">
                        {row.paidAt ? row.paidAt.replace('T', ' ').substring(0, 16) : '-'}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleOpenDetail(row.settlementNo)}
                        >
                          상세
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

      <Dialog open={accountModalOpen} onClose={() => setAccountModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight="bold">정산 계좌 등록 / 변경</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              select
              label="은행 선택"
              fullWidth
              value={accountForm.bankName}
              onChange={(e) => setAccountForm({ ...accountForm, bankName: e.target.value })}
            >
              {BANK_LIST.map((bank) => (
                <MenuItem key={bank} value={bank}>{bank}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="계좌번호 (- 제외)"
              fullWidth
              placeholder="예: 100212345678"
              value={accountForm.accountNumber}
              onChange={(e) => setAccountForm({ ...accountForm, accountNumber: e.target.value })}
            />
            <TextField
              label="예금주명"
              fullWidth
              placeholder="예: 홍길동"
              value={accountForm.accountHolder}
              onChange={(e) => setAccountForm({ ...accountForm, accountHolder: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setAccountModalOpen(false)} color="inherit">취소</Button>
          <Button onClick={handleSaveAccount} variant="contained" sx={{ bgcolor: '#000', color: '#fff' }}>
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
