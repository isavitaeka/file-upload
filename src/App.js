import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    selectedFile: null,
    fileUploadedSuccessfully: false
  
  }

  onFileChange = event => {
  this.setState({selectedFile: event.target.files[0]});
  }

  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "file data",
      this.state.selectedFile,
     // this.state.selectedFile.className
    )
    const headers = {
      'Content-Type': 'multipart/form-data'
  
    }
    
    // call api
    axios.post("https://9a9lekxxba.execute-api.eu-north-1.amazonaws.com/prod/cpe-file-upload", formData, {headers: headers} ).then(() => {
    //axios.post("http://localhost:3002/upload", formData).then(() => {
      
    this.setState({selectedFile: null});
    this.setState({fileUploadedSuccessfully:null});
    })
    console.log("This is the file data");
    console.log(formData);
  }

  fileData = () => {

    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details: </h2>
          <p> File Name : {this.state.selectedFile.name }</p>
          <p> File Type : {this.state.selectedFile.type}</p>
          <p> Last Mofified : {}
            {this.state.selectedFile.lastModifiedDate.toDateString()}</p>
          </div>

      );
    }else if (this.state.fileUploadedSuccessfully){
        return (
          <div>
            <br/><h3>Your file has been succesfully uploaded</h3>
          </div>
        )
    } else {
      return (
        <div>
          <br/><h3>Choose a file ad then press the Upload button</h3>
        </div>
      )    
    }

  }
  render (){
     return (
      <div className="Container">

        <h2> CPE File Upload </h2>
        <h3> File upload with AWS Services </h3>
        <div>
        <input type="file" onChange={this.onFileChange}/>
        <button onClick={this.onFileUpload}>
          Upload
        </button>
        </div>
        {this.fileData()}
      </div>
    );

  }
}


export default App;
