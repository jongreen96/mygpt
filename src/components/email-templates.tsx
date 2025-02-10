export const EmailTemplate = ({ firstName }: { firstName: string }) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);

export const AdminTransactionEmail = ({ pricePaid }: { pricePaid: number }) => (
  <div>
    <h1>MULA!</h1>
    <p>Holy shit someone actually sent you money!</p>
    <p>Amount: ${pricePaid}</p>
  </div>
);
