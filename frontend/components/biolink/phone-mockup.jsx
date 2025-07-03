export default function PhoneMockup({ children }) {
  return (
    <div className="relative mx-auto border-gray-300 dark:border-gray-800 bg-gray-300 dark:bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-full max-w-[300px]">
      <div className="h-[32px] w-[3px] bg-gray-300 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-300 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-300 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-300 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-full max-w-[272px] h-[572px] bg-white dark:bg-gray-800">
        {children}
      </div>
    </div>
  );
}
