

function HeaderLink({Icon, text, avatar, feed, active, hidden}) {
  return (
    <div className={`md:ml-8 text-ms md:my-0 my-7 cursor-pointer md:flex flex-col justify-center items-center
    text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1
    ${active && "!text-black dark:!text-white"}`}>
        <Icon></Icon>
        <h4>{text}</h4>
    </div>
  )
}

export default HeaderLink