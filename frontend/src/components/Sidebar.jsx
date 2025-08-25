import React, { useState } from 'react'
import ComposePopup from './ComposePopup';
import { LuPencil } from "react-icons/lu";
import { IoMdStar } from "react-icons/io";
import { MdOutlineWatchLater, MdOutlineKeyboardArrowDown, MdOutlineDrafts, MdInbox } from "react-icons/md";
import { TbSend2 } from "react-icons/tb";

// Items ko yaha define kiye hain
const sidebarItems = [
  {
    icon: <MdInbox size={"20px"} />,
    text: "Inbox"
  },
  {
    icon: <IoMdStar size={"20px"} />,
    text: "Starred"
  },
  {
    icon: <MdOutlineWatchLater size={"20px"} />,
    text: "Snoozed"
  },
  {
    icon: <TbSend2 size={"20px"} />,
    text: "Sent"
  },
]

const Sidebar = ({ onEmailSent, onSelect }) => {
  const [selected, setSelected] = useState(0);
  const [showCompose, setShowCompose] = useState(false);
  return (
    <div className='hidden md:block w-64 md:w-[15%] min-w-[64px] max-w-xs transition-all duration-300 bg-white h-full'>
      {/* Compose button */}
      <div className='p-3 pl-3'>
        <button className='flex items-center gap-2 bg-[#C2E7FF] p-4 rounded-2xl hover:shadow-md' onClick={() => setShowCompose(true)}>
          <LuPencil size={"24px"} />
          Compose
        </button>
      </div>
      {showCompose && <ComposePopup onClose={() => setShowCompose(false)} onSend={onEmailSent} />}
      {/* Sidebar ke sare items */}
      <div className='text-gray-500'>
        {
          sidebarItems.map((item, idx) => {
            // Hide all mails in Drafts tab (show empty or custom message)
            if (item.isDraft && selected === idx) {
              return (
                <div key={idx} className={`${selected === idx ? 'bg-[#C2E7FF] text-black' : "hover:bg-gray-200 hover:text-black"} flex pl-10 py-1 rounded-r-full items-center gap-4 my-2  hover:cursor-pointer px-10`}>
                  {item.icon}
                  <p className={selected === idx ? 'font-bold' : ''}>{item.text}</p>
                  <span className="ml-4 text-gray-400 text-xs">(No drafts)</span>
                </div>
              );
            }
            return (
              <div onClick={() => { setSelected(idx); if (onSelect) onSelect(idx); }} key={idx} className={`${selected === idx ? 'bg-[#C2E7FF] text-black' : "hover:bg-gray-200 hover:text-black"} flex pl-10 py-1 rounded-r-full items-center gap-4 my-2  hover:cursor-pointer px-10`}>
                {item.icon}
                <p className={selected === idx ? 'font-bold' : ''}>{item.text}</p>
              </div>
            )
          })
        }
        {/* More button  */}
        <div className='flex items-center pl-10 gap-4 cursor-pointer hover:bg-gray-200 rounded-r-full py-1'>
          <MdOutlineKeyboardArrowDown size={"20px"} />
          <span>More</span>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Sidebar