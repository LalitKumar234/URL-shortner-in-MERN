import logo from './logo.svg';
import './App.css';
import LinkCard from './components/LinkCard';
import { useEffect, useState } from 'react';
import { axiosDelete, axiosGet, axiosPost } from './AxiosService';
import Toast from './components/Toast';

function App() {
  const [data, setData] = useState([])
  const [userInput, setUserInput] = useState('')
  const [render, setRender] = useState(false)
  const [copied, setIsCopied] = useState(false)

  const handleShortenUrl = () => {

    axiosPost('shorturl', { originUrl: userInput })
      .then(res => {
        console.log(res.data)
        setRender(!render)
      })
      .catch(err => console.log(err))
  }

  const handleDeleteUrl = (id) => {
    axiosDelete(`deleteurl/${id}`).
    then(res=>{
      console.log(res)
      setRender(!render)
    }).
    catch(err=>console.log(err))
  }

  useEffect(() => {
    axiosGet('allurls').then(res =>
      setData(res.data))
      .catch(err => console.log(err))
  }, [render])

  return (
    <div className="App flex flex-col items-center justify-center">
      <div className='max-w-[1360px] mt-4'>
        <h1 className="text-3xl font-bold">
          URL shortner
        </h1>
        <div className='flex'>
          <div className=''>
            <div className='flex items-center justify-center gap-10 mt-10'>
              <input
                onChange={(e) => setUserInput(e.target.value.trim())}
                type="text"
                className='shadow-sm appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Enter link here' />
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded focus:outline-none focus:shadow-outline'
                onClick={handleShortenUrl}>
                ShortenURL</button>
            </div>

            <div className='flex flex-col gap-4 w-full justify-center items-center mt-10'>
              {
                data && data.map((url) =>
                    <LinkCard
                    key={url._id}
                      urlDetails={url}
                      handleDeleteUrl={handleDeleteUrl}
                      setIsCopied={setIsCopied}
                    />
                )

              }
            </div>
          </div>
          
        </div>
      </div>
      {
        copied && <Toast/>
      }
      
    </div>
  );
}

export default App;
