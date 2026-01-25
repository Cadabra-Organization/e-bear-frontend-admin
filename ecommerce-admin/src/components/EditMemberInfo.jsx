import "./EditMemberInfo.css";
import { Button, TextField, FormControl, Select, MenuItem } from "@mui/material";
import * as React from 'react';


const EditMemberInfo = ({memberInfo, onClose}) => {
  const addressDetailRef = React.useRef(null);

  const [postcode, setPostcode] = React.useState('');
  const [address, setAddress] = React.useState(memberInfo?.userAdd || '');
  const [addressDetail, setAddressDetail] = React.useState(memberInfo?.userAdd2 || '');
  const [auth, setAuth] = React.useState(memberInfo?.userAuthCd || '');  
  
  // 전화번호를 "-"로 분리
  const phoneParts = memberInfo?.phoneNumber ? memberInfo.phoneNumber.split('-') : ['', '', ''];
  const phone1 = phoneParts[0] || '';
  const phone2 = phoneParts[1] || '';
  const phone3 = phoneParts[2] || '';

  const handleChange = (event) => {
    setAuth(event.target.value);
  };

  // 카카오 주소 API 실행 함수
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddress += (extraAddress !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        // 주소 설정
        setPostcode(data.zonecode); // 우편번호 필드에 저장
        setAddress(fullAddress);    // 주소 필드에 저장
        setAddressDetail('');       // 상세주소 필드는 초기화
        
        if (addressDetailRef.current) {
          addressDetailRef.current.focus();
        }
      },
    }).open();
  };

  // 카카오 스크립트 로드
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                size="small"
                sx={{
                  '& .MuiInputBase-root': {
                    height: '30px', // 원하는 높이로 변경 가능
                  },
                }}
              />
              <Button 
                variant="outlined" 
                onClick={handleAddressSearch}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TextField
                inputRef={addressDetailRef} // Ref 연결 
                value={postcode}
                // onChange={(e) => setAddressDetail(e.target.value)}
                size="small"
                sx={{
                  '& .MuiInputBase-root': {
                    width: '90px',
                    height: '30px', // 원하는 높이로 변경 가능
                  },
                }}
              />
              <TextField
                inputRef={addressDetailRef} 
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
                size="small"
                placeholder="상세주소를 입력하세요"
                sx={{
                  '& .MuiInputBase-root': {
                    width: '200px',
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
                    height: '30px', 
                  }, }}
            />
            {/* <span>-</span> */}
            <TextField
              id="phone-part2"
              defaultValue={phone2}
              size="small"
              sx={{ width: '80px','& .MuiInputBase-root': {
                    height: '30px', 
                  },}}
            />
            {/* <span>-</span> */}
            <TextField
              id="phone-part3"
              defaultValue={phone3}
              size="small"
              sx={{ width: '80px','& .MuiInputBase-root': {
                    height: '30px', 
                  }, }}
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