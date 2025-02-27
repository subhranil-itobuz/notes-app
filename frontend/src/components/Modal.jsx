import { MdCancel } from "react-icons/md";


const Modal = ({ children, onClose, height, width }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-20 bg-[#16425b] bg-opacity-75 backdrop-blur-md flex items-center justify-center px-5">
      <div className={`bg-[#a2c8de] shadow-2xl p-[20px] rounded-xl relative z-30 ${width} ${height} overflow-y-auto `}>
        {children}
        <button className="absolute top-6 right-6 bg-transparent border-none text-sm cursor-pointer hover:scale-105" onClick={onClose}>
          <MdCancel size={20} />
        </button>
      </div>
    </div >
  );
}

export default Modal;
