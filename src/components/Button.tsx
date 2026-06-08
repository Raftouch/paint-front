interface ButtonProps {
  imageName: string;
  onClick: () => void;
}

export default function Button({ imageName, onClick }: ButtonProps) {
  return (
    <button
      className="w-[25px] h-[25px] cursor-pointer bg-center bg-no-repeat"
      style={{ backgroundImage: `url(/images/${imageName}.png)` }}
      onClick={onClick}
    ></button>
  );
}
