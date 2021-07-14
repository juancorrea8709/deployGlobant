import React, { Component } from 'react';
import app from 'firebase/app'

class Fotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadValue: 0,
            picture: null
        };

        this.handleUpload = this.handleUpload.bind(this);
    }

   handleUpload (event) {
        const file = event.target.files[0];
        const storageRef = app.storage().ref(`/fotos/${file.name}`);
        const task = storageRef.put(file)

        task.on('state_changed', (snapshot) => {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue: percentage
            })
        }, error => { 
            console.log(error.message)
        })

        task.then(async snapshot => {
            const imageSrc = await storageRef.getDownloadURL()
            console.log('BBBBBBB', imageSrc)
            this.setState({
              uploadValue: 100,
              picture: imageSrc
            });
        });
    }

    render() {
        console.log(this.state.picture)
        return (
            <div>
                <progress value={this.state.uploadValue} max="100">
                    {this.state.uploadValue} %
                </progress>
                <br/>
                <input type="file"
                onChange={this.handleUpload} />
                <br />
                <img width="400" height="300" src={this.state.picture} alt="Uploaded images" id="foto" />
            </div>
        )
    }
}

export default Fotos;

