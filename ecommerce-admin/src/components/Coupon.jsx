import "./Coupon.css";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { useState, useEffect } from 'react';
import api from "../api/axios";

const Coupon = ({ onClose }) => {
    const [couponType, setCouponType] = useState('category'); // 'category' 또는 'product'
    const [categoryList, setCategoryList] = useState([]);
    const [selectedPath, setSelectedPath] = useState([]);
    const [productList, setProductList] = useState([]);     // 상품 목록
    const [selectedProduct, setSelectedProduct] = useState(''); // 선택한 상품 ID

    // 추가 입력 상태
    const [discountType, setDiscountType] = useState('PERCENT'); // PERCENT 또는 WON
    const [discountValue, setDiscountValue] = useState('');
    const [couponName, setCouponName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [publisher, setPublisher] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [minOrderAmount, setMinOrderAmount] = useState('');

    const fetchCategoryList = async () => {
      try {
          const response = await api.get("/category/list");
          setCategoryList(response.data);
      } catch (err) {
          console.error("카테고리 목록 조회 실패:", err);
      }
    };

    const fetchProductList = async () => {
      try {
          const response = await api.get("/product/list/admin");
          setProductList(response.data);
      } catch (err) {
          console.error("상품 목록 조회 실패:", err);
      }
    };

    const handleCategoryChange = (level, event) => {
      const selectedId = event.target.value;
      const currentList = level === 0 
          ? categoryList : selectedPath[level - 1].childCategory;
  
      const selectedObj = currentList.find(item => item.categoryId === selectedId);
      const newPath = selectedPath.slice(0, level);
      newPath[level] = selectedObj;
      
      setSelectedPath(newPath);
    };

    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };

    useEffect(() => {
      fetchCategoryList();
      fetchProductList();
    }, []);

    const getSelectedCategoryPathString = () => {
        return selectedPath.map(item => item.categoryName).join(" ➔ ");
    };

    const getSelectedProductName = () => {
        const found = productList.find(p => p.productId === selectedProduct);
        return found ? found.productName : '';
    };

    // 저장 버튼 클릭 시 API 전송 로직
    const handleSave = async () => {
        if (couponType === 'category' && selectedPath.length === 0) {
            alert("발행 대상을 선택해 주세요.");
            return;
        }
        if (couponType === 'product' && !selectedProduct) {
            alert("발행 대상을 선택해 주세요.");
            return;
        }
        if (!discountValue || !couponName || !quantity || !publisher || !expireDate || !minOrderAmount) {
            alert("모든 필수 입력 정보를 입력해 주세요.");
            return;
        }

        const requestData = {
            couponType,
            targetId: couponType === 'category' 
                ? selectedPath[selectedPath.length - 1].categoryId 
                : selectedProduct,
            discountType,
            discountValue: Number(discountValue),
            couponName,
            quantity: Number(quantity),
            publisher,
            expireDate,
            minOrderAmount: Number(minOrderAmount)
        };

        try {
            const response = await api.post("/coupon/save", requestData);
            if (response.status === 200 || response.status === 201) {
                alert("쿠폰이 성공적으로 저장되었습니다.");
                if (onClose) {
                    onClose();
                } else {
                    window.location.reload();
                }
            }
        } catch (err) {
            console.error("쿠폰 저장 실패:", err);
            alert("쿠폰 저장 중 에러가 발생했습니다.");
        }
    };

    return (
        <Box className="coupon-container">
            {/* 세그먼트 형태의 탭 전환 */}
            <Box className="tab-wrapper">
                <ToggleButtonGroup
                    value={couponType}
                    exclusive
                    onChange={(e, val) => val && setCouponType(val)}
                    aria-label="coupon type"
                    fullWidth
                    className="toggle-group"
                >
                    <ToggleButton value="category" className="toggle-btn">
                        <span style={{ marginRight: '6px' }}>📁</span>
                        카테고리별 발행
                    </ToggleButton>
                    <ToggleButton value="product" className="toggle-btn">
                        <span style={{ marginRight: '6px' }}>📦</span>
                        제품별 발행
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* 입력 폼 카드 영역 */}
            <Box className="form-card">
                {couponType === 'category' ? (
                    <Box className="category-select-group">
                        <FormControl fullWidth variant="outlined" size="small" className="form-control-custom">
                            <InputLabel>대분류 카테고리</InputLabel>
                            <Select
                                value={selectedPath[0]?.categoryId || ''}
                                onChange={(e) => handleCategoryChange(0, e)}
                                label="대분류 카테고리"
                                MenuProps={{ style: { zIndex: 2001 } }}
                            >
                                {categoryList.map(data => (
                                    <MenuItem key={data.categoryId} value={data.categoryId}>
                                        {data.categoryName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {selectedPath.map((item, index) => (
                            item.childCategory && item.childCategory.length > 0 && (
                                <FormControl key={`select-${index}`} fullWidth variant="outlined" size="small" className="form-control-custom">
                                    <InputLabel>{index + 1}차 하위 카테고리</InputLabel>
                                    <Select
                                        value={selectedPath[index + 1]?.categoryId || ''}
                                        onChange={(e) => handleCategoryChange(index + 1, e)}
                                        label={`${index + 1}차 하위 카테고리`}
                                        MenuProps={{ style: { zIndex: 2001 } }}
                                    >
                                        {item.childCategory.map(child => (
                                            <MenuItem key={child.categoryId} value={child.categoryId}>
                                                {child.categoryName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )
                        ))}
                    </Box>
                ) : (
                    <Box className="product-select-group">
                        <FormControl fullWidth variant="outlined" size="small" className="form-control-custom">
                            <InputLabel>발행할 상품 선택</InputLabel>
                            <Select
                                value={selectedProduct}
                                onChange={handleProductChange}
                                label="발행할 상품 선택"
                                MenuProps={{ style: { zIndex: 2001 } }}
                            >
                                {productList.map(product => (
                                    <MenuItem key={product.productId} value={product.productId}>
                                        {product.productName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                )}
            </Box>

            {/* 선택 정보 요약 영역 */}
            {((couponType === 'category' && selectedPath.length > 0) || (couponType === 'product' && selectedProduct)) && (
                <Box className="summary-preview">
                    <Typography className="preview-label">
                        선택된 발행 대상
                    </Typography>
                    <Box sx={{ mt: 0.5 }}>
                        {couponType === 'category' && selectedPath.length > 0 && (
                            <Chip 
                                label={getSelectedCategoryPathString()} 
                                variant="outlined" 
                                className="preview-chip"
                            />
                        )}
                        {couponType === 'product' && selectedProduct && (
                            <Chip 
                                label={getSelectedProductName()} 
                                variant="outlined" 
                                className="preview-chip"
                            />
                        )}
                    </Box>
                </Box>
            )}

            {/* 쿠폰 상세 정보 입력 그리드 */}
            <Box className="coupon-form-grid">
                <Box className="full-row">
                    <TextField 
                        fullWidth 
                        size="small" 
                        label="쿠폰 이름" 
                        variant="outlined" 
                        value={couponName}
                        onChange={(e) => setCouponName(e.target.value)}
                    />
                </Box>
                
                {/* 할인율 선택 및 입력 */}
                <Box className="discount-field-group">
                    <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>할인 종류</InputLabel>
                        <Select
                            value={discountType}
                            onChange={(e) => setDiscountType(e.target.value)}
                            label="할인 종류"
                            MenuProps={{ style: { zIndex: 2001 } }}
                        >
                            <MenuItem value="PERCENT">퍼센트 (%)</MenuItem>
                            <MenuItem value="WON">절대값 (원)</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField 
                        fullWidth 
                        size="small" 
                        label="할인 수치" 
                        variant="outlined" 
                        type="number"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{discountType === 'PERCENT' ? '%' : '원'}</InputAdornment>,
                        }}
                    />
                </Box>

                <TextField 
                    fullWidth 
                    size="small" 
                    label="사용 가능 금액" 
                    variant="outlined" 
                    type="number"
                    value={minOrderAmount}
                    onChange={(e) => setMinOrderAmount(e.target.value)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">원 이상</InputAdornment>,
                    }}
                />

                <TextField 
                    fullWidth 
                    size="small" 
                    label="발행 수량" 
                    variant="outlined" 
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">장</InputAdornment>,
                    }}
                />

                <TextField 
                    fullWidth 
                    size="small" 
                    label="발행처" 
                    variant="outlined" 
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                />

                <Box className="full-row">
                    <TextField 
                        fullWidth 
                        size="small" 
                        label="만료일" 
                        variant="outlined" 
                        type="date"
                        value={expireDate}
                        onChange={(e) => setExpireDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
            </Box>

            {/* 저장 및 취소 버튼 */}
            <Box className="coupon-button-actions">
                <Button 
                    variant="contained" 
                    className="action-btn-save"
                    onClick={handleSave}
                >
                    저장
                </Button>
            </Box>
        </Box>
    );
}

export default Coupon;
