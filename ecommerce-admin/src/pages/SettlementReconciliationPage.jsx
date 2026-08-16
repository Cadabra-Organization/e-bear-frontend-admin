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
  TextField,
  Stack,
  Card,
  CardContent,
  Grid,
  Alert,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { settlementApi } from '../api/settlementApi';

export default function SettlementReconciliationPage() {
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [reconciliation, setReconciliation] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReconciliation = async () => {
    setLoading(true);
    try {
      const res = await settlementApi.getReconciliation(startDate, endDate, 'TOSS');
      setReconciliation(res.data);
    } catch (err) {
      console.error('대사 내역 조회 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReconciliation();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        PG사 정산 대사(Reconciliation) 모니터링
      </Typography>

      <Paper sx={{ p: 2, mb: 3, bgcolor: '#f8f9fa' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            type="date"
            size="small"
            label="대사 시작일"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            type="date"
            size="small"
            label="대사 종료일"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={fetchReconciliation}
            disabled={loading}
            sx={{ bgcolor: '#000', color: '#fff', '&:hover': { bgcolor: '#333' } }}
          >
            {loading ? '조회 중...' : '대사 실행 및 조회'}
          </Button>
        </Stack>
      </Paper>

      {reconciliation && (
        <>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Card variant="outlined">
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography color="text.secondary" variant="body2">총 PG 거래 건수</Typography>
                    <CompareArrowsIcon color="primary" />
                  </Stack>
                  <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                    {reconciliation.totalPgTransactions}건
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    PG 총 거래액: {reconciliation.totalPgAmount?.toLocaleString()}원
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Card variant="outlined" sx={{ borderLeft: '4px solid #2e7d32' }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography color="text.secondary" variant="body2">DB 일치 건수</Typography>
                    <CheckCircleOutlineIcon color="success" />
                  </Stack>
                  <Typography variant="h4" color="success.main" fontWeight="bold" sx={{ mt: 1 }}>
                    {reconciliation.matchedCount}건
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    정상 대사 완료
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Card variant="outlined" sx={{ borderLeft: reconciliation.unmatchedCount > 0 ? '4px solid #d32f2f' : '1px solid #e0e0e0' }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography color="text.secondary" variant="body2">불일치(이상) 건수</Typography>
                    <WarningAmberIcon color={reconciliation.unmatchedCount > 0 ? 'error' : 'disabled'} />
                  </Stack>
                  <Typography variant="h4" color={reconciliation.unmatchedCount > 0 ? 'error.main' : 'text.primary'} fontWeight="bold" sx={{ mt: 1 }}>
                    {reconciliation.unmatchedCount}건
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    확인 및 조치 필요
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1.5 }}>
            대사 불일치 내역
          </Typography>

          {reconciliation.discrepancies?.length === 0 ? (
            <Alert severity="success" sx={{ mb: 3 }}>
              조회 기간 동안 PG사와 DB 결제 데이터 간의 불일치 건이 없습니다.
            </Alert>
          ) : (
            <Paper sx={{ width: '100%', mb: 3 }}>
              <TableContainer>
                <Table size="small">
                  <TableHead sx={{ bgcolor: '#ffebee' }}>
                    <TableRow>
                      <TableCell align="center">주문번호</TableCell>
                      <TableCell align="center">PG 결제키 (paymentKey)</TableCell>
                      <TableCell align="right">DB 결제금액</TableCell>
                      <TableCell align="right">PG 결제금액</TableCell>
                      <TableCell>불일치 사유</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reconciliation.discrepancies.map((item, idx) => (
                      <TableRow key={idx} hover>
                        <TableCell align="center">{item.orderId || '-'}</TableCell>
                        <TableCell align="center" sx={{ fontFamily: 'monospace' }}>{item.paymentKey || '-'}</TableCell>
                        <TableCell align="right">{item.dbAmount ? `${item.dbAmount.toLocaleString()}원` : '데이터 없음'}</TableCell>
                        <TableCell align="right">{item.pgAmount ? `${item.pgAmount.toLocaleString()}원` : '-'}</TableCell>
                        <TableCell>
                          <Chip label={item.reason} color="error" size="small" variant="outlined" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </>
      )}
    </Box>
  );
}
