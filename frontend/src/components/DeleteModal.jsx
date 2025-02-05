
const DeleteModal = (openModal, setOpenModal) => {

    const handleCancelation = () => {
        setOpenModal(false)
    }
    return (
        <div>
            <button onClick={handleCancelation}>Cancel</button>
        </div>
    )
}

export default DeleteModal