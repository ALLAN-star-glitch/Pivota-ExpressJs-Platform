import Image from "next/image";

const NavBarDashboard = () => {
  return (
    <div className="flex justify-between items-center py-4 pr-3 h-20 px-4 bg-pivotaWhite shadow-md">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-pivotaTeal px-2 ml-3">
        <Image src="/search.png" height={14} width={14} alt="search" />
        <input
          type="text"
          placeholder="search..."
          className="w-[200px] p-2 bg-transparent outline-none text-pivotaTeal"
        />
      </div>

      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        {/* Message Icon */}
        <div className="bg-pivotaWhite rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-pivotaTeal hover:bg-opacity-10">
          <Image src="/message.png" alt="message" width={20} height={20} />
        </div>

        {/* Announcement Icon with Badge */}
        <div className="bg-pivotaWhite rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative hover:bg-pivotaTeal hover:bg-opacity-10">
          <Image src="/announcement.png" alt="announcement" width={20} height={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-pivotaGold text-pivotaWhite rounded-full text-sm">
            1
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium text-pivotaTeal">Eng Allan</span>
          <span className="text-[10px] text-pivotaTeal text-right">Admin</span>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-pivotaTeal">
          <Image src="/allan.jpg" alt="avatar" width={36} height={36} className="object-cover" />
        </div>
      </div>
    </div>
  );
};

export default NavBarDashboard;
