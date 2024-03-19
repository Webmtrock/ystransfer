import { HashLoader } from "react-spinners";

export function LazyLoadSpinner() {
  return (
    <>
      <div className="bg-[#01030a] fixed  md:hidden block  h-screen overflow-hidden w-full z-[999]">
        <div
          className={` relative h-screen w-full`}
        >
          <HashLoader
            color={"yellow"}
            speedMultiplier={1.9}
            loading={true}
            size={35}
            aria-label='Loading Spinner'
            data-testid='loader'
            className='top-[46%] transition-all absolute left-[46%]  translate-x-[-50%] translate-y-[-50%]'
          />
        </div>
      </div>
      <div className="fixed bg-[#01030a] h-screen hidden md:block overflow-hidden w-full z-[999]">
        <div
          className={` relative h-screen w-full`}
        >
          <HashLoader
            color={"yellow"}
            speedMultiplier={1.7}
            loading={true}
            size={50}
            aria-label='Loading Spinner'
            data-testid='loader'
            className='transition-all top-[50%] absolute  left-[50%] translate-x-[-50%] translate-y-[-50%]'
          />
        </div>
      </div>
    </>
  );
}
