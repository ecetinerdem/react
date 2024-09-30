import './index.css'; 
import SignIn from "./components/SignIn"



function App() {


  return (
    <>
    <div className='text-white h-[100vh] flex items-center justify-center bg-cover' style={{backgroundImage: "url('https://fastly.picsum.photos/id/83/2560/1920.jpg?hmac=LFdAxfpbYKs0hZr0LhHVWyqXarWGg7FtM8pIzJPBc0w')"}}>
      <SignIn />
    </div>
    </>
  )
}

export default App
