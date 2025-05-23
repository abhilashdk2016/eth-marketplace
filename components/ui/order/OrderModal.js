'use client';
import React, { useEffect, useState } from 'react'
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useEthPrice } from '@/components/hooks/useEthPrice';

const defaultOrderState = {
    price: "",
    email: "",
    confirmationEmail: ""
}

const createFormState = ({ price, email, confirmationEmail }, hasAgreedToTerms, isNewPurchase) => {
    if(!price || Number(price) <=0) {
        return {
            isDisabled: true,
            message: "Price is not correct"
        }
    }
    if(isNewPurchase && (!email || email.trim().length < 5 || !email.includes("@"))) {
        return {
            isDisabled: true,
            message: "Email is not correct"
        }
    }
    if(isNewPurchase && (!confirmationEmail || confirmationEmail.trim().length < 5 || !confirmationEmail.includes("@"))) {
        return {
            isDisabled: true,
            message: "Confirmation email is not correct"
        }
    }
    if(isNewPurchase && (email !== confirmationEmail)) {
        return {
            isDisabled: true,
            message: "Emails are not the same"
        }
    }
    if(!hasAgreedToTerms) {
        return {
            isDisabled: true,
            message: "Please accept terms of service"
        }
    }
    return {
        isDisabled: false,
        message: ""
    }
}

const OrderModal = ({ course, onClose, onSubmit, isNewPurchase }) => {
  const { eth } = useEthPrice();
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState(defaultOrderState);
  const [ enablePrice, setEnablePrice ] = useState(false);
  const [ hasAgreedToTerms, setHasAgreedToTerms ] = useState(false);
  const formState = createFormState(order, hasAgreedToTerms, isNewPurchase);
  useEffect(() => {
    if(!!course) {
        setIsOpen(true);
        setOrder({
            ...defaultOrderState,
            price: eth.perItem,
        })
    }
  }, [course]);
  const closeOrderModal = () => {
    setIsOpen(false);
    setOrder(defaultOrderState);
    setHasAgreedToTerms(false);
    setEnablePrice(false);
    onClose();
  }
  return (
    <Modal isOpen={isOpen}>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
                <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="mb-7 text-lg font-bold leading-6 text-gray-900" id="modal-title">
                    {course?.title}
                </h3>
                <div className="mt-1 relative rounded-md">
                    <div className="mb-1">
                    <label className="mb-2 font-bold">Price(eth)</label>
                    <div className="text-xs text-gray-700 flex">
                        <label className="flex items-center mr-2">
                        <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={enablePrice}
                            onChange={(e) => {
                                setEnablePrice(e.target.checked);
                                setOrder({...order, price: e.target.checked ? order.price : eth.perItem });
                            }}
                        />
                        </label>
                        <span>Adjust Price - only when the price is not correct</span>
                    </div>
                    </div>
                    <input
                        disabled={!enablePrice}
                        value={order.price}
                        onChange={(e) => {
                            const val = e.target.value;
                            if(isNaN(val)) {
                                return;
                            }
                            setOrder({...order, price: val });
                        }}
                        type="text"
                        name="price"
                        id="price"
                        className="disabled:opacity-50 w-80 mb-1 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                    />
                    <p className="text-xs text-gray-700">
                    Price will be verified at the time of the order. If the price will be lower, order can be declined (+- 2% slipage is allowed)
                    </p>
                </div>
                { isNewPurchase && <div className="mt-2 relative rounded-md">
                    <div className="mb-1">
                        <label className="mb-2 font-bold">Email</label>
                    </div>
                    <input
                        value={order.email}
                        onChange={(e) => {
                            const val = e.target.value;
                            setOrder({...order, email: val.trim() });
                        }}
                        type="email"
                        name="email"
                        id="email"
                        className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                        placeholder="x@y.com"
                    />
                    <p className="text-xs text-gray-700 mt-1">
                    It&apos;s important to fill a correct email, otherwise the order cannot be verified. We are not storing your email anywhere
                    </p>
                </div>
                }
                { isNewPurchase && <div className="my-2 relative rounded-md">
                    <div className="mb-1">
                        <label className="mb-2 font-bold">Repeat Email</label>
                    </div>
                    <input
                        value={order.confirmationEmail}
                        onChange={(e) => {
                            const val = e.target.value;
                            setOrder({...order, confirmationEmail: val.trim() });
                        }}
                        type="email"
                        name="confirmationEmail"
                        id="confirmationEmail"
                        className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md" placeholder="x@y.com" />
                </div>
                }
                <div className="text-xs text-gray-700 flex mt-5">
                    <label className="flex items-center mr-2">
                    <input
                        checked={hasAgreedToTerms}
                        onChange={(e) => {
                            setHasAgreedToTerms(e.target.checked);
                        }}
                        type="checkbox"
                        className="form-checkbox" />
                    </label>
                    <span>I accept &apos;terms of service&apos; and I agree that my order can be rejected in the case data provided above are not correct</span>
                </div>
                {
                    formState.message && (
                        <div className="text-red-500 text-sm mt-2">
                            {formState.message}
                        </div>
                    )
                }
                </div>
            </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
            <Button onClick={() => onSubmit(order)} disabled={formState.isDisabled} className='px-2 py-1'>
                Submit
            </Button>
            <Button onClick={closeOrderModal} className='px-2 py-1'
                variant="red">
                Cancel
            </Button>
            </div>
        </div>
    </Modal>
    
  )
}

export default OrderModal