import CustomCombobox from "@/app/components/shared/customCombobox"

const traces = [
    { id:'1', name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { id:'2', name: 'Lindsay Waltonasdas', title: 'Front-end Developer asd', email: 'lindsay.walton@examsaple.com', role: 'Member' },
    // More traces...
]
  
export default function TracesList({setSelectedTrace}) {
    return (
        <div className="mt-5 flex flex-col gap-4">
            <div className="flex flex-row gap-4">
                <CustomCombobox/>
                <CustomCombobox/>
            </div>
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle border border-gray-600 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-500">
                        <thead>
                            <tr className="bg-gray-800">
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-3">
                                    Name
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                                    Title
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                                    Email
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                                    Role
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-900">
                            {traces.map((trace) => (
                                <tr key={trace.id} className="even:bg-gray-800">
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-3">
                                    {trace.name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">{trace.title}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">{trace.email}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">{trace.role}</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                        <button onClick={() => setSelectedTrace(trace)} 
                                        className="text-indigo-600 hover:text-indigo-900">
                                            Open<span className="sr-only">, {trace.name}</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
  