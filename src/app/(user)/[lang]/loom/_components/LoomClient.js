"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import PaypalPayment from "./PaypalPayment";
import StripePayment from "./StripePayment";
import { Input } from "@/components/ui/input";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";

export default function LoomClient({ dict }) {
  const formik = useFormik({
    initialValues: {
      amount: 1,
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .min(1, "Amount must be at least 1")
        .required("Amount is required"),
    }),
    onSubmit: () => {},
    validateOnMount: true,
  });

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="flex flex-col items-center justify-center gap-4 max-[400px]:gap-0">
        <h2 className="text-2xl font-bold">{dict.purchase_looms}</h2>

        <NeonGradientCard className={`items-center justify-center text-center`}>
          <div className="p-16 max-[400px]:p-8 flex flex-col items-center justify-center gap-4 rounded-[50px] shadow-lg dark:shadow-none">
            <p>{dict.one_euro_equals_five_looms}</p>

            <div className="flex max-[400px]:flex-col items-center max-[400px]:items-start justify-center gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-base">
                  {dict.amount_in_euros}
                </label>

                <Input
                  type="number"
                  min="1"
                  id="amount"
                  name="amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="dark:bg-gray-500/20"
                />

                {formik.touched.amount && formik.errors.amount ? (
                  <div className="text-red-500 text-sm">{formik.errors.amount}</div>
                ) : null}
              </div>

              <div className="flex flex-col items-center max-[400px]:items-start justify-center gap-2 max-[400px]:w-full">
                <label className="text-xs sm:text-base text-nowrap">
                  {dict.total_looms}
                </label>
                <span className="py-2 px-6 max-[400px]:w-full font-bold border border-border rounded-md max-[400px]:px-3 dark:bg-gray-500/20">
                  {formik.values.amount <= 0 ? "-" : formik.values.amount * 5}
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <StripePayment formik={formik} dict={dict} />
              {/* <PaypalPayment formik={formik} dict={dict} /> */}
            </div>
          </div>
        </NeonGradientCard>
      </div>
    </div>
  );
}
