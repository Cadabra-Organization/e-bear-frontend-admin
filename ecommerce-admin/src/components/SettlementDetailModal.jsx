import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Grid
} from '@mui/material';

const statusMap = {
  PENDING: { label: '정산 대기', color: 'warning' },
  CONFIRMED: { label: '정산 확정', color: 'info' },
  PAID: { label: '지급 완료', color: 'success' },
  CANCELED: { label: '정산 취소', color: 'error' }
};

export default function SettlementDetailModal({ open, onClose, detailData }) {
  if (!detailData || !detailData.summary) return null;

  const { summary, items = [] } = detailData;
  const statusInfo = statusMap[summary.status] || { label: summary.statusDescription || summary.status, color: 'default' };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          정산 상세 내역 (No. {summary.settlementNo})
        </Typography>
        <Chip label={statusInfo.label} color={statusInfo.color} size="small" />
      </DialogTitle>
      
      <DialogContent dividers>
        {/* 요약 카드 */}
        <Box sx={{ mb: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary">판매자명</Typography>
              <Typography variant="subtitle1" fontWeight="bold">{summary.sellerName || '-'}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary">정산 기준일자</Typography>
              <Typography variant="subtitle1" fontWeight="bold">{summary.settlementDate || '-'}</Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="body2" color="text.secondary">총 판매금액</Typography>
              <Typography variant="body1" fontWeight="600">{summary.totalSalesAmount?.toLocaleString()}원</Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="body2" color="text.secondary">플랫폼 수수료</Typography>
              <Typography variant="body1" color="error.main">-{summary.platformFeeAmount?.toLocaleString()}원</Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="body2" color="text.secondary">PG 결제 수수료</Typography>
              <Typography variant="body1" color="error.main">-{summary.pgFeeAmount?.toLocaleString()}원</Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="body2" color="text.secondary">최종 실지급액</Typography>
              <Typography variant="h6" color="primary.main" fontWeight="bold">
                {summary.finalPayoutAmount?.toLocaleString()}원
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5 }}>
          정산 대상 주문 상품 목록 ({items.length}건)
        </Typography>

        {/* 상세 아이템 목록 */}
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead sx={{ bgcolor: '#f1f3f5' }}>
              <TableRow>
                <TableCell align="center">주문번호</TableCell>
                <TableCell>상품명 / 옵션</TableCell>
                <TableCell align="center">수량</TableCell>
                <TableCell align="right">판매단가</TableCell>
                <TableCell align="right">총 주문금액</TableCell>
                <TableCell align="right">수수료(플랫폼+PG)</TableCell>
                <TableCell align="right">정산 대상액</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.settlementItemNo} hover>
                  <TableCell align="center" sx={{ fontSize: '0.85rem' }}>
                    {item.orderPaymentId || item.settlementItemNo}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="600">{item.productName}</Typography>
                    {item.optionName && (
                      <Typography variant="caption" color="text.secondary">[{item.optionName}]</Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="right">{item.itemPrice?.toLocaleString()}원</TableCell>
                  <TableCell align="right">{item.itemTotalAmount?.toLocaleString()}원</TableCell>
                  <TableCell align="right" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                    {((item.platformFee || 0) + (item.pgFee || 0))?.toLocaleString()}원
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    {item.netPayoutAmount?.toLocaleString()}원
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained" sx={{ bgcolor: '#000', color: '#fff' }}>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
}
