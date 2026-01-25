import "./EditMemberInfo.css";
import { Button } from "@mui/material";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const EditMemberInfo = ({memberInfo}) => {
  const [auth, setAuth] = React.useState('');
  
  // 전화번호를 "-"로 분리
  const phoneParts = memberInfo?.phoneNumber ? memberInfo.phoneNumber.split('-') : ['', '', ''];
  const phone1 = phoneParts[0] || '';
  const phone2 = phoneParts[1] || '';
  const phone3 = phoneParts[2] || '';

  const handleChange = (event) => {
    setAuth(event.target.value);
  };

  return (
      <div className="member-container">
        <div className="member-space-between member-margin-bottom">
          <div>아이디</div>
          <div>{memberInfo.userId}</div>
        </div>
        <div className="member-space-between member-margin-bottom">
          <div>이름</div>
          <div>
              <TextField
                id="outlined-size-small"
                defaultValue={memberInfo.userNm}
                value={memberInfo.userNm}
                size="small"
                sx={{
                  '& .MuiInputBase-root': {
                    height: '30px', // 원하는 높이로 변경 가능
                  },
                }}
              />
          </div>
        </div>
        <div className="member-space-between member-margin-bottom">
          <div>주소</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TextField
                id="outlined-size-small"
                defaultValue={memberInfo.userAdd}
                value={memberInfo.userAdd}
                size="small"
                sx={{
                  '& .MuiInputBase-root': {
                    height: '30px', // 원하는 높이로 변경 가능
                  },
                }}
              />
              <Button 
                variant="outlined" 
                size="small"
                sx={{ 
                  backgroundColor: '#000', 
                  color: 'white',
                  borderColor: '#000',
                  '&:hover': { 
                    backgroundColor: '#333', 
                    borderColor: 'white',
                    color: 'white',
                  },
                }} 
              >
                주소찾기
              </Button>
          </div>
        </div>
        <div className="member-space-between member-margin-bottom">
          <div>상세주소</div>
          <div>
            <TextField
                id="outlined-size-small"
                defaultValue={memberInfo.userAdd2}
                value={memberInfo.userAdd2}
                size="small"
                sx={{
                  '& .MuiInputBase-root': {
                    height: '30px', // 원하는 높이로 변경 가능
                  },
                }}
              />
          </div>
        </div>
        <div className="member-space-between member-margin-bottom">
          <div>연락처</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <TextField
              id="phone-part1"
              defaultValue={phone1}
              size="small"
              sx={{ width: '80px', '& .MuiInputBase-root': {
                    height: '30px', // 원하는 높이로 변경 가능
                  }, }}
              // inputProps={{ maxLength: 3 }}
            />
            {/* <span>-</span> */}
            <TextField
              id="phone-part2"
              defaultValue={phone2}
              size="small"
              sx={{ width: '80px','& .MuiInputBase-root': {
                    height: '30px', // 원하는 높이로 변경 가능
                  },}}
              // inputProps={{ maxLength: 3 }}    
            />
            {/* <span>-</span> */}
            <TextField
              id="phone-part3"
              defaultValue={phone3}
              size="small"
              sx={{ width: '80px','& .MuiInputBase-root': {
                    height: '30px', // 원하는 높이로 변경 가능
                  }, }}
              // inputProps={{ maxLength: 3 }}
            />
          </div>
        </div>
        <div className="member-space-between member-margin-bottom">
          <div>회원권한</div>
          <div>
            <FormControl
              size="small"
              sx={{
                m: 1,
                minWidth: 120,
                '& .MuiInputBase-root': {
                  height: '30px',
                  minHeight: '30px',
                },
                '& .MuiInputBase-input': {
                  py: 0.5,
                  px: 1,
                },
              }}
            >
            <Select
              id="demo-select-small"
              value={auth}
              displayEmpty
              renderValue={(v) => v ? (v === '01' ? '관리자' : v === '02' ? '판매자' : '구매자') : '선택'}
              onChange={handleChange}
              MenuProps={{
                disablePortal: false,
                disableScrollLock: true,
                slotProps: {
                  root: {
                    sx: { zIndex: 3000 },
                  },
                  paper: {
                    sx: { zIndex: 3000 },
                  },
                },
                PaperProps: {
                  sx: { zIndex: 3000 },
                },
                anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                transformOrigin: { vertical: 'top', horizontal: 'left' },
              }}
            >
              <MenuItem value={'01'}>관리자</MenuItem>
              <MenuItem value={'02'}>판매자</MenuItem>
              <MenuItem value={'03'}>구매자</MenuItem>
            </Select>
          </FormControl>
          </div>
        </div>

        <div className="member-space-between member-margin-top member-right">
          <Button variant="outlined" onClick={() => setIsOpen(true)}>수정</Button>
        </div>
      </div>
  );
}

export default EditMemberInfo;