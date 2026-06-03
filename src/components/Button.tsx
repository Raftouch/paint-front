interface ButtonProps {
  imageName: string;
}

export default function Button({ imageName }: ButtonProps) {
  return (
    <button
      className="w-[25px] h-[25px] cursor-pointer bg-center bg-no-repeat"
      style={{ backgroundImage: `url(/images/${imageName}.png)` }}
    ></button>
  );
}
