import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { ArrowRight, X } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils/utils";
import { Button } from "@/components/ui/button";
import { useGetUser } from "@/lib/hooks/useAuth";
import { useToast } from "@/lib/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAdminGetAdditionalRequests } from "@/lib/hooks/useAdmin";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  adminDeleteAdditionalRequest,
  adminUpdateAdditionalRequestStatus,
} from "@/services/adminServices";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AdditionalRequestSchema = Yup.object().shape({
  status: Yup.string().required("Status is required"),
  price: Yup.number().min(0, "Price must be greater than 0"),
});

export default function AdminAdditionalRequests({ project, dict }) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [step, setStep] = useState(0);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data } = useGetUser();
  const { user } = data || {};

  const { data: additionalRequests } = useAdminGetAdditionalRequests(project?.id);

  const additionalRequestsData = additionalRequests?.additional_requests || [];

  const { isLoading, mutateAsync: mutateUpdateAdditionalRequest } = useMutation({
    mutationFn: adminUpdateAdditionalRequestStatus,
    onSuccess: (data) => {
      toast({
        description: "Status updated successfully",
        className: "rounded-2xl",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-get-additional-requests"] });
      setStep(0);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error || "Something went wrong",
        className: "rounded-2xl",
      });
    },
  });

  const { isLoading: deleteLoading, mutateAsync: mutateDeleteAdditionalRequest } =
    useMutation({
      mutationFn: adminDeleteAdditionalRequest,
      onSuccess: (data) => {
        toast({
          description: "Request deleted successfully",
          className: "rounded-2xl",
        });
        setStep(0);
        queryClient.invalidateQueries({
          queryKey: ["admin-get-additional-requests"],
        });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          description: error?.response?.data?.error || "Something went wrong",
          className: "rounded-2xl",
        });
      },
    });

  const updateAdditionalRequestHandler = async ({ status, price }) => {
    const data = {
      additional_request_id: selectedRequest?.id,
      status,
      price: price === 0 ? null : price,
    };
    await mutateUpdateAdditionalRequest(data);
  };

  const updateStatusHandler = (requestId) => {
    setStep(1);
    setSelectedRequest(requestId);
  };

  const deleteAdditionalRequestHandler = async (requestId) => {
    await mutateDeleteAdditionalRequest(requestId);
  };

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
    isValid,
    setFieldValue,
  } = useFormik({
    initialValues: { status: "", price: 0 },
    validationSchema: AdditionalRequestSchema,
    onSubmit: updateAdditionalRequestHandler,
    validateOnMount: true,
  });

  const renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <Dialog>
            <DialogTrigger className="w-full dark:bg-white bg-black shadow-lg active:mt-[14px] active:bg-sky-500 mt-3 shadow-gray-700 hover:dark:shadow-sky-700 hover:dark:bg-sky-400 hover:bg-sky-600 hover:shadow-sky-800 p-3 rounded-2xl dark:text-black text-white transition-all duration-300">
              Additional Requests
            </DialogTrigger>

            <DialogContent className="sm:rounded-3xl max-w-[700px] max-h-[600px] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="mb-1">Additional Requests</DialogTitle>
                <DialogDescription className=""></DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4">
                {additionalRequestsData?.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No additional requests found
                  </p>
                )}

                {additionalRequestsData
                  ?.slice()
                  .reverse()
                  ?.map((request) => (
                    <div
                      key={request.id}
                      className="p-4 rounded-3xl bg-zinc-200 dark:bg-zinc-800 relative"
                    >
                      <Popover>
                        <PopoverTrigger className="absolute top-2 right-2 p-2 rounded-full hover:bg-red-200 dark:hover:bg-red-600/30 transition-colors duration-300 cursor-pointer">
                          <X size={20} className="text-red-500" />
                        </PopoverTrigger>

                        <PopoverContent className="rounded-2xl">
                          <div className="p-2 flex flex-col gap-2">
                            <p>Are you sure you want to delete this request?</p>

                            <div className="flex items-center gap-2">
                              <Button
                                variant="destructive"
                                className="rounded-2xl w-full"
                                onClick={() =>
                                  deleteAdditionalRequestHandler(request?.id)
                                }
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 dark:text-gray-400">
                            Status:
                          </span>
                          <span
                            className={`text-xs md:text-base px-2 py-1 rounded-lg capitalize ${
                              request?.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-700 dark:bg-yellow-500/50 dark:text-yellow-400"
                                : request?.status === "accepted"
                                ? "bg-green-500/20 text-green-700 dark:bg-green-500/50 dark:text-green-400"
                                : request?.status === "rejected"
                                ? "bg-red-500/20 text-red-700 dark:bg-red-500/50 dark:text-red-400"
                                : ""
                            }`}
                          >
                            {request?.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 dark:text-gray-400">
                            Price:
                          </span>
                          <span className="text-xs md:text-base capitalize">
                            {request?.price === 0
                              ? dict?.the_price_is_not_set_yet
                              : null}

                            {request?.status === "accepted" && (
                              <span>€{request?.price}</span>
                            )}
                          </span>

                          {request?.price > 0 && (
                            <span
                              className={`text-sm ${
                                request?.paid ? "text-green-500" : "text-red-500"
                              }`}
                            >
                              {request?.paid ? "Paid" : "Unpaid"}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-sm mb-2 max-w-[400px] md:max-w-[600px] overflow-hidden text-ellipsis">
                        {request.description}
                      </div>

                      <div className="flex items-center text-sm gap-2">
                        <span className="text-gray-500 dark:text-gray-400">ID:</span>
                        <span className="text-xs md:text-base">{request?.id}</span>
                      </div>

                      <div className="flex items-center text-sm gap-2">
                        <span className="text-gray-500 dark:text-gray-400">
                          Created at:
                        </span>
                        <span className="text-xs md:text-base">
                          {formatDate(request?.created_at)}
                        </span>
                      </div>

                      <Button
                        variant="custom"
                        className="rounded-2xl inline-block"
                        onClick={() => updateStatusHandler(request)}
                      >
                        Update Status
                      </Button>
                    </div>
                  ))}
              </div>
            </DialogContent>
          </Dialog>
        );
      case 1:
        return (
          <Dialog>
            <DialogTrigger className="w-full dark:bg-white bg-black shadow-lg active:mt-[14px] active:bg-sky-500 mt-3 shadow-gray-700 hover:dark:shadow-sky-700 hover:dark:bg-sky-400 hover:bg-sky-600 hover:shadow-sky-800 p-3 rounded-2xl dark:text-black text-white transition-all duration-300">
              Additional Requests
            </DialogTrigger>

            <DialogContent className="sm:rounded-3xl max-w-[700px]">
              <DialogHeader>
                <DialogTitle className="mb-1">Update Status</DialogTitle>
                <DialogDescription className="text-sm dark:text-white truncate max-w-[600px]"></DialogDescription>
              </DialogHeader>

              <div
                onClick={() => setStep(0)}
                className="absolute top-4 right-12 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
              >
                <ArrowRight size={20} />
              </div>

              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-start gap-1 mb-4">
                  <Select
                    id="status"
                    name="status"
                    onValueChange={(value) => setFieldValue("status", value)}
                    value={values.status}
                  >
                    <SelectTrigger className="w-full rounded-2xl bg-background/90 border">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  {touched.status && errors.status ? (
                    <div className="ml-2 text-rose-500 text-left text-xs">
                      {errors.status}
                    </div>
                  ) : null}
                </div>

                <label htmlFor="price" className="text-sm mb-1">
                  Price
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Price"
                  className="rounded-2xl px-4 py-2 bg-background/90 max-h-[220px]"
                  onBlur={handleBlur}
                  value={values.price}
                  onChange={handleChange}
                />
                {touched.price && errors.price ? (
                  <div className="ml-2 mt-2 text-rose-500 text-left text-xs">
                    {errors.price}
                  </div>
                ) : null}
              </form>

              <DialogFooter>
                <Button
                  type="submit"
                  disabled={!isValid || isLoading}
                  variant="custom"
                  className="w-full rounded-2xl"
                  onClick={() => handleSubmit()}
                >
                  {isLoading ? <Spinner className="w-6 h-6" /> : "Update"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
    }
  };

  return renderSteps();
}
