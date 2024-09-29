import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../sass/modalRestaurant.scss';
import '../sass/modalFormFood.scss';
import { FaPlus } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import Swal from 'sweetalert2';
import axios from 'axios';

function ModalFormFood({ show, onHide, type, foodId, restaurantId, updateFoodItem  }) {
    const [validated, setValidated] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [foodName, setFoodName] = useState('');
    const [foodDes, setFoodDes] = useState('');
    const [foodPrice, setFoodPrice] = useState('');
    const [foodStatus, setFoodStatus] = useState('');
    const [foodPicture, setFoodPicture] = useState(null);

    useEffect(() => {
        if (type === 'edit') {
            async function fetchData() {
                try {
                    const response = await axios.get(`http://localhost:3000/foodMenu/${foodId}`);
                    if (response.status === 200) {
                        const data = response?.data[0];
                        setFoodName(data.food_name);
                        setFoodDes(data.food_description);
                        setFoodPrice(data.food_price);
                        setFoodStatus(data.status);
                        setFoodPicture(data.food_picture);
                    }
        
                } catch (err) {
                    console.log(err);
                }
            }
            fetchData();
        }
    }, [foodId, type]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            if (type === 'add' && restaurantId) {
                try {
                    const formData = new FormData();
                    formData.append('food_name', foodName);
                    formData.append('food_description', foodDes);
                    formData.append('food_price', foodPrice);
                    formData.append('status', foodStatus);
                    formData.append('thumbnail', foodPicture);
                    formData.append('restaurant_id', restaurantId);
                    
                    const response = await axios.post(`http://localhost:3000/foodMenu/add`,formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (response.status === 200) {
                        onHide();
                        Swal.fire({
                            title: response?.data?.message,
                            icon: "success",
                            confirmButtonText: "OK",
                        });
    
                        setValidated(false); 
                        setFoodName('');
                        setFoodDes('');
                        setFoodPrice('');
                        setFoodStatus('');
                        setSelectedImage('');
                        resetImgPreview();
                    }
                       
                } catch (err) {
                    const errorMsg = err.response?.data?.message || 'Failed to add food item';
                    Swal.fire({
                        title: errorMsg,
                        icon: 'error',
                        confirmButtonText: "OK",
                    });
                }
                
            } else if (type === 'edit' && foodId) {
                try {
                    const formData = new FormData();
                    formData.append('food_name', foodName);
                    formData.append('food_description', foodDes);
                    formData.append('food_price', foodPrice);
                    formData.append('status', foodStatus);
                    formData.append('thumbnail', foodPicture);
                    formData.append('restaurant_id', restaurantId);

                    const response = await axios.put(`http://localhost:3000/foodMenu/update/${foodId}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (response.status === 200) {
                        updateFoodItem({ id: foodId, food_name: foodName, food_description: foodDes, food_price: foodPrice, status: foodStatus, food_picture: foodPicture });
                        Swal.fire({
                            title: response?.data?.message,
                            icon: "success",
                            confirmButtonText: "OK",
                        });
                        onHide();
                    }
                       
                } catch (err) {
                    const errorMsg = err.response?.data?.message || 'Failed to update food item';
                    Swal.fire({
                        title: errorMsg,
                        icon: 'error',
                        confirmButtonText: "OK",
                    });
                }

            }
            
        }
    };

    const handChange = (fn) => {
        return (event) => {
            fn(event.target.value);
        };
    };

    const showPreview = (event) => {
        const file = event.target.files[0];
        const parentEle = event.target.parentNode;
        const imgPreview = parentEle.querySelector('#image-preview');
        const uploadBtn = parentEle.querySelector('#upload-button');
        const imageExplode = parentEle.querySelector('#image-explode');

        if (imgPreview === "undefined" && uploadBtn === "undefined" && imageExplode === "undefined") {
            return false;
        }

        if (file) {
            let url = '';
            const fileData = fileImageValidation(file);
            if (fileData['output']) {
                if (fileData['extension'] == 'pdf' || fileData['extension'] == 'PDF') {
                    pdfNamePreview.innerHTML = file['name'];
                    pdfExplode.classList.remove('d-none');
                } else {
                    url = URL.createObjectURL(file)
                    imgPreview.src = url;
                    setSelectedImage(url);
                    setFoodPicture(file);

                    imageExplode.classList.remove('d-none');
                    uploadBtn.classList.add('d-none');
                }
            } else {
                uploadBtn.classList.remove('d-none');
                uploadBtn.classList.add('required');
            }
        }

    };
    
    function fileImageValidation(file) {
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const isValidExtension = allowedExtensions.includes(fileExtension);
        const isValidSize = file.size <= 10485760; // 10 MB

        return {
            output: isValidExtension && isValidSize,
            extension: fileExtension,
        };
    };

    const removeFileBtn = document.querySelectorAll('.remove-file');
    if (removeFileBtn) {
        removeFileBtn.forEach(RemoveBtn => {
            RemoveBtn.addEventListener('click',()=>{
                resetImgPreview();
            });
        });
    }

    function resetImgPreview() {
        const explodePreview = document.querySelectorAll('.explode-preview');
        const uploadBtn = document.getElementById('upload-button');
        const imagePreview = document.getElementById('image-preview');
        explodePreview.forEach(elementPreview => {
            elementPreview.classList.add('d-none');
            uploadBtn.classList.remove('d-none');
            imagePreview.src = '';

        });
    }
    

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                backdrop="static"
                keyboard={false}
                size="xl"
                className='modal-restaurant'
            >
                <Modal.Header closeButton>
                    <Modal.Title>{type === 'add' ? 'เพิ่มเมนูอาหาร' : `แก้ไขเมนู "${foodName}"`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} className='p-3'>
                        <Form.Group className="mb-3" controlId="food_name">
                            <Form.Label className='fw-semibold'>ชื่ออาหาร</Form.Label>
                            <Form.Control type="text" placeholder="กรอกชื่ออาหาร" required value={foodName} onChange={handChange(setFoodName)}/>
                            <Form.Control.Feedback type="invalid">
                                กรุณากรอกชื่ออาหาร
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="food_des">
                            <Form.Label className='fw-semibold'>รายละเอียดอาหาร</Form.Label>
                            <Form.Control type="text" placeholder="กรอกรายละเอียดอาหาร" required value={foodDes} onChange={handChange(setFoodDes)}/>
                            <Form.Control.Feedback type="invalid">
                                กรุณากรอกรายละเอียดอาหาร
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="food_price">
                            <Form.Label className='fw-semibold'>ราคาอาหาร</Form.Label>
                            <Form.Control type="text" placeholder="กรอกราคาอาหาร" required value={foodPrice} onChange={handChange(setFoodPrice)}/>
                            <Form.Control.Feedback type="invalid">
                                กรุณากรอกราคาอาหาร
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="food_status">
                            <Form.Label className='fw-semibold'>สถานะอาหาร</Form.Label>
                            <Form.Select aria-label="Default select example" required value={foodStatus} onChange={handChange(setFoodStatus)}>
                                <option>เลือกสถานะอาหาร</option>
                                <option value="1">หมด</option>
                                <option value="0">ไม่หมด</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                กรุณาสถานะอาหาร
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Label className='fw-semibold'>เลือกรูปอาหาร</Form.Label>
                        <div className="box-upload-file">
                            <label htmlFor="file-img" id="upload-button" className={`upload-image-button ${selectedImage || foodPicture ? 'd-none' : ''}`}>
                                <FaPlus size={20} />
                                <span className="text-up-image">อัปโหลดไฟล์ที่นี่</span>
                            </label>
                            <input type="hidden" name="delete_thumbnail" id="delete_thumbnail" value="" />
                            <input type="file" id="file-img" name="thumbnail" className="file-img" accept=".jpg, .png" onChange={showPreview} />
                            <div id="image-explode" className={`upload-file-explode explode-preview ${!foodPicture ? 'd-none' : ''}`}>
                                <img id="image-preview" src={selectedImage ? selectedImage : foodPicture ? `http://localhost:3000/uploads/${foodPicture}` : ''} alt="" className="image-preview upload-file-box" />
                                <span className="remove-file" data-upload-name="file-img">
                                    <IoCloseOutline />
                                </span>
                            </div>
                            <span className="text-lastname-file">รูปภาพต้องเป็นไฟล์นามสกุล jpeg,jpg หรือ png เท่านั้น</span>
                            <span className="validate-text" validate-text="กรุณาใส่ภาพหน้าปก"></span>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <Button variant="dark" type='submit'>{type === 'add' ? 'Add Menu' : 'Edit Menu'}</Button>
                        </div>

                    </Form>
                </Modal.Body>

            </Modal >
        </>
    );
}

export default ModalFormFood;