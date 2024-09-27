import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../sass/modalRestaurant.scss';
import '../sass/modalFormFood.scss';
import { FaPlus } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

function ModalFormFood({ show, onHide, modalId, type }) {
    const [validated, setValidated] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        console.log(selectedImage);

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
                    imgPreview.src = URL.createObjectURL(file);
                    
                    setSelectedImage(url);

                    imageExplode.classList.remove('d-none');
                    uploadBtn.classList.add('d-none');
                }
            } else {
                uploadBtn.classList.remove('d-none');
                uploadBtn.classList.add('required');
            }
        }

    };
    
    function fileImageValidation(element) {
        const fileInput = element;

        const file = fileInput;
        const fileExtension = file['name'].split('.').pop();

        // Allowing file type
        const allowedExtensions = /(jpg|jpeg|png|pdf)$/i;
        let fileData = [];
        fileData['extension'] = fileExtension;
        if (!allowedExtensions.exec(fileExtension)) {
            fileData['output'] = false;
        } else {
            if (file['size'] > 10485760) {
                fileData['output'] = false;
            } else {
                fileData['output'] = true;
            }
        }
        return fileData
    };

    const removeFileBtn = document.querySelectorAll('.remove-file');
    if (removeFileBtn) {
        removeFileBtn.forEach(RemoveBtn => {
            RemoveBtn.addEventListener('click',()=>{
                const explodePreview = document.querySelectorAll('.explode-preview');
                const uploadBtn = document.getElementById('upload-button');
                explodePreview.forEach(elementPreview => {
                    elementPreview.classList.add('d-none');
                    uploadBtn.classList.remove('d-none');
    
                });
            });
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
                    <Modal.Title>{type === 'add' ? 'เพิ่มเมนูอาหาร' : 'แก้ไขเมนูอาหาร'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} className='p-3'>
                        <Form.Group className="mb-3" controlId="signin-email">
                            <Form.Label className='fw-semibold'>ชื่ออาหาร</Form.Label>
                            <Form.Control type="text" placeholder="กรอกชื่ออาหาร" required />
                            <Form.Control.Feedback type="invalid">
                                กรุณากรอกชื่ออาหาร
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signin-pw">
                            <Form.Label className='fw-semibold'>รายละเอียดอาหาร</Form.Label>
                            <Form.Control type="text" placeholder="กรอกรายละเอียดอาหาร" required />
                            <Form.Control.Feedback type="invalid">
                                กรุณากรอกรายละเอียดอาหาร
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signin-pw">
                            <Form.Label className='fw-semibold'>สถานะอาหาร</Form.Label>
                            <Form.Select aria-label="Default select example" required>
                                <option>เลือกสถานะอาหาร</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                กรุณาสถานะอาหาร
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Label className='fw-semibold'>เลือกรูปอาหาร</Form.Label>
                        <div className="box-upload-file">
                            <label for="file-img" id="upload-button" className="upload-image-button">
                                <FaPlus size={20} />
                                <span className="text-up-image">อัปโหลดไฟล์ที่นี่</span>
                            </label>
                            <input type="hidden" name="delete_thumbnail" id="delete_thumbnail" value="" />
                            <input type="file" id="file-img" name="thumbnail" className="file-img" accept=".jpg, .png" onChange={showPreview} />
                            <div id="image-explode" className="upload-file-explode explode-preview d-none">
                                <img id="image-preview" src="" alt="" className="image-preview upload-file-box" />
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