
import { RxUpdate } from "react-icons/rx";
export default  function LatestInvoices() {

    const latestInvoices = [
        {
            "amount": "$448.00",
            "name": "Michael Novotny",
            "image_url": "/customers/michael-novotny.png",
            "email": "michael@novotny.com",
            "id": "2b9ca263-d070-46a4-b9a7-e25ee6d32c78"
        },
        {
            "amount": "$5.00",
            "name": "Delba de Oliveira",
            "image_url": "/customers/delba-de-oliveira.png",
            "email": "delba@oliveira.com",
            "id": "701f09a2-52b6-4e0e-80c6-431529b4593c"
        },
        {
            "amount": "$345.77",
            "name": "Balazs Orban",
            "image_url": "/customers/balazs-orban.png",
            "email": "balazs@orban.com",
            "id": "b1c463be-f102-4375-83f4-7eabd933db34"
        },
        {
            "amount": "$345.77",
            "name": "Balazs Orban",
            "image_url": "/customers/balazs-orban.png",
            "email": "balazs@orban.com",
            "id": "3acf6c3d-4516-442e-abe3-ec8689f9e338"
        },
        {
            "amount": "$542.46",
            "name": "Lee Robinson",
            "image_url": "/customers/lee-robinson.png",
            "email": "lee@robinson.com",
            "id": "0c2edd3e-c7ba-4a40-bbdd-530f3c9232f6"
        }
    ]


  
    

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`lisitana mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: Uncomment this code in Chapter 7 */}

        <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={`flex flex-row items-center justify-between py-4 ${i !== 0  && "border-t border-gray-200"} `  }>
                <div className="flex items-center">
                  <img
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
               
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`lusitana truncate text-sm font-medium md:text-base`}
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <RxUpdate className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
