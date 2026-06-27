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
      <div className="fixed top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Type you name
        </h1>
        <input
          type="text"
          ref={username}
          className="mb-5 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
        />
        <button
          className="w-full rounded-md bg-green-700 px-4 py-2 font-medium text-white transition hover:bg-green-800 active:scale-[0.98]"
          onClick={onConnect}
        >
          Enter
        </button>
      </div>
    </>
  );
}
