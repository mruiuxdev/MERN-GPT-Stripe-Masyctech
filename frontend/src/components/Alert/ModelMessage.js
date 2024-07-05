export const ModelMessage = ({ message }) => {
  return (
    <dialog className="modal" open>
      <div className="modal-box bg-[#FFE9D1] dark:bg-[#14181c] shadow-lg rounded-md text-center">
        <p className="py-4">{message}</p>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </dialog>
  );
};
