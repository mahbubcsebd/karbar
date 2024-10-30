import Link from 'next/link'

const Pagination = () => {
  return (
    <div className='pagination'>
        <ul className='flex items-center gap-[5px]'>
            <li><Link className='w-10 h-8 rounded-lg flex justify-center items-center text-[13px] text-[#ccc] bg-white hover:bg-[#086CD9] hover:text-white transition duration-150 font-semibold' href="#">Prev</Link></li>
            <li><Link className='w-8 h-8 rounded-lg flex justify-center items-center text-[13px] text-white bg-[#086CD9] hover:bg-[#086CD9] hover:text-white transition duration-150 font-semibold' href="#">1</Link></li>
            <li><Link className='w-8 h-8 rounded-lg flex justify-center items-center text-[13px] text-gray-900 bg-white hover:bg-[#086CD9] hover:text-white transition duration-150 font-semibold' href="#">2</Link></li>
            <li><Link className='w-8 h-8 rounded-lg flex justify-center items-center text-[13px] text-gray-900 bg-white hover:bg-[#086CD9] hover:text-white transition duration-150 font-semibold' href="#">3</Link></li>
            <li><Link className='w-8 h-8 rounded-lg flex justify-center items-center text-[13px] text-gray-900 bg-white hover:bg-[#086CD9] hover:text-white transition duration-150 font-semibold' href="#">...</Link></li>
            <li><Link className='w-8 h-8 rounded-lg flex justify-center items-center text-[13px] text-gray-900 bg-white hover:bg-[#086CD9] hover:text-white transition duration-150 font-semibold' href="#">10</Link></li>
            <li><Link className='w-10 h-8 rounded-lg flex justify-center items-center text-[13px] text-gray-900 bg-white hover:bg-[#086CD9] hover:text-white transition duration-150 font-semibold' href="#">Next</Link></li>
        </ul>
    </div>
  )
}

export default Pagination