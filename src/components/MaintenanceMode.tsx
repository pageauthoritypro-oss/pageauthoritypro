import { isMaintenanceMode } from "@/sanity/helpers/settings";

export async function MaintenanceMode({
  children,
}: {
  children: React.ReactNode;
}) {
  const maintenance = await isMaintenanceMode();

  if (maintenance) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
          <h1 className="mb-4 text-3xl font-bold">Site Under Maintenance</h1>
          <p className="text-gray-600">
            We&apos;re currently performing scheduled maintenance. Please check
            back soon.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
