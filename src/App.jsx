import { useState } from "react"
import qrcode from "./assets/qrcode.png"
import barath from "./assets/Barath.jpg"

function App() {

  const [img, setImg] =  useState("")
  const [loading, setLoading] = useState(false)
  const [qrData, setQrData] = useState("")
  const [qrSize, setQrSize] =  useState("")
  
  async function generateQR() {
    setLoading(true)
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}` 
      setImg(url)
    }catch(error){
      console.error("Error generating QR Code", error)
    }finally{
      setLoading(false)
    }
  }
  function downloadQR() {
    fetch(img)
    .then((response) =>response.blob())
    .then((blob)=>{
      const link = document.createElement("a");
      link.href=URL.createObjectURL(blob)
      link.download= "qrcode.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
    .catch((error) => {
      console.error("Error Downloading QR Code", error)
    })
  }

  return (
    <body className="bg-blue-950 ">
      <section className="lg:p-40  p-20 box-border">
      <div>
        <h1 className="text-white font-bold lg:text-3xl  text-2xl text-center">Qr Code Generator</h1>
      </div>
      <div className="flex justify-center items-center p-5 mt-5">
        { loading && <p className="text-white">Please Wait</p>}
        {img && <img src={img} alt=""  />}
      </div>
      
      <div className="flex flex-col justify-center items-center">
        <div class="lg:w-1/2 w-full p-4">
            <span  class="block text-black-300 text-white">Data for QR Code:</span>
            <input class="w-full p-1 focus:outline-none border-b mt-2"  
            value={qrData} onChange={(e) => setQrData(e.target.value)} name="name" 
            type="text" required placeholder="URL" />
        </div>
        <div class="lg:w-1/2 w-full p-4">
            <span class="block  text-black-300 text-white">Image size (e.g., 150):</span>
            <input class="w-full p-1 focus:outline-none border-b mt-2" 
             value={qrSize} onChange={(e) => setQrSize(e.target.value)} name="name" 
             type="number" required placeholder="Image Size"/>
        </div>
      </div>

      <div class="lg:flex mt-8 ">
            
        <button class="lg:md:mx-auto  bg-teal-600 p-2 px-3 rounded-2xl text-white lg:font-semibold lg:text-lg" 
        onClick={generateQR} disabled={loading}>Generate QR Code</button>
          
        <button class="lg:md:mx-auto lg:hidden:mt-5 mt-5 bg-teal-600 p-2 px-3 rounded-2xl text-white lg:font-semibold lg:text-lg" 
        onClick={downloadQR}>Download QR Code</button>
                  
      </div>

      <div class="text-center text-gray-500 border-t border-gray-500  p-2 mt-5" >
          Designed By <a href="https://barathram3003.github.io/Portfolio/" className="text-teal-600">BarathRamana</a>
        </div>
    </section>
    </body>
  )
}

export default App
