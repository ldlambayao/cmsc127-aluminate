"use client";

interface CurrentWorkModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: Array<{
        category: string;
        label: string;
        count: number;
    }>;
}

export default function CurrentWorkModal({ isOpen, onClose, data }: CurrentWorkModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:rounded-lg">                <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-red-900">
                    Where do you work now? (Company and Location)
                </h3>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                    ×
                </button>
            </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-2 px-4 text-gray-700 font-semibold">
                                    Company & Location
                                </th>
                                <th className="text-center py-2 px-4 text-gray-700 font-semibold">
                                    Count
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-2 px-4 text-gray-600">{item.category}</td>
                                    <td className="py-2 px-4 text-center text-gray-600">{item.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
