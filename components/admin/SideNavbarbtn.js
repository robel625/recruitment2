

function SideNavbarbtn({Icon, text, open, active, onClick, href , ref }) {
  return (
    <div href={href} onClick={onClick} ref={ref} className={`flex mb-2 justify-start items-center gap-4 pl-4 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto
    ${active && "bg-gray-200 group-hover:!text-white "} `}>
        <Icon className={`text-2xl text-gray-600 group-hover:text-white  `}></Icon>
        <h3 className={` text-gray-800 group-hover:text-white font-semibold
                        ${!open && "hidden"} origin-left duration-200 `} >
            {text}
        </h3>

    </div>
  )
}

export default SideNavbarbtn