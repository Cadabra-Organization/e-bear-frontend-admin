import "./MemberList.css";
import DataTable from "../components/DataTable";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useMemo, useState } from "react";

const generateDummyRows = (count) => {
    const data = [];
    for (let i = 1; i <= count; i++) {
        const day = i < 10 ? `0${i}` : `${i}`;
        const year = 2024;
        const month = (i % 12) + 1;
        const monthStr = month < 10 ? `0${month}` : `${month}`;

        data.push({
            num: i,
            ID: `KimID`,
            name: `이동균`,
            address: `서울특별시 서초구 우면동`,
            phone: '010-1234-1234',
            memberAccess: '판매자',
        });
    }
    return data.reverse(); // 역순으로 정렬
};

const NoticePage = () => {
    const [members, setMembers] = useState(() => generateDummyRows(105));
    const [editOpen, setEditOpen] = useState(false);
    const [editMember, setEditMember] = useState(null);

    const handleEditOpen = (member) => {
        setEditMember({ ...member });
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
        setEditMember(null);
    };

    const handleEditChange = (field) => (event) => {
        setEditMember((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleEditSave = () => {
        setMembers((prev) =>
            prev.map((member) =>
                member.num === editMember.num ? { ...member, ...editMember } : member
            )
        );
        handleEditClose();
    };

    const rows = useMemo(
        () =>
            members.map((member) => ({
                ...member,
                modify: (
                    <Button
                        type="button"
                        variant="outlined"
                        size="small"
                        startIcon={<EditOutlinedIcon fontSize="small" />}
                        onClick={(event) => {
                            event.stopPropagation();
                            handleEditOpen(member);
                        }}
                        sx={{
                            minWidth: 82,
                            height: 34,
                            borderColor: "#d0d5dd",
                            color: "#344054",
                            fontWeight: 700,
                            backgroundColor: "#fff",
                            "&:hover": {
                                borderColor: "#111827",
                                backgroundColor: "#f9fafb",
                            },
                        }}
                    >
                        수정
                    </Button>
                ),
            })),
        [members]
    );

    let navigation = [
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' }
    ];


    // 보여주고 싶은 검색 조건 설정 (SearchHeader를 제어)
    const searchConfig = {
        showDate: false,      // 날짜 검색 
        showCondition: true, // 검색조건 선택 
        showText: true,      // 검색어 입력 
        showDelete: true,    // 삭제 버튼 
        showWrite: false,      // 글쓰기 버튼 
    };

    let userInfo = {
        name: '이베어',
        email: 'ebear@knou.ac.kr'
    }

    let notice = {
        content: '[알림] [안내] 공식대행사 대행관 설정 가이드 공지 및 불법영업 행위 주의 안내'
    }

    let titleInfo = {
        title: '공지사항',
    }

    let pageInfo = {
        searchList: {
            'all': '전체',
            'ID': '아이디',
            'name': '이름',
            'access': '권한'
        }
    }

    // 테이블 헤더 정의
    let headCells = [
        {
            id: 'num',
            numeric: false,
            disablePadding: true,
            label: '번호',
            width: 60,
            align: 'center',
        }, {
            id: 'ID',
            numeric: false,
            disablePadding: false,
            label: '아이디',
            width: 100,
            align: 'left',
        },
        {
            id: 'name',
            numeric: true,
            disablePadding: false,
            label: '이름',
            width: 100,
            align: 'center',
        },
        {
            id: 'address',
            numeric: true,
            disablePadding: false,
            label: '주소',
            width: 500,
            align: 'center',
        },
        {
            id: 'phone',
            numeric: true,
            disablePadding: false,
            label: '연락처',
            width: 80,
            align: 'center',
        },
        {
            id: 'memberAccess',
            numeric: true,
            disablePadding: false,
            label: '회원권한',
            width: 80,
            align: 'center',
        },
        {
            id: 'modify',
            numeric: true,
            disablePadding: false,
            label: '수정',
            width: 100,
            align: 'center',
        },
    ];

    const labelConfig = {
        searchLabel: "검색조건"
    };

    return (
        // <Header notice={notice} titleInfo={titleInfo}/>
        <div className='main-section'>
            {/* 순서대로 게시판 데이터, 표 헤더 데이터, 출력 데이터, 검색조건 */}
            <DataTable pageInfo={pageInfo} headCells={headCells} rows={rows} searchConfig={searchConfig} labelConfig={labelConfig} writeFunc={() => console.log('글쓰기 버튼')} selectFunc={() => console.log('')}/>
            <Dialog
                open={editOpen}
                onClose={handleEditClose}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                    },
                }}
            >
                <DialogTitle sx={{ pb: 1 }}>
                    <Typography component="span" sx={{ fontSize: 20, fontWeight: 800 }}>
                        회원 정보 수정
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        <TextField
                            label="아이디"
                            value={editMember?.ID ?? ""}
                            size="small"
                            fullWidth
                            disabled
                        />
                        <TextField
                            label="이름"
                            value={editMember?.name ?? ""}
                            onChange={handleEditChange("name")}
                            size="small"
                            fullWidth
                        />
                        <TextField
                            label="주소"
                            value={editMember?.address ?? ""}
                            onChange={handleEditChange("address")}
                            size="small"
                            fullWidth
                            multiline
                            minRows={2}
                        />
                        <TextField
                            label="연락처"
                            value={editMember?.phone ?? ""}
                            onChange={handleEditChange("phone")}
                            size="small"
                            fullWidth
                        />
                        <TextField
                            select
                            label="회원권한"
                            value={editMember?.memberAccess ?? ""}
                            onChange={handleEditChange("memberAccess")}
                            size="small"
                            fullWidth
                        >
                            <MenuItem value="일반회원">일반회원</MenuItem>
                            <MenuItem value="판매자">판매자</MenuItem>
                            <MenuItem value="관리자">관리자</MenuItem>
                        </TextField>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleEditClose} sx={{ color: "#667085", fontWeight: 700 }}>
                        취소
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleEditSave}
                        disabled={!editMember}
                        sx={{
                            minWidth: 76,
                            backgroundColor: "#111827",
                            fontWeight: 800,
                            "&:hover": {
                                backgroundColor: "#000",
                            },
                        }}
                    >
                        저장
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NoticePage;
