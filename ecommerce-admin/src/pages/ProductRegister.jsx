import { useState, useRef } from 'react';
import "./ProductRegister.css";
import NoticeWrite from "../components/NoticeWrite";
import { CameraIcon, CloseIcon } from "../components/CustomTag";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ProductRegister = () => {
    let titleInfo = {
        title: '상품관리'
    }

    // 이미지 목록 상태 관리 (최대 5개)
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);

    // 이미지 추가
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        if (images.length + files.length > 5) {
            alert("이미지는 최대 5장까지 등록 가능합니다.");
            return;
        }

        const newImages = files.map((file) => ({
            file: file,
            preview: URL.createObjectURL(file)
        }));
        setImages((prev) => [...prev, ...newImages]);
        e.target.value = '';
    };

    // 이미지 삭제
    const handleRemoveImage = (index) => {
        setImages((prev) => {
            const newImages = [...prev];
            // 메모리 누수 방지
            URL.revokeObjectURL(newImages[index].preview);
            newImages.splice(index, 1);
            return newImages;
        });
    };

    // 카메라 박스 클릭 시 input 창 열기
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const [category, setCategory] = useState('');
    const categoryChange = (event) => {
        setCategory(event.target.value);
    };

    const [saleStatus, setSaleStatus] = useState('');
    const saleStatusChange = (event) => {
        setSaleStatus(event.target.value);
    };

    const [optionInputs, setOptionInputs] = useState([
        // 처음에 1줄은 무조건 표시
        { id: Date.now() }
    ]);

    // + 버튼 새로운 줄 추가
    const addOptionRow = () => {
        // random으로 키 중복 방지
        setOptionInputs(prev => [...prev, { id: Date.now() + Math.random() }]);
    };

    // - 버튼 마지막 줄 삭제 (최소 1개 유지)
    const removeOptionRow = () => {
        if (optionInputs.length > 1) {
            setOptionInputs(prev => prev.slice(0, -1));
        } else {
            alert("최소 하나의 옵션은 입력해야 합니다.");
        }
    };

    return (
        <div className='main-section'>
            <span className="notice-main-section-title">{titleInfo.title}</span>
            <hr />

            {/* 이미지 리스트 영역 (가로 배치) */}
            <div className="image-list-container">
                {/* 카메라 등록 버튼 */}
                <div className="image-upload-box" onClick={triggerFileInput}>
                    <CameraIcon />
                    <span className="image-count">{images.length} / 5</span>
                    <input
                        type="file" multiple accept="image/*" id="imageFileInput"
                        ref={fileInputRef} onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                </div>
                {/* 썸네일 리스트 */}
                {images.map((image, index) => (
                    <div key={index} className="thumbnail-box">
                        <img src={image.preview} alt={`preview-${index}`} className="thumbnail-img" />
                        {/* 삭제 버튼 */}
                        <button className="remove-btn" onClick={() => handleRemoveImage(index)}>
                            <CloseIcon />
                        </button>
                    </div>
                ))}
            </div>

            <FormControl variant="standard" sx={{ mr: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">카테고리</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={category}
                    onChange={categoryChange}
                    label="카테고리"
                >
                    <MenuItem value={1}>카테고리1</MenuItem>
                    <MenuItem value={2}>카테고리2</MenuItem>
                    <MenuItem value={3}>카테고리3</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ mr: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">판매상태</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={saleStatus}
                    onChange={saleStatusChange}
                    label="판매상태"
                >
                    <MenuItem value={1}>판매상태1</MenuItem>
                    <MenuItem value={2}>판매상태2</MenuItem>
                    <MenuItem value={3}>판매상태3</MenuItem>
                </Select>
            </FormControl>
            <TextField label="₩ 가격을 입력해주세요." variant="standard" sx={{ mr: 1, width: 200 }} />

            {optionInputs.map((item, index) => (
                <Box
                    key={item.id}
                    sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, flexWrap: 'wrap', mb: 2 }}
                >
                    <TextField label="옵션명을 입력해주세요." variant="standard" sx={{ width: 150 }} />
                    <TextField label="옵션값을 입력해주세요." variant="standard" sx={{ width: 150 }} />
                    <TextField label="옵션가격을 입력해주세요." variant="standard" sx={{ width: 180 }} />
                    <TextField label="재고수량을 입력해주세요." variant="standard" type="number" sx={{ width: 180 }} />

                    {/* index가 마지막(length - 1)일 때만 버튼 표시 */}
                    {index === optionInputs.length - 1 && (
                        <Box sx={{ display: 'flex', gap: 0.5, ml: 1 }}>
                            <Button
                                variant="contained"
                                onClick={addOptionRow}
                                sx={{
                                    minWidth: 40,
                                    height: 36,
                                    bgcolor: '#e0e0e0',
                                    color: '#333',
                                    fontWeight: 'bold',
                                    mb: 0.5,
                                    '&:hover': { bgcolor: '#d5d5d5' }
                                }}
                            >+
                            </Button>
                            <Button
                                variant="contained"
                                onClick={removeOptionRow}
                                sx={{
                                    minWidth: 40,
                                    height: 36,
                                    bgcolor: '#e0e0e0',
                                    color: '#333',
                                    fontWeight: 'bold',
                                    mb: 0.5,
                                    '&:hover': { bgcolor: '#d5d5d5' }
                                }}
                            >-
                            </Button>
                        </Box>
                    )}
                </Box>
            ))}

            <NoticeWrite />
        </div>
    );
};

export default ProductRegister;