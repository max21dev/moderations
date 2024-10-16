export const EmptyGroupsList = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full flex justify-center mt-8">
        <h1 className="text-2xl text-muted-foreground">No groups found</h1>
      </div>

      <div className="w-full flex justify-center mt-4">
        <p className="text-muted-foreground">There are no groups available for this relay</p>
      </div>
    </div>
  );
};
