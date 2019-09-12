import React from 'react';
import {
    Upload,
    message,
    Icon
} from 'antd';
import ImgCrop from 'antd-img-crop';
import '../styles/portrait_upload.scss';

class PortraitUpload extends React.Component {
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传头像</div>
            </div>
        );
        return (
            <div className='portrait_upload' onMouseEnter={ this.handleMouseEnter } onMouseLeave={ this.handleMouseLeave }>
                <ImgCrop>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={ beforeUpload }
                        onChange={ this.handleChange }
                    >
                        { this.state.imageUrl && this.state.uploaded ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton }
                        {
                            this.state.uploaded && this.state.onMouse &&
                            <div className='delete_photo'>
                                <div className="delete" onClick={ this.removeUpload }>
                                    <Icon type="delete" style={{fontSize: '20px'}} />
                                </div>
                            </div>
                        }
                    </Upload>
                </ImgCrop>
            </div>
        )
    }
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            uploaded: false,
            onMouse: false,
        };
    }
    // 删除头像 --> 请求删除头像
    removeUpload = event => {
        event.stopPropagation();
        this.setState({
            uploaded: false,
            loading: false,
        })
    };
    handleMouseEnter = event => {
        if (this.state.uploaded){
            this.setState({onMouse: true});
        }
    }
    handleMouseLeave = event => {
        if (this.state.uploaded)
            this.setState({onMouse: false});
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                    onMouse: false
                }),
            );
        }
        if (info.file.response) {
            // 服务器的响应体
            const response = {...info.file.response};
            // 判断相应结果 用来显示删除按钮
            console.log(response);
            this.setState({
                uploaded: true,
            });
        }
    };

}

export default PortraitUpload;


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}