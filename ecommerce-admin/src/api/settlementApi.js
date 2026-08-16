import api from './axios';

export const settlementApi = {
  // 1. 판매자 본인 정산 목록 조회
  getMySettlementList: (page = 0, size = 10) => {
    return api.get('/api/seller/settlements/list', {
      params: { page, size }
    });
  },

  // 2. 정산 상세 내역 조회 (판매자/관리자 공용)
  getSettlementDetail: (settlementNo) => {
    return api.get(`/api/seller/settlements/${settlementNo}`);
  },

  // 3. 판매자 정산 계좌 등록/수정
  registerAccount: (accountData) => {
    return api.post('/api/seller/settlements/account', accountData);
  },

  // 4. 관리자 전체 정산 목록 조회
  getAllSettlements: (status = null, page = 0, size = 10) => {
    const params = { page, size };
    if (status && status !== 'ALL') {
      params.status = status;
    }
    return api.get('/api/admin/settlements/list', { params });
  },

  // 5. 수동 정산 집계 및 생성 실행
  executeSettlement: (targetDate = null) => {
    const params = targetDate ? { targetDate } : {};
    return api.post('/api/admin/settlements/execute', null, { params });
  },

  // 6. 정산 확정 처리
  confirmSettlement: (settlementNo) => {
    return api.post(`/api/admin/settlements/${settlementNo}/confirm`);
  },

  // 7. PG사(토스) 지급 대행 실행
  completePayout: (settlementNo) => {
    return api.post(`/api/admin/settlements/${settlementNo}/payout`);
  },

  // 8. PG사 정산 대사(Reconciliation) 조회
  getReconciliation: (startDate, endDate, pgProvider = 'TOSS') => {
    return api.get('/api/admin/settlements/reconciliation', {
      params: { pgProvider, startDate, endDate }
    });
  }
};
