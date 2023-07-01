export default async function Page() {
  const transformedExpensesData = getTransformedData(mockData);

  return (
    <div className="mx-auto px-3 sm:container">
      <h2 className="text-lg text-white text-center">Expense Page</h2>
      {transformedExpensesData.map((elem) => {
        const formattedDate = new Date(elem.date).toDateString();

        return (
          <div
            key={elem.date}
            className="text-white border border-gray-600 rounded-md p-2 my-2"
          >
            <div className="grid grid-cols-[1fr,_auto]">
              <h2 className="font-semibold text-blue-600">{formattedDate}</h2>
              <h2 className="font-semibold text-red-700 mb-2">₱ 5600</h2>
            </div>

            {elem.expenses?.map((expense) => (
              <div
                className="grid grid-cols-[1fr,_auto] [&:not(:last-child)]:border-b border-gray-600 [&:not(:last-child)]:mb-2"
                key={expense.id}
              >
                <h2 className="text-white">{expense.details}</h2>
                <h2 className="text-red-700">₱ {expense.amount}</h2>
                <h2 className="text-gray-500">{expense.category}</h2>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

interface TransformedData {
  date: string;
  expenses: {
    id: string;
    date: string;
    amount: number;
    category: string;
    details: string;
  }[];
}
const getTransformedData = (mData: typeof mockData) => {
  const tempArr: TransformedData[] = [];

  mData.forEach((expense) => {
    if (!tempArr.some((elem) => elem.date === expense.date)) {
      tempArr.push({
        date: expense.date,
        expenses: [expense],
      });
    } else {
      const dateIdx = tempArr.findIndex((elem) => elem.date === expense.date);
      tempArr[dateIdx].expenses.push(expense);
    }
  });

  return tempArr;
};

const mockData = [
  {
    id: '88dce551-ed3b-4aba-94f2-572b47890589',
    date: '2023-06-06',
    amount: 661.5,
    category: 'Toiletries / Supplies',
    details: 'Eneloop batteries aaa shopee',
  },
  {
    id: '9d338ecc-fa45-43fd-a36b-3392c2d45bf4',
    date: '2023-06-06',
    amount: 2435.5,
    category: 'Toiletries / Supplies',
    details:
      'Lazada eufy weighing scale, eneloop aaa battery, indoplas 200 pcs mask',
  },
  {
    id: '3ab79288-9638-4554-b25c-df0b06cf6896',
    date: '2023-06-05',
    amount: 4000,
    category: 'Groceries',
    details: 'Groceries',
  },
  {
    id: '3aba2d21-fc2f-4d59-9ccc-98abcd0a37e4',
    date: '2023-06-05',
    amount: 1000,
    category: 'Internet Bill',
    details: 'Pldt internet ',
  },
  {
    id: '3a1fb4ec-cf5b-4821-b155-e74fb612afe1',
    date: '2023-06-03',
    amount: 757.5,
    category: 'Dining Out',
    details: 'Pancake house dinner',
  },
  {
    id: '8e8802b2-4cc9-4e0c-8ff6-b93fb9a598b1',
    date: '2023-06-03',
    amount: 580,
    category: 'Fun Money',
    details: 'Festival mall movie premium seats for spider verse movie',
  },
  {
    id: 'd52b81bd-c7b2-44fa-b096-37ed1d8993bf',
    date: '2023-06-03',
    amount: 150,
    category: 'Dining Out',
    details: 'Landmark alabang rice balls',
  },
  {
    id: '4d5a7132-ee4d-4741-9653-42be031d8d1e',
    date: '2023-06-03',
    amount: 197,
    category: 'Transport Commute',
    details: 'Grab car from bea to festival',
  },
  {
    id: '4491a32c-f691-43f2-884d-3a6260ea2dbc',
    date: '2023-06-02',
    amount: 790,
    category: 'Dining Out',
    details: "Concordia's cafe New zealand steak and mozzarella sticks",
  },
  {
    id: '7fc1b9f1-c082-41a2-8dbc-5149520bd82f',
    date: '2023-06-02',
    amount: 10,
    category: 'Transport Commute',
    details: 'Trike to sucat highway',
  },
];
