import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <SignIn
        appearance={{
          layout: {
            socialButtonsPlacement: "bottom", // Keep social buttons in place
          },
          elements: {
            poweredByClerk: "hidden important", // Hide "Secured by Clerk"
          },
        }}
      />
    </div>
  );
}
