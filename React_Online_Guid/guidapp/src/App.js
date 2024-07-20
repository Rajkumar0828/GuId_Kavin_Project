import axios from "axios";
import { useRef, useState } from 'react';
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";
import Swal from 'sweetalert2'
import './App.css'
import { Button, ButtonGroup } from "react-bootstrap";
import EngineeringIcon from '@mui/icons-material/Engineering';
function App() {

  const baseurl = 'http://localhost:5142/GuidGenerator/GuidGenerator';

  const [data, setData] = useState(null);
  const [enableclipboard, setEnableclipboard] = useState(false);
  const textRef = useRef();

  const apiresponse = () => {
    axios.get(baseurl).then((response) => {
      setData(response.data);
    });
    setEnableclipboard(true);
  }

  const copyToClipboard = () => {
    let copyText = textRef.current.innerText;
    // Adding text value to clipboard using copy function
    let isCopy = copy(copyText);
    // Displaying notification
    if (isCopy) {

      const Toast = Swal.mixin({
        toast: true, position: "top-end",
        showConfirmButton: false, timer: 3000, timerProgressBar: true,
        customClass: {
          popup: 'custom-toast'
        },
        didOpen: (toast) => { toast.onmouseenter = Swal.stopTimer; toast.onmouseleave = Swal.resumeTimer; }
      });
      Toast.fire({  icon: "success", title: "Copied Successfully" });
    }
  };

  return (
    <>
      <div id="Header">
        <h2>Free Online Guid Generator Application </h2>
      </div>
      <div>
        <button onClick={apiresponse}>Generate Some Guid!</button>
        {/* <Button onClick={apiresponse}>Generate GUID</Button> */}
      </div>
      {data && (
        <div>
          {Object.keys(data).map(key => (
            <div key={key}>
              <strong>Get your Guid :</strong>
              <div ref={textRef}>{data[key]}</div>
            </div>
          ))}
        </div>
      )}
      <div>
        {
          enableclipboard == true ?
            <button onClick={copyToClipboard}>Copy to your clipboard!</button>
            : ''
        }
      </div>
    </>
  );
}

export default App;
