import { useState } from 'react';
import { Typography } from '@/components/ui/Typography/Typography';
import { OrderReview, LineItem } from './types';
import { Button } from '@/components/ui/Button/Button';
import { useRouter } from 'next/navigation';

interface ReviewStepProps {
  orderData: OrderReview;
  onEdit: (section: string) => void;
  onSubmit: () => Promise<void>;
}

export function ReviewStep({
  orderData,
  onEdit,
  onSubmit
}: ReviewStepProps) {
  const router = useRouter();
  const [confirmationChecked, setConfirmationChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await onSubmit();
      router.push('/orders');
    } catch (error) {
      console.error('Error submitting order:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSectionHeader = (title: string, section: string) => (
    <div className="flex items-center justify-between mb-4">
      <Typography variant="h2" className="text-xl font-semibold">
        {title}
      </Typography>
      <button
        onClick={() => onEdit(section)}
        className="text-sm text-blue-600 hover:text-blue-800"
      >
        Edit
      </button>
    </div>
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-8">
      <Typography variant="h1" className="text-2xl font-bold mb-6">
        Review Order
      </Typography>

      {/* Order Summary */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h3" className="text-2xl font-semibold text-gray-900">
            Order Summary
          </Typography>
          <Button
            buttonType="outline"
            colorVariant="blue"
            size="s"
            onClick={() => onEdit('summary')}
          >
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <Typography variant="subtitle2" className="text-sm text-gray-600 mb-1">
              Project Name
            </Typography>
            <Typography variant="body1" className="text-gray-900">
              {orderData.basicInfo.project.name}
            </Typography>
          </div>

          <div>
            <Typography variant="subtitle2" className="text-sm text-gray-600 mb-1">
              Customer
            </Typography>
            <Typography variant="body1" className="text-gray-900">
              {orderData.basicInfo.customer.name}
            </Typography>
          </div>

          <div>
            <Typography variant="subtitle2" className="text-sm text-gray-600 mb-1">
              Industry
            </Typography>
            <Typography variant="body1" className="text-gray-900">
              {orderData.basicInfo.project.industry}
            </Typography>
          </div>

          <div>
            <Typography variant="subtitle2" className="text-sm text-gray-600 mb-1">
              Design Phase
            </Typography>
            <Typography variant="body1" className="text-gray-900">
              {orderData.basicInfo.project.designPhase}
            </Typography>
          </div>

          <div className="col-span-2">
            <Typography variant="subtitle2" className="text-sm text-gray-600 mb-1">
              Part Use / Design Intent
            </Typography>
            <Typography variant="body1" className="text-gray-900">
              {orderData.basicInfo.project.description}
            </Typography>
          </div>

          <div>
            <Typography variant="subtitle2" className="text-sm text-gray-600 mb-1">
              Material Flexibility
            </Typography>
            <Typography variant="body1" className="text-gray-900">
              {orderData.basicInfo.materialFlexibility}
            </Typography>
          </div>
        </div>
      </div>

      {/* Compliance & Legal */}
      <div className="mb-8 border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h3" className="text-2xl font-semibold text-gray-900">
            Compliance & Legal
          </Typography>
          <Button
            buttonType="outline"
            colorVariant="blue"
            size="s"
            onClick={() => onEdit('compliance')}
          >
            Edit
          </Button>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <Typography variant="body1" className="text-gray-900">
                Non-circumvention agreement {orderData.basicInfo.compliance.ncaRequired ? 'required' : 'not required'}
              </Typography>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <Typography variant="body1" className="text-gray-900">
                MP profile {orderData.basicInfo.compliance.mpProfileRequired ? 'required' : 'not required'}
              </Typography>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <Typography variant="body1" className="text-gray-900">
                Export Control: {orderData.basicInfo.compliance.exportControl}
              </Typography>
            </li>
            {orderData.basicInfo.compliance.additionalNotes && (
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <Typography variant="body1" className="text-gray-600">
                  {orderData.basicInfo.compliance.additionalNotes}
                </Typography>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Financial Terms */}
      <div className="mb-8 border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h3" className="text-2xl font-semibold text-gray-900">
            Financial Terms
          </Typography>
          <Button
            buttonType="outline"
            colorVariant="blue"
            size="s"
            onClick={() => onEdit('financial')}
          >
            Edit
          </Button>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Typography variant="subtitle2" className="text-sm text-gray-600 mb-1">
                Payment Terms
              </Typography>
              <Typography variant="body1" className="text-gray-900">
                {orderData.basicInfo.financialTerms.paymentTerms}
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" className="text-sm text-gray-600 mb-1">
                Downpayment
              </Typography>
              <Typography variant="body1" className="text-gray-900">
                {orderData.basicInfo.financialTerms.downpayment}%
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" className="text-sm text-gray-600 mb-1">
                Fixed Material Pricing
              </Typography>
              <Typography variant="body1" className="text-gray-900">
                {orderData.basicInfo.financialTerms.fixedMaterialPricing ? 'Yes' : 'No'}
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" className="text-sm text-gray-600 mb-1">
                Sample Costs
              </Typography>
              <Typography variant="body1" className="text-gray-900">
                {orderData.basicInfo.financialTerms.sampleCosts}
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" className="text-sm text-gray-600 mb-1">
                Fixed Pricing Period
              </Typography>
              <Typography variant="body1" className="text-gray-900">
                {orderData.basicInfo.financialTerms.fixedPricingPeriod} months
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" className="text-sm text-gray-600 mb-1">
                Production Termination Clause
              </Typography>
              <Typography variant="body1" className="text-gray-900">
                {orderData.basicInfo.financialTerms.productionTerminationClause ? 'Yes' : 'No'}
              </Typography>
            </div>
            {orderData.basicInfo.financialTerms.disputeWindow && (
              <div>
                <Typography variant="subtitle2" className="text-sm text-gray-600 mb-1">
                  Dispute Window
                </Typography>
                <Typography variant="body1" className="text-gray-900">
                  {orderData.basicInfo.financialTerms.disputeWindow} days
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h3" className="text-2xl font-semibold text-gray-900">
            Line Items
          </Typography>
          <Button
            buttonType="outline"
            colorVariant="blue"
            size="s"
            onClick={() => onEdit('line-items')}
          >
            Edit
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 border-b text-left">
                  <Typography variant="subtitle2" className="text-sm text-gray-700">Part Name</Typography>
                </th>
                <th className="py-2 px-4 border-b text-left">
                  <Typography variant="subtitle2" className="text-sm text-gray-700">Material</Typography>
                </th>
                <th className="py-2 px-4 border-b text-left">
                  <Typography variant="subtitle2" className="text-sm text-gray-700">Process</Typography>
                </th>
                <th className="py-2 px-4 border-b text-left">
                  <Typography variant="subtitle2" className="text-sm text-gray-700">Quantity</Typography>
                </th>
                <th className="py-2 px-4 border-b text-left">
                  <Typography variant="subtitle2" className="text-sm text-gray-700">Delivery Date</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {orderData.lineItems.map((item: LineItem, index: number) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">
                    <Typography variant="body2" className="text-gray-900">{item.partName}</Typography>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Typography variant="body2" className="text-gray-900">{item.material}</Typography>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Typography variant="body2" className="text-gray-900">{item.process}</Typography>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Typography variant="body2" className="text-gray-900">{item.quantity}</Typography>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Typography variant="body2" className="text-gray-900">{formatDate(item.deliveryDate)}</Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manufacturing Requirements */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h3" className="text-2xl font-semibold text-gray-900">
            Manufacturing Requirements
          </Typography>
          <Button
            buttonType="outline"
            colorVariant="blue"
            size="s"
            onClick={() => onEdit('requirements')}
          >
            Edit
          </Button>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <Typography variant="subtitle1" className="font-medium mb-2 text-gray-900">
            Documentation Requirements
          </Typography>
          <ul className="space-y-1 mb-4">
            {Object.entries(orderData.requirements.documentation).map(([key, value]) => (
              <li key={key} className="flex items-start">
                {value ? (
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                <Typography variant="body1" className="text-gray-900">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Typography>
              </li>
            ))}
          </ul>

          <Typography variant="subtitle1" className="font-medium mb-2 text-gray-900">
            Quality Requirements
          </Typography>
          <ul className="space-y-1 mb-4">
            {orderData.requirements.quality.inspectionRequirements.map((req: string, index: number) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <Typography variant="body1" className="text-gray-900">{req}</Typography>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Selected Suppliers */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h3" className="text-2xl font-semibold text-gray-900">
            Selected Suppliers
          </Typography>
          <Button
            buttonType="outline"
            colorVariant="blue"
            size="s"
            onClick={() => onEdit('suppliers')}
          >
            Edit
          </Button>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          {orderData.selectedSuppliers.map((supplier, index) => (
            <div key={supplier.id} className={`${index !== 0 ? 'mt-4' : ''} ${index !== orderData.selectedSuppliers.length - 1 ? 'border-b pb-4' : ''}`}>
              <div className="flex justify-between items-start mb-2">
                <Typography variant="subtitle1" className="font-medium text-gray-900">
                  {supplier.name}
                </Typography>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  {supplier.qualityScore * 20}% Match
                </span>
              </div>
              <Typography variant="body2" className="text-gray-600 mb-2">
                {supplier.location}
              </Typography>
              <div className="flex flex-wrap gap-2">
                {supplier.capabilities.map((capability: string, idx: number) => (
                  <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {capability}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Request Details */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h3" className="text-2xl font-semibold text-gray-900">
            Quote Request Details
          </Typography>
          <Button
            buttonType="outline"
            colorVariant="blue"
            size="s"
            onClick={() => onEdit('quote')}
          >
            Edit
          </Button>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Typography variant="subtitle2" className="text-sm text-gray-600 mb-1">
                Request Type
              </Typography>
              <Typography variant="body1" className="text-gray-900">
                {orderData.quoteRequest.type}
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" className="text-sm text-gray-600 mb-1">
                Response Deadline
              </Typography>
              <Typography variant="body1" className="text-gray-900">
                {formatDate(orderData.quoteRequest.deadline)}
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" className="text-sm text-gray-600 mb-1">
                Target Production Date
              </Typography>
              <Typography variant="body1" className="text-gray-900">
                {formatDate(orderData.quoteRequest.targetDate)}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {/* Attached Files */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h3" className="text-2xl font-semibold text-gray-900">
            Attached Files
          </Typography>
          <Button
            buttonType="outline"
            colorVariant="blue"
            size="s"
            onClick={() => onEdit('files')}
          >
            Edit
          </Button>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-2">
            {orderData.attachedFiles.map((file, index) => (
              <li key={index} className="flex items-center">
                <svg className="h-5 w-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <Typography variant="body1" className="text-gray-900">
                  {file.name}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Final Submission */}
      <div className="border-t pt-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <Typography variant="subtitle1" className="text-blue-800 font-medium mb-1">
                Ready to Submit
              </Typography>
              <Typography variant="body1" className="text-blue-800">
                This order will be submitted to the selected suppliers for quotation. 
                You will be notified when suppliers respond with their quotes or feedback.
              </Typography>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={confirmationChecked}
              onChange={(e) => setConfirmationChecked(e.target.checked)}
              className="mr-2"
            />
            <Typography variant="body1" className="text-gray-700">
              I confirm that all information is correct and ready for submission
            </Typography>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
              className="mr-2"
            />
            <Typography variant="body1" className="text-gray-700">
              I agree to the terms and conditions
            </Typography>
          </label>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-4 border-t">
        <Button
          buttonType="outline"
          colorVariant="blue"
          onClick={() => onEdit('suppliers')}
          disabled={isSubmitting}
        >
          Back to Suppliers
        </Button>
        <Button
          buttonType="default"
          colorVariant="green"
          disabled={!confirmationChecked || !termsChecked || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Order'}
        </Button>
      </div>
    </div>
  );
} 