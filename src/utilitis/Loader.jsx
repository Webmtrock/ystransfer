import { PulseLoader } from "react-spinners";

export function Loader({ show }) {
  return (
    show && (
      <div
        className={`sweet-loading backdrop-blur-[1px] bg-black bg-opacity-20 fixed top-[50%] left-[50%] translate-x-[-50%] z-[199] translate-y-[-50%]  h-screen w-full`}
      >
        <PulseLoader
          color={"yellow"}
          loading={show}
          size={25}
          aria-label='Loading Spinner'
          data-testid='loader'
          className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'
        />
      </div>
    )
  );
}
