import type { RefObject } from "react";

interface ModalProps {
  username: RefObject<HTMLInputElement | null>;
  onClose: () => void;
  onConnect: () => void;
}

export default function Modal({ username, onClose, onConnect }: ModalProps) {
  return (
    <>
      <div
        className="fixed bg-black/50 top-0 right-0 left-0 bottom-0"
        onClick={onClose}
      />
      <div className="fixed flex flex-col min-w-[400px] min-h-[200px] p-10 rounded bg-white text-black top-40 left-1/2 -translate-x-1/2">
        <h1 className="text-center mb-10">Type you name</h1>
        <input type="text" ref={username} />
        <button
          className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 font-medium"
          onClick={onConnect}
        >
          Enter
        </button>
      </div>
    </>
  );
}
