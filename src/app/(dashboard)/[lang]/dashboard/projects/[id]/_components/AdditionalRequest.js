import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  additionalRequest,
  deleteAdditionalRequest,
  payForAdditionalRequest,
} from "@/services/ProjectService";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { ArrowRight, X } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { formatDate } from "@/lib/utils/utils";
import { Button } from "@/components/ui/button";
import { useGetUser } from "@/lib/hooks/useAuth";
import { useToast } from "@/lib/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useGetAdditionalRequests } from "@/lib/hooks/useProjects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const AdditionalRequestSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
});

export default function AdditionalRequest({ project, dict }) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [step, setStep] = useState(0);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data } = useGetUser();
  const { user } = data || {};

  const { data: additionalRequests } = useGetAdditionalRequests(
    project?.id,
    user?.id
  );

  const additionalRequestsData = additionalRequests?.additional_requests || [];

  const { isLoading, mutateAsync: mutateAdditionalRequest } = useMutation({
    mutationFn: additionalRequest,
    onSuccess: (data) => {
      toast({
        description: dict?.additional_request_sent_successfully,
        className: "rounded-2xl",
      });
      queryClient.invalidateQueries({ queryKey: ["get-additional-requests"] });
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

  const { isLoading: payLoading, mutateAsync: mutatePayAdditionalRequest } =
    useMutation({
      mutationFn: payForAdditionalRequest,
      onSuccess: (data) => {
        toast({
          description: dict?.additional_request_paid_successfully,
          className: "rounded-2xl",
        });
        setStep(0);
        queryClient.invalidateQueries({ queryKey: ["get-additional-requests"] });
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
      mutationFn: deleteAdditionalRequest,
      onSuccess: (data) => {
        toast({
          description: dict?.additional_request_deleted_successfully,
          className: "rounded-2xl",
        });
        setStep(0);
        queryClient.invalidateQueries({ queryKey: ["get-additional-requests"] });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          description: error?.response?.data?.error || "Something went wrong",
          className: "rounded-2xl",
        });
      },
    });

  const additionalRequestHandler = async ({ description }) => {
    const data = {
      project_id: project?.id,
      description,
    };
    await mutateAdditionalRequest(data);
  };

  const payHandler = (requestId) => {
    setStep(2);
    setSelectedRequest(requestId);
  };

  const deleteAdditionalRequestHandler = async (requestId) => {
    await mutateDeleteAdditionalRequest(requestId);
  };

  const payAdditionalRequestHandler = async () => {
    const data = {
      project_id: project?.id,
      request_id: selectedRequest?.id,
    };
    await mutatePayAdditionalRequest(data);
  };

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
    isValid,
  } = useFormik({
    initialValues: { description: "" },
    validationSchema: AdditionalRequestSchema,
    onSubmit: additionalRequestHandler,
    validateOnMount: true,
  });

  const renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <Dialog>
            <DialogTrigger className="w-full dark:bg-white bg-black shadow-lg active:mt-[14px] active:bg-sky-500 mt-3 shadow-gray-700 hover:dark:shadow-sky-700 hover:dark:bg-sky-400 hover:bg-sky-600 hover:shadow-sky-800 p-3 rounded-2xl dark:text-black text-white transition-all duration-300">
              {dict?.additional_request}
            </DialogTrigger>

            <DialogContent className="sm:rounded-3xl max-w-[700px] max-h-[600px] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="mb-1">
                  {dict?.additional_request}
                </DialogTitle>
                <DialogDescription className="">
                  <Button
                    variant="custom"
                    className="rounded-2xl inline-block"
                    onClick={() => setStep(1)}
                  >
                    {dict?.send_an_additional_request}
                  </Button>
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4">
                {additionalRequestsData
                  ?.slice()
                  .reverse()
                  ?.map((request) => (
                    <div
                      key={request.id}
                      className="p-4 rounded-3xl bg-zinc-200 dark:bg-zinc-800 relative"
                    >
                      {request?.status === "pending" && (
                        <Popover>
                          <PopoverTrigger className="absolute top-2 right-2 p-2 rounded-full hover:bg-red-200 dark:hover:bg-red-600/30 transition-colors duration-300 cursor-pointer">
                            <X size={20} className="text-red-500" />
                          </PopoverTrigger>

                          <PopoverContent className="rounded-2xl">
                            <div className="p-2 flex flex-col gap-2">
                              <p>
                                {dict?.are_you_sure_you_want_to_delete_this_request}
                              </p>

                              <div className="flex items-center gap-2">
                                <Button
                                  variant="destructive"
                                  className="rounded-2xl w-full"
                                  onClick={() =>
                                    deleteAdditionalRequestHandler(request?.id)
                                  }
                                >
                                  {dict?.delete}
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}

                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 dark:text-gray-400">
                            {dict?.status}:
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

                        {request?.status !== "rejected" && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">
                              {dict?.price}:
                            </span>
                            <span className="text-xs md:text-base capitalize">
                              {request?.price === 0
                                ? dict?.the_price_is_not_set_yet
                                : null}

                              {request?.status === "accepted" && (
                                <span className="text-sm text-green-500">
                                  €{request?.price}
                                </span>
                              )}
                            </span>
                            {request?.price > 0 && (
                              <span
                                className={`text-sm ${
                                  request?.paid ? "text-green-500" : "text-red-500"
                                }`}
                              >
                                {request?.paid ? dict?.paid : dict?.unpaid}
                              </span>
                            )}
                          </div>
                        )}
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
                          {dict?.created_at}:
                        </span>
                        <span className="text-xs md:text-base">
                          {formatDate(request?.created_at)}
                        </span>
                      </div>

                      {request?.paid ||
                      request?.price === 0 ||
                      request?.status === "rejected" ||
                      request?.status === "pending" ? null : (
                        <Button
                          variant="custom"
                          className="rounded-2xl"
                          onClick={() => payHandler(request)}
                        >
                          {dict?.pay}
                        </Button>
                      )}
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
              {dict?.additional_request}
            </DialogTrigger>

            <DialogContent className="sm:rounded-3xl max-w-[700px]">
              <DialogHeader>
                <DialogTitle className="mb-1">
                  {dict?.additional_request}
                </DialogTitle>
                <DialogDescription className="text-sm dark:text-white truncate max-w-[600px]"></DialogDescription>
              </DialogHeader>

              <div
                onClick={() => setStep(0)}
                className="absolute top-4 right-12 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
              >
                <ArrowRight size={20} />
              </div>

              <form onSubmit={handleSubmit}>
                <div className="text-sm mb-1">
                  {dict?.additional_request_description}
                </div>

                <Textarea
                  id="description"
                  name="description"
                  placeholder={dict?.description}
                  className="rounded-2xl px-4 py-2 bg-background/90 max-h-[220px]"
                  onBlur={handleBlur}
                  value={values.description}
                  onChange={handleChange}
                  rows={4}
                />
                {touched.description && errors.description ? (
                  <div className="ml-2 mt-2 text-rose-500 text-left text-xs">
                    {errors.description}
                  </div>
                ) : null}
              </form>

              <DialogFooter>
                <Button
                  type="submit"
                  disabled={!isValid || isLoading}
                  variant="custom"
                  className="w-full rounded-2xl"
                  onClick={() => additionalRequestHandler(values)}
                >
                  {isLoading ? <Spinner className="w-6 h-6" /> : dict?.send}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      case 2:
        return (
          <Dialog>
            <DialogTrigger className="w-full dark:bg-white bg-black shadow-lg active:mt-[14px] active:bg-sky-500 mt-3 shadow-gray-700 hover:dark:shadow-sky-700 hover:dark:bg-sky-400 hover:bg-sky-600 hover:shadow-sky-800 p-3 rounded-2xl dark:text-black text-white transition-all duration-300">
              {dict?.additional_request}
            </DialogTrigger>

            <DialogContent className="sm:rounded-3xl max-w-[700px]">
              <DialogHeader>
                <DialogTitle className="mb-1">
                  {dict?.pay_for_additional_request}
                </DialogTitle>
                <DialogDescription className="text-sm dark:text-white max-w-[600px]">
                  {dict?.you_need} {selectedRequest?.price * 5}{" "}
                  {dict?.loom_to_pay_for_additional_request}
                </DialogDescription>
              </DialogHeader>

              <div
                onClick={() => setStep(0)}
                className="absolute top-4 right-12 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
              >
                <ArrowRight size={20} />
              </div>

              <DialogFooter>
                <Button
                  variant="custom"
                  className="w-full rounded-2xl"
                  onClick={payAdditionalRequestHandler}
                >
                  {payLoading ? <Spinner className="w-6 h-6" /> : dict?.pay}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
    }
  };

  return renderSteps();
}
