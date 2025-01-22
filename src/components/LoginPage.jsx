
import React from 'react'
import StudentForm from './StudentForm'
import { CoordinatorForm} from './CoordinatorForm'
import Nabar from './Nabar'
import gcek from '../assets/gcek.png'

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-2/4 h-auto flex justify-center items-center">
          <img className="w-2/5 h-auto flex justify-center items-center" src={gcek} alt='gcek'/>
      </div>

    <div className="w-3/4 flex flex-col justify-center items-center">
      <div >
        <div className='w-full'>
          <h1 className="text-3xl font-bold text-center mb-4 text-blue-800">
            Sign In To GCEK Placement Portal
          </h1>
        </div>
       <div>
        
 
        <div >
            <Nabar/>
        </div>
        
        <div className='underline'>
          
        </div>

      </div> 


      </div>
      <div className='p-8 m-4'>
          {/* <StudentForm/> */}
          <CoordinatorForm/>
      </div>
    </div>
    </div>
  )
};

export default LoginPage;
