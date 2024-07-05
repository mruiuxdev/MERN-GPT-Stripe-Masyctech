import { useQuery } from "@tanstack/react-query";
import { profileAPI } from "../../apis/users/usersApi";
import { ModelMessage } from "../Alert/ModelMessage";
import { Alert } from "../Alert/Alert";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export const Dashboard = () => {
  const { isLoading, isError, isPending, data, error } = useQuery({
    queryFn: profileAPI,
    queryKey: ["profile"],
  });

  if (isLoading || isPending) {
    return <ModelMessage message="The data dashboard loading..." />;
  }

  if (isError) {
    return (
      <div className="mt-32 container mx-auto">
        <Alert
          type="alert-error"
          message={error?.response?.data?.message || "Something went wrong ..."}
        />
      </div>
    );
  } else {
    return (
      <div className="bg-[#FFE9D1] dark:bg-[#14181c] container mx-auto p-8 m-8 mt-32 rounded-lg max-[1320px]">
        <h1 className="text-center text-xl font-semibold">Dashboard</h1>
        <div className="mt-6 grid gap-6 xl:grid-cols-12">
          <div className="lg:col-span-5">
            <div
              aria-label="Card"
              className="card bg-base-100 card-bordered h-full"
            >
              <div className="flex items-center justify-between px-5 py-4">
                <span className="font-medium">Profile Information</span>
              </div>
              <hr />
              <div className="p-5 space-y-3">
                <div className="grow">
                  <div className="flex">
                    <p className="grow font-medium">Username</p>
                    <p className="grow font-medium text-end">
                      {data?.user?.username}
                    </p>
                  </div>
                </div>
                <div className="grow">
                  <div className="flex">
                    <p className="grow font-medium">Email</p>
                    <p className="grow font-medium text-end">
                      {data?.user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div
              aria-label="Card"
              className="card bg-base-100 card-bordered h-full"
            >
              <div className="flex items-center justify-between px-5 py-4">
                <span className="font-medium">Credit Usage</span>
              </div>
              <hr />
              <div className="p-5 space-y-3">
                <div className="grow">
                  <div className="flex">
                    <p className="grow font-medium">Monthly Credit</p>
                    <p className="grow font-medium text-end">
                      {data?.user?.monthlyRequestCount}
                    </p>
                  </div>
                </div>
                <div className="grow">
                  <div className="flex">
                    <p className="grow font-medium">Credit Used</p>
                    <p className="grow font-medium text-end">
                      {data?.user?.apiRequestCount}
                    </p>
                  </div>
                </div>
                <div className="grow">
                  <div className="flex">
                    <p className="grow font-medium">Credit Remaining</p>
                    <p className="grow font-medium text-end">
                      {data?.user?.monthlyRequestCount -
                        data?.user?.apiRequestCount}
                    </p>
                  </div>
                </div>
                <div className="grow">
                  <div className="flex">
                    <p className="grow font-medium">Next Billing Date</p>
                    <p className="grow font-medium text-end">
                      {data?.user?.nextBillingDate || "No billing date"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div
              aria-label="Card"
              className="card bg-base-100 card-bordered h-full"
            >
              <div className="flex items-center justify-between px-5 py-4">
                <span className="font-medium">Payment Plan</span>
              </div>
              <hr />
              <div className="p-5 space-y-3">
                <div className="grow">
                  <div className="flex">
                    <p className="grow font-medium">Current plan</p>
                    <p className="grow font-medium text-end">
                      {data?.user?.subscriptionPlan}
                    </p>
                  </div>
                  {data?.user?.subscriptionPlan === "Trial" && (
                    <p className="grow font-medium p-2 border bg-warning-content border-warning rounded-md mt-2">
                      Trial: 1000 monthly request
                    </p>
                  )}
                  {data?.user?.subscriptionPlan === "Free" && (
                    <p className="grow font-medium p-2 border bg-warning-content border-warning rounded-md mt-2">
                      Free: 5 monthly request
                    </p>
                  )}
                  {data?.user?.subscriptionPlan === "Basic" && (
                    <p className="grow font-medium p-2 border bg-warning-content border-warning rounded-md mt-2">
                      Basic: 50 monthly request
                    </p>
                  )}
                  {data?.user?.subscriptionPlan === "Premium" && (
                    <p className="grow font-medium p-2 border bg-warning-content border-warning rounded-md mt-2">
                      Premium: 100 monthly request
                    </p>
                  )}
                </div>
                <div className="text-end">
                  <Link to="/" className="btn btn-primary mt-8">
                    Upgrade Plan
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div
              aria-label="Card"
              className="card bg-base-100 card-bordered h-full"
            >
              <div className="flex items-center justify-between px-5 py-4">
                <span className="font-medium">Trial Information</span>
              </div>
              <hr />
              <div className="p-5 space-y-3">
                <div className="grow">
                  <div className="flex">
                    <p className="grow font-medium">Trial Status</p>
                    <p className="grow font-medium text-end">
                      {data?.user?.trialActive ? (
                        <span className="badge badge-success">Active</span>
                      ) : (
                        <span className="badge badge-warning">Inactive</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="grow">
                  <div className="flex">
                    <p className="grow font-medium">Expires on</p>
                    <p className="grow font-medium text-end">
                      {format(data?.user?.trialExpires, "dd MMMM yyy")}
                    </p>
                  </div>
                </div>
                <div className="text-end">
                  <Link to="/" className="btn btn-primary mt-8">
                    Upgrade to Premium
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Payment History */}
          <div className="lg:col-span-12">
            <div
              aria-label="Card"
              className="card bg-base-100 card-bordered h-full"
            >
              <div className="flex items-center justify-between px-5 py-4">
                <span className="font-medium">Payment History</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
