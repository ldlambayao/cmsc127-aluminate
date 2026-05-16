"use client";

interface EmailEntry {
    category: string;
    label: string;
    count: number;
}

interface EmailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: EmailEntry[];
}

export default function EmailsModal({
    isOpen,
    onClose,
    data,
}: EmailsModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-x font-medium text-red-900">
                        All Emails
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
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-600">{item.label}</td>
                                    <td className="py-3 px-4 text-gray-700">
                                        <p className="line-clamp-10">{item.category}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="mt-4 px-4 py-2 text-red-800 rounded text-xs font-medium hover:underline transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
