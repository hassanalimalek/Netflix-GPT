import { ReactElement } from 'react';

type TListingGrid = {
  items: any[];
  loading: boolean;
  loadingSekeletonItems: number;
  renderItem: (item: any) => ReactElement;
};

/**
 *
 * @param items - Array of items to be listed - Array
 * @param loading - Loading state - Boolean
 * @param loadingSekeletonItems - Number of items to show in loading skeleton - Number
 * @param renderItem : Callback function that takes in an item from items and return a react element that uses the item to be rendered
 *
 * @returns Listing Grid
 */

function ListingGrid({
  items,
  loading,
  loadingSekeletonItems,
  renderItem,
}: TListingGrid) {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 md:gap-5 lg:gap-6  justify-center'>
      {loading
        ? // Loading Sekeleton
          (loadingSekeletonItems > 0
            ? Array.from({ length: loadingSekeletonItems }, (i) => i)
            : [1, 2, 3, 4, 5, 6, 7, 8, 9]
          ).map((index) => {
            return (
              <div
                key={index as number}
                role='status'
                className='animate-pulse    shadow-sm  rounded-sm'
              >
                <div className='flex items-center justify-center h-64  bg-gray-300 rounded dark:bg-gray-700'>
                  <svg
                    className='w-10 h-10 text-white dark:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 16 20'
                  >
                    <path d='M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z' />
                    <path d='M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z' />
                  </svg>
                </div>
              </div>
            );
          })
        : // Rendering Items
          items &&
          Array.isArray(items) &&
          items?.map((item: any) => {
            return renderItem && renderItem(item);
          })}
    </div>
  );
}

export default ListingGrid;
