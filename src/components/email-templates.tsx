export const EmailTemplate = ({ firstName }: { firstName: string }) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);

export const NewUserEmail = () => (
  <div>
    <h1>New User!</h1>
    <p>Holy shit someone actually signed up!</p>
  </div>
);
