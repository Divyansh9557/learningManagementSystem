import { ReactNode } from 'react'
import Sidebar from './Sidebar';

const AdminLayout = ({ children }:{children:ReactNode}) => {
  return(<>
  
  <div className='flex flex-col md:flex-row   ' >
  <Sidebar/> 
      {children}
  </div>
  </>)
};

export default AdminLayout