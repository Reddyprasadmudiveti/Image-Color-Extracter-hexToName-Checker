import React, { useState } from 'react'
import colorThief from 'colorthief'
import DisplayImage from '../Components/Card';

const CardContainer = () => {
  const [uploadedImage,setUploadedImage] = useState(null);
  const [colorPallate,setColorPallate]=useState(null)

  const uploadImage = (e) => {
    const file = e.target.files[0];


    const reader = new FileReader();
    reader.onload = async (event) => {
      const img = new Image();
      img.onload = () => {
        const colorThiefInstance = new colorThief();
        const colorPalette = colorThiefInstance.getPalette(img, 6);
        setColorPallate(colorPalette)
        setUploadedImage(event.target.result)
        console.log( colorPalette)
      };
      img.src = event.target.result;
    };

    console.log("reader",reader)
    reader.readAsDataURL(file);
  };
  return (
    <div className='h-full w-full flex flex-col items-center justify-center overflow-hidden'>
      <input type="file" className=' w-1/2  bg-lime-400' onChange={(e)=>{uploadImage(e)}} name="" id="" />
      <div className=' w-[100%-100px'>
        <DisplayImage
        uploadedImage={uploadedImage}
        colorPalette={colorPallate}
        />
      </div>
    </div>
  )
}

export default CardContainer






// for image url

// import React, { useState } from 'react';
// import ColorThief from 'colorthief';
// import DisplayImage from '../Components/RecepeCard';

// const CardContainer = () => {
//   const [imageUrl, setImageUrl] = useState('');
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [colorPalette, setColorPalette] = useState(null);

//   const uploadImage = (url) => {
//     const img = new Image();
//     img.crossOrigin = 'Anonymous'; // This is required for cross-origin images
//     img.onload = () => {
//       const colorThiefInstance = new ColorThief();
//       const colorPalette = colorThiefInstance.getPalette(img, 2);
//       setColorPalette(colorPalette);
//       setUploadedImage(url);
//       console.log(colorPalette);
//     };
//     img.src = url;
//   };

//   const handleUrlChange = (e) => {
//     setImageUrl(e.target.value);
//   };

//   const handleUrlSubmit = (e) => {
//     e.preventDefault();
//     uploadImage(imageUrl);
//   };

//   return (
//     <div className='h-full'>
//       <form onSubmit={handleUrlSubmit}>
//         <input 
//           type="text" 
//           value={imageUrl} 
//           onChange={handleUrlChange} 
//           placeholder="Enter image URL"
//           className="p-2 border border-gray-400 rounded"
//         />
//         <button 
//           type="submit" 
//           className="ml-2 p-2 bg-blue-500 text-white rounded"
//         >
//           Load Image
//         </button>
//       </form>

//       <div className='h-full'>
//         <DisplayImage
//           uploadedImage={uploadedImage}
//           colorPalette={colorPalette}
//         />
//       </div>
//     </div>
//   );
// };

// export default CardContainer;
